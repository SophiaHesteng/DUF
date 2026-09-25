/*----------------------------------------------------------------------------
 * DUF — Byggesten-forhåndsvisning "Prøv dem sammen" (Byggesten Modul 6.1)
 * ----------------------------------------------------------------------------
 * Selvstændig komponent. Besluttet af Heidi: egen kode, IKKE delt med
 * farverUi.js eller fontvaelger.js - evt. sammenlægning er udskudt bevidst.
 * Derfor også sin egen lille font-indlæser herunder.
 *
 * Viser et samlet eksempel bygget af det, brugeren faktisk har valgt - kun
 * de elementer, `fokusvalg` siger, hun har arbejdet med (alle kombinationer,
 * inkl. kun ét emne). Gemt palet fra Farver og gemt logo fra Logo vises ved
 * siden af, hvis de findes.
 *
 *   renderProvSammen(container, {
 *       fokusvalg: ["ikoner", "fonte", "andreByggesten"],
 *       ikon: { foelelse, tekst },          // kun brugt hvis "ikoner" er valgt
 *       fonte: { overskrift, broedtekst },  // kun brugt hvis "fonte" er valgt
 *       andenByggesten: { type: "detalje", beskrivelse, billede } | { type: "retning", retning, tekst } | null,
 *       gemtPalet: { farver: [{ hex, role }], tekstfarve, kombination: { tekst, baggrund } } | null,
 *                  // kun `kombination` (Farvers afprøvede par) farver eksemplet - ellers standardfarverne
 *       gemtLogo: { blob, navn } | null,
 *       billede: { src, alt } | null        // valgfrit, vises øverst i kortet (Billeder 8.1, runde 7)
 *   });
 *
 * Genbruges fra 2026-09-25 i Billeder 8.1 ("Sådan kunne det se ud"), med et
 * billede øverst - Heidis beslutning efter brugertest 1, som erstatter
 * "selvstændig komponent"-beslutningen nedenfor for netop den brug. Uden
 * `billede` er kortet præcis som i Byggesten.
 *
 * Ikonet: skal være et konkret Material Symbols-ikon i den valgte følelse
 * (besluttet 2026-09-23). TODO: selve motivet bestemmer Marcus, og koblingen
 * følelse → stil (Outlined/Rounded/Sharp) + fyld (0/1) står i "DUF Teknisk -
 * Byggesten-forhåndsvisning (Prøv dem sammen)", som endnu ikke ligger i
 * repoet. Indtil da vises en neutral pladsholder med følelsens navn.
 * ----------------------------------------------------------------------------
 */

const GOOGLE_FONTS_CSS = "https://fonts.googleapis.com/css2";
const indlaeste = new Map();

function indlaesFont(navn) {
    const clean = (navn || "").trim();
    if (!clean) return Promise.resolve(false);
    if (indlaeste.has(clean)) return indlaeste.get(clean);

    const promise = new Promise((resolve) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${GOOGLE_FONTS_CSS}?family=${encodeURIComponent(clean).replace(/%20/g, "+")}&display=swap`;
        link.onload = () => document.fonts.load(`16px "${clean}"`).then(() => resolve(true)).catch(() => resolve(false));
        link.onerror = () => { link.remove(); resolve(false); };
        document.head.appendChild(link);
    });

    indlaeste.set(clean, promise);
    return promise;
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
}

function ikonHtml(ikon) {
    if (!ikon) return "";
    /*---- TODO (Marcus + teknisk spec): erstat pladsholderen med et Material Symbols-ikon i den valgte stil/fyld ----*/
    return `
        <div class="prov-sammen-ikonlinje">
            <span class="prov-sammen-ikon prov-sammen-ikon--${escapeHtml(ikon.foelelse)}" role="img" aria-label="Ikon: ${escapeHtml(ikon.tekst)}"></span>
            <span class="prov-sammen-ikontekst">En kort linje tekst ved siden af ikonet</span>
        </div>
        <p class="prov-sammen-note">Ikonstil: ${escapeHtml(ikon.tekst)}</p>`;
}

/*---- Den anden byggesten: en uploadet/beskrevet detalje, eller en af 5.2b's retninger vist som et lille, konkret element ----*/
function andenHtml(anden) {
    if (!anden) return "";

    if (anden.type === "detalje") {
        const billede = anden.billede ? `<img class="prov-sammen-detalje-billede" src="${URL.createObjectURL(anden.billede)}" alt="Din detalje">` : "";
        const tekst = anden.beskrivelse ? `<p class="prov-sammen-note">Din detalje: ${escapeHtml(anden.beskrivelse)}</p>` : "";
        return billede || tekst ? `<div class="prov-sammen-anden">${billede}${tekst}</div>` : "";
    }

    switch (anden.retning) {
        case "streg":
            return `<hr class="prov-sammen-streg">`;
        case "ramme":
            return `<blockquote class="prov-sammen-ramme">"Et citat i en fast ramme."</blockquote>`;
        case "knapper":
            return `<span class="prov-sammen-knap">Book en tid</span>`;
        case "moenster":
            return `<div class="prov-sammen-moenster" role="img" aria-label="Et gentaget mønster"></div>`;
        default:
            return `<p class="prov-sammen-note">Din egen detalje: ${escapeHtml(anden.tekst)}</p>`;
    }
}

/*---- Standardfarver, når brugeren ikke har et afprøvet farvepar fra Farver (Heidis valg 2026-09-24, samme som fontvælgeren - bevidst egen kopi, jf. øverst i filen): mørk lilla baggrund, meget lys grøn tekst ----*/
const STANDARD_FARVER = { tekst: "#E8F5E0", baggrund: "#3B1F4A" };

function eksempelFarver(gemtPalet) {
    const kombination = gemtPalet?.kombination;
    return kombination ? { ...kombination, fraPalet: true } : { ...STANDARD_FARVER, fraPalet: false };
}

function sideHtml(gemtPalet, gemtLogo) {
    if (!gemtPalet && !gemtLogo) return "";

    const palet = gemtPalet?.farver?.length
        ? `<div>
                <p class="prov-sammen-sidelabel">Din palet</p>
                <div class="palette-preview">${gemtPalet.farver.map((c) => `<span class="palette-swatch" style="background-color:${c.hex}" title="${escapeHtml(c.role || c.hex)}"></span>`).join("")}</div>
           </div>`
        : "";

    const logo = gemtLogo
        ? `<div>
                <p class="prov-sammen-sidelabel">Dit logo</p>
                <img class="prov-sammen-logo" src="${URL.createObjectURL(gemtLogo.blob)}" alt="Dit logo">
           </div>`
        : "";

    return `<aside class="prov-sammen-side">${palet}${logo}</aside>`;
}

/*---- Valgfrit billede øverst i kortet (Billeder 8.1, runde 7, jf. docs/duf-teknisk-prov-sammen.md). Uden `billede` er markup'en uændret, så Byggesten Modul 6 ser ud som før ----*/
function billedeHtml(billede) {
    if (!billede?.src) return "";
    return `<img class="prov-sammen-billede" src="${billede.src}" alt="${escapeHtml(billede.alt || "")}">`;
}

export function renderProvSammen(container, { fokusvalg = [], ikon = null, fonte = {}, andenByggesten = null, gemtPalet = null, gemtLogo = null, billede = null } = {}) {
    if (!container) return;

    const medIkoner = fokusvalg.includes("ikoner");
    const medFonte = fokusvalg.includes("fonte");
    const medAnden = fokusvalg.includes("andreByggesten");

    const farver = eksempelFarver(gemtPalet);

    container.innerHTML = `
        <div class="prov-sammen">
            <div class="prov-sammen-eksempel${billede?.src ? " prov-sammen-eksempel--med-billede" : ""}" style="background-color:${farver.baggrund};color:${farver.tekst};">${billedeHtml(billede)}
                <p class="prov-sammen-overskrift">Din praksis, dit rum</p>
                <p class="prov-sammen-broedtekst">En kort tekst om, hvordan du arbejder, og hvad dine klienter kan forvente, når de kommer til dig.</p>
                ${medIkoner ? ikonHtml(ikon) : ""}
                ${medAnden ? andenHtml(andenByggesten) : ""}
                ${medFonte ? `<p class="prov-sammen-note">${[fonte.overskrift && `Overskrift: ${escapeHtml(fonte.overskrift)}`, fonte.broedtekst && `Brødtekst: ${escapeHtml(fonte.broedtekst)}`].filter(Boolean).join(" · ")}</p>` : ""}
            </div>
            ${sideHtml(gemtPalet, gemtLogo)}
        </div>
        <p class="prov-sammen-note">${farver.fraPalet
            ? `Vist i den tekst- og baggrundsfarve, du afprøvede i Farver (${farver.tekst} på ${farver.baggrund}).`
            : "Når du har lavet en palet i Farver, vises eksemplet i dine egne farver."}</p>`;

    /*---- Uden valgte fonte vises eksemplet i DUF's egne skrifttyper ----*/
    if (medFonte) {
        const saet = (selector, font) => {
            if (!font) return;
            indlaesFont(font).then(() => {
                const el = container.querySelector(selector);
                if (el) el.style.fontFamily = `"${font}", sans-serif`;
            });
        };
        saet(".prov-sammen-overskrift", fonte.overskrift);
        saet(".prov-sammen-broedtekst", fonte.broedtekst);
        saet(".prov-sammen-ikontekst", fonte.broedtekst);
    }
}
