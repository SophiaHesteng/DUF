/*----------------------------------------------------------------------------
 * DUF — delt ramme om en vækstrum-skærm
 * ----------------------------------------------------------------------------
 * Topbjælke (områdemærke), de to navigationslinjer, indholdskortet og
 * knaprækken ("Tilbage" til venstre, rummets egne knapper til højre).
 * Exit-døren er IKKE en del af rammen: den bliver nederst til højre og
 * renderes stadig af hvert rums Ui (js/components/exitDoor.js).
 *
 * Områdets farve sættes via klassen `rum--<omraade-slug>` (css/_rum.scss),
 * så komponenterne selv kun bruger den generiske --omraade-farve.
 *
 * Brug:
 *   app.innerHTML = rumRammeHtml({ omraade, rum: "Farver", indhold, knapper, navigation }) + exitDoor;
 *   bindRumRamme(app, navigation);
 *
 * `navigation` kommer fra rummets engine (RumHistorik.navigation(), se
 * js/engine/rumHistorik.js), eller null, hvis skærmen ikke er en del af
 * rummets moduler (fx exit-bekræftelsen).
 * ----------------------------------------------------------------------------
 */

import { renderNavLinje } from "./navLinje.js";

export function rumRammeHtml({ omraade, rum, indhold, knapper = "", navigation = null, kortAttributter = "" }) {
    const tilbage = navigation?.onTilbage
        ? `<button type="button" class="rum-tilbage" id="rum-tilbage"><span aria-hidden="true">←</span> Tilbage</button>`
        : "";

    const knapraekke = tilbage || knapper
        ? `
            <div class="rum-knapraekke">
                ${tilbage}
                <div class="rum-knapraekke-handlinger">${knapper}</div>
            </div>`
        : "";

    return `
        <div class="rum rum--${omraade.slug}">
            <p class="rum-topbjaelke">
                <span class="rum-topbjaelke-prik" aria-hidden="true"></span>
                <span class="rum-topbjaelke-omraade">${omraade.navn}</span>
                <span class="rum-topbjaelke-skille" aria-hidden="true">·</span>
                <span>${rum}</span>
            </p>

            ${navigation ? `
                <nav class="rum-navigation" aria-label="Din vej gennem ${rum}">
                    <div class="rum-navigation-moduler"></div>
                    <div class="rum-navigation-bobler"></div>
                </nav>
            ` : ""}

            <section class="section rum-kort" ${kortAttributter}>
                ${indhold}
                ${knapraekke}
            </section>
        </div>
    `;
}

export function bindRumRamme(root, navigation) {
    if (!navigation) return;

    const { moduler, aktivModul, sprungetOver, bobler, aktivBoble, antalBobler, rum } = navigation;

    renderNavLinje(root.querySelector(".rum-navigation-moduler"), {
        label: `Modul ${aktivModul + 1} af ${moduler.length} · ${moduler[aktivModul]}`,
        ariaLabel: `Moduler i ${rum}`,
        trin: moduler.map((titel, index) => `Modul ${index + 1}: ${titel}`),
        aktiv: aktivModul,
        sprungetOver,
        onSelect: navigation.onModul
    });

    renderNavLinje(root.querySelector(".rum-navigation-bobler"), {
        label: `Boble ${aktivBoble + 1}${antalBobler ? ` af ${antalBobler}` : ""}`,
        ariaLabel: `Bobler i modul ${aktivModul + 1}`,
        trin: bobler.map((_, index) => `Boble ${index + 1}`),
        aktiv: aktivBoble,
        onSelect: navigation.onBoble,
        lille: true
    });

    if (navigation.onTilbage) {
        root.querySelector("#rum-tilbage").addEventListener("click", navigation.onTilbage);
    }
}
