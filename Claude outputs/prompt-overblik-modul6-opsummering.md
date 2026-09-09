# Opgave til Claude Code: Overblik — Modul 6 bygges om til opsummering + fritvalg

Branch: `feature-vaekstrum-motor` (eksisterende branch, fortsæt på den).

## Baggrund

Læs `docs/duf-manuskript-overblik.md` først — Boble 6.1 og noten under "Spørgsmål til jer, inden I bygger videre" (dateret 2026-09-09) beskriver præcis den ændring, denne opgave handler om.

Modul 6 er i dag bygget til automatisk at pege på ét eller flere "rigtige" rum ud fra signaler beregnet i `js/engine/overblikMatcher.js` (`computeSignals()` → `resolveRecommendation()`). De signaler er beregnet ud fra Modul 2's GAMLE spørgsmål (`answers.logo`, `answers.farver`, `answers.billederBruger`, `answers.billederRettigheder`, `answers.sammenhaeng`), som ikke findes længere efter Modul 2 blev bygget om til den nye boble-struktur (`this.answers.brugerAllerede`, `moenster`, `folelse`). `resolveRecommendation()` returnerer derfor i praksis altid `{ type: "none" }` — Modul 6 anbefaler intet, uanset hvad brugeren svarer.

I stedet for at reparere signaludledningen er beslutningen (Heidi, 2026-09-09): **fjern den automatiske matchning helt.** Boble 6.1 bliver i stedet en opsummering af det, brugeren allerede har svaret i Modul 2 (Boble 2.2's feedback gentaget ordret, samt Boble 2.3 og 2.4's valgte svarmulighed + tilhørende respons gentaget ordret), hvorefter brugeren selv vælger frit mellem alle fire uddybende rum — ingen af dem fremhævet som "anbefalet". Det er den samme grundtanke, der allerede gælder, når flere rum er lige relevante (brugeren vælger selv), nu udvidet til at gælde altid.

## Opgaven

### 1. Fjern den automatiske matchning

- Slet `js/engine/overblikMatcher.js`.
- Grep reposet for `overblikMatcher` og `resolveRecommendation`/`computeSignals` for at bekræfte, at kun `overblikEngine.js` importerer fra den, før den slettes — ret evt. andre steder, hvis grep finder dem.
- Fjern `import { resolveRecommendation } from "./overblikMatcher.js";` i `js/engine/overblikEngine.js`.

### 2. Genbrug Boble 2.2's feedback-logik i stedet for at duplikere den

`showModul2HvadBrugerDuResponse()` i `overblikEngine.js` udregner i dag Boble 2.2's respons-tekst ud fra `selected` (hvilke af `modul2.hvadBrugerDu.options` brugeren valgte) — "mange"/"få"/"ikkeSikker"-tekst plus evt. `ikonNudge`-tilføjelse. Modul 6's opsummering skal vise nøjagtig den samme tekst igen for brugerens faktiske valg, så udtræk denne udregning til en lille delt funktion (fx `getHvadBrugerDuFeedback(selected)` et sted i `overblikEngine.js`, som returnerer paragraph-arrayet), og lad både `showModul2HvadBrugerDuResponse()` og den nye Modul 6-kode kalde den. Undgå at skrive samme if/else op to steder.

### 3. Byg opsummeringen i `showModul6()`

Erstat den nuværende `showModul6()` (som kalder `resolveRecommendation`/`saveRecommendation`/`showResult`) med en version, der:

- Bygger et opsummerings-objekt ud fra `this.answers`:
  - **Fra Boble 2.2:** `getHvadBrugerDuFeedback(this.answers.brugerAllerede)` (se punkt 2).
  - **Fra Boble 2.3:** selve den valgte svarmulighed (`this.answers.moenster`) OG den tilhørende respons (`modul2.moenster.responses[this.answers.moenster]`).
  - **Fra Boble 2.4:** samme princip — `this.answers.folelse` og `modul2.folelse.responses[this.answers.folelse]`.
- Sender opsummeringen videre til en ny render-funktion i `overblikUi.js` (se punkt 4) sammen med alle fire uddybende rum fra `ROOMS` (`js/data/overblik.js`) i rækkefølgen Farver → Logo → Billeder → Byggesten (jf. manuskriptets opremsning).
- Giver render-funktionen en callback, der kaldes, når brugeren klikker på et af de fire rum — se punkt 5.

### 4. Ny render-funktion i `overblikUi.js`

`showResult()` erstattes af en ny funktion (fx `showModul6Recap()`), der viser:

- Rammeteksten: *"Du har nu set nærmere på, hvor du står i dag. Her er en opsamling af det, du har fortalt os undervejs:"*
- Tre opsummeringspunkter (2.2's feedback, 2.3's valgte svar + respons, 2.4's valgte svar + respons) — brug det opsummerings-objekt, `showModul6()` bygger.
- Guide-citatet: *"Du har allerede gjort arbejdet med at fortælle os, hvor du står. Nu er det dit valg, hvor du vil kigge videre."*
- Alle fire rum som **ligestillede** valgmuligheder — samme visuelle vægt på hvert, ingen fremhævet, ingen "anbefalet"-mærkning eller lignende ordlyd. Genbrug `value-card`/`value-list`-klasserne (samme mønster som `vaelg-rum-visuelt-udtryk.html` og Modul 3/5's bobler), fremfor at opfinde nyt markup. Hvert rum-kort skal kunne klikkes (se punkt 5) — det er ikke bare et link.
- Afrundingsteksten (uændret tekst, kun feltnavn ændres hvis det giver mere mening): *"Et overblik bliver først rigtig brugbart, når du begynder at bruge det."*
- Samme afsluttende knapper som i dag ("Se alle rum i Visuelt udtryk", "Tilbage til Vælg din dør") og exit-døren (`renderExitDoor()`/`bindExit()`), som alle andre skærme i rummet.

`joinNames()`-hjælpefunktionen i `overblikUi.js` bruges ikke længere (den var kun til "flere rum lige relevante"-sætningen) — fjern den, hvis intet andet i filen bruger den.

### 5. Rum-valg gemmes, så navigation

Fordi et klik på et rum skal gemme brugerens valg, FØR browseren navigerer videre, må rum-kortene ikke være rene `<a href>`-links. Brug knapper (eller links med `preventDefault()`), der:

1. Kalder en ny engine-metode, fx `chooseRoom(room)`, som gemmer valget (se punkt 6) og
2. Derefter navigerer til `room.link` (`window.location.href = room.link`).

### 6. Omskriv lagringen

Den nuværende `saveRecommendation(recommendation)` gemmer `{ type, rooms, matchedAt }`. Der er ikke længere en "anbefalings-type" — kun brugerens faktiske valg. Omskriv den (fx til `saveChosenRoom(room)`), så den kalder:

```js
saveVaekstrumOutput("overblik", { room: room.id, chosenAt: new Date().toISOString() }, `Overblik gennemført. Brugeren valgte at gå videre til: ${room.name}.`)
```

Følg nøjagtig samme mønster (fejlhåndtering, `isStorageOptedOut()`-respekt osv.) som `saveVaekstrumOutput` allerede kaldes med i denne fil i dag — det er kun `data`-formen og hvornår kaldet sker, der ændrer sig, ikke selve mekanismen.

### 7. Ryd op i `js/data/overblik.js`

`modul6`-eksporten bruger i dag `intro` og `noSignalText`, som ikke længere giver mening (der er ikke "intet signal" eller "ét signal" længere). Erstat dem med de to nye tekster fra punkt 3–4 (fx `recapIntro` og `guide`), og behold `closing` uændret (teksten er den samme). `ROOMS`-objektets `singleText`-felter bruges ikke længere af Modul 6 — de kan blive stående (bruges de fire uddybende rum selv nogen steder, skal de blive; gør de ikke, er det fint at rydde dem ud, men ikke et krav i denne opgave).

## Eksplicit UDENFOR scope

- **Ingen ændring af Modul 1–5's indhold eller struktur.** Denne opgave rører kun Modul 6 (og de to-tre linjer i Modul 2's kode, der bliver til den delte hjælpefunktion i punkt 2 — logikken/teksten skal opføre sig identisk som i dag, kun flyttet).
- **Ingen ny automatisk anbefaling, "fremhævet" rum, eller heuristisk tolkning af Modul 2's svar** — det er præcis det, denne opgave fjerner. Hvis et rum skal fremhæves, er det fordi det reelt stikker ud (ikke relevant her, da alle fire altid vises ligestillet nu).
- **Ingen ændring af `vaelg-rum-visuelt-udtryk.html` eller dens badge-JS** (`js/vaelgRumVisueltUdtryk.js`) — Overblik-kortet har allerede den nødvendige `data-room-status`-markup, og badge-logikken er allerede generisk ud fra `getSavedVaekstrumIds()`. Den skal fortsætte med at virke uændret, bare nu udløst af `saveChosenRoom()` i stedet for `saveRecommendation()`.
- **Ingen ændring af modul-/boble-navigationslinjen** (pin-og-sti) — separat, endnu ikke bygget funktion.
- **Ingen tilføjelse af et separat guide-felt til Modul 2's `moenster`/`folelse`-responser** — det er en kendt, mindre begrænsning (flagget i manuskriptet), men en separat opgave, hvis den skal løses.

## Eksisterende mønstre at følge

- `activateFocusTrap(app)` på den nye skærm, som på alle andre.
- Exit-dør: `renderExitDoor()`/`bindExit()`, som alle andre skærme i `overblikUi.js`.
- Knapklasser: eksisterende `btn btn--regular btn--solid-green` / `btn--outline-green` osv. — ingen nye knap-varianter.
- Kort-styling: `value-card`/`value-list`, som i `vaelg-rum-visuelt-udtryk.html`.

## Test

Der er ingen browser-adgang i den session, dette manuskript blev skrevet i — test derfor selv i browseren (Live Server el.), og tjek:

- Gennemfør Modul 2 med forskellige kombinationer af svar (fx få valg i 2.2 vs. mange, hver af 2.3's fire muligheder, hver af 2.4's fem muligheder) og bekræft, at Boble 6.1's opsummering hver gang viser den korrekte, faktiske tekst for netop de svar — ikke en fast/hardcodet tekst.
- Bekræft at alle fire rum vises med samme visuelle vægt — ingen fremhævning, ingen "anbefalet"-tekst.
- Klik på et rum og bekræft: (a) browseren navigerer til rummets side, (b) et output nu er gemt for `"overblik"` (fx via IndexedDB-inspektøren, eller ved at gå tilbage til `vaelg-rum-visuelt-udtryk.html` og se "✓ Gennemført" på Overblik-kortet), og at det gemte `data.room` matcher det rum, der blev klikket.
- Bekræft at lagringen stadig respekterer et evt. aktivt fravalg (`isStorageOptedOut()`).
- Bekræft at Modul 1–5's svar stadig IKKE ender i `saveVaekstrumOutput`-kaldet (kun `{ room, chosenAt }`).
- Bekræft at exit-døren og fokus-fælden virker på den nye skærm.
- Bekræft ved grep, at intet andet sted i koden længere refererer til `overblikMatcher.js`, `resolveRecommendation` eller `computeSignals`.

Resten af rummet (Modul 1–5, de fire uddybende rums egen lagring) skal være upåvirket.

Commit med én besked, der forklarer hvorfor (fjerner automatisk matchning, som var koblet fra efter Modul 2's ombygning, og erstatter med opsummering + fritvalg) — ikke bare "opdaterer Modul 6".
