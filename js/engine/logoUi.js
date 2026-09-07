import { activateFocusTrap } from "./accessibility.js";

const app = document.querySelector("#app");

function renderExitDoor() {
    return `
        <button id="exit-button" aria-label="Gå ud af Logo">
            <i class="fa-solid fa-door-closed closed-door" aria-hidden="true"></i>
            <i class="fa-solid fa-door-open open-door" aria-hidden="true"></i>
        </button>
    `;
}

function bindExit(onExit) {
    const exitButton = document.querySelector("#exit-button");
    if (exitButton) exitButton.addEventListener("click", onExit);
}

function externalLinkHtml(link) {
    return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn btn--regular btn--outline-green">${link.label}</a>`;
}

function showWelcome(text, onStart) {
    app.innerHTML = `
        <section class="section welcome-card">
            <h1 class="section-heading">Logo</h1>
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

/*---- Generisk spørgsmål med valgkort - bruges til Modul 2's to spørgsmål og Modul 4 ----*/

function showChoiceQuestion({ question, options }, onAnswerSelected, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${question}</h2>
            <div class="answers choice-list"></div>
        </section>
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
    bindExit(onExit);
}

/*---- Modul 2 - valgfri øvelse for dem, der ikke tager valideringsvejen ----*/

function showOptionalReflection(label, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${label}</h2>
            <textarea id="reflection-input" class="text-input" rows="4"></textarea>
            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 2 - valideringsvejen ----*/

function showValidationOffer(modul2, onTest, onFull, onExit) {
    app.innerHTML = `
        <section class="section">
            <div class="section-body"><p>${modul2.valideringsSkaermtekst}</p></div>
            <div class="section-cta section-cta--column">
                <button id="test-button" type="button" class="btn btn--regular btn--solid-green">${modul2.valideringsKnapTest}</button>
                <button id="full-button" type="button" class="btn btn--regular btn--outline-green">${modul2.valideringsKnapFuld}</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#test-button").addEventListener("click", onTest);
    document.querySelector("#full-button").addEventListener("click", onFull);
    bindExit(onExit);
}

/*---- Modul 3 - eksternt link til Looka plus tre logoers øvelse ----*/

function showInspirationForm(modul3, onNext, onExit) {
    const hint = modul3.perLogoQuestions.join(" · ");

    const logoFields = [1, 2, 3].map((n) => `
        <p class="section-subheading">Logo ${n}${n === 3 ? " (valgfrit)" : ""}</p>
        <textarea id="logo-${n}" class="text-input" rows="3" placeholder="${hint}"></textarea>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul3.heading}</h2>
            <div class="section-body"><p>${modul3.intro}</p></div>

            <div class="section-cta">${externalLinkHtml(modul3.externalLink)}</div>

            <div class="section-body"><p>${modul3.exerciseIntro}</p></div>

            ${logoFields}

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 6 - eksterne værktøjer plus kort beskrivelse af resultatet ----*/

function showBuildForm(modul6, onNext, onExit) {
    const linksHtml = modul6.externalLinks.map(externalLinkHtml).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${modul6.heading}</h2>
            <div class="section-body"><p>${modul6.intro}</p></div>

            <div class="section-cta section-cta--row">${linksHtml}</div>

            <div class="section-body"><p>${modul6.exerciseIntro}</p></div>

            <p class="section-subheading">${modul6.descriptionLabel}</p>
            <textarea id="description-input" class="text-input" rows="4"></textarea>

            <div class="section-body"><p>${modul6.support}</p></div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 7 - selvvurderet tjekliste (togglekort, ikke låst adgang) ----*/

function showChecklist(modul7, onNext, onExit) {
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
        ${renderExitDoor()}`;

    document.querySelectorAll("[data-checklist-item]").forEach((item) => {
        item.addEventListener("click", () => {
            const isPressed = item.getAttribute("aria-pressed") === "true";
            item.setAttribute("aria-pressed", String(!isPressed));
        });
    });

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

function showReassurance(text, showBackButton, onBack, onContinue, onExit) {
    app.innerHTML = `
        <section class="section">
            <div class="section-body"><p>${text}</p></div>
            <div class="section-cta section-cta--column">
                ${showBackButton ? `<button id="back-button" type="button" class="btn btn--regular btn--outline-green">Gå tilbage og justér</button>` : ""}
                <button id="continue-button" type="button" class="btn btn--regular btn--solid-green">Fortsæt</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    if (showBackButton) document.querySelector("#back-button").addEventListener("click", onBack);
    document.querySelector("#continue-button").addEventListener("click", onContinue);
    bindExit(onExit);
}

/*---- Modul 8 - dokumentation, forudfyldt ud fra den valgte retning ----*/

function showDocumentation(modul8, draftText, onFinish, onExit) {
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
            <h2 id="exit-title" class="section-subheading">Vil du forlade Logo?</h2>

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
    showChoiceQuestion,
    showOptionalReflection,
    showValidationOffer,
    showInspirationForm,
    showBuildForm,
    showChecklist,
    showReassurance,
    showDocumentation,
    showExitConfirmation
};
