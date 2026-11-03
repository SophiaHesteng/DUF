/*----------------------------------------------------------------------------
 * DUF — delt billedgalleri + upload-UI
 * ----------------------------------------------------------------------------
 * Bruges af de tre rum, hvis manuskript har besluttet billedupload til en
 * øvelse (klientsidet, IndexedDB, jf. js/storage/storage.js):
 * Farver Modul 3, Logo Modul 6, Billeder Modul 3. Samme markup/adfærd var på
 * vej til at blive skrevet tre gange - trukket ud hertil i stedet, samme
 * begrundelse som components/exitDoor.js (kopieret i seks filer, før den
 * fandtes).
 *
 * Denne fil kender intet til lagring (saveImage/deleteImage/
 * getImagesForSide) - det ejer det enkelte rums *Engine.js stadig selv,
 * og sender blot ind som `upload`/`remove`/`refresh`-funktioner.
 *
 * Understøtter også at indsætte et billede fra udklipsholderen (Ctrl+V), fx et
 * skærmklip taget med Windows + Shift + S - tilføjet til Logos Modul 3.2, men
 * gælder samme sted som fil-upload i alle tre rum. Se bindPaste() nedenfor.
 *
 * 2026-11-03: valgfri `multiple` i renderImageUploadHtml(), så der kan vælges
 * flere filer på én gang (kun Billeder bruger den). bindImageUpload() gemmer
 * derfor alle valgte filer, ikke kun den første. Indsæt fra udklipsholderen er
 * stadig ét billede ad gangen.
 * ----------------------------------------------------------------------------
 */

export function imageGalleryHtml(images, { removable = false } = {}) {
    if (!images.length) return "";

    return images.map((image) => `
        <div class="image-thumb" data-image-id="${image.id}" style="display:inline-block;text-align:center;margin:0 12px 12px 0;">
            <img src="${URL.createObjectURL(image.blob)}" alt="" style="max-width:120px;max-height:120px;border-radius:10px;display:block;">
            ${removable ? `<button type="button" class="btn btn--slim btn--outline-orange" data-remove-image="${image.id}" style="margin-top:6px;">Fjern</button>` : ""}
        </div>
    `).join("");
}

/*---- `multiple` (valgfri, standard false): lader brugeren vælge flere billeder på én gang
 * i filvælgeren. Slået til i Billeders upload-bobler (3.1, 4.4, 7.10), hvor der skal
 * samles mange billeder. Farver og Logo sender den ikke med og har ét billede ad gangen
 * som før. ----*/
export function renderImageUploadHtml({ label, hint, images, multiple = false }) {
    return `
        <p class="section-subheading">${label}</p>
        <p class="section-body" style="font-size:14px;opacity:0.8;">${hint}</p>
        <input id="image-upload-input" type="file" accept="image/*" class="text-input"${multiple ? " multiple" : ""}>
        <p id="image-upload-status" class="section-body" style="font-size:14px;"></p>
        <div id="image-gallery">${imageGalleryHtml(images, { removable: true })}</div>
    `;
}

const UPLOAD_ERROR_TEXT = {
    "opted-out": "Du har fravalgt browserlagring, så billedet kan ikke gemmes. Du kan slå det til igen, hvis du fortryder.",
    "not-an-image": "Den fil er ikke et billede - prøv en anden fil.",
    "file-too-large": "Billedet er for stort til at blive gemt - prøv et mindre billede."
};

/*---- Statusbesked efter en upload. Én fil: samme tekst som altid. Flere filer: navnet
 * på hver fil, der fejlede, og hvorfor. Har brugeren fravalgt browserlagring, fejler
 * alle af samme grund, så den forklaring står én gang i stedet for en liste. ----*/
function fejlTekst(fejlede, antal) {
    if (!fejlede.length) return "";

    if (antal === 1 || fejlede.every((f) => f.reason === "opted-out")) {
        return UPLOAD_ERROR_TEXT[fejlede[0].reason] || "Billedet kunne ikke gemmes.";
    }

    const liste = fejlede
        .map(({ file, reason }) => `${file.name}: ${UPLOAD_ERROR_TEXT[reason] || "Billedet kunne ikke gemmes."}`)
        .join(" ");
    const gemt = antal - fejlede.length;
    return `${gemt} af ${antal} billeder blev gemt. Disse kunne ikke gemmes: ${liste}`;
}

/*---- Ét paste-listener ad gangen, på #app frem for det enkelte skærmbillede - #app's
 * indhold skiftes helt ud (innerHTML) ved hver ny boble, men selve #app-elementet
 * består, så et document-scopet lyt-punkt ville ellers hobe sig op på tværs af
 * skærme. Håndteren tjekker selv, om upload-feltet stadig findes i DOM'et, før den
 * gør noget - et robust "no-op hvis skærmen er skiftet", uden at hver renderer skal
 * huske at afmelde den. ----*/
let activePasteHandler = null;

function bindPaste({ upload, refresh }) {
    const app = document.querySelector("#app");
    if (!app) return;

    if (activePasteHandler) {
        app.removeEventListener("paste", activePasteHandler);
    }

    activePasteHandler = async (event) => {
        const input = document.querySelector("#image-upload-input");
        const gallery = document.querySelector("#image-gallery");
        const status = document.querySelector("#image-upload-status");
        if (!input || !gallery || input.disabled) return;

        const items = event.clipboardData?.items;
        if (!items) return;

        const imageItem = [...items].find((item) => item.type.startsWith("image/"));
        if (!imageItem) return;

        const file = imageItem.getAsFile();
        if (!file) return;

        event.preventDefault();

        input.disabled = true;
        if (status) status.textContent = "Gemmer billede...";

        const result = await upload(file);

        input.disabled = false;

        if (!result.ok) {
            if (status) status.textContent = UPLOAD_ERROR_TEXT[result.reason] || "Billedet kunne ikke gemmes.";
            return;
        }

        if (status) status.textContent = "";
        gallery.innerHTML = imageGalleryHtml(await refresh(), { removable: true });
    };

    app.addEventListener("paste", activePasteHandler);
}

export function bindImageUpload({ upload, remove, refresh }) {
    const input = document.querySelector("#image-upload-input");
    const gallery = document.querySelector("#image-gallery");
    const status = document.querySelector("#image-upload-status");
    if (!input || !upload) return;

    /*---- Gemmer alle valgte filer én ad gangen (ikke samtidig), så status kan sige
     * "Gemmer billede 2 af 5 ...", og så én fil, der fejler, ikke stopper resten.
     * Galleriet tegnes først om, når alle er forsøgt gemt - ét kald til refresh() i
     * stedet for ét pr. fil, så minimum-knappen (fx "mindst 5" i Billeder 4.4) også
     * låses op, når flere billeder kommer ind på én gang. Med én fil (altid tilfældet i
     * Farver og Logo, der ikke har `multiple`) er teksterne de samme som før. ----*/
    input.addEventListener("change", async () => {
        const files = [...input.files];
        if (!files.length) return;

        input.disabled = true;

        const fejlede = [];
        for (const [index, file] of files.entries()) {
            status.textContent = files.length === 1
                ? "Gemmer billede..."
                : `Gemmer billede ${index + 1} af ${files.length} ...`;

            const result = await upload(file);
            if (!result.ok) fejlede.push({ file, reason: result.reason });
        }

        input.disabled = false;
        input.value = "";

        if (fejlede.length < files.length) {
            gallery.innerHTML = imageGalleryHtml(await refresh(), { removable: true });
        }

        status.textContent = fejlTekst(fejlede, files.length);
    });

    gallery.addEventListener("click", async (event) => {
        const button = event.target.closest("[data-remove-image]");
        if (!button || !remove) return;

        await remove(Number(button.dataset.removeImage));
        gallery.innerHTML = imageGalleryHtml(await refresh(), { removable: true });
    });

    bindPaste({ upload, refresh });
}
