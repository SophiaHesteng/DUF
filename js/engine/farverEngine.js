import {
    showWelcome,
    showTextScreen,
    showExampleChoice,
    showSingleImageUpload,
    showImageReflection,
    showImageImpressionQuestion,
    showPaletteForm,
    showContrastCheck,
    showDocumentation,
    showExitConfirmation
} from "./farverUi.js";

import { velkomst, modul1, modul2, modul3, modul4, modul5, modul6, modul7, modul8 } from "../data/farver.js";
import { saveVaekstrumOutput, saveImage, deleteImage, getImagesForVaekstrum } from "../storage/vaekstrumStorage.js";
import { VISUELT_UDTRYK_HUB } from "./vaekstomraadeExit.js";

const FARVER_VAEKSTRUM_ID = "farver";

/*---- Selvstændig motor for det uddybende vækstrum "Farver" (Visuelt udtryk). Adskilt fra Prøverummets FlowEngine.js og fra Overbliks OverblikEngine.js: Farver har øvelsesskærme med flere fritekstfelter, farvevalg og et indbygget kontrasttjek - en anden form end begge de andre. ----*/

export class FarverEngine {

    palette = [];
    modul3ImageSource = null; // "upload" | "duf" - sat i Boble 3.2, bruges i Boble 3.3
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

        /*---- Let session-markering (ikke svar/indhold) - bruges af Byggesten til at vise en anden velkomst, hvis brugeren allerede har arbejdet med Farver i samme besøg ----*/
        sessionStorage.setItem("duf-visited-farver", "1");

        showTextScreen(
            modul1.boble1,
            () => this.showModul1Boble2(),
            () => this.exitRoom()
        );
    }

    showModul1Boble2() {
        this.previousScreen = () => this.showModul1Boble2();

        showTextScreen(
            { heading: modul1.boble2.heading, examples: modul1.boble2.examples, paragraphs: modul1.boble2.closing },
            () => this.showModul2(),
            () => this.exitRoom()
        );
    }

    showModul2() {
        this.previousScreen = () => this.showModul2();

        showTextScreen(
            modul2,
            () => this.showModul3Boble1(),
            () => this.exitRoom()
        );
    }

    showModul3Boble1() {
        this.previousScreen = () => this.showModul3Boble1();

        showTextScreen(
            modul3.boble1,
            () => this.showModul3Boble2(),
            () => this.exitRoom()
        );
    }

    showModul3Boble2() {
        this.previousScreen = () => this.showModul3Boble2();

        showExampleChoice(
            modul3.boble2,
            () => {
                this.modul3ImageSource = "upload";
                this.showModul3Upload();
            },
            () => {
                this.modul3ImageSource = "duf";
                this.showModul3Reflection();
            },
            () => this.exitRoom()
        );
    }

    async showModul3Upload() {
        this.previousScreen = () => this.showModul3Upload();

        const images = await getImagesForVaekstrum(FARVER_VAEKSTRUM_ID);

        showSingleImageUpload(
            modul3.boble2,
            images,
            () => this.showModul3Reflection(),
            () => this.exitRoom(),
            {
                upload: async (file) => {
                    /*---- Boble 3.2 handler om ÉT billede, ikke en voksende galleri-liste - et nyt upload erstatter derfor et eventuelt tidligere ----*/
                    const existing = await getImagesForVaekstrum(FARVER_VAEKSTRUM_ID);
                    await Promise.all(existing.map((image) => deleteImage(image.id)));
                    return saveImage(FARVER_VAEKSTRUM_ID, file);
                },
                remove: (imageId) => deleteImage(imageId),
                refresh: () => getImagesForVaekstrum(FARVER_VAEKSTRUM_ID)
            }
        );
    }

    async showModul3Reflection() {
        this.previousScreen = () => this.showModul3Reflection();

        let imageUrl = modul3.boble2.dufImage;
        let imageAlt = modul3.boble2.dufImageAlt;

        if (this.modul3ImageSource === "upload") {
            const images = await getImagesForVaekstrum(FARVER_VAEKSTRUM_ID);
            const uploaded = images[images.length - 1];

            if (uploaded) {
                imageUrl = URL.createObjectURL(uploaded.blob);
                imageAlt = "Dit eget uploadede eksempel";
            }
        }

        showImageReflection(
            modul3.boble3,
            imageUrl,
            imageAlt,
            () => this.showModul4Intro(),
            () => this.exitRoom()
        );
    }

    showModul4Intro() {
        this.previousScreen = () => this.showModul4Intro();

        showTextScreen(
            modul4.intro,
            () => this.showModul4Example(0),
            () => this.exitRoom()
        );
    }

    showModul4Example(index) {
        this.previousScreen = () => this.showModul4Example(index);

        const example = modul4.examples[index];

        showImageImpressionQuestion(
            { heading: example.heading, image: example.image, imageAlt: example.imageAlt, question: modul4.question, options: modul4.options },
            (selected) => this.showModul4Response(index, selected),
            () => this.exitRoom()
        );
    }

    showModul4Response(index, selected) {
        this.previousScreen = () => this.showModul4Response(index, selected);

        const example = modul4.examples[index];
        const isLastExample = index === modul4.examples.length - 1;

        showTextScreen(
            { heading: example.heading, paragraphs: [matchModul4Response(example.responses, selected)], buttonText: isLastExample ? "Næste" : "Næste eksempel" },
            () => {
                if (isLastExample) this.showModul5Boble1();
                else this.showModul4Example(index + 1);
            },
            () => this.exitRoom()
        );
    }

    showModul5Boble1() {
        this.previousScreen = () => this.showModul5Boble1();

        showTextScreen(
            modul5.boble1,
            () => this.showModul5Boble2(),
            () => this.exitRoom()
        );
    }

    showModul5Boble2() {
        this.previousScreen = () => this.showModul5Boble2();

        showTextScreen(
            modul5.boble2,
            () => this.showModul5Boble3(),
            () => this.exitRoom()
        );
    }

    showModul5Boble3() {
        this.previousScreen = () => this.showModul5Boble3();

        showTextScreen(
            modul5.boble3,
            () => this.showModul6(),
            () => this.exitRoom()
        );
    }

    /*---- Modul 6, 7, 8 - ⚠️ URØRT (egne, senere byggeopgaver, jf. docs/duf-manuskript-farver.md). Kædet uændret fra Modul 5's sidste boble, som før fra det gamle Modul 5. ----*/

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
            () => this.saveAndFinish(),
            () => this.exitRoom()
        );
    }

    async saveAndFinish() {
        const documentation = document.querySelector("#documentation-input").value;

        await saveVaekstrumOutput("farver", this.palette, documentation);

        window.location.href = VISUELT_UDTRYK_HUB;
    }

    exitRoom() {
        showExitConfirmation(
            () => this.previousScreen(),
            () => {
                window.location.href = VISUELT_UDTRYK_HUB;
            }
        );
    }
}

/*---- Modul 4 - brugeren kan afkrydse flere felter, men kun ÉN feedback vises. `responses` er nummereret i prioriteret rækkefølge (jf. docs/duf-manuskript-farver.md); vi går igennem dem i den rækkefølge og viser den første, hvis "match"-id'er brugeren har afkrydset mindst ét af. Falder tilbage til den sidste ("Jeg er ikke sikker") hvis intet er afkrydset - en fortolkning, ikke eksplicit stavet ud i manuskriptet, jf. commit-beskeden. ----*/

function matchModul4Response(responses, selectedIds) {
    const selectedSet = new Set(selectedIds);
    const matched = responses.find((response) => response.match.some((id) => selectedSet.has(id)));

    return matched ? matched.text : responses[responses.length - 1].text;
}
