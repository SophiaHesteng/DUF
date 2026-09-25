import {
    showWelcome,
    showReference,
    showExitConfirmation,
    RENDERERS
} from "./billederUi.js";

import { bobler, velkomst, situationer, soegesteder } from "../data/billeder.js";
import { saveVaekstrumOutput, saveImage, deleteImage, getImagesForVaekstrum, getVaekstrumOutput } from "../storage/vaekstrumStorage.js";
import { hentUdgangspunkt } from "../storage/udgangspunkt.js";
import { VISUELT_UDTRYK_HUB } from "./vaekstomraadeExit.js";

const BILLEDE_VAEKSTRUM_ID = "billeder";

/*---- "Min inspiration" (Modul 4) genbruger den samme billedlagring som "Billeder fra min praksis" (Modul 3), under en anden nøgle - så de to samlinger ikke blandes sammen i IndexedDB (afklaret med Heidi 2026-09-19). ----*/
const INSPIRATION_BUCKET_ID = "billeder-inspiration";

const BUCKET_IDS = {
    praksis: BILLEDE_VAEKSTRUM_ID,
    inspiration: INSPIRATION_BUCKET_ID
};

/*---- Kilder til billedvælgeren (js/components/billedvaelger.js), runde 7. Et DUF-arkiv med frie billeder er besluttet, men ikke bygget - det tilføjes som en kilde mere her, med sin egen `hent` ----*/
const BILLEDKILDER = {
    praksis: { titel: "Billeder fra min praksis", hent: () => getImagesForVaekstrum(BUCKET_IDS.praksis) },
    inspiration: { titel: "Min inspiration", hent: () => getImagesForVaekstrum(BUCKET_IDS.inspiration) }
};

/*---- Byggesten og Logo læses kun (til 8.1's forhåndsvisning), aldrig skrevet. Samme nøgler, som Byggesten selv bruger ----*/
const BYGGESTEN_VAEKSTRUM_ID = "byggesten";
const LOGO_BUCKET_ID = "logo";

/*----------------------------------------------------------------------------
 * Selvstændig motor for det uddybende vækstrum "Billeder" (Visuelt udtryk).
 * Adskilt fra Prøverummets FlowEngine.js og fra Overbliks/Farvers/Logos
 * motorer - Billeder har et fast opslagsværk tilgængeligt gennem hele rummet
 * (rettighedsoversigten), som ingen af de andre rum har brug for.
 *
 * Data-drevet (gennemrevideret 2026-09-19, jf. docs/duf-manuskript-billeder.md):
 * `bobler` er én flad, ordnet liste - denne motor rykker blot til næste
 * indeks og slår op i `RENDERERS[boble.type]`, i stedet for én navngiven
 * metode pr. skærm (uholdbart ved ca. 40 skærme).
 *
 * Runde 7 (2026-09-25): én forgrening - brugerens valg i 3.1 gemmes som
 * `answers.harEgneBilleder`. Er det false, springes bobler med
 * `kunMedEgneBilleder` over (3.3, 3.5), og bobler med `udenEgneBilleder`
 * (3.4, 6.1) vises i deres variant. 3.1 har desuden en variant, når Overblik
 * viser, at brugeren starter fra bunden (hentUdgangspunkt()).
 * ----------------------------------------------------------------------------
 */

export class BilledeEngine {

    index = 0;
    answers = {};
    previousScreen = null;
    udgangspunkt = null;

    start() {
        const params = new URLSearchParams(window.location.search);
        const fromOverblik = params.get("fra") === "overblik";
        const text = fromOverblik ? velkomst.fraOverblik : velkomst.standard;

        this.previousScreen = () => this.start();

        /*---- null, hvis brugeren ikke har været i Overblik - så vises 3.1's almindelige tekst ----*/
        hentUdgangspunkt().then((udgangspunkt) => { this.udgangspunkt = udgangspunkt; });

        showWelcome(text, () => {
            document.body.classList.add("in-flow");
            this.showBoble(0);
        });
    }

    /*---- Den version af boblen, brugeren skal se: variant-tekst afhængigt af harEgneBilleder / Overblik. Selve data-objektet ændres ikke ----*/
    tilpasBoble(boble) {
        if (boble.udenEgneBilleder && this.answers.harEgneBilleder === false) {
            return { ...boble, ...boble.udenEgneBilleder };
        }
        if (boble.paragraphsFraBunden && this.udgangspunkt?.starterFraBunden) {
            return { ...boble, paragraphs: boble.paragraphsFraBunden };
        }
        return boble;
    }

    springesOver(boble) {
        return Boolean(boble.kunMedEgneBilleder) && this.answers.harEgneBilleder === false;
    }

    async hentBilledkilder(ids) {
        return Promise.all(ids.map(async (id) => ({
            id,
            titel: BILLEDKILDER[id].titel,
            billeder: await BILLEDKILDER[id].hent()
        })));
    }

    async showBoble(index) {
        this.index = index;
        const boble = this.tilpasBoble(bobler[index]);
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
                }, this.soegeKontekst(boble));
                break;
            }
            case "soegesteder":
                render(boble, this.soegeKontekst(boble), onNext, onExit, onReference);
                break;
            case "multiChoice": {
                const billedkilder = boble.visBilleder ? await this.hentBilledkilder(boble.visBilleder) : null;
                render(boble, onNext, onExit, onReference, { billedkilder });
                break;
            }
            case "paletteCompare": {
                const farverOutput = await getVaekstrumOutput("farver");
                render(boble, farverOutput, onNext, onExit, onReference);
                break;
            }
            case "kontrasttest": {
                const [billedkilder, farverOutput] = await Promise.all([
                    this.hentBilledkilder(boble.billedkilder),
                    getVaekstrumOutput("farver")
                ]);
                /*---- Samme læsning af paletten som 6.4 (farverOutput.data.palette). Uden palet: hvid og sort ----*/
                const palette = farverOutput?.data?.palette;
                const tekstfarver = palette?.length ? palette : boble.standardTekstfarver;
                render(boble, { billedkilder, tekstfarver }, onNext, onExit, onReference);
                break;
            }
            case "forhaandsvisning": {
                const [billedkilder, provSammen] = await Promise.all([
                    this.hentBilledkilder(boble.billedkilder),
                    this.hentProvSammenData()
                ]);
                render(boble, { billedkilder, provSammen }, onNext, onExit, onReference);
                break;
            }
            case "compassSummary":
                render(boble, this.buildCompassSummaryItems(), onNext, onExit, onReference);
                break;
            default:
                render(boble, onNext, onExit, onReference);
        }
    }

    /*---- Søgeordene fra 4.2 og søgestederne, til 4.3 og søgelinjen øverst i 4.4 ----*/
    soegeKontekst(boble) {
        if (boble.type !== "soegesteder" && !boble.visSoegelinje) return null;
        return { soegeord: this.answers.valgteSoegeord || [], soegesteder };
    }

    /*---- 8.1: det, "Prøv dem sammen" (js/components/provSammen.js) skal bruge fra de andre rum - kun læst. Palet og logo læses som i byggestenEngine.js' hentGemtPalet/hentGemtLogo. Fonte og ikon kun, hvis Byggesten har arbejdet med dem (fokusvalg). Mangler det hele, viser kortet DUF's standardfarver og -fonte ----*/
    async hentProvSammenData() {
        const [farverOutput, byggestenOutput, logoBilleder] = await Promise.all([
            getVaekstrumOutput("farver"),
            getVaekstrumOutput(BYGGESTEN_VAEKSTRUM_ID),
            getImagesForVaekstrum(LOGO_BUCKET_ID)
        ]);

        const palette = farverOutput?.data?.palette;
        const contrast = farverOutput?.data?.contrast;
        const gemtPalet = palette?.length
            ? {
                farver: palette.map(({ hex, role, percent }) => ({ hex, role, percent })),
                tekstfarve: farverOutput.data.textColor || null,
                kombination: contrast?.textHex && contrast?.bgHex ? { tekst: contrast.textHex, baggrund: contrast.bgHex } : null
            }
            : null;

        const byggesten = byggestenOutput?.data || {};
        const fokusvalg = (byggesten.fokusvalg || []).filter((emne) => emne === "ikoner" || emne === "fonte");

        return {
            fokusvalg,
            ikon: byggesten.ikonFoelelse ? { foelelse: byggesten.ikonFoelelse.id, tekst: byggesten.ikonFoelelse.text } : null,
            fonte: { overskrift: byggesten.fontOverskrift || "", broedtekst: byggesten.fontBroedtekst || "" },
            gemtPalet,
            gemtLogo: logoBilleder?.length ? { blob: logoBilleder[0].blob, navn: logoBilleder[0].name } : null
        };
    }

    async advance(boble, rawAnswer) {
        if (boble.ingenBilleder) {
            /*---- 3.1: rawAnswer = { harEgneBilleder: true/false } ----*/
            this.answers.harEgneBilleder = rawAnswer?.harEgneBilleder !== false;
        }

        if (boble.answerKey) {
            this.answers[boble.answerKey] = this.resolveAnswer(boble, rawAnswer);
        }

        if (boble.isFinal) {
            await this.saveAndFinish();
            return;
        }

        let next = this.index + 1;
        while (next < bobler.length - 1 && this.springesOver(bobler[next])) next += 1;

        this.showBoble(next);
    }

    resolveAnswer(boble, rawAnswer) {
        switch (boble.type) {
            case "choice":
            case "kontrasttest":
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
