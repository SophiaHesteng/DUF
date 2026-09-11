import { activateFocusTrap } from "./accessibility.js";
import { isValidHex, contrastRatio, evaluateContrast } from "./contrast.js";
import { renderExitDoor as renderSharedExitDoor, bindExit } from "../components/exitDoor.js";
import { renderImageUploadHtml, bindImageUpload } from "../components/imageGallery.js";

const app = document.querySelector("#app");

function renderExitDoor() {
    return renderSharedExitDoor("Gå ud af Farver");
}

function showWelcome(text, onStart) {
    app.innerHTML = `
        <section class="section welcome-card">
            <h1 class="section-heading">Farver</h1>
            <div class="section-body"><p>${text}</p></div>
            <div class="section-cta">
                <button id="start-button" type="button" class="btn btn--regular btn--solid-green">Gå ind her</button>
            </div>
        </section>`;

    activateFocusTrap(app);
    document.querySelector("#start-button").addEventListener("click", onStart);
}

/*---- Ren læseskærm - bruges af de fleste rene indholdsbobler i Modul 1, 2, 5 (og feedback-trinnet i Modul 4). `examples` er en let udvidelse til Boble 1.2's tre farveudtryk vist side om side; ikke en ny skærmtype, da resten af skærmen (overskrift/paragraffer/CTA) er identisk med den almindelige tekstskærm. ----*/

function renderExamplesGrid(examples) {
    return `
        <div class="example-grid">
            ${examples.map((example) => `
                <div class="example-card">
                    <p class="example-card-label">${example.label}</p>
                    <p class="example-card-description">${example.description}</p>
                    <p class="example-card-words">${example.words}</p>
                </div>
            `).join("")}
        </div>
    `;
}

function showTextScreen({ heading, paragraphs = [], callout, examples, buttonText = "Næste" }, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>

            ${examples ? renderExamplesGrid(examples) : ""}

            <div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>

            ${callout ? `
                <div class="panel">
                    <p><strong>Myteknæk:</strong> ${callout}</p>
                </div>
            ` : ""}

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">${buttonText}</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 3, Boble 3.2 - forgrening: har brugeren selv et eksempel? ----*/

function showExampleChoice({ heading, question, yesLabel, noLabel }, onHasExample, onNoExample, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body"><p>${question}</p></div>

            <div class="choice-list">
                <button type="button" class="choice-card" id="has-example-button">
                    <span class="choice-card-title choice-card-title--plain">${yesLabel}</span>
                    <img class="choice-card-arrow" src="img/pil.svg" alt="">
                </button>
                <button type="button" class="choice-card" id="no-example-button">
                    <span class="choice-card-title choice-card-title--plain">${noLabel}</span>
                    <img class="choice-card-arrow" src="img/pil.svg" alt="">
                </button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#has-example-button").addEventListener("click", onHasExample);
    document.querySelector("#no-example-button").addEventListener("click", onNoExample);
    bindExit(onExit);
}

/*---- Modul 3, Boble 3.2 "Ja"-gren - upload af ÉT billede (genbruger imageGallery.js). "Næste" er deaktiveret, indtil præcis ét billede er gemt; engine sørger for, at et nyt upload erstatter et eventuelt tidligere (se farverEngine.js) ----*/

function showSingleImageUpload({ heading, uploadLabel, uploadHint }, images, onNext, onExit, imageHandlers) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>

            ${renderImageUploadHtml({ label: uploadLabel, hint: uploadHint, images })}

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green" ${images.length ? "" : "disabled"}>Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);

    const nextButton = document.querySelector("#next-button");
    nextButton.addEventListener("click", onNext);
    bindExit(onExit);

    bindImageUpload({
        upload: imageHandlers.upload,
        remove: imageHandlers.remove,
        refresh: async () => {
            const refreshed = await imageHandlers.refresh();
            nextButton.disabled = refreshed.length === 0;
            return refreshed;
        }
    });
}

/*---- Modul 3, Boble 3.3 - det valgte/uploadede billede + tre rene overvejelsesspørgsmål (ingen interaktion, intet gemt svar - afklaret med Heidi 2026-09-11) ----*/

function showImageReflection({ heading, intro, questions }, imageUrl, imageAlt, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            ${intro ? `<div class="section-body"><p>${intro}</p></div>` : ""}

            <img class="example-image" src="${imageUrl}" alt="${imageAlt}">

            <div class="section-body">
                <ul>${questions.map((q) => `<li>${q}</li>`).join("")}</ul>
            </div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 4, Boble 4.2-4.5 - ét delt render for "billede + flervalg", brugt fire gange med forskelligt billede/tekst-data (ikke fire kopier af samme markup). Samme togglebare kort-mønster som Overbliks showMultiChoiceQuestion (choice-card--poll), her blot med et billede over spørgsmålet. Matchet feedback beregnes af engine ud fra de valgte option-id'er, jf. den nummererede prioritering i docs/duf-manuskript-farver.md. ----*/

function showImageImpressionQuestion({ heading, image, imageAlt, question, options }, onNext, onExit) {
    const optionsHtml = options.map((option) => `
        <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-id="${option.id}">
            <span class="choice-card-title choice-card-title--plain">${option.label}</span>
        </button>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>

            <img class="example-image" src="${image}" alt="${imageAlt}">

            <p class="section-subheading">${question}</p>
            <div class="choice-list">${optionsHtml}</div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    const optionButtons = document.querySelectorAll("[data-option-id]");

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const isPressed = button.getAttribute("aria-pressed") === "true";
            button.setAttribute("aria-pressed", String(!isPressed));
        });
    });

    activateFocusTrap(app);

    document.querySelector("#next-button").addEventListener("click", () => {
        const selected = [...optionButtons]
            .filter((button) => button.getAttribute("aria-pressed") === "true")
            .map((button) => button.dataset.optionId);

        onNext(selected);
    });

    bindExit(onExit);
}

/*---- Modul 6 - farvevalg pr. rolle (hex + native farvevælger, synkroniseret) plus begrundelse ----*/

function syncColorField(role) {
    const swatch = document.querySelector(`#swatch-${role.id}`);
    const hexInput = document.querySelector(`#hex-${role.id}`);

    swatch.addEventListener("input", () => {
        hexInput.value = swatch.value;
    });

    hexInput.addEventListener("input", () => {
        if (isValidHex(hexInput.value)) {
            swatch.value = hexInput.value.startsWith("#") ? hexInput.value : `#${hexInput.value}`;
        }
    });
}

function showPaletteForm({ heading, intro, roles, closing }, onNext, onExit) {
    const roleFields = roles.map((role) => `
        <p class="section-subheading">${role.question}</p>
        <div class="color-field">
            <input type="color" id="swatch-${role.id}" class="color-field-swatch" value="${role.defaultHex}" aria-label="${role.label} - farvevælger">
            <input type="text" id="hex-${role.id}" class="text-input color-field-hex" value="${role.defaultHex}" aria-label="${role.label} - hex-kode">
        </div>
        <textarea id="reason-${role.id}" class="text-input" rows="2" placeholder="Hvorfor denne farve til ${role.label.toLowerCase()}?"></textarea>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body"><p>${intro}</p></div>

            ${roleFields}

            <div class="section-body"><p>${closing}</p></div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    roles.forEach(syncColorField);

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 7 - indbygget kontrasttjek (erstatter det eksterne Adobe-værktøj) ----*/

function updateContrastResult(modul7) {
    const textHex = document.querySelector("#hex-text").value;
    const bgHex = document.querySelector("#hex-bg").value;
    const resultEl = document.querySelector("#contrast-result");

    if (!isValidHex(textHex) || !isValidHex(bgHex)) {
        resultEl.innerHTML = `<p>Indtast to gyldige hex-koder for at se kontrasten.</p>`;
        return;
    }

    const ratio = contrastRatio(textHex, bgHex);
    const { passesNormalText, passesLargeText } = evaluateContrast(ratio);

    resultEl.innerHTML = `
        <p><strong>Kontrastforhold: ${ratio.toFixed(2)} : 1</strong></p>
        <p>${passesNormalText ? "✓ Lever op til WCAG AA for almindelig tekst" : "✗ Lever ikke op til WCAG AA for almindelig tekst (kræver 4.5:1)"}</p>
        <p>${passesLargeText ? "✓ Lever op til WCAG AA for stor tekst" : "✗ Lever ikke op til WCAG AA for stor tekst (kræver 3:1)"}</p>
        <p>${passesNormalText ? modul7.passText : modul7.failText}</p>
    `;
}

function showContrastCheck(modul7, defaults, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul7.heading}</h2>
            <div class="section-body"><p>${modul7.intro}</p></div>

            <p class="section-subheading">Tekstfarve</p>
            <div class="color-field">
                <input type="color" id="swatch-text" class="color-field-swatch" value="${defaults.text}" aria-label="Tekstfarve - farvevælger">
                <input type="text" id="hex-text" class="text-input color-field-hex" value="${defaults.text}" aria-label="Tekstfarve - hex-kode">
            </div>

            <p class="section-subheading">Baggrundsfarve</p>
            <div class="color-field">
                <input type="color" id="swatch-bg" class="color-field-swatch" value="${defaults.background}" aria-label="Baggrundsfarve - farvevælger">
                <input type="text" id="hex-bg" class="text-input color-field-hex" value="${defaults.background}" aria-label="Baggrundsfarve - hex-kode">
            </div>

            <div class="panel" id="contrast-result"></div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    const swatchText = document.querySelector("#swatch-text");
    const hexText = document.querySelector("#hex-text");
    const swatchBg = document.querySelector("#swatch-bg");
    const hexBg = document.querySelector("#hex-bg");

    swatchText.addEventListener("input", () => { hexText.value = swatchText.value; updateContrastResult(modul7); });
    swatchBg.addEventListener("input", () => { hexBg.value = swatchBg.value; updateContrastResult(modul7); });
    hexText.addEventListener("input", () => {
        if (isValidHex(hexText.value)) swatchText.value = hexText.value.startsWith("#") ? hexText.value : `#${hexText.value}`;
        updateContrastResult(modul7);
    });
    hexBg.addEventListener("input", () => {
        if (isValidHex(hexBg.value)) swatchBg.value = hexBg.value.startsWith("#") ? hexBg.value : `#${hexBg.value}`;
        updateContrastResult(modul7);
    });

    updateContrastResult(modul7);

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 8 - afprøvning og dokumentation, forudfyldt fra Modul 6's paletvalg ----*/

function showDocumentation(modul8, palette, draftText, onFinish, onExit) {
    const swatchesHtml = palette.map((p) => `
        <div class="color-field">
            <span class="color-field-swatch" style="background-color:${p.hex}; display:inline-block; cursor:default;"></span>
            <span>${p.label}: ${p.hex}</span>
        </div>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul8.heading}</h2>
            <div class="section-body"><p>${modul8.intro}</p></div>

            <div class="panel">${swatchesHtml}</div>

            <p class="section-subheading">${modul8.documentationLabel}</p>
            <textarea id="documentation-input" class="text-input" rows="4">${draftText}</textarea>

            <div class="section-body"><p>${modul8.closing}</p></div>

            <div class="section-cta">
                <button id="finish-button" type="button" class="btn btn--regular btn--outline-green">Gem og fortsæt i Visuelt udtryk</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);

    const finishButton = document.querySelector("#finish-button");
    finishButton.addEventListener("click", async () => {
        finishButton.disabled = true;
        finishButton.textContent = "Gemmer...";
        await onFinish();
    });

    bindExit(onExit);
}

function showExitConfirmation(onStay, onExit) {
    app.innerHTML = `
        <section class="section exit-confirmation" role="dialog" aria-modal="true" aria-labelledby="exit-title" aria-describedby="exit-description">
            <h2 id="exit-title" class="section-subheading">Vil du forlade Farver?</h2>

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

export {
    showWelcome,
    showTextScreen,
    showExampleChoice,
    showSingleImageUpload,
    showImageReflection,
    showImageImpressionQuestion,
    showPaletteForm,
    showContrastCheck,
    showDocumentation,
    showExitConfirmation
};
