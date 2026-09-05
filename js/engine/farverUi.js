import { activateFocusTrap } from "./accessibility.js";
import { isValidHex, contrastRatio, evaluateContrast } from "./contrast.js";

const app = document.querySelector("#app");

function renderExitDoor() {
    return `
        <button id="exit-button" aria-label="Gå ud af Farver">
            <i class="fa-solid fa-door-closed closed-door" aria-hidden="true"></i>
            <i class="fa-solid fa-door-open open-door" aria-hidden="true"></i>
        </button>
    `;
}

function bindExit(onExit) {
    const exitButton = document.querySelector("#exit-button");
    if (exitButton) exitButton.addEventListener("click", onExit);
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

/*---- Ren læseskærm, med valgfri myteknæk-boks (Modul 1) ----*/

function showTextScreen({ heading, paragraphs = [], callout, buttonText = "Næste" }, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>

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

/*---- Modul 3 - forgrening: har brugeren eksempler at samle op på? ----*/

function showExamplesBranch({ heading, intro }, onHasExamples, onNoExamples, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body"><p>${intro}</p></div>

            <div class="choice-list">
                <button type="button" class="choice-card" id="has-examples-button">
                    <span class="choice-card-title choice-card-title--plain">Ja, jeg har eksempler</span>
                    <img class="choice-card-arrow" src="img/pil.svg" alt="">
                </button>
                <button type="button" class="choice-card" id="no-examples-button">
                    <span class="choice-card-title choice-card-title--plain">Nej, ikke endnu</span>
                    <img class="choice-card-arrow" src="img/pil.svg" alt="">
                </button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#has-examples-button").addEventListener("click", onHasExamples);
    document.querySelector("#no-examples-button").addEventListener("click", onNoExamples);
    bindExit(onExit);
}

function showExamplesSkip(skipText, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <div class="section-body"><p>${skipText}</p></div>
            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

function showExamplesForm({ heading, intro, reflectionQuestions }, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body"><p>${intro}</p></div>

            <textarea id="examples-input" class="text-input" rows="4" placeholder="Fx: hjemmeside, logo, opslag på sociale medier ..."></textarea>

            ${reflectionQuestions.map((q, i) => `
                <p class="section-subheading">${q}</p>
                <textarea id="reflection-${i}" class="text-input" rows="2"></textarea>
            `).join("")}

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 4 - op til tre andre praksisser, hver med samme tre spørgsmål samlet i ét fritekstfelt ----*/

function showInspirationForm({ heading, intro, perPraksisQuestions, closing }, onNext, onExit) {
    const hint = perPraksisQuestions.join(" · ");

    const praksisFields = [1, 2, 3].map((n) => `
        <p class="section-subheading">Praksis ${n}${n === 3 ? " (valgfrit)" : ""}</p>
        <textarea id="praksis-${n}" class="text-input" rows="3" placeholder="${hint}"></textarea>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body"><p>${intro}</p></div>

            ${praksisFields}

            <div class="section-body"><p>${closing}</p></div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
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
                <a href="vaelg-din-dor.html" class="btn btn--regular btn--outline-green">Tilbage til Vælg din dør</a>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
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
    showExamplesBranch,
    showExamplesSkip,
    showExamplesForm,
    showInspirationForm,
    showPaletteForm,
    showContrastCheck,
    showDocumentation,
    showExitConfirmation
};
