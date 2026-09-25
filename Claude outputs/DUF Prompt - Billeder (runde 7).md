# Prompt til Claude Code: Billeder, runde 7 (efter brugertest 1)

*Gemt 2026-09-25. Billeder-manuskriptet er opdateret efter første brugertest og godkendt af Heidi i sin helhed. Kilde: [[DUF Manuskript - Billeder]] (runde 7) og [[DUF Brugertest 1 - Visuelt vækstområde (sortering)]]. De to alvorligste fund i hele testen lå her: brugeren skulle huske sine billeder fra en tidligere side (5.1), og hun vidste ikke, hvad stockfotos var, eller hvor hun skulle lede (Modul 4).*

Kopiér alt herunder ind i Claude Code i VS Code, i roden af DUF-projektet
(`C:\Users\Heidi Kristoffersen\OneDrive - IBA Erhvervsakademi Kolding\DUF\DUF\`).

---

## Før du går i gang

- **Manuskriptet:** Heidi har lagt den opdaterede fil `duf-manuskript-billeder.md` (runde 7) i `docs/` og erstattet den gamle. Brug den som kilde til al tekst, og kopiér teksterne derfra ord for ord. Er filen ikke opdateret (fx mangler knappen "Jeg har ikke nogen billeder endnu" i 3.1), så stop og sig det til Heidi.
- **Vent, til Overblik runde 7 er færdig og merged.** Billeder 3.1 bruger funktionen `hentUdgangspunkt()`, som bygges dér. Spørg Heidi, om den er klar.
- Spørg Heidi, om du skal bruge en ny branch. Gæt ikke selv.
- Læs de eksisterende filer, som de ser ud i dag: `js/data/billeder.js`, `billederEngine.js`, `billederUi.js`, `js/components/provSammen.js` og den kode, der gemmer "Billeder fra min praksis" og "Min inspiration".
- Er noget uklart i, hvordan manuskriptet skal oversættes til koden, så spørg i stedet for at gætte.

---

## De syv ændringer

**1. Modul 3: en vej for brugeren uden egne billeder.** Se tabellen øverst i Modul 3.
- 3.1 får knappen "Jeg har ikke nogen billeder endnu" under upload-feltet, med sin egen respons. "Jeg har tilføjet mine billeder" vises først, når mindst ét billede er tilføjet.
- Gem valget som `harEgneBilleder` (true/false).
- Uden egne billeder: 3.3 og 3.5 springes over, og 3.4 vises i sin variant. Navigationslinjen skal vise det rigtige antal bobler for hver vej.
- 3.1 viser sin variant af introteksten, når `hentUdgangspunkt()?.starterFraBunden` er `true`. Har brugeren ikke været i Overblik, vises den almindelige tekst.
- 6.1 får sin variant af første sætning, når `harEgneBilleder` er `false`.

**2. Modul 4: søgeord, der følger med, og rigtige links.**
- Valgte søgeord fra 4.2 gemmes som `valgteSoegeord[]` (fravalg virker allerede efter fejlrettelserne).
- 4.3 får den nye tekst og fire knapper: "Søg på Pinterest", "Søg på Google Billeder", "Søg på Unsplash" og "Søg på Pexels". Hver knap åbner stedets søgeside i et nyt vindue med det valgte søgeord i adressen. Har brugeren valgt flere søgeord, vælger hun, hvilket hun søger på. Uden søgeord åbner knapperne stedets forside.
- Saml de fire søge-adresser ét sted i koden (fx et lille objekt i `js/data/billeder.js`), så de er lette at rette. **Test hver adresse i browseren**, før du bruger den.
- Det skal fremgå tydeligt, at knapperne åbner i et nyt vindue (fx et lille ikon og `aria-label`). Brug `rel="noopener"`.
- 4.4 får øverst en lille linje med brugerens valgte søgeord og de samme søge-knapper.

**3. En genbrugelig billedvælger/-visning.** 5.1, 5.3, 7.5 og 8.1 skal alle vise brugerens billeder som små billeder. Byg det som én lille komponent (fx `js/components/billedvaelger.js`) med to måder at bruge den på:
- **Vis:** små billeder, der ved tryk åbner i stor størrelse oven på siden (lightbox) med pile og et kryds. Brugeren forlader ikke boblen. Luk også med Esc og ved tryk uden for billedet.
- **Vælg:** små billeder, hvor ét kan vælges og markeres.
- Kilder: "Billeder fra min praksis" og "Min inspiration", vist med hver sin lille overskrift. Tom kilde udelades. **Byg den, så en ekstra kilde let kan tilføjes senere** (et lille DUF-arkiv med frie billeder er besluttet, men bygges ikke nu).

**4. Modul 5: billederne vises igen.**
- 5.1: ny første sætning, og brugerens billeder fra Min inspiration vises øverst med billedvisningen (vis-udgaven).
- 5.3: samme visning øverst.

**5. Boble 5.4: ordene i grupper, og valgene vises med det samme.**
- De 30 ord vises i de fem grupper fra manuskriptet, med overskrift. På mobil kan grupperne foldes ud en ad gangen.
- Øverst står feltet "Sådan vil jeg gerne opleves", som opdateres, hver gang et ord vælges eller fravælges. Maks. 3 ord gælder stadig, og brugerens egne ord tæller med.

**6. Boble 7.5: kontrasttesten i rummet.**
- Ny tekst. Brugeren vælger et billede (vælg-udgaven af billedvælgeren).
- Billedet vises med eksempelteksten "Book en tid hos mig" ovenpå.
- Tekstfarven kan skiftes mellem farverne i brugerens gemte palet fra Farver (samme læsning som i Billeder 6.4). Uden palet: hvid og sort.
- En knap slår en halvgennemsigtig mørk eller lys boks bag teksten til og fra.
- Svarer brugeren "Nej, det er svært at læse", fremhæves boks-knappen, og tippet vises.
- Intet måles automatisk. Det er brugerens egen vurdering.

**7. Boble 8.1: forhåndsvisning med "Prøv dem sammen".**
- Ny tekst. Brugeren vælger et billede (vælg-udgaven).
- **Udvid den eksisterende `js/components/provSammen.js`** med en valgfri `billede`-parameter. Byg ikke en ny komponent. Se den opdaterede spec i `docs/duf-teknisk-prov-sammen.md`, som Heidi har lagt der. Kort fortalt: billedet vises øverst i kortet, med overskrift og brødtekst under.
- Kortet bruger brugerens gemte palet (Farver), skrifttyper og ikon (Byggesten) og logo (Logo), hvis de findes. Mangler de, bruges DUF's egne standardfarver og -fonte.
- **Byggesten må ikke ændre sig:** Uden `billede` skal kortet se præcis ud som i dag. Test Byggesten Modul 6 efter ændringen.
- To knapper, begge til 8.2: "Jeg har prøvet det i praksis" og "Jeg har ingen steder at prøve det af på endnu".

---

## Uden for scope

- DUF-arkivet med frie billeder. Byg kun billedvælgeren, så det kan tilføjes senere.
- Linket til fagpersoner i 7.6 er parkeret.
- Rør ikke Modul 1, 2 og 6 (bortset fra 6.1's variant), og heller ikke 7.1–7.4, 7.6, 7.7, 8.2 og 8.3.
- Rør ikke andre rum, bortset fra den bagudkompatible udvidelse af `provSammen.js`.

---

## Før du melder færdig

List de filer, du har ændret, og bekræft med en kort manuel test i **Chrome og Edge**, på desktop og i smal (mobil) visning:

1. **Med billeder:** Upload et billede i 3.1. Du går igennem 3.3, 3.4 og 3.5 som før.
2. **Uden billeder:** Tryk "Jeg har ikke nogen billeder endnu". 3.3 og 3.5 springes over, 3.4 og 6.1 viser deres varianter. Hvis Overblik er gennemført med "Jeg har ikke noget endnu", viser 3.1 sin variant.
3. **Søgning:** Vælg to søgeord i 4.2. I 4.3 åbner hver af de fire knapper den rigtige søgeside i et nyt vindue med søgeordet udfyldt. 4.4 viser søgeordene og knapperne.
4. **Billedvisning:** 5.1 og 5.3 viser inspirationsbillederne. Et tryk forstørrer dem, og de kan lukkes med kryds, Esc og tryk udenfor.
5. **5.4:** Fem grupper. "Sådan vil jeg gerne opleves" opdateres med det samme. Maks. 3 ord.
6. **7.5:** Vælg et billede. Tekstfarve og boks kan skiftes. "Nej" fremhæver boks-knappen.
7. **8.1:** Forhåndsvisningen viser billedet og brugerens palet/fonte/logo, hvis de findes, og ellers standardudseendet. Begge knapper fører til 8.2.
8. **Byggesten Modul 6** ser ud og virker som før.
9. `docs/duf-manuskript-billeder.md` matcher manuskriptet.
