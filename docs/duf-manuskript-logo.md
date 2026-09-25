# MANUSKRIPT — Logo

*Status: Genskrevet i sin helhed 2026-09-21, som nyt udkast skrevet fra bunden (intet ChatGPT-udkast) ud fra [[DUF Vækstrum Context - Logo]], i tonen fra [[DUF Proces - Manuskript-revision og tone]], og godkendt af Heidi efter gennemgang i chat. Erstatter den tidligere version af dette dokument (2026-09-06). Rettighedsindholdet (spor D, 6.3, 6.4) holder sig tæt på "Ikonrettigheder — praktisk oversigt" (§1, §2, §4, §8, §9, §10). Forgrening er designet ind fra start: fire spor gennem rummet, valgt i Modul 2. Struktur: Vækstrum → Modul → Boble, se [[DUF Teknisk - Navigationslinjer (modul og boble)]]. Klar til implementering — se "DUF Prompt - Logo (manuskript-opdatering).md". Lille rettelse 2026-09-21: dobbelt henvisning i 2C.2 fjernet.*

*⚠️ **Runde 7 (2026-09-25, efter brugertest 1):** se [[DUF Brugertest 1 - Visuelt vækstområde (sortering)]]. Fejlene i 5.1 (paletten blev ikke vist) og 8.1/6.1N (noter sat sammen) er allerede rettet i koden, og tjeklisterne har fået overskrift og mail-knap. Testbrugeren var glad for rummet ("ej, det er sjovt det her"), men: hun forstod ikke, hvem "en anden" var i 6.2 (T4), og valgmulighederne trænger til en kort forklaring (U2); logoet virkede ikke i lille størrelse, og hun vidste ikke, at man kan have en udgave med kun symbolet (T6); og vi mistede lidt rollen som guide, da hun gik over i Looka (P1, stadig parkeret som Biblioteks-artikel, men 3.1 får en lille bro). Ændringer: 1.4, 2C.2, 3.1, 6.2, 6.4 og 7.2. Alle nye tekster er godkendt af Heidi 2026-09-25. Klar til implementering, se [[DUF Prompt - Logo (runde 7)]].*

**Sådan læses dette dokument:** hvert modul er delt i bobler, den mindste byggeklods, svarende til én skærm. Hver boble har feltet "Hvad brugeren møder på denne skærm" og udfylder kun de øvrige felter, når det er relevant. Et nyt, valgfrit felt er **Se også**: et lille skilt, der viser, at emnet behandles i et andet vækstrum (se [[DUF Teknisk - Se også-skilt (henvisning til andet vækstrum)]]). En 💬-linje er en Guide-bemærkning med avatar (Marcus/Heidi/Sophia), hvor den er tildelt. **Tekster, brugeren ser, henviser aldrig til modul- eller boblenumre** — numrene står kun i felterne "Hvad der leder videre" og i noter til design/udvikling.

## Fire spor gennem rummet

Modul 2 sender brugeren ad ét af fire spor. Sporene er reelle forgreninger: brugeren ser forskelligt indhold bagefter, ikke kun en tilpasset sætning.

| Spor | Hvem | Ser | Springer over |
|---|---|---|---|
| **A. Validér** | Har logo, tilfreds og professionelt lavet | Test i praksis (Modul 7), dokumentation (Modul 8) | Modul 3-6 |
| **B. Kig på det** | Har logo, men er usikker (eller laver udkast selv) | Kortlægning, sammenligning, retning (Behold / Justér / Nyt), palet, evt. justering eller nyt logo, test, dokumentation | Intet, men får sin egen liste med |
| **C. Fra bunden** | Har intet logo | Valg af logotype, inspiration efter type, palet, at bygge, test, dokumentation | Kortlægning af eksisterende, Modul 4 |
| **D. Bestil hos en anden** | Logo er under udvikling hos grafiker, bekendt eller generator | Tjekliste til aftalen, test når logoet er klar, dokumentation | Modul 3-6 |

En bruger i spor A møder ca. 15 bobler, en bruger i spor C ca. 26.

## Det, rummet husker (til udvikling)

Alt gemmes lokalt på brugerens enhed (samme princip som resten af DUF).

- `logoStatus` (tilfreds / usikker / ingen / underUdvikling) og `spor` (A–D)
- `logoUpload` (billede af logoet; valgfrit, kan opdateres senere i rummet)
- `logoUploadLille` (runde 7: den ekstra, lille udgave fra 7.2, fx kun symbolet; valgfri. Gemmes i billed-bucket `logo-lille` og vises på logo-siden i 8.2 og i Fælles samling)
- Fra Modul 2B: `listeFungerer[]`, `listeSkurrer[]` (gruppe: form / identitet / oprindelse / ved-ikke), noter, `retningForslag` (behold / justér / nyt / ingen)
- `logoType` (navn / symbol / begge / ingen)
- "Min logo-inspiration" (billeder/screenshots) + noter (`hvadFungerer`, `hvadInspirerer`) + `sammenligning` (Modul 3)
- `retning` (behold / justér / nyt)
- `logoFarver` (fra palet: valgte farver / egen variant, eller foreløbig farveretning + note) og, for Behold, `paletSamspil` (ja / usikker / hverSinRetning)
- `vaerktoej` (canva / looka / illustrator / anden)
- Tjeklister, hver med sin `gemNoegle`: `logo-sporD-aftaler`, `logo-modul6-arbejdsliste`, `logo-modul6-symbol`, `logo-modul6-looka`
- `testResultater` ({ smaat, udenFarve, baggrund }) og `aabnePunkter[]`
- `begrundelse` (fri tekst fra Modul 8)
- `venter` (spor D: rummet genoptages ved Modul 7)

## Modul 1 — Hvad et logo faktisk skal *(alle spor)*

### Boble 1.1 — Velkommen til Logo

- **Hvad brugeren møder på denne skærm:**
  - *Kommer fra Overblik med et logo-relateret svar:* Du nævnte tidligere, at dit logo mangler, er på vej eller er noget, du gerne vil have på plads. Så lad os kigge på det her. Sammen.
  - *Kommer direkte til rummet:* Velkommen til Logo. Her får du hjælp til enten at lave et logo, du er tryg ved, eller til at finde ud af, om det, du allerede har, faktisk fungerer. Der er ingen rigtige eller forkerte svar. Vi tager det ét skridt ad gangen.
- **Hvad der leder videre:** Knappen "Lad os begynde".

### Boble 1.2 — Hvad har du hørt om logoer?

- **Hvad brugeren møder på denne skærm:** Om logoer findes der mange historier. Nogle er sande. Andre fylder mere, end de fortjener. Hvilke af dem kender du? Vælg dem, der ringer en klokke.
- **Eventuel interaktion:** Brugeren vælger ingen, én eller flere: "Et logo er min identitet" / "Et flot logo giver troværdighed" / "Det skal være helt unikt" / "Det skal være perfekt, før det tæller" / "Ingen af dem, jeg vil bare høre, hvad et logo skal".
- **Hvad der leder videre:** Knappen "Vis mig". Brugeren ser kun de myte-bobler (1.3a-d), hun har valgt, og går derefter videre til 1.4. Ingen valgt betyder direkte til 1.4.

### Boble 1.3a-d — Myte-bobler *(vises kun for valgte myter)*

- **1.3a, identitet:** Et logo er ikke din identitet. Din identitet er dig, dine ord, dit rum og måden, du møder mennesker på. Logoet er ét af de steder, den viser sig. Et genkendelsespunkt, ikke hele kortet. Det tager presset af.
  - **Se også:** Din identitet (Branding). *Hvem du er, hvad du står for, og hvordan du viser det frem.*
- **1.3b, troværdighed:** Et flot logo giver ikke automatisk tillid. Et dyrt logo heller ikke. Tillid vokser, når tingene hænger sammen og bliver brugt på samme måde, hver gang. Et enkelt logo, du bruger konsekvent, slår et avanceret logo i tre forskellige udgaver.
- **1.3c, unikt:** Det behøver ikke være set før. Ofte er det det enkle, der bliver husket. Kreativitet for kreativitetens skyld gør sjældent et logo lettere at genkende.
- **1.3d, perfekt:** Nej. Et logo behøver ikke være færdigt for at tælle. Ligesom resten af dit visuelle udtryk er det en prototype. Du bruger det, lærer af det og justerer det, når din praksis ændrer sig.
- **Hvad der leder videre:** "Videre" til næste valgte myte eller 1.4.

### Boble 1.4 — Hvad et logo faktisk skal

- **Hvad brugeren møder på denne skærm:** Så hvad skal et logo? Tre ting. Være til at genkende. Fungere mange steder, stort og småt, i farve og i sort/hvid, på lyse og mørke baggrunde. Og spille sammen med resten af dit visuelle udtryk. Det er det hele. Vi begynder ikke med at gøre det smukt. Vi begynder med at gøre det brugbart.
  - **✅ Ny linje til sidst i boblen, lige før guide-citatet (runde 7, godkendt af Heidi 2026-09-25; placeringen afgjort af Heidi samme dag, før: "efter 'på lyse og mørke baggrunde'"):** "Derfor har mange flere udgaver af det samme logo: fx en med navn og symbol til hjemmesiden og en med kun symbolet til de små steder. Det kan være dit profilbillede eller det lille ikon, der står i fanen øverst i browseren, når nogen besøger din hjemmeside. Det lille ikon kaldes et favicon, og der er kun plads til et symbol." *(favicon tilføjet efter Heidis kommentar 2026-09-25)*
  - 💬 *Guide (avatar: Marcus):* Et logo skal ikke fortælle hele din historie. Det skal hjælpe folk med at kende dig igen.
- **Hvad der leder videre:** Knappen "Lad os se, hvor du står".

## Modul 2 — Hvor står du? *(skillepunktet)*

### Boble 2.1 — Hvor står du i dag?

- **Hvad brugeren møder på denne skærm:** Vi begynder med at se, hvor du står. Der er ingen rigtige svar, kun et udgangspunkt.
- **Eventuel interaktion:** Brugeren vælger ét: "Jeg har et logo, og jeg er glad for det" → 2A.1 / "Jeg har et logo, men jeg er usikker på det" → 2B.1 / "Jeg har ikke et logo" → 2C.1 / "Det er under udvikling" → 2D.1.
- **Gemmes/får betydning senere:** Ja, `logoStatus` og `spor` styrer, hvad resten af rummet viser.

### Spor A — Validér

**Boble 2A.1 — Skal det bare tjekkes?**
- **Hvad brugeren møder:** Dejligt, at du er glad for det. Så skal vi ikke bygge noget nyt. Kun ét spørgsmål: Er logoet lavet af en professionel, og har du ikke lyst til at ændre på det? Du vil bare gerne vide, om det fungerer.
- **Interaktion:** "Ja, det lyder rigtigt" → 2A.2. "Nej, jeg vil gerne se nærmere på det alligevel" → 2B.1.

**Boble 2A.2 — Så tester vi det bare**
- **Hvad brugeren møder:** Så behøver du ikke bygge noget nyt. Vi går direkte til at teste, om dit logo fungerer i praksis, og bagefter tilføjer vi det til din visuelle guide. Har du en fil af logoet, kan du lægge den her, så har du den ved hånden under testen. Den bliver på din enhed.
- **Interaktion:** Valgfri upload af logoet. Knapper: "Test mit logo i praksis" (→ Modul 7) og "Nej, jeg vil hellere gennem det hele" (→ 2B.1).
- **Gemmes:** Ja, uploaden gemmes lokalt. Modul 8 kræver stadig en begrundelse, ikke kun et "godkendt".

### Spor B — Kig på det, du har

**Boble 2B.1 — Lad os kigge på dit logo sammen**
- **Hvad brugeren møder:** Vi skal ikke bedømme det. Vi skal bare se det med friske øjne. Har du en fil eller et billede af det, kan du lægge det her, så har du det foran dig, mens vi kigger. Har du ikke, går det også fint. *(For "under udvikling, laver det selv" står "udkastet" i stedet for "logoet".)*
- **Interaktion:** Valgfri upload.

**Boble 2B.2 — Hvad fungerer?**
- **Hvad brugeren møder:** Vi begynder med det gode. Hvad synes du bedst om ved dit valgte logo, selvom du kan være i tvivl om resten? Vælg gerne flere. Er der ikke meget at vælge imellem, er det helt okay. *(For udkast-varianten: "dit udkast".)*
- **Interaktion:** Multivalg + valgfri note: "Jeg kan godt lide, hvordan det ser ud" / "Det føles som mig og min praksis" / "Det er let at læse" / "Det er let at kende igen" / "Farverne føles rigtige" / "Ikke noget lige nu".

**Boble 2B.3 — Hvad føles ikke helt rigtigt?**
- **Hvad brugeren møder:** Nu den anden side. Hvad skurrer? Ingen ting er for småt at nævne. Og "jeg ved det ikke" er også et svar.
- **Interaktion:** Multivalg + valgfri note, i grupper. *Form:* "Det er for detaljeret eller rodet" / "Det er svært at læse, især når det er småt" / "Farverne passer ikke til mig". *Identitet:* "Det føles ikke som mig og min praksis". *Oprindelse:* "Det ligner en masse andre logoer" / "Det blev lavet hurtigt, uden at jeg rigtig tænkte over det". Samt: "Jeg ved ikke, hvad det er. Det føles bare ikke rigtigt."

**Boble 2B.4 — Det, du lægger mærke til** *(kun de valgte gruppers bobler vises)*
- **Form:** Det her er ofte de ting, man kan justere uden at starte forfra. Skrifttype, størrelse, farve, mængden af detaljer. Det er gode nyheder.
- **Identitet:** Skurrer det, fordi logoet ikke føles som dig, handler det ofte om noget større end selve logoet: hvem du er, og hvem du vil møde. Du kan sagtens fortsætte her. Det er bare værd at vide, at logoet kommer bagefter identiteten.
  - **Se også:** Din identitet (Branding). *Her arbejder du med, hvem du er, og hvordan du viser det. Du behøver ikke gøre det først.*
- **Oprindelse:** Et logo, der blev lavet i en fart eller ligner alle andre, er ikke et dårligt logo. Det er et logo, der ikke er blevet valgt endnu. Det kan vi ændre.
- **"Ved ikke":** Så er det svært at bedømme det alene. Vi kigger derfor på, hvad andre gør, og hvad der fanger dig, før du beslutter noget.
- **Ingen negative valg:** Så har du et godt udgangspunkt. Vi tester det, og så tager du stilling til det.

**Boble 2B.5 — Det tager vi med**
- **Hvad brugeren møder:** En samlet oversigt over "Det fungerer" og "Det skurrer", og et *forslag* til retning: kun form → Justér / identitet eller oprindelse → Byg nyt / ingen negative valg → Behold / "ved ikke" → intet forslag.
- **Gemmes:** Ja. Listerne og forslaget bruges i Modul 4 (forslaget markeres, ikke forvalgt) og i Modul 6 (Justér viser "din liste" som arbejdsliste).
- **Hvad der leder videre:** Knappen "Lad os se, hvad andre gør" (→ Modul 3).

### Spor C — Fra bunden

**Boble 2C.1 — Fra bunden er et fint sted at starte**
- **Hvad brugeren møder:** Du starter ikke bagud. Du starter frit. Ingen tidligere valg, der skal forsvares. Det første skridt er ikke at tegne noget. Det er at finde ud af, hvilken slags logo der trækker i dig.

**Boble 2C.2 — Hvilken slags logo trækker i dig?**
- **Hvad brugeren møder:** Et logo kan se ud på flere måder. Nogle består kun af navnet, sat med omhu. Andre af et symbol. Mange af begge dele. Det ligger ikke fast for evigt, det er bare en retning at starte i, så vi kan vise dig det rigtige at lede efter.
- **Interaktion:** Brugeren vælger ét: "Kun mit navn, i en skrifttype jeg kan lide" / "Et lille symbol eller tegn" / "Navn og symbol sammen" / "Det ved jeg ikke endnu".
- **Respons:** *Navn:* Enkelt og roligt. Her gør skrifttypen næsten hele arbejdet. *Symbol:* Symbolet skal kunne stå alene og genkendes, også når det er småt. Det kræver lidt ekstra omtanke om rettigheder, og den tager vi, før du bygger. *Begge:* Du får det bedste fra begge. Vi kigger på, hvordan de to kan hjælpe hinanden. **✅ Tilføjet til "Begge" (runde 7, godkendt af Heidi 2026-09-25):** "Og du får en ekstra fordel: Symbolet kan stå alene på de små steder, fx som profilbillede, mens navn og symbol sammen bruges, hvor der er plads." *Ved ikke:* Så lader vi eksemplerne vise dig vejen.
- **Se også:** *(kun ved "Navn")* Byggesten. *Ikoner, skrifttyper og andre grafiske byggesten.*
- **Gemmes:** Ja, `logoType` styrer Modul 3 (søgetips), Modul 6 (vejledning) og hvilke rettighedsbobler brugeren ser.

### Spor D — Bestil hos en anden

**Boble 2D.1 — Hvem laver det?**
- **Interaktion:** "Jeg laver det selv" → 2B.1 (udkast-version). "En anden laver det for mig (en grafiker, en bekendt eller en generator)" → 2D.2.

**Boble 2D.2 — Sådan får du mest ud af at bestille**
- **Hvad brugeren møder:** Når en anden laver dit logo, er det jeres aftaler, der afgør, hvad du ender med at kunne bruge. Ikke kun, hvordan det ser ud. Her er en tjekliste til samtalen, så du ikke opdager det bagefter. Har du arbejdet med Farver, kan du give din palet med. Bruger du en generator, så læs vilkårene med de samme spørgsmål i baghovedet.
- **Interaktion:** Afkrydsning via Tjekliste-komponenten (`gemNoegle: "logo-sporD-aftaler"`). Punkter, tæt på Ikonrettigheder §4: 1. Får jeg ejerskab eller kun en brugsret? 2. Hvilke medier og formål må logoet bruges til, og er det tidsbegrænset? 3. Må jeg ændre eller videreudvikle det? 4. Må andre bruge det samme eller et lignende logo? 5. Må det registreres som varemærke? 6. Får jeg de originale arbejds- og vektorfiler? 7. Har designeren bekræftet, at alle elementer er originale eller lovligt licenserede? 8. Får jeg logoet i flere udgaver: småt, i sort/hvid og til både lys og mørk baggrund?
- **Afsluttende linje:** Skal logoet være en central del af din identitet, eller er du i tvivl om en aftale, så søg rådgivning, før du skriver under.
- **Gemmes:** Ja, lokalt.

**Boble 2D.3 — Er logoet klar nu?**
- **Interaktion:** "Ja, jeg har det" → Modul 7. "Ikke endnu" → 2D.4.

**Boble 2D.4 — Så venter vi**
- **Hvad brugeren møder:** Det er helt fint. Din tjekliste ligger klar. Kom tilbage, når logoet er færdigt, så tester vi det sammen, og du får det med i din guide.
- **Hvad der leder videre:** Tilbage til rum-vælgeren. Ved næste besøg genoptages rummet ved Modul 7 (`venter: true`).

## Modul 3 — Inspiration og sammenligning *(spor B og C)*

Spor A og D springer modulet over.

### Boble 3.1 — Se, hvad andre gør

- **Hvad brugeren møder på denne skærm:** Nu kigger vi ud over dit eget logo. Åbn Looka (looka.com/logo-maker), og leg med, hvordan forskellige stilarter kan se ud for en praksis som din. Her kan du hente inspiration. Det er gratis at prøve. Du betaler først, hvis du beslutter dig for at hente et logo. Og finder du et logo, du kan lide, kan du også vælge at bruge det, så behøver du ikke bygge det fra bunden senere. Vi kommer tilbage til, hvad du skal være opmærksom på, hvis du gør det.
  - **✅ Ny afsluttende linje (runde 7, godkendt af Heidi 2026-09-25):** "Looka åbner i et nyt vindue. Lad denne side være åben, og kom tilbage hertil, når du har leget lidt. På næste skærm viser vi dig, hvordan du gemmer de logoer, du kan lide, så du har dem med."
  - *Spor C, tip efter logotype:*
    - *Navn:* Kig efter eksempler, hvor navnet står alene. Læg mærke til skrifttypens karakter: rolig, legende, elegant, rå. Hvad passer til dig?
    - *Symbol:* Læg mærke til, hvor enkelt symbolet er, og om du stadig kan kende det, når det er småt.
    - *Begge:* Læg mærke til, hvordan navn og symbol står sammen, og om hver af delene også kunne stå alene.
    - *Ved ikke:* Vælg ikke noget endnu. Kig bare rundt, og se, hvad der får dig til at stoppe op.
  - 💬 *Guide (avatar: Heidi):* Du skal ikke lede efter det perfekte logo. Du skal lægge mærke til, hvad du bliver draget af.
- **Eventuel interaktion:** Knappen "Åbn Looka". Det fremgår tydeligt, at den åbner i et nyt vindue.
- **Hvad der leder videre:** Knappen "Jeg har kigget mig omkring".
- *Parkeret fra brugertest 1 (P1): en fuld vejledning i, hvordan man finder rundt i Looka, gemmer billeder, finder dem igen og lægger dem op på DUF. Skrives som artikel i Biblioteket.*

### Boble 3.2 — Find 2-3 logoer, der fungerer

- **Hvad brugeren møder på denne skærm:** Find 2-3 logoer, som du synes fungerer godt. Tag et screenshot af dem, så du har dem foran dig. *Windows:* Tryk Windows-tasten + Shift + S, og træk et felt rundt om logoet. Tryk derefter Ctrl + V her. *Mac:* Tryk Cmd + Shift + 4, og vælg filen her. *Telefon eller tablet:* Brug enhedens egen screenshot-funktion. Hvad gør, at de virker? Og hvad kan du lade dig inspirere af, uden at kopiere det direkte?
- **Eventuel interaktion:** Upload eller indsæt (Ctrl + V) screenshots i samlingen "Min logo-inspiration" + to korte, valgfrie noter: "Hvad gør, at de fungerer?" og "Hvad kan jeg lade mig inspirere af?".
- **Gemmes:** Ja, lokalt på enheden (samme mekanik som "Min inspiration" i Billeder). Vises igen i Modul 6 og 8. *(Siden fejlrettelserne i runde 7 vises de to noter hver for sig under deres eget spørgsmål.)*

### Boble 3.3 — *Kun én af to, afhængigt af spor*

**3.3B — Sæt dem op mod dit eget** *(kun spor B)*
- **Hvad brugeren møder:** Kig på dem, du fandt, og på dit eget logo. Hvad ser du, når de står side om side? *(Brugerens uploadede logo vises ved siden af screenshotsene.)*
- **Interaktion:** Multivalg + valgfri note: "Mit står godt ved siden af" / "Jeg savner noget i mit" / "Jeg kan se, hvad jeg vil væk fra".
- **Gemmes:** Ja, og vises i Modul 4 sammen med de to lister fra Modul 2.

**3.3C — Hvilken type fangede dig?** *(kun spor C, og kun hvis "ved ikke" blev valgt i 2C.2)*
- **Hvad brugeren møder:** Nu har du set eksempler på både navn, symbol og begge dele. Hvilken slags trækker mest i dig? Du kan skifte mening senere.
- **Interaktion:** Samme svar som i 2C.2 (uden "ved ikke"), inkl. deres respons. *(Runde 7: "Begge" har også fået den nye sætning om, at symbolet kan stå alene. Afgjort af Heidi 2026-09-25.)*
- **Gemmes:** Ja, `logoType` opdateres.

### Boble 3.4 — Inspiration er ikke det samme som at tage

- **Hvad brugeren møder på denne skærm:** Lad dig inspirere, men kopiér ikke. Et logo, der ligner et andet for meget, kan forveksles med det, og det kan give dig problemer, du ikke har brug for. Målet er ikke at ligne nogen. Det er at finde noget, der er dit.
- **Hvad der leder videre:** Spor B: "Lad os vælge en retning" (→ Modul 4). Spor C: "Lad os tage din palet med" (→ Modul 5, uden om Modul 4).

## Modul 4 — Vælg retning *(kun spor B)*

Spor C har ikke noget at beholde eller justere og springer modulet over. Spor A og D har allerede fundet deres vej.

### Boble 4.1 — Det har du med dig

- **Hvad brugeren møder på denne skærm:** Du har kigget på dit eget logo og på, hvad andre gør. Her er det, du har med dig: det, der fungerer, det, der skurrer, og det, du så, da du sammenlignede. *(Brugerens egne svar fra 2B.2, 2B.3 og 3.3B vises samlet.)*
- **Hvad der leder videre:** Knappen "Lad os vælge".

### Boble 4.2 — Hvad giver mest mening lige nu?

- **Hvad brugeren møder på denne skærm:** Nu er det tid til at vælge en retning. Det er en beslutning, ikke selve arbejdet. Arbejdet kommer vi til senere. Der er intet rigtigt svar her. *(Har brugeren fået et forslag i 2B.5, står det som en lille markering ved den ene mulighed: "Det, vi lagde mærke til, peger herhen". Ingen mulighed er forvalgt.)*
- **Eventuel interaktion:** Brugeren vælger ét: "Behold mit nuværende logo, som det er" / "Justér mit nuværende logo" / "Byg et helt nyt logo".
- **Hvad der leder videre:** Hver mulighed åbner sin egen boble (4.3a-c).

### Boble 4.3 — Hver vej har sin egen boble *(reel forgrening)*

**4.3a — Behold**
- **Hvad brugeren møder:** Et logo, der allerede fungerer, skal ikke laves om, bare fordi du er i gang med at kigge på det. Så går vi videre til at se det sammen med dine farver og teste det i praksis.
  - 💬 *Guide (avatar: Heidi):* Det kræver mod at lade noget være. Det er også en beslutning.
- **Hvad der leder videre:** Modul 5, derefter direkte til Modul 7. Modul 6 springes over.

**4.3b — Justér**
- **Hvad brugeren møder:** Så har du allerede en god start. Du har selv sat ord på, hvad der skurrer, og den liste bruger vi som din arbejdsliste, når vi går i gang. *(Brugerens egen "det skurrer"-liste vises.)* Du kan bygge videre på det, der virker.
- **Hvad der leder videre:** Modul 5, derefter Modul 6 i justér-version, hvor brugerens egen liste vises øverst.

**4.3c — Byg helt nyt**
- **Hvad brugeren møder:** Så lægger vi det gamle til side og bygger videre på det, du har lært. Det, du var glad for i dit nuværende logo, må gerne følge med. *(Brugerens "det fungerer"-liste vises.)*
- **Hvad der leder videre:** 4.4.

**4.4 — Hvilken slags logo trækker i dig?** *(kun for spor B, der vælger "Byg helt nyt")*
- Samme boble som 2C.2, inkl. de fire svar og deres respons. Gemmer `logoType`, så Modul 6 ved, hvilken vejledning der skal vises.
- **Hvad der leder videre:** Modul 5, derefter Modul 6 i nyt-version.

## Modul 5 — Logo og din palet *(spor B og C)*

Spor A og D springer modulet over. To ting bestemmer udgaven: om brugeren har en gemt palet fra Farver, og hvilken retning hun valgte.

### Boble 5.1 — Et logo står sjældent alene

- **Hvad brugeren møder på denne skærm:** Et logo skal spille sammen med resten af dit visuelle udtryk, især med farverne. Lad os se, hvordan det ser ud hos dig. *(Har hun en palet: "Du har allerede en palet fra Farver. Den viser vi her." Siden fejlrettelserne i runde 7 vises paletten nu faktisk, og uden palet vises teksten ikke.)*
- **Hvad der leder videre:** Knappen "Lad os se på det".

### Boble 5.2 — *Fire udgaver*

**5.2a — Behold + har palet: Trækker de i samme retning?**
- **Hvad brugeren møder:** Kig på dit logo og din palet ved siden af hinanden. Trækker de i samme retning? *(Logoet, hvis uploadet, og paletten vises som farveflader.)*
- **Interaktion:** "Ja, det hænger sammen" / "Jeg er ikke sikker" / "Det trækker i hver sin retning".
- **Respons:** *Ja:* Godt. Den sammenhæng noterer vi til din guide. *Ikke sikker:* Det er helt fint. Kig på dem igen, når du har testet logoet i praksis. *Hver sin retning:* Det er et fund, ikke et problem. Nogle gange skal logoet ændres, nogle gange paletten, og nogle gange må de to gerne være forskellige. Knapper: "Jeg vil alligevel justere logoet" (→ 4.3b) og "Jeg lader det stå og går videre".
- **Gemmes:** Ja, `paletSamspil`.

**5.2b — Behold + ingen palet**
- **Hvad brugeren møder:** Du har ikke en fast palet endnu. Det er helt fint. Dit logo kan blive udgangspunktet for den.
- **Se også:** Farver. *Vil du lave en palet, kan du gøre det dér, når du har lyst.*

**5.2c — Justér eller Nyt + har palet: Hvilke farver tager du med?**
- **Hvad brugeren møder:** Skal logoet bruge de samme farver som din palet? Vælg dem, du vil tage med. Eller lad logoet få sin egen variant, fx til sort/hvid.
- **Interaktion:** Multivalg af farverne fra paletten + "Logoet skal have sin egen variant".
- **Gemmes:** Ja, `logoFarver`. Vises igen, når hun går i gang med at lave logoet.

**5.2d — Justér eller Nyt + ingen palet: Vælg en foreløbig farveretning**
- **Hvad brugeren møder:** Du har endnu ikke valgt en fast palet. Det er helt fint. Byg logoet med en foreløbig farveretning, som du kan justere senere.
- **Interaktion:** "Én farve, jeg kan lide" / "Et par farver, der passer sammen" / "Sort og hvid til at begynde med" / "Det ved jeg ikke endnu" + valgfri note om farverne.
- **Respons:** *Én farve:* Godt udgangspunkt, den er let at bygge videre på. *Et par farver:* Skriv dem gerne ned, så du kan finde dem igen. *Sort og hvid:* Et smart sted at starte. Virker logoet uden farve, virker det næsten overalt. Farven kan komme bagefter. *Ved ikke:* Det er okay. Begynd med formen, farven kan vente.
- **Se også:** Farver. *Vil du have en fast palet, kan du lave den dér. Du behøver ikke gøre det først.*
- **Gemmes:** Ja, vises igen, når hun går i gang med at lave logoet.

**Hvad der leder videre:** Behold → Modul 7. Justér og Nyt → Modul 6.

## Modul 6 — Skab eller opdatér dit logo *(Justér og Nyt)*

Spor A, D og "Behold" springer modulet over.

### Boble 6.1 — Nu går vi i gang

**6.1J — Justér: din arbejdsliste**
- **Hvad brugeren møder:** Nu arbejder vi med dit eget logo. Her er din liste. Du behøver ikke løse det hele. Tag fat, hvor det føles rigtigt at starte, og afkryds, efterhånden som du når det.
- **Interaktion:** Tjekliste-komponenten (`gemNoegle: "logo-modul6-arbejdsliste"`), hvor punkterne bygges ud fra det, hun selv valgte i 2B.3 og fra evt. tests i Modul 7:
  - *Rodet* → Forenkl: fjern noget, indtil kernen står tilbage.
  - *Svært at læse småt* → Gør det tydeligere, når det er småt: mere luft, større eller enklere bogstaver.
  - *Farverne passer ikke* → Skift til de farver, du valgte, eller find nogle, der passer bedre.
  - *Ligner andre* → Find ét element, der er dit eget: en form, en skrifttype eller en farve.
  - *Føles ikke som mig* → Se på, præcis hvad der føles fremmed, og ændr netop det.
  - *Lavet hurtigt* → Gennemgå det roligt, valg for valg.
  - *Ved ikke* → Kig på det småt og i sort/hvid. Ofte viser det, hvad der skurrer.
  - *Fra test (Modul 7):* Gør det tydeligere, når det er småt / Gør forskellen mellem lyst og mørkt tydeligere, så det virker uden farve / Lav en udgave til den baggrund, hvor det forsvinder.
  - *Kom hertil uden liste (via "Jeg vil alligevel justere logoet"):* En kort note, hvor hun selv skriver 1-2 ting, hun vil ændre.

**6.1N — Nyt: det har du med dig**
- **Hvad brugeren møder:** Nu skal du i gang med det konkrete. Du har allerede en hel del med dig. *(Vises: valgt logotype, farveretning eller palet fra 5.2, samt screenshots og noter fra 3.2.)* Det er dit udgangspunkt.

### Boble 6.2 — Hvordan vil du lave det?

*Runde 7: I testen forstod brugeren ikke, hvem "en anden" var ("hvem skulle lave det?"). Hver valgmulighed får nu en kort forklaring, der kan foldes ud, og "en anden" bliver konkret.*

- **Hvad brugeren møder:** Vælg den vej, der giver mest mening for dig. *(ændret efter Heidis kommentar 2026-09-25, før: "føles mest overkommelig")* **✅ Ny linje (runde 7, godkendt 2026-09-25):** "Tryk på pilen ved en mulighed for at læse lidt mere om den."
- **Interaktion:** *Nyt:* "I Canva (anbefalet)" / "I Looka, ud fra det, jeg allerede har leget med" / "I Illustrator, hvis jeg har erfaring med Adobe" / **✅ Ny formulering (godkendt 2026-09-25):** "Jeg vil have en grafiker eller en anden til at lave det" *(før: "Jeg vil have en anden til at lave det")*. *Justér:* de samme, uden Looka.
- **✅ Nyt i runde 7 (godkendt af Heidi 2026-09-25) — kort forklaring, der kan foldes ud, ved hver mulighed:**
  - **Canva:** "Et gratis program i din browser, hvor du bygger logoet selv ud fra enkle skabeloner. Godt, hvis du vil prøve dig frem og have det hele i egne hænder."
  - **Looka:** "Du bygger videre på det, du allerede har leget med. Det er gratis at designe, og du betaler først, når du henter filerne."
  - **Illustrator:** "Et professionelt tegneprogram fra Adobe. Kun, hvis du kender det i forvejen. Det koster et abonnement."
  - **En grafiker eller en anden:** "Det kan være en grafiker, du betaler, eller en bekendt, der er god til det. Du har allerede gjort det vigtige forarbejde her: Du ved, hvilken slags logo du vil have, hvilke farver det skal have, og hvad der inspirerer dig. Det gør det meget nemmere at forklare, hvad du ønsker, og det kan gøre opgaven hurtigere og potentielt billigere. Vi giver dig en tjekliste med til samtalen."
- **"Jeg vil have en grafiker eller en anden til at lave det"** → tjekliste og forløb fra spor D (2D.2 og frem), genbrugt. Springer 6.3-6.5 over.
- **Gemmes:** Ja, `vaerktoej`.
- *Parkeret fra brugertest 1 (P4): at DUF selv tilbyder at lave logoet mod betaling. Det er en forretningsbeslutning og tages ikke med i denne runde.*

### Boble 6.3 — Inden du går i gang *(vises for Canva og Illustrator)*

Rettighedsbobler efter, hvad brugeren skal bygge:

- **Nyt + symbol eller begge:** Har du tænkt dig at bruge et ikon eller en form fra et bibliotek eller et program? Så tjek, før du bygger videre. Mange biblioteker og designprogrammer tillader ikke, at deres ikoner bruges som logo eller varemærke, og de samme ikoner kan andre kunder bruge. Er symbolet det, folk skal kende dig på, er et symbol, du selv har tegnet, tryggest.
  - Tjekliste (`gemNoegle: "logo-modul6-symbol"`): 1. Hvor kommer symbolet fra? 2. Må det bruges i et logo eller varemærke? 3. Må jeg ændre det? 4. Kan det forveksles med et eksisterende logo eller symbol? 5. Har jeg gemt dokumentation for licens eller vilkår? Kan du ikke svare sikkert, så vælg et andet eller tegn det selv. Skal symbolet være central for din identitet, så søg rådgivning.
  - **Se også:** Byggesten. *Ikoner og andre grafiske byggesten.*
- **Nyt + navn i logoet (kun navn, eller begge):** Skrifttyper er sjældent noget at bekymre sig om. Dem, der følger med Canva eller Illustrator, kan du normalt bruge uden at tænke over det. Licensspørgsmålet opstår som regel først, når du vælger en skrifttype uden for dem, fx en, du har hentet et andet sted fra. Så tjek, at den må bruges til erhverv og i et logo, før du vælger den.
  - **Se også:** Byggesten. *Skrifttyper og andre grafiske byggesten.*
- **Justér:** Skifter du skrifttype, eller tilføjer du noget nyt, fx et ikon eller en form fra et bibliotek eller uden for det, dit program leverer, så tjek, om det må indgå i et logo.
- *(Siden fejlrettelserne i runde 7 har alle tjeklister overskriften "Tjekliste" og knappen "Send listen til mig selv".)*

### Boble 6.4 — Vejledning til dit værktøj *(én pr. valg)*

- **Canva:** Åbn Canva (åbner i nyt vindue). Begynd enkelt: én farve og få elementer. Tjek logoet småt undervejs, fx ved at zoome ud eller se det på din telefon. Gem dine udgaver undervejs, så du kan gå tilbage. **✅ Ny sætning (runde 7, godkendt af Heidi 2026-09-25):** "Har dit logo både navn og symbol, så gem også en udgave med kun symbolet. Den skal du bruge de små steder, fx som profilbillede."
- **Looka:** Du har allerede leget med Looka. Det er gratis at designe der. Du betaler først, når du er tilfreds og vil hente filerne. Det er en helt fin måde at få et logo på, bare med åbne øjne. Fire ting er værd at vide, før du køber:
  - *Hvad du får:* Den billigste pakke giver typisk kun én billedfil. Vil du have logoet i flere filtyper (fx vektor) og i farvevarianter med gennemsigtig baggrund, skal du højere op. Der findes også et abonnement med et helt brand kit. Priser og indhold ændrer sig, så tjek dem hos Looka.
  - *Ejerskab:* Looka skriver, at du får fuldt ejerskab af det færdige logo. Men de henter ikoner og skrifttyper fra en database, og de kan ikke garantere rettighederne til enkeltdelene. De fjerner heller ikke elementerne fra databasen, så andre kan få et lignende logo.
  - *Varemærke:* Looka giver ikke juridisk rådgivning om varemærkeregistrering. Vil du registrere logoet, så tal med en fagperson. *(Parkeret fra brugertest 1 (P2): en henvisning til, hvor man finder en fagperson.)*
  - *Forveksling:* Tjek, om logoet ligner et eksisterende (fx med Google Lens).
  - Tjekliste (`gemNoegle: "logo-modul6-looka"`): 1. Har jeg set, hvad pakken indeholder (filtyper og versioner)? 2. Får jeg udgaver i sort/hvid og til både lys og mørk baggrund? 3. Har jeg forstået, at jeg ikke får eksklusive rettigheder til enkeltdelene? 4. Har jeg tjekket, om det ligner et eksisterende logo? 5. Har jeg gemt kvittering og vilkår? Skal logoet være en central del af din identitet, eller vil du varemærkeregistrere det, så søg rådgivning først.
  - *Note til design/udvikling:* indholdet er tjekket mod Looka's egne sider 2026-09-21 (copyright-/ejerskabsartikel, varemærkeartikel og prissiden). Priser er bevidst ikke skrevet ind. Tjek igen, før teksten bygges.
- **Illustrator:** Du kender værktøjet, så kun en påmindelse: begynd enkelt, i én farve, tjek det småt undervejs, og gem en vektorfil sammen med de billedfiler, du eksporterer. **✅ Ny sætning (runde 7, godkendt af Heidi 2026-09-25):** "Lav også en udgave med kun symbolet, hvis dit logo har et."

### Boble 6.5 — Læg dit logo her

- **Hvad brugeren møder:** Er du nået til noget, du kan lide? Læg det her. Det er ikke en færdig version, bare den, du står med lige nu. Det bliver på din enhed.
  - 💬 *Guide (avatar: Sophia):* Et selvlavet logo er ikke et kompromis. Det er en prototype, ligesom resten af dit visuelle udtryk.
- **Interaktion:** Valgfri upload (samme mekanik som i Modul 2).
- **Hvad der leder videre:** Knappen "Jeg har noget, jeg vil teste" (→ Modul 7).

## Modul 7 — Tjek i praksis *(alle spor)*

Her samles sporene igen, og testresultaterne bestemmer, hvad brugeren gør bagefter. Har brugeren lagt logoet ind, vises det automatisk i de tre situationer (ren client-side), så hun ikke selv skal simulere dem. Uden upload kan hun lægge det ind her eller teste selv.

### Boble 7.1 — Nu tester vi det

- **Hvad brugeren møder på denne skærm:** Nu tester vi, om logoet fungerer i virkeligheden. Ikke kun, om det ser godt ud på din skærm lige nu. Der er tre små tjek: småt, uden farve og på forskellige baggrunde.
  - *Spor A:* Du er glad for dit logo. Nu ser vi, om det også klarer sig i hverdagen.
  - *Spor D:* Nu er logoet kommet. Aftalte I flere udgaver, så prøv dem i tjekkene.
- **Eventuel interaktion:** Har hun ikke lagt logoet ind, kan hun gøre det her (valgfrit).

### Boble 7.2 — Tjek 1: Kan du kende det, når det er småt?

- **Hvad brugeren møder:** Kig på logoet i lille størrelse, som på et ikon eller i en profil. Kan du stadig kende det? *(Logoet vises i tre små størrelser.)*
  - **✅ Nyt i runde 7 (godkendt af Heidi 2026-09-25):** De tre størrelser får hver en lille etiket, så brugeren kan se, hvor hun vil møde logoet i den størrelse: "Profilbillede" (ca. 64 px), "Lille profilbillede" (ca. 32 px) og "Favicon, ikonet i browserfanen" (16 px). Den mindste vises gerne i en lille tegnet browserfane, så det er tydeligt, hvad et favicon er.
- **Interaktion:** "Ja, det kan jeg stadig kende" / "Næsten, men noget forsvinder" / "Nej, det bliver utydeligt".
- **Respons (kun hvis ikke "Ja"):** Det er ofte detaljerne, der forsvinder først. Prøv at fjerne det, der ikke er helt nødvendigt, gøre streger og bogstaver kraftigere og give mere luft. Mange har også en lille udgave til de små steder, fx kun symbolet eller kun forbogstavet.
  - **✅ Nyt i runde 7 (godkendt af Heidi 2026-09-25):** Under responsen kan brugeren uploade en ekstra, lille udgave af sit logo ("Har du en udgave med kun symbolet? Læg den her, og se den i de små størrelser"). Den vises i de tre små størrelser ved siden af. Den gemmes som `logoUploadLille` og kommer med på logo-siden i guiden (8.2).

### Boble 7.3 — Tjek 2: Virker det uden farve?

- **Hvad brugeren møder:** Kig på logoet uden farve. Fungerer det stadig? *(Vises i gråtoner. Har hun en egentlig sort/hvid-udgave, kan hun tjekke den også. Gråtoner er ikke det samme som en ægte sort/hvid-udgave, og det fremgår.)*
- **Interaktion:** Samme tre svar.
- **Respons (kun hvis ikke "Ja"):** Uden farve er det lyset og mørket, der gør forskellen, ikke farven. Når to farver er lige lyse eller lige mørke, smelter de sammen. Prøv at gøre den ene lysere eller mørkere, eller lav en egen sort/hvid-udgave.

### Boble 7.4 — Tjek 3: Lys og mørk baggrund

- **Hvad brugeren møder:** Kig på logoet på en lys og en mørk baggrund. Er det til at se på begge steder? Er der tekst i logoet, hjælper det at tjekke kontrasten mellem tekst og baggrund.
- **Interaktion:** "Ja, på begge" / "Kun på den lyse" / "Kun på den mørke".
- **Respons (kun hvis ikke "Ja, på begge"):** *Kun lys:* Mørk tekst forsvinder på mørk baggrund. Lav en udgave med lyse farver til de mørke steder. *Kun mørk:* Det samme den anden vej. Lav en udgave med mørke farver til lyse baggrunde.
- **Se også:** Farver. *Tjek kontrasten mellem tekst og baggrund helt præcist.*

### Boble 7.5 — Sådan gik det *(reel forgrening efter resultat og spor)*

- **Alle tre tjek er "Ja":** Dit logo klarer sig. Det er ikke småt at kunne sige. → Modul 8.
- **Ikke alle "Ja":** Det er helt normalt, at noget først viser sig her. Det betyder ikke, at du har gjort noget forkert. *(De tjek, der ikke gik godt, listes.)* Hvad vil du gøre med dem?
  - *Spor B og C:* Knapper: "Jeg vil justere logoet nu" (→ Modul 6 i justér-version, hvor de tjek, der ikke gik godt, er blevet punkter på arbejdslisten) / "Jeg tager det senere" (→ Modul 8, med en note om, hvad der mangler).
  - *Spor A og D:* Du kan ikke justere det her, men du kan tage listen med til den, der lavede logoet. Det er en helt legitim bestilling. Knapper: "Jeg tager det med" (→ Modul 8, listen gemmes som note) / "Jeg går videre uden".
- **Gemmes:** Ja, `testResultater`, og hvad hun valgte at gøre (`aabnePunkter`).

## Modul 8 — Dokumentér *(alle spor)*

### Boble 8.1 — Skriv det ned, så du kan finde det igen

- **Hvad brugeren møder:** Skriv 2-3 sætninger om dit logo. Det er det, der bliver til den del af din visuelle guide, du kan slå op i senere. Din opskrift efter spor:
  - *A og Behold:* Hvorfor beholder du logoet, og hvordan viste testen, at det fungerer? Hvem har lavet det, og har du filerne?
  - *Justér:* Hvad ændrede du, og hvorfor?
  - *Nyt (C, eller B der valgte Nyt):* Hvordan kom du frem til det, og hvad inspirerede dig? *(Hendes noter og screenshots fra Modul 3 vises som støtte. Siden fejlrettelserne i runde 7 står hver note under sit eget spørgsmål.)*
  - *D:* Hvem lavede det, hvad har I aftalt om rettigheder, og hvor ligger filerne?
  - *Alle:* Hvordan spiller det sammen med din palet? Hvor kommer logoet fra, og hvad må du bruge det til?
- **Interaktion:** Brugeren skriver en kort tekst.
- **Gemmes:** Ja, `begrundelse`. Det er det, der samles i Fælles samling. Også for spor A, hvor begrundelsen ikke må udelades.

### Boble 8.2 — Din logo-side i guiden

- **Hvad brugeren møder:** Her er din side i din visuelle guide. *(Vises: logoet, hvis uploadet, **✅ (godkendt 2026-09-25) og den lille udgave, hvis hun lagde en ind i 7.2,** hendes tekst, resultatet af de tre tjek med ✓ og noter, og evt. åbne punkter, hun valgte at tage med.)* Tilføj den til din guide, når den ser rigtig ud.
- **Interaktion:** Knappen "Tilføj til min visuelle guide" (den delte gem-funktion).
- **Gemmes:** Ja, i Fælles samling.

### Boble 8.3 — Dit logo er en prototype

- **Hvad brugeren møder:** Dit logo er, som resten af dit visuelle udtryk, en prototype. Det må gerne udvikle sig, i takt med at din praksis gør det. *(Har hun åbne punkter: "De ting, du gerne vil vende tilbage til, ligger i din guide, så du kan finde dem igen.")*
  - 💬 *Guide (avatar: Marcus):* Du behøver ikke have det perfekte logo i dag. Du skal bare have et, du kan bruge i morgen.
- **Hvad der leder videre:** Ud af Logo-rummet, tilbage til rum-vælgeren.

## Spørgsmål til jer, inden I bygger videre

- **Motoren (logoEngine.js):** sporene, "vis kun valgte bobler", hop tilbage (Modul 7 → 6, 5.2a → 4.3b) og genoptagelse ved Modul 7 for spor D kræver, at motoren kan vælge næste boble ud fra gemte svar, ikke kun lineær `showModulN()`-navigation. Sophia er med på planen (2026-09-21). Bekræft det konkrete i koden.
- **Palet fra Farver:** motoren skal kunne læse den gemte palet og vise farverne som valgbare flader (5.2c) og side om side med logoet (5.2a). Billeder 6.4 viser allerede en gemt palet, så mekanikken findes. Bekræft datastrukturen. *(Runde 7: fejlen, hvor paletten ikke blev vist i 5.1, er rettet.)*
- **Screenshot-indsæt (Ctrl + V):** Windows-genvejen lægger billedet i udklipsholderen. Kan upload-mekanikken i "Min inspiration" tage imod indsæt, eller skal den udvides?
- **Tjekliste-komponenten** bruges nu fire steder i Logo og kræver dynamiske punkter (6.1J bygges af svar og testresultater) og flere `gemNoegle`. Bekræft, at komponenten kan det, se [[DUF Teknisk - Tjekliste-komponent (afkrydsningspunkter)]].
- **Se også-skiltet** er en ny, delt komponent, se [[DUF Teknisk - Se også-skilt (henvisning til andet vækstrum)]]. **Besluttet af Heidi 2026-09-21: kun informativt (ikke klikbart) for nu.** Skilt-ikonet er en placeholder, indtil Marcus har tegnet det (se [[DUF Marcus - Design-to-do (grafiske elementer der skal følges til dørs)]]).
- **Modul 7's automatiske visning** (lille størrelse, gråtoner, lys/mørk baggrund) skal fungere client-side uden ekstern afhængighed, også på en smal skærm.
- **Skrifttyper og rettigheder (Marcus):** Marcus vurderer, om der skal laves en praktisk oversigt. Indtil da står den korte, rolige linje i 6.3.
- **Looka's vilkår** er tjekket 2026-09-21 og kan ændre sig. Tjek igen, før 6.4 bygges.
- **Mobil:** rummet skal gennemgås på mobil, desktop og evt. tablet, som del af den samlede mobilgennemgang, der skal ske, før vi går videre med de andre vækstområder (se opgaveoversigten).
- **✅ Afgjort 2026-09-25 (Heidi) — bobler, der springer videre af sig selv:** Claude Code fandt fem i Logo: 2A.1, 2A.2, 2D.1, 2D.3 og 7.5. Beslutning: de bliver, som de er. Alle fem er valg af vej (knapper, der fører et nyt sted hen), og ingen af dem viser et svar, brugeren kan gå glip af. Problemet i Byggesten 6.2 var netop, at et svar forsvandt, før man nåede at læse det.
