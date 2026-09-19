# Prompt til Claude Code — dørikon i navigationen

Kopiér alt herunder ind i Claude Code i VS Code, i roden af DUF-projektet
(`C:\Users\Heidi Kristoffersen\OneDrive - IBA Erhvervsakademi Kolding\DUF\DUF\`).

Dette er en selvstændig opgave, adskilt fra dørkarrussel-arbejdet til
`vaelg-din-dor.html` — brug en ny, separat branch.

---

Vi skal bygge et lille genbrugeligt **dørikon-komponent**: en lukket dør som
udgangspunkt, der går på klem, når man peger på den eller giver den
tastatur-fokus. Det skal bruges som "gå ud af kortet"-affordance i
navigationen — der hvor brugeren forlader et vækstrums pin-og-sti-navigation
("kortet") og går tilbage/ud.

## Før du går i gang

- Opret og skift til en ny git branch til dette arbejde. Spørg mig om det
  ønskede branch-navn, før du opretter den — gæt ikke selv.
- Læs `js/components/exitDoor.js` grundigt, som den ser ud i dag — det er den
  eksisterende, delte exit-dør-komponent, der allerede bruges flere steder i
  navigationen på tværs af vækstrum. Læs også CLAUDE.md og de eksisterende
  design-tokens, så komponentens markup/klasser følger samme mønster som
  resten af kodebasen.
- Kortlæg alle steder, `exitDoor.js` bruges i dag, før du ændrer noget — vi
  vil ikke bryde eksisterende kald.
- **Antagelse, som du skal bekræfte med mig, før du bygger videre:** at
  "gå ud af kortet"-ikonet er præcis det, `exitDoor.js` allerede repræsenterer
  (den delte exit-komponent), og at opgaven derfor er at opdatere *den*
  komponent — ikke at bygge en ny separat et sted. Spørg, hvis det ikke
  stemmer med, hvor du kan se ikonet skal sidde i praksis.
- Reference til interaktionen (hover/fokus-opførsel, tilgængelighedsnoter):
  https://claude.ai/artifact/TWKobDtJfZTg8DDjyyJ5z7

## Aktiver — allerede i projektet

De rigtige SVG-eksportfiler ligger allerede i `img`-mappen, lagt der af mig —
brug dem direkte, de skal ikke gen-eksporteres:

- `img/door1_closed 1.svg` — lukket tilstand (standard)
- `img/door-icon-klem.svg` — tilstand på klem (hover/fokus)

## Funktionalitet

- To billeder oven på hinanden i én wrapper, krydsblændet med `opacity` —
  ingen JS nødvendig for selve overgangen:
  - `.st-closed` er synlig som udgangspunkt (`opacity: 1`)
  - `:hover` og `:focus-visible` på wrapperen skifter til `.st-open`
  - Transition ca. `.18s ease`
- Respekter `prefers-reduced-motion: reduce` — overgangen springer direkte i
  stedet for at blende.
- **Hover alene er ikke nok:** ikonet skal altid ledsages af en synlig
  tekstlabel (som det allerede sker i dag), så betydningen ikke kun sidder i
  animationen — og almindeligt klik/tryk skal virke uændret, uanset om
  hover-tilstanden nås eller ej (vigtigt for touch, hvor der ikke findes
  hover).
- `:focus-visible` skal trigge samme åbne-tilstand som `:hover`, så
  tastaturbrugere også ser overgangen, ikke kun museplacering.

## Uden for scope

- Rør ikke dørkarrusellen eller `vaelg-din-dor.html` — det er en anden,
  parallel opgave på en anden branch.
- Byg ikke ny pin-og-sti-navigationslogik i denne omgang — kun selve
  ikon-komponentet og dets kobling til den eksisterende exit-affordance.

## Før du melder færdig

List op, hvilke filer du har oprettet/ændret, og en kort manuel
test-tjekliste (hover, tastatur-fokus via Tab, tryk/klik på touch uden hover,
reduceret bevægelse, at alle eksisterende steder `exitDoor.js` bruges stadig
virker som før) — vi plejer selv at bede om dette, da du ikke nødvendigvis
har browser-adgang til at afprøve det i denne omgang.
