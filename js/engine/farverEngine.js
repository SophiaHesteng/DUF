import {
    showWelcome,
    showTextScreen,
    showExamplesBranch,
    showExamplesSkip,
    showExamplesForm,
    showInspirationForm,
    showPaletteForm,
    showContrastCheck,
    showDocumentation,
    showExitConfirmation
} from "./farverUi.js";

import { velkomst, modul1, modul2, modul3, modul4, modul5, modul6, modul7, modul8 } from "../data/farver.js";

/*---- Selvstændig motor for det uddybende vækstrum "Farver" (Visuelt udtryk). Adskilt fra Prøverummets FlowEngine.js og fra Overbliks OverblikEngine.js: Farver har øvelsesskærme med flere fritekstfelter, farvevalg og et indbygget kontrasttjek - en anden form end begge de andre. ----*/

export class FarverEngine {

    palette = [];
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
            () => this.showModul2(),
            () => this.exitRoom()
        );
    }

    showModul2() {
        this.previousScreen = () => this.showModul2();

        showTextScreen(
            modul2,
            () => this.showModul3Branch(),
            () => this.exitRoom()
        );
    }

    showModul3Branch() {
        this.previousScreen = () => this.showModul3Branch();

        showExamplesBranch(
            modul3,
            () => this.showModul3Form(),
            () => this.showModul3Skip(),
            () => this.exitRoom()
        );
    }

    showModul3Form() {
        this.previousScreen = () => this.showModul3Form();

        showExamplesForm(
            modul3,
            () => this.showModul4(),
            () => this.exitRoom()
        );
    }

    showModul3Skip() {
        this.previousScreen = () => this.showModul3Skip();

        showExamplesSkip(
            modul3.skipText,
            () => this.showModul4(),
            () => this.exitRoom()
        );
    }

    showModul4() {
        this.previousScreen = () => this.showModul4();

        showInspirationForm(
            modul4,
            () => this.showModul5(),
            () => this.exitRoom()
        );
    }

    showModul5() {
        this.previousScreen = () => this.showModul5();

        showTextScreen(
            modul5,
            () => this.showModul6(),
            () => this.exitRoom()
        );
    }

    showModul6() {
        this.previousScreen = () => this.showModul6();

        showPaletteForm(
            modul6,
            () => this.captureModul6AndAdvance(),
            () => this.exitRoom()
        );
    }

    captureModul6AndAdvance() {
        this.palette = modul6.roles.map((role) => ({
            id: role.id,
            label: role.label,
            hex: document.querySelector(`#hex-${role.id}`).value || role.defaultHex,
            reason: document.querySelector(`#reason-${role.id}`).value
        }));

        this.showModul7();
    }

    showModul7() {
        this.previousScreen = () => this.showModul7();

        const hovedfarve = this.palette.find((p) => p.id === "hoved");

        showContrastCheck(
            modul7,
            { text: hovedfarve ? hovedfarve.hex : "#0C3A2D", background: "#FEF3E8" },
            () => this.showModul8(),
            () => this.exitRoom()
        );
    }

    showModul8() {
        this.previousScreen = () => this.showModul8();

        const draftText = this.palette
            .map((p) => `${p.label} (${p.hex}): ${p.reason || "…"}`)
            .join(" ");

        showDocumentation(
            modul8,
            this.palette,
            draftText,
            null,
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
