import {
    showWelcome,
    showTextScreen,
    showExampleChoice,
    showSingleImageUpload,
    showImageReflection,
    showImageImpressionQuestion,
    showPaletteBuilder,
    showColorRoleStep,
    showDosageStep,
    showPreviewStep,
    showContrastPickerStep,
    showContrastResultStep,
    showReflectionStep,
    showPaletteSummary,
    showExitConfirmation
} from "./farverUi.js";

import { velkomst, modul1, modul2, modul3, modul4, modul5, modul6, modul7, modul8 } from "../data/farver.js";
import { saveVaekstrumOutput, saveImage, deleteImage, getImagesForVaekstrum } from "../storage/vaekstrumStorage.js";
import { VISUELT_UDTRYK_HUB } from "./vaekstomraadeExit.js";
import { contrastRatio, contrastLevel } from "./contrast.js";

const FARVER_VAEKSTRUM_ID = "farver";

/*---- Selvstændig motor for det uddybende vækstrum "Farver" (Visuelt udtryk). Adskilt fra Prøverummets FlowEngine.js og fra Overbliks OverblikEngine.js: Farver har øvelsesskærme med flere fritekstfelter, farvevalg og et indbygget kontrasttjek - en anden form end begge de andre. ----*/

export class FarverEngine {

    palette = []; // { id, hex, role, percent } - fri længde, jf. Modul 6
    nextColorId = 1; // tæller til at generere stabile, unikke palette-id'er ("c1", "c2", ...)
    paletteDosageReady = false; // sikrer at doseringen kun initialiseres jævnt ÉN gang (ikke ved genbesøg via "Bliv i rummet")
    textColorId = null; // id på den palette-farve, der er valgt som tekstfarve i Boble 6.4 - null = sort som udgangspunkt
    contrast = null; // { textId, bgId, textHex, bgHex, ratio, level } - kun den ENDELIGT valgte kombination fra Modul 7
    reflection = ""; // fri tekst fra Boble 8.2
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
            () => this.showModul6Boble1(),
            () => this.exitRoom()
        );
    }

    /*---- Modul 6 - fri palet-bygger (fire bobler: vælg farver, giv dem roller, fordel dosering, se dem samlet), jf. docs/duf-manuskript-farver.md ----*/

    addColor(hex = modul6.boble1.defaultHex) {
        const color = { id: `c${this.nextColorId++}`, hex, role: "", percent: 0 };
        this.palette.push(color);
        return color;
    }

    updateColor(id, hex) {
        const color = this.palette.find((c) => c.id === id);
        if (color) color.hex = hex;
    }

    removeColor(id) {
        this.palette = this.palette.filter((c) => c.id !== id);
        if (this.textColorId === id) this.textColorId = null;
    }

    /*---- Fordeler doseringen jævnt på tværs af paletten - kaldes kun første gang brugeren når Boble 6.3 (this.paletteDosageReady), så et genbesøg via "Bliv i rummet" ikke nulstiller justeringer, brugeren allerede har lavet ----*/
    initializeDosage() {
        const n = this.palette.length;
        const even = Math.floor(100 / n);
        const remainder = 100 - even * n;

        this.palette.forEach((c, i) => {
            c.percent = even + (i < remainder ? 1 : 0);
        });
    }

    showModul6Boble1() {
        this.previousScreen = () => this.showModul6Boble1();

        if (this.palette.length === 0) {
            this.addColor(modul6.boble1.defaultHex);
        }

        showPaletteBuilder(
            modul6.boble1,
            this.palette,
            {
                getPalette: () => this.palette,
                addColor: () => this.addColor(modul6.boble1.defaultHex),
                updateColor: (id, hex) => this.updateColor(id, hex),
                removeColor: (id) => this.removeColor(id)
            },
            () => this.showModul6Boble2(0),
            () => this.exitRoom()
        );
    }

    showModul6Boble2(index) {
        this.previousScreen = () => this.showModul6Boble2(index);

        showColorRoleStep(
            modul6.boble2,
            this.palette,
            index,
            (roleText) => {
                this.palette[index].role = roleText;

                if (index + 1 < this.palette.length) this.showModul6Boble2(index + 1);
                else this.showModul6Boble3();
            },
            () => this.exitRoom()
        );
    }

    showModul6Boble3() {
        this.previousScreen = () => this.showModul6Boble3();

        if (!this.paletteDosageReady) {
            this.initializeDosage();
            this.paletteDosageReady = true;
        }

        showDosageStep(
            modul6.boble3,
            this.palette,
            () => this.showModul6Boble4(),
            () => this.exitRoom()
        );
    }

    showModul6Boble4() {
        this.previousScreen = () => this.showModul6Boble4();

        showPreviewStep(
            modul6.boble4,
            this.palette,
            this.textColorId,
            (chosenTextColorId) => {
                this.textColorId = chosenTextColorId;
                this.showModul7Boble1();
            },
            () => this.exitRoom()
        );
    }

    /*---- Modul 7 - palette-drevet kontrasttjek (tre bobler: intro, prøv kombinationer, se læsbarhedsvurdering) ----*/

    getContrastDefaults() {
        const textId = this.textColorId && this.palette.some((c) => c.id === this.textColorId)
            ? this.textColorId
            : this.palette[0].id;

        const bgCandidate = this.palette.find((c) => c.id !== textId);

        return { textId, bgId: bgCandidate ? bgCandidate.id : textId };
    }

    showModul7Boble1() {
        this.previousScreen = () => this.showModul7Boble1();

        showTextScreen(
            modul7.boble1,
            () => this.showModul7Boble2(this.getContrastDefaults()),
            () => this.exitRoom()
        );
    }

    showModul7Boble2(defaults) {
        this.previousScreen = () => this.showModul7Boble2(defaults);

        showContrastPickerStep(
            modul7.boble2,
            this.palette,
            defaults,
            (selection) => this.showModul7Boble3(selection),
            () => this.exitRoom()
        );
    }

    showModul7Boble3({ textId, bgId }) {
        const textColor = this.palette.find((c) => c.id === textId);
        const bgColor = this.palette.find((c) => c.id === bgId);
        const ratio = contrastRatio(textColor.hex, bgColor.hex);
        const combo = { textId, bgId, textHex: textColor.hex, bgHex: bgColor.hex, ratio, level: contrastLevel(ratio) };

        this.previousScreen = () => this.showModul7Boble3(combo);

        showContrastResultStep(
            modul7.boble3,
            combo,
            () => this.showModul7Boble2({ textId, bgId }),
            () => {
                this.contrast = combo;
                this.showModul8Boble1();
            },
            () => this.exitRoom()
        );
    }

    /*---- Modul 8 - afprøvning og dokumentation (tre bobler: prøv i praksis, reflekter, opsamling) ----*/

    showModul8Boble1() {
        this.previousScreen = () => this.showModul8Boble1();

        showTextScreen(
            modul8.boble1,
            () => this.showModul8Boble2(),
            () => this.exitRoom()
        );
    }

    showModul8Boble2() {
        this.previousScreen = () => this.showModul8Boble2();

        showReflectionStep(
            modul8.boble2,
            this.reflection,
            (value) => {
                this.reflection = value;
                this.showModul8Boble3();
            },
            () => this.exitRoom()
        );
    }

    showModul8Boble3() {
        this.previousScreen = () => this.showModul8Boble3();

        showPaletteSummary(
            modul8.boble3,
            { palette: this.palette, textColorId: this.textColorId, contrast: this.contrast, reflection: this.reflection },
            () => this.saveAndFinish(),
            () => this.exitRoom()
        );
    }

    async saveAndFinish() {
        const textColorHex = this.textColorId ? (this.palette.find((c) => c.id === this.textColorId)?.hex ?? null) : null;

        const data = {
            palette: this.palette.map(({ id, hex, role, percent }) => ({ id, hex, role, percent })),
            textColor: textColorHex,
            contrast: this.contrast
        };

        const documentation = buildDocumentationText(this.palette, textColorHex, this.contrast, this.reflection);

        await saveVaekstrumOutput("farver", data, documentation);

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

/*---- Modul 8 - genererer den fritekst-dokumentation, saveVaekstrumOutput gemmer og Fælles samling viser (jf. js/faellesSamling.js, som kun læser `documentation`-strengen, ikke `data`-objektets struktur). Boble 8.3 er bevidst en ren opsamlingsskærm uden redigerbart felt (jf. manuskriptet), så denne tekst sættes automatisk ud fra palette + tekstfarve + kontrastvalg + refleksion. ----*/

function buildDocumentationText(palette, textColorHex, contrast, reflection) {
    const paletteText = palette
        .map((c) => `${c.hex}${c.role ? ` (${c.role})` : ""} — ${c.percent}%`)
        .join(", ");

    const textColorText = textColorHex ? `Tekstfarve: ${textColorHex}.` : "Tekstfarve: sort som udgangspunkt.";

    const contrastText = contrast
        ? `Kontrastkombination: tekst ${contrast.textHex} på baggrund ${contrast.bgHex} (kontrastforhold ${contrast.ratio.toFixed(2)} : 1).`
        : "";

    const reflectionText = reflection ? `Det lagde jeg mærke til: ${reflection}` : "";

    return [`Palette: ${paletteText}.`, textColorText, contrastText, reflectionText].filter(Boolean).join(" ");
}
