# MANUSKRIPT — Ikoner, fonte & andre grafiske byggesten

## Rejsen gennem rummet

Modul 2 er skillepunktet, men det er en let forgrening, ikke hårde spor som i Logo: brugeren multivælger, hvilke emner hun vil arbejde med (`fokusvalg[]`), og kun de tilsvarende moduler vises bagefter. Valget kan altid ændres igen.

1. **Se hvad du allerede har** *(alle)* — orientering + tre konkrete eksempler fra brugerens eget materiale.
2. **Hvad vil du have styr på?** *(skillepunktet)* — brugeren vælger selv, hvilke emner hun vil arbejde med. Kan altid ændres senere via modul-navigationslinjen.
3. **Ikoner** *(kun hvis valgt)* — føles, funktion, kilde (tre reelle spor), stil samlet.
4. **Fonte** *(kun hvis valgt)* — værktøj, overskrift og brødtekst valgt visuelt via en skrifttype-vælger, læsbarhedstest.
5. **Andre byggesten** *(kun hvis valgt)* — har allerede / vælg retning / ved ikke endnu.
6. **Prøv dem sammen** *(alle)* — et lille eksempel med det, hun har valgt; fungerer det?
7. **Dit lille byggestens-sæt** *(alle)* — opsummering, tommelfingerregel, gem til den visuelle guide.

## Det, rummet husker (til udvikling)

Alt gemmes lokalt på brugerens enhed (samme princip som resten af DUF).

- Modul 1: `udgangspunkt` (allerede-udtryk / hist-og-her / fra-bunden), `eksempler[]`, `iagttagelser[]`
- Modul 2: `fokusvalg[]` (ikoner / fonte / andreByggesten — "Det hele" sætter alle tre). Kan altid ændres via modul-navigationslinjen. `fokusvalg` styrer kun, hvilke af Modul 3-5 der *vises* — ikke hvilke data der findes: fravælges et emne, bevares dets svar og vises igen, hvis emnet vælges til på ny. Modul 6's forhåndsvisning og Modul 7's opsamling følger det *aktuelle* `fokusvalg`.
- Modul 3 (Ikoner): `ikonFoelelse`, `ikonFunktion`, `ikonKilde` (fri / tegnSelv / betaler)
- Modul 4 (Fonte): `arbejdsVaerktoej`, `googleFontsDirekte` (bool, afledt af `arbejdsVaerktoej`), `fontOverskrift`, `fontBroedtekst`, `laesbarhedOk`
- Modul 5 (Andre byggesten): `andenDetalje` (upload/beskrivelse) eller `andenRetning` eller `ikkeBesluttet`
- Modul 6: `provetSammenResultat` (fungerer / tætPå / virkerIkke), `tilbageTil[]` (hvilke(t) valg der skal justeres)
- Modul 7: `tommelfingerregel` (fri tekst), `begrundelse` (samlet, til Fælles samling)

## Modul 1 — Se hvad du allerede har *(alle)*

### Boble 1.1 — Velkommen

- **Hvad brugeren møder på denne skærm:**
  - *Har allerede arbejdet med Farver og/eller Logo i dette besøg:* Du har allerede arbejdet med de store dele af dit visuelle udtryk. Nu kigger vi på det, der går igen mellem dem.
  - *Kommer direkte til rummet:* Velkommen til Ikoner, fonte & andre grafiske byggesten.
  - *Fælles fortsættelse:* Skrifttyper. Ikoner. Streger. Knapper. Små grafiske detaljer. Du behøver ikke beslutte det hele i dag. Vi finder de byggesten, der gør det lettere for dig at skabe noget, der føles som dig — hver gang.
- **Hvad der leder videre:** Knappen "Lad os se, hvor du starter".

### Boble 1.2 — Hvor starter du?

- **Hvad brugeren møder på denne skærm:** Hvor føles det rigtigt at starte?
- **Eventuel interaktion:** Vælg ét: "Jeg har allerede et visuelt udtryk" / "Jeg har lidt hist og her" / "Jeg starter næsten fra bunden".
- **Eventuel respons eller feedback:** *Allerede et udtryk:* Så tager vi udgangspunkt i det, du har. *Hist og her:* Så finder vi ud af, hvad der er værd at samle. *Fra bunden:* Så bygger vi et enkelt udgangspunkt, ét valg ad gangen.
- **Gemmes/får betydning senere:** Ja, `udgangspunkt`. Farver kun ordvalget i Modul 2 — ikke selve forgreningen.

### Boble 1.3 — Find tre steder, hvor dit udtryk allerede dukker op

- **Hvad brugeren møder på denne skærm:** Åbn din hjemmeside, et opslag, eller et dokument, du sender til klienter. Kig ikke efter det perfekte — find bare tre steder, hvor du allerede bruger tekst, ikoner eller andre grafiske detaljer.
- **Eventuel interaktion:** Tre valgfrie felter (beskrivelse eller skærmbillede/upload). Har hun intet: "Helt fint — så starter vi fra et rent bord."
- **Gemmes/får betydning senere:** Ja, `eksempler[]` — vises igen i Modul 6 og 7.

### Boble 1.4 — Hvad lægger du mærke til?

- **Hvad brugeren møder på denne skærm:** Kig på det, du lige har fundet. Hvad går igen, og hvad varierer?
- **Eventuel interaktion:** Multivalg: "Jeg bruger de samme skrifttyper" / "Jeg bruger forskellige skrifttyper" / "Jeg bruger de samme ikoner" / "Jeg bruger forskellige ikoner" / "Jeg har nogle grafiske detaljer, der går igen" / "Jeg har egentlig ikke tænkt over det før".
  - 💬 *Guide (avatar: Heidi):* Du opdager noget om din egen praksis her. Det er ikke en test, du kan bestå eller dumpe.
- **Gemmes/får betydning senere:** Ja, `iagttagelser[]` — bruges som støtte i Modul 6/7, ikke som krav.
- **Hvad der leder videre:** Knappen "Lad os se, hvad du vil have styr på".

## Modul 2 — Hvad vil du have styr på? *(skillepunktet — reel forgrening)*

### Boble 2.1 — Vælg dit fokus

- **Hvad brugeren møder på denne skærm:** Du behøver ikke gøre det hele på én gang. Hvad vil du gerne have styr på først?
- **Eventuel interaktion:** Multivalg (mindst ét): "Ikoner — jeg vil gerne have, at mine ikoner hænger sammen" / "Fonte — jeg vil gerne have styr på mine skrifttyper" / "De små detaljer — jeg har nogle grafiske elementer, men ved ikke, om de hænger sammen" / "Det hele — jeg vil gerne have et enkelt, samlet system" (markerer automatisk de tre andre).
- **Gemmes/får betydning senere:** Ja, `fokusvalg[]`. Kun de valgte af Modul 3-5 vises. Rækkefølge ved flere valg: Ikoner → Fonte → Andre byggesten.
- **Note til design/udvikling:** Dette valg er ikke låst — brugeren kan altid klikke tilbage til denne boble via modul-linjen og tilføje flere emner (jf. [[DUF Teknisk - Navigationslinjer (modul og boble)]]). Fravælges et emne, slettes dets svar ikke — de vises blot ikke, før emnet vælges til igen.

## Modul 3 — Ikoner *(kun hvis valgt i Modul 2)*

### Boble 3.1 — Hvordan skal dine ikoner føles?

- **Hvad brugeren møder på denne skærm:** Fire retninger, med et lille eksempel på hver: "Enkle streger" / "Fyldte ikoner" / "Runde og bløde" / "Skarpe og geometriske". Hvilken retning føles mest som dig?
- **Eventuel interaktion:** Vælg ét.
- **Gemmes/får betydning senere:** Ja, `ikonFoelelse`.

### Boble 3.2 — Hvad skal ikonerne gøre?

- **Hvad brugeren møder på denne skærm:** Hvad er ikonernes vigtigste opgave hos dig?
- **Eventuel interaktion:** Vælg ét: "Hjælpe folk med at finde vej (navigation, funktioner)" / "Give mit materiale lidt mere personlighed (dekorative elementer)" / "Forklare noget, sammen med tekst".
- **Eventuel respons eller feedback:** Et ikon behøver ikke forklare det hele. Skal det hjælpe med at forstå noget, skal teksten stadig kunne gøre arbejdet. Ikonet er hjælpen på vejen, ikke hele forklaringen.
- **Gemmes/får betydning senere:** Ja, `ikonFunktion`.

### Boble 3.3 — Hvor kommer dine ikoner fra?

- **Hvad brugeren møder på denne skærm:** Nu ved vi, hvordan de skal se ud, og hvad de skal gøre. Så er der kun ét spørgsmål tilbage: hvor kommer de fra? Det afgør nemlig, hvad du faktisk må.
  - 💬 *Guide (avatar: Marcus):* Et ikon er et grafisk element ligesom et billede. At det er let at finde, er ikke det samme som at det er frit at bruge.
- **Eventuel interaktion:** Vælg ét: "Jeg bruger et gratis ikonbibliotek" (→ 3.4-Fri) / "Jeg tegner dem selv" (→ 3.4-Tegn) / "Jeg betaler mig til dem" (→ 3.4-Betal) / "Jeg tager dem nogle gange fra andre hjemmesider eller apps" (→ 3.3b).
- **Gemmes/får betydning senere:** Ja, `ikonKilde`.

### Boble 3.3b — Når du låner fra andre *(kun ved dette valg)*

- **Hvad brugeren møder på denne skærm:** Du ved det nok godt et sted i baghovedet: et ikon, du tager fra en anden hjemmeside eller en app, er ikke automatisk dit at bruge — heller ikke selvom det er let at kopiere, eller du ændrer farven bagefter. En kildeangivelse erstatter ikke en tilladelse. Det er ikke forbudt at være i tvivl om det, men vi vil gerne anbefale, at du i stedet vælger en af de tre veje herunder — de er markant mere sikre at bygge videre på.
- **Hvad der leder videre:** Tilbage til 3.3, uden dette valg.

### Boble 3.4 — Tre veje *(reel forgrening)*

**3.4-Fri, gratis ikonbibliotek**
- **Hvad brugeren møder:** Det, vi selv anbefaler, er Material Symbols & Icons fra Google Fonts (fonts.google.com/icons). De er gratis, må bruges kommercielt, og du behøver ikke kreditere Google — men må gerne, hvis du har lyst. *(Kilde: Apache License 2.0, tjekket hos Google 2026-09-22 — tjek igen lige før bygning.)*

  Vælger du i stedet et andet gratis bibliotek, eller bruger du et ikon fra en virksomhed eller platform som Facebook eller MobilePay, gælder der andre regler, du bør kende. **Læs mere i Biblioteket:** 'Ikoner og rettigheder: det vigtigste, du skal vide' (artikel endnu ikke skrevet).
- **Eventuel interaktion:** Knappen "Åbn Material Symbols" (nyt vindue).

**3.4-Tegn, tegner selv**
- **Hvad brugeren møder:** Vi skal ikke lære dig at tegne. Men uanset hvordan du gør det, er der fire ting, der gør et ikon, du selv tegner, til et godt ikon:
  - **Genkendelighed** — det skal kunne genkendes med et hurtigt blik, uden at nogen skal tænke sig om.
  - **Konsistens** — samme stregtykkelse, samme hjørner, samme størrelsesforhold, på tværs af hele dit sæt.
  - **Simplicitet** — fjern det, der ikke er nødvendigt for at forstå det. Færre streger er som regel bedre end flere.
  - **Kontekst** — det skal give mening dér, hvor det bruges, sammen med tekst, ikke stå alene og skulle gættes.

  Et ikon, du selv tegner, er som udgangspunkt dit eget. Men meget enkle, almindelige symboler (en pil, en lup) er sjældent originale nok til at være beskyttet i sig selv — det er ikke et problem for den daglige brug, men gem gerne dine skitser undervejs. De er god dokumentation, hvis ikonet senere skal blive en fast del af din identitet.

**3.4-Betal, betaler sig til dem**
- **Hvad brugeren møder:** Betaler du for dine ikoner — en pakke fra et betalt bibliotek, eller ved at få nogen til at lave dem til dig — er det stadig licensen eller aftalen, der afgør, hvad du må. Ikke prisen. Fire ting er værd at tjekke:
  - Får du ejerskab, eller kun en brugsret?
  - Må ikonerne bruges kommercielt, uden tidsbegrænsning?
  - Må du ændre dem, og få dem i de formater, du får brug for?
  - Har du gemt kvitteringen eller aftalen, så du kan finde den igen?

  Vil du have det hele uddybet, kan du læse mere i Biblioteket: 'Ikoner og rettigheder: det vigtigste, du skal vide' (samme artikel som ovenfor).

  Skal et ikon blive en fast del af din identitet, fx i dit logo, stiller det ofte skrappere krav end almindelig brug i opslag og dokumenter.
  - **Se også:** Logo. *Skal ikonet indgå i dit logo, kigger vi nærmere på kravene der.*

- **Hvad der leder videre (alle veje):** Knappen "Videre" (→ 3.5).

### Boble 3.5 — Din ikonstil, samlet

- **Hvad brugeren møder på denne skærm:** En kort opsummering af det, hun har valgt: følelse, funktion og kilde.
- **Hvad der leder videre:** Er Fonte valgt i `fokusvalg` → Modul 4. Ellers, er Andre byggesten valgt → Modul 5. Ellers → Modul 6.

## Modul 4 — Fonte *(kun hvis valgt i Modul 2)*

*Fritekstfelterne er erstattet af en visuel skrifttype-vælger med en kurateret liste på otte Google Fonts-skrifttyper. Se [[DUF Teknisk - Skrifttype-vælger (fontvælger med Google Fonts)]] for spec og den fulde liste.*

### Boble 4.1 — Din tekst har også en stemme

- **Hvad brugeren møder på denne skærm:** Du behøver ikke finde den perfekte skrifttype. Du skal finde en, der fungerer for dig — og som du kan bruge igen og igen.
- **Hvad der leder videre:** Knappen "Lad os finde den".

### Boble 4.2 — Hvor skal du bruge dine fonte?

- **Hvad brugeren møder på denne skærm:** Hvor bruger du dem oftest?
- **Eventuel interaktion:** Vælg ét: "På min egen hjemmeside" (→ `googleFontsDirekte: true`) / "I Canva" / "I Word eller Google Docs" (begge → `googleFontsDirekte: false`) / "Et andet sted" (→ ét kort, uformelt opfølgende spørgsmål, der afgør `googleFontsDirekte`, uden at det ligner en teknisk beslutning).
- **Eventuel respons eller feedback:**
  - *`googleFontsDirekte: true`:* Godt — så kan du sandsynligvis bruge den skrifttype, du vælger her, direkte.
  - *`googleFontsDirekte: false`:* I [Canva / Word / det værktøj, hun nævnte] vælger du blandt et fast sæt skrifttyper. Brug vælgeren her som inspiration — find noget, du kan lide, og kig derefter efter noget, der ligner, i dit eget værktøj.
- **Gemmes/får betydning senere:** Ja, `arbejdsVaerktoej`, `googleFontsDirekte`.

### Boble 4.3 — Vælg din overskriftsfont

- **Hvad brugeren møder på denne skærm:** Bladr blandt fire stemninger — Rolig og varm, Klar og professionel, Levende og personlig, eller Enkel og alsidig — og se skrifttyperne direkte i et eksempel. Vælg én, du vil bruge til overskrifter. *(Har hun en gemt palet fra Farver, vises eksemplet i hendes egne farver.)*
- **Eventuel interaktion:** Skrifttype-vælgeren (se teknisk spec). Kan hun ikke finde eller genkende sin font her, kan hun skrive navnet direkte i stedet.
- **Gemmes/får betydning senere:** Ja, `fontOverskrift`.

### Boble 4.4 — Vælg din brødtekstfont

- **Hvad brugeren møder på denne skærm:** Nu til den tekst, folk faktisk skal læse. Her vejer læsbarhed tungere end at være flot. Vælg én, der er let at læse i almindelig størrelse — eksemplet viser den sammen med din overskriftsfont.
- **Eventuel interaktion:** Skrifttype-vælgeren igen, samme fallback til fritekst.
- **Gemmes/får betydning senere:** Ja, `fontBroedtekst`.

### Boble 4.5 — Læsbarhedstesten

- **Hvad brugeren møder på denne skærm:** Læs denne sætning på din telefon: *"En kort tekst om din praksis, sat i din valgte skrifttype."* Er den nem at læse?
- **Eventuel interaktion:** "Ja" (→ 4.6) / "Nej" (→ tilbage til 4.4).
- **Eventuel respons eller feedback (kun ved Nej):** Det er helt normalt, at noget først viser sig, når man ser det for alvor, og ikke bare på en computerskærm. Prøv en anden.
- **Gemmes/får betydning senere:** Ja, `laesbarhedOk`.

### Boble 4.6 — Dine fonte, samlet

- **Hvad brugeren møder på denne skærm:** Kort opsummering: overskriftsfont og brødtekstfont. *(Var `googleFontsDirekte: false`, gentages kort: "Husk at kigge efter noget, der ligner, i [dit værktøj].")*
- **Hvad der leder videre:** Er Andre byggesten valgt i `fokusvalg` → Modul 5. Ellers → Modul 6.

## Modul 5 — Andre byggesten *(kun hvis valgt i Modul 2)*

### Boble 5.1 — Har du en detalje, der går igen?

- **Hvad brugeren møder på denne skærm:** Ud over ikoner og fonte er der ofte andre små, tilbagevendende elementer — en streg, en ramme, en bestemt måde at lave knapper på. Det behøver ikke være en masse. Én lille detalje, der går igen, kan være nok.
- **Eventuel interaktion:** Vælg ét: "Jeg har allerede en detalje, der går igen" (→ 5.2a) / "Jeg har ikke én endnu" (→ 5.2b) / "Jeg ved ikke, om jeg har brug for én" (→ 5.2c).

### Boble 5.2 — *(tre varianter afhængigt af 5.1)*

**5.2a — Vis mig den**
- **Hvad brugeren møder:** Godt. Vis os den, eller beskriv den kort.
- **Eventuel interaktion:** Upload eller fritekstbeskrivelse.
- **Gemmes:** `andenDetalje`.

**5.2b — Vælg blandt nogle retninger**
- **Hvad brugeren møder:** Her er nogle steder at starte: "En tynd streg til at dele indhold op" / "En bestemt rammeform om billeder eller citater" / "En fast stil på knapper, fx runde hjørner eller en let skygge" / "Et gentaget mønster eller en tekstur" / "Ingen af dem — jeg finder selv på noget".
- **Eventuel interaktion:** Vælg ét.
- **Gemmes:** `andenRetning`.

**5.2c — Det behøver du heller ikke beslutte nu**
- **Hvad brugeren møder:** Det er helt fint. Nogle af de små detaljer viser sig først, når du har brugt dit materiale et stykke tid. Du kan altid komme tilbage.
- **Gemmes:** `ikkeBesluttet: true`.

- **Hvad der leder videre (alle tre):** Knappen "Videre" (→ Modul 6).

## Modul 6 — Prøv dem sammen *(alle)*

*Se [[DUF Teknisk - Byggesten-forhåndsvisning (Prøv dem sammen)]] for den tekniske spec. Ikonet i eksemplet er et konkret Material Symbols-ikon i den følelse, brugeren valgte i Modul 3 (ikke en generisk repræsentation) — besluttet 2026-09-23.*

### Boble 6.1 — Lad os se, om de kan arbejde sammen / Lad os se dit valg i praksis

- **Overskrift:** Afhænger af `fokusvalg`: mere end ét emne → "Lad os se, om de kan arbejde sammen"; præcis ét emne → "Lad os se dit valg i praksis". Selve indholdet i boblen er det samme.

- **Hvad brugeren møder på denne skærm:** Et lille, samlet eksempel, bygget af det, hun rent faktisk har valgt: en overskrift i den valgte overskriftsfont, en kort brødtekst i den valgte brødtekstfont, og — hvis Ikoner blev valgt — et ikon i den valgte følelse ved siden af en kort linje tekst. Har hun valgt en detalje i Andre byggesten, indgår den også. Kun de elementer, hun faktisk har arbejdet med, vises.
  - *Har hun en gemt palet fra Farver og/eller et logo:* de vises ved siden af eksemplet, så hun kan se, om det hænger sammen med resten af hendes visuelle udtryk.
  - *Har hun hverken palet eller logo endnu:* Du har ikke en palet eller et logo endnu. Det er helt fint — brug dette som dit foreløbige udgangspunkt.
    - **Se også:** Farver. *Vil du lave en fast palet, kan du gøre det der, når du har lyst.*
  - 💬 *Guide (avatar: Heidi):* Det er her, det hele mødes. Du skal ikke gætte dig til, om det passer sammen. Du skal se det.

### Boble 6.2 — Hvordan føles det?

- **Hvad brugeren møder på denne skærm:** Hvordan føles det, når du ser det samlet?
- **Eventuel interaktion:** "Det føles som mig" (→ Modul 7) / "Det er tæt på" (→ 6.3) / "Nej, det fungerer ikke" (→ 6.3).
- **Gemmes/får betydning senere:** Ja, `provetSammenResultat`.

### Boble 6.3 — Hvad vil du justere? *(kun ved "tæt på" eller "fungerer ikke")*

- **Hvad brugeren møder på denne skærm:** Hvad skal vi kigge på igen? Kun de emner, hun faktisk arbejdede med, vises som muligheder: "Ikonerne" / "Fonten til overskrift" / "Fonten til brødtekst" / "Den anden detalje".
- **Eventuel interaktion:** Vælg ét eller flere.
- **Gemmes/får betydning senere:** Ja, `tilbageTil[]`.
- **Hvad der leder videre:** Sender brugeren tilbage til det/de relevante trin i Modul 3-5. Når hun er færdig dér, lander hun automatisk tilbage i 6.1 med det opdaterede eksempel.

## Modul 7 — Dit lille byggestens-sæt *(alle)*

### Boble 7.1 — Dit lille byggestens-sæt

- **Hvad brugeren møder på denne skærm:** En samlet oversigt over det, hun har valgt — kun de emner, hun faktisk arbejdede med: fonte (overskrift/brødtekst), ikonstil og -kilde, og en eventuel anden detalje.
- **Hvad der leder videre:** Knappen "Skriv min tommelfingerregel".

### Boble 7.2 — Min tommelfingerregel

- **Hvad brugeren møder på denne skærm:** Skriv én sætning, du kan huske det på: "Jeg bruger ______, fordi ______."
- **Eventuel interaktion:** Fritekstfelt.
- **Gemmes/får betydning senere:** Ja, `tommelfingerregel`.

### Boble 7.3 — Gem det, du lige har fundet

- **Hvad brugeren møder på denne skærm:** Du har nu et lille sæt byggesten, du kan tage med dig videre. Gem dem i din visuelle guide, så du ikke skal starte forfra næste gang. Dette er en prototype, ligesom resten af dit visuelle udtryk. Det må gerne udvikle sig, i takt med at din praksis gør det.
  - 💬 *Guide (avatar: Heidi):* Det vigtigste er ikke, at det er færdigt. Det er, at du ved, hvor du skal kigge, næste gang.
- **Eventuel interaktion:** Knappen "Tilføj til min visuelle guide".
- **Gemmes/får betydning senere:** Ja, `begrundelse` (opsummering + tommelfingerregel), til Fælles samling.
- **Hvad der leder videre:** Ud af rummet, tilbage til rum-vælgeren.

## Ændringer efter gennemgang

*2026-09-24 (runde 6), efter Heidis browsertest og en fornyet ChatGPT-kommentering af flowet. Skrevet ind her ud fra rettelsesprompten, ikke kopieret fra det samlede manuskript i projektet — sammenlign gerne.*

1. **Fokusvalg-reglen:** `fokusvalg` styrer kun, hvilke af Modul 3-5 der vises, ikke hvilke data der findes. Fravalgte emners svar bevares og vises igen ved tilvalg; Modul 6 og 7 følger det aktuelle `fokusvalg`.
2. **3.4-Fri og 3.4-Betal:** kortere tekst med link til Biblioteks-artiklen "Ikoner og rettigheder: det vigtigste, du skal vide" (endnu ikke skrevet — linket peger midlertidigt på Bibliotekets forside).
3. **3.3 og 3.3b:** blødere sprog ("Jeg tager dem nogle gange fra ..."; 3.3b hedder nu "Når du låner fra andre").
4. **4.2:** bruger-centreret omformulering ("Hvor skal du bruge dine fonte?"), med et kort, uformelt opfølgende spørgsmål ved "Et andet sted".
5. **6.1:** dynamisk overskrift efter antal valgte emner.

Boble 6.2's ordlyd er bevidst parkeret til efter testen med en rigtig bruger.
