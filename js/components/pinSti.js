/*----------------------------------------------------------------------------
 * DUF — delt pin-og-sti-navigation
 * ----------------------------------------------------------------------------
 * En række klikbare pins forbundet af en sti, hvor det aktive trin har en
 * grøn ring. Bygget første gang til dørkarrusellen (vaelg-din-dor.html), men
 * lavet som en selvstændig komponent, så de planlagte navigationslinjer i
 * vækstrummene (moduler/bobler) kan genbruge den.
 *
 * Stiens streg (2px, #7B8582) og pins' kant er hentet fra "Navigation"-
 * sektionen i Figma (node 481:1990). Ringen bruger $navCTAColor fremfor
 * Pin.svg's #16D02F, som kun har kontrast 1,9:1 mod baggrunden.
 *
 * Brug:
 *   const sti = renderPinSti(container, {
 *       labels: ["Gå til dør 1: ...", ...],  // aria-label pr. pin
 *       ariaLabel: "Vælg dør",               // aria-label for hele rækken
 *       onSelect: (index) => { ... }
 *   });
 *   sti.setActive(2);
 * ----------------------------------------------------------------------------
 */

export function renderPinSti(container, { labels, ariaLabel, onSelect }) {
    container.innerHTML = `
        <ol class="pin-sti" aria-label="${ariaLabel}">
            ${labels.map((label, index) => `
                <li class="pin-sti-trin">
                    <button type="button" class="pin-sti-pin" data-index="${index}" aria-label="${label}">
                        <span class="pin-sti-prik" aria-hidden="true"></span>
                    </button>
                </li>
            `).join("")}
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
