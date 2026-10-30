/*---- Indhold til rummet "Det visuelle udtryk for din praksis" (grundlæggende, hjem: Visuelt udtryk for din praksis) - jf. docs/duf-manuskript-visuelt-udtryk.md ----*/

export const velkomst = {
    heading: "Velkommen til dit visuelle udtryk",
    paragraphs: [
        "Vi starter med at se på, hvor du står lige nu.",
        "Måske har du allerede et logo, nogle farver og billeder, du bruger. Måske har du gjort dig nogle tanker om dit visuelle udtryk, men er usikker på, om dine valg fungerer i praksis. Eller du starter helt fra bunden.",
        "Uanset hvad tager vi udgangspunkt i din praksis, som den ser ud i dag. Vi begynder med at skabe et overblik og arbejder os videre derfra, ét område ad gangen."
    ],
    buttonText: "Lad os begynde →"
};

/*---- Modul 1 - Boble 1.2's fem svarmuligheder og Boble 1.3's fem matchede responser står i samme rækkefølge i manuskriptet (1=A, 2=B, osv.) - "responses" er derfor keyet direkte på 1.2's svartekst ----*/

/*---- Modulernes titler (fra manuskriptets overskrifter) og antal bobler, til navigationslinjerne (js/components/rumRamme.js). Antallet af moduler læses herfra. Modul 1 har ingen titel i manuskriptet, så den bruger Boble 1.1's overskrift. Modul 2 (2.4/2.5 springes over ved "Jeg har ikke noget endnu") og Modul 5 (valgfrie bobler) har intet fast antal ----*/

export const moduler = [
    { titel: "Før vi går i gang", antalBobler: 4 },
    { titel: "Se på det, du allerede har" },
    { titel: "Farver, billeder, logo og ikoner/fonte: hvad er hvad?", antalBobler: 1 },
    { titel: "Når tingene begynder at hænge sammen", antalBobler: 1 },
    { titel: "Kig ind i rummene" },
    { titel: "Videre herfra", antalBobler: 1 }
];

export const modul1 = {
    intro: {
        heading: "Før vi går i gang",
        paragraphs: [
            "Et visuelt udtryk opstår ofte lidt efter lidt. Du vælger måske en farve, finder et billede, vælger en skrifttype eller får lavet et logo. Nogle valg træffer du bevidst, mens andre opstår undervejs, fordi du har brug for noget konkret til din praksis.",
            "Tilsammen er disse valg med til at forme det visuelle udtryk, som andre møder, når de kommer i kontakt med din praksis."
        ],
        guide: "Du behøver ikke starte forfra for at blive klogere på det, du allerede har."
    },
    question: {
        heading: "Hvordan er dit udgangspunkt?",
        intro: "Vi starter ikke alle samme sted. Nogle har haft et visuelt udtryk i noget tid. Andre har samlet forskellige ting undervejs uden at undersøge, om de passer sammen. Og nogle er stadig ved at finde den retning, der føles rigtig.",
        guide: "Der er ikke noget rigtigt sted at starte fra. Vi skal bare finde ud af, hvor du står lige nu.",
        question: "Hvad passer bedst til dig?",
        options: [
            "Jeg har allerede et visuelt udtryk, men vil gerne forstå det bedre",
            "Jeg har allerede valgt nogle ting, men er ikke sikker på, om de hænger sammen",
            "Jeg er i gang med at skabe noget nyt og prøver stadig at finde min retning",
            "Jeg føler mig helt på bar bund og ved dårligt, hvor jeg skal starte",
            "Jeg vil gerne danne mig et overblik først"
        ],
        /*---- Runde 7: nøglerne, svaret gemmes varigt under som `udgangspunkt` (samme rækkefølge som options) ----*/
        optionKeys: ["harUdtryk", "valgtNoget", "skaberNyt", "barBund", "overblik"]
    },
    responses: {
        "Jeg har allerede et visuelt udtryk, men vil gerne forstå det bedre": {
            text: "Når du ser nærmere på dit visuelle udtryk, kan du få øje på, hvad du gerne vil holde fast i, og hvad du gerne vil ændre. Det handler om at forstå, hvad der fungerer for dig og din praksis, og hvor der er noget, du vil arbejde videre med.",
            guide: "Lad os se nærmere på det, du allerede bruger"
        },
        "Jeg har allerede valgt nogle ting, men er ikke sikker på, om de hænger sammen": {
            text: "Du kan sagtens have valgt farver, billeder og andre elementer, uden at have undersøgt, hvordan de fungerer sammen. Her ser vi både på de enkelte dele og på det samlede udtryk, de skaber.",
            guide: "Først ser vi på, hvad du allerede har, og hvordan det fungerer sammen."
        },
        "Jeg er i gang med at skabe noget nyt og prøver stadig at finde min retning": {
            text: "Når du skaber noget nyt, er der mange valg at tage stilling til. Vi begynder med at skabe overblik over de forskellige elementer og ser derefter på, hvordan de kan fungere sammen. På den måde får du et grundlag for at træffe dine valg undervejs.",
            guide: "Du behøver ikke vælge det hele nu. Vi begynder med at finde ud af, hvad du gerne vil skabe."
        },
        "Jeg føler mig helt på bar bund og ved dårligt, hvor jeg skal starte": {
            text: "Det visuelle er allerede en del af den måde, mennesker møder din praksis på — gennem farver, billeder, logo og de materialer, du bruger. Når du begynder at arbejde bevidst med det, får du mulighed for at forme det indtryk, du gerne vil give. Vi starter med at undersøge, hvad det visuelle kan bidrage med i din praksis.",
            guide: "Vi tager det fra begyndelsen og finder et sted at starte."
        },
        "Jeg vil helst starte med at få et overblik": {
            text: "Når du ser på de forskellige dele af dit visuelle udtryk, bliver det lettere at forstå, hvordan de hænger sammen. Vi begynder med at undersøge dit udgangspunkt, så du får et grundlag for at arbejde videre med de områder, der er relevante for dig.",
            guide: "Lad os begynde med at se på dit udgangspunkt."
        }
    },
    outro: {
        heading: "Uanset hvor du starter",
        paragraphs: [
            "Uanset hvor du starter, har du et udgangspunkt for det videre arbejde. Det næste skridt er at se nærmere på de visuelle elementer, du allerede bruger, eller dem, du gerne vil arbejde med.",
            "Nu skal vi finde ud af, hvad du har at arbejde med. Det kan være de elementer, du allerede bruger, eller de idéer og ønsker, du gerne vil tage med videre."
        ],
        guideLabel: "Sticker",
        guide: "Lad os finde ud af, hvad du har at arbejde med.",
        /*---- Runde 8: manuskriptets "Overgang" vises under stickeren, så boblen både siger "det er okay, uanset hvor du er" og leder videre til Modul 2 ----*/
        paragraphsAfter: [
            "Det kan føles som mange beslutninger at skulle tage stilling til, når du arbejder med din visuelle stil. Derfor er DUF bygget op i vækstrum, hvor du kan fordybe dig i ét område ad gangen. På den måde kan du bevare overblikket, se hvordan de enkelte valg hænger sammen og træffe dine beslutninger undervejs."
        ],
        buttonText: "Videre"
    }
};

/*---- Modul 2 - boblenumre efter runde 7 (ny Boble 2.2 om kanaler, de gamle 2.2-2.5 er nu 2.3-2.6). Bemærk: modsat Modul 1's responses (som har separat text+guide) er Boble 2.4/2.5's responser rene strenge - manuskriptets guide/avatar-citater for enkelte af Boble 2.5's svar er derfor ikke medtaget, kun hovedteksten.

Modul 2 har to veje (jf. tabellen øverst i Modul 2 i manuskriptet): har brugeren krydset kanaler af i 2.2, går hun 2.3 → 2.4 → 2.5 → 2.6. Har hun valgt "Jeg har ikke noget endnu", får hun hvadBrugerDuNy (variant af 2.3) og derefter outroNy (variant af 2.6). ----*/

export const modul2 = {
    intro: {
        heading: "Du har allerede et udgangspunkt",
        paragraphs: [
            "Du starter ikke nødvendigvis fra nul. Ord som »visuelt udtryk« og »visuel identitet« kan lyde som noget, man først har, når det hele er lavet færdigt. Men sådan er det sjældent. De fleste har allerede truffet nogle valg, bevidst eller ej: en farve på hjemmesiden, et billede på Facebook, en skrifttype på visitkortet. Alt det er et udgangspunkt. Og før du tager stilling til, hvad du vil ændre eller bygge videre på, giver det mening at få øje på, hvad der allerede er der.",
            "Og har du ikke noget endnu, er det også et helt fint sted at starte. Det finder vi ud af sammen på næste skærm."
        ],
        guide: "Først finder vi ud af, hvad du har at arbejde med."
    },
    /*---- Boble 2.2 - "key" er det, der gemmes varigt i `kanaler[]`. exclusiveKey ("Jeg har ikke noget endnu") kan ikke kombineres med de andre ----*/
    kanaler: {
        heading: "Hvor møder folk din praksis?",
        intro: "Før vi ser på farver, billeder og logo, vil vi gerne vide, hvor mennesker kan møde din praksis i dag. Det hjælper os med at tale ud fra det, du rent faktisk har, og ikke ud fra noget, du måske slet ikke er gået i gang med endnu.",
        options: [
            { key: "hjemmeside", title: "Hjemmeside" },
            { key: "facebook", title: "Facebook" },
            { key: "instagram", title: "Instagram" },
            { key: "linkedin", title: "LinkedIn" },
            { key: "andreSociale", title: "Andre sociale medier" },
            { key: "nyhedsbrev", title: "Nyhedsbrev" },
            { key: "booking", title: "Bookingsystem" },
            { key: "trykt", title: "Visitkort, flyers eller andet trykt" },
            { key: "andet", title: "Noget andet" },
            { key: "ingen", title: "Jeg har ikke noget endnu" }
        ],
        exclusiveKey: "ingen",
        responses: {
            harKanaler: "Godt. Så har vi noget konkret at kigge på sammen.",
            ingen: "Det er et rigtig godt sted at starte. Så kan du bygge dit visuelle udtryk op fra begyndelsen, uden at skulle rydde op i noget først. Når vi spørger til det, du allerede har, kan du i stedet tænke på det, du gerne vil have."
        },
        /*---- Boble 6.1's linje om kanalerne ----*/
        recapPrefix: "Folk kan møde din praksis her:",
        recapIngen: "Du starter med et rent bord."
    },
    hvadBrugerDu: {
        heading: "Hvad bruger du allerede?",
        intro: "Det visuelle omkring din praksis er ikke én ting. Folk møder forskellige dele af det forskellige steder: på din hjemmeside, på de sociale medier, på et visitkort eller når de booker en tid. Lad os starte med at få øje på, hvad du allerede bruger. Vælg alt det, der passer.",
        options: [
            "🎨 Farver, jeg allerede bruger",
            "🖼️ Billeder, jeg allerede har",
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
            ikkeSikker: "Det er helt fint. Vi hjælper dig med at få øje på det undervejs.",
            ikonNudge: "Du bruger allerede nogle af de ting, der er med til at give din praksis sit eget visuelle præg. Senere kan vi se nærmere på, hvordan de kan fungere sammen og understøtte resten af dit visuelle udtryk."
        }
    },
    /*---- Variant af Boble 2.3 - kun for brugeren, der valgte "Jeg har ikke noget endnu" i 2.2 ----*/
    hvadBrugerDuNy: {
        heading: "Hvad har du lyst til at starte med?",
        intro: "Du har ikke noget i brug endnu, og det er helt fint. Så lad os i stedet se, om der er noget, du allerede har tænkt over, eller noget, du har lyst til at starte med. Vælg det, der trækker i dig. Du kan altid ændre mening.",
        options: [
            { key: "farver", title: "🎨 Farver", description: "Jeg har en idé om, hvilke farver jeg vil bruge" },
            { key: "billeder", title: "🖼️ Billeder", description: "Jeg har en idé om, hvilke billeder jeg vil vise" },
            { key: "logo", title: "✳️ Logo", description: "Jeg vil gerne have et logo" },
            { key: "byggesten", title: "🔤 Skrifttyper, ikoner og illustrationer", description: "De små detaljer interesserer mig" },
            { key: "vedIkke", title: "🤷 Jeg ved det ikke endnu" }
        ],
        vedIkkeKey: "vedIkke",
        responses: {
            nogetValgt: "Så har du allerede et sted at begynde. Det tager vi med videre.",
            vedIkke: "Det behøver du heller ikke. Det er det, de næste skridt skal hjælpe dig med."
        }
    },
    moenster: {
        heading: "Kan du se om der er en sammenhæng?",
        intro: "Når du ser på de farver, billeder, logoer og andre elementer, du bruger, kan du måske få øje på noget, der går igen. Måske passer nogle af tingene godt sammen, mens andre skiller sig ud. Lige nu handler det bare om at se på det, du allerede har, og lægge mærke til, hvordan det hænger sammen.",
        question: "Hvad genkender du mest?",
        options: [
            "🟢 Noget går igen",
            "🟡 Noget går igen, men ikke det hele",
            "🔵 Det er ret blandet",
            "⚪ Jeg har svært ved at se det"
        ],
        responses: {
            "🟢 Noget går igen": "Det er en god ting at få øje på. Noget af det, du bruger, er allerede begyndt at skabe en retning, og den kan du bygge videre på.",
            "🟡 Noget går igen, men ikke det hele": "Det er helt normalt. Noget kan godt være valgt med en bestemt retning, mens andet er kommet til undervejs. Nu har du fået øje på, at der både er noget at bygge videre på og noget, du kan undersøge nærmere.",
            "🔵 Det er ret blandet": "Det giver dig faktisk et tydeligt udgangspunkt. Nu ved du, at en del af arbejdet kan handle om at finde ud af, hvad du gerne vil samle — og hvad du ikke behøver tage med videre.",
            "⚪ Jeg har svært ved at se det": "Det behøver du ikke kunne endnu — det kan være svært at se mønstre i noget, man selv har kigget på mange gange."
        }
    },
    folelse: {
        heading: "Hvordan har du det med det, du ser?",
        intro: "Du behøver ikke kunne vurdere dit visuelle udtryk fagligt, og det handler ikke om at finde fejl. Nu har du set nærmere på det, du allerede bruger, og på hvordan de forskellige dele hænger sammen. Hvordan oplever du det, du ser",
        question: "Hvad passer bedst på din oplevelse lige nu?",
        options: [
            "🌱 Jeg kan godt lide den retning, jeg allerede er i",
            "🧩 Noget føles rigtigt — noget andet gør ikke",
            "🔍 Jeg er blevet opmærksom på, at jeg mangler at tage stilling til noget",
            "🌪️ Jeg har svært ved at se den røde tråd",
            "🧭 Jeg føler mig helt på bar bund og ved dårligt, hvor jeg skal starte"
        ],
        responses: {
            "🌱 Jeg kan godt lide den retning, jeg allerede er i": "Det er et godt udgangspunkt. Du behøver ikke ændre noget, bare fordi du arbejder med dit visuelle udtryk. Noget af det næste arbejde kan handle om at forstå, hvad det er, der allerede fungerer, så du lettere kan bygge videre på det og bruge det mere bevidst.",
            "🧩 Noget føles rigtigt — noget andet gør ikke": "Det giver dig allerede noget vigtigt at arbejde med. Du behøver ikke starte forfra, bare fordi noget ikke helt passer. Når vi arbejder videre, kan du blive klogere på, hvad du gerne vil beholde, og hvad der trænger til en ny beslutning.",
            "🔍 Jeg er blevet opmærksom på, at jeg mangler at tage stilling til noget": "Det er faktisk præcis den slags, DUF kan hjælpe med. Du behøver ikke beslutte det hele nu. Det vigtigste er, at du har fået øje på nogle områder, du gerne vil undersøge nærmere.",
            "🌪️ Jeg har svært ved at se den røde tråd": "Når forskellige elementer er kommet til på forskellige tidspunkter, kan det være svært at se, hvordan de hænger sammen. Det giver os et godt sted at begynde. Vi kan undersøge de enkelte dele og finde ud af, hvad der passer til dig og din praksis.",
            "🧭 Jeg føler mig helt på bar bund og ved dårligt, hvor jeg skal starte": "Det kan være svært at vide, hvor du skal begynde, når du endnu ikke har fundet en retning. Derfor tager vi det ét område ad gangen. Du får hjælp til at undersøge mulighederne og træffe beslutninger, der passer til dig og din praksis."
        }
    },
    outro: {
        heading: "Du har et sted at starte",
        paragraphs: [
            "Du behøver ikke have fundet alle svarene endnu. Du har lige set nærmere på det visuelle omkring din praksis, som det ser ud lige nu. Måske har du fået øje på noget, der allerede fungerer godt. Måske har du opdaget noget, du gerne vil ændre. Eller måske er du stadig ved at finde ud af, hvilken retning der føles rigtig.",
            "Det giver dig et udgangspunkt for det videre arbejde. Når du ved mere om, hvad du allerede har, og hvordan du har det med det, bliver det lettere at tage stilling til de enkelte dele."
        ],
        guide: "Du skal ikke løse det hele nu. Vi tager det ét område ad gangen."
    },
    /*---- Variant af Boble 2.6 - kun for brugeren, der valgte "Jeg har ikke noget endnu" i 2.2 ----*/
    outroNy: {
        heading: "Du har et sted at starte",
        paragraphs: [
            "Du behøver ikke have noget på plads for at begynde. Når du starter fra bunden, får du mulighed for at træffe dine valg med omtanke fra begyndelsen. Vi tager ét område ad gangen og tager udgangspunkt i det, du gerne vil skabe, og det, der passer til dig og din praksis."
        ],
        guide: "Et tomt lærred er ikke et tomt udgangspunkt."
    }
};

/*---- Modul 3 - én skærm med en accordion (runde 7, erstatter "oversigt + valgfrie bobler" 3.2A-D). Overskrift (title) og intro-linje (teaser) er altid synlige, body folder sig ud ved tryk ----*/

export const modul3 = {
    heading: "Hvad består din visuelle stil af",
    intro: "Din visuelle stil består af flere elementer, der spiller sammen. Vi har delt dem op i fire områder, så du kan lære dem at kende og arbejde med ét ad gangen. Grænserne er ikke skarpe - farverne i et billede har for eksempel også betydning for din farveretning. Her får du en kort introduktion til hvert område. Tryk på et af dem for at læse mere.",
    buttonText: "Videre",
    items: [
        {
            key: "farver",
            title: "🎨 Farver",
            teaser: "Farver er ofte det første, folk lægger mærke til — og det, der binder resten sammen.",
            body: "Dine farver giver et indtryk med det samme, og de hjælper folk med at kende dig igen næste gang, de ser dig. Det kan være farverne på din hjemmeside, dit visitkort eller dine opslag. De fleste har brug for nogle få farver, der har hver sin opgave: én, der bærer det meste, én, der fremhæver det vigtige, og én, der gør teksten let at læse. Du behøver ikke kunne det endnu. Det er det, Farver-rummet hjælper dig med."
        },
        {
            key: "billeder",
            title: "🖼️ Billeder",
            teaser: "Billeder fortæller en historie, før nogen har læst et eneste ord.",
            body: "Billeder viser, hvordan det føles at komme hos dig: rummet, lyset, stemningen, måske dig selv. Et roligt billede fra din behandlingsstol kan sige mere end en lang tekst. Du kan tage billederne selv eller hente dem fra en billedbank. Uanset hvad skal du vide, at du må bruge dem. Og har du ingen billeder endnu, kan du vælge med omtanke fra begyndelsen."
        },
        {
            key: "logo",
            title: "✳️ Logo",
            teaser: "Dit logo er ikke hele din identitet, men det er ofte det første, folk genkender.",
            body: "Et logo er et genkendelsestegn. Det kan være dit navn skrevet på en bestemt måde, et lille symbol eller begge dele. Det behøver ikke fortælle hele din historie. Det skal kunne kendes igen, både stort på et skilt og småt som profilbillede. Mange har derfor flere udgaver af det samme logo, fx kun symbolet til de små steder."
        },
        {
            key: "byggesten",
            title: "🧩 Ikoner, fonte og andre byggesten",
            teaser: "De mindre detaljer er ofte det, folk ikke lægger mærke til, når det virker - men de lægger mærke til det, når det ikke gør.",
            body: "Det er de små ting, der binder det hele sammen. <strong>Ikoner</strong> er små, enkle tegn, der viser noget hurtigt, fx en telefon ved dit nummer eller en kalender ved 'Book tid'. <strong>Illustrationer</strong> er tegninger, der kan forklare noget eller give stemning. <strong>Skrifttyper</strong> er bogstavernes udseende. De påvirker både, hvordan din tekst føles, og hvor let den er at læse, på skærmen og på papir."
        }
    ]
};

/*---- Modul 4 - manuskriptets tre "Section"-afsnit samlet til to afsnitsgrupper med guide-citatet imellem Section 2 og 3, jf. designnoten i docs/duf-manuskript-visuelt-udtryk.md ----*/

export const modul4 = {
    heading: "Når tingene begynder at hænge sammen",
    paragraphs: [
        "Farver, billeder, logo, skrifttyper og de mindre byggesten påvirker hinanden. Derfor giver det mening at se dem som dele af det samme visuelle udtryk. Men du behøver ikke arbejde med det hele på én gang. Du kan begynde ét sted og løbende se på, hvordan dine valg tilsammen skaber et udtryk, hvor de forskellige elementer understøtter hinanden og den oplevelse, du gerne vil give andre.",
        "Har du for eksempel valgt nogle farver, kan de hjælpe dig med at finde billeder, der passer til den stemning, du ønsker. Omvendt kan et billede også inspirere dig til at justere dine farver. Hvert valg giver dig noget at arbejde videre med."
    ],
    guide: "Du behøver ikke have hele planen klar. Vælg det næste konkrete skridt og arbejd videre derfra.",
    paragraphsAfter: [
        "Det vigtigste er ikke, at du beslutter det hele på én gang. Det er, at du bliver klogere på dine valg undervejs og får skabt et visuelt udtryk, der hænger sammen og giver mening for din praksis. "
    ]
};

export const modul5 = {
    heading: "Kig ind i rummene",
    intro: "Nu kan du kigge nærmere på de fire områder og se, hvad du kan arbejde med i hvert rum. Du behøver ikke have besluttet, hvor du vil begynde. Tag et kig, og find det område, der giver mest mening for dig lige nu.",
    bubbles: [
        {
            key: "farver",
            title: "En farveretning, du faktisk kan bruge.",
            teaser: "En farvepalet, der passer til din praksis, kan bruges på tværs af dine materialer og understøtter det udtryk, du gerne vil skabe.",
            body: "I Farver arbejder du med at finde en farveretning, der passer til dig og din praksis. Det handler ikke kun om at vælge farver, du kan lide, men også om at forstå, hvordan de fungerer sammen, hvilken stemning de skaber, og hvordan du kan bruge dem på tværs af de steder, hvor mennesker møder dig.",
            workList: [
                "Hvad farverne skal udtrykke",
                "Hvordan du finder en farveretning",
                "Hvordan farverne fungerer sammen",
                "Hvordan du bruger farverne, så indholdet er let at læse og forstå"
            ],
            guide: "Du skal kunne bruge dine farver igen og igen - på tværs af de steder, hvor mennesker møder din praksis."
        },
        {
            key: "billeder",
            title: "Billeder, der fortæller den rigtige historie.",
            teaser: "Kriterier for, hvilke billeder der passer til dig — og ro i maven om, at du må bruge dem.",
            body: "I Billeder handler det ikke om at finde billeder, alle synes er flotte. Det handler om at finde ud af, hvad du gerne vil vise, og så vælge billeder, der fortæller netop det.",
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
            body: "I Logo er målet ikke nødvendigvis et nyt logo. Det er at finde ud af, hvad dit logo skal kunne, og hvad der giver mening som næste skridt. Måske beholder du det, du har, måske justerer du det, eller måske laver du et nyt.",
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
            title: "De små valg, der får helheden til at hænge sammen.",
            teaser: "Få en retning for ikoner, skrifttyper og illustrationer, så de understøtter din visuelle stil og fungerer i praksis.",
            body: "I Byggesten ser du nærmere på de mindre elementer, der er med til at forme din visuelle stil. Ikoner hjælper mennesker med hurtigt at forstå information og finde rundt. Illustrationer kan forklare noget eller tilføre stemning, mens skrifttyper påvirker både udtrykket og læsbarheden. Det handler om at finde løsninger, der passer til din praksis og fungerer sammen med de øvrige elementer.",
            guide: "De små detaljer er med til at gøre din visuelle stil genkendelig.",
            takeaway: "Et bedre grundlag for at vælge ikoner, skrifttyper og illustrationer, der passer til din praksis."
        }
    ]
};

/*---- Modul 6 - ingen automatisk matchning (fjernet 2026-09-09, jf. docs/duf-manuskript-visuelt-udtryk.md). Boble 6.1 opsummerer i stedet Boble 2.2's kanaler og Boble 2.3/2.4/2.5's svar ordret (for brugeren, der ikke har noget endnu: kanal-linjen og 2.3-variantens svar, uden 2.4/2.5) og lader brugeren vælge frit mellem alle fire uddybende rum. Rækkefølgen Farver → Logo → Billeder → Byggesten følger manuskriptets opremsning i Boble 6.1. ----*/

export const modul6 = {
    recapIntro: "Du har nu gjort dig nogle overvejelser om din visuelle stil og det, du gerne vil arbejde videre med. Her er en opsamling af det, du har fortalt os undervejs:",
    guide: "Du har allerede gjort dig nogle vigtige overvejelser om, hvor du står. Nu kan du vælge, hvilket område du vil arbejde videre med.",
    closing: "Din visuelle styleguide begynder med de valg, du træffer undervejs. Vælg det rum, der trækker mest i dig lige nu, og tag det næste skridt."
};

export const ROOMS = {
    farver: {
        id: "farver",
        name: "Farver",
        link: "farver.html?fra=velkommen-visuelt-udtryk"
    },
    logo: {
        id: "logo",
        name: "Logo",
        link: "logo.html?fra=velkommen-visuelt-udtryk"
    },
    billeder: {
        id: "billeder",
        name: "Billeder",
        link: "billeder.html?fra=velkommen-visuelt-udtryk"
    },
    byggesten: {
        id: "byggesten",
        name: "Ikoner, fonte og andre byggesten",
        link: "byggesten.html"
    }
};
