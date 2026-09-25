/*---- Indhold til vækstrummet "Farver" (uddybende, hjem: Visuelt udtryk) - jf. docs/duf-manuskript-farver.md ----*/

/*---- Modul 1-5 er bygget om til den fulde Vækstrum -> Modul -> Bobler-struktur (manuskript revideret 2026-09-11). Teksten herunder følger manuskriptets ordlyd direkte, frem for den ældre, flade tekst fra før revisionen - jf. commit-beskeden for denne ombygning. Modul 6, 7 og 8 er nu også bygget om til den fri palet-bygger / palette-drevet kontrasttjek / tre-boble-opsamling, jf. docs/duf-manuskript-farver.md. ----*/

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
            { label: "Varm", description: "Et varmt og jordnært farveudtryk.", words: "Ro · varme · nærvær · tryghed", image: "img/varm-klinik.png", imageAlt: "Eksempel på et varmt og jordnært farveudtryk" },
            { label: "Kold", description: "Et køligere farveudtryk.", words: "Klarhed · ro · professionalisme · distance", image: "img/koelig-klinik.png", imageAlt: "Eksempel på et køligt farveudtryk" },
            { label: "Legende", description: "Et mere livligt eller uventet farveudtryk.", words: "Energi · kreativitet · personlighed · lethed", image: "img/energi-klinik.png", imageAlt: "Eksempel på et legende, energisk farveudtryk" }
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
        ],
        /*---- Runde 7: erstatter første afsnit, når Overblik viser, at brugeren starter fra bunden (hentUdgangspunkt()?.starterFraBunden). Resten af teksten er uændret ----*/
        firstParagraphFraBunden: "Farver møder du mange steder: på hjemmesider, i logoer, på sociale medier, i nyhedsbreve og på materialer. Også selvom du ikke har dine egne endnu, har du sikkert lagt mærke til dem hos andre."
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
        ],
        /*---- Runde 7 (efter brugertest 1, T3): hvorfor roller - vises efter teksten ovenfor, ved siden af en lille HTML/CSS-skitse med tre etiketter ----*/
        roleExample: {
            paragraph: "Hvorfor taler vi om roller og ikke bare om farver? Fordi den samme farve kan gøre noget helt forskelligt, alt efter hvor du bruger den. Tænk på en hjemmeside: Én farve er baggrunden, som fylder det meste. Én er teksten, som skal være let at læse. Og én bruges kun på knappen 'Book en tid', så den springer i øjnene. Det er tre forskellige opgaver, eller roller. Derfor skal du som regel bruge mindst to farver, som er tydeligt forskellige: én lys og én mørk, så din tekst kan ses.",
            backgroundLabel: "Baggrund",
            textLabel: "Tekst",
            buttonLabel: "Knap",
            buttonText: "Book en tid"
        }
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

/*---- Modul 6 - fri palet-bygger: ubegrænset antal farver, fritekst-rolle pr. farve, procent-dosering med automatisk omfordeling til 100%, og en levende visuel forhåndsvisning. Erstatter den tidligere faste 3-rolle-model. Fire bobler, jf. docs/duf-manuskript-farver.md. ----*/

export const modul6 = {
    boble1: {
        heading: "Vælg dine farver",
        paragraphs: [
            "Nu skal vi samle dine farver. Start med de farver, du allerede bruger — eller de farver, du gerne vil arbejde med. Du behøver ikke vælge et bestemt antal. Tilføj de farver, der giver mening for dit udtryk.",
            "Vælg gerne mindst to farver, en lys og en mørk. Så kan vi senere tjekke, om din tekst er let at læse."
        ],
        addButtonLabel: "➕ Tilføj en farve",
        /*---- Runde 7: vises på siden (ikke som browser-popup), hvis brugeren trykker "Næste" med kun én farve ----*/
        oneColorMessage: "Du har valgt én farve. Det er helt fint at starte der. Men for at din tekst kan ses, skal den have en farve at stå på. Vil du tilføje en farve mere, fx en lys eller mørk til tekst og baggrund?",
        oneColorAddLabel: "Tilføj en farve",
        oneColorContinueLabel: "Gå videre med én farve",
        defaultHex: "#0C3A2D"
    },
    boble2: {
        heading: "Hvilken rolle skal dine farver spille?",
        paragraphs: [
            "I det forrige modul talte vi om, at farver ikke behøver at gøre det samme. Nu kan du prøve at tænke over, hvilken rolle dine egne farver skal spille i dit udtryk.",
            "Nogle farver får måske lov til at sætte tonen og fylde mere. Andre skal understøtte. Og nogle skal måske kun bruges sparsomt, når du gerne vil have noget til at skille sig ud.",
            "Du behøver ikke passe dine farver ind i faste kategorier. Det handler bare om at tænke over, hvad du gerne vil have dem til at gøre."
        ],
        question: "Hvilken rolle forestiller du dig, at denne farve skal spille i dit udtryk?",
        /*---- Runde 7: forslag, der sættes ind i fritekstfeltet og kan rettes bagefter. Det gemte er stadig fritekst ----*/
        suggestionsIntro: "Du kan vælge et forslag eller skrive med dine egne ord.",
        suggestions: ["Baggrund", "Tekst", "Overskrifter", "Knapper og links", "Små detaljer", "Sætter stemningen"],
        placeholder: "Skriv med dine egne ord...",
        nextColorLabel: "→ Næste farve"
    },
    boble3: {
        heading: "Hvor meget plads skal dine farver have?",
        paragraphs: [
            "Nu kan du prøve at lege med, hvor meget plads dine farver får. En farve kan ændre betydning, alt efter om den fylder lidt eller meget. Prøv at justere fordelingen og se, hvad der sker med dit samlede udtryk.",
            "Du skal ikke ramme en bestemt fordeling. Det handler om at eksperimentere og få en fornemmelse af, hvordan dine farver arbejder sammen, når de får forskellig mængde plads."
        ]
    },
    boble4: {
        heading: "Se dine farver arbejde sammen",
        paragraphs: [
            "Nu kan du se, hvordan dine farver arbejder sammen. Indtil nu har du valgt dine farver, tænkt over hvilken rolle de skal spille og prøvet at fordele, hvor meget plads de skal have. Nu kan du se dem samlet. Her kan du få en fornemmelse af, hvordan farverne spiller sammen, når de får den plads, du har givet dem."
        ],
        exampleText: "Aa",
        textColorLabel: "Brug som tekstfarve",
        noTextColorLabel: "Ingen — brug sort som udgangspunkt"
    }
};

/*---- Modul 7 - kontrolleret, palette-drevet kontrasttjek: både tekst- og baggrundsfarve vælges fra brugerens egen palette fra Modul 6, kan afprøves i flere kombinationer, og kun den endelige, valgte kombination gemmes. `contrast.js`s WCAG-beregning genbruges uændret - kun UI'en og antallet af niveauer i feedbacken (tre, i stedet for binær pass/fail) er nyt. ----*/

export const modul7 = {
    /*---- Runde 7 (efter brugertest 1, U3): hvert niveau fra contrastLevel() vises altid med symbol OG tekst - bruges i 7.2, 7.3 og 8.3 ----*/
    levels: {
        high: { symbol: "✓", label: "Let at læse" },
        medium: { symbol: "~", label: "Kan fungere" },
        low: { symbol: "–", label: "Svær at læse" }
    },
    boble1: {
        heading: "Når farver mødes",
        paragraphs: [
            "Farver kan godt se flotte ud sammen — uden nødvendigvis at fungere godt til det samme. Når du bruger to farver sammen, kan forskellen mellem dem have betydning for, hvordan de opleves.",
            "Det bliver særligt vigtigt, når du lægger tekst oven på en farvet baggrund. Hvis farverne ligger meget tæt på hinanden, kan teksten være sværere at få øje på og læse.",
            "Det betyder ikke, at farverne er forkerte. Måske fungerer de bare bedre sammen på en anden måde.",
            "Nu skal du prøve at se, hvordan dine egne farver fungerer sammen."
        ]
    },
    boble2: {
        heading: "Prøv dine farver sammen",
        paragraphs: [
            "Nu kan du begynde at prøve dine farver sammen. Vælg to farver fra din palette, og se hvordan de fungerer, når den ene bruges som tekst og den anden som baggrund.",
            "Du kan starte med den tekstfarve, du eventuelt valgte i forrige modul — men du kan også prøve andre kombinationer.",
            "Det kan være en god idé at undersøge flere kombinationer. En farve, der fungerer godt som tekst på én baggrund, kan fungere helt anderledes på en anden."
        ],
        textColorLabel: "Tekstfarve",
        bgColorLabel: "Baggrundsfarve",
        previewText: "Sådan ser din tekst ud på denne baggrund.",
        /*---- Runde 7: foldbar oversigt over alle par fra paletten, i begge retninger ----*/
        allCombinationsLabel: "Se alle dine kombinationer",
        combinationSampleText: "Aa",
        /*---- Runde 7: har brugeren kun én farve, lægges hvid og sort til som valgmuligheder her - IKKE til den gemte palet ----*/
        oneColorLine: "Du har kun én farve i din palet, så vi har lagt hvid og sort til, så du kan prøve den som både tekst og baggrund.",
        extraColors: [
            { id: "ekstra-hvid", hex: "#FFFFFF", role: "Hvid" },
            { id: "ekstra-sort", hex: "#000000", role: "Sort" }
        ]
    },
    boble3: {
        heading: "Hvad betyder det for læsbarheden?",
        intro: "Når du har valgt en kombination af farver, kan du her se, hvad kontrasten mellem dem kan betyde for læsbarheden. Det handler ikke om, hvorvidt dine farver er rigtige eller forkerte. Det handler om at få en fornemmelse af, hvordan de fungerer sammen i den situation, du gerne vil bruge dem i.",
        previewText: "Sådan ser din tekst ud på denne baggrund.",
        /*---- Tre niveauer, afløser den tidligere binære pass/fail. Grænserne genbruger WCAG AA-tærsklerne fra contrast.js (evaluateContrast): "high" = lever op til AA for almindelig tekst (≥4.5:1), "medium" = lever kun op til AA for stor tekst (≥3:1), "low" = lever ikke op til nogen af dem. ----*/
        feedback: {
            high: "Her er der en tydelig forskel mellem farverne. Det gør det lettere for teksten at træde frem fra baggrunden og være rar at læse. Det giver dig gode muligheder, hvis du gerne vil bruge kombinationen til eksempelvis brødtekst, overskrifter eller anden vigtig information.",
            medium: "Her er forskellen mellem farverne mindre. Teksten kan stadig fungere, men hvor let den er at læse, kan blandt andet afhænge af tekstens størrelse og hvor meget tekst der er. Prøv eventuelt at se, hvordan kombinationen fungerer med både kort og længere tekst. Måske passer den bedre til nogle typer indhold end andre.",
            low: "Her ligger farverne så tæt på hinanden, at teksten kan være sværere at få øje på. Det kan gøre den mindre behagelig at læse. Det betyder ikke, at der er noget galt med dine farver. Måske fungerer de bare bedre sammen i flader, former eller detaljer, hvor læsbarhed ikke spiller den samme rolle."
        },
        retryLabel: "Prøv en anden kombination",
        confirmLabel: "Vælg denne kombination"
    }
};

/*---- Modul 8 - afprøvning og dokumentation, nu opdelt i tre bobler. Boble 8.3 er en ren opsamlingsskærm (ingen redigerbart tekstfelt) - dokumentationsteksten til `saveVaekstrumOutput` genereres automatisk af motoren ud fra palette + tekstfarve + kontrastvalg + refleksion, jf. farverEngine.js. ----*/

export const modul8 = {
    boble1: {
        heading: "Prøv din palette af",
        paragraphs: [
            "Nu er det tid til at prøve din palette af i praksis. Indtil nu har du set dine farver samlet og undersøgt, hvordan de fungerer sammen. Men farver kan godt opleves anderledes, når de bliver en del af noget rigtigt.",
            "Prøv at bruge din palette ét sted i dit visuelle udtryk. Det kan være et opslag til sociale medier, en side på din hjemmeside, et nyhedsbrev, et dokument — eller noget helt andet.",
            "Du behøver ikke lave det perfekt. Formålet er bare at se, hvad der sker, når dine farver kommer i brug.",
            "Når du har prøvet dem af, kan du komme tilbage og se på, hvad du har opdaget.",
            "Har du ingen steder at prøve den af endnu, kan du i stedet kigge på forhåndsvisningen af dine farver en gang til og mærke efter."
        ],
        /*---- Runde 7: begge knapper går til 8.2 - valget huskes kun i hukommelsen og styrer, hvilken version af 8.2 der vises ----*/
        triedButtonLabel: "Jeg har prøvet det i praksis",
        notTriedButtonLabel: "Jeg har ingen steder at prøve det af på endnu"
    },
    boble2: {
        heading: "Hvad lagde du mærke til?",
        paragraphs: [
            "Nu har du prøvet dine farver af i praksis. Når farverne bliver en del af noget rigtigt, kan du opdage ting, som ikke nødvendigvis var tydelige, da du så dem samlet i din palette."
        ],
        questions: [
            "Var der noget, der fungerede, som du havde håbet?",
            "Var der noget, der overraskede dig?",
            "Er der noget, du får lyst til at justere?"
        ],
        placeholder: "Hvad lagde du mærke til?",
        /*---- Runde 7: variant, når brugeren i 8.1 valgte "Jeg har ingen steder at prøve det af på endnu". Tekstfeltet og det gemte er det samme ----*/
        notTried: {
            paragraphs: [
                "Når du ser dine farver samlet, kan du allerede opdage noget. Du kan for eksempel tænke over:"
            ],
            questions: [
                "Føles de som dig og din praksis?",
                "Er der en farve, der fylder mere eller mindre, end du havde forestillet dig?",
                "Er der noget, du får lyst til at justere?"
            ]
        }
    },
    boble3: {
        heading: "Din valgte farvepalette",
        intro: "Her kan du se det, du har arbejdet med gennem vækstrummet. Din farvepalette kan gøre det lettere at arbejde med dit visuelle udtryk, fordi du allerede har taget stilling til, hvilke farver du vil bruge, og hvilken rolle de kan spille.",
        colorsLabel: "Dine farver",
        textColorLabel: "Din valgte tekstfarve",
        noTextColorText: "Tekstfarve: Sort som udgangspunkt.",
        contrastLabel: "Din valgte kontrastkombination",
        readabilityLabel: "Læsevenlighed",
        reflectionLabel: "Det lagde du mærke til",
        closing: "Du har nu afsluttet vækstrummet Farver — og fået sat konkrete farver op, givet dem nogle roller og tjekket kontrasterne. Din valgte farvepalette gør det lettere at arbejde med dit visuelle udtryk, fordi du allerede har taget stilling til, hvilken rolle dine farver kan spille. Når du bruger paletten igen og igen, kan det også være med til at skabe genkendelighed i det, andre møder fra dig. Og rollerne behøver ikke være de samme for altid. I takt med at din praksis udvikler sig, vil du opdage, at en farve skal have mere plads, mindre plads eller måske spille en helt anden rolle. Du kan nu afslutte dette vækstrum og begynde at bruge din palette i din praksis.",
        guideLabel: "Guide",
        guide: "Du er altid velkommen til at vende tilbage til vækstrummet og justere din palette, hvis dine farver eller deres roller ændrer sig undervejs.",
        takeawayLabel: "Det tager du med dig",
        takeaway: "Det arbejde, du har lavet her, bliver samlet i Fælles samling. Her kan du finde: den valgte farvepalette med farvekoder, farvernes roller, den valgte dosering af farverne, en eventuel tekstfarve, den valgte kontrastkombination, kontrastforholdet og vurderingen af læsbarheden, og dine egne refleksioner fra afprøvningen. Fælles samling kan bruges til at vende tilbage til det, du har arbejdet med, når det skal bruges i praksis.",
        finishButtonLabel: "Gem og fortsæt i Visuelt udtryk"
    }
};
