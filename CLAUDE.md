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

## Structure

`DUF → Vækstområde → Vækstrum`. A vækstområde (e.g. Branding, Hjemmeside) has a fixed opening + closing with flexible movement between curated vækstrum in between. A vækstrum is a small, self-contained guided flow (branching, reflection, small exercises) with one home area, optional connections elsewhere, a type (`grundlæggende` or `uddybende`), and an ID like `BRA-VIS-001`. Full detail in the docs above — don't invent structure that isn't there; ask if something's unclear.

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

## Known open questions (as of 2026-09-03)

- Header navigation ("map" icon) isn't wired up yet. The Figma file has a "Navigation" component (a site-map graphic) listing all real page names — worth building the header nav from that rather than guessing.
- Several internal links in the current Forside prototype are best-guesses, not confirmed IA (flagged as TODO comments in forside.html) — confirm actual destinations with the team before treating them as final.
