import {
    showWelcome,
    showTextScreen,
    showRettighedsIntro,
    showReference,
    showChoiceQuestion,
    showValidationOffer,
    showExamplesSkip,
    showExamplesForm,
    showInspirationForm,
    showDirectionForm,
    showChecklistInfo,
    showUafklaretMessage,
    showKontroltjek,
    showDocumentation,
    showExitConfirmation
} from "./billederUi.js";

import { velkomst, modul1, situationer, modul2, modul3, modul4, modul5, modul6, modul7, modul8 } from "../data/billeder.js";
import { saveVaekstrumOutput } from "../storage/vaekstrumStorage.js";

/*---- Selvstændig motor for det uddybende vækstrum "Billeder" (Visuelt udtryk). Adskilt fra Prøverummets FlowEngine.js og fra Overbliks/Farvers/Logos motorer - Billeder har et fast opslagsværk tilgængeligt gennem hele rummet (rettighedsoversigten), som ingen af de andre rum har brug for. ----*/

export class BilledeEngine {

    valideringsvej = false;
    kriterier = {};
    previousScreen = null;

    start() {
        const params = new URLSearchParams(window.location.search);
        const fromOverblik = params.get("fra") === "overblik";
        const text = fromOverblik ? velkomst.fraOverblik : velkomst.standard;

        this.previousScreen = () => this.start();
        showWelcome(text, () => this.showModul1());
    }

    showModul1() {
        document.body.classList.add("in-flow");
        this.previousScreen = () => this.showModul1();

        showTextScreen(
            { heading: modul1.heading, paragraphs: modul1.paragraphs, callout: modul1.myteknaek },
            () => this.showModul2Intro(),
            () => this.exitRoom()
        );
    }

    showModul2Intro() {
        this.previousScreen = () => this.showModul2Intro();

        showRettighedsIntro(
            modul2,
            situationer,
            () => this.showModul2Selvvurdering(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul2Selvvurdering() {
        this.previousScreen = () => this.showModul2Selvvurdering();

        showChoiceQuestion(
            modul2.selvvurdering,
            () => this.showModul3(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showReference() {
        showReference(situationer, () => this.previousScreen());
    }

    showModul3() {
        this.previousScreen = () => this.showModul3();

        showChoiceQuestion(
            modul3,
            (answerId) => {
                if (answerId === "ja_passer") {
                    this.showModul3ValideringsTilbud();
                    return;
                }

                this.showModul3Branch();
            },
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul3ValideringsTilbud() {
        this.previousScreen = () => this.showModul3ValideringsTilbud();

        showValidationOffer(
            modul3,
            () => {
                this.valideringsvej = true;
                this.showModul7Checklist();
            },
            () => this.showModul3Branch(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul3Branch() {
        this.previousScreen = () => this.showModul3Branch();

        showExamplesForm(
            { heading: modul3.heading, exampleIntro: modul3.exampleIntro, reflectionQuestions: modul3.reflectionQuestions },
            () => this.showModul4(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul4() {
        this.previousScreen = () => this.showModul4();

        showInspirationForm(
            modul4,
            () => this.showModul5(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul5() {
        this.previousScreen = () => this.showModul5();

        showTextScreen(
            modul5,
            () => this.showModul6(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul6() {
        this.previousScreen = () => this.showModul6();

        showDirectionForm(
            modul6,
            () => this.captureModul6AndAdvance(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    captureModul6AndAdvance() {
        this.kriterier = {};

        modul6.fields.forEach((field) => {
            this.kriterier[field.id] = document.querySelector(`#field-${field.id}`).value;
        });

        this.showModul7Checklist();
    }

    showModul7Checklist() {
        this.previousScreen = () => this.showModul7Checklist();

        showChecklistInfo(
            modul7,
            () => this.showModul7Selvvurdering(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul7Selvvurdering() {
        this.previousScreen = () => this.showModul7Selvvurdering();

        showChoiceQuestion(
            { question: modul7.selvvurderingQuestion, options: modul7.selvvurderingOptions },
            (answerId) => {
                if (answerId === "tvivl") {
                    this.showModul7Uafklaret();
                    return;
                }

                this.showModul7Kontroltjek();
            },
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul7Uafklaret() {
        this.previousScreen = () => this.showModul7Uafklaret();

        showUafklaretMessage(
            modul7.uafklaretText,
            () => this.showModul7Kontroltjek(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul7Kontroltjek() {
        this.previousScreen = () => this.showModul7Kontroltjek();

        showKontroltjek(
            modul7,
            () => this.showModul8(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul8() {
        this.previousScreen = () => this.showModul8();

        let draftText;

        if (this.valideringsvej) {
            draftText = "Jeg bekræftede, at min nuværende billedretning allerede fungerer, og at jeg kender rettighederne til mine billeder.";
        } else {
            const { stil, motiver, palet } = this.kriterier;
            const parts = [];

            if (stil) parts.push(`Min billedstil er ${stil}.`);
            if (motiver) parts.push(`Motiver: ${motiver}.`);
            if (palet) parts.push(`Farvesammenhæng: ${palet}.`);

            draftText = parts.join(" ");
        }

        showDocumentation(
            modul8,
            draftText,
            () => this.saveAndFinish(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    async saveAndFinish() {
        const documentation = document.querySelector("#documentation-input").value;
        const data = {
            valideringsvej: this.valideringsvej,
            kriterier: this.kriterier
        };

        await saveVaekstrumOutput("billeder", data, documentation);

        window.location.href = "vaelg-din-dor.html";
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
