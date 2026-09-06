import {
    showWelcome,
    showTextScreen,
    showExamplesBranch,
    showExamplesSkip,
    showExamplesForm,
    showRettighedsIntro,
    showReference,
    showFieldsForm,
    showChecklist,
    showReassurance,
    showDocumentation,
    showExitConfirmation
} from "./byggestenUi.js";

import { velkomst, modul1, modul2, situationer, modul3, modul4, modul5, modul6, modul7, modul8 } from "../data/byggesten.js";

/*---- Selvstændig motor for det uddybende vækstrum "Ikoner, fonte & andre grafiske byggesten" (Visuelt udtryk) - det fjerde og sidste uddybende rum i Visuel stil. Adskilt fra Prøverummets FlowEngine.js og fra Overbliks/Farvers/Logos/Billeders motorer. I modsætning til de tre andre uddybende rum er den kontekstuelle velkomst her ikke styret af et Overblik-svar, men af om brugeren allerede har besøgt Farver og/eller Logo i samme besøg (sessionStorage-flag sat af de motorer). ----*/

export class ByggestenEngine {

    kriterier = {};
    previousScreen = null;

    harArbejdetMedFarverEllerLogo() {
        return sessionStorage.getItem("duf-visited-farver") === "1" || sessionStorage.getItem("duf-visited-logo") === "1";
    }

    start() {
        const text = this.harArbejdetMedFarverEllerLogo() ? velkomst.kontekstuel : velkomst.standard;

        this.previousScreen = () => this.start();
        showWelcome(text, () => this.showModul1());
    }

    showModul1() {
        document.body.classList.add("in-flow");
        this.previousScreen = () => this.showModul1();

        showTextScreen(
            { heading: modul1.heading, paragraphs: modul1.paragraphs, callout: modul1.myteknaek },
            () => this.showModul2Branch(),
            () => this.exitRoom()
        );
    }

    showModul2Branch() {
        this.previousScreen = () => this.showModul2Branch();

        showExamplesBranch(
            modul2,
            () => this.showModul2Form(),
            () => this.showModul2Skip(),
            () => this.exitRoom()
        );
    }

    showModul2Form() {
        this.previousScreen = () => this.showModul2Form();

        showExamplesForm(
            modul2,
            () => this.showModul3RettighedsIntro(),
            () => this.exitRoom()
        );
    }

    showModul2Skip() {
        this.previousScreen = () => this.showModul2Skip();

        showExamplesSkip(
            modul2.skipText,
            () => this.showModul3RettighedsIntro(),
            () => this.exitRoom()
        );
    }

    showModul3RettighedsIntro() {
        this.previousScreen = () => this.showModul3RettighedsIntro();

        showRettighedsIntro(
            modul3,
            situationer,
            () => this.showModul3StilSporgsmaal(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showReference() {
        showReference(situationer, () => this.previousScreen());
    }

    showModul3StilSporgsmaal() {
        this.previousScreen = () => this.showModul3StilSporgsmaal();

        showFieldsForm(
            { heading: modul3.heading, intro: "Med rettighederne på plads, lad os se på selve stilen.", fields: modul3.fields, closing: modul3.closing },
            () => this.captureFieldsAndAdvance(modul3.fields, () => this.showModul4()),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul4() {
        this.previousScreen = () => this.showModul4();

        showFieldsForm(
            modul4,
            () => this.captureFieldsAndAdvance(modul4.fields, () => this.showModul5()),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul5() {
        this.previousScreen = () => this.showModul5();

        showFieldsForm(
            modul5,
            () => this.captureFieldsAndAdvance(modul5.fields, () => this.showModul6()),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    captureFieldsAndAdvance(fields, next) {
        fields.forEach((field) => {
            this.kriterier[field.id] = document.querySelector(`#field-${field.id}`).value;
        });

        next();
    }

    showModul6() {
        this.previousScreen = () => this.showModul6();

        const paragraph = this.harArbejdetMedFarverEllerLogo() ? modul6.harArbejdet : modul6.ingenAfklaring;

        showTextScreen(
            { heading: modul6.heading, paragraphs: [modul6.intro, paragraph] },
            () => this.showModul7Checklist(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul7Checklist() {
        this.previousScreen = () => this.showModul7Checklist();

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
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul7Reassurance() {
        this.previousScreen = () => this.showModul7Reassurance();

        showReassurance(
            modul7.notWorking,
            () => this.showModul8(),
            () => this.exitRoom(),
            () => this.showReference()
        );
    }

    showModul8() {
        this.previousScreen = () => this.showModul8();

        const { stil, alene, tilgaengelige, fordeling, laesbarhed, genbrugte, mulighed } = this.kriterier;

        const sentence = (value) => (value && !/[.!?]$/.test(value.trim()) ? `${value.trim()}.` : value ? value.trim() : "");
        const joinSentences = (values) => values.map(sentence).filter(Boolean).join(" ");

        const parts = [];

        if (stil) parts.push(`Min ikonstil er ${stil.trim().replace(/\.$/, "")}.`);
        if (alene) parts.push(`Om ikonerne skal stå alene: ${sentence(alene)}`);
        if (tilgaengelige || fordeling || laesbarhed) {
            parts.push(`Fonte: ${joinSentences([tilgaengelige, fordeling, laesbarhed])}`);
        }
        if (genbrugte || mulighed) {
            parts.push(`Andre byggesten: ${joinSentences([genbrugte, mulighed])}`);
        }

        const draftText = parts.join(" ");

        showDocumentation(
            modul8,
            draftText,
            () => this.exitRoom(),
            () => this.showReference()
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
