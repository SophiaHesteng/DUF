/*---- Indhold til vækstrummet "Farver" (uddybende, hjem: Visuelt udtryk) - jf. docs/duf-manuskript-farver.md ----*/

/*---- Modul 1-5 er bygget om til den fulde Vækstrum -> Modul -> Bobler-struktur (manuskript revideret 2026-09-11). Teksten herunder følger manuskriptets ordlyd direkte, frem for den ældre, flade tekst fra før revisionen - jf. commit-beskeden for denne ombygning. Modul 6, 7 og 8 er bevidst urørt (egne, senere byggeopgaver). ----*/

export const velkomst = {
    fraOverblik: "Du nævnte tidligere, at du er usikker på dine farver — derfor foreslog vi at kigge nærmere på det her.",
    standard: "Velkommen til Farver. Her får du hjælp til at vælge en farvepalet, der understøtter din praksis — uanset om du starter fra bunden eller bare vil kvalitetssikre det, du allerede har."
};

export const modul1 = {
    boble1: {
        heading: "Hvorfor farver betyder noget",
        paragraphs: [
            "Farver er noget af det første, vi lægger mærke til. De er med til at forme det indtryk, vi får — længe før vi har læst et eneste ord.",
            "Farver kan signalere ro, energi, tillid, varme eller noget helt andet. Derfor er de ikke bare noget, der skal være pænt.",
            "Der findes ikke én rigtig farve til din praksis. Men farver fortæller noget — og det er værd at vide, hvad dine fortæller."
        ]
    },
    boble2: {
        heading: "Farver kan føles forskellige",
        examples: [
            { label: "Varm", description: "Et varmt og jordnært farveudtryk.", words: "Ro · varme · nærvær · tryghed" },
            { label: "Kold", description: "Et køligere farveudtryk.", words: "Klarhed · ro · professionalisme · distance" },
            { label: "Legende", description: "Et mere livligt eller uventet farveudtryk.", words: "Energi · kreativitet · personlighed · lethed" }
        ],
        closing: [
            "Ingen af dem er mere rigtige end de andre. Men de fortæller ikke det samme. Derfor er farvevalg ikke kun et spørgsmål om, hvad du synes er pænt. Det er også en del af det indtryk, du giver videre."
        ]
    }
};

export const modul2 = {
    heading: "Farvers usynlige regler",
    paragraphs: [
        "En farvekombination kan se virkelig flot ud — og stadig være svær at læse.",
        "Det gælder især, når tekst og baggrund ligger for tæt på hinanden i lyshed. Det kan gøre en hjemmeside, et opslag eller et dokument svært at bruge.",
        "Det handler om kontrast. Og det er en af de ting, du skal have styr på, hvis dine farver skal fungere i praksis."
    ]
};

export const modul3 = {
    boble1: {
        heading: "Dit udgangspunkt",
        paragraphs: [
            "Farver er allerede en del af din praksis mange steder. Du møder dem på din hjemmeside, i dit logo, på sociale medier, i et nyhedsbrev eller på noget af det materiale, du deler med andre.",
            "Når vi kigger på farver, handler det ikke kun om at finde ud af, hvilke farver der er brugt. Vi kigger også på, hvad de gør sammen.",
            "Går nogle af farverne igen? Hvilke lægger du først mærke til? Og hvilket samlet indtryk får du?"
        ]
    },
    boble2: {
        heading: "Har du selv et eksempel?",
        question: "Har du allerede nogle eksempler, du har lagt mærke til eller lader dig inspirere af?",
        yesLabel: "Ja, det har jeg",
        noLabel: "Nej, ikke endnu",
        uploadLabel: "Upload dit eksempel",
        uploadHint: "Billedet forlader aldrig din egen enhed — det gemmes kun i denne browser, medmindre du har fravalgt browserlagring.",
        dufImage: "img/eksempel-3.2.png",
        dufImageAlt: "DUFs eget eksempel på et farveudtryk"
    },
    boble3: {
        heading: "Hvad ser du?",
        intro: "Kig på eksemplet et øjeblik.",
        questions: [
            "Hvilke farver lægger du først mærke til?",
            "Er der nogle, der går igen?",
            "Og hvordan oplever du det samlede udtryk?"
        ]
    }
};

export const modul4 = {
    intro: {
        heading: "Inspiration og sammenligning",
        paragraphs: [
            "Du er sikkert allerede stødt på steder, hvor du har lagt mærke til farverne. Måske fordi det samlede udtryk føltes rart og gennemtænkt. Eller fordi der var noget, der skurrede, uden at du helt kunne sætte fingeren på hvorfor.",
            "Prøv at tænke over, om du selv har set eksempler, hvor brugen af farver har fanget din opmærksomhed — på godt og ondt.",
            "Nu skal vi kigge på nogle forskellige eksempler sammen."
        ]
    },
    question: "Hvad for et indtryk får du af det her?",
    options: [
        { id: "varmt", label: "Det føles varmt" },
        { id: "roligt", label: "Det føles roligt" },
        { id: "energisk", label: "Det føles energisk" },
        { id: "ikkeSpiller", label: "Noget føles som om, det ikke helt spiller" },
        { id: "ikkeSikker", label: "Jeg er ikke sikker" }
    ],
    /*---- Hver responses-liste er nummereret i PRIORITETSrækkefølge, jf. manuskriptet - matches den første respons i denne rækkefølge, hvis flere af dens afkrydsninger er valgt samtidig. Rækkefølgen er bevidst forskellig fra eksempel til eksempel. ----*/
    examples: [
        {
            id: "sociale-medier",
            heading: "Opslag på sociale medier",
            image: "img/roligt-so-me.png",
            imageAlt: "Fiktivt opslag til sociale medier med et roligt farveudtryk",
            responses: [
                { match: ["varmt", "roligt"], text: "Farverne her arbejder sammen om et roligt og imødekommende udtryk. Der er plads mellem farverne, og ingen af dem kæmper særligt meget om opmærksomheden. Det kan være med til at skabe både varme og ro i det samlede udtryk." },
                { match: ["energisk"], text: "Det giver god mening, hvis du også oplever energi i udtrykket. Farver kan godt skabe energi uden at gøre et udtryk uroligt. Her er de samtidig brugt på en måde, der holder det samlede udtryk roligt og imødekommende." },
                { match: ["ikkeSpiller"], text: "Det kan du godt opleve — og det er ikke nødvendigvis forkert. Hvad der føles støjende eller uroligt, kan være forskelligt fra person til person. I det her eksempel er farverne dog sat sammen med et roligt og varmt udtryk for øje, hvor de enkelte farver skal understøtte hinanden frem for at konkurrere." },
                { match: ["ikkeSikker"], text: "Det er helt okay ikke at være sikker. Nogle gange er det lettere at mærke et samlet udtryk, end det er at sætte ord på, hvorfor det føles sådan. Her er farverne brugt med fokus på et roligt og imødekommende udtryk, hvor de arbejder sammen og får plads til hinanden." }
            ]
        },
        {
            id: "hjemmeside",
            heading: "Hjemmeside",
            image: "img/varm-hjemmeside.png",
            imageAlt: "Fiktiv hjemmeside fra en behandler med et roligt farveudtryk",
            responses: [
                { match: ["varmt", "roligt"], text: "Her er farverne fordelt på en måde, der giver øjet lidt ro. Nogle farver får lov til at fylde mere, mens andre bruges som mindre detaljer. Det skaber et samlet udtryk, hvor farverne understøtter hinanden uden at kræve opmærksomhed på samme tid." },
                { match: ["energisk"], text: "Det giver god mening, hvis du også oplever energi i udtrykket. En hjemmeside kan godt have farver, der skaber liv og opmærksomhed, uden at det tager den rolige fornemmelse. Her er der stadig en tydelig balance i, hvordan farverne er fordelt på siden." },
                { match: ["ikkeSpiller"], text: "Det kan godt være den fornemmelse, du får — og den er helt legitim. Vi oplever ikke alle farver og sammensætninger på samme måde. Her er farverne brugt med en tydelig fordeling, hvor nogle får lov at være i baggrunden, mens andre bruges til at fremhæve bestemte elementer. Det er med til at skabe det rolige udtryk, hjemmesiden er bygget op omkring." },
                { match: ["ikkeSikker"], text: "Det er helt okay ikke at være sikker. På en hjemmeside arbejder farverne sammen med mange andre ting, og det kan være svært at skille dem helt ad. I det her eksempel er farverne fordelt med fokus på at skabe et roligt og sammenhængende udtryk, hvor ikke alting forsøger at få din opmærksomhed på én gang." }
            ]
        },
        {
            id: "logo",
            heading: "Logo",
            image: "img/energisk-logo.png",
            imageAlt: "Fiktivt logo fra en behandler med et energisk og dynamisk farveudtryk",
            responses: [
                { match: ["energisk"], text: "Her er der mere bevægelse og energi i farverne. Farverne får lov til at spille en tydeligere rolle, og de forskellige elementer skaber liv i udtrykket. Det betyder ikke nødvendigvis, at det bliver uroligt — energien kan også være med til at gøre et udtryk levende og dynamisk." },
                { match: ["varmt", "roligt"], text: "Du kan godt opleve varme eller ro i dele af udtrykket. Farver behøver ikke kun skabe ét indtryk. Her er der samtidig arbejdet med flere elementer og farver, som tilsammen giver logoet mere bevægelse og energi." },
                { match: ["ikkeSpiller"], text: "Det kan du godt opleve — og det er ikke nødvendigvis forkert. Når der er flere farver og elementer i spil, kan vi opleve dem forskelligt. I det her eksempel er farverne og formerne brugt til at skabe et levende og dynamisk udtryk, hvor der gerne må ske lidt mere." },
                { match: ["ikkeSikker"], text: "Det er helt okay ikke at være sikker. Nogle udtryk er nemme at mærke, men sværere at sætte ord på. Her er der arbejdet med flere farver og elementer, som tilsammen skaber mere liv og bevægelse i logoet." }
            ]
        },
        {
            id: "nyhedsbrev",
            heading: "Nyhedsbrev",
            image: "img/larmende-nyhedsbrev.png",
            imageAlt: "Fiktivt nyhedsbrev fra en behandler, der viser hvordan farvevalg, kontrast og brugen af emojis kan påvirke det samlede indtryk",
            responses: [
                { match: ["ikkeSpiller"], text: "Her er der nogle ting i farvevalget, der kan gøre udtrykket mere forstyrrende. Nogle af farverne ligger tæt på hinanden i kontrast, og det kan gøre det sværere at afkode, hvad du skal kigge på. Samtidig trækker emojis opmærksomhed forskellige steder i indholdet. Det betyder ikke, at hver enkelt farve eller emoji er et problem i sig selv. Men sammen kan de gøre det samlede udtryk mere uroligt." },
                { match: ["varmt", "roligt"], text: "Du kan godt opleve varme eller ro i dele af udtrykket. Nogle af farverne og elementerne fungerer fint hver for sig. Men når kontrasten mellem farverne ikke altid er tydelig nok, kan det blive sværere for øjet at finde rundt i indholdet. Også små elementer som emojis kan ændre det samlede indtryk — alt efter hvor og hvor meget de bruges." },
                { match: ["energisk"], text: "Der er bestemt energi i det her udtryk. Farverne og emojis skaber liv og trækker opmærksomhed forskellige steder hen. Men når flere elementer samtidig kæmper om opmærksomheden, og kontrasten mellem farverne varierer, kan energien også begynde at føles forstyrrende." },
                { match: ["ikkeSikker"], text: "Det er helt okay ikke at være sikker. Prøv at kigge på, hvad der først fanger dit øje. Er det let at finde rundt i indholdet — eller bliver din opmærksomhed trukket flere forskellige steder hen? I det her eksempel spiller både farvernes kontrast og brugen af små elementer som emojis en rolle for det samlede udtryk. Det er nogle af de ting, der kan være værd at lægge mærke til, når du arbejder med dine egne farver." }
            ]
        }
    ]
};

export const modul5 = {
    boble1: {
        heading: "Det handler ikke om antallet",
        paragraphs: [
            "Hvor mange farver skal man egentlig have? Det korte svar er: der findes ikke ét rigtigt antal.",
            "Nogle udtryk fungerer fint med ganske få farver. Andre har brug for flere. Det afgørende er ikke, om din farvepalette består af tre, fem eller otte farver.",
            "Det afgørende er, hvordan farverne arbejder sammen — og hvilken plads de får i dit samlede udtryk."
        ]
    },
    boble2: {
        heading: "Farver har forskellige roller",
        paragraphs: [
            "Farver behøver ikke alle sammen at gøre det samme. Nogle farver får lov til at fylde meget og være med til at sætte tonen for dit samlede udtryk. Andre ligger mere i baggrunden og understøtter helheden. Og nogle farver bruger du måske kun i små doser — netop fordi de skal fange opmærksomheden, når det er meningen.",
            "Når du begynder at tænke over, hvilken rolle dine farver spiller, bliver det også lettere at se, om de arbejder sammen på en måde, der giver mening."
        ]
    },
    boble3: {
        heading: "Det handler også om fordelingen",
        paragraphs: [
            "En farves rolle handler også om, hvor meget plads den får. En farve, der kun dukker op i små detaljer, kan pludselig komme til at sætte et helt andet præg, hvis den får lov til at fylde halvdelen af siden.",
            "Det er derfor ikke kun farverne i sig selv, der har betydning. Det har også betydning, hvor og hvor meget du bruger dem.",
            "Når du fordeler dine farver bevidst, bliver det lettere at skabe et udtryk, hvor farverne arbejder sammen i stedet for at kæmpe om opmærksomheden."
        ]
    }
};

/*---- Modul 6-8: ⚠️ URØRT i denne ombygning - egne, senere byggeopgaver (fri palet-bygger i Modul 6, palette-drevet kontrasttjek i Modul 7, opsamlingsskærm i Modul 8's Boble 8.3), jf. docs/duf-manuskript-farver.md og prompt-farver-modul1-5.md's "Eksplicit UDENFOR scope". Rørt ved kun hvis/når de opgaver tages op. ----*/

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
