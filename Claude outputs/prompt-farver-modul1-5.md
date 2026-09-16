# Opgave til Claude Code: Farver — Modul 1-5 bygges om til det reviderede manuskript

Branch: `farver-update-content` (allerede oprettet af Heidi, korrekt forgrenet fra `claude-testing` — bekræftet via reflog). Fortsæt på den, opret ikke en ny.

## Baggrund

Læs `docs/duf-manuskript-farver.md` først — den er lige blevet opdateret til den fulde Vækstrum → Modul → Bobler-struktur for vækstrummet Farver (uddybende, hjem: Visuelt udtryk). Læs også `CLAUDE.md` og `docs/duf-vaekstrum-motor.md` for de generelle mønstre.

Nuværende kode (`js/data/farver.js`, `js/engine/farverEngine.js`, `js/engine/farverUi.js`) er bygget ud fra det GAMLE, flade manuskript (8 moduler uden boble-opdeling) og matcher derfor ikke det nye manuskript. Denne opgave dækker KUN Modul 1-5 — se "Eksplicit UDENFOR scope" nedenfor for hvorfor Modul 6, 7 og 8 bevidst ikke er med her.

To billedfiler-sæt, som det nye manuskript refererer til, findes IKKE i `img/` endnu: `eksempel-3.2.png` (Boble 3.2) og `varm-hjemmeside.png`/`energisk-logo.png`/`larmende-nyhedsbrev.png` (Boble 4.3/4.4/4.5). Kun `roligt-so-me.png` (Boble 4.2) findes allerede. Byg videre, som om filerne findes på de angivne stier — Heidi lægger dem i `img/` bagefter. Ingen fallback-logik nødvendig for manglende billeder.

## Opgave: Modul 1-5

### Modul 1 — Hvorfor farver betyder noget

Boble 1.1 er uændret indhold (nuværende `modul1.paragraphs`/`modul1.myteknaek`) — men skal nu vises som sin egen boble (Boble 1.1), efterfulgt af en ny **Boble 1.2**, som ikke findes i koden i dag: tre konkrete eksempler på farveudtryk vist side om side — **Varm** ("Et varmt og jordnært farveudtryk." — Ro · varme · nærvær · tryghed), **Kold** ("Et køligere farveudtryk." — Klarhed · ro · professionalisme · distance), **Legende** ("Et mere livligt eller uventet farveudtryk." — Energi · kreativitet · personlighed · lethed), afsluttet af de to sætninger om, at ingen af dem er mere rigtige, men at de ikke fortæller det samme. Se fuld tekst i manuskriptet. Ingen interaktion, ingen billeder krævet (rent tekst/ord-baseret opstilling) — byg det som en ny let udvidelse af `showTextScreen` (fx et `examples`-array-parameter), fremfor en helt ny skærmtype, medmindre du vurderer, at det bliver renere som sin egen lille render-funktion.

### Modul 2 — Farvers usynlige regler

Indholdsmæssigt uændret — bliver formelt til **Boble 2.1**. Ingen funktionel ændring nødvendig ud over eventuel omdøbning/kommentar, der afspejler boble-nummereringen.

### Modul 3 — Dit udgangspunkt

**Erstatter helt** den nuværende "saml 3-5 eksempler + valgfri billedupload + to refleksionsspørgsmål som tekstfelter"-flow med tre bobler:

- **Boble 3.1** — ren tekstskærm (nyt indhold, se manuskriptet: "Farver er allerede en del af din praksis mange steder...").
- **Boble 3.2** — "Har du selv et eksempel?", to valg:
  - **Ja, det har jeg** → brugeren uploader ét billede. Genbrug den eksisterende delte komponent `js/components/imageGallery.js` (`renderImageUploadHtml`/`bindImageUpload`, samme mønster som nuværende Modul 3 bruger via `saveImage`/`getImagesForVaekstrum`/`deleteImage` fra `vaekstrumStorage.js`) — men denne boble handler om ÉT billede, ikke en voksende galleri-liste. Du bestemmer den enkleste rimelige løsning (fx: kun vis uploadfeltet, indtil ét billede er uploadet; eller tillad at erstatte det ene billede) — undgå at bygge en ny upload-mekanik fra bunden.
  - **Nej, ikke endnu** → vis `img/eksempel-3.2.png` direkte, ingen upload.
- **Boble 3.3** — viser det valgte/uploadede billede fra Boble 3.2, med tre reflektionsspørgsmål som ren tekst ved siden af (fra manuskriptet: "Hvilke farver lægger du først mærke til? Er der nogle, der går igen? Og hvordan oplever du det samlede udtryk?"). **Ingen interaktion, intet tekstfelt, intet gemt svar** — det er bevidst kun til egen overvejelse (afklaret med Heidi 2026-09-11), modsat den nuværende Modul 3, hvor refleksionsspørgsmålene i dag er tekstfelter, brugeren skal udfylde. Fjern de nuværende `reflectionQuestions`-tekstfelter fra flowet.

`showExamplesBranch`/`showExamplesForm`/`showExamplesSkip` i `farverUi.js` skal enten tilpasses eller erstattes af nye funktioner, der matcher denne nye tre-boble-struktur — du vurderer selv den reneste opdeling.

### Modul 4 — Inspiration og sammenligning

**Erstatter helt** den nuværende "find 2-3 andre praksisser selv, tre fritekstfelter pr. praksis"-flow med fem bobler, samme grundmønster som Overbliks `showMultiChoiceQuestion` (flervalg + matchet feedback), men med et billede som centralt visuelt element pr. boble:

- **Boble 4.1** — ren introduktionstekst, ingen interaktion (se manuskriptet).
- **Boble 4.2** (billede: `img/roligt-so-me.png`, socialt medie-opslag), **Boble 4.3** (`img/varm-hjemmeside.png`, hjemmeside), **Boble 4.4** (`img/energisk-logo.png`, logo), **Boble 4.5** (`img/larmende-nyhedsbrev.png`, nyhedsbrev) — hver med samme spørgsmål ("Hvad for et indtryk får du af det her?") og samme fem afkrydsningsmuligheder (Det føles varmt / Det føles roligt / Det føles energisk / Noget føles som om, det ikke helt spiller / Jeg er ikke sikker), men med FIRE forskellige matchede feedback-tekster pr. boble (se manuskriptet for alle fire teksters ordlyd pr. boble).

**Vigtigt om matchningen:** brugeren kan vælge ét eller flere afkrydsningsfelter, men der vises kun ÉN feedback-tekst — ikke én pr. valgt felt. Manuskriptets fire responser pr. boble er nummereret 1-4, og rækkefølgen ER prioriteringsrækkefølgen (og den rækkefølge er bevidst forskellig fra boble til boble — fx er "Energisk" først i Boble 4.4, men sidst-før-"ikke sikker" i de andre). Match derfor sådan: gå igennem responserne i den nummererede rækkefølge for netop den boble, og vis feedbacken for det FØRSTE svar i den rækkefølge, brugeren har afkrydset. Hvis kun "Jeg er ikke sikker" er afkrydset (og intet andet), vis dén. Dette er en fortolkning af manuskriptet (ikke eksplicit stavet ud som en algoritme der) — byg det sådan, men flag det gerne i commit-beskeden, så Heidi kan rette, hvis hun mente noget andet, når hun ser det i praksis.

Billedvisning + afkrydsningsliste + matchet feedback kan med fordel bygges som én delt render-funktion i `farverUi.js`, brugt fire gange med forskelligt billede/tekst-data — ikke fire kopier af samme markup.

### Modul 5 — Farvernes roller

Ren boble-opdeling af eksisterende tekst (nuværende `modul5.paragraphs`) i tre bobler — **Boble 5.1** ("Det handler ikke om antallet"), **Boble 5.2** ("Farver har forskellige roller"), **Boble 5.3** ("Det handler også om fordelingen"). Se manuskriptet for præcis tekst pr. boble (uddyber den nuværende tekst en smule, ikke bare en opdeling af de tre nuværende paragraffer 1:1 — tjek teksten op mod manuskriptet).

## Eksplicit UDENFOR scope for denne opgave

- **Modul 6 og Modul 7 røres IKKE.** De er begge markeret i manuskriptet som egne, større ombygningsopgaver (fri palet-bygger med rolle/dosering/preview i Modul 6; palette-drevet kontrasttjek med tre-niveau-feedback i Modul 7) og skal ikke bygges her. `showModul6()`/`showModul7()` i `farverEngine.js` og `showPaletteForm`/`showContrastCheck` i `farverUi.js` skal fortsat kaldes uændret fra `showModul5Bubble3()` (eller hvad du kalder Modul 5's sidste boble) — kæden til Modul 6 skal altså virke som i dag, bare med et nyt afsæt fra Modul 5's nye bobler.
- **Modul 8 røres IKKE.** Boble 8.3 (den nye opsamlingsskærm) afhænger af data, der først findes, når Modul 6/7 er bygget om (dosering i %, valgt tekstfarve, den endelige kontrastkombination) — giver ikke mening at bygge før da.
- **Ingen ændring af `sessionStorage.setItem("duf-visited-farver", "1")`** i `showModul1()` — den bruges af Byggesten til at vise en anden velkomst og skal blive stående præcis som den er, uanset hvordan du omstrukturerer Modul 1's bobler.
- **Ingen ny `saveVaekstrumOutput`-kald** — Farver gemmer fortsat kun ét samlet output for hele rummet, i Modul 8 (som i dag) — "gemmes: ja" på boble-niveau i Modul 3/4 betyder her kun, at værdien bæres videre i hukommelsen (`this.answers`/tilsvarende) til senere bobler, ikke en persistent lagring.
- **Ingen ændring af modul-/boble-navigationslinjen** — separat, endnu ikke bygget funktion (`docs/duf-teknisk-navigationslinjer-modul-og-boble.md`).

## Eksisterende mønstre at følge

- `activateFocusTrap(app)` på alle nye skærme.
- Exit-dør: `renderExitDoor()`/`bindExit()`, som resten af `farverUi.js`.
- Knapklasser: eksisterende `btn btn--regular btn--solid-green` / `btn--outline-green` osv.
- Billedupload: genbrug `js/components/imageGallery.js` som den er, ikke en ny mekanik.
- Flervalg + matchet feedback: kig på, hvordan Overbliks `showMultiChoiceQuestion` (`js/engine/overblikUi.js`) og `showModul2HvadBrugerDuResponse()` (`js/engine/overblikEngine.js`) løser samme grundproblem (flere valg → én matchet respons) — Farvers Modul 4 er samme mønster, bare med et billede som ekstra element pr. skærm.

## Test

Der er ingen browser-adgang i den session, dette manuskript blev skrevet i — test derfor selv i browseren (Live Server el.), og tjek:

- Modul 1: begge bobler vises korrekt, herunder de tre eksempler i Boble 1.2 med deres tilhørende ord.
- Modul 3: begge grene af Boble 3.2 virker (upload ét billede; vis `eksempel-3.2.png` uden upload — billedet vises brudt indtil filen er lagt i `img/`, det er forventet). Boble 3.3 viser det korrekte billede og de tre spørgsmål som ren tekst, uden tekstfelt.
- Modul 4: alle fire bobler viser korrekt billede (brudte billeder for de tre manglende filer er forventet), alle fem afkrydsningsmuligheder virker, og feedbacken matcher den nummererede prioritering beskrevet ovenfor — test med forskellige kombinationer af afkrydsninger, inkl. flere valgt på én gang.
- Modul 5: alle tre bobler viser korrekt tekst.
- Hele kæden Modul 1 → 2 → 3 → 4 → 5 → (ind i det eksisterende, urørte Modul 6) hænger sammen uden brud.
- Exit-døren og fokus-fælden virker på alle nye skærme.
- `sessionStorage`-linjen i Modul 1 er stadig der og virker som før (tjek evt. i Byggesten, hvis den er hurtig at teste).

Commit med én besked, der forklarer hvorfor (Modul 1-5 bygget om til det reviderede, boble-strukturerede manuskript — Modul 6-8 bevidst udenfor scope) — og nævn eksplicit din fortolkning af Modul 4's prioriterings-matchning, så Heidi kan rette den, hvis nødvendigt.
