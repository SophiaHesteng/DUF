Vi skal tilføje et nyt Modul 7 "Find eller skab dine billeder" i vækstrummet Billeder. Indholdet ligger færdigt i `docs/duf-manuskript-billeder-modul7.md`: tekster, typer, nøgler og noter til koden. Brug teksterne ordret, og find ikke selv på nyt indhold.

## Branch
Arbejd kun på branchen `billeder-modul7`. Tjek først, at du står på den. Du må ikke merge eller pushe.

## Regler (vigtige)
1. **Rør ikke andre rum.** Det gælder data, motorer, UI og manuskripter for Farver, det grundlæggende rum og alle andre rum. Farver-rummets gemte palet må kun læses, sådan som 6.4 og kontrasttesten allerede gør.
2. **Fælles komponenter må kun udvides** (fx `tjekliste.js`, `imageGallery.js`, `rumRamme.js`, `navLinje.js` og storage). Ændringer skal være nye, valgfrie felter. Uden dem skal komponenten opføre sig præcis som i dag.
3. **Kan en ændring i fælles kode ikke laves sådan, så stop og spørg mig.** Find ikke på en løsning selv.
4. **Gemmenøglerne må ikke ændres.** `modul7_kontrast`, `billeder-modul7-rettigheder`, `modul8_dokumentation` og alle andre eksisterende `answerKey`/`gemNoegle` beholdes uændrede, selvom modulerne får nye numre. Brugere, der allerede er i gang, må ikke miste deres svar.
5. Det nuværende repo er sandheden. Overskriv ikke mine manuelle rettelser nogen steder.

## Fremgangsmåde
**Trin 1: Undersøg og planlæg. Kod ikke endnu.**
- Læs `js/data/billeder.js`, `js/engine/billederEngine.js`, `js/engine/billederUi.js` og de komponenter, de bruger.
- Undersøg, hvordan Modul 3 forgrener sig i dag (`harEgneBilleder`, `kunMedEgneBilleder`, `udenEgneBilleder`).
- Søg i hele repoet efter henvisninger til billedrummets boble-id'er og modulnumre, fx `seOgsaaMaal.js`, `rumHistorik.js` og eventuelle links til "7.x" og "8.x".
- Giv mig en kort plan: hvilke filer du vil ændre, og om der skal ændres i fælles komponenter. Vent på mit OK.

**Trin 2: Byg det, når jeg har sagt OK.**
- **Data (`billeder.js`):**
  - Indsæt boblerne 7.1-7.11 efter 6.5.
  - Omdøb de gamle 7.x til 8.x og de gamle 8.x til 9.x.
  - Tilføj det nye modul i `moduler` uden fast `antalBobler`, ligesom Modul 3.
  - Lav ændringerne i tabellen "Ændringer i eksisterende tekster" bagerst i manuskriptet.
  - Ret henvisninger til modulnumre andre steder i repoet, men kun dem, der handler om billedrummet.
- **Forgrening:**
  - Valget i 7.1 gemmes som `modul7_vej` (`selv` / `find` / `begge`).
  - Lav et generelt felt, fx `kunVej: ["selv", "begge"]`, som motoren læser for at springe bobler over. Den eksisterende Modul 3-logik skal virke uændret.
  - 7.6 skal have en knaptekst pr. vej, og 7.7 skal have en indledende variant ved `begge`.
  - Tilbage-knappen og navigationslinjen skal passe med den vej, brugeren har valgt. Det gælder også, hvis hun går tilbage og vælger en anden vej.
- **7.5 billedliste:**
  - Tjekliste med egen `gemNoegle` (`billeder-modul7-billedliste`).
  - Viser brugerens svar fra 6.3 (`modul6_motiver.horer_til`) øverst, hvis det findes.
- **7.8 søgning:**
  - Genbrug `soegesteder`, men vis kun Unsplash og Pexels.
  - Byg søgeord fra brugerens ord (5.4) og stil (6.2) via en lille, fast oversættelsesliste fra dansk til engelsk. Placér listen i `billeder.js`, så jeg selv kan rette i den.
  - Har brugeren ikke valgt ord, bruges `valgteSoegeord` fra 4.2.
- **7.10 billed-upload:**
  - Ny samling `udvalgte`, mindst 3 billeder.
  - En udvej ("Jeg har ikke billederne endnu"), der virker som `ingenBilleder` i 3.1.
- **Ny rækkefølge for billeder:** kontrasttesten (nu 8.5) og forhåndsvisningen (nu 9.1) skal vise `udvalgte` først, derefter `praksis` og `inspiration`.
- **Manuskript:** Indsæt det nye modul i `docs/duf-manuskript-billeder.md`, og opdatér nummereringen dér, så manuskript og kode passer sammen.

**Trin 3: Test.** Gå alle tre veje igennem i browseren: `selv`, `find` og `begge`. Tjek:
- tilbage-knappen
- skift af vej undervejs
- navigationslinjen
- udvejen i 7.10
- at gamle gemte svar i Modul 8 og 9 stadig vises
- at Farver og det grundlæggende rum opfører sig som før

## Kode og kommentarer
- Følg filernes eksisterende stil, også `/*---- ... ----*/`-kommentarerne på dansk.
- Forklar nye felter og ny logik i kommentarer, så jeg og teamet selv kan rette i det bagefter.

## Afrapportering
Slut med:
1. En liste over **alle ændrede filer**. Markér tydeligt de filer, der ligger uden for billedrummet, og hvad der er ændret i dem.
2. Hvad du har testet, og hvad jeg selv bør teste.
3. Eventuelle steder, hvor du var i tvivl, eller hvor manuskriptet ikke kunne følges præcist.
