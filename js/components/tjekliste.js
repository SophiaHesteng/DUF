/*----------------------------------------------------------------------------
 * DUF — delt Tjekliste-komponent (afkrydsningspunkter)
 * ----------------------------------------------------------------------------
 * En liste af selvstændige, afkrydsbare punkter - IKKE en formular med
 * rigtige/forkerte svar, og ikke forgrenende. Første brug: Billeder Modul 7.2
 * (9 rettighedspunkter), men bevidst generisk, så den kan genbruges af andre
 * vækstrum senere (fx Byggesten, Logo, Fælles samling - ikke bygget dertil nu).
 *
 * Samme mønster som components/exitDoor.js: markup + adfærd samlet ét sted,
 * så et rum blot kalder renderTjekliste() i stedet for at bygge sin egen
 * afkrydsningsliste.
 *
 * Gemt tilstand er hvilke punkt-id'er der er afkrydset, pr. gemNoegle - så
 * flere tjeklister ikke kolliderer i lagringen. Klientsidet (localStorage),
 * ingen server, samme princip som resten af Billeder. Respekterer brugerens
 * generelle browserlagrings-fravalg (js/storage/vaekstrumStorage.js), så et
 * fravalg også gælder tjeklister.
 *
 * Viser altid en synlig overskrift (`titel`, standard "Tjekliste"), så det er
 * tydeligt fra start, at punkterne er en tjekliste (brugertest 1, 2026-09-24).
 * Under punkterne en diskret "Send listen til mig selv"-knap (`mailKnap`,
 * standard true): et rent mailto:-link, der åbner brugerens eget mailprogram
 * med titel, punkter ([x]/[ ]) og en evt. `afslutning` udfyldt. Ingen server,
 * ingen mailtjeneste. Afkrydsningerne læses i det øjeblik, der trykkes.
 *
 *   renderTjekliste(container, {
 *       gemNoegle, punkter,
 *       titel,       // valgfri, standard "Tjekliste"
 *       afslutning,  // valgfri: afsluttende linje, der kommer med nederst i mailen
 *       mailKnap     // valgfri, standard true
 *   });
 * ----------------------------------------------------------------------------
 */

import { isStorageOptedOut } from "../storage/vaekstrumStorage.js";

function storageKey(gemNoegle) {
    return `duf-tjekliste-${gemNoegle}`;
}

function loadCheckedIds(gemNoegle) {
    if (isStorageOptedOut()) return new Set();

    try {
        const raw = localStorage.getItem(storageKey(gemNoegle));
        return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
        return new Set();
    }
}

function saveCheckedIds(gemNoegle, checkedIds) {
    if (isStorageOptedOut()) return;
    localStorage.setItem(storageKey(gemNoegle), JSON.stringify([...checkedIds]));
}

/*---- Fjerner evt. html-mærker fra en tekst, så mailen kun indeholder ren tekst ----*/
function plainText(value) {
    const el = document.createElement("div");
    el.innerHTML = String(value ?? "");
    return (el.textContent || "").trim();
}

/*---- encodeURIComponent koder æ/ø/å som UTF-8, mellemrum som %20 (ikke +) og linjeskift (\r\n) som %0D%0A - det læser Outlook, Gmail og Apple Mail korrekt ----*/
function buildMailtoHref(titel, punkter, checkedIds, afslutning) {
    const linjer = [
        plainText(titel),
        "",
        ...punkter.map((punkt) => `${checkedIds.has(punkt.id) ? "[x]" : "[ ]"} ${plainText(punkt.tekst)}`)
    ];

    if (afslutning) linjer.push("", plainText(afslutning));
    linjer.push("", "Sendt fra DUF, Dit visuelle udtryk.");

    const emne = `Min tjekliste fra DUF: ${plainText(titel)}`;
    return `mailto:?subject=${encodeURIComponent(emne)}&body=${encodeURIComponent(linjer.join("\r\n"))}`;
}

export function renderTjekliste(container, { gemNoegle, punkter, titel = "Tjekliste", afslutning = "", mailKnap = true }) {
    const checkedIds = loadCheckedIds(gemNoegle);

    function render() {
        container.innerHTML = `
            <h3 class="section-subheading tjekliste-titel">${titel}</h3>
            <ul class="tjekliste">
                ${punkter.map((punkt) => `
                    <li class="tjekliste-punkt">
                        <label class="tjekliste-label">
                            <input type="checkbox" class="tjekliste-checkbox" data-punkt-id="${punkt.id}" ${checkedIds.has(punkt.id) ? "checked" : ""}>
                            <span>${punkt.tekst}</span>
                        </label>
                        ${punkt.hjaelpetekst ? `<p class="tjekliste-hjaelpetekst">${punkt.hjaelpetekst}</p>` : ""}
                    </li>
                `).join("")}
            </ul>
            <p class="tjekliste-fremdrift">${checkedIds.size} af ${punkter.length} tjekket</p>
            ${mailKnap ? `
                <div class="tjekliste-mail">
                    <a class="btn btn--slim btn--outline-green tjekliste-mail-knap" href="mailto:">Send listen til mig selv</a>
                    <p class="tjekliste-mail-hint">Åbner dit eget mailprogram. Har du ikke et mailprogram sat op på denne enhed, sker der ikke noget.</p>
                </div>` : ""}
        `;

        /*---- href bygges først ved klik, så det, brugeren lige har krydset af, kommer med ----*/
        container.querySelector(".tjekliste-mail-knap")?.addEventListener("click", (event) => {
            event.currentTarget.href = buildMailtoHref(titel, punkter, checkedIds, afslutning);
        });

        container.querySelectorAll(".tjekliste-checkbox").forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                const punktId = checkbox.dataset.punktId;

                if (checkbox.checked) {
                    checkedIds.add(punktId);
                } else {
                    checkedIds.delete(punktId);
                }

                saveCheckedIds(gemNoegle, checkedIds);
                render();
            });
        });
    }

    render();
}
