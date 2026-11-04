/*----------------------------------------------------------------------------
 * DUF — Indhold til rummet "Logo" (uddybende, hjem: Visuelt udtryk for din praksis)
 * ----------------------------------------------------------------------------
 * Jf. docs/duf-manuskript-logo.md (nyt manuskript, skrevet fra bunden
 * 2026-09-21). Rummet forgrener sig reelt i fire spor (A-D) fra Modul 2, med
 * videre forgrening på retning, logotype og testresultater - derfor er
 * `BOBLER` et OBJEKT keyet på boble-id (ikke Billeders flade array), så
 * "næste boble" kan afhænge af andet end rækkefølgen i filen.
 *
 * Denne fil er bevidst ren DATA - ingen funktioner. Bobler, hvor næste skridt
 * eller indhold afhænger af brugerens svar (fx badge på 4.2's forslag, den
 * dynamiske arbejdsliste i 6.1j, hvilken 5.2-udgave der vises), har `next:
 * null` og et kommentarspor til, hvor logikken ligger i logoEngine.js -
 * samme opdeling som Billeder (data = indhold, motor = flow).
 *
 * Fælles felter: id, modul, type, heading, nextButtonText.
 * Valgfrie, generiske "påhæng" (understøttet af enhver type, jf. logoUi.js):
 *   guideLine + guideAvatar  - 💬-linje; med guideAvatar vist som guide-boble (js/components/guide.js)
 *   seOgsaa                  - { maal: <nøgle i seOgsaaMaal.js>, tekst }
 *   imageUpload               - { bucket, label, hint }
 *   logoPreview               - "small" | "grayscale" | "backgrounds"
 * ----------------------------------------------------------------------------
 */

export const velkomst = {
    fraVisueltUdtryk: "Du nævnte tidligere, at dit logo mangler, er på vej eller er noget, du gerne vil have på plads. Så lad os kigge på det her. Sammen.",
    standard: "Velkommen til Logo. Her får du hjælp til enten at lave et logo, du er tryg ved, eller til at finde ud af, om det, du allerede har, faktisk fungerer. Der er ingen rigtige eller forkerte svar. Vi tager det ét skridt ad gangen."
};

/*---- Modulernes titler (fra manuskriptets overskrifter, uden spor-noterne) og antal bobler, til navigationslinjerne (js/components/rumRamme.js). Antallet af moduler læses herfra. Kun moduler, hvor alle spor ser lige mange bobler, har et antal - resten forgrener sig ----*/

export const moduler = [
    { titel: "Hvad et logo faktisk skal" },
    { titel: "Hvor står du?" },
    { titel: "Inspiration og sammenligning" },
    { titel: "Vælg retning" },
    { titel: "Logo og din palet", antalBobler: 2 },
    { titel: "Skab eller opdatér dit logo" },
    { titel: "Tjek i praksis", antalBobler: 5 },
    { titel: "Dokumentér", antalBobler: 3 }
];

export const BOBLER = {

    /*---- Modul 1 — Hvad et logo faktisk skal (alle spor) ----*/

    /*---- Boble 1.1 ("Velkommen til Logo") gengives ikke som sin egen skærm her - den ER logoEngine.js's pre-flow velkomstskærm (showWelcome/start()), som allerede bruger `velkomst` herover og har sin egen knap "Lad os begynde". Ingen boble-entry nødvendig, kun denne kommentar til at spore manuskriptet. ----*/

    "1.2": {
        id: "1.2", modul: 1, type: "multiChoice",
        heading: "Hvad har du hørt om logoer?",
        paragraphs: [
            "Om logoer findes der mange historier. Nogle er sande. Andre fylder mere, end de fortjener. Hvilke af dem kender du? Vælg dem, der ringer en klokke."
        ],
        options: [
            { id: "identitet", text: "Et logo er min identitet" },
            { id: "trovaerdighed", text: "Et flot logo giver troværdighed" },
            { id: "unikt", text: "Det skal være helt unikt" },
            { id: "perfekt", text: "Det skal være perfekt, før det tæller" },
            { id: "ingen", text: "Ingen af dem, jeg vil bare høre, hvad et logo skal", eksklusiv: true }
        ],
        answerKey: "valgteMyter",
        nextButtonText: "Vis mig",
        next: null /* logoEngine.js: kører myte-boblerne (1.3-*) i den rækkefølge, de blev valgt, derefter 1.4. Ingen valgt (eller kun "ingen") går direkte til 1.4 */
    },
    "1.3-identitet": {
        id: "1.3-identitet", modul: 1, type: "text",
        heading: "Et logo er ikke din identitet",
        paragraphs: [
            "Et logo er ikke din identitet. Din identitet er dig, dine ord, dit rum og måden, du møder mennesker på. Logoet er ét af de steder, den viser sig. Et genkendelsespunkt, ikke hele kortet. Det tager presset af."
        ],
        seOgsaa: { maal: "din-identitet", tekst: "Hvem du er, hvad du står for, og hvordan du viser det frem." },
        nextButtonText: "Videre",
        next: null /* styret af myte-køen */
    },
    "1.3-trovaerdighed": {
        id: "1.3-trovaerdighed", modul: 1, type: "text",
        heading: "Et flot logo giver ikke automatisk tillid",
        paragraphs: [
            "Et flot logo giver ikke automatisk tillid. Et dyrt logo heller ikke. Tillid vokser, når tingene hænger sammen og bliver brugt på samme måde, hver gang. Et enkelt logo, du bruger konsekvent, slår tre forskellige logoer, der skifter fra sted til sted."
        ],
        nextButtonText: "Videre",
        next: null
    },
    "1.3-unikt": {
        id: "1.3-unikt", modul: 1, type: "text",
        heading: "Det behøver ikke være unikt",
        paragraphs: [
            "Det behøver ikke være noget, ingen har set før. Ofte er det det enkle, der bliver husket. Kreativitet for kreativitetens skyld gør sjældent et logo lettere at genkende."
        ],
        nextButtonText: "Videre",
        next: null
    },
    "1.3-perfekt": {
        id: "1.3-perfekt", modul: 1, type: "text",
        heading: "Det skal ikke være perfekt",
        paragraphs: [
            "Nej. Et logo behøver ikke være færdigt for at tælle. Ligesom resten af dit visuelle udtryk er det en prototype. Du bruger det, lærer af det og justerer det, når din praksis ændrer sig."
        ],
        nextButtonText: "Videre",
        next: null
    },
    "1.4": {
        id: "1.4", modul: 1, type: "text",
        heading: "Hvad et logo faktisk skal",
        paragraphs: [
            "Så hvad skal et logo? Tre ting. Være til at genkende. Fungere mange steder, stort og småt, i farve og i sort/hvid, på lyse og mørke baggrunde. Og spille sammen med resten af dit visuelle udtryk. Det er det hele. Vi begynder ikke med at gøre det smukt. Vi begynder med at gøre det brugbart.",
            /*---- Runde 7 (brugertest 1, T6): flere udgaver af logoet og favicon - står til sidst, lige før guide-citatet (Heidi, 2026-09-25) ----*/
            "Derfor har de fleste flere udgaver af det samme logo. Det fulde logo bruger du der, hvor der er plads, fx på hjemmesiden. Den lille udgave, fx kun symbolet eller dit forbogstav, bruger du de små steder, som dit profilbillede. Og den allermindste er det lille ikon i fanen øverst i browseren, når nogen besøger din hjemmeside. Det kaldes et favicon. Det er stadig ét logo. Det har bare tøj på til forskellige anledninger."
        ],
        guideLine: "Et logo skal ikke fortælle hele din historie. Det skal hjælpe folk med at kende dig igen.",
        guideAvatar: "Marcus",
        nextButtonText: "Lad os se, hvor du står",
        next: "2.1"
    },

    /*---- Modul 2 — Hvor står du? (skillepunktet, alle spor) ----*/

    "2.1": {
        id: "2.1", modul: 2, type: "choice",
        heading: "Hvor står du i dag?",
        paragraphs: [
            "Vi begynder med at se, hvor du står. Der er ingen rigtige svar, kun et udgangspunkt."
        ],
        options: [
            { id: "ja_tilfreds", text: "Jeg har et logo, og jeg er glad for det" },
            { id: "ja_usikker", text: "Jeg har et logo, men jeg er usikker på det" },
            { id: "nej", text: "Jeg har ikke et logo" },
            { id: "under_udvikling", text: "Det er under udvikling" }
        ],
        answerKey: "logoStatus",
        nextButtonText: "Næste",
        next: null /* logoEngine.js: sætter svar.spor og ruter til 2a.1 / 2b.1 / 2c.1 / 2d.1 */
    },

    /*---- Spor A — Validér ----*/

    "2a.1": {
        id: "2a.1", modul: 2, type: "choice", ctaButtons: true,
        heading: "Skal det bare tjekkes?",
        paragraphs: [
            "Dejligt, at du er glad for det. Så skal vi ikke bygge noget nyt. Kun ét spørgsmål: Er logoet lavet af en professionel, og har du ikke lyst til at ændre på det? Du vil bare gerne vide, om det fungerer."
        ],
        options: [
            { id: "ja", text: "Ja, det lyder rigtigt", next: "2a.2" },
            { id: "nej", text: "Nej, jeg vil gerne se nærmere på det alligevel", next: "2b.1" }
        ],
        next: null /* fast pr. option ovenfor, men skifter svar.spor til B ved "nej" - logoEngine.js */
    },
    "2a.2": {
        id: "2a.2", modul: 2, type: "choice", ctaButtons: true,
        heading: "Så tester vi det bare",
        paragraphs: [
            "Så behøver du ikke bygge noget nyt. Vi går direkte til at teste, om dit logo fungerer i praksis, og bagefter tilføjer vi det til din visuelle guide. Har du en fil af logoet, kan du lægge den her, så har du den ved hånden under testen. Den bliver på din enhed."
        ],
        imageUpload: { bucket: "logo", label: "Upload et billede af logoet (valgfrit)", hint: "Billedet forlader aldrig din egen enhed." },
        options: [
            { id: "test", text: "Test mit logo i praksis", next: "7.1" },
            { id: "fuldt", text: "Nej, jeg vil hellere gennem det hele", next: "2b.1" }
        ],
        next: null /* "test" sætter svar.valideringsvej = true - logoEngine.js */
    },

    /*---- Spor B — Kig på det, du har ----*/

    "2b.1": {
        id: "2b.1", modul: 2, type: "text",
        heading: "Lad os kigge på dit logo sammen",
        paragraphs: [
            "Vi skal ikke bedømme det. Vi skal bare se det med friske øjne. Har du en fil eller et billede af det, kan du lægge det her, så har du det foran dig, mens vi kigger. Har du ikke, går det også fint."
        ],
        imageUpload: { bucket: "logo", label: "Upload et billede (valgfrit)", hint: "Billedet forlader aldrig din egen enhed." },
        nextButtonText: "Næste",
        next: "2b.2"
    },
    "2b.2": {
        id: "2b.2", modul: 2, type: "multiChoice",
        heading: "Hvad fungerer?",
        /*---- "dit valgte logo"/"dit udkast" - samme dynamiske tekst som 2b.1, sat i logoEngine.js ----*/
        paragraphs: [],
        options: [
            { id: "udseende", text: "Jeg kan godt lide, hvordan det ser ud" },
            { id: "praksis", text: "Det føles som mig og min praksis" },
            { id: "laesbart", text: "Det er let at læse" },
            { id: "genkendeligt", text: "Det er let at kende igen" },
            { id: "farver", text: "Farverne føles rigtige" },
            { id: "ingen", text: "Ikke noget lige nu", eksklusiv: true }
        ],
        allowNote: true,
        answerKey: "listeFungerer",
        nextButtonText: "Næste",
        next: "2b.3"
    },
    "2b.3": {
        id: "2b.3", modul: 2, type: "multiChoice",
        heading: "Hvad føles ikke helt rigtigt?",
        paragraphs: [
            "Nu den anden side. Hvad skurrer? Intet er for småt at nævne. Og \"jeg ved det ikke\" er også et svar."
        ],
        options: [
            { id: "detaljeret", text: "Det er for detaljeret eller rodet", group: "form" },
            { id: "laesbart_smaat", text: "Det er svært at læse, især når det er småt", group: "form" },
            { id: "farver_forkerte", text: "Farverne passer ikke til mig", group: "form" },
            { id: "ikke_mig", text: "Det føles ikke som mig og min praksis", group: "identitet" },
            { id: "ligner_andre", text: "Det ligner en masse andre logoer", group: "oprindelse" },
            { id: "lavet_hurtigt", text: "Det blev lavet hurtigt, uden at jeg rigtig tænkte over det", group: "oprindelse" },
            { id: "ved_ikke", text: "Jeg ved ikke, hvad det er. Det føles bare ikke rigtigt.", eksklusiv: true }
        ],
        allowNote: true,
        answerKey: "listeSkurrer",
        nextButtonText: "Næste",
        next: null /* logoEngine.js: kører 2b.4-* som sekvens ud fra de valgte gruppers/svar, derefter 2b.5 */
    },
    "2b.4-form": {
        id: "2b.4-form", modul: 2, type: "text",
        heading: "Det, du lægger mærke til: Form",
        paragraphs: [
            "Det her er ofte de ting, man kan justere uden at starte forfra. Skrifttype, størrelse, farve, mængden af detaljer. Det er gode nyheder."
        ],
        nextButtonText: "Videre",
        next: null
    },
    "2b.4-identitet": {
        id: "2b.4-identitet", modul: 2, type: "text",
        heading: "Det, du lægger mærke til: Identitet",
        paragraphs: [
            "Skurrer det, fordi logoet ikke føles som dig, handler det ofte om noget større end selve logoet: hvem du er, og hvem du vil møde. Du kan sagtens fortsætte her. Det er bare værd at vide, at logoet kommer bagefter identiteten."
        ],
        seOgsaa: { maal: "din-identitet", tekst: "Her arbejder du med, hvem du er, og hvordan du viser det. Du behøver ikke gøre det først." },
        nextButtonText: "Videre",
        next: null
    },
    "2b.4-oprindelse": {
        id: "2b.4-oprindelse", modul: 2, type: "text",
        heading: "Det, du lægger mærke til: Oprindelse",
        paragraphs: [
            "Et logo, der blev lavet i en fart eller ligner alle andre, er ikke et dårligt logo. Det er et logo, der ikke er blevet valgt endnu. Det kan vi ændre."
        ],
        nextButtonText: "Videre",
        next: null
    },
    "2b.4-ved-ikke": {
        id: "2b.4-ved-ikke", modul: 2, type: "text",
        heading: "Det, du lægger mærke til: \"Ved ikke\"",
        paragraphs: [
            "Så er det svært at bedømme det alene. Vi kigger derfor på, hvad andre gør, og hvad der fanger dig, før du beslutter noget."
        ],
        nextButtonText: "Videre",
        next: null
    },
    "2b.4-ingen": {
        id: "2b.4-ingen", modul: 2, type: "text",
        heading: "Det, du lægger mærke til",
        paragraphs: [
            "Så har du et godt udgangspunkt. Vi tester det, og så tager du stilling til det."
        ],
        nextButtonText: "Videre",
        next: null
    },
    "2b.5": {
        id: "2b.5", modul: 2, type: "text",
        heading: "Det tager vi med",
        /*---- Oversigt over "Det fungerer"/"Det skurrer" + retningsforslag sættes som recap i logoEngine.js ----*/
        paragraphs: [],
        nextButtonText: "Lad os se, hvad andre gør",
        next: "3.1"
    },

    /*---- Spor C — Fra bunden ----*/

    "2c.1": {
        id: "2c.1", modul: 2, type: "text",
        heading: "Fra bunden er et fint sted at starte",
        paragraphs: [
            "Du starter ikke bagud. Du starter frit. Ingen tidligere valg, der skal forsvares. Det første skridt er ikke at tegne noget. Det er at finde ud af, hvilken slags logo der trækker i dig."
        ],
        nextButtonText: "Næste",
        next: "2c.2"
    },
    "2c.2": {
        id: "2c.2", modul: 2, type: "choice",
        heading: "Hvilken slags logo trækker i dig?",
        paragraphs: [
            "Et logo kan se ud på flere måder. Nogle består kun af navnet, sat med omhu. Andre af et symbol. Mange af begge dele. Det ligger ikke fast for evigt, det er bare en retning at starte i, så vi kan vise dig det rigtige at lede efter."
        ],
        options: [
            {
                id: "navn", text: "Kun mit navn, i en skrifttype jeg kan lide",
                response: "Enkelt og roligt. Her gør skrifttypen næsten hele arbejdet.",
                seOgsaa: { maal: "byggesten", tekst: "Ikoner, skrifttyper og andre grafiske byggesten." }
            },
            {
                id: "symbol", text: "Et lille symbol eller tegn",
                response: "Symbolet skal kunne stå alene og genkendes, også når det er småt. Det kræver lidt ekstra omtanke om rettigheder, og den tager vi, før du bygger."
            },
            {
                id: "begge", text: "Navn og symbol sammen",
                response: "Du får det bedste fra begge. Vi kigger på, hvordan de to kan hjælpe hinanden. Og du får en ekstra fordel: Symbolet kan stå alene på de små steder, fx som profilbillede, mens navn og symbol sammen bruges, hvor der er plads."
            },
            {
                id: "ved_ikke", text: "Det ved jeg ikke endnu",
                response: "Så lader vi eksemplerne vise dig vejen."
            }
        ],
        answerKey: "logoType",
        nextButtonText: "Næste",
        next: "3.1"
    },

    /*---- Spor D — Bestil hos en anden ----*/

    "2d.1": {
        id: "2d.1", modul: 2, type: "choice", ctaButtons: true,
        heading: "Hvem laver det?",
        paragraphs: [],
        options: [
            { id: "selv", text: "Jeg laver det selv", next: "2b.1" },
            { id: "anden", text: "En anden laver det for mig", next: "2d.2" },
            /*---- Flere veje (godkendt af Heidi 2026-11-04): DUF laver logoet. Står bevidst sidst - rummet skal ikke skubbe hende mod at købe ----*/
            { id: "duf", text: "Jeg vil gerne have, at DUF laver det", next: "2d.duf" }
        ],
        next: null
    },
    "2d.2": {
        id: "2d.2", modul: 2, type: "text",
        heading: "Sådan får du mest ud af at bestille",
        paragraphs: [
            "Når en anden laver dit logo, er det jeres aftaler, der afgør, hvad du ender med at kunne bruge. Ikke kun, hvordan det ser ud. Her er en tjekliste til samtalen, så du ikke opdager det bagefter. Har du arbejdet med Farver, kan du give din palet med. Bruger du en generator, så læs vilkårene med de samme spørgsmål i baghovedet.",
            /*---- Flere veje (2026-11-04): Fiverrs og Upworks regler tjekket samme dag ----*/
            "Finder du en freelancer på en platform som Fiverr eller Upwork, er det platformens regler, der gælder, hvis I ikke aftaler andet. Begge steder bliver logoet som udgangspunkt dit, når det er leveret, og du har betalt det hele. Men på Fiverr kan sælgeren skrive noget andet på sin side, og nogle tager ekstra for fx kildefilerne. Læs derfor sælgerens beskrivelse grundigt, og betal altid gennem platformen, ikke uden om den."
        ],
        checklist: {
            gemNoegle: "logo-sporD-aftaler",
            punkter: [
                { id: "ejerskab", tekst: "Får jeg ejerskab eller kun en brugsret?" },
                { id: "medier_formaal", tekst: "Hvilke medier og formål må logoet bruges til, og er det tidsbegrænset?" },
                { id: "aendre", tekst: "Må jeg ændre eller videreudvikle det?" },
                { id: "andre_bruge", tekst: "Må andre bruge det samme eller et lignende logo?" },
                { id: "varemaerke", tekst: "Må det registreres som varemærke?" },
                { id: "originalfiler", tekst: "Får jeg de originale arbejds- og vektorfiler?" },
                { id: "lovligt_licenseret", tekst: "Har designeren bekræftet, at alle elementer er originale eller lovligt licenserede?" },
                { id: "platform_vilkaar", tekst: "Står der noget om rettigheder eller ekstra betaling for filer på freelancerens side?" },
                { id: "tegnet_til_mig", tekst: "Er symbolet tegnet til mig, eller kommer det fra en skabelon, et billedbibliotek eller et AI-værktøj?" },
                { id: "flere_udgaver", tekst: "Får jeg både det fulde logo og en lille udgave (fx kun symbolet), også i en udgave, der kan bruges som favicon? Og i sort/hvid og til både lys og mørk baggrund?" }
            ]
        },
        afterList: "Skal logoet være en central del af din identitet, eller er du i tvivl om en aftale, så søg rådgivning, før du skriver under.",
        nextButtonText: "Næste",
        next: "2d.3"
    },
    "2d.3": {
        id: "2d.3", modul: 2, type: "choice", ctaButtons: true,
        heading: "Er logoet klar nu?",
        paragraphs: [],
        options: [
            { id: "ja", text: "Ja, jeg har det", next: "7.1" },
            { id: "ikke_endnu", text: "Ikke endnu", next: "2d.4" }
        ],
        next: null
    },
    /*---- 2026-11-04: to knapper i stedet for én. "Se, hvad der venter" giver hende et kig ind i resten af rummet uden at miste sin plads; kun "Tilbage til rum-vælgeren" er en udgang (isExit på selve optionen, jf. advance() i logoEngine.js) ----*/
    "2d.4": {
        id: "2d.4", modul: 2, type: "choice", ctaButtons: true,
        heading: "Så venter vi",
        paragraphs: [
            "Det er helt fint. Din tjekliste ligger klar. Kom tilbage, når logoet er færdigt, så tester vi det sammen, og du får det med i din guide."
        ],
        /*---- Variant, når hun har bestilt logoet hos DUF i 2d.duf - valgt i logoEngine.js's resolveContent() ----*/
        paragraphsDuf: [
            "Tak for din bestilling. Vi svarer dig på mail, så I kan aftale det videre. Kom tilbage hertil, når logoet er færdigt, så tester vi det sammen, og du får det med i din guide."
        ],
        options: [
            { id: "se", text: "Se, hvad der venter, når logoet er her", next: "2d.5" },
            { id: "tilbage", text: "Tilbage til rum-vælgeren", isExit: true, onLeave: "saveDPosition" }
        ],
        next: null
    },
    "2d.5": {
        id: "2d.5", modul: 2, type: "text",
        heading: "Det venter, når logoet er her",
        paragraphs: [
            "Når dit logo er kommet, tester vi det i tre små tjek: om du kan kende det, når det er småt, om det virker uden farve, og om det kan ses på både lys og mørk baggrund. Har du en lille udgave, prøver vi også den, helt ned i størrelsen på et favicon.",
            "Bagefter skriver du et par sætninger om dit logo: hvor det kommer fra, og hvad du må bruge det til. Så kommer det med i din visuelle guide, sammen med det, du har lavet i de andre rum.",
            "Din plads er gemt. Når du kommer tilbage, starter vi lige der, ved testen."
        ],
        nextButtonText: "Tilbage til rum-vælgeren",
        isExit: true,
        onLeave: "saveDPosition"
    },

    /*---- Flere veje (godkendt af Heidi 2026-11-04): DUF laver det endelige logo. Nås fra 2d.1 og 6.2. Formularen (`bestilling`) bliver til en mail til DUF, ligesom billedtjekket i Billeder 8.6, og er udfyldt på forhånd med hendes svar fra rummet (buildBestillingOplaeg() i logoEngine.js) ----*/
    "2d.duf": {
        id: "2d.duf", modul: 2, type: "text",
        heading: "Lad os lave det for dig",
        paragraphs: [
            "Du har allerede gjort det meste af forarbejdet. Vil du hellere have, at vi laver det endelige logo, så bygger vi videre på det, du har valgt og skrevet her, og ikke på et tomt papir.",
            "Du får det fulde logo og den lille udgave, klar til favicon. Begge i sort/hvid og til både lys og mørk baggrund, og som vektorfiler, så de kan bruges i alle størrelser. Logoet bliver dit, også rettighederne.",
            /*---- PLADSHOLDER (Heidi 2026-11-04): pris, antal forslag og rettelser og leveringstid afventer en samlet beslutning om DUF's priser. Ret teksten her, når den ligger fast ----*/
            "Prisen og det praktiske, fx hvor mange forslag du får, aftaler vi med dig på mail, før vi går i gang.",
            "Det er helt i orden at vælge noget andet. Du kan stadig gå tilbage og lave det selv."
        ],
        bestilling: {
            /*---- PLADSHOLDER: mailadressen er ikke bekræftet. Ret den her ----*/
            mail: "logo@din-uf.dk",
            emne: "Bestilling af logo fra DUF",
            oplaegLabel: "Det, vi sender med som oplæg",
            oplaegHint: "Det er dine svar fra rummet. Ret gerne i dem, eller skriv mere om din praksis.",
            /*---- 2026-11-04: en tydelig påmindelse lige over mail-knappen, fordi en mail-genvej (mailto:) ikke kan tage billeder med. `vedhaeftAntal` vises kun, hvis hun har lagt billeder ind i rummet; {antal} skiftes ud med tallet. `vedhaeftMail` står i selve mailen, så hun bliver mindet om det igen dér ----*/
            vedhaeft: "Husk at vedhæfte billeder, når mailen åbner: dit nuværende logo, hvis du har et, og de logoer, du har samlet som inspiration. Mailen kan ikke tage dem med af sig selv.",
            vedhaeftAntal: "Du har lagt {antal} billeder ind her i rummet. Vedhæft dem fra din computer.",
            vedhaeftMail: "Vedhæftet (skriv, hvad du sender med, fx mit nuværende logo og de logoer, jeg er inspireret af):",
            reference: {
                label: "Må vi vise dit logo som eksempel på, hvem vi har hjulpet?",
                mailLabel: "Må DUF vise logoet som eksempel",
                valg: [
                    { id: "ja", text: "Ja, gerne" },
                    { id: "nej", text: "Nej, helst ikke" },
                    { id: "snak", text: "Det vil jeg gerne tale med jer om" }
                ],
                hint: "Det er frivilligt og ændrer ikke noget ved din bestilling."
            },
            mailKnap: "Skriv bestillingen i en mail",
            mailIndledning: "Hej DUF\n\nJeg vil gerne have, at I laver mit logo.",
            mailAfslutning: "Venlig hilsen",
            kopierTekst: "Åbner der ikke en mail? Så kan du skrive til",
            kopierKnap: "Kopiér",
            kopieret: "Mailadressen er kopieret.",
            kopierFejl: "Den kunne ikke kopieres. Markér adressen, og kopiér den selv."
        },
        nextButtonText: "Jeg har sendt bestillingen",
        next: "2d.4"
    },

    /*---- Modul 3 — Inspiration og sammenligning (spor B og C) ----*/

    "3.1": {
        id: "3.1", modul: 3, type: "text",
        heading: "Se, hvad andre gør",
        paragraphs: [
            "Nu kigger vi ud over dit eget logo. Åbn Looka (looka.com/logo-maker), og leg med, hvordan forskellige stilarter kan se ud for en praksis som din. Her kan du hente inspiration. Det er gratis at prøve. Du betaler først, hvis du beslutter dig for at hente et logo. Og finder du et logo, du kan lide, kan du også vælge at bruge det, så behøver du ikke bygge det fra bunden senere. Vi kommer tilbage til, hvad du skal være opmærksom på, hvis du gør det.",
            /*---- Runde 7 (brugertest 1, P1): en lille bro, så brugeren kommer tilbage fra Looka ----*/
            "Looka åbner i et nyt vindue. Lad denne side være åben, og kom tilbage hertil, når du har leget lidt. På næste skærm viser vi dig, hvordan du gemmer de logoer, du kan lide, så du har dem med."
        ],
        /*---- Spor C's fire tip-varianter (efter logoType) tilføjes i logoEngine.js ----*/
        externalLink: { label: "Åbn Looka (åbner i nyt vindue)", url: "https://looka.com/logo-maker" },
        guideLine: "Du skal ikke lede efter det perfekte logo. Du skal lægge mærke til, hvad du bliver draget af.",
        guideAvatar: "Heidi",
        nextButtonText: "Jeg har kigget mig omkring",
        next: "3.2"
    },
    "3.2": {
        id: "3.2", modul: 3, type: "textNote",
        heading: "Find 2-3 logoer, der fungerer",
        paragraphs: [
            "Find 2-3 logoer, som du synes fungerer godt. Tag et screenshot af dem, så du har dem foran dig. Windows: Tryk Windows-tasten + Shift + S, og træk et felt rundt om logoet. Tryk derefter Ctrl + V her. Mac: Tryk Cmd + Shift + 4, og vælg filen her. Telefon eller tablet: Brug enhedens egen screenshot-funktion. Hvad gør, at de virker? Og hvad kan du lade dig inspirere af, uden at kopiere det direkte?"
        ],
        /*---- `multiple` (2026-11-04): hun bliver bedt om 2-3 logoer, så hun skal kunne vælge dem alle på én gang i filvælgeren, som i Billeder ----*/
        imageUpload: { bucket: "logo-inspiration", label: "Min logo-inspiration", hint: "Upload, eller indsæt et skærmklip med Ctrl + V. Du kan vælge flere billeder på én gang. Billederne forlader aldrig din egen enhed.", multiple: true },
        fields: [
            { id: "hvadFungerer", label: "Hvad gør, at de fungerer?", rows: 2 },
            { id: "hvadInspirerer", label: "Hvad kan jeg lade mig inspirere af?", rows: 2 }
        ],
        answerKey: "minInspirationNoter",
        nextButtonText: "Næste",
        next: null /* logoEngine.js: spor B → 3.3b, spor C med logoType "ved_ikke" → 3.3c, ellers 3.4 */
    },
    "3.3b": {
        id: "3.3b", modul: 3, type: "multiChoice",
        heading: "Sæt dem op mod dit eget",
        paragraphs: [
            "Kig på dem, du fandt, og på dit eget logo. Hvad ser du, når de står side om side?"
        ],
        /*---- `sideOmSide`: brugerens uploadede logo og screenshotsene fra 3.2 vises side om side - logoEngine.js henter billederne, logoUi.js's sideOmSideHtml() tegner dem ----*/
        sideOmSide: true,
        options: [
            { id: "godt_ved_siden_af", text: "Mit står godt ved siden af" },
            { id: "savner_noget", text: "Jeg savner noget i mit" },
            { id: "vaek_fra", text: "Jeg kan se, hvad jeg vil væk fra" }
        ],
        allowNote: true,
        answerKey: "sammenligning",
        nextButtonText: "Næste",
        next: "3.4"
    },
    "3.3c": {
        id: "3.3c", modul: 3, type: "choice",
        heading: "Hvilken type fangede dig?",
        paragraphs: [
            "Nu har du set eksempler på både navn, symbol og begge dele. Hvilken slags trækker mest i dig? Du kan skifte mening senere."
        ],
        options: [
            { id: "navn", text: "Kun mit navn, i en skrifttype jeg kan lide", response: "Enkelt og roligt. Her gør skrifttypen næsten hele arbejdet." },
            { id: "symbol", text: "Et lille symbol eller tegn", response: "Symbolet skal kunne stå alene og genkendes, også når det er småt. Det kræver lidt ekstra omtanke om rettigheder, og den tager vi, før du bygger." },
            { id: "begge", text: "Navn og symbol sammen", response: "Du får det bedste fra begge. Vi kigger på, hvordan de to kan hjælpe hinanden. Og du får en ekstra fordel: Symbolet kan stå alene på de små steder, fx som profilbillede, mens navn og symbol sammen bruges, hvor der er plads." }
        ],
        answerKey: "logoType",
        nextButtonText: "Næste",
        next: "3.4"
    },
    "3.4": {
        id: "3.4", modul: 3, type: "text",
        heading: "Inspiration er ikke det samme som at tage",
        paragraphs: [
            "Lad dig inspirere, men kopiér ikke. Et logo, der ligner et andet for meget, kan forveksles med det, og det kan give dig problemer, du ikke har brug for. Målet er ikke at ligne nogen. Det er at finde noget, der er dit."
        ],
        /*---- Knap-tekst varierer pr. spor (B: "Lad os vælge en retning", C: "Lad os tage din palet med") - sat i logoEngine.js ----*/
        nextButtonText: "Videre",
        next: null /* spor B → 4.1, spor C → 5.1 */
    },

    /*---- Modul 4 — Vælg retning (kun spor B) ----*/

    "4.1": {
        id: "4.1", modul: 4, type: "text",
        heading: "Det har du med dig",
        paragraphs: [
            "Du har kigget på dit eget logo og på, hvad andre gør. Her er det, du har med dig: det, der fungerer, det, der skurrer, og det, du så, da du sammenlignede."
        ],
        /*---- Recap af 2b.2/2b.3/3.3b sat i logoEngine.js ----*/
        nextButtonText: "Lad os vælge",
        next: "4.2"
    },
    "4.2": {
        id: "4.2", modul: 4, type: "choice",
        heading: "Hvad giver mest mening lige nu?",
        paragraphs: [
            "Nu er det tid til at vælge en retning. Det er en beslutning, ikke selve arbejdet. Arbejdet kommer vi til senere. Der er intet rigtigt svar her."
        ],
        /*---- Badge ("Det, vi lagde mærke til, peger herhen") sat dynamisk på den relevante option i logoEngine.js ud fra svar.retningForslag - ingen mulighed er forvalgt ----*/
        options: [
            { id: "behold", text: "Behold mit nuværende logo, som det er", next: "4.3a" },
            { id: "juster", text: "Justér mit nuværende logo", next: "4.3b" },
            { id: "nyt", text: "Byg et helt nyt logo", next: "4.3c" }
        ],
        answerKey: "retning",
        nextButtonText: "Næste",
        next: null
    },
    "4.3a": {
        id: "4.3a", modul: 4, type: "text",
        heading: "Behold",
        paragraphs: [
            "Et logo, der allerede fungerer, skal ikke laves om, bare fordi du er i gang med at kigge på det. Så går vi videre til at se det sammen med dine farver og teste det i praksis."
        ],
        guideLine: "Det kræver mod at lade noget være. Det er også en beslutning.",
        guideAvatar: "Heidi",
        nextButtonText: "Næste",
        next: "5.1"
    },
    "4.3b": {
        id: "4.3b", modul: 4, type: "text",
        heading: "Justér",
        paragraphs: [
            "Så har du allerede en god start. Du har selv sat ord på, hvad der skurrer, og den liste bruger vi som din arbejdsliste, når vi går i gang. Du kan bygge videre på det, der virker."
        ],
        /*---- Brugerens egen "det skurrer"-liste vises som recap - logoEngine.js ----*/
        nextButtonText: "Næste",
        next: "5.1"
    },
    "4.3c": {
        id: "4.3c", modul: 4, type: "text",
        heading: "Byg helt nyt",
        paragraphs: [
            "Så lægger vi det gamle til side og bygger videre på det, du har lært. Det, du var glad for i dit nuværende logo, må gerne følge med."
        ],
        /*---- Brugerens "det fungerer"-liste vises som recap - logoEngine.js ----*/
        nextButtonText: "Næste",
        next: "4.4"
    },
    "4.4": {
        id: "4.4", modul: 4, type: "choice",
        heading: "Hvilken slags logo trækker i dig?",
        paragraphs: [
            "Et logo kan se ud på flere måder. Nogle består kun af navnet, sat med omhu. Andre af et symbol. Mange af begge dele. Det ligger ikke fast for evigt, det er bare en retning at starte i, så vi kan vise dig det rigtige at lede efter."
        ],
        options: [
            { id: "navn", text: "Kun mit navn, i en skrifttype jeg kan lide", response: "Enkelt og roligt. Her gør skrifttypen næsten hele arbejdet.", seOgsaa: { maal: "byggesten", tekst: "Ikoner, skrifttyper og andre grafiske byggesten." } },
            { id: "symbol", text: "Et lille symbol eller tegn", response: "Symbolet skal kunne stå alene og genkendes, også når det er småt. Det kræver lidt ekstra omtanke om rettigheder, og den tager vi, før du bygger." },
            { id: "begge", text: "Navn og symbol sammen", response: "Du får det bedste fra begge. Vi kigger på, hvordan de to kan hjælpe hinanden. Og du får en ekstra fordel: Symbolet kan stå alene på de små steder, fx som profilbillede, mens navn og symbol sammen bruges, hvor der er plads." },
            { id: "ved_ikke", text: "Det ved jeg ikke endnu", response: "Så lader vi eksemplerne vise dig vejen." }
        ],
        answerKey: "logoType",
        nextButtonText: "Næste",
        next: "5.1"
    },

    /*---- Modul 5 — Logo og din palet (spor B og C) ----*/

    "5.1": {
        id: "5.1", modul: 5, type: "text",
        heading: "Et logo står sjældent alene",
        paragraphs: [
            "Et logo skal spille sammen med resten af dit visuelle udtryk, især med farverne. Lad os se, hvordan det ser ud hos dig."
        ],
        /*---- "Du har allerede en palet fra Farver. Den viser vi her." tilføjes i logoEngine.js, hvis en gemt palet findes - og paletteSwatches viser så selve farverne som farveflader ----*/
        paletteSwatches: true,
        nextButtonText: "Lad os se på det",
        next: null /* logoEngine.js: behold+palet → 5.2a, behold+ingen → 5.2b, juster/nyt+palet → 5.2c, juster/nyt+ingen → 5.2d */
    },
    "5.2a": {
        id: "5.2a", modul: 5, type: "choice",
        heading: "Trækker de i samme retning?",
        paragraphs: [
            "Kig på dit logo og din palet ved siden af hinanden. Trækker de i samme retning?"
        ],
        paletteBeside: true,
        options: [
            { id: "ja", text: "Ja, det hænger sammen", response: "Godt. Den sammenhæng noterer vi til din guide." },
            { id: "ikke_sikker", text: "Jeg er ikke sikker", response: "Det er helt fint. Kig på dem igen, når du har testet logoet i praksis." },
            {
                id: "hver_sin_retning", text: "Det trækker i hver sin retning",
                response: "Det er et fund, ikke et problem. Nogle gange skal logoet ændres, nogle gange paletten, og nogle gange må de to gerne være forskellige.",
                followUpOptions: [
                    { id: "juster_alligevel", text: "Jeg vil alligevel justere logoet", jumpTo: "4.3b" },
                    { id: "lader_staa", text: "Jeg lader det stå og går videre", next: "7.1" }
                ]
            }
        ],
        answerKey: "paletSamspil",
        nextButtonText: "Næste",
        next: "7.1"
    },
    "5.2b": {
        id: "5.2b", modul: 5, type: "text",
        heading: "Ingen fast palet endnu",
        paragraphs: [
            "Du har ikke en fast palet endnu. Det er helt fint. Dit logo kan blive udgangspunktet for den."
        ],
        seOgsaa: { maal: "farver", tekst: "Vil du lave en palet, kan du gøre det dér, når du har lyst." },
        nextButtonText: "Næste",
        next: "7.1"
    },
    "5.2c": {
        id: "5.2c", modul: 5, type: "paletteColorPicker",
        heading: "Hvilke farver tager du med?",
        paragraphs: [
            "Skal logoet bruge de samme farver som din palet? Vælg dem, du vil tage med. Eller lad logoet få sin egen variant, fx til sort/hvid."
        ],
        answerKey: "logoFarver",
        nextButtonText: "Næste",
        next: null /* → 6.1j eller 6.1n, afhængig af retning - logoEngine.js */
    },
    "5.2d": {
        id: "5.2d", modul: 5, type: "choice",
        heading: "Vælg en foreløbig farveretning",
        paragraphs: [
            "Du har endnu ikke valgt en fast palet. Det er helt fint. Byg logoet med en foreløbig farveretning, som du kan justere senere."
        ],
        options: [
            { id: "en_farve", text: "Én farve, jeg kan lide", response: "Godt udgangspunkt, den er let at bygge videre på." },
            { id: "et_par_farver", text: "Et par farver, der passer sammen", response: "Skriv dem gerne ned, så du kan finde dem igen." },
            { id: "sort_hvid", text: "Sort og hvid til at begynde med", response: "Et smart sted at starte. Virker logoet uden farve, virker det næsten overalt. Farven kan komme bagefter." },
            { id: "ved_ikke", text: "Det ved jeg ikke endnu", response: "Det er okay. Begynd med formen, farven kan vente." }
        ],
        allowNote: true,
        seOgsaa: { maal: "farver", tekst: "Vil du have en fast palet, kan du lave den dér. Du behøver ikke gøre det først." },
        answerKey: "logoFarver",
        nextButtonText: "Næste",
        next: null /* → 6.1j eller 6.1n - logoEngine.js */
    },

    /*---- Modul 6 — Skab eller opdatér dit logo (Justér og Nyt) ----*/

    "6.1j": {
        id: "6.1j", modul: 6, type: "text",
        heading: "Nu går vi i gang",
        paragraphs: [
            "Nu arbejder vi med dit eget logo. Her er din liste. Du behøver ikke løse det hele. Tag fat, hvor det føles rigtigt at starte, og afkryds, efterhånden som du når det."
        ],
        checklist: {
            gemNoegle: "logo-modul6-arbejdsliste"
            /*---- punkter bygges dynamisk i logoEngine.js ud fra svar.listeSkurrer + svar.testResultater (stabile id'er, jf. planen) ----*/
        },
        nextButtonText: "Næste",
        next: "6.2"
    },
    "6.1n": {
        id: "6.1n", modul: 6, type: "text",
        heading: "Det har du med dig",
        paragraphs: [
            "Nu skal du i gang med det konkrete. Du har allerede en hel del med dig. Det er dit udgangspunkt."
        ],
        /*---- Recap af logotype, farveretning/palet fra 5.2, og screenshots/noter fra 3.2 - logoEngine.js ----*/
        nextButtonText: "Næste",
        next: "6.2"
    },
    "6.2": {
        id: "6.2", modul: 6, type: "choice",
        heading: "Hvordan vil du lave det?",
        paragraphs: [
            "Vælg den vej, der giver mest mening for dig.",
            "Tryk på pilen ved en mulighed for at læse lidt mere om den."
        ],
        /*---- Looka-muligheden vises kun for retning "nyt" - logoEngine.js filtrerer options. `explanation` er runde 7's korte forklaring, der foldes ud med pilen ved siden af valget (brugertest 1, T4/U2) - at folde ud vælger IKKE muligheden, jf. logoUi.js ----*/
        options: [
            {
                id: "canva", text: "I Canva (godt at starte med)",
                explanation: "Et gratis program i din browser, hvor du bygger logoet selv med skrifttyper og enkle former. Godt, hvis du vil prøve dig frem og have det hele i egne hænder."
            },
            {
                id: "looka", text: "I Looka, ud fra det, jeg allerede har leget med", nytOnly: true,
                explanation: "Du bygger videre på det, du allerede har leget med. Det er gratis at designe, og du betaler først, når du henter filerne."
            },
            {
                id: "illustrator", text: "I Illustrator, hvis jeg har erfaring med Adobe",
                explanation: "Et professionelt tegneprogram fra Adobe. Kun, hvis du kender det i forvejen. Det koster et abonnement."
            },
            {
                id: "anden", text: "Jeg vil have en grafiker eller en anden til at lave det", jumpTo: "2d.2",
                explanation: "Det kan være en grafiker, du betaler, en bekendt, der er god til det, eller en freelancer, du finder på en platform som Fiverr eller Upwork. Du har allerede gjort det vigtige forarbejde her: Du ved, hvilken slags logo du vil have, hvilke farver det skal have, og hvad der inspirerer dig. Det gør det meget nemmere at forklare, hvad du ønsker, og det kan gøre opgaven hurtigere og potentielt billigere. Vi giver dig en tjekliste med til samtalen."
            },
            /*---- Flere veje (2026-11-04): står bevidst sidst. PLADSHOLDER i forklaringen, indtil prisen ligger fast ----*/
            {
                id: "duf", text: "Jeg vil gerne have, at DUF laver det", jumpTo: "2d.duf",
                explanation: "Vi laver dit endelige logo ud fra det, du har arbejdet med her. Prisen aftaler vi med dig, før vi går i gang."
            }
        ],
        answerKey: "vaerktoej",
        nextButtonText: "Næste",
        next: "6.3"
    },
    "6.3": {
        id: "6.3", modul: 6, type: "text",
        heading: "Inden du går i gang",
        /*---- Indhold (rettighedsboble efter logoType/retning/vaerktoej) sammensættes i logoEngine.js - kan indeholde en indlejret tjekliste (symbol) eller et seOgsaa-skilt (symbol/navn) ----*/
        paragraphs: [],
        nextButtonText: "Næste",
        next: "6.4"
    },
    "6.4": {
        id: "6.4", modul: 6, type: "text",
        heading: "Vejledning til dit værktøj",
        /*---- Indhold (Canva/Looka/Illustrator) sammensættes i logoEngine.js ud fra svar.vaerktoej - Looka indeholder en indlejret tjekliste (gemNoegle logo-modul6-looka) ----*/
        paragraphs: [],
        nextButtonText: "Næste",
        next: "6.5"
    },
    "6.5": {
        id: "6.5", modul: 6, type: "text",
        heading: "Læg dit logo her",
        paragraphs: [
            "Er du nået til noget, du kan lide? Læg det her. Det er ikke en færdig version, bare den, du står med lige nu. Har du også en lille udgave, så læg den ved siden af. Har du den ikke endnu, går det også fint. Den kommer vi tilbage til i testen. Det bliver på din enhed."
        ],
        guideLine: "Et selvlavet logo er ikke et kompromis. Det er en prototype, ligesom resten af dit visuelle udtryk.",
        guideAvatar: "Sophia",
        imageUpload: { bucket: "logo", label: "Dit fulde logo", hint: "Billedet forlader aldrig din egen enhed." },
        /*---- Logo-varianter (godkendt af Heidi 2026-11-04): et andet upload-felt til den lille udgave, i samme bucket som 7.2 bruger - logoUi.js tegner det med idPrefix "lille-" ----*/
        ekstraUpload: { bucket: "logo-lille", label: "Din lille udgave (valgfrit)", hint: "Fx kun symbolet eller dit forbogstav. Billedet forlader aldrig din egen enhed." },
        nextButtonText: "Jeg har noget, jeg vil teste",
        next: "7.1"
    },

    /*---- Modul 7 — Tjek i praksis (alle spor) ----*/

    "7.1": {
        id: "7.1", modul: 7, type: "text",
        heading: "Nu tester vi det",
        paragraphs: [
            "Nu tester vi, om logoet fungerer i virkeligheden. Ikke kun, om det ser godt ud på din skærm lige nu. Der er tre små tjek: småt, uden farve og på forskellige baggrunde."
        ],
        /*---- Spor A/D's ekstra linje tilføjes i logoEngine.js ----*/
        imageUpload: { bucket: "logo", label: "Upload et billede af logoet (valgfrit)", hint: "Har du ikke lagt det ind endnu, kan du gøre det her." },
        nextButtonText: "Næste",
        next: "7.2"
    },
    "7.2": {
        id: "7.2", modul: 7, type: "choice",
        heading: "Tjek 1: Kan du kende det, når det er småt?",
        paragraphs: [
            "Kig på logoet i lille størrelse, som på et ikon eller i en profil. Har du en lille udgave, ser du den her også, helt nede i størrelsen på et favicon. Kan du stadig kende det?"
        ],
        logoPreview: "small",
        /*---- Runde 7 (brugertest 1, T6): vises under responsen, kun når svaret ikke er "Ja". Det er manuskriptets `logoUploadLille`, gemt i bucket "logo-lille", og vises ved siden af hovedlogoet i de tre små størrelser - logoUi.js ----*/
        responseUpload: { bucket: "logo-lille", label: "Har du en udgave med kun symbolet? Læg den her, og se den i de små størrelser", hint: "Billedet forlader aldrig din egen enhed." },
        options: [
            { id: "ja", text: "Ja, det kan jeg stadig kende" },
            {
                id: "naesten", text: "Næsten, men noget forsvinder",
                response: "Det er ofte detaljerne, der forsvinder først. Prøv at fjerne det, der ikke er helt nødvendigt, gøre streger og bogstaver kraftigere og give mere luft. Mange har også en lille udgave til de små steder, fx kun symbolet eller kun forbogstavet."
            },
            {
                id: "nej", text: "Nej, det bliver utydeligt",
                response: "Det er ofte detaljerne, der forsvinder først. Prøv at fjerne det, der ikke er helt nødvendigt, gøre streger og bogstaver kraftigere og give mere luft. Mange har også en lille udgave til de små steder, fx kun symbolet eller kun forbogstavet."
            }
        ],
        answerKey: "testResultat_smaat",
        nextButtonText: "Næste",
        next: "7.3"
    },
    "7.3": {
        id: "7.3", modul: 7, type: "choice",
        heading: "Tjek 2: Virker det uden farve?",
        paragraphs: [
            "Kig på logoet uden farve. Fungerer det stadig?"
        ],
        logoPreview: "grayscale",
        options: [
            { id: "ja", text: "Ja, det kan jeg stadig kende" },
            {
                id: "naesten", text: "Næsten, men noget forsvinder",
                response: "Uden farve er det lyset og mørket, der gør forskellen, ikke farven. Når to farver er lige lyse eller lige mørke, smelter de sammen. Prøv at gøre den ene lysere eller mørkere, eller lav en egen sort/hvid-udgave."
            },
            {
                id: "nej", text: "Nej, det bliver utydeligt",
                response: "Uden farve er det lyset og mørket, der gør forskellen, ikke farven. Når to farver er lige lyse eller lige mørke, smelter de sammen. Prøv at gøre den ene lysere eller mørkere, eller lav en egen sort/hvid-udgave."
            }
        ],
        answerKey: "testResultat_udenFarve",
        nextButtonText: "Næste",
        next: "7.4"
    },
    "7.4": {
        id: "7.4", modul: 7, type: "choice",
        heading: "Tjek 3: Lys og mørk baggrund",
        paragraphs: [
            "Kig på logoet på en lys og en mørk baggrund. Er det til at se på begge steder? Er der tekst i logoet, hjælper det at tjekke kontrasten mellem tekst og baggrund."
        ],
        logoPreview: "backgrounds",
        options: [
            { id: "begge", text: "Ja, på begge" },
            {
                id: "kun_lys", text: "Kun på den lyse",
                response: "Mørk tekst forsvinder på mørk baggrund. Lav en udgave med lyse farver til de mørke steder."
            },
            {
                id: "kun_moerk", text: "Kun på den mørke",
                response: "Det samme den anden vej. Lav en udgave med mørke farver til lyse baggrunde."
            }
        ],
        seOgsaa: { maal: "farver", tekst: "Tjek kontrasten mellem tekst og baggrund helt præcist." },
        answerKey: "testResultat_baggrund",
        nextButtonText: "Næste",
        next: "7.5"
    },
    "7.5": {
        id: "7.5", modul: 7, type: "choice", ctaButtons: true,
        heading: "Sådan gik det",
        /*---- Indhold (alt "ja" vs. liste over tjek, der ikke gik godt) og de rigtige knapper for spor/resultat sammensættes i logoEngine.js ----*/
        paragraphs: [],
        options: [],
        next: null
    },

    /*---- Modul 8 — Dokumentér (alle spor) ----*/

    "8.1": {
        id: "8.1", modul: 8, type: "textNote",
        heading: "Skriv det ned, så du kan finde det igen",
        paragraphs: [
            "Skriv 2-3 sætninger om dit logo. Det er det, der bliver til den del af din visuelle guide, du kan slå op i senere."
        ],
        /*---- "Din opskrift"-spørgsmål og evt. støtte-recap (Modul 3-noter for "Nyt") sat pr. spor/retning i logoEngine.js ----*/
        fields: [
            { id: "begrundelse", label: "", rows: 4 }
        ],
        answerKey: "begrundelse",
        nextButtonText: "Næste",
        next: "8.2"
    },
    "8.2": {
        id: "8.2", modul: 8, type: "text",
        heading: "Din logo-side i guiden",
        /*---- Opsamling (logo, tekst, tjek-resultater, åbne punkter) bygges i logoEngine.js ----*/
        paragraphs: [],
        nextButtonText: "Tilføj til min visuelle guide",
        saveOutput: true,
        next: "8.3"
    },
    "8.3": {
        id: "8.3", modul: 8, type: "text",
        heading: "Dit logo er en prototype",
        paragraphs: [
            "Dit logo er, som resten af dit visuelle udtryk, en prototype. Det må gerne udvikle sig, i takt med at din praksis gør det."
        ],
        /*---- Ekstra linje om åbne punkter, hvis relevant, tilføjes i logoEngine.js ----*/
        guideLine: "Du behøver ikke have det perfekte logo i dag. Du skal bare have et, du kan bruge i morgen.",
        guideAvatar: "Marcus",
        nextButtonText: "Afslut",
        isExit: true
    }
};
