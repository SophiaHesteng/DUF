/*----------------------------------------------------------------------------
 * DUF — Material Symbols-ikoner i de fire ikon-stile (Byggesten, runde 7)
 * ----------------------------------------------------------------------------
 * Den ene kortlægning fra Byggestens fire ikon-følelser (Boble 3.1) til
 * Material Symbols' egne akser, jf. docs/duf-teknisk-prov-sammen.md:
 *   Enkle streger         = Outlined, fyld 0
 *   Fyldte ikoner         = Outlined, fyld 1
 *   Runde og bløde        = Rounded
 *   Skarpe og geometriske = Sharp
 *
 * Bruges af Byggesten (1.2, 3.1, 3.5, 7.1) og af provSammen.js, så brugeren
 * ser de samme tre ikoner hele vejen. Ikonerne hentes fra Google Fonts - kun
 * de tre eksempel-ikoner (`icon_names`), så filerne er små. Uden internet
 * vises ikonets navn som tekst i stedet (samme fallback-ånd som fontvælgeren).
 * ----------------------------------------------------------------------------
 */

export const IKON_STILE = {
    enkleStreger: { familie: "Material Symbols Outlined", fyld: 0, navn: "Outlined" },
    fyldte: { familie: "Material Symbols Outlined", fyld: 1, navn: "Outlined, med fyld (Fill)" },
    runde: { familie: "Material Symbols Rounded", fyld: 0, navn: "Rounded" },
    skarpe: { familie: "Material Symbols Sharp", fyld: 0, navn: "Sharp" }
};

/*---- De tre eksempel-ikoner (manuskriptets forslag), i den rækkefølge de vises ----*/
export const EKSEMPEL_IKONER = [
    { navn: "call", tekst: "Telefon" },
    { navn: "calendar_month", tekst: "Book tid" },
    { navn: "spa", tekst: "Behandling" }
];

/*---- icon_names skal stå i alfabetisk rækkefølge i Google Fonts' URL ----*/
const IKON_NAVNE = EKSEMPEL_IKONER.map((ikon) => ikon.navn).sort().join(",");
const FAMILIER = ["Outlined", "Rounded", "Sharp"];
const CSS_URL = `https://fonts.googleapis.com/css2?${FAMILIER.map((f) => `family=Material+Symbols+${f}:FILL@0..1`).join("&")}&icon_names=${IKON_NAVNE}&display=block`;

let indlaest = null;

/*---- Henter de tre ikon-skrifttyper én gang pr. side. Løser altid (aldrig reject) ----*/
export function indlaesMaterialSymbols() {
    if (indlaest) return indlaest;

    indlaest = new Promise((resolve) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = CSS_URL;
        link.onload = () => resolve(true);
        link.onerror = () => resolve(false);
        document.head.appendChild(link);
    });

    return indlaest;
}

/*---- Ét ikon i en given stil. Ukendt stil → Outlined uden fyld ----*/
export function materialIkonHtml(ikonNavn, stilId, { label = "" } = {}) {
    indlaesMaterialSymbols();
    const stil = IKON_STILE[stilId] || IKON_STILE.enkleStreger;
    const aria = label ? `role="img" aria-label="${label}"` : `aria-hidden="true"`;
    return `<span class="material-ikon" style="font-family:'${stil.familie}';font-variation-settings:'FILL' ${stil.fyld};" ${aria}>${ikonNavn}</span>`;
}

/*---- De tre eksempel-ikoner på række, evt. med en kort tekst under hvert ----*/
export function ikonRaekkeHtml(stilId, { medTekst = false } = {}) {
    return `
        <span class="material-ikon-raekke">
            ${EKSEMPEL_IKONER.map((ikon) => `
                <span class="material-ikon-eksempel">
                    ${materialIkonHtml(ikon.navn, stilId, { label: medTekst ? "" : ikon.tekst })}
                    ${medTekst ? `<span class="material-ikon-tekst">${ikon.tekst}</span>` : ""}
                </span>`).join("")}
        </span>`;
}
