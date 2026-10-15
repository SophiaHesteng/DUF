/*----------------------------------------------------------------------------
 * DUF — "Vælg dit rum" (Visuelt udtryk for din praksis)
 * ----------------------------------------------------------------------------
 * Markerer hvert rum, brugeren allerede har gemt output for
 * (jf. js/storage/storage.js), med et "✓ Gennemført"-badge på
 * rummets kort. Rent visuelt - ændrer ikke noget i selve lagringen, og
 * forhindrer ikke brugeren i at gå ind i et allerede gennemført rum igen.
 * ----------------------------------------------------------------------------
 */

import { getSavedSideIds } from "./storage/storage.js";

export async function initVaelgRumVisueltUdtryk() {
    const savedIds = await getSavedSideIds();

    savedIds.forEach((roomId) => {
        const card = document.querySelector(`[data-room-id="${roomId}"]`);
        if (!card) return;

        const status = card.querySelector("[data-room-status]");
        if (status) status.hidden = false;
    });
}
