export function renderFooter() {
    const footer = document.querySelector("#site-footer");

    if (!footer) return;

    footer.innerHTML = `
    <div class="footer-inner">

        <img class="footer-logo" src="img/footer-logo.png" alt="">

        <p class="footer-wordmark">Din Ugentlige Fridag<br>Et skridt ad gangen.</p>

        <ul class="footer-links">
            <li><a href="about.html">Om os</a></li>
            <li><a href="contact.html">Kontakt</a></li>
            <!-- TODO: Privatlivspolitik og Cookies har endnu ingen side/IA - link er en placeholder -->
            <li><a href="#">Privatlivspolitik</a></li>
            <li><a href="#">Cookies</a></li>
        </ul>

        <p class="footer-copyright">© Din Ugentlige Fridag 2026</p>

    </div>
    `;
}
