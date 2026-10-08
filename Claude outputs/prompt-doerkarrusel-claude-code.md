# Prompt til Claude Code: Dørkarrusel på vaelg-din-dor.html

*Opdateret 2026-10-08 ud fra den oprindelige prompt fra 2026-09-16 (projektdokumentet "DUF Prompt - Dørkarrusel (vaelg-din-dor)"). Rettet til de nuværende navne og filer og til Heidis beslutninger 2026-10-08: alle 9 døre, to af dem uden link endnu; dørene bruger sidernes egne navne; "?"-døren bliver et link under karrusellen.*

*Trello-kort: "Byg dørkarrusellen på vaelg-din-dor.html" (listen Kode). Flyt kortet til Færdig, når det er merget.*

Kopiér alt under stregen ind i Claude Code i VS Code.

---

## Opgave

Siden **`vaelg-din-dor.html`** viser i dag vækstområderne som et gitter af dør-billeder (`img/door-*.png`) med en "?"-dør i midten. Den skal erstattes af en **vandret dørkarrusel**: ét dørkort pr. vækstområde, hvor kun accentfarven skifter fra dør til dør. Resten af designet (dørform, kortopbygning, typografi og afstand) er ens på alle kort.

## Før du går i gang

- Lav en ny branch ud fra `main`. Spørg mig om navnet, før du opretter den. Gæt ikke selv.
- Læs først:
  - `CLAUDE.md` og `docs/duf-vaekstrum-motor.md`
  - `vaelg-din-dor.html` som den ser ud nu
  - `js/components/exitDoor.js`, `js/engine/vaekstomraadeExit.js` og `vaelg-rum-visuelt-udtryk.html`
  - de eksisterende design-tokens i SCSS (`--primaer-cta`, `--handling-vaekstrum` osv.)

  Det, du bygger, skal følge samme opdeling, samme navngivning af filer og tokens og genbruge de delte komponenter, der allerede findes, i stedet for at opfinde nye.
- `vaelg-din-dor.html` er hele DUF's dørvalg, ikke kun ét områdes. Søg efter alt, der linker til siden (bl.a. `js/components/header.js` og knapper i rummene), så de links ikke går i stykker.
- **Dørformen:** brug den rigtige vektor-SVG fra Figma, node "doorbasic 1" i filen `SgxEdyKgAki2xY5iZRq9Wn`, node-id `1015:234` (https://www.figma.com/design/SgxEdyKgAki2xY5iZRq9Wn/Wireframe?node-id=1015-234). Hent den via Figma-integrationen, hvis du har adgang. Der ligger allerede en fil, der hedder `img/doorbasic 1.svg`. Tjek, om det er den samme form, og brug den i så fald. Brug ægte path-data, ikke en tilnærmet tegning. Dørens ramme, panelstreger og håndtag er ens på alle kort. Kun dørens fyldfarve skifter pr. område.
- **Visuel opførsel** (scroll/snap, pile, pins, tastatur, reduceret bevægelse) er vist i denne mockup: https://claude.ai/artifact/CeQvedUSmLE3kbVTimGFBP. Kan du ikke åbne den, så følg beskrivelsen under "Funktionalitet".
- Er noget uklart, så spørg. Gæt ikke.

## Indhold: 9 døre

Navnet på døren er det samme som overskriften på områdets egen side. To områder har ingen side endnu. De vises som døre, men kan ikke klikkes, og de har en lille tekst "Kommer snart".

| # | Titel på dør | Undertekst | Link |
|---|---|---|---|
| 1 | Visuelt udtryk for din praksis | Farver, billeder, logo og de mindre detaljer, der binder det hele sammen. | `vaekstomraade-visuelt-udtryk.html` |
| 2 | Branding | Hvem du er, hvad du står for, og hvordan du viser det frem. | `vaekstomraade-branding.html` |
| 3 | Markedsføring | Bliv fundet af dem, du bedst kan hjælpe. | `vaekstomraade-markedsfoering.html` |
| 4 | Den gode praksis | Det håndværk, der ligger mellem selve behandlingerne. | `vaekstomraade-den-gode-praksis.html` |
| 5 | Produkter & ydelser | Byg og skru på det, du reelt tilbyder. | `vaekstomraade-produkter-ydelser.html` |
| 6 | Hjemmeside | Din hjemmeside som et sted, folk nemt kan finde vej. | `vaekstomraade-hjemmeside.html` |
| 7 | Det gode indhold | Skriv og del det, der rent faktisk hjælper nogen. | *ingen endnu: "Kommer snart"* |
| 8 | Sociale medier | Vær til stede, uden at det tager livet af dig. | `vaekstomraade-sociale-medier.html` |
| 9 | AI i din praksis | Brug det som et værktøj, ikke en erstatning for dig. | *ingen endnu: "Kommer snart"* |

**Døre uden link:**
- Ikke et `<a>`-element og ikke fokuserbare som link.
- "Kommer snart" skal stå som synlig tekst, ikke kun vises med farve eller nedtoning.
- Kan stadig nås i karrusellen og via pins, så brugeren kan se, at området er på vej.

Lav dørenes data som én liste (fx i `js/data/`), så de to nye områder senere kun kræver, at man tilføjer et link.

## Under karrusellen: link til Receptionen

"?"-døren fra det gamle gitter bliver ikke en dør. I stedet kommer der et tydeligt link under karrusellen, fx:

> **Ved du ikke, hvor du skal begynde?** Gå til Receptionen

Linket peger på `receptionen.html`. Brug en af de eksisterende knap-varianter fra CLAUDE.md (fx slim outline-green). Opfind ikke en ny stil.

## Farvepalet

Paletten er tjekket for farveblind-adskillelse og kontrast. Hvert område har en lys og en mørk variant og en regel for tekstfarven på døren:

| Område | Lys tilstand | Mørk tilstand | Tekst på døren |
|---|---|---|---|
| Hjemmeside | `#2A78D6` | `#3987E5` | mørk |
| Visuelt udtryk for din praksis | `#EB6834` | `#D95926` | mørk |
| Sociale medier | `#1BAF7A` | `#199E70` | mørk |
| Det gode indhold | `#EDA100` | `#C98500` | mørk |
| Den gode praksis | `#8B4513` | `#9C5518` | lys/hvid |
| Markedsføring | `#E87BA4` | `#D55181` | mørk |
| Produkter & ydelser | `#008300` | `#008300` | lys/hvid |
| AI i din praksis | `#4A3AA7` | `#9085E9` | lys/hvid |
| Branding | `#E34948` | `#E66767` | mørk |

Lav dem som CSS custom properties i samme stil som de eksisterende tokens, navngivet efter filernes slugs, fx `--omraade-visuelt-udtryk`, `--omraade-hjemmeside`, `--omraade-produkter-ydelser`, `--omraade-det-gode-indhold`, `--omraade-ai`. Lys og mørk variant skal følge det mønster, CSS'en allerede bruger til tema. Hvor tekst eller ikon står direkte på farven, skal tekstreglen i tabellen følges. Brug ikke én fast tekstfarve til alle ni.

## Funktionalitet

- Vandret karrusel med scroll-snap, hvor man kan se lidt af nabodørene, og pile til forrige og næste.
- Under karrusellen: en klikbar navigation med pins og en sti imellem. Det aktive trin markeres med en grøn ring. Det er det samme visuelle sprog, som er planlagt til navigationslinjerne i rummene. Styling (pin-størrelse, stiens streg, ringens farve) skal hentes fra Figma-filens "Navigation"-komponent eller de eksisterende tokens, ikke opfindes til lejligheden. Navigationslinjerne i rummene er ikke bygget endnu, så byg pin-og-sti som en lille delt komponent, de senere kan genbruge.
- Klik på en pin eller brug piletasterne (venstre/højre) for at hoppe direkte til en dør.
- Swipe og træk på touch-skærme.
- `prefers-reduced-motion`: spring den bløde scroll over, og hop direkte.
- Skal fungere ned til ca. 400 px bredde. Trykflader skal være mindst 44 px.

## Uden for scope

- Rør ikke forberedelsen til betalingsmuren, IndexedDB-lagringen af fremskridt eller navigation og anbefalinger på tværs af rum.
- Byg kun dørkarrusellen, dens data (de 9 områder og farvetokens), linket til Receptionen og ændringen af `vaelg-din-dor.html`. Lav ikke sider eller indhold til "Det gode indhold" eller "AI i din praksis".
- De gamle `img/door-*.png` må ikke slettes i denne omgang. Notér bare, om de stadig bruges andre steder.

## Arbejdsgang

- Arbejd kun på den nye branch. Rør ikke `main`.
- Commit ikke, og push ikke. Jeg kigger ændringerne igennem først.
- Er der noget i `docs/`, der beskriver `vaelg-din-dor.html` eller dørvalget, så opdatér det også, jf. CLAUDE.md.

## Før du melder færdig

Skriv kort på dansk:
- hvilke filer du har oprettet eller ændret
- om `img/doorbasic 1.svg` var den rigtige dørform, eller om du hentede en anden
- en manuel testliste, jeg kan gå igennem i browseren:
  - pin-klik rammer den rigtige dør
  - piletaster og tastaturfokus virker
  - de to "Kommer snart"-døre kan ikke klikkes, og teksten kan ses
  - linket til Receptionen virker
  - mobilbredde (ca. 400 px) og swipe
  - mørk tilstand og tekstfarverne pr. dør
  - reduceret bevægelse
  - eksisterende links til `vaelg-din-dor.html` virker stadig
