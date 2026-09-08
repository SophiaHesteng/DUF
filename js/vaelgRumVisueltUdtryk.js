/*----------------------------------------------------------------------------
 * DUF — "Vælg dit rum" (Visuelt udtryk)
 * ----------------------------------------------------------------------------
 * Markerer hvert uddybende rum, brugeren allerede har gemt output for
 * (jf. js/storage/vaekstrumStorage.js), med et "✓ Gennemført"-badge på
 * rummets kort. Rent visuelt - ændrer ikke noget i selve lagringen, og
 * forhindrer ikke brugeren i at gå ind i et allerede gennemført rum igen.
 * ----------------------------------------------------------------------------
 */

import { getSavedVaekstrumIds } from "./storage/vaekstrumStorage.js";

export async function initVaelgRumVisueltUdtryk() {
    const savedIds = await getSavedVaekstrumIds();

    savedIds.forEach((roomId) => {
        const card = document.querySelector(`[data-room-id="${roomId}"]`);
        if (!card) return;

        const status = card.querySelector("[data-room-status]");
        if (status) status.hidden = false;
    });
}
