import {
    showWelcomeScreen,
    showQuestion,
    showFeedback,
    updateNavigation,
    updateProgressBar,
    showResult
} from "./ui.js";

import { questions } from "../data/proverummet.js";

import { storeAnswer } from "./state.js";

export class FlowEngine {

    currentQuestionIndex = 0;

    start() {
        console.log("FlowEngine er startet");

        showWelcomeScreen(() => this.displayCurrentQuestion());
    }

    displayCurrentQuestion(){
        console.log("Quizzen starter");

        const currentQuestion = questions[this.currentQuestionIndex];

        showQuestion(currentQuestion, (answer) => this.answerSelected(answer));
    }

    answerSelected(answer){
        console.log(answer);

        storeAnswer(answer);

        this.currentQuestionIndex++;

            if (this.currentQuestionIndex < questions.length) {
                this.displayCurrentQuestion();
            }
            
            else {
                console.log("Quizzen er slut");
            }
    }
}