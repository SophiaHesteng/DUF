import { activateFocusTrap } from "./accessibility.js";
import { renderExitDoor as renderSharedExitDoor, bindExit } from "../components/exitDoor.js";
import { renderImageUploadHtml, bindImageUpload, imageGalleryHtml } from "../components/imageGallery.js";
import { renderTjekliste } from "../components/tjekliste.js";
import { renderSeOgsaa } from "../components/seOgsaa.js";
import { SE_OGSAA_MAAL } from "../data/seOgsaaMaal.js";
import { rumRammeHtml, bindRumRamme } from "../components/rumRamme.js";
import { guideHtml } from "../components/guide.js";

const app = document.querySelector("#app");

/*---- Præfiks til id'erne på et ekstra upload-felt (`ekstraUpload`), så det ikke støder sammen med boblens første felt ----*/
const EKSTRA_UPLOAD_PREFIX = "lille-";

const GROUP_LABELS = {
    form: "Form",
    identitet: "Identitet",
    oprindelse: "Oprindelse"
};

function renderExitDoor() {
    return renderSharedExitDoor("Gå ud af Logo");
}

const OMRAADE = { navn: "Visuelt udtryk for din praksis", slug: "visuelt-udtryk" };

/*---- Sættes af LogoEngine.start(): giver navigationslinjerne og "Tilbage" data fra engine-historikken (js/engine/rumHistorik.js) ----*/
let rumNavigation = () => null;

function setRumNavigation(provider) {
    rumNavigation = provider;
}

function externalLinkHtml(link) {
    return `<div class="section-cta"><a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn btn--regular btn--outline-green">${link.label}</a></div>`;
}

/*---- Automatisk logo-preview (Modul 7.2-7.4) - rent client-side, jf. css/_components.scss ----*/

const LOGO_PREVIEW_EMPTY_HINT = `<p class="logo-preview-empty-hint">Du har endnu ikke lagt et logo ind ovenfor - læg det ind, eller forestil dig situationen ud fra dit eget skøn.</p>`;

/*---- 7.2 (runde 7): de tre små størrelser med etiket, så brugeren kan se, hvor hun møder logoet i den størrelse. Favicon'et står i en lille, tegnet browserfane (ren HTML/CSS), så det er tydeligt, hvad et favicon er. ----*/

function smallSizesGroupHtml(src, heading) {
    return `
        <div class="logo-preview-sizes-group">
            <p class="logo-preview-sizes-heading">${heading}</p>
            <div class="logo-preview-sizes">
                <figure class="logo-preview-size">
                    <img class="logo-preview-size-img--64" src="${src}" alt="">
                    <figcaption>Profilbillede</figcaption>
                </figure>
                <figure class="logo-preview-size">
                    <img class="logo-preview-size-img--32" src="${src}" alt="">
                    <figcaption>Lille profilbillede</figcaption>
                </figure>
                <figure class="logo-preview-size">
                    <span class="logo-preview-browser-tab" aria-hidden="true">
                        <img class="logo-preview-size-img--16" src="${src}" alt="">
                        <span class="logo-preview-browser-tab-title">Min praksis</span>
                    </span>
                    <figcaption>Favicon, ikonet i browserfanen</figcaption>
                </figure>
            </div>
        </div>`;
}

function smallPreviewHtml(images, smallImages) {
    const hasLogo = Boolean(images?.length);
    const hasSmall = Boolean(smallImages?.length);
    if (!hasLogo && !hasSmall) return LOGO_PREVIEW_EMPTY_HINT;

    return `
        ${hasLogo ? "" : LOGO_PREVIEW_EMPTY_HINT}
        <div class="logo-preview-small">
            ${hasLogo ? smallSizesGroupHtml(URL.createObjectURL(images[0].blob), "Dit logo") : ""}
            ${hasSmall ? smallSizesGroupHtml(URL.createObjectURL(smallImages[0].blob), "Den lille udgave") : ""}
        </div>`;
}

function logoPreviewHtml(kind, images, smallImages) {
    if (kind === "small") {
        return `<div id="logo-preview-small-slot">${smallPreviewHtml(images, smallImages)}</div>`;
    }

    if (!images || !images.length) {
        return LOGO_PREVIEW_EMPTY_HINT;
    }

    const src = URL.createObjectURL(images[0].blob);

    if (kind === "grayscale") {
        return `
            <div class="logo-preview-grayscale"><img src="${src}" alt="Logoet vist i gråtoner"></div>
            <p class="logo-preview-empty-hint">Gråtoner er en tilnærmelse til en ægte sort/hvid-udgave, ikke det samme.</p>`;
    }

    if (kind === "backgrounds") {
        return `
            <div class="logo-preview-backgrounds">
                <div class="logo-preview-background logo-preview-background--light"><img src="${src}" alt="Logoet på en lys baggrund"></div>
                <div class="logo-preview-background logo-preview-background--dark"><img src="${src}" alt="Logoet på en mørk baggrund"></div>
            </div>`;
    }

    return "";
}

/*---- Den gemte Farver-palet som farveflader - genbruger .palette-swatches/.palette-swatch fra Billeders paletteCompare-boble. Bruges af 5.1 (paletteSwatches) og 5.2a (paletteBeside) ----*/

function paletteSwatchesHtml(palette) {
    return `<div class="palette-swatches">${palette.map((c) => `<span class="palette-swatch" style="background-color:${c.hex}" title="${c.role || c.hex}"></span>`).join("")}</div>`;
}

/*---- Logo + gemt Farver-palet side om side (5.2a) ----*/

function paletteBesideHtml(images, palette) {
    const logoHtml = images?.length
        ? `<img src="${URL.createObjectURL(images[0].blob)}" alt="Dit logo" style="max-width:160px;max-height:160px;object-fit:contain;">`
        : `<p class="logo-preview-empty-hint">Intet logo uploadet endnu.</p>`;

    const paletteHtml = palette?.length
        ? paletteSwatchesHtml(palette)
        : `<p class="logo-preview-empty-hint">Ingen gemt palet fra Farver endnu.</p>`;

    return `
        <div class="logo-preview-backgrounds">
            <div class="logo-preview-background logo-preview-background--light">${logoHtml}</div>
            <div class="logo-preview-background logo-preview-background--light">${paletteHtml}</div>
        </div>`;
}

/*---- Eget logo + inspirationen fra 3.2 side om side (3.3b). Genbruger miniaturerne fra imageGallery.js, så screenshotsene ser ud som dér, hvor hun lagde dem ind ----*/

function sideOmSideHtml(images, inspirationImages) {
    const logoHtml = images?.length
        ? `<img src="${URL.createObjectURL(images[0].blob)}" alt="Dit logo" style="max-width:160px;max-height:160px;object-fit:contain;">`
        : `<p class="logo-preview-empty-hint">Intet logo uploadet endnu.</p>`;

    const inspirationHtml = inspirationImages?.length
        ? imageGalleryHtml(inspirationImages)
        : `<p class="logo-preview-empty-hint">Ingen screenshots lagt ind i 3.2. Brug dem, du har i hovedet.</p>`;

    return `
        <div class="logo-preview-backgrounds">
            <div class="logo-preview-background logo-preview-background--light"><p class="section-subheading">Dit logo</p>${logoHtml}</div>
            <div class="logo-preview-background logo-preview-background--light"><p class="section-subheading">Det, du fandt</p>${inspirationHtml}</div>
        </div>`;
}

/*---- Brugerens egen tekst, der sættes ind i et tekstfelt (bestillingens oplæg). Uden oversættelsen kunne et "<" i hendes svar bryde feltet ----*/
function escapeHtml(tekst) {
    return String(tekst).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/*---- DUF-bestilling (6.duf, 2026-11-04): en lille formular, der bliver til en mail til DUF - samme mønster som billedtjekket i Billeder 8.6 (billedtjekHtml/bindBilledtjek i billederUi.js). Intet gemmes; svarene ligger kun i felterne. Alle tekster og mailadressen står i `bestilling` ved 6.duf i js/data/logo.js ----*/

function bestillingHtml(best, oplaeg, antalBilleder) {
    const antalTekst = antalBilleder ? ` ${best.vedhaeftAntal.replace("{antal}", antalBilleder)}` : "";
    return `
        <div class="billedtjek">
            <label class="color-field-label" for="bestilling-oplaeg">${best.oplaegLabel}</label>
            <p class="section-body" style="font-size:14px;opacity:0.8;">${best.oplaegHint}</p>
            <textarea id="bestilling-oplaeg" class="text-input" rows="8">${escapeHtml(oplaeg || "")}</textarea>
            <p class="color-field-label" id="bestilling-reference-label">${best.reference.label}</p>
            <p class="section-body" style="font-size:14px;opacity:0.8;">${best.reference.hint}</p>
            <div class="keyword-list" role="group" aria-labelledby="bestilling-reference-label">
                ${best.reference.valg.map((valg) => `<button type="button" class="keyword-chip ord-chip" aria-pressed="false" data-bestilling-reference="${valg.id}">${valg.text}</button>`).join("")}
            </div>
            <div class="panel"><p>${best.vedhaeft}${antalTekst}</p></div>
            <button id="bestilling-mail" type="button" class="btn btn--regular btn--solid-omraade">${best.mailKnap}</button>
            <p class="section-body">${best.kopierTekst} <strong>${best.mail}</strong></p>
            <button id="bestilling-kopier" type="button" class="btn btn--slim btn--outline-green">${best.kopierKnap}</button>
            <p class="section-body" id="bestilling-kopier-status" role="status"></p>
        </div>
    `;
}

function bindBestilling(best) {
    let reference = null;

    /*---- Referencevalget virker som radioknapper: ét valg, et nyt klik skifter. Det er frivilligt, så mailen kan sendes uden ----*/
    const knapper = [...document.querySelectorAll("[data-bestilling-reference]")];
    knapper.forEach((knap) => knap.addEventListener("click", () => {
        knapper.forEach((anden) => anden.setAttribute("aria-pressed", String(anden === knap)));
        reference = knap.dataset.bestillingReference;
    }));

    /*---- Mailen bygges først ved klik, så den har det, hun har rettet i oplægget. encodeURIComponent gør linjeskift og fx & sikre i linket ----*/
    document.querySelector("#bestilling-mail").addEventListener("click", () => {
        const oplaeg = document.querySelector("#bestilling-oplaeg").value.trim();
        const referenceTekst = best.reference.valg.find((valg) => valg.id === reference)?.text;
        const krop = [
            best.mailIndledning,
            oplaeg,
            referenceTekst ? `${best.reference.mailLabel}: ${referenceTekst}` : "",
            best.vedhaeftMail,
            best.mailAfslutning
        ].filter(Boolean).join("\n\n");

        window.location.href = `mailto:${best.mail}?subject=${encodeURIComponent(best.emne)}&body=${encodeURIComponent(krop)}`;
    });

    /*---- Til brugere, hvor mailto: ikke åbner et mailprogram ----*/
    document.querySelector("#bestilling-kopier").addEventListener("click", async () => {
        const status = document.querySelector("#bestilling-kopier-status");
        try {
            await navigator.clipboard.writeText(best.mail);
            status.textContent = best.kopieret;
        } catch {
            status.textContent = best.kopierFejl;
        }
    });
}

/*---- Logo-briefen (6.b4, bestillingsgrenen 2026-11-04): briefen fra buildLogoBrief() i logoEngine.js i et tekstfelt, så hun kan rette i den. "Send til dig selv" findes kun, når en anden skal lave logoet (`medMail`) - en DUF-bestilling sendes fra 6.duf. Alle tekster står i `brief` ved 6.b4 i js/data/logo.js ----*/

function briefHtml(brief, tekst, medMail) {
    return `
        <div class="billedtjek">
            <label class="color-field-label" for="logo-brief">${brief.label}</label>
            <textarea id="logo-brief" class="text-input" rows="14">${escapeHtml(tekst || "")}</textarea>
            <button id="logo-brief-kopier" type="button" class="btn btn--slim btn--outline-green">${brief.kopierKnap}</button>
            ${medMail ? `<button id="logo-brief-mail" type="button" class="btn btn--slim btn--outline-green">${brief.mailKnap}</button>` : ""}
            <p class="section-body" id="logo-brief-status" role="status"></p>
        </div>
    `;
}

function bindBrief(brief) {
    const felt = document.querySelector("#logo-brief");

    document.querySelector("#logo-brief-kopier").addEventListener("click", async () => {
        const status = document.querySelector("#logo-brief-status");
        try {
            await navigator.clipboard.writeText(felt.value.trim());
            status.textContent = brief.kopieret;
        } catch {
            status.textContent = brief.kopierFejl;
        }
    });

    /*---- "mailto:" uden adresse åbner en tom mail, hvor hun selv vælger, hvem den skal sendes til ----*/
    document.querySelector("#logo-brief-mail")?.addEventListener("click", () => {
        window.location.href = `mailto:?body=${encodeURIComponent(felt.value.trim())}`;
    });
}

/*---- 💬-linjen: med et navn (guideAvatar) vises den som guide-boble (js/components/guide.js) med pladsholder-avatar; uden navn som det gamle panel ----*/

function guideLineHtml(boble) {
    if (!boble.guideLine) return "";
    if (boble.guideAvatar) return guideHtml({ navn: boble.guideAvatar, citat: boble.guideLine });
    return `<div class="panel guide-line"><p><strong>💬 Guide:</strong> ${boble.guideLine}</p></div>`;
}

/*---- Fælles hoved: overskrift, brødtekst, og alle generiske "påhæng" en boble kan bære (recap, guideLine, palet-visning, billedupload, logo-preview, indlejret tjekliste). Se også-skiltet ligger sidst, lige over CTA'en, jf. spec'en ("under hovedteksten, over videre-knappen"). ----*/

function headerHtml(boble, ctx = {}) {
    return `
        <h2 class="section-heading">${boble.heading}</h2>
        <div class="section-body">
            ${(boble.paragraphs || []).map((p) => `<p>${p}</p>`).join("")}
            ${boble.list ? `<ul>${boble.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
            ${boble.afterList ? `<p>${boble.afterList}</p>` : ""}
        </div>
        ${boble.extraBodyHtml || ""}
        ${ctx.recap?.length ? `<dl class="compass-summary">${ctx.recap.map((item) => `<dt>${item.label}</dt><dd>${item.value}</dd>`).join("")}</dl>` : ""}
        ${boble.paletteSwatches && ctx.palette?.length ? paletteSwatchesHtml(ctx.palette) : ""}
        ${boble.paletteBeside ? paletteBesideHtml(ctx.images, ctx.palette) : ""}
        ${boble.sideOmSide ? sideOmSideHtml(ctx.images, ctx.inspirationImages) : ""}
        ${boble.externalLink ? externalLinkHtml(boble.externalLink) : ""}
        ${guideLineHtml(boble)}
        ${boble.imageUpload ? renderImageUploadHtml({ label: boble.imageUpload.label, hint: boble.imageUpload.hint, images: ctx.images || [], multiple: Boolean(boble.imageUpload.multiple) }) : ""}
        ${boble.ekstraUpload ? renderImageUploadHtml({ label: boble.ekstraUpload.label, hint: boble.ekstraUpload.hint, images: ctx.ekstraImages || [], idPrefix: EKSTRA_UPLOAD_PREFIX }) : ""}
        ${boble.logoPreview ? logoPreviewHtml(boble.logoPreview, ctx.images, ctx.responseImages) : ""}
        ${boble.checklist ? `<div id="tjekliste-container"></div>` : ""}
        ${boble.bestilling ? bestillingHtml(boble.bestilling, ctx.bestillingOplaeg, ctx.bestillingAntalBilleder) : ""}
        ${boble.brief ? briefHtml(boble.brief, ctx.brief, ctx.briefMedMail) : ""}
        <div id="se-ogsaa-slot"></div>
    `;
}

/*---- Fælles skærm-opsætning + binding af de "påhæng", der ikke kræver, at den specifikke type-renderer selv ved noget om dem (billedupload, indlejret tjekliste, Se også-skilt). Den specifikke renderer bygger selv bodyHtml/ctaHtml og binder sin egen unikke interaktion (valgkort, tekstfelter, ...). ----*/

function renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit) {
    const navigation = rumNavigation();

    /*---- Fælles ramme (js/components/rumRamme.js): topbjælke, modul- og boble-linje, indholdskort og knaprække med "Tilbage" til venstre og boblens egne knapper til højre. Exit-døren ligger uden for rammen som før ----*/
    app.innerHTML = rumRammeHtml({ omraade: OMRAADE, rum: "Logo", indhold: bodyHtml, knapper: ctaHtml, navigation }) + renderExitDoor();

    bindRumRamme(app, navigation);
    activateFocusTrap(app);
    bindExit(onExit);

    if (boble.imageUpload && ctx?.imageHandlers) {
        bindImageUpload(ctx.imageHandlers);
    }

    /*---- Det ekstra felt (6.5's lille udgave) tager ikke imod Ctrl + V - det gør kun det første felt, så et skærmklip ikke havner det forkerte sted ----*/
    if (boble.ekstraUpload && ctx?.ekstraImageHandlers) {
        bindImageUpload({ ...ctx.ekstraImageHandlers, idPrefix: EKSTRA_UPLOAD_PREFIX, paste: false });
    }

    if (boble.checklist) {
        renderTjekliste(document.querySelector("#tjekliste-container"), {
            gemNoegle: boble.checklist.gemNoegle,
            punkter: boble.checklist.punkter || [],
            titel: boble.checklist.titel,
            /*---- Tjeklistens afsluttende linje (fx "... så søg rådgivning") kommer med i mailen. Den ligger enten på selve tjeklisten eller som boblens afterList ----*/
            afslutning: boble.checklist.afslutning || boble.afterList
        });
    }

    if (boble.bestilling) bindBestilling(boble.bestilling);
    if (boble.brief) bindBrief(boble.brief);

    if (boble.seOgsaa) {
        const maal = SE_OGSAA_MAAL[boble.seOgsaa.maal];
        const slot = document.querySelector("#se-ogsaa-slot");
        if (maal && slot) renderSeOgsaa(slot, { maal, navn: maal.navn, tekst: boble.seOgsaa.tekst });
    }
}

/*---- Realiserer manuskriptets Boble 1.1 ("Velkommen til Logo") - denne skærm ER 1.1, ikke en generisk forgate foran den. Samme to-trins mønster (chrome synlig her, skjult fra og med "in-flow") som resten af rummene, men uden en overflødig gentagelse af samme tekst som en separat boble bagefter. Knap-teksten matcher manuskriptets "Lad os begynde". ----*/

function showWelcome(text, onStart) {
    app.innerHTML = `
        <section class="section welcome-card">
            <h1 class="section-heading">Logo</h1>
            <div class="section-body"><p>${text}</p></div>
            <div class="section-cta">
                <button id="start-button" type="button" class="btn btn--regular btn--solid-green">Lad os begynde</button>
            </div>
        </section>`;

    activateFocusTrap(app);
    document.querySelector("#start-button").addEventListener("click", onStart);
}

/*---- type: "text" - ren læseskærm (evt. med alle de fælles påhæng ovenfor). Håndterer også de terminale bobler (saveOutput: 8.2, isExit: 2d.5/6.vent-se/8.3), hvor "Næste"-knappen viser en kort ventetilstand, mens motoren gemmer/afslutter. ----*/

function showTextBoble(boble, ctx, onNext, onExit) {
    const bodyHtml = headerHtml(boble, ctx);
    /*---- Med en bestillingsformular er mailen hovedhandlingen, så "Videre" bliver den sekundære knap - som i Billeder 8.6 ----*/
    const nextKlasse = boble.bestilling ? "btn--outline-green" : "btn--solid-omraade";
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular ${nextKlasse}">${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit);

    const nextButton = document.querySelector("#next-button");
    nextButton.addEventListener("click", async () => {
        if (boble.saveOutput || boble.isExit) {
            nextButton.disabled = true;
            nextButton.textContent = "Gemmer...";
        }
        /*---- 6.b4: briefen sendes med, som hun har rettet den, så 6.duf kan bruge den som oplæg ----*/
        await onNext(boble.brief ? { brief: document.querySelector("#logo-brief").value.trim() } : undefined);
    });
}

/*---- type: "choice" - envalgskort (eller, med ctaButtons: true, stakkede CTA-knapper der handler med det samme uden en separat "Næste"). Understøtter pr.-option `response` (vises i et panel efter valg), `badgeText` (lille markering, fx 4.2's forslag), `explanation` (6.2, runde 7: en kort forklaring, der foldes ud med en separat pil-knap ved siden af kortet - selve kortet og pilen er to forskellige knapper, så at folde ud aldrig vælger muligheden), og `followUpOptions` (5.2a: erstatter "Næste" med 1-2 nye knapper efter et bestemt svar). På boble-niveau: `responseUpload` (7.2, runde 7) - en ekstra billedupload under responsen, kun når den valgte mulighed har en respons. ----*/

function showChoiceBoble(boble, ctx, onNext, onExit) {
    const isCta = Boolean(boble.ctaButtons);

    const cardHtml = (option) => `
            <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-id="${option.id}">
                <span class="choice-card-body">
                    <span class="choice-card-title choice-card-title--plain">${option.text}</span>
                    ${option.badgeText ? `<span class="choice-card-description">${option.badgeText}</span>` : ""}
                </span>
            </button>`;

    const explainedCardHtml = (option) => `
            <div class="choice-option">
                <div class="choice-option-row">
                    ${cardHtml(option)}
                    <button type="button" class="choice-option-toggle" aria-expanded="false" aria-controls="choice-explanation-${option.id}" aria-label="Læs mere om: ${option.text}" data-explanation-toggle="${option.id}">
                        <span class="choice-option-toggle-chevron" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="choice-option-explanation" id="choice-explanation-${option.id}" hidden>
                    <p>${option.explanation}</p>
                </div>
            </div>`;

    const optionHtml = (option) => {
        if (isCta) return `<button type="button" class="btn btn--regular btn--outline-green" data-option-id="${option.id}">${option.text}</button>`;
        return option.explanation ? explainedCardHtml(option) : cardHtml(option);
    };

    const optionsHtml = boble.options.map(optionHtml).join("");
    const noteHtml = boble.allowNote
        ? `<textarea id="choice-note" class="text-input" rows="2" placeholder="Uddyb gerne (valgfrit)"></textarea>`
        : "";

    const bodyHtml = `
        ${headerHtml(boble, ctx)}
        <div class="${isCta ? "section-cta section-cta--column" : "choice-list"}">${optionsHtml}</div>
        <div id="choice-response"></div>
        ${noteHtml}
    `;
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-omraade"${isCta ? " hidden" : " disabled"}>${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit);

    const optionButtons = document.querySelectorAll("[data-option-id]");
    const nextButton = document.querySelector("#next-button");
    const responseContainer = document.querySelector("#choice-response");
    const noteField = document.querySelector("#choice-note");
    let selectedOption = null;

    /*---- Pilen folder kun forklaringen ud/ind - den rører ikke ved valget (aria-pressed/selectedOption) ----*/
    document.querySelectorAll("[data-explanation-toggle]").forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const panel = document.getElementById(toggle.getAttribute("aria-controls"));
            const isOpen = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!isOpen));
            if (panel) panel.hidden = isOpen;
        });
    });

    /*---- 7.2's lille udgave: vises straks i de små størrelser ved siden af hovedlogoet. Har hun ikke lagt en lille udgave ind endnu, står feltet fremme fra start (logo-varianter, 2026-11-04), så hun ikke først skal svare "Næsten" eller "Nej" for at finde det. Har hun en, dukker feltet op under responsen som før, så hun kan skifte den ud ----*/
    const uploadFraStart = Boolean(boble.responseUpload) && !ctx?.responseImages?.length;

    const renderResponseUpload = (container = responseContainer) => {
        if (!boble.responseUpload || !ctx?.responseImageHandlers) return;

        const handlers = ctx.responseImageHandlers;
        const refreshAndPreview = async () => {
            const foer = ctx.responseImages?.length || 0;
            const smallImages = await handlers.refresh();
            ctx.responseImages = smallImages;
            const previewSlot = document.querySelector("#logo-preview-small-slot");
            if (previewSlot) previewSlot.innerHTML = smallPreviewHtml(ctx.images, smallImages);

            /*---- En ny lille udgave ændrer, hvad hun skal vurdere: hendes svar fra før nulstilles, og hun bedes svare igen. Ellers blev et "Nej", givet før uploadet, stående som en fejl i 7.5 ----*/
            if (smallImages.length > foer && boble.genvurderTekst) {
                optionButtons.forEach((knap) => knap.setAttribute("aria-pressed", "false"));
                selectedOption = null;
                nextButton.disabled = true;
                container.querySelector(".logo-genvurder")?.remove();
                container.insertAdjacentHTML("beforeend", `<div class="panel logo-genvurder" role="status"><p>${boble.genvurderTekst}</p></div>`);
            }
            return smallImages;
        };

        container.insertAdjacentHTML("beforeend", `<div class="logo-response-upload">${renderImageUploadHtml({
            label: boble.responseUpload.label,
            hint: boble.responseUpload.hint,
            images: ctx.responseImages || []
        })}</div>`);
        bindImageUpload({ upload: handlers.upload, remove: handlers.remove, refresh: refreshAndPreview });
    };

    if (uploadFraStart) {
        responseContainer.insertAdjacentHTML("beforebegin", `<div id="logo-upload-fra-start"></div>`);
        renderResponseUpload(document.querySelector("#logo-upload-fra-start"));
    }

    const answerFor = (option) => ({
        optionId: option.id,
        text: option.text,
        note: noteField?.value || "",
        jumpTo: option.jumpTo,
        forcedNext: option.next
    });

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedOption = boble.options.find((o) => o.id === button.dataset.optionId);
            if (!selectedOption) return;

            if (!isCta) {
                optionButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
            }

            /*---- Svaret flyttes ind lige under den knap, hun trykkede på (fx 4.4 og 2c.2), i stedet for altid at stå under den nederste. Med en forklarings-pil (6.2) står det under hele rækken ----*/
            (button.closest(".choice-option") || button).after(responseContainer);

            responseContainer.innerHTML = selectedOption.response ? `<div class="panel"><p>${selectedOption.response}</p></div>` : "";
            if (selectedOption.response && !uploadFraStart) renderResponseUpload();

            if (selectedOption.followUpOptions) {
                nextButton.hidden = true;
                const followUpHtml = selectedOption.followUpOptions
                    .map((fu) => `<button type="button" class="btn btn--regular btn--outline-green" data-followup-id="${fu.id}">${fu.text}</button>`)
                    .join("");
                responseContainer.insertAdjacentHTML("beforeend", `<div class="section-cta section-cta--column">${followUpHtml}</div>`);

                responseContainer.querySelectorAll("[data-followup-id]").forEach((fuButton) => {
                    fuButton.addEventListener("click", () => {
                        const followUp = selectedOption.followUpOptions.find((f) => f.id === fuButton.dataset.followupId);
                        onNext({ ...answerFor(selectedOption), jumpTo: followUp.jumpTo, forcedNext: followUp.next });
                    });
                });
                return;
            }

            if (isCta) {
                onNext(answerFor(selectedOption));
                return;
            }

            nextButton.disabled = false;
        });
    });

    if (!isCta) {
        nextButton.addEventListener("click", () => {
            if (!selectedOption) return;
            onNext(answerFor(selectedOption));
        });
    }
}

/*---- type: "multiChoice" - togglebare kort, valgfrit grupperet med underoverskrifter (2B.2/2B.3), valgfri fritekst-note ----*/

function showMultiChoiceBoble(boble, ctx, onNext, onExit) {
    const optionCardHtml = (option) => `
        <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-id="${option.id}">
            <span class="choice-card-title choice-card-title--plain">${option.text}</span>
        </button>`;

    const groups = [...new Set(boble.options.map((o) => o.group).filter(Boolean))];
    let optionsHtml;

    if (groups.length) {
        const ungrouped = boble.options.filter((o) => !o.group);
        optionsHtml = groups
            .map((group) => `
                <p class="choice-group-heading">${GROUP_LABELS[group] || group}</p>
                <div class="choice-list">${boble.options.filter((o) => o.group === group).map(optionCardHtml).join("")}</div>
            `).join("") + (ungrouped.length ? `<div class="choice-list">${ungrouped.map(optionCardHtml).join("")}</div>` : "");
    } else {
        optionsHtml = `<div class="choice-list">${boble.options.map(optionCardHtml).join("")}</div>`;
    }

    const noteHtml = boble.allowNote
        ? `<textarea id="multichoice-note" class="text-input" rows="2" placeholder="Uddyb gerne (valgfrit)"></textarea>`
        : "";

    const bodyHtml = `${headerHtml(boble, ctx)}${optionsHtml}<div id="multichoice-response"></div>${noteHtml}`;
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-omraade">${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit);

    const optionButtons = document.querySelectorAll("[data-option-id]");

    /*---- `responsVedValg` (6.b1): én respons, der står fremme, så længe mindst ét af de nævnte valg er valgt. Opdateres efter hvert klik, så den forsvinder igen, hvis hun fravælger dem ----*/
    const opdaterRespons = () => {
        const respons = boble.responsVedValg;
        if (!respons) return;
        const vis = [...optionButtons].some((button) => button.getAttribute("aria-pressed") === "true" && respons.optionIds.includes(button.dataset.optionId));
        document.querySelector("#multichoice-response").innerHTML = vis ? `<div class="panel"><p>${respons.tekst}</p></div>` : "";
    };
    /*---- Et svar med `eksklusiv: true` i data (fx "Ikke noget lige nu" eller "Jeg ved ikke") betyder "ingen af de andre". Vælger hun det, slukkes de andre, og vælger hun et af de andre, slukkes det. Ellers kunne hun sende modstridende svar videre til opsamlingerne ----*/
    const erEksklusiv = (button) => boble.options.find((o) => o.id === button.dataset.optionId)?.eksklusiv === true;

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const isPressed = button.getAttribute("aria-pressed") === "true";
            button.setAttribute("aria-pressed", String(!isPressed));

            if (!isPressed) {
                optionButtons.forEach((other) => {
                    if (other !== button && (erEksklusiv(button) || erEksklusiv(other))) {
                        other.setAttribute("aria-pressed", "false");
                    }
                });
            }
            opdaterRespons();
        });
    });

    document.querySelector("#next-button").addEventListener("click", () => {
        const selected = [...optionButtons]
            .filter((button) => button.getAttribute("aria-pressed") === "true")
            .map((button) => {
                const option = boble.options.find((o) => o.id === button.dataset.optionId);
                return { id: option.id, text: option.text };
            });

        const note = document.querySelector("#multichoice-note")?.value || "";

        onNext({ selected, note });
    });
}

/*---- type: "textNote" - ét eller flere fritekstfelter, valgfrit forudfyldt (ctx.prefill, nøglet på field.id) ----*/

function showTextNoteBoble(boble, ctx, onNext, onExit) {
    const prefill = ctx?.prefill || {};

    const fieldsHtml = boble.fields.map((field) => `
        ${field.label ? `<p class="section-subheading">${field.label}</p>` : ""}
        <textarea id="field-${field.id}" class="text-input" rows="${field.rows || 3}"${field.placeholder ? ` placeholder="${field.placeholder}"` : ""}>${prefill[field.id] || ""}</textarea>
    `).join("");

    const bodyHtml = `${headerHtml(boble, ctx)}${fieldsHtml}`;
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-omraade">${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit);

    document.querySelector("#next-button").addEventListener("click", () => {
        const values = {};
        boble.fields.forEach((field) => {
            values[field.id] = document.querySelector(`#field-${field.id}`).value;
        });
        onNext(values);
    });
}

/*---- type: "paletteColorPicker" (5.2c) - multivalg af den gemte Farver-palets farver, plus "logoet skal have sin egen variant" ----*/

function showPaletteColorPickerBoble(boble, ctx, onNext, onExit) {
    const palette = ctx?.palette || [];

    const swatchesHtml = palette.map((color) => `
        <li class="tjekliste-punkt">
            <label class="tjekliste-label">
                <input type="checkbox" class="palette-color-checkbox" data-color-id="${color.id}">
                <span class="palette-swatch" style="width:24px;height:24px;display:inline-block;background-color:${color.hex};border-radius:50%;"></span>
                <span>${color.role || color.hex}</span>
            </label>
        </li>
    `).join("");

    const bodyHtml = `
        ${headerHtml(boble, ctx)}
        ${palette.length ? `<ul class="tjekliste">${swatchesHtml}</ul>` : `<p class="logo-preview-empty-hint">Ingen gemt palet fra Farver endnu.</p>`}
        <ul class="tjekliste">
            <li class="tjekliste-punkt">
                <label class="tjekliste-label">
                    <input type="checkbox" id="egen-variant-checkbox">
                    <span>Logoet skal have sin egen variant</span>
                </label>
            </li>
        </ul>
    `;
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-omraade">${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit);

    document.querySelector("#next-button").addEventListener("click", () => {
        const selected = [...document.querySelectorAll(".palette-color-checkbox:checked")]
            .map((checkbox) => {
                const color = palette.find((c) => String(c.id) === checkbox.dataset.colorId);
                return color ? { id: color.id, hex: color.hex, role: color.role } : null;
            })
            .filter(Boolean);

        const egenVariant = document.querySelector("#egen-variant-checkbox").checked;

        onNext({ selected, egenVariant });
    });
}

function showExitConfirmation(onStay, onExit) {
    app.innerHTML = rumRammeHtml({
        omraade: OMRAADE,
        rum: "Logo",
        kortAttributter: 'role="dialog" aria-modal="true" aria-labelledby="exit-title" aria-describedby="exit-description"',
        indhold: `
            <div class="exit-confirmation">
                <h2 id="exit-title" class="section-subheading">Vil du forlade Logo?</h2>

                <div class="section-body">
                    <p id="exit-description">Hvis du går ud nu, bliver dine svar ikke gemt.</p>
                </div>

                <div class="section-cta section-cta--column">
                    <button id="stay-button" type="button" class="btn btn--regular btn--solid-green">Bliv i rummet</button>
                    <button id="leave-button" type="button" class="btn btn--regular btn--solid-green">Ja, gå ud</button>
                </div>
            </div>
        `
    });

    activateFocusTrap(app);
    document.querySelector("#stay-button").addEventListener("click", onStay);
    document.querySelector("#leave-button").addEventListener("click", onExit);
}

export const RENDERERS = {
    text: showTextBoble,
    choice: showChoiceBoble,
    multiChoice: showMultiChoiceBoble,
    textNote: showTextNoteBoble,
    paletteColorPicker: showPaletteColorPickerBoble
};

export { showWelcome, showExitConfirmation, setRumNavigation };
