/*----------------------------------------------------------------------------
 * DUF — delt navigationslinje (modul-linjen og boble-linjen i vækstrummene)
 * ----------------------------------------------------------------------------
 * Én komponent, brugt to gange pr. skærm: modul-linjen øverst og boble-linjen
 * under den (lidt mindre, `lille: true`). Bygger videre på pin-og-sti fra
 * dørkarrusellen (js/components/pinSti.js) i stedet for en kopi.
 *
 * Tilstanden for hver pin følger af `aktiv`: trin før det aktive er færdige,
 * trin efter er ikke nået endnu. Trin før det aktive, der står i
 * `sprungetOver` (indeks), er moduler, brugerens vej gik uden om. Tilstanden
 * vises med størrelse, udfyldning og kant (CSS) og står i hver pins
 * aria-label, så den ikke kun ligger i farven. Færdige pins og den aktive pin
 * kan klikkes; "ikke nået"- og "sprunget over"-pins er deaktiveret.
 *
 * Brug:
 *   renderNavLinje(container, {
 *       label: "Modul 5 af 8 · Farvernes roller",  // synlig overskrift
 *       ariaLabel: "Moduler i Farver",
 *       trin: ["Modul 1: Hvorfor farver betyder noget", ...],
 *       aktiv: 4,
 *       onSelect: (index) => { ... },
 *       sprungetOver: [],   // valgfrit
 *       lille: false
 *   });
 * ----------------------------------------------------------------------------
 */

import { renderPinSti } from "./pinSti.js";

const STATE_TEXT = {
    faerdig: "færdig",
    aktiv: "her er du nu",
    "ikke-naaet": "ikke nået endnu",
    "sprunget-over": "ikke en del af din vej"
};

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export function renderNavLinje(container, { label, ariaLabel, trin, aktiv, onSelect, sprungetOver = [], lille = false }) {
    container.innerHTML = `
        <div class="nav-linje${lille ? " nav-linje--lille" : ""}">
            <p class="nav-linje-label">${escapeHtml(label)}</p>
            <div class="nav-linje-pins"></div>
        </div>
    `;

    const states = trin.map((_, index) => {
        if (index < aktiv) return sprungetOver.includes(index) ? "sprunget-over" : "faerdig";
        if (index === aktiv) return "aktiv";
        return "ikke-naaet";
    });

    renderPinSti(container.querySelector(".nav-linje-pins"), {
        ariaLabel: escapeHtml(ariaLabel),
        labels: trin.map((navn, index) => escapeHtml(`${navn}, ${STATE_TEXT[states[index]]}`)),
        states,
        className: `pin-sti--fuld${lille ? " pin-sti--lille" : ""}`,
        onSelect: (index) => {
            if (index <= aktiv && !sprungetOver.includes(index)) onSelect(index);
        }
    });
}
