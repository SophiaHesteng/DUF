# Prompt til Claude Code: Byggesten, runde 7 (efter brugertest 1)

*Gemt 2026-09-25. Byggesten-manuskriptet er opdateret efter første brugertest og godkendt af Heidi i sin helhed. Kilde: [[DUF Manuskript - Byggesten]] (runde 7) og [[DUF Brugertest 1 - Visuelt vækstområde (sortering)]], afsnit 0, T9–T13, U9 og U10. Byggesten var det rum, hvor det var sværest for brugeren, der ikke har noget endnu. Fontvælgeren (F3) og det automatiske skift i 6.2 (F5) er allerede rettet. Del 2 retter tre små CSS-fejl, som Claude Code fandt under Billeder-runden.*

Kopiér alt herunder ind i Claude Code i VS Code, i roden af DUF-projektet
(`C:\Users\Heidi Kristoffersen\OneDrive - IBA Erhvervsakademi Kolding\DUF\DUF\`).

---

## Før du går i gang

- **Manuskriptet:** Heidi har lagt den opdaterede fil `duf-manuskript-byggesten.md` (runde 7) i `docs/` og erstattet den gamle. Brug den som kilde til al tekst, og kopiér teksterne ord for ord. Mangler fx boblen "Hvilke elementer består byggesten af?", er filen ikke opdateret. Så stop og sig det til Heidi.
- **Vent, til Logo runde 7 er færdig og merged**, så runderne ikke ændrer i de samme fælles filer samtidig. Spørg Heidi, om den er klar.
- Spørg Heidi, om du skal bruge en ny branch. Gæt ikke selv.
- Læs de eksisterende filer: `js/data/byggesten.js`, `js/engine/byggestenEngine.js`, `js/engine/byggestenUi.js`, `js/components/fontvaelger.js`, `js/components/provSammen.js` og hvor `hentUdgangspunkt()` ligger (fra Overblik runde 7).
- Er noget uklart, så spørg i stedet for at gætte.

---

## Del 1: Ændringerne i manuskriptet

**1. Ny boble 1.2, "Hvilke elementer består byggesten af?", og en vej for den, der starter fra bunden.**
- Knappen i 1.1 hedder nu "Hvilke elementer består byggesten af?" og fører til den nye 1.2.
- 1.2 viser ikoner, fonte og små detaljer med små eksempler i HTML/CSS: tre Material Symbols-ikoner (`call`, `calendar_month`, `spa`) med tekst, sætningen "Velkommen til min praksis" i to meget forskellige skrifttyper fra fontvælgerens liste, og en overskrift med en tynd streg under samt en knap med runde hjørner.
- De gamle 1.2–1.4 bliver til 1.3–1.5. Opdatér alle interne henvisninger.
- **1.3:** Er `hentUdgangspunkt()?.starterFraBunden` sand, er "Jeg starter næsten fra bunden" valgt på forhånd (kan ændres). Ved "Fra bunden" vises den ekstra sætning, og brugeren går **direkte til Modul 2**. 1.4 og 1.5 springes over.
- **2.1:** Ved "Fra bunden" vises varianten af valgmulighedernes tekster. Værdierne i `fokusvalg[]` er de samme.

**2. Knappen "Skift fokus" → "Gå til et andet emne".**
- Ny tekst på knappen. Første gang knappen vises i Modul 3, 4 eller 5, står forklaringslinjen fra manuskriptet under den. Den forsvinder, når knappen er brugt, eller når brugeren når Modul 6. Husk det i hukommelsen for besøget. Det behøver ikke gemmes varigt.
- Knappen fører som i dag til 2.1, med de valgte emner markeret.

**3. Overgange mellem emnerne.**
- Slutningen af 3.5, 4.6 og 5.2 (alle tre varianter) viser den overgangslinje og knaptekst, der passer til det næste modul (Fonte, Andre byggesten eller Modul 6). Alle tekster står i afsnittet "Overgange mellem emnerne".
- Øverst i Modul 3, 4 og 5 står fx "Emne 2 af 3: Fonte", men kun når brugeren har valgt mere end ét emne. Tallene følger det aktuelle `fokusvalg`.

**4. Modul 3: ikoner, man kan se.**
- **3.1:** Hver af de fire retninger vises med de samme tre ikoner (`call`, `calendar_month`, `spa`) i netop den stil: *Enkle streger* = Outlined, fyld 0 · *Fyldte ikoner* = Outlined, fyld 1 · *Runde og bløde* = Rounded · *Skarpe og geometriske* = Sharp. Mindst 32 px. Brug samme kortlægning som `provSammen.js`, og genbrug den gerne.
- **3.3:** Ny valgmulighed "Jeg har ingen ikoner endnu" → 3.4-Fri med sin egen indledning. Gem som `ikonKilde: "ingenEndnu"`.
- **3.5:** Den valgte stil vises med de tre eksempel-ikoner.

**5. Modul 4: udtryk, læsbarhed og kanaler.**
- **4.1:** Ny tekst og tre eksempler på overskriften "Velkommen til min praksis" (serif, sans-serif, håndskrevet/legende fra fontvælgerens liste) med etiketter, plus én linje brødtekst.
- **4.2:**
  - Varianten af spørgsmålet ved "Fra bunden".
  - Ny valgmulighed "På sociale medier" (→ `googleFontsDirekte: false`) med sit eget svar.
  - Ny valgmulighed "Det ved jeg ikke endnu" (kun ved "Fra bunden", → `googleFontsDirekte: true`) med sit eget svar.
  - **Kobling til Overblik:** Indeholder `hentUdgangspunkt()?.kanaler` `hjemmeside`, står "På min egen hjemmeside" øverst. Indeholder den `facebook`, `instagram`, `linkedin` eller `andreSociale`, står "På sociale medier" øverst. Vis noten "Du nævnte tidligere, at du har …" med de relevante kanaler. Intet er valgt på forhånd.
- **4.5:** Ny læsbarhedstest. Det korte afsnit fra manuskriptet vises i brugerens brødtekstfont to gange: 16 px og 13 px. Har hun en gemt palet, bruges hendes tekst- og baggrundsfarve. Tre svar: "Ja, begge er lette at læse" (→ 4.6) / "Den lille er svær at læse" (→ 4.6, med sin respons) / "Nej, begge er svære at læse" (→ 4.4). Gem `laesbarhedOk` som `ja` / `kunStor` / `nej`.

**6. Modul 5: 5.2b med eksempler.**
Hver retning vises med et lille eksempel i HTML/CSS: en streg under en overskrift, et citat i en ramme, en knap med runde hjørner og et lille mønster.

**7. Modul 7: oversigt, der kan bruges og rettes, og tommelfingerregel.**
- **7.1:** To dele.
  - **"Sådan ser det ud":** forhåndsvisningen fra 6.1 i lille størrelse.
  - **"Det skal du bruge":** fontnavne (med link til Google Fonts), ikonstilens navn i Material Symbols og eventuelle farvekoder fra den gemte palet. Hver linje har en "Kopiér"-knap, der kopierer til udklipsholderen og kort viser "Kopieret".
  - Ved hvert emne er et "Ret"-link, som sender brugeren til det relevante trin (samme mekanisme som 6.3). Bagefter lander hun tilbage i 7.1 i stedet for 6.1.
- **7.2:** Ny tekst. Over feltet står en påmindelse med brugerens egne valg. Under feltet står to-tre eksempler, bygget ud fra hendes valg (kun for emner, hun har arbejdet med), som kan trykkes ind i feltet og rettes. Brug manuskriptets eksempler som skabeloner, og indsæt hendes faktiske valg (fx fontnavnet).
- **7.3:** Listen "Det skal du bruge" kommer med i `begrundelse` til Fælles samling.

---

## Del 2: Tre små CSS-fejl (fundet under Billeder runde 7)

1. **To CSS-regler hedder begge `.palette-preview`.** Derfor får paletten i Farver 6.4 og "Din palet" i "Prøv dem sammen"-kortet en stor tom ramme. Omdøb den ene, så de ikke påvirker hinanden, og tjek begge steder bagefter.
2. **Småteksterne i "Prøv dem sammen"-kortet står med serif-skrift.** Det gælder både i Byggesten og i Billeder 8.1. De skal bruge rummets normale brødtekst-skrift. Kortets overskrift og brødtekst skal stadig vise brugerens valgte fonte.
3. **Overskriften i Billeder 4.5** ("INSPIRATIONSSAMLING") giver ca. 34 px vandret scroll på mobil. Lad ordet kunne brydes (fx `overflow-wrap: anywhere` eller `hyphens: auto` med `lang="da"`), eller gør skriften mindre på smalle skærme.

---

## Uden for scope

- **Boble 6.2:** Formuleringen "Hvordan føles det?" bliver, som den er. Rør den ikke.
- Biblioteks-artiklen om ikonrettigheder findes stadig ikke. Linket peger fortsat på en placeholder.
- Den fælles navigationslinje (modul og boble) bygges ikke her.
- Rør ikke andre vækstrum, bortset fra CSS-rettelserne i Del 2.

---

## Før du melder færdig

List de filer, du har ændret, og bekræft med en kort manuel test i **Chrome og Edge**, på desktop og i smal (mobil) visning:

1. **Med noget i forvejen:** 1.1 → 1.2 (de tre eksempler) → 1.3 → 1.4 → 1.5 → 2.1.
2. **Fra bunden** (Overblik gennemført med "Jeg har ikke noget endnu"): "Fra bunden" er valgt i 1.3, og man går direkte til 2.1, som viser varianten.
3. **"Gå til et andet emne":** Forklaringen vises første gang og forsvinder igen. Knappen fører til 2.1.
4. **Overgange:** Med Ikoner og Fonte valgt: "Emne 1 af 2" og "Emne 2 af 2", overgangslinjen efter 3.5 og knappen "Videre til fonte".
5. **3.1:** Fire retninger med tre rigtige ikoner i hver stil. "Jeg har ingen ikoner endnu" fører til 3.4-Fri med indledningen.
6. **4.2:** Med en hjemmeside og Instagram fra Overblik står de to valg øverst med noten. "På sociale medier" viser det rigtige svar.
7. **4.5:** Teksten vises i to størrelser, og de tre svar fører det rigtige sted hen.
8. **7.1:** "Kopiér" virker. "Ret" fører til det rigtige trin og tilbage til 7.1.
9. **7.2:** Eksemplerne passer til de valg, brugeren har truffet, og kan trykkes ind i feltet.
10. **Del 2:** Paletten i Farver 6.4 og kortet i Byggesten har ingen tom ramme. Kortets småtekster står ikke i serif. Billeder 4.5 har ingen vandret scroll på 390 px.
11. `docs/duf-manuskript-byggesten.md` matcher manuskriptet.
