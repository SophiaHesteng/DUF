/*----------------------------------------------------------------------------
 * DUF — delt Se også-skilt (henvisning til et andet vækstrum)
 * ----------------------------------------------------------------------------
 * Rent informativt, ikke klikbart. Besluttet af Heidi (2026-09-21): bygges uden
 * klikbarhed, uden fokus og uden hover-effekt for nu. `href` findes som et
 * valgfrit felt i datamodellen (maal.href), men sættes bevidst ikke her -
 * skiltet er derfor et almindeligt <div>, aldrig et <a>, og har ingen
 * tabindex eller klik-håndtering.
 *
 * Højst ét skilt pr. boble (jf. docs/duf-manuskript-logo.md). Målets navn og
 * farve hentes fra js/data/seOgsaaMaal.js (`maal`), så de ikke duplikeres pr.
 * boble - kun den korte, kontekst-specifikke `tekst` skrives pr. boble.
 *
 * Ikon og tekst bærer betydningen, ikke farven alene (WCAG 2 AA) - se
 * css/_components.scss. Ikonet er en simpel Font Awesome-placeholder; det
 * endelige udseende tegnes af Marcus.
 *
 * Samme to-trins mønster som components/tjekliste.js: renderer-funktionen
 * tager en container og fylder den - kaldes efter den omkringliggende skærm
 * allerede er sat med app.innerHTML.
 * ----------------------------------------------------------------------------
 */

export function renderSeOgsaa(container, { maal, navn, tekst } = {}) {
    if (!container || !maal || !navn) return;

    const farveKlasse = maal.farveKlasse ? ` se-ogsaa-skilt--${maal.farveKlasse}` : "";

    container.innerHTML = `
        <div class="se-ogsaa-skilt${farveKlasse}">
            <span class="se-ogsaa-skilt-icon"><i class="fa-solid fa-signs-post" aria-hidden="true"></i></span>
            <span class="se-ogsaa-skilt-body">
                <span class="se-ogsaa-skilt-label">Se også</span>
                <span class="se-ogsaa-skilt-navn">${navn}</span>
                ${tekst ? `<span class="se-ogsaa-skilt-tekst">${tekst}</span>` : ""}
            </span>
        </div>
    `;
}
