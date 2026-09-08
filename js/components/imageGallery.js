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
}
