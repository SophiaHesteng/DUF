# VÆKSTRUM-MOTOR — navigation inde i et vækstområde

*Status: Implementeret 2026-09-07 på branchen `feature-vaekstrum-motor`, som en rettelse af en navigationsbug i Visuelt udtryk for din praksis. Beskriver et arkitekturmønster, der gælder for ethvert vækstområde — ikke kun Visuelt udtryk for din praksis — og bør følges, når de næste vækstområder (Branding, Hjemmeside, osv.) bygges.*

## Reglen

Man kan gå IND i et uddybende vækstrum uden at forlade vækstområdet. At gennemføre eller forlade et rum må derfor aldrig sende brugeren til vækstområdets offentlige forside (`vaekstomraade-<omraade>.html`) — kun til noget, der stadig er inde i området.

Konkret betyder det to ting for ethvert vækstområde:

1. **Én "vælg dit rum"-side inde i området**, adskilt fra den offentlige forside. For Visuelt udtryk for din praksis er det `vaelg-rum-visuelt-udtryk.html`. Den viser det grundlæggende vækstrum, alle uddybende vækstrum (med et "✓ Gennemført"-badge, trukket fra `getSavedVaekstrumIds()` i `js/storage/vaekstrumStorage.js` — intet nyt lager, bare det, der allerede findes), og et link til fælles samling.
   Den offentlige forside (`vaekstomraade-<omraade>.html`) må ikke selv indeholde direkte links til de enkelte rum indlejret på siden — kun ét link videre til "vælg dit rum"-siden. Begrundelse: alt, hvad der ligger inde i området, skal kunne lægges bag en fremtidig betalingsmur på ét sted (mappen/siderne "inde i" området), uden at skulle skille marketingindhold fra rum-adgang bagefter.

2. **Ét centralt navigationsmål pr. vækstområde**, importeret af alle det områdes motorer i stedet for hardkodet. For Visuelt udtryk for din praksis: `js/engine/vaekstomraadeExit.js` eksporterer `VISUELT_UDTRYK_HUB`. Både `saveAndFinish()` (efter sidste modul) og `exitRoom()` (dør-ikonets "gå ud", efter bekræftelse) i hvert af områdets `*Engine.js`-filer skal bruge den konstant. Byg et tilsvarende lille modul for hvert nyt vækstområde, fremfor at skrive filnavnet direkte i motoren.

## Hvorfor dette blev rettet

Før denne ændring gjorde alle fire uddybende motorer i Visuelt udtryk for din praksis (`farverEngine.js`, `logoEngine.js`, `billederEngine.js`, `byggestenEngine.js`) det samme: `window.location.href = "vaekstomraade-visuelt-udtryk.html"` — hardkodet 2 steder pr. fil, 8 steder i alt. Det sendte brugeren helt ud af vækstområdet, uanset om rummet var fuldført eller forladt tidligt. Samtidig lå "Eller gå direkte til et vækstrum" (fire rum-kort) og "Klar til at samle op?" (link til fælles samling) direkte på den offentlige forside.

## Delt "gå ud"-dør

`js/components/exitDoor.js` samler markuppen for dør-knappen (`renderExitDoor()`), som før var kopieret i seks filer (hvert rums Ui.js plus Prøverummets `ui.js`). Hver fil har nu en tynd wrapper, der kalder den delte funktion med rummets eget aria-label — ingen ændring af kaldsteder nødvendig. Klik-håndteringen (`bindExit()`) er også flyttet dertil og bruges i fem ud af seks filer; Billeder binder fortsat selv, fordi rummet har en ekstra "Rettigheder"-knap, hvis binding er flettet sammen med dørens (`bindChrome`). (Ikoner/fonte & byggesten havde samme knap indtil det nye manuskript 2026-09-24 og bruger nu `bindExit()`.)

Udseende (2026-10-08): knappen bruger Heidis egne dør-tegninger i stedet for Font Awesome-ikoner — `img/door1_closed 1.svg` (lukket dør) og `img/door-icon-klem.svg` (dør på klem). De ligger oven på hinanden og skifter med `opacity` (ca. `.18s ease`) ved både `:hover` og `:focus-visible`; ved `prefers-reduced-motion: reduce` skifter de uden at blende. Ingen JavaScript. Billederne er dekorative; knappens tilgængelige navn er stadig rummets `label` (aria-label). Under ikonet står en kort, synlig tekst "Gå ud", så betydningen ikke kun ligger i ikonet — vigtigt på touch, hvor der ikke er hover. Styling ligger i `#exit-button` / `.exit-door` i `css/_vaekstrum.scss`.

## Rum-design: fælles ramme, navigationslinjer og guide-boble

*Bygget 2026-10-09 på branchen `rum-design` (fase 1: de delte dele + Farver). Fase 2 tager dem i brug i de andre rum, ét ad gangen. Billeder fulgte 2026-10-09; Det visuelle udtryk for din praksis, Logo og Byggesten mangler.*

Hver skærm i et vækstrum består af en fælles ramme, mens exit-døren bliver nederst til højre som før:

- **`js/components/rumRamme.js`**: `rumRammeHtml()` bygger topbjælken (områdemærke: prik i områdets farve + "Visuelt udtryk for din praksis · Farver"), pladsen til de to navigationslinjer, indholdskortet og knaprækken ("Tilbage" som tekstknap til venstre, skærmens egne knapper til højre). `bindRumRamme()` tegner linjerne og binder "Tilbage". I Farver kaldes begge via en lille `renderScreen(indhold, knapper)` i `farverUi.js`.
- **`js/components/navLinje.js`**: én navigationslinje, brugt to gange: modul-linjen ("Modul 5 af 8 · titel") og boble-linjen ("Boble 1 af 3"), som er mindre. Bygger videre på `pinSti.js`, som har fået valgfrie tilstande pr. pin (`færdig`, `aktiv`, `ikke nået`). Tilstanden vises med størrelse og udfyldning og står i pinnens aria-label. "Ikke nået"-pins er deaktiverede knapper. Dørkarrusellen bruger ingen tilstande og er uændret.
- **`js/engine/rumHistorik.js`**: brugerens faktiske rute. Hver skærm-metode i en engine kalder som det første `this.historik.besoeg(modul, "modul.boble", () => this.showSkaerm(args))`. Historikken leverer data til linjerne (`navigation(rum, moduler)`) og håndterer hop:
  - Skærme i træk med samme boble-id (fx et spørgsmål og dets feedback, eller Farvers 6.2 én gang pr. farve) er én boble.
  - Hop via pin eller "Tilbage" afkorter historikken fra det punkt. Senere bobler og moduler forsvinder fra stien og skal gås igen, så ruten genberegnes ud fra de svar, brugeren giver nu. En forladt gren forsvinder derfor også.
  - Svarene ligger stadig i engine-objektet og slettes ikke ved et hop. Skærme, der viser tidligere svar (palet, roller, refleksion), er derfor udfyldt, når brugeren går frem igen. Svar gemmes stadig først i IndexedDB ved `saveAndFinish()`, så en genindlæsning midt i rummet mister dem som før.
  - `genvis()` bruges af exit-bekræftelsens "Bliv i rummet" i stedet for den tidligere `previousScreen`.
- **Modullisten** står i rummets data-fil (Farver: `moduler` i `js/data/farver.js`, med `titel` og valgfri `antalBobler`). Antallet af moduler læses derfra. Uden `antalBobler` (fx et modul, der forgrener sig) viser boble-linjen bare "Boble 2".
- **Billeder** (data-drevet, én `showBoble(index)`): historikken bruger boblernes egne `id` og `modul` fra `js/data/billeder.js`. Modul 3 forgrener sig (3.3 og 3.5 springes over uden egne billeder), så det har intet fast antal bobler. Linjen viser kun den vej, brugeren har taget. Vælger brugeren efter et hop tilbage til 3.1 vejen uden egne billeder, slettes svarene fra 3.3/3.5, så de ikke gemmes. Opslagsværket "Billedrettigheder" vises i rammen uden linjer, og dets "Tilbage" viser boblen igen via `genvis()`. "Rettigheder"-knappen og exit-døren ligger uden for rammen som før. Billeders eksisterende guide-linjer ("Guide: …"-panelet) er ikke flyttet over i guide-boblen, fordi de ikke har et navn.
- **`js/components/guide.js`**: guide-boble (avatar + navn + citat). Avataren er en pladsholder med navnets forbogstav. Et `avatar`-billede lægges oven på bogstavet, når det findes. Bygget, men endnu ikke brugt i noget rum, fordi manuskripterne ikke har guide-citater med navn endnu.
- **CSS**: `css/_rum.scss` (ramme, kort, linjer, guide, knaprække, `.btn--solid-omraade`). Pin-tilstandene ligger ved `.pin-sti` i `css/_components.scss`. Nye tokens (`--rum-kort-flade`, `--rum-kant`, `--rum-skygge`, `--rum-daempet-tekst`) står i `css/_colors.scss`. Områdets farve sættes med klassen `rum--<omraade-slug>` som `--omraade-farve` og bruges kun som markør: prikken, guide-navnet, guide-boblens lyse baggrund og kant og primærknappen.
- **Primærknappen** (`.btn--solid-omraade`) har mørk tekst (`#0F201B`) på områdefarven: 5,3:1 mod `#EB6834`, hvor hvid kun når 3,2:1. Guide-navnet er områdefarven blandet 55/45 med tekstfarven (ca. 6,3:1 mod boblen).

## Filnavne på vækstrum

Hvert vækstrums egen HTML-side følger `vaekstrum-<navn>.html` (fx `vaekstrum-farver.html`, `vaekstrum-logo.html`) — gælder både grundlæggende og uddybende rum. `overblik.html` (det grundlæggende rum i Visuelt udtryk for din praksis) blev omdøbt til `vaekstrum-overblik.html` 2026-09-08 for at følge samme mønster; de to links, der pegede på den gamle fil, er opdateret. Rummets interne identifikator ("overblik", brugt i `data-vaekstrum` og i `fra=overblik`-query-parametre) er ikke det samme som filnavnet og skal ikke ændres, blot fordi filnavnet gør.

2026-10-08 blev selve rummet omdøbt fra "Overblik" til **"Det visuelle udtryk for din praksis"**, og denne gang blev både filnavn og identifikator ændret: siden hedder nu `vaekstrum-visuelt-udtryk.html`, og identifikatoren er `vaekstrum-visuelt-udtryk` (i `data-vaekstrum`, `data-room-id`, `fra=vaekstrum-visuelt-udtryk` og som storage-ID, `VISUELT_VAEKSTRUM_ID` i `js/storage/udgangspunkt.js`). "vaekstrum-"-præfikset i identifikatoren er bevidst, så den ikke forveksles med vækstområdets eget slug (`visuelt-udtryk`). `hentUdgangspunkt()` og "vælg rum"-siden læser stadig det gamle storage-ID `"overblik"` som reserve, så browsere fra brugertesten ikke mister deres svar; reserven kan fjernes, før siden går offentligt live.

## Ikke løst her

- **Betalingsmur:** ikke bygget. Strukturen (offentlig forside → "vælg rum"-side → rum) er forberedt til, at et adgangstjek kan lægges på "vælg rum"-siden og alle rum-sider under ét, men selve tjekket findes ikke endnu.
- **Farvetema pr. vækstområde** — delvist bygget 2026-10-08 (branch `feature-doerkarrusel`): hvert vækstområde har nu sin egen dørfarve som CSS custom property (`--omraade-<slug>` i `css/_colors.scss`), brugt af dørkarrusellen på `vaelg-din-dor.html`. Kun lyse varianter, fordi DUF ikke har en mørk tilstand endnu; de mørke varianter og reglen for tekstfarve på døren ligger i `js/data/vaekstomraader.js`. Siden 2026-10-09 bruger Farver områdets farve som markør i den fælles rum-ramme (se "Rum-design" ovenfor). De andre rum følger i fase 2; "vælg rum"-siderne bruger den endnu ikke.
- **"✓ Gennemført"-badgets styling** — ren tekst, ingen ny SCSS. Kosmetisk finish mangler.

## Dørvalget på tværs af vækstområder (`vaelg-din-dor.html`)

Over de enkelte vækstområder ligger DUF's fælles dørvalg, `vaelg-din-dor.html`. Siden viser alle vækstområder som en vandret dørkarrusel (`js/components/doerkarrusel.js`) bygget ud fra én liste, `js/data/vaekstomraader.js`. Hver dør linker til områdets offentlige forside (`vaekstomraade-<omraade>.html`), aldrig direkte til "vælg rum"-siden eller rummene, så reglen ovenfor holder. Et område uden side har `href: null` og vises som en dør med "Kommer snart", der ikke kan klikkes (2026-10-08: Det gode indhold og AI i din praksis). Den gamle "?"-dør er erstattet af et link til Receptionen under karrusellen.

Pins-og-sti-navigationen under karrusellen er en delt komponent (`js/components/pinSti.js`), som navigationslinjerne i vækstrummene også bruger (se "Rum-design" ovenfor).

## Når I bygger det næste vækstområde

Kopiér mønstret: en `vaelg-rum-<omraade>.html`, et lille `js/engine/<omraade>Exit.js` med områdets HUB-konstant, og motorer der importerer den i stedet for at hardkode filnavnet. Den offentlige forside for det nye område skal kun linke videre til dets "vælg rum"-side, aldrig indeholde rum-kortene selv. Får et nyt område sin forside, så udfyld dets `href` i `js/data/vaekstomraader.js`, så døren i karrusellen bliver klikbar.
