/*---- Indhold til vækstrummet "Overblik" (grundlæggende, hjem: Visuelt udtryk) - jf. docs/duf-manuskript-overblik.md ----*/

export const modul1 = {
    heading: "Hvorfor et bevidst visuelt udtryk betyder noget",
    paragraphs: [
        "De fleste behandlere gør en af to ting: de kigger på, hvad andre gør, og gør det samme. Eller de forsøger at finde på noget helt unikt — og bruger uendelig meget tid og energi på det.",
        "Der findes en tredje vej: at træffe bevidste valg, der understøtter den måde, du gerne vil kommunikere på. Det handler ikke om at være mest muligt original. Det handler om, at det, folk ser, stemmer overens med det, du står for — så de stoler på dig lidt hurtigere.",
        "Det er det, resten af dette rum handler om."
    ],
    reflectionLabel: "Tænk på en praksis, du selv har mødt online og hurtigt fæstnet lid til. Hvad var det, der gjorde, at du stolede på den? (valgfrit)"
};

/*---- Modul 2 - ét spørgsmål ad gangen. "conditionalOn" springes over, hvis betingelsen ikke er opfyldt. ----*/

export const modul2Questions = [
    {
        id: "logo",
        question: "Har du allerede et logo?",
        options: ["Ja", "Nej", "Det er under udvikling"]
    },
    {
        id: "farver",
        question: "Har du valgt faste farver til din praksis?",
        options: ["Ja", "Nej", "Jeg er usikker"]
    },
    {
        id: "billederBruger",
        question: "Bruger du billeder på dine platforme i dag?",
        options: ["Ja", "Nej"]
    },
    {
        id: "billederRettigheder",
        question: "Ved du, hvor billederne kommer fra, og om du må bruge dem?",
        options: ["Ja, det er jeg helt tryg ved", "Jeg er faktisk ikke helt sikker"],
        conditionalOn: { id: "billederBruger", equals: "Ja" }
    },
    {
        id: "sammenhaeng",
        question: "Føles dit visuelle udtryk ens, uanset hvor folk møder det — din hjemmeside, sociale medier, evt. tryksager?",
        options: ["Ja, det hænger godt sammen", "Nej, det føles spredt", "Jeg er ikke sikker"]
    }
];

export const modul2Fritekst = {
    label: "Er der noget i dit visuelle udtryk, du er i tvivl om lige nu? (valgfrit)"
};

export const modul3 = {
    heading: "Farver, billeder, logo og ikoner/fonte: hvad er hvad?",
    intro: "Dit visuelle udtryk består af fire dele. De hænger sammen, men kan også arbejdes med hver for sig. Her er en hurtig introduktion til hver af dem.",
    bubbles: [
        {
            key: "farver",
            title: "Farver",
            teaser: "Farver er ofte det første, folk lægger mærke til — og det, der binder resten sammen.",
            body: "Farver er ofte det første, folk lægger mærke til — og det, der binder resten sammen. Den rigtige farve på det rigtige sted kan gøre hele forskellen for, om noget føles gennemtænkt."
        },
        {
            key: "billeder",
            title: "Billeder",
            teaser: "Billeder fortæller en historie, før nogen har læst et eneste ord.",
            body: "Billeder fortæller en historie, før nogen har læst et eneste ord. De skal understøtte den historie, du gerne vil fortælle — og du skal vide, hvor de kommer fra, og om du må bruge dem."
        },
        {
            key: "logo",
            title: "Logo",
            teaser: "Dit logo er ikke hele din identitet, men det er ofte det første, folk genkender.",
            body: "Dit logo er ikke hele din identitet, men det er ofte det første, folk genkender. Det skal fungere overalt: stort, småt, i farve og i sort/hvid."
        },
        {
            key: "byggesten",
            title: "Ikoner, fonte og andre byggesten",
            teaser: "De mindre detaljer er ofte det, folk ikke lægger mærke til, når det virker — men de lægger mærke til det, når det ikke gør.",
            body: "De mindre detaljer — skrifttype, ikoner, streger, mønstre — er ofte det, folk ikke lægger mærke til, når det virker. Men de lægger mærke til det, når det ikke gør."
        }
    ]
};

export const modul4 = {
    heading: "Sådan hænger elementerne sammen",
    paragraphs: [
        "De fire dele påvirker hinanden. Det er derfor, vi anbefaler, at du på et tidspunkt kigger på dem alle sammen — ikke fordi hver enkelt del ikke kan stå alene.",
        "Farven på et ikon afgør, om det opfattes rigtigt. Dine billeder er med til at sætte den samlede retning. Dit logo skal spille sammen med resten, ikke stå for sig selv. Og skrifttype og grafik kan understøtte hinanden — eller trække i hver sin retning."
    ]
};

export const modul5 = {
    heading: "Kig ind i rummene",
    intro: "Du behøver ikke gå videre med noget som helst lige nu. Men her kan du kigge nærmere på, hvad de forskellige rum handler om, hvis du har lyst.",
    bubbles: [
        {
            key: "farver",
            title: "En farveretning, du faktisk kan bruge.",
            teaser: "En bevidst farvepalet, du kan bruge igen og igen — og en forklaring på, hvorfor den fungerer.",
            body: "I Farver arbejder du med at finde en retning, der passer til dig og din praksis — ikke kun at vælge farver, du kan lide, men at forstå hvordan farverne fungerer sammen og bruges på tværs af praksissen.",
            workList: [
                "hvad farverne skal udtrykke",
                "hvordan man finder en retning",
                "hvordan farver bruges sammen",
                "hvordan farverne fungerer, når mennesker skal læse og bruge indholdet"
            ],
            guide: "En farvepalet skal ikke bare se godt ud. Den skal kunne bruges."
        },
        {
            key: "billeder",
            title: "Billeder, der fortæller den rigtige historie.",
            teaser: "Kriterier for, hvilke billeder der passer til dig — og ro i maven om, at du må bruge dem.",
            body: "Handler ikke om at finde billeder, alle synes er flotte, men om at finde ud af, hvad der giver mening at vise — og vælge billeder, der understøtter det.",
            workList: [
                "hvad billederne skal fortælle",
                "hvad der giver mening at vise",
                "hvilke typer billeder der passer",
                "sammenhæng på tværs",
                "rettigheder"
            ],
            guide: "Et godt billede er ikke bare et billede, der ser godt ud. Det skal også give mening, når det bliver en del af din praksis.",
            takeaway: "En retning for, hvad du leder efter og gerne vil vise."
        },
        {
            key: "logo",
            title: "Hvad skal dit logo egentlig kunne?",
            teaser: "Enten et nyt logo, eller en klar vurdering af det, du allerede har — så du ved, om det gør sit arbejde.",
            body: "Målet er ikke nødvendigvis et nyt logo, men at vide hvad logoet skal kunne, og hvad der giver mening som næste skridt — uanset om det ender med at blive beholdt, justeret eller udviklet nyt.",
            workList: [
                "logoets rolle",
                "hvad mennesker skal kunne genkende",
                "om det nuværende logo passer til retningen",
                "samspil med resten af det visuelle udtryk"
            ],
            guide: "Du behøver ikke presse hele din historie ind i dit logo. Men der må gerne være en tanke bag det."
        },
        {
            key: "byggesten",
            title: "De små valg, der er med til at sætte retningen.",
            teaser: "De sidste detaljer på plads, så dit udtryk hænger sammen, også i det små.",
            body: "Ikoner: hjælper mennesker med hurtigt at forstå og finde rundt. Illustrationer: fortæller, forklarer, giver praksis et særligt præg. Skrifttyper: understøtter udtrykket uden at gøre indholdet sværere at læse.",
            guide: "Du skal ikke vælge noget, bare fordi det ser godt ud alene. Se på, hvordan det fungerer, når det bliver en del af helheden.",
            takeaway: "Et bedre grundlag for fremtidige valg af ikon, skrifttype eller illustration."
        }
    ]
};

/*---- Modul 6 - matchningslogik. Rækkefølge ved flere samtidige signaler: Farver, Logo, Byggesten (jf. manuskriptets "Farver prioriteres, gerne før Logo") - Byggesten er sidestillet i relevans, men nævnes sidst i rækkefølgen, da det introduceres sidst i Modul 2. ----*/

export const modul6 = {
    intro: "Baseret på det, du har fortalt os, foreslår vi et sted at starte. Men det er dit valg — de andre rum forsvinder ikke, de venter bare.",
    noSignalText: "Det lyder som om dit visuelle udtryk allerede hænger godt sammen lige nu. Der er ikke noget, der presser sig på — men de fire rum venter, hvis du på et tidspunkt får lyst til at gå i dybden.",
    closing: "Uanset hvor du går herfra, har du nu et overblik, du ikke havde før. Det er allerede et skridt."
};

export const ROOMS = {
    farver: {
        id: "farver",
        name: "Farver",
        link: "vaekstrum-farver.html?fra=overblik",
        singleText: "Du fortalte, at du endnu ikke har valgt faste farver til din praksis. Det lyder som et oplagt sted at starte."
    },
    logo: {
        id: "logo",
        name: "Logo",
        link: "vaekstrum-logo.html?fra=overblik",
        singleText: "Du fortalte, at du endnu ikke har et logo, og at det er noget, du gerne vil have på plads. Det lyder som et oplagt sted at starte."
    },
    byggesten: {
        id: "byggesten",
        name: "Ikoner, fonte og andre byggesten",
        link: "vaekstrum-byggesten.html",
        singleText: "Du fortalte, at dit visuelle udtryk føles spredt, alt efter hvor folk møder det. Det lyder som et oplagt sted at starte."
    },
    billeder: {
        id: "billeder",
        name: "Billeder",
        link: "vaekstrum-billeder.html?fra=overblik",
        singleText: "Du nævnte, at du bruger billeder, du ikke er helt sikker på rettighederne til. Det anbefaler vi altid, at du får styr på."
    }
};
