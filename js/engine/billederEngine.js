import {
    showWelcome,
    showReference,
    showExitConfirmation,
    RENDERERS
} from "./billederUi.js";

import { bobler, velkomst, situationer } from "../data/billeder.js";
import { saveVaekstrumOutput, saveImage, deleteImage, getImagesForVaekstrum, getVaekstrumOutput } from "../storage/vaekstrumStorage.js";
import { VISUELT_UDTRYK_HUB } from "./vaekstomraadeExit.js";

const BILLEDE_VAEKSTRUM_ID = "billeder";

/*---- "Min inspiration" (Modul 4) genbruger den samme billedlagring som "Billeder fra min praksis" (Modul 3), under en anden nøgle - så de to samlinger ikke blandes sammen i IndexedDB (afklaret med Heidi 2026-09-19). ----*/
const INSPIRATION_BUCKET_ID = "billeder-inspiration";

const BUCKET_IDS = {
    praksis: BILLEDE_VAEKSTRUM_ID,
    inspiration: INSPIRATION_BUCKET_ID
};

/*----------------------------------------------------------------------------
 * Selvstændig motor for det uddybende vækstrum "Billeder" (Visuelt udtryk).
 * Adskilt fra Prøverummets FlowEngine.js og fra Overbliks/Farvers/Logos
 * motorer - Billeder har et fast opslagsværk tilgængeligt gennem hele rummet
 * (rettighedsoversigten), som ingen af de andre rum har brug for.
 *
 * Data-drevet (gennemrevideret 2026-09-19, jf. docs/duf-manuskript-billeder.md):
 * `bobler` er én flad, ordnet liste - denne motor rykker blot til næste
 * indeks og slår op i `RENDERERS[boble.type]`, i stedet for én navngiven
 * metode pr. skærm (uholdbart ved ca. 40 skærme). Der er ingen reel
 * forgrening i det nuværende manuskript - kun rækkefølge og ét afsluttende
 * gem-trin.
 * ----------------------------------------------------------------------------
 */

export class BilledeEngine {

    index = 0;
    answers = {};
    previousScreen = null;

    start() {
        const params = new URLSearchParams(window.location.search);
        const fromOverblik = params.get("fra") === "overblik";
        const text = fromOverblik ? velkomst.fraOverblik : velkomst.standard;

        this.previousScreen = () => this.start();

        showWelcome(text, () => {
            document.body.classList.add("in-flow");
            this.showBoble(0);
        });
    }

    async showBoble(index) {
        this.index = index;
        const boble = bobler[index];
        this.previousScreen = () => this.showBoble(index);

        const onNext = (rawAnswer) => this.advance(boble, rawAnswer);
        const onExit = () => this.exitRoom();
        /*---- Opslagsværket handler om billedrettigheder, så det er kun relevant fra Modul 2 og frem - ligesom i det oprindelige rum ----*/
        const onReference = boble.modul >= 2 ? () => this.showReference() : null;
        const render = RENDERERS[boble.type];

        switch (boble.type) {
            case "text": {
                const images = boble.showImagesBucket
                    ? await getImagesForVaekstrum(BUCKET_IDS[boble.showImagesBucket])
                    : null;
                render(boble, images, onNext, onExit, onReference);
                break;
            }
            case "textNote": {
                const prefillText = boble.prefillFrom === "compassSummary" ? this.buildCompassText() : "";
                render(boble, prefillText, onNext, onExit, onReference);
                break;
            }
            case "imageUpload": {
                const bucketId = BUCKET_IDS[boble.bucket];
                const images = await getImagesForVaekstrum(bucketId);
                render(boble, images, onNext, onExit, onReference, {
                    upload: (file) => saveImage(bucketId, file),
                    remove: (imageId) => deleteImage(imageId),
                    refresh: () => getImagesForVaekstrum(bucketId)
                });
                break;
            }
            case "paletteCompare": {
                const farverOutput = await getVaekstrumOutput("farver");
                render(boble, farverOutput, onNext, onExit, onReference);
                break;
            }
            case "compassSummary":
                render(boble, this.buildCompassSummaryItems(), onNext, onExit, onReference);
                break;
            default:
                render(boble, onNext, onExit, onReference);
        }
    }

    async advance(boble, rawAnswer) {
        if (boble.answerKey) {
            this.answers[boble.answerKey] = this.resolveAnswer(boble, rawAnswer);
        }

        if (boble.isFinal) {
            await this.saveAndFinish();
            return;
        }

        this.showBoble(this.index + 1);
    }

    resolveAnswer(boble, rawAnswer) {
        switch (boble.type) {
            case "choice":
            case "paletteCompare": {
                if (rawAnswer && typeof rawAnswer === "object") {
                    return { id: rawAnswer.optionId, text: rawAnswer.text };
                }
                if (!rawAnswer) return { skipped: true };
                const option = boble.options.find((o) => o.id === rawAnswer);
                return { id: rawAnswer, text: option?.text ?? rawAnswer };
            }
            case "multiChoice": {
                const labelsById = Object.fromEntries(boble.options.map((o) => [o.id, o.text]));
                return {
                    selected: rawAnswer.selected.map((id) => ({ id, text: labelsById[id] })),
                    note: rawAnswer.note || ""
                };
            }
            default:
                return rawAnswer;
        }
    }

    buildCompassSummaryItems() {
        const items = [];

        const stil = this.answers.modul6_stil;
        if (stil?.text) items.push({ label: "Stil", value: stil.text });

        const ord = this.answers.modul5_ord;
        if (ord?.selected?.length || ord?.note) {
            const words = [...(ord?.selected || []).map((o) => o.text), ord?.note].filter(Boolean);
            items.push({ label: "Ord, du vil opleves som", value: words.join(", ") });
        }

        const motiver = this.answers.modul6_motiver;
        if (motiver?.horer_til) items.push({ label: "Det her hører til", value: motiver.horer_til });
        if (motiver?.horer_ikke_til) items.push({ label: "Det her hører ikke til", value: motiver.horer_ikke_til });

        const farve = this.answers.modul6_farve_sammenhaeng;
        if (farve?.text && !farve.skipped) items.push({ label: "Sammenhæng med farver", value: farve.text });

        return items;
    }

    buildCompassText() {
        const items = this.buildCompassSummaryItems();
        if (!items.length) return "";

        return items.map((item) => `${item.label}: ${item.value}.`).join(" ");
    }

    showReference() {
        showReference(situationer, () => this.previousScreen());
    }

    async saveAndFinish() {
        const documentation = this.answers.modul8_dokumentation?.dokumentation || "";
        const data = {
            answers: this.answers,
            kompas: this.buildCompassSummaryItems()
        };

        await saveVaekstrumOutput(BILLEDE_VAEKSTRUM_ID, data, documentation);

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
