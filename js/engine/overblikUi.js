import { activateFocusTrap } from "./accessibility.js";
import { renderExitDoor as renderSharedExitDoor, bindExit } from "../components/exitDoor.js";
import { renderBubbleHub, bindBubbleHub, renderBubbleDetail, bindBubbleDetail } from "../components/bubbleHub.js";
import { VISUELT_UDTRYK_HUB } from "./vaekstomraadeExit.js";

const app = document.querySelector("#app");

function renderExitDoor() {
    return renderSharedExitDoor("Gå ud af Overblik");
}

function showWelcome({ heading, paragraphs, buttonText = "Næste" }, onStart) {
    app.innerHTML = `
        <section class="section welcome-card">
            <h1 class="section-heading">${heading}</h1>

            <div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>

            <div class="section-cta">
                <button id="start-button" type="button" class="btn btn--regular btn--solid-green">${buttonText}</button>
            </div>
        </section>`;

    activateFocusTrap(app);
    document.querySelector("#start-button").addEventListener("click", onStart);
}

/*---- Læseskærm, valgfrit med et "Guide"/"Sticker"-citat (jf. Myteknæk-mønstret i farverUi.js) og/eller et andet paragrafafsnit efter citatet (Modul 4's "guide midt i teksten") ----*/

function showTextScreen({ heading, paragraphs = [], paragraphsAfter = [], guide, guideLabel = "Guide", reflectionLabel, buttonText = "Næste" }, onNext, onExit) {
    const headingText = heading || reflectionLabel;
    const showSeparateLabel = Boolean(heading && reflectionLabel);

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${headingText}</h2>

            ${paragraphs.length ? `<div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>` : ""}

            ${guide ? `
                <div class="panel">
                    <p><strong>${guideLabel}:</strong> ${guide}</p>
                </div>
            ` : ""}

            ${paragraphsAfter.length ? `<div class="section-body">${paragraphsAfter.map((p) => `<p>${p}</p>`).join("")}</div>` : ""}

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

/*---- Ét-valg spørgsmål, jf. Modul 1/2 - almindelige valgkort uden ikon. "heading" er boblens egen titel (fx "Hvor starter du?"); er den forskellig fra selve spørgsmålet ("Hvad passer bedst på dig?"), vises spørgsmålet som en separat underoverskrift lige før valgene ----*/

function showChoiceQuestion({ heading, intro, guide, guideLabel = "Guide", question, options }, onAnswerSelected, onExit) {
    const headingText = heading || question;
    const showQuestionAsSubheading = Boolean(heading && heading !== question);

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${headingText}</h2>

            ${intro ? `<div class="section-body"><p>${intro}</p></div>` : ""}

            ${guide ? `
                <div class="panel">
                    <p><strong>${guideLabel}:</strong> ${guide}</p>
                </div>
            ` : ""}

            ${showQuestionAsSubheading ? `<p class="section-subheading">${question}</p>` : ""}

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

/*---- Flervalgsspørgsmål, jf. Modul 2's Boble 2.2 - samme togglebare kort som "Stemmepunkt" i Figma (.choice-card--poll[aria-pressed]), men uden at rydde andre valg ved klik, og med en eksplicit "Næste"-knap til at bekræfte valget ----*/

function showMultiChoiceQuestion({ heading, intro, options }, onSelectionConfirmed, onExit) {
    const optionsHtml = options.map((option, index) => `
        <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-index="${index}">
            <span class="choice-card-title choice-card-title--plain">${option}</span>
        </button>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>

            ${intro ? `<div class="section-body"><p>${intro}</p></div>` : ""}

            <div class="choice-list">${optionsHtml}</div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    const optionButtons = document.querySelectorAll("[data-option-index]");

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
            .map((button) => options[Number(button.dataset.optionIndex)]);

        onSelectionConfirmed(selected);
    });

    bindExit(onExit);
}

/*---- Modul 3 og Modul 5 - delt "oversigt + valgfrie bobler"-mønster (jf. js/components/bubbleHub.js): en fast hub, efterfulgt af den valgte boblets detaljeskærm. "Tilbage til oversigt" er en lokal skift mellem disse to skærme, IKKE det samme som exitRoom()'s bekræftelse af at forlade rummet. ----*/

function showModuleHub({ heading, intro, bubbles }, onSelectBubble, onNext, onExit) {
    app.innerHTML = `${renderBubbleHub({ heading, intro, bubbles })}${renderExitDoor()}`;

    activateFocusTrap(app);
    bindBubbleHub(onSelectBubble, onNext);
    bindExit(onExit);
}

function showModuleBubble(bubble, onBack, onNext, onExit) {
    app.innerHTML = `${renderBubbleDetail(bubble)}${renderExitDoor()}`;

    activateFocusTrap(app);
    bindBubbleDetail(onBack, onNext);
    bindExit(onExit);
}

/*---- Modul 6 - opsummering af Modul 2's svar + frit valg mellem alle fire uddybende rum (ingen automatisk matchning, jf. docs/duf-manuskript-overblik.md, ændret 2026-09-09) ----*/

function showModul6Recap({ summary, introText, guideText, closingText, rooms }, onChooseRoom, onExit) {
    const roomsHtml = rooms.map((room) => `
        <button type="button" class="value-card" data-choose-room="${room.id}">
            <span class="value-card-label">${room.name}</span>
        </button>
    `).join("");

    app.innerHTML = `
        <section class="section result-screen">
            <h2 class="section-heading">Din vej videre</h2>

            <div class="panel">
                <div class="section-body"><p>${introText}</p></div>

                <div class="section-body">
                    ${summary.hvadBrugerDu.map((p) => `<p>${p}</p>`).join("")}
                    <p>Du svarede: ${summary.moenster.answer}</p>
                    <p>${summary.moenster.response}</p>
                    <p>Du svarede: ${summary.folelse.answer}</p>
                    <p>${summary.folelse.response}</p>
                </div>

                <p><strong>Guide:</strong> ${guideText}</p>
            </div>

            <div class="value-list">${roomsHtml}</div>

            <div class="section-body"><p>${closingText}</p></div>

            <div class="section-cta section-cta--column">
                <a href="${VISUELT_UDTRYK_HUB}" class="btn btn--regular btn--solid-green">Se alle rum i Visuelt udtryk</a>
                <a href="vaelg-din-dor.html" class="btn btn--regular btn--outline-green">Tilbage til Vælg din dør</a>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);

    document.querySelectorAll("[data-choose-room]").forEach((button) => {
        const room = rooms.find((r) => r.id === button.dataset.chooseRoom);
        button.addEventListener("click", () => onChooseRoom(room));
    });

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
    showMultiChoiceQuestion,
    showModuleHub,
    showModuleBubble,
    showModul6Recap,
    showExitConfirmation
};
