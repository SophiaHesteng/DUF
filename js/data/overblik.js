/*---- Indhold til vækstrummet "Overblik" (grundlæggende, hjem: Visuelt udtryk) - jf. docs/duf-manuskript-overblik.md ----*/

export const velkomst = {
    heading: "Velkommen til dit visuelle udtryk",
    paragraphs: [
        "Det visuelle er en del af det første indtryk, andre får af din praksis. Farver, billeder, logo og grafiske detaljer er med til at skabe en oplevelse og kan fortælle noget om, hvem du er, og hvad mennesker kan forvente, når de møder din praksis.",
        "Men du behøver ikke allerede have fundet det rigtige. Måske har du nogle ting på plads. Måske er det hele stadig ved at tage form. Måske har du slet ikke tænkt så meget over det endnu. Alle steder er helt fine at starte fra.",
        "Her får du et overblik over de forskellige dele af dit visuelle udtryk. Undervejs undersøger vi, hvordan de kan spille sammen, og du får mulighed for at tage små stillinger til, hvad der giver mening for dig. Du skal ikke træffe alle beslutninger i dag.",
        "Vi begynder bare med at kigge på, hvor du står lige nu. Der er ingen rigtige eller forkerte svar undervejs."
    ],
    buttonText: "Lad os begynde →"
};

/*---- Modul 1 - Boble 1.2's fem svarmuligheder og Boble 1.3's fem matchede responser står i samme rækkefølge i manuskriptet (1=A, 2=B, osv.) - "responses" er derfor keyet direkte på 1.2's svartekst ----*/

export const modul1 = {
    intro: {
        heading: "Før vi går i gang",
        paragraphs: [
            "Et visuelt udtryk opstår ikke nødvendigvis, fordi man på et tidspunkt sætter sig ned og beslutter, hvordan ens praksis skal se ud. Det begynder ofte med små valg — en farve, du godt kan lide, et billede der føles rigtigt, en skrifttype der ser god ud, et logo du selv har lavet eller fået hjælp til.",
            "Når de forskellige valg mødes, begynder der at tegne sig et visuelt udtryk, der afspejler dig og din praksis. Nogle valg er truffet helt bevidst. Andre er opstået, fordi noget skulle bruges, laves eller besluttes. Begge dele er helt almindelige."
        ],
        guide: "Du behøver ikke starte forfra for at blive klogere på det, du allerede har."
    },
    question: {
        heading: "Hvor starter du?",
        intro: "Først vil vi gerne vide, hvor du starter. Vi starter ikke alle sammen det samme sted — nogle har allerede et visuelt udtryk, de har brugt i noget tid, andre har samlet forskellige elementer undervejs uden at have set på, hvordan de fungerer sammen, og nogle er stadig ved at finde ud af, hvilken retning der passer. Du behøver ikke have styr på det hele, før du begynder.",
        guide: "Der er ikke noget rigtigt sted at starte fra. Vi skal bare finde ud af, hvor du står lige nu.",
        question: "Hvad passer bedst på dig?",
        options: [
            "Jeg har allerede et visuelt udtryk, men vil gerne forstå det bedre",
            "Jeg har allerede valgt nogle ting, men er ikke sikker på, om de hænger sammen",
            "Jeg er i gang med at skabe noget nyt og prøver stadig at finde min retning",
            "Jeg føler mig helt på bar bund og ved dårligt, hvor jeg skal starte",
            "Jeg vil helst starte med at få et overblik"
        ]
    },
    responses: {
        "Jeg har allerede et visuelt udtryk, men vil gerne forstå det bedre": {
            text: "Du har allerede noget at tage udgangspunkt i. Det er en fordel — ikke fordi alt nødvendigvis skal blive, som det er, men fordi du har noget konkret at kigge på. Når du begynder at se nærmere på dit visuelle udtryk, kan du få øje på ting, du gerne vil holde fast i — eller opdage noget, du gerne vil ændre. Det er ikke et spørgsmål om at starte forfra. Det handler om at blive klogere på det, du allerede har.",
            guide: "Du har allerede et sted at starte. Lad os kigge på det sammen."
        },
        "Jeg har allerede valgt nogle ting, men er ikke sikker på, om de hænger sammen": {
            text: "Det giver rigtig god mening. Man kan sagtens have fundet forskellige ting, man godt kan lide, uden at have set på, hvordan de fungerer sammen. Det betyder ikke nødvendigvis, at noget er forkert — det kan handle om, at de forskellige dele endnu ikke har fået lov til at mødes. Det er noget af det, vi skal kigge på her: ikke bare farverne, billederne eller logoet hver for sig, men også hvad der sker, når de bliver brugt sammen.",
            guide: "Vi behøver ikke smide noget ud. Først skal vi finde ud af, hvad der allerede fungerer — og hvad der kan have brug for lidt mere opmærksomhed."
        },
        "Jeg er i gang med at skabe noget nyt og prøver stadig at finde min retning": {
            text: "Når du er i gang med at skabe noget nyt, kan der hurtigt opstå mange muligheder på én gang — farver, billeder, logo, skrifttyper. Det kan føles, som om du skal tage stilling til det hele på én gang. Det skal du ikke. Her får du først mulighed for at skabe et overblik over de forskellige dele og se på, hvordan de kan hænge sammen. Derfra kan du begynde at tage små beslutninger og afprøve dem i praksis.",
            guide: "Du behøver ikke kende hele vejen. Det er nok at finde det næste sted at begynde."
        },
        "Jeg føler mig helt på bar bund og ved dårligt, hvor jeg skal starte": {
            text: "Det er helt okay. Når du bygger eller udvikler en praksis, er der mange ting, der kalder på din opmærksomhed — økonomi, markedsføring, klienter, din faglighed, måske en hjemmeside. Det visuelle står ikke altid øverst på listen. Men det er allerede en del af den måde, mennesker møder din praksis på: farverne på din hjemmeside, de billeder du bruger, dit logo, måden dine opslag ser ud på. Det betyder ikke, at det visuelle er vigtigere end alt det andet — men det behøver ikke stå alene for at være vigtigt. Her begynder vi med at kigge på, hvad det visuelle kan gøre.",
            guide: "Du skal ikke finde vejen først. Vi kan godt begynde at gå."
        },
        "Jeg vil helst starte med at få et overblik": {
            text: "Det er et godt sted at starte. Du behøver ikke allerede have fundet et problem, der skal løses, eller vide, hvad dit næste skridt skal være. Et overblik kan hjælpe dig med at se de forskellige dele samlet — og få øje på, hvad der allerede er på plads, hvad der hænger sammen, og hvad der kalder på lidt mere opmærksomhed.",
            guide: "Vi starter med at kigge. Resten kan vi tage, når vi kommer dertil."
        }
    },
    outro: {
        heading: "Uanset hvor du starter",
        paragraphs: [
            "Du behøver ikke have styr på farver, billeder, logo eller alt det andet, der er med til at skabe et visuelt udtryk. Du behøver heller ikke vide endnu, hvad du vil ændre, beholde eller arbejde videre med. Men når du begynder at se på de forskellige dele samlet, bliver det lettere at forstå, hvad de hver især gør — og hvordan de kan spille sammen. Det er det, vi begynder med nu."
        ],
        guideLabel: "Sticker",
        guide: "Du skal ikke beslutte alt. Du skal bare begynde et sted.",
        buttonText: "Videre"
    }
};

/*---- Modul 2 - Boble 2.2/2.3/2.4/2.5's tekst er nu fuldt hentet fra revisionsdokumentet (rettet 2026-09-09, se docs/duf-manuskript-overblik.md). Bemærk: modsat Modul 1's responses (som har separat text+guide) er Boble 2.3/2.4's responser rene strenge - manuskriptets guide/avatar-citater for enkelte af Boble 2.4's svar er derfor ikke medtaget, kun hovedteksten. ----*/

export const modul2 = {
    intro: {
        heading: "Du har allerede et udgangspunkt",
        paragraphs: [
            "Du starter ikke nødvendigvis fra nul. Når man hører ordene visuelt udtryk eller visuel identitet, kan det hurtigt lyde som noget, man først har, når man har fået lavet det hele færdigt. Men sådan behøver det ikke være — du har sandsynligvis allerede truffet nogle valg, bevidst eller ej. Det hele er et udgangspunkt. Før du kan tage stilling til, hvad du vil ændre eller bygge videre på, giver det mening at få øje på, hvad der allerede er der."
        ],
        guide: "Du skal ikke rydde bordet og starte forfra. Vi begynder med at se på det, du allerede har."
    },
    hvadBrugerDu: {
        heading: "Hvad bruger du allerede?",
        intro: "Det visuelle omkring din praksis består ikke kun af én ting — mennesker møder forskellige dele forskellige steder: hjemmeside, sociale medier, materialer, når de booker en tid. Lad os starte med at få øje på, hvad der allerede er i spil.",
        options: [
            "🎨 Farver",
            "🖼️ Billeder",
            "✳️ Logo",
            "🔣 Ikoner",
            "✏️ Illustrationer",
            "🔤 Skrifttyper",
            "📱 Noget andet",
            "🤷 Jeg er ikke sikker endnu"
        ],
        ikonAgtigeValg: ["🔣 Ikoner", "✏️ Illustrationer", "🔤 Skrifttyper"],
        ikkeSikkerValg: "🤷 Jeg er ikke sikker endnu",
        responses: {
            mange: "Nu kan vi begynde at se på, hvordan de fungerer — både hver for sig og sammen.",
            faa: "Det, du allerede bruger, er nok til, at vi kan tage det næste skridt.",
            ikkeSikker: "Vi hjælper dig med at få øje på det undervejs.",
            ikonNudge: "Du bruger allerede nogle af de ting, der er med til at give din praksis sit eget visuelle præg. Senere kan vi se nærmere på, hvordan de kan fungere sammen og understøtte resten af dit visuelle udtryk."
        }
    },
    moenster: {
        heading: "Se efter det, der går igen",
        intro: "Når du begynder at se på de forskellige ting, du bruger, kan der dukke nogle mønstre op. Begge dele — mønster eller ej — fortæller noget om dit udgangspunkt. Lige nu handler det bare om at få øje på det, der allerede er der.",
        question: "Hvad genkender du mest?",
        options: [
            "🟢 Noget går igen",
            "🟡 Noget går igen, men ikke det hele",
            "🔵 Det er ret blandet",
            "⚪ Jeg har svært ved at se det"
        ],
        responses: {
            "🟢 Noget går igen": "Noget af det, du bruger, begynder allerede at skabe en retning.",
            "🟡 Noget går igen, men ikke det hele": "Det er helt normalt. Noget kan godt være valgt med en bestemt retning, mens andet er kommet til undervejs. Nu har du fået øje på, at der både er noget at bygge videre på og noget, du kan undersøge nærmere.",
            "🔵 Det er ret blandet": "Det giver dig faktisk et tydeligt udgangspunkt. Nu ved du, at en del af arbejdet kan handle om at finde ud af, hvad du gerne vil samle — og hvad du ikke behøver tage med videre.",
            "⚪ Jeg har svært ved at se det": "Det behøver du ikke kunne endnu — det kan være svært at se mønstre i noget, man selv har kigget på mange gange."
        }
    },
    folelse: {
        heading: "Hvordan har du det med det, du ser?",
        intro: "Du behøver ikke kunne vurdere dit visuelle udtryk fagligt, og det er ikke meningen, at du nu skal finde fejl. Men når du ser på de ting, du allerede bruger, har du måske fået øje på noget, du ikke havde tænkt over før.",
        question: "Hvordan har du det med det, du ser?",
        options: [
            "🌱 Jeg kan godt lide den retning, jeg allerede er i",
            "🧩 Noget føles rigtigt — noget andet gør ikke",
            "🔍 Jeg er blevet opmærksom på, at jeg mangler at tage stilling til noget",
            "🌪️ Det hele føles lidt blandet lige nu",
            "🧭 Jeg føler mig helt på bar bund og ved dårligt, hvor jeg skal starte"
        ],
        responses: {
            "🌱 Jeg kan godt lide den retning, jeg allerede er i": "Det er et godt udgangspunkt. Du behøver ikke ændre noget, bare fordi du arbejder med dit visuelle udtryk. Noget af det næste arbejde kan handle om at forstå, hvad det er, der allerede fungerer, så du lettere kan bygge videre på det og bruge det mere bevidst.",
            "🧩 Noget føles rigtigt — noget andet gør ikke": "Det giver dig allerede noget vigtigt at arbejde med. Du behøver ikke starte forfra, bare fordi noget ikke helt passer. Når vi arbejder videre, kan du blive klogere på, hvad du gerne vil beholde, og hvad der trænger til en ny beslutning.",
            "🔍 Jeg er blevet opmærksom på, at jeg mangler at tage stilling til noget": "Det er faktisk præcis den slags, et vækstrum kan hjælpe med. Du behøver ikke beslutte det hele nu. Det vigtigste er, at du har fået øje på nogle områder, du gerne vil undersøge nærmere.",
            "🌪️ Det hele føles lidt blandet lige nu": "Så er du ikke alene. Når forskellige ting er opstået på forskellige tidspunkter, kan det være svært at se dem som en samlet helhed. Du behøver ikke løse det hele på én gang. Vi kan tage de forskellige områder ét ad gangen og begynde at finde ud af, hvad der giver mening for dig og din praksis.",
            "🧭 Jeg føler mig helt på bar bund og ved dårligt, hvor jeg skal starte": "Det kan føles overvældende, når der er mange ting at tage stilling til, og man ikke rigtig ved, hvor man skal begynde. Det behøver du heldigvis ikke finde ud af alene. Du skal ikke tage alle beslutninger på én gang. Vi hjælper dig med at dele det op og tage ét område ad gangen, så du kan begynde at finde en retning, der giver mening for dig og din praksis."
        }
    },
    outro: {
        heading: "Du har et sted at starte",
        paragraphs: [
            "Du behøver ikke have fundet alle svarene endnu. Det var heller ikke meningen. Du har lige set nærmere på det visuelle omkring din praksis, som det ser ud lige nu. Måske har du fået øje på noget, der allerede fungerer godt. Måske har du opdaget noget, du gerne vil ændre. Eller måske er du stadig i gang med at finde ud af, hvilken retning der føles rigtig.",
            "Uanset hvor du står, har du nu et udgangspunkt at arbejde videre fra. For det bliver lettere at tage stilling til de enkelte dele, når du ved lidt mere om, hvad du allerede har — og hvordan du har det med det."
        ],
        guide: "Du skal ikke løse det hele nu. Vi tager det ét område ad gangen."
    }
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

/*---- Modul 4 - manuskriptets tre "Section"-afsnit samlet til to afsnitsgrupper med guide-citatet imellem Section 2 og 3, jf. designnoten i docs/duf-manuskript-overblik.md ----*/

export const modul4 = {
    heading: "Når tingene begynder at hænge sammen",
    paragraphs: [
        "Du behøver ikke løse det hele på én gang: de fire dele påvirker hinanden, men det betyder ikke, at alt skal afklares, før man kan begynde. Man kan starte ét sted og senere se, hvordan andre dele passer ind i den valgte retning.",
        "Tag ét valg ad gangen: et valg ét sted gør det ofte lettere, ikke sværere, at tage stilling til resten."
    ],
    guide: "Du behøver ikke have hele planen klar. Vælg det næste konkrete skridt og arbejd videre derfra.",
    paragraphsAfter: [
        "Det er sådan, helheden opstår: et visuelt udtryk opstår også ved at træffe valg og bruge dem i praksis, ikke kun ved at planlægge alt på forhånd. Det vigtigste lige nu er at vælge noget konkret at arbejde med, ikke at finde den perfekte løsning."
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

/*---- Modul 6 - ingen automatisk matchning (fjernet 2026-09-09, jf. docs/duf-manuskript-overblik.md). Boble 6.1 opsummerer i stedet Boble 2.2/2.3/2.4's svar ordret og lader brugeren vælge frit mellem alle fire uddybende rum. Rækkefølgen Farver → Logo → Billeder → Byggesten følger manuskriptets opremsning i Boble 6.1. ----*/

export const modul6 = {
    recapIntro: "Du har nu set nærmere på, hvor du står i dag. Her er en opsamling af det, du har fortalt os undervejs:",
    guide: "Du har allerede gjort arbejdet med at fortælle os, hvor du står. Nu er det dit valg, hvor du vil kigge videre.",
    closing: "Et overblik bliver først rigtig brugbart, når du begynder at bruge det."
};

export const ROOMS = {
    farver: {
        id: "farver",
        name: "Farver",
        link: "vaekstrum-farver.html?fra=overblik"
    },
    logo: {
        id: "logo",
        name: "Logo",
        link: "vaekstrum-logo.html?fra=overblik"
    },
    billeder: {
        id: "billeder",
        name: "Billeder",
        link: "vaekstrum-billeder.html?fra=overblik"
    },
    byggesten: {
        id: "byggesten",
        name: "Ikoner, fonte og andre byggesten",
        link: "vaekstrum-byggesten.html"
    }
};
