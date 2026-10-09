/*----------------------------------------------------------------------------
 * DUF — delt "gå ud"-dør, brugt i alle vækstrum
 * ----------------------------------------------------------------------------
 * Før denne fil fandtes, havde hver vækstrum-Ui (visueltVaekstrumUi, farverUi,
 * logoUi, billederUi, byggestenUi, plus Prøverummets ui.js) sin egen kopi af
 * renderExitDoor() med identisk markup. Denne fil samler selve knappen ét
 * sted, så et fremtidigt designskift (ikon, styling, adfærd) kun skal laves
 * her - ikke i seks filer.
 *
 * Selve KLIK-håndteringen (bindExit) er bevidst IKKE flyttet herind for
 * Billeder: det rum har en ekstra "Rettigheder"-knap, hvis binding er
 * flettet sammen med dørens i motoren (bindChrome). Det rum beholder derfor
 * sin egen binding, men bruger denne fils renderExitDoor() for selve
 * markuppen. (Byggesten havde samme knap indtil manuskriptet 2026-09-24 og
 * bruger nu bindExit.)
 * ----------------------------------------------------------------------------
 */

/*---- Heidis egne dør-tegninger, lagt oven på hinanden og skiftet med opacity i CSS (hover + focus-visible) - ingen JS. Billederne er dekorative; knappens navn kommer fra aria-label, og den synlige tekst "Gå ud" sikrer, at betydningen ikke kun ligger i ikonet (fx på touch, hvor der ikke er hover). Mellemrummet i filnavnet er URL-kodet (%20) ----*/

export function renderExitDoor(label = "Gå ud af rummet") {
    return `
        <button id="exit-button" aria-label="${label}">
            <span class="exit-door" aria-hidden="true">
                <img class="exit-door-closed" src="img/door1_closed%201.svg" alt="">
                <img class="exit-door-klem" src="img/door-icon-klem.svg" alt="">
            </span>
            <span class="exit-door-text" aria-hidden="true">Gå ud</span>
        </button>
    `;
}

export function bindExit(onExit) {
    const exitButton = document.querySelector("#exit-button");
    if (exitButton) exitButton.addEventListener("click", onExit);
}
