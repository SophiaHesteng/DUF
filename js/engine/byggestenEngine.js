import { RENDERERS, showWelcome, showExitConfirmation } from "./byggestenUi.js";
import { velkomst, BOBLER, EMNER, OVERGANGE, saetTekster } from "../data/byggesten.js";
import {
    saveVaekstrumOutput,
    saveImage,
    deleteImage,
    getImagesForVaekstrum,
    getVaekstrumOutput
} from "../storage/vaekstrumStorage.js";
import { hentUdgangspunkt } from "../storage/udgangspunkt.js";
import { KURATEREDE_PAR } from "../components/fontvaelger.js";
import { IKON_STILE } from "../components/materialIkoner.js";
import { VISUELT_UDTRYK_HUB } from "./vaekstomraadeExit.js";

const BYGGESTEN_VAEKSTRUM_ID = "byggesten";
const DETALJE_BUCKET = "byggesten-detalje";

/*---- Et emne fra Modul 2 = et "job": start-boble + de bobler, der afslutter emnet (fx alle tre 5.2-varianter). Når en slut-boble forlades, er emnet gennemført, og køen afgør næste skridt ----*/
const EMNE_JOBS = {
    ikoner: { emne: "ikoner", start: "3.1", slut: ["3.5"] },
    fonte: { emne: "fonte", start: "4.1", slut: ["4.6"] },
    andreByggesten: { emne: "andreByggesten", start: "5.1", slut: ["5.2a", "5.2b", "5.2c"] }
};

/*---- 6.3 og 7.1's "Ret" → tilbage til det relevante trin i Modul 3-5. `kunVed`: jobbet er kun færdigt, når slut-boblen sender videre til netop den boble (4.5 "Nej, begge er svære" sender tilbage til 4.4 og holder jobbet åbent) ----*/
const JUSTERINGS_JOBS = {
    ikoner: { start: "3.1", slut: ["3.5"] },
    fontOverskrift: { start: "4.3", slut: ["4.3"] },
    fontBroedtekst: { start: "4.4", slut: ["4.5"], kunVed: "4.6" },
    anden: { start: "5.1", slut: ["5.2a", "5.2b", "5.2c"] }
};

/*---- 7.1's "Ret" pr. emne (runde 7) - samme justerings-jobs som 6.3 ----*/
const RET_JOBS = {
    ikoner: ["ikoner"],
    fonte: ["fontOverskrift", "fontBroedtekst"],
    andreByggesten: ["anden"]
};

/*---- Bobler, der afslutter et emne og derfor viser en overgang til det næste (runde 7) ----*/
const OVERGANGS_BOBLER = ["3.5", "4.6", "5.2a", "5.2b", "5.2c"];

/*----------------------------------------------------------------------------
 * Selvstændig motor for det uddybende vækstrum "Ikoner, fonte & andre
 * grafiske byggesten" (Visuelt udtryk) - jf. docs/duf-manuskript-byggesten.md.
 *
 * Data-drevet efter samme mønster som Logo (BOBLER keyet på id, `next` pr.
 * boble eller pr. option), men Byggestens egen kopi - ingen delt kode.
 *
 * Den lette forgrening (fokusvalg) styres af en lille kø af "jobs": 2.1
 * lægger de valgte, endnu ikke gennemførte emner i køen i fast rækkefølge
 * (Ikoner → Fonte → Andre byggesten), efterfulgt af 6.1. 6.3 bruger samme kø
 * til justeringer og lander bagefter i 6.1 igen; 7.1's "Ret" (runde 7) gør
 * det samme, men lander i 7.1.
 *
 * Fokusvalg er ikke låst: "Gå til et andet emne" (vist fra Modul 3 og frem)
 * går tilbage til 2.1 med de nuværende valg markeret. Tilføjes et emne,
 * køres kun det nye, derefter 6.1 - allerede gennemførte emner og deres svar
 * bevares. Fravælges et emne, bliver svarene liggende i `svar`, men vises og
 * gemmes kun for de emner, der står i fokusvalg. Dette er en midlertidig,
 * rum-lokal løsning - den fælles modul-navigationslinje (pin-og-sti) er en
 * separat, endnu ikke bygget spec og kan erstatte knappen senere.
 *
 * Runde 7: læser brugerens udgangspunkt fra Overblik (hentUdgangspunkt) til
 * 1.3 (forvalgt "Fra bunden") og 4.2 (kanalerne øverst).
 * ----------------------------------------------------------------------------
 */

export class ByggestenEngine {

    svar = { fokusvalg: [] };
    faerdigeEmner = [];
    koe = null; // { jobs: [...], efter: bobleId }
    aktivtJob = null;
    previousScreen = null;
    overblik = null; // hentUdgangspunkt() - null, hvis brugeren ikke har været i Overblik
    skiftForklaringSlut = false; // "Gå til et andet emne"-forklaringen er brugt op for dette besøg
    _paletCache;

    harArbejdetMedFarverEllerLogo() {
        return sessionStorage.getItem("duf-visited-farver") === "1" || sessionStorage.getItem("duf-visited-logo") === "1";
    }

    async start() {
        const kontekst = this.harArbejdetMedFarverEllerLogo() ? velkomst.kontekstuel : velkomst.standard;
        this.previousScreen = () => this.start();
        this.overblik = await hentUdgangspunkt();

        showWelcome([kontekst, velkomst.faelles], velkomst.knap, () => {
            document.body.classList.add("in-flow");
            this.showBoble("1.2");
        });
    }

    async showBoble(id) {
        const boble = this.resolveContent(id);
        this.previousScreen = () => this.showBoble(id);

        /*---- Forklaringen under "Gå til et andet emne" forsvinder, når brugeren når Modul 6 ----*/
        if (boble.modul >= 6) this.skiftForklaringSlut = true;

        const ctx = await this.gatherContext(boble);
        const render = RENDERERS[boble.type];

        render(boble, ctx, (rawAnswer) => this.advance(boble, rawAnswer), () => this.exitRoom());
    }

    /*---- "Fra bunden" i 1.3 - styrer 2.1's og 4.2's varianter ----*/
    fraBunden() {
        return this.svar.udgangspunkt?.id === "fra-bunden";
    }

    /*---- Statiske indholds-overstyringer pr. boble-id (recaps, filtrerede valg, afledte responser) ----*/

    resolveContent(id) {
        const base = BOBLER[id];
        const boble = {
            ...base,
            paragraphs: [...(base.paragraphs || [])],
            options: base.options ? base.options.map((o) => ({ ...o })) : base.options
        };

        switch (id) {
            case "2.1":
                if (this.fraBunden()) {
                    boble.options.forEach((option) => { option.text = base.optionTekstFraBunden[option.id] || option.text; });
                }
                break;

            case "3.4-fri":
                if (this.svar.ikonKilde?.id === "ingenEndnu") boble.paragraphs.unshift(base.indledningIngenEndnu);
                break;

            case "3.5":
                boble.recap = this.ikonRecap();
                if (this.svar.ikonFoelelse) boble.visuelt = { type: "ikonStil", stil: this.svar.ikonFoelelse.id };
                break;

            case "4.2":
                this.tilpas42(boble, base);
                break;

            case "4.6":
                boble.recap = this.fontRecap();
                if (this.svar.googleFontsDirekte === false) {
                    boble.paragraphs.push(`Husk at kigge efter noget, der ligner, i ${this.svar.arbejdsVaerktoej?.vaerktoejNavn || "dit værktøj"}.`);
                }
                break;

            case "6.1":
                /*---- Ét emne har intet at "arbejde sammen" med - overskriften følger det aktuelle fokusvalg ----*/
                boble.heading = this.svar.fokusvalg.length > 1 ? base.heading : base.headingEtEmne;
                break;

            case "6.3":
                boble.options = boble.options.filter((o) => this.svar.fokusvalg.includes(o.emne));
                break;

            case "7.1":
                boble.recapGrupper = this.recapGrupper();
                boble.eksempelRecap = this.eksempelRecap();
                boble.tekster = saetTekster;
                break;

            case "7.2":
                boble.paamindelse = this.paamindelse();
                boble.eksempler = this.tommelfingerEksempler();
                break;
        }

        if (OVERGANGS_BOBLER.includes(id)) {
            const overgang = OVERGANGE[this.naesteEfterEmne(id)];
            if (overgang) {
                boble.overgang = overgang.tekst;
                boble.nextButtonText = overgang.knap;
            }
        }

        return boble;
    }

    /*---- 4.2 (runde 7): variant ved "Fra bunden", egne svar for "På sociale medier" og "Det ved jeg ikke endnu", og Overbliks kanaler øverst med en note ----*/

    tilpas42(boble, base) {
        const respons = (o) => (o.googleFontsDirekte
            ? base.responsDirekte
            : base.responsIkkeDirekte.replace("{vaerktoej}", o.vaerktoejNavn));

        if (this.fraBunden()) boble.paragraphs = [base.spoergsmaalFraBunden];
        else boble.options = boble.options.filter((o) => !o.kunFraBunden);

        boble.options.forEach((option) => {
            if (option.googleFontsDirekte !== undefined && !option.response) option.response = respons(option);
            if (option.followUp) {
                option.followUp = {
                    ...option.followUp,
                    options: option.followUp.options.map((fu) => ({ ...fu, response: respons(fu) }))
                };
            }
        });

        const kanaler = this.overblik?.kanaler || [];
        const matcher = (option) => (option.kanaler || []).filter((k) => kanaler.includes(k));
        const oeverst = boble.options.filter((o) => matcher(o).length);

        if (oeverst.length) {
            boble.options = [...oeverst, ...boble.options.filter((o) => !oeverst.includes(o))];
            const navne = oeverst.flatMap(matcher).map((k) => base.kanalNavne[k]).filter(Boolean);
            boble.kanalNote = base.kanalNote.replace("{kanaler}", listeTekst(navne));
        }
    }

    /*---- Overgange (runde 7): hvor går brugeren hen, når denne slut-boble forlades? Nøgle i OVERGANGE ----*/

    naesteEfterEmne(bobleId) {
        const job = this.aktivtJob;
        if (job && !job.slut.includes(bobleId)) return null;

        const naesteJob = this.koe?.jobs[0];
        if (naesteJob) {
            const modul = BOBLER[naesteJob.start].modul;
            if (modul === 4) return "fonte";
            if (modul === 5) return "andreByggesten";
            return null;
        }

        return this.koe?.efter === "7.1" ? "tilbageTil71" : "provSammen";
    }

    /*---- Asynkront hentet kontekst (billeder, gemt Farver-palet/Logo) + forudfyldning af tidligere svar, så et genbesøg (Gå til et andet emne, 6.3, 7.1's Ret, 4.5 "Nej") ikke starter fra tomme felter ----*/

    async gatherContext(boble) {
        const iEmneModul = boble.modul >= 3 && boble.modul <= 5;
        const ctx = {
            prefill: this.prefillFor(boble),
            visSkiftFokus: boble.modul >= 3 && !boble.isExit,
            visSkiftForklaring: iEmneModul && !this.skiftForklaringSlut,
            onSkiftFokus: () => this.skiftFokus(),
            emneTaeller: iEmneModul ? this.emneTaeller(boble.modul) : ""
        };

        if (boble.imageUpload) {
            const bucket = boble.imageUpload.bucket;
            ctx.images = await getImagesForVaekstrum(bucket);
            ctx.imageHandlers = {
                upload: (file) => saveImage(bucket, file),
                remove: (imageId) => deleteImage(imageId),
                refresh: () => getImagesForVaekstrum(bucket)
            };
        }

        switch (boble.type) {
            case "fontvaelger":
                ctx.gemtPalet = await this.hentGemtPalet("farver");
                ctx.parFont = boble.formaal === "broedtekst" ? this.svar.fontOverskrift : null;
                break;

            case "provSammen":
                ctx.provSammen = await this.provSammenData();
                ctx.recap = this.eksempelRecap();

                if (!ctx.provSammen.gemtPalet && !ctx.provSammen.gemtLogo) {
                    boble.paragraphs = [...boble.paragraphs, boble.ingenPaletEllerLogo];
                    boble.seOgsaa = boble.seOgsaaUdenPaletOgLogo;
                }
                break;

            case "saet":
                ctx.provSammen = await this.provSammenData();
                ctx.detSkalDuBruge = this.detSkalDuBruge(ctx.provSammen.gemtPalet);
                ctx.onRet = (emne) => this.ret(emne);
                break;
        }

        /*---- 4.5: prøveteksten i brugerens brødtekstfont - i hendes egne tekst- og baggrundsfarver, hvis hun har en gemt palet ----*/
        if (boble.id === "4.5") {
            const palet = await this.hentGemtPalet("farver");
            ctx.laesbarhed = {
                font: this.svar.fontBroedtekst || null,
                farver: palet?.kombination || (palet?.tekstfarve ? { tekst: palet.tekstfarve, baggrund: "#FFFFFF" } : null)
            };
        }

        return ctx;
    }

    prefillFor(boble) {
        const value = this.svar[boble.answerKey];

        switch (boble.type) {
            case "fokusvalg":
                return { valgte: [...this.svar.fokusvalg] };
            case "eksempler":
                return { eksempler: value || [] };
            case "fontvaelger":
                return { valgt: value || "" };
            case "textNote":
                if (boble.id === "5.2a") return { beskrivelse: this.svar.andenDetalje?.beskrivelse || "" };
                if (boble.id === "7.2") return { tommelfingerregel: this.svar.tommelfingerregel || "" };
                return {};
            case "multiChoice":
                return { valgte: Array.isArray(value) ? value.map((v) => v.id || v) : [] };
            case "choice":
                /*---- 1.3 (runde 7): "Fra bunden" er valgt på forhånd, hvis Overblik viser, at brugeren starter fra bunden. Hun kan frit vælge om ----*/
                if (boble.id === "1.3" && !value && this.overblik?.starterFraBunden) return { optionId: "fra-bunden" };
                return {};
            default:
                return {};
        }
    }

    /*---- Svar-håndtering + flow ----*/

    applyAnswer(boble, raw) {
        /*---- 5.2c er en ren tekstboble uden svar - valget ER at være nået hertil ----*/
        if (boble.id === "5.2c") {
            this.svar.ikkeBesluttet = true;
            return;
        }

        if (!raw) return;

        switch (boble.id) {
            case "2.1":
                this.svar.fokusvalg = EMNER.map((e) => e.id).filter((id) => raw.valgte.includes(id));
                return;

            case "3.3": {
                const option = boble.options.find((o) => o.id === raw.optionId);
                if (!option.gemIkke) this.svar.ikonKilde = { id: option.id, text: option.text };
                return;
            }

            case "4.2": {
                const option = boble.options.find((o) => o.id === raw.optionId);
                const valg = raw.followUpId ? option.followUp.options.find((fu) => fu.id === raw.followUpId) : option;

                this.svar.arbejdsVaerktoej = {
                    id: option.id,
                    text: option.text,
                    egneSkrifttyper: raw.followUpId ? raw.followUpId === "ja" : undefined,
                    vaerktoejNavn: valg.vaerktoejNavn
                };
                this.svar.googleFontsDirekte = Boolean(valg.googleFontsDirekte);
                return;
            }

            case "4.5":
                /*---- Runde 7: "ja" / "kunStor" / "nej" (før: true/false) ----*/
                this.svar.laesbarhedOk = raw.optionId;
                return;

            case "5.1":
                /*---- Et nyt 5.1-valg nulstiller de tre gensidigt udelukkende 5.2-svar, så kun det senest valgte gælder ----*/
                delete this.svar.andenDetalje;
                delete this.svar.andenRetning;
                delete this.svar.ikkeBesluttet;
                return;

            case "5.2a":
                this.svar.andenDetalje = { beskrivelse: raw.beskrivelse || "" };
                return;

            case "6.3":
                this.svar.tilbageTil = raw.selected.map((s) => s.id);
                return;

            case "7.2":
                this.svar.tommelfingerregel = raw.tommelfingerregel || "";
                return;
        }

        if (!boble.answerKey) return;

        switch (boble.type) {
            case "choice":
                this.svar[boble.answerKey] = { id: raw.optionId, text: raw.text };
                break;
            case "multiChoice":
                this.svar[boble.answerKey] = raw.selected;
                break;
            case "eksempler":
                this.svar.eksempler = raw.eksempler;
                break;
            case "fontvaelger":
                this.svar[boble.answerKey] = raw.fontNavn;
                break;
        }
    }

    async advance(boble, raw) {
        this.applyAnswer(boble, raw);

        if (boble.saveOutput) await this.saveOutput();

        if (boble.isExit) {
            window.location.href = VISUELT_UDTRYK_HUB;
            return;
        }

        if (boble.id === "2.1") {
            this.startEmneKoe();
            return;
        }

        if (boble.id === "6.3") {
            this.startJusteringsKoe(this.svar.tilbageTil || [], "6.1");
            return;
        }

        const nextId = raw?.forcedNext || boble.next;

        if (this.aktivtJob && this.aktivtJob.slut.includes(boble.id) && (!this.aktivtJob.kunVed || nextId === this.aktivtJob.kunVed)) {
            if (this.aktivtJob.emne && !this.faerdigeEmner.includes(this.aktivtJob.emne)) {
                this.faerdigeEmner.push(this.aktivtJob.emne);
            }
            this.naesteIKoe();
            return;
        }

        /*---- Sikkerhedsnet: en slut-boble uden aktivt job (burde ikke kunne ske) fører til Prøv dem sammen ----*/
        this.showBoble(nextId || "6.1");
    }

    startEmneKoe() {
        const jobs = EMNER
            .map((e) => e.id)
            .filter((id) => this.svar.fokusvalg.includes(id) && !this.faerdigeEmner.includes(id))
            .map((id) => EMNE_JOBS[id]);

        this.koe = { jobs, efter: "6.1" };
        this.naesteIKoe();
    }

    startJusteringsKoe(ids, efter) {
        const jobs = ids.map((id) => JUSTERINGS_JOBS[id]).filter(Boolean);

        this.koe = { jobs, efter };
        this.naesteIKoe();
    }

    naesteIKoe() {
        if (this.koe?.jobs.length) {
            this.aktivtJob = this.koe.jobs.shift();
            this.showBoble(this.aktivtJob.start);
            return;
        }

        const efter = this.koe?.efter || "6.1";
        this.koe = null;
        this.aktivtJob = null;
        this.showBoble(efter);
    }

    skiftFokus() {
        this.skiftForklaringSlut = true;
        this.koe = null;
        this.aktivtJob = null;
        this.showBoble("2.1");
    }

    /*---- 7.1's "Ret" (runde 7): samme mekanisme som 6.3, men brugeren lander i 7.1 bagefter ----*/
    ret(emne) {
        this.startJusteringsKoe(RET_JOBS[emne] || [], "7.1");
    }

    /*---- "Emne 2 af 3: Fonte" øverst i Modul 3-5 - kun når mere end ét emne er valgt. Tallene følger det aktuelle fokusvalg ----*/
    emneTaeller(modul) {
        const valgte = EMNER.filter((e) => this.svar.fokusvalg.includes(e.id));
        if (valgte.length < 2) return "";

        const emne = EMNER[modul - 3];
        const nr = valgte.indexOf(emne) + 1;
        return nr ? `Emne ${nr} af ${valgte.length}: ${emne.taellerNavn}` : "";
    }

    /*---- Recaps + afledte visninger ----*/

    harEmne(emne) {
        return this.svar.fokusvalg.includes(emne);
    }

    ikonRecap() {
        return [
            { label: "Følelse", value: this.svar.ikonFoelelse?.text },
            { label: "Funktion", value: this.svar.ikonFunktion?.text },
            { label: "Kilde", value: this.svar.ikonKilde?.text }
        ].filter((item) => item.value);
    }

    fontRecap() {
        return [
            { label: "Overskriftsfont", value: this.svar.fontOverskrift },
            { label: "Brødtekstfont", value: this.svar.fontBroedtekst }
        ].filter((item) => item.value);
    }

    andenTekst() {
        if (this.svar.andenDetalje) return this.svar.andenDetalje.beskrivelse || "En detalje, du har vist os";
        if (this.svar.andenRetning) return this.svar.andenRetning.text;
        if (this.svar.ikkeBesluttet) return "Ikke besluttet endnu — det må gerne vise sig med tiden";
        return "";
    }

    andenRecap() {
        const tekst = this.andenTekst();
        return tekst ? [{ label: "Anden byggesten", value: tekst }] : [];
    }

    eksempelRecap() {
        const eksempler = this.svar.eksempler || [];
        return eksempler.length ? [{ label: "Dine steder", value: eksempler.join(" · ") }] : [];
    }

    /*---- 7.1: oversigten grupperet pr. emne, så hvert emne kan få sit eget "Ret" ----*/
    recapGrupper() {
        return [
            { emne: "fonte", items: this.fontRecap() },
            { emne: "ikoner", items: this.ikonRecap() },
            { emne: "andreByggesten", items: this.andenRecap() }
        ].filter((gruppe) => this.harEmne(gruppe.emne) && gruppe.items.length);
    }

    /*---- 7.1 "Det skal du bruge" (runde 7): de oplysninger, brugeren skal bruge, når hun selv laver noget. `kopi` er det, "Kopiér" lægger i udklipsholderen ----*/
    detSkalDuBruge(gemtPalet) {
        const linjer = [];
        const kuraterede = KURATEREDE_PAR.flatMap((par) => par.fonte);
        const fontLinje = (label, navn) => ({
            label,
            kopi: navn,
            url: kuraterede.includes(navn) ? `https://fonts.google.com/specimen/${navn.replace(/ /g, "+")}` : null
        });

        if (this.harEmne("fonte")) {
            if (this.svar.fontOverskrift) linjer.push(fontLinje("Overskriftsfont", this.svar.fontOverskrift));
            if (this.svar.fontBroedtekst) linjer.push(fontLinje("Brødtekstfont", this.svar.fontBroedtekst));
        }

        if (this.harEmne("ikoner") && this.svar.ikonFoelelse) {
            const stil = IKON_STILE[this.svar.ikonFoelelse.id];
            if (stil) linjer.push({ label: "Ikonstil", kopi: `Material Symbols ${stil.navn}`, url: "https://fonts.google.com/icons" });
        }

        (gemtPalet?.farver || []).forEach((farve) => {
            linjer.push({ label: farve.role ? `Farve: ${farve.role}` : "Farve", kopi: farve.hex, farve: farve.hex });
        });

        return linjer;
    }

    /*---- 7.2 (runde 7): brugerens egne valg i én linje over feltet ----*/
    paamindelse() {
        const dele = [];

        if (this.harEmne("ikoner") && this.svar.ikonFoelelse) dele.push(this.ikonFrase());
        if (this.harEmne("fonte")) {
            if (this.svar.fontOverskrift) dele.push(`${this.svar.fontOverskrift} til overskrifter`);
            if (this.svar.fontBroedtekst) dele.push(`${this.svar.fontBroedtekst} til brødtekst`);
        }
        if (this.harEmne("andreByggesten")) {
            if (this.svar.andenRetning && this.svar.andenRetning.id !== "egen") dele.push(smaaBogstav(this.svar.andenRetning.text));
            else if (this.svar.andenDetalje) dele.push("din egen detalje");
        }

        return dele.length ? `${saetTekster.paamindelse}${dele.join(" · ")}` : "";
    }

    /*---- 7.2 (runde 7): to-tre eksempler bygget af manuskriptets skabeloner med brugerens faktiske valg - kun for emner, hun har arbejdet med ----*/
    tommelfingerEksempler() {
        const skabeloner = saetTekster.eksempler;
        const eksempler = [];

        if (this.harEmne("andreByggesten") && this.svar.andenRetning && this.svar.andenRetning.id !== "egen") {
            eksempler.push(this.svar.andenRetning.id === "streg"
                ? skabeloner.streg
                : skabeloner.andenRetning.replace("{detalje}", smaaBogstav(this.svar.andenRetning.text)));
        }

        if (this.harEmne("ikoner") && this.svar.ikonFoelelse) {
            eksempler.push(skabeloner.ikoner.replace("{ikonstil}", this.ikonFrase()));
        }

        if (this.harEmne("fonte") && this.svar.fontOverskrift) {
            eksempler.push(skabeloner.fonte
                .replace("{overskrift}", this.svar.fontOverskrift)
                .replace("{broedtekst}", this.svar.fontBroedtekst || "en enkel skrift"));
        }

        return eksempler;
    }

    ikonFrase() {
        const option = BOBLER["3.1"].options.find((o) => o.id === this.svar.ikonFoelelse?.id);
        return option?.frase || smaaBogstav(this.svar.ikonFoelelse?.text || "");
    }

    andenByggestenForPreview(detaljeBilleder) {
        if (!this.harEmne("andreByggesten")) return null;
        if (this.svar.andenDetalje) {
            return { type: "detalje", beskrivelse: this.svar.andenDetalje.beskrivelse, billede: detaljeBilleder?.[0]?.blob || null };
        }
        if (this.svar.andenRetning) return { type: "retning", retning: this.svar.andenRetning.id, tekst: this.svar.andenRetning.text };
        return null;
    }

    /*---- Data til "Prøv dem sammen" (6.1, og i lille størrelse i 7.1) ----*/
    async provSammenData() {
        const [gemtPalet, gemtLogo, detaljeBilleder] = await Promise.all([
            this.hentGemtPalet("farver"),
            this.hentGemtLogo("logo"),
            getImagesForVaekstrum(DETALJE_BUCKET)
        ]);

        return {
            fokusvalg: [...this.svar.fokusvalg],
            ikon: this.svar.ikonFoelelse ? { foelelse: this.svar.ikonFoelelse.id, tekst: this.svar.ikonFoelelse.text } : null,
            fonte: { overskrift: this.svar.fontOverskrift || "", broedtekst: this.svar.fontBroedtekst || "" },
            andenByggesten: this.andenByggestenForPreview(detaljeBilleder),
            gemtPalet,
            gemtLogo
        };
    }

    /*---- Gemt output fra Farver og Logo (kun læst, aldrig skrevet). Palet: getVaekstrumOutput("farver").data.palette. Logo: den første fil i Logos billed-bucket, samme som Logo selv viser ----*/

    async hentGemtPalet(vaekstrumId) {
        if (this._paletCache !== undefined) return this._paletCache;

        const output = await getVaekstrumOutput(vaekstrumId);
        const palette = output?.data?.palette;

        /*---- Farver gemmer tekstfarven som `textColor` og den afprøvede kombination (Modul 7) som `contrast: { textHex, bgHex }` ----*/
        const contrast = output?.data?.contrast;

        this._paletCache = palette?.length
            ? {
                farver: palette.map(({ hex, role, percent }) => ({ hex, role, percent })),
                tekstfarve: output.data.textColor || null,
                kombination: contrast?.textHex && contrast?.bgHex ? { tekst: contrast.textHex, baggrund: contrast.bgHex } : null
            }
            : null;

        return this._paletCache;
    }

    async hentGemtLogo(bucket) {
        const images = await getImagesForVaekstrum(bucket);
        return images?.length ? { blob: images[0].blob, navn: images[0].name } : null;
    }

    /*---- Modul 7 ----*/

    buildBegrundelse(detSkalDuBruge = []) {
        const dele = [];

        if (this.harEmne("fonte") && (this.svar.fontOverskrift || this.svar.fontBroedtekst)) {
            const fonte = [
                this.svar.fontOverskrift ? `${this.svar.fontOverskrift} til overskrifter` : "",
                this.svar.fontBroedtekst ? `${this.svar.fontBroedtekst} til brødtekst` : ""
            ].filter(Boolean).join(" og ");
            dele.push(`Fonte: ${fonte}.`);
        }

        if (this.harEmne("ikoner") && this.svar.ikonFoelelse) {
            const kilde = this.svar.ikonKilde ? ` Kilde: ${this.svar.ikonKilde.text.toLowerCase()}.` : "";
            dele.push(`Ikoner: ${this.svar.ikonFoelelse.text.toLowerCase()}.${kilde}`);
        }

        if (this.harEmne("andreByggesten")) {
            const tekst = this.andenTekst();
            if (tekst) dele.push(`Anden byggesten: ${tekst.replace(/\.$/, "")}.`);
        }

        if (this.svar.tommelfingerregel?.trim()) {
            dele.push(`Min tommelfingerregel: ${this.svar.tommelfingerregel.trim()}`);
        }

        /*---- Runde 7: listen "Det skal du bruge" fra 7.1 kommer med til Fælles samling ----*/
        if (detSkalDuBruge.length) {
            dele.push(`${saetTekster.detSkalDuBruge}: ${detSkalDuBruge.map((linje) => `${linje.label}: ${linje.kopi}`).join(" · ")}.`);
        }

        return dele.join(" ");
    }

    async saveOutput() {
        const detSkalDuBruge = this.detSkalDuBruge(await this.hentGemtPalet("farver"));
        const begrundelse = this.buildBegrundelse(detSkalDuBruge);
        const har = (emne) => this.harEmne(emne);

        const data = {
            udgangspunkt: this.svar.udgangspunkt,
            eksempler: this.svar.eksempler || [],
            iagttagelser: this.svar.iagttagelser || [],
            fokusvalg: [...this.svar.fokusvalg],
            ...(har("ikoner") && {
                ikonFoelelse: this.svar.ikonFoelelse,
                ikonFunktion: this.svar.ikonFunktion,
                ikonKilde: this.svar.ikonKilde
            }),
            ...(har("fonte") && {
                arbejdsVaerktoej: this.svar.arbejdsVaerktoej,
                googleFontsDirekte: this.svar.googleFontsDirekte,
                fontOverskrift: this.svar.fontOverskrift,
                fontBroedtekst: this.svar.fontBroedtekst,
                laesbarhedOk: this.svar.laesbarhedOk
            }),
            ...(har("andreByggesten") && {
                andenDetalje: this.svar.andenDetalje,
                andenRetning: this.svar.andenRetning,
                ikkeBesluttet: this.svar.ikkeBesluttet
            }),
            provetSammenResultat: this.svar.provetSammenResultat,
            tilbageTil: this.svar.tilbageTil || [],
            tommelfingerregel: this.svar.tommelfingerregel || "",
            detSkalDuBruge: detSkalDuBruge.map(({ label, kopi }) => ({ label, vaerdi: kopi })),
            begrundelse
        };

        await saveVaekstrumOutput(BYGGESTEN_VAEKSTRUM_ID, data, begrundelse);
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

/*---- "en hjemmeside og Instagram", "Facebook, Instagram og LinkedIn" ----*/
function listeTekst(dele) {
    if (dele.length < 2) return dele[0] || "";
    return `${dele.slice(0, -1).join(", ")} og ${dele[dele.length - 1]}`;
}

function smaaBogstav(tekst) {
    return tekst ? tekst.charAt(0).toLowerCase() + tekst.slice(1) : "";
}
