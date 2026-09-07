/*----------------------------------------------------------------------------
 * DUF — synligt, altid tilgængeligt valg om browserlagring
 * ----------------------------------------------------------------------------
 * Gør fravalget fra js/storage/vaekstrumStorage.js opdagbart i selve sitet
 * (ikke kun i storage-demo.html). Rendres ind i ethvert #storage-notice-
 * element på siden - no-op hvis elementet ikke findes, jf. mønsteret i
 * components/footer.js. Lagring er stadig tilvalgt som udgangspunkt (jf.
 * docs/duf-faelles-samling-visuel-stil.md) - denne komponent spørger ikke
 * "må vi gemme", den viser bare, at det sker, og gør det let at fravælge.
 * ----------------------------------------------------------------------------
 */

import { isStorageOptedOut, setStorageOptOut } from "../storage/vaekstrumStorage.js";

function render(container) {
    const optedOut = isStorageOptedOut();

    const text = optedOut
        ? "Du har fravalgt, at dine valg fra vækstrummene gemmes i denne browser. Intet nyt gemmes."
        : "Dine valg fra vækstrummene gemmes automatisk i denne browser, så du kan samle dem i Fælles samling og downloade dem som PDF. Det bliver kun på din egen enhed.";

    const buttonLabel = optedOut ? "Tillad lagring igen" : "Fravælg lagring";
    const buttonClass = optedOut ? "btn--outline-green" : "btn--outline-orange";

    container.innerHTML = `
        <p class="section-body" style="margin-bottom:12px;">${text}</p>
        <button type="button" id="storage-notice-toggle" class="btn btn--slim ${buttonClass}">${buttonLabel}</button>
    `;

    container.querySelector("#storage-notice-toggle").addEventListener("click", async () => {
        if (!optedOut) {
            const confirmed = window.confirm(
                "Fravælger du lagring, ryddes alt, du allerede har gemt fra vækstrummene i denne browser. Vil du fortsætte?"
            );

            if (!confirmed) return;
        }

        await setStorageOptOut(!optedOut);

        /*---- Reload frem for lokal re-render - andre dele af siden (fx Fælles samlings gemte rum/PDF-knap) kan afhænge af det samme lager, og skal opdateres konsistent ----*/
        window.location.reload();
    });
}

export function renderStorageNotice() {
    const container = document.querySelector("#storage-notice");

    if (!container) return;

    render(container);
}
