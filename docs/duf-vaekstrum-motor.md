# VÆKSTRUM-MOTOR — navigation inde i et vækstområde

*Status: Implementeret 2026-09-07 på branchen `feature-vaekstrum-motor`, som en rettelse af en navigationsbug i Visuelt udtryk. Beskriver et arkitekturmønster, der gælder for ethvert vækstområde — ikke kun Visuelt udtryk — og bør følges, når de næste vækstområder (Branding, Hjemmeside, osv.) bygges.*

## Reglen

Man kan gå IND i et uddybende vækstrum uden at forlade vækstområdet. At gennemføre eller forlade et rum må derfor aldrig sende brugeren til vækstområdets offentlige forside (`vaekstomraade-<omraade>.html`) — kun til noget, der stadig er inde i området.

Konkret betyder det to ting for ethvert vækstområde:

1. **Én "vælg dit rum"-side inde i området**, adskilt fra den offentlige forside. For Visuelt udtryk er det `vaelg-rum-visuelt-udtryk.html`. Den viser det grundlæggende vækstrum, alle uddybende vækstrum (med et "✓ Gennemført"-badge, trukket fra `getSavedVaekstrumIds()` i `js/storage/vaekstrumStorage.js` — intet nyt lager, bare det, der allerede findes), og et link til fælles samling.
   Den offentlige forside (`vaekstomraade-<omraade>.html`) må ikke selv indeholde direkte links til de enkelte rum indlejret på siden — kun ét link videre til "vælg dit rum"-siden. Begrundelse: alt, hvad der ligger inde i området, skal kunne lægges bag en fremtidig betalingsmur på ét sted (mappen/siderne "inde i" området), uden at skulle skille marketingindhold fra rum-adgang bagefter.

2. **Ét centralt navigationsmål pr. vækstområde**, importeret af alle det områdes motorer i stedet for hardkodet. For Visuelt udtryk: `js/engine/vaekstomraadeExit.js` eksporterer `VISUELT_UDTRYK_HUB`. Både `saveAndFinish()` (efter sidste modul) og `exitRoom()` (dør-ikonets "gå ud", efter bekræftelse) i hvert af områdets `*Engine.js`-filer skal bruge den konstant. Byg et tilsvarende lille modul for hvert nyt vækstområde, fremfor at skrive filnavnet direkte i motoren.

## Hvorfor dette blev rettet

Før denne ændring gjorde alle fire uddybende motorer i Visuelt udtryk (`farverEngine.js`, `logoEngine.js`, `billederEngine.js`, `byggestenEngine.js`) det samme: `window.location.href = "vaekstomraade-visuelt-udtryk.html"` — hardkodet 2 steder pr. fil, 8 steder i alt. Det sendte brugeren helt ud af vækstområdet, uanset om rummet var fuldført eller forladt tidligt. Samtidig lå "Eller gå direkte til et vækstrum" (fire rum-kort) og "Klar til at samle op?" (link til fælles samling) direkte på den offentlige forside.

## Delt "gå ud"-dør

`js/components/exitDoor.js` samler markuppen for dør-knappen (`renderExitDoor()`), som før var kopieret i seks filer (hvert rums Ui.js plus Prøverummets `ui.js`). Hver fil har nu en tynd wrapper, der kalder den delte funktion med rummets eget aria-label — ingen ændring af kaldsteder nødvendig. Klik-håndteringen (`bindExit()`) er også flyttet dertil og bruges i fire ud af seks filer; Billeder og Ikoner/fonte & byggesten binder fortsat selv, fordi de har en ekstra "Rettigheder"-knap, hvis binding er flettet sammen med dørens (`bindChrome`) i de to motorer.

## Filnavne på vækstrum

Hvert vækstrums egen HTML-side følger `vaekstrum-<navn>.html` (fx `vaekstrum-farver.html`, `vaekstrum-logo.html`) — gælder både grundlæggende og uddybende rum. `overblik.html` (det grundlæggende rum i Visuelt udtryk) blev omdøbt til `vaekstrum-overblik.html` 2026-09-08 for at følge samme mønster; de to links, der pegede på den gamle fil, er opdateret. Rummets interne identifikator ("overblik", brugt i `data-vaekstrum` og i `fra=overblik`-query-parametre) er ikke det samme som filnavnet og skal ikke ændres, blot fordi filnavnet gør.

## Ikke løst her

- **Betalingsmur:** ikke bygget. Strukturen (offentlig forside → "vælg rum"-side → rum) er forberedt til, at et adgangstjek kan lægges på "vælg rum"-siden og alle rum-sider under ét, men selve tjekket findes ikke endnu.
- **Farvetema pr. vækstområde** (fx dørikon i områdets egen farve) — ikke bygget. Kræver en beslutning om, hvorvidt design-tokens ovenfor skal udvides pr. område, eller forblive fælles for hele DUF.
- **"✓ Gennemført"-badgets styling** — ren tekst, ingen ny SCSS. Kosmetisk finish mangler.

## Når I bygger det næste vækstområde

Kopiér mønstret: en `vaelg-rum-<omraade>.html`, et lille `js/engine/<omraade>Exit.js` med områdets HUB-konstant, og motorer der importerer den i stedet for at hardkode filnavnet. Den offentlige forside for det nye område skal kun linke videre til dets "vælg rum"-side, aldrig indeholde rum-kortene selv.
