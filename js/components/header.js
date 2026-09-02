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

                <svg class="map-route" viewBox="0 0 425 250" aria-hidden="true">
                    <path d="M 110 45
                        C 125 75, 145 85, 160 65
                        C 180 40, 205 55, 220 60
                        C 245 65, 270 55, 280 60" />

                    <path d="M 310 68
                        C 310 75, 315 78, 320 85" />

                    <path d="M 90 45
                        C 115 72, 115 88, 110 98" />

                    <path d="M 80 110
                        C 70 115, 85 125, 75 130
                        C 65 138, 55 148, 45 152" />

                    <path d="M 130 122
                        C 140 130, 150 140, 160 145
                        C 170 150, 165 155, 168 158" />

                    <path d="M 180 110
                        C 195 112, 205 120, 220 125
                        C 235 130, 245 125, 255 135
                        C 265 145, 265 165, 270 175
                        C 275 182, 270 188, 265 192" />
                </svg>

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