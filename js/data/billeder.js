/*---- Indhold til vækstrummet "Billeder" (uddybende, hjem: Visuelt udtryk) - jf. docs/duf-manuskript-billeder.md (opdateret 2026-09-06 med Marcus' fulde gennemgang af Modul 2 + Modul 7) ----*/

export const velkomst = {
    fraOverblik: "Du nævnte tidligere, at du ikke er helt sikker på rettighederne til de billeder, du bruger. Det anbefaler vi altid at få styr på — uanset hvad du ellers vælger at arbejde med. Derfor starter vi der i dette rum.",
    standard: "Velkommen til Billeder. Her får du hjælp til at vælge billeder, der understøtter din praksis — og til at få styr på, hvilke rettigheder du faktisk har til dem."
};

export const modul1 = {
    heading: "Hvorfor billeder betyder noget",
    paragraphs: [
        "Billeder fortæller en historie, længe før nogen har læst et eneste ord om dig. De sætter en stemning, og de skaber — eller underminerer — tillid.",
        "Det handler ikke om at have de mest polerede eller professionelle billeder. Det handler om, at de billeder, du bruger, rent faktisk viser noget rigtigt om din praksis, og at du ved, du må bruge dem."
    ],
    myteknaek: "Et billede, du finder online, er ikke automatisk frit at bruge, bare fordi det er let at downloade. Vi kommer tilbage til, hvad det betyder i praksis, i næste modul."
};

/*---- De fire situationer bruges både i Modul 2's introduktion og i det faste opslagsværk (reference-knappen) ----*/

export const situationer = [
    {
        title: "Billeder du selv har taget",
        text: "Billeder uden genkendelige personer (fx din klinik, dine redskaber) må du som udgangspunkt selv bestemme over. Er der genkendelige personer med — også selvom du selv har taget billedet — skal du have et lovligt grundlag, typisk et tydeligt samtykke. Det gælder allermest billeder af klienter: samtykket bør være specifikt til den konkrete brug og kan altid trækkes tilbage."
    },
    {
        title: "Billeder fra billedbanker",
        text: "\"Gratis\" er ikke det samme som \"uden vilkår\". Tjek altid den konkrete licens, og vær ekstra opmærksom, hvis der er personer på billedet i en sundheds- eller behandlingssammenhæng."
    },
    {
        title: "Billeder fundet online",
        text: "Frit tilgængeligt er ikke det samme som frit at bruge. Har billedet en Creative Commons-licens, betyder bogstaverne noget: BY (kildeangivelse), NC (ikke kommercielt), ND (må ikke ændres), SA (deles under samme licens), CC0 (fri til brug)."
    },
    {
        title: "Billeder skabt med AI",
        text: "Et nyt og stadig uafklaret område. Behandl dem med samme forsigtighed som billeder fundet online, og undgå at uploade billeder af klienter eller andre fortrolige oplysninger til et offentligt AI-værktøj."
    }
];

export const modul2 = {
    heading: "Rettigheder: det du skal vide",
    intro: "Før vi taler om, hvilke billeder der ser godt ud, skal vi tale om, hvilke du faktisk må bruge. Det er ikke et tjek, du gør bagefter — det er en del af selve valget. Vi har samlet de mest almindelige situationer i en praktisk oversigt, du altid kan vende tilbage til. Her er den korte version:",
    altidSporgsmaal: [
        "Har du tilladelse eller en licens til at bruge selve billedet?",
        "Har du et lovligt grundlag for at vise de personer, der kan genkendes på billedet?"
    ],
    vigtigtAtVide: "Denne oversigt er DUF's egen praktiske vejledning — bygget til at hjælpe dig med at få øje på de rigtige spørgsmål, ikke til at afgøre komplicerede eller tvivlsomme sager. Er du i tvivl i en konkret situation, særligt hvis en klient er involveret, så søg professionel rådgivning, fremfor at gætte.",
    selvvurdering: {
        question: "Ved du, hvor dine nuværende billeder kommer fra, og om du må bruge dem?",
        options: [
            { id: "tryg", text: "Ja, det er jeg tryg ved" },
            { id: "usikker", text: "Jeg er faktisk ikke helt sikker" }
        ]
    }
};

export const modul3 = {
    heading: "Dit udgangspunkt",
    intro: "Lad os se på, hvor du står i dag.",
    question: "Har du allerede en bevidst billedretning, hvor du kender rettighederne til alle dine billeder — og ønsker du ikke at ændre på den?",
    options: [
        { id: "ja_passer", text: "Ja, det passer godt" },
        { id: "nej_usikker", text: "Nej, eller jeg er ikke helt sikker" }
    ],
    valideringsSkaermtekst: "Så behøver du ikke starte forfra. Vi hopper i stedet direkte til at bekræfte rettigheder og sammenhæng — og runder af med at føje det til din visuelle guide.",
    valideringsKnapTest: "Bekræft mine billeder",
    valideringsKnapFuld: "Nej, jeg vil hellere gennem det hele",
    exampleIntro: "Saml 3–5 eksempler på billeder, du allerede bruger i din praksis i dag — det kan være på din hjemmeside, sociale medier, eller i tryksager.",
    reflectionQuestions: ["Hvor kommer disse billeder fra?", "Er de valgt bevidst — eller er de bare endt sådan?"],
    skipText: "Helt fint — så starter vi fra et rent bord."
};

export const modul4 = {
    heading: "Inspiration og sammenligning",
    intro: "Find 2–3 andre praksisser, hvis billedvalg du synes fungerer godt. For hver af dem:",
    perPraksisQuestions: [
        "Hvilken slags billeder bruger de — stemningsbilleder, billeder af praksissen, illustrative billeder?",
        "Hvad tror du, billederne skal signalere?",
        "Er der noget, du kan lade dig inspirere af — uden at kopiere det direkte?"
    ],
    closing: "Formålet her er ikke at finde en skabelon, du kan kopiere — hverken visuelt eller rettighedsmæssigt. Det er at blive skarpere på, hvad der rent faktisk virker for dig."
};

export const modul5 = {
    heading: "Billedernes rolle",
    paragraphs: [
        "Ligesom farver kan billeder spille forskellige roller. Nogle er stemningsbilleder, der sætter en tone. Andre viser praksissen selv — rummet, redskaberne, dig. Og nogle er rent illustrative, der understøtter en pointe uden at forestille noget bestemt.",
        "Det handler ikke om at ramme et bestemt antal billeder eller én bestemt stil. Det handler om at vide, hvilken rolle hvert billede spiller — og om det bruges i den rette dosis til den rolle."
    ]
};

export const modul6 = {
    heading: "Vælg din billedretning",
    intro: "Med rollerne i baghovedet, lad os lande på nogle konkrete kriterier for, hvilke billeder der passer til dig fremover.",
    fields: [
        { id: "stil", label: "Hvilken stil passer til din praksis — varmt og nært, roligt og minimalistisk, eller noget helt tredje?" },
        { id: "motiver", label: "Hvilke motiver hører til, og hvilke hører ikke til?" },
        { id: "palet", label: "Skal billederne spille sammen med en bestemt farvepalet, hvis du har en?" }
    ],
    closing: "Der er ikke én rigtig billedretning. Det vigtige er, at du kan svare på, hvorfor de billeder, du vælger, passer til dig."
};

export const modul7 = {
    heading: "Tjek rettigheder og kontrast i praksis",
    intro: "Nu tjekker vi, at de billeder, du vil bruge, både er lovlige og fungerer visuelt.",
    checklist: [
        "Hvor kommer billedet fra — har du selv taget det, fået tilladelse, eller en licens?",
        "Dækker tilladelsen den konkrete brug, du planlægger (fx hjemmeside, sociale medier, annoncer)?",
        "Er der genkendelige personer på billedet? Har du et lovligt og dokumenterbart grundlag for at vise dem?",
        "Kan billedet afsløre eller antyde følsomme oplysninger, fx om en klients helbred?",
        "Skal fotografen eller en anden rettighedshaver krediteres?",
        "Har du gemt dokumentation for tilladelsen eller licensen?"
    ],
    selvvurderingQuestion: "Efter at have gennemgået listen — er du tryg ved rettighederne til de billeder, du har valgt?",
    selvvurderingOptions: [
        { id: "tryg", text: "Ja, jeg er tryg ved det" },
        { id: "tvivl", text: "Jeg er stadig i tvivl" }
    ],
    uafklaretText: "Er du i tvivl efter tjeklisten, er det bedre at vælge et andet billede end at gætte — særligt hvis der er penge, en klage eller en klient involveret. Søg professionel rådgivning, fremfor at gætte, hvis en klient er involveret.",
    kontroltjekHeading: "Kontroltjek: tekst oven på billede",
    kontroltjekText: "Placér din tekst oven på billedet, og vurder ærligt: kan den tydeligt læses? Er du i tvivl, kan en mørk eller lys boks bag teksten ofte løse det, uden at gå på kompromis med billedet."
};

export const modul8 = {
    heading: "Afprøv og dokumentér",
    intro: "Brug din billedretning ét sted i praksis — et opslag, en side på din hjemmeside, eller et dokument. Se, hvordan det føles, når det ikke bare er billeder i en mappe, men noget, andre rent faktisk møder.",
    documentationLabel: "Skriv 2–3 sætninger: hvilke kriterier bruger du til at vælge billeder, og hvordan har du sikret dig rettighederne til dem?",
    closing: "Din billedretning er ikke hugget i sten. Den er en prototype, ligesom resten af dit visuelle udtryk — og den må gerne udvikle sig, i takt med at din praksis og dit materiale gør det."
};
