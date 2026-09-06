/*---- Indhold til vækstrummet "Ikoner, fonte & andre grafiske byggesten" (uddybende, hjem: Visuelt udtryk) - jf. docs/duf-manuskript-byggesten.md ----*/

export const velkomst = {
    kontekstuel: "Du har allerede taget stilling til farver og/eller logo. Nu handler det om de mindre detaljer — ikoner, fonte og andre tilbagevendende elementer — der binder det hele sammen i det daglige.",
    standard: "Velkommen til Ikoner, fonte & andre grafiske byggesten. Her får du hjælp til at vælge de mindre, tilbagevendende elementer, der binder dit visuelle udtryk sammen — på tværs af opslag, dokumenter og hjemmeside."
};

export const modul1 = {
    heading: "Hvorfor byggestenene betyder noget",
    paragraphs: [
        "Farver, logo og billeder fylder mest, når man taler om visuelt udtryk. Men det er tit de mindre, tilbagevendende detaljer — ikonerne i en menu, skrifttypen i et opslag, en tilbagevendende streg eller ramme — der afgør, om det hele opleves som én sammenhængende helhed, eller som spredte enkeltdele.",
        "De er lette at overse, netop fordi de er små. Men brugt bevidst og konsekvent er de det, der binder resten sammen i det daglige."
    ],
    myteknaek: "Det er ikke ligegyldigt, at menuikonet på hjemmesiden ser anderledes ud end ikonet i sidste uges opslag. Det lægger de fleste ikke mærke til bevidst — men det er tit noget af det, der gør, at et udtryk føles rodet, uden at man kan sætte fingeren på hvorfor."
};

export const modul2 = {
    heading: "Dit udgangspunkt",
    intro: "Lad os se på, hvad du allerede bruger i dag.",
    exampleIntro: "Saml 3–5 eksempler på steder, hvor du bruger ikoner, skrifttyper eller andre grafiske elementer i dag — det kan være din hjemmeside, sociale medier, eller dokumenter du sender til klienter.",
    reflectionQuestions: [
        "Bruger du de samme ikoner og skrifttyper konsekvent, eller varierer det fra sted til sted?",
        "Er det et bevidst valg — eller er det bare endt sådan?"
    ],
    skipText: "Helt fint — så starter vi fra et rent bord."
};

/*---- De fem situationer bruges både i Modul 3's introduktion og i det faste opslagsværk (reference-knappen) ----*/

export const situationer = [
    {
        title: "Gratis ikonbiblioteker",
        text: "Tjek altid den konkrete licens. Nogle kræver kildeangivelse, andre tillader ikke kommerciel brug uden en betalt licens."
    },
    {
        title: "Betalte eller licensbaserede ikonpakker",
        text: "Licensen afgør, hvor meget du må bruge, ændre, eller genbruge dem til. Gem kvitteringen eller licensbeviset."
    },
    {
        title: "Ikoner indbygget i designprogrammer eller hjemmesideværktøjer",
        text: "At du har adgang til et ikon gennem et program, er ikke det samme som ret til at bruge det til alle formål. Tjek, om det må bruges kommercielt og eksporteres ud af programmet."
    },
    {
        title: "Ikoner kopieret fra andre hjemmesider eller apps",
        text: "Ikke automatisk frit at bruge, blot fordi det er let at kopiere."
    },
    {
        title: "Virksomheds- og platformsikoner (fx sociale medier, betalingsløsninger)",
        text: "Kan være beskyttede varemærker. Hent dem fra virksomhedens egen hjemmeside, og følg deres retningslinjer for brug."
    }
];

export const modul3 = {
    heading: "Vælg din ikonstil",
    intro: "De fleste bruger ikoner fra et ikonbibliotek eller en gratis tjeneste, fremfor selv at tegne dem. Det er helt fint — men ligesom med billeder er \"let at hente\" ikke det samme som \"frit at bruge, som man vil\".",
    altidSporgsmaal: [
        "Hvor kommer ikonet fra?",
        "Hvilken licens eller aftale gælder?",
        "Skal ikonet bruges som almindelig grafik, eller som en del af din virksomheds identitet?"
    ],
    vigtigtAtVide: "Skal et ikon indgå i noget, der senere skal beskyttes særskilt — fx blive en del af dit logo — stiller det ofte skrappere krav til rettighederne end almindelig brug i opslag og dokumenter. Mange ikonbiblioteker forbyder direkte, at deres ikoner bruges som logo eller varemærke. Har ikonet en Creative Commons-licens, betyder bogstaverne noget: BY (kildeangivelse), NC (ikke kommercielt), ND (må ikke ændres), SA (deles under samme licens), CC0 (fri til brug). Tjek licensen ekstra grundigt i den situation.",
    fields: [
        { id: "stil", label: "Hvilken stil passer til din praksis — streg eller fyldt, rund eller skarp?" },
        { id: "alene", label: "Er ikonerne til for at understøtte tekst, eller skal de kunne stå alene?" }
    ],
    closing: "Et ikon fungerer bedst sammen med tekst, ikke som en erstatning for den. Er du i tvivl om, hvorvidt et ikon giver mening alene, er svaret som regel nej."
};

export const modul4 = {
    heading: "Vælg dine fonte",
    intro: "En font er ikke \"bare en font\". Valget signalerer en tone — roligt eller energisk, klassisk eller moderne — og det påvirker, hvor let teksten er at læse. Begge dele betyder noget for, hvordan din praksis opleves.",
    fields: [
        { id: "tilgaengelige", label: "Hvilke skrifttyper er allerede tilgængelige på det medie, du bruger — din hjemmesideplatform, dit designværktøj?" },
        { id: "fordeling", label: "Hvilken af dem passer til overskrifter, og hvilken til brødtekst?" },
        { id: "laesbarhed", label: "Er teksten let at læse, eller vælger du en skrifttype, fordi den ser flot ud på skærmen lige nu?" }
    ],
    closing: "Du skal ikke opsøge eller hente nye skrifttyper et andet sted fra — vælg blandt dem, der allerede er tilgængelige på dit medie. Det holder tingene enkle, og det er sjældent den begrænsende faktor, det føles som."
};

export const modul5 = {
    heading: "Andre grafiske byggesten",
    intro: "Ud over ikoner og fonte er der ofte andre små, tilbagevendende elementer, der er værd at være bevidst om — streger eller dividere, mønstre eller teksturer, rammer, eller den visuelle stil på knapper og opdelinger. Ligesom med farver og billeder handler det ikke om at ramme et bestemt antal. Det handler om at vide, hvilken rolle hvert element spiller — og om det bruges i den rette dosis til den rolle.",
    fields: [
        { id: "genbrugte", label: "Er der andre visuelle elementer, du allerede genbruger — bevidst eller ubevidst?" },
        { id: "mulighed", label: "Er der et sted, hvor et lille, tilbagevendende element kunne gøre dit materiale mere genkendeligt?" }
    ]
};

export const modul6 = {
    heading: "Sammenhæng med farver, logo og billeder",
    intro: "De byggesten, du nu har valgt, skal spille sammen med resten af dit visuelle udtryk — ikke stå for sig selv.",
    harArbejdet: "Spiller din valgte ikonstil, dine fonte og dine øvrige byggesten sammen med den palet og det logo, du allerede har valgt? Er der noget, der skurrer?",
    ingenAfklaring: "Du har endnu ikke arbejdet med farver eller logo. Det er helt fint — byg videre med det, du netop har valgt, som en foreløbig retning, I kan stemme af mod hinanden senere."
};

export const modul7 = {
    heading: "Tjek i praksis",
    intro: "Nu tjekker vi, at det, du har valgt, faktisk fungerer i brug — ikke kun, at det ser rigtigt ud lige nu.",
    checklist: [
        "Er teksten stor nok og til at læse, også på en mindre skærm?",
        "Er der tilstrækkelig kontrast mellem tekst og baggrund, og mellem ikon og baggrund?",
        "Fungerer ikonerne, hvis de nogle steder står uden ledsagende tekst?",
        "Er dine byggesten brugt konsekvent, der hvor du har set på dem i Modul 2?"
    ],
    notWorking: "Det er helt normalt, at noget først viser sig her. Gå tilbage og justér — det er en del af processen, ikke et tegn på, at du gjorde noget forkert."
};

export const modul8 = {
    heading: "Dokumentér",
    intro: "Tilføj dine valgte byggesten — ikonstil, fonte, og eventuelle andre elementer — til din visuelle guide.",
    documentationLabel: "Skriv 2–3 sætninger: hvilken ikonstil og hvilke fonte har du valgt, og hvordan spiller de sammen med dine øvrige valg (farver, logo, billeder)?",
    closing: "Med det her er din visuelle guide dækket på alle fire områder — farver, logo, billeder, og de mindre byggesten. Ligesom resten er den en prototype. Den må gerne udvikle sig, i takt med at din praksis gør det."
};
