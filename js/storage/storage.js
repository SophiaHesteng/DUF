/*----------------------------------------------------------------------------
 * DUF — delt lager til rummenes output og uploadede billeder
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
 * teknologi til "ét rums fulde output + eventuelle billeder" - jf.
 * docs/duf-visuel-style-guide.md.
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
 * `reason`, aldrig en kastet exception) - et rum kan derfor altid kalde
 * dem uden selv at tjekke fravalget først. At slå fravalget TIL rydder også
 * alt, hvad der allerede er gemt (jf. "aldrig straffe" - et fravalg skal
 * betyde, at ens ting rent faktisk er væk, ikke at de bare ikke opdateres
 * længere).
 *
 * DATAFORM - GENERISK, IKKE BUNDET TIL ÉT VÆKSTRUMS FELTER
 * `saveSideOutput` tager en fri `data`-objekt og en `documentation`-streng.
 * Hvert rum definerer selv formen på sit eget `data`-objekt (fx Farvers
 * palet-array, Logos retningsvalg) - denne fil ved intet om, og stiller ingen
 * krav til, hvad der ligger i det.
 *
 * ----------------------------------------------------------------------------
 * OFFENTLIGT KONTRAKT (det, Farver/Logo/Billeder/Byggesten og Visuel style guide
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
 * saveSideOutput(sideId: string, data: object, documentation: string):
 *     Promise<{ ok: boolean, reason?: string }>
 *   Gemmer (eller overskriver) ét rums output. Kaldes typisk fra et
 *   rums afsluttende dokumentationsmodul. `data` skal være JSON-
 *   serialiserbar (almindelige objekter/arrays/strenge/tal/booleans - ingen
 *   File/Blob her, brug saveImage til det). `reason` sat ved fejl, fx
 *   "opted-out" eller "invalid-input".
 *
 * getSideOutput(sideId: string): Promise<object|null>
 *   Henter ét rums gemte output ({ sideId, data, documentation,
 *   savedAt }), eller null hvis intet er gemt (eller lagring er fravalgt).
 *
 * getAllSideOutputs(): Promise<object[]>
 *   Henter alle gemte rum-outputs. Tom liste hvis intet er gemt, eller
 *   lagring er fravalgt. Det, Visuel style guide skal bruge til at samle op på
 *   tværs af alle fire rum.
 *
 * getSavedSideIds(): Promise<string[]>
 *   Bekvemmelighedsfunktion - kun id'erne på de rum, der har gemt noget.
 *   Nyttig til Visuel style guides "hvad mangler du stadig?"-oversigt.
 *
 * deleteSideOutput(sideId: string): Promise<void>
 *   Sletter ét rums gemte output, hvis det findes.
 *
 * saveImage(sideId: string, file: File): Promise<{ ok: boolean, imageId?: number, reason?: string }>
 *   Gemmer en brugerudvalgt fil (fra <input type="file">) som et billede
 *   knyttet til et rum. Filen forlader aldrig browseren. Afviser filer,
 *   der ikke er billeder (`reason: "not-an-image"`), eller er urimeligt store
 *   (`reason: "file-too-large"`, grænse: se MAX_IMAGE_SIZE_BYTES).
 *
 * getImage(imageId: number): Promise<{ id, sideId, name, type, blob, uploadedAt }|null>
 *   Henter ét gemt billede inklusive selve Blob'en (brug
 *   `URL.createObjectURL(blob)` for at vise det i en <img>).
 *
 * getImagesForSide(sideId: string): Promise<array>
 *   Alle gemte billeder for ét rum (uden Blob-indhold forudindlæst i
 *   listen udover det, IndexedDB naturligt returnerer - se getImage for detaljer).
 *
 * deleteImage(imageId: number): Promise<void>
 *   Sletter ét gemt billede, hvis det findes.
 *
 * saveSidePosition(sideId: string, position: object): Promise<{ ok: boolean, reason?: string }>
 *   Gemmer et rums "hvor var jeg" (fri form - fx { bobleId, svar }), så rummet kan
 *   genoptages ved næste besøg i stedet for at starte forfra. Generisk - ethvert
 *   rum kan bruge den, men det er op til det enkelte rum selv at afgøre HVORNÅR
 *   den skal kaldes (Logo kalder den kun ét sted, jf. docs/duf-manuskript-logo.md
 *   spor D). Adskilt fra saveSideOutput - en position er ikke et færdigt
 *   output, og de to skal ikke blandes sammen.
 *
 * getSidePosition(sideId: string): Promise<object|null>
 *   Henter et rums gemte position ({ sideId, position, savedAt }), eller
 *   null hvis intet er gemt (eller lagring er fravalgt).
 *
 * clearSidePosition(sideId: string): Promise<void>
 *   Sletter et rums gemte position, hvis den findes. Bør kaldes, når rummet
 *   afsluttes normalt, så en gammel position ikke dukker op ved et senere besøg.
 *
 * clearAllStorage(): Promise<void>
 *   Rydder alt gemt output og alle gemte billeder. Bruges internt af
 *   setStorageOptOut(true), men er også eksporteret til en eventuel
 *   "slet alt nu"-knap i UI'en.
 *
 * ----------------------------------------------------------------------------
 */

const DB_NAME = "duf-storage";
const DB_VERSION = 2;
const OUTPUT_STORE = "output";
const IMAGES_STORE = "images";
const POSITION_STORE = "position";
const OPT_OUT_KEY = "duf-storage-opt-out";
const MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB - rundhåndet grænse, ikke en hård teknisk begrænsning

/*---- Databasen hed tidligere "duf-vaekstrum-storage" og brugte feltet "vaekstrumId". Den blev omdøbt til DB_NAME 2026-10-15 (Trello #36), og det gamle indhold flyttes bevidst ikke med (Heidis beslutning). Den gamle database slettes, så brugerens gamle svar og billeder ikke ligger tilbage i browseren uden at kunne ses eller ryddes. Kan fjernes, når det er sandsynligt, at alle brugere har besøgt siden siden omdøbningen. GAMMELT_DB_NAME må ALDRIG være det samme som DB_NAME - så slettes brugerens svar ved hver sideindlæsning. ----*/
const GAMMELT_DB_NAME = "duf-vaekstrum-storage";

let dbPromise = null;

function openDatabase() {
    if (dbPromise) return dbPromise;

    try {
        indexedDB.deleteDatabase(GAMMELT_DB_NAME);
    } catch {
        /* intet at gøre - findes den ikke, er der intet at rydde */
    }

    dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains(OUTPUT_STORE)) {
                db.createObjectStore(OUTPUT_STORE, { keyPath: "sideId" });
            }

            if (!db.objectStoreNames.contains(IMAGES_STORE)) {
                const imagesStore = db.createObjectStore(IMAGES_STORE, { keyPath: "id", autoIncrement: true });
                imagesStore.createIndex("sideId", "sideId", { unique: false });
            }

            if (!db.objectStoreNames.contains(POSITION_STORE)) {
                db.createObjectStore(POSITION_STORE, { keyPath: "sideId" });
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

/*---- Rum-output ----*/

async function saveSideOutput(sideId, data, documentation) {
    if (isStorageOptedOut()) {
        return { ok: false, reason: "opted-out" };
    }

    if (typeof sideId !== "string" || sideId.trim() === "") {
        return { ok: false, reason: "invalid-input" };
    }

    const record = {
        sideId,
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

async function getSideOutput(sideId) {
    if (isStorageOptedOut()) return null;

    const db = await openDatabase();
    const tx = db.transaction(OUTPUT_STORE, "readonly");
    const result = await promisifyRequest(tx.objectStore(OUTPUT_STORE).get(sideId));

    return result ?? null;
}

async function getAllSideOutputs() {
    if (isStorageOptedOut()) return [];

    const db = await openDatabase();
    const tx = db.transaction(OUTPUT_STORE, "readonly");
    const result = await promisifyRequest(tx.objectStore(OUTPUT_STORE).getAll());

    return result ?? [];
}

async function getSavedSideIds() {
    const outputs = await getAllSideOutputs();
    return outputs.map((output) => output.sideId);
}

async function deleteSideOutput(sideId) {
    const db = await openDatabase();
    const tx = db.transaction(OUTPUT_STORE, "readwrite");
    tx.objectStore(OUTPUT_STORE).delete(sideId);

    await promisifyTransaction(tx);
}

/*---- Billedupload ----*/

async function saveImage(sideId, file) {
    if (isStorageOptedOut()) {
        return { ok: false, reason: "opted-out" };
    }

    if (typeof sideId !== "string" || sideId.trim() === "") {
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
        sideId,
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

async function getImagesForSide(sideId) {
    if (isStorageOptedOut()) return [];

    const db = await openDatabase();
    const tx = db.transaction(IMAGES_STORE, "readonly");
    const index = tx.objectStore(IMAGES_STORE).index("sideId");
    const result = await promisifyRequest(index.getAll(sideId));

    return result ?? [];
}

async function deleteImage(imageId) {
    const db = await openDatabase();
    const tx = db.transaction(IMAGES_STORE, "readwrite");
    tx.objectStore(IMAGES_STORE).delete(imageId);

    await promisifyTransaction(tx);
}

/*---- Rum-position ("hvor var jeg", til genoptagelse - jf. saveSidePosition ovenfor) ----*/

async function saveSidePosition(sideId, position) {
    if (isStorageOptedOut()) {
        return { ok: false, reason: "opted-out" };
    }

    if (typeof sideId !== "string" || sideId.trim() === "") {
        return { ok: false, reason: "invalid-input" };
    }

    const record = {
        sideId,
        position: position ?? {},
        savedAt: new Date().toISOString()
    };

    const db = await openDatabase();
    const tx = db.transaction(POSITION_STORE, "readwrite");
    tx.objectStore(POSITION_STORE).put(record);

    await promisifyTransaction(tx);

    return { ok: true };
}

async function getSidePosition(sideId) {
    if (isStorageOptedOut()) return null;

    const db = await openDatabase();
    const tx = db.transaction(POSITION_STORE, "readonly");
    const result = await promisifyRequest(tx.objectStore(POSITION_STORE).get(sideId));

    return result ?? null;
}

async function clearSidePosition(sideId) {
    const db = await openDatabase();
    const tx = db.transaction(POSITION_STORE, "readwrite");
    tx.objectStore(POSITION_STORE).delete(sideId);

    await promisifyTransaction(tx);
}

/*---- Ryd alt ----*/

async function clearAllStorage() {
    const db = await openDatabase();
    const tx = db.transaction([OUTPUT_STORE, IMAGES_STORE, POSITION_STORE], "readwrite");

    tx.objectStore(OUTPUT_STORE).clear();
    tx.objectStore(IMAGES_STORE).clear();
    tx.objectStore(POSITION_STORE).clear();

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
    saveSideOutput,
    getSideOutput,
    getAllSideOutputs,
    getSavedSideIds,
    deleteSideOutput,
    saveImage,
    getImage,
    getImagesForSide,
    deleteImage,
    saveSidePosition,
    getSidePosition,
    clearSidePosition,
    clearAllStorage
};
