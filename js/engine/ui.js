const app = document.querySelector("#app");

function showWelcomeScreen(onStart){
    console.log("Velkomstskærm vises");

    app.innerHTML = `<h1>Velkommen</h1>
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