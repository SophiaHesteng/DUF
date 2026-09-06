/*---- Indhold til Fælles samling - Visuel stil (lukkeskærm, ikke et vækstrum - jf. docs/duf-faelles-samling-visuel-stil.md). Ingen manuskript findes for denne skærm (dokumentet er en kort specifikation, ikke en fuld Vækstrum Context), så teksten herunder er skrevet i DUF's etablerede tone ud fra specifikationens krav, ikke transskriberet fra et eksisterende manuskript. ----*/

import { ROOMS } from "./overblik.js";

/*---- Rækkefølgen, rummene vises i overalt på siden ----*/
export const ROOM_ORDER = ["farver", "logo", "billeder", "byggesten"];

export { ROOMS };

/*---- Genbruger Overbliks egne, allerede godkendte teaser-tekster (Modul 5) for "hvad rummet kan give dig" - ikke ny, opfundet copy ----*/
export const TEASERS = {
    farver: "En bevidst farvepalet, du kan bruge igen og igen — og en forklaring på, hvorfor den fungerer.",
    logo: "Enten et nyt logo, eller en klar vurdering af det, du allerede har — så du ved, om det gør sit arbejde.",
    billeder: "Kriterier for, hvilke billeder der passer til dig — og ro i maven om, at du må bruge dem.",
    byggesten: "De sidste detaljer på plads, så dit udtryk hænger sammen, også i det små."
};

export const copy = {
    intro: "Her samler vi det, du har arbejdet med i Visuel stil — uanset hvor mange af de fire rum du er nået omkring. Resultatet er en prototype, ikke et facit.",

    optedOutNotice: "Du har valgt, at dine ting ikke skal gemmes i browseren. Det er en gyldig præference — men det betyder også, at der ikke er noget at samle op her automatisk. Du kan stadig bruge dine egne noter undervejs til at samle din visuelle guide.",

    nowHeading: "Her er det, du har nu",
    nowIntro: "Sådan ser din visuelle guide ud lige nu.",

    coherenceHeading: "Spiller det hele sammen?",
    coherenceMulti: "Tag et kig på tværs af det, du har valgt: passer farverne og logoet sammen? Understøtter billederne og ikonstilen den samme fornemmelse? Det er ikke noget, vi kan afgøre for dig — men værd at mærke efter, mens du har det hele foran dig.",
    coherenceSingle: "Du er kun nået omkring ét rum indtil videre — sammenhængen på tværs bliver mere relevant at kigge på, når du har valgt mere.",
    coherenceNotesLabel: "Skriv gerne dine tanker her (kommer kun med i den PDF, du eventuelt downloader — gemmes ikke automatisk andre steder).",

    developHeading: "Her er det, du fortsat kan udvikle",
    developAllDone: "Du har nu arbejdet med alle fire rum. De venter, hvis du på et tidspunkt vil justere noget.",
    developClosing: "Uanset hvor du er nået til, er din visuelle guide en prototype. Den må gerne udvikle sig, i takt med at din praksis gør det.",

    pdfHeading: "Download din visuelle guide",
    pdfEmpty: "Du har endnu ikke gemt noget fra de fire rum, så der er ikke noget at downloade endnu.",
    pdfOptedOut: "Da browserlagring er fravalgt, er der ikke noget gemt at samle i en PDF.",
    pdfReady: "Saml det, du har valgt, i én PDF, du kan gemme, printe eller dele videre.",
    pdfCredit: "Udarbejdet ved hjælp af DUF Vækstcenter."
};
