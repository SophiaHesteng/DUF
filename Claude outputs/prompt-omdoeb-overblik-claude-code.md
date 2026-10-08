# Prompt til Claude Code: Omdøb vækstrummet "Overblik"

> **Udfyld før du kører prompten:**
>
> - Nyt navn (som brugeren ser det): `Det visuelle udtryk for din praksis` 
> - Teknisk navn (små bogstaver, ingen æøå, bindestreg): `vaekstrum-visuelt-udtryk` 
> - Navn i kode (camelCase / PascalCase): `visueltVaekstrum` / `VisueltVaekstrum` 
>
> Kopiér alt under stregen ind i Claude Code i VS Code.

---

## Opgave

Det grundlæggende vækstrum i vækstområdet **Visuelt udtryk** hedder i dag "Overblik". Navnet skal ændres til **NYT_NAVN**, fordi "overblik" ikke tydeligt signalerer, at rummet handler om det visuelle udtryk.

Hvis feltet øverst stadig står som `NYT_NAVN` / `nyt-slug`, så stop og spørg mig om navnet, før du gør noget.

Læs `CLAUDE.md` og `docs/duf-vaekstrum-motor.md` først.

## Den vigtigste regel: rummets navn ≠ ordet "overblik"

En søgning giver ca. 184 hits, men de er ikke alle sammen rummets navn. Lav **ikke** en blind søg-og-erstat. Gennemgå hvert hit og sortér det i én af disse grupper:

1. **Rummets navn (ændres):** "Overblik" med stort, når det betyder rummet: overskrifter, knapper ("Gå til Overblik"), `<title>`, exit-tekster ("Gå ud af Overblik", "Vil du forlade Overblik?"), kommentarer som "Overbliks kanaler", tekster til brugeren som "Du fortalte i Overblik, at …".
2. **Almindeligt dansk ord (røres ikke):** "et overblik", "få et overblik", "praktisk overblik", "Har du allerede et overblik …", svarmuligheden "Jeg vil helst starte med at få et overblik" og dens option-nøgle `"overblik"` i `js/data/overblik.js`, og afslutningen "Et overblik bliver først rigtig brugbart …". Det er indhold, ikke navnet.
3. **Historik (røres ikke):** brugertest-noter i `docs/brugertest/` og tidligere datoerede noter i `CLAUDE.md`. Det er dokumentation af, hvad der skete dengang.

Er du i tvivl om et hit, så skriv det på en liste og spørg mig, i stedet for at gætte.

## Hvad der skal ændres

### Filer der omdøbes (brug `git mv`, så historikken bevares)
- `vaekstrum-overblik.html` → `vaekstrum-nyt-slug.html`
- `js/data/overblik.js` → `js/data/nytSlug.js`
- `js/engine/overblikEngine.js` → `js/engine/nytSlugEngine.js`
- `js/engine/overblikUi.js` → `js/engine/nytSlugUi.js`
- `docs/duf-manuskript-overblik.md` → `docs/duf-manuskript-nyt-slug.md`

Opdatér alle imports og links, der peger på de gamle filnavne (bl.a. `js/app.js`, `js/data/faellesSamling.js`, `vaekstomraade-visuelt-udtryk.html`, `vaelg-rum-visuelt-udtryk.html`, `CLAUDE.md`'s liste over manuskripter).

### Tekniske ID'er
- `data-vaekstrum="overblik"` i HTML og checket i `js/app.js` → `nyt-slug`
- `data-room-id="overblik"` i `vaelg-rum-visuelt-udtryk.html` → `nyt-slug`
- URL-parameteren `?fra=overblik` (sat i `js/data/overblik.js`, læst i `farverEngine.js`, `logoEngine.js`, `billederEngine.js`) → `?fra=nyt-slug`
- Variabler, egenskaber og nøgler: `OverblikEngine`, `fraOverblik`, `fromOverblik`, `this.overblik` (i `byggestenEngine.js`), `velkomst.fraOverblik` (i `farver.js`, `logo.js`, `billeder.js`), `OVERBLIK_VAEKSTRUM_ID`, CSS-id'et `overblik-panel-…` osv. → tilsvarende med det nye navn. Hold dig til de eksisterende navngivningsmønstre.

### Gemte data (pas på her)
`js/storage/udgangspunkt.js` gemmer og læser rummets output i browseren under ID'et `"overblik"`. Skifter vi ID, kan browsere, der allerede har været igennem rummet (fx fra brugertest), ikke finde deres svar igen.

Gør derfor sådan:
- Skift `OVERBLIK_VAEKSTRUM_ID` til det nye navn og ID (`nyt-slug`).
- I `hentUdgangspunkt()`: hvis der ikke findes noget under det nye ID, så prøv det gamle `"overblik"` som reserve. Markér det med en kommentar om, at reserven kan fjernes, før siden går offentligt live.
- Tjek om `faellesSamling.js` eller andre steder også læser output via ID'et, og giv dem samme reserve.

**OBS:** `udgangspunkt.js` bruger allerede ordet "udgangspunkt" om brugerens svar i Boble 1.2. Hvis det nye navn også indeholder "udgangspunkt", så sørg for, at kommentarer og variabelnavne stadig gør det tydeligt, hvornår der menes *rummet* og hvornår der menes *svaret*.

### Dokumentation
- Opdatér rummets navn i alle aktive docs i `/docs` (manuskripterne for Farver, Logo, Billeder, Byggesten, Fælles samling, `duf-vaekstrum-motor.md`, `duf-core-context.md`), efter reglen om de tre grupper ovenfor.
- I `CLAUDE.md`: ret listen over manuskripter og omtalen af rummet. Lad den gamle note om omdøbningen d. 2026-09-08 stå, og tilføj en ny dateret note om denne omdøbning (gammelt navn → nyt navn, hvilke filer der er omdøbt, og at der er en reserve for det gamle storage-ID).

## Arbejdsgang
- Arbejd på branchen `claude-testing`. Rør ikke `main`.
- Commit ikke, og push ikke. Jeg kigger ændringerne igennem først.
- Når du er færdig, så søg efter "overblik" (uden forskel på store og små bogstaver) i hele projektet igen, og vis mig de hits, der er tilbage, sorteret i de tre grupper. Så kan jeg se, at alle de tilbageværende hits er bevidste.
- Åbn `vaelg-rum-visuelt-udtryk.html` → det omdøbte rum → gennemfør det → gå videre til Farver, og tjek at velkomstteksten "fra [nyt navn]" vises. Tjek også at Byggesten og Billeder stadig kan se svarene fra rummet.

## Opsummering til mig
Skriv kort på dansk:
- hvilke filer der er omdøbt
- hvor mange steder navnet er ændret, fordelt på kode / tekst til brugeren / docs
- hvilke hits du bevidst har ladet stå, og hvorfor
- de hits du var i tvivl om
