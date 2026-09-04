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
    items: [
        { title: "Farver", text: "Farver er ofte det første, folk lægger mærke til — og det, der binder resten sammen. Den rigtige farve på det rigtige sted kan gøre hele forskellen for, om noget føles gennemtænkt." },
        { title: "Billeder", text: "Billeder fortæller en historie, før nogen har læst et eneste ord. De skal understøtte den historie, du gerne vil fortælle — og du skal vide, hvor de kommer fra, og om du må bruge dem." },
        { title: "Logo", text: "Dit logo er ikke hele din identitet, men det er ofte det første, folk genkender. Det skal fungere overalt: stort, småt, i farve og i sort/hvid." },
        { title: "Ikoner, fonte og andre byggesten", text: "De mindre detaljer — skrifttype, ikoner, streger, mønstre — er ofte det, folk ikke lægger mærke til, når det virker. Men de lægger mærke til det, når det ikke gør." }
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
    heading: "Hvorfor fordybelse kan gøre en forskel",
    intro: "Du behøver ikke gå videre med noget som helst lige nu. Men her er en smagsprøve på, hvad hvert rum kan give dig, hvis du gør.",
    cards: [
        { label: "Farver", description: "En bevidst farvepalet, du kan bruge igen og igen — og en forklaring på, hvorfor den fungerer." },
        { label: "Logo", description: "Enten et nyt logo, eller en klar vurdering af det, du allerede har — så du ved, om det gør sit arbejde." },
        { label: "Billeder", description: "Kriterier for, hvilke billeder der passer til dig — og ro i maven om, at du må bruge dem." },
        { label: "Ikoner, fonte og andre byggesten", description: "De sidste detaljer på plads, så dit udtryk hænger sammen, også i det små." }
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
        name: "Farver",
        link: "vaekstrum-farver.html",
        singleText: "Du fortalte, at du endnu ikke har valgt faste farver til din praksis. Det lyder som et oplagt sted at starte."
    },
    logo: {
        name: "Logo",
        link: "vaekstrum-logo.html",
        singleText: "Du fortalte, at du endnu ikke har et logo, og at det er noget, du gerne vil have på plads. Det lyder som et oplagt sted at starte."
    },
    byggesten: {
        name: "Ikoner, fonte og andre byggesten",
        link: "vaekstrum-byggesten.html",
        singleText: "Du fortalte, at dit visuelle udtryk føles spredt, alt efter hvor folk møder det. Det lyder som et oplagt sted at starte."
    },
    billeder: {
        name: "Billeder",
        link: "vaekstrum-billeder.html",
        singleText: "Du nævnte, at du bruger billeder, du ikke er helt sikker på rettighederne til. Det anbefaler vi altid, at du får styr på."
    }
};
