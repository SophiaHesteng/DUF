# MANUSKRIPT — Farver

*Status: Første udkast til konkret skærmtekst og øvelser, modul for modul — klar til at blive givet videre til design (Marcus) og udvikling (Sophia). Bygger direkte på VÆKSTRUM Context — Farver. Tekstforslag er skrevet i DUF's etablerede tone og kan frit justeres i sprog — men indholdet og logikken bag hvert modul bør holdes op mod Context-dokumentet, hvis noget ændres væsentligt. Bokse markeret "Note til design/udvikling" er praktiske hints, ikke bindende specifikationer.*

**Sådan læses dette dokument:** For hvert modul er der en kort skærmtekst, en øvelse eller et sæt spørgsmål, og hvor relevant en note om praktisk implementering.

## Velkomst til rummet

**Skærmtekst (vises kun, hvis brugeren kommer fra Overblik med et farve-relateret svar):**
"Du nævnte tidligere, at du er usikker på dine farver — derfor foreslog vi at kigge nærmere på det her."

**Standardvelkomst (hvis brugeren er kommet direkte til Farver):**
"Velkommen til Farver. Her får du hjælp til at vælge en farvepalet, der understøtter din praksis — uanset om du starter fra bunden eller bare vil kvalitetssikre det, du allerede har."

## Modul 1 — Hvorfor farver betyder noget

**Skærmtekst:**
"Farver er sjældent tilfældige, selvom de tit bliver valgt sådan. De sender et signal, længe før nogen har læst et ord om dig — om ro, energi, tillid, eller noget helt fjerde.

Det betyder ikke, at der findes én rigtig farve for alternative behandlere. Det betyder, at det er værd at vide, hvorfor du har valgt dem, du har."

**Myteknæk:** "Farvevalg er ikke bare smag. To farver kan være lige 'pæne' og stadig sende vidt forskellige signaler om din praksis."

## Modul 2 — Farvers usynlige regler

**Skærmtekst:**
"Nogle farvekombinationer er lettere at læse end andre — bogstaveligt talt. Lys tekst på lys baggrund kan simpelthen være svær at se for mange mennesker, uanset hvor flot den ser ud på din skærm.

Det kaldes kontrast, og det er en af de vigtigste — men mest oversete — regler i farvevalg. Vi kommer til at teste det konkret senere i dette rum (Modul 7)."

*Note til design/udvikling: kort, letforståelig introduktion — de tekniske detaljer (WCAG-niveau, kontrastforhold som tal) hører til i Modul 7's praktiske tjek, ikke her.*

## Modul 3 — Dit udgangspunkt

**Øvelse:**
"Saml 3–5 eksempler på, hvor du allerede bruger farve i din praksis i dag — det kan være din hjemmeside, dit logo (hvis du har et), eller opslag på sociale medier."

**Refleksionsspørgsmål:**
- "Hvilke farver går igen?"
- "Er de valgt bevidst — eller er de bare endt sådan?"

*Note til design/udvikling: øvelsen kan understøttes af enten upload af billeder/skærmbilleder eller blot fritekst-beskrivelse. Har brugeren intet endnu, springes øvelsen over med teksten: "Har du ikke noget at samle op endnu? Helt fint — så starter vi fra et rent bord."*

## Modul 4 — Inspiration og sammenligning

**Øvelse:**
"Find 2–3 andre praksisser (gerne inden for alternativ behandling, men det behøver de ikke være), hvis visuelle udtryk du synes fungerer godt. For hver af dem:"
- "Hvilke farver bruger de?"
- "Hvad tror du, farverne skal signalere?"
- "Er der noget, du kan lade dig inspirere af — uden at kopiere det direkte?"

**Skærmtekst (afslutning på modulet):**
"Formålet her er ikke at finde en skabelon, du kan kopiere. Det er at blive skarpere på, hvad der rent faktisk virker — og hvorfor."

## Modul 5 — Farvernes roller

**Skærmtekst:**
"Fremfor at tænke i et bestemt antal farver, vil vi gerne introducere en anden måde at tænke på: rolle og dosering.

En farve kan spille forskellige roller — nogle er beregnet til at fylde meget og sætte tonen. Andre er der for at understøtte. Og nogle bruges bevidst sparsomt, netop fordi de skal springe i øjnene, når det betyder noget.

Det handler ikke om at ramme et bestemt tal. Det handler om at vide, hvilken rolle hver farve spiller — og om den bruges i den rette dosis til den rolle."

*Note til design/udvikling: undgå at præsentere faste kategorier som et skema, brugeren skal udfylde 1-til-1 (fx "vælg 1 hovedfarve, 2 sekundære") — det er præcis den type faste regel, teamet bevidst har fravalgt. Hold det som en tænkemåde, ikke en formel.*

## Modul 6 — Vælg din palet

**Øvelse:**
"Med rolle og dosering i baghovedet:"
- "Hvilken farve skal spille hovedrollen i dit udtryk?"
- "Er der andre farver, der skal understøtte den?"
- "Er der et sted, hvor du har brug for en farve, der bevidst springer i øjnene?"

**Skærmtekst:**
"Der er ikke ét rigtigt antal farver at ende med. Nogle lander på to. Andre på flere. Det vigtige er, at du kan svare på, hvorfor hver enkelt farve er der."

*Note til design/udvikling: output fra dette modul er brugerens konkrete paletvalg (fx via en farvevælger eller indtastning af farvekoder) plus deres begrundelse pr. farve — begge dele skal med videre til Modul 8's dokumentation.*

## Modul 7 — Tjek kontrast i praksis

**Skærmtekst:**
"Nu tester vi paletten i praksis. Åbn Adobe Color Contrast Analyzer, og indtast din tekstfarve og din baggrundsfarve."

**Trin:**
1. "Gå til color.adobe.com/create/color-contrast-analyzer."
2. "Indtast farverne for tekst og baggrund, som du planlægger at bruge sammen."
3. "Tjek, om resultatet lever op til WCAG niveau AA."

**Hvis det ikke gør:**
"Det betyder ikke, at farverne er forkerte — det betyder, at de ikke bør bruges sammen som tekst og baggrund. Prøv i stedet at parre dem med en anden farve fra din palet, eller juster nuancen en smule."

*Note til design/udvikling: Adobe-værktøjet er eksternt — brugeren forlader midlertidigt DUF for at bruge det, medmindre der på sigt bygges en indlejret løsning. Bør fremgå tydeligt i UI'en (fx "åbner i nyt vindue").*

## Modul 8 — Afprøv og dokumentér

**Øvelse:**
"Brug din valgte palet ét sted i praksis — det kan være et opslag, en side på din hjemmeside, eller et dokument. Se, hvordan det føles, når det ikke bare er farver på en skærm, men noget, andre rent faktisk møder."

**Dokumentation (tilføjes til den visuelle guide):**
"Skriv 2–3 sætninger om dine valgte farver: hvilken rolle spiller hver af dem, og hvorfor har du valgt dem?"

**Afsluttende tekst:**
"Din palet er ikke hugget i sten. Den er en prototype, ligesom resten af dit visuelle udtryk — og den må gerne udvikle sig, i takt med at din praksis gør det."

*Note til design/udvikling: den skriftlige begrundelse herfra er det, der reelt "samles" i fælles samling (jf. Fælles samling — Visuel stil) — sørg for, at den gemmes et sted, der rent faktisk kan trækkes frem igen dér.*

## Spørgsmål til jer, inden I bygger videre

- Skal Modul 3's "saml eksempler"-øvelse understøtte billedupload fra start, eller er en ren tekstbeskrivelse godt nok til første version?
- Skal Modul 6's palet-valg ske gennem en simpel farvevælger (hex-koder), eller skal brugeren kunne vælge blandt et kurateret sæt foreslåede paletter?
- Modul 7 sender brugeren til et eksternt værktøj — er det den oplevelse, I ønsker for første version, eller skal kontrasttjek bygges ind direkte i DUF på sigt?
