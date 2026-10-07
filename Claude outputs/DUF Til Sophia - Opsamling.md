# Til Sophia: opsamling på DUF-koden, samarbejdet og mappestrukturen

*Skrevet 26-09-2026 af Claude på Heidis opfordring, så du kan komme up to date, når du er tilbage. Detaljeret status for hvert rum står i `claude/DUF Opgaveoversigt - Visuelt udtryk.md` i projektet. Dette dokument er det korte overblik.*

**Vigtigt først:** Alt om arbejdsgange herunder er et forslag, der beskriver, hvordan Heidi og Claude har arbejdet indtil nu. **Du har det sidste ord**, hvis procedurerne skal ændres. Heidi ved, at du gerne vil kode mere selv, så tilpas det til det.

---

## 1. Hvor står vi (kort)

- Alle fem rum i Visuelt udtryk (Overblik, Farver, Logo, Billeder og Byggesten) er bygget og testet i browseren. De er også rettet efter brugertest 1 (kaldet "runde 7") og merget (25-09).
- Heidi har besluttet at lægge sitet **offentligt online uden betalingsmur** for en periode. Formålet er at kunne teste på rigtige telefoner og planlægge brugertest 2. Sitet ligger nu på domænet hos Simply, uploadet med FileZilla.
- Det, der stadig mangler: mobilgennemgang, Fælles samling, navigationslinjer (modul og boble), valg af betalingsmur og Marcus' grafiske elementer. Du finder det hele i opgaveoversigten.

---

## 2. Sådan er koden bygget op

Stakken er stadig ren HTML, SCSS og vanilla JS (ES-moduler) uden framework.

### Hvert vækstrum består af fire lag

Her med Farver som eksempel:

| Fil | Rolle |
|---|---|
| `vaekstrum-farver.html` | Tom skal: `<body data-vaekstrum="farver">` og en tom `<main id="app">` |
| `js/app.js` | Læser `data-vaekstrum` og starter den rigtige motor |
| `js/engine/farverEngine.js` | **Motoren:** rækkefølge af moduler og bobler, forgreninger, og hvad der gemmes |
| `js/engine/farverUi.js` | **Skærmene:** markup, knapper og layout (`showWelcome`, `showTextScreen` osv.) |
| `js/data/farver.js` | **Indholdet:** alle overskrifter, afsnit, spørgsmål og svarmuligheder, opdelt i `velkomst`, `modul1` … `modul8` |

Det samme mønster gælder for `overblik`, `farver`, `logo`, `billeder` og `byggesten`. Modul- og boblenavnene i datafilerne (`modul3.boble2` osv.) følger manuskriptet.

**Tekst uden for datafilerne:**

- Faste knaptekster ("Næste", "Gå ind her") og exit-dialogen står i `*Ui.js`. Enkelte står i `*Engine.js`, fx "Næste eksempel" i Farver.
- "Vælg dit rum"-siden har sin tekst direkte i `vaelg-rum-visuelt-udtryk.html`.
- Fælles samling har sin tekst i `js/data/faellesSamling.js`.
- Teaser-teksterne til rummene står flere steder (vælg-rum-siden og `faellesSamling.js`), så de skal rettes alle steder.

### Delte komponenter (`js/components/`)

| Fil | Bruges til |
|---|---|
| `exitDoor.js` | Den fælles "gå ud"-dør i alle rum |
| `tjekliste.js` | Afkrydsningslister med `gemNoegle` (Billeder 7.2 og fire steder i Logo) |
| `seOgsaa.js` | "Se også"-skiltet, en henvisning til et andet rum. Kun informativt, ikke klikbart. Data ligger i `js/data/seOgsaaMaal.js` |
| `fontvaelger.js` | Skrifttypevælgeren med 8 Google Fonts (Byggesten, Modul 4) |
| `provSammen.js` | Forhåndsvisningen "Prøv dem sammen" (Byggesten 6 og Billeder 8.1) |
| `billedvaelger.js`, `imageGallery.js` | Billedvalg, upload og lightbox |
| `header.js`, `footer.js`, `accordion.js`, `choiceCards.js`, `storageNotice.js` m.fl. | Sitets fælles dele |

### Lagring (`js/storage/`)

- `vaekstrumStorage.js`: alt gemmes lokalt i browseren (IndexedDB), og intet sendes til en server. Den indeholder `saveVaekstrumOutput`, `saveImage`, `getSavedVaekstrumIds` og flere funktioner.
- `udgangspunkt.js`: `hentUdgangspunkt()` læser det, Overblik gemmer om brugeren (kanaler og om hun "starter fra bunden"). Andre rum bruger det til at tilpasse tekster. Funktionen er ny i runde 7.

### Navigation mellem rum

- `js/engine/vaekstomraadeExit.js` indeholder ét centralt mål (`VISUELT_UDTRYK_HUB = "vaelg-rum-visuelt-udtryk.html"`). Alle motorer bruger det, når et rum afsluttes eller forlades.
- Den offentlige forside for området (`vaekstomraade-visuelt-udtryk.html`) viser ikke rummene direkte. Den linker til `vaelg-rum-visuelt-udtryk.html`, og det er der, en betalingsmur skal sidde senere.
- Hele beskrivelsen står i `docs/duf-vaekstrum-motor.md`.

### Regler for at rette tekst i datafilerne

1. Ret kun det, der står mellem anførselstegnene. Lad nøgler, kommaer og klammer være.
2. Brug ikke `"` inde i en tekst. Brug i stedet `» «` eller `'`.
3. Lad `${…}` være i template-strenge.
4. Lad svarmulighedernes id'er (fx `match`) være, fordi motoren bruger dem til forgrening.

---

## 3. Mappestrukturen, som den ser ud nu

### Kodemappen (repoet `SophiaHesteng/DUF`)

```
DUF/
├── index.html, about.html, contact.html, faq.html, library.html, …   ← marketing- og indholdssider
├── receptionen.html, proeverummet.html, vaelg-din-dor.html
├── vaekstomraade-<omraade>.html        ← 7 offentlige områdeforsider
├── vaelg-rum-visuelt-udtryk.html       ← rum-vælger (bliver bag betalingsmur senere)
├── vaekstrum-<navn>.html               ← ét pr. rum (overblik, farver, logo, billeder, byggesten)
├── faelles-samling-visuel-stil.html
├── CLAUDE.md                           ← instruktioner til Claude Code (læses automatisk)
├── css/      style.scss + _colors, _components, _header, _footer, _vaekstrum → style.css
├── js/
│   ├── app.js                          ← indgang: starter den rigtige motor
│   ├── engine/                         ← <rum>Engine.js + <rum>Ui.js, contrast.js, vaekstomraadeExit.js m.fl.
│   ├── data/                           ← <rum>.js = al tekst og indhold pr. rum
│   ├── components/                     ← delte komponenter (se ovenfor)
│   └── storage/                        ← vaekstrumStorage.js, udgangspunkt.js
├── docs/                               ← context-dokumenter, manuskripter, tekniske noter
│   ├── duf-manuskript-<rum>.md         ← ★ DE GÆLDENDE MANUSKRIPTER
│   └── brugertest/                     ← noter fra brugertest
├── img/, assets/
└── .git/
```

Filnavnet for hvert rum følger mønsteret `vaekstrum-<navn>.html`. Den gamle `overblik.html` er fjernet. Mappen `Claude outputs/` i roden er tom og kan slettes.

### Projektet i Claude (DUF-projektet)

- **Rodniveau:** Heidis oprindelige Context-dokumenter (`.docx`) og sidernes PDF'er.
- **`claude/`:** aktuelle arbejdsdokumenter. Det gælder opgaveoversigten, brugertest 1, runde 7-prompterne, de tekniske specs (motor, tjekliste, se også, fontvælger, prøv dem sammen, navigationslinjer, betalingsmur), rettighedsoversigterne, procesdokumenterne og Vækstrum Context for hvert rum.
- **`arkiv/` (ny, 26-09):** 14 afsluttede dokumenter. Det er de gamle manuskriptkopier, manuskript-revisionerne og de ældre byggeprompts. Hvert dokument har en linje øverst om, at det er arkiveret og ikke opdateres.

**Den vigtigste ændring:** Fra 26-09 er **manuskripterne i `docs/` i repoet de eneste gældende**. Kopierne i projektet er arkiveret, så vi ikke har to versioner, der glider fra hinanden.

---

## 4. Sådan arbejder vi sammen om koden (forslag, du bestemmer)

Der er fire roller:

- **Heidi:** indhold, tone og beslutninger om, hvad rummene skal.
- **Claude i chat/Cowork (DUF-projektet):** skriver og reviderer manuskripter sammen med Heidi, laver specs og byggeprompts og holder opgaveoversigten ajour. Claude kan læse kodemappen, når chatten er koblet til Heidis computer, og kan læse repoet på GitHub, fordi det er offentligt. **Claude kan ikke pushe og merger aldrig selv.**
- **Claude Code i VS Code:** bygger ud fra prompterne, direkte i repoet.
- **Du (og Marcus):** kode, arkitektur og design. Du har det sidste ord om procedurer og kodestruktur.

### Større ændringer (nyt rum, nyt modul, ny komponent)

1. Heidi og Claude skriver eller reviderer manuskriptet og får det godkendt.
2. Claude skriver en byggeprompt ("DUF Prompt - X.md"). Er chatten koblet til Heidis computer, lægges prompten direkte i DUF-mappen. Ellers lægges den i `claude/` i projektet.
3. Prompten køres i Claude Code. Faste regler i hver prompt:
   - **Ny branch pr. opgave.** Claude Code spørger om branchnavnet og gætter ikke selv.
   - **Første skridt:** manuskriptet skrives ordret ind i `docs/duf-manuskript-<rum>.md`, før koden røres.
   - **Antagelser skal bekræftes, før der bygges.** Claude Code spørger i stedet for at gætte, fx om motoren kan håndtere en forgrening.
   - Der er altid en afgrænsning af, hvad der er uden for scope, og en manuel testliste til sidst.
4. Test i browseren (Live Server) og merge ind i `claude-testing`.

**Om `claude-testing` og `main` (Heidis beslutning):** `claude-testing` er arbejdsbranchen for alt, indtil du er tilbage, og Visuelt udtryk er klar til offentligheden med betalingsmur, nyt design og alt det imellem. `main` er derfor bevidst langt bagud, lige nu ca. 64 commits. Nye branches oprettes fra `claude-testing` og merges tilbage dertil.

### Små tekstrettelser (fx fra Heidis mobilgennemgang)

1. Heidi opretter en branch og retter direkte i `js/data/<rum>.js`.
2. Hun committer og pusher til GitHub.
3. Claude læser diff'en mod `claude-testing` og retter de tilsvarende steder i `docs/duf-manuskript-<rum>.md`. Claude fanger også tekster, der står flere steder, og ændringer, der rører id'er eller struktur. De opdaterede manuskripter lægges i DUF-mappen, så Heidi kan se dem og committe på samme branch.
4. Kode og manuskript merges samlet.

### Efter brugertest

Mønstret er afprøvet to gange (runde 6 og runde 7), men endnu ikke formelt vedtaget:

1. Ét sorteringsdokument med alle fund.
2. En lille fælles prompt med akutte fejl på tværs af rum.
3. Én prompt pr. rum med manuskriptrettelser.

### CLAUDE.md og docs

`CLAUDE.md` siger, at når kode ændrer noget, et dokument i `docs/` beskriver, så skal dokumentet opdateres i samme ændring. Hvis det er uklart, om dokumentet eller koden har ret, skal Claude spørge frem for at vælge selv.

---

## 5. Ting, der venter på dig

- **Automatisk deploy fra GitHub til Simply.** Heidi vil gerne undgå at uploade med FileZilla. Simply understøtter GitHub Actions ([deres guide](https://www.simply.com/en/support/faq/ftp/856-upload-with-github-actions/)). Forslaget er [FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action) i `.github/workflows/deploy.yml`, som kører ved push til den valgte branch (se næste punkt), kun uploader ændrede filer og udelader `docs/`, `CLAUDE.md`, `.git*` og SCSS-kilderne. Da repoet ligger på din konto, er det dig, der skal lægge `FTP_SERVER`, `FTP_USERNAME` og `FTP_PASSWORD` ind som secrets. Repoet er offentligt, så adgangskoden må aldrig stå i selve filen. Intet er sat op endnu. Claude laver gerne filen, når I har besluttet det.
- **Deploy og `main`:** fordi `main` bevidst er bagud (se afsnit 4), skal I, hvis automatisk deploy sættes op før den store merge, deploye fra `claude-testing` i stedet for `main`. Alternativt venter I med automatisk deploy, til `claude-testing` er merget ind i `main`.
- **Procedurerne i afsnit 4:** ret til, så de passer til, hvor meget du vil kode selv. Du kan fx tage bygningen selv og kun bruge Claude til specs og manuskripter.
- **Betalingsmur:** der skal teknisk input til valget mellem Stripe med egen backend og Simplys OnPay. Det er uafklaret, om OnPay kan levere løbende adgangsstyring.
- **Kodeoprydning på tværs af rum:** er det muligt at samle motorerne? Hvordan skal fremtidige vækstområder bygges? Det står på listen til "næste bølge".
- **Oprydning:** fem løse, lokale prompt-filer (`prompt-*.md`) og mappen `Claude outputs/` kan slettes efter et hurtigt git-tjek.
