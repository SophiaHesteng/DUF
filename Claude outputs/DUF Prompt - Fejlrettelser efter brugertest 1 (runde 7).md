# Prompt til Claude Code: fejlrettelser efter brugertest 1 + mail-knap på tjeklister

*Gemt 2026-09-25. Første rigtige brugertest af hele Visuelt vækstområde (24-09-2026) fandt fem konkrete fejl (F1–F5) og gav én lille ny funktion, som Heidi gerne vil have med i denne runde: at man kan sende en tjekliste til sig selv på mail. Den fulde baggrund står i [[DUF Brugertest 1 - Visuelt vækstområde (sortering)]]. Dette er IKKE en ombygning, men en lille, målrettet rettelsesprompt. Tekstrettelser og den nye Overblik-boble om kanaler kommer i en senere, separat prompt.*

Kopiér alt herunder ind i Claude Code i VS Code, i roden af DUF-projektet
(`C:\Users\Heidi Kristoffersen\OneDrive - IBA Erhvervsakademi Kolding\DUF\DUF\`).

---

## Før du går i gang

- Spørg Heidi, om du skal fortsætte på en eksisterende branch eller oprette en ny, lille branch til denne rettelsesrunde. Gæt ikke selv.
- Tjek, om rettelserne fra "Byggesten, runde 6" allerede er bygget ind (fx om Boble 4.2 i Byggesten hedder "Hvor skal du bruge dine fonte?"). Fortæl Heidi, hvad du finder. Rør ikke runde 6's ændringer.
- Læs de berørte filer, som de ser ud i dag, før du ændrer noget. Punkterne herunder beskriver **hvad** der er galt, set fra brugeren. Find selv de præcise steder i koden.
- Er årsagen til en fejl uklar, så beskriv, hvad du fandt, og spørg Heidi, før du laver en større ændring.

---

## Del 1: Fem fejl

**F1. Logo, Boble 5.1: paletten vises ikke.**
Testbrugeren havde valgt og gemt sine farver i Farver-rummet. I Logo 5.1 står teksten "Du har allerede en palet fra Farver. Den viser vi her.", men der vises ingen farver.
- Find ud af, hvorfor Logo ikke kan læse den gemte palet. Det kan fx være en forkert lagernøgle, en anden datastruktur end den, Farver gemmer i, eller at læsningen sker, før data er hentet. Billeder 6.4 viser allerede en gemt palet korrekt, så brug den som reference.
- Tjek samtidig 5.2a og 5.2c, som bruger den samme palet.
- Har brugeren **ikke** en palet, må teksten "Den viser vi her" ikke stå. Så skal den alternative tekst vises.

**F2. Logo, Boble 8.1: teksten ser ud til at være to sætninger sat sammen.**
Testbrugeren kunne ikke genkende, hvad teksten i boksen byggede på, og beskrev den som "to sætninger sat sammen". Boble 8.1 viser en "opskrift" pr. spor (A/Behold, Justér, Nyt, D) plus en fælles linje til alle.
- Undersøg, hvad der faktisk vises i 8.1. Er der tekst, der hentes fra tidligere svar? Bliver opskrifterne for flere spor vist på én gang? Er to tekststykker flettet sammen uden mellemrum eller linjeskift?
- **Fortæl Heidi, hvad du finder, før du retter.** Det kan være en fejl i koden, men det kan også være, at manuskriptet skal gøres tydeligere.

**F3. Byggesten, Boble 4.3: man kan ikke vælge mellem de udvalgte skrifttyper.**
Testbrugeren kunne ikke finde eller vælge de skrifttyper, der er udvalgt på forhånd. Hun fandt dem kun, fordi Heidi fortalte hende navnene, så hun kunne søge på dem. Når en font blev valgt, virkede skiftet og kombinationen med de valgte farver fint.
- Se [[DUF Teknisk - Skrifttype-vælger (fontvælger med Google Fonts)]] for, hvordan vælgeren er tænkt.
- De udvalgte skrifttyper skal være synlige og kunne vælges direkte med ét klik, fx som en liste eller som knapper, hvor hver font er vist i sin egen skrift. Brugeren skal ikke kende navnene på forhånd.
- Testbrugeren sad ved en laptop i **Microsoft Edge**. Tjek, at det virker der.

**F4. Billeder, Boble 4.2: valgte søgeord kan ikke fravælges.**
Når et søgeord er valgt, kan det ikke klikkes fra igen.
- Et klik på et valgt søgeord skal fravælge det (toggle), og det gemte valg skal opdateres.

**F5. Byggesten, Boble 6.2: boblen skifter videre af sig selv.**
Når brugeren har valgt et svar på "Hvordan føles det?", skifter rummet automatisk videre. Testbrugeren følte, hun gik glip af noget.
- Fjern det automatiske skift. Brugeren vælger sit svar, ser responsen og trykker selv på "Næste".
- Selve ordlyden i 6.2 er testet og fungerer. Den skal ikke ændres.
- Tjek, om andre bobler i Visuelt vækstområde også skifter automatisk efter et valg. List dem for Heidi, men ret dem ikke i denne runde.

---

## Del 2: Tjekliste-komponenten får en overskrift og en mail-knap

Se [[DUF Teknisk - Tjekliste-komponent (afkrydsningspunkter)]]. Tjek først, hvordan komponenten faktisk er bygget i dag (forventet: `js/components/tjekliste.js`, med `gemNoegle` pr. instans), og hvor den bruges. Forventet: de fire tjeklister i Logo (`logo-sporD-aftaler`, `logo-modul6-arbejdsliste`, `logo-modul6-symbol`, `logo-modul6-looka`) og rettighedstjeklisten i Billeder, Modul 7.2.

**1. Synlig overskrift.** Testbrugeren så ikke, at punkterne var en tjekliste, før hun var nået et stykke ned ("aaahhh, det er en tjekliste"). Komponenten skal derfor vise en overskrift over punkterne.
- Ny valgfri parameter `titel`. Standard er **"Tjekliste"**, hvis intet er angivet.
- Brug de eksisterende design-tokens til overskriften, i samme stil som andre mindre overskrifter i rummene.

**2. Knap: "Send listen til mig selv".** Brugeren skal kunne sende tjeklisten til sin egen mail, så hun kan have den ved hånden, fx når hun taler med en grafiker.
- Løs det med et `mailto:`-link. Det åbner brugerens eget mailprogram med emne og tekst udfyldt. **Ingen server, ingen mailtjeneste, intet login.**
- Emne: `Min tjekliste fra DUF: [titel]`
- Tekst: tjeklistens titel og alle punkterne, ét pr. linje, med en markering af, om punktet er afkrydset, fx `[x] Får jeg ejerskab eller kun en brugsret?` og `[ ] Må jeg ændre det?`. Hvis tjeklisten har en afsluttende linje (fx "Skal logoet være en central del af din identitet … så søg rådgivning"), skal den med nederst. Afslut med en kort linje: `Sendt fra DUF, Dit visuelle udtryk.`
- Husk korrekt URL-kodning (æ, ø, å, linjeskift og specialtegn), så teksten ser rigtig ud i Outlook, Gmail og Apple Mail.
- Ny valgfri parameter `mailKnap` (standard `true`). Slå den til på alle nuværende tjeklister.
- Knappen placeres under punkterne. Den skal være diskret, som en sekundær knap, så den ikke konkurrerer med rummets "Videre"-knapper.
- Under knappen, i lille tekst: *"Åbner dit eget mailprogram. Har du ikke et mailprogram sat op på denne enhed, sker der ikke noget."* (Teksten kan justeres af Heidi senere. Den skal bare være der, fordi `mailto:` intet gør på en computer uden mailprogram.)
- Den afkrydsede tilstand skal hentes i det øjeblik, der trykkes. Så kommer det med, som brugeren lige har krydset af.

---

## Uden for scope

- Tekstrettelserne fra brugertesten (T1–T13 i sorteringsdokumentet) kommer i en senere prompt, når manuskripterne er opdateret.
- Den nye Overblik-boble om kanaler og den udvidede lagring af brugerens udgangspunkt kommer også i en senere prompt.
- Rør ikke runde 6's ændringer i Byggesten.
- Tjekliste-komponenten må ikke ændre adfærd i øvrigt (ingen rigtige/forkerte svar, ingen forgrening).

---

## Før du melder færdig

List de filer, du har ændret, og bekræft med en kort manuel test i **både Chrome og Edge**:

1. **F1:** Med en gemt palet fra Farver vises farverne i Logo 5.1, 5.2a og 5.2c. Uden palet vises den alternative tekst.
2. **F2:** Hvad du fandt i 8.1, og hvad du har rettet, eller hvad du foreslår.
3. **F3:** De udvalgte skrifttyper kan vælges med ét klik, uden at man kender navnene.
4. **F4:** Et søgeord kan vælges og fravælges igen.
5. **F5:** 6.2 venter på, at brugeren selv trykker "Næste". Plus listen over andre bobler, der skifter automatisk.
6. **Tjekliste:** Overskriften "Tjekliste" vises på alle tjeklister. Mail-knappen åbner et mailprogram med korrekt emne og tekst, med æ/ø/å intakte og afkrydsede punkter markeret.
