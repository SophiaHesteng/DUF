export function renderHeader() {
    const header = document.querySelector("#site-header");

    header.innerHTML = `
    <div class="header-inner">

            <a href="forside.html" class="header-logo" aria-label="Gå til forsiden"><img src="img/dør_fixed_1.svg" alt=""></a>

            <p class="header-title">
                Din Ugentlige Fridag
            </p>

            <button
                type="button"
                class="map-button"
                aria-label="Åbn navigation"
                aria-expanded="false">
                <span class="map-button-placeholder">KORT</span>
            </button>

            <div class="map-menu" hidden>

                <nav aria-label="Hovednavigation">
                    <a href="forside.html">Forsiden</a>
                    <a href="#">Om os</a>
                    <a href="#">Kontakt</a>
                    <a href="#">Receptionen</a>
                    <a href="#">Spørgehjørnet</a>
                    <a href="proeverummet.html">Prøverummet</a>
                    <a href="#">Biblioteket</a>
                </nav>
            </div>
        </div>
    `;

    const mapButton = header.querySelector(".map-button");
    const mapMenu = header.querySelector(".map-menu");

    mapButton.addEventListener("click", () => {
        mapMenu.hidden = !mapMenu.hidden;

        mapButton.setAttribute("aria-expanded", !mapMenu.hidden);
    });
}