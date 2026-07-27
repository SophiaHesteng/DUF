import {
    showWelcomeScreen,
    showQuestion,
    showFeedback,
    updateNavigation,
    updateProgressBar,
    showResult
} from "./ui.js";

import { questions } from "../data/proverummet.js";

export class FlowEngine {

    start() {
        console.log("FlowEngine er startet");

        showWelcomeScreen(this.startQuiz);
    }

    startQuiz(){
        console.log("Quizzen starter");

        const firstQuestion = questions[0];

        showQuestion(firstQuestion);
    }
}