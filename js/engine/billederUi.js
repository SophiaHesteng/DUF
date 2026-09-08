import { activateFocusTrap } from "./accessibility.js";
import { renderExitDoor as renderSharedExitDoor } from "../components/exitDoor.js";
import { imageGalleryHtml, renderImageUploadHtml, bindImageUpload } from "../components/imageGallery.js";

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

/*---- Ren læseskærm, med valgfri myteknæk-boks (Modul 1) ----*/

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

/*---- Modul 2 - rettighedsintro med udfoldelig oversigt over de fire situationer ----*/

function showRettighedsIntro(modul2, situationer, onNext, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul2.heading}</h2>
            <div class="section-body"><p>${modul2.intro}</p></div>

            <p class="section-subheading">To spørgsmål, du altid skal kunne svare på:</p>
            <div class="section-body">
                <ul>${modul2.altidSporgsmaal.map((q) => `<li>${q}</li>`).join("")}</ul>
            </div>

            <div class="choice-list">${situationsAccordionHtml(situationer)}</div>

            <div class="panel">
                <p><strong>Vigtigt at vide:</strong> ${modul2.vigtigtAtVide}</p>
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

/*---- Fast opslagsværk - samme fire situationer, tilgængeligt fra enhver skærm fra Modul 2 og frem ----*/

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

/*---- Generisk spørgsmål med valgkort ----*/

function showChoiceQuestion({ question, options }, onAnswerSelected, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${question}</h2>
            <div class="answers choice-list"></div>
        </section>
        ${onReference ? renderReferenceButton() : ""}
        ${renderExitDoor()}`;

    const answersContainer = document.querySelector(".answers");

    for (const option of options) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "choice-card";
        button.innerHTML = `
            <span class="choice-card-title choice-card-title--plain">${option.text}</span>
            <img class="choice-card-arrow" src="img/pil.svg" alt="">
        `;
        answersContainer.appendChild(button);
        button.addEventListener("click", () => onAnswerSelected(option.id));
    }

    activateFocusTrap(app);
    bindChrome(onExit, onReference);
}

function showValidationOffer(modul3, onTest, onFull, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            <div class="section-body"><p>${modul3.valideringsSkaermtekst}</p></div>
            <div class="section-cta section-cta--column">
                <button id="test-button" type="button" class="btn btn--regular btn--solid-green">${modul3.valideringsKnapTest}</button>
                <button id="full-button" type="button" class="btn btn--regular btn--outline-green">${modul3.valideringsKnapFuld}</button>
            </div>
        </section>
        ${onReference ? renderReferenceButton() : ""}
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#test-button").addEventListener("click", onTest);
    document.querySelector("#full-button").addEventListener("click", onFull);
    bindChrome(onExit, onReference);
}

function showExamplesSkip(skipText, onNext, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            <div class="section-body"><p>${skipText}</p></div>
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

function showExamplesForm({ heading, exampleIntro, reflectionQuestions, uploadLabel, uploadHint }, images, onNext, onExit, onReference, imageHandlers = {}) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body"><p>${exampleIntro}</p></div>

            <textarea id="examples-input" class="text-input" rows="4" placeholder="Fx: hjemmeside, sociale medier, tryksager ..."></textarea>

            ${renderImageUploadHtml({ label: uploadLabel, hint: uploadHint, images })}

            ${reflectionQuestions.map((q, i) => `
                <p class="section-subheading">${q}</p>
                <textarea id="reflection-${i}" class="text-input" rows="2"></textarea>
            `).join("")}

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${onReference ? renderReferenceButton() : ""}
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindChrome(onExit, onReference);
    bindImageUpload(imageHandlers);
}

/*---- Modul 4 - op til tre andre praksisser, hver med samme tre spørgsmål samlet i ét fritekstfelt ----*/

function showInspirationForm(modul4, onNext, onExit, onReference) {
    const hint = modul4.perPraksisQuestions.join(" · ");

    const praksisFields = [1, 2, 3].map((n) => `
        <p class="section-subheading">Praksis ${n}${n === 3 ? " (valgfrit)" : ""}</p>
        <textarea id="praksis-${n}" class="text-input" rows="3" placeholder="${hint}"></textarea>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul4.heading}</h2>
            <div class="section-body"><p>${modul4.intro}</p></div>

            ${praksisFields}

            <div class="section-body"><p>${modul4.closing}</p></div>

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

/*---- Modul 6 - tre åbne kriterier for billedretningen ----*/

function showDirectionForm(modul6, onNext, onExit, onReference) {
    const fieldsHtml = modul6.fields.map((field) => `
        <p class="section-subheading">${field.label}</p>
        <textarea id="field-${field.id}" class="text-input" rows="2"></textarea>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul6.heading}</h2>
            <div class="section-body"><p>${modul6.intro}</p></div>

            ${fieldsHtml}

            <div class="section-body"><p>${modul6.closing}</p></div>

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

/*---- Modul 7 - rettighedstjekliste (statisk gennemgang, ikke automatisk validering) ----*/

function showChecklistInfo(modul7, onNext, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul7.heading}</h2>
            <div class="section-body"><p>${modul7.intro}</p></div>

            <div class="section-body">
                <ul>${modul7.checklist.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>

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

function showUafklaretMessage(text, onNext, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            <div class="panel">
                <p>${text}</p>
            </div>
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

function showKontroltjek(modul7, images, onNext, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul7.kontroltjekHeading}</h2>
            <div class="section-body"><p>${modul7.kontroltjekText}</p></div>
            ${images.length ? `
                <p class="section-subheading">De billeder, du uploadede i Modul 3:</p>
                <div>${imageGalleryHtml(images)}</div>
            ` : ""}
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

/*---- Modul 8 - dokumentation, forudfyldt ud fra Modul 6's kriterier ----*/

function showDocumentation(modul8, draftText, onFinish, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul8.heading}</h2>
            <div class="section-body"><p>${modul8.intro}</p></div>

            <p class="section-subheading">${modul8.documentationLabel}</p>
            <textarea id="documentation-input" class="text-input" rows="4">${draftText}</textarea>

            <div class="section-body"><p>${modul8.closing}</p></div>

            <div class="section-cta">
                <button id="finish-button" type="button" class="btn btn--regular btn--outline-green">Gem og fortsæt i Visuelt udtryk</button>
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

export {
    showWelcome,
    showTextScreen,
    showRettighedsIntro,
    showReference,
    showChoiceQuestion,
    showValidationOffer,
    showExamplesSkip,
    showExamplesForm,
    showInspirationForm,
    showDirectionForm,
    showChecklistInfo,
    showUafklaretMessage,
    showKontroltjek,
    showDocumentation,
    showExitConfirmation
};
