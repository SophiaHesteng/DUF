import { activateFocusTrap } from "./accessibility.js";

const app = document.querySelector("#app");

function renderExitDoor() {

    return `
        <button id="exit-button" aria-label="Gå ud af prøverummet">

            <i class="fa-solid fa-door-closed closed-door" aria-hidden="true"></i>

            <i class="fa-solid fa-door-open open-door" aria-hidden="true"></i>

        </button>
    `;
}

function showWelcomeScreen(onStart, onExit){
    console.log("Velkomstskærm vises");

    app.innerHTML = `
        <section class="section welcome-card">
            <h1 class="section-heading">Velkommen til Prøverummet</h1>

            <p class="section-subheading">Her får du en lille smagsprøve på, hvordan vores vækstrum fungerer.</p>

            <div class="section-body">
                <p>Der findes ingen rigtige eller forkerte svar.</p>
                <p>Formålet er blot at finde ud af, hvor stærkt dit grundlag, i forvejen, er.</p>
            </div>

            <img class="section-illustration" src="img/proeve-welcome-door.png" alt="">

            <div class="section-cta">
                <button id="start-button" type="button" class="btn btn--regular btn--solid-green">Gå ind her</button>
            </div>
        </section>`;

    activateFocusTrap(app);

    const startButton = document.querySelector("#start-button");

    startButton.addEventListener("click", function () {
        console.log("Start was clicked");
        onStart();
    });
}

function showQuestion(questionObject, onAnswerSelected, onExit){
    console.log(questionObject.question);
    console.log(questionObject.answers);

    app.innerHTML = `
        <section class="section">
            <h2 class="section-subheading">${questionObject.question}</h2>

            <div class="answers choice-list"></div>
        </section>

        ${renderExitDoor()}`;

    const answersContainer = document.querySelector(".answers");

    for (const answer of questionObject.answers) {
        console.log(answer.text);

        const button = document.createElement("button");

        button.type = "button";
        button.className = "choice-card";

        button.innerHTML = `
            <img class="choice-card-icon choice-card-icon--large" src="img/proeve-door-icon.png" alt="">
            <span class="choice-card-title choice-card-title--plain">${answer.text}</span>
            <img class="choice-card-arrow" src="img/pil.svg" alt="">
        `;

        answersContainer.appendChild(button);

        button.addEventListener("click", () => {
        console.log("Answered!");
        onAnswerSelected(answer);
        });
    }

    activateFocusTrap(app);

        const exitButton = document.querySelector("#exit-button");
        exitButton.addEventListener("click", onExit);
}

function showFeedback(feedback, onNext, onExit) {

    app.innerHTML = `
        <section class="section feedback-screen">

            <h2 class="section-subheading">Det fortæller dit svar os</h2>

            <div class="section-body">
                <p>${feedback}</p>
            </div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">
                    Næste skridt
                </button>
            </div>

        </section>
         ${renderExitDoor()}`;

         activateFocusTrap(app);

    const nextButton = document.querySelector("#next-button");

    nextButton.addEventListener("click", () => {
        onNext();
    });

    const exitButton = document.querySelector("#exit-button");

       exitButton.addEventListener("click", onExit);
}

function updateNavigation(currentStep){

}

function updateProgressBar(currentStep, totalSteps){

}

function showResult(result) {

    app.innerHTML = `
        <section class="section result-screen">

            <h2 class="section-heading">${result.title}</h2>

            <div class="panel">
                <div class="section-body">
                    <p>${result.description}</p>
                </div>
            </div>

            <div class="section-cta">
                <a href="${result.buttonLink}" class="btn btn--regular btn--solid-green">
                    ${result.buttonText}
                </a>
            </div>

        </section>`;
        activateFocusTrap(app);

}

function showExitConfirmation(onStay, onExit){
    app.innerHTML = `
        <section class="section exit-confirmation" role="dialog" aria-modal="true" aria-labelledby="exit-title" aria-describedby="exit-description">

            <h2 id="exit-title" class="section-subheading">Vil du forlade prøverummet?</h2>

            <div class="section-body">
                <p id="exit-description">
                    Hvis du går ud nu, bliver dine svar ikke gemt.
                </p>
            </div>

            <div class="section-cta section-cta--column">
                <button id="stay-button" type="button" class="btn btn--regular btn--solid-green">
                    Bliv i prøverummet
                </button>

                <button id="leave-button" type="button" class="btn btn--regular btn--solid-green">
                    Ja, gå ud
                </button>
            </div>

        </section>`;

        activateFocusTrap(app);

        const stayButton = document.querySelector("#stay-button");

        stayButton.addEventListener("click", onStay);

        const leaveButton = document.querySelector("#leave-button");

        leaveButton.addEventListener("click", onExit);
}

export {
    showWelcomeScreen,
    showQuestion,
    showFeedback,
    updateNavigation,
    updateProgressBar,
    showResult,
    showExitConfirmation
};