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

            <nav class="map-nav" aria-label="Hovednavigation">
                <a href="forside.html" class="map-place map-place-front" data-page="forside.html">Forsiden</a>
                <a href="about.html" class="map-place map-place-about" data-page="about.html">Om os</a>
                <a href="contact.html" class="map-place map-place-contact" data-page="contact.html">Kontakt</a>
                <a href="receptionen.html" class="map-place map-place-reception" data-page="receptionen.html">Receptionen</a>
                <a href="faq.html" class="map-place map-place-questions" data-page="faq.html">Spørgehjørnet</a>
                <a href="proeverummet.html" class="map-place map-place-proeverum" data-page="proeverummet.html">Prøverummet</a>
                <a href="library.html" class="map-place map-place-library" data-page="library.html">Biblioteket</a>
            </nav>
            </div>
        </div>
    `;

    const mapButton = header.querySelector(".map-button");
    const mapMenu = header.querySelector(".map-menu");
    function markCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop();

    const currentPlace = header.querySelector(
        `[data-page="${currentPage}"]`
    );

    if (!currentPlace) return;

    const pin = document.createElement("img");
    pin.src = "img/Pin.svg";
    pin.alt = "";

    currentPlace.prepend(pin);
}

markCurrentPage();

    mapButton.addEventListener("click", () => {
        mapMenu.hidden = !mapMenu.hidden;

        mapButton.setAttribute("aria-expanded", !mapMenu.hidden);
    });
}