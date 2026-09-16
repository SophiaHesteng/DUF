# MANUSKRIPT — Farver

*Status: Revideret 2026-09-11. Erstatter det tidligere flade modul-for-modul-udkast med en fuld boble-struktur (Vækstrum → Modul → Bobler, jf. [[DUF Teknisk - Navigationslinjer (modul og boble)]]). Bygger på revisionsarbejdet i `claude/DUF Manuskript-revision - Farver.md` (Heidis ChatGPT-udkast, gennemgået og afklaret med Claude i chatten). Modul 1-5 er bygget (branch `farver-update-content`, commit `717565bf...`) og efterfølgende justeret 2026-09-11 efter Heidis gennemgang — se de opdaterede punkter ved Boble 1.2 og Modul 4 nedenfor. Modul 6, 7 og 8 er nu også bygget — se "Status og næste skridt" nederst.*

**Sådan læses dette dokument:** Et modul beskriver det overordnede emne eller skridt. En boble beskriver én konkret skærmvisning eller ét naturligt trin inde i modulet. En boble er ikke automatisk interaktiv — nogle er rene indholdstrin. Hver boble er markeret med, hvad brugeren møder, eventuel interaktion, eventuel respons, hvad der leder videre, og om noget gemmes.

## Velkomst til rummet

**Skærmtekst (vises kun, hvis brugeren kommer fra Overblik med et farve-relateret svar):**

"Du nævnte tidligere, at du er usikker på dine farver — derfor foreslog vi at kigge nærmere på det her."

**Standardvelkomst (hvis brugeren er kommet direkte til Farver):**

"Velkommen til Farver. Her får du hjælp til at vælge en farvepalet, der understøtter din praksis — uanset om du starter fra bunden eller bare vil kvalitetssikre det, du allerede har."

- **Gemmes:** Nej. (Uændret fra nuværende manuskript.)

## Modul 1 — Hvorfor farver betyder noget

### Boble 1.1 — Farver fortæller noget

**Hvad brugeren møder:**

"Farver er noget af det første, vi lægger mærke til. De er med til at forme det indtryk, vi får — længe før vi har læst et eneste ord.

Farver kan signalere ro, energi, tillid, varme eller noget helt andet. Derfor er de ikke bare noget, der skal være pænt.

Der findes ikke én rigtig farve til din praksis. Men farver fortæller noget — og det er værd at vide, hvad dine fortæller."

- **Interaktion:** Ingen.
- **Respons:** Ingen.
- **Leder videre:** Brugeren føres videre til konkrete eksempler på, hvordan forskellige farveudtryk kan skabe forskellige oplevelser.
- **Gemmes:** Nej.

### Boble 1.2 — Farver kan føles forskellige

**Hvad brugeren møder:**

Tre konkrete visuelle eksempler på forskellige farveudtryk:

**Varm** — "Et varmt og jordnært farveudtryk." Kan opleves som: *Ro · varme · nærvær · tryghed*

**Kold** — "Et køligere farveudtryk." Kan opleves som: *Klarhed · ro · professionalisme · distance*

**Legende** — "Et mere livligt eller uventet farveudtryk." Kan opleves som: *Energi · kreativitet · personlighed · lethed*

"Ingen af dem er mere rigtige end de andre. Men de fortæller ikke det samme. Derfor er farvevalg ikke kun et spørgsmål om, hvad du synes er pænt. Det er også en del af det indtryk, du giver videre."

- **Visuelt:** De tre eksempler vises visuelt sammen med de tilhørende ord, så brugeren både kan se og få sat ord på forskellene mellem farveudtrykkene. Billedfiler (lagt i `img/` 2026-09-11): `varm-klinik.png` (Varm), `koelig-klinik.png` (Kold), `energi-klinik.png` (Legende).
- **Interaktion:** Ingen.
- **Respons:** Ingen.
- **Leder videre:** Modulet afsluttes, og brugeren føres videre til næste modul.
- **Gemmes:** Nej.

## Modul 2 — Farvers usynlige regler

### Boble 2.1 — Når farver også skal fungere

**Hvad brugeren møder:**

"En farvekombination kan se virkelig flot ud — og stadig være svær at læse.

Det gælder især, når tekst og baggrund ligger for tæt på hinanden i lyshed. Det kan gøre en hjemmeside, et opslag eller et dokument svært at bruge.

Det handler om kontrast. Og det er en af de ting, du skal have styr på, hvis dine farver skal fungere i praksis."

- **Visuelt:** Informationsboble uden konkrete visuelle eksempler.
- **Interaktion:** Ingen.
- **Respons:** Ingen.
- **Leder videre:** Modulet afsluttes, og brugeren føres videre til næste modul, hvor der arbejdes med brugerens eget udgangspunkt.
- **Gemmes:** Nej.

## Modul 3 — Dit udgangspunkt

*Status: erstatter det nuværende Modul 3 ("saml 3–5 eksempler fra egen praksis"). Reduceres til ét eksempel — eget eller DUF's — som grundlag for en kort refleksion. Billedupload-funktionen fra den nuværende Modul 3 genbruges (afklaret med Heidi 2026-09-11), bare nu til ét billede i stedet for flere.*

### Boble 3.1 — Hvad kigger vi efter?

**Hvad brugeren møder:**

"Farver er allerede en del af din praksis mange steder. Du møder dem på din hjemmeside, i dit logo, på sociale medier, i et nyhedsbrev eller på noget af det materiale, du deler med andre.

Når vi kigger på farver, handler det ikke kun om at finde ud af, hvilke farver der er brugt. Vi kigger også på, hvad de gør sammen.

Går nogle af farverne igen? Hvilke lægger du først mærke til? Og hvilket samlet indtryk får du?"

- **Interaktion:** Ingen.
- **Respons:** Ingen.
- **Leder videre:** Brugeren har nu fået konkrete eksempler på, hvor farver kan være en del af deres praksis, og hvad de skal kigge efter. Derefter spørges brugeren, om de selv har et eksempel, de har lagt mærke til eller lader sig inspirere af.
- **Gemmes:** Nej.

### Boble 3.2 — Har du selv et eksempel?

**Hvad brugeren møder:**

"Har du allerede nogle eksempler, du har lagt mærke til eller lader dig inspirere af?"

- **Interaktion:** Brugeren får to valgmuligheder:
  - **Ja, det har jeg** → brugeren kan uploade sit eget billede (genbruger den eksisterende billedupload-mekanik fra nuværende Modul 3: klientsidet, billedet forlader aldrig brugerens egen enhed, gemmes i IndexedDB via `saveImage`/`getImagesForVaekstrum`).
  - **Nej, ikke endnu** → DUF viser et eget eksempel: `eksempel-3.2.png` (lagt i `img/` 2026-09-11).
- **Respons:** Ingen særskilt respons. Brugerens valg afgør, hvilket billede der tages med videre til næste boble.
- **Leder videre:** Det valgte billede — brugerens eget upload eller `eksempel-3.2.png` — tages med videre til Boble 3.3, hvor brugeren undersøger billedet nærmere.
- **Gemmes:** Ja. Det valgte/uploadede billede tages med videre til Boble 3.3 som grundlag for refleksionen.

### Boble 3.3 — Hvad ser du?

**Hvad brugeren møder:**

"Hvad ser du? Kig på eksemplet et øjeblik. Hvilke farver lægger du først mærke til? Er der nogle, der går igen? Og hvordan oplever du det samlede udtryk?"

- **Visuelt:** Det billede, brugeren har valgt eller fået fra DUF i Boble 3.2, vises som udgangspunkt for refleksionen.
- **Interaktion:** Ingen — spørgsmålene er ren egen overvejelse, ikke en interaktion med et svar der skal indtastes eller vælges (afklaret med Heidi 2026-09-11).
- **Respons:** Ingen.
- **Leder videre:** Brugeren har nu undersøgt et konkret farveeksempel og går videre til Modul 4.
- **Gemmes:** Billedet følger med fra Boble 3.2. Selve refleksionen (spørgsmålene) gemmes ikke — det er ren egen overvejelse, ikke et svar.

## Modul 4 — Inspiration og sammenligning

*Status: erstatter det nuværende Modul 4 ("find 2-3 andre praksisser selv"). I stedet møder brugeren fire fiktive, AI-genererede eksempler direkte i rummet, med envalg + matchet feedback — samme grundmønster som Overbliks Modul 2, men **opdateret 2026-09-11 efter Heidis gennemgang: envalg, ikke flervalg** — kun ét af de fem svar kan vælges ad gangen, så det altid er entydigt, hvilken feedback der skal gives. Billedfiler: `roligt-so-me.png` (4.2), `varm-hjemmeside.png` (4.3), `energisk-logo.png` (4.4), `larmende-nyhedsbrev.png` (4.5) — alle fire ligger nu i `img/`.*

### Boble 4.1 — Læg mærke til det

**Hvad brugeren møder:**

"Du er sikkert allerede stødt på steder, hvor du har lagt mærke til farverne. Måske fordi det samlede udtryk føltes rart og gennemtænkt. Eller fordi der var noget, der skurrede, uden at du helt kunne sætte fingeren på hvorfor.

Prøv at tænke over, om du selv har set eksempler, hvor brugen af farver har fanget din opmærksomhed — på godt og ondt.

Nu skal vi kigge på nogle forskellige eksempler sammen."

- **Interaktion:** Ingen.
- **Respons:** Ingen.
- **Leder videre:** Brugeren introduceres til at lægge mærke til brugen af farver i forskellige sammenhænge og føres videre til fire konkrete eksempler.
- **Gemmes:** Nej.

### Boble 4.2 — Hvad for et indtryk får du? (opslag på sociale medier)

**Hvad brugeren møder:** Billedet `roligt-so-me.png` — et fiktivt, AI-genereret opslag til sociale medier, med et roligt farveudtryk. *"Hvad for et indtryk får du af det her?"*

- **Interaktion:** Brugeren vælger ét af: ☐ Det føles varmt · ☐ Det føles roligt · ☐ Det føles energisk · ☐ Noget føles som om, det ikke helt spiller · ☐ Jeg er ikke sikker.
- **Respons (matchet pr. valg):**
  - **Varmt og/eller roligt:** "Farverne her arbejder sammen om et roligt og imødekommende udtryk. Der er plads mellem farverne, og ingen af dem kæmper særligt meget om opmærksomheden. Det kan være med til at skabe både varme og ro i det samlede udtryk."
  - **Energisk:** "Det giver god mening, hvis du også oplever energi i udtrykket. Farver kan godt skabe energi uden at gøre et udtryk uroligt. Her er de samtidig brugt på en måde, der holder det samlede udtryk roligt og imødekommende."
  - **Noget føles som om, det ikke helt spiller:** "Det kan du godt opleve — og det er ikke nødvendigvis forkert. Hvad der føles støjende eller uroligt, kan være forskelligt fra person til person. I det her eksempel er farverne dog sat sammen med et roligt og varmt udtryk for øje, hvor de enkelte farver skal understøtte hinanden frem for at konkurrere."
  - **Jeg er ikke sikker:** "Det er helt okay ikke at være sikker. Nogle gange er det lettere at mærke et samlet udtryk, end det er at sætte ord på, hvorfor det føles sådan. Her er farverne brugt med fokus på et roligt og imødekommende udtryk, hvor de arbejder sammen og får plads til hinanden."
- **Leder videre:** Når brugeren har modtaget feedback på deres valg, går de videre til næste eksempel.
- **Gemmes:** Nej.

### Boble 4.3 — Hvad for et indtryk får du? (hjemmeside)

**Hvad brugeren møder:** Billedet `varm-hjemmeside.png` — en fiktiv hjemmeside fra en behandler, med et roligt farveudtryk. *"Hvad for et indtryk får du af det her?"*

- **Interaktion:** Samme fem valgmuligheder som Boble 4.2 — brugeren vælger ét af dem.
- **Respons (matchet pr. valg):**
  - **Varmt og/eller roligt:** "Her er farverne fordelt på en måde, der giver øjet lidt ro. Nogle farver får lov til at fylde mere, mens andre bruges som mindre detaljer. Det skaber et samlet udtryk, hvor farverne understøtter hinanden uden at kræve opmærksomhed på samme tid."
  - **Energisk:** "Det giver god mening, hvis du også oplever energi i udtrykket. En hjemmeside kan godt have farver, der skaber liv og opmærksomhed, uden at det tager den rolige fornemmelse. Her er der stadig en tydelig balance i, hvordan farverne er fordelt på siden."
  - **Noget føles som om, det ikke helt spiller:** "Det kan godt være den fornemmelse, du får — og den er helt legitim. Vi oplever ikke alle farver og sammensætninger på samme måde. Her er farverne brugt med en tydelig fordeling, hvor nogle får lov at være i baggrunden, mens andre bruges til at fremhæve bestemte elementer. Det er med til at skabe det rolige udtryk, hjemmesiden er bygget op omkring."
  - **Jeg er ikke sikker:** "Det er helt okay ikke at være sikker. På en hjemmeside arbejder farverne sammen med mange andre ting, og det kan være svært at skille dem helt ad. I det her eksempel er farverne fordelt med fokus på at skabe et roligt og sammenhængende udtryk, hvor ikke alting forsøger at få din opmærksomhed på én gang."
- **Leder videre:** Når brugeren har modtaget feedback på deres valg, går de videre til næste eksempel.
- **Gemmes:** Nej.

### Boble 4.4 — Hvad for et indtryk får du? (logo)

**Hvad brugeren møder:** Billedet `energisk-logo.png` — et fiktivt logo fra en behandler, med et energisk og dynamisk udtryk med flere farver og detaljer, uden at blive en farvelade. *"Hvad for et indtryk får du af det her?"*

- **Interaktion:** Samme fem valgmuligheder som Boble 4.2 — brugeren vælger ét af dem.
- **Respons (matchet pr. valg):**
  - **Energisk:** "Her er der mere bevægelse og energi i farverne. Farverne får lov til at spille en tydeligere rolle, og de forskellige elementer skaber liv i udtrykket. Det betyder ikke nødvendigvis, at det bliver uroligt — energien kan også være med til at gøre et udtryk levende og dynamisk."
  - **Varmt og/eller roligt:** "Du kan godt opleve varme eller ro i dele af udtrykket. Farver behøver ikke kun skabe ét indtryk. Her er der samtidig arbejdet med flere elementer og farver, som tilsammen giver logoet mere bevægelse og energi."
  - **Noget føles som om, det ikke helt spiller:** "Det kan du godt opleve — og det er ikke nødvendigvis forkert. Når der er flere farver og elementer i spil, kan vi opleve dem forskelligt. I det her eksempel er farverne og formerne brugt til at skabe et levende og dynamisk udtryk, hvor der gerne må ske lidt mere."
  - **Jeg er ikke sikker:** "Det er helt okay ikke at være sikker. Nogle udtryk er nemme at mærke, men sværere at sætte ord på. Her er der arbejdet med flere farver og elementer, som tilsammen skaber mere liv og bevægelse i logoet."
- **Leder videre:** Når brugeren har modtaget feedback på deres valg, går de videre til næste eksempel.
- **Gemmes:** Nej.

### Boble 4.5 — Hvad for et indtryk får du? (nyhedsbrev)

**Hvad brugeren møder:** Billedet `larmende-nyhedsbrev.png` — et fiktivt nyhedsbrev fra en behandler, der viser hvordan farvevalg, kontrast og brugen af elementer som emojis kan påvirke det samlede indtryk. *"Hvad for et indtryk får du af det her?"*

- **Interaktion:** Samme fem valgmuligheder som Boble 4.2 — brugeren vælger ét af dem.
- **Respons (matchet pr. valg):**
  - **Noget føles som om, det ikke helt spiller:** "Her er der nogle ting i farvevalget, der kan gøre udtrykket mere forstyrrende. Nogle af farverne ligger tæt på hinanden i kontrast, og det kan gøre det sværere at afkode, hvad du skal kigge på. Samtidig trækker emojis opmærksomhed forskellige steder i indholdet. Det betyder ikke, at hver enkelt farve eller emoji er et problem i sig selv. Men sammen kan de gøre det samlede udtryk mere uroligt."
  - **Varmt og/eller roligt:** "Du kan godt opleve varme eller ro i dele af udtrykket. Nogle af farverne og elementerne fungerer fint hver for sig. Men når kontrasten mellem farverne ikke altid er tydelig nok, kan det blive sværere for øjet at finde rundt i indholdet. Også små elementer som emojis kan ændre det samlede indtryk — alt efter hvor og hvor meget de bruges."
  - **Energisk:** "Der er bestemt energi i det her udtryk. Farverne og emojis skaber liv og trækker opmærksomhed forskellige steder hen. Men når flere elementer samtidig kæmper om opmærksomheden, og kontrasten mellem farverne varierer, kan energien også begynde at føles forstyrrende."
  - **Jeg er ikke sikker:** "Det er helt okay ikke at være sikker. Prøv at kigge på, hvad der først fanger dit øje. Er det let at finde rundt i indholdet — eller bliver din opmærksomhed trukket flere forskellige steder hen? I det her eksempel spiller både farvernes kontrast og brugen af små elementer som emojis en rolle for det samlede udtryk. Det er nogle af de ting, der kan være værd at lægge mærke til, når du arbejder med dine egne farver."
- **Leder videre:** Når brugeren har modtaget feedback på deres valg, går de videre til næste del af modulet (Modul 5).
- **Gemmes:** Nej.

## Modul 5 — Farvernes roller

*Status: uddyber det nuværende Modul 5 (samme grundtanke om rolle og dosering), nu opdelt i tre bobler.*

### Boble 5.1 — Det handler ikke om antallet

**Hvad brugeren møder:**

"Hvor mange farver skal man egentlig have? Det korte svar er: der findes ikke ét rigtigt antal.

Nogle udtryk fungerer fint med ganske få farver. Andre har brug for flere. Det afgørende er ikke, om din farvepalette består af tre, fem eller otte farver.

Det afgørende er, hvordan farverne arbejder sammen — og hvilken plads de får i dit samlede udtryk."

- **Interaktion:** Ingen.
- **Respons:** Ingen.
- **Leder videre:** Brugeren introduceres herefter til, at farverne i en palette kan have forskellige roller.
- **Gemmes:** Nej.

### Boble 5.2 — Farver har forskellige roller

**Hvad brugeren møder:**

"Farver behøver ikke alle sammen at gøre det samme. Nogle farver får lov til at fylde meget og være med til at sætte tonen for dit samlede udtryk. Andre ligger mere i baggrunden og understøtter helheden. Og nogle farver bruger du måske kun i små doser — netop fordi de skal fange opmærksomheden, når det er meningen.

Når du begynder at tænke over, hvilken rolle dine farver spiller, bliver det også lettere at se, om de arbejder sammen på en måde, der giver mening."

- **Interaktion:** Ingen.
- **Respons:** Ingen.
- **Leder videre:** Næste boble folder ud, at en farves rolle også hænger sammen med, hvor meget plads den får i det samlede udtryk.
- **Gemmes:** Nej.

### Boble 5.3 — Det handler også om fordelingen

**Hvad brugeren møder:**

"En farves rolle handler også om, hvor meget plads den får. En farve, der kun dukker op i små detaljer, kan pludselig komme til at sætte et helt andet præg, hvis den får lov til at fylde halvdelen af siden.

Det er derfor ikke kun farverne i sig selv, der har betydning. Det har også betydning, hvor og hvor meget du bruger dem.

Når du fordeler dine farver bevidst, bliver det lettere at skabe et udtryk, hvor farverne arbejder sammen i stedet for at kæmpe om opmærksomheden."

- **Interaktion:** Ingen.
- **Respons:** Ingen.
- **Leder videre:** Brugeren går videre til næste modul, hvor de får mulighed for selv at arbejde med en farvepalette og afprøve nogle af de tanker, de netop er blevet introduceret til.
- **Gemmes:** Nej.

## Modul 6 — Vælg din palet

*Status: Bygget 2026-09-11. Erstatter det tidligere Modul 6 (tre faste roller: Hovedfarve/Understøttende/Accent, ét hex-felt hver) med en helt fri palet-bygger: ubegrænset antal farver, fritekst-rolle pr. farve, procent-baseret dosering med automatisk omfordeling, og en levende visuel forhåndsvisning. Bygget med almindelig HTML/CSS/JS, ingen eksternt bibliotek.*

### Boble 6.1 — Vælg dine farver

**Hvad brugeren møder:**

"Nu skal vi samle dine farver. Start med de farver, du allerede bruger — eller de farver, du gerne vil arbejde med. Du behøver ikke vælge et bestemt antal. Tilføj de farver, der giver mening for dit udtryk."

Herefter møder brugeren farvevælgeren og kan begynde at bygge sin palette.

- **Visuelt:** Farvevælgeren er det centrale element på skærmen. Brugeren kan opbygge en voksende palette, hvor de valgte farver vises samlet. Der skal være mulighed for: at vælge en farve visuelt, at indtaste en HEX-kode, at tilføje farven til paletten, at tilføje et fleksibelt antal farver, at ændre en valgt farve, og at fjerne en valgt farve. Eksempel: 🎨 #0C3A2D · 🎨 #E8ECD1 · 🎨 #DE5B23, med en "➕ Tilføj en farve"-knap.
- **Interaktion:** Brugeren vælger og tilføjer de farver, de ønsker at arbejde videre med. Der er ikke et fast antal farver, der skal vælges. Brugeren kan ændre eller fjerne farver undervejs.
- **Respons:** Ingen.
- **Leder videre:** Når brugeren er klar til at arbejde videre med de valgte farver, går de videre til næste boble, hvor de skal tænke over, hvad farverne hver især skal bidrage med i deres udtryk.
- **Gemmes:** Ja. Brugerens valgte farvepalette gemmes og følger med videre til resten af Modul 6, til Modul 7 (kontrasttjek) og til Modul 8 (dokumentation). Paletten er ikke låst, når brugeren går videre — den skal senere kunne åbnes og redigeres igen, når muligheden for at vende tilbage til rummene er implementeret (endnu ikke bygget for noget rum, bevidst fremtidigt punkt — se `docs/duf-teknisk-navigationslinjer-modul-og-boble.md`).

### Boble 6.2 — Hvilken rolle skal dine farver spille?

**Hvad brugeren møder:**

"I det forrige modul talte vi om, at farver ikke behøver at gøre det samme. Nu kan du prøve at tænke over, hvilken rolle dine egne farver skal spille i dit udtryk.

Nogle farver får måske lov til at sætte tonen og fylde mere. Andre skal understøtte. Og nogle skal måske kun bruges sparsomt, når du gerne vil have noget til at skille sig ud.

Du behøver ikke passe dine farver ind i faste kategorier. Det handler bare om at tænke over, hvad du gerne vil have dem til at gøre."

Herefter møder brugeren sine valgte farver én ad gangen: farven vises med sin farvekode, spørgsmålet *"Hvilken rolle forestiller du dig, at denne farve skal spille i dit udtryk?"* med et fritekstfelt, og en "→ Næste farve"-knap.

- **Visuelt:** Den aktuelle farve vises tydeligt sammen med dens farvekode. Brugeren arbejder med én farve ad gangen for at kunne fokusere på den enkelte farves rolle. Den samlede palette kan eventuelt vises diskret på skærmen som en oversigt, så brugeren stadig kan se farverne i sammenhæng.
- **Interaktion:** Brugeren skriver med egne ord, hvilken rolle de forestiller sig, at hver farve skal spille i deres udtryk. Der er ingen faste kategorier eller roller, som brugeren skal vælge imellem. Brugeren går videre til næste farve, indtil alle valgte farver har fået en beskrivelse.
- **Respons:** Ingen.
- **Leder videre:** Når brugeren har tænkt over, hvilken rolle deres farver skal spille, går de videre til næste boble, hvor de kan prøve at lege med, hvor meget plads hver farve skal have i det samlede udtryk.
- **Gemmes:** Ja. For hver farve gemmes farvekoden og brugerens beskrivelse af farvens rolle. Følger med videre til resten af Modul 6 og indgår senere i Modul 8's dokumentation.

### Boble 6.3 — Hvor meget plads skal dine farver have?

**Hvad brugeren møder:**

"Nu kan du prøve at lege med, hvor meget plads dine farver får. En farve kan ændre betydning, alt efter om den fylder lidt eller meget. Prøv at justere fordelingen og se, hvad der sker med dit samlede udtryk.

Du skal ikke ramme en bestemt fordeling. Det handler om at eksperimentere og få en fornemmelse af, hvordan dine farver arbejder sammen, når de får forskellig mængde plads."

- **Visuelt:** Brugerens samlede palette vises sammen med en procentvælger for hver farve, fx: 🎨 #0C3A2D ━━━━━━●━━━━ 60 % · 🎨 #E8ECD1 ━━━━●━━━━━━ 30 % · 🎨 #DE5B23 ━━●━━━━━━━━ 10 %. Den samlede fordeling af farverne udgør altid 100 %. Når brugeren justerer én farves procent, opdateres de øvrige farver automatisk (proportional omfordeling). Alle procenttal og den visuelle forhåndsvisning opdateres løbende.
- **Interaktion:** Brugeren kan justere procenten for hver af deres farver. Systemet sørger automatisk for, at den samlede fordeling altid udgør 100 %, ved at omfordele de øvrige farver proportionalt. Brugeren kan derfor eksperimentere frit uden selv at skulle holde styr på matematikken.
- **Respons:** Ingen fast feedback — den løbende opdatering af procenttal og forhåndsvisning fungerer som feedback i sig selv.
- **Leder videre:** Når brugeren har fundet en fordeling, de gerne vil arbejde videre med, går de videre til næste boble, hvor de ser deres farver arbejde sammen og kan vælge, om en af farverne skal bruges som tekstfarve.
- **Gemmes:** Ja. For hver farve gemmes farvekoden, brugerens beskrivelse af farvens rolle, og den valgte dosering i %. Følger med videre til resten af Modul 6 og senere til Modul 8's dokumentation.

### Boble 6.4 — Se dine farver arbejde sammen

**Hvad brugeren møder:**

"Nu kan du se, hvordan dine farver arbejder sammen. Indtil nu har du valgt dine farver, tænkt over hvilken rolle de skal spille og prøvet at fordele, hvor meget plads de skal have. Nu kan du se dem samlet. Her kan du få en fornemmelse af, hvordan farverne spiller sammen, når de får den plads, du har givet dem."

- **Visuelt:** En levende, enkel forhåndsvisning viser brugerens farver i en samlet komposition — farvede flader og former, elementer i forskellige størrelser, simpel eksempeltekst. Farvernes fordeling fra Boble 6.3 bestemmer automatisk, hvor meget plads de forskellige farver får i forhåndsvisningen: en farve med høj dosering får mere plads, en farve med lav dosering optræder i mindre flader eller detaljer. Det er en visuel oversættelse af brugerens valgte fordeling — ikke en fast regel for, hvordan farverne skal bruges.
- **Interaktion:** Brugeren kan vælge, om en af deres farver skal bruges som tekstfarve i forhåndsvisningen (☐ Brug som tekstfarve, ved hver farve). Når en farve vælges, opdateres eksempelteksten i forhåndsvisningen. Hvis brugeren ikke vælger en tekstfarve, vises teksten automatisk i sort. Brugeren kan kun have én aktiv tekstfarve ad gangen.
- **Respons:** Ingen fast feedback — forhåndsvisningen fungerer som løbende visuel feedback.
- **Leder videre:** Når brugeren er klar, går de videre til næste modul, hvor de kan undersøge, hvordan deres farver fungerer sammen i forhold til kontrast.
- **Gemmes:** Ja. Følgende gemmes som en del af brugerens palette: farvekoder, brugerens beskrivelse af hver farves rolle, dosering i %, og eventuel valgt tekstfarve. Disse oplysninger følger med videre til Modul 7 (kontrasttjek) og senere til Modul 8's dokumentation.

## Modul 7 — Tjek kontrast i praksis

*Status: Bygget 2026-09-11, sammen med Modul 6. Erstatter det tidligere Modul 7 (ét hardkodet tekst/baggrunds-par) med et tjek, hvor BÅDE tekst- og baggrundsfarve vælges fra brugerens egen gemte palette, kan afprøves i flere kombinationer, og hvor kun den endelige, valgte kombination gemmes. Den eksisterende `js/engine/contrast.js` (WCAG-kontrastberegning) genbruges uændret — tilføjet en ny `contrastLevel()`-funktion til de tre feedback-niveauer, der afløser den binære pass/fail.*

### Boble 7.1 — Når farver mødes

**Hvad brugeren møder:**

"Farver kan godt se flotte ud sammen — uden nødvendigvis at fungere godt til det samme. Når du bruger to farver sammen, kan forskellen mellem dem have betydning for, hvordan de opleves.

Det bliver særligt vigtigt, når du lægger tekst oven på en farvet baggrund. Hvis farverne ligger meget tæt på hinanden, kan teksten være sværere at få øje på og læse.

Det betyder ikke, at farverne er forkerte. Måske fungerer de bare bedre sammen på en anden måde.

Nu skal du prøve at se, hvordan dine egne farver fungerer sammen."

- **Visuelt:** En enkel introduktionsskærm uden farvevælger eller anden interaktion.
- **Interaktion:** Ingen.
- **Respons:** Ingen.
- **Leder videre:** Brugeren går videre til kontrasttjekket, hvor de kan begynde at undersøge, hvordan deres egne farver fungerer sammen.
- **Gemmes:** Nej.

*Note til design/udvikling: der kan senere tilføjes et sekundært, frivilligt link til et kommende DUF-blogindlæg om WCAG, kontrast og webtilgængelighed — ikke en nødvendig del af flowet.*

### Boble 7.2 — Prøv dine farver sammen

**Hvad brugeren møder:**

"Nu kan du begynde at prøve dine farver sammen. Vælg to farver fra din palette og se, hvordan de fungerer, når den ene bruges som tekst og den anden som baggrund.

Du kan starte med den tekstfarve, du eventuelt valgte i Modul 6 — men du kan også prøve andre kombinationer.

Det kan være en god idé at undersøge flere kombinationer. En farve, der fungerer godt som tekst på én baggrund, kan fungere helt anderledes på en anden."

- **Visuelt:** Den eksisterende kontrasttjekker opdateres, så brugerens farver fra Modul 6 automatisk er tilgængelige. Skærmen består af: **Tekstfarve** (brugeren vælger en farve fra sin egen palette — hvis brugeren har valgt en tekstfarve i Modul 6, er denne valgt som udgangspunkt), **Baggrundsfarve** (brugeren vælger en anden farve fra sin egen palette), og **Kontrastresultat** (beregnes automatisk, når to farver er valgt). Den eksisterende tekniske beregning (`contrast.js`) beholdes, men resultatet præsenteres i et mere menneskeligt og DUF-venligt sprog.
- **Interaktion:** Brugeren kan vælge tekstfarve fra sin palette, vælge baggrundsfarve fra sin palette, skifte mellem forskellige kombinationer, og løbende se kontrastresultatet ændre sig — uden at skulle indtaste farvekoder igen.
- **Respons:** Når brugeren vælger to farver, beregnes kontrasten automatisk. Selve kontrastforholdet vises som en del af resultatet, men den uddybende feedback kommer i Boble 7.3.
- **Leder videre:** Når brugeren har valgt to farver og set deres kontrastresultat, går de videre til næste boble, hvor resultatet sættes i perspektiv i forhold til læsbarhed og brug.
- **Gemmes:** Brugeren kan undersøge og sammenligne flere forskellige farvekombinationer undervejs. Kun den kombination, brugeren vælger som den endelige, gemmes og følger med videre til Modul 8's dokumentation.

### Boble 7.3 — Hvad betyder det for læsbarheden?

**Hvad brugeren møder:**

"Når du har valgt en kombination af farver, kan du her se, hvad kontrasten mellem dem kan betyde for læsbarheden. Det handler ikke om, hvorvidt dine farver er rigtige eller forkerte. Det handler om at få en fornemmelse af, hvordan de fungerer sammen i den situation, du gerne vil bruge dem i."

- **Visuelt:** Brugeren ser den valgte kombination med eksempeltekst samt kontrastresultatet. Feedbacken ændrer sig afhængigt af kontrasten mellem den valgte tekstfarve og baggrundsfarve, i tre niveauer (afløser nuværende binære pass/fail):
  - **Hvis teksten træder tydeligt frem:** "Her er der en tydelig forskel mellem farverne. Det gør det lettere for teksten at træde frem fra baggrunden og være rar at læse. Det giver dig gode muligheder, hvis du gerne vil bruge kombinationen til eksempelvis brødtekst, overskrifter eller anden vigtig information."
  - **Hvis farverne ligger lidt tættere på hinanden:** "Her er forskellen mellem farverne mindre. Teksten kan stadig fungere, men hvor let den er at læse, kan blandt andet afhænge af tekstens størrelse og hvor meget tekst der er. Prøv eventuelt at se, hvordan kombinationen fungerer med både kort og længere tekst. Måske passer den bedre til nogle typer indhold end andre."
  - **Hvis teksten kan have svært ved at træde frem:** "Her ligger farverne så tæt på hinanden, at teksten kan være sværere at få øje på. Det kan gøre den mindre behagelig at læse. Det betyder ikke, at der er noget galt med dine farver. Måske fungerer de bare bedre sammen i flader, former eller detaljer, hvor læsbarhed ikke spiller den samme rolle."
  - Kontrastforholdet vises fortsat som sekundær, teknisk information (fx "Kontrastforhold: 11.57 : 1"). Der kan desuden være et frivilligt link ("Nysgerrig på, hvad kontrastforhold og WCAG betyder? Læs mere →") til et kommende DUF-blogindlæg om WCAG, kontrast og webtilgængelighed.
- **Interaktion:** Brugeren kan gå tilbage og prøve en anden kombination af farver. Når brugeren ændrer tekstfarve eller baggrundsfarve, opdateres eksempelvisning, kontrastforhold og feedback samtidig. Når brugeren har fundet en kombination, de gerne vil arbejde videre med, kan de vælge den som deres endelige kombination.
- **Respons:** Feedbacken tilpasses automatisk ud fra kontrasten mellem brugerens valgte tekstfarve og baggrundsfarve. Formålet er at hjælpe brugeren med at forstå, hvad kontrasten kan betyde for læsbarheden — uden at præsentere resultatet som rigtigt eller forkert.
- **Leder videre:** Når brugeren har valgt den kombination, de gerne vil arbejde videre med, kan de gå videre til Modul 8.
- **Gemmes:** Ja. Kun den farvekombination, brugeren vælger som sin endelige, gemmes. Følgende følger med videre til Modul 8's dokumentation: tekstfarve, baggrundsfarve, kontrastforhold, og den tilhørende vurdering af, hvad kontrasten betyder for læsbarheden.

## Modul 8 — Afprøv og dokumentér

*Status: Bygget 2026-09-11, sammen med Modul 6/7. Uddyber det tidligere Modul 8, nu opdelt i tre bobler. Boble 8.2's ændring (2026-09-08): refleksionen er ændret fra en generel skriftlig begrundelse af farvevalgene til en refleksion over, hvad brugeren konkret opdager, når paletten bruges i praksis — tre spørgsmål som inspiration (ikke enkeltvis besvarelse), ét frit tekstfelt. Boble 8.3 er en ren opsamlingsskærm uden redigerbart felt — dokumentationsteksten til `saveVaekstrumOutput` genereres automatisk af motoren ud fra palette, tekstfarve, kontrastvalg og refleksion.*

### Boble 8.1 — Prøv din palette af

**Hvad brugeren møder:**

"Nu er det tid til at prøve din palette af i praksis. Indtil nu har du set dine farver samlet og undersøgt, hvordan de fungerer sammen. Men farver kan godt opleves anderledes, når de bliver en del af noget rigtigt.

Prøv at bruge din palette ét sted i dit visuelle udtryk. Det kan være et opslag til sociale medier, en side på din hjemmeside, et nyhedsbrev, et dokument — eller noget helt andet.

Du behøver ikke lave det perfekt. Formålet er bare at se, hvad der sker, når dine farver kommer i brug.

Når du har prøvet dem af, kan du komme tilbage og se på, hvad du har opdaget."

- **Visuelt:** En enkel skærm med fokus på invitationen til at afprøve paletten i praksis. Ingen yderligere elementer eller interaktion nødvendig.
- **Interaktion:** Ingen.
- **Respons:** Ingen.
- **Leder videre:** Brugeren går videre til næste boble, hvor de kan reflektere over, hvordan det var at se og bruge farverne i praksis.
- **Gemmes:** Nej.

### Boble 8.2 — Hvad lagde du mærke til?

**Hvad brugeren møder:**

"Nu har du prøvet dine farver af i praksis. Når farverne bliver en del af noget rigtigt, kan du opdage ting, som ikke nødvendigvis var tydelige, da du så dem samlet i din palette.

Du kan for eksempel tænke over: Var der noget, der fungerede, som du havde håbet? Var der noget, der overraskede dig? Er der noget, du får lyst til at justere?

Hvad lagde du mærke til?"

- **Visuelt:** En enkel refleksionsskærm med de tre spørgsmål som inspiration — de skal ikke besvares enkeltvis, men fungerer som mulige indgange til brugerens egen refleksion. Et frit tekstfelt giver brugeren mulighed for at samle de tanker, de gerne vil tage med videre.
- **Interaktion:** Brugeren kan skrive sine refleksioner i et frit tekstfelt.
- **Respons:** Ingen.
- **Leder videre:** Når brugeren har skrevet sine tanker, går de videre til Boble 8.3, hvor DUF samler det arbejde, brugeren allerede har lavet med sin palette.
- **Gemmes:** Ja. Brugerens refleksion gemmes og følger med til Boble 8.3 og Modul 8's dokumentation.

### Boble 8.3 — Din valgte farvepalette

**Hvad brugeren møder:**

"Din valgte farvepalette. Her kan du se det, du har arbejdet med gennem vækstrummet. Din farvepalette kan gøre det lettere at arbejde med dit visuelle udtryk, fordi du allerede har taget stilling til, hvilke farver du vil bruge, og hvilken rolle de kan spille."

**Dine farver** — for hver farve vises: 🎨 [Farveprøve], Farvekode: #[XXXXXX], Rolle: [brugerens beskrivelse af farvens rolle], Dosering: [XX] %. Antallet af farver følger brugerens faktiske palette og er ikke begrænset til et bestemt antal.

**Tekstfarve** — hvis brugeren har valgt en tekstfarve: 🎨 [Farveprøve], "Din valgte tekstfarve: #[XXXXXX]". Hvis ikke: "Tekstfarve: Sort som udgangspunkt."

**Din valgte kontrastkombination** — Tekstfarve: 🎨 #[XXXXXX], Baggrundsfarve: 🎨 #[XXXXXX], Kontrastforhold: [XX : 1], Læsevenlighed: [den vurdering brugeren modtog i Boble 7.3].

**Det lagde du mærke til** — brugerens egen refleksion fra Boble 8.2 vises her.

**Afsluttende tekst:** "Du har nu afsluttet vækstrummet Farver — og fået sat konkrete farver op, givet dem nogle roller og tjekket kontrasterne. Din valgte farvepalette gør det lettere at arbejde med dit visuelle udtryk, fordi du allerede har taget stilling til, hvilken rolle dine farver kan spille. Når du bruger paletten igen og igen, kan det også være med til at skabe genkendelighed i det, andre møder fra dig. Og rollerne behøver ikke være de samme for altid. I takt med at din praksis udvikler sig, vil du opdage, at en farve skal have mere plads, mindre plads eller måske spille en helt anden rolle. Du kan nu afslutte dette vækstrum og begynde at bruge din palette i din praksis."

*Guide: Du er altid velkommen til at vende tilbage til vækstrummet og justere din palette, hvis dine farver eller deres roller ændrer sig undervejs.*

**Det tager du med dig:** Det arbejde, brugeren har lavet her, bliver samlet i Fælles samling. Her kan brugeren finde: den valgte farvepalette med farvekoder, farvernes roller, den valgte dosering af farverne, en eventuel tekstfarve, den valgte kontrastkombination, kontrastforholdet og vurderingen af læsbarheden, og egne refleksioner fra afprøvningen. Fælles samling kan bruges til at vende tilbage til det, brugeren har arbejdet med, når det skal bruges i praksis.

- **Interaktion:** Ingen — ren opsamlingsskærm.
- **Respons:** Ingen.
- **Leder videre:** Afslutter vækstrummet Farver.
- **Gemmes:** Ja — hele det samlede output (palette med roller og dosering, eventuel tekstfarve, valgt kontrastkombination, refleksion) gemmes via `saveVaekstrumOutput("farver", ...)`, jf. samme mønster som resten af rummet, og indgår i Fælles samling (jf. `docs/duf-faelles-samling-visuel-stil.md`).

## Spørgsmål til jer, inden I bygger videre

- **Afgjort 2026-09-11:** Modul 3 reduceres fra "saml 3–5 egne eksempler" til "vælg ét eksempel — eget eller DUF's" (Boble 3.2/3.3). Billedupload-funktionen fra den nuværende Modul 3 genbruges til det ene billede. Refleksionsspørgsmålene i Boble 3.3 er ren egen overvejelse — ingen interaktion, intet gemt svar.
- **Afgjort 2026-09-11, opdateret samme dag efter Heidis gennemgang af den bygget kode:** Modul 4 erstattes af fire fiktive, AI-genererede eksempler direkte i rummet (opslag, hjemmeside, logo, nyhedsbrev), med **envalg** (ikke flervalg — kun ét af de fem svar kan vælges, så det altid er entydigt, hvilken feedback der skal gives) + matchet feedback. Billedfiler: `roligt-so-me.png`, `varm-hjemmeside.png`, `energisk-logo.png`, `larmende-nyhedsbrev.png` — alle fire ligger nu i `img/`.
- **Bekræftet 2026-09-11:** Boble 1.1 og Boble 2.1's ordlyd (hentet fra manuskriptets egen, reviderede tekst i den bygget kode) er korrekt — ingen ændring nødvendig.
- **Rettet 2026-09-11:** Boble 1.2 manglede sine tre billeder i den første udgave af koden (Heidis eget efterslæb, ikke en fejl i opgaven) — `varm-klinik.png`, `koelig-klinik.png` og `energi-klinik.png` er nu lagt i `img/`, og koden viser dem i eksempelkortene.
- **Rettet 2026-09-11:** `eksempel-3.2.png` (Boble 3.2's DUF-eksempel) er nu lagt i `img/` og korrekt navngivet (filen var fejlagtigt gemt som `eksempel-3.2.png.png` — rettet).
- **Afgjort og bygget (2026-09-11):** Modul 6 og Modul 7 er ombygget markant ift. den tidligere kode — fri palet-bygger med rolle, procent-dosering og levende preview (Modul 6), og et kontrasttjek der trækker begge farver fra brugerens egen palette med tre-niveau-feedback i stedet for binær pass/fail (Modul 7). Bygget som selvstændige byggeopgaver, adskilt fra resten af Farver-revisionen, med almindelig HTML/CSS/JS.
- **Uændret fra tidligere manuskript:** Velkomst, Modul 1, Modul 2, og strukturen i Modul 5. Kun opdelt i bobler, ingen indholdsændringer.

## Status og næste skridt

Modul 1-5 er bygget (branch `farver-update-content`, commit `717565bf...`) og er 2026-09-11 rettet til efter Heidis gennemgang: Modul 4 er lavet om til envalg, Boble 1.2's tre billeder er tilføjet, og `eksempel-3.2.png` er lagt korrekt navngivet i `img/`. `js/data/farver.js`, `js/engine/farverUi.js` og css'en (`css/_components.scss` + `css/style.css`) er opdateret til dette.

Modul 6, 7 og 8 er nu også bygget (2026-09-11, samme branch): `js/data/farver.js` og `js/engine/farverUi.js` er udvidet med indhold og skærme til den frie palet-bygger (Modul 6), det palette-drevne kontrasttjek (Modul 7) og den tre-boble-opdelte afprøvning/opsamling (Modul 8). `js/engine/farverEngine.js` styrer det fulde flow og gemmer den samlede palette, tekstfarve, kontrastvalg og refleksion via `saveVaekstrumOutput`. `js/engine/contrast.js` har fået en ny `contrastLevel()`-funktion til Modul 7's tre feedback-niveauer. CSS til palet-bygger, dosering, forhåndsvisning og kontrastprøve er tilføjet i `css/_components.scss` + `css/style.css`.

**Ikke afprøvet endnu:** Flowet er testet på kode-niveau (kontrastberegning, tre-niveau-tærskler og procent-omfordelingsalgoritmen er verificeret isoleret, herunder stress-testet med tilfældige ændringer), men ikke afprøvet i en rigtig browser. Bør gennemgås i browseren (Live Server e.l.) før merge — især: tilføj/fjern/rediger farver i Modul 6's palet-bygger, tjek at doseringen altid summer til 100 % ved gentagne justeringer af sliderne, og gennemfør et helt kontrast-flow inklusive "Prøv en anden kombination".
