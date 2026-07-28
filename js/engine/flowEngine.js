import {
    showWelcomeScreen,
    showQuestion,
    showFeedback,
    updateNavigation,
    updateProgressBar,
    showResult
} from "./ui.js";

import { questions } from "../data/proverummet.js";

import { storeAnswer, retrieveAnswers } from "./state.js";

import { calculateResult } from "./resultCalculator.js";

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

         updateNavigation(this.currentQuestionIndex);

         updateProgressBar(this.currentQuestionIndex, questions.length);
    }

    answerSelected(answer){
        console.log(answer);

        storeAnswer(answer);

        showFeedback(answer.feedback);

        this.currentQuestionIndex++;

            if (this.currentQuestionIndex < questions.length) {
                this.displayCurrentQuestion();
            }
            
            else {
                const answers = retrieveAnswers();

                const result = calculateResult(answers);
                
                showResult(result);
            }
    }
}