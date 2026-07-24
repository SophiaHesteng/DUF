const app = document.querySelector("#app");

function showWelcomeScreen(onStart){
    console.log("Velkomstskærm vises");

    app.innerHTML = `
                    <div class="welcome-card">
                        <h1>Velkommen til Prøverummet</h1>

                            <p>Her får du en lille smagsprøve på, hvordan vores vækstrum fungerer.</p>
                            <p>Der findes ingen rigtige eller forkerte svar.</p>
                            <p>Formålet er blot at finde ud af, hvor stærkt dit grundlag i forvejen er.</p>
                    </div>

                        <button id="start-button">Start</button>`;

        const startButton = document.querySelector("#start-button");

        startButton.addEventListener("click", function () {
        console.log("Start was clicked");
        onStart();
        });
}

function showQuestion(question){

}

function showFeedback(feedback){

}

function updateNavigation(currentStep){

}

function updateProgressBar(currentStep, totalSteps){

}

function showResult(result){

}

export {
    showWelcomeScreen,
    showQuestion,
    showFeedback,
    updateNavigation,
    updateProgressBar,
    showResult
};