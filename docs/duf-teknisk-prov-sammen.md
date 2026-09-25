# TEKNISK — Byggesten-forhåndsvisning ("Prøv dem sammen")

*Status: Spec 2026-09-23. Opstået i forbindelse med [[DUF Manuskript-revision - Byggesten]], Modul 6 ("Prøv dem sammen"), som ikke findes i noget andet rum i dag. **Ændret 2026-09-25 (Heidis beslutning efter brugertest 1):** komponenten udvides med et valgfrit billede og genbruges i Billeder, Boble 8.1, som en fælles forhåndsvisning af brugerens valg. Den oprindelige beslutning fra 2026-09-23 om, at den skulle være helt selvstændig, gælder dermed ikke længere for Billeder. Den deler stadig ikke kode med Farvers levende forhåndsvisning (Modul 6, Boble 6.4), Logos statiske småt/gråtone/baggrund-visning (Modul 7) eller [[DUF Teknisk - Skrifttype-vælger (fontvælger med Google Fonts)]]. **Opdateret 2026-09-23:** ikonets kilde er besluttet (Heidis spørgsmål 3, runde 4) — se nedenfor.*

## Baggrund

Byggestens nye modulstruktur (se [[DUF Manuskript-revision - Byggesten]]) lader brugeren vælge frit, hvilke af de tre emner — ikoner, fonte, andre byggesten — hun vil arbejde med. Det gør det nødvendigt at samle resultatet ét sted, så hun kan se, om de valg, hun har taget hver for sig, rent faktisk fungerer sammen. Uden det ville rummet ende med tre isolerede beslutninger uden noget fælles øjebliksbillede.

Komponenten viser derfor et lille, sammensat eksempel — en overskrift, en kort brødtekst, et ikon, en eventuel anden detalje — bygget udelukkende af de valg, brugeren faktisk har taget. Har hun en gemt palet fra Farver og/eller et logo, vises de også, så sammenhængen med resten af hendes visuelle udtryk bliver synlig her — i stedet for i et selvstændigt "sammenhæng"-modul, som det gamle manuskript havde.

**Tilføjet 2026-09-25:** I brugertest 1 havde brugeren intet at prøve sin billedretning af på (Billeder 8.1). Samme kort, med et billede øverst, giver hende en forhåndsvisning af "sådan kunne det se ud", uden at hun behøver en hjemmeside eller et opslag.

## Ikonet i forhåndsvisningen (besluttet 2026-09-23)

Ikonet skal være et **konkret ikon, hentet fra Material Symbols** (samme kilde, Modul 3 allerede anbefaler) — ikke en generisk, stiliseret repræsentation af stilen.

Material Symbols understøtter heldigvis næsten præcis de fire følelser, Boble 3.1 tilbyder, som indbyggede stil-akser:

- **Enkle streger** → stilen "Outlined", fyld = 0
- **Fyldte ikoner** → fyld = 1 (på den stil, brugeren ellers har valgt, som udgangspunkt "Outlined")
- **Runde og bløde** → stilen "Rounded"
- **Skarpe og geometriske** → stilen "Sharp"

**Bygget (Byggesten runde 7, 2026-09-25):** Kortlægningen ligger ét sted, i `js/components/materialIkoner.js` (`IKON_STILE`), og bruges både her og i Byggesten 1.2, 3.1, 3.5 og 7.1, så brugeren ser de samme ikoner hele vejen. Byggesten viser tre eksempel-ikoner (`call`, `calendar_month`, `spa`); forhåndsvisningen bruger ét af dem, `calendar_month`, ved siden af tekstlinjen. Den tidligere pladsholder (en stiplet firkant) er fjernet. Ikonerne hentes fra Google Fonts med `icon_names`, så kun de tre ikoner downloades. Uden internet står ikonets navn som tekst.

*Note til design/udvikling:* Material Symbols' egne akser (stil: Outlined/Rounded/Sharp × fyld: 0/1) er strengt taget to uafhængige valg, mens Boble 3.1 kun tilbyder ét samlet valg. Det er en bevidst forenkling for brugeren — hun skal ikke vælge på to akser samtidig. Kortlægningen ovenfor er standardvalget for hver af de fire følelser. Det konkrete ikon-motiv (fx et blad, en snak-boble, et hjerte) vælges af den, der bygger forhåndsvisningen, ud fra hvad der passer til Byggestens egen visuelle stil — det er ikke noget, brugeren selv vælger her.

## Hvad komponenten IKKE er

- Den er ikke en fuld side-builder eller et redigerbart layout — kun et fast, lille eksempel-kort, der viser de valgte elementer sammen.
- Den er ikke en garanti for, at kombinationen "virker" i alle sammenhænge — det er brugerens egen vurdering (jf. Boble 6.2's "Hvordan føles det?"), ikke en automatisk bedømmelse.
- Den forsøger ikke at vise elementer, brugeren ikke har arbejdet med. Sprang hun Ikoner over i Modul 2, vises der intet ikon her — der gættes ikke på brugerens vegne.

## Datamodel

Komponenten er ren visning — den opretter ingen ny data, kun sammensætning af det, der allerede er gemt:

- `fontOverskrift`, `fontBroedtekst` (fra Byggesten Modul 4, hvis besøgt)
- `ikonFoelelse` (fra Byggesten Modul 3, hvis besøgt) — mappes til Material Symbols' stil + fyld-akse, jf. ovenfor
- `andenDetalje` / `andenRetning` (fra Byggesten Modul 5, hvis besøgt)
- Gemt palet fra Farver og/eller logo fra Logo, hvis de findes (læses, ændres ikke)
- **Nyt 2026-09-25:** `billede` (valgfrit) — et billede, brugeren har valgt i Billeder 8.1 fra "Billeder fra min praksis" eller "Min inspiration"
- Selve vurderingen (`provetSammenResultat`, `tilbageTil[]`) hører til boble-logikken i Byggesten Modul 6, ikke til visningskomponenten.

## Visuel opførsel

- Et lille "kort", der viser: en kort overskrift i den valgte overskriftsfont, en kort brødtekstlinje i den valgte brødtekstfont, et konkret Material Symbols-ikon i den mappede stil ved siden af en kort tekstlinje, og en visuel antydning af den anden byggesten (fx en streg under overskriften), hvis valgt.
- **Nyt 2026-09-25:** Er der et billede, vises det øverst i kortet (som på et opslag eller en forside), med overskrift og brødtekst under.
- Manglende elementer udelades helt — kortet tilpasser sig til kun de emner, brugeren faktisk har valgt, i stedet for at vise tomme pladsholdere. Mangler både fonte og palet (fx en bruger, der kun har været i Billeder), vises billedet med neutral tekst i DUF's egne standardfarver og -fonte.
- Har brugeren en gemt palet: kortets farver (baggrund, tekst, ikon) hentes derfra. Har hun også et logo, vises det ved siden af kortet, ikke inde i det.
- Ingen ekstern afhængighed ud over Material Symbols (via Google Fonts) og en eventuel skrifttype indlæst via fontvælgeren — selve sammensætningen er almindelig HTML/CSS/JS, samme tilgang som Farvers palet-bygger og forhåndsvisning.

## Foreslået placering i koden

`js/components/provSammen.js`, egen fil:

```
renderProvSammen(container, {
  fokusvalg: ["ikoner", "fonte"], // fra Byggesten Modul 2 — styrer hvilke felter der vises (udelades i Billeder)
  ikon: { foelelse: "..." }, // mappes internt til Material Symbols stil + fyld
  fonte: { overskrift: "...", broedtekst: "..." },
  andenByggesten: { ... }, // valgfri
  billede: { src: "...", alt: "..." }, // valgfri, nyt 2026-09-25 (Billeder 8.1)
  gemtPalet: hentGemtPalet("farver"), // valgfri
  gemtLogo: hentGemtLogo("logo") // valgfri
});
```

I Billeder hentes fonte og ikon fra Byggestens gemte data, hvis de findes.

## Hvor den bruges i dag

- **Byggesten, Modul 6** ("Prøv dem sammen").
- **Byggesten, Boble 7.1** ("Sådan ser det ud") — samme kort i lille størrelse (CSS-klassen `.prov-sammen-lille` på containeren), fra runde 7, 2026-09-25.
- **Billeder, Boble 8.1** ("Sådan kunne det se ud") — fra runde 7, 2026-09-25.

**CSS (runde 7):** Kortets småtekster (noter, "Din palet", ikonteksten) står i rummets brødtekst-skrift, Manrope. Overskrift og brødtekst får stadig brugerens valgte fonte. Paletten ved siden af kortet bruger klassen `.palette-swatches` (før `.palette-preview`, som også var navnet på Farvers store forhåndsvisning i 6.4 og gav en tom ramme her).

## Åbne spørgsmål

- Skal kortets layout (overskrift/brødtekst/ikon/detalje) være fast, eller variere en smule afhængigt af, hvilke emner brugeren faktisk har valgt (fx et bredere kort, hvis kun fonte er valgt)?
- ~~Skal komponenten kunne genbruges direkte i Modul 7's opsummering?~~ Ja, afgjort i Byggesten runde 7: 7.1 viser kortet i lille størrelse.
- Hvilke konkrete ikon-motiver skal bruges i eksemplet? Indtil videre `calendar_month`, et af de tre eksempel-ikoner fra Byggesten runde 7. Kan stadig skiftes, når Marcus har kigget på Byggestens visuelle stil.
- **Nyt:** Senere kan billedvælgeren også få et lille DUF-arkiv med frie billeder som kilde (besluttet 2026-09-25, ikke bygget endnu).
