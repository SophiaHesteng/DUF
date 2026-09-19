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

export function renderTjekliste(container, { gemNoegle, punkter }) {
    const checkedIds = loadCheckedIds(gemNoegle);

    function render() {
        container.innerHTML = `
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
        `;

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
