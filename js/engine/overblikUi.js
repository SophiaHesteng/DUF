import { activateFocusTrap } from "./accessibility.js";
import { initAccordion } from "../components/accordion.js";
import { renderExitDoor as renderSharedExitDoor, bindExit } from "../components/exitDoor.js";
import { renderBubbleHub, bindBubbleHub, renderBubbleDetail, bindBubbleDetail } from "../components/bubbleHub.js";
import { VISUELT_UDTRYK_HUB } from "./vaekstomraadeExit.js";

const app = document.querySelector("#app");

function renderExitDoor() {
    return renderSharedExitDoor("Gå ud af Overblik");
}

/*---- Knaprække nederst på en skærm - med en "Tilbage"-knap over næste-knappen, når skærmen har en onBack (jf. bubbleHub.js' "Tilbage til oversigt"). Bruges i Modul 2 efter Boble 2.2, så brugeren kan gå tilbage og ændre sit kanal-svar (runde 7) ----*/

function renderCta(buttonText, onBack) {
    return `
        <div class="section-cta${onBack ? " section-cta--column" : ""}">
            ${onBack ? `<button id="back-button" type="button" class="btn btn--regular btn--outline-green">Tilbage</button>` : ""}
            <button id="next-button" type="button" class="btn btn--regular btn--solid-green">${buttonText}</button>
        </div>`;
}

function bindBack(onBack) {
    if (onBack) document.querySelector("#back-button").addEventListener("click", onBack);
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

function showTextScreen({ heading, paragraphs = [], paragraphsAfter = [], guide, guideLabel = "Guide", reflectionLabel, buttonText = "Næste" }, onNext, onExit, onBack) {
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

            ${renderCta(buttonText, onBack)}
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);

    document.querySelector("#next-button").addEventListener("click", onNext);
    bindBack(onBack);
    bindExit(onExit);
}

/*---- Ét-valg spørgsmål, jf. Modul 1/2 - almindelige valgkort uden ikon. "heading" er boblens egen titel (fx "Hvor starter du?"); er den forskellig fra selve spørgsmålet ("Hvad passer bedst på dig?"), vises spørgsmålet som en separat underoverskrift lige før valgene ----*/

function showChoiceQuestion({ heading, intro, guide, guideLabel = "Guide", question, options }, onAnswerSelected, onExit, onBack) {
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

            ${onBack ? `
                <div class="section-cta">
                    <button id="back-button" type="button" class="btn btn--regular btn--outline-green">Tilbage</button>
                </div>
            ` : ""}
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
    bindBack(onBack);
    bindExit(onExit);
}

/*---- Flervalgsspørgsmål, jf. Modul 2's Boble 2.2 og 2.3 - samme togglebare kort som "Stemmepunkt" i Figma (.choice-card--poll[aria-pressed]), men uden at rydde andre valg ved klik, og med en eksplicit "Næste"-knap til at bekræfte valget.

En option er enten en streng eller { title, description? } (2.2 og 2.3-varianten). Valgfrie indstillinger (runde 7):
- exclusiveIndex: den option, der ikke kan kombineres med de andre (2.2's "Jeg har ikke noget endnu") - vælges den, fjernes de andre, og vælges en anden, fjernes den
- preselected: indeks, der er valgt på forhånd, når brugeren kommer tilbage til skærmen
- requireSelection: "Næste" er slået fra, indtil mindst én er valgt (2.2 - vejen videre afhænger af svaret) ----*/

function showMultiChoiceQuestion({ heading, intro, options }, onSelectionConfirmed, onExit, { exclusiveIndex = -1, preselected = [], requireSelection = false, onBack } = {}) {
    const optionsHtml = options.map((option, index) => {
        const { title, description } = typeof option === "string" ? { title: option } : option;
        const isPressed = preselected.includes(index);

        return `
            <button type="button" class="choice-card choice-card--poll" aria-pressed="${isPressed}" data-option-index="${index}">
                ${description ? `
                    <span class="choice-card-body">
                        <span class="choice-card-title choice-card-title--plain">${title}</span>
                        <span class="choice-card-description">${description}</span>
                    </span>
                ` : `<span class="choice-card-title choice-card-title--plain">${title}</span>`}
            </button>`;
    }).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>

            ${intro ? `<div class="section-body"><p>${intro}</p></div>` : ""}

            <div class="choice-list">${optionsHtml}</div>

            ${renderCta("Næste", onBack)}
        </section>
        ${renderExitDoor()}`;

    const optionButtons = [...document.querySelectorAll("[data-option-index]")];
    const nextButton = document.querySelector("#next-button");
    const isPressed = (button) => button.getAttribute("aria-pressed") === "true";

    function updateNextButton() {
        if (requireSelection) nextButton.disabled = !optionButtons.some(isPressed);
    }

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const willPress = !isPressed(button);
            button.setAttribute("aria-pressed", String(willPress));

            if (willPress && exclusiveIndex >= 0) {
                const clickedIndex = Number(button.dataset.optionIndex);
                optionButtons.forEach((other) => {
                    const otherIndex = Number(other.dataset.optionIndex);
                    const conflicts = clickedIndex === exclusiveIndex ? otherIndex !== exclusiveIndex : otherIndex === exclusiveIndex;
                    if (conflicts) other.setAttribute("aria-pressed", "false");
                });
            }

            updateNextButton();
        });
    });

    updateNextButton();
    activateFocusTrap(app);

    nextButton.addEventListener("click", () => {
        const selectedIndexes = optionButtons
            .filter(isPressed)
            .map((button) => Number(button.dataset.optionIndex));

        onSelectionConfirmed(selectedIndexes.map((index) => options[index]), selectedIndexes);
    });

    bindBack(onBack);
    bindExit(onExit);
}

/*---- Modul 3 (runde 7) - én skærm med en accordion (jf. js/components/accordion.js, samme markup som Billeders rettigheds-opslagsværk). Overskrift og intro-linje står i selve knappen og er altid synlige; den uddybende tekst folder sig ud. Flere punkter må være åbne samtidig. Native <button> giver fokus og Enter/mellemrum gratis ----*/

function showAccordionStep({ heading, intro, items, buttonText = "Videre" }, onNext, onExit) {
    const itemsHtml = items.map((item, index) => `
        <div class="accordion-item" data-open="false">
            <button type="button" class="accordion-trigger" aria-expanded="false" aria-controls="overblik-panel-${index}">
                <span class="accordion-trigger-text">
                    <span class="accordion-trigger-title">${item.title}</span>
                    <span class="accordion-trigger-teaser">${item.teaser}</span>
                </span>
                <img class="accordion-icon" src="img/accordion-closed.svg" alt="">
            </button>
            <div class="accordion-panel" id="overblik-panel-${index}" hidden>
                <p>${item.body}</p>
            </div>
        </div>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>

            <div class="section-body"><p>${intro}</p></div>

            <div class="choice-list">${itemsHtml}</div>

            ${renderCta(buttonText)}
        </section>
        ${renderExitDoor()}`;

    initAccordion();
    activateFocusTrap(app);

    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 5 (og indtil runde 7 også Modul 3) - delt "oversigt + valgfrie bobler"-mønster (jf. js/components/bubbleHub.js): en fast hub, efterfulgt af den valgte boblets detaljeskærm. "Tilbage til oversigt" er en lokal skift mellem disse to skærme, IKKE det samme som exitRoom()'s bekræftelse af at forlade rummet. ----*/

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

/*---- Modul 6 - opsummering af Modul 2's svar (kanal-linjen fra 2.2 øverst; moenster/folelse mangler for brugeren, der ikke har noget endnu) + frit valg mellem alle fire uddybende rum (ingen automatisk matchning, jf. docs/duf-manuskript-overblik.md, ændret 2026-09-09) ----*/

function showModul6Recap({ summary, introText, guideText, closingText, rooms }, onChooseRoom, onExit) {
    const roomsHtml = rooms.map((room) => `
        <button type="button" class="value-card" data-choose-room="${room.id}">
            <span class="value-card-label">${room.name}</span>
        </button>
    `).join("");

    app.innerHTML = `
        <section class="section result-screen">
            <h2 class="section-heading">Din vej videre</h2>

            <div class="section-body"><p>${introText}</p></div>

            <div class="section-body">
                <p>${summary.kanaler}</p>
                ${summary.hvadBrugerDu.map((p) => `<p>${p}</p>`).join("")}
                ${summary.moenster ? `
                    <p>Du svarede: ${summary.moenster.answer}</p>
                    <p>${summary.moenster.response}</p>
                ` : ""}
                ${summary.folelse ? `
                    <p>Du svarede: ${summary.folelse.answer}</p>
                    <p>${summary.folelse.response}</p>
                ` : ""}
            </div>

            <div class="panel">
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
    showAccordionStep,
    showModuleHub,
    showModuleBubble,
    showModul6Recap,
    showExitConfirmation
};
