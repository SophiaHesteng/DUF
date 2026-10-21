# Prompt til Claude Code: Omdøb sider og saml vækstrum/vækstområder (DUF)

Trello: https://trello.com/c/Lu2jO4Rw (kort #36)

---

## Opgave

Vi omdøber en række sider i DUF-projektet. Samtidig skelner vi ikke længere mellem **vækstområder** og **vækstrum**: alle sider er nu bare sider, uden præfiks. Alle links og referencer mellem siderne skal følge med.

Arbejd på en ny branch: `omdoeb-sider`.

## 1. Omdøb filerne med `git mv`

Brug `git mv`, så historikken bevares.

| Gammelt navn | Nyt navn |
|---|---|
| `faelles-samling-visuel-stil.html` | `visuel-style-guide.html` |
| `docs/duf-faelles-samling-visuel-stil.md` | `docs/duf-visuel-style-guide.md` |
| `vaekstomraade-branding.html` | `branding.html` |
| `vaekstomraade-den-gode-praksis.html` | `den-gode-praksis.html` |
| `vaekstomraade-hjemmeside.html` | `hjemmeside.html` |
| `vaekstomraade-markedsfoering.html` | `markedsfoering.html` |
| `vaekstomraade-produkter-ydelser.html` | `produktudvikling.html` |
| `vaekstomraade-sociale-medier.html` | `sociale-medier.html` |
| `vaekstomraade-visuelt-udtryk.html` | `visuelt-udtryk.html` |
| `vaekstrum-billeder.html` | `billeder.html` |
| `vaekstrum-byggesten.html` | `byggesten.html` |
| `vaekstrum-farver.html` | `farver.html` |
| `vaekstrum-logo.html` | `logo.html` |
| `vaekstrum-visuelt-udtryk.html` | `velkommen-visuelt-udtryk.html` |

**JS-filer** (ret også alle `import`-stier og `<script src>`):

| Gammelt navn | Nyt navn |
|---|---|
| `js/storage/vaekstrumStorage.js` | `js/storage/storage.js` |
| `js/engine/visueltVaekstrumEngine.js` | `js/engine/visueltEngine.js` |
| `js/engine/vaekstomraadeExit.js` | `js/engine/exit.js` |
| `js/data/vaekstomraader.js` | `js/data/doerkarrusel.js` |
| `js/data/faellesSamling.js` | `js/data/visuel-style-guide.js` |

Find selv eventuelle andre JS-filer med `vaekstrum`/`vaekstomraade`/`faellesSamling` i navnet (fx `visueltVaekstrumUi.js`, `data/visueltVaekstrum.js`). List dem og foreslå nye navne, men omdøb dem først, når du har fået svar.

Tjek først, at alle gamle filer findes. Hvis en fil mangler eller hedder noget lidt andet, så stop og spørg i stedet for at gætte.

**Pas på navnesammenfald:** `vaekstomraade-visuelt-udtryk` → `visuelt-udtryk`, men `vaekstrum-visuelt-udtryk` → `velkommen-visuelt-udtryk`. Erstat altid hele det gamle filnavn præcist (med præfiks), aldrig bare `visuelt-udtryk`, ellers bliver links byttet om.

## 2. Ret alle referencer

Søg i hele projektet, også `CLAUDE.md`, `docs/`, `.html`, `.css`, `.js`, `.json` og `.md`, efter:

- alle de gamle filnavne (med og uden `.html`, fx i `href`, `src`, `fetch()`, arrays og objekter)
- `faelles-samling` og `visuel-stil`
- `vaekstomraade`, `vaekstrum`, `vækstområde`, `vækstrum` (også i id'er, klasser, `data-`attributter og variabelnavne)

Ret filnavne og links direkte.

## 3. Synlig tekst: kald det ved emnet

Vi bruger ikke længere begreberne "vækstrum" og "vækstområde" over for brugerne. Det er mere brugervenligt at kalde tingene ved deres emne end at lære brugerne nye begreber.

- Omformulér overskrifter, menupunkter, knapper, brødtekst og `title`/`meta`-tekster, så de nævner emnet direkte. Fx "Vækstrum: Farver" → "Farver", og "Gå til vækstområdet Branding" → "Gå til Branding".
- Hvor begrebet bruges om siderne samlet, så omformulér naturligt (fx "emner" eller bare uden samlebetegnelse), i stedet for at opfinde et nyt begreb.
- Bevar tone og mening i resten af teksten.

## 4. Kode: fjern skellet helt

Ingen andre arbejder i JS lige nu, så du må gerne ændre logikken.

- Omdøb id'er, CSS-klasser, `data-`attributter, variabler, funktioner og datanøgler, der indeholder `vaekstrum`/`vaekstomraade`, til neutrale navne (fx `side`, `emne` eller emnets eget navn).
- Hvis engines behandler vækstrum og vækstområder forskelligt (forskellige lister, typer, engines eller opførsel), så saml dem, så alle sider behandles ens.
- Siderne skal se ud og virke som før, bortset fra navne og tekst. Hvis en sammenlægning vil ændre en sides udseende eller funktion, så stop og spørg.
- Hold ændringerne overskuelige, og skriv korte kommentarer, hvor du har samlet logik, så teamet kan følge med og rette selv.

## 5. Opret to nye sider

- `ai.html`
- `det-gode-indhold.html`

De er på lige fod med `branding.html`, `produktudvikling.html` osv. Byg dem på samme skabelon (brug fx `branding.html` som forlæg): samme head, CSS, JS og footer, men med en tom indholdssektion og en tydelig placeholder-tekst.

- **Sæt dem ikke i navigationen.**
- Tilføj dem de steder, hvor de øvrige emnesider er listet (fx oversigter, kort, datalister i JS), så de behandles ens.

## 6. Tjek at alt virker

1. Søg efter alle gamle filnavne og efter `vaekstrum`, `vaekstomraade`, `vækstrum`, `vækstområde` igen. Der må ikke være nogen tilbage (bortset fra i git-historik).
2. Tjek at alle interne `href`/`src` peger på filer, der findes.
3. Åbn et par af siderne i browseren og klik rundt i navigationen.

## 7. Afslut med en kort rapport

- hvilke filer der er omdøbt og oprettet
- hvilke filer der er rettet links og tekst i
- **alle `.js`-filer, der er ændret, og hvad der er ændret**, inkl. omdøbte funktioner/variabler og sammenlagt logik (til Sophia, så hun kan bygge videre på det)
- tekster, hvor du var i tvivl om omformuleringen

Commit med beskeden: `Omdøb sider og fjern skel mellem vækstrum og vækstområder (#36)`. Push ikke til main.
