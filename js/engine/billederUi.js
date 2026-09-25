import { activateFocusTrap } from "./accessibility.js";
import { renderExitDoor as renderSharedExitDoor } from "../components/exitDoor.js";
import { imageGalleryHtml, renderImageUploadHtml, bindImageUpload } from "../components/imageGallery.js";
import { renderTjekliste } from "../components/tjekliste.js";

const app = document.querySelector("#app");

function renderExitDoor() {
    return renderSharedExitDoor("Gå ud af Billeder");
}

function renderReferenceButton() {
    return `
        <a id="reference-button" href="#" class="btn btn--slim btn--outline-green">
            <i class="fa-solid fa-scale-balanced" aria-hidden="true"></i>
            Rettigheder
        </a>
    `;
}

function bindChrome(onExit, onReference) {
    const exitButton = document.querySelector("#exit-button");
    if (exitButton) exitButton.addEventListener("click", onExit);

    const referenceButton = document.querySelector("#reference-button");
    if (referenceButton && onReference) {
        referenceButton.addEventListener("click", (event) => {
            event.preventDefault();
            onReference();
        });
    }
}

function situationsAccordionHtml(situationer) {
    return situationer.map((situation, index) => `
        <div class="accordion-item" data-open="false">
            <button class="accordion-trigger" aria-expanded="false" aria-controls="situation-panel-${index}">
                <span>${situation.title}</span>
                <img class="accordion-icon" src="img/accordion-closed.svg" alt="">
            </button>
            <div class="accordion-panel" id="situation-panel-${index}" hidden>
                <p>${situation.text}</p>
            </div>
        </div>
    `).join("");
}

function bindAccordions() {
    document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const item = trigger.closest(".accordion-item");
            const panel = item.querySelector(".accordion-panel");
            const icon = trigger.querySelector(".accordion-icon");
            const isOpen = trigger.getAttribute("aria-expanded") === "true";

            trigger.setAttribute("aria-expanded", String(!isOpen));
            item.dataset.open = String(!isOpen);
            panel.hidden = isOpen;
            icon.src = isOpen ? "img/accordion-closed.svg" : "img/accordion-open.svg";
        });
    });
}

function showWelcome(text, onStart) {
    app.innerHTML = `
        <section class="section welcome-card">
            <h1 class="section-heading">Billeder</h1>
            <div class="section-body"><p>${text}</p></div>
            <div class="section-cta">
                <button id="start-button" type="button" class="btn btn--regular btn--solid-green">Gå ind her</button>
            </div>
        </section>`;

    activateFocusTrap(app);
    document.querySelector("#start-button").addEventListener("click", onStart);
}

/*---- Fast opslagsværk - tilgængeligt fra enhver boble fra Modul 2 og frem ----*/

function showReference(situationer, onBack) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">Billedrettigheder — praktisk oversigt</h2>
            <div class="choice-list">${situationsAccordionHtml(situationer)}</div>
            <div class="section-cta">
                <button id="back-button" type="button" class="btn btn--regular btn--outline-green">Tilbage</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    bindAccordions();
    activateFocusTrap(app);
    document.querySelector("#back-button").addEventListener("click", onBack);
}

function showExitConfirmation(onStay, onExit) {
    app.innerHTML = `
        <section class="section exit-confirmation" role="dialog" aria-modal="true" aria-labelledby="exit-title" aria-describedby="exit-description">
            <h2 id="exit-title" class="section-subheading">Vil du forlade Billeder?</h2>

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

/*----------------------------------------------------------------------------
 * Bobler - én genbrugelig render-funktion pr. `type` i js/data/billeder.js,
 * i stedet for én funktion pr. skærm. Se docs/duf-manuskript-billeder.md.
 * ----------------------------------------------------------------------------
 */

function headerHtml(boble) {
    return `
        <h2 class="section-heading">${boble.heading}</h2>
        <div class="section-body">
            ${(boble.paragraphs || []).map((p) => `<p>${p}</p>`).join("")}
            ${boble.list ? `<ul>${boble.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
            ${boble.afterList ? `<p>${boble.afterList}</p>` : ""}
        </div>
        ${boble.guideLine ? `
            <div class="panel guide-line">
                <p><strong>Guide:</strong> ${boble.guideLine}</p>
            </div>
        ` : ""}
    `;
}

function renderScreen({ bodyHtml, ctaHtml }, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            ${bodyHtml}
            <div class="section-cta">${ctaHtml}</div>
        </section>
        ${onReference ? renderReferenceButton() : ""}
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    bindChrome(onExit, onReference);
}

/*---- type: "text" - ren læseskærm, med valgfri billedgalleri-visning (Modul 3.3/4.5), 💬-guide-linje, og valgfrit "isFinal"-slutknap-udseende (Modul 8.3) ----*/

function showTextBoble(boble, images, onNext, onExit, onReference) {
    const galleryHtml = images
        ? `<div class="image-gallery-view">${imageGalleryHtml(images)}</div>`
        : "";

    renderScreen({
        bodyHtml: `${headerHtml(boble)}${galleryHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular ${boble.isFinal ? "btn--outline-green" : "btn--solid-green"}">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    const nextButton = document.querySelector("#next-button");
    nextButton.addEventListener("click", async () => {
        if (boble.isFinal) {
            nextButton.disabled = true;
            nextButton.textContent = "Gemmer...";
        }
        await onNext();
    });
}

/*---- type: "choice" - envalgskort + eksplicit "Videre"-knap (aktiveres først ved valg). Understøtter valgfrit fritekstfelt for ét bestemt svar (freeTextOptionId, Modul 6.2), og et panel der afsløres for ét bestemt svar (revealOnOptionId, Modul 7.5) ----*/

function showChoiceBoble(boble, onNext, onExit, onReference) {
    const optionsHtml = boble.options.map((option) => `
        <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-id="${option.id}">
            <span class="choice-card-body">
                <span class="choice-card-title choice-card-title--plain">${option.text}</span>
                ${option.description ? `<span class="choice-card-description">${option.description}</span>` : ""}
            </span>
        </button>
    `).join("");

    const freeTextHtml = boble.freeTextOptionId
        ? `<textarea id="choice-freetext" class="text-input" rows="2" placeholder="${boble.freeTextPlaceholder || ""}" hidden></textarea>`
        : "";

    const revealHtml = boble.revealOnOptionId
        ? `<div class="panel" id="choice-reveal" hidden><p>${boble.revealText}</p></div>`
        : "";

    renderScreen({
        bodyHtml: `${headerHtml(boble)}<div class="choice-list">${optionsHtml}</div>${freeTextHtml}${revealHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green" disabled>${boble.nextButtonText}</button>`
    }, onExit, onReference);

    const optionButtons = document.querySelectorAll("[data-option-id]");
    const nextButton = document.querySelector("#next-button");
    const freeText = document.querySelector("#choice-freetext");
    const reveal = document.querySelector("#choice-reveal");
    let selectedId = null;

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            optionButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
            selectedId = button.dataset.optionId;
            nextButton.disabled = false;

            if (freeText) freeText.hidden = selectedId !== boble.freeTextOptionId;
            if (reveal) reveal.hidden = selectedId !== boble.revealOnOptionId;
        });
    });

    nextButton.addEventListener("click", () => {
        const answer = (freeText && selectedId === boble.freeTextOptionId)
            ? { optionId: selectedId, text: freeText.value }
            : selectedId;

        onNext(answer);
    });
}

/*---- type: "multiChoice" - togglebare kort (samme "Stemmepunkt"-mønster som Overbliks flervalgsspørgsmål), valgfri fritekst-note, og valgfrit loft over antal valg (maxSelect, Modul 5.4) ----*/

function showMultiChoiceBoble(boble, onNext, onExit, onReference) {
    const optionsHtml = boble.options.map((option, index) => `
        <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-index="${index}">
            <span class="choice-card-body">
                <span class="choice-card-title choice-card-title--plain">${option.text}</span>
                ${option.description ? `<span class="choice-card-description">${option.description}</span>` : ""}
            </span>
        </button>
    `).join("");

    const noteHtml = boble.allowNote
        ? `<textarea id="multichoice-note" class="text-input" rows="2" placeholder="${boble.notePlaceholder || ""}"></textarea>`
        : "";

    const resultHtml = boble.resultHeading
        ? `<p class="section-subheading">${boble.resultHeading}</p><p class="section-body" id="multichoice-result"></p>`
        : "";

    renderScreen({
        bodyHtml: `${headerHtml(boble)}<div class="choice-list">${optionsHtml}</div>${noteHtml}${resultHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    const optionButtons = document.querySelectorAll("[data-option-index]");
    const noteField = document.querySelector("#multichoice-note");
    const resultField = document.querySelector("#multichoice-result");

    function updateResult() {
        if (!resultField) return;

        const chosen = [...optionButtons]
            .filter((button) => button.getAttribute("aria-pressed") === "true")
            .map((button) => boble.options[Number(button.dataset.optionIndex)].text);

        if (noteField?.value) chosen.push(noteField.value);

        resultField.textContent = chosen.join(", ");
    }

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const isPressed = button.getAttribute("aria-pressed") === "true";

            if (!isPressed && boble.maxSelect) {
                const pressedCount = [...optionButtons].filter((b) => b.getAttribute("aria-pressed") === "true").length;
                if (pressedCount >= boble.maxSelect) return;
            }

            button.setAttribute("aria-pressed", String(!isPressed));
            updateResult();
        });
    });

    noteField?.addEventListener("input", updateResult);

    document.querySelector("#next-button").addEventListener("click", () => {
        const selected = [...optionButtons]
            .filter((button) => button.getAttribute("aria-pressed") === "true")
            .map((button) => boble.options[Number(button.dataset.optionIndex)].id);

        const note = document.querySelector("#multichoice-note")?.value || "";

        onNext({ selected, note });
    });
}

/*---- type: "textNote" - ét eller flere fritekstfelter. Modul 8.2 forudfyldes med en tekst bygget af engine ud fra det visuelle kompas (prefillText) ----*/

function showTextNoteBoble(boble, prefillText, onNext, onExit, onReference) {
    const fieldsHtml = boble.fields.map((field) => `
        ${field.label ? `<p class="section-subheading">${field.label}</p>` : ""}
        <textarea id="field-${field.id}" class="text-input" rows="${field.rows || 3}" placeholder="${field.placeholder || ""}">${prefillText && boble.prefillFrom ? prefillText : ""}</textarea>
    `).join("");

    renderScreen({
        bodyHtml: `${headerHtml(boble)}${fieldsHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    document.querySelector("#next-button").addEventListener("click", () => {
        const values = {};
        boble.fields.forEach((field) => {
            values[field.id] = document.querySelector(`#field-${field.id}`).value;
        });
        onNext(values);
    });
}

/*---- type: "imageUpload" - genbruger det delte billedgalleri-komponent. Understøtter et minimumsantal, før "Videre" aktiveres (minImages, Modul 4.4) ----*/

function showImageUploadBoble(boble, images, onNext, onExit, onReference, imageHandlers) {
    const minImages = boble.minImages || 0;
    const meetsMin = images.length >= minImages;

    renderScreen({
        bodyHtml: `
            ${headerHtml(boble)}
            ${renderImageUploadHtml({ label: boble.uploadLabel, hint: boble.uploadHint, images })}
            ${minImages && !meetsMin ? `<p class="section-body upload-gated-hint">${boble.gatedHint || ""}</p>` : ""}
        `,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green" ${minImages && !meetsMin ? "disabled" : ""}>${boble.nextButtonText}</button>`
    }, onExit, onReference);

    bindImageUpload({
        ...imageHandlers,
        refresh: async () => {
            const updated = await imageHandlers.refresh();
            const nextButton = document.querySelector("#next-button");
            const hint = document.querySelector(".upload-gated-hint");
            const nowMeetsMin = updated.length >= minImages;

            if (nextButton) nextButton.disabled = minImages > 0 && !nowMeetsMin;
            if (hint) hint.style.display = nowMeetsMin ? "none" : "";

            return updated;
        }
    });

    document.querySelector("#next-button").addEventListener("click", () => onNext());
}

/*---- type: "keywordPicker" - grupperede søgeord (Modul 4.2). Klik vælger og kopierer til udklipsholder, et nyt klik fravælger igen. De valgte ord sendes med til motoren, som gemmer dem under boblens answerKey ----*/

function showKeywordPickerBoble(boble, onNext, onExit, onReference) {
    const groupsHtml = boble.groups.map((group) => `
        <p class="section-subheading">${group.label}</p>
        <div class="keyword-list">
            ${group.words.map((word) => `<button type="button" class="keyword-chip" aria-pressed="false" data-word="${word}">${word}</button>`).join("")}
        </div>
    `).join("");

    renderScreen({
        bodyHtml: `${headerHtml(boble)}${groupsHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    const chips = [...document.querySelectorAll(".keyword-chip")];

    chips.forEach((chip) => {
        chip.addEventListener("click", async () => {
            const erValgt = chip.classList.toggle("is-copied");
            chip.setAttribute("aria-pressed", String(erValgt));
            if (!erValgt) return;

            try {
                await navigator.clipboard.writeText(chip.dataset.word);
            } catch {
                /*---- Udklipsholder kan være utilgængelig (fx uden for en sikker kontekst) - kopiering er en bekvemmelighed, ikke et krav for at komme videre ----*/
            }
        });
    });

    document.querySelector("#next-button").addEventListener("click", () => {
        onNext(chips.filter((chip) => chip.classList.contains("is-copied")).map((chip) => chip.dataset.word));
    });
}

/*---- type: "checklist" - Modul 7.2, genbruger den delte Tjekliste-komponent ----*/

function showChecklistBoble(boble, onNext, onExit, onReference) {
    renderScreen({
        bodyHtml: `${headerHtml(boble)}<div id="tjekliste-container"></div>`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    renderTjekliste(document.querySelector("#tjekliste-container"), {
        gemNoegle: boble.gemNoegle,
        punkter: boble.punkter,
        titel: boble.tjeklisteTitel,
        afslutning: boble.tjeklisteAfslutning
    });

    document.querySelector("#next-button").addEventListener("click", () => onNext());
}

/*---- type: "paletteCompare" - Modul 6.4, viser en gemt Farver-palet til sammenligning hvis den findes, ellers kun et "spring over" ----*/

function showPaletteCompareBoble(boble, farverOutput, onNext, onExit, onReference) {
    const palette = farverOutput?.data?.palette;
    const hasPalette = Boolean(palette?.length);

    const paletteHtml = hasPalette
        ? `<div class="palette-preview">${palette.map((color) => `<span class="palette-swatch" style="background-color:${color.hex}" title="${color.role || color.hex}"></span>`).join("")}</div>`
        : "";

    const optionsHtml = hasPalette
        ? `<div class="choice-list">${boble.options.map((option) => `
            <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-id="${option.id}">
                <span class="choice-card-title choice-card-title--plain">${option.text}</span>
            </button>
        `).join("")}</div>`
        : "";

    const ctaHtml = hasPalette
        ? `<button id="next-button" type="button" class="btn btn--regular btn--solid-green" disabled>${boble.nextButtonText}</button>`
        : `<button id="skip-button" type="button" class="btn btn--regular btn--outline-green">${boble.skipButtonText}</button>`;

    renderScreen({
        bodyHtml: `${headerHtml(boble)}${paletteHtml}${optionsHtml}`,
        ctaHtml
    }, onExit, onReference);

    if (hasPalette) {
        const optionButtons = document.querySelectorAll("[data-option-id]");
        const nextButton = document.querySelector("#next-button");
        let selectedId = null;

        optionButtons.forEach((button) => {
            button.addEventListener("click", () => {
                optionButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
                selectedId = button.dataset.optionId;
                nextButton.disabled = false;
            });
        });

        nextButton.addEventListener("click", () => onNext(selectedId));
    } else {
        document.querySelector("#skip-button").addEventListener("click", () => onNext(null));
    }
}

/*---- type: "compassSummary" - Modul 6.5, ren visning af det, engine har samlet op i this.answers ----*/

function showCompassSummaryBoble(boble, summaryItems, onNext, onExit, onReference) {
    const itemsHtml = summaryItems.length
        ? `<dl class="compass-summary">${summaryItems.map((item) => `<dt>${item.label}</dt><dd>${item.value}</dd>`).join("")}</dl>`
        : `<p class="section-body">Du har endnu ikke svaret på nok undervejs til at vise et fuldt kompas her.</p>`;

    renderScreen({
        bodyHtml: `${headerHtml(boble)}${itemsHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    document.querySelector("#next-button").addEventListener("click", () => onNext());
}

export const RENDERERS = {
    text: showTextBoble,
    choice: showChoiceBoble,
    multiChoice: showMultiChoiceBoble,
    textNote: showTextNoteBoble,
    imageUpload: showImageUploadBoble,
    keywordPicker: showKeywordPickerBoble,
    checklist: showChecklistBoble,
    paletteCompare: showPaletteCompareBoble,
    compassSummary: showCompassSummaryBoble
};

export {
    showWelcome,
    showReference,
    showExitConfirmation
};
