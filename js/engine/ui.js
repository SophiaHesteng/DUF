const app = document.querySelector("#app");

function renderExitDoor() {

    return `
        <button id="exit-button" aria-label="Gå ud af prøverummet">

            <i class="fa-solid fa-door-closed closed-door"></i>

            <i class="fa-solid fa-door-open open-door"></i>

        </button>
    `;
}

function showWelcomeScreen(onStart){
    console.log("Velkomstskærm vises");

    app.innerHTML = `
                    <div class="welcome-card">
                        <h1>Velkommen til Prøverummet</h1>

                            <p>Her får du en lille smagsprøve på, hvordan vores vækstrum fungerer.</p>
                            <p>Der findes ingen rigtige eller forkerte svar.</p>
                            <p>Formålet er blot at finde ud af, hvor stærkt dit grundlag i forvejen er.</p>
                    </div>

                        <button id="start-button">Start</button>
                         ${renderExitDoor()}`;

        const startButton = document.querySelector("#start-button");

        startButton.addEventListener("click", function () {
        console.log("Start was clicked");
        onStart();
        });
}

function showQuestion(questionObject, onAnswerSelected){
    console.log(questionObject.question);
    console.log(questionObject.answers);

    app.innerHTML = `<h2>${questionObject.question}</h2>
        <div class="answers"></div>
        
        ${renderExitDoor()}`;

    const answersContainer = document.querySelector(".answers");

    for (const answer of questionObject.answers) {
        console.log(answer.text);

        const button = document.createElement("button");

        button.textContent = answer.text;

        answersContainer.appendChild(button);

        button.addEventListener("click", () => {
        console.log("Answered!");
        onAnswerSelected(answer);
        });
    }
}

function showFeedback(feedback, onNext) {

    app.innerHTML = `
        <section class="feedback-screen">

            <h2>Det fortæller dit svar os</h2>

            <p>${feedback}</p>

            <button id="next-button">
                Næste skridt
            </button>

        </section>
         ${renderExitDoor()}
    `;

    const nextButton = document.querySelector("#next-button");

    nextButton.addEventListener("click", () => {
        onNext();
    });
}

function updateNavigation(currentStep){

}

function updateProgressBar(currentStep, totalSteps){

}

function showResult(result) {

    app.innerHTML = `
        <section class="result-screen">

            <h2>${result.title}</h2>

            <p>${result.description}</p>

            <p>${result.recommendedRoom}</p>

            <a href="${result.buttonLink}">
                ${result.buttonText}
            </a>

        </section>`;

}

export {
    showWelcomeScreen,
    showQuestion,
    showFeedback,
    updateNavigation,
    updateProgressBar,
    showResult
};