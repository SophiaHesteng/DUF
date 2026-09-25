import { RENDERERS, showWelcome, showExitConfirmation } from "./logoUi.js";
import { velkomst, BOBLER } from "../data/logo.js";
import {
    saveVaekstrumOutput,
    saveImage,
    deleteImage,
    getImagesForVaekstrum,
    getVaekstrumOutput,
    saveVaekstrumPosition,
    getVaekstrumPosition,
    clearVaekstrumPosition
} from "../storage/vaekstrumStorage.js";
import { VISUELT_UDTRYK_HUB } from "./vaekstomraadeExit.js";

const LOGO_VAEKSTRUM_ID = "logo";
const LOGO_BUCKET = "logo";
const INSPIRATION_BUCKET = "logo-inspiration";

/*---- 2B.3 → 6.1J: manuskriptets faste oversættelse fra "det skurrer"-svar til arbejdsliste-punkter (stabile id'er, så afkrydsning ikke går tabt, selvom listen udvides efter et besøg i Modul 7) ----*/
const ARBEJDSLISTE_FRA_SKURRER = {
    detaljeret: { id: "rodet", tekst: "Rodet → Forenkl: fjern noget, indtil kernen står tilbage." },
    laesbart_smaat: { id: "svaert-laesbart", tekst: "Svært at læse småt → Gør det tydeligere, når det er småt: mere luft, større eller enklere bogstaver." },
    farver_forkerte: { id: "farverne-passer-ikke", tekst: "Farverne passer ikke → Skift til de farver, du valgte, eller find nogle, der passer bedre." },
    ligner_andre: { id: "ligner-andre", tekst: "Ligner andre → Find ét element, der er dit eget: en form, en skrifttype eller en farve." },
    ikke_mig: { id: "foeles-ikke-som-mig", tekst: "Føles ikke som mig → Se på, præcis hvad der føles fremmed, og ændr netop det." },
    lavet_hurtigt: { id: "lavet-hurtigt", tekst: "Lavet hurtigt → Gennemgå det roligt, valg for valg." },
    ved_ikke: { id: "ved-ikke", tekst: "Ved ikke → Kig på det småt og i sort/hvid. Ofte viser det, hvad der skurrer." }
};

/*----------------------------------------------------------------------------
 * Selvstændig motor for det uddybende vækstrum "Logo" (Visuelt udtryk).
 *
 * Data-drevet som Billeder (js/data/logo.js's `BOBLER`), men - i modsætning
 * til Billeder - udvidet til reel forgrening: BOBLER er et objekt keyet på
 * boble-id (ikke et fladt array), og "næste boble" afgøres af et fast
 * `next`-felt ELLER, hvor svar/spor afgør vejen, af customNext() herunder.
 * Indhold, der selv afhænger af svar (recap-lister, badges, den dynamiske
 * arbejdsliste, Modul 6.3/6.4's rettigheds-/værktøjstekst), fyldes ind af
 * resolveContent()/gatherContext() - js/data/logo.js forbliver ren data.
 *
 * Delmængde-visninger (myte-bobler 1.3a-d, 2B.4's gruppe-bobler) håndteres
 * med en lille, generisk kø (runSequence/advanceSequence) i stedet for en
 * ny boble-type - de enkelte kø-bobler har intet `next`, næste skridt
 * styres udelukkende af køen.
 * ----------------------------------------------------------------------------
 */

export class LogoEngine {

    svar = {};
    sequenceQueue = null;
    previousScreen = null;
    fraOverblik = false;
    _farverPaletteCache;
    _pendingSkurrerGroups = null;

    async start() {
        const params = new URLSearchParams(window.location.search);
        this.fraOverblik = params.get("fra") === "overblik";

        const savedPosition = await getVaekstrumPosition(LOGO_VAEKSTRUM_ID);

        if (savedPosition?.position?.bobleId) {
            this.svar = { ...savedPosition.position.svar, venter: false };
            await clearVaekstrumPosition(LOGO_VAEKSTRUM_ID);
            document.body.classList.add("in-flow");
            this.showBoble(savedPosition.position.bobleId);
            return;
        }

        /*---- Denne velkomstskærm ER manuskriptets Boble 1.1 (jf. logoUi.js's showWelcome) - flowet fortsætter derfor direkte til 1.2, ikke til en gentagelse af 1.1 ----*/
        const text = this.fraOverblik ? velkomst.fraOverblik : velkomst.standard;
        this.previousScreen = () => this.start();

        showWelcome(text, () => {
            document.body.classList.add("in-flow");
            this.showBoble("1.2");
        });
    }

    async showBoble(id) {
        const boble = this.resolveContent(id);
        this.previousScreen = () => this.showBoble(id);

        const ctx = await this.gatherContext(boble);
        const render = RENDERERS[boble.type];

        render(boble, ctx, (rawAnswer) => this.advance(boble, rawAnswer), () => this.exitRoom());
    }

    /*---- Statiske indholds-overstyringer pr. boble-id - selve teksten/valgene, ikke asynkront hentet data (det ligger i gatherContext) ----*/

    resolveContent(id) {
        const base = BOBLER[id];
        const boble = { ...base, options: base.options ? base.options.map((o) => ({ ...o })) : base.options };

        switch (id) {
            case "2b.2":
                boble.paragraphs = [
                    `Vi begynder med det gode. Hvad synes du bedst om ved ${this.svar.viaSelvSpor ? "dit udkast" : "dit valgte logo"}, selvom du kan være i tvivl om resten? Vælg gerne flere. Er der ikke meget at vælge imellem, er det helt okay.`
                ];
                break;

            case "3.1": {
                boble.paragraphs = [...base.paragraphs];
                if (this.svar.spor === "C") {
                    const tips = {
                        navn: "Kig efter eksempler, hvor navnet står alene. Læg mærke til skrifttypens karakter: rolig, legende, elegant, rå. Hvad passer til dig?",
                        symbol: "Læg mærke til, hvor enkelt symbolet er, og om du stadig kan kende det, når det er småt.",
                        begge: "Læg mærke til, hvordan navn og symbol står sammen, og om hver af delene også kunne stå alene.",
                        ved_ikke: "Vælg ikke noget endnu. Kig bare rundt, og se, hvad der får dig til at stoppe op."
                    };
                    boble.paragraphs.push(tips[this.svar.logoType?.id] || tips.ved_ikke);
                }
                break;
            }

            case "3.4":
                boble.nextButtonText = this.svar.spor === "B" ? "Lad os vælge en retning" : "Lad os tage din palet med";
                break;

            case "4.2":
                boble.options = boble.options.map((option) => (
                    this.svar.retningForslag === option.id
                        ? { ...option, badgeText: "Det, vi lagde mærke til, peger herhen" }
                        : option
                ));
                break;

            case "6.2":
                boble.options = boble.options.filter((option) => !option.nytOnly || this.effectiveRetning() === "nyt");
                break;

            case "6.3":
                Object.assign(boble, this.buildModul63Content());
                break;

            case "6.4":
                Object.assign(boble, this.buildModul64Content());
                break;

            case "7.1": {
                boble.paragraphs = [...base.paragraphs];
                if (this.svar.spor === "A") boble.paragraphs.push("Du er glad for dit logo. Nu ser vi, om det også klarer sig i hverdagen.");
                if (this.svar.spor === "D") boble.paragraphs.push("Nu er logoet kommet. Aftalte I flere udgaver, så prøv dem i tjekkene.");
                break;
            }

            case "7.5":
                Object.assign(boble, this.buildModul75Content());
                break;

            case "8.1":
                Object.assign(boble, this.buildModul81Content());
                break;

            case "8.3":
                boble.paragraphs = [...base.paragraphs];
                if (this.svar.aabnePunkter?.length) {
                    boble.paragraphs.push("De ting, du gerne vil vende tilbage til, ligger i din guide, så du kan finde dem igen.");
                }
                break;

            default:
                break;
        }

        return boble;
    }

    /*---- Asynkront hentet kontekst (billeder, gemt Farver-palet) + recap-lister der bygges af svar, der allerede ligger i this.svar. Kan også mutere `boble` videre (fx 6.1j's dynamiske tjekliste-punkter, 8.2's opsamlings-html), fordi den modtager den allerede klonede boble fra resolveContent. ----*/

    async gatherContext(boble) {
        const ctx = {};

        if (boble.imageUpload) {
            const bucket = boble.imageUpload.bucket;
            ctx.images = await getImagesForVaekstrum(bucket);
            ctx.imageHandlers = {
                upload: (file) => saveImage(bucket, file),
                remove: (imageId) => deleteImage(imageId),
                refresh: () => getImagesForVaekstrum(bucket)
            };
        }

        if ((boble.logoPreview || boble.paletteBeside || boble.id === "3.3b") && !ctx.images) {
            ctx.images = await getImagesForVaekstrum(LOGO_BUCKET);
        }

        if (boble.paletteBeside || boble.type === "paletteColorPicker" || boble.id === "5.1") {
            ctx.palette = await this.getFarverPalette();
        }

        switch (boble.id) {
            case "2b.5":
                ctx.recap = this.buildModul25Recap();
                break;

            case "4.1":
                ctx.recap = this.buildModul41Recap();
                break;

            case "4.3b":
                ctx.recap = this.svar.listeSkurrer?.selected?.length
                    ? [{ label: "Det, du selv nævnte skurrer", value: this.svar.listeSkurrer.selected.map((s) => s.text).join(", ") }]
                    : [];
                break;

            case "4.3c":
                ctx.recap = this.svar.listeFungerer?.selected?.length
                    ? [{ label: "Det, du var glad for", value: this.svar.listeFungerer.selected.map((s) => s.text).join(", ") }]
                    : [];
                break;

            case "5.1":
                ctx.recap = ctx.palette?.length
                    ? [{ label: "Din palet fra Farver", value: ctx.palette.map((c) => c.role || c.hex).join(", ") }]
                    : [];
                if (ctx.palette?.length) {
                    boble.paragraphs = [...boble.paragraphs, "Du har allerede en palet fra Farver. Den viser vi her."];
                }
                break;

            case "6.1j":
                boble.checklist = { gemNoegle: "logo-modul6-arbejdsliste", punkter: this.buildArbejdslistePunkter() };
                break;

            case "6.1n":
                ctx.recap = this.buildModul61nRecap();
                break;

            case "8.1":
                if (this.effectiveRetning() === "nyt") {
                    ctx.recap = this.buildInspirationNoterRecap();
                }
                break;

            case "8.2": {
                const images = await getImagesForVaekstrum(LOGO_BUCKET);
                const results = this.svar.testResultater || {};
                const checkLine = (label, ok) => `<li>${ok ? "✓" : "…"} ${label}</li>`;
                const imageHtml = images.length
                    ? `<img src="${URL.createObjectURL(images[0].blob)}" alt="Dit logo" style="max-width:200px;max-height:200px;object-fit:contain;display:block;margin-bottom:16px;">`
                    : "";
                const begrundelseHtml = this.svar.begrundelse?.begrundelse ? `<p>${this.svar.begrundelse.begrundelse}</p>` : "";
                const testHtml = `<ul>${checkLine("Kan kendes, når det er småt", results.smaat === "ja")}${checkLine("Virker uden farve", results.udenFarve === "ja")}${checkLine("Virker på både lys og mørk baggrund", results.baggrund === "begge")}</ul>`;
                const openHtml = this.svar.aabnePunkter?.length
                    ? `<p><strong>Åbne punkter, du tager med:</strong> ${this.svar.aabnePunkter.join(", ")}</p>`
                    : "";

                boble.extraBodyHtml = `<div class="section-body">${imageHtml}${begrundelseHtml}${testHtml}${openHtml}</div>`;
                break;
            }

            default:
                break;
        }

        return ctx;
    }

    /*---- Modul 6.3/6.4's indhold afhænger af retning/logotype/værktøj, ikke af boble-rækkefølgen - derfor bygget her frem for som statisk data ----*/

    buildModul63Content() {
        const retning = this.effectiveRetning();
        const logoType = this.svar.logoType?.id;
        const paragraphs = [];
        let checklist = null;
        let seOgsaa = null;

        if (retning === "juster") {
            paragraphs.push("Skifter du skrifttype, eller tilføjer du noget nyt, fx et ikon eller en form fra et bibliotek eller uden for det, dit program leverer, så tjek, om det må indgå i et logo.");
        } else {
            if (logoType === "symbol" || logoType === "begge") {
                paragraphs.push("Har du tænkt dig at bruge et ikon eller en form fra et bibliotek eller et program? Så tjek, før du bygger videre. Mange biblioteker og designprogrammer tillader ikke, at deres ikoner bruges som logo eller varemærke, og de samme ikoner kan andre kunder bruge. Er symbolet det, folk skal kende dig på, er et symbol, du selv har tegnet, tryggest.");
                checklist = {
                    gemNoegle: "logo-modul6-symbol",
                    punkter: [
                        { id: "hvor_kommer_fra", tekst: "Hvor kommer symbolet fra?" },
                        { id: "maa_bruges_logo", tekst: "Må det bruges i et logo eller varemærke?" },
                        { id: "maa_aendres", tekst: "Må jeg ændre det?" },
                        { id: "forveksles", tekst: "Kan det forveksles med et eksisterende logo eller symbol?" },
                        { id: "dokumentation", tekst: "Har jeg gemt dokumentation for licens eller vilkår?" }
                    ],
                    afslutning: "Kan du ikke svare sikkert, så vælg et andet eller tegn det selv. Skal symbolet være central for din identitet, så søg rådgivning."
                };
                paragraphs.push(checklist.afslutning);
                seOgsaa = { maal: "byggesten", tekst: "Ikoner og andre grafiske byggesten." };
            }

            if (logoType === "navn" || logoType === "begge") {
                paragraphs.push("Skrifttyper er sjældent noget at bekymre sig om. Dem, der følger med Canva eller Illustrator, kan du normalt bruge uden at tænke over det. Licensspørgsmålet opstår som regel først, når du vælger en skrifttype uden for dem, fx en, du har hentet et andet sted fra. Så tjek, at den må bruges til erhverv og i et logo, før du vælger den.");
                seOgsaa = seOgsaa || { maal: "byggesten", tekst: "Skrifttyper og andre grafiske byggesten." };
            }
        }

        return { paragraphs, checklist, seOgsaa };
    }

    buildModul64Content() {
        const tool = this.svar.vaerktoej?.id;

        if (tool === "looka") {
            return {
                paragraphs: [
                    "Du har allerede leget med Looka. Det er gratis at designe der. Du betaler først, når du er tilfreds og vil hente filerne. Det er en helt fin måde at få et logo på, bare med åbne øjne. Fire ting er værd at vide, før du køber:",
                    "Hvad du får: Den billigste pakke giver typisk kun én billedfil. Vil du have logoet i flere filtyper (fx vektor) og i farvevarianter med gennemsigtig baggrund, skal du højere op. Der findes også et abonnement med et helt brand kit. Priser og indhold ændrer sig, så tjek dem hos Looka.",
                    "Ejerskab: Looka skriver, at du får fuldt ejerskab af det færdige logo. Men de henter ikoner og skrifttyper fra en database, og de kan ikke garantere rettighederne til enkeltdelene. De fjerner heller ikke elementerne fra databasen, så andre kan få et lignende logo.",
                    "Varemærke: Looka giver ikke juridisk rådgivning om varemærkeregistrering. Vil du registrere logoet, så tal med en fagperson.",
                    "Forveksling: Tjek, om logoet ligner et eksisterende (fx med Google Lens)."
                ],
                externalLink: { label: "Åbn Looka (åbner i nyt vindue)", url: "https://looka.com/logo-maker" },
                checklist: {
                    gemNoegle: "logo-modul6-looka",
                    punkter: [
                        { id: "pakke", tekst: "Har jeg set, hvad pakken indeholder (filtyper og versioner)?" },
                        { id: "udgaver", tekst: "Får jeg udgaver i sort/hvid og til både lys og mørk baggrund?" },
                        { id: "ikke_eksklusiv", tekst: "Har jeg forstået, at jeg ikke får eksklusive rettigheder til enkeltdelene?" },
                        { id: "ligner", tekst: "Har jeg tjekket, om det ligner et eksisterende logo?" },
                        { id: "kvittering", tekst: "Har jeg gemt kvittering og vilkår?" }
                    ]
                },
                afterList: "Skal logoet være en central del af din identitet, eller vil du varemærkeregistrere det, så søg rådgivning først."
            };
        }

        if (tool === "illustrator") {
            return {
                paragraphs: ["Du kender værktøjet, så kun en påmindelse: begynd enkelt, i én farve, tjek det småt undervejs, og gem en vektorfil sammen med de billedfiler, du eksporterer."],
                externalLink: { label: "Åbn Illustrator (åbner i nyt vindue)", url: "https://www.adobe.com/products/illustrator.html" }
            };
        }

        return {
            paragraphs: ["Åbn Canva (åbner i nyt vindue). Begynd enkelt: én farve og få elementer. Tjek logoet småt undervejs, fx ved at zoome ud eller se det på din telefon. Gem dine udgaver undervejs, så du kan gå tilbage."],
            externalLink: { label: "Åbn Canva (åbner i nyt vindue)", url: "https://www.canva.com/" }
        };
    }

    buildModul75Content() {
        const results = this.svar.testResultater || {};
        const allJa = results.smaat === "ja" && results.udenFarve === "ja" && results.baggrund === "begge";
        const boble = { ...BOBLER["7.5"], ctaButtons: true };

        if (allJa) {
            boble.paragraphs = ["Dit logo klarer sig. Det er ikke småt at kunne sige."];
            boble.options = [{ id: "videre", text: "Videre", next: "8.1" }];
            return boble;
        }

        const failedLabels = [];
        if (results.smaat && results.smaat !== "ja") failedLabels.push("kan kendes, når det er småt");
        if (results.udenFarve && results.udenFarve !== "ja") failedLabels.push("virker uden farve");
        if (results.baggrund && results.baggrund !== "begge") failedLabels.push("virker på både lys og mørk baggrund");

        boble.paragraphs = [
            "Det er helt normalt, at noget først viser sig her. Det betyder ikke, at du har gjort noget forkert.",
            failedLabels.length ? `Det, der endnu ikke helt går op: ${failedLabels.join(", ")}.` : "",
            "Hvad vil du gøre med dem?"
        ].filter(Boolean);

        const isAorD = this.svar.spor === "A" || this.svar.spor === "D";

        if (isAorD) {
            boble.paragraphs.push("Du kan ikke justere det her, men du kan tage listen med til den, der lavede logoet. Det er en helt legitim bestilling.");
            boble.options = [
                { id: "tager_med", text: "Jeg tager det med", next: "8.1" },
                { id: "gaar_videre", text: "Jeg går videre uden", next: "8.1" }
            ];
        } else {
            boble.options = [
                { id: "juster_nu", text: "Jeg vil justere logoet nu", jumpTo: "6.1j" },
                { id: "senere", text: "Jeg tager det senere", next: "8.1" }
            ];
        }

        return boble;
    }

    buildModul81Content() {
        const spor = this.svar.spor;
        const retning = this.effectiveRetning();
        let question;

        if (spor === "D") {
            question = "Hvem lavede det, hvad har I aftalt om rettigheder, og hvor ligger filerne?";
        } else if (spor === "A" || retning === "behold") {
            question = "Hvorfor beholder du logoet, og hvordan viste testen, at det fungerer? Hvem har lavet det, og har du filerne?";
        } else if (retning === "juster") {
            question = "Hvad ændrede du, og hvorfor?";
        } else {
            question = "Hvordan kom du frem til det, og hvad inspirerede dig?";
        }

        return {
            fields: [{ id: "begrundelse", label: question, rows: 5 }],
            paragraphs: [...BOBLER["8.1"].paragraphs, "Hvordan spiller det sammen med din palet? Hvor kommer logoet fra, og hvad må du bruge det til?"]
        };
    }

    /*---- Hjælpere til recap-lister ----*/

    buildModul25Recap() {
        const recap = [];
        const fungerer = this.svar.listeFungerer?.selected?.map((s) => s.text) || [];
        const skurrer = this.svar.listeSkurrer?.selected?.map((s) => s.text) || [];

        if (fungerer.length) recap.push({ label: "Det fungerer", value: fungerer.join(", ") });
        if (skurrer.length) recap.push({ label: "Det skurrer", value: skurrer.join(", ") });

        const forslagText = {
            behold: "Det, vi lagde mærke til, peger mod at beholde logoet, som det er.",
            juster: "Det, vi lagde mærke til, peger mod at justere logoet.",
            nyt: "Det, vi lagde mærke til, peger mod at bygge et helt nyt logo."
        }[this.svar.retningForslag];

        if (forslagText) recap.push({ label: "Forslag til retning", value: forslagText });

        return recap;
    }

    buildModul41Recap() {
        const recap = this.buildModul25Recap();
        const sammenligning = this.svar.sammenligning?.selected?.map((s) => s.text) || [];
        if (sammenligning.length) recap.push({ label: "Da du sammenlignede", value: sammenligning.join(", ") });
        return recap;
    }

    buildModul61nRecap() {
        const recap = [];
        if (this.svar.logoType?.text) recap.push({ label: "Logotype", value: this.svar.logoType.text });

        const farve = this.svar.logoFarver;
        if (farve?.selected?.length) {
            recap.push({ label: "Farver fra din palet", value: farve.selected.map((c) => c.role || c.hex).join(", ") });
        } else if (farve?.id) {
            recap.push({ label: "Foreløbig farveretning", value: farve.text || farve.id });
        }

        recap.push(...this.buildInspirationNoterRecap());

        return recap;
    }

    /*---- Brugerens to noter fra 3.2, hver for sig med sit eget spørgsmål som overskrift - før blev de flettet sammen til én tekst, som testbrugeren ikke kunne genkende (brugertest 1, 2026-09-24) ----*/
    buildInspirationNoterRecap() {
        const noter = this.svar.minInspirationNoter || {};
        return BOBLER["3.2"].fields
            .filter((field) => noter[field.id])
            .map((field) => ({ label: field.label, value: noter[field.id] }));
    }

    buildArbejdslistePunkter() {
        const punkter = [];
        const selected = this.svar.listeSkurrer?.selected || [];

        selected.forEach((item) => {
            const mapped = ARBEJDSLISTE_FRA_SKURRER[item.id];
            if (mapped && !punkter.some((p) => p.id === mapped.id)) punkter.push(mapped);
        });

        const results = this.svar.testResultater || {};
        if (results.smaat && results.smaat !== "ja") punkter.push({ id: "test-smaat", tekst: "Gør det tydeligere, når det er småt." });
        if (results.udenFarve && results.udenFarve !== "ja") punkter.push({ id: "test-udenfarve", tekst: "Gør forskellen mellem lyst og mørkt tydeligere, så det virker uden farve." });
        if (results.baggrund && results.baggrund !== "begge") punkter.push({ id: "test-baggrund", tekst: "Lav en udgave til den baggrund, hvor det forsvinder." });

        if (!punkter.length) {
            punkter.push({ id: "egen-note", tekst: "Skriv selv 1-2 ting, du gerne vil ændre, og vend tilbage og afkryds dem, når du er i gang." });
        }

        return punkter;
    }

    effectiveRetning() {
        if (this.svar.spor === "C") return "nyt";
        return this.svar.retning?.id || null;
    }

    async getFarverPalette() {
        if (this._farverPaletteCache !== undefined) return this._farverPaletteCache;
        const farverOutput = await getVaekstrumOutput("farver");
        this._farverPaletteCache = farverOutput?.data?.palette?.length ? farverOutput.data.palette : null;
        return this._farverPaletteCache;
    }

    /*---- Svar-håndtering + flow ----*/

    resolveAnswer(boble, rawAnswer) {
        switch (boble.type) {
            case "choice":
                return { id: rawAnswer.optionId, text: rawAnswer.text, note: boble.allowNote ? rawAnswer.note : undefined };
            case "multiChoice":
                return { selected: rawAnswer.selected, note: rawAnswer.note };
            default:
                return rawAnswer;
        }
    }

    applySideEffects(boble, rawAnswer) {
        switch (boble.id) {
            case "2.1": {
                const sporMap = { ja_tilfreds: "A", ja_usikker: "B", nej: "C", under_udvikling: "D" };
                this.svar.spor = sporMap[rawAnswer.optionId];
                break;
            }
            case "2a.1":
                if (rawAnswer.optionId === "nej") this.svar.spor = "B";
                break;
            case "2a.2":
                if (rawAnswer.optionId === "test") this.svar.valideringsvej = true;
                break;
            case "2d.1":
                if (rawAnswer.optionId === "selv") {
                    this.svar.spor = "B";
                    this.svar.viaSelvSpor = true;
                }
                break;
            case "2b.3":
                this._pendingSkurrerGroups = this.computeSkurrerGroups(boble, rawAnswer);
                this.svar.retningForslag = this.computeRetningForslag(this._pendingSkurrerGroups);
                break;
            case "5.2a":
                /*---- "Jeg vil alligevel justere logoet" hopper til 4.3b, men uden om 4.2 - retning skal stadig opdateres, ellers tror 6.2/6.3/8.1 stadig, brugeren valgte "Behold" ----*/
                if (rawAnswer.jumpTo === "4.3b") {
                    this.svar.retning = { id: "juster", text: "Justér mit nuværende logo" };
                }
                break;
            case "7.2":
                this.setTestResultat("smaat", rawAnswer.optionId);
                break;
            case "7.3":
                this.setTestResultat("udenFarve", rawAnswer.optionId);
                break;
            case "7.4":
                this.setTestResultat("baggrund", rawAnswer.optionId === "begge" ? "begge" : rawAnswer.optionId);
                break;
            case "7.5": {
                const results = this.svar.testResultater || {};
                const failed = [];
                if (results.smaat && results.smaat !== "ja") failed.push("Kan kendes, når det er småt");
                if (results.udenFarve && results.udenFarve !== "ja") failed.push("Virker uden farve");
                if (results.baggrund && results.baggrund !== "begge") failed.push("Virker på både lys og mørk baggrund");
                this.svar.aabnePunkter = rawAnswer.optionId === "juster_nu" ? [] : failed;
                /*---- Spor B/C's "juster nu" sender altid til 6.1j (arbejdsliste), uanset om den oprindelige retning var "nyt" - resten af Modul 6 skal derfor også opføre sig som justér herfra ----*/
                if (rawAnswer.jumpTo === "6.1j") {
                    this.svar.retning = { id: "juster", text: "Justér mit nuværende logo" };
                }
                break;
            }
            default:
                break;
        }
    }

    setTestResultat(key, value) {
        this.svar.testResultater = this.svar.testResultater || {};
        this.svar.testResultater[key] = value;
    }

    computeSkurrerGroups(boble, rawAnswer) {
        const selectedIds = (rawAnswer.selected || []).map((o) => o.id);
        if (!selectedIds.length) return ["ingen"];
        if (selectedIds.length === 1 && selectedIds[0] === "ved_ikke") return ["ved-ikke"];

        const groups = new Set();
        selectedIds.forEach((id) => {
            if (id === "ved_ikke") { groups.add("ved-ikke"); return; }
            const option = boble.options.find((o) => o.id === id);
            if (option?.group) groups.add(option.group);
        });

        return groups.size ? [...groups] : ["ingen"];
    }

    computeRetningForslag(groups) {
        if (groups.includes("ved-ikke")) return null;
        if (groups.includes("ingen")) return "behold";
        if (groups.every((g) => g === "form")) return "juster";
        if (groups.includes("identitet") || groups.includes("oprindelse")) return "nyt";
        return null;
    }

    customNext(boble, rawAnswer) {
        switch (boble.id) {
            case "2.1":
                return { ja_tilfreds: "2a.1", ja_usikker: "2b.1", nej: "2c.1", under_udvikling: "2d.1" }[rawAnswer.optionId];

            case "3.2":
                if (this.svar.spor === "B") return "3.3b";
                if (this.svar.spor === "C" && this.svar.logoType?.id === "ved_ikke") return "3.3c";
                return "3.4";

            case "3.4":
                return this.svar.spor === "B" ? "4.1" : "5.1";

            case "5.1": {
                const hasPalette = Boolean(this._farverPaletteCache);
                const isBehold = this.svar.retning?.id === "behold";
                if (isBehold) return hasPalette ? "5.2a" : "5.2b";
                return hasPalette ? "5.2c" : "5.2d";
            }

            case "5.2c":
            case "5.2d":
                return this.effectiveRetning() === "juster" ? "6.1j" : "6.1n";

            default:
                return null;
        }
    }

    async advance(boble, rawAnswer) {
        if (boble.answerKey) {
            this.svar[boble.answerKey] = this.resolveAnswer(boble, rawAnswer);
        }

        this.applySideEffects(boble, rawAnswer);

        if (boble.id === "1.2") {
            const chosen = (rawAnswer.selected || []).map((o) => o.id).filter((id) => id !== "ingen");
            this.runSequence(chosen.map((id) => `1.3-${id}`), "1.4");
            return;
        }

        if (boble.id === "2b.3") {
            this.runSequence(this._pendingSkurrerGroups.map((g) => `2b.4-${g}`), "2b.5");
            return;
        }

        if (this.sequenceQueue) {
            this.advanceSequence();
            return;
        }

        if (rawAnswer?.jumpTo) {
            this.showBoble(rawAnswer.jumpTo);
            return;
        }

        if (boble.saveOutput) {
            await this.saveOutput();
        }

        if (boble.isExit) {
            if (boble.onLeave === "saveDPosition") {
                await this.saveDPosition();
            } else {
                await clearVaekstrumPosition(LOGO_VAEKSTRUM_ID);
            }
            window.location.href = VISUELT_UDTRYK_HUB;
            return;
        }

        const nextId = rawAnswer?.forcedNext || boble.next || this.customNext(boble, rawAnswer);
        this.showBoble(nextId);
    }

    runSequence(ids, afterId) {
        this.sequenceQueue = { ids: [...ids], afterId };
        this.advanceSequence();
    }

    advanceSequence() {
        if (this.sequenceQueue.ids.length) {
            const nextId = this.sequenceQueue.ids.shift();
            this.showBoble(nextId);
            return;
        }

        const after = this.sequenceQueue.afterId;
        this.sequenceQueue = null;
        this.showBoble(after);
    }

    async saveOutput() {
        const documentation = this.svar.begrundelse?.begrundelse || "";
        await saveVaekstrumOutput(LOGO_VAEKSTRUM_ID, this.svar, documentation);
        await clearVaekstrumPosition(LOGO_VAEKSTRUM_ID);
    }

    async saveDPosition() {
        this.svar.venter = true;
        await saveVaekstrumPosition(LOGO_VAEKSTRUM_ID, { bobleId: "7.1", svar: this.svar });
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

/*---- eksporteret til evt. senere genbrug (fx Fælles samling) ----*/
export { LOGO_BUCKET, INSPIRATION_BUCKET };
