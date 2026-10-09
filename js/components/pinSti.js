/*----------------------------------------------------------------------------
 * DUF — delt pin-og-sti-navigation
 * ----------------------------------------------------------------------------
 * En række klikbare pins forbundet af en sti, hvor det aktive trin har en
 * grøn ring. Bygget første gang til dørkarrusellen (vaelg-din-dor.html), men
 * lavet som en selvstændig komponent, så navigationslinjerne i vækstrummene
 * (moduler/bobler, js/components/navLinje.js) kan genbruge den.
 *
 * Stiens streg (2px, #7B8582) og pins' kant er hentet fra "Navigation"-
 * sektionen i Figma (node 481:1990). Ringen bruger $navCTAColor fremfor
 * Pin.svg's #16D02F, som kun har kontrast 1,9:1 mod baggrunden.
 *
 * Brug (dørkarrusellen - alle pins kan klikkes, aktiv sættes bagefter):
 *   const sti = renderPinSti(container, {
 *       labels: ["Gå til dør 1: ...", ...],  // aria-label pr. pin
 *       ariaLabel: "Vælg dør",               // aria-label for hele rækken
 *       onSelect: (index) => { ... }
 *   });
 *   sti.setActive(2);
 *
 * Valgfrit (navigationslinjerne): `states` giver hver pin en tilstand -
 * "faerdig", "aktiv" eller "ikke-naaet". En "ikke-naaet"-pin er deaktiveret
 * og kan ikke klikkes. `className` lægges på rækken (fx "pin-sti--fuld").
 * ----------------------------------------------------------------------------
 */

const STATE_CLASS = {
    faerdig: "is-faerdig",
    aktiv: "is-active",
    "ikke-naaet": "is-ikke-naaet"
};

export function renderPinSti(container, { labels, ariaLabel, onSelect, states, className = "" }) {
    container.innerHTML = `
        <ol class="pin-sti${className ? ` ${className}` : ""}" aria-label="${ariaLabel}">
            ${labels.map((label, index) => {
                const state = states?.[index];

                return `
                <li class="pin-sti-trin">
                    <button type="button" class="pin-sti-pin${state ? ` ${STATE_CLASS[state]}` : ""}" data-index="${index}" aria-label="${label}"${state === "aktiv" ? ' aria-current="step"' : ""}${state === "ikke-naaet" ? " disabled" : ""}>
                        <span class="pin-sti-prik" aria-hidden="true"></span>
                    </button>
                </li>
            `;
            }).join("")}
        </ol>
    `;

    const pins = [...container.querySelectorAll(".pin-sti-pin")];

    pins.forEach((pin, index) => {
        pin.addEventListener("click", () => onSelect(index));
    });

    function setActive(activeIndex) {
        pins.forEach((pin, index) => {
            const isActive = index === activeIndex;

            pin.classList.toggle("is-active", isActive);

            if (isActive) {
                pin.setAttribute("aria-current", "step");
            } else {
                pin.removeAttribute("aria-current");
            }
        });
    }

    return { setActive };
}
