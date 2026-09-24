/*----------------------------------------------------------------------------
 * DUF — Indhold til vækstrummet "Ikoner, fonte & andre grafiske byggesten"
 * (uddybende, hjem: Visuelt udtryk)
 * ----------------------------------------------------------------------------
 * Jf. docs/duf-manuskript-byggesten.md (nyt manuskript, skrevet fra bunden
 * 2026-09-24). Rummet har en LET forgrening: brugeren vælger i Modul 2 selv,
 * hvilke emner hun vil arbejde med (fokusvalg), og kun de tilsvarende af
 * Modul 3-5 vises - i fast rækkefølge Ikoner → Fonte → Andre byggesten.
 * Modul 3 har derudover en reel tre-vejs forgrening på ikonernes kilde.
 *
 * Samme opbygning som js/data/logo.js: `BOBLER` er et OBJEKT keyet på
 * boble-id, og filen er ren DATA. Bobler, hvor næste skridt afhænger af
 * fokusvalg eller en justerings-kø, har `next: null` - den logik ligger i
 * byggestenEngine.js (EMNE_JOBS + køen).
 *
 * Fælles felter: id, modul, type, heading, nextButtonText, answerKey.
 * Valgfrie, generiske "påhæng" (jf. byggestenUi.js):
 *   guideLine + guideAvatar  - 💬-linje, ren data (Guide-UI'et er ikke bygget)
 *   seOgsaa                  - { maal: <nøgle i seOgsaaMaal.js>, tekst }
 *   imageUpload               - { bucket, label, hint }
 *   externalLink              - { url, label } (åbner i nyt vindue)
 *   list / afterList          - punktliste + afsluttende afsnit
 * ----------------------------------------------------------------------------
 */

/*---- Boble 1.1 - pre-flow velkomstskærm (showWelcome). Kontekstuel linje afhænger af, om brugeren har været i Farver/Logo i dette besøg ----*/
export const velkomst = {
    kontekstuel: "Du har allerede arbejdet med de store dele af dit visuelle udtryk. Nu kigger vi på det, der går igen mellem dem.",
    standard: "Velkommen til Ikoner, fonte & andre grafiske byggesten.",
    faelles: "Skrifttyper. Ikoner. Streger. Knapper. Små grafiske detaljer. Du behøver ikke beslutte det hele i dag. Vi finder de byggesten, der gør det lettere for dig at skabe noget, der føles som dig — hver gang.",
    knap: "Lad os se, hvor du starter"
};

/*---- Biblioteks-artiklen om ikonrettigheder (3.4-Fri, 3.4-Betal). TODO: artiklen er endnu ikke skrevet - `url` peger midlertidigt på Bibliotekets forside. Opdatér kun her, når artiklen findes ----*/
const IKONRETTIGHEDER_ARTIKEL = {
    titel: "Ikoner og rettigheder: det vigtigste, du skal vide",
    url: "library.html"
};
const ikonrettighederLink = `<a href="${IKONRETTIGHEDER_ARTIKEL.url}" target="_blank" rel="noopener noreferrer">'${IKONRETTIGHEDER_ARTIKEL.titel}'</a>`;

/*---- De tre emner fra Modul 2, i den faste rækkefølge modulerne vises i ----*/
export const EMNER = [
    { id: "ikoner", navn: "Ikoner" },
    { id: "fonte", navn: "Fonte" },
    { id: "andreByggesten", navn: "Andre byggesten" }
];

export const BOBLER = {

    /*---- Modul 1 — Se hvad du allerede har (alle) ----*/

    "1.2": {
        id: "1.2", modul: 1, type: "choice",
        heading: "Hvor starter du?",
        paragraphs: ["Hvor føles det rigtigt at starte?"],
        options: [
            { id: "allerede-udtryk", text: "Jeg har allerede et visuelt udtryk", response: "Så tager vi udgangspunkt i det, du har." },
            { id: "hist-og-her", text: "Jeg har lidt hist og her", response: "Så finder vi ud af, hvad der er værd at samle." },
            { id: "fra-bunden", text: "Jeg starter næsten fra bunden", response: "Så bygger vi et enkelt udgangspunkt, ét valg ad gangen." }
        ],
        answerKey: "udgangspunkt",
        next: "1.3"
    },
    "1.3": {
        id: "1.3", modul: 1, type: "eksempler",
        heading: "Find tre steder, hvor dit udtryk allerede dukker op",
        paragraphs: [
            "Åbn din hjemmeside, et opslag, eller et dokument, du sender til klienter. Kig ikke efter det perfekte — find bare tre steder, hvor du allerede bruger tekst, ikoner eller andre grafiske detaljer."
        ],
        antalFelter: 3,
        tomTekst: "Helt fint — så starter vi fra et rent bord.",
        imageUpload: { bucket: "byggesten-eksempler", label: "Skærmbilleder (valgfrit)", hint: "Billederne bliver på din egen enhed." },
        answerKey: "eksempler",
        next: "1.4"
    },
    "1.4": {
        id: "1.4", modul: 1, type: "multiChoice",
        heading: "Hvad lægger du mærke til?",
        paragraphs: ["Kig på det, du lige har fundet. Hvad går igen, og hvad varierer?"],
        options: [
            { id: "samme-skrifttyper", text: "Jeg bruger de samme skrifttyper" },
            { id: "forskellige-skrifttyper", text: "Jeg bruger forskellige skrifttyper" },
            { id: "samme-ikoner", text: "Jeg bruger de samme ikoner" },
            { id: "forskellige-ikoner", text: "Jeg bruger forskellige ikoner" },
            { id: "detaljer-gaar-igen", text: "Jeg har nogle grafiske detaljer, der går igen" },
            { id: "ikke-taenkt-over", text: "Jeg har egentlig ikke tænkt over det før" }
        ],
        guideAvatar: "Heidi",
        guideLine: "Du opdager noget om din egen praksis her. Det er ikke en test, du kan bestå eller dumpe.",
        answerKey: "iagttagelser",
        nextButtonText: "Lad os se, hvad du vil have styr på",
        next: "2.1"
    },

    /*---- Modul 2 — Hvad vil du have styr på? (skillepunktet) ----*/

    "2.1": {
        id: "2.1", modul: 2, type: "fokusvalg",
        heading: "Vælg dit fokus",
        paragraphs: ["Du behøver ikke gøre det hele på én gang. Hvad vil du gerne have styr på først?"],
        options: [
            { id: "ikoner", text: "Ikoner — jeg vil gerne have, at mine ikoner hænger sammen" },
            { id: "fonte", text: "Fonte — jeg vil gerne have styr på mine skrifttyper" },
            { id: "andreByggesten", text: "De små detaljer — jeg har nogle grafiske elementer, men ved ikke, om de hænger sammen" },
            { id: "det-hele", text: "Det hele — jeg vil gerne have et enkelt, samlet system", vaelgerAlle: true }
        ],
        answerKey: "fokusvalg",
        next: null /* byggestenEngine.js: kører de valgte (endnu ikke gennemførte) emner i fast rækkefølge, derefter 6.1 */
    },

    /*---- Modul 3 — Ikoner (kun hvis valgt) ----*/

    "3.1": {
        id: "3.1", modul: 3, type: "choice",
        heading: "Hvordan skal dine ikoner føles?",
        paragraphs: ["Hvilken retning føles mest som dig?"],
        /*---- TODO: "et lille eksempel på hver" - afventer "DUF Teknisk - Byggesten-forhåndsvisning (Prøv dem sammen)" (følelse → Material Symbols stil + fyld) og Marcus' valg af motiv ----*/
        options: [
            { id: "enkleStreger", text: "Enkle streger" },
            { id: "fyldte", text: "Fyldte ikoner" },
            { id: "runde", text: "Runde og bløde" },
            { id: "skarpe", text: "Skarpe og geometriske" }
        ],
        answerKey: "ikonFoelelse",
        next: "3.2"
    },
    "3.2": {
        id: "3.2", modul: 3, type: "choice",
        heading: "Hvad skal ikonerne gøre?",
        paragraphs: ["Hvad er ikonernes vigtigste opgave hos dig?"],
        options: [
            { id: "navigation", text: "Hjælpe folk med at finde vej (navigation, funktioner)" },
            { id: "personlighed", text: "Give mit materiale lidt mere personlighed (dekorative elementer)" },
            { id: "forklare", text: "Forklare noget, sammen med tekst" }
        ],
        /*---- Samme respons uanset valg ----*/
        response: "Et ikon behøver ikke forklare det hele. Skal det hjælpe med at forstå noget, skal teksten stadig kunne gøre arbejdet. Ikonet er hjælpen på vejen, ikke hele forklaringen.",
        answerKey: "ikonFunktion",
        next: "3.3"
    },
    "3.3": {
        id: "3.3", modul: 3, type: "choice",
        heading: "Hvor kommer dine ikoner fra?",
        paragraphs: [
            "Nu ved vi, hvordan de skal se ud, og hvad de skal gøre. Så er der kun ét spørgsmål tilbage: hvor kommer de fra? Det afgør nemlig, hvad du faktisk må."
        ],
        guideAvatar: "Marcus",
        guideLine: "Et ikon er et grafisk element ligesom et billede. At det er let at finde, er ikke det samme som at det er frit at bruge.",
        options: [
            { id: "fri", text: "Jeg bruger et gratis ikonbibliotek", next: "3.4-fri" },
            { id: "tegnSelv", text: "Jeg tegner dem selv", next: "3.4-tegn" },
            { id: "betaler", text: "Jeg betaler mig til dem", next: "3.4-betal" },
            { id: "kopieret", text: "Jeg tager dem nogle gange fra andre hjemmesider eller apps", next: "3.3b", gemIkke: true }
        ],
        answerKey: "ikonKilde",
        next: null /* pr. option */
    },
    "3.3b": {
        id: "3.3b", modul: 3, type: "text",
        heading: "Når du låner fra andre",
        paragraphs: [
            "Du ved det nok godt et sted i baghovedet: et ikon, du tager fra en anden hjemmeside eller en app, er ikke automatisk dit at bruge — heller ikke selvom det er let at kopiere, eller du ændrer farven bagefter. En kildeangivelse erstatter ikke en tilladelse. Det er ikke forbudt at være i tvivl om det, men vi vil gerne anbefale, at du i stedet vælger en af de tre veje herunder — de er markant mere sikre at bygge videre på."
        ],
        nextButtonText: "Tilbage til valgene",
        next: "3.3"
    },
    "3.4-fri": {
        id: "3.4-fri", modul: 3, type: "text",
        heading: "Gratis ikonbibliotek",
        /*---- Licenstekst tjekket mod Google (Apache License 2.0) 2026-09-22 - tjek igen, hvis der går længe før udgivelse ----*/
        paragraphs: [
            "Det, vi selv anbefaler, er Material Symbols & Icons fra Google Fonts (fonts.google.com/icons). De er gratis, må bruges kommercielt, og du behøver ikke kreditere Google — men må gerne, hvis du har lyst.",
            `Vælger du i stedet et andet gratis bibliotek, eller bruger du et ikon fra en virksomhed eller platform som Facebook eller MobilePay, gælder der andre regler, du bør kende. <strong>Læs mere i Biblioteket:</strong> ${ikonrettighederLink}.`
        ],
        externalLink: { url: "https://fonts.google.com/icons", label: "Åbn Material Symbols" },
        nextButtonText: "Videre",
        next: "3.5"
    },
    "3.4-tegn": {
        id: "3.4-tegn", modul: 3, type: "text",
        heading: "Du tegner selv",
        paragraphs: [
            "Vi skal ikke lære dig at tegne. Men uanset hvordan du gør det, er der fire ting, der gør et ikon, du selv tegner, til et godt ikon:"
        ],
        list: [
            "<strong>Genkendelighed</strong> — det skal kunne genkendes med et hurtigt blik, uden at nogen skal tænke sig om.",
            "<strong>Konsistens</strong> — samme stregtykkelse, samme hjørner, samme størrelsesforhold, på tværs af hele dit sæt.",
            "<strong>Simplicitet</strong> — fjern det, der ikke er nødvendigt for at forstå det. Færre streger er som regel bedre end flere.",
            "<strong>Kontekst</strong> — det skal give mening dér, hvor det bruges, sammen med tekst, ikke stå alene og skulle gættes."
        ],
        afterList: "Et ikon, du selv tegner, er som udgangspunkt dit eget. Men meget enkle, almindelige symboler (en pil, en lup) er sjældent originale nok til at være beskyttet i sig selv — det er ikke et problem for den daglige brug, men gem gerne dine skitser undervejs. De er god dokumentation, hvis ikonet senere skal blive en fast del af din identitet.",
        nextButtonText: "Videre",
        next: "3.5"
    },
    "3.4-betal": {
        id: "3.4-betal", modul: 3, type: "text",
        heading: "Du betaler for dem",
        paragraphs: [
            "Betaler du for dine ikoner — en pakke fra et betalt bibliotek, eller ved at få nogen til at lave dem til dig — er det stadig licensen eller aftalen, der afgør, hvad du må. Ikke prisen. Fire ting er værd at tjekke:"
        ],
        list: [
            "Får du ejerskab, eller kun en brugsret?",
            "Må ikonerne bruges kommercielt, uden tidsbegrænsning?",
            "Må du ændre dem, og få dem i de formater, du får brug for?",
            "Har du gemt kvitteringen eller aftalen, så du kan finde den igen?"
        ],
        afterList: [
            `Vil du have det hele uddybet, kan du læse mere i Biblioteket: ${ikonrettighederLink}.`,
            "Skal et ikon blive en fast del af din identitet, fx i dit logo, stiller det ofte skrappere krav end almindelig brug i opslag og dokumenter."
        ],
        seOgsaa: { maal: "logo", tekst: "Skal ikonet indgå i dit logo, kigger vi nærmere på kravene der." },
        nextButtonText: "Videre",
        next: "3.5"
    },
    "3.5": {
        id: "3.5", modul: 3, type: "text",
        heading: "Din ikonstil, samlet",
        paragraphs: [], /* recap bygges i byggestenEngine.js */
        next: null /* afslutter emnet "ikoner" - køen afgør næste skridt */
    },

    /*---- Modul 4 — Fonte (kun hvis valgt) ----*/

    "4.1": {
        id: "4.1", modul: 4, type: "text",
        heading: "Din tekst har også en stemme",
        paragraphs: ["Du behøver ikke finde den perfekte skrifttype. Du skal finde en, der fungerer for dig — og som du kan bruge igen og igen."],
        nextButtonText: "Lad os finde den",
        next: "4.2"
    },
    "4.2": {
        id: "4.2", modul: 4, type: "choice",
        heading: "Hvor skal du bruge dine fonte?",
        paragraphs: ["Hvor bruger du dem oftest?"],
        options: [
            { id: "egen", text: "På min egen hjemmeside", googleFontsDirekte: true },
            { id: "canva", text: "I Canva", googleFontsDirekte: false, vaerktoejNavn: "Canva" },
            { id: "docs-word", text: "I Word eller Google Docs", googleFontsDirekte: false, vaerktoejNavn: "Word eller Google Docs" },
            {
                id: "andet", text: "Et andet sted",
                /*---- Kort, uformel opfølgning, der afgør googleFontsDirekte uden at ligne en teknisk beslutning. "Ved ikke" behandles som false - vælgeren bliver så inspiration, hvilket aldrig er forkert ----*/
                followUp: {
                    spoergsmaal: "Kan du selv hente nye skrifttyper ind dér?",
                    options: [
                        { id: "ja", text: "Ja, det kan jeg", googleFontsDirekte: true },
                        { id: "nej", text: "Nej, jeg bruger dem, der er", googleFontsDirekte: false, vaerktoejNavn: "dit værktøj" },
                        { id: "ved-ikke", text: "Det ved jeg ikke", googleFontsDirekte: false, vaerktoejNavn: "dit værktøj" }
                    ]
                }
            }
        ],
        responsDirekte: "Godt — så kan du sandsynligvis bruge den skrifttype, du vælger her, direkte.",
        responsIkkeDirekte: "I {vaerktoej} vælger du blandt et fast sæt skrifttyper. Brug vælgeren her som inspiration — find noget, du kan lide, og kig derefter efter noget, der ligner, i dit eget værktøj.",
        answerKey: "arbejdsVaerktoej",
        next: "4.3"
    },
    "4.3": {
        id: "4.3", modul: 4, type: "fontvaelger",
        heading: "Vælg din overskriftsfont",
        paragraphs: [
            "Bladr blandt fire stemninger — Rolig og varm, Klar og professionel, Levende og personlig, eller Enkel og alsidig — og se skrifttyperne direkte i et eksempel. Vælg én, du vil bruge til overskrifter."
        ],
        formaal: "overskrift",
        answerKey: "fontOverskrift",
        next: "4.4"
    },
    "4.4": {
        id: "4.4", modul: 4, type: "fontvaelger",
        heading: "Vælg din brødtekstfont",
        paragraphs: [
            "Nu til den tekst, folk faktisk skal læse. Her vejer læsbarhed tungere end at være flot. Vælg én, der er let at læse i almindelig størrelse — eksemplet viser den sammen med din overskriftsfont."
        ],
        formaal: "broedtekst",
        answerKey: "fontBroedtekst",
        next: "4.5"
    },
    "4.5": {
        id: "4.5", modul: 4, type: "choice",
        heading: "Læsbarhedstesten",
        paragraphs: ["Læs denne sætning på din telefon:"],
        proeveSaetning: "En kort tekst om din praksis, sat i din valgte skrifttype.",
        efterProeve: "Er den nem at læse?",
        options: [
            { id: "ja", text: "Ja", next: "4.6" },
            {
                id: "nej", text: "Nej",
                response: "Det er helt normalt, at noget først viser sig, når man ser det for alvor, og ikke bare på en computerskærm. Prøv en anden.",
                next: "4.4"
            }
        ],
        answerKey: "laesbarhedOk",
        next: null /* pr. option */
    },
    "4.6": {
        id: "4.6", modul: 4, type: "text",
        heading: "Dine fonte, samlet",
        paragraphs: [], /* recap + evt. værktøjs-påmindelse bygges i byggestenEngine.js */
        next: null /* afslutter emnet "fonte" */
    },

    /*---- Modul 5 — Andre byggesten (kun hvis valgt) ----*/

    "5.1": {
        id: "5.1", modul: 5, type: "choice",
        heading: "Har du en detalje, der går igen?",
        paragraphs: [
            "Ud over ikoner og fonte er der ofte andre små, tilbagevendende elementer — en streg, en ramme, en bestemt måde at lave knapper på. Det behøver ikke være en masse. Én lille detalje, der går igen, kan være nok."
        ],
        options: [
            { id: "har", text: "Jeg har allerede en detalje, der går igen", next: "5.2a" },
            { id: "har-ikke", text: "Jeg har ikke én endnu", next: "5.2b" },
            { id: "ved-ikke", text: "Jeg ved ikke, om jeg har brug for én", next: "5.2c" }
        ],
        answerKey: "andenStart",
        next: null /* pr. option */
    },
    "5.2a": {
        id: "5.2a", modul: 5, type: "textNote",
        heading: "Vis mig den",
        paragraphs: ["Godt. Vis os den, eller beskriv den kort."],
        fields: [{ id: "beskrivelse", label: "", rows: 3 }],
        imageUpload: { bucket: "byggesten-detalje", label: "Upload (valgfrit)", hint: "Billedet bliver på din egen enhed." },
        answerKey: "andenDetalje",
        nextButtonText: "Videre",
        next: null /* afslutter emnet "andreByggesten" */
    },
    "5.2b": {
        id: "5.2b", modul: 5, type: "choice",
        heading: "Vælg blandt nogle retninger",
        paragraphs: ["Her er nogle steder at starte:"],
        options: [
            { id: "streg", text: "En tynd streg til at dele indhold op" },
            { id: "ramme", text: "En bestemt rammeform om billeder eller citater" },
            { id: "knapper", text: "En fast stil på knapper, fx runde hjørner eller en let skygge" },
            { id: "moenster", text: "Et gentaget mønster eller en tekstur" },
            { id: "egen", text: "Ingen af dem — jeg finder selv på noget" }
        ],
        answerKey: "andenRetning",
        nextButtonText: "Videre",
        next: null
    },
    "5.2c": {
        id: "5.2c", modul: 5, type: "text",
        heading: "Det behøver du heller ikke beslutte nu",
        paragraphs: ["Det er helt fint. Nogle af de små detaljer viser sig først, når du har brugt dit materiale et stykke tid. Du kan altid komme tilbage."],
        nextButtonText: "Videre",
        next: null
    },

    /*---- Modul 6 — Prøv dem sammen (alle) ----*/

    "6.1": {
        id: "6.1", modul: 6, type: "provSammen",
        heading: "Lad os se, om de kan arbejde sammen", /* mere end ét emne i fokusvalg */
        headingEtEmne: "Lad os se dit valg i praksis", /* præcis ét emne - valgt i byggestenEngine.js */
        paragraphs: [],
        ingenPaletEllerLogo: "Du har ikke en palet eller et logo endnu. Det er helt fint — brug dette som dit foreløbige udgangspunkt.",
        seOgsaaUdenPaletOgLogo: { maal: "farver", tekst: "Vil du lave en fast palet, kan du gøre det der, når du har lyst." },
        guideAvatar: "Heidi",
        guideLine: "Det er her, det hele mødes. Du skal ikke gætte dig til, om det passer sammen. Du skal se det.",
        next: "6.2"
    },
    "6.2": {
        id: "6.2", modul: 6, type: "choice", ctaButtons: true,
        heading: "Hvordan føles det?",
        paragraphs: ["Hvordan føles det, når du ser det samlet?"],
        options: [
            { id: "fungerer", text: "Det føles som mig", next: "7.1" },
            { id: "taetPaa", text: "Det er tæt på", next: "6.3" },
            { id: "virkerIkke", text: "Nej, det fungerer ikke", next: "6.3" }
        ],
        answerKey: "provetSammenResultat",
        next: null
    },
    "6.3": {
        id: "6.3", modul: 6, type: "multiChoice",
        heading: "Hvad vil du justere?",
        paragraphs: ["Hvad skal vi kigge på igen?"],
        /*---- Filtreres i byggestenEngine.js efter fokusvalg - kun emner, hun faktisk arbejdede med ----*/
        options: [
            { id: "ikoner", text: "Ikonerne", emne: "ikoner" },
            { id: "fontOverskrift", text: "Fonten til overskrift", emne: "fonte" },
            { id: "fontBroedtekst", text: "Fonten til brødtekst", emne: "fonte" },
            { id: "anden", text: "Den anden detalje", emne: "andreByggesten" }
        ],
        kraeverValg: true,
        answerKey: "tilbageTil",
        nextButtonText: "Lad os kigge på det",
        next: null /* byggestenEngine.js: kører de valgte justeringer, derefter tilbage til 6.1 */
    },

    /*---- Modul 7 — Dit lille byggestens-sæt (alle) ----*/

    "7.1": {
        id: "7.1", modul: 7, type: "text",
        heading: "Dit lille byggestens-sæt",
        paragraphs: [], /* samlet recap bygges i byggestenEngine.js */
        nextButtonText: "Skriv min tommelfingerregel",
        next: "7.2"
    },
    "7.2": {
        id: "7.2", modul: 7, type: "textNote",
        heading: "Min tommelfingerregel",
        paragraphs: ["Skriv én sætning, du kan huske det på: \"Jeg bruger ______, fordi ______.\""],
        fields: [{ id: "tommelfingerregel", label: "", rows: 2, placeholder: "Jeg bruger ..., fordi ..." }],
        answerKey: "tommelfingerregel",
        next: "7.3"
    },
    "7.3": {
        id: "7.3", modul: 7, type: "text",
        heading: "Gem det, du lige har fundet",
        paragraphs: [
            "Du har nu et lille sæt byggesten, du kan tage med dig videre. Gem dem i din visuelle guide, så du ikke skal starte forfra næste gang. Dette er en prototype, ligesom resten af dit visuelle udtryk. Det må gerne udvikle sig, i takt med at din praksis gør det."
        ],
        guideAvatar: "Heidi",
        guideLine: "Det vigtigste er ikke, at det er færdigt. Det er, at du ved, hvor du skal kigge, næste gang.",
        nextButtonText: "Tilføj til min visuelle guide",
        saveOutput: true,
        isExit: true,
        next: null
    }
};
