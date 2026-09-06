# FÆLLES SAMLING — Visuel stil (Dit visuelle udtryk)

*Status: Udkast — kort specifikation af vækstområdets fælles samling, bygget efter fælles åbning (Overblik) og de fire uddybende vækstrum (Farver, Logo, Billeder, Ikoner/fonte & andre grafiske byggesten). Bygger på DUF Vækstområde Context (skabelonens "Fælles samling"-sektion) og de beslutninger, der allerede ligger i DUF Vækstområde Context — Visuel stil. Opdateret 2026-09-06 med et konkret forslag til den midlertidige tekniske løsning (se "Teknisk løsning" nedenfor), efter en indledende drøftelse af, hvordan de fire vækstrums output reelt skal samles, før login/brugerkonto findes.*

**Hvorfor et kort dokument, og ikke en fuld Vækstrum Context?** DUF Vækstområde Context-skabelonen beskriver eksplicit, at det vækstrum, der fungerer som fælles åbning, skal have en defineret type (grundlæggende/uddybende) — derfor blev Overblik bygget som et fuldt, selvstændigt vækstrum. Skabelonen stiller ikke det samme krav til fælles samling: den beskrives som afslutningen på progressionen, ikke som et vækstrum med sit eget ID, sine egne moduler eller sin egen type. Dette dokument holder sig derfor til en let specifikation af, hvad fælles samling skal gøre og indeholde for Visuel stil — ikke den fulde Vækstrum Context-struktur.

## Hvad er fælles samling?

Fælles samling markerer afslutningen på brugerens aktuelle tur gennem Visuel stil. Den skal hjælpe brugeren med at samle de valg, de har truffet i de vækstrum, der var relevante for dem, skabe sammenhæng mellem elementerne, og vurdere, om resultatet — den visuelle guide — kan bruges i praksis. Fælles samling betyder ikke, at arbejdet er færdigt eller permanent; resultatet er, som alt andet i Visuel stil, en prototype.

## Hvad samles her

Fælles samling trækker på outputtet fra hvert af de vækstrum, brugeren har arbejdet med:

- **Fra fælles åbning (Overblik):** brugerens indledende udgangspunktsoverblik og forståelse af sammenhængene mellem de fire elementer.
- **Fra Farver:** den valgte (eller foreløbige) farvepalet med begrundelse.
- **Fra Logo:** et nyt eller vurderet logo, med begrundelse for retning (behold/justér/byg nyt).
- **Fra Billeder:** kriterier for billedvalg og et afklaret overblik over rettigheder.
- **Fra Ikoner, fonte & andre grafiske byggesten:** valgt ikonstil, fonte og andre grafiske byggesten med retningslinjer for brug.

Har brugeren kun arbejdet med nogle af de fire uddybende vækstrum, samler fælles samling kun det, der reelt er relevant for dem — ikke et krav om, at alle fire skal være gennemført.

## Hvad fælles samling skal vise brugeren

Jf. skabelonens to budskaber, skal fælles samling for Visuel stil konkret vise:

**"Her er det, jeg har nu":**
- et samlet overblik over alle valgte elementer, med deres begrundelser — den visuelle guide i sin aktuelle form
- en kort sammenhængsvurdering: spiller de valgte elementer sammen på tværs (fx logo og farvepalet, billeder og ikonstil), jf. brief pkt. 8's fokus på, at visuelle valg og deres anvendelse ikke bør behandles isoleret
- en synlig oversigt over fravalg, ikke kun tilvalg — i tråd med DUF's princip om, at fravalg skal være lige så synlige som tilvalg

**"Her er det, jeg fortsat kan udvikle":**
- hvilke af de fire uddybende vækstrum brugeren endnu ikke har besøgt, og hvad de kunne bidrage med
- hvilke valg, der er markeret som foreløbige eller usikre, og som med fordel kan genbesøges senere
- en påmindelse om, at hele guiden er en prototype, der naturligt udvikler sig i takt med praksissen

**Tone:** anerkendelsen af det, brugeren har opnået, skal være underspillet og konkret — en opsummering af, hvad brugeren faktisk har taget stilling til, og en markering af, at de er et skridt nærmere målet. Ikke hyped op eller kåringsagtigt ("hvor er du sej"); det ville bryde med DUF's etablerede stemme (aldrig hype, jf. duf-core-context.md).

## Teknisk løsning (besluttet, foreløbig)

Som allerede besluttet i vækstområdets Context: til at starte med gemmer brugeren selv den visuelle guide eksternt (fx i egen note eller eget dokument), som DUF henviser til og hjælper med at strukturere undervejs. Den ønskede løsning på sigt er, at DUF selv kan bygge og gemme guiden løbende (fx via en JavaScript-baseret løsning), men det forudsætter en form for login/brugerkonto, som endnu ikke er på tegnebrættet. Dette er derfor et bevidst, midlertidigt kompromis for fælles samling — ikke en endelig beslutning om, hvordan den skal fungere permanent.

**Konkret forslag til bro frem mod login (2026-09-06):** fremfor at bygge fælles samling som endnu et selvstændigt vækstrum, foreslås en lille, delt "gem til visuel guide"-funktion — betydeligt mindre end en fuld flowEngine — som hvert af de fire vækstrum kan kalde i deres afsluttende dokumentationsmodul, og som fælles samling læser fra. Det gør det muligt at samle op automatisk, uden at det kræver login, og uden at ændre på, at fælles samling forbliver en afslutningsskærm frem for et vækstrum med eget ID.

Løsningen er bevidst designet, så den kan udskiftes med en rigtig konto/database-løsning senere, uden at fælles samling skal skrives om fra bunden.

**Designprincip — browserlagring er et tilvalg, ikke et krav:** DUF beslutter aldrig noget på brugerens vegne (jf. duf-core-context.md). Det princip gælder også opbevaring af egne data. Løsningen skal derfor:
- som udgangspunkt gemme i browserens lokale lager (`localStorage`) for brugerens bekvemmelighed
- men give brugeren et tydeligt, let tilgængeligt valg om at fravælge det — nogle brugere vil bevidst hellere holde deres egne oplysninger selv, uanset tillidsniveauet til DUF som afsender, og det er en gyldig og sund præference, ikke noget der skal frarådes eller gøres besværligt at vælge
- aldrig straffe eller gøre fravalget vanskeligere at finde end tilvalget

**Kendt begrænsning ved `localStorage`:** data overlever, at brugeren lukker browseren og vender tilbage senere — men er bundet til den ene browser på den ene enhed. Skifter brugeren enhed, browser, bruger en privat/inkognito-fane, eller rydder browserdata, er informationen væk uden varsel. Det er en reel svaghed for en bruger, der fx starter på telefonen og fortsætter på laptopen.

**Forslag — download som PDF (2026-09-06):** fremfor kun en tekstlig "kopiér din guide ud"-løsning, foreslås fælles samling at afsluttes med en "download din visuelle guide som PDF"-knap. Det kan bygges helt i browseren (fx med et JavaScript-bibliotek som jsPDF eller html2pdf.js) — uden server og uden login — og løser det, `localStorage` ikke kan: en downloadet PDF følger brugeren på tværs af enheder, kan printes, deles med en samarbejdspartner eller grafiker, og er noget, brugeren definitivt *har*, uafhængigt af browser og cookies. Den bør afsluttes med en stille kreditering, fx "Udarbejdet ved hjælp af DUF Vækstcenter" — i tråd med DUF's stemme (en anerkendelse af processen, ikke en salgsplakat).

PDF'en erstatter dermed den tidligere idé om en ren tekstkopi som det, der bærer guiden på tværs af enheder; `localStorage` (med sit opt-out, jf. designprincippet ovenfor) står tilbage som den rene bekvemmelighed inden for samme browser undervejs i besøget.

*Afhængighed, værd at være opmærksom på:* PDF'ens værdi som *visuel* guide afhænger af, om Farver, Logo og Billeder får understøttet billedupload (jf. deres respektive åbne spørgsmål om dette) — uden faktiske billeder af logo, farveprøver eller udvalgte billeder bliver PDF'en en fin, læsbar tekstguide, men ikke en visuel én. Se separat drøftelse om billedupload.

## Principper for fælles samling

- Resultatet er en prototype, ikke et færdigt eller permanent produkt.
- Fælles samling skal både vise, hvad brugeren har opnået, og hvad der stadig kan udvikles — aldrig kun det ene.
- Fravalg gøres lige så synlige som tilvalg, i tråd med DUF's generelle princip herom.
- Fælles samling må ikke kræve, at brugeren har gennemført alle fire uddybende vækstrum — den samler det, der reelt er relevant for den enkelte bruger.
- Sammenhængen mellem elementerne (farve, logo, billede, ikon/font) vurderes samlet her, selvom hvert element er valgt i sit eget vækstrum.
- Browserlagring af brugerens data er et tilvalg, aldrig et krav — jf. designprincippet ovenfor.

## Forbindelser videre

- **Fælles åbning (Overblik):** leverer det indledende udgangspunkt, fælles samling bygger videre på.
- **Farver, Logo, Billeder, Ikoner/fonte & andre grafiske byggesten:** leverer hver deres del af den visuelle guide.
- **Branding, Hjemmeside, Sociale medier, Markedsføring:** naturlige forbindelser til, hvor den samlede visuelle guide efterfølgende skal bruges i praksis.

## Hvad skal vi lære?

- Hvordan den tekniske løsning konkret skal udvikle sig, når (og hvis) et login/brugerkonto-system kommer på plads.
- Om sammenhængsvurderingen ("spiller elementerne sammen?") kan understøttes konkret af DUF, eller om det i praksis forbliver en refleksionsøvelse for brugeren selv (foreløbig antagelse: sidstnævnte, indtil andet er besluttet).
- Om en kort, tekstlig opsummering er tilstrækkelig, eller om brugerne har behov for en mere visuel samlet oversigt (fx et "moodboard"-lignende overblik) over deres valgte elementer.
- Om brugerne oplever fælles samling som en naturlig afrunding, eller om den føles overflødig, hvis de kun har besøgt ét eller to af de fire uddybende vækstrum.
- Hvordan fravalget af browserlagring konkret skal se ud i UI'en (fx et synligt valg ved første besøg, eller en indstilling brugeren kan ændre løbende), så det reelt er let at finde og ikke opleves som en bortgemt undtagelse.
- Om PDF-download skal være den eneste eksportmulighed, eller om der også er behov for en ren tekstversion (fx for skærmlæsere, eller brugere der vil redigere guiden videre selv).
