/*---- Indhold til vækstrummet "Logo" (uddybende, hjem: Visuelt udtryk) - jf. docs/duf-manuskript-logo.md ----*/

export const velkomst = {
    fraOverblik: "Du nævnte tidligere, at dit logo mangler, er under udvikling, eller er noget, du gerne vil have på plads — derfor foreslog vi at kigge nærmere på det her.",
    standard: "Velkommen til Logo. Her får du hjælp til enten at skabe et nyt, bevidst logo — eller til at vurdere det, du allerede har."
};

export const modul1 = {
    heading: "Hvad et logo faktisk skal",
    paragraphs: [
        "Et logo bliver ofte tillagt mere magi, end det fortjener. Det er ikke det, der skaber din identitet som behandler — det er ét genkendelsespunkt blandt flere.",
        "Det, et logo faktisk skal, er enklere: være til at genkende, fungere i mange sammenhænge, og spille sammen med resten af dit visuelle udtryk."
    ],
    myteknaek: "Et flot eller dyrt logo giver ikke automatisk troværdighed. Troværdighed kommer af sammenhæng og konsekvent brug — ikke af logoets kompleksitet."
};

/*---- Modul 2 er vækstrummets eneste forgreningspunkt - se logoEngine.js for routing ----*/

export const modul2 = {
    heading: "Dit nuværende logo",
    intro: "Lad os starte med, hvor du står i dag.",
    sporgsmaal1: {
        question: "Har du allerede et logo?",
        options: [
            { id: "ja_tilfreds", text: "Ja, og jeg er tilfreds med det" },
            { id: "ja_usikker", text: "Ja, men jeg er usikker på det" },
            { id: "nej", text: "Nej" },
            { id: "under_udvikling", text: "Det er under udvikling" }
        ]
    },
    sporgsmaal2: {
        question: "Er det lavet af en professionel, og ønsker du ikke at ændre på det — du vil bare gerne vide, om det rent faktisk fungerer?",
        options: [
            { id: "valideringsvej", text: "Ja, det lyder rigtigt" },
            { id: "fulde_forlob", text: "Nej, jeg vil gerne se nærmere på det alligevel" }
        ]
    },
    valideringsSkaermtekst: "Så behøver du ikke bygge noget nyt. Vi hopper i stedet direkte til at teste, om dit logo fungerer i praksis — og runder af med at føje det til din visuelle guide.",
    valideringsKnapTest: "Test mit logo i praksis",
    valideringsKnapFuld: "Nej, jeg vil hellere gennem det hele",
    oevelseLabel: "Hvis du allerede har et logo — hvad synes du selv fungerer ved det, og hvad gør ikke? Har du intet endnu, er det helt fint at springe dette over."
};

export const modul3 = {
    heading: "Inspiration og sammenligning",
    intro: "Brug gerne Looka til at lege med, hvordan forskellige logostilarter kan se ud for en praksis som din. Du skal ikke bruge det til at lave dit endelige logo her — det er til inspiration.",
    externalLink: { label: "Åbn Looka (åbner i nyt vindue)", url: "https://looka.com/logo-maker" },
    exerciseIntro: "Find 2–3 logoer — fra Looka, eller fra praksisser du kender — som du synes fungerer godt.",
    perLogoQuestions: ["Hvad gør, at de fungerer?", "Er der noget, du kan lade dig inspirere af, uden at kopiere det direkte?"]
};

export const modul4 = {
    heading: "Vælg retning",
    intro: "Baseret på det, du nu ved, er det tid til at vælge en retning. Det er en beslutning — selve arbejdet kommer i næste modul.",
    question: "Hvad giver mest mening for dig lige nu?",
    options: [
        { id: "behold", text: "Behold mit nuværende logo, som det er" },
        { id: "juster", text: "Justér mit nuværende logo" },
        { id: "nyt", text: "Byg et helt nyt logo" }
    ],
    closing: "Der er intet rigtigt svar her. Et logo, der allerede fungerer, skal ikke laves om, bare fordi du er i gang med at kigge på det."
};

export const modul5 = {
    heading: "Logo og din palet",
    intro: "Et logo står sjældent alene — det skal spille sammen med farverne, du bruger resten af stedet.",
    ingenPalet: "Du har endnu ikke valgt en fast palet. Det er helt fint — byg logoet med en foreløbig farveretning, som I kan stemme af mod hinanden senere, hvis du går videre til Farver."
};

export const modul6 = {
    heading: "Skab eller opdatér dit logo",
    intro: "Nu skal du i gang med det konkrete arbejde. Vi anbefaler Canva til selve logo-fremstillingen. Har du erfaring med Adobe-programmer, kan du i stedet bruge Illustrator.",
    externalLinks: [
        { label: "Åbn Canva (åbner i nyt vindue)", url: "https://www.canva.com/" },
        { label: "Åbn Illustrator (åbner i nyt vindue)", url: "https://www.adobe.com/products/illustrator.html" }
    ],
    exerciseIntro: "Byg (eller justér) dit logo. Tag udgangspunkt i det, du fandt inspirerende i Modul 3, og den farveretning, du afklarede i Modul 5.",
    descriptionLabel: "Beskriv kort det logo, du har bygget eller justeret (eller sæt et link ind, hvis det ligger et sted online).",
    support: "Et selvlavet logo er ikke et kompromis — det er en gyldig prototype, ligesom resten af dit visuelle udtryk.",
    uploadLabel: "Upload et billede af det færdige logo (valgfrit)",
    uploadHint: "Billedet forlader aldrig din egen enhed — det gemmes kun i denne browser, medmindre du har fravalgt browserlagring."
};

export const modul7 = {
    heading: "Tjek i praksis",
    intro: "Nu tester vi, om logoet rent faktisk fungerer — ikke kun, om det ser godt ud på din skærm lige nu.",
    checklist: [
        "Kan du stadig genkende det i lille format (fx som et ikon)?",
        "Fungerer det i sort/hvid, ikke kun i farve?",
        "Er det til at se på både en lys og en mørk baggrund?"
    ],
    notWorking: "Det er helt normalt, at noget først viser sig her. Gå tilbage og justér, det er en del af processen — ikke et tegn på, at du gjorde noget forkert."
};

export const modul8 = {
    heading: "Dokumentér",
    intro: "Tilføj dit logo (eller din vurdering af det eksisterende) til din visuelle guide.",
    documentationLabel: "Skriv 2–3 sætninger: hvilken retning valgte du (behold, justér eller nyt), og hvorfor? Hvordan spiller logoet sammen med din farvepalet?",
    closing: "Dit logo er, som resten af dit visuelle udtryk, en prototype. Det må gerne udvikle sig, i takt med at din praksis gør det."
};

export const retningTekst = {
    behold: "beholde mit nuværende logo, som det er",
    juster: "justere mit nuværende logo",
    nyt: "bygge et helt nyt logo",
    valideringsvej: "beholde mit nuværende logo, fordi det allerede er lavet professionelt og fungerer i praksis"
};
