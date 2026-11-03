/*---- Indhold til rummet "Billeder" (uddybende, hjem: Visuelt udtryk for din praksis) - jf. docs/duf-manuskript-billeder.md (gennemrevideret 2026-09-17 til den fulde, boble-strukturerede form - ca. 8 til 40 bobler, fordelt på de samme 8 moduler. 2026-11-03: nyt Modul 7 "Find eller skab dine billeder", så der nu er 9 moduler) ----*/

export const velkomst = {
    fraVisueltUdtryk: "Du nævnte tidligere, at du ikke er helt sikker på rettighederne til de billeder, du bruger. Det anbefaler vi altid at få styr på — uanset hvad du ellers vælger at arbejde med. Derfor starter vi der i dette rum.",
    standard: "Velkommen til Billeder. Her får du hjælp til at vælge billeder, der understøtter din praksis — og til at få styr på, hvilke rettigheder du faktisk har til dem."
};

/*---- Søgesteder til Modul 4.3/4.4 (runde 7). Samlet ét sted, så en adresse er let at rette, hvis et site ændrer sig. `soeg(ord)` bygger søgesiden med søgeordet udfyldt, `forside` bruges, når brugeren ikke har valgt et søgeord. Testet 2026-09-25: Pinterest og Google Billeder åbner med søgeordet udfyldt. Unsplash og Pexels blokerer automatiske browsere, så de to er ikke testet automatisk - adresserne følger stedernes egne søgeadresser (Unsplash bruger bindestreg mellem ordene) ----*/

export const soegesteder = [
    {
        id: "pinterest",
        knapTekst: "Søg på Pinterest",
        forside: "https://www.pinterest.com/",
        soeg: (ord) => `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(ord)}`
    },
    {
        id: "google",
        knapTekst: "Søg på Google Billeder",
        forside: "https://images.google.com/",
        soeg: (ord) => `https://www.google.com/search?udm=2&q=${encodeURIComponent(ord)}`
    },
    {
        id: "unsplash",
        knapTekst: "Søg på Unsplash",
        forside: "https://unsplash.com/",
        soeg: (ord) => `https://unsplash.com/s/photos/${encodeURIComponent(ord.trim().replace(/\s+/g, "-"))}`
    },
    {
        id: "pexels",
        knapTekst: "Søg på Pexels",
        forside: "https://www.pexels.com/",
        soeg: (ord) => `https://www.pexels.com/search/${encodeURIComponent(ord)}/`
    }
];

/*---- Fast opslagsværk ("Rettigheder"-knappen), tilgængeligt fra enhver boble fra Modul 2 og frem ----*/

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
        text: "Fra 2. august 2026 gælder nye regler i EU's AI-forordning: visse AI-genererede eller -manipulerede billeder, bl.a. deepfakes, skal tydeligt mærkes som kunstigt genereret eller manipuleret ved offentliggørelse. Kravet afhænger af, hvad billedet er, og hvordan du bruger det. Undgå desuden at uploade billeder af klienter eller andre fortrolige oplysninger til et offentligt AI-værktøj."
    }
];

/*----------------------------------------------------------------------------
 * Bobler - én flad, ordnet liste, ét objekt pr. manuskript-boble. Rækkefølgen
 * i arrayet ER rækkefølgen, brugeren møder dem i (ingen separat "next"-graf) -
 * BilledeEngine rykker blot til næste indeks, jf. docs/duf-manuskript-billeder.md.
 *
 * Fælles felter: id, modul, type, heading, nextButtonText.
 * Type-specifikke felter er dokumenteret ved hver types første forekomst.
 * 💬-guide-linjer ligger i `guideLine` - Guide-componentet er endnu ikke
 * bygget, så feltet er ren data, klar til at blive taget i brug.
 * ----------------------------------------------------------------------------
 */

/*---- Ordene i Boble 5.4, i grupper (runde 7) ----*/
const ordgrupper = [
    { label: "Ro og tryghed", words: ["Rolig", "Tryg", "Blød", "Let", "Enkel", "Harmonisk"] },
    { label: "Varme og nærvær", words: ["Varm", "Nærværende", "Personlig", "Åben", "Imødekommende", "Ægte"] },
    { label: "Natur og sanser", words: ["Naturlig", "Jordnær", "Organisk", "Sanselig", "Frisk", "Rå"] },
    { label: "Energi og kreativitet", words: ["Legende", "Kreativ", "Energisk", "Levende", "Modig", "Farverig", "Inspirerende"] },
    { label: "Stil og stemning", words: ["Elegant", "Eksklusiv", "Professionel", "Mystisk", "Poetisk"] }
].map((gruppe) => ({ label: gruppe.label, options: gruppe.words.map((ord) => ({ id: ord.toLowerCase(), text: ord })) }));

/*---- Hvilke ord fra 5.4 (ordgrupper ovenfor) der hører til hvilken stil i 6.2 (2026-11-03). Nøglen er stilens id, ordene skrives med små bogstaver som id'erne i `ordgrupper`. Et ord må gerne stå ved flere stile. "Professionel" står ikke nogen steder, fordi det ikke peger mod en bestemt stil. Bruges til noten "Ligger tæt på de ord, du valgte" i 6.2 ----*/
const stilOrdMatch = {
    varmt_naert: ["varm", "nærværende", "personlig", "åben", "imødekommende", "ægte"],
    roligt_minimalistisk: ["rolig", "tryg", "blød", "enkel", "harmonisk"],
    naturligt_jordnaert: ["naturlig", "jordnær", "organisk", "sanselig", "rå"],
    lyst_luftigt: ["let", "frisk", "åben", "enkel", "blød"],
    levende_farverigt: ["legende", "kreativ", "energisk", "levende", "modig", "farverig", "inspirerende"],
    stemningsfuldt_poetisk: ["mystisk", "poetisk", "sanselig", "elegant", "eksklusiv"]
};

/*---- Oversættelser til søgeordene i Boble 7.8 (2026-11-03). Billedbankerne virker bedst på engelsk, så brugerens ord fra 5.4 og stil fra 6.2 slås op her. Nøglen er svarets id (ordet med små bogstaver fra `ordgrupper`, eller stilens id fra 6.2), værdien er det engelske søgeord. Ret gerne i ordene her. Et ord, der ikke står på listen (fx brugerens egne ord eller "Jeg vil formulere min egen stil" i 6.2), kommer ikke med som søgeord ----*/

export const oversaettelser = {
    /*---- Stilene i 6.2 ----*/
    varmt_naert: "warm intimate",
    roligt_minimalistisk: "calm minimal",
    naturligt_jordnaert: "natural earthy",
    lyst_luftigt: "bright airy",
    levende_farverigt: "vibrant colorful",
    stemningsfuldt_poetisk: "moody poetic",

    /*---- De 30 ord i 5.4 ----*/
    rolig: "calm",
    tryg: "safe",
    blød: "soft",
    let: "airy",
    enkel: "simple",
    harmonisk: "harmonious",
    varm: "warm",
    nærværende: "mindful",
    personlig: "personal",
    åben: "open",
    imødekommende: "welcoming",
    ægte: "authentic",
    naturlig: "natural",
    jordnær: "earthy",
    organisk: "organic",
    sanselig: "sensory",
    frisk: "fresh",
    rå: "raw",
    legende: "playful",
    kreativ: "creative",
    energisk: "energetic",
    levende: "vibrant",
    modig: "bold",
    farverig: "colorful",
    inspirerende: "inspiring",
    elegant: "elegant",
    eksklusiv: "luxury",
    professionel: "professional",
    mystisk: "mystical",
    poetisk: "poetic"
};

/*---- Modulernes titler (fra manuskriptets overskrifter) og antal bobler, til navigationslinjerne (js/components/rumRamme.js). Antallet af moduler læses herfra. Modul 3 og Modul 7 forgrener sig (i Modul 3 springes 3.3 og 3.5 over uden egne billeder, i Modul 7 afhænger boblerne af valget i 7.1), så de har intet fast antal bobler ----*/

export const moduler = [
    { titel: "Hvorfor billeder betyder noget", antalBobler: 4 },
    { titel: "Billedrettigheder", antalBobler: 6 },
    { titel: "Dit udgangspunkt" },
    { titel: "Find inspiration", antalBobler: 5 },
    { titel: "Se efter mønstre", antalBobler: 4 },
    { titel: "Dit visuelle kompas", antalBobler: 5 },
    { titel: "Find eller skab dine billeder" },
    { titel: "Tjek rettigheder og kontrast i praksis", antalBobler: 7 },
    { titel: "Afprøv og dokumentér", antalBobler: 3 }
];

export const bobler = [

    /*---- Modul 1 — Hvorfor billeder betyder noget ----*/

    {
        id: "1.1", modul: 1, type: "text",
        heading: "Billeder møder os før ordene",
        paragraphs: [
            "Et billede når frem, før du har læst et eneste ord. Når nogen møder din hjemmeside, dit opslag eller din profil, begynder de at danne sig et indtryk, længe før de har læst særlig meget tekst. Billederne er en del af det allerførste møde. De giver en fornemmelse af stemningen, af mennesket bag og af det, man kan forvente at møde. Et billede skal ikke fortælle det hele. Det skal bare åbne døren."
        ],
        nextButtonText: "Lad os se lidt nærmere på det"
    },
    {
        id: "1.2", modul: 1, type: "text",
        heading: "Billeder kan noget forskelligt",
        paragraphs: [
            "Et billede kan gøre mere end bare at se godt ud. Det kan skabe en stemning. Det kan vise noget fra din praksis, så andre får en fornemmelse af, hvem du er, og hvad de møder hos dig. Og det kan understøtte noget, du gerne vil fortælle. Alle dine billeder behøver ikke gøre det samme. Det vigtigste er, at du ved, hvad du vil have dem til at gøre for dig."
        ],
        nextButtonText: "Videre"
    },
    {
        id: "1.3", modul: 1, type: "text",
        heading: "Professionelle billeder er ikke målet",
        paragraphs: [
            "Du behøver ikke professionelle billeder for at bruge billeder godt. Et godt billede kræver ikke en professionel fotograf, det rigtige kamera eller et perfekt opstillet rum. Det vigtigste er, at billedet passer til dig og den praksis, du gerne vil vise frem. Et billede må gerne være enkelt. Det må gerne være uperfekt. Og det må gerne føles som dig. Det handler ikke om at ligne alle andre. Det handler om at bruge billeder på en måde, der understøtter det, du gerne vil vise og fortælle."
        ],
        nextButtonText: "Lad os se på, hvad du allerede har"
    },
    {
        id: "1.4", modul: 1, type: "text",
        heading: "Det handler om dig",
        paragraphs: [
            "Når du bruger billeder i din praksis, skal de ikke passe ind i en bestemt opskrift. De skal hjælpe andre med at få en fornemmelse af dig, din praksis og det, du gerne vil give videre. Derfor starter vi ikke med at finde det \"rigtige\" billede. Vi starter med at undersøge, hvad du allerede har, hvad du bliver tiltrukket af, og hvad der føles rigtigt for dig. Det er den retning, vi skal begynde at finde sammen."
        ],
        guideLine: "Du skal ikke jagte det perfekte billede. Du skal finde det, der allerede er dig.",
        nextButtonText: "Lad os begynde"
    },

    /*---- Modul 2 — Billedrettigheder ----*/

    {
        id: "2.1", modul: 2, type: "text",
        heading: "Før vi finder billeder, skal vi vide, hvad vi må bruge",
        paragraphs: [
            "Det er nemt at finde billeder på nettet. Det gør dem ikke automatisk lovlige at bruge. Når du bruger et billede i din virksomhed, er der to ting, du skal have styr på: Må du bruge selve billedet? Og hvis der er genkendelige personer på det: må du vise dem i den sammenhæng, du vil bruge billedet i? Det kan lyde som en del at holde styr på. Men du behøver ikke kunne alle reglerne udenad. Vi giver dig et praktisk overblik, så du kan træffe bedre valg, næste gang du finder eller laver et billede til din praksis."
        ],
        nextButtonText: "Lad os tage det trin for trin"
    },
    {
        id: "2.2", modul: 2, type: "text",
        heading: "To ting, du skal have styr på",
        paragraphs: [
            "Når du finder et billede, du gerne vil bruge, er der to spørgsmål, du skal kunne svare på:"
        ],
        list: [
            "Har du lov til at bruge billedet? Det handler om fotografens eller skaberens rettigheder, og om hvilken tilladelse eller licens der gælder for billedet.",
            "Må du vise de personer, der er på billedet? Kan en person genkendes, kan der gælde regler for, om og hvordan billedet må bruges i din virksomhed."
        ],
        afterList: "De to spørgsmål hænger sammen, men de er ikke det samme. Gør det til en fast vane at undersøge begge dele, før et billede bliver en del af din praksis.",
        nextButtonText: "Hvad hvis jeg selv har taget billedet?"
    },
    {
        id: "2.3", modul: 2, type: "text",
        heading: "Når du selv har taget billedet",
        paragraphs: [
            "Har du selv taget billedet, har du som udgangspunkt rettighederne til selve fotografiet. Det betyder ikke, at du frit kan bruge det i alle sammenhænge. Er der genkendelige personer på billedet, skal du stadig tage stilling til, om du må vise dem i den sammenhæng, du vil bruge billedet i. Det samme gælder, hvis billedet indeholder noget, andre kan have rettigheder til. Så selv med dine egne billeder er det en god idé at stoppe op og spørge: Har jeg ret til at bruge billedet — og må jeg vise det, som jeg har tænkt mig?"
        ],
        nextButtonText: "Hvad med billeder fra andre steder?"
    },
    {
        id: "2.4", modul: 2, type: "text",
        heading: "Billeder fra andre steder",
        paragraphs: [
            "Du finder et billede på en hjemmeside, på sociale medier eller i en billedbank, som passer perfekt til det, du gerne vil vise. Her er det vigtigt at vide, hvor billedet kommer fra, og hvilke rettigheder der følger med. Et billede, du kan se på nettet, er ikke automatisk et billede, du må kopiere og bruge i din egen virksomhed. Det samme gælder billeder fra sociale medier — at de ligger offentligt tilgængeligt, gør dem ikke automatisk frie at bruge. Billedbanker fungerer anderledes: de giver dig som regel en licens til at bruge billederne på bestemte vilkår. Spørg altid: Hvor kommer billedet fra, og hvad har jeg fået lov til at gøre med det?"
        ],
        nextButtonText: "Og hvad med AI-billeder?"
    },
    {
        id: "2.5", modul: 2, type: "text",
        heading: "Hvad med AI-billeder?",
        paragraphs: [
            "AI kan også bruges til at skabe eller ændre billeder til din praksis. Her skal du både være opmærksom på rettighederne til det, du laver, og på de nye krav til gennemsigtighed. Fra 2. august 2026 gælder nye regler i EU's AI-forordning. For visse AI-genererede eller AI-manipulerede billeder — blandt andet deepfakes — skal det være tydeligt, at indholdet er kunstigt genereret eller manipuleret, når det offentliggøres. Det betyder ikke, at alle AI-billeder skal mærkes ens. Kravet afhænger af, hvad billedet er, og hvordan du bruger det. En god tommelfingerregel: Bruger du AI til at skabe eller ændre et billede, så undersøg både, hvad du har ret til at bruge — og om du skal oplyse, at billedet er AI-genereret eller manipuleret. Reglerne udvikler sig stadig. Tjek den aktuelle vejledning, når du er i tvivl."
        ],
        nextButtonText: "Lad os samle det hele"
    },
    {
        id: "2.6", modul: 2, type: "text",
        heading: "Brug billeder med omtanke",
        paragraphs: [
            "Du behøver ikke kunne alle reglerne udenad. Det vigtigste er, at det bliver en vane at stoppe op og undersøge et billede, før du bruger det. Spørg dig selv: Hvor kommer billedet fra? Har jeg lov til at bruge det? Er der genkendelige personer på det? Er der noget særligt, jeg skal være opmærksom på — for eksempel om billedet er skabt eller ændret med AI? Husk forskellen på inspiration og brug: du må gerne lade dig inspirere af billeder, du finder, uden at du nødvendigvis må bruge dem selv. Du får ikke en juridisk facitliste her. Du får et praktisk overblik, der hjælper dig med at træffe mere bevidste valg. Er du i tvivl, så undersøg det, før du bruger billedet."
        ],
        nextButtonText: "Lad os se på dit udgangspunkt"
    },

    /*---- Modul 3 — Dit udgangspunkt ----*/

    {
        id: "3.1", modul: 3, type: "imageUpload",
        bucket: "praksis",
        heading: "Lad os se på dit udgangspunkt",
        paragraphs: [
            "Du behøver ikke starte med et tomt lærred. Du har måske allerede billeder fra din praksis, nogle du er glad for, eller lidt inspiration, du har samlet undervejs. Det hele kan fortælle os noget om, hvad der allerede fungerer for dig. Før vi finder en tydelig billedretning, skal vi derfor først se på det, du allerede har. Har du billeder fra din praksis, du gerne vil arbejde videre med? Du kan tilføje dem her — og altid tilføje flere senere."
        ],
        /*---- Runde 7: variant, når velkommen-visuelt-udtryk viser, at brugeren starter fra bunden (hentUdgangspunkt()?.starterFraBunden) ----*/
        paragraphsFraBunden: [
            "Du fortalte tidligere, at du ikke har noget i brug endnu. Så har du nok heller ikke billeder, og det er helt fint. Du kan springe direkte videre. Har du alligevel nogle billeder liggende, som du gerne vil have med, kan du tilføje dem her."
        ],
        uploadLabel: "Billeder fra min praksis",
        uploadHint: "Dine billeder bliver på din enhed. De uploades ikke til en server.",
        /*---- Runde 7: vejen uden egne billeder. Valget gemmes som `harEgneBilleder` og styrer resten af Modul 3 (kunMedEgneBilleder/udenEgneBilleder nedenfor). "Jeg har tilføjet mine billeder" vises først, når mindst ét billede er tilføjet.
         * `gemSom` (2026-11-03): navnet, valget gemmes under. Udvejen i 7.10 har ikke `gemSom`, så den kan ikke komme til at slå Modul 3's forgrening om ----*/
        ingenBilleder: {
            gemSom: "harEgneBilleder",
            knapTekst: "Jeg har ikke nogen billeder endnu",
            respons: "Det er et fint sted at starte. Så tager vi udgangspunkt i det, du gerne vil vise, i stedet for det, du allerede har. Du kan altid komme tilbage og tilføje billeder senere.",
            videreTekst: "Videre"
        },
        nextButtonText: "Jeg har tilføjet mine billeder"
    },
    {
        id: "3.2", modul: 3, type: "choice",
        heading: "Har du allerede en retning?",
        paragraphs: [
            "Måske ved du allerede, hvilke billeder du vil bruge i din praksis — en bestemt stil, nogle farver eller en stemning, der går igen. Har du allerede en retning, skal du ikke starte forfra. Tag den med videre herfra, og brug de næste trin til at undersøge, om den stadig føles rigtig — og om den hænger sammen med det, du gerne vil vise. Har du ikke en tydelig retning endnu, er det helt fint. Så finder vi den sammen."
        ],
        options: [
            { id: "har_retning", text: "Jeg har en retning, jeg gerne vil bygge videre på" },
            { id: "usikker", text: "Jeg er ikke helt sikker endnu" }
        ],
        answerKey: "modul3_retning",
        nextButtonText: "Videre"
    },
    {
        id: "3.3", modul: 3, type: "text",
        kunMedEgneBilleder: true,
        heading: "Det, du allerede har, er et godt sted at starte",
        paragraphs: [
            "Kig på de billeder, du allerede har samlet fra din praksis. Du behøver ikke vurdere dem endnu. Læg bare mærke til, hvad der er der. Er der billeder af dig? Af dit rum eller det, du arbejder med? Er der detaljer, stemninger eller situationer, du allerede synes fungerer godt? Der findes ikke rigtige eller forkerte svar her. Vi skal bare begynde at få øje på, hvad du allerede viser med dine billeder."
        ],
        showImagesBucket: "praksis",
        nextButtonText: "Jeg har kigget på mine billeder"
    },
    {
        id: "3.4", modul: 3, type: "multiChoice",
        heading: "Hvad vil du gerne vise?",
        paragraphs: [
            "Når du ser på dine billeder, så læg mærke til, hvad de fortæller om din praksis. Nogle viser dig som person. Andre viser det, du laver. Nogle fanger stemningen omkring praksissen. Og nogle gør flere af delene på én gang. Du skal ikke vælge én bestemt kategori. Bare læg mærke til, hvad der fylder mest lige nu. Hvad får du øje på, når du ser på dine billeder?"
        ],
        udenEgneBilleder: {
            paragraphs: [
                "Tænk på de billeder, du gerne vil have. Hvad skal de vise om din praksis? Nogle billeder viser dig som person. Andre viser det, du laver. Nogle fanger stemningen. Og nogle gør flere af delene på én gang. Du må gerne vælge én eller kombinere flere. Det vigtige er ikke, hvor mange du vælger, men at du bliver bevidst om, hvad dine billeder skal vise, så de hænger sammen med det udtryk, du gerne vil have."
            ]
        },
        options: [
            { id: "mig", text: "Mig og mennesket bag praksissen" },
            { id: "praksis", text: "Min praksis og det, jeg tilbyder" },
            { id: "stemning", text: "Stemningen og følelsen omkring min praksis" }
        ],
        allowNote: true,
        notePlaceholder: "Vil du tilføje en kort note? (valgfrit)",
        answerKey: "modul3_hvad_vise",
        nextButtonText: "Videre"
    },
    {
        id: "3.5", modul: 3, type: "textNote",
        kunMedEgneBilleder: true,
        heading: "Hvad mangler du?",
        paragraphs: [
            "Nu har du kigget på det, du allerede har. Måske kan du se en retning i dine billeder. Måske kan du også se noget, der mangler — billeder af dig selv, billeder der viser din praksis, eller den stemning, du gerne vil skabe. Du behøver ikke løse det endnu. Bare læg mærke til, hvis der er noget, du savner, når du ser på din samling. Er der noget, du gerne ville kunne vise med dine billeder, som du ikke kan se endnu?"
        ],
        fields: [{ id: "mangler", placeholder: "Skriv en kort note (valgfrit)" }],
        answerKey: "modul3_mangler",
        nextButtonText: "Videre"
    },
    {
        id: "3.6", modul: 3, type: "text",
        heading: "Du behøver ikke have det hele på plads",
        paragraphs: [
            "Du har måske allerede en klar idé om dine billeder — eller bare nogle få, du kan lide. Eller også ved du mest, hvad du ikke vil have. Alt det er et fint udgangspunkt. I næste modul kigger vi ud over din egen praksis efter inspiration. Ikke for at finde nogen, du skal kopiere, men for at opdage, hvad du selv bliver draget af. Din retning behøver ikke være færdig endnu. Den skal bare begynde at tegne sig."
        ],
        nextButtonText: "Find inspiration"
    },

    /*---- Modul 4 — Find inspiration ----*/

    {
        id: "4.1", modul: 4, type: "multiChoice",
        heading: "Hvad bliver du draget af?",
        paragraphs: [
            "Nu skal vi kigge lidt ud over din egen praksis. Du skal ikke finde billeder, du kan bruge. Du skal bare finde billeder, der får dig til at stoppe op. Det kan være en bestemt stemning, måden mennesker bliver vist på, eller farver, lys og omgivelser. Du behøver heller ikke vide, hvorfor du kan lide et billede endnu. Vi skal først finde ud af, hvad dine øjne bliver tiltrukket af. Hvad har du mest lyst til at undersøge?"
        ],
        options: [
            { id: "stemning", text: "🌿 Stemning og følelse" },
            { id: "mennesker", text: "👤 Mennesker og portrætter" },
            { id: "rum", text: "🏡 Rum og omgivelser" },
            { id: "farver", text: "🎨 Farver, lys og visuel stil" }
        ],
        answerKey: "modul4_kategorier",
        nextButtonText: "Giv mig nogle søgeord"
    },
    {
        id: "4.2", modul: 4, type: "keywordPicker",
        heading: "Få nogle søgeord at starte med",
        paragraphs: [
            "Det kan være svært at finde inspiration, hvis du bare søger på \"gode billeder\". Derfor får du her nogle søgeord, du kan tage udgangspunkt i. Du behøver ikke bruge dem alle — vælg dem, der føles interessante, og se, hvor de fører dig hen."
        ],
        groups: [
            { label: "🌿 Stemning og følelse", words: ["calm wellness photography", "warm natural atmosphere", "quiet cozy space", "soft natural light"] },
            { label: "👤 Mennesker og portrætter", words: ["natural professional portrait", "authentic portrait photography", "candid portrait natural light", "relaxed professional woman"] },
            { label: "🏡 Rum og omgivelser", words: ["cozy therapy room", "warm natural interior", "small creative studio", "calm treatment room"] },
            { label: "🎨 Farver, lys og visuel stil", words: ["warm neutral photography", "earthy color photography", "muted pastel photography", "bold colorful photography"] }
        ],
        afterList: "Du kan også oversætte søgeordene til dansk eller kombinere flere af dem. Det vigtigste er ikke at finde det perfekte billede. Det er at finde noget, der får dig til at stoppe op.",
        answerKey: "valgteSoegeord",
        nextButtonText: "Hvor skal jeg lede?"
    },
    {
        id: "4.3", modul: 4, type: "soegesteder",
        heading: "Hvor vil du lede?",
        paragraphs: [
            "Nu har du nogle søgeord at starte med. Så skal vi finde det sted, der passer bedst til det, du gerne vil undersøge. Tryk på et af stederne herunder. Det åbner i et nyt vindue, og dine søgeord er allerede sat ind, så du kan gå direkte i gang. Kom tilbage hertil, når du har fundet noget, der fanger dig."
        ],
        /*---- Runde 7: forklaringen på de tre slags steder. Selve knapperne og deres adresser ligger i `soegesteder` øverst i filen. Det valgte sted gemmes ikke ----*/
        steder: [
            { navn: "Pinterest", tekst: "godt, hvis du vil gå på opdagelse i stemninger, farver og visuelle udtryk. Her kan ét billede hurtigt føre dig videre til mange andre." },
            { navn: "Google Billeder", tekst: "godt, hvis du vil se bredt og finde andre virksomheder, profiler eller universer, du bliver inspireret af." },
            { navn: "Stockfotos (Unsplash og Pexels)", tekst: "Stockfotos er billeder, som fotografer lægger ud i en billedbank, så andre kan bruge dem på bestemte vilkår. Nogle er gratis, andre koster penge. De er gode, hvis du vil se forskellige måder at fotografere mennesker, rum, detaljer og stemninger på." }
        ],
        afterList: "Husk: Lige nu leder vi efter inspiration, ikke efter billeder, du nødvendigvis må bruge. Hvad du må bruge, kigger vi på i Modul 8.",
        nextButtonText: "Jeg er klar til at gemme det, jeg har fundet"
    },
    {
        id: "4.4", modul: 4, type: "imageUpload",
        bucket: "inspiration",
        heading: "Saml det, der fanger dig",
        paragraphs: [
            "Nu er det tid til at gå på opdagelse. Brug søgeordene som inspiration, men lad dig også føre videre af det, du finder. Du skal ikke tænke for meget over, om et billede passer til din praksis endnu. Når noget får dig til at stoppe op, så gem det i Min inspiration. Prøv at samle 5–10 billeder. De må gerne være forskellige — det kan faktisk være en fordel. Læg mærke til, hvad du bliver ved med at vende tilbage til."
        ],
        visSoegelinje: true,
        uploadLabel: "Min inspiration",
        uploadHint: "Tilføj billeder via upload eller screenshot. Dine billeder bliver på din enhed. De uploades ikke til en server.",
        minImages: 5,
        gatedHint: "Saml mindst 5 billeder for at gå videre.",
        nextButtonText: "Jeg har samlet mine billeder"
    },
    {
        id: "4.5", modul: 4, type: "text",
        heading: "Din inspirationssamling er dit råmateriale",
        paragraphs: [
            "Nu har du samlet billeder, som på den ene eller anden måde fangede dig. Lad dem være her lidt endnu. Du behøver ikke beslutte, hvad de betyder, eller om de passer sammen — det skal vi nok komme til. Din inspirationssamling er dit råmateriale. Herfra begynder vi at opdage de mønstre, der allerede ligger gemt i det, du har valgt. Tag et sidste kig på din samling. Er der billeder, du har lyst til at blive ved med at kigge på? Er der nogle, der overrasker dig? Der er ikke noget, du skal ændre endnu. Bare læg mærke til det."
        ],
        showImagesBucket: "inspiration",
        guideLine: "Du behøver ikke vide, hvad billederne betyder endnu. Det er nok, at du ved, du bliver ved med at kigge på dem.",
        nextButtonText: "Lad os se efter mønstre"
    },

    /*---- Modul 5 — Se efter mønstre ----*/

    {
        id: "5.1", modul: 5, type: "multiChoice",
        heading: "Hvad er det, du lægger mærke til?",
        paragraphs: [
            "Her er din inspirationssamling. Kig på billederne igen. Denne gang skal du se efter, hvad de har til fælles — farverne, lyset, menneskerne, rummene, eller måden billederne føles på. Du behøver ikke kunne sætte det rigtige ord på endnu. Hvad er det første, dine øjne falder på, når du ser din samling?"
        ],
        options: [
            { id: "farver", text: "Farver" },
            { id: "lys", text: "Lys" },
            { id: "mennesker", text: "Mennesker" },
            { id: "rum", text: "Rum og omgivelser" },
            { id: "stemning", text: "Stemning" },
            { id: "komposition", text: "Komposition og detaljer" },
            { id: "andet", text: "Noget andet" }
        ],
        allowNote: true,
        notePlaceholder: "Vil du tilføje en kort note? (valgfrit)",
        visBilleder: ["inspiration"],
        answerKey: "modul5_elementer",
        nextButtonText: "Lad os se på, hvad billeder kan gøre"
    },
    {
        id: "5.2", modul: 5, type: "multiChoice",
        heading: "Et billede kan have forskellige opgaver",
        paragraphs: [
            "Nu skal vi kigge på, hvad billederne faktisk gør. Et billede kan sagtens gøre flere ting på én gang — der er ikke én rigtig måde at bruge billeder på. Det vigtige er at begynde at opdage, hvad du gerne vil have dine billeder til at gøre for dig."
        ],
        options: [
            { id: "stemning", text: "Skabe stemning", description: "Billedet er der først og fremmest for at skabe en stemning." },
            { id: "praksis", text: "Vise min praksis", description: "Billedet hjælper med at vise dig og din praksis." },
            { id: "fortaelling", text: "Understøtte det, jeg fortæller", description: "Billedet understøtter noget, du fortæller." }
        ],
        answerKey: "modul5_roller",
        nextButtonText: "Lad os se nærmere på min samling"
    },
    {
        id: "5.3", modul: 5, type: "multiChoice",
        heading: "Hvad går igen?",
        paragraphs: [
            "Kig nu på din inspirationssamling som en helhed. Du har allerede valgt billederne, fordi der var noget ved dem, der fangede dig. Nu skal vi prøve at finde mønstrene. Prøv at finde 2–3 ting, der går igen. Det behøver ikke være de samme ting, du lagde mærke til før — du er bare på jagt efter det, der begynder at tegne en fælles retning."
        ],
        options: [
            { id: "blodt_lys", text: "Et blødt lys, der går igen" },
            { id: "bestemte_farver", text: "Bestemte farver" },
            { id: "meget_luft", text: "Meget luft omkring motiverne" },
            { id: "rolig", text: "En rolig følelse" },
            { id: "levende", text: "En levende følelse" },
            { id: "naturlig", text: "En naturlig følelse" },
            { id: "opstillet", text: "En mere opstillet følelse" }
        ],
        allowNote: true,
        notePlaceholder: "Skriv dine egne observationer (valgfrit)",
        resultHeading: "Det går igen i min inspiration",
        visBilleder: ["inspiration"],
        answerKey: "modul5_moenstre",
        nextButtonText: "Hvad fortæller det om min retning?"
    },
    {
        id: "5.4", modul: 5, type: "multiChoice",
        heading: "Hvad fortæller det om dig?",
        paragraphs: [
            "De mønstre, du har fundet, siger ikke kun noget om billeder. De siger også noget om, hvordan du gerne vil opleves. Prøv at sætte nogle få ord på den følelse eller oplevelse, du gerne vil give videre gennem dine billeder. Hvordan vil du gerne have, at det føles at møde din praksis visuelt? Du kan vælge op til 3 ord. Du må også gerne skrive dine egne.",
            "Der er ikke noget rigtigt eller forkert valg. Vælg de ord, der føles mest som den oplevelse, du gerne vil skabe. Du må gerne vælge ord fra forskellige grupper."
        ],
        /*---- Runde 7: samme 30 ord som før, sorteret i fem grupper. `options` er den flade liste, som motoren slår svarene op i ----*/
        groups: ordgrupper,
        options: ordgrupper.flatMap((gruppe) => gruppe.options),
        resultAtTop: true,
        maxSelect: 3,
        noteCountsTowardMax: true,
        allowNote: true,
        notePlaceholder: "Skriv dine egne ord (valgfrit)",
        resultHeading: "Sådan vil jeg gerne opleves",
        answerKey: "modul5_ord",
        nextButtonText: "Lad os finde min visuelle retning"
    },

    /*---- Modul 6 — Dit visuelle kompas ----*/

    {
        id: "6.1", modul: 6, type: "text",
        heading: "Alt det, du har fundet, peger et sted hen",
        paragraphs: [
            "Du har nu kigget på dine egne billeder, samlet inspiration og fundet mønstre, der går igen. Og du har sat ord på, hvordan du gerne vil opleves. Det er ikke tilfældige observationer. Det er byggestenene i din billedretning. Her samler vi dem til noget, du faktisk kan bruge, næste gang du skal vælge, tage eller bede om et billede."
        ],
        udenEgneBilleder: {
            paragraphs: [
                "Du har nu samlet inspiration og fundet mønstre, der går igen. Og du har sat ord på, hvordan du gerne vil opleves. Det er ikke tilfældige observationer. Det er byggestenene i din billedretning. Her samler vi dem til noget, du faktisk kan bruge, næste gang du skal vælge, tage eller bede om et billede."
            ]
        },
        guideLine: "Du skal ikke finde svaret et helt nyt sted fra. Det ligger allerede i det, du har kigget på.",
        nextButtonText: "Lad os gøre det konkret"
    },
    {
        id: "6.2", modul: 6, type: "choice",
        heading: "Hvilken stil passer til dig?",
        paragraphs: [
            "Ud fra dine ord og mønstre — hvilken stil passer bedst til din praksis? Der er ikke én rigtig stil. Det vigtige er, at du kan svare på, hvorfor den, du vælger, passer til dig."
        ],
        /*---- 2026-11-03: fire nye stile. Id'erne varmt_naert, roligt_minimalistisk og andet er de samme som før, så gemte svar stadig passer. Hver stil har en kort `description` under navnet ----*/
        options: [
            { id: "varmt_naert", text: "Varmt og nært", description: "Bløde farver, nærvær og mennesker tæt på. Billeder, der føles som et kram." },
            { id: "roligt_minimalistisk", text: "Roligt og minimalistisk", description: "Meget luft, få elementer og dæmpede farver. Billeder, der giver ro i øjnene." },
            { id: "naturligt_jordnaert", text: "Naturligt og jordnært", description: "Dagslys, naturmaterialer, planter og jordfarver. Billeder, der føles ægte og uopstillede." },
            { id: "lyst_luftigt", text: "Lyst og luftigt", description: "Masser af lys, hvide og lyse toner og en let, frisk stemning. Billeder, der føles åbne." },
            { id: "levende_farverigt", text: "Levende og farverigt", description: "Klare farver, bevægelse og glæde. Billeder med energi og personlighed." },
            { id: "stemningsfuldt_poetisk", text: "Stemningsfuldt og poetisk", description: "Dybe skygger, varmt lys og detaljer. Billeder, der vækker en følelse eller lidt mystik." },
            { id: "andet", text: "Jeg vil formulere min egen stil" }
        ],
        freeTextOptionId: "andet",
        freeTextPlaceholder: "Beskriv din stil med dine egne ord",
        /*---- `stilOrdMatch`: hvilke ord fra 5.4 der passer til hvilken stil. Har præcis én stil flest af brugerens valgte ord, får den `taetPaaTekst` under sig. Står flere lige, vises ingen note (billederEngine.js, stileTaetPaaOrd) ----*/
        stilOrdMatch,
        taetPaaTekst: "Ligger tæt på de ord, du valgte",
        answerKey: "modul6_stil",
        nextButtonText: "Videre"
    },
    {
        id: "6.3", modul: 6, type: "textNote",
        heading: "Hvad hører til — og hvad gør ikke?",
        paragraphs: [
            "En billedretning handler lige så meget om, hvad der ikke hører til, som om hvad der gør. Kig på dine motiver: er der noget, du gerne vil vise mere af — dig selv, dit rum, dine klienter, detaljer fra din praksis? Og er der noget, du helst vil undgå — for eksempel bestemte motiver, situationer eller stemninger, der ikke føles som dig? Du behøver ikke ramme den perfekte liste. Bare få de tydeligste af sted."
        ],
        fields: [
            { id: "horer_til", label: "Det her hører til", placeholder: "Fx dig selv, dit rum, detaljer fra din praksis ..." },
            { id: "horer_ikke_til", label: "Det her hører ikke til", placeholder: "Fx motiver eller stemninger, der ikke føles som dig ..." }
        ],
        answerKey: "modul6_motiver",
        nextButtonText: "Videre"
    },
    {
        id: "6.4", modul: 6, type: "paletteCompare",
        heading: "Hænger det sammen med dine farver?",
        paragraphs: [
            "Har du allerede arbejdet med Farver et andet sted i din visuelle guide, kan det være værd at kigge på, om dine billeder spiller sammen med den palet. Det behøver ikke betyde, at billederne skal indeholde de samme farver. Men det er værd at lægge mærke til, om stemningen i dine billeder og stemningen i dine farver trækker i samme retning. Har du ikke arbejdet med Farver endnu, kan du roligt springe dette trin over — I kan vende tilbage til det senere."
        ],
        options: [
            { id: "haenger_sammen", text: "Ja, det hænger fint sammen" },
            { id: "usikker", text: "Jeg er ikke sikker" },
            { id: "traekker_hver_vej", text: "Det trækker i hver sin retning" }
        ],
        skipButtonText: "Spring over — jeg har ikke arbejdet med farver endnu",
        answerKey: "modul6_farve_sammenhaeng",
        nextButtonText: "Videre"
    },
    {
        id: "6.5", modul: 6, type: "compassSummary",
        heading: "Dit visuelle kompas",
        paragraphs: [
            "Her er dit visuelle kompas for billeder, samlet ud fra det, du har arbejdet med i dette rum. Det er ikke en facitliste, du skal følge slavisk. Det er noget, du kan vende tilbage til, næste gang du er i tvivl om et billede passer til dig."
        ],
        guideLine: "Dit kompas peger ikke på ét rigtigt billede. Det peger på en retning, du kan bruge igen og igen.",
        nextButtonText: "Find eller skab dine billeder"
    },

    /*---- Modul 7 — Find eller skab dine billeder (nyt 2026-11-03, jf. docs/duf-manuskript-billeder.md).
     * Valget i 7.1 gemmes som `modul7_vej` ("selv", "find" eller "begge") og styrer resten af modulet:
     * - `kunVej`: boblen vises kun, når brugerens vej står i listen. Ellers springes den over (billederEngine.js, springesOver).
     * - `prVej`: felter, der erstatter boblens egne for en bestemt vej, fx en anden knaptekst. `indledning` sættes ind som første afsnit (billederEngine.js, tilpasBoble) ----*/

    {
        id: "7.1", modul: 7, type: "choice",
        heading: "Hvordan vil du skaffe dine billeder?",
        paragraphs: [
            "Nu ved du, hvilken retning dine billeder skal pege i. Næste skridt er at få fat i billeder, du rent faktisk kan bruge. Det kan du gøre på to måder: Du kan selv tage dem, eller du kan finde dem i en billedbank. Ingen af vejene er mere rigtige end den anden. Billeder, du selv tager, viser dig og din praksis, som den er. Billeder fra en billedbank kan give dig stemninger og motiver, som er svære at skabe selv. Mange ender med at bruge lidt af hvert, og det er helt fint. Vælg den vej, der føles mest realistisk for dig lige nu. Du kan altid komme tilbage og prøve den anden."
        ],
        options: [
            { id: "selv", text: "📱 Jeg vil selv tage billeder" },
            { id: "find", text: "🔎 Jeg vil finde billeder i en billedbank" },
            { id: "begge", text: "🌿 Lidt af begge dele" }
        ],
        answerKey: "modul7_vej",
        nextButtonText: "Videre"
    },

    /*---- Gren A — Tag dine egne billeder (vises ved "selv" og "begge") ----*/

    {
        id: "7.2", modul: 7, type: "text",
        kunVej: ["selv", "begge"],
        heading: "Din mobil er nok",
        paragraphs: [
            "Du behøver ikke et dyrt kamera for at tage gode billeder til din praksis. Den telefon, du har i lommen, kan mere, end de fleste tror. Det handler ikke om at blive fotograf. Det handler om at kende nogle få greb, der gør en stor forskel. Start med de helt små ting, før du tager billedet:"
        ],
        list: [
            "Tør linsen af. Et fingeraftryk kan gøre et ellers fint billede sløret og mat.",
            "Slå gitterlinjerne til i kameraets indstillinger. De hjælper dig med at placere motivet, og vi bruger dem om lidt.",
            "Gå tættere på i stedet for at zoome. Når du zoomer med fingrene, bliver billedet ofte grynet. Brug hellere fødderne.",
            "Tryk på skærmen, der hvor det vigtigste er. Så ved telefonen, hvad den skal stille skarpt på, og du kan ofte justere lyset ved at trække op eller ned."
        ],
        afterList: "Portrættilstand kan være fin til billeder af dig selv, fordi baggrunden bliver blød. Men den kan også give mærkelige kanter omkring hår og hænder, så se billedet efter, før du bruger det.",
        nextButtonText: "Hvad med lyset?"
    },
    {
        id: "7.3", modul: 7, type: "text",
        kunVej: ["selv", "begge"],
        heading: "Lyset gør det meste af arbejdet",
        paragraphs: [
            "Hvis du kun tager én ting med herfra, så lad det være lyset. Det er ofte det, der afgør, om et billede føles roligt og indbydende eller fladt og hårdt. Det bedste lys er tit det, du allerede har: dagslys fra et vindue. Stil dig eller dit motiv med siden eller fronten mod vinduet, så lyset falder blødt ind. Undgå at stå med ryggen til vinduet, for så bliver du en mørk skygge mod en lys baggrund. Overskyede dage er faktisk en gave, fordi lyset bliver jævnt og blødt. Prøv også at slukke loftslampen, hvis den giver gule eller hårde skygger.",
            "Kig derefter på baggrunden. Ting, du ikke lægger mærke til i hverdagen, bliver pludselig tydelige på et billede: en ledning, en stak papirer, en vasketøjskurv i hjørnet. Fjern det, der trækker opmærksomheden væk. Du behøver ikke et perfekt rum. Du skal bare give motivet lidt plads."
        ],
        nextButtonText: "Hvordan sætter jeg billedet sammen?"
    },
    {
        id: "7.4", modul: 7, type: "text",
        kunVej: ["selv", "begge"],
        heading: "Placér motivet med omtanke",
        paragraphs: [
            "Kan du huske gitterlinjerne? De deler skærmen i ni felter. Prøv at placere det vigtigste i billedet, fx dit ansigt, en hånd eller en kop te, der hvor linjerne krydser hinanden, i stedet for lige i midten. Det kaldes tredjedelsreglen, og det giver ofte et billede, der føles mere levende og naturligt. Lad også gerne motivet få lidt luft omkring sig. Luft er ikke spildplads. Den giver ro, og den giver plads til tekst, hvis du senere vil skrive noget oven på billedet.",
            "Når du først er i gang, så tag flere billeder af det samme, men på forskellige måder. Gå tæt på en detalje, tag et billede på mellemafstand, og tag et, hvor man ser hele rummet. Prøv at sætte dig ned, eller tag billedet lidt oppefra. Det giver dig variation at vælge imellem, og det er tit et af de billeder, du ikke regnede med, der bliver det bedste."
        ],
        nextButtonText: "Hvad skal jeg tage billeder af?"
    },
    {
        id: "7.5", modul: 7, type: "checklist",
        kunVej: ["selv", "begge"],
        heading: "Din billedliste",
        paragraphs: [
            "I dit visuelle kompas skrev du, hvad der hører til i dine billeder. Det er din billedliste. Brug den som udgangspunkt, når du skal ud at fotografere, så du ikke står og tænker \"hvad skal jeg egentlig tage billeder af?\". Herunder er nogle forslag, du kan supplere med. Du behøver ikke tage dem alle på én dag. Sæt flueben, efterhånden som du får dem."
        ],
        /*---- `visEgetSvar`: viser brugerens eget svar fra en tidligere boble øverst, hvis det findes. Her "Det her hører til" fra 6.3 ----*/
        visEgetSvar: { answerKey: "modul6_motiver", felt: "horer_til", tekst: "Du skrev, at det her hører til:" },
        gemNoegle: "billeder-modul7-billedliste",
        tjeklisteTitel: "Din billedliste",
        punkter: [
            { id: "dig", tekst: "Et billede af dig, hvor du ser ud, som du gør, når du tager imod en klient" },
            { id: "rum", tekst: "Dit rum eller det sted, du arbejder" },
            { id: "detalje", tekst: "En detalje: et redskab, en plante, en tekop, noget der fortæller om din praksis" },
            { id: "haender", tekst: "Dine hænder i gang med noget, du gør i dit arbejde" },
            { id: "stemning", tekst: "Et stemningsbillede, der rammer de ord, du valgte om, hvordan du vil opleves" }
        ],
        afterList: "Skal der være klienter eller andre genkendelige personer med, så vent med at bruge billederne, til du har læst om samtykke i næste modul.",
        nextButtonText: "Videre"
    },
    {
        id: "7.6", modul: 7, type: "text",
        kunVej: ["selv", "begge"],
        heading: "Når en anden holder kameraet",
        paragraphs: [
            "Det er svært at tage gode billeder af sig selv. Måske beder du en veninde om hjælp, eller måske vælger du at få en fotograf ud på et tidspunkt. Uanset hvem det er, kan dit visuelle kompas gøre en stor forskel. Vis dem din stil, de ord, du gerne vil give videre, og listen over, hvad der hører til, og hvad der ikke gør. Så skal de ikke gætte, og du får billeder, der ligner dig og ikke bare deres idé om dig. Husk også at aftale, hvem der har rettighederne til billederne, især hvis du betaler en fotograf. Det tjekker vi nærmere i næste modul."
        ],
        nextButtonText: "Jeg er klar til at samle mine billeder",
        prVej: {
            begge: { nextButtonText: "Lad os se på billedbankerne" }
        }
    },

    /*---- Gren B — Find billeder i en billedbank (vises ved "find" og "begge") ----*/

    {
        id: "7.7", modul: 7, type: "text",
        kunVej: ["find", "begge"],
        heading: "Fra inspiration til billeder, du må bruge",
        paragraphs: [
            "I Modul 4 ledte du efter inspiration, altså billeder, der fik dig til at stoppe op, uanset hvor de kom fra. Nu skal du lede efter noget andet: billeder, du faktisk må bruge i din praksis. Derfor leder vi kun i billedbanker, hvor fotograferne har givet lov til, at andre bruger billederne på bestemte vilkår. Nogle billedbanker er gratis, som Unsplash og Pexels. Andre koster penge, til gengæld har de ofte flere billeder at vælge imellem og mere præcise licenser. Begge dele kan være gode valg. Vilkårene er forskellige fra sted til sted, men det skal du ikke tænke på lige nu. Det tjekker vi sammen i næste modul."
        ],
        prVej: {
            begge: { indledning: "Nu har du set, hvordan du selv kan tage billeder. Lad os se på den anden vej." }
        },
        nextButtonText: "Hvordan søger jeg?"
    },
    {
        id: "7.8", modul: 7, type: "soegesteder",
        kunVej: ["find", "begge"],
        heading: "Søg med dit kompas",
        paragraphs: [
            "Billedbankerne virker bedst på engelsk, så søgeordene herunder er på engelsk. De er sat sammen ud fra de ord, du valgte om, hvordan du vil opleves, og den stil, du valgte i dit kompas. Prøv at kombinere en stemning med et motiv, fx \"calm\" sammen med \"treatment room\" eller \"warm\" sammen med \"hands\". Jo mere præcist du søger, jo mindre skal du rode i billeder, der ikke passer. Finder du ikke noget, så prøv et synonym. \"Calm\" kan også være \"peaceful\", \"quiet\" eller \"serene\".",
            "Du vil hurtigt opdage, at ikke alle billeder i søgningen er gratis, selvom siderne er kendt for gratis billeder. Der er betalingsbilleder blandet ind imellem, fx markeret som Unsplash+ eller som billeder fra andre billedbanker. Det er helt normalt, og du skal ikke lade dig slå ud af det. Spring dem bare over, eller filtrér søgningen, så du kun ser de gratis billeder. Vil en af siderne ikke åbne, så prøv igen lidt senere, eller brug den anden i mellemtiden."
        ],
        /*---- `kunSoegesteder`: viser kun disse søgesteder fra `soegesteder` øverst i filen. `soegeordFraKompas`: søgeordene bygges af 6.2 og 5.4 via `oversaettelser` nedenfor i stedet for at være 4.2's søgeord ----*/
        kunSoegesteder: ["unsplash", "pexels"],
        soegeordFraKompas: true,
        nextButtonText: "Hvordan vælger jeg mellem alle billederne?"
    },
    {
        id: "7.9", modul: 7, type: "text",
        kunVej: ["find", "begge"],
        heading: "Undgå det generiske",
        paragraphs: [
            "Du kender dem sikkert: den smilende kvinde med headset, den perfekte sten på stranden, hænderne, der danner et hjerte. De billeder er brugt så mange gange, at øjet glider hen over dem. Det skal dine billeder helst ikke. Se efter billeder, der føles lidt mere ægte. Det kan være naturligt lys i stedet for kunstigt, mennesker, der ikke kigger direkte ind i kameraet, og detaljer frem for store opstillede scener. Bladr gerne lidt længere ned i søgeresultaterne. De mest brugte billeder ligger tit øverst.",
            "Når du har fundet nogle bud, så hold dem op mod dit kompas. Passer billedet til din stil? Rammer det de ord, du gerne vil give videre? Viser det noget, der hører til, eller noget, du skrev, at du vil undgå? Og kunne billedet give et forkert indtryk af din praksis, fx ved at love et resultat, du ikke kan stå inde for? Er svaret i tvivl, er det som regel ikke det rigtige billede."
        ],
        nextButtonText: "Jeg er klar til at samle mine billeder"
    },

    /*---- Fælles afslutning (vises for alle) ----*/

    {
        id: "7.10", modul: 7, type: "imageUpload",
        bucket: "udvalgte",
        heading: "Saml dine udvalgte billeder",
        paragraphs: [
            "Nu er det tid til at samle de billeder, du gerne vil arbejde videre med. Vælg 3-5 billeder, som du har taget selv, fundet i en billedbank eller begge dele. De behøver ikke være perfekte. De skal bare pege i retning af dit kompas. Det er de billeder, vi tjekker for rettigheder og kontrast i næste modul, så du ved, at du trygt kan bruge dem."
        ],
        uploadLabel: "Mine udvalgte billeder",
        uploadHint: "Dine billeder bliver på din enhed. De uploades ikke til en server.",
        minImages: 3,
        gatedHint: "Saml mindst 3 billeder for at gå videre.",
        /*---- Udvej som i 3.1, men uden `gemSom`: den gemmer intet og ændrer ingen vej. Knappen vises, så længe der er færre end `minImages` billeder ----*/
        ingenBilleder: {
            knapTekst: "Jeg har ikke billederne endnu",
            respons: "Det er helt i orden. Nogle gange tager det lidt tid at få taget eller fundet de rigtige billeder. Du kan fortsætte nu og bruge tjeklisten i næste modul, når du har dem. Du kan altid komme tilbage og tilføje dem her.",
            videreTekst: "Videre"
        },
        nextButtonText: "Jeg har samlet mine billeder"
    },
    {
        id: "7.11", modul: 7, type: "text",
        heading: "Fra idé til billeder i hånden",
        paragraphs: [
            "Kig på dine udvalgte billeder. For lidt siden var din billedretning noget, du havde sat ord på. Nu er den begyndt at blive til billeder, du kan bruge. Det er et stort skridt, også selvom billederne ikke er færdige eller perfekte. Inden de kommer ud i verden, skal vi lige tjekke to ting: at du må bruge dem, og at de fungerer, der hvor du vil sætte dem ind."
        ],
        showImagesBucket: "udvalgte",
        guideLine: "Du behøver ikke have alle dine billeder i dag. Du skal bare have dem, der får dig i gang.",
        nextButtonText: "Videre til rettigheder og kontrol"
    },

    /*---- Modul 8 — Tjek rettigheder og kontrast i praksis (hed Modul 7 før 2026-11-03. Gemmenøglerne `billeder-modul7-rettigheder` og `modul7_kontrast` har bevidst beholdt deres gamle navne, så brugere, der allerede er i gang, ikke mister deres svar) ----*/

    {
        id: "8.1", modul: 8, type: "text",
        heading: "Nu tjekker vi det i praksis",
        paragraphs: [
            "Du har nu billeder, du gerne vil bruge. Før de kommer ud i verden, skal vi lige to ting efter: at du må bruge dem, og at de fungerer visuelt, der hvor du sætter dem ind. Det er ikke en ekstra forhindring. Det er den sidste praktiske del af arbejdet, så du kan bruge dine billeder uden at skulle tvivle bagefter. Tag gerne dine udvalgte billeder med igennem tjeklisten, ét ad gangen."
        ],
        nextButtonText: "Lad os tage rettighederne først"
    },
    {
        id: "8.2", modul: 8, type: "checklist",
        heading: "Din tjekliste, før du bruger et billede",
        paragraphs: [
            "Uanset hvor billedet kommer fra, kan de samme spørgsmål hjælpe dig med at tjekke, om du er på sikker grund. Kan du ikke svare sikkert på det hele, er det bedre at vælge et andet billede eller indhente en konkret tilladelse, end at gætte."
        ],
        gemNoegle: "billeder-modul7-rettigheder",
        punkter: [
            { id: "kilde", tekst: "Hvor kommer billedet fra?" },
            { id: "tilladelse", tekst: "Har du selv taget det, fået tilladelse, eller en licens?" },
            { id: "daekker_brug", tekst: "Dækker tilladelsen den konkrete brug — for eksempel din hjemmeside, sociale medier eller en annonce?" },
            { id: "genkendelige_personer", tekst: "Er der personer på billedet, som kan genkendes?" },
            { id: "lovligt_grundlag", tekst: "Har du et lovligt og dokumenterbart grundlag for at vise dem?" },
            { id: "foelsomme_oplysninger", tekst: "Kan billedet afsløre eller antyde følsomme oplysninger — for eksempel om en klients helbred?" },
            { id: "kreditering", tekst: "Skal fotografen eller en anden rettighedshaver krediteres?" },
            { id: "dokumentation", tekst: "Har du gemt dokumentation for tilladelsen eller licensen?" },
            { id: "forkert_indtryk", tekst: "Kan billedet give et forkert indtryk af din praksis, dine resultater eller en persons situation?" }
        ],
        nextButtonText: "Lad os se nærmere på personer på billeder"
    },
    {
        id: "8.3", modul: 8, type: "text",
        heading: "Når der er mennesker på billedet",
        paragraphs: [
            "Er der en genkendelig person på billedet, er det ikke kun et spørgsmål om ophavsret. Et billede af en person er en personoplysning, og du skal have et lovligt grundlag for at gemme, bruge og vise det — også selvom du selv har taget billedet. Den mest sikre og respektfulde løsning er et tydeligt, dokumenteret samtykke. Personen skal vide: hvilket billede du vil bruge, hvad det skal bruges til, hvor det bliver vist, hvor længe du forventer at bruge det, og hvordan samtykket kan trækkes tilbage. Samtykket skal være frivilligt — det må aldrig være en betingelse for at modtage en behandling. Optræder nogen bare tilfældigt i baggrunden, kan vurderingen være en anden. Er du i tvivl, så beskær billedet, slør personen, eller vælg et andet. Har du billeder af en klient, skal du være ekstra opmærksom: de kan afsløre eller antyde noget om en persons helbred. Her bør samtykket altid være skriftligt og knyttet til den konkrete brug — et \"ja\" til et opslag på Instagram er ikke automatisk et \"ja\" til en annonce eller en permanent plads på din hjemmeside. Fortæl klienten, hvordan de kan trække samtykket tilbage, og fjern billedet, hvis de gør."
        ],
        nextButtonText: "Hvad hvis billedet kommer fra en billedbank eller nettet?"
    },
    {
        id: "8.4", modul: 8, type: "text",
        heading: "Billedbanker og billeder fra nettet",
        paragraphs: [
            "Kommer billedet fra en billedbank, betyder \"gratis\" ikke \"uden betingelser\". Tjek altid, om billedet må bruges kommercielt, om nogen skal krediteres, om det må redigeres — og vær ekstra opmærksom, hvis der er personer på billedet i en sundheds- eller behandlingssammenhæng. Har du betalt for billedet, giver det kun de rettigheder, licensen faktisk nævner. Gem kvittering, licenstekst og billedets ID, så du kan dokumentere din brugsret senere. Har du fundet billedet et andet sted på nettet, er det som udgangspunkt beskyttet — også uden et synligt copyright-mærke. En kildeangivelse er ikke det samme som en tilladelse. Har billedet en Creative Commons-licens, betyder bogstaverne noget:"
        ],
        list: [
            "BY — du skal kreditere ophaveren.",
            "NC — må ikke bruges kommercielt.",
            "ND — må ikke redigeres.",
            "SA — din bearbejdede version skal deles under samme licens.",
            "CC0 — fri til brug."
        ],
        /*---- To afsnit efter listen (2026-11-03): licensen, og så tak til fotografen som afslutning ----*/
        afterList: [
            "Gem et link eller skærmbillede af licensen, mens den stadig gælder, som du hentede billedet under.",
            "Når du henter et gratis billede på Unsplash eller Pexels, beder siden dig måske om at sige tak til fotografen. Det er ikke et krav, men en venlig gestus. Vil du gøre det, så skriv det i en billedtekst eller i en samlet liste over billedkreditter på din side. Skriv det ikke i alt-teksten. Alt-teksten er til dem, der ikke kan se billedet, og den skal beskrive, hvad billedet viser."
        ],
        nextButtonText: "Og hvad hvis teksten skal stå oven på billedet?"
    },
    {
        id: "8.5", modul: 8, type: "kontrasttest",
        heading: "Tjek kontrasten, hvis der skal tekst på billedet",
        paragraphs: [
            "Skal du have tekst oven på et billede, er det sidste praktiske tjek: kan teksten faktisk læses? Prøv det her. Vælg et af dine billeder, og se, hvordan en kort tekst ser ud oven på det. Du kan skifte farve på teksten og prøve med en boks bag den. Vi kan ikke måle kontrasten for dig på et foto, sådan som vi kan med to flade farver. Men når du ser det, bliver det som regel hurtigt klart."
        ],
        /*---- Runde 7: testen laves direkte i boblen. Intet måles automatisk - det er brugerens egen vurdering. Tekstfarverne kommer fra den gemte palet i Farver (samme læsning som 6.4), ellers hvid og sort. Billederne vises i rækkefølgen i `billedkilder`: "Mine udvalgte billeder" (7.10) først ----*/
        billedkilder: ["udvalgte", "praksis", "inspiration"],
        eksempeltekst: "Book en tid hos mig",
        standardTekstfarver: [{ hex: "#FFFFFF", role: "Hvid" }, { hex: "#000000", role: "Sort" }],
        options: [
            { id: "kan_laese", text: "Ja, jeg kan tydeligt læse teksten" },
            { id: "svaert", text: "Nej, det er svært at læse" }
        ],
        revealOnOptionId: "svaert",
        revealText: "Er du i tvivl, kan en mørk eller lys boks bag teksten ofte løse det, uden at gå på kompromis med billedet.",
        answerKey: "modul7_kontrast",
        nextButtonText: "Er du stadig i tvivl om noget?"
    },
    {
        id: "8.6", modul: 8, type: "text",
        heading: "Er du stadig i tvivl?",
        paragraphs: [
            "Nogle situationer er værd at få set efter af en fagperson, fremfor at gætte: hvis nogen protesterer mod din brug af et billede, hvis du modtager et krav eller en klage, hvis du er usikker på, om en licens dækker din brug, hvis billedet viser en klient eller kan afsløre helbredsoplysninger, hvis det skal indgå i en større annoncekampagne, eller hvis du vil bruge et AI-genereret billede, der ligner en virkelig person eller begivenhed. At vælge et andet billede er ofte både enklere og billigere end at løbe en unødvendig risiko. Denne gennemgang er DUF's praktiske vejledning — den erstatter ikke juridisk rådgivning. Er du i tvivl i en konkret situation, særligt med penge, en klage eller en klient involveret, så søg professionel rådgivning."
        ],
        nextButtonText: "Jeg har styr på mine billeder"
    },
    {
        id: "8.7", modul: 8, type: "text",
        heading: "Du har nu tjekket det, der betyder mest",
        paragraphs: [
            "Du har nu både en billedretning og et praktisk overblik over rettighederne bag den. Det er den kombination, der gør dine billeder brugbare i virkeligheden — ikke kun noget, du kan lide at se på."
        ],
        guideLine: "Du behøver ikke kunne det hele udenad. Du skal bare vide, hvor du kan tjekke det, når du er i tvivl.",
        nextButtonText: "Videre til sidste trin"
    },

    /*---- Modul 9 — Afprøv og dokumentér (hed Modul 8 før 2026-11-03. Gemmenøglen `modul8_dokumentation` har bevidst beholdt sit gamle navn) ----*/

    {
        id: "9.1", modul: 9, type: "forhaandsvisning",
        heading: "Prøv din billedretning af",
        paragraphs: [
            "Her kan du se, hvordan din billedretning kunne se ud sammen med resten af dit visuelle udtryk. Vælg et billede, så sætter vi det sammen med de farver, skrifttyper og det logo, du har valgt i de andre rum, hvis du har været der. Har du et sted, hvor du kan prøve det af i virkeligheden, fx et opslag, en side på din hjemmeside eller et dokument, så gør det gerne. Det er noget helt andet, når det er noget, andre rent faktisk møder. Har du ikke det endnu, er forhåndsvisningen her et godt sted at starte."
        ],
        /*---- Runde 7: forhåndsvisningen er Byggestens "Prøv dem sammen" (js/components/provSammen.js) med et billede øverst, jf. docs/duf-teknisk-prov-sammen.md. Begge knapper leder til 9.2. "Mine udvalgte billeder" (7.10) vises først ----*/
        billedkilder: ["udvalgte", "praksis", "inspiration"],
        forhaandsvisningOverskrift: "Sådan kunne det se ud",
        nextButtonText: "Jeg har prøvet det i praksis",
        altNextButtonText: "Jeg har ingen steder at prøve det af på endnu"
    },
    {
        id: "9.2", modul: 9, type: "textNote",
        heading: "Skriv det ned, så du kan finde det igen",
        paragraphs: [
            "Skriv 2-3 sætninger om din billedretning: hvilken stil og hvilke motiver du går efter, hvilke ord du vil have billederne til at give videre — og hvordan du har sikret dig rettighederne til dem. Det er det, der bliver til den del af din visuelle guide, du kan slå op i senere."
        ],
        fields: [{ id: "dokumentation", placeholder: "Skriv 2-3 sætninger om din billedretning ...", rows: 4 }],
        prefillFrom: "compassSummary",
        saveAsDocumentation: true,
        answerKey: "modul8_dokumentation",
        nextButtonText: "Videre"
    },
    {
        id: "9.3", modul: 9, type: "text",
        heading: "Din billedretning er en prototype, ikke en facitliste",
        paragraphs: [
            "Din billedretning er ikke hugget i sten. Den er en prototype, ligesom resten af dit visuelle udtryk — og den må gerne udvikle sig, i takt med at din praksis og dit materiale gør det. Du har nu et kompas, en tjekliste og et sted at starte, næste gang du skal vælge et billede. Det er nok til at komme videre."
        ],
        guideLine: "Du skal ikke ramme den perfekte billedretning i dag. Du skal bare have en, du kan bruge i morgen.",
        nextButtonText: "Gem og fortsæt i Visuelt udtryk for din praksis",
        isFinal: true
    }
];
