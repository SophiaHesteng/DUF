/*----------------------------------------------------------------------------
 * DUF — delt billedgalleri + upload-UI
 * ----------------------------------------------------------------------------
 * Bruges af de tre rum, hvis manuskript har besluttet billedupload til en
 * øvelse (klientsidet, IndexedDB, jf. js/storage/vaekstrumStorage.js):
 * Farver Modul 3, Logo Modul 6, Billeder Modul 3. Samme markup/adfærd var på
 * vej til at blive skrevet tre gange - trukket ud hertil i stedet, samme
 * begrundelse som components/exitDoor.js (kopieret i seks filer, før den
 * fandtes).
 *
 * Denne fil kender intet til lagring (saveImage/deleteImage/
 * getImagesForVaekstrum) - det ejer det enkelte rums *Engine.js stadig selv,
 * og sender blot ind som `upload`/`remove`/`refresh`-funktioner.
 *
 * Understøtter også at indsætte et billede fra udklipsholderen (Ctrl+V), fx et
 * skærmklip taget med Windows + Shift + S - tilføjet til Logos Modul 3.2, men
 * gælder samme sted som fil-upload i alle tre rum. Se bindPaste() nedenfor.
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

export function renderImageUploadHtml({ label, hint, images }) {
    return `
        <p class="section-subheading">${label}</p>
        <p class="section-body" style="font-size:14px;opacity:0.8;">${hint}</p>
        <input id="image-upload-input" type="file" accept="image/*" class="text-input">
        <p id="image-upload-status" class="section-body" style="font-size:14px;"></p>
        <div id="image-gallery">${imageGalleryHtml(images, { removable: true })}</div>
    `;
}

const UPLOAD_ERROR_TEXT = {
    "opted-out": "Du har fravalgt browserlagring, så billedet kan ikke gemmes. Du kan slå det til igen, hvis du fortryder.",
    "not-an-image": "Den fil er ikke et billede — prøv en anden fil.",
    "file-too-large": "Billedet er for stort til at blive gemt — prøv et mindre billede."
};

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

    input.addEventListener("change", async () => {
        const file = input.files[0];
        if (!file) return;

        input.disabled = true;
        status.textContent = "Gemmer billede...";

        const result = await upload(file);

        input.disabled = false;
        input.value = "";

        if (!result.ok) {
            status.textContent = UPLOAD_ERROR_TEXT[result.reason] || "Billedet kunne ikke gemmes.";
            return;
        }

        status.textContent = "";
        gallery.innerHTML = imageGalleryHtml(await refresh(), { removable: true });
    });

    gallery.addEventListener("click", async (event) => {
        const button = event.target.closest("[data-remove-image]");
        if (!button || !remove) return;

        await remove(Number(button.dataset.removeImage));
        gallery.innerHTML = imageGalleryHtml(await refresh(), { removable: true });
    });

    bindPaste({ upload, refresh });
}
