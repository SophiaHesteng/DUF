# Prompt til Claude Code: Dørikon på "gå ud"-knappen

*Opdateret 2026-10-08 ud fra den oprindelige prompt fra 2026-09-16 (projektdokumentet "DUF Prompt - Dørikon (navigation)" og den gamle kopi i `img/Claude outputs/`). Rettet til koden, som den ser ud nu.*

*Trello-kort: "Byg dørikonet, der åbner sig ved hover/fokus" (listen Kode). Marcus skal godkende stilen (kortet "Marcus: Godkend dørikonets stil"). Prompten kan godt køres før, men merge først, når han har sagt god for det.*

Kopiér alt under stregen ind i Claude Code i VS Code.

---

## Opgave

Alle vækstrum og Prøverummet har en fast "gå ud"-knap nederst til højre. Den kommer fra den delte komponent `js/components/exitDoor.js` (`renderExitDoor()` og `bindExit()`), og dens styling ligger i `css/_vaekstrum.scss` (`#exit-button`).

I dag bruger knappen to Font Awesome-ikoner (`fa-door-closed` og `fa-door-open`), der skifter med `display` ved `:hover`. Knappen skal i stedet bruge Heidis egne dør-tegninger og blødt glide fra lukket dør til en dør på klem, både ved hover og ved tastaturfokus.

Det er en ændring af den eksisterende komponent, ikke en ny komponent.

## Før du går i gang

- Lav en ny branch ud fra `main`. Spørg mig om navnet, før du opretter den. Gæt ikke selv.
- Læs `CLAUDE.md`, `js/components/exitDoor.js` og `#exit-button` i `css/_vaekstrum.scss`.
- Find alle steder, `renderExitDoor()` og `bindExit()` bruges (bl.a. `visueltVaekstrumUi.js`, `farverUi.js`, `logoUi.js`, `billederUi.js`, `byggestenUi.js` og Prøverummets `ui.js`). Billeder binder klik selv i stedet for at bruge `bindExit()`. Ingen af kaldene må gå i stykker, og klik skal virke præcis som før.
- Reference til interaktionen (hover, fokus og tilgængelighed): https://claude.ai/artifact/TWKobDtJfZTg8DDjyyJ5z7. Kan du ikke åbne den, så følg beskrivelsen nedenfor.
- Er noget uklart, så spørg. Gæt ikke.

## Tegningerne (ligger allerede i `img/`)

Heidi har lagt de rigtige SVG-filer i `img/`. Brug dem direkte, og eksportér ikke nye:

- `img/door1_closed 1.svg`: lukket dør (standard)
- `img/door-icon-klem.svg`: dør på klem (ved hover/fokus)

Der ligger også `img/door-icon-open.svg`, `img/door-icon-locked.svg` og nogle PNG-versioner. Brug dem ikke i denne opgave, men lad dem ligge.

Filnavnet `door1_closed 1.svg` har et mellemrum. Det virker, men husk at kode det korrekt i stien (`door1_closed%201.svg`), eller spørg mig, om filen må omdøbes.

## Funktionalitet

- Begge billeder ligger oven på hinanden i knappen og skifter med `opacity`. Overgangen kræver ingen JavaScript:
  - Den lukkede dør er synlig fra start (`opacity: 1`), døren på klem er skjult (`opacity: 0`).
  - `:hover` **og** `:focus-visible` på knappen skifter til døren på klem.
  - Overgang på ca. `.18s ease`.
- `prefers-reduced-motion: reduce`: skift direkte uden at blende.
- Billederne er dekorative (`alt=""` eller `aria-hidden="true"`). Knappens tilgængelige navn kommer stadig fra `label`-parameteren, som hvert rum allerede sender med (fx "Gå ud af Det visuelle udtryk for din praksis").
- **Synlig tekst:** knappen har i dag kun et `aria-label`, ingen synlig tekst. Betydningen må ikke kun ligge i ikonet og animationen, og på touch findes der ingen hover. Tilføj derfor en kort, synlig tekst under ikonet, fx "Gå ud". Hold den lille og rolig, og brug de eksisterende skrifttyper og tokens. Den lange `label` bruges fortsat som `aria-label`. Gør det, så knappen stadig fungerer på mobil (ca. 400 px), uden at den dækker indholdet.
- Klik og tryk skal virke uændret, uanset om hover-tilstanden nås eller ej.
- Trykfladen skal være mindst 44 × 44 px.
- Fjern Font Awesome-ikonerne fra knappen. Font Awesome bruges andre steder på siden, så selve scriptet skal blive.

## Uden for scope

- Rør ikke `vaelg-din-dor.html` eller dørkarrusellen. Det er en separat opgave på sin egen branch.
- Byg ikke navigationslinjer (pins og sti) eller ny navigationslogik.
- Ændr ikke, hvor knappen sender brugeren hen (`VISUELT_UDTRYK_HUB` i `js/engine/vaekstomraadeExit.js`).

## Arbejdsgang

- Arbejd kun på den nye branch. Rør ikke `main`.
- Commit ikke, og push ikke. Jeg kigger ændringerne igennem først.
- SCSS skal kompileres til `css/style.css` som resten af projektet.
- Står der noget i `docs/` om exit-døren (fx i `docs/duf-vaekstrum-motor.md`), så opdatér det også, jf. CLAUDE.md.

## Før du melder færdig

Skriv kort på dansk:
- hvilke filer du har ændret
- alle steder, `renderExitDoor()` og `bindExit()` bruges, og at de stadig virker
- hvordan du har løst den synlige tekst
- en manuel testliste, jeg kan gå igennem i browseren:
  - hover viser døren på klem
  - Tab-tasten giver samme skift via fokus, og fokusmarkeringen kan ses
  - tryk på mobil (uden hover) sender stadig brugeren ud
  - reduceret bevægelse skifter uden at blende
  - knappen virker i alle fem rum og i Prøverummet
  - knappen dækker ikke indhold på en smal skærm
