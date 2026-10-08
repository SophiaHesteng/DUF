/*----------------------------------------------------------------------------
 * DUF — "Vælg dit rum" (Visuelt udtryk for din praksis)
 * ----------------------------------------------------------------------------
 * Markerer hvert rum, brugeren allerede har gemt output for
 * (jf. js/storage/vaekstrumStorage.js), med et "✓ Gennemført"-badge på
 * rummets kort. Rent visuelt - ændrer ikke noget i selve lagringen, og
 * forhindrer ikke brugeren i at gå ind i et allerede gennemført rum igen.
 * ----------------------------------------------------------------------------
 */

import { getSavedVaekstrumIds } from "./storage/vaekstrumStorage.js";
import { VISUELT_VAEKSTRUM_ID, GAMMELT_VISUELT_VAEKSTRUM_ID } from "./storage/udgangspunkt.js";

export async function initVaelgRumVisueltUdtryk() {
    // Reserve for det grundlæggende rums gamle ID ("overblik") - kan fjernes, før siden går offentligt live
    const savedIds = (await getSavedVaekstrumIds()).map((id) => (id === GAMMELT_VISUELT_VAEKSTRUM_ID ? VISUELT_VAEKSTRUM_ID : id));

    savedIds.forEach((roomId) => {
        const card = document.querySelector(`[data-room-id="${roomId}"]`);
        if (!card) return;

        const status = card.querySelector("[data-room-status]");
        if (status) status.hidden = false;
    });
}
