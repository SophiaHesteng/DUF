# UDKAST — Logo-varianter i Logo

*Status: forslag til godkendelse (Heidi), 2026-11-04. Intet herfra er bygget endnu. Når teksterne er godkendt, flyttes de ind i `docs/duf-manuskript-logo.md`, og denne fil slettes.*

## Idéen

I dag arbejder rummet med ét logo, men mange har i virkeligheden flere udgaver af det samme logo. Rummet nævner det allerede flere steder (1.4, 2C.2, 4.4, 6.4, 7.2 og 8.2), men hvert sted for sig. Forslaget samler det til ét begreb, der går igen fra start til slut. Så bliver rummet mere sammenhængende uden at blive længere.

Varianterne er navngivet efter, hvad de skal bruges til, ikke efter hvordan de ser ud. Har hun kun sit navn som logo, har hun intet symbol, men hun kan stadig have en lille udgave (fx forbogstavet).

| Variant | Hvad det er | Hvor det bruges |
|---|---|---|
| **Det fulde logo** | Navn og symbol sammen, eller navnet alene | Hjemmeside, visitkort, plakater: der, hvor der er plads |
| **Den lille udgave** | Kun symbolet, eller kun forbogstavet | Profilbillede, små steder |
| **Favicon** | Den lille udgave i et kvadrat, helt småt | Det lille ikon i browserfanen |

**Afgrænsning:** Favicon er ikke en tredje tegning, hun skal lave. Det er den lille udgave, testet i favicon-størrelse. Farvevarianter (sort/hvid, lys og mørk baggrund) holdes uden for denne runde. De bliver ved med at være åbne punkter fra 7.3 og 7.4.

## Ændringer boble for boble

*Nye tekster står i citat. Det, der ikke er nævnt, er uændret.*

### 1.3b — troværdighed *(allerede rettet på `logo-gennemgang`)*
> … Et enkelt logo, du bruger konsekvent, slår tre forskellige logoer, der skifter fra sted til sted.

### 1.4 — Hvad et logo faktisk skal *(andet afsnit omskrevet)*
> Derfor har de fleste flere udgaver af det samme logo. Det fulde logo bruger du der, hvor der er plads, fx på hjemmesiden. Den lille udgave, fx kun symbolet eller dit forbogstav, bruger du de små steder, som dit profilbillede. Og den allermindste er det lille ikon i fanen øverst i browseren, når nogen besøger din hjemmeside. Det kaldes et favicon. Det er stadig ét logo. Det har bare tøj på til forskellige anledninger.

### 2D.2 — tjeklisten til samtalen *(ét punkt udvidet)*
> Får jeg både det fulde logo og en lille udgave (fx kun symbolet), også i en udgave, der kan bruges som favicon? Og i sort/hvid og til både lys og mørk baggrund?

### 6.4 — Vejledning til dit værktøj *(Canva og Illustrator: sidste afsnit omskrevet)*
> Når du er tilfreds med det fulde logo, så lav også den lille udgave. Har dit logo et symbol, er det symbolet alene. Er det kun dit navn, kan det være dit forbogstav. Den lille udgave skal du bruge de små steder, og den bliver også til dit favicon senere.

*Looka:* punktet "Har jeg set, hvad pakken indeholder" får tilføjet: "… og får jeg en lille udgave med?"

### 6.5 — Læg dit logo her *(to upload-felter i stedet for ét)*
> Er du nået til noget, du kan lide? Læg det her. Det er ikke en færdig version, bare den, du står med lige nu. Har du også en lille udgave, så læg den ved siden af. Har du den ikke endnu, går det også fint. Den kommer vi tilbage til i testen.

- Felt 1: "Dit fulde logo" (bucket `logo`, som i dag)
- Felt 2: "Din lille udgave (valgfrit)" (bucket `logo-lille`, som 7.2 allerede bruger)

### 7.2 — Tjek 1: Kan du kende det, når det er småt?
- Begge udgaver vises i de små størrelser, hvis hun har lagt dem ind, og den lille udgave også i favicon-størrelse (16 og 32 px, kvadratisk).
- Upload-feltet til den lille udgave vises **altid**, hvis hun ikke har en endnu, ikke kun ved "Næsten" og "Nej".

> Kig på logoet i lille størrelse, som på et ikon eller i en profil. Har du en lille udgave, ser du den her også, helt nede i størrelsen på et favicon. Kan du stadig kende det?

### 8.2 — Din logo-side i guiden
Viser det fulde logo og den lille udgave med hver sin overskrift ("Det fulde logo", "Den lille udgave"). Mangler den lille udgave, står der: "Den lille udgave mangler endnu" som åbent punkt.

## Teknisk *(til udvikling)*

- Ingen ny bucket: `logo` og `logo-lille` findes allerede.
- 6.5 skal kunne have to upload-felter. I dag kan en boble kun have ét `imageUpload`, så komponenten i `js/components/imageGallery.js` skal kunne kaldes to gange på samme skærm (de bruger faste id'er som `#image-upload-input` i dag).
- `js/visuelStyleGuide.js` skal kunne vise begge udgaver.

## Spørgsmål til jer

1. Er "det fulde logo" og "den lille udgave" de rigtige ord, eller vil I hellere bruge fagordene (fx "primært logo" og "logomærke")?
2. Skal favicon have sit eget valgfrie upload-felt, eller er det nok at teste den lille udgave i favicon-størrelse?
3. Er sætningen "Det har bare tøj på til forskellige anledninger" i 1.4 for meget?
