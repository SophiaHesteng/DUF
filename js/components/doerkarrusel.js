/*----------------------------------------------------------------------------
 * DUF — dørkarrusel på vaelg-din-dor.html
 * ----------------------------------------------------------------------------
 * Ét dørkort pr. vækstområde (js/data/vaekstomraader.js) i en vandret
 * scroll-snap-karrusel med pile, pin-og-sti-navigation (js/components/
 * pinSti.js) og piletaster. Kun dørens fyldfarve skifter pr. område; ramme
 * og håndtag er ens på alle kort.
 *
 * Dørformen er path-data fra "doorbasic 1" i Figma (node 1015:234), samme
 * som img/doorbasic 1.svg. Den er skrevet ind her i stedet for at blive
 * hentet som <img>, fordi de tre dele skal kunne farves hver for sig.
 * ----------------------------------------------------------------------------
 */

import { vaekstomraader } from "../data/vaekstomraader.js";
import { renderPinSti } from "./pinSti.js";

const DOER_RAMME = "M394.44 197.19C394.44 167.74 387.44 138.77 374.88 112.43C363.83 89.25 348.89 68.95 330.04 51.65C304.92 28.59 274.5 12.25 241.09 4.82998C204.28 -3.35002 166.09 -1.16002 130.73 11.59C118.09 16.15 106.71 21.79 95.35 28.74C44.01 60.18 9.43 113.72 2.05 173.54C0.86 183.17 0.04 192.5 0.04 202.45L0 708.69C0 713.13 3.02 715.91 7.34 715.92L123.87 715.9L123.92 687.78L270.84 687.82L270.96 715.93L387.91 715.89C391.68 715.89 394.55 713.04 394.55 709.23L394.45 197.19H394.44ZM352.51 208.72L338.97 208.76L338.87 223.72L352.37 223.98L352.35 700.76L283.89 700.91L283.84 674.83L110.82 674.81L110.69 701.91H42.32V223.96L56.08 223.83L56.18 208.76L42.34 208.7C42.28 196.42 42.24 184.97 44.03 173.01C51.65 122.12 86.79 77.72 132.87 56C176.87 35.26 227.45 36.69 270.18 59.86C297.17 74.5 319.56 96.85 334.3 123.87C349.57 151.84 353.23 177.34 352.5 208.75L352.51 208.72ZM364.32 701.74L364.3 192.81C364.3 182.63 363.32 173.23 361.54 163.26C355.02 130.62 338.49 101.25 314.84 77.99C283.35 47.01 241.32 28.87 196.94 29.26C151.94 29.66 112.96 46.71 80.74 77.67C69.62 88.35 60.45 99.88 52.63 113.24C38.35 137.22 30.36 164.58 30.35 192.76L30.26 701.82L13.73 701.78L13.82 196.82C13.82 161.58 24.61 127.21 43.5 97.98C50.1 87.24 57.61 78.32 66.24 69.34C79.48 55.55 94.22 44.36 111.05 35.15C166.71 4.68998 235.9 5.84998 290.54 38.81C344.14 71.14 380.56 129.92 380.62 193.4L381.16 701.61L364.31 701.74H364.32Z";
const DOER_FYLD = "M294.12 686.92L293.9 666.57C293.88 664.79 292.91 663.53 290.88 663.53H103.84C101.8 663.54 100.76 665.42 100.68 667.04L100.64 686.85L53.64 686.83L53.62 235.4L66.56 234.88L66.85 199.46C66.86 198.01 65.96 196.93 64.57 196.92L53.59 196.82C53.4 156.88 70.18 122.05 98.34 94.76C133.63 60.55 184.1 46.71 231.9 58.58C260.07 65.57 285 81.08 304.38 102.62C327.55 128.36 341.88 161.76 341.12 196.95L330.08 196.97C328.71 196.97 327.75 197.96 327.76 199.37L328 234.99L341.07 235.23L341.01 350.3L310.84 350.37C296.56 350.4 285.85 361.53 284.82 375.77L284.78 413.32C285.61 427.41 296.07 438.99 310.25 439.07L341.05 439.23L341 686.83L294.09 686.96L294.12 686.92Z";
const DOER_HAANDTAG = "M309.66 360.84C301.27 360.89 295.48 368.35 295.03 376.35V412.63C295.33 421.78 302.22 428.92 311.53 428.92H341.61L341.64 360.63L309.66 360.84ZM318.41 407.74C311.78 407.74 306.41 402.37 306.41 395.74C306.41 389.11 311.78 383.74 318.41 383.74C325.04 383.74 330.41 389.11 330.41 395.74C330.41 402.37 325.04 407.74 318.41 407.74Z";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function doerSvg() {
    return `
        <svg class="doer-kort-svg" viewBox="0 0 395 716" aria-hidden="true" focusable="false">
            <path class="doer-ramme" d="${DOER_RAMME}"/>
            <path class="doer-fyld" d="${DOER_FYLD}"/>
            <path class="doer-haandtag" d="${DOER_HAANDTAG}"/>
        </svg>
    `;
}

function kortHTML(omraade, index) {
    const titel = escapeHtml(omraade.titel);
    const indre = `
        <span class="doer-kort-doer">
            ${doerSvg()}
            <span class="doer-kort-nummer" aria-hidden="true">${index + 1}</span>
        </span>
        <span class="doer-kort-titel">${titel}</span>
        ${omraade.href ? "" : `<span class="doer-kort-snart">Kommer snart</span>`}
        <span class="doer-kort-undertekst">${escapeHtml(omraade.undertekst)}</span>
    `;

    const indhold = omraade.href
        ? `<a class="doer-kort-indhold" href="${omraade.href}">${indre}</a>`
        : `<div class="doer-kort-indhold">${indre}</div>`;

    return `
        <li class="doer-kort doer-kort--tekst-${omraade.tekst}${omraade.href ? "" : " doer-kort--kommer-snart"}"
            style="--doer-farve: var(--omraade-${omraade.slug})"
            data-index="${index}">
            ${indhold}
        </li>
    `;
}

export function initDoerkarrusel() {
    const root = document.querySelector("#doerkarrusel");

    if (!root) return;

    root.innerHTML = `
        <div class="doerkarrusel-scene">
            <button type="button" class="doerkarrusel-pil doerkarrusel-pil--forrige" aria-label="Forrige dør">
                <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
            </button>
            <ul class="doerkarrusel-spor" tabindex="0" aria-label="Vækstområder. Brug piletasterne til at skifte dør.">
                ${vaekstomraader.map(kortHTML).join("")}
            </ul>
            <button type="button" class="doerkarrusel-pil doerkarrusel-pil--naeste" aria-label="Næste dør">
                <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </button>
        </div>
        <div class="doerkarrusel-pins"></div>
        <p class="doerkarrusel-status" aria-live="polite"></p>
    `;

    const spor = root.querySelector(".doerkarrusel-spor");
    const kort = [...spor.querySelectorAll(".doer-kort")];
    const forrige = root.querySelector(".doerkarrusel-pil--forrige");
    const naeste = root.querySelector(".doerkarrusel-pil--naeste");
    const status = root.querySelector(".doerkarrusel-status");
    let aktiv = -1;

    const pinSti = renderPinSti(root.querySelector(".doerkarrusel-pins"), {
        ariaLabel: "Hop til en dør",
        labels: vaekstomraader.map((omraade, index) => `Dør ${index + 1}: ${escapeHtml(omraade.titel)}`),
        onSelect: (index) => goTo(index)
    });

    function scrollLeftFor(index) {
        const card = kort[index];
        return card.offsetLeft - (spor.clientWidth - card.offsetWidth) / 2;
    }

    function setActive(index) {
        if (index === aktiv) return;
        aktiv = index;

        kort.forEach((card, i) => card.classList.toggle("is-active", i === index));
        pinSti.setActive(index);

        forrige.setAttribute("aria-disabled", String(index === 0));
        naeste.setAttribute("aria-disabled", String(index === kort.length - 1));

        const omraade = vaekstomraader[index];
        status.textContent = `Dør ${index + 1} af ${kort.length}: ${omraade.titel}${omraade.href ? "" : " (kommer snart)"}`;
    }

    // Under en blød scroll startet af pil/pin/tast må scroll-lytteren ikke
    // nulstille det aktive kort undervejs - ellers tæller to hurtige klik som ét
    let maal = null;
    let maalTimer;

    function frigivMaal() {
        maal = null;
        clearTimeout(maalTimer);
    }

    function goTo(index, { instant = false } = {}) {
        const target = Math.max(0, Math.min(kort.length - 1, index));
        const smooth = !instant && !reduceMotion.matches;

        if (smooth) {
            maal = target;
            clearTimeout(maalTimer);
            maalTimer = setTimeout(frigivMaal, 1000);
        }

        spor.scrollTo({ left: scrollLeftFor(target), behavior: smooth ? "smooth" : "auto" });
        setActive(target);

        return target;
    }

    // Det kort, hvis midte er tættest på sporets midte, er det aktive
    function naermesteKort() {
        const midte = spor.scrollLeft + spor.clientWidth / 2;
        let bedst = 0;
        let bedstAfstand = Infinity;

        kort.forEach((card, i) => {
            const afstand = Math.abs(card.offsetLeft + card.offsetWidth / 2 - midte);
            if (afstand < bedstAfstand) {
                bedstAfstand = afstand;
                bedst = i;
            }
        });

        return bedst;
    }

    let ticking = false;
    spor.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const naermest = naermesteKort();

            if (maal === null) {
                setActive(naermest);
            } else if (naermest === maal) {
                frigivMaal();
            }

            ticking = false;
        });
    });

    spor.addEventListener("scrollend", frigivMaal);

    forrige.addEventListener("click", () => goTo(aktiv - 1));
    naeste.addEventListener("click", () => goTo(aktiv + 1));

    // Tab ind på et dørlink centrerer døren
    spor.addEventListener("focusin", (event) => {
        const card = event.target.closest(".doer-kort");
        if (card) goTo(Number(card.dataset.index));
    });

    // Piletaster: virker fra sporet, et dørlink eller en pin, og flytter fokus med
    root.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

        event.preventDefault();
        const ny = goTo(aktiv + (event.key === "ArrowRight" ? 1 : -1));
        const fokus = document.activeElement;

        if (fokus.classList.contains("pin-sti-pin")) {
            root.querySelectorAll(".pin-sti-pin")[ny].focus({ preventScroll: true });
        } else if (fokus.closest(".doer-kort")) {
            const link = kort[ny].querySelector("a");
            (link || spor).focus({ preventScroll: true });
        }
    });

    window.addEventListener("resize", () => goTo(aktiv, { instant: true }));

    goTo(0, { instant: true });
}
