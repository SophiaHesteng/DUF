import { activateFocusTrap } from "./accessibility.js";

const app = document.querySelector("#app");

function renderExitDoor() {
    return `
        <button id="exit-button" aria-label="Gå ud af Ikoner, fonte & andre grafiske byggesten">
            <i class="fa-solid fa-door-closed closed-door" aria-hidden="true"></i>
            <i class="fa-solid fa-door-open open-door" aria-hidden="true"></i>
        </button>
    `;
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
            <h1 class="section-heading">Ikoner, fonte & andre grafiske byggesten</h1>
            <div class="section-body"><p>${text}</p></div>
            <div class="section-cta">
                <button id="start-button" type="button" class="btn btn--regular btn--solid-green">Gå ind her</button>
            </div>
        </section>`;

    activateFocusTrap(app);
    document.querySelector("#start-button").addEventListener("click", onStart);
}

/*---- Ren læseskærm, med valgfri myteknæk-boks ----*/

function showTextScreen({ heading, paragraphs = [], callout, buttonText = "Næste" }, onNext, onExit, onReference) {
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
        ${onReference ? renderReferenceButton() : ""}
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindChrome(onExit, onReference);
}

/*---- Modul 2 - forgrening: har brugeren eksempler at samle op på? ----*/

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
    bindChrome(onExit);
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
    bindChrome(onExit);
}

function showExamplesForm({ heading, exampleIntro, reflectionQuestions }, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body"><p>${exampleIntro}</p></div>

            <textarea id="examples-input" class="text-input" rows="4" placeholder="Fx: hjemmeside, sociale medier, dokumenter til klienter ..."></textarea>

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
    bindChrome(onExit);
}

/*---- Modul 3 - rettighedsintro med udfoldelig oversigt over de fem situationer ----*/

function showRettighedsIntro(modul3, situationer, onNext, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul3.heading}</h2>
            <div class="section-body"><p>${modul3.intro}</p></div>

            <p class="section-subheading">Tre spørgsmål, du altid skal kunne svare på:</p>
            <div class="section-body">
                <ul>${modul3.altidSporgsmaal.map((q) => `<li>${q}</li>`).join("")}</ul>
            </div>

            <div class="choice-list">${situationsAccordionHtml(situationer)}</div>

            <div class="panel">
                <p><strong>Vigtigt at vide:</strong> ${modul3.vigtigtAtVide}</p>
            </div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${onReference ? renderReferenceButton() : ""}
        ${renderExitDoor()}`;

    bindAccordions();
    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindChrome(onExit, onReference);
}

/*---- Fast opslagsværk - samme fem situationer, tilgængeligt fra enhver skærm fra Modul 3 og frem ----*/

function showReference(situationer, onBack) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">Ikonrettigheder — praktisk oversigt</h2>
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

/*---- Generisk formular med et sæt frie tekstfelter - bruges til Modul 3's stilspørgsmål, Modul 4 og Modul 5 ----*/

function showFieldsForm({ heading, intro, fields, closing }, onNext, onExit, onReference) {
    const fieldsHtml = fields.map((field) => `
        <p class="section-subheading">${field.label}</p>
        <textarea id="field-${field.id}" class="text-input" rows="2"></textarea>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body"><p>${intro}</p></div>

            ${fieldsHtml}

            ${closing ? `<div class="section-body"><p>${closing}</p></div>` : ""}

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${onReference ? renderReferenceButton() : ""}
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindChrome(onExit, onReference);
}

/*---- Modul 7 - selvvurderet tjekliste (togglekort, ikke låst adgang) ----*/

function showChecklist(modul7, onNext, onExit, onReference) {
    const itemsHtml = modul7.checklist.map((text, index) => `
        <button type="button" class="choice-card choice-card--poll" data-checklist-item="${index}" aria-pressed="false">
            <span class="choice-card-title choice-card-title--plain">${text}</span>
            <img class="choice-card-arrow" src="img/pil.svg" alt="">
        </button>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul7.heading}</h2>
            <div class="section-body"><p>${modul7.intro}</p></div>

            <p class="section-subheading">Marker det, der allerede fungerer:</p>
            <div class="choice-list">${itemsHtml}</div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${onReference ? renderReferenceButton() : ""}
        ${renderExitDoor()}`;

    document.querySelectorAll("[data-checklist-item]").forEach((item) => {
        item.addEventListener("click", () => {
            const isPressed = item.getAttribute("aria-pressed") === "true";
            item.setAttribute("aria-pressed", String(!isPressed));
        });
    });

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindChrome(onExit, onReference);
}

function showReassurance(text, onContinue, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            <div class="section-body"><p>${text}</p></div>
            <div class="section-cta">
                <button id="continue-button" type="button" class="btn btn--regular btn--solid-green">Fortsæt</button>
            </div>
        </section>
        ${onReference ? renderReferenceButton() : ""}
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#continue-button").addEventListener("click", onContinue);
    bindChrome(onExit, onReference);
}

/*---- Modul 8 - dokumentation, forudfyldt ud fra Modul 3-5's valg ----*/

function showDocumentation(modul8, draftText, onFinish, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul8.heading}</h2>
            <div class="section-body"><p>${modul8.intro}</p></div>

            <p class="section-subheading">${modul8.documentationLabel}</p>
            <textarea id="documentation-input" class="text-input" rows="4">${draftText}</textarea>

            <div class="section-body"><p>${modul8.closing}</p></div>

            <div class="section-cta">
                <button id="finish-button" type="button" class="btn btn--regular btn--outline-green">Gem og tilbage til Vælg din dør</button>
            </div>
        </section>
        ${onReference ? renderReferenceButton() : ""}
        ${renderExitDoor()}`;

    activateFocusTrap(app);

    const finishButton = document.querySelector("#finish-button");
    finishButton.addEventListener("click", async () => {
        finishButton.disabled = true;
        finishButton.textContent = "Gemmer...";
        await onFinish();
    });

    bindChrome(onExit, onReference);
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

export {
    showWelcome,
    showTextScreen,
    showExamplesBranch,
    showExamplesSkip,
    showExamplesForm,
    showRettighedsIntro,
    showReference,
    showFieldsForm,
    showChecklist,
    showReassurance,
    showDocumentation,
    showExitConfirmation
};
