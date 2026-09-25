# Prompt til Claude Code: Logo, runde 7 (efter brugertest 1)

*Gemt 2026-09-25. Logo-manuskriptet er opdateret efter første brugertest og godkendt af Heidi i sin helhed. Kilde: [[DUF Manuskript - Logo]] (runde 7) og [[DUF Brugertest 1 - Visuelt vækstområde (sortering)]], T4, T6 og U2. Fejlene i 5.1, 6.1N og 8.1 og tjeklisternes overskrift og mail-knap er allerede bygget i fejlrettelsesrunden. Dette er de resterende tekst- og UI-ændringer.*

Kopiér alt herunder ind i Claude Code i VS Code, i roden af DUF-projektet
(`C:\Users\Heidi Kristoffersen\OneDrive - IBA Erhvervsakademi Kolding\DUF\DUF\`).

---

## Før du går i gang

- **Manuskriptet:** Heidi har lagt den opdaterede fil `duf-manuskript-logo.md` (runde 7) i `docs/` og erstattet den gamle. Brug den som kilde til al tekst, og kopiér teksterne ord for ord. Mangler fx ordet "favicon" i 1.4, er filen ikke opdateret. Så stop og sig det til Heidi.
- **Vent, til Farver runde 7 er færdig og merged**, så runderne ikke ændrer i de samme fælles filer samtidig. Spørg Heidi, om den er klar.
- Spørg Heidi, om du skal bruge en ny branch. Gæt ikke selv.
- Læs de eksisterende filer: `js/data/logo.js`, `js/engine/logoEngine.js`, `js/engine/logoUi.js` og den kode, der viser logoet i de tre små størrelser i Modul 7.
- Er noget uklart, så spørg i stedet for at gætte.

---

## De seks ændringer

**1. Boble 1.4: flere udgaver af logoet.**
Tilføj den nye linje (med "favicon") efter "på lyse og mørke baggrunde", før guide-citatet.

**2. Boble 2C.2: tilføjelse til "Begge".**
Tilføj den nye sætning i responsen for "Navn og symbol sammen". Da 4.4 genbruger 2C.2, skal den også stå dér.

**3. Boble 3.1: bro til Looka.**
Tilføj den nye afsluttende linje efter hovedteksten (før tippene for spor C).

**4. Boble 6.2: forklaringer, der kan foldes ud.**
- Indledningen hedder nu "Vælg den vej, der giver mest mening for dig." efterfulgt af linjen "Tryk på pilen ved en mulighed for at læse lidt mere om den."
- Den fjerde mulighed hedder nu "Jeg vil have en grafiker eller en anden til at lave det". Den fører stadig til spor D's forløb (2D.2 og frem).
- Hver mulighed får en lille pil, som folder den korte forklaring fra manuskriptet ud under sig. At folde ud må **ikke** vælge muligheden. Det er stadig et tryk på selve valget, der vælger. Hold de to ting tydeligt adskilt, også på mobil og med tastatur (pilen skal være en rigtig knap med `aria-expanded`).
- Justér-versionen har de samme, uden Looka.

**5. Boble 6.4: udgave med kun symbolet.**
Tilføj den nye sætning under Canva og under Illustrator.

**6. Modul 7 og 8: den lille udgave og favicon.**
- **7.2, etiketter:** De tre små størrelser får hver en etiket: "Profilbillede" (ca. 64 px), "Lille profilbillede" (ca. 32 px) og "Favicon, ikonet i browserfanen" (16 px). Den mindste vises inde i en lille, tegnet browserfane (ren HTML/CSS: en fane med logoet og en kort sidetitel, fx "Min praksis"), så det er tydeligt, hvad et favicon er. Etiketterne gælder både hovedlogoet og den lille udgave.
- **7.2, lille udgave:** Under responsen (vises kun, når svaret ikke er "Ja") kan brugeren uploade en ekstra, lille udgave af sit logo, med teksten fra manuskriptet. Den vises i de tre små størrelser ved siden af hovedlogoet. Genbrug den eksisterende upload-mekanik. Gem den lokalt som `logoUploadLille`.
- **8.2:** Logo-siden i guiden viser den lille udgave ved siden af hovedlogoet, hvis den findes. Tjek, at den også kommer med, når siden føjes til Fælles samling.

---

## Uden for scope

- **Bobler, der springer videre af sig selv** (2A.1, 2A.2, 2D.1, 2D.3, 7.5): Heidi har besluttet, at de bliver, som de er. Rør dem ikke.
- Looka-vejledningen (Biblioteks-artikel), henvisning til fagpersoner og DUF's eget logo-tilbud er parkeret.
- Rør ikke andre bobler eller andre vækstrum.

---

## Før du melder færdig

List de filer, du har ændret, og bekræft med en kort manuel test i **Chrome og Edge**, på desktop og i smal (mobil) visning:

1. 1.4, 2C.2 ("Begge"), 4.4 og 3.1 viser de nye tekster.
2. **6.2:** Et tryk på pilen folder forklaringen ud uden at vælge muligheden. "Jeg vil have en grafiker eller en anden til at lave det" fører til spor D's tjekliste. Det virker også med tastatur.
3. **6.4:** Canva og Illustrator viser den nye sætning.
4. **7.2:** De tre størrelser har etiketter, og favicon vises i en tegnet browserfane. Svarer man "Næsten" eller "Nej", kan man uploade en lille udgave, som vises ved siden af.
5. **8.2:** Den lille udgave vises på logo-siden, hvis den er uploadet, og kommer med i Fælles samling.
6. `docs/duf-manuskript-logo.md` matcher manuskriptet.
