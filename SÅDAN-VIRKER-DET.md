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

## Forgreninger i Billeder

Billeders bobler står i én liste i `js/data/billeder.js` og vises i den rækkefølge. Forgreninger styres af felter på den enkelte boble, som `js/engine/billederEngine.js` læser i `springesOver()` og `tilpasBoble()`:

- Modul 3: `kunMedEgneBilleder` (springes over uden egne billeder) og `udenEgneBilleder` (variant-tekst).
- Modul 7: `kunVej: ["selv", "begge"]` (vises kun for de veje, der står i listen; vejen vælges i 7.1) og `prVej` (fx en anden knaptekst for én vej).
- 7.11: `paragraphsUdenBilleder` (variant-tekst, når samlingen i `showImagesBucket` er tom, fx når brugeren har taget udvejen i 7.10). Galleriet skjules så.

Går brugeren tilbage til en boble med fritekstfelter (`textNote`, fx 6.3 og 9.2), viser motoren hendes gemte svar i felterne (`gemteSvar` i `showBoble()` i `js/engine/billederEngine.js`, brugt af `showTextNoteBoble()` i `js/engine/billederUi.js`).

Søgeordene i 7.8 oversættes via listen `oversaettelser` øverst i `js/data/billeder.js`, og hver søgning får et motivord fra listen `motivord` lige under. Ret ordene dér, men læs kommentaren over listen først: ord som "intimate" eller "sensual" giver seksuelle resultater i billedbankerne og må ikke bruges.

Stilene i 6.2 er koblet til ordene fra 5.4 i listen `stilOrdMatch`, også i `js/data/billeder.js`. Den bestemmer, hvilken stil der får noten "Ligger tæt på de ord, du valgte" (kun når præcis én stil har flest af brugerens ord). Notens udseende er klassen `.choice-card-note` i `css/_components.scss`. Selve udregningen ligger i `stileTaetPaaOrd()` i `js/engine/billederEngine.js`.

Formularen i 8.6, der bliver til en mail til DUF, styres af feltet `billedtjek` ved 8.6 i `js/data/billeder.js` (mailadresse, emne og alle tekster). Den bygges i `billedtjekHtml()` og `bindBilledtjek()` i `js/engine/billederUi.js`. Svarene gemmes ikke.

Udkastet i 9.2 ("Skriv det ned, så du kan finde det igen") bygges af `buildDokumentationsUdkast()` i `js/engine/billederEngine.js`. Sætningsstykkerne står i `udkast` ved 9.2 i `js/data/billeder.js`. Ret ordlyden dér.

## Byggesten: genbesøg og forgreninger

Byggestens tekster står i `js/data/byggesten.js` (boblerne i `BOBLER`, overgangene mellem emnerne i `OVERGANGE`, og teksterne til 7.1 og 7.2 i `saetTekster`). Logikken ligger i `js/engine/byggestenEngine.js`:

- **Tidligere svar ved et genbesøg** (Ret i 7.1, 6.3, modul-linjen): `prefillFor()` sender det gemte svar med til skærmen, så det står markeret eller udfyldt. 6.2 er bevidst undtaget.
- **Hvor et svar gemmes, og hvad det rydder op i**: `applyAnswer()`. Fx gemmer 5.1 kun sit valg (`andenStart`), og de tre 5.2-bobler sletter hinandens svar, så kun det seneste gælder.
- **Et valg, der fører et andet sted hen**: giv optionen `next` (og evt. `nextButtonText`, så knappen skifter tekst, når valget er markeret). Eksempel: "Ingen af dem" i 5.2b → 5.2a.
- **Varianter af en boble**: `resolveContent()` (fx 5.2a's overskrift, når brugeren kommer fra "Ingen af dem", og 4.6's påmindelser).
- **Rækkefølgen i Modul 7** er altid Ikoner → Fonte → Andre byggesten: `recapGrupper()`, `detSkalDuBruge()`, `tommelfingerEksempler()` og `buildBegrundelse()`.

Skærmene bygges i `js/engine/byggestenUi.js`, én funktion pr. boble-type (fx `showChoiceBoble()`, `showSaetBoble()`).

## Logo: spor og retning

Logos tekster står i `js/data/logo.js` (`BOBLER`, keyet på boble-id). Logikken ligger i `js/engine/logoEngine.js`, skærmene i `js/engine/logoUi.js`.

- **Spor (A-D)**: sættes i 2.1 og kan skifte undervejs i `applySideEffects()`. Spor A skifter til B, hvis hun vælger at arbejde med logoet selv (2a.1 "Nej" og 2a.2 "fuldt"); spor D skifter til B ved "Jeg laver det selv" (2d.1).
- **Retning (behold/justér/nyt)**: læs den altid via `effectiveRetning()`, ikke direkte fra `svar.retning`. En retning, hun selv har valgt, vinder; spor C får "nyt" som standard, fordi hun aldrig kommer gennem Modul 4.
- **Hvor flowet går hen**: et fast `next` på boblen eller optionen, ellers `customNext()`.
- **Svar, der betyder "ingen" eller "ved ikke"**: giv optionen `eksklusiv: true` i data. Så kan den ikke vælges sammen med de andre (styres i `showMultiChoiceBoble()` i `logoUi.js`).
- **Logo og inspiration side om side**: `sideOmSide: true` på boblen (bruges i 3.3b). Billederne hentes i `gatherContext()` og tegnes af `sideOmSideHtml()`.
- **Logo-varianter** (det fulde logo og den lille udgave): det fulde logo ligger i billed-bucket `logo`, den lille udgave i `logo-lille`. 6.5 har to upload-felter: det andet sættes med `ekstraUpload` i data og får id-præfikset `lille-` (`EKSTRA_UPLOAD_PREFIX` i `logoUi.js`), så de to felter ikke blander sig. `renderImageUploadHtml()` og `bindImageUpload()` i `js/components/imageGallery.js` tager derfor et valgfrit `idPrefix`. 8.2 laver åbent punkt, hvis den lille udgave mangler.
- **Pause og genoptagelse** (spor D venter på et logo, 2d.4/2d.5 og 6.vent/6.vent-se): `saveDPosition()` gemmer både pladsen (7.1) og ruten hertil (`this.historik.gem()` fra `js/engine/rumHistorik.js`), og `start()` bygger ruten op igen med `historik.genskab()`, så prikkerne og "Tilbage" virker efter pausen. Vente-boblerne står i `VENTE_BOBLER` øverst i `logoEngine.js` og tages ikke med i ruten. Laver du en ny venteskærm, skal den med i listen. En knap kan være en udgang for sig selv med `isExit: true` på optionen (2d.4, 6.vent).
- **Bestillingsgrenen** ("Bestil dit logo", når en anden eller DUF skal lave logoet): hvem der laver det, står i `svar.bestilling` ("anden" eller "duf"). Den sættes i 2d.1 og 6.2 (`applySideEffects()`), og hun sættes på spor D. Ruten: 2d.1 → 2d.1b (kun "en anden") → 2d.forbered → 2c.2 → Modul 3 → Modul 5 → 6.b1 → 6.b2 → 6.b3 (kun "en anden") → 6.b4 → 6.anden → 6.klar, eller 6.duf. Fra 6.2 går hun direkte til 6.b1. Vejvalgene står i `customNext()` (3.2, 5.2c/5.2d, 6.b2, 6.b4). Dem, der allerede er i gang med en anden, går stadig 2d.2 → 2d.3 i Modul 2.
  - **Tekster, der står to steder** (2d.2 og 6.anden, 2d.4/2d.5 og 6.vent/6.vent-se): de står én gang som konstanter øverst i `js/data/logo.js` (`BESTIL_AFSNIT`, `BESTIL_TJEKLISTE`, `BESTIL_EFTER_LISTE`, `KLAR_HEADING`, `VENT`, `VENT_SE`), og boblerne henter dem derfra. Ret dem dér.
  - **Logo-briefen** (6.b4): bygges af `buildLogoBrief()` i `logoEngine.js` og vises i et tekstfelt af `briefHtml()`/`bindBrief()` i `logoUi.js`. Overskrifterne og knapteksterne står i `brief` ved 6.b4 i `js/data/logo.js`. Den rettede brief gemmes som `svar.logoBrief` og bliver oplægget i 6.duf.
  - **Modul 6's titel**: hedder "Bestil dit logo" i bestillingsgrenen (`titelBestilling` i `moduler` i `js/data/logo.js`, valgt af `modulListe()` i `logoEngine.js`).
  - **3.1**: i bestillingsgrenen bruges `paragraphsBestilling` i stedet for `paragraphs` (uden sætningerne om selv at bruge et logo fra Looka).
- **Én respons for flere valg** (6.b1): `responsVedValg: { optionIds, tekst }` på en multiChoice-boble. Responsen står fremme, så længe mindst ét af valgene er valgt (`showMultiChoiceBoble()` i `logoUi.js`). Et tekstfelt i en textNote-boble kan få et eksempel med `placeholder` (6.b2).
- **DUF laver logoet** (6.duf, før 2d.duf): teksterne og mailadressen står i `bestilling` ved 6.duf i `js/data/logo.js`. Formularen bygges af `bestillingHtml()` og `bindBestilling()` i `logoUi.js` (samme mønster som billedtjekket i Billeder 8.6), og oplægget i den er logo-briefen. Pris og mailadresse er pladsholdere, markeret med PLADSHOLDER i kommentarerne. Når hun bestiller, sættes `spor = "D"` og `bestiltHosDuf = true`, og det ændrer teksten i 6.vent, 7.1 og 7.5.
- **Brugerens egen tekst i HTML** (8.2's opsamling, noterne fra 3.2, briefen og bestillingens oplæg): send den gennem `escapeHtml()` (øverst i `logoEngine.js`, og en kopi i `logoUi.js` til tekstfelterne), så et "<" i teksten ikke bliver læst som kode.

## Live

Push til `main` går direkte live hos Simply (`.github/workflows/deploy.yml`). Arbejd altid på en branch (`kort-<nr>-<navn>`).
