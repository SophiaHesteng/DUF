import { activateFocusTrap } from "./accessibility.js";
import { initAccordion } from "../components/accordion.js";

const app = document.querySelector("#app");

function renderExitDoor() {
    return `
        <button id="exit-button" aria-label="Gå ud af Overblik">
            <i class="fa-solid fa-door-closed closed-door" aria-hidden="true"></i>
            <i class="fa-solid fa-door-open open-door" aria-hidden="true"></i>
        </button>
    `;
}

function bindExit(onExit) {
    const exitButton = document.querySelector("#exit-button");
    if (exitButton) exitButton.addEventListener("click", onExit);
}

function showWelcome(onStart) {
    app.innerHTML = `
        <section class="section welcome-card">
            <h1 class="section-heading">Velkommen til Dit visuelle udtryk</h1>

            <p class="section-subheading">Her får du et overblik over, hvordan farver, billeder, dit logo og de mindre detaljer spiller sammen — og et bud på, hvor det kan give mening at starte.</p>

            <div class="section-body">
                <p>Der er ingen rigtige eller forkerte svar undervejs. Vi bygger bare et billede af, hvor du står lige nu.</p>
            </div>

            <div class="section-cta">
                <button id="start-button" type="button" class="btn btn--regular btn--solid-green">Gå ind her</button>
            </div>
        </section>`;

    activateFocusTrap(app);
    document.querySelector("#start-button").addEventListener("click", onStart);
}

/*---- Læseskærm med valgfri refleksion (Modul 1, Modul 2's fritekstspørgsmål, Modul 4) ----*/

function showTextScreen({ heading, paragraphs = [], reflectionLabel, buttonText = "Næste" }, onNext, onExit) {
    const headingText = heading || reflectionLabel;
    const showSeparateLabel = Boolean(heading && reflectionLabel);

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${headingText}</h2>

            ${paragraphs.length ? `<div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>` : ""}

            ${reflectionLabel ? `
                ${showSeparateLabel ? `<p class="section-subheading">${reflectionLabel}</p>` : ""}
                <textarea id="reflection-input" class="text-input" rows="4"></textarea>
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

/*---- Ét spørgsmål ad gangen, jf. Modul 2 - almindelige valgkort uden ikon ----*/

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
            <span class="choice-card-title choice-card-title--plain">${option}</span>
            <img class="choice-card-arrow" src="img/pil.svg" alt="">
        `;
        answersContainer.appendChild(button);
        button.addEventListener("click", () => onAnswerSelected(option));
    }

    activateFocusTrap(app);
    bindExit(onExit);
}

/*---- Modul 3 - fire byggeklodser, brugeren kan klikke sig igennem ----*/

function showAccordionStep({ heading, intro, items }, onNext, onExit) {
    const itemsHtml = items.map((item, index) => `
        <div class="accordion-item" data-open="false">
            <button class="accordion-trigger" aria-expanded="false" aria-controls="overblik-panel-${index}">
                <span>${item.title}</span>
                <img class="accordion-icon" src="img/accordion-closed.svg" alt="">
            </button>
            <div class="accordion-panel" id="overblik-panel-${index}" hidden>
                <p>${item.text}</p>
            </div>
        </div>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <p class="section-subheading">${intro}</p>

            <div class="choice-list">${itemsHtml}</div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    initAccordion();
    activateFocusTrap(app);

    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 5 - fire ligeværdige smagsprøver på fordybelse ----*/

function showTeaserStep({ heading, intro, cards }, onNext, onExit) {
    const cardsHtml = cards.map((card) => `
        <div class="value-card">
            <span class="value-card-label">${card.label}</span>
            <p class="value-card-description">${card.description}</p>
        </div>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <p class="section-subheading">${intro}</p>

            <div class="value-list">${cardsHtml}</div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);

    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 6 - resultat ud fra matchningslogikken ----*/

function joinNames(names) {
    if (names.length === 1) return names[0];
    return `${names.slice(0, -1).join(", ")} og ${names[names.length - 1]}`;
}

function showResult({ recommendation, introText, noSignalText, closingText }, onExit) {
    const isNone = recommendation.type === "none";
    let bodyHtml = "";

    if (!isNone) {
        if (recommendation.rooms.length === 1) {
            const room = recommendation.rooms[0];
            bodyHtml = `
                <div class="section-body"><p>${room.singleText}</p></div>
                <div class="section-cta">
                    <a href="${room.link}" class="btn btn--regular btn--solid-green">Gå til ${room.name}</a>
                </div>`;
        } else {
            const joined = joinNames(recommendation.rooms.map((r) => r.name));
            const buttonsHtml = recommendation.rooms
                .map((r) => `<a href="${r.link}" class="btn btn--regular btn--solid-green">Gå til ${r.name}</a>`)
                .join("");

            bodyHtml = `
                <div class="section-body"><p>Både ${joined} virker relevante for dig lige nu. Du bestemmer, hvor du vil starte — vi gemmer det andet til senere.</p></div>
                <div class="section-cta section-cta--row">${buttonsHtml}</div>`;
        }
    }

    app.innerHTML = `
        <section class="section result-screen">
            <h2 class="section-heading">Dit næste skridt</h2>

            <div class="panel">
                <div class="section-body"><p>${isNone ? noSignalText : introText}</p></div>

                ${bodyHtml}

                <div class="section-body"><p>${closingText}</p></div>

                <div class="section-cta">
                    <a href="vaelg-din-dor.html" class="btn btn--regular btn--outline-green">Tilbage til Vælg din dør</a>
                </div>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    bindExit(onExit);
}

function showExitConfirmation(onStay, onExit) {
    app.innerHTML = `
        <section class="section exit-confirmation" role="dialog" aria-modal="true" aria-labelledby="exit-title" aria-describedby="exit-description">
            <h2 id="exit-title" class="section-subheading">Vil du forlade Overblik?</h2>

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
    showAccordionStep,
    showTeaserStep,
    showResult,
    showExitConfirmation
};
