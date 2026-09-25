# MANUSKRIPT — Ikoner, fonte & andre grafiske byggesten

*Status: Genskrevet i sin helhed 2026-09-24, som nyt udkast skrevet fra bunden ud fra [[DUF Vækstrum Context - Ikoner, fonte og andre grafiske byggesten]], i tonen fra [[DUF Proces - Manuskript-revision og tone]], og godkendt af Heidi efter gennemgang i chat over flere runder. Undervejs blev et strukturelt forslag fra ChatGPT (2026-09-22) indarbejdet på Heidis opfordring — selve teksten er alligevel skrevet fra bunden, ikke en gennemskrivning af et ChatGPT-udkast. Efter en indledende gennemgang af manuskriptet (og en fornyet ChatGPT-kommentering af selve flowet) er fire punkter finjusteret samme dag (se "Ændringer efter gennemgang" nedenfor). Erstatter den tidligere version af dette dokument (8 lineære moduler). Rettighedsindholdet i Modul 3 holder sig tæt på [[DUF Ikonrettigheder - praktisk oversigt]] (§1, §3, §4, §5, §6). Forgreningen er designet ind fra start, men i en lettere form end Logo: brugeren vælger selv sit fokus i Modul 2 (`fokusvalg[]`), og kun de valgte emner (Ikoner/Fonte/Andre byggesten) vises i Modul 3-5. Valget er ikke låst — det kan altid ændres senere via modul-navigationslinjen. To nye, selvstændige tekniske komponenter hører til dette manuskript: en skrifttype-vælger (Modul 4, se [[DUF Teknisk - Skrifttype-vælger (fontvælger med Google Fonts)]]) og en forhåndsvisning, der viser brugerens valg samlet (Modul 6, se [[DUF Teknisk - Byggesten-forhåndsvisning (Prøv dem sammen)]]). Struktur: Vækstrum → Modul → Boble, se [[DUF Teknisk - Navigationslinjer (modul og boble)]].*

*⚠️ **Runde 7 (2026-09-25, efter brugertest 1):** se [[DUF Brugertest 1 - Visuelt vækstområde (sortering)]]. Byggesten var det rum, hvor det var sværest for testbrugeren, der ikke har noget endnu: "Jamen hvad er ikoner, er det punktummer og kommaer?" Fontvælgeren (F3) og det automatiske skift i 6.2 (F5) er allerede rettet. Ændringer i denne runde: en ny boble 1.2, der viser, hvad ikoner, fonte og små detaljer er, med små eksempler; en vej for brugeren, der starter fra bunden (1.3 og 1.4 springes over); ikon-stilene vises som rigtige ikoner (U9); knappen "Skift fokus" omdøbes og forklares (T10); tydelige overgange mellem emnerne (T9); Modul 4 handler mere om udtryk og læsbarhed og kobles til brugerens kanaler fra Overblik (T11); læsbarhedstesten handler ikke længere om mobilen (T12); oversigten i 7.1 samler de tekniske oplysninger og kan rettes (U10); og tommelfingerreglen forklares med eksempler (T13). Boble 6.2's ordlyd er testet og bliver, som den er. Alle nye tekster er godkendt af Heidi 2026-09-25. Klar til implementering, se [[DUF Prompt - Byggesten (runde 7)]].*

**Sådan læses dette dokument:** hvert modul er delt i bobler, den mindste byggeklods, svarende til én skærm. Hver boble har feltet "Hvad brugeren møder på denne skærm" og udfylder kun de øvrige felter, når det er relevant. Et valgfrit felt er **Se også**: et lille skilt, der viser, at emnet behandles i et andet vækstrum (se [[DUF Teknisk - Se også-skilt (henvisning til andet vækstrum)]]). En 💬-linje er en Guide-bemærkning med avatar (Marcus/Heidi/Sophia), hvor den er tildelt. **Tekster, brugeren ser, henviser aldrig til modul- eller boblenumre** — numrene står kun i felterne "Hvad der leder videre" og i noter til design/udvikling.

## Rejsen gennem rummet

Modul 2 er skillepunktet, men det er en let forgrening, ikke hårde spor som i Logo: brugeren multivælger, hvilke emner hun vil arbejde med (`fokusvalg[]`), og kun de tilsvarende moduler vises bagefter. Valget kan altid ændres igen.

1. **Se hvad du allerede har** *(alle)* — orientering, **hvad byggesten er (ny boble 1.2),** + tre konkrete eksempler fra brugerens eget materiale (springes over, hvis hun starter fra bunden).
2. **Hvad vil du have styr på?** *(skillepunktet)* — brugeren vælger selv, hvilke emner hun vil arbejde med. Kan altid ændres senere via modul-navigationslinjen.
3. **Ikoner** *(kun hvis valgt)* — føles, funktion, kilde (tre reelle spor), stil samlet.
4. **Fonte** *(kun hvis valgt)* — udtryk og læsbarhed, hvor de skal bruges, overskrift og brødtekst valgt visuelt via en skrifttype-vælger, læsbarhedstest.
5. **Andre byggesten** *(kun hvis valgt)* — har allerede / vælg retning / ved ikke endnu.
6. **Prøv dem sammen** *(alle)* — et lille eksempel med det, hun har valgt; fungerer det?
7. **Dit lille byggestens-sæt** *(alle)* — opsummering, tommelfingerregel, gem til den visuelle guide.

## Det, rummet husker (til udvikling)

Alt gemmes lokalt på brugerens enhed (samme princip som resten af DUF).

- Modul 1: `udgangspunkt` (allerede-udtryk / hist-og-her / fra-bunden), `eksempler[]`, `iagttagelser[]`
- Modul 2: `fokusvalg[]` (ikoner / fonte / andreByggesten — "Det hele" sætter alle tre). Kan altid ændres via modul-navigationslinjen. **Eksplicit regel:** `fokusvalg[]` styrer kun, hvilke af Modul 3-5 der *vises* — ikke hvilke data der findes. Fjerner brugeren et emne fra sit fokus, efter hun allerede har svaret i det tilhørende modul, slettes svarene ikke; de bliver liggende og vises igen, hvis hun senere tilføjer emnet til `fokusvalg` igen. Modul 6's forhåndsvisning følger samme regel: den viser det, det *aktuelle* `fokusvalg` peger på, ikke alt, der historisk er gemt.
- Modul 3 (Ikoner): `ikonFoelelse`, `ikonFunktion`, `ikonKilde` (fri / tegnSelv / betaler / **ingenEndnu**, ny i runde 7)
- Modul 4 (Fonte): `arbejdsVaerktoej`, `googleFontsDirekte` (bool, afledt af `arbejdsVaerktoej`), `fontOverskrift`, `fontBroedtekst`, `laesbarhedOk`
- Modul 5 (Andre byggesten): `andenDetalje` (upload/beskrivelse) eller `andenRetning` eller `ikkeBesluttet`
- Modul 6: `provetSammenResultat` (fungerer / tætPå / virkerIkke), `tilbageTil[]` (hvilke(t) valg der skal justeres)
- Modul 7: `tommelfingerregel` (fri tekst), `begrundelse` (samlet, til Fælles samling)
- **Læses fra Overblik (ny i runde 7):** `hentUdgangspunkt()` → `{ udgangspunkt, kanaler, starterFraBunden }`. Bruges i 1.3 (se nedenfor) og 4.2. Har brugeren ikke været i Overblik, opfører rummet sig som før.

## Knappen "Skift fokus" *(gælder hele rummet)*

*Runde 7: Testbrugeren lagde mærke til knappen i hjørnet, men spurgte "Hvad betyder skift fokus?". Hun kunne ikke se, at den førte til de andre emner.*

- **✅ Ny tekst på knappen (godkendt af Heidi 2026-09-25):** "Gå til et andet emne" *(før: "Skift fokus")*.
- **✅ Ny forklaring (godkendt af Heidi 2026-09-25):** Første gang knappen vises (i Modul 3, 4 eller 5), står der en lille linje under den: "Her kan du altid hoppe til ikoner, fonte eller de små detaljer, eller vælge flere emner til." Linjen forsvinder, når brugeren har brugt knappen eller er kommet til Modul 6.
- Knappen fører, som i dag, tilbage til 2.1, hvor brugeren kan ændre sit fokus. De valgte emner står allerede markeret.

## Modul 1 — Se hvad du allerede har *(alle)*

### Boble 1.1 — Velkommen

- **Hvad brugeren møder på denne skærm:**
  - *Har allerede arbejdet med Farver og/eller Logo i dette besøg:* Du har allerede arbejdet med de store dele af dit visuelle udtryk. Nu kigger vi på det, der går igen mellem dem.
  - *Kommer direkte til rummet:* Velkommen til Ikoner, fonte & andre grafiske byggesten.
  - *Fælles fortsættelse:* Skrifttyper. Ikoner. Streger. Knapper. Små grafiske detaljer. Du behøver ikke beslutte det hele i dag. Vi finder de byggesten, der gør det lettere for dig at skabe noget, der føles som dig — hver gang.
- **Hvad der leder videre:** **✅ (Heidis formulering, 2026-09-25):** Knappen "Hvilke elementer består byggesten af?" *(før: "Lad os se, hvor du starter")*.

### Boble 1.2 — Hvilke elementer består byggesten af? *(✅ ny boble i runde 7, godkendt af Heidi 2026-09-25)*

*Runde 7: Testbrugeren vidste ikke, hvad der mentes med ikoner ("er det punktummer og kommaer?"). Boblen viser de tre emner med små, konkrete eksempler, før brugeren skal tage stilling til noget. Den vises for alle. De følgende bobler i Modul 1 rykker ét nummer op.*

- **Hvad brugeren møder på denne skærm:** "Før vi går i gang, lad os lige se, hvad vi taler om. Byggesten er de små ting, der går igen, hver gang du laver noget til din praksis. Der er tre slags:"
  - **Ikoner** — "Små, enkle tegn, der viser noget hurtigt. Fx en telefon ved dit telefonnummer, en kalender ved 'Book tid' eller et lille blad ved en behandling."
  - **Fonte** — "Bogstavernes udseende, også kaldet skrifttyper. Den samme sætning kan føles rolig, legende eller professionel, alt efter hvilken skrifttype den står i."
  - **Små detaljer** — "Alt det andet, der går igen: en tynd streg, der deler teksten op, en bestemt form på dine knapper eller en ramme om dine billeder."
  - Afslutning: "Du behøver ikke have nogen af dem endnu. Vi kigger på dem én ad gangen."
- **Visuelt:** Ved hvert emne et lille, konkret eksempel, bygget i HTML/CSS (ingen billedfiler):
  - *Ikoner:* tre Material Symbols-ikoner (fx `call`, `calendar_month`, `spa`) med en kort tekst ved siden af hver.
  - *Fonte:* sætningen "Velkommen til min praksis" vist i to meget forskellige skrifttyper fra fontvælgerens liste (fx en blød serif og en ren sans-serif).
  - *Små detaljer:* en overskrift med en tynd streg under, og en knap med runde hjørner.
- **Hvad der leder videre:** Knappen "Lad os se, hvor du starter".

### Boble 1.3 — Hvor starter du? *(tidligere 1.2)*

- **Hvad brugeren møder på denne skærm:** Hvor føles det rigtigt at starte?
- **Eventuel interaktion:** Vælg ét: "Jeg har allerede et visuelt udtryk" / "Jeg har lidt hist og her" / "Jeg starter næsten fra bunden".
  - **✅ Nyt i runde 7 (godkendt af Heidi 2026-09-25):** Viser Overblik, at brugeren starter fra bunden (`hentUdgangspunkt().starterFraBunden`), er "Jeg starter næsten fra bunden" valgt på forhånd. Hun kan frit vælge noget andet.
- **Eventuel respons eller feedback:** *Allerede et udtryk:* Så tager vi udgangspunkt i det, du har. *Hist og her:* Så finder vi ud af, hvad der er værd at samle. *Fra bunden:* Så bygger vi et enkelt udgangspunkt, ét valg ad gangen. **✅ Tilføjet til "Fra bunden" (godkendt 2026-09-25):** "Du skal ikke lede efter noget, du ikke har. Vi går direkte til at vælge, hvad du vil starte med."
- **Hvad der leder videre (✅ ændret i runde 7, godkendt 2026-09-25):** *Allerede et udtryk* og *Hist og her* → 1.4. *Fra bunden* → direkte til Modul 2 (1.4 og 1.5 springes over).
- **Gemmes/får betydning senere:** Ja, `udgangspunkt`. Farver kun ordvalget i Modul 2 og styrer, om 1.4 og 1.5 vises.

### Boble 1.4 — Find tre steder, hvor dit udtryk allerede dukker op *(tidligere 1.3; vises ikke ved "Fra bunden")*

- **Hvad brugeren møder på denne skærm:** Åbn din hjemmeside, et opslag, eller et dokument, du sender til klienter. Kig ikke efter det perfekte — find bare tre steder, hvor du allerede bruger tekst, ikoner eller andre grafiske detaljer.
- **Eventuel interaktion:** Tre valgfrie felter (beskrivelse eller skærmbillede/upload). Har hun intet: "Helt fint — så starter vi fra et rent bord."
- **Gemmes/får betydning senere:** Ja, `eksempler[]` — vises igen i Modul 6 og 7.

### Boble 1.5 — Hvad lægger du mærke til? *(tidligere 1.4; vises ikke ved "Fra bunden")*

- **Hvad brugeren møder på denne skærm:** Kig på det, du lige har fundet. Hvad går igen, og hvad varierer?
- **Eventuel interaktion:** Multivalg: "Jeg bruger de samme skrifttyper" / "Jeg bruger forskellige skrifttyper" / "Jeg bruger de samme ikoner" / "Jeg bruger forskellige ikoner" / "Jeg har nogle grafiske detaljer, der går igen" / "Jeg har egentlig ikke tænkt over det før".
  - 💬 *Guide (avatar: Heidi):* Du opdager noget om din egen praksis her. Det er ikke en test, du kan bestå eller dumpe.
- **Gemmes/får betydning senere:** Ja, `iagttagelser[]` — bruges som støtte i Modul 6/7, ikke som krav.
- **Hvad der leder videre:** Knappen "Lad os se, hvad du vil have styr på".

## Modul 2 — Hvad vil du have styr på? *(skillepunktet — reel forgrening)*

### Boble 2.1 — Vælg dit fokus

- **Hvad brugeren møder på denne skærm:** Du behøver ikke gøre det hele på én gang. Hvad vil du gerne have styr på først?
- **Eventuel interaktion:** Multivalg (mindst ét): "Ikoner — jeg vil gerne have, at mine ikoner hænger sammen" / "Fonte — jeg vil gerne have styr på mine skrifttyper" / "De små detaljer — jeg har nogle grafiske elementer, men ved ikke, om de hænger sammen" / "Det hele — jeg vil gerne have et enkelt, samlet system" (markerer automatisk de tre andre).
  - **✅ Variant af valgmulighederne ved "Fra bunden" (runde 7, godkendt af Heidi 2026-09-25):** "Ikoner — jeg vil gerne finde nogle ikoner, der passer til mig" / "Fonte — jeg vil gerne finde mine skrifttyper" / "De små detaljer — jeg vil gerne have en lille detalje, der går igen" / "Det hele — jeg vil gerne have et enkelt, samlet system".
- **Gemmes/får betydning senere:** Ja, `fokusvalg[]`. Kun de valgte af Modul 3-5 vises. Rækkefølge ved flere valg: Ikoner → Fonte → Andre byggesten.
- **Note til design/udvikling:** Dette valg er ikke låst — brugeren kan altid komme tilbage til denne boble (via knappen "Gå til et andet emne" eller modul-linjen) og tilføje flere emner (jf. [[DUF Teknisk - Navigationslinjer (modul og boble)]]). **Eksplicit regel:** `fokusvalg[]` styrer kun, hvilke moduler der *vises* — ikke hvilke data der findes. Fjerner brugeren fx "Fonte" fra sit fokus, efter hun har svaret i Modul 4, slettes de svar ikke; de bliver liggende og vises igen, hvis hun senere tilføjer "Fonte" til sit fokus igen.

## Overgange mellem emnerne *(✅ nyt i runde 7, godkendt af Heidi 2026-09-25)*

*Runde 7: Testbrugeren oplevede skiftet fra ikoner til fonte som brat ("nu snakker vi om fonte"). Når brugeren går fra ét emne til det næste, afslutter det første emne med en kort bro, og knappen siger, hvor hun skal hen.*

- **Slutningen af 3.5 og 4.6** får en kort overgangslinje, afhængigt af hvad der kommer næst:
  - *Videre til Fonte:* "Dine ikoner er på plads. Nu går vi videre til dine fonte, altså bogstavernes udseende. Hvor ikonerne viser noget hurtigt, er det bogstaverne, der bærer alt det, du skriver." Knap: "Videre til fonte".
  - *Videre til Andre byggesten:* "Nu går vi videre til de små detaljer, der binder det hele sammen, fx en streg eller en bestemt form på dine knapper." Knap: "Videre til de små detaljer".
  - *Videre til Modul 6:* "Så har du taget stilling til det, du valgte. Nu ser vi, hvordan det ser ud i praksis." Knap: "Lad os se det samlet".
- Øverst i Modul 3, 4 og 5 står en lille linje, der viser, hvor brugeren er, fx "Emne 2 af 3: Fonte". Den vises kun, hvis brugeren har valgt mere end ét emne.

## Modul 3 — Ikoner *(kun hvis valgt i Modul 2)*

*Note til indhold: bobler 3.4-Fri og 3.4-Betal henviser begge til samme, endnu ikke skrevne Biblioteks-artikel ("Ikoner og rettigheder: det vigtigste, du skal vide") — det uddybende indhold findes allerede i [[DUF Ikonrettigheder - praktisk oversigt]] og skal blot omskrives til en kort, brugervendt artikel, inden rummet lanceres for rigtige brugere. Indtil da kan linket pege på en midlertidig placeholder-side. Formålet er at holde selve boblerne korte og handlingsorienterede, uden at Marcus' rettighedsarbejde går tabt — den uddybende viden er stadig ét klik væk for dem, der vil vide mere.*

### Boble 3.1 — Hvordan skal dine ikoner føles?

*Runde 7: I testen sagde brugeren "det ved jeg da ikke" til stilene, fordi hun kun kunne læse om dem. At læse, hvordan et ikon ser ud, er ikke det samme som at se det.*

- **Hvad brugeren møder på denne skærm:** Fire retninger, med et lille eksempel på hver: "Enkle streger" / "Fyldte ikoner" / "Runde og bløde" / "Skarpe og geometriske". Hvilken retning føles mest som dig?
- **Visuelt (✅ præciseret i runde 7, godkendt af Heidi 2026-09-25):** Hver retning vises med **de samme tre rigtige ikoner** (fx `call`, `calendar_month`, `spa`) fra Material Symbols, tegnet i netop den stil. Så kan brugeren se forskellen direkte. Stilene følger samme kortlægning som "Prøv dem sammen": *Enkle streger* = Outlined, fyld 0 · *Fyldte ikoner* = Outlined, fyld 1 · *Runde og bløde* = Rounded · *Skarpe og geometriske* = Sharp. Ikonerne skal være store nok til at se forskellen (mindst 32 px).
- **Eventuel interaktion:** Vælg ét.
- **Gemmes/får betydning senere:** Ja, `ikonFoelelse`.

### Boble 3.2 — Hvad skal ikonerne gøre?

- **Hvad brugeren møder på denne skærm:** Hvad er ikonernes vigtigste opgave hos dig?
- **Eventuel interaktion:** Vælg ét: "Hjælpe folk med at finde vej (navigation, funktioner)" / "Give mit materiale lidt mere personlighed (dekorative elementer)" / "Forklare noget, sammen med tekst".
- **Eventuel respons eller feedback:** Et ikon behøver ikke forklare det hele. Skal det hjælpe med at forstå noget, skal teksten stadig kunne gøre arbejdet. Ikonet er hjælpen på vejen, ikke hele forklaringen.
- **Gemmes/får betydning senere:** Ja, `ikonFunktion`.

### Boble 3.3 — Hvor kommer dine ikoner fra?

- **Hvad brugeren møder på denne skærm:** Nu ved vi, hvordan de skal se ud, og hvad de skal gøre. Så er der kun ét spørgsmål tilbage: hvor kommer de fra? Det afgør nemlig, hvad du faktisk må.
  - 💬 *Guide (avatar: Marcus):* Et ikon er et grafisk element ligesom et billede. At det er let at finde, er ikke det samme som at det er frit at bruge.
- **Eventuel interaktion:** Vælg ét: "Jeg bruger et gratis ikonbibliotek" (→ 3.4-Fri) / "Jeg tegner dem selv" (→ 3.4-Tegn) / "Jeg betaler mig til dem" (→ 3.4-Betal) / "Jeg tager dem nogle gange fra andre hjemmesider eller apps" (→ 3.3b) / **✅ Ny i runde 7 (godkendt 2026-09-25):** "Jeg har ingen ikoner endnu" (→ 3.4-Fri, med egen indledning).
- **Gemmes/får betydning senere:** Ja, `ikonKilde`.

### Boble 3.3b — Når du låner fra andre *(kun ved dette valg)*

- **Hvad brugeren møder på denne skærm:** Du ved det nok godt et sted i baghovedet: et ikon, du tager fra en anden hjemmeside eller en app, er ikke automatisk dit at bruge — heller ikke selvom det er let at kopiere, eller du ændrer farven bagefter. En kildeangivelse erstatter ikke en tilladelse. Det er ikke forbudt at være i tvivl om det, men vi vil gerne anbefale, at du i stedet vælger en af de tre veje herunder — de er markant mere sikre at bygge videre på.
- **Hvad der leder videre:** Tilbage til 3.3, uden dette valg.

### Boble 3.4 — Tre veje *(reel forgrening)*

**3.4-Fri, gratis ikonbibliotek**
- **✅ Indledning ved "Jeg har ingen ikoner endnu" (runde 7, godkendt 2026-09-25):** "Så har du et godt sted at starte. Et gratis ikonbibliotek giver dig mange ikoner i samme stil, så de passer sammen fra begyndelsen."
- **Hvad brugeren møder:** Det, vi selv anbefaler, er Material Symbols & Icons fra Google Fonts (fonts.google.com/icons). De er gratis, må bruges kommercielt, og du behøver ikke kreditere Google — men må gerne, hvis du har lyst. *(Kilde: Apache License 2.0, tjekket hos Google 2026-09-22 — tjek igen lige før bygning.)*

  Vælger du i stedet et andet gratis bibliotek, eller bruger du et ikon fra en virksomhed eller platform som Facebook eller MobilePay, gælder der andre regler, du bør kende. **Læs mere i Biblioteket:** *"Ikoner og rettigheder: det vigtigste, du skal vide"* (artikel endnu ikke skrevet).
- **Eventuel interaktion:** Knappen "Åbn Material Symbols" (nyt vindue).

**3.4-Tegn, tegner selv**
- **Hvad brugeren møder:** Vi skal ikke lære dig at tegne. Men uanset hvordan du gør det, er der fire ting, der gør et ikon, du selv tegner, til et godt ikon:
  - **Genkendelighed** — det skal kunne genkendes med et hurtigt blik, uden at nogen skal tænke sig om.
  - **Konsistens** — samme stregtykkelse, samme hjørner, samme størrelsesforhold, på tværs af hele dit sæt.
  - **Simplicitet** — fjern det, der ikke er nødvendigt for at forstå det. Færre streger er som regel bedre end flere.
  - **Kontekst** — det skal give mening dér, hvor det bruges, sammen med tekst, ikke stå alene og skulle gættes.

  Et ikon, du selv tegner, er som udgangspunkt dit eget. Men meget enkle, almindelige symboler (en pil, en lup) er sjældent originale nok til at være beskyttet i sig selv — det er ikke et problem for den daglige brug, men gem gerne dine skitser undervejs. De er god dokumentation, hvis ikonet senere skal blive en fast del af din identitet.

**3.4-Betal, betaler sig til dem**
- **Hvad brugeren møder:** Betaler du for dine ikoner — en pakke fra et betalt bibliotek, eller ved at få nogen til at lave dem til dig — er det stadig licensen eller aftalen, der afgør, hvad du må. Ikke prisen. Fire ting er værd at tjekke:
  - Får du ejerskab, eller kun en brugsret?
  - Må ikonerne bruges kommercielt, uden tidsbegrænsning?
  - Må du ændre dem, og få dem i de formater, du får brug for?
  - Har du gemt kvitteringen eller aftalen, så du kan finde den igen?

  Skal et ikon blive en fast del af din identitet, fx i dit logo, stiller det ofte skrappere krav end almindelig brug i opslag og dokumenter. Vil du have det hele uddybet, kan du læse mere i Biblioteket: *"Ikoner og rettigheder: det vigtigste, du skal vide"* (samme artikel som ovenfor).
  - **Se også:** Logo. *Skal ikonet indgå i dit logo, kigger vi nærmere på kravene der.*

- **Hvad der leder videre (alle veje):** Knappen "Videre" (→ 3.5).

### Boble 3.5 — Din ikonstil, samlet

- **Hvad brugeren møder på denne skærm:** En kort opsummering af det, hun har valgt: følelse, funktion og kilde. **✅ Nyt (godkendt 2026-09-25):** Den valgte stil vises med de tre eksempel-ikoner fra 3.1. Derefter overgangslinjen til næste emne (se "Overgange mellem emnerne").
- **Hvad der leder videre:** Er Fonte valgt i `fokusvalg` → Modul 4. Ellers, er Andre byggesten valgt → Modul 5. Ellers → Modul 6.

## Modul 4 — Fonte *(kun hvis valgt i Modul 2)*

*Fritekstfelterne er erstattet af en visuel skrifttype-vælger med en kurateret liste på otte Google Fonts-skrifttyper. Se [[DUF Teknisk - Skrifttype-vælger (fontvælger med Google Fonts)]] for spec og den fulde liste. **Runde 7 (afgjort af Heidi 2026-09-25, T11):** Testbrugeren spurgte "hvor skal jeg bruge det henne?", og fontene gav mindre mening for hende uden en hjemmeside. Modul 4 lægger derfor mere vægt på, hvordan skrifttyper påvirker udtryk og læsbarhed (4.1), mens 4.2 bliver og kobles til de kanaler, brugeren har fortalt om i Overblik.*

### Boble 4.1 — Din tekst har også en stemme

- **Hvad brugeren møder på denne skærm:** Du behøver ikke finde den perfekte skrifttype. Du skal finde en, der fungerer for dig — og som du kan bruge igen og igen.
  - **✅ Nyt i runde 7 (godkendt af Heidi 2026-09-25):** "En skrifttype gør to ting på én gang. Den giver din tekst en stemning: rolig, varm, klar eller legende. Og den afgør, hvor let din tekst er at læse, både på en skærm og på papir. Derfor bruger mange to skrifttyper: én til overskrifter, som gerne må have personlighed, og én til den almindelige tekst, som først og fremmest skal være let at læse."
- **Visuelt (✅ nyt i runde 7, godkendt af Heidi 2026-09-25):** Tre små eksempler på den samme overskrift, "Velkommen til min praksis", sat i tre forskellige typer skrifttyper fra fontvælgerens liste, med en kort etiket under hver:
  - *Med fødder (serif):* "Klassisk og rolig. Minder om bøger."
  - *Uden fødder (sans-serif):* "Ren og klar. Let at læse på skærmen."
  - *Håndskrevet eller legende:* "Personlig og varm. Bedst til korte overskrifter, ikke til lange tekster."
  - Under dem én linje almindelig brødtekst, sat i en let læselig skrifttype, så forskellen på overskrift og brødtekst kan ses.
- **Hvad der leder videre:** Knappen "Lad os finde den".

### Boble 4.2 — Hvor skal du bruge dine fonte?

- **Hvad brugeren møder på denne skærm:** Hvor bruger du dem oftest?
  - **✅ Variant ved "Fra bunden" (runde 7, godkendt 2026-09-25):** "Hvor forestiller du dig at bruge dem?"
- **Eventuel interaktion:** Vælg ét: "På min egen hjemmeside" (→ `googleFontsDirekte: true`) / "I Canva" (→ `googleFontsDirekte: false`) / "I Word eller Google Docs" (→ `googleFontsDirekte: false`) / **✅ Ny i runde 7:** "På sociale medier" (→ `googleFontsDirekte: false`) / "Et andet sted" (→ ét kort, uformelt opfølgende spørgsmål om, hvorvidt hun selv kan vælge skrifttyper der; svaret sætter `googleFontsDirekte`, uden at det bliver en synlig teknisk beslutning for hende) / **✅ Ny i runde 7 (kun ved "Fra bunden"):** "Det ved jeg ikke endnu" (→ `googleFontsDirekte: true`).
  - **✅ Kobling til Overblik (runde 7, godkendt 2026-09-25):** Har brugeren i Overblik fortalt, hvilke kanaler hun har, står de tilsvarende valgmuligheder øverst (hjemmeside → "På min egen hjemmeside"; Facebook, Instagram, LinkedIn eller andre sociale medier → "På sociale medier"), med en lille note: "Du nævnte tidligere, at du har …". Hun kan stadig vælge frit.
- **Eventuel respons eller feedback:**
  - *`googleFontsDirekte: true`:* Godt — så kan du sandsynligvis bruge den skrifttype, du vælger her, direkte.
  - *`googleFontsDirekte: false`:* I [Canva / Word / det værktøj, hun nævnte] vælger du blandt et fast sæt skrifttyper. Brug vælgeren her som inspiration — find noget, du kan lide, og kig derefter efter noget, der ligner, i dit eget værktøj.
  - **✅ Ny i runde 7 — "På sociale medier" (godkendt 2026-09-25):** "På Facebook, Instagram og LinkedIn bestemmer platformen selv skrifttypen i dine opslag. Dine egne skrifttyper kommer kun med, når du laver billeder med tekst på, fx i Canva. Brug vælgeren her til at finde en stil, du kan genbruge på dine billeder."
  - **✅ Ny i runde 7 — "Det ved jeg ikke endnu" (godkendt 2026-09-25):** "Det er helt fint. Så vælger du bare det, du kan lide. Når du ved, hvor du skal bruge dem, kan du altid se, om du kan bruge dem direkte, eller om du skal finde noget, der ligner."
- **Gemmes/får betydning senere:** Ja, `arbejdsVaerktoej`, `googleFontsDirekte`.
- **Note til design/udvikling:** Spørgsmålet er bevidst formuleret bruger-centreret ("hvor bruger du dem") frem for teknisk ("kan dit værktøj indsætte egne skrifttyper") — de færreste ud over multimediedesignere tænker i den sidste kategori. `googleFontsDirekte` er en afledt, intern værdi, brugeren ikke selv skal forholde sig til.

### Boble 4.3 — Vælg din overskriftsfont

- **Hvad brugeren møder på denne skærm:** Bladr blandt fire stemninger — Rolig og varm, Klar og professionel, Levende og personlig, eller Enkel og alsidig — og se skrifttyperne direkte i et eksempel. Vælg én, du vil bruge til overskrifter. *(Har hun en gemt palet fra Farver, vises eksemplet i hendes egne farver.)*
- **Eventuel interaktion:** Skrifttype-vælgeren (se teknisk spec). Kan hun ikke finde eller genkende sin font her, kan hun skrive navnet direkte i stedet. *(Siden fejlrettelserne i runde 7 kan de udvalgte skrifttyper vælges direkte med ét klik.)*
- **Gemmes/får betydning senere:** Ja, `fontOverskrift`.

### Boble 4.4 — Vælg din brødtekstfont

- **Hvad brugeren møder på denne skærm:** Nu til den tekst, folk faktisk skal læse. Her vejer læsbarhed tungere end at være flot. Vælg én, der er let at læse i almindelig størrelse — eksemplet viser den sammen med din overskriftsfont.
- **Eventuel interaktion:** Skrifttype-vælgeren igen, samme fallback til fritekst.
- **Gemmes/får betydning senere:** Ja, `fontBroedtekst`.

### Boble 4.5 — Læsbarhedstesten

*Runde 7: Testen bad brugeren læse på sin telefon, men hun sad ved computeren og kunne ikke komme videre ("jeg ved ikke, hvordan jeg skal gå videre"). Testen handler nu om læsbarhed og foregår på skærmen, hun sidder ved.*

- **Hvad brugeren møder på denne skærm (✅ ny tekst, godkendt af Heidi 2026-09-25):** "Nu tester vi, om din brødtekst er let at læse. Her står den samme lille tekst to gange: først i almindelig størrelse, derefter lidt mindre, sådan som tekst tit står på en telefon eller i en fodnote. Læs dem begge. Kan du læse dem uden at anstrenge dig?"
- **Visuelt (✅ nyt, godkendt 2026-09-25):** Et kort afsnit om en praksis, fx "Hos mig får du tid og ro. Jeg lytter til det, du kommer med, og vi finder sammen ud af, hvad der kan hjælpe dig.", vist i brugerens valgte brødtekstfont to gange: i almindelig størrelse (16 px) og i lille størrelse (13 px). Har hun en gemt palet, bruges hendes tekst- og baggrundsfarve.
- **Eventuel interaktion:** "Ja, begge er lette at læse" (→ 4.6) / "Den lille er svær at læse" (→ 4.6, med en note) / "Nej, begge er svære at læse" (→ tilbage til 4.4).
- **Eventuel respons eller feedback:**
  - *Kun den lille er svær (✅ godkendt 2026-09-25):* "Det er et godt fund. Så ved du, at du skal bruge den i almindelig størrelse eller større. Den kan godt blive."
  - *Begge er svære:* "Det er helt normalt, at noget først viser sig, når man ser det for alvor. Prøv en anden."
- **Gemmes/får betydning senere:** Ja, `laesbarhedOk` (ja / kunStor / nej).

### Boble 4.6 — Dine fonte, samlet

- **Hvad brugeren møder på denne skærm:** Kort opsummering: overskriftsfont og brødtekstfont. *(Var `googleFontsDirekte: false`, gentages kort: "Husk at kigge efter noget, der ligner, i [dit værktøj].")* **✅ (godkendt 2026-09-25):** Derefter overgangslinjen til næste emne (se "Overgange mellem emnerne").
- **Hvad der leder videre:** Er Andre byggesten valgt i `fokusvalg` → Modul 5. Ellers → Modul 6.

## Modul 5 — Andre byggesten *(kun hvis valgt i Modul 2)*

### Boble 5.1 — Har du en detalje, der går igen?

- **Hvad brugeren møder på denne skærm:** Ud over ikoner og fonte er der ofte andre små, tilbagevendende elementer — en streg, en ramme, en bestemt måde at lave knapper på. Det behøver ikke være en masse. Én lille detalje, der går igen, kan være nok.
- **Eventuel interaktion:** Vælg ét: "Jeg har allerede en detalje, der går igen" (→ 5.2a) / "Jeg har ikke én endnu" (→ 5.2b) / "Jeg ved ikke, om jeg har brug for én" (→ 5.2c).

### Boble 5.2 — *(tre varianter afhængigt af 5.1)*

**5.2a — Vis mig den**
- **Hvad brugeren møder:** Godt. Vis os den, eller beskriv den kort.
- **Eventuel interaktion:** Upload eller fritekstbeskrivelse.
- **Gemmes:** `andenDetalje`.

**5.2b — Vælg blandt nogle retninger**
- **Hvad brugeren møder:** Her er nogle steder at starte: "En tynd streg til at dele indhold op" / "En bestemt rammeform om billeder eller citater" / "En fast stil på knapper, fx runde hjørner eller en let skygge" / "Et gentaget mønster eller en tekstur" / "Ingen af dem — jeg finder selv på noget".
- **Visuelt (✅ nyt i runde 7, godkendt af Heidi 2026-09-25):** Hver retning vises med et lille eksempel i HTML/CSS (en streg under en overskrift, et citat i en ramme, en knap med runde hjørner, et lille mønster), af samme grund som ikon-stilene i 3.1.
- **Eventuel interaktion:** Vælg ét.
- **Gemmes:** `andenRetning`.

**5.2c — Det behøver du heller ikke beslutte nu**
- **Hvad brugeren møder:** Det er helt fint. Nogle af de små detaljer viser sig først, når du har brugt dit materiale et stykke tid. Du kan altid komme tilbage.
- **Gemmes:** `ikkeBesluttet: true`.

- **Hvad der leder videre (alle tre):** Knappen "Videre" (→ Modul 6). **✅ (godkendt 2026-09-25):** Med overgangslinjen "Så har du taget stilling til det, du valgte. Nu ser vi, hvordan det ser ud i praksis."

## Modul 6 — Prøv dem sammen *(alle)*

*Se [[DUF Teknisk - Byggesten-forhåndsvisning (Prøv dem sammen)]] for den tekniske spec. Ikonet i eksemplet er et konkret Material Symbols-ikon i den følelse, brugeren valgte i Modul 3 (ikke en generisk repræsentation) — besluttet 2026-09-23. Siden Billeder runde 7 kan komponenten også vise et billede, men det bruges ikke her.*

### Boble 6.1 — Lad os se, om de kan arbejde sammen *(flere emner valgt)* / Lad os se dit valg i praksis *(kun ét emne valgt)*

- **Hvad brugeren møder på denne skærm:** Overskriften afhænger af, hvor mange emner hun har valgt i `fokusvalg`: har hun valgt mere end ét, hedder boblen "Lad os se, om de kan arbejde sammen"; har hun kun valgt ét, hedder den "Lad os se dit valg i praksis", da der endnu ikke er noget at sammenholde det med. Selve indholdet er ens: et lille, samlet eksempel, bygget af det, hun rent faktisk har valgt — en overskrift i den valgte overskriftsfont, en kort brødtekst i den valgte brødtekstfont, og — hvis Ikoner blev valgt — et ikon i den valgte følelse ved siden af en kort linje tekst. Har hun valgt en detalje i Andre byggesten, indgår den også. Kun de elementer, hun faktisk har arbejdet med, vises.
  - *Har hun en gemt palet fra Farver og/eller et logo:* de vises ved siden af eksemplet, så hun kan se, om det hænger sammen med resten af hendes visuelle udtryk.
  - *Har hun hverken palet eller logo endnu:* Du har ikke en palet eller et logo endnu. Det er helt fint — brug dette som dit foreløbige udgangspunkt.
    - **Se også:** Farver. *Vil du lave en fast palet, kan du gøre det der, når du har lyst.*
  - 💬 *Guide (avatar: Heidi):* Det er her, det hele mødes. Du skal ikke gætte dig til, om det passer sammen. Du skal se det.

### Boble 6.2 — Hvordan føles det?

- **Hvad brugeren møder på denne skærm:** Hvordan føles det, når du ser det samlet?
- **Eventuel interaktion:** "Det føles som mig" (→ Modul 7) / "Det er tæt på" (→ 6.3) / "Nej, det fungerer ikke" (→ 6.3).
- **Gemmes/får betydning senere:** Ja, `provetSammenResultat`.
- **Note til design/udvikling:** **Afgjort efter brugertest 1 (2026-09-25):** Formuleringen "Hvordan føles det?" fungerede fint for testbrugeren og bliver. Alternativet ("Kan du genkende dig selv i det?") er droppet. Siden fejlrettelserne i runde 7 skifter boblen ikke længere videre af sig selv.

### Boble 6.3 — Hvad vil du justere? *(kun ved "tæt på" eller "fungerer ikke")*

- **Hvad brugeren møder på denne skærm:** Hvad skal vi kigge på igen? Kun de emner, hun faktisk arbejdede med, vises som muligheder: "Ikonerne" / "Fonten til overskrift" / "Fonten til brødtekst" / "Den anden detalje".
- **Eventuel interaktion:** Vælg ét eller flere.
- **Gemmes/får betydning senere:** Ja, `tilbageTil[]`.
- **Hvad der leder videre:** Sender brugeren tilbage til det/de relevante trin i Modul 3-5. Når hun er færdig dér, lander hun automatisk tilbage i 6.1 med det opdaterede eksempel.

## Modul 7 — Dit lille byggestens-sæt *(alle)*

### Boble 7.1 — Dit lille byggestens-sæt

*Runde 7: Testbrugeren var glad for opsamlingen ("ej, det ser da meget fint ud"), men foreslog at samle de tekniske oplysninger, man skal bruge, ét sted, og at man kan rette i dem.*

- **Hvad brugeren møder på denne skærm:** En samlet oversigt over det, hun har valgt — kun de emner, hun faktisk arbejdede med: fonte (overskrift/brødtekst), ikonstil og -kilde, og en eventuel anden detalje.
- **✅ Nyt i runde 7 — to dele (godkendt af Heidi 2026-09-25):**
  - **"Sådan ser det ud":** forhåndsvisningen fra 6.1 i lille størrelse.
  - **"Det skal du bruge":** en lille, overskuelig liste med de oplysninger, hun skal bruge, når hun selv laver noget: navnet på overskriftsfonten og brødtekstfonten (med link til dem på Google Fonts, hvis de kommer derfra), ikonstilen med navnet på stilen i Material Symbols (fx "Rounded"), og, hvis hun har en gemt palet fra Farver, farvekoderne (fx #0C3A2D). Hver linje har en lille "Kopiér"-knap.
- **✅ Nyt i runde 7 — ret (godkendt 2026-09-25):** Ved hvert emne er et lille link, "Ret", som sender hende til det relevante trin (samme mekanisme som 6.3). Når hun er færdig, lander hun tilbage i 7.1.
- **Hvad der leder videre:** Knappen "Skriv min tommelfingerregel".

### Boble 7.2 — Min tommelfingerregel

*Runde 7: Testbrugeren vidste ikke, hvad tommelfingerreglen skulle handle om ("øøøhhh, hvad?"), og havde glemt, hvad hun havde valgt.*

- **Hvad brugeren møder på denne skærm (✅ ny tekst, godkendt af Heidi 2026-09-25):** "En tommelfingerregel er en lille huskeregel for, hvordan og hvornår du bruger dine byggesten. Den hjælper dig, næste gang du skal lave et opslag eller en side, så du ikke skal tænke over det fra bunden hver gang. Skriv én sætning, du kan huske det på: 'Jeg bruger ______, fordi ______.'"
  - **Påmindelse:** Over feltet står brugerens egne valg i én kort linje, fx "Du har valgt: runde og bløde ikoner · Lora til overskrifter · en tynd streg til at dele teksten op".
  - **Eksempler:** Under feltet står to-tre eksempler, bygget ud fra det, hun har valgt, som hun kan trykke på for at få dem ind i feltet og rette i. Fx: "Jeg bruger en tynd streg under mine overskrifter, fordi den giver ro og gør det let at se, hvor et nyt afsnit starter." / "Jeg bruger kun ikoner sammen med tekst, fordi de skal hjælpe og ikke stå alene." / "Jeg bruger Lora til overskrifter og en enkel skrift til teksten, fordi det føles varmt og er let at læse."
- **Eventuel interaktion:** Fritekstfelt, med eksempler, der kan trykkes ind.
- **Gemmes/får betydning senere:** Ja, `tommelfingerregel`.

### Boble 7.3 — Gem det, du lige har fundet

- **Hvad brugeren møder på denne skærm:** Du har nu et lille sæt byggesten, du kan tage med dig videre. Gem dem i din visuelle guide, så du ikke skal starte forfra næste gang. Dette er en prototype, ligesom resten af dit visuelle udtryk. Det må gerne udvikle sig, i takt med at din praksis gør det.
  - 💬 *Guide (avatar: Heidi):* Det vigtigste er ikke, at det er færdigt. Det er, at du ved, hvor du skal kigge, næste gang.
- **Eventuel interaktion:** Knappen "Tilføj til min visuelle guide".
- **Gemmes/får betydning senere:** Ja, `begrundelse` (opsummering + tommelfingerregel **+ listen "Det skal du bruge"**, runde 7), til Fælles samling.
- **Hvad der leder videre:** Ud af rummet, tilbage til rum-vælgeren.

## Ændringer efter gennemgang (2026-09-24)

Efter en første gennemgang af manuskriptet — og en fornyet kommentering fra ChatGPT af det faktiske flow — er fire punkter rettet ind samme dag:

1. **Fokusvalg er nu en eksplicit regel, ikke kun en hensigt:** `fokusvalg[]` styrer udelukkende, hvad der *vises*. Data fra et fravalgt emne slettes ikke og dukker op igen, hvis emnet vælges til på ny (se Modul 2 og "Det, rummet husker").
2. **Rettighedsstoffet i Modul 3 er gjort visuelt sekundært:** de uddybende afsnit om andre ikonbiblioteker og virksomheds-/platformsikoner (3.4-Fri) samt den uddybende del af betalings-checklisten (3.4-Betal) er erstattet af en henvisning til én kommende Biblioteks-artikel ("Ikoner og rettigheder: det vigtigste, du skal vide") — indholdet mistes ikke, det flyttes blot ud af selve boblen. Artiklen skal skrives, før rummet lanceres for rigtige brugere.
3. **"Kopieret"-valget (nu 3.3b) har fået et blødere sprog:** fra et hårdt "lad os stoppe her" til en anerkendende "du ved det nok godt" — med en klar anbefaling om at vælge en af de tre andre veje, uden at det føles som en fælde.
4. **Boble 4.2 er gjort bruger-centreret:** fra et teknisk spørgsmål om værktøjets fontunderstøttelse til et enkelt "hvor bruger du dine fonte?" — `googleFontsDirekte` regnes stadig ud bagved, men er ikke længere noget, brugeren selv skal forholde sig til.

Derudover er Modul 6's overskrift (Boble 6.1) gjort dynamisk, så den også giver mening, når brugeren kun har valgt ét fokusområde i Modul 2.

*Punktet om Boble 6.2's formulering, som var parkeret til efter brugertesten, er afgjort 2026-09-25: formuleringen bliver.*

## Spørgsmål til jer, inden I bygger videre

- **Motoren (byggestenEngine.js):** rummet bruger den lette forgreningsform — `fokusvalg[]` styrer, hvilke af Modul 3-5 der overhovedet vises, og valget er ikke låst (brugeren kan gå tilbage til Modul 2 via modul-navigationslinjen og tilføje flere emner senere, med automatisk genberegning af resten af ruten, uden at slette allerede gemte svar for emner, der midlertidigt er fravalgt). [[DUF Teknisk - Navigationslinjer (modul og boble)]] beskriver denne mekanik, men angiver selv, at den **endnu ikke er bygget i kode** (status 2026-09-08). Beskriv, hvordan `byggestenEngine.js` navigerer i dag, og bekræft, hvordan (eller om) fokusvalg-styret visning og senere redigerbarhed skal løses nu, versus når den fælles navigationslinje bygges.
- **To nye, selvstændige komponenter:** `js/components/fontvaelger.js` og `js/components/provSammen.js` (se de to tekniske specs). `provSammen.js` er siden 2026-09-25 også brugt i Billeder 8.1.
- **Gemt palet fra Farver og gemt logo fra Logo:** Modul 4's og 6's forhåndsvisninger læser begge disse, hvis de findes (samme `saveVaekstrumOutput`-mønster som andre rum). Bekræft datastrukturen, så læsningen matcher det, Farver og Logo faktisk gemmer.
- **Konkret Material Symbols-ikon i "Prøv dem sammen":** de fire følelser fra Boble 3.1 er kortlagt til Material Symbols' stil-akser (Outlined/Rounded/Sharp × fyld 0/1), men selve ikonmotivet (hvilket konkret symbol, der vises) er ikke besluttet endnu — vælg en fornuftig standard nu (fx et neutralt, genkendeligt symbol som en stjerne eller et hjerte), og bekræft med Marcus, når Byggestens visuelle stil er på plads. **Runde 7:** brug gerne de samme tre ikoner (`call`, `calendar_month`, `spa`) i 1.2, 3.1 og 3.5, så brugeren genkender dem.
- **Danske bogstaver:** bekræft, at alle otte kuraterede skrifttyper i fontvælgeren understøtter æ/ø/å fuldt ud, jf. påmindelsen i [[DUF Teknisk - Skrifttype-vælger (fontvælger med Google Fonts)]] — tjek på fonts.google.com, ikke kun antag det.
- **Internetafhængighed:** fontvælgeren (Google Fonts CSS API) og "Prøv dem sammen" (Material Symbols) afhænger begge af internetadgang, i modsætning til Farvers helt selvstændige palet-bygger. Bekræft at fallback til fritekst/en simpel standardvisning er tilstrækkelig for version 1.
- **Biblioteks-artiklen "Ikoner og rettigheder: det vigtigste, du skal vide" (3.4-Fri og 3.4-Betal):** findes endnu ikke. Byg linket til at pege på en midlertidig placeholder-URL, og skift den ud, når artiklen er skrevet — det blokerer ikke selve kodningen af rummet.
- **Mobil:** rummet skal gennemgås på mobil, desktop og evt. tablet, som del af den samlede mobilgennemgang, der skal ske, før DUF går videre med de andre vækstområder (se opgaveoversigten).
