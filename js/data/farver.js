/*---- Indhold til vækstrummet "Farver" (uddybende, hjem: Visuelt udtryk) - jf. docs/duf-manuskript-farver.md ----*/

export const velkomst = {
    fraOverblik: "Du nævnte tidligere, at du er usikker på dine farver — derfor foreslog vi at kigge nærmere på det her.",
    standard: "Velkommen til Farver. Her får du hjælp til at vælge en farvepalet, der understøtter din praksis — uanset om du starter fra bunden eller bare vil kvalitetssikre det, du allerede har."
};

export const modul1 = {
    heading: "Hvorfor farver betyder noget",
    paragraphs: [
        "Farver er sjældent tilfældige, selvom de tit bliver valgt sådan. De sender et signal, længe før nogen har læst et ord om dig — om ro, energi, tillid, eller noget helt fjerde.",
        "Det betyder ikke, at der findes én rigtig farve for alternative behandlere. Det betyder, at det er værd at vide, hvorfor du har valgt dem, du har."
    ],
    myteknaek: "Farvevalg er ikke bare smag. To farver kan være lige \"pæne\" og stadig sende vidt forskellige signaler om din praksis."
};

export const modul2 = {
    heading: "Farvers usynlige regler",
    paragraphs: [
        "Nogle farvekombinationer er lettere at læse end andre — bogstaveligt talt. Lys tekst på lys baggrund kan simpelthen være svær at se for mange mennesker, uanset hvor flot den ser ud på din skærm.",
        "Det kaldes kontrast, og det er en af de vigtigste — men mest oversete — regler i farvevalg. Vi kommer til at teste det konkret senere i dette rum (Modul 7)."
    ]
};

export const modul3 = {
    heading: "Dit udgangspunkt",
    intro: "Saml 3–5 eksempler på, hvor du allerede bruger farve i din praksis i dag — det kan være din hjemmeside, dit logo (hvis du har et), eller opslag på sociale medier.",
    skipText: "Har du ikke noget at samle op endnu? Helt fint — så starter vi fra et rent bord.",
    reflectionQuestions: [
        "Hvilke farver går igen?",
        "Er de valgt bevidst — eller er de bare endt sådan?"
    ]
};

export const modul4 = {
    heading: "Inspiration og sammenligning",
    intro: "Find 2–3 andre praksisser (gerne inden for alternativ behandling, men det behøver de ikke være), hvis visuelle udtryk du synes fungerer godt. For hver af dem:",
    perPraksisQuestions: [
        "Hvilke farver bruger de?",
        "Hvad tror du, farverne skal signalere?",
        "Er der noget, du kan lade dig inspirere af — uden at kopiere det direkte?"
    ],
    closing: "Formålet her er ikke at finde en skabelon, du kan kopiere. Det er at blive skarpere på, hvad der rent faktisk virker — og hvorfor."
};

export const modul5 = {
    heading: "Farvernes roller",
    paragraphs: [
        "Fremfor at tænke i et bestemt antal farver, vil vi gerne introducere en anden måde at tænke på: rolle og dosering.",
        "En farve kan spille forskellige roller — nogle er beregnet til at fylde meget og sætte tonen. Andre er der for at understøtte. Og nogle bruges bevidst sparsomt, netop fordi de skal springe i øjnene, når det betyder noget.",
        "Det handler ikke om at ramme et bestemt tal. Det handler om at vide, hvilken rolle hver farve spiller — og om den bruges i den rette dosis til den rolle."
    ]
};

export const modul6 = {
    heading: "Vælg din palet",
    intro: "Med rolle og dosering i baghovedet:",
    roles: [
        { id: "hoved", label: "Hovedfarve", question: "Hvilken farve skal spille hovedrollen i dit udtryk?", defaultHex: "#0C3A2D" },
        { id: "understoettende", label: "Understøttende farve", question: "Er der andre farver, der skal understøtte den?", defaultHex: "#E8ECD1" },
        { id: "accent", label: "Accent", question: "Er der et sted, hvor du har brug for en farve, der bevidst springer i øjnene?", defaultHex: "#DE5B23" }
    ],
    closing: "Der er ikke ét rigtigt antal farver at ende med. Nogle lander på to. Andre på flere. Det vigtige er, at du kan svare på, hvorfor hver enkelt farve er der."
};

/*---- Modul 7 er tilpasset fra manuskriptets eksterne Adobe-værktøj til et indbygget tjek, jf. beslutning ----*/

export const modul7 = {
    heading: "Tjek kontrast i praksis",
    intro: "Nu tester vi paletten i praksis. Vælg den tekstfarve og den baggrundsfarve, du planlægger at bruge sammen.",
    failText: "Det betyder ikke, at farverne er forkerte — det betyder, at de ikke bør bruges sammen som tekst og baggrund. Prøv i stedet at parre dem med en anden farve fra din palet, eller juster nuancen en smule.",
    passText: "Denne kombination lever op til WCAG niveau AA."
};

export const modul8 = {
    heading: "Afprøv og dokumentér",
    intro: "Brug din valgte palet ét sted i praksis — det kan være et opslag, en side på din hjemmeside, eller et dokument. Se, hvordan det føles, når det ikke bare er farver på en skærm, men noget, andre rent faktisk møder.",
    documentationLabel: "Skriv 2–3 sætninger om dine valgte farver: hvilken rolle spiller hver af dem, og hvorfor har du valgt dem?",
    closing: "Din palet er ikke hugget i sten. Den er en prototype, ligesom resten af dit visuelle udtryk — og den må gerne udvikle sig, i takt med at din praksis gør det."
};
