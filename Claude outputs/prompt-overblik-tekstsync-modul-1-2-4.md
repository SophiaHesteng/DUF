# Opgave til Claude Code: Overblik — Modul 1 og 2 fra tekstfelter til valgmuligheder (+ tekstsync af Modul 4)

**Denne fil erstatter en tidligere version af samme prompt.** Den tidligere version beskrev opgaven som "ren tekstsynkronisering" for Modul 1, 2 og 4 — det var forkert for Modul 1 og 2. Brug KUN denne version.

Branch: `feature-vaekstrum-motor` (eksisterende branch, fortsæt på den). Uafhængig af den anden Overblik-prompt (`prompt-overblik-modul3-5-hub.md`, Modul 3/5-hub + lagring af Modul 6) — kan laves før, efter eller i en separat omgang. Rør ikke Modul 3, 5 eller 6 her.

## Baggrund — hvad der faktisk skal ændres

Den nuværende version af Modul 1 og Modul 2 er i høj grad bygget op omkring **tekstfelter**, hvor brugeren selv formulerer og skriver et svar. Heidi ønsker mere interaktivitet: tekstfelterne skal erstattes af **valgmuligheder** (multiple choice), og nogle steder skal det valgte svar matches med en **efterfølgende, tilpasset feedback/respons** — samme princip som allerede findes andre steder i motoren (find og genbrug det eksisterende mønster for spørgsmål-med-matchet-respons, i stedet for at opfinde et nyt — kig i `js/engine/overblikEngine.js`/`overblikUi.js` efter, hvor det allerede gøres i dag, fx i Modul 2's eksisterende spørgsmålsløkke).

Det reviderede `docs/duf-manuskript-overblik.md` er allerede skrevet i den ønskede, interaktive form — det er facit for både valgmuligheder og feedback-tekster. Brug teksterne derfra direkte, opfind ikke nye.

**Bonus-grund til at det giver mening:** Modul 6's matchningslogik (`overblikMatcher.js`, `resolveRecommendation()`) arbejder med diskrete signaler for at kunne anbefale et vækstrum automatisk. Fritekst kan ikke matches pålideligt på den måde — så konverteringen til valgmuligheder gør det også nemmere at holde Modul 6 troværdig fremover, ikke kun mere interaktivt undervejs.

## Opgave

**Modul 1:**
- Boble 1.1 — ren tekst, ingen interaktion (uændret struktur, tjek kun ordlyd mod manuskriptet).
- Boble 1.2 ("Hvor starter du?") — hvis denne i dag er et tekstfelt, skal den blive til et **ét-valg spørgsmål** med de 5 svarmuligheder fra manuskriptet.
- Boble 1.3 ("Din respons") — dynamisk boble, viser én af 5 tekster afhængigt af valget i 1.2. Hvis denne ikke findes i dag (fordi 1.2 var fritekst uden matchet respons), skal den bygges som en ny skærm/trin, der viser den rette af de 5 svartekster fra manuskriptet.
- Boble 1.4 — ren tekst, ingen interaktion (uændret struktur, tjek kun ordlyd).

**Modul 2:**
- Boble 2.1 — ren tekst, ingen interaktion (uændret struktur, tjek kun ordlyd).
- Boble 2.2 ("Hvad bruger du allerede?") — flervalg (checkbox-lignende, brugeren kan vælge flere) med de 8 muligheder fra manuskriptet, og en tilpasset respons ud fra hvad der er valgt (se manuskriptets responsvarianter).
- Boble 2.3 ("Se efter det, der går igen") — ét-valg spørgsmål med 4 muligheder + 4 matchede responser.
- Boble 2.4 ("Hvordan har du det med det, du ser?") — ét-valg spørgsmål med 5 muligheder + 5 matchede responser.
- Boble 2.5 — ren opsamling, ingen nyt spørgsmål (uændret struktur).

Hvor Modul 1/2 allerede reelt implementerer valgmuligheder (helt eller delvist) i dag — tjek det først, og opdater kun det, der mangler eller er forkert, frem for at bygge om fra bunden.

**Modul 4 og Velkomstskærmen:** ingen interaktion i manuskriptet — her er opgaven fortsat **ren tekstsynkronisering** (ordlyd matcher manuskriptet, struktur/antal skærme uændret).

## Eksplicit UDENFOR scope

- **Ingen berøring af Modul 3, 5 eller 6.**
- **Ingen ændring af, hvordan de gemte svar bruges i Modul 6's matchningslogik** (`overblikMatcher.js`) i denne omgang — det er en opfølgende opgave, hvis konverteringen fra fritekst til valg betyder, at matcheren bør udvide sine regler. Flag det i commit-beskeden, hvis du undervejs opdager, at matcheren burde bruge de nye, mere strukturerede svar til noget, den ikke gør i dag — men byg det ikke som en del af denne opgave.
- **Ingen ændring af lagringsmekanismen** (`js/storage/vaekstrumStorage.js`) — kun *hvad* der ligger i `this.answers` for de konverterede bobler ændrer form (fra streng til valgt option-nøgle), ikke hvordan/hvornår det evt. gemmes.
- Hvis en boble i manuskriptet beskriver valgmuligheder, der er markant anderledes end det, du kan se allerede findes et sted i koden (fx en lignende, men ikke identisk spørgsmålstype et andet sted), så følg manuskriptet — men flag i commit-beskeden, hvis du er i tvivl om en fortolkning.

## Eksisterende mønstre at følge

- Genbrug det eksisterende UI-mønster for "ét-valg spørgsmål → matchet respons", hvis det allerede findes i motoren (det gør det sandsynligvis for dele af Modul 2 i dag) — byg ikke et nyt parallelt mønster ved siden af.
- `activateFocusTrap(app)` på alle skærme, som i resten af motoren.
- Exit-dør: brug den eksisterende `renderExitDoor()`/`bindExit()`-wrapper.
- Knapklasser/valgmuligheds-styling: genbrug eksisterende klasser i stedet for at opfinde nye — kig på, hvordan Modul 2's nuværende spørgsmål (eller de fire uddybende rums tilsvarende spørgsmålstrin) allerede styler valgmuligheder.

## Test

Gennemgå Velkomstskærm, Modul 1, Modul 2 og Modul 4 i browseren. Tjek: alle spørgsmål i Modul 1/2 kan besvares ved at vælge en mulighed (ikke skrive fritekst); den rette matchede feedback/respons vises for hvert valg; flervalget i Boble 2.2 tillader flere valgte muligheder samtidig, med en respons der passer til kombinationen; Modul 4 og Velkomstskærmen er stadig ren tekst, uændret struktur; exit-dør og fokus-fælde virker på alle nye/ændrede skærme; Modul 3, 5 og 6 er upåvirket.

Commit med en besked, der forklarer at det er en interaktions-ændring (fritekst → valgmuligheder + matchet feedback) for Modul 1 og 2, og en tekstsynkronisering for Modul 4/Velkomstskærmen — ikke bare "opdaterer Overblik".
