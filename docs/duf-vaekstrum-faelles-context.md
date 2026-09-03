# Fælles Vækstrum Context

> Exported from the DUF claude.ai Project ("DUF Vækstrum Fælles Context.docx") on 2026-09-03. Describes the shared principles/fields that apply to **every** vækstrum (room), regardless of type. Builds under [duf-core-context.md](./duf-core-context.md); [duf-vaekstrum-grundlaeggende-context.md](./duf-vaekstrum-grundlaeggende-context.md) and [duf-vaekstrum-uddybende-context.md](./duf-vaekstrum-uddybende-context.md) build on top of this one.

## Formål med dette dokument

Fælles grundlag for hvad et vækstrum *er*, hvor det hører hjemme, hvilket formål det har, hvornår det er relevant, hvilke forudsætninger der gælder, hvad det indeholder, hvilket resultat det fører til, og hvilke forbindelser det skaber videre i DUF.

## Identitet og placering

**Vækstrum-ID** — hvert vækstrum får et unikt, stabilt ID brugt som reference på tværs af context-dokumenter, indhold, systemlogik, navigation og forbindelser. ID-struktur: `vækstområde-navn-nummer`, fx `BRA-VIS-001`. Skal ikke afhænge af noget der ændrer sig over tid (fx dato).

**Navn** — tydeligt navn der viser overordnet fokus.

**Type** — `grundlæggende` eller `uddybende`. Påvirker hvordan brugeren møder vækstrummet, hvilke forudsætninger der gælder, og hvordan det forbindes med andre vækstrum.

**Hjem** — hvert vækstrum har ét fast hjem (det vækstområde det hører til). Ændres ikke af at det også er relevant andre steder.

**Forbindelser** — et vækstrum kan have forbindelser til andre vækstområder/vækstrum. En forbindelse ændrer ikke hjem eller identitet.

**Selvstændig enhed** — et vækstrums faglige værdi må ikke afhænge af at det kun forstås som "trin 4 ud af 12", selvom det indgår i en fast progression.

**Rolle vs. type** — type = hvilken slags vækstrum; rolle = hvilken funktion det har i vækstområdets progression. To forskellige ting.

## Formål med vækstrummet

Hold adskilt:
- **Behov** — hvorfor vækstrummet kan være relevant.
- **Formål** — hvad vækstrummet skal hjælpe brugeren med.
- **Resultat** — hvad brugeren konkret står tilbage med.

Et vækstrum skal ikke forsøge at løse hele vækstområdets formål — kun sin egen afgrænsede del.

## Udviklingsbevægelse og fast flow

Beskrives som **Fra → Til**. Ikke én fast brugerrejse — brugere kommer ind med forskellige erfaringer/udgangspunkter/ressourcer. Vækstrummets indhold er på forhånd defineret og kurateret (ikke individuelt konstrueret per bruger). Kan indeholde faste dele, afhængigheder og foruddefinerede branches — ikke nødvendigvis lineært, men altid inden for på forhånd definerede muligheder.

## Behov og relevans

Skal tydeliggøre: hvilke behov det konkrete vækstrum hjælper med, hvilke relevanssignaler peger mod det, og — vigtigt — **hvornår det ikke er relevant**. Et vækstrum skal ikke anbefales alene fordi det findes.

## Forudsætninger og adgang

Tre adskilte typer:
- **Faglige/praktiske forudsætninger** — hvad brugeren reelt skal have på plads (en afklaring, beslutning, grundlag, materiale, resultat, forståelse). Brugeren kan opnå dette uden at have gennemført et bestemt DUF-vækstrum.
- **Systemmæssige forudsætninger** — hvad systemet kræver for adgang. Ikke nødvendigvis det samme som faglig parathed.
- **Alternativ adgang og merit** — mulighed for adgang på anden vis, hvis brugeren allerede har forudsætningerne udefra. Proces defineres separat.

## Vækstrummets enheder

De dele der tilsammen udgør indholdet — på forhånd defineret og kurateret (ikke skabt individuelt per bruger). Kan bygge på hinanden, have fast rækkefølge, være afhængige. Et vækstrum er et kurateret læringsrum med foruddefinerede branches, ikke nødvendigvis en lineær sti.

## Resultat

Skal være tydeligt og håndgribeligt — hvad står brugeren konkret tilbage med? Behøver ikke være færdigt/permanent — kan være et arbejdsredskab, værktøj, guide, grundlag, afklaring, første udkast, eller materiale til videreudvikling. I uddybende vækstrum skal implementering i egen praksis være en eksplicit del.

## Vækstrumsspecifikke principper

Principper placeres på rette niveau: DUF-wide → DUF Core Context. Hele vækstområdet → Vækstområde Context. Kun dette vækstrum → Vækstrum Context (her). Undgå at gentage generelle principper unødigt.

## Myter, bias og bullshit

Identificér myter/misforståelser/bias/urealistiske forventninger specifikt relevante for dette vækstrum. Formål: gøre DUF's egen tilgang tydelig og bevidst, ikke kun undgå at AI reproducerer dem. Kun det specifikt relevante for dette vækstrum her — mere generelt hører til Core/Vækstområde Context.

## Forbindelser videre

Hvad kan blive relevant som næste skridt efter dette vækstrum? Identificér andre vækstrum/vækstområder der potentielt bliver relevante, og signaler der peger på dem. Skal ikke betyde at alle brugere automatisk fortsætter samme vej — grundlag for en fremtidig **"Hvad så nu?"**-funktion baseret på gennemførte vækstrum, opnåede resultater, tidligere identificerede behov, og forbindelser fra det aktuelle vækstrum.

**Støtte undervejs** — for hvert vækstrum: hvor kan brugeren gå i stå, hvilken hjælp er relevant, kan hjælpen gives gennem indholdet, skal der være menneskelig støtte? (Hvordan hjælpen gives, og om den bruger tokens, er et produkt-/adgangsspørgsmål — ikke låst her.)

## Samlet princip

Et vækstrum er en **fast og kurateret udviklingsenhed** med: ét hjem, tydeligt formål, defineret udviklingsbevægelse, defineret/kurateret indhold og struktur, identificerbare behov det kan hjælpe med, tydelige forudsætninger, håndgribeligt resultat, potentielle forbindelser videre.

Brugeren modtager ikke et individuelt konstrueret vækstrum — det individuelle ligger i **om** vækstrummet er relevant, **hvornår** det bliver relevant, og **hvordan** det indgår i brugerens samlede flow gennem DUF.
