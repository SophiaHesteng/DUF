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
    knap: "Hvilke elementer består byggesten af?"
};

/*---- Knappen "Gå til et andet emne" (før: "Skift fokus", runde 7). Forklaringen vises fra første gang, knappen dukker op i Modul 3-5, indtil den er brugt, eller brugeren når Modul 6 ----*/
export const skiftEmne = {
    knap: "Gå til et andet emne",
    forklaring: "Her kan du altid hoppe til ikoner, fonte eller de små detaljer, eller vælge flere emner til."
};

/*---- Overgange mellem emnerne (runde 7). Vises i slutningen af 3.5, 4.6 og 5.2a/b/c - hvilken, afgøres af byggestenEngine.js ud fra, hvad der kommer næst ----*/
export const OVERGANGE = {
    fonte: {
        tekst: "Dine ikoner er på plads. Nu går vi videre til dine fonte, altså bogstavernes udseende. Hvor ikonerne viser noget hurtigt, er det bogstaverne, der bærer alt det, du skriver.",
        knap: "Videre til fonte"
    },
    andreByggesten: {
        tekst: "Nu går vi videre til de små detaljer, der binder det hele sammen, fx en streg eller en bestemt form på dine knapper.",
        knap: "Videre til de små detaljer"
    },
    provSammen: {
        tekst: "Så har du taget stilling til det, du valgte. Nu ser vi, hvordan det ser ud i praksis.",
        knap: "Lad os se det samlet"
    },
    /*---- Efter et "Ret" fra 7.1 lander brugeren i 7.1 igen - der giver en overgang til "det samlede" ikke mening ----*/
    tilbageTil71: {
        knap: "Tilbage til dit byggestens-sæt"
    }
};

/*---- Modul 7 (runde 7): 7.1's to dele og 7.2's påmindelse + eksempler. {…} udfyldes i byggestenEngine.js med brugerens egne valg ----*/
export const saetTekster = {
    saadanSerDetUd: "Sådan ser det ud",
    detSkalDuBruge: "Det skal du bruge",
    kopier: "Kopiér",
    kopieret: "Kopieret",
    ret: "Ret",
    paamindelse: "Du har valgt: ",
    eksempler: {
        streg: "Jeg bruger en tynd streg under mine overskrifter, fordi den giver ro og gør det let at se, hvor et nyt afsnit starter.",
        andenRetning: "Jeg bruger {detalje}, fordi ______.",
        ikoner: "Jeg bruger kun {ikonstil} sammen med tekst, fordi de skal hjælpe og ikke stå alene.",
        fonte: "Jeg bruger {overskrift} til overskrifter og {broedtekst} til teksten, fordi det føles varmt og er let at læse."
    }
};

/*---- Biblioteks-artiklen om ikonrettigheder (3.4-Fri, 3.4-Betal). TODO: artiklen er endnu ikke skrevet - `url` peger midlertidigt på Bibliotekets forside. Opdatér kun her, når artiklen findes ----*/
const IKONRETTIGHEDER_ARTIKEL = {
    titel: "Ikoner og rettigheder: det vigtigste, du skal vide",
    url: "library.html"
};
const ikonrettighederLink = `<a href="${IKONRETTIGHEDER_ARTIKEL.url}" target="_blank" rel="noopener noreferrer">'${IKONRETTIGHEDER_ARTIKEL.titel}'</a>`;

/*---- De tre emner fra Modul 2, i den faste rækkefølge modulerne vises i ----*/
/*---- `taellerNavn` bruges i linjen "Emne 2 af 3: Fonte" øverst i Modul 3-5 (runde 7) ----*/
export const EMNER = [
    { id: "ikoner", navn: "Ikoner", taellerNavn: "Ikoner" },
    { id: "fonte", navn: "Fonte", taellerNavn: "Fonte" },
    { id: "andreByggesten", navn: "Andre byggesten", taellerNavn: "De små detaljer" }
];

export const BOBLER = {

    /*---- Modul 1 — Se hvad du allerede har (alle). Runde 7: ny 1.2, de gamle 1.2-1.4 er nu 1.3-1.5 ----*/

    "1.2": {
        id: "1.2", modul: 1, type: "text",
        heading: "Hvilke elementer består byggesten af?",
        paragraphs: [
            "Før vi går i gang, lad os lige se, hvad vi taler om. Byggesten er de små ting, der går igen, hver gang du laver noget til din praksis. Der er tre slags:"
        ],
        /*---- Hvert emne vises med et lille eksempel i HTML/CSS (byggestenUi.js, visuelt "byggestenIntro") ----*/
        visuelt: {
            type: "byggestenIntro",
            emner: [
                { eksempel: "ikoner", navn: "Ikoner", tekst: "Små, enkle tegn, der viser noget hurtigt. Fx en telefon ved dit telefonnummer, en kalender ved 'Book tid' eller et lille blad ved en behandling." },
                { eksempel: "fonte", navn: "Fonte", tekst: "Bogstavernes udseende, også kaldet skrifttyper. Den samme sætning kan føles rolig, legende eller professionel, alt efter hvilken skrifttype den står i." },
                { eksempel: "detaljer", navn: "Små detaljer", tekst: "Alt det andet, der går igen: en tynd streg, der deler teksten op, en bestemt form på dine knapper eller en ramme om dine billeder." }
            ],
            /*---- To meget forskellige skrifttyper fra fontvælgerens liste: en blød serif og en ren sans-serif ----*/
            fonte: ["Fraunces", "Inter"],
            eksempelSaetning: "Velkommen til min praksis"
        },
        afterVisuelt: "Du behøver ikke have nogen af dem endnu. Vi kigger på dem én ad gangen.",
        nextButtonText: "Lad os se, hvor du starter",
        next: "1.3"
    },
    "1.3": {
        id: "1.3", modul: 1, type: "choice",
        heading: "Hvor starter du?",
        paragraphs: ["Hvor føles det rigtigt at starte?"],
        /*---- Runde 7: "Fra bunden" springer 1.4 og 1.5 over. Er Overbliks starterFraBunden sand, er "Fra bunden" valgt på forhånd (byggestenEngine.js) ----*/
        options: [
            { id: "allerede-udtryk", text: "Jeg har allerede et visuelt udtryk", response: "Så tager vi udgangspunkt i det, du har.", next: "1.4" },
            { id: "hist-og-her", text: "Jeg har lidt hist og her", response: "Så finder vi ud af, hvad der er værd at samle.", next: "1.4" },
            { id: "fra-bunden", text: "Jeg starter næsten fra bunden", response: "Så bygger vi et enkelt udgangspunkt, ét valg ad gangen. Du skal ikke lede efter noget, du ikke har. Vi går direkte til at vælge, hvad du vil starte med.", next: "2.1" }
        ],
        answerKey: "udgangspunkt",
        next: null /* pr. option */
    },
    "1.4": {
        id: "1.4", modul: 1, type: "eksempler",
        heading: "Find tre steder, hvor dit udtryk allerede dukker op",
        paragraphs: [
            "Åbn din hjemmeside, et opslag, eller et dokument, du sender til klienter. Kig ikke efter det perfekte — find bare tre steder, hvor du allerede bruger tekst, ikoner eller andre grafiske detaljer."
        ],
        antalFelter: 3,
        tomTekst: "Helt fint — så starter vi fra et rent bord.",
        imageUpload: { bucket: "byggesten-eksempler", label: "Skærmbilleder (valgfrit)", hint: "Billederne bliver på din egen enhed." },
        answerKey: "eksempler",
        next: "1.5"
    },
    "1.5": {
        id: "1.5", modul: 1, type: "multiChoice",
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
        /*---- Runde 7: valgmulighedernes tekst ved "Fra bunden" i 1.3. Værdierne (id) er de samme ----*/
        optionTekstFraBunden: {
            ikoner: "Ikoner — jeg vil gerne finde nogle ikoner, der passer til mig",
            fonte: "Fonte — jeg vil gerne finde mine skrifttyper",
            andreByggesten: "De små detaljer — jeg vil gerne have en lille detalje, der går igen",
            "det-hele": "Det hele — jeg vil gerne have et enkelt, samlet system"
        },
        answerKey: "fokusvalg",
        next: null /* byggestenEngine.js: kører de valgte (endnu ikke gennemførte) emner i fast rækkefølge, derefter 6.1 */
    },

    /*---- Modul 3 — Ikoner (kun hvis valgt) ----*/

    "3.1": {
        id: "3.1", modul: 3, type: "choice",
        heading: "Hvordan skal dine ikoner føles?",
        paragraphs: ["Hvilken retning føles mest som dig?"],
        /*---- Runde 7: hver retning vises med de samme tre Material Symbols-ikoner i netop den stil (`ikonStil` → js/components/materialIkoner.js). `frase` bruges i 7.2's påmindelse og eksempel ----*/
        options: [
            { id: "enkleStreger", text: "Enkle streger", ikonStil: "enkleStreger", frase: "ikoner med enkle streger" },
            { id: "fyldte", text: "Fyldte ikoner", ikonStil: "fyldte", frase: "fyldte ikoner" },
            { id: "runde", text: "Runde og bløde", ikonStil: "runde", frase: "runde og bløde ikoner" },
            { id: "skarpe", text: "Skarpe og geometriske", ikonStil: "skarpe", frase: "skarpe og geometriske ikoner" }
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
            { id: "kopieret", text: "Jeg tager dem nogle gange fra andre hjemmesider eller apps", next: "3.3b", gemIkke: true },
            { id: "ingenEndnu", text: "Jeg har ingen ikoner endnu", next: "3.4-fri" } /* runde 7 - 3.4-Fri med egen indledning */
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
        /*---- Runde 7: indledning, der sættes foran, når ikonKilde er "ingenEndnu" (byggestenEngine.js) ----*/
        indledningIngenEndnu: "Så har du et godt sted at starte. Et gratis ikonbibliotek giver dig mange ikoner i samme stil, så de passer sammen fra begyndelsen.",
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
        paragraphs: [], /* recap, den valgte stil med de tre eksempel-ikoner og overgangen bygges i byggestenEngine.js */
        next: null /* afslutter emnet "ikoner" - køen afgør næste skridt */
    },

    /*---- Modul 4 — Fonte (kun hvis valgt) ----*/

    "4.1": {
        id: "4.1", modul: 4, type: "text",
        heading: "Din tekst har også en stemme",
        paragraphs: [
            "Du behøver ikke finde den perfekte skrifttype. Du skal finde en, der fungerer for dig — og som du kan bruge igen og igen.",
            "En skrifttype gør to ting på én gang. Den giver din tekst en stemning: rolig, varm, klar eller legende. Og den afgør, hvor let din tekst er at læse, både på en skærm og på papir. Derfor bruger mange to skrifttyper: én til overskrifter, som gerne må have personlighed, og én til den almindelige tekst, som først og fremmest skal være let at læse."
        ],
        /*---- Runde 7: samme overskrift i tre typer skrifttyper fra fontvælgerens liste + én linje brødtekst i en let læselig skrifttype ----*/
        visuelt: {
            type: "fontEksempler",
            overskrift: "Velkommen til min praksis",
            eksempler: [
                { font: "Lora", etiket: "Med fødder (serif)", tekst: "Klassisk og rolig. Minder om bøger." },
                { font: "Inter", etiket: "Uden fødder (sans-serif)", tekst: "Ren og klar. Let at læse på skærmen." },
                { font: "Quicksand", etiket: "Håndskrevet eller legende", tekst: "Personlig og varm. Bedst til korte overskrifter, ikke til lange tekster." }
            ],
            /*---- Brødtekst-linjen genbruger manuskriptets eksempelafsnit fra 4.5 ----*/
            broedtekst: { font: "Karla", tekst: "Hos mig får du tid og ro. Jeg lytter til det, du kommer med, og vi finder sammen ud af, hvad der kan hjælpe dig." }
        },
        nextButtonText: "Lad os finde den",
        next: "4.2"
    },
    "4.2": {
        id: "4.2", modul: 4, type: "choice",
        heading: "Hvor skal du bruge dine fonte?",
        paragraphs: ["Hvor bruger du dem oftest?"],
        spoergsmaalFraBunden: "Hvor forestiller du dig at bruge dem?", /* runde 7 */
        /*---- Runde 7: "På sociale medier" og "Det ved jeg ikke endnu" (kun ved "Fra bunden") har hver sit eget svar. `kanaler` = Overbliks kanal-nøgler, der rykker valget øverst (byggestenEngine.js) ----*/
        options: [
            { id: "egen", text: "På min egen hjemmeside", googleFontsDirekte: true, kanaler: ["hjemmeside"] },
            { id: "canva", text: "I Canva", googleFontsDirekte: false, vaerktoejNavn: "Canva" },
            { id: "docs-word", text: "I Word eller Google Docs", googleFontsDirekte: false, vaerktoejNavn: "Word eller Google Docs" },
            {
                id: "sociale", text: "På sociale medier", googleFontsDirekte: false,
                vaerktoejNavn: "det værktøj, du laver dine billeder i",
                kanaler: ["facebook", "instagram", "linkedin", "andreSociale"],
                response: "På Facebook, Instagram og LinkedIn bestemmer platformen selv skrifttypen i dine opslag. Dine egne skrifttyper kommer kun med, når du laver billeder med tekst på, fx i Canva. Brug vælgeren her til at finde en stil, du kan genbruge på dine billeder."
            },
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
            },
            {
                id: "vedIkkeEndnu", text: "Det ved jeg ikke endnu", googleFontsDirekte: true, kunFraBunden: true,
                response: "Det er helt fint. Så vælger du bare det, du kan lide. Når du ved, hvor du skal bruge dem, kan du altid se, om du kan bruge dem direkte, eller om du skal finde noget, der ligner."
            }
        ],
        /*---- Noten over valgene, når Overblik kender brugerens kanaler. {kanaler} = fx "en hjemmeside og Instagram" ----*/
        kanalNote: "Du nævnte tidligere, at du har {kanaler}.",
        kanalNavne: {
            hjemmeside: "en hjemmeside",
            facebook: "Facebook",
            instagram: "Instagram",
            linkedin: "LinkedIn",
            andreSociale: "andre sociale medier"
        },
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
        /*---- Runde 7: testen handler om læsbarhed på den skærm, brugeren sidder ved - ikke længere om telefonen ----*/
        paragraphs: [
            "Nu tester vi, om din brødtekst er let at læse. Her står den samme lille tekst to gange: først i almindelig størrelse, derefter lidt mindre, sådan som tekst tit står på en telefon eller i en fodnote. Læs dem begge. Kan du læse dem uden at anstrenge dig?"
        ],
        visuelt: {
            type: "laesbarhed",
            tekst: "Hos mig får du tid og ro. Jeg lytter til det, du kommer med, og vi finder sammen ud af, hvad der kan hjælpe dig.",
            stoerrelser: [16, 13]
        },
        options: [
            { id: "ja", text: "Ja, begge er lette at læse", next: "4.6" },
            {
                id: "kunStor", text: "Den lille er svær at læse",
                response: "Det er et godt fund. Så ved du, at du skal bruge den i almindelig størrelse eller større. Den kan godt blive.",
                next: "4.6"
            },
            {
                id: "nej", text: "Nej, begge er svære at læse",
                response: "Det er helt normalt, at noget først viser sig, når man ser det for alvor. Prøv en anden.",
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
        /*---- Runde 7: `detaljeEksempel` → et lille eksempel i HTML/CSS på kortet (byggestenUi.js), samme udtryk som i "Prøv dem sammen" ----*/
        options: [
            { id: "streg", text: "En tynd streg til at dele indhold op", detaljeEksempel: "streg" },
            { id: "ramme", text: "En bestemt rammeform om billeder eller citater", detaljeEksempel: "ramme" },
            { id: "knapper", text: "En fast stil på knapper, fx runde hjørner eller en let skygge", detaljeEksempel: "knapper" },
            { id: "moenster", text: "Et gentaget mønster eller en tekstur", detaljeEksempel: "moenster" },
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
        /*---- Almindelige valgkort + "Næste" (ikke ctaButtons), så rummet ikke skifter videre af sig selv efter valget - brugertest 1, 2026-09-24 ----*/
        id: "6.2", modul: 6, type: "choice",
        heading: "Hvordan føles det?",
        paragraphs: ["Hvordan føles det, når du ser det samlet?"],
        options: [
            { id: "fungerer", text: "Det føles som mig", next: "7.1" },
            { id: "taetPaa", text: "Det er tæt på", next: "6.3" },
            { id: "virkerIkke", text: "Nej, det fungerer ikke", next: "6.3" }
        ],
        answerKey: "provetSammenResultat",
        nextButtonText: "Næste",
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
        id: "7.1", modul: 7, type: "saet",
        heading: "Dit lille byggestens-sæt",
        paragraphs: [], /* runde 7: "Sådan ser det ud" + "Det skal du bruge" + recap med "Ret" pr. emne - bygges i byggestenEngine.js/byggestenUi.js */
        nextButtonText: "Skriv min tommelfingerregel",
        next: "7.2"
    },
    "7.2": {
        id: "7.2", modul: 7, type: "textNote",
        heading: "Min tommelfingerregel",
        paragraphs: ["En tommelfingerregel er en lille huskeregel for, hvordan og hvornår du bruger dine byggesten. Den hjælper dig, næste gang du skal lave et opslag eller en side, så du ikke skal tænke over det fra bunden hver gang. Skriv én sætning, du kan huske det på: 'Jeg bruger ______, fordi ______.'"],
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
