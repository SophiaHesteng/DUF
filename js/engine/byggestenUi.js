import { activateFocusTrap } from "./accessibility.js";
import { renderExitDoor as renderSharedExitDoor, bindExit } from "../components/exitDoor.js";
import { renderImageUploadHtml, bindImageUpload } from "../components/imageGallery.js";
import { renderSeOgsaa } from "../components/seOgsaa.js";
import { renderFontvaelger, indlaesGoogleFont } from "../components/fontvaelger.js";
import { renderProvSammen } from "../components/provSammen.js";
import { materialIkonHtml, ikonRaekkeHtml, EKSEMPEL_IKONER } from "../components/materialIkoner.js";
import { SE_OGSAA_MAAL } from "../data/seOgsaaMaal.js";
import { skiftEmne } from "../data/byggesten.js";

/*---- UI til "Ikoner, fonte & andre grafiske byggesten" - én renderer pr. boble-type (jf. js/data/byggesten.js), samme opdeling som logoUi.js men Byggestens egen kopi ----*/

const app = document.querySelector("#app");

function renderExitDoor() {
    return renderSharedExitDoor("Gå ud af Ikoner, fonte & andre grafiske byggesten");
}

function externalLinkHtml(link) {
    return `<div class="section-cta"><a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn btn--regular btn--outline-green">${link.label}</a></div>`;
}

/*---- Fælles hoved: overskrift, brødtekst og de generiske "påhæng". Se også-skiltet ligger sidst, lige over CTA'en ----*/

function headerHtml(boble, ctx = {}) {
    return `
        <h2 class="section-heading">${boble.heading}</h2>
        <div class="section-body">
            ${(boble.paragraphs || []).map((p) => `<p>${p}</p>`).join("")}
            ${boble.list ? `<ul>${boble.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
            ${boble.afterList ? [].concat(boble.afterList).map((p) => `<p>${p}</p>`).join("") : ""}
        </div>
        ${boble.recap?.length ? recapHtml(boble.recap) : ""}
        ${boble.visuelt ? visueltHtml(boble.visuelt, ctx) : ""}
        ${boble.afterVisuelt ? `<div class="section-body"><p>${boble.afterVisuelt}</p></div>` : ""}
        ${boble.kanalNote ? `<p class="byggesten-note">${escapeHtml(boble.kanalNote)}</p>` : ""}
        ${boble.externalLink ? externalLinkHtml(boble.externalLink) : ""}
        ${boble.guideLine ? `<div class="panel guide-line"><p><strong>💬 ${boble.guideAvatar ? `${boble.guideAvatar}:` : "Guide:"}</strong> ${boble.guideLine}</p></div>` : ""}
    `;
}

function recapHtml(items) {
    return `<dl class="compass-summary">${items.map((item) => `<dt>${item.label}</dt><dd>${escapeHtml(item.value)}</dd>`).join("")}</dl>`;
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
}

/*---- Små eksempler i HTML/CSS (runde 7). Skrifttyperne sættes inline og hentes via fontvælgerens indlæser - kan de ikke hentes, står teksten i rummets egen skrift ----*/

function fontStil(font) {
    indlaesGoogleFont(font);
    return `font-family:'${escapeHtml(font)}', sans-serif;`;
}

/*---- 5.2b's retninger og 1.2's "små detaljer" - samme udtryk som i "Prøv dem sammen" ----*/
function detaljeEksempelHtml(retning) {
    switch (retning) {
        case "streg":
            return `<span class="byggesten-eks-overskrift">Overskrift</span><hr class="prov-sammen-streg">`;
        case "ramme":
            return `<blockquote class="prov-sammen-ramme">"Et citat i en fast ramme."</blockquote>`;
        case "knapper":
            return `<span class="prov-sammen-knap">Book en tid</span>`;
        case "moenster":
            return `<span class="prov-sammen-moenster" role="img" aria-label="Et gentaget mønster"></span>`;
        default:
            return "";
    }
}

function visueltHtml(visuelt, ctx = {}) {
    switch (visuelt.type) {
        /*---- 1.2: de tre slags byggesten med et lille eksempel hver ----*/
        case "byggestenIntro": {
            const eksempel = (id) => {
                if (id === "ikoner") {
                    return `<ul class="byggesten-ikonliste">${EKSEMPEL_IKONER.map((ikon) => `<li>${materialIkonHtml(ikon.navn, "enkleStreger")}<span>${ikon.tekst}</span></li>`).join("")}</ul>`;
                }
                if (id === "fonte") {
                    return visuelt.fonte.map((font) => `<p class="byggesten-eks-font" style="${fontStil(font)}">${visuelt.eksempelSaetning}</p>`).join("");
                }
                return `${detaljeEksempelHtml("streg")}${detaljeEksempelHtml("knapper")}`;
            };

            return `
                <div class="byggesten-intro">
                    ${visuelt.emner.map((emne) => `
                        <div class="byggesten-eksempel">
                            <h3 class="section-subheading">${emne.navn}</h3>
                            <div class="section-body"><p>${emne.tekst}</p></div>
                            <div class="byggesten-eksempel-vist">${eksempel(emne.eksempel)}</div>
                        </div>`).join("")}
                </div>`;
        }

        /*---- 3.5: den valgte stil med de tre eksempel-ikoner fra 3.1 ----*/
        case "ikonStil":
            return `<div class="byggesten-eksempel-vist">${ikonRaekkeHtml(visuelt.stil, { medTekst: true })}</div>`;

        /*---- 4.1: samme overskrift i tre typer skrifttyper + én linje brødtekst ----*/
        case "fontEksempler":
            return `
                <div class="byggesten-fonteksempler">
                    ${visuelt.eksempler.map((eks) => `
                        <div class="byggesten-eksempel-vist">
                            <p class="byggesten-eks-font" style="${fontStil(eks.font)}">${visuelt.overskrift}</p>
                            <p class="byggesten-eks-etiket"><strong>${eks.etiket}:</strong> ${eks.tekst}</p>
                        </div>`).join("")}
                    <p class="byggesten-eks-broedtekst" style="${fontStil(visuelt.broedtekst.font)}">${visuelt.broedtekst.tekst}</p>
                </div>`;

        /*---- 4.5: prøveteksten i brugerens brødtekstfont, i 16 px og 13 px ----*/
        case "laesbarhed": {
            const { font, farver } = ctx.laesbarhed || {};
            const farveStil = farver ? `background-color:${farver.baggrund};color:${farver.tekst};` : "";
            return `
                ${visuelt.stoerrelser.map((px) => `
                    <p class="byggesten-proeve" style="${font ? fontStil(font) : ""}${farveStil}font-size:${px}px;">${visuelt.tekst}</p>`).join("")}
                ${font ? `<p class="byggesten-proeve-label">Sat i ${escapeHtml(font)}</p>` : ""}`;
        }

        default:
            return "";
    }
}

/*---- "Gå til et andet emne" (før: "Skift fokus") - midlertidig, rum-lokal vej tilbage til 2.1 (jf. byggestenEngine.js). Samme slim-knap-placering som den gamle "Rettigheder"-knap. Forklaringen står under knappen, indtil den er brugt, eller brugeren når Modul 6 ----*/

function skiftFokusHtml(ctx) {
    if (!ctx?.visSkiftFokus) return "";
    return `
        <div class="skift-fokus">
            <button id="skift-fokus-button" type="button" class="btn btn--slim btn--outline-green"${ctx.visSkiftForklaring ? ` aria-describedby="skift-fokus-forklaring"` : ""}>${skiftEmne.knap}</button>
            ${ctx.visSkiftForklaring ? `<p id="skift-fokus-forklaring" class="skift-fokus-forklaring">${skiftEmne.forklaring}</p>` : ""}
        </div>`;
}

function renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit) {
    app.innerHTML = `
        <section class="section">
            ${ctx?.emneTaeller ? `<p class="byggesten-emnetaeller">${ctx.emneTaeller}</p>` : ""}
            ${bodyHtml}
            ${boble.imageUpload ? renderImageUploadHtml({ label: boble.imageUpload.label, hint: boble.imageUpload.hint, images: ctx?.images || [] }) : ""}
            <div id="se-ogsaa-slot"></div>
            ${boble.overgang ? `<div class="section-body byggesten-overgang"><p>${boble.overgang}</p></div>` : ""}
            <div class="section-cta">${ctaHtml}</div>
        </section>
        ${skiftFokusHtml(ctx)}
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    bindExit(onExit);

    const skiftFokusButton = document.querySelector("#skift-fokus-button");
    if (skiftFokusButton) skiftFokusButton.addEventListener("click", () => ctx.onSkiftFokus());

    if (boble.imageUpload && ctx?.imageHandlers) {
        bindImageUpload(ctx.imageHandlers);
    }

    if (boble.seOgsaa) {
        const maal = SE_OGSAA_MAAL[boble.seOgsaa.maal];
        const slot = document.querySelector("#se-ogsaa-slot");
        if (maal && slot) renderSeOgsaa(slot, { maal, navn: maal.navn, tekst: boble.seOgsaa.tekst });
    }
}

/*---- Boble 1.1 - pre-flow velkomst ----*/

function showWelcome(paragraphs, buttonText, onStart) {
    app.innerHTML = `
        <section class="section welcome-card">
            <h1 class="section-heading">Ikoner, fonte & andre grafiske byggesten</h1>
            <div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>
            <div class="section-cta">
                <button id="start-button" type="button" class="btn btn--regular btn--solid-green">${buttonText}</button>
            </div>
        </section>`;

    activateFocusTrap(app);
    document.querySelector("#start-button").addEventListener("click", onStart);
}

/*---- type: "text" - ren læseskærm. Terminale bobler (saveOutput/isExit) viser en kort ventetilstand ----*/

function showTextBoble(boble, ctx, onNext, onExit) {
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular ${boble.isExit ? "btn--outline-green" : "btn--solid-green"}">${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml: headerHtml(boble, ctx), ctaHtml }, onExit);

    const nextButton = document.querySelector("#next-button");
    nextButton.addEventListener("click", async () => {
        if (boble.saveOutput || boble.isExit) {
            nextButton.disabled = true;
            nextButton.textContent = "Gemmer...";
        }
        await onNext();
    });
}

/*---- type: "choice" - envalgskort (eller ctaButtons: stakkede knapper, der handler med det samme). Understøtter pr.-option `response` og `next`, en fælles boble-`response` (3.2), en opfølgende mini-forgrening (`followUp`, 4.2 "Et andet værktøj"), et lille eksempel på kortet (`ikonStil` i 3.1, `detaljeEksempel` i 5.2b - runde 7) og et forvalgt svar (ctx.prefill.optionId, 1.3 - runde 7) ----*/

function showChoiceBoble(boble, ctx, onNext, onExit) {
    const isCta = Boolean(boble.ctaButtons);

    const kortEksempel = (option) => {
        if (option.ikonStil) return `<span class="choice-card-eksempel">${ikonRaekkeHtml(option.ikonStil)}</span>`;
        if (option.detaljeEksempel) return `<span class="choice-card-eksempel">${detaljeEksempelHtml(option.detaljeEksempel)}</span>`;
        return "";
    };

    const optionHtml = (option) => isCta
        ? `<button type="button" class="btn btn--regular btn--outline-green" data-option-id="${option.id}">${option.text}</button>`
        : `
            <button type="button" class="choice-card choice-card--poll${kortEksempel(option) ? " choice-card--med-eksempel" : ""}" aria-pressed="false" data-option-id="${option.id}">
                <span class="choice-card-title choice-card-title--plain">${option.text}</span>
                ${kortEksempel(option)}
            </button>`;

    const bodyHtml = `
        ${headerHtml(boble, ctx)}
        <div class="${isCta ? "section-cta section-cta--column" : "choice-list"}">${boble.options.map(optionHtml).join("")}</div>
        <div id="choice-followup"></div>
        <div id="choice-response" aria-live="polite"></div>
    `;
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-green"${isCta ? " hidden" : " disabled"}>${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit);

    const optionButtons = document.querySelectorAll("[data-option-id]");
    const nextButton = document.querySelector("#next-button");
    const responseContainer = document.querySelector("#choice-response");
    const followUpContainer = document.querySelector("#choice-followup");
    let selectedOption = null;
    let selectedFollowUp = null;

    const showResponse = (text) => {
        responseContainer.innerHTML = text ? `<div class="panel"><p>${text}</p></div>` : "";
    };

    const answer = () => ({
        optionId: selectedOption.id,
        text: selectedOption.text,
        followUpId: selectedFollowUp?.id,
        forcedNext: selectedOption.next
    });

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedOption = boble.options.find((o) => o.id === button.dataset.optionId);
            selectedFollowUp = null;
            if (!selectedOption) return;

            if (isCta) {
                onNext(answer());
                return;
            }

            optionButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
            followUpContainer.innerHTML = "";

            if (selectedOption.followUp) {
                showResponse("");
                nextButton.disabled = true;
                followUpContainer.innerHTML = `
                    <p class="section-subheading">${selectedOption.followUp.spoergsmaal}</p>
                    <div class="choice-list">
                        ${selectedOption.followUp.options.map((fu) => `
                            <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-followup-id="${fu.id}">
                                <span class="choice-card-title choice-card-title--plain">${fu.text}</span>
                            </button>`).join("")}
                    </div>`;

                const followUpButtons = followUpContainer.querySelectorAll("[data-followup-id]");
                followUpButtons.forEach((fuButton) => {
                    fuButton.addEventListener("click", () => {
                        selectedFollowUp = selectedOption.followUp.options.find((fu) => fu.id === fuButton.dataset.followupId);
                        followUpButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === fuButton)));
                        showResponse(selectedFollowUp.response);
                        nextButton.disabled = false;
                    });
                });
                return;
            }

            showResponse(selectedOption.response || boble.response);
            nextButton.disabled = false;
        });
    });

    if (!isCta) {
        nextButton.addEventListener("click", () => {
            if (!selectedOption) return;
            onNext(answer());
        });

        /*---- Forvalgt svar: vises som om brugeren selv havde valgt det (markering + respons), og kan frit ændres ----*/
        const forvalgt = ctx.prefill?.optionId && [...optionButtons].find((b) => b.dataset.optionId === ctx.prefill.optionId);
        if (forvalgt) forvalgt.click();
    }
}

/*---- type: "multiChoice" - togglebare kort, forudvalgt fra tidligere svar (ctx.prefill.valgte). kraeverValg: "Næste" er slået fra, indtil mindst ét er valgt ----*/

function showMultiChoiceBoble(boble, ctx, onNext, onExit) {
    const valgte = ctx.prefill?.valgte || [];

    const optionsHtml = boble.options.map((option) => `
        <button type="button" class="choice-card choice-card--poll" aria-pressed="${valgte.includes(option.id)}" data-option-id="${option.id}">
            <span class="choice-card-title choice-card-title--plain">${option.text}</span>
        </button>`).join("");

    const bodyHtml = `${headerHtml(boble, ctx)}<div class="choice-list">${optionsHtml}</div>`;
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit);

    const optionButtons = [...document.querySelectorAll("[data-option-id]")];
    const nextButton = document.querySelector("#next-button");
    const pressed = () => optionButtons.filter((b) => b.getAttribute("aria-pressed") === "true");
    const updateNext = () => { if (boble.kraeverValg) nextButton.disabled = pressed().length === 0; };

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
            updateNext();
        });
    });
    updateNext();

    nextButton.addEventListener("click", () => {
        const selected = pressed().map((button) => {
            const option = boble.options.find((o) => o.id === button.dataset.optionId);
            return { id: option.id, text: option.text };
        });
        onNext({ selected });
    });
}

/*---- type: "fokusvalg" (2.1) - multivalg, mindst ét. "Det hele" markerer de tre andre; fjernes én af dem, slukkes "Det hele" igen ----*/

function showFokusvalgBoble(boble, ctx, onNext, onExit) {
    const valgte = ctx.prefill?.valgte || [];
    const emneOptions = boble.options.filter((o) => !o.vaelgerAlle);
    const alleValgt = emneOptions.every((o) => valgte.includes(o.id));

    const optionsHtml = boble.options.map((option) => {
        const isPressed = option.vaelgerAlle ? alleValgt : valgte.includes(option.id);
        return `
            <button type="button" class="choice-card choice-card--poll" aria-pressed="${isPressed}" data-option-id="${option.id}">
                <span class="choice-card-title choice-card-title--plain">${option.text}</span>
            </button>`;
    }).join("");

    const bodyHtml = `${headerHtml(boble, ctx)}<div class="choice-list">${optionsHtml}</div>`;
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit);

    const nextButton = document.querySelector("#next-button");
    const buttonFor = (id) => document.querySelector(`[data-option-id="${id}"]`);
    const alleButton = buttonFor(boble.options.find((o) => o.vaelgerAlle).id);
    const emneButtons = emneOptions.map((o) => buttonFor(o.id));
    const isPressed = (button) => button.getAttribute("aria-pressed") === "true";

    const sync = () => {
        alleButton.setAttribute("aria-pressed", String(emneButtons.every(isPressed)));
        nextButton.disabled = !emneButtons.some(isPressed);
    };

    emneButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.setAttribute("aria-pressed", String(!isPressed(button)));
            sync();
        });
    });

    alleButton.addEventListener("click", () => {
        const tilstand = !isPressed(alleButton);
        emneButtons.forEach((button) => button.setAttribute("aria-pressed", String(tilstand)));
        sync();
    });

    sync();

    nextButton.addEventListener("click", () => {
        onNext({ valgte: emneButtons.filter(isPressed).map((button) => button.dataset.optionId) });
    });
}

/*---- type: "eksempler" (1.4) - tre valgfrie felter + valgfri upload, eller "Jeg har ikke noget endnu" ----*/

function showEksemplerBoble(boble, ctx, onNext, onExit) {
    const eksisterende = ctx.prefill?.eksempler || [];

    const felterHtml = Array.from({ length: boble.antalFelter }, (_, i) => `
        <label class="section-subheading" for="eksempel-${i}">Sted ${i + 1}</label>
        <textarea id="eksempel-${i}" class="text-input" rows="2">${escapeHtml(eksisterende[i] || "")}</textarea>
    `).join("");

    const ctaHtml = `
        <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
        <button id="ingen-button" type="button" class="btn btn--regular btn--outline-green">Jeg har ikke noget endnu</button>`;

    renderScreen(boble, ctx, { bodyHtml: `${headerHtml(boble, ctx)}${felterHtml}<div id="ingen-response" aria-live="polite"></div>`, ctaHtml }, onExit);

    const hentEksempler = () => Array.from({ length: boble.antalFelter }, (_, i) => document.querySelector(`#eksempel-${i}`).value.trim()).filter(Boolean);

    document.querySelector("#next-button").addEventListener("click", () => onNext({ eksempler: hentEksempler() }));

    const ingenButton = document.querySelector("#ingen-button");
    ingenButton.addEventListener("click", () => {
        document.querySelector("#ingen-response").innerHTML = `<div class="panel"><p>${boble.tomTekst}</p></div>`;
        ingenButton.hidden = true;
        document.querySelector("#next-button").textContent = "Videre";
    });
}

/*---- type: "textNote" - et eller flere fritekstfelter, forudfyldt fra tidligere svar ----*/

/*---- 7.2 (runde 7): `paamindelse` står over feltet, og `eksempler` under det - et tryk lægger eksemplet i feltet, hvor det kan rettes ----*/

function showTextNoteBoble(boble, ctx, onNext, onExit) {
    const prefill = ctx?.prefill || {};

    const fieldsHtml = boble.fields.map((field) => `
        ${field.label ? `<p class="section-subheading">${field.label}</p>` : ""}
        <textarea id="field-${field.id}" class="text-input" rows="${field.rows || 3}"${field.placeholder ? ` placeholder="${field.placeholder}"` : ""}>${escapeHtml(prefill[field.id] || "")}</textarea>
    `).join("");

    const paamindelseHtml = boble.paamindelse ? `<p class="byggesten-note">${escapeHtml(boble.paamindelse)}</p>` : "";
    const eksemplerHtml = boble.eksempler?.length
        ? `<div class="choice-list byggesten-eksempelforslag">${boble.eksempler.map((eks, i) => `
            <button type="button" class="choice-card choice-card--poll" data-eksempel="${i}">
                <span class="choice-card-title choice-card-title--plain">${escapeHtml(eks)}</span>
            </button>`).join("")}</div>`
        : "";

    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml: `${headerHtml(boble, ctx)}${paamindelseHtml}${fieldsHtml}${eksemplerHtml}`, ctaHtml }, onExit);

    document.querySelectorAll("[data-eksempel]").forEach((knap) => {
        knap.addEventListener("click", () => {
            const felt = document.querySelector(`#field-${boble.fields[0].id}`);
            felt.value = boble.eksempler[Number(knap.dataset.eksempel)];
            felt.focus();
        });
    });

    document.querySelector("#next-button").addEventListener("click", () => {
        const values = {};
        boble.fields.forEach((field) => {
            values[field.id] = document.querySelector(`#field-${field.id}`).value;
        });
        onNext(values);
    });
}

/*---- type: "fontvaelger" (4.3/4.4) - selve vælgeren er en selvstændig komponent (js/components/fontvaelger.js) ----*/

function showFontvaelgerBoble(boble, ctx, onNext, onExit) {
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-green" disabled>${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml: `${headerHtml(boble, ctx)}<div id="fontvaelger-container"></div>`, ctaHtml }, onExit);

    const nextButton = document.querySelector("#next-button");
    let valgtFont = ctx.prefill?.valgt || "";
    nextButton.disabled = !valgtFont;

    renderFontvaelger(document.querySelector("#fontvaelger-container"), {
        formaal: boble.formaal,
        gemtPalet: ctx.gemtPalet,
        valgt: valgtFont,
        parFont: ctx.parFont,
        onVælg: (fontNavn) => {
            valgtFont = fontNavn;
            nextButton.disabled = !valgtFont;
        }
    });

    nextButton.addEventListener("click", () => {
        if (!valgtFont) return;
        onNext({ fontNavn: valgtFont });
    });
}

/*---- type: "provSammen" (6.1) - selve forhåndsvisningen er en selvstændig komponent (js/components/provSammen.js) ----*/

function showProvSammenBoble(boble, ctx, onNext, onExit) {
    const bodyHtml = `
        <h2 class="section-heading">${boble.heading}</h2>
        <div id="prov-sammen-container"></div>
        <div class="section-body">${(boble.paragraphs || []).map((p) => `<p>${p}</p>`).join("")}</div>
        ${ctx.recap?.length ? recapHtml(ctx.recap) : ""}
        ${boble.guideLine ? `<div class="panel guide-line"><p><strong>💬 ${boble.guideAvatar}:</strong> ${boble.guideLine}</p></div>` : ""}
    `;
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit);

    renderProvSammen(document.querySelector("#prov-sammen-container"), ctx.provSammen);

    document.querySelector("#next-button").addEventListener("click", () => onNext());
}

/*---- type: "saet" (7.1, runde 7) - oversigten med "Ret" pr. emne, "Sådan ser det ud" (6.1's forhåndsvisning i lille størrelse) og "Det skal du bruge" med "Kopiér" pr. linje ----*/

const EMNE_OVERSKRIFT = { fonte: "Fonte", ikoner: "Ikoner", andreByggesten: "Andre byggesten" };

function showSaetBoble(boble, ctx, onNext, onExit) {
    const t = boble.tekster;

    const gruppeHtml = boble.recapGrupper.map((gruppe) => `
        <div class="byggesten-saet-gruppe">
            <div class="byggesten-saet-gruppehoved">
                <h3 class="section-subheading">${EMNE_OVERSKRIFT[gruppe.emne]}</h3>
                <button type="button" class="byggesten-ret" data-ret="${gruppe.emne}" aria-label="${t.ret}: ${EMNE_OVERSKRIFT[gruppe.emne]}">${t.ret}</button>
            </div>
            ${recapHtml(gruppe.items)}
        </div>`).join("");

    const linjeHtml = (linje, i) => `
        <li class="byggesten-brug-linje">
            <span class="byggesten-brug-tekst">
                <span class="byggesten-brug-label">${escapeHtml(linje.label)}</span>
                <span class="byggesten-brug-vaerdi">
                    ${linje.farve ? `<span class="palette-swatch byggesten-brug-farve" style="background-color:${linje.farve}"></span>` : ""}
                    ${linje.url ? `<a href="${linje.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(linje.kopi)}</a>` : escapeHtml(linje.kopi)}
                </span>
            </span>
            <button type="button" class="btn btn--slim btn--outline-green" data-kopi="${i}" aria-label="${t.kopier}: ${escapeHtml(linje.kopi)}">${t.kopier}</button>
        </li>`;

    const bodyHtml = `
        <h2 class="section-heading">${boble.heading}</h2>
        ${gruppeHtml}
        ${boble.eksempelRecap?.length ? recapHtml(boble.eksempelRecap) : ""}

        <h3 class="section-subheading">${t.saadanSerDetUd}</h3>
        <div id="prov-sammen-container" class="prov-sammen-lille"></div>

        ${ctx.detSkalDuBruge.length ? `
            <h3 class="section-subheading">${t.detSkalDuBruge}</h3>
            <ul class="byggesten-brug">${ctx.detSkalDuBruge.map(linjeHtml).join("")}</ul>` : ""}
    `;
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit);

    renderProvSammen(document.querySelector("#prov-sammen-container"), ctx.provSammen);

    document.querySelectorAll("[data-ret]").forEach((knap) => {
        knap.addEventListener("click", () => ctx.onRet(knap.dataset.ret));
    });

    document.querySelectorAll("[data-kopi]").forEach((knap) => {
        knap.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(ctx.detSkalDuBruge[Number(knap.dataset.kopi)].kopi);
            } catch {
                /*---- Udklipsholderen kan være utilgængelig (fx uden for en sikker kontekst) - teksten står stadig på skærmen ----*/
                return;
            }
            knap.textContent = t.kopieret;
            setTimeout(() => { knap.textContent = t.kopier; }, 1500);
        });
    });

    document.querySelector("#next-button").addEventListener("click", () => onNext());
}

function showExitConfirmation(onStay, onExit) {
    app.innerHTML = `
        <section class="section exit-confirmation" role="dialog" aria-modal="true" aria-labelledby="exit-title" aria-describedby="exit-description">
            <h2 id="exit-title" class="section-subheading">Vil du forlade Byggesten?</h2>

            <div class="section-body">
                <p id="exit-description">Hvis du går ud nu, bliver dine svar ikke gemt.</p>
            </div>

            <div class="section-cta section-cta--column">
                <button id="stay-button" type="button" class="btn btn--regular btn--solid-green">Bliv i rummet</button>
                <button id="leave-button" type="button" class="btn btn--regular btn--solid-green">Ja, gå ud</button>
            </div>
        </section>`;

    activateFocusTrap(app);
    document.querySelector("#stay-button").addEventListener("click", onStay);
    document.querySelector("#leave-button").addEventListener("click", onExit);
}

export const RENDERERS = {
    text: showTextBoble,
    choice: showChoiceBoble,
    multiChoice: showMultiChoiceBoble,
    fokusvalg: showFokusvalgBoble,
    eksempler: showEksemplerBoble,
    textNote: showTextNoteBoble,
    fontvaelger: showFontvaelgerBoble,
    provSammen: showProvSammenBoble,
    saet: showSaetBoble
};

export { showWelcome, showExitConfirmation };
