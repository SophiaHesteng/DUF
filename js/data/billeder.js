/*---- Indhold til vækstrummet "Billeder" (uddybende, hjem: Visuelt udtryk) - jf. docs/duf-manuskript-billeder.md (gennemrevideret 2026-09-17 til den fulde, boble-strukturerede form - ca. 8 til 40 bobler, fordelt på de samme 8 moduler) ----*/

export const velkomst = {
    fraOverblik: "Du nævnte tidligere, at du ikke er helt sikker på rettighederne til de billeder, du bruger. Det anbefaler vi altid at få styr på — uanset hvad du ellers vælger at arbejde med. Derfor starter vi der i dette rum.",
    standard: "Velkommen til Billeder. Her får du hjælp til at vælge billeder, der understøtter din praksis — og til at få styr på, hvilke rettigheder du faktisk har til dem."
};

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
            "Nej. Du behøver ikke professionelle billeder for at bruge billeder godt. Et godt billede kræver ikke en professionel fotograf, det rigtige kamera eller et perfekt opstillet rum. Det vigtigste er, at billedet passer til dig og den praksis, du gerne vil vise frem. Et billede må gerne være enkelt. Det må gerne være uperfekt. Og det må gerne føles som dig. Det handler ikke om at ligne alle andre. Det handler om at bruge billeder på en måde, der understøtter det, du gerne vil vise og fortælle."
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
        uploadLabel: "Billeder fra min praksis",
        uploadHint: "Dine billeder bliver på din enhed. De uploades ikke til en server.",
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
        nextButtonText: "Hvor skal jeg lede?"
    },
    {
        id: "4.3", modul: 4, type: "choice",
        heading: "Hvor vil du lede?",
        paragraphs: [
            "Nu har du nogle søgeord at starte med. Så skal vi finde det sted, der passer bedst til det, du gerne vil undersøge. Du behøver ikke vælge det samme sted som andre. Vælg det sted, hvor du har mest lyst til at gå på opdagelse. Og husk: vi leder efter inspiration, ikke billeder, du nødvendigvis må bruge."
        ],
        options: [
            { id: "pinterest", text: "Pinterest", description: "Godt, hvis du vil gå på opdagelse i stemninger, farver og visuelle udtryk. Her kan ét billede hurtigt føre dig videre til mange andre." },
            { id: "stockfotos", text: "Stockfotos", description: "Godt, hvis du vil undersøge forskellige måder at fotografere mennesker, rum, detaljer eller situationer på." },
            { id: "andre", text: "Andre steder på nettet", description: "Der findes måske allerede en virksomhed, en profil eller et univers, du bliver inspireret af. Gå på opdagelse dér." }
        ],
        answerKey: "modul4_sted",
        nextButtonText: "Jeg er klar til at finde inspiration"
    },
    {
        id: "4.4", modul: 4, type: "imageUpload",
        bucket: "inspiration",
        heading: "Saml det, der fanger dig",
        paragraphs: [
            "Nu er det tid til at gå på opdagelse. Brug søgeordene som inspiration, men lad dig også føre videre af det, du finder. Du skal ikke tænke for meget over, om et billede passer til din praksis endnu. Når noget får dig til at stoppe op, så gem det i Min inspiration. Prøv at samle 5–10 billeder. De må gerne være forskellige — det kan faktisk være en fordel. Læg mærke til, hvad du bliver ved med at vende tilbage til."
        ],
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
            "Gå tilbage til din inspirationssamling, og kig på billederne igen. Denne gang skal du se efter, hvad de har til fælles — farverne, lyset, menneskerne, rummene, eller måden billederne føles på. Du behøver ikke kunne sætte det rigtige ord på endnu. Hvad er det første, dine øjne falder på, når du ser din samling?"
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
        answerKey: "modul5_moenstre",
        nextButtonText: "Hvad fortæller det om min retning?"
    },
    {
        id: "5.4", modul: 5, type: "multiChoice",
        heading: "Hvad fortæller det om dig?",
        paragraphs: [
            "De mønstre, du har fundet, siger ikke kun noget om billeder. De siger også noget om, hvordan du gerne vil opleves. Prøv at sætte nogle få ord på den følelse eller oplevelse, du gerne vil give videre gennem dine billeder. Hvordan vil du gerne have, at det føles at møde din praksis visuelt? Du kan vælge op til 3 ord. Du må også gerne skrive dine egne. Der er ikke noget rigtigt eller forkert valg."
        ],
        options: [
            "Rolig", "Tryg", "Varm", "Blød", "Let", "Enkel", "Naturlig", "Ægte", "Nærværende", "Personlig",
            "Åben", "Imødekommende", "Jordnær", "Sanselig", "Legende", "Kreativ", "Energisk", "Levende", "Modig",
            "Farverig", "Frisk", "Elegant", "Eksklusiv", "Rå", "Organisk", "Harmonisk", "Inspirerende", "Mystisk", "Poetisk", "Professionel"
        ].map((ord) => ({ id: ord.toLowerCase(), text: ord })),
        maxSelect: 3,
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
        guideLine: "Du skal ikke finde svaret et helt nyt sted fra. Det ligger allerede i det, du har kigget på.",
        nextButtonText: "Lad os gøre det konkret"
    },
    {
        id: "6.2", modul: 6, type: "choice",
        heading: "Hvilken stil passer til dig?",
        paragraphs: [
            "Ud fra dine ord og mønstre — hvilken stil passer bedst til din praksis? Der er ikke én rigtig stil. Det vigtige er, at du kan svare på, hvorfor den, du vælger, passer til dig."
        ],
        options: [
            { id: "varmt_naert", text: "Varmt og nært" },
            { id: "roligt_minimalistisk", text: "Roligt og minimalistisk" },
            { id: "andet", text: "Noget tredje — jeg beskriver det selv" }
        ],
        freeTextOptionId: "andet",
        freeTextPlaceholder: "Beskriv din stil med dine egne ord",
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
        nextButtonText: "Videre til rettigheder og kontrol"
    },

    /*---- Modul 7 — Tjek rettigheder og kontrast i praksis ----*/

    {
        id: "7.1", modul: 7, type: "text",
        heading: "Nu tjekker vi det i praksis",
        paragraphs: [
            "Du har nu fundet din billedretning. Før du bruger billederne i praksis, skal vi lige to ting efter: at du må bruge dem, og at de fungerer visuelt, der hvor du sætter dem ind. Det er ikke en ekstra forhindring. Det er den sidste, praktiske del af arbejdet — så du kan bruge dine billeder uden at skulle tvivle bagefter."
        ],
        nextButtonText: "Lad os tage rettighederne først"
    },
    {
        id: "7.2", modul: 7, type: "checklist",
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
        id: "7.3", modul: 7, type: "text",
        heading: "Når der er mennesker på billedet",
        paragraphs: [
            "Er der en genkendelig person på billedet, er det ikke kun et spørgsmål om ophavsret. Et billede af en person er en personoplysning, og du skal have et lovligt grundlag for at gemme, bruge og vise det — også selvom du selv har taget billedet. Den mest sikre og respektfulde løsning er et tydeligt, dokumenteret samtykke. Personen skal vide: hvilket billede du vil bruge, hvad det skal bruges til, hvor det bliver vist, hvor længe du forventer at bruge det, og hvordan samtykket kan trækkes tilbage. Samtykket skal være frivilligt — det må aldrig være en betingelse for at modtage en behandling. Optræder nogen bare tilfældigt i baggrunden, kan vurderingen være en anden. Er du i tvivl, så beskær billedet, slør personen, eller vælg et andet. Har du billeder af en klient, skal du være ekstra opmærksom: de kan afsløre eller antyde noget om en persons helbred. Her bør samtykket altid være skriftligt og knyttet til den konkrete brug — et \"ja\" til et opslag på Instagram er ikke automatisk et \"ja\" til en annonce eller en permanent plads på din hjemmeside. Fortæl klienten, hvordan de kan trække samtykket tilbage, og fjern billedet, hvis de gør."
        ],
        nextButtonText: "Hvad hvis billedet kommer fra en billedbank eller nettet?"
    },
    {
        id: "7.4", modul: 7, type: "text",
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
        afterList: "Gem et link eller skærmbillede af licensen, mens den stadig gælder, som du hentede billedet under.",
        nextButtonText: "Og hvad hvis teksten skal stå oven på billedet?"
    },
    {
        id: "7.5", modul: 7, type: "choice",
        heading: "Tjek kontrasten, hvis der skal tekst på billedet",
        paragraphs: [
            "Skal du have tekst oven på et billede, er det sidste praktiske tjek: kan teksten faktisk læses? Placér teksten, og vurder ærligt. Det er ikke noget, vi kan måle for dig automatisk — et fotos kontrast er ikke det samme som to flade farver, der kan beregnes. Men et hurtigt kig gør det som regel klart."
        ],
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
        id: "7.6", modul: 7, type: "text",
        heading: "Er du stadig i tvivl?",
        paragraphs: [
            "Nogle situationer er værd at få set efter af en fagperson, fremfor at gætte: hvis nogen protesterer mod din brug af et billede, hvis du modtager et krav eller en klage, hvis du er usikker på, om en licens dækker din brug, hvis billedet viser en klient eller kan afsløre helbredsoplysninger, hvis det skal indgå i en større annoncekampagne, eller hvis du vil bruge et AI-genereret billede, der ligner en virkelig person eller begivenhed. At vælge et andet billede er ofte både enklere og billigere end at løbe en unødvendig risiko. Denne gennemgang er DUF's praktiske vejledning — den erstatter ikke juridisk rådgivning. Er du i tvivl i en konkret situation, særligt med penge, en klage eller en klient involveret, så søg professionel rådgivning."
        ],
        nextButtonText: "Jeg har styr på mine billeder"
    },
    {
        id: "7.7", modul: 7, type: "text",
        heading: "Du har nu tjekket det, der betyder mest",
        paragraphs: [
            "Du har nu både en billedretning og et praktisk overblik over rettighederne bag den. Det er den kombination, der gør dine billeder brugbare i virkeligheden — ikke kun noget, du kan lide at se på."
        ],
        guideLine: "Du behøver ikke kunne det hele udenad. Du skal bare vide, hvor du kan tjekke det, når du er i tvivl.",
        nextButtonText: "Videre til sidste trin"
    },

    /*---- Modul 8 — Afprøv og dokumentér ----*/

    {
        id: "8.1", modul: 8, type: "text",
        heading: "Prøv din billedretning af",
        paragraphs: [
            "Brug din billedretning ét sted i praksis — et opslag, en side på din hjemmeside, eller et dokument. Se, hvordan det føles, når det ikke bare er billeder i en samling, men noget, andre rent faktisk møder."
        ],
        nextButtonText: "Jeg har prøvet det"
    },
    {
        id: "8.2", modul: 8, type: "textNote",
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
        id: "8.3", modul: 8, type: "text",
        heading: "Din billedretning er en prototype, ikke en facitliste",
        paragraphs: [
            "Din billedretning er ikke hugget i sten. Den er en prototype, ligesom resten af dit visuelle udtryk — og den må gerne udvikle sig, i takt med at din praksis og dit materiale gør det. Du har nu et kompas, en tjekliste og et sted at starte, næste gang du skal vælge et billede. Det er nok til at komme videre."
        ],
        guideLine: "Du skal ikke ramme den perfekte billedretning i dag. Du skal bare have en, du kan bruge i morgen.",
        nextButtonText: "Gem og fortsæt i Visuelt udtryk",
        isFinal: true
    }
];
