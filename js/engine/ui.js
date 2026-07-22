const app = document.querySelector("#app");

function showWelcomeScreen(){
    console.log("Velkomstskærm vises");

    app.innerHTML = `<h1>Velkommen</h1>`;
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