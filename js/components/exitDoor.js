/*----------------------------------------------------------------------------
 * DUF — delt "gå ud"-dør, brugt i alle vækstrum
 * ----------------------------------------------------------------------------
 * Før denne fil fandtes, havde hver vækstrum-Ui (overblikUi, farverUi,
 * logoUi, billederUi, byggestenUi, plus Prøverummets ui.js) sin egen kopi af
 * renderExitDoor() med identisk markup. Denne fil samler selve knappen ét
 * sted, så et fremtidigt designskift (ikon, styling, adfærd) kun skal laves
 * her - ikke i seks filer.
 *
 * Selve KLIK-håndteringen (bindExit) er bevidst IKKE flyttet herind for
 * Billeder og Ikoner/fonte & byggesten: de rum har en ekstra "Rettigheder"-
 * knap, hvis binding er flettet sammen med dørens i de motorer (bindChrome).
 * De to rum beholder derfor deres egen binding, men bruger denne fils
 * renderExitDoor() for selve markuppen.
 * ----------------------------------------------------------------------------
 */

export function renderExitDoor(label = "Gå ud af rummet") {
    return `
        <button id="exit-button" aria-label="${label}">
            <i class="fa-solid fa-door-closed closed-door" aria-hidden="true"></i>
            <i class="fa-solid fa-door-open open-door" aria-hidden="true"></i>
        </button>
    `;
}

export function bindExit(onExit) {
    const exitButton = document.querySelector("#exit-button");
    if (exitButton) exitButton.addEventListener("click", onExit);
}
