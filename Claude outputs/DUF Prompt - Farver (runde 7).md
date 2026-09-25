# Prompt til Claude Code: Farver, runde 7 (efter brugertest 1)

*Gemt 2026-09-25. Farver-manuskriptet er opdateret efter første brugertest og godkendt af Heidi i sin helhed. Kilde: [[DUF Manuskript - Farver]] (runde 7) og [[DUF Brugertest 1 - Visuelt vækstområde (sortering)]], T3 og U3. Testbrugeren forstod ikke ordet "roller", valgte derfor kun én farve første gang og forstod først logikken ved kontrasttjekket. Hun ønskede også en tydeligere markering af kontrasten.*

Kopiér alt herunder ind i Claude Code i VS Code, i roden af DUF-projektet
(`C:\Users\Heidi Kristoffersen\OneDrive - IBA Erhvervsakademi Kolding\DUF\DUF\`).

---

## Før du går i gang

- **Manuskriptet:** Heidi har lagt den opdaterede fil `duf-manuskript-farver.md` (runde 7) i `docs/` og erstattet den gamle. Brug den som kilde til al tekst, og kopiér teksterne ord for ord. Mangler fx forslagene til roller i 6.2, er filen ikke opdateret. Så stop og sig det til Heidi.
- **Vent, til Billeder runde 7 er færdig og merged**, så de to runder ikke ændrer i de samme fælles filer (fx CSS) samtidig. Spørg Heidi, om den er klar.
- Spørg Heidi, om du skal bruge en ny branch. Gæt ikke selv.
- Læs de eksisterende filer: `js/data/farver.js`, `js/engine/farverEngine.js`, `js/engine/farverUi.js`, `js/engine/contrast.js` (især `contrastLevel()`), og hvor `hentUdgangspunkt()` ligger (bygget i Overblik runde 7).
- Er noget uklart, så spørg i stedet for at gætte.

---

## De seks ændringer

**1. Boble 3.1: variant for brugeren, der starter fra bunden.**
Når `hentUdgangspunkt()?.starterFraBunden` er `true`, udskiftes første afsnit med varianten fra manuskriptet. Ellers vises den almindelige tekst.

**2. Boble 5.2: hvorfor roller, med en lille skitse.**
- Tilføj det nye afsnit efter den eksisterende tekst.
- Ved siden af (på mobil: under) står en lille skitse af en hjemmeside eller et opslag i tre farver, hvor hver farve har en etiket: "Baggrund", "Tekst" og "Knap". Tegn den i HTML/CSS med DUF's egne design-tokens. Ingen billedfil. Etiketterne skal være rigtig tekst (ikke kun farve), så skærmlæsere kan læse dem.

**3. Boble 6.1: mindst to farver.**
- Tilføj den nye linje under introteksten.
- Trykker brugeren "Videre" med kun én farve, vises beskeden fra manuskriptet med to knapper: "Tilføj en farve" (bliver på skærmen, gerne med fokus på farvevælgeren) og "Gå videre med én farve". Vis den som en del af siden, ikke som en browser-popup (`alert`/`confirm`).
- Med to eller flere farver går brugeren videre som i dag.

**4. Boble 6.2: forslag til roller.**
- Over fritekstfeltet: linjen "Du kan vælge et forslag eller skrive med dine egne ord." og seks forslag som små knapper: *Baggrund · Tekst · Overskrifter · Knapper og links · Små detaljer · Sætter stemningen*.
- Et tryk sætter forslagets tekst ind i feltet, hvor brugeren kan rette i den. Er der allerede tekst i feltet, erstattes den (brugeren kan altid skrive videre).
- Intet andet ændres: det er stadig fritekst, der gemmes.

**5. Modul 7: tydelige markeringer, alle kombinationer og kun én farve.**
- **Markering:** Kontrastresultatet i 7.2 og overskriften over feedbacken i 7.3 viser altid symbol og tekst sammen, efter de tre niveauer fra `contrastLevel()`: **✓ Let at læse** · **~ Kan fungere** · **– Svær at læse**. Symbolet må gerne have en farve, men teksten skal altid stå der.
- **"Se alle dine kombinationer"** (i 7.2): et felt under tjekkeren, som kan foldes ud. Det viser alle par af farver fra paletten, i begge retninger (tekst på baggrund og omvendt), som små prøver med "Aa" i tekstfarven på baggrundsfarven og markeringen under. Et tryk på en prøve vælger den kombination i tjekkeren. Brug den eksisterende `contrast.js`. Har paletten mange farver, må feltet gerne blive et scrollbart gitter.
- **Kun én farve:** Har brugeren kun én farve, tilføjes hvid (#FFFFFF) og sort (#000000) som valgmuligheder for tekst og baggrund, med linjen fra manuskriptet. Hvid og sort føjes **ikke** til den gemte palet.
- **8.3** viser symbolet sammen med læsevenlighedsvurderingen.

**6. Modul 8: plads til den, der ikke har noget at prøve på.**
- **8.1:** Ny sidste linje. Forhåndsvisningen fra 6.4 vises i lille størrelse nederst (genbrug den eksisterende forhåndsvisning). To knapper, begge til 8.2: "Jeg har prøvet det i praksis" / "Jeg har ingen steder at prøve det af på endnu".
- **8.2:** Valgte brugeren den anden knap, vises varianten af teksten. Selve tekstfeltet og det, der gemmes, er det samme.

---

## Uden for scope

- Modul 1, 2, 4, 5.1, 5.3, 6.3, 6.4 og 7.1 er uændrede.
- Intern navigation mellem boblerne (så man kan hoppe tilbage til farvevælgeren) er planlagt som en fælles opgave for alle rum. Tag den ikke med her.
- Rør ikke andre vækstrum.

---

## Før du melder færdig

List de filer, du har ændret, og bekræft med en kort manuel test i **Chrome og Edge**, på desktop og i smal (mobil) visning:

1. **3.1:** Med Overblik gennemført med "Jeg har ikke noget endnu" vises varianten. Ellers den almindelige tekst.
2. **5.2:** Det nye afsnit og skitsen med de tre etiketter vises, også på mobil.
3. **6.1 med én farve:** Beskeden vises. "Tilføj en farve" bliver på skærmen. "Gå videre med én farve" går videre.
4. **6.2:** Et tryk på et forslag sætter teksten ind i feltet, og den kan rettes.
5. **Modul 7 med tre farver:** 7.2 og 7.3 viser symbol og tekst. "Se alle dine kombinationer" viser alle par med markering, og et tryk vælger kombinationen.
6. **Modul 7 med én farve:** Hvid og sort kan vælges, og linjen vises. 8.3 viser ikke hvid og sort i paletten.
7. **Modul 8:** Begge knapper i 8.1 virker, og 8.2 viser den rigtige tekst for hver.
8. `docs/duf-manuskript-farver.md` matcher manuskriptet.
