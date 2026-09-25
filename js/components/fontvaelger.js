/*----------------------------------------------------------------------------
 * DUF — Skrifttype-vælger (fontvælger med Google Fonts)
 * ----------------------------------------------------------------------------
 * Selvstændig komponent til Byggestens Modul 4 (4.3 overskrift, 4.4 brødtekst).
 * Besluttet af Heidi: egen kode, IKKE delt med farverUi.js's palet-bygger,
 * selvom de ligner hinanden i ånd - evt. sammenlægning er udskudt bevidst.
 *
 * Fire par kuraterede Google Fonts-skrifttyper, vist som kort, med en
 * live-forhåndsvisning, der opdateres ved klik. Har brugeren en gemt palet
 * fra Farver, bruges den i forhåndsvisningen. Skrifttyperne hentes on demand
 * via Google Fonts' CSS API - kun de kuraterede (og et evt. manuelt skrevet
 * navn) hentes nogensinde.
 *
 * Afhænger af internet (accepteret for version 1). Kan en font ikke hentes,
 * vises en rolig besked, og brugeren kan altid skrive fontnavnet manuelt.
 *
 *   renderFontvaelger(container, {
 *       formaal: "overskrift" | "broedtekst",
 *       gemtPalet,   // valgfri: { farver, tekstfarve, kombination: { tekst, baggrund } } - kun `kombination` (Farvers afprøvede par) farver eksemplet
 *       valgt,       // valgfri: forudvalgt fontnavn (genbesøg)
 *       parFont,     // valgfri: overskriftsfonten, vist sammen med brødtekst i 4.4
 *       onVælg: (fontNavn) => { ... }
 *   });
 * ----------------------------------------------------------------------------
 */

/*---- Den kuraterede liste (fire stemninger × to skrifttyper), valgt af teamet og givet af Heidi 2026-09-25. Første font i hvert par er tænkt til overskrift, anden til brødtekst - vist som en lille markering på kortet, men begge kan vælges i både 4.3 og 4.4. Alle otte har æ/ø/å (Latin-1) på Google Fonts. ----*/
export const KURATEREDE_PAR = [
    { stemning: "Rolig og varm", fonte: ["Fraunces", "Karla"] },
    { stemning: "Klar og professionel", fonte: ["Lora", "Inter"] },
    { stemning: "Levende og personlig", fonte: ["Quicksand", "Nunito"] },
    { stemning: "Enkel og alsidig", fonte: ["Poppins", "Work Sans"] }
];

const ROLLE_TEKST = ["Forslag til overskrift", "Forslag til brødtekst"];

const GOOGLE_FONTS_CSS = "https://fonts.googleapis.com/css2";
const indlaeste = new Map();

/*---- Henter én skrifttype fra Google Fonts' CSS API. Løser altid (aldrig reject): true hvis fonten er klar, false hvis den ikke kunne hentes (offline, ukendt navn) ----*/
export function indlaesGoogleFont(navn) {
    const clean = (navn || "").trim();
    if (!clean) return Promise.resolve(false);
    if (indlaeste.has(clean)) return indlaeste.get(clean);

    const promise = new Promise((resolve) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${GOOGLE_FONTS_CSS}?family=${encodeURIComponent(clean).replace(/%20/g, "+")}&display=swap`;
        link.onload = () => {
            document.fonts.load(`16px "${clean}"`, "Aa Ææ Øø Åå")
                .then(() => resolve(document.fonts.check(`16px "${clean}"`)))
                .catch(() => resolve(false));
        };
        link.onerror = () => {
            link.remove();
            resolve(false);
        };
        document.head.appendChild(link);
    });

    indlaeste.set(clean, promise);
    return promise;
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
}

/*---- Standardfarver, når brugeren ikke har en gemt palet fra Farver endnu (Heidis valg 2026-09-24): mørk lilla baggrund, meget lys grøn tekst ----*/
const STANDARD_FARVER = { tekst: "#E8F5E0", baggrund: "#3B1F4A" };

/*---- Farver til forhåndsvisningen. Kun brugerens egen, afprøvede kombination fra Farvers kontrasttjek (Modul 7) bruges - ellers standardfarverne. Vi gætter ikke selv en baggrund ud fra paletten ----*/
function forhaandsvisningsFarver(gemtPalet) {
    const kombination = gemtPalet?.kombination;
    return kombination ? { ...kombination, fraPalet: true } : { ...STANDARD_FARVER, fraPalet: false };
}

export function renderFontvaelger(container, { formaal = "overskrift", gemtPalet = null, valgt = "", parFont = null, onVælg = () => {} } = {}) {
    if (!container) return;

    const erOverskrift = formaal === "overskrift";
    const farver = forhaandsvisningsFarver(gemtPalet);
    const kuraterede = KURATEREDE_PAR.flatMap((par) => par.fonte);
    let aktuel = valgt || "";

    const kortHtml = KURATEREDE_PAR.map((par) => `
        <div class="fontvaelger-gruppe">
            <p class="fontvaelger-stemning">${par.stemning}</p>
            <div class="fontvaelger-fonte">
                ${par.fonte.map((font, i) => `
                    <button type="button" class="choice-card choice-card--poll fontvaelger-font" aria-pressed="${font === aktuel}" data-font="${escapeHtml(font)}">
                        <span class="fontvaelger-font-prove" style="font-family:'${escapeHtml(font)}', sans-serif;">Aa Æø Å</span>
                        <span class="fontvaelger-font-navn">${escapeHtml(font)}</span>
                        ${ROLLE_TEKST[i] ? `<span class="fontvaelger-font-rolle">${ROLLE_TEKST[i]}</span>` : ""}
                    </button>`).join("")}
            </div>
        </div>`).join("");

    const manueltVaerdi = aktuel && !kuraterede.includes(aktuel) ? aktuel : "";

    container.innerHTML = `
        <div class="fontvaelger">
            ${KURATEREDE_PAR.length ? `<div class="fontvaelger-grupper">${kortHtml}</div>` : ""}
            <p class="fontvaelger-besked" id="fontvaelger-besked" aria-live="polite"></p>

            <div class="fontvaelger-preview" style="background-color:${farver.baggrund};color:${farver.tekst};" aria-label="Eksempel">
                <p class="fontvaelger-preview-overskrift">Din praksis, dit rum</p>
                <p class="fontvaelger-preview-broedtekst">En kort tekst om, hvordan du arbejder, og hvad dine klienter kan forvente, når de kommer til dig.</p>
            </div>
            <p class="fontvaelger-hint">${farver.fraPalet
                ? `Vist i den tekst- og baggrundsfarve, du afprøvede i Farver (${farver.tekst} på ${farver.baggrund}).`
                : "Når du har lavet en palet i Farver, vises eksemplet i dine egne farver."}</p>

            <label class="section-subheading" for="fontvaelger-manuelt">${KURATEREDE_PAR.length ? "Kan du ikke finde din font her? Skriv navnet i stedet" : "Skriv navnet på din font"}</label>
            <input id="fontvaelger-manuelt" class="text-input" type="text" autocomplete="off" value="${escapeHtml(manueltVaerdi)}" placeholder="Fx navnet fra dit eget værktøj">
        </div>`;

    const besked = container.querySelector("#fontvaelger-besked");
    const overskriftEl = container.querySelector(".fontvaelger-preview-overskrift");
    const broedtekstEl = container.querySelector(".fontvaelger-preview-broedtekst");
    const fontKnapper = [...container.querySelectorAll("[data-font]")];
    const manueltFelt = container.querySelector("#fontvaelger-manuelt");

    const saetFont = (el, font) => {
        el.style.fontFamily = font ? `"${font}", sans-serif` : "";
    };

    const opdaterPreview = async () => {
        const vist = erOverskrift ? overskriftEl : broedtekstEl;
        saetFont(vist, aktuel);
        besked.textContent = "";

        const font = aktuel;
        if (font) {
            const ok = await indlaesGoogleFont(font);
            /*---- Kun hvis brugeren ikke har valgt noget andet i mellemtiden ----*/
            if (!ok && font === aktuel) {
                besked.textContent = "Vi kan ikke vise den skrifttype her lige nu. Det er helt fint — navnet er gemt alligevel.";
            }
        }
    };

    /*---- I 4.4 vises brødteksten sammen med den allerede valgte overskriftsfont ----*/
    if (!erOverskrift && parFont) {
        indlaesGoogleFont(parFont).then(() => saetFont(overskriftEl, parFont));
    }

    /*---- Hent de kuraterede på forhånd, så kortene viser sig selv. Fejler de, forklarer vi roligt og peger på fritekst-feltet ----*/
    if (kuraterede.length) {
        Promise.all(kuraterede.map(indlaesGoogleFont)).then((resultater) => {
            if (resultater.some((ok) => !ok)) {
                besked.textContent = "Nogle af skrifttyperne kunne ikke hentes lige nu — måske er der ingen internetforbindelse. Du kan skrive navnet på din font i feltet herunder i stedet.";
            }
        });
    }

    fontKnapper.forEach((knap) => {
        knap.addEventListener("click", () => {
            aktuel = knap.dataset.font;
            fontKnapper.forEach((other) => other.setAttribute("aria-pressed", String(other === knap)));
            manueltFelt.value = "";
            onVælg(aktuel);
            opdaterPreview();
        });
    });

    let debounce = null;
    manueltFelt.addEventListener("input", () => {
        aktuel = manueltFelt.value.trim();
        fontKnapper.forEach((other) => other.setAttribute("aria-pressed", "false"));
        onVælg(aktuel);
        clearTimeout(debounce);
        debounce = setTimeout(opdaterPreview, 500);
    });

    opdaterPreview();
}
