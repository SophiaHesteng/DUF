# Sådan virker det

En kort oversigt over, hvor tingene ligger i DUF, og hvordan de hænger sammen. Skrevet, så du kan finde ud af, hvor du skal gå ind og rette, uden at spørge en AI. Opdatér filen, når en ændring flytter, tilføjer eller fjerner noget, den beskriver.

Indholdsregler, tone og strukturen bag rummene står i `docs/` (start med `docs/duf-core-context.md`). Navigation mellem rum står i `docs/duf-vaekstrum-motor.md`.

## Ord vi bruger

- **Side**: én HTML-fil. Alle sider hedder deres emne, uden præfiks: `farver.html`, `branding.html`.
- **Emne**: det, brugeren ser. Over for brugerne kalder vi tingene ved deres emne ("Farver", "Branding"), og bruger "emner", når vi har brug for et samlet ord.
- **Rum** og **område**: teamets interne ord i `docs/` (dér hedder de "vækstrum" og "vækstområde"). I koden står der "rum" og "emne" i kommentarerne, og `side` i navnene (`data-side`, `sideId`).

## Siderne

| Slags | Filer |
|---|---|
| Faste sider | `index.html`, `about.html`, `contact.html`, `faq.html` (Spørgehjørnet), `library.html` (Biblioteket), `receptionen.html`, `proeverummet.html` |
| Emnesider (en dør hver) | `visuelt-udtryk.html`, `branding.html`, `markedsfoering.html`, `den-gode-praksis.html`, `produktudvikling.html`, `hjemmeside.html`, `det-gode-indhold.html`, `sociale-medier.html`, `ai.html` |
| Dørvalget | `vaelg-din-dor.html`: viser alle emnesider som døre |
| Inde i Visuelt udtryk | `vaelg-rum-visuelt-udtryk.html` (vælg rum), `velkommen-visuelt-udtryk.html` (første rum), `farver.html`, `logo.html`, `billeder.html`, `byggesten.html`, `visuel-style-guide.html` (samler det hele til sidst) |

**Ny emneside?** Kopiér fx `ai.html`, og udfyld `href` i `js/data/doerkarrusel.js`, så døren kan klikkes.

## Sådan starter en side

Alle sider indlæser `js/app.js`. Den viser header og footer og ser derefter på `<body data-side="...">` for at se, hvilken side den er på. I `app.js` er der én liste, `sideStart`, der siger, hvad hver side skal starte (fx `farver` → `FarverEngine`). Sider uden egen motor (fx emnesiderne) har ingen `data-side` og får bare header og footer.

**Ny side med egen motor?** Tilføj én linje i `sideStart`, og sæt `data-side` på siden.

## Mapperne

- `js/engine/`: motorerne, ét sæt pr. rum (`farverEngine.js` + `farverUi.js` osv.; det første rum hedder `visueltEngine.js` + `visueltUi.js`). `exit.js` siger, hvor brugeren sendes hen, når et rum slutter (siden "vælg rum").
- `js/data/`: teksterne til hvert rum (`farver.js`, `visuelt.js` ...), dørene (`doerkarrusel.js`) og teksten til style guiden (`visuel-style-guide.js`).
- `js/components/`: genbrugelige dele (header, footer, rammen om et rum, dørkarrussel, exit-døren ...).
- `js/storage/storage.js`: gemmer brugerens svar og billeder i browseren (IndexedDB, databasen `duf-storage`). Funktionerne hedder `saveSideOutput`, `getSideOutput`, `getAllSideOutputs`, `getImagesForSide` osv.; listen står øverst i filen. `udgangspunkt.js` læser svarene fra det første rum, så de andre rum kan tilpasse sig.
- `js/visuelStyleGuide.js`: bygger siden `visuel-style-guide.html` ud fra det, brugeren har gemt.
- `css/`: SCSS-filer, der samles i `css/style.scss` og kompileres til `css/style.css`. Kompilér med teamets sædvanlige Sass-opsætning (den tilføjer browser-præfikser). `_flow.scss` er exit-døren og flow-tilstanden, `_rum.scss` er rammen om et rum, `_colors.scss` er farverne.

## Live

Push til `main` går direkte live hos Simply (`.github/workflows/deploy.yml`). Arbejd altid på en branch (`kort-<nr>-<navn>`).
