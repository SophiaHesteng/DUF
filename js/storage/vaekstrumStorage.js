/*----------------------------------------------------------------------------
 * DUF — delt lager til vækstrummenes output og uploadede billeder
 * ----------------------------------------------------------------------------
 *
 * Klientsidet, altid. Intet i denne fil sender noget til en server - der findes
 * ingen server eller login i dette projekt. Alt gemmes udelukkende i brugerens
 * egen browser.
 *
 * HVORFOR INDEXEDDB (OG IKKE LOCALSTORAGE) FOR SELVE INDHOLDET
 * localStorage kan kun gemme strenge, har en praktisk grænse på et par MB, og
 * kan ikke rumme billeder uden en tung/upålidelig base64-omvej. IndexedDB kan
 * gemme rå Blob'er direkte, har en langt større kvote, og er den rigtige
 * teknologi til "en vækstrums fulde output + eventuelle billeder" - jf.
 * docs/duf-faelles-samling-visuel-stil.md.
 *
 * HVORFOR FRAVALGET ALLIGEVEL LIGGER I LOCALSTORAGE
 * Fravalget er ét lille boolean-flag, ikke indhold - og skal kunne læses
 * synkront (fx for at vise korrekt UI-tilstand med det samme, uden at vente på
 * en async DB-forbindelse). Det er en bevidst undtagelse, ikke en genindførsel
 * af localStorage til det, dokumentet advarer imod (større indhold/billeder).
 *
 * DESIGNPRINCIP - BROWSERLAGRING ER ET TILVALG, ALDRIG ET KRAV
 * DUF beslutter aldrig noget på brugerens vegne. Er fravalget aktivt, gør
 * save-funktionerne herunder ingenting (de fejler stille med en tydelig
 * `reason`, aldrig en kastet exception) - et vækstrum kan derfor altid kalde
 * dem uden selv at tjekke fravalget først. At slå fravalget TIL rydder også
 * alt, hvad der allerede er gemt (jf. "aldrig straffe" - et fravalg skal
 * betyde, at ens ting rent faktisk er væk, ikke at de bare ikke opdateres
 * længere).
 *
 * DATAFORM - GENERISK, IKKE BUNDET TIL ÉT VÆKSTRUMS FELTER
 * `saveVaekstrumOutput` tager en fri `data`-objekt og en `documentation`-streng.
 * Hvert vækstrum definerer selv formen på sit eget `data`-objekt (fx Farvers
 * palet-array, Logos retningsvalg) - denne fil ved intet om, og stiller ingen
 * krav til, hvad der ligger i det.
 *
 * ----------------------------------------------------------------------------
 * OFFENTLIGT KONTRAKT (det, Farver/Logo/Billeder/Byggesten og Fælles samling
 * forventes at bruge - hold denne liste opdateret, hvis signaturer ændres):
 * ----------------------------------------------------------------------------
 *
 * isStorageOptedOut(): boolean
 *   Synkron. True hvis brugeren har fravalgt browserlagring.
 *
 * setStorageOptOut(optOut: boolean): void | Promise<void>
 *   Selve flag-sætningen er synkron. Sætter man optOut=true, startes derudover
 *   en rydning af ALT eksisterende gemt output og alle gemte billeder (se
 *   begrundelse ovenfor) - det arbejde er nødvendigvis async (IndexedDB), så
 *   funktionen returnerer i det tilfælde det underliggende promise, for kald
 *   der har brug for at vente på at ryddet er færdig (`await setStorageOptOut(true)`).
 *   Kald der ikke har brug for det, kan ignorere returværdien.
 *
 * saveVaekstrumOutput(vaekstrumId: string, data: object, documentation: string):
 *     Promise<{ ok: boolean, reason?: string }>
 *   Gemmer (eller overskriver) ét vækstrums output. Kaldes typisk fra et
 *   vækstrums afsluttende dokumentationsmodul. `data` skal være JSON-
 *   serialiserbar (almindelige objekter/arrays/strenge/tal/booleans - ingen
 *   File/Blob her, brug saveImage til det). `reason` sat ved fejl, fx
 *   "opted-out" eller "invalid-input".
 *
 * getVaekstrumOutput(vaekstrumId: string): Promise<object|null>
 *   Henter ét vækstrums gemte output ({ vaekstrumId, data, documentation,
 *   savedAt }), eller null hvis intet er gemt (eller lagring er fravalgt).
 *
 * getAllVaekstrumOutputs(): Promise<object[]>
 *   Henter alle gemte vækstrum-outputs. Tom liste hvis intet er gemt, eller
 *   lagring er fravalgt. Det, Fælles samling skal bruge til at samle op på
 *   tværs af alle fire vækstrum.
 *
 * getSavedVaekstrumIds(): Promise<string[]>
 *   Bekvemmelighedsfunktion - kun id'erne på de vækstrum, der har gemt noget.
 *   Nyttig til Fælles samlings "hvad mangler du stadig?"-oversigt.
 *
 * deleteVaekstrumOutput(vaekstrumId: string): Promise<void>
 *   Sletter ét vækstrums gemte output, hvis det findes.
 *
 * saveImage(vaekstrumId: string, file: File): Promise<{ ok: boolean, imageId?: number, reason?: string }>
 *   Gemmer en brugerudvalgt fil (fra <input type="file">) som et billede
 *   knyttet til et vækstrum. Filen forlader aldrig browseren. Afviser filer,
 *   der ikke er billeder (`reason: "not-an-image"`), eller er urimeligt store
 *   (`reason: "file-too-large"`, grænse: se MAX_IMAGE_SIZE_BYTES).
 *
 * getImage(imageId: number): Promise<{ id, vaekstrumId, name, type, blob, uploadedAt }|null>
 *   Henter ét gemt billede inklusive selve Blob'en (brug
 *   `URL.createObjectURL(blob)` for at vise det i en <img>).
 *
 * getImagesForVaekstrum(vaekstrumId: string): Promise<array>
 *   Alle gemte billeder for ét vækstrum (uden Blob-indhold forudindlæst i
 *   listen udover det, IndexedDB naturligt returnerer - se getImage for detaljer).
 *
 * deleteImage(imageId: number): Promise<void>
 *   Sletter ét gemt billede, hvis det findes.
 *
 * clearAllStorage(): Promise<void>
 *   Rydder alt gemt output og alle gemte billeder. Bruges internt af
 *   setStorageOptOut(true), men er også eksporteret til en eventuel
 *   "slet alt nu"-knap i UI'en.
 *
 * ----------------------------------------------------------------------------
 */

const DB_NAME = "duf-vaekstrum-storage";
const DB_VERSION = 1;
const OUTPUT_STORE = "output";
const IMAGES_STORE = "images";
const OPT_OUT_KEY = "duf-storage-opt-out";
const MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB - rundhåndet grænse, ikke en hård teknisk begrænsning

let dbPromise = null;

function openDatabase() {
    if (dbPromise) return dbPromise;

    dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains(OUTPUT_STORE)) {
                db.createObjectStore(OUTPUT_STORE, { keyPath: "vaekstrumId" });
            }

            if (!db.objectStoreNames.contains(IMAGES_STORE)) {
                const imagesStore = db.createObjectStore(IMAGES_STORE, { keyPath: "id", autoIncrement: true });
                imagesStore.createIndex("vaekstrumId", "vaekstrumId", { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

    return dbPromise;
}

function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/*---- Fravalg (localStorage - se begrundelse øverst i filen) ----*/

function isStorageOptedOut() {
    return localStorage.getItem(OPT_OUT_KEY) === "true";
}

function setStorageOptOut(optOut) {
    localStorage.setItem(OPT_OUT_KEY, optOut ? "true" : "false");

    if (optOut) {
        return clearAllStorage();
    }
}

/*---- Vækstrum-output ----*/

async function saveVaekstrumOutput(vaekstrumId, data, documentation) {
    if (isStorageOptedOut()) {
        return { ok: false, reason: "opted-out" };
    }

    if (typeof vaekstrumId !== "string" || vaekstrumId.trim() === "") {
        return { ok: false, reason: "invalid-input" };
    }

    const record = {
        vaekstrumId,
        data: data ?? {},
        documentation: documentation ?? "",
        savedAt: new Date().toISOString()
    };

    const db = await openDatabase();
    const tx = db.transaction(OUTPUT_STORE, "readwrite");
    tx.objectStore(OUTPUT_STORE).put(record);

    await promisifyTransaction(tx);

    return { ok: true };
}

async function getVaekstrumOutput(vaekstrumId) {
    if (isStorageOptedOut()) return null;

    const db = await openDatabase();
    const tx = db.transaction(OUTPUT_STORE, "readonly");
    const result = await promisifyRequest(tx.objectStore(OUTPUT_STORE).get(vaekstrumId));

    return result ?? null;
}

async function getAllVaekstrumOutputs() {
    if (isStorageOptedOut()) return [];

    const db = await openDatabase();
    const tx = db.transaction(OUTPUT_STORE, "readonly");
    const result = await promisifyRequest(tx.objectStore(OUTPUT_STORE).getAll());

    return result ?? [];
}

async function getSavedVaekstrumIds() {
    const outputs = await getAllVaekstrumOutputs();
    return outputs.map((output) => output.vaekstrumId);
}

async function deleteVaekstrumOutput(vaekstrumId) {
    const db = await openDatabase();
    const tx = db.transaction(OUTPUT_STORE, "readwrite");
    tx.objectStore(OUTPUT_STORE).delete(vaekstrumId);

    await promisifyTransaction(tx);
}

/*---- Billedupload ----*/

async function saveImage(vaekstrumId, file) {
    if (isStorageOptedOut()) {
        return { ok: false, reason: "opted-out" };
    }

    if (typeof vaekstrumId !== "string" || vaekstrumId.trim() === "") {
        return { ok: false, reason: "invalid-input" };
    }

    if (!(file instanceof Blob)) {
        return { ok: false, reason: "invalid-input" };
    }

    if (!file.type.startsWith("image/")) {
        return { ok: false, reason: "not-an-image" };
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
        return { ok: false, reason: "file-too-large" };
    }

    const record = {
        vaekstrumId,
        name: file.name ?? "billede",
        type: file.type,
        blob: file,
        uploadedAt: new Date().toISOString()
    };

    const db = await openDatabase();
    const tx = db.transaction(IMAGES_STORE, "readwrite");
    const addRequest = tx.objectStore(IMAGES_STORE).add(record);

    const imageId = await promisifyRequest(addRequest);
    await promisifyTransaction(tx);

    return { ok: true, imageId };
}

async function getImage(imageId) {
    if (isStorageOptedOut()) return null;

    const db = await openDatabase();
    const tx = db.transaction(IMAGES_STORE, "readonly");
    const result = await promisifyRequest(tx.objectStore(IMAGES_STORE).get(imageId));

    return result ?? null;
}

async function getImagesForVaekstrum(vaekstrumId) {
    if (isStorageOptedOut()) return [];

    const db = await openDatabase();
    const tx = db.transaction(IMAGES_STORE, "readonly");
    const index = tx.objectStore(IMAGES_STORE).index("vaekstrumId");
    const result = await promisifyRequest(index.getAll(vaekstrumId));

    return result ?? [];
}

async function deleteImage(imageId) {
    const db = await openDatabase();
    const tx = db.transaction(IMAGES_STORE, "readwrite");
    tx.objectStore(IMAGES_STORE).delete(imageId);

    await promisifyTransaction(tx);
}

/*---- Ryd alt ----*/

async function clearAllStorage() {
    const db = await openDatabase();
    const tx = db.transaction([OUTPUT_STORE, IMAGES_STORE], "readwrite");

    tx.objectStore(OUTPUT_STORE).clear();
    tx.objectStore(IMAGES_STORE).clear();

    await promisifyTransaction(tx);
}

function promisifyTransaction(tx) {
    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
    });
}

export {
    isStorageOptedOut,
    setStorageOptOut,
    saveVaekstrumOutput,
    getVaekstrumOutput,
    getAllVaekstrumOutputs,
    getSavedVaekstrumIds,
    deleteVaekstrumOutput,
    saveImage,
    getImage,
    getImagesForVaekstrum,
    deleteImage,
    clearAllStorage
};
