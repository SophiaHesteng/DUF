import {
    showWelcome,
    showTextScreen,
    showChoiceQuestion,
    showAccordionStep,
    showTeaserStep,
    showResult,
    showExitConfirmation
} from "./overblikUi.js";

import { modul1, modul2Questions, modul2Fritekst, modul3, modul4, modul5, modul6 } from "../data/overblik.js";
import { resolveRecommendation } from "./overblikMatcher.js";

/*---- Selvstændig motor for det grundlæggende vækstrum "Overblik" (Visuelt udtryk). Bevidst adskilt fra Prøverummets FlowEngine.js: Overblik har forgrenede spørgsmål, et browsbart modul (Modul 3) og en resultatskærm bygget på flere samtidige signaler, i stedet for én lineær spørgsmål/point-rækkefølge. ----*/

export class OverblikEngine {

    answers = {};
    previousScreen = null;

    start() {
        this.previousScreen = () => this.start();
        showWelcome(() => this.showModul1());
    }

    showModul1() {
        document.body.classList.add("in-flow");
        this.previousScreen = () => this.showModul1();

        showTextScreen(
            modul1,
            () => this.showModul2Question(0),
            () => this.exitRoom()
        );
    }

    showModul2Question(index) {
        if (index >= modul2Questions.length) {
            this.showModul2Fritekst();
            return;
        }

        const question = modul2Questions[index];

        if (question.conditionalOn && this.answers[question.conditionalOn.id] !== question.conditionalOn.equals) {
            this.showModul2Question(index + 1);
            return;
        }

        this.previousScreen = () => this.showModul2Question(index);

        showChoiceQuestion(
            question,
            (answer) => {
                this.answers[question.id] = answer;
                this.showModul2Question(index + 1);
            },
            () => this.exitRoom()
        );
    }

    showModul2Fritekst() {
        this.previousScreen = () => this.showModul2Fritekst();

        showTextScreen(
            { reflectionLabel: modul2Fritekst.label },
            () => this.showModul3(),
            () => this.exitRoom()
        );
    }

    showModul3() {
        this.previousScreen = () => this.showModul3();

        showAccordionStep(
            modul3,
            () => this.showModul4(),
            () => this.exitRoom()
        );
    }

    showModul4() {
        this.previousScreen = () => this.showModul4();

        showTextScreen(
            modul4,
            () => this.showModul5(),
            () => this.exitRoom()
        );
    }

    showModul5() {
        this.previousScreen = () => this.showModul5();

        showTeaserStep(
            modul5,
            () => this.showModul6(),
            () => this.exitRoom()
        );
    }

    showModul6() {
        this.previousScreen = () => this.showModul6();

        const recommendation = resolveRecommendation(this.answers);

        showResult(
            {
                recommendation,
                introText: modul6.intro,
                noSignalText: modul6.noSignalText,
                closingText: modul6.closing
            },
            () => this.exitRoom()
        );
    }

    exitRoom() {
        showExitConfirmation(
            () => this.previousScreen(),
            () => {
                window.location.href = "vaekstomraade-visuelt-udtryk.html";
            }
        );
    }
}
