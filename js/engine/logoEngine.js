import {
    showWelcome,
    showTextScreen,
    showChoiceQuestion,
    showOptionalReflection,
    showValidationOffer,
    showInspirationForm,
    showBuildForm,
    showChecklist,
    showReassurance,
    showDocumentation,
    showExitConfirmation
} from "./logoUi.js";

import { velkomst, modul1, modul2, modul3, modul4, modul5, modul6, modul7, modul8, retningTekst } from "../data/logo.js";

/*---- Selvstændig motor for det uddybende vækstrum "Logo" (Visuelt udtryk). Adskilt fra Prøverummets FlowEngine.js og fra Overbliks/Farvers motorer - Logo har to reelle forgreningspunkter (Modul 2's valideringsvej, Modul 4's retningsvalg), som ingen af de andre motorer skal håndtere. ----*/

export class LogoEngine {

    retning = null;
    valideringsvej = false;
    modul6Description = "";
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

        showTextScreen(
            { heading: modul2.heading, paragraphs: [modul2.intro] },
            () => this.showModul2Sporgsmaal1(),
            () => this.exitRoom()
        );
    }

    showModul2Sporgsmaal1() {
        this.previousScreen = () => this.showModul2Sporgsmaal1();

        showChoiceQuestion(
            modul2.sporgsmaal1,
            (answerId) => {
                if (answerId === "ja_tilfreds") {
                    this.showModul2Sporgsmaal2();
                    return;
                }

                this.showModul2Oevelse();
            },
            () => this.exitRoom()
        );
    }

    showModul2Sporgsmaal2() {
        this.previousScreen = () => this.showModul2Sporgsmaal2();

        showChoiceQuestion(
            modul2.sporgsmaal2,
            (answerId) => {
                if (answerId === "valideringsvej") {
                    this.showModul2ValideringsTilbud();
                    return;
                }

                this.showModul3();
            },
            () => this.exitRoom()
        );
    }

    showModul2ValideringsTilbud() {
        this.previousScreen = () => this.showModul2ValideringsTilbud();

        showValidationOffer(
            modul2,
            () => {
                this.valideringsvej = true;
                this.showModul7();
            },
            () => this.showModul3(),
            () => this.exitRoom()
        );
    }

    showModul2Oevelse() {
        this.previousScreen = () => this.showModul2Oevelse();

        showOptionalReflection(
            modul2.oevelseLabel,
            () => this.showModul3(),
            () => this.exitRoom()
        );
    }

    showModul3() {
        this.previousScreen = () => this.showModul3();

        showInspirationForm(
            modul3,
            () => this.showModul4(),
            () => this.exitRoom()
        );
    }

    showModul4() {
        this.previousScreen = () => this.showModul4();

        showChoiceQuestion(
            modul4,
            (answerId) => {
                this.retning = answerId;
                this.showModul4Closing();
            },
            () => this.exitRoom()
        );
    }

    showModul4Closing() {
        this.previousScreen = () => this.showModul4Closing();

        showTextScreen(
            { heading: modul4.heading, paragraphs: [modul4.closing] },
            () => this.showModul5(),
            () => this.exitRoom()
        );
    }

    showModul5() {
        this.previousScreen = () => this.showModul5();

        showTextScreen(
            { heading: modul5.heading, paragraphs: [modul5.intro, modul5.ingenPalet] },
            () => {
                if (this.retning === "behold") {
                    this.showModul7();
                    return;
                }

                this.showModul6();
            },
            () => this.exitRoom()
        );
    }

    showModul6() {
        this.previousScreen = () => this.showModul6();

        showBuildForm(
            modul6,
            () => {
                this.modul6Description = document.querySelector("#description-input").value;
                this.showModul7();
            },
            () => this.exitRoom()
        );
    }

    showModul7() {
        this.previousScreen = () => this.showModul7();

        showChecklist(
            modul7,
            () => {
                const items = document.querySelectorAll("[data-checklist-item]");
                const allChecked = Array.from(items).every((item) => item.getAttribute("aria-pressed") === "true");

                if (allChecked) {
                    this.showModul8();
                    return;
                }

                this.showModul7Reassurance();
            },
            () => this.exitRoom()
        );
    }

    showModul7Reassurance() {
        this.previousScreen = () => this.showModul7Reassurance();

        const canGoBackToModul6 = this.retning === "juster" || this.retning === "nyt";

        showReassurance(
            modul7.notWorking,
            canGoBackToModul6,
            () => this.showModul6(),
            () => this.showModul8(),
            () => this.exitRoom()
        );
    }

    showModul8() {
        this.previousScreen = () => this.showModul8();

        const retningKey = this.valideringsvej ? "valideringsvej" : this.retning;
        const retningSaetning = retningKey ? retningTekst[retningKey] : "";

        let draftText = retningSaetning ? `Jeg valgte at ${retningSaetning}.` : "";

        if (this.modul6Description) {
            draftText += ` ${this.modul6Description}`;
        }

        showDocumentation(modul8, draftText.trim(), () => this.exitRoom());
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
