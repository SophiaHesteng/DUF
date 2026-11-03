import {
    showWelcome,
    showReference,
    showExitConfirmation,
    setRumNavigation,
    RENDERERS
} from "./billederUi.js";

import { bobler, moduler, velkomst, situationer, soegesteder, oversaettelser, motivord } from "../data/billeder.js";
import { saveSideOutput, saveImage, deleteImage, getImagesForSide, getSideOutput } from "../storage/storage.js";
import { hentUdgangspunkt } from "../storage/udgangspunkt.js";
import { VISUELT_UDTRYK_HUB } from "./exit.js";
import { RumHistorik } from "./rumHistorik.js";

const BILLEDER_ID = "billeder";

/*---- "Min inspiration" (Modul 4) genbruger den samme billedlagring som "Billeder fra min praksis" (Modul 3), under en anden nøgle - så de to samlinger ikke blandes sammen i IndexedDB (afklaret med Heidi 2026-09-19). ----*/
const INSPIRATION_BUCKET_ID = "billeder-inspiration";

/*---- "Mine udvalgte billeder" (7.10, nyt 2026-11-03) får sin egen nøgle på samme måde, så de ikke blandes med de to andre samlinger ----*/
const UDVALGTE_BUCKET_ID = "billeder-udvalgte";

const BUCKET_IDS = {
    praksis: BILLEDER_ID,
    inspiration: INSPIRATION_BUCKET_ID,
    udvalgte: UDVALGTE_BUCKET_ID
};

/*---- Kilder til billedvælgeren (js/components/billedvaelger.js), runde 7. Et DUF-arkiv med frie billeder er besluttet, men ikke bygget - det tilføjes som en kilde mere her, med sin egen `hent` ----*/
const BILLEDKILDER = {
    udvalgte: { titel: "Mine udvalgte billeder", hent: () => getImagesForSide(BUCKET_IDS.udvalgte) },
    praksis: { titel: "Billeder fra min praksis", hent: () => getImagesForSide(BUCKET_IDS.praksis) },
    inspiration: { titel: "Min inspiration", hent: () => getImagesForSide(BUCKET_IDS.inspiration) }
};

/*---- Byggesten og Logo læses kun (til 9.1's forhåndsvisning), aldrig skrevet. Samme nøgler, som Byggesten selv bruger ----*/
const BYGGESTEN_ID = "byggesten";
const LOGO_BUCKET_ID = "logo";

/*----------------------------------------------------------------------------
 * Selvstændig motor for det uddybende rum "Billeder" (Visuelt udtryk for din praksis).
 * Adskilt fra Prøverummets FlowEngine.js og fra velkommen-visuelt-udtryks/Farvers/Logos
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
 * (3.4, 6.1) vises i deres variant. 3.1 har desuden en variant, når velkommen-visuelt-udtryk
 * viser, at brugeren starter fra bunden (hentUdgangspunkt()).
 *
 * 2026-11-03: endnu en forgrening i det nye Modul 7. Valget i 7.1 gemmes som
 * `answers.modul7_vej` ("selv", "find" eller "begge"). Bobler med `kunVej`
 * springes over, når vejen ikke står i listen, og `prVej` giver en variant
 * pr. vej (fx 7.6's knaptekst og 7.7's indledning). Modul 3-logikken er uændret.
 * ----------------------------------------------------------------------------
 */

export class BilledeEngine {

    index = 0;
    answers = {};
    historik = new RumHistorik(); // brugerens rute gennem moduler/bobler - til navigationslinjerne, "Tilbage", opslagsværket og "Bliv i rummet"
    udgangspunkt = null;

    start() {
        const params = new URLSearchParams(window.location.search);
        const fromVisueltUdtryk = params.get("fra") === "velkommen-visuelt-udtryk";
        const text = fromVisueltUdtryk ? velkomst.fraVisueltUdtryk : velkomst.standard;

        setRumNavigation(() => this.historik.navigation("Billeder", moduler));

        /*---- null, hvis brugeren ikke har været i velkommen-visuelt-udtryk - så vises 3.1's almindelige tekst ----*/
        hentUdgangspunkt().then((udgangspunkt) => { this.udgangspunkt = udgangspunkt; });

        showWelcome(text, () => {
            document.body.classList.add("in-flow");
            this.showBoble(0);
        });
    }

    /*---- Den version af boblen, brugeren skal se: variant-tekst afhængigt af harEgneBilleder / velkommen-visuelt-udtryk / modul7_vej. Selve data-objektet ændres ikke ----*/
    tilpasBoble(boble) {
        const vejVariant = boble.prVej?.[this.answers.modul7_vej?.id];
        if (vejVariant) {
            /*---- `indledning` sættes foran boblens egne afsnit, alt andet (fx nextButtonText) erstatter boblens felt ----*/
            const { indledning, ...felter } = vejVariant;
            const paragraphs = indledning ? [indledning, ...(boble.paragraphs || [])] : boble.paragraphs;
            return { ...boble, ...felter, paragraphs };
        }
        if (boble.udenEgneBilleder && this.answers.harEgneBilleder === false) {
            return { ...boble, ...boble.udenEgneBilleder };
        }
        if (boble.paragraphsFraBunden && this.udgangspunkt?.starterFraBunden) {
            return { ...boble, paragraphs: boble.paragraphsFraBunden };
        }
        return boble;
    }

    springesOver(boble) {
        if (boble.kunMedEgneBilleder && this.answers.harEgneBilleder === false) return true;

        /*---- Modul 7: boblen hører kun til nogle af vejene fra 7.1 ----*/
        const vej = this.answers.modul7_vej?.id;
        if (boble.kunVej && vej && !boble.kunVej.includes(vej)) return true;

        return false;
    }

    async hentBilledkilder(ids) {
        return Promise.all(ids.map(async (id) => ({
            id,
            titel: BILLEDKILDER[id].titel,
            billeder: await BILLEDKILDER[id].hent()
        })));
    }

    async showBoble(index) {
        this.historik.besoeg(bobler[index].modul, bobler[index].id, () => this.showBoble(index));
        this.index = index;
        const boble = this.tilpasBoble(bobler[index]);

        const onNext = (rawAnswer) => this.advance(boble, rawAnswer);
        const onExit = () => this.exitRoom();
        /*---- Opslagsværket handler om billedrettigheder, så det er kun relevant fra Modul 2 og frem - ligesom i det oprindelige rum ----*/
        const onReference = boble.modul >= 2 ? () => this.showReference() : null;
        const render = RENDERERS[boble.type];

        switch (boble.type) {
            case "text": {
                const images = boble.showImagesBucket
                    ? await getImagesForSide(BUCKET_IDS[boble.showImagesBucket])
                    : null;
                render(boble, images, onNext, onExit, onReference);
                break;
            }
            case "textNote": {
                const prefillText = boble.prefillFrom === "dokumentationsUdkast" ? this.buildDokumentationsUdkast(boble.udkast)
                    : boble.prefillFrom === "compassSummary" ? this.buildCompassText()
                    : "";
                render(boble, prefillText, onNext, onExit, onReference);
                break;
            }
            case "imageUpload": {
                const bucketId = BUCKET_IDS[boble.bucket];
                const images = await getImagesForSide(bucketId);
                render(boble, images, onNext, onExit, onReference, {
                    upload: (file) => saveImage(bucketId, file),
                    remove: (imageId) => deleteImage(imageId),
                    refresh: () => getImagesForSide(bucketId)
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
                const farverOutput = await getSideOutput("farver");
                render(boble, farverOutput, onNext, onExit, onReference);
                break;
            }
            case "kontrasttest": {
                const [billedkilder, farverOutput] = await Promise.all([
                    this.hentBilledkilder(boble.billedkilder),
                    getSideOutput("farver")
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
            case "checklist": {
                /*---- 7.5: brugerens eget svar fra en tidligere boble (visEgetSvar), hvis det findes. Tom tekst = vises ikke ----*/
                const egetSvar = boble.visEgetSvar
                    ? (this.answers[boble.visEgetSvar.answerKey]?.[boble.visEgetSvar.felt] || "").trim()
                    : "";
                render(boble, onNext, onExit, onReference, { egetSvar });
                break;
            }
            case "choice":
                render(boble, onNext, onExit, onReference, { taetPaa: this.stileTaetPaaOrd(boble) });
                break;
            case "compassSummary":
                render(boble, this.buildCompassSummaryItems(), onNext, onExit, onReference);
                break;
            default:
                render(boble, onNext, onExit, onReference);
        }
    }

    /*---- Søgeordene fra 4.2 og søgestederne, til 4.3 og søgelinjen øverst i 4.4. 7.8 viser kun nogle af stederne (kunSoegesteder) og bygger sine søgeord af kompasset (soegeordFraKompas) ----*/
    soegeKontekst(boble) {
        if (boble.type !== "soegesteder" && !boble.visSoegelinje) return null;

        const steder = boble.kunSoegesteder
            ? soegesteder.filter((sted) => boble.kunSoegesteder.includes(sted.id))
            : soegesteder;
        const soegeord = boble.soegeordFraKompas ? this.soegeordFraKompas() : (this.answers.valgteSoegeord || []);

        return { soegeord, soegesteder: steder };
    }

    /*---- 7.8: søgningerne bygges af stilen fra 6.2 og ordene fra 5.4, oversat via `oversaettelser` i js/data/billeder.js. Hver søgning har højst to stemnings- eller stilord plus ét motivord fra `motivord`, fx "warm cozy treatment room":
     * - stilen (allerede to ord) står alene med sit motiv,
     * - ordene fra 5.4 sættes sammen to og to. Et ord, der allerede står i stilen (fx "warm" i "warm cozy"), springes over.
     * Motivordene fordeles på skift, så søgningerne ikke alle får det samme.
     * Uden ord fra 5.4 kommer søgeordene fra 4.2 bagefter, som de er - de er allerede hele søgninger. Det, der ikke står i oversættelseslisten, springes over ----*/
    soegeordFraKompas() {
        const stil = oversaettelser[this.answers.modul6_stil?.id];
        const stilOrd = (stil || "").split(" ");
        const ord = [...new Set((this.answers.modul5_ord?.selected || [])
            .map((valg) => oversaettelser[valg.id])
            .filter((o) => o && !stilOrd.includes(o)))];

        const par = [];
        for (let i = 0; i < ord.length; i += 2) par.push(ord.slice(i, i + 2).join(" "));

        const stemninger = [stil, ...par].filter(Boolean);
        const soegninger = stemninger.map((stemning, i) => `${stemning} ${motivord[i % motivord.length]}`);

        const fraModul4 = ord.length ? [] : (this.answers.valgteSoegeord || []);
        return [...new Set([...soegninger, ...fraModul4])];
    }

    /*---- 6.2: den stil, der deler flest ord med brugerens valg i 5.4 (`stilOrdMatch` i js/data/billeder.js), får noten. Kun når præcis én stil har flest: står to eller flere lige, peger ordene ikke tydeligt ét sted hen, og så vises der ingen note. Det samme gælder, hvis brugeren ingen ord har valgt, eller ingen af dem passer. Egne ord fra 5.4 tælles ikke med. Returnerer en liste (tom eller med ét id), fordi billederUi.js slår op med includes() ----*/
    stileTaetPaaOrd(boble) {
        const valgte = (this.answers.modul5_ord?.selected || []).map((valg) => valg.id);
        if (!boble.stilOrdMatch || !valgte.length) return [];

        const antal = Object.entries(boble.stilOrdMatch).map(([stilId, ord]) => ({
            stilId,
            match: valgte.filter((id) => ord.includes(id)).length
        }));
        const flest = Math.max(...antal.map((a) => a.match));
        if (flest === 0) return [];

        const vindere = antal.filter((a) => a.match === flest);
        return vindere.length === 1 ? [vindere[0].stilId] : [];
    }

    /*---- 9.1: det, "Prøv dem sammen" (js/components/provSammen.js) skal bruge fra de andre rum - kun læst. Palet og logo læses som i byggestenEngine.js' hentGemtPalet/hentGemtLogo. Fonte og ikon kun, hvis Byggesten har arbejdet med dem (fokusvalg). Mangler det hele, viser kortet DUF's standardfarver og -fonte ----*/
    async hentProvSammenData() {
        const [farverOutput, byggestenOutput, logoBilleder] = await Promise.all([
            getSideOutput("farver"),
            getSideOutput(BYGGESTEN_ID),
            getImagesForSide(LOGO_BUCKET_ID)
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
        if (boble.ingenBilleder?.gemSom === "harEgneBilleder") {
            /*---- 3.1: rawAnswer = { harEgneBilleder: true/false }. Udvejen i 7.10 har ikke `gemSom` og gemmer derfor intet ----*/
            this.answers.harEgneBilleder = rawAnswer?.harEgneBilleder !== false;

            /*---- Hopper brugeren tilbage til 3.1 og vælger vejen uden egne billeder, er svarene fra 3.3/3.5 en forladt gren - de gemmes ikke ----*/
            if (!this.answers.harEgneBilleder) {
                bobler
                    .filter((b) => b.kunMedEgneBilleder && b.answerKey)
                    .forEach((b) => { delete this.answers[b.answerKey]; });
            }
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

    /*---- 9.2 (2026-11-03): et udkast i hele sætninger til brugerens dokumentation, i stedet for buildCompassText()'s "Stil: ...". Kun de dele, brugeren har svaret på, kommer med. Sammenhæng med farver er bevidst ikke med. Sætningsstykkerne står i `udkast` ved 9.2 i js/data/billeder.js - "Alene"-udgaverne bruges, når et stykke står først i sætningen (fx "Min stil er ..." uden ord foran). Ingen svar = tom tekst, så feltet er tomt ----*/
    buildDokumentationsUdkast(udkast) {
        const indsaet = (skabelon, tekst) => skabelon.replace("{tekst}", tekst);
        const udenPunktum = (tekst) => (tekst || "").trim().replace(/[.\s]+$/, "");
        /*---- "rolig, varm og ægte" ----*/
        const opremsning = (liste) => liste.length > 1 ? `${liste.slice(0, -1).join(", ")} og ${liste.at(-1)}` : liste[0];
        /*---- To dele bliver til én sætning med punktum. Mangler den første, står den anden alene ----*/
        const saetning = (foerste, anden, andenAlene, skilletegn) => {
            if (foerste && anden) return `${foerste}${skilletegn}${anden}`;
            return foerste || andenAlene || "";
        };

        const ordSvar = this.answers.modul5_ord;
        const ord = [...(ordSvar?.selected || []).map((o) => o.text), udenPunktum(ordSvar?.note)]
            .filter(Boolean)
            .map((o) => o.toLowerCase());

        const stilSvar = this.answers.modul6_stil;
        const stil = stilSvar?.id === "andet"
            ? udenPunktum(stilSvar.text)
            : (stilSvar?.text || "").toLowerCase();

        const motiver = this.answers.modul6_motiver || {};
        const viser = udenPunktum(motiver.horer_til);
        const undgaar = udenPunktum(motiver.horer_ikke_til);

        const vej = udkast.vej[this.answers.modul7_vej?.id] || "";

        const saetninger = [
            saetning(ord.length ? indsaet(udkast.ord, opremsning(ord)) : "", stil && indsaet(udkast.stil, stil), stil && indsaet(udkast.stilAlene, stil), ", "),
            saetning(viser && indsaet(udkast.viser, viser), undgaar && indsaet(udkast.undgaar, undgaar), undgaar && indsaet(udkast.undgaarAlene, undgaar), " "),
            saetning(vej, udkast.afslutning, udkast.afslutningAlene, ", ")
        ];

        /*---- Afslutningen om rettigheder kommer altid med - men kun hvis der er noget andet at afslutte ----*/
        if (!ord.length && !stil && !viser && !undgaar && !vej) return "";

        return saetninger.filter(Boolean).map((s) => `${udenPunktum(s)}.`).join(" ");
    }

    showReference() {
        showReference(situationer, () => this.historik.genvis());
    }

    async saveAndFinish() {
        const documentation = this.answers.modul8_dokumentation?.dokumentation || "";
        const data = {
            answers: this.answers,
            kompas: this.buildCompassSummaryItems()
        };

        await saveSideOutput(BILLEDER_ID, data, documentation);

        window.location.href = VISUELT_UDTRYK_HUB;
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
