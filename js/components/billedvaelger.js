/*----------------------------------------------------------------------------
 * DUF — billedvælger/-visning (Billeder runde 7: Boble 5.1, 5.3, 7.5 og 8.1)
 * ----------------------------------------------------------------------------
 * Viser brugerens billeder som små billeder, grupperet efter kilde. To måder:
 *
 *   mode: "vis"   - et tryk åbner billedet stort oven på siden (lightbox) med
 *                   pile og et kryds. Luk også med Esc og ved tryk uden for
 *                   billedet. Brugeren forlader ikke boblen.
 *   mode: "vaelg" - ét billede kan vælges og markeres. onVaelg(billede) kaldes.
 *
 *   renderBilledvaelger(container, {
 *       kilder: [{ id, titel, billeder: [{ id, blob }] }],
 *       mode: "vis" | "vaelg",
 *       onVaelg: (billede) => {}     // kun "vaelg"; billede = { id, blob, src, kildeId }
 *   });
 *
 * En kilde uden billeder udelades. Kilderne er bare en liste, så en ekstra
 * kilde (fx det besluttede, endnu ikke byggede DUF-arkiv med frie billeder)
 * tilføjes ved at give en kilde mere med - komponenten kender intet til,
 * hvor billederne kommer fra. Det ejer billederEngine.js (hentBilledkilder).
 * ----------------------------------------------------------------------------
 */

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
}

export function renderBilledvaelger(container, { kilder = [], mode = "vis", onVaelg = null } = {}) {
    if (!container) return;

    const synligeKilder = kilder.filter((kilde) => kilde.billeder?.length);
    const alle = synligeKilder.flatMap((kilde) => kilde.billeder.map((billede) => ({
        ...billede,
        kildeId: kilde.id,
        src: URL.createObjectURL(billede.blob)
    })));

    if (!alle.length) {
        container.innerHTML = "";
        return;
    }

    const erVaelg = mode === "vaelg";
    let index = 0;

    container.innerHTML = synligeKilder.map((kilde) => `
        <div class="billedvaelger-kilde">
            <p class="billedvaelger-titel">${escapeHtml(kilde.titel)}</p>
            <div class="billedvaelger-liste">
                ${kilde.billeder.map(() => {
                    const billede = alle[index];
                    const html = `
                        <button type="button" class="billedvaelger-thumb" data-billede-index="${index}"
                            ${erVaelg ? `aria-pressed="false" aria-label="Vælg billede ${index + 1}"` : `aria-label="Se billede ${index + 1} i stor størrelse"`}>
                            <img src="${billede.src}" alt="">
                        </button>`;
                    index += 1;
                    return html;
                }).join("")}
            </div>
        </div>
    `).join("");

    const thumbs = [...container.querySelectorAll("[data-billede-index]")];

    thumbs.forEach((thumb) => {
        thumb.addEventListener("click", () => {
            const valgt = Number(thumb.dataset.billedeIndex);

            if (erVaelg) {
                thumbs.forEach((other) => other.setAttribute("aria-pressed", String(other === thumb)));
                if (onVaelg) onVaelg(alle[valgt]);
                return;
            }

            aabnLightbox(alle, valgt, thumb);
        });
    });
}

/*---- Lightbox - lægges på <body>, uden for #app, så #app's focus trap (accessibility.js) ikke blander sig. Har sin egen lille fokusfælde ----*/

function aabnLightbox(billeder, startIndex, returFokus) {
    let aktiv = startIndex;
    const flere = billeder.length > 1;

    const overlay = document.createElement("div");
    overlay.className = "billedvaelger-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Billede i stor størrelse");
    overlay.innerHTML = `
        <button type="button" class="billedvaelger-luk" aria-label="Luk">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        ${flere ? `<button type="button" class="billedvaelger-pil billedvaelger-pil--forrige" aria-label="Forrige billede"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>` : ""}
        <img class="billedvaelger-stort" src="" alt="">
        ${flere ? `<button type="button" class="billedvaelger-pil billedvaelger-pil--naeste" aria-label="Næste billede"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>` : ""}
        <p class="billedvaelger-taeller" aria-live="polite"></p>
    `;

    const img = overlay.querySelector(".billedvaelger-stort");
    const taeller = overlay.querySelector(".billedvaelger-taeller");

    function vis(nyt) {
        aktiv = (nyt + billeder.length) % billeder.length;
        img.src = billeder[aktiv].src;
        img.alt = `Billede ${aktiv + 1} af ${billeder.length}`;
        taeller.textContent = flere ? `${aktiv + 1} af ${billeder.length}` : "";
    }

    function luk() {
        document.removeEventListener("keydown", onKeydown, true);
        overlay.remove();
        document.body.classList.remove("har-lightbox");
        if (returFokus?.isConnected) returFokus.focus();
    }

    function onKeydown(event) {
        if (event.key === "Escape") {
            event.preventDefault();
            luk();
        } else if (flere && event.key === "ArrowLeft") {
            vis(aktiv - 1);
        } else if (flere && event.key === "ArrowRight") {
            vis(aktiv + 1);
        } else if (event.key === "Tab") {
            const knapper = [...overlay.querySelectorAll("button")];
            const foerste = knapper[0];
            const sidste = knapper[knapper.length - 1];
            if (event.shiftKey && document.activeElement === foerste) {
                event.preventDefault();
                sidste.focus();
            } else if (!event.shiftKey && document.activeElement === sidste) {
                event.preventDefault();
                foerste.focus();
            }
        }
    }

    overlay.querySelector(".billedvaelger-luk").addEventListener("click", luk);
    overlay.querySelector(".billedvaelger-pil--forrige")?.addEventListener("click", () => vis(aktiv - 1));
    overlay.querySelector(".billedvaelger-pil--naeste")?.addEventListener("click", () => vis(aktiv + 1));

    /*---- Tryk uden for billedet (på selve baggrunden) lukker ----*/
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) luk();
    });

    document.addEventListener("keydown", onKeydown, true);
    document.body.appendChild(overlay);
    document.body.classList.add("har-lightbox");
    vis(aktiv);
    overlay.querySelector(".billedvaelger-luk").focus();
}
