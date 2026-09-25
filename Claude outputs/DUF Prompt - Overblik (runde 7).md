# Prompt til Claude Code: Overblik, runde 7 (efter brugertest 1)

*Gemt 2026-09-25. Overblik-manuskriptet er opdateret efter første brugertest og godkendt af Heidi i sin helhed. Kilde: [[DUF Manuskript - Overblik]] (runde 7) og [[DUF Brugertest 1 - Visuelt vækstområde (sortering)]], afsnit 0. Det vigtigste fund i testen var, at rummene går ud fra, at brugeren allerede har noget. Denne runde gør Overblik i stand til at rumme brugeren, der starter helt fra bunden, og **gemmer brugerens udgangspunkt, så de andre vækstrum senere kan tilpasse sig**.*

Kopiér alt herunder ind i Claude Code i VS Code, i roden af DUF-projektet
(`C:\Users\Heidi Kristoffersen\OneDrive - IBA Erhvervsakademi Kolding\DUF\DUF\`).

---

## Før du går i gang

- **Vent, til fejlrettelserne fra "DUF Prompt - Fejlrettelser efter brugertest 1 (runde 7)" er færdige og godkendt af Heidi.** Spørg hende, om de er, før du starter.
- Spørg Heidi, om du skal bruge en ny branch til denne runde. Gæt ikke selv.
- Læs de eksisterende filer, som de ser ud i dag: `js/data/overblik.js`, `js/engine/overblikEngine.js`, `js/engine/overblikUi.js` og `js/storage/vaekstrumStorage.js`.
- Opdatér `docs/duf-manuskript-overblik.md`, så den matcher manuskriptet (runde 7) ord for ord. **Manuskriptet er kilden til al tekst.** Kopiér teksterne derfra, og find ikke selv på formuleringer. Mangler en tekst, så spørg.
- Er noget uklart i, hvordan manuskriptet skal oversættes til koden, så spørg, i stedet for at gætte.

---

## De seks ændringer

**1. Boble 1.2: lille tekstrettelse.**
"Hvad passer bedst **på** dig?" → "Hvad passer bedst **til** dig?"

**2. Boble 2.1: ny afsluttende linje.**
Tilføj efter den eksisterende tekst: *"Og har du ikke noget endnu, er det også et helt fint sted at starte. Det finder vi ud af sammen på næste skærm."*

**3. Ny Boble 2.2, "Hvor møder folk din praksis?", og omnummerering.**
- Indsæt den nye boble mellem 2.1 og den nuværende 2.2. Tekst, valgmuligheder og responser står i manuskriptet.
- Afkrydsning med flere valg. **"Jeg har ikke noget endnu" kan ikke kombineres med de andre:** vælges den, fjernes de andre afkrydsninger, og vælges en kanal, fjernes "Jeg har ikke noget endnu".
- De nuværende bobler 2.2–2.5 bliver til 2.3–2.6. Opdatér numrene i navigationslinjen og alle interne henvisninger, fx Boble 6.1's opsummering.

**4. Modul 2 forgrener sig.** Se tabellen øverst i Modul 2 i manuskriptet.
- **Har brugeren krydset kanaler af:** som i dag, 2.3 → 2.4 → 2.5 → 2.6.
- **Har hun valgt "Jeg har ikke noget endnu":** 2.3 vises som varianten "Hvad har du lyst til at starte med?", med egne valgmuligheder og responser. Derefter går hun **direkte til varianten af 2.6**. 2.4 og 2.5 springes over.
- Tjek, at motoren kan vælge næste boble ud fra svaret i 2.2 i stedet for lineær navigation. Tjek også, at navigationslinjen (modul og boble) viser det rigtige antal bobler for hver vej, så brugeren ikke ser "huller".
- Går brugeren tilbage og ændrer sit svar i 2.2, skal hun følge den nye vej.

**5. Modul 3 bliver en accordion på én skærm.**
- Boble 3.2A–3.2D udgår som selvstændige skærme. I stedet viser Boble 3.1 de fire områder som accordion-punkter: overskrift og den korte intro-linje er altid synlige, og den nye, uddybende tekst folder sig ud ved tryk. Alle tekster står i manuskriptet.
- Flere punkter må være åbne samtidig. Ingen er obligatoriske.
- "Videre"-knappen står under alle fire punkter.
- Modul 3 var tidligere bygget som en accordion (`showAccordionStep` i `overblikUi.js`). Tjek, om den kan genbruges. Modul 5 beholder sit nuværende "oversigt + valgfrie bobler"-mønster og skal ikke ændres.
- Accordionen skal kunne bruges med tastatur (fokus og Enter/mellemrum) og skal fungere på mobil.

**6. Lagring af brugerens udgangspunkt, og Boble 6.1.**
Se afsnittet "Det, Overblik husker" i manuskriptet.
- Gem **varigt** via `js/storage/vaekstrumStorage.js`, samme mekanisme som det valgte rum gemmes med i dag:
  - `udgangspunkt` (svaret fra 1.2): `harUdtryk` / `valgtNoget` / `skaberNyt` / `barBund` / `overblik`
  - `kanaler[]` (svaret fra 2.2): `hjemmeside`, `facebook`, `instagram`, `linkedin`, `andreSociale`, `nyhedsbrev`, `booking`, `trykt`, `andet`, eller præcis `["ingen"]`
- De øvrige boble-svar gemmes stadig **ikke** varigt.
- Lav en lille, genbrugelig læse-funktion, som de andre vækstrum senere kan importere, fx `hentUdgangspunkt()`, der returnerer `{ udgangspunkt, kanaler, starterFraBunden }`, hvor `starterFraBunden` er `true`, når `kanaler` er `["ingen"]`. Har brugeren ikke været i Overblik, returnerer den `null`, og rummene opfører sig som i dag.
- **Boble 6.1** viser nu også brugerens kanaler øverst i opsamlingen ("Folk kan møde din praksis her: …" eller "Du starter med et rent bord."). For brugeren, der ikke har noget endnu, udelades opsummeringen fra 2.4 og 2.5, og teksten fra varianten af 2.3 vises i stedet for 2.3's.

---

## Uden for scope

- **Rør ikke de andre vækstrum** (Farver, Billeder, Logo, Byggesten) i denne runde. De skal først bruge `hentUdgangspunkt()` i en senere runde, når deres manuskripter er opdateret. Lav kun funktionen, så den er klar.
- Rør ikke Modul 4 og Modul 5.
- Guide-citaterne i den nuværende 2.5 (🌱, 🔍, 🧭), som ikke kommer med i koden i dag, er stadig et åbent punkt. Tag det ikke med nu.

---

## Før du melder færdig

List de filer, du har ændret, og bekræft med en kort manuel test i **Chrome og Edge**, både på desktop og i smal (mobil) visning:

1. 1.2 siger "til dig", og 2.1 har den nye linje.
2. **Vej med kanaler:** Kryds fx Hjemmeside og Instagram af i 2.2. Du går igennem 2.3 → 2.4 → 2.5 → 2.6, og 6.1 viser de to kanaler øverst.
3. **Vej uden noget:** Vælg "Jeg har ikke noget endnu". De andre afkrydsninger fjernes. Du ser varianten af 2.3 og går direkte til varianten af 2.6. 6.1 viser "Du starter med et rent bord." og ingen opsummering fra 2.4 og 2.5.
4. Gå tilbage fra vej 3 og vælg en kanal. Du følger nu vej 2.
5. Modul 3 er én skærm med fire punkter, der kan foldes ud, og knappen "Videre" står under dem.
6. `udgangspunkt` og `kanaler` er gemt og overlever en genindlæsning af siden. `hentUdgangspunkt()` returnerer de rigtige værdier, og `null` for en bruger, der ikke har været i Overblik.
7. `docs/duf-manuskript-overblik.md` matcher manuskriptet.
