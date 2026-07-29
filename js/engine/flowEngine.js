import {
    showWelcomeScreen,
    showQuestion,
    showFeedback,
    updateNavigation,
    updateProgressBar,
    showResult,
    showExitConfirmation
} from "./ui.js";

import { questions } from "../data/proverummet.js";

import { storeAnswer, retrieveAnswers, clearAnswers } from "./state.js";

import { calculateResult } from "./resultCalculator.js";

export class FlowEngine {

    currentQuestionIndex = 0;
    previousScreen = null;

    start() {
        console.log("FlowEngine er startet");

        this.previousScreen = () => this.start();

        showWelcomeScreen(() => this.displayCurrentQuestion(), () => this.exitQuiz());
    }

    displayCurrentQuestion(){
        console.log(`Viser spørgsmål ${this.currentQuestionIndex + 1} af ${questions.length}`);

        this.previousScreen = () => this.displayCurrentQuestion();

        const currentQuestion = questions[this.currentQuestionIndex];

        showQuestion(currentQuestion, (answer) => this.answerSelected(answer), () => this.exitQuiz());

        updateNavigation(this.currentQuestionIndex);

        updateProgressBar(this.currentQuestionIndex, questions.length);
    }

    answerSelected(answer) {

        console.log(answer);

        storeAnswer(answer);

        if (this.currentQuestionIndex === questions.length - 1) {

            const answers = retrieveAnswers();
            const result = calculateResult(answers);

            showResult(result);

            return;
        }
        
        this.previousScreen = () => {

            showFeedback(
                answer.feedback,
                () => {

                    this.currentQuestionIndex++;

                    this.displayCurrentQuestion();

                },
                () => this.exitQuiz()
            );

        };

        showFeedback(answer.feedback, () => {

            this.currentQuestionIndex++;

            this.displayCurrentQuestion();

        },
    () => this.exitQuiz());
    }

        exitQuiz() {

            showExitConfirmation(
                () => {
                    this.previousScreen();},

                () => {
                    clearAnswers();
                    const returnPage = sessionStorage.getItem("returnPage");
                    window.location.href = returnPage;}); //her skal så indsættes links når de andre sider er kodet!
        }
    }