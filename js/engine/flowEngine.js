import {
    showWelcomeScreen,
    showQuestion,
    showFeedback,
    updateNavigation,
    updateProgressBar,
    showResult
} from "./ui.js";

export class FlowEngine {

    start() {
        console.log("FlowEngine er startet");

        showWelcomeScreen(this.startQuiz);
    }

    startQuiz(){
        console.log("Quizzen starter");
    }

}