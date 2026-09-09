# Opgave til Claude Code: Overblik — Modul 3/5-hub + gem Modul 6's anbefaling

Branch: `feature-vaekstrum-motor` (eksisterende branch, fortsæt på den).

To opgaver i én omgang, samlet i **én commit**: (1) Modul 3 og Modul 5 bygges om til "oversigt + valgfrie bobler", (2) Overblik begynder at gemme den matchede anbefaling/det valgte vækstrum fra Modul 6. De to opgaver rører forskellige dele af koden og kan bygges i vilkårlig rækkefølge internt, men skal ende i samme commit.

## Baggrund

Læs `docs/duf-manuskript-overblik.md` først — den er lige blevet opdateret til den fulde Vækstrum → Modul → Bobler-struktur for vækstrummet Overblik (grundlæggende, hjem: Visuelt udtryk), inklusiv et nyt "Spørgsmål til jer, inden I bygger videre"-afsnit hvor begge nedenstående beslutninger står. Læs også `docs/duf-vaekstrum-motor.md` for navigationsmønsteret mellem rum (ikke det, denne opgave handler om, men god kontekst) og `CLAUDE.md`.

---

## Opgave 1: Modul 3 og Modul 5 som "oversigt + valgfrie bobler"

Lige nu bygger `js/engine/overblikEngine.js` og `js/engine/overblikUi.js` Modul 3 og Modul 5 som hver ét enkelt skærmbillede:

- **Modul 3** (`showModul3()` → `showAccordionStep()`): én skærm med en accordion, hvor de fire emner (Farver, Billeder, Logo, Ikoner/fonte) foldes ud og ind på samme side.
- **Modul 5** (`showModul5()` → `showTeaserStep()`): én skærm med fire "smagsprøve"-kort vist samtidig, ingen af dem klikbare ud over den fælles "Næste"-knap.

Det nye manuskript beder om noget andet for begge moduler: en fast introduktions-boble, efterfulgt af fire **valgfrie, klikbare** bobler, brugeren selv vælger imellem i vilkårlig rækkefølge — ikke tvunget til at se dem alle — med en "tilbage til oversigt"-mulighed fra hver boble, og en tydelig vej videre til næste modul, uanset om brugeren har kigget på nogen af dem.

**Modul 3 → 3.1 (oversigt) + 3.2A–3.2D (Farver/Billeder/Logo/Ikoner, hver valgfri).**
**Modul 5 → 5.1 (oversigt) + 5.2A–5.2D (samme fire områder, hver valgfri, med længere indhold end Modul 3's).**

Se de fulde tekster for hver boble i `docs/duf-manuskript-overblik.md` under Modul 3 og Modul 5 — brug dem direkte, opfind ikke ny tekst.

### Hvorfor det er værd at bygge som ét delt mønster

Modul 3 og Modul 5 beder reelt om den samme mekanik: oversigt → vælg en boble → se dens indhold → tilbage til oversigt eller videre. Byg det derfor som **én delt byggeklods**, brugt to gange — ikke to separate implementeringer. Følg samme princip som `js/components/exitDoor.js` (delt markup/logik, tynde wrappers med rummets/modulets egne tekster) fremfor at kopiere kode.

Forslag til struktur (du vurderer selv de bedste konkrete navne og opdeling ud fra, hvad der allerede findes i `overblikUi.js`):

- En delt render-funktion til **oversigtsskærmen** (hub): overskrift + introtekst + en liste/grid af klikbare kort (ét pr. boble), samt en knap til at fortsætte til næste modul uden at have åbnet nogen bobler.
- En delt render-funktion til **boble-detaljeskærmen**: viser den valgte boblets fulde indhold (overskrift, brødtekst, evt. guide/avatar-citat, evt. "det arbejder du med"-liste, evt. "det tager du med dig videre"-tekst — feltnavnene varierer let mellem Modul 3 og Modul 5, se manuskriptet), med to knapper: "Tilbage til oversigt" og "Fortsæt" (til næste modul, samme som hub'ens fortsæt-knap).
- Data for de fire bobler pr. modul ligger som nyt indhold i `js/data/overblik.js` (udvid `modul3`/`modul5`-eksporterne, eller lav nye eksporter ved siden af, alt efter hvad der giver renest kode) — hentet fra `docs/duf-manuskript-overblik.md`.
- `OverblikEngine` får de nye metoder til at vise hub og enkelt-bobler for hvert modul (fx `showModul3Hub()`, `showModul3Boble(key)`, tilsvarende for Modul 5), og styrer navigationen mellem dem. Genbrug det eksisterende `this.previousScreen`-mønster, hvis det giver mening til "tilbage"-knappen — men "tilbage til oversigt" er IKKE det samme som rummets exit-bekræftelse (`exitRoom()`), forveksl ikke de to.

### Eksplicit UDENFOR scope for Opgave 1

- **Ingen ændring af Modul 1, 2 eller 4's indhold eller struktur** i denne omgang — kun Modul 3 og Modul 5 ændrer struktur her. En fuld tekstopdatering af de øvrige moduler til at matche det nye manuskript er en separat, senere opgave.
- **Ingen modul-/boble-navigationslinje** (pin-og-sti-visning på tværs af hele rummet) — det er en separat, større, endnu ikke bygget funktion, se `docs/duf-vaekstrum-motor.md`s henvisning til navigationslinje-dokumentet. "Tilbage til oversigt" i denne opgave er en lokal, lille mekanik, kun for Modul 3 og 5 — ikke det generelle system.
- **Ingen ændring af Modul 6's matchningslogik** — den er allerede besluttet til at matche `overblikMatcher.js` som den er i dag (ingen tie-break, vis alle relevante rum). Modul 6 røres kun som beskrevet i Opgave 2 nedenfor.

---

## Opgave 2: gem Modul 6's anbefaling/valgte vækstrum

**Baggrund:** `OverblikEngine` gemmer i dag intet — `this.answers` lever kun i hukommelsen, mens brugeren er i rummet, i modsætning til de fire uddybende rum, som alle kalder `js/storage/vaekstrumStorage.js` (det er sådan deres "✓ Gennemført"-badges på `vaelg-rum-visuelt-udtryk.html` virker). Beslutningen ("den lille version", 2026-09-08, se `docs/duf-manuskript-overblik.md`): Overblik begynder at gemme varigt, men **kun** den matchede anbefaling/det valgte vækstrum fra Modul 6 — ikke de granulære boble-svar fra Modul 1–5. De sidstnævnte forbliver kun i hukommelsen, som i dag. Dette kan opgraderes senere, hvis der viser sig et konkret behov for det, men er en bevidst mindre start nu.

**Læs `js/storage/vaekstrumStorage.js` først** — den fulde kontrakt står i filens toppkommentar. Det relevante kald er:

```js
saveVaekstrumOutput(vaekstrumId: string, data: object, documentation: string): Promise<{ ok: boolean, reason?: string }>
```

Følg nøjagtig samme mønster som de fire uddybende rums motorer allerede bruger dette kald på (find og læs, hvor de gør det — typisk i deres afsluttende dokumentationstrin) frem for at opfinde et nyt mønster.

**Hvad der skal gemmes:** kald `saveVaekstrumOutput("overblik", data, documentation)` når Modul 6's resultat (`resolveRecommendation(answers)`'s output fra `overblikMatcher.js`) er beregnet og vist for brugeren i Boble 6.1. `data` skal som minimum indeholde: hvilket/hvilke vækstrum der blev anbefalet (`type`, samt de matchede rum-id'er), og gerne tidspunktet — men **ikke** de rå svar fra Modul 1–5 (det er netop det, "den lille version" udelader). `documentation` kan være en kort, læsbar sætning i samme stil som de andre rum bruger (fx hvilke rum der blev anbefalet).

**Badge på hub-siden:** `vaelg-rum-visuelt-udtryk.html`'s Overblik-kort (`data-room-id="overblik"`) mangler i dag den `<p class="value-card-status" data-room-status hidden>✓ Gennemført</p>`-linje, som de fire uddybende rums kort allerede har (se samme fil, linje ~69/78/87/96). Tilføj den samme markup til Overblik-kortet, og bekræft at den eksisterende JS, der styrer disse badges ud fra `getSavedVaekstrumIds()` (find den i `js/app.js` eller tilsvarende — den kører allerede for de fire andre kort), også fanger `"overblik"` uden ekstra specialkode. Det bør den gøre automatisk, når `saveVaekstrumOutput("overblik", ...)` er kaldt — men verificér det i browseren.

### Eksplicit UDENFOR scope for Opgave 2

- **Ingen lagring af de granulære boble-svar fra Modul 1–5** — det er bevidst udeladt i "den lille version". Byg ikke ekstra `saveVaekstrumOutput`-kald andre steder i Overbliks motor.
- **Ingen ændring af den eksisterende `?fra=overblik`-mekanisme** (query-param-baseret personalisering, som Farver/Logo/Billeder allerede læser) — den fungerer statisk og upåvirket af denne opgave.
- **Ingen ændring af opt-out-UI'en eller `vaekstrumStorage.js` selv** — brug den eksisterende kontrakt som den er.

---

## Eksisterende mønstre at følge (begge opgaver)

- `activateFocusTrap(app)` kaldes på alle skærme (se øvrige funktioner i `overblikUi.js`).
- Exit-dør: brug den eksisterende `renderExitDoor()`/`bindExit()`-wrapper i `overblikUi.js` (allerede centraliseret via `js/components/exitDoor.js`) på de nye skærme, som på alle andre.
- Knapklasser: brug eksisterende `btn btn--regular btn--solid-green` / `btn--outline-green` osv. — ingen nye knap-varianter, jf. CLAUDE.md's knap-komponent.
- Kort-styling: genbrug `value-card`/`value-list`-klasserne, der allerede bruges i `vaelg-rum-visuelt-udtryk.html` og i `showTeaserStep()`, fremfor at opfinde nyt markup.

## Test

Der er ingen browser-adgang i den session, dette manuskript blev skrevet i — test derfor selv i browseren (Live Server el.), og tjek:

**Opgave 1:** alle fire bobler i Modul 3 og alle fire i Modul 5 kan åbnes og lukkes igen; man kan springe et modul over uden at åbne nogen bobler; exit-døren virker stadig på de nye skærme; fokus-fælden (`activateFocusTrap`) virker på de nye skærme.

**Opgave 2:** gennemfør Overblik til Modul 6, og bekræft at et output nu er gemt (fx via browserens IndexedDB-inspektør, eller ved at genindlæse `vaelg-rum-visuelt-udtryk.html` og se "✓ Gennemført" på Overblik-kortet); bekræft at lagring respekterer et evt. aktivt fravalg (`isStorageOptedOut()`) ligesom de andre rum; bekræft at Modul 1–5's svar IKKE ender i `saveVaekstrumOutput`-kaldet.

Resten af rummet (Modul 4, matchningslogikken i `overblikMatcher.js`, de fire uddybende rums egen lagring) skal være upåvirket af begge opgaver.

Commit med én besked, der forklarer hvorfor og dækker begge dele (matcher nyt manuskript + gemmer Modul 6-anbefaling — ikke bare "opdaterer Overblik").
