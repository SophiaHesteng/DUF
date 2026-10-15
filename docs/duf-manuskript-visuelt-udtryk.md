# MANUSKRIPT — Det visuelle udtryk for din praksis

*Status: Revideret 2026-09-08. Erstatter det tidligere flade modul-for-modul-udkast med en fuld boble-struktur (Vækstrum → Modul → Bobler, jf. [[DUF Teknisk - Navigationslinjer (modul og boble)]]). Bygger på revisionsarbejdet i `arkiv/DUF Manuskript-revision - Overblik.md` (projektdokument, arkiveret) (Heidis udkast + Claudes tekniske vurdering af, hvad der matcher den eksisterende motor). Beslutninger taget undervejs: ingen tie-break i Modul 6 (brugeren vælger frit mellem de reelt relevante rum, uanset hvor mange der er); Modul 3 og Modul 5 bygges som "oversigt + valgfrie bobler", der kan besøges i vilkårlig rækkefølge.*

*⚠️ **Runde 7 (2026-09-25, efter brugertest 1):** se [[DUF Brugertest 1 - Visuelt vækstområde (sortering)]]. Ændringer: ny Boble 2.2 om kanaler (godkendt af Heidi), boblerne i Modul 2 nummereres én op (2.2 → 2.3 osv.), et nyt spor for brugeren, der ikke har noget endnu, Modul 3 laves om til en accordion med nye uddybende tekster, lagringen udvides, og "på dig" → "til dig" i 1.2. Alle nye tekster er godkendt af Heidi 2026-09-25. Klar til implementering, se [[DUF Prompt - Overblik (runde 7)]].*

*✏️ **Runde 8 (2026-10-12, Trello-kort 91):** tekstgennemgang i guru-ven-tonen. Rettet: velkomst (3. afsnit), 1.2-intro, 1.3 svar D, 1.4-overgangen (omskrevet og nu også i koden), 2.1, 2.2 (svaret "ingen"), 2.3 (intro og "ikke sikker"), 2.4 (intro og 🟢), Modul 3 (overskrift og Farver-tekst), Modul 4 (noter erstattet af rigtig brugertekst), Modul 5 (brødtekst i de fire bobler) og Modul 6 (afrunding). Struktur, svarmuligheder og gem-logik er uændret.*

**Sådan læses dette dokument:** Et modul beskriver det overordnede emne eller skridt. En boble beskriver én konkret skærmvisning eller ét naturligt trin inde i modulet. En boble er ikke automatisk interaktiv — nogle er rene indholdstrin. Hver boble er markeret med, hvad brugeren møder, eventuel interaktion, eventuel respons, hvad der leder videre, og om noget gemmes.

## Velkomstskærm

### Boble V.1 — Velkommen

**Hvad brugeren møder:**

"Velkommen til dit visuelle udtryk. Det visuelle er en del af det første indtryk, andre får af din praksis. Farver, billeder, logo og grafiske detaljer er med til at skabe en oplevelse og kan fortælle noget om, hvem du er, og hvad mennesker kan forvente, når de møder din praksis.

Men du behøver ikke allerede have fundet det rigtige. Måske har du nogle ting på plads. Måske er det hele stadig ved at tage form. Måske har du slet ikke tænkt så meget over det endnu. Alle steder er helt fine at starte fra.

Her får du et overblik over de forskellige dele af dit visuelle udtryk. Undervejs ser vi på, hvordan de kan spille sammen, og du kan tage små beslutninger om, hvad der giver mening for dig. Du skal ikke træffe alle beslutninger i dag.

Vi begynder bare med at kigge på, hvor du står lige nu. Der er ingen rigtige eller forkerte svar undervejs."

- **Interaktion:** Ingen. Knap: *Lad os begynde →*
- **Respons:** Ingen.
- **Gemmes:** Nej.

## Modul 1

### Boble 1.1 — Før vi går i gang

**Hvad brugeren møder:**

"Et visuelt udtryk opstår ikke nødvendigvis, fordi man på et tidspunkt sætter sig ned og beslutter, hvordan ens praksis skal se ud. Det begynder ofte med små valg — en farve, du godt kan lide, et billede der føles rigtigt, en skrifttype der ser god ud, et logo du selv har lavet eller fået hjælp til.

Når de forskellige valg mødes, begynder der at tegne sig et visuelt udtryk, der afspejler dig og din praksis. Nogle valg er truffet helt bevidst. Andre er opstået, fordi noget skulle bruges, laves eller besluttes. Begge dele er helt almindelige."

*Guide: Du behøver ikke starte forfra for at blive klogere på det, du allerede har.*

- **Interaktion:** Ingen.
- **Respons:** Ingen.
- **Leder videre:** Introducerer, at næste skridt handler om at finde ud af, hvor brugeren selv står.
- **Gemmes:** Nej.

### Boble 1.2 — Hvor starter du?

**Hvad brugeren møder:** "Vi starter ikke alle det samme sted. Nogle har haft et visuelt udtryk i noget tid. Andre har samlet forskellige ting undervejs uden at have set på, om de passer sammen. Og nogle er stadig ved at finde den retning, der føles rigtig. Du behøver ikke have styr på det hele, før du begynder. Vælg bare det svar, der ligner dig mest lige nu."

*Guide: Der er ikke noget rigtigt sted at starte fra. Vi skal bare finde ud af, hvor du står lige nu.*

- **Interaktion:** "Hvad passer bedst **til** dig?" *(rettet i runde 7, før: "på dig")* (ét valg): (1) Jeg har allerede et visuelt udtryk, men vil gerne forstå det bedre; (2) Jeg har allerede valgt nogle ting, men er ikke sikker på, om de hænger sammen; (3) Jeg er i gang med at skabe noget nyt og prøver stadig at finde min retning; (4) Jeg føler mig helt på bar bund og ved dårligt, hvor jeg skal starte; (5) Jeg vil helst starte med at få et overblik.
- **Respons:** Fører til en personlig respons i Boble 1.3.
- **Gemmes:** Ja, **varigt** (ændret i runde 7) som `udgangspunkt`, så alle vækstrum kan læse det. Se "Det, rummet husker" nederst.

### Boble 1.3 — Din respons

*Dynamisk boble — viser én af fem responser afhængigt af Boble 1.2's svar.*

**A — "Jeg har allerede et visuelt udtryk":** "Du har allerede noget at tage udgangspunkt i. Det er en fordel — ikke fordi alt nødvendigvis skal blive, som det er, men fordi du har noget konkret at kigge på. Når du begynder at se nærmere på dit visuelle udtryk, kan du få øje på ting, du gerne vil holde fast i — eller opdage noget, du gerne vil ændre. Det er ikke et spørgsmål om at starte forfra. Det handler om at blive klogere på det, du allerede har." *(Guide: Du har allerede et sted at starte. Lad os kigge på det sammen.)*

**B — "Jeg har valgt nogle ting, men er ikke sikker på, om de hænger sammen":** "Det giver rigtig god mening. Man kan sagtens have fundet forskellige ting, man godt kan lide, uden at have set på, hvordan de fungerer sammen. Det betyder ikke nødvendigvis, at noget er forkert — det kan handle om, at de forskellige dele endnu ikke har fået lov til at mødes. Det er noget af det, vi skal kigge på her: ikke bare farverne, billederne eller logoet hver for sig, men også hvad der sker, når de bliver brugt sammen." *(Guide: Vi behøver ikke smide noget ud. Først skal vi finde ud af, hvad der allerede fungerer — og hvad der kan have brug for lidt mere opmærksomhed.)*

**C — "Jeg er i gang med at skabe noget nyt":** "Når du er i gang med at skabe noget nyt, kan der hurtigt opstå mange muligheder på én gang — farver, billeder, logo, skrifttyper. Det kan føles, som om du skal tage stilling til det hele på én gang. Det skal du ikke. Her får du først mulighed for at skabe et overblik over de forskellige dele og se på, hvordan de kan hænge sammen. Derfra kan du begynde at tage små beslutninger og afprøve dem i praksis." *(Guide: Du behøver ikke kende hele vejen. Det er nok at finde det næste sted at begynde.)*

**D — "Jeg føler mig helt på bar bund":** "Det er helt okay. Når du bygger eller udvikler en praksis, er der mange ting, der kalder på din opmærksomhed — økonomi, markedsføring, klienter, din faglighed, måske en hjemmeside. Det visuelle står ikke altid øverst på listen. Men det er allerede en del af den måde, mennesker møder din praksis på: farverne på din hjemmeside, de billeder du bruger, dit logo, måden dine opslag ser ud på. Det visuelle er ikke vigtigere end alt det andet. Men det arbejder for dig hver dag, også når du ikke tænker over det. Her begynder vi med at kigge på, hvad det visuelle kan gøre." *(Guide: Du skal ikke finde vejen først. Vi kan godt begynde at gå.)*

**E — "Jeg vil helst starte med at få et overblik":** "Det er et godt sted at starte. Du behøver ikke allerede have fundet et problem, der skal løses, eller vide, hvad dit næste skridt skal være. Et overblik kan hjælpe dig med at se de forskellige dele samlet — og få øje på, hvad der allerede er på plads, hvad der hænger sammen, og hvad der kalder på lidt mere opmærksomhed." *(Guide: Vi starter med at kigge. Resten kan vi tage, når vi kommer dertil.)*

- **Interaktion:** Ingen yderligere.
- **Leder videre:** Alle fem responser leder til Boble 1.4.
- **Gemmes:** Svaret fra Boble 1.2 bevares (se ovenfor).

### Boble 1.4 — Uanset hvor du starter

**Hvad brugeren møder:** "Du behøver ikke have styr på farver, billeder, logo eller alt det andet, der er med til at skabe et visuelt udtryk. Du behøver heller ikke vide endnu, hvad du vil ændre, beholde eller arbejde videre med. Men når du begynder at se på de forskellige dele samlet, bliver det lettere at forstå, hvad de hver især gør — og hvordan de kan spille sammen. Det er det, vi begynder med nu."

*Sticker: Du skal ikke beslutte alt. Du skal bare begynde et sted.*
*Overgang (omskrevet i runde 8, nu også i koden som `paragraphsAfter`): "Uanset hvor du står lige nu, er det et fint sted at begynde. Så lad os tage det første skridt sammen og kigge på det, du allerede har, eller det, du gerne vil have." → Videre*

- **Interaktion:** Ingen.
- **Leder videre:** Modul 2.
- **Gemmes:** Nej.

## Modul 2 — Se på det, du allerede har

*Runde 7: Modul 2 har nu to veje. Når brugeren i den nye Boble 2.2 har krydset kanaler af, går hun den kendte vej (2.3 → 2.4 → 2.5 → 2.6). Har hun valgt "Jeg har ikke noget endnu", får hun en variant af 2.3 og går derefter direkte til en variant af 2.6. 2.4 og 2.5 springes over, fordi man ikke kan se mønstre i eller mærke efter noget, man ikke har endnu.*

| Boble | Har kanaler | "Jeg har ikke noget endnu" |
|---|---|---|
| 2.1 Du har allerede et udgangspunkt | ✓ | ✓ (samme tekst) |
| 2.2 Hvor møder folk din praksis? *(ny)* | ✓ | ✓ |
| 2.3 Hvad bruger du allerede? *(tidl. 2.2)* | ✓ | Variant: "Hvad har du lyst til at starte med?" |
| 2.4 Se efter det, der går igen *(tidl. 2.3)* | ✓ | Springes over |
| 2.5 Hvordan har du det med det, du ser? *(tidl. 2.4)* | ✓ | Springes over |
| 2.6 Du har et sted at starte *(tidl. 2.5)* | ✓ | Variant |

### Boble 2.1 — Du har allerede et udgangspunkt

**Hvad brugeren møder:** "Du starter ikke nødvendigvis fra nul. Ord som »visuelt udtryk« og »visuel identitet« kan lyde som noget, man først har, når det hele er lavet færdigt. Men sådan er det sjældent. De fleste har allerede truffet nogle valg, bevidst eller ej: en farve på hjemmesiden, et billede på Facebook, en skrifttype på visitkortet. Alt det er et udgangspunkt. Og før du tager stilling til, hvad du vil ændre eller bygge videre på, giver det mening at få øje på, hvad der allerede er der."

**✅ Ny afsluttende linje (runde 7, godkendt af Heidi 2026-09-25):** "Og har du ikke noget endnu, er det også et helt fint sted at starte. Det finder vi ud af sammen på næste skærm."

*Guide: Du skal ikke rydde bordet og starte forfra. Vi begynder med at se på det, du allerede har.*

- **Interaktion:** Ingen nødvendig — boblen skal fjerne barrieren "jeg kan ikke være med, fordi jeg ikke allerede har en visuel identitet". *(Runde 7: i brugertesten gav boblen netop den modsatte følelse, "det er som om, jeg har misset noget", hos en bruger, der ikke har noget endnu. Derfor den nye linje.)*
- **Leder videre:** Boble 2.2.
- **Gemmes:** Nej.

### Boble 2.2 — Hvor møder folk din praksis? *(ny i runde 7, godkendt af Heidi 2026-09-25)*

**Hvad brugeren møder:** "Før vi ser på farver, billeder og logo, vil vi gerne vide, hvor mennesker kan møde din praksis i dag. Det hjælper os med at tale ud fra det, du rent faktisk har, og ikke ud fra noget, du måske slet ikke er gået i gang med endnu."

- **Interaktion:** Afkrydsning, flere valg: Hjemmeside · Facebook · Instagram · LinkedIn · Andre sociale medier · Nyhedsbrev · Bookingsystem · Visitkort, flyers eller andet trykt · Noget andet · **Jeg har ikke noget endnu**. "Jeg har ikke noget endnu" kan ikke vælges sammen med de andre. Vælges den, fjernes de andre afkrydsninger, og omvendt.
- **Respons:**
  - *Har krydset kanaler af:* "Godt. Så har vi noget konkret at kigge på sammen."
  - *"Jeg har ikke noget endnu":* "Det er et rigtig godt sted at starte. Så kan du bygge dit visuelle udtryk op fra begyndelsen, uden at skulle rydde op i noget først. Når vi spørger til det, du allerede har, kan du i stedet tænke på det, du gerne vil have."
- **Leder videre:** Boble 2.3 (den almindelige version eller varianten, se tabellen ovenfor).
- **Gemmes:** Ja, **varigt** som `kanaler[]`, så alle vækstrum kan læse det. Se "Det, rummet husker" nederst.

### Boble 2.3 — Hvad bruger du allerede? *(tidligere 2.2)*

**Hvad brugeren møder:** "Det visuelle omkring din praksis er ikke én ting. Folk møder forskellige dele af det forskellige steder: på din hjemmeside, på de sociale medier, på et visitkort eller når de booker en tid. Lad os starte med at få øje på, hvad du allerede bruger. Vælg alt det, der passer."

- **Interaktion:** Brugeren kan vælge én eller flere: 🎨 Farver, 🖼️ Billeder, ✳️ Logo, 🔣 Ikoner, ✏️ Illustrationer, 🔤 Skrifttyper, 📱 Noget andet, 🤷 Jeg er ikke sikker endnu.
- **Respons:** Tilpasses valget — flere ting valgt: "Nu kan vi begynde at se på, hvordan de fungerer — både hver for sig og sammen." Få ting valgt: "Det, du allerede bruger, er nok til, at vi kan tage det næste skridt." Ikoner/illustrationer/skrifttyper valgt: "Du bruger allerede nogle af de ting, der er med til at give din praksis sit eget visuelle præg. Senere kan vi se nærmere på, hvordan de kan fungere sammen og understøtte resten af dit visuelle udtryk." "Ikke sikker endnu" valgt: "Det er helt fint. Vi hjælper dig med at få øje på det undervejs." Flere relevante responser kan sammensættes eller prioriteres.
- **Leder videre:** Boble 2.4.
- **Gemmes:** Ja (i hukommelsen, mens brugeren er i rummet) — kan senere bruges til at skabe sammenhæng og spejle brugerens udgangspunkt tilbage.

**✅ Variant 2.3-Ny: "Hvad har du lyst til at starte med?"** (godkendt af Heidi 2026-09-25) *(vises kun, hvis brugeren valgte "Jeg har ikke noget endnu" i 2.2)*

- **Hvad brugeren møder:** "Du har ikke noget i brug endnu, og det er helt fint. Så lad os i stedet se, om der er noget, du allerede har tænkt over, eller noget, du har lyst til at starte med. Vælg det, der trækker i dig. Du kan altid ændre mening."
- **Interaktion:** Vælg én eller flere (samme emner, nye formuleringer): 🎨 Farver — "Jeg har nogle farver, jeg godt kan lide" · 🖼️ Billeder — "Jeg har en idé om, hvilke billeder jeg vil vise" · ✳️ Logo — "Jeg vil gerne have et logo" · 🔤 Skrifttyper, ikoner og illustrationer — "De små detaljer interesserer mig" · 🤷 "Jeg ved det ikke endnu".
- **Respons:** *Noget valgt:* "Så har du allerede et sted at begynde. Det tager vi med videre." *"Jeg ved det ikke endnu":* "Det behøver du heller ikke. Det er det, de næste skridt skal hjælpe dig med."
- **Leder videre:** Direkte til Boble 2.6 (varianten). 2.4 og 2.5 springes over.
- **Gemmes:** Ja (i hukommelsen, som 2.3).

### Boble 2.4 — Se efter det, der går igen *(tidligere 2.3)*

*Vises ikke for brugeren, der valgte "Jeg har ikke noget endnu".*

**Hvad brugeren møder:** "Når du kigger på det, du bruger, kan der dukke et mønster op. Måske går den samme farve igen fra hjemmesiden til dine opslag. Måske ligner tingene ikke rigtig hinanden. Begge dele fortæller noget om dit udgangspunkt, og ingen af dem er forkerte. Lige nu handler det bare om at få øje på det, der allerede er der."

- **Interaktion:** "Hvad genkender du mest?" (ét valg): 🟢 Noget går igen, 🟡 Noget går igen, men ikke det hele, 🔵 Det er ret blandet, ⚪ Jeg har svært ved at se det.
- **Respons:** 🟢 "Det er en god ting at få øje på. Noget af det, du bruger, er allerede begyndt at skabe en retning, og den kan du bygge videre på." 🟡 "Det er helt normalt. Noget kan godt være valgt med en bestemt retning, mens andet er kommet til undervejs. Nu har du fået øje på, at der både er noget at bygge videre på og noget, du kan undersøge nærmere." 🔵 "Det giver dig faktisk et tydeligt udgangspunkt. Nu ved du, at en del af arbejdet kan handle om at finde ud af, hvad du gerne vil samle — og hvad du ikke behøver tage med videre." ⚪ "Det behøver du ikke kunne endnu — det kan være svært at se mønstre i noget, man selv har kigget på mange gange."
- **Leder videre:** Boble 2.5.
- **Gemmes:** Ja (i hukommelsen) — kan senere bruges til at spejle brugerens udvikling.

### Boble 2.5 — Hvordan har du det med det, du ser? *(tidligere 2.4)*

*Vises ikke for brugeren, der valgte "Jeg har ikke noget endnu".*

**Hvad brugeren møder:** "Du behøver ikke kunne vurdere dit visuelle udtryk fagligt, og det er ikke meningen, at du nu skal finde fejl. Men når du ser på de ting, du allerede bruger, har du måske fået øje på noget, du ikke havde tænkt over før."

- **Interaktion:** (ét valg): 🌱 Jeg kan godt lide den retning, jeg allerede er i; 🧩 Noget føles rigtigt — noget andet gør ikke; 🔍 Jeg er blevet opmærksom på, at jeg mangler at tage stilling til noget; 🌪️ Det hele føles lidt blandet lige nu; 🧭 Jeg føler mig helt på bar bund og ved dårligt, hvor jeg skal starte.
- **Respons:** 🌱 "Det er et godt udgangspunkt. Du behøver ikke ændre noget, bare fordi du arbejder med dit visuelle udtryk. Noget af det næste arbejde kan handle om at forstå, hvad det er, der allerede fungerer, så du lettere kan bygge videre på det og bruge det mere bevidst." *(Guide: Det, du allerede har, kan være lige så værdifuldt at forstå som det, du gerne vil ændre.)* 🧩 "Det giver dig allerede noget vigtigt at arbejde med. Du behøver ikke starte forfra, bare fordi noget ikke helt passer. Når vi arbejder videre, kan du blive klogere på, hvad du gerne vil beholde, og hvad der trænger til en ny beslutning." 🔍 "Det er faktisk præcis den slags, DUF kan hjælpe med. Du behøver ikke beslutte det hele nu. Det vigtigste er, at du har fået øje på nogle områder, du gerne vil undersøge nærmere." *(Guide: At få øje på et spørgsmål er også et skridt fremad.)* 🌪️ "Så er du ikke alene. Når forskellige ting er opstået på forskellige tidspunkter, kan det være svært at se dem som en samlet helhed. Du behøver ikke løse det hele på én gang. Vi kan tage de forskellige områder ét ad gangen og begynde at finde ud af, hvad der giver mening for dig og din praksis." 🧭 "Det kan føles overvældende, når der er mange ting at tage stilling til, og man ikke rigtig ved, hvor man skal begynde. Det behøver du heldigvis ikke finde ud af alene. Du skal ikke tage alle beslutninger på én gang. Vi hjælper dig med at dele det op og tage ét område ad gangen, så du kan begynde at finde en retning, der giver mening for dig og din praksis." *(Guide: Du behøver ikke kende hele vejen. Du skal bare have et sted at begynde.)* *(Bemærk: koden gemmer i dag kun hovedteksten for disse fem svar, ikke guide-citaterne — se "Status" nedenfor.)*
- **Leder videre:** Boble 2.6.
- **Gemmes:** Ja (i hukommelsen) — brugerens nuværende ståsted, kan spejles tilbage senere.

### Boble 2.6 — Du har et sted at starte *(tidligere 2.5)*

*Formål: at samle modulet op uden at teste brugeren igen. Brugeren har nu fået øje på, at de allerede har et udgangspunkt; set på, hvilke ting de bruger; overvejet, om noget går igen; og mærket efter, hvordan de har det med det, de ser. Boblen skal hjælpe brugeren med at forstå, at de ikke behøver have fundet løsningerne endnu, men at de ved mere om deres udgangspunkt, end de gjorde før.*

**Hvad brugeren møder:** "Du behøver ikke have fundet alle svarene endnu. Det var heller ikke meningen. Du har lige set nærmere på det visuelle omkring din praksis, som det ser ud lige nu. Måske har du fået øje på noget, der allerede fungerer godt. Måske har du opdaget noget, du gerne vil ændre. Eller måske er du stadig i gang med at finde ud af, hvilken retning der føles rigtig. Uanset hvor du står, har du nu et udgangspunkt at arbejde videre fra. For det bliver lettere at tage stilling til de enkelte dele, når du ved lidt mere om, hvad du allerede har — og hvordan du har det med det." *(Guide: Du skal ikke løse det hele nu. Vi tager det ét område ad gangen.)*

**✅ Variant for "Jeg har ikke noget endnu"** (godkendt af Heidi 2026-09-25)**:** "Du behøver ikke have noget på plads for at begynde. Du ved nu, at du starter med et rent bord, og det kan faktisk være en fordel: Du kan vælge med omtanke fra første dag, i stedet for at skulle rette til bagefter. Resten af vejen tager vi ét område ad gangen, og vi tager udgangspunkt i det, du gerne vil have, og ikke i noget, du burde have haft." *(Guide: Et tomt lærred er ikke et tomt udgangspunkt.)*

Opsamlingsboble uden nyt spørgsmål — samler op på det, der allerede er gemt i Boble 1.2–2.5.

- **Interaktion:** Ingen nødvendig.
- **Respons:** Ingen yderligere.
- **Leder videre:** Modul 3.
- **Gemmes:** Nej — samler kun op på tidligere svar.

## Modul 3 — Hvad er hvad? De fire dele af dit visuelle udtryk

*Runde 7: I brugertesten var teksten bag hvert af de fire links næsten den samme som introteksten ("det er præcis den samme tekst"), og brugeren kom til at trykke videre, før hun havde set alle fire. Modul 3 laves derfor om fra "oversigt + valgfrie bobler" til **én skærm med en accordion**: de fire korte intro-linjer står synligt, og hver af dem kan foldes ud til en ny, uddybende tekst, der tilføjer noget nyt. Brugeren bliver på samme side. Ingen er obligatoriske. Modul 5 beholder sit nuværende "oversigt + valgfrie bobler"-mønster. (Bemærk: Modul 3 var tidligere bygget som en accordion med `showAccordionStep` i `overblikUi.js`, før den blev lavet om til hub. Den gamle funktion kan muligvis genbruges.)*

### Boble 3.1 — Introduktion til de visuelle elementer

**Hvad brugeren møder:** "Dit visuelle udtryk består af fire dele. De hænger sammen, men kan også arbejdes med hver for sig. Her er en hurtig introduktion til hver af dem. Tryk på en af dem for at læse lidt mere." *(sidste sætning ny i runde 7)*

Fire accordion-punkter. Overskrift og intro-linje er altid synlige. Den uddybende tekst folder sig ud ved tryk.

**🎨 Farver** — "Farver er ofte det første, folk lægger mærke til — og det, der binder resten sammen."
> **✅ Foldes ud (godkendt af Heidi 2026-09-25):** "Farver sætter en stemning med det samme, og de hjælper folk med at kende dig igen næste gang, de ser dig. Det kan være farven på din hjemmeside, dit visitkort eller dine opslag. De fleste har brug for nogle få farver, der har hver sin opgave: én, der bærer det meste, én, der fremhæver det vigtige, og én, der gør teksten let at læse. Du behøver ikke kunne det endnu. Det er det, Farver-rummet hjælper dig med."

**🖼️ Billeder** — "Billeder fortæller en historie, før nogen har læst et eneste ord."
> **✅ Foldes ud (godkendt af Heidi 2026-09-25):** "Billeder viser, hvordan det føles at komme hos dig: rummet, lyset, stemningen, måske dig selv. Et roligt billede fra din behandlingsstol kan sige mere end en lang tekst. Du kan tage billederne selv eller hente dem fra en billedbank. Uanset hvad skal du vide, at du må bruge dem. Og har du ingen billeder endnu, kan du vælge med omtanke fra begyndelsen."

**✳️ Logo** — "Dit logo er ikke hele din identitet, men det er ofte det første, folk genkender."
> **✅ Foldes ud (godkendt af Heidi 2026-09-25):** "Et logo er et genkendelsestegn. Det kan være dit navn skrevet på en bestemt måde, et lille symbol eller begge dele. Det behøver ikke fortælle hele din historie. Det skal kunne kendes igen, både stort på et skilt og småt som profilbillede. Mange har derfor flere udgaver af det samme logo, fx kun symbolet til de små steder."

**🧩 Ikoner, fonte og andre byggesten** — "De mindre detaljer er ofte det, folk ikke lægger mærke til, når det virker — men de lægger mærke til det, når det ikke gør."
> **✅ Foldes ud (godkendt af Heidi 2026-09-25):** "Det er de små ting, der binder det hele sammen. **Ikoner** er små, enkle tegn, der viser noget hurtigt, fx en telefon ved dit nummer eller en kalender ved 'Book tid'. **Illustrationer** er tegninger, der kan forklare noget eller give stemning. **Skrifttyper** er bogstavernes udseende. De påvirker både, hvordan din tekst føles, og hvor let den er at læse, på skærmen og på papir."

- **Interaktion:** Brugeren kan folde et, flere eller ingen af punkterne ud, i vilkårlig rækkefølge. Flere punkter må gerne være åbne samtidig.
- **Leder videre:** Knappen "Videre" under accordionen (→ Modul 4). Knappen står altid synligt, men under alle fire punkter, så brugeren ser dem alle, før hun når den.
- **Gemmes:** Nej.

*Boble 3.2A–3.2D udgår som selvstændige skærme i runde 7. Deres indhold ligger nu i accordionen ovenfor.*

## Modul 4 — Når tingene begynder at hænge sammen

### Boble 4.1 — Når tingene begynder at hænge sammen

*Formål: at hjælpe brugeren med at forstå, at de forskellige dele påvirker hinanden, uden at alt skal planlægges på én gang. Flytter fokus væk fra at overtænke alle sammenhænge og over mod at vælge en retning og tage en konkret beslutning.*

**Section 1 — Du behøver ikke løse det hele på én gang:** "Farver, billeder, logo og de små byggesten påvirker hinanden. Men det betyder ikke, at du skal have styr på dem alle, før du kan begynde. Du kan sagtens starte ét sted og så se bagefter, hvordan resten passer ind."

**Section 2 — Tag ét valg ad gangen:** "Faktisk bliver det ofte lettere, når du tager ét valg ad gangen. Har du fundet dine farver, er det nemmere at se, hvilke billeder der passer til dem. Hvert valg giver dig lidt mere at gå efter." *(Guide: Du behøver ikke have hele planen klar. Vælg det næste konkrete skridt og arbejd videre derfra.)*

**Section 3 — Sådan opstår helheden:** "Sådan opstår helheden. Et visuelt udtryk bliver ikke kun til ved at planlægge alt på forhånd. Det vokser, når du træffer valg og prøver dem af i praksis. Så det vigtigste lige nu er ikke at finde den perfekte løsning. Det er at vælge noget konkret at arbejde med."

*Note til design: indholdet er opdelt i tre naturlige sections til mobilvisning; guide-bemærkningen placeres mellem Section 2 og 3.*

- **Leder videre:** Modul 5.
- **Gemmes:** Nej.

## Modul 5 — Kig ind i rummene

*Samme mønster som Modul 3 havde før runde 7: en fast invitation (5.1) plus fire valgfrie bobler (5.2A–D), der kan besøges i vilkårlig rækkefølge — "bagsiden på bogen" for hvert uddybende vækstrum. Uændret i runde 7.*

### Boble 5.1 — Invitation til at kigge nærmere

**Hvad brugeren møder:** "Du behøver ikke gå videre med noget som helst lige nu. Men her kan du kigge nærmere på, hvad de forskellige rum handler om, hvis du har lyst."

- **Interaktion:** Brugeren kan vælge Farver, Billeder, Logo, Ikoner/illustrationer/skrifttyper — eller springe direkte videre til Modul 6.
- **Gemmes:** Nej.

### Boble 5.2A — Farver *(valgfri)*

"En farveretning, du faktisk kan bruge." "I Farver finder du en retning, der passer til dig og din praksis. Det handler ikke kun om at vælge farver, du kan lide, men om at forstå, hvordan de fungerer sammen, og hvordan du bruger dem de steder, folk møder dig." Arbejdsområder: hvad farverne skal udtrykke, hvordan man finder en retning, hvordan farver bruges sammen, hvordan farverne fungerer, når mennesker skal læse og bruge indholdet. *(Guide: En farvepalet skal ikke bare se godt ud. Den skal kunne bruges.)*

- **Leder videre:** Tilbage til oversigten (5.1) eller videre.
- **Gemmes:** Nej.

### Boble 5.2B — Billeder *(valgfri)*

"Billeder, der fortæller den rigtige historie." "I Billeder handler det ikke om at finde billeder, alle synes er flotte. Det handler om at finde ud af, hvad du gerne vil vise, og så vælge billeder, der fortæller netop det." Arbejdsområder: hvad billederne skal fortælle, hvad der giver mening at vise, hvilke typer billeder der passer, sammenhæng på tværs, rettigheder. *(Guide: Et godt billede er ikke bare et billede, der ser godt ud. Det skal også give mening, når det bliver en del af din praksis.)* Med sig videre: en retning for, hvad brugeren leder efter og gerne vil vise.

- **Leder videre:** Tilbage til oversigten (5.1) eller videre.
- **Gemmes:** Nej.

### Boble 5.2C — Logo *(valgfri)*

"Hvad skal dit logo egentlig kunne?" "I Logo er målet ikke nødvendigvis et nyt logo. Det er at finde ud af, hvad dit logo skal kunne, og hvad der giver mening som næste skridt. Måske beholder du det, du har, måske justerer du det, eller måske laver du et nyt." Arbejdsområder: logoets rolle, hvad mennesker skal kunne genkende, om det nuværende logo passer til retningen, samspil med resten af det visuelle udtryk. *(Guide: Du behøver ikke presse hele din historie ind i dit logo. Men der må gerne være en tanke bag det.)*

- **Leder videre:** Tilbage til oversigten (5.1) eller videre.
- **Gemmes:** Nej.

### Boble 5.2D — Ikoner, illustrationer og skrifttyper *(valgfri)*

"De små valg, der er med til at sætte retningen." "I Byggesten ser du på de små ting, der binder det hele sammen. Ikoner hjælper folk med hurtigt at forstå og finde rundt. Illustrationer kan forklare noget og give din praksis sit eget præg. Og skrifttyper skal passe til dit udtryk uden at gøre teksten sværere at læse." *(Guide: Du skal ikke vælge noget, bare fordi det ser godt ud alene. Se på, hvordan det fungerer, når det bliver en del af helheden.)* Med sig videre: et bedre grundlag for fremtidige valg af ikon, skrifttype eller illustration.

- **Leder videre:** Tilbage til oversigten (5.1) eller videre.
- **Gemmes:** Nej.

## Modul 6 — Videre herfra

### Boble 6.1 — Din vej videre

*Formål (ændret 2026-09-09 — se "Status" nedenfor): opsummere det, brugeren allerede har fortalt i Modul 2 — ikke gætte sig til ét "rigtigt" rum ved at udlede skjulte signaler. Brugeren har allerede gjort arbejdet med at reflektere over sit udgangspunkt; nu spejles det samlet tilbage til dem, og de vælger selv, hvilket rum de vil fortsætte til. Ingen automatisk anbefaling af ét specifikt rum.*

**Hvad brugeren møder (✅ rammetekst godkendt af Heidi 2026-09-25; selve opsummeringen er ikke ny tekst, kun en gentagelse af det, brugeren allerede har set):**

"Du har nu set nærmere på, hvor du står i dag. Her er en opsamling af det, du har fortalt os undervejs:"

*Boblenumrene herunder er opdateret til runde 7's nummerering.*

- **✅ Ny i runde 7 (godkendt 2026-09-25) — Fra Boble 2.2** ("Hvor møder folk din praksis?"): de kanaler, brugeren krydsede af, vises som en kort liste ("Folk kan møde din praksis her: Hjemmeside, Instagram"). Valgte hun "Jeg har ikke noget endnu", står der: "Du starter med et rent bord."
- **Fra Boble 2.3** ("Hvad bruger du allerede?", eller varianten "Hvad har du lyst til at starte med?"): den feedback, brugeren allerede fik der, gentages ordret (hvilken af `modul2.hvadBrugerDu.responses`-teksterne, afhænger af brugerens faktiske valg).
- **Fra Boble 2.4** ("Se efter det, der går igen"): brugerens valgte svarmulighed OG den tilhørende respons gentages (fx "Du svarede: 🟡 Noget går igen, men ikke det hele. [respons-teksten herfra]"). *Udelades for brugeren, der ikke har noget endnu.*
- **Fra Boble 2.5** ("Hvordan har du det med det, du ser?"): samme princip — valgt svarmulighed og tilhørende respons gentages. *Udelades for brugeren, der ikke har noget endnu.*

*(Guide: Du har allerede gjort arbejdet med at fortælle os, hvor du står. Nu er det dit valg, hvor du vil kigge videre.)*

Herefter præsenteres alle fire uddybende rum (Farver, Logo, Billeder, Ikoner/fonte og byggesten) som ligestillede valgmuligheder — brugeren vælger selv, uden nogen fremhævet som "anbefalet". *(Samme grundprincip som allerede gælder ved flere lige relevante rum — nu udvidet til at gælde altid: brugeren vælger selv mellem de reelle muligheder.)*

**Afrunding:** "Et overblik gør først en forskel, når du begynder at bruge det. Så vælg det rum, der trækker mest i dig lige nu."

- **Interaktion:** Brugeren vælger selv, hvilket af de fire rum de vil fortsætte til.
- **Leder videre:** Direkte til det valgte uddybende vækstrum.
- **Gemmes:** Ja — det valgte rum (som før), se "Det, rummet husker" nedenfor.

## Det, rummet husker *(ny i runde 7, til udvikling)*

*Beslutning 2026-09-25 (Heidi): lagringen udvides fra "den lille version" (kun det valgte rum) til også at gemme brugerens udgangspunkt, så alle vækstrum, og senere de andre vækstområder, kan tilpasse sig den bruger, der ikke har noget endnu. Samme mekanisme som i dag: `js/storage/storage.js`, lokalt på brugerens enhed.*

Gemmes varigt:

- `udgangspunkt` — svaret fra Boble 1.2: `harUdtryk` (1) / `valgtNoget` (2) / `skaberNyt` (3) / `barBund` (4) / `overblik` (5).
- `kanaler[]` — svaret fra Boble 2.2: `hjemmeside`, `facebook`, `instagram`, `linkedin`, `andreSociale`, `nyhedsbrev`, `booking`, `trykt`, `andet` — eller præcis `["ingen"]`.
- Det valgte rum fra Modul 6 (som før).

Gemmes IKKE (uændret): de øvrige boble-svar fra Modul 1–5. De lever kun i hukommelsen, mens brugeren er i rummet.

**Sådan skal de andre rum bruge det:**

- **"Starter fra bunden"** betyder `kanaler` = `["ingen"]`. Det er dette signal, rummene skal reagere på, fx Billeder 3.1 og 8.1 og Byggestens intro og modul 4 (se sorteringsdokumentet, afsnit 0).
- `udgangspunkt = barBund` betyder **ikke** det samme. En bruger kan føle sig på bar bund og stadig have en hjemmeside. Brug det kun til tone, fx en ekstra blid formulering, ikke til at springe indhold over.
- **Har brugeren ikke været i Det visuelle udtryk for din praksis** (ingen gemte data), opfører rummene sig som i dag.
- **Byggesten 4.2** ("Hvor skal du bruge dine fonte?") kan vise brugerens egne kanaler som de første valgmuligheder (jf. T11 i sorteringsdokumentet).
- Går brugeren igennem rummet igen, overskrives de gemte svar.

## Spørgsmål til jer, inden I bygger videre

- **Afgjort 2026-09-08:** ingen tie-break i Modul 6 — brugeren skal kunne vælge frit mellem alle reelt relevante rum, uanset om det er to eller flere.
- **Afgjort 2026-09-08:** Modul 3 og Modul 5 bygges som "oversigt + valgfrie bobler" (3.2A–D, 5.2A–D), som brugeren kan besøge i vilkårlig rækkefølge og springe over. **Ændret for Modul 3 i runde 7 (2026-09-25):** Modul 3 bliver en accordion på én skærm, se ovenfor. Modul 5 er uændret.
- **Afgjort 2026-09-08:** lagring — "den lille version". **Udvidet i runde 7 (2026-09-25):** se "Det, rummet husker".
- **Afgjort 2026-09-09:** Boble 2.5's (nu 2.6) "Hvad brugeren møder"-tekst er skrevet af Heidi og sat ind både her og i `js/data/visuelt.js`.
- **Rettet 2026-09-09:** Boblerne 2.2, 2.3 og 2.4 (nu 2.3, 2.4 og 2.5) er citeret ordret. Eneste reelle tab: guide/avatar-citaterne i den nuværende 2.5 for 🌱, 🔍 og 🧭 er ikke med i koden i dag, fordi Modul 2's responser kun gemmes som ren tekst uden separat guide-felt — kræver en lille motor-tilføjelse, hvis I vil have dem med.
- **Afgjort 2026-09-09:** den automatiske matchning er fjernet. Boble 6.1 er en **opsummering** af det, brugeren allerede har fortalt, hvorefter hun selv vælger frit mellem alle fire uddybende rum. `overblikMatcher.js` er slettet. Rammeteksten omkring opsummeringen i Boble 6.1 er godkendt af Heidi 2026-09-25.
- **Nyt i runde 7:** Modul 2 har nu en forgrening (se tabellen øverst i Modul 2). Bekræft, at `visueltEngine.js` kan springe 2.4 og 2.5 over ud fra svaret i 2.2, i stedet for lineær navigation.
