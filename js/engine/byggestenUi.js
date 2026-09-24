import { activateFocusTrap } from "./accessibility.js";
import { renderExitDoor as renderSharedExitDoor, bindExit } from "../components/exitDoor.js";
import { renderImageUploadHtml, bindImageUpload } from "../components/imageGallery.js";
import { renderSeOgsaa } from "../components/seOgsaa.js";
import { renderFontvaelger, indlaesGoogleFont } from "../components/fontvaelger.js";
import { renderProvSammen } from "../components/provSammen.js";
import { SE_OGSAA_MAAL } from "../data/seOgsaaMaal.js";

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

/*---- "Skift fokus" - midlertidig, rum-lokal vej tilbage til 2.1 (jf. byggestenEngine.js). Samme slim-knap-placering som den gamle "Rettigheder"-knap ----*/

function skiftFokusHtml(ctx) {
    return ctx?.visSkiftFokus
        ? `<button id="skift-fokus-button" type="button" class="btn btn--slim btn--outline-green">Skift fokus</button>`
        : "";
}

function renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit) {
    app.innerHTML = `
        <section class="section">
            ${bodyHtml}
            ${boble.imageUpload ? renderImageUploadHtml({ label: boble.imageUpload.label, hint: boble.imageUpload.hint, images: ctx?.images || [] }) : ""}
            <div id="se-ogsaa-slot"></div>
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

/*---- type: "choice" - envalgskort (eller ctaButtons: stakkede knapper, der handler med det samme). Understøtter pr.-option `response` og `next`, en fælles boble-`response` (3.2), en opfølgende mini-forgrening (`followUp`, 4.2 "Et andet værktøj") og en prøvesætning i brugerens valgte font (4.5) ----*/

function showChoiceBoble(boble, ctx, onNext, onExit) {
    const isCta = Boolean(boble.ctaButtons);

    const optionHtml = (option) => isCta
        ? `<button type="button" class="btn btn--regular btn--outline-green" data-option-id="${option.id}">${option.text}</button>`
        : `
            <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-id="${option.id}">
                <span class="choice-card-title choice-card-title--plain">${option.text}</span>
            </button>`;

    const proeveHtml = boble.proeveSaetning
        ? `
            <p class="byggesten-proeve" id="proeve-saetning">${boble.proeveSaetning}</p>
            ${ctx.proeveFont ? `<p class="byggesten-proeve-label">Sat i ${escapeHtml(ctx.proeveFont)}</p>` : ""}
            ${boble.efterProeve ? `<div class="section-body"><p>${boble.efterProeve}</p></div>` : ""}`
        : "";

    const bodyHtml = `
        ${headerHtml(boble, ctx)}
        ${proeveHtml}
        <div class="${isCta ? "section-cta section-cta--column" : "choice-list"}">${boble.options.map(optionHtml).join("")}</div>
        <div id="choice-followup"></div>
        <div id="choice-response" aria-live="polite"></div>
    `;
    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-green"${isCta ? " hidden" : " disabled"}>${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml, ctaHtml }, onExit);

    if (ctx.proeveFont) {
        indlaesGoogleFont(ctx.proeveFont).then(() => {
            const el = document.querySelector("#proeve-saetning");
            if (el) el.style.fontFamily = `"${ctx.proeveFont}", sans-serif`;
        });
    }

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

/*---- type: "eksempler" (1.3) - tre valgfrie felter + valgfri upload, eller "Jeg har ikke noget endnu" ----*/

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

function showTextNoteBoble(boble, ctx, onNext, onExit) {
    const prefill = ctx?.prefill || {};

    const fieldsHtml = boble.fields.map((field) => `
        ${field.label ? `<p class="section-subheading">${field.label}</p>` : ""}
        <textarea id="field-${field.id}" class="text-input" rows="${field.rows || 3}"${field.placeholder ? ` placeholder="${field.placeholder}"` : ""}>${escapeHtml(prefill[field.id] || "")}</textarea>
    `).join("");

    const ctaHtml = `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText || "Næste"}</button>`;

    renderScreen(boble, ctx, { bodyHtml: `${headerHtml(boble, ctx)}${fieldsHtml}`, ctaHtml }, onExit);

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
    provSammen: showProvSammenBoble
};

export { showWelcome, showExitConfirmation };
