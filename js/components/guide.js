/*----------------------------------------------------------------------------
 * DUF — delt guide-boble (avatar + navn + citat)
 * ----------------------------------------------------------------------------
 * Navnet står altid sammen med citatet, aldrig citatet alene. Avataren er
 * dekorativ (aria-hidden), fordi navnet står som tekst ved siden af.
 *
 * Avatar: indtil Marcus' tegninger er klar, er den en rund pladsholder med
 * navnets forbogstav. Gives et billede (`avatar: "img/avatarer/sophia.svg"`),
 * lægges det oven på bogstavet; kan billedet ikke hentes, fjernes det, og
 * bogstavet står tilbage.
 *
 * Bruges af Logo og Byggesten (2026-10-09), hvor 💬-linjerne har et navn (guideAvatar).
 * Linjer uden navn (fx i Billeder) vises stadig som det gamle "Guide:"-panel.
 *
 * Brug:
 *   guideHtml({ navn: "Sophia", citat: "Der findes ikke ét rigtigt antal.", avatar: null })
 * ----------------------------------------------------------------------------
 */

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export function guideHtml({ navn, citat, avatar = null }) {
    const billede = avatar
        ? `<img class="guide-avatar-billede" src="${escapeHtml(avatar)}" alt="" onerror="this.remove()">`
        : "";

    return `
        <figure class="guide">
            <span class="guide-avatar" aria-hidden="true">
                ${escapeHtml(navn.charAt(0).toUpperCase())}
                ${billede}
            </span>
            <div class="guide-boble">
                <figcaption class="guide-navn">${escapeHtml(navn)}</figcaption>
                <blockquote class="guide-citat"><p>${citat}</p></blockquote>
            </div>
        </figure>
    `;
}
