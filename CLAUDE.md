# DUF — Din Ugentlige Fridag

Digital learning center for alternative-medicine practitioners in Denmark, helping them handle the "entrepreneur" side of running a practice so they can focus on the actual healing work. Built by three people: Heidi (vision/product), plus two collaborators focused on development and design.

Site: 7 marketing/content pages + a blog (Biblioteket) + the digital learning center itself, which is made of many "vækstrum" (rooms) connected by branching logic in JavaScript.

Stack: plain HTML, CSS/SCSS, JavaScript. No framework. Don't introduce React/Tailwind/etc. — if you pull anything from the Figma MCP connector (which returns React+Tailwind by default), adapt it to this stack rather than pasting it as-is.

Full context docs live in `/docs` — read the relevant one before working on anything content- or architecture-related, not just this summary:
- [docs/duf-core-context.md](docs/duf-core-context.md) — the foundational doc. Read this first.
- [docs/duf-vaekstomraade-context.md](docs/duf-vaekstomraade-context.md) — template for a vækstområde (room category).
- [docs/duf-vaekstrum-faelles-context.md](docs/duf-vaekstrum-faelles-context.md) — fields/principles shared by every vækstrum.
- [docs/duf-vaekstrum-grundlaeggende-context.md](docs/duf-vaekstrum-grundlaeggende-context.md) — specific to foundational rooms.
- [docs/duf-vaekstrum-uddybende-context.md](docs/duf-vaekstrum-uddybende-context.md) — specific to deep-dive rooms.
- [docs/duf-vaekstrum-motor.md](docs/duf-vaekstrum-motor.md) — how navigation *between* rooms inside a vækstområde works (the shared "vælg rum" hub page, the per-area exit constant, the shared exit-door component). Read this before touching a room's `saveAndFinish()`/`exitRoom()`, the public forside's links, or when building a new vækstområde's navigation.

The docs above are templates — they define structure and fields, not a specific room's content. When a vækstrum has an actual manuskript (concrete screen-by-screen text, questions, and branching logic), read that too before building it, don't derive content from the template alone:
- [docs/duf-manuskript-visuelt-udtryk.md](docs/duf-manuskript-visuelt-udtryk.md) — Det visuelle udtryk for din praksis (formerly "Overblik"), the grundlæggende vækstrum that opens Visuelt udtryk for din praksis.
- [docs/duf-manuskript-farver.md](docs/duf-manuskript-farver.md) — Farver, an uddybende vækstrum under Visuelt udtryk for din praksis.
- [docs/duf-manuskript-logo.md](docs/duf-manuskript-logo.md) — Logo, an uddybende vækstrum under Visuelt udtryk for din praksis.
- [docs/duf-manuskript-billeder.md](docs/duf-manuskript-billeder.md) — Billeder, an uddybende vækstrum under Visuelt udtryk for din praksis.
- [docs/duf-manuskript-byggesten.md](docs/duf-manuskript-byggesten.md) — Ikoner, fonte & andre grafiske byggesten, an uddybende vækstrum under Visuelt udtryk for din praksis.

That's Det visuelle udtryk for din praksis (opening) plus all four uddybende vækstrum in Visuelt udtryk for din praksis. The vækstområde's closing screen has its own spec too, but it isn't a vækstrum itself — read this before building it, not the manuskripts above:
- [docs/duf-visuel-style-guide.md](docs/duf-visuel-style-guide.md) — Visuel style guide (page: `visuel-style-guide.html`), the closing screen for Visuelt udtryk for din praksis. Deliberately has no vækstrum ID or type (see the doc for why) — covers what it collects from the four vækstrum above, the shared "save to visual guide" approach (client-side, opt-out browser storage), and a proposed PDF export.

## Structure

`DUF → Vækstområde → Vækstrum`. A vækstområde (e.g. Branding, Hjemmeside) has a fixed opening + closing with flexible movement between curated vækstrum in between. A vækstrum is a small, self-contained guided flow (branching, reflection, small exercises) with one home area, optional connections elsewhere, a type (`grundlæggende` or `uddybende`), and an ID like `BRA-VIS-001`. Full detail in the docs above — don't invent structure that isn't there; ask if something's unclear.

Navigation *between* a vækstområde's rooms (finishing one, leaving one early, choosing one directly) is its own concern from the content structure above — see [docs/duf-vaekstrum-motor.md](docs/duf-vaekstrum-motor.md). Short version: a vækstområde's public forside (`<emne>.html`, e.g. `visuelt-udtryk.html`) never lists its rooms directly — it links to a separate "vælg rum" page (e.g. `vaelg-rum-visuelt-udtryk.html`), which is where a future payment gate will sit. A room's `saveAndFinish()`/`exitRoom()` must always send the user to that hub page, never to the public forside — the constant lives in one small module per area (e.g. `js/engine/exit.js`), never hardcoded per engine.

Every vækstrum screen sits in a shared frame: a top bar with the area mark, a module line and a bubble line (pin-and-path), a content card and a button row with "Tilbage". It is built from `js/components/rumRamme.js`, `js/components/navLinje.js` (on top of `pinSti.js`), `js/engine/rumHistorik.js` (the user's route, jumps back and "Bliv i rummet") and `css/_rum.scss`. There is also a guide-bubble component, `js/components/guide.js`, used where a guide line has a name (`guideAvatar`, e.g. in Logo and Byggesten). As of 2026-10-09 all five vækstrum in Visuelt udtryk for din praksis use the frame (built on the `rum-design` branch, one commit per room). Details are in [docs/duf-vaekstrum-motor.md](docs/duf-vaekstrum-motor.md), under "Rum-design".

Every page is named after its topic, with no prefix: `<navn>.html` (e.g. `farver.html`, `logo.html`, `branding.html`). This applies to rooms and areas alike — use it for any new page. A grundlæggende room that opens an area is named `velkommen-<omraade>.html` (e.g. `velkommen-visuelt-udtryk.html`), so it doesn't clash with the area's own forside.

"Vækstrum" and "vækstområde" are internal structure terms for the team and the docs only. Since 2026-10-15 (Trello #36) they are not used in user-facing text (pages are called by their topic, or "emner" when a collective word is needed) or in code (neutral names like `side`, `sideId`, `data-side`; comments say "rum" and "emne"). Don't reintroduce them in either place.

## The 7 pages

Forside, Om Os, Kontakt, Spørgehjørnet, Biblioteket (the blog — articles/guides/small exercises), Receptionen (entry point into the learning center), Prøverummet (a free trial room for people who haven't committed yet).

## Voice and content rules (see duf-core-context.md for full detail)

- Tone: human, calm, clear, warm, direct, curious, non-judgmental. Never hype, urgency, or "you just need to…" language.
- DUF acts as a mentor-friend walking *beside* the user, not an authority walking ahead of them. It never decides things for the user.
- Small steps over big leaps; direction before more information; progress over perfection.
- When generating room content, AI should ask clarifying questions rather than guessing when context (topic, user starting point, desired movement, likely barriers) is missing — see "Når AI udvikler indhold" in the core context doc.
- Don't treat every identified content gap as an automatic new vækstrum — that's an insight for the team, not an automatic build task.

## Design tokens

Pulled from the Figma file's "Design System" page (not just one frame) on 2026-09-03 — this is the authoritative palette, more complete than what shows up on any single page:

```
--grundlaeggende-baggrund: #fef3e8   /* base page background */
--tekstfarve:              #0f201b  /* primary text */
--primaer-cta:              #0c3a2d  /* navigation & primary CTA (dark green) */
--handling-vaekstrum:        #de5b23  /* action / "enter a room" CTA (orange) */
--kort-baggrund:            #e8ecd1  /* card background (sage) */
--sticker-baggrund:          #ffe6d6  /* decorative background */
--duf-kerne-baggrund:        #b1bca0  /* "DUF core" background */
--valg-baggrund:             #fbceb1  /* "choice" background */
--outline:  rgba(15, 32, 27, 0.6)
--dropshadow: rgba(15, 32, 27, 0.4)
```

Fonts actually applied (not the exploratory "FONTE" comparison section on the Design System page, which doesn't match what's live): **Nova Flat** for section headings (uppercase), **Manrope** for subheadings (ExtraLight) and body copy (Regular), **Outfit** for buttons, **Poiret One** for the header wordmark. Confirm with the team if this is still the intended pairing.

## Button component

There's one shared button component in Figma ("Knapper") with 7 variants — don't invent new button styles, use these:

- Two sizes: **regular** (25px/10px padding, ~1000px radius) and **slim** (32px/5px padding, 100px radius).
- Fills: solid orange (`--handling-vaekstrum`), solid green (`--primaer-cta`), "light orange" (`--valg-baggrund` bg, orange border, dark text), outline-orange (transparent, orange border+text), outline-green (transparent, green border+text).
- All: Outfit Regular 16px, 0.05em letter-spacing, 2px border, drop-shadow `0 4px 2px rgba(0,0,0,.25)` on solid fills / `0 4px 4px rgba(0,0,0,.25)` on outlines.

See `styles/_tokens.scss` and `styles/forside.scss` (from the Forside prototype) for a working implementation of both the tokens and the button variants.

## Keeping docs in sync with code

If a code change alters behavior, flow, or content that a doc in `/docs` describes, update that doc to match as part of the same change, and call out in your summary which doc(s) you updated and why. If it's unclear whether the doc or the code should be treated as the source of truth for a given discrepancy, ask rather than picking one — sometimes the doc is stale, sometimes the code just hasn't caught up to what the doc already specifies.

## Arbejdsgang med Claude: kode skal kunne forstås uden AI

Besluttet af teamet 2026-10-11 og godkendt af Sophia. Sophia har det sidste ord, hvis dette afsnit skal ændres.

Formål: Heidi og Sophia skal altid selv kunne finde ud af, hvor de skal gå ind og rette eller opdatere, så DUF ikke er afhængig af, at Claude eller anden AI koder. Teamet vil lære nye måder at kode på undervejs. Skriv derfor forklaringer på dansk, i almindelige ord, og forklar fagudtryk første gang de bruges.

### Forklaringen ligger i tre lag

1. **Kommentarer i koden** forklarer *hvorfor* noget er lavet sådan, ikke *hvad* linjen gør. Kort og på dansk. Ingen kommentarer, der bare gentager koden.
2. **Commit-besked og pull request** for hver opgave: hvad blev ændret, hvorfor, og hvor man skal gå ind næste gang, man vil rette noget lignende (filnavne og funktionsnavne). Har Claude brugt en teknik, teamet ikke har set før i projektet, får forklaringen en kort **"Nyt begreb"**-boks: hvad det er, og hvorfor det blev brugt her.
3. **`SÅDAN-VIRKER-DET.md`** i repoets rod er den levende oversigt over, hvor tingene ligger, og hvordan de hænger sammen. Opdatér den i samme ændring, når en ændring flytter, tilføjer eller fjerner noget, den beskriver. Findes filen ikke endnu, så opret den første gang, den er relevant.

En forklaring, der kun står i en chat, tæller ikke. Den skal ligge i repoet.

### Branches og opgaver

- Alle opgaver, også kodeopgaver, ligger som kort i teamets Trello-board. Repoet har ingen egen to-do-liste.
- Arbejd aldrig direkte på `main`. Opret en ny branch fra `main` for hvert Trello-kort, navngivet `kort-<nr>-<kort-navn>` (fx `kort-23-navigation`), så kode og kort kan spores til hinanden.
- Kortet må først flyttes til Review, når ændringen er testet på mobil og desktop, og forklaringen er skrevet i alle tre lag. Heidi godkender i Review, og først derefter merges der til `main`. På sigt overtager Sophia godkendelsen af kode.

## Known open questions (as of 2026-09-03)

- Header navigation ("map" icon) isn't wired up yet. The Figma file has a "Navigation" component (a site-map graphic) listing all real page names — worth building the header nav from that rather than guessing.
- Several internal links in the current Forside prototype are best-guesses, not confirmed IA (flagged as TODO comments in index.html) — confirm actual destinations with the team before treating them as final.
- `forside.html` was renamed to `index.html` (seen while merging this file 2026-09-08) but `js/components/header.js` still links to `forside.html` in two places (the header logo and the "Forsiden" map-nav entry) — those are currently broken links. Not fixed here since the rename looked like in-progress work; update `header.js` to point at `index.html` once the rename is confirmed final.
- `overblik.html` was renamed to `vaekstrum-overblik.html` on 2026-09-08, to match the `vaekstrum-<navn>.html` pattern already used by the four uddybende rooms. The two links that pointed to it (`vaekstomraade-visuelt-udtryk.html`, `vaelg-rum-visuelt-udtryk.html`) were updated. `js/app.js`'s `data-vaekstrum === "overblik"` check and the `fra=overblik` query param used by the other engines are room *identifiers*, not the filename, so those were correctly left as-is. The old `overblik.html` file itself couldn't be deleted from here (no delete access in this session) — it's now an inert duplicate; safe to delete by hand.
- On 2026-10-08 the grundlæggende vækstrum "Overblik" was renamed to **"Det visuelle udtryk for din praksis"** (the old name didn't signal that the room is about the visual expression). Files renamed with `git mv`: `vaekstrum-overblik.html` → `vaekstrum-visuelt-udtryk.html`, `js/data/overblik.js` → `js/data/visueltVaekstrum.js`, `js/engine/overblikEngine.js` → `js/engine/visueltVaekstrumEngine.js`, `js/engine/overblikUi.js` → `js/engine/visueltVaekstrumUi.js`, `docs/duf-manuskript-overblik.md` → `docs/duf-manuskript-visuelt-udtryk.md`. Unlike the 2026-09-08 rename, the room *identifier* changed too this time: `"overblik"` → `"vaekstrum-visuelt-udtryk"` (in `data-vaekstrum`, `data-room-id`, `?fra=` and as the storage ID `VISUELT_VAEKSTRUM_ID`); the `vaekstrum-` prefix keeps it distinct from the vækstområde's own `visuelt-udtryk` slug. Code names: `VisueltVaekstrumEngine`, `fraVisueltVaekstrum`, `this.visueltVaekstrum`. `hentUdgangspunkt()` (`js/storage/udgangspunkt.js`) and the "vælg rum" hub's ✓ badge (`js/vaelgRumVisueltUdtryk.js`) used to fall back to the old storage ID `"overblik"` so browsers from the user tests kept their answers; that fallback was removed on 2026-10-09 before the site went live, so answers saved under the old ID are no longer read. The ordinary Danish word "overblik" in room content (e.g. the Boble 1.2 option "Jeg vil helst starte med at få et overblik" and its option key `"overblik"`) is content, not the room name, and was deliberately left as-is.
- On 2026-10-08 the vækstområde itself was given one display name: **"Visuelt udtryk for din praksis"**. Before this it went by three names: "Visuel stil" (internal, in docs), "Dit visuelle udtryk" (planned user-facing name) and "Visuelt udtryk" (in the code). The area and its grundlæggende vækstrum ("Det visuelle udtryk for din praksis") now have near-identical names; this is deliberate (Heidi's decision). Only the displayed name changed: file names and slugs (`vaekstomraade-visuelt-udtryk.html`, `vaelg-rum-visuelt-udtryk.html`, `VISUELT_UDTRYK_HUB`) are unchanged, and `faelles-samling-visuel-stil.html` / `docs/duf-faelles-samling-visuel-stil.md` still carry the old "visuel-stil" in their file names (renaming them needs `git mv` and link updates; not done yet). The lower-case phrase "dit visuelle udtryk" in room content is ordinary prose, not the area name, and was left as-is.
- On 2026-10-15 (Trello #36, branch `kort-36-omdoeb-sider`) all pages lost their `vaekstomraade-`/`vaekstrum-` prefix, and the code dropped the distinction between the two. The file names in the two notes above are historical. Renamed with `git mv`: `vaekstomraade-<emne>.html` → `<emne>.html` (with `vaekstomraade-produkter-ydelser.html` → `produktudvikling.html`), `vaekstrum-<navn>.html` → `<navn>.html`, but `vaekstrum-visuelt-udtryk.html` → `velkommen-visuelt-udtryk.html`; `faelles-samling-visuel-stil.html` → `visuel-style-guide.html` (and its doc → `docs/duf-visuel-style-guide.md`); JS: `vaekstrumStorage.js` → `storage.js`, `visueltVaekstrumEngine.js` → `visueltEngine.js`, `visueltVaekstrumUi.js` → `visueltUi.js`, `data/visueltVaekstrum.js` → `data/visuelt.js`, `vaekstomraadeExit.js` → `exit.js`, `data/vaekstomraader.js` → `data/doerkarrusel.js`, `data/faellesSamling.js` → `data/visuel-style-guide.js`, `js/faellesSamling.js` → `js/visuelStyleGuide.js`; `css/_vaekstrum.scss` → `css/_flow.scss`; `img/*-vaekstrum.png` → `img/*-emne.png`. The room ID `"vaekstrum-visuelt-udtryk"` became `"velkommen-visuelt-udtryk"`, and the browser database `duf-vaekstrum-storage` became `duf-storage` (field `sideId`); answers saved before this are deliberately not carried over (Heidi's decision), and `js/storage/storage.js` deletes the old database. Every page now says who it is in `<body data-side="...">` and is started from one map in `js/app.js`. The docs in `/docs` keep their names and the internal terms. New topic pages: `ai.html`, `det-gode-indhold.html` (placeholders, linked from the door carousel, not in the header nav). The closing screen formerly shown as "Fælles samling" is called **"Visuel style guide"** for users ("fælles samling" stays as the internal template term in the docs).
