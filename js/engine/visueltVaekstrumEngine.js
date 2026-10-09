import {
    showWelcome,
    showTextScreen,
    showChoiceQuestion,
    showMultiChoiceQuestion,
    showAccordionStep,
    showModuleHub,
    showModuleBubble,
    showModul6Recap,
    showExitConfirmation,
    setRumNavigation
} from "./visueltVaekstrumUi.js";

import { velkomst, moduler, modul1, modul2, modul3, modul4, modul5, modul6, ROOMS } from "../data/visueltVaekstrum.js";
import { saveVaekstrumOutput } from "../storage/vaekstrumStorage.js";
import { VISUELT_VAEKSTRUM_ID, INGEN_KANALER } from "../storage/udgangspunkt.js";
import { VISUELT_UDTRYK_HUB } from "./vaekstomraadeExit.js";
import { RumHistorik } from "./rumHistorik.js";

/*---- Boble 2.3's respons kan sammensættes af flere relevante responser (jf. manuskriptet): "ikke sikker endnu" vinder over antal, ellers afgør antallet af valg "mange"/"få"-responsen, og et ekstra nik tilføjes, hvis brugeren har valgt ikoner/illustrationer/skrifttyper. Delt mellem Boble 2.3's egen respons og Modul 6's opsummering af den. ----*/

function getHvadBrugerDuFeedback(selected) {
    const { responses, ikonAgtigeValg, ikkeSikkerValg } = modul2.hvadBrugerDu;

    let text;
    if (selected.includes(ikkeSikkerValg)) {
        text = responses.ikkeSikker;
    } else if (selected.length >= 4) {
        text = responses.mange;
    } else {
        text = responses.faa;
    }

    const paragraphs = [text];
    if (selected.some((choice) => ikonAgtigeValg.includes(choice))) {
        paragraphs.push(responses.ikonNudge);
    }

    return paragraphs;
}

/*---- Variant af Boble 2.3 ("Hvad har du lyst til at starte med?"): "Jeg ved det ikke endnu" - eller intet valgt - giver vedIkke-responsen, ellers nogetValgt. Delt med Modul 6's opsummering ----*/

function getHvadBrugerDuNyFeedback(selectedKeys) {
    const { responses, vedIkkeKey } = modul2.hvadBrugerDuNy;

    if (selectedKeys.length === 0 || selectedKeys.includes(vedIkkeKey)) {
        return [responses.vedIkke];
    }

    return [responses.nogetValgt];
}

/*---- Boble 6.1's første linje - brugerens kanaler fra Boble 2.2, eller "rent bord" ----*/

function getKanalerRecap(kanalKeys) {
    const { options, recapPrefix, recapIngen } = modul2.kanaler;

    if (kanalKeys.includes(INGEN_KANALER)) return recapIngen;

    const titles = kanalKeys.map((key) => options.find((option) => option.key === key).title);
    return `${recapPrefix} ${titles.join(", ")}`;
}

/*---- Selvstændig motor for det grundlæggende vækstrum "Det visuelle udtryk for din praksis" (vækstområdet Visuelt udtryk for din praksis). Bevidst adskilt fra Prøverummets FlowEngine.js: rummet har forgrenede spørgsmål, et accordion-modul (Modul 3), et browsbart modul (Modul 5) og en opsummering bygget på flere samtidige svar, i stedet for én lineær spørgsmål/point-rækkefølge.

Modul 2 forgrener sig efter Boble 2.2 (runde 7): starterFraBunden afgør, om 2.3/2.6 vises i deres almindelige version eller som variant, og om 2.4/2.5 springes over. Vejen afgøres af det gemte svar, hver gang en skærm vises - går brugeren tilbage (via "Tilbage" eller navigationslinjerne) og ændrer sit svar i 2.2, følger hun derfor automatisk den nye vej. Modul 2's egne "Tilbage"-knapper og Modul 5's "Tilbage til oversigt" er afløst af den fælles ramme (js/components/rumRamme.js), som fører til samme skærme. ----*/

export class VisueltVaekstrumEngine {

    answers = {};
    historik = new RumHistorik(); // brugerens rute gennem moduler/bobler - til navigationslinjerne, "Tilbage" og "Bliv i rummet"

    get starterFraBunden() {
        return this.answers.kanaler?.includes(INGEN_KANALER) ?? false;
    }

    start() {
        setRumNavigation(() => this.historik.navigation("Det visuelle udtryk for din praksis", moduler));
        showWelcome(velkomst, () => this.showModul1Intro());
    }

    showModul1Intro() {
        document.body.classList.add("in-flow");
        this.historik.besoeg(1, "1.1", () => this.showModul1Intro());

        showTextScreen(
            modul1.intro,
            () => this.showModul1Question(),
            () => this.exitRoom()
        );
    }

    showModul1Question() {
        this.historik.besoeg(1, "1.2", () => this.showModul1Question());

        showChoiceQuestion(
            modul1.question,
            (answer) => {
                this.answers.udgangspunkt = modul1.question.optionKeys[modul1.question.options.indexOf(answer)];
                this.showModul1Response(answer);
            },
            () => this.exitRoom()
        );
    }

    /*---- Boble 1.3 - dynamisk respons, ét af fem forløb afhængigt af Boble 1.2's svar. Genbruger showTextScreen fremfor at bygge en ny skærmtype, jf. samme "spørgsmål → dedikeret responsskærm"-mønster som Prøverummets FlowEngine (showQuestion → showFeedback) ----*/

    showModul1Response(answer) {
        this.historik.besoeg(1, "1.3", () => this.showModul1Response(answer));

        const response = modul1.responses[answer];

        showTextScreen(
            { heading: "Din respons", paragraphs: [response.text], guide: response.guide },
            () => this.showModul1Outro(),
            () => this.exitRoom()
        );
    }

    showModul1Outro() {
        this.historik.besoeg(1, "1.4", () => this.showModul1Outro());

        showTextScreen(
            modul1.outro,
            () => this.showModul2Intro(),
            () => this.exitRoom()
        );
    }

    showModul2Intro() {
        this.historik.besoeg(2, "2.1", () => this.showModul2Intro());

        showTextScreen(
            modul2.intro,
            () => this.showModul2Kanaler(),
            () => this.exitRoom()
        );
    }

    /*---- Boble 2.2 - kanaler. Tidligere valg er forudvalgt, hvis brugeren kommer tilbage hertil ----*/

    showModul2Kanaler() {
        this.historik.besoeg(2, "2.2", () => this.showModul2Kanaler());

        const { options, exclusiveKey } = modul2.kanaler;
        const previousKeys = this.answers.kanaler ?? [];

        showMultiChoiceQuestion(
            modul2.kanaler,
            (selected) => {
                this.answers.kanaler = selected.map((option) => option.key);
                this.showModul2KanalerResponse();
            },
            () => this.exitRoom(),
            {
                exclusiveIndex: options.findIndex((option) => option.key === exclusiveKey),
                preselected: options.flatMap((option, index) => (previousKeys.includes(option.key) ? [index] : [])),
                requireSelection: true
            }
        );
    }

    showModul2KanalerResponse() {
        this.historik.besoeg(2, "2.2", () => this.showModul2KanalerResponse());

        const { heading, responses } = modul2.kanaler;

        showTextScreen(
            { heading, paragraphs: [this.starterFraBunden ? responses.ingen : responses.harKanaler] },
            () => this.showModul2HvadBrugerDu(),
            () => this.exitRoom()
        );
    }

    /*---- Boble 2.3 - almindelig version eller varianten "Hvad har du lyst til at starte med?" ----*/

    showModul2HvadBrugerDu() {
        this.historik.besoeg(2, "2.3", () => this.showModul2HvadBrugerDu());

        if (this.starterFraBunden) {
            showMultiChoiceQuestion(
                modul2.hvadBrugerDuNy,
                (selected, selectedIndexes) => {
                    this.answers.starteMed = selected.map((option) => option.key);
                    this.answers.starteMedIndexes = selectedIndexes;
                    this.showModul2HvadBrugerDuResponse();
                },
                () => this.exitRoom(),
                { preselected: this.answers.starteMedIndexes ?? [] }
            );
            return;
        }

        showMultiChoiceQuestion(
            modul2.hvadBrugerDu,
            (selected, selectedIndexes) => {
                this.answers.brugerAllerede = selected;
                this.answers.brugerAlleredeIndexes = selectedIndexes;
                this.showModul2HvadBrugerDuResponse();
            },
            () => this.exitRoom(),
            { preselected: this.answers.brugerAlleredeIndexes ?? [] }
        );
    }

    showModul2HvadBrugerDuResponse() {
        this.historik.besoeg(2, "2.3", () => this.showModul2HvadBrugerDuResponse());

        const screen = this.starterFraBunden
            ? { heading: modul2.hvadBrugerDuNy.heading, paragraphs: getHvadBrugerDuNyFeedback(this.answers.starteMed) }
            : { heading: modul2.hvadBrugerDu.heading, paragraphs: getHvadBrugerDuFeedback(this.answers.brugerAllerede) };

        showTextScreen(
            screen,
            // 2.4 og 2.5 springes over for brugeren, der ikke har noget endnu
            () => (this.starterFraBunden ? this.showModul2Outro() : this.showModul2Moenster()),
            () => this.exitRoom()
        );
    }

    showModul2Moenster() {
        this.historik.besoeg(2, "2.4", () => this.showModul2Moenster());

        showChoiceQuestion(
            modul2.moenster,
            (answer) => {
                this.answers.moenster = answer;
                this.showModul2MoensterResponse(answer);
            },
            () => this.exitRoom()
        );
    }

    showModul2MoensterResponse(answer) {
        this.historik.besoeg(2, "2.4", () => this.showModul2MoensterResponse(answer));

        showTextScreen(
            { heading: modul2.moenster.heading, paragraphs: [modul2.moenster.responses[answer]] },
            () => this.showModul2Folelse(),
            () => this.exitRoom()
        );
    }

    showModul2Folelse() {
        this.historik.besoeg(2, "2.5", () => this.showModul2Folelse());

        showChoiceQuestion(
            modul2.folelse,
            (answer) => {
                this.answers.folelse = answer;
                this.showModul2FolelseResponse(answer);
            },
            () => this.exitRoom()
        );
    }

    showModul2FolelseResponse(answer) {
        this.historik.besoeg(2, "2.5", () => this.showModul2FolelseResponse(answer));

        showTextScreen(
            { heading: modul2.folelse.heading, paragraphs: [modul2.folelse.responses[answer]] },
            () => this.showModul2Outro(),
            () => this.exitRoom()
        );
    }

    /*---- Boble 2.6 - almindelig version eller varianten for brugeren, der ikke har noget endnu ----*/

    showModul2Outro() {
        this.historik.besoeg(2, "2.6", () => this.showModul2Outro());

        showTextScreen(
            this.starterFraBunden ? modul2.outroNy : modul2.outro,
            () => this.showModul3(),
            () => this.exitRoom()
        );
    }

    showModul3() {
        this.historik.besoeg(3, "3.1", () => this.showModul3());

        showAccordionStep(
            modul3,
            () => this.showModul4(),
            () => this.exitRoom()
        );
    }

    showModul4() {
        this.historik.besoeg(4, "4.1", () => this.showModul4());

        showTextScreen(
            modul4,
            () => this.showModul5(),
            () => this.exitRoom()
        );
    }

    showModul5() {
        this.historik.besoeg(5, "5.1", () => this.showModul5());

        showModuleHub(
            modul5,
            (key) => this.showModul5Bubble(key),
            () => this.showModul6(),
            () => this.exitRoom()
        );
    }

    showModul5Bubble(key) {
        this.historik.besoeg(5, `5.2-${key}`, () => this.showModul5Bubble(key));

        showModuleBubble(
            modul5.bubbles.find((bubble) => bubble.key === key),
            () => this.showModul6(),
            () => this.exitRoom()
        );
    }

    /*---- Boble 6.1 - brugerens udgangspunkt gemmes varigt, så snart hun når hertil (også hvis hun ikke vælger et rum). For brugeren, der ikke har noget endnu, vises 2.3-variantens svar, og 2.4/2.5 udelades ----*/

    showModul6() {
        this.historik.besoeg(6, "6.1", () => this.showModul6());

        this.saveUdgangspunkt();

        const summary = this.starterFraBunden
            ? {
                kanaler: getKanalerRecap(this.answers.kanaler),
                hvadBrugerDu: getHvadBrugerDuNyFeedback(this.answers.starteMed)
            }
            : {
                kanaler: getKanalerRecap(this.answers.kanaler),
                hvadBrugerDu: getHvadBrugerDuFeedback(this.answers.brugerAllerede),
                moenster: {
                    answer: this.answers.moenster,
                    response: modul2.moenster.responses[this.answers.moenster]
                },
                folelse: {
                    answer: this.answers.folelse,
                    response: modul2.folelse.responses[this.answers.folelse]
                }
            };

        const rooms = [ROOMS.farver, ROOMS.logo, ROOMS.billeder, ROOMS.byggesten];

        showModul6Recap(
            {
                summary,
                introText: modul6.recapIntro,
                guideText: modul6.guide,
                closingText: modul6.closing,
                rooms
            },
            (room) => this.chooseRoom(room),
            () => this.exitRoom()
        );
    }

    /*---- Rum-kort er knapper, ikke rene links (jf. manuskriptet), fordi valget skal gemmes, FØR browseren navigerer videre ----*/

    async chooseRoom(room) {
        await this.saveUdgangspunkt(room);
        window.location.href = room.link;
    }

    /*---- "Det, rummet husker" (runde 7, jf. docs/duf-manuskript-visuelt-udtryk.md): udgangspunkt (1.2), kanaler (2.2) og - når hun vælger et - det valgte rum. De øvrige boble-svar fra Modul 1-5 gemmes fortsat ikke, kun i this.answers. Læses af de andre rum via hentUdgangspunkt() i js/storage/udgangspunkt.js. Et nyt gennemløb overskriver det gemte ----*/

    saveUdgangspunkt(room) {
        const { udgangspunkt, kanaler } = this.answers;
        const data = room
            ? { udgangspunkt, kanaler, room: room.id, chosenAt: new Date().toISOString() }
            : { udgangspunkt, kanaler };
        const documentation = room
            ? `Det visuelle udtryk for din praksis gennemført. Brugeren valgte at gå videre til: ${room.name}.`
            : "Det visuelle udtryk for din praksis gennemført. Brugeren har ikke valgt et rum endnu.";

        return saveVaekstrumOutput(VISUELT_VAEKSTRUM_ID, data, documentation).catch(() => ({ ok: false }));
    }

    exitRoom() {
        showExitConfirmation(
            () => this.historik.genvis(),
            () => {
                window.location.href = VISUELT_UDTRYK_HUB;
            }
        );
    }
}
