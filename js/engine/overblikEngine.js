import {
    showWelcome,
    showTextScreen,
    showChoiceQuestion,
    showMultiChoiceQuestion,
    showModuleHub,
    showModuleBubble,
    showModul6Recap,
    showExitConfirmation
} from "./overblikUi.js";

import { velkomst, modul1, modul2, modul3, modul4, modul5, modul6, ROOMS } from "../data/overblik.js";
import { saveVaekstrumOutput } from "../storage/vaekstrumStorage.js";
import { VISUELT_UDTRYK_HUB } from "./vaekstomraadeExit.js";

const OVERBLIK_VAEKSTRUM_ID = "overblik";

/*---- Boble 2.2's respons kan sammensættes af flere relevante responser (jf. manuskriptet): "ikke sikker endnu" vinder over antal, ellers afgør antallet af valg "mange"/"få"-responsen, og et ekstra nik tilføjes, hvis brugeren har valgt ikoner/illustrationer/skrifttyper. Delt mellem Boble 2.2's egen respons og Modul 6's opsummering af den. ----*/

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

/*---- Selvstændig motor for det grundlæggende vækstrum "Overblik" (Visuelt udtryk). Bevidst adskilt fra Prøverummets FlowEngine.js: Overblik har forgrenede spørgsmål, et browsbart modul (Modul 3) og en resultatskærm bygget på flere samtidige signaler, i stedet for én lineær spørgsmål/point-rækkefølge. ----*/

export class OverblikEngine {

    answers = {};
    previousScreen = null;

    start() {
        this.previousScreen = () => this.start();
        showWelcome(velkomst, () => this.showModul1Intro());
    }

    showModul1Intro() {
        document.body.classList.add("in-flow");
        this.previousScreen = () => this.showModul1Intro();

        showTextScreen(
            modul1.intro,
            () => this.showModul1Question(),
            () => this.exitRoom()
        );
    }

    showModul1Question() {
        this.previousScreen = () => this.showModul1Question();

        showChoiceQuestion(
            modul1.question,
            (answer) => {
                this.answers.udgangspunkt = answer;
                this.showModul1Response(answer);
            },
            () => this.exitRoom()
        );
    }

    /*---- Boble 1.3 - dynamisk respons, ét af fem forløb afhængigt af Boble 1.2's svar. Genbruger showTextScreen fremfor at bygge en ny skærmtype, jf. samme "spørgsmål → dedikeret responsskærm"-mønster som Prøverummets FlowEngine (showQuestion → showFeedback) ----*/

    showModul1Response(answer) {
        this.previousScreen = () => this.showModul1Response(answer);

        const response = modul1.responses[answer];

        showTextScreen(
            { heading: "Din respons", paragraphs: [response.text], guide: response.guide },
            () => this.showModul1Outro(),
            () => this.exitRoom()
        );
    }

    showModul1Outro() {
        this.previousScreen = () => this.showModul1Outro();

        showTextScreen(
            modul1.outro,
            () => this.showModul2Intro(),
            () => this.exitRoom()
        );
    }

    showModul2Intro() {
        this.previousScreen = () => this.showModul2Intro();

        showTextScreen(
            modul2.intro,
            () => this.showModul2HvadBrugerDu(),
            () => this.exitRoom()
        );
    }

    showModul2HvadBrugerDu() {
        this.previousScreen = () => this.showModul2HvadBrugerDu();

        showMultiChoiceQuestion(
            modul2.hvadBrugerDu,
            (selected) => {
                this.answers.brugerAllerede = selected;
                this.showModul2HvadBrugerDuResponse(selected);
            },
            () => this.exitRoom()
        );
    }

    showModul2HvadBrugerDuResponse(selected) {
        this.previousScreen = () => this.showModul2HvadBrugerDuResponse(selected);

        showTextScreen(
            { heading: modul2.hvadBrugerDu.heading, paragraphs: getHvadBrugerDuFeedback(selected) },
            () => this.showModul2Moenster(),
            () => this.exitRoom()
        );
    }

    showModul2Moenster() {
        this.previousScreen = () => this.showModul2Moenster();

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
        this.previousScreen = () => this.showModul2MoensterResponse(answer);

        showTextScreen(
            { heading: modul2.moenster.heading, paragraphs: [modul2.moenster.responses[answer]] },
            () => this.showModul2Folelse(),
            () => this.exitRoom()
        );
    }

    showModul2Folelse() {
        this.previousScreen = () => this.showModul2Folelse();

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
        this.previousScreen = () => this.showModul2FolelseResponse(answer);

        showTextScreen(
            { heading: modul2.folelse.heading, paragraphs: [modul2.folelse.responses[answer]] },
            () => this.showModul2Outro(),
            () => this.exitRoom()
        );
    }

    showModul2Outro() {
        this.previousScreen = () => this.showModul2Outro();

        showTextScreen(
            modul2.outro,
            () => this.showModul3(),
            () => this.exitRoom()
        );
    }

    showModul3() {
        this.previousScreen = () => this.showModul3();

        showModuleHub(
            modul3,
            (key) => this.showModul3Bubble(key),
            () => this.showModul4(),
            () => this.exitRoom()
        );
    }

    showModul3Bubble(key) {
        this.previousScreen = () => this.showModul3Bubble(key);

        showModuleBubble(
            modul3.bubbles.find((bubble) => bubble.key === key),
            () => this.showModul3(),
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

        showModuleHub(
            modul5,
            (key) => this.showModul5Bubble(key),
            () => this.showModul6(),
            () => this.exitRoom()
        );
    }

    showModul5Bubble(key) {
        this.previousScreen = () => this.showModul5Bubble(key);

        showModuleBubble(
            modul5.bubbles.find((bubble) => bubble.key === key),
            () => this.showModul5(),
            () => this.showModul6(),
            () => this.exitRoom()
        );
    }

    showModul6() {
        this.previousScreen = () => this.showModul6();

        const summary = {
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

    chooseRoom(room) {
        this.saveChosenRoom(room);
        window.location.href = room.link;
    }

    /*---- "Den lille version" (jf. docs/duf-manuskript-overblik.md, besluttet 2026-09-08, justeret 2026-09-09): der er ikke længere en "anbefalings-type" at gemme, kun det rum, brugeren faktisk valgte. De granulære boble-svar fra Modul 1-5 gemmes fortsat ikke, kun i this.answers ----*/

    saveChosenRoom(room) {
        saveVaekstrumOutput(
            OVERBLIK_VAEKSTRUM_ID,
            { room: room.id, chosenAt: new Date().toISOString() },
            `Overblik gennemført. Brugeren valgte at gå videre til: ${room.name}.`
        );
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
