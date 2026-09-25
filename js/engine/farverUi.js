import { activateFocusTrap } from "./accessibility.js";
import { isValidHex, contrastRatio, contrastLevel } from "./contrast.js";
import { renderExitDoor as renderSharedExitDoor, bindExit } from "../components/exitDoor.js";
import { renderImageUploadHtml, bindImageUpload } from "../components/imageGallery.js";

const app = document.querySelector("#app");

function renderExitDoor() {
    return renderSharedExitDoor("Gå ud af Farver");
}

function showWelcome(text, onStart) {
    app.innerHTML = `
        <section class="section welcome-card">
            <h1 class="section-heading">Farver</h1>
            <div class="section-body"><p>${text}</p></div>
            <div class="section-cta">
                <button id="start-button" type="button" class="btn btn--regular btn--solid-green">Gå ind her</button>
            </div>
        </section>`;

    activateFocusTrap(app);
    document.querySelector("#start-button").addEventListener("click", onStart);
}

/*---- Ren læseskærm - bruges af de fleste rene indholdsbobler i Modul 1, 2, 5 (og feedback-trinnet i Modul 4). `examples` er en let udvidelse til Boble 1.2's tre farveudtryk vist side om side; ikke en ny skærmtype, da resten af skærmen (overskrift/paragraffer/CTA) er identisk med den almindelige tekstskærm. ----*/

function renderExamplesGrid(examples) {
    return `
        <div class="example-grid">
            ${examples.map((example) => `
                <div class="example-card">
                    ${example.image ? `<img class="example-card-image" src="${example.image}" alt="${example.imageAlt || ""}">` : ""}
                    <p class="example-card-label">${example.label}</p>
                    <p class="example-card-description">${example.description}</p>
                    <p class="example-card-words">${example.words}</p>
                </div>
            `).join("")}
        </div>
    `;
}

/*---- Boble 5.2 (runde 7) - "hvorfor roller"-afsnittet ved siden af (mobil: under) en lille skitse af en hjemmeside i tre af DUF's egne farver. Tegnet i HTML/CSS, ingen billedfil. Etiketterne er rigtig tekst, så skærmlæsere kan læse dem; resten af skitsen er dekoration (aria-hidden) ----*/

function renderRoleExample({ paragraph, backgroundLabel, textLabel, buttonLabel, buttonText }) {
    return `
        <div class="rolle-eksempel">
            <div class="section-body"><p>${paragraph}</p></div>

            <figure class="rolle-skitse">
                <div class="rolle-skitse-side">
                    <span class="rolle-skitse-etiket rolle-skitse-etiket--baggrund">${backgroundLabel}</span>

                    <div class="rolle-skitse-raekke">
                        <div class="rolle-skitse-tekst" aria-hidden="true">
                            <span></span><span></span><span></span>
                        </div>
                        <span class="rolle-skitse-etiket">${textLabel}</span>
                    </div>

                    <div class="rolle-skitse-raekke">
                        <span class="rolle-skitse-knap" aria-hidden="true">${buttonText}</span>
                        <span class="rolle-skitse-etiket">${buttonLabel}</span>
                    </div>
                </div>
            </figure>
        </div>
    `;
}

function showTextScreen({ heading, paragraphs = [], callout, examples, roleExample, buttonText = "Næste" }, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>

            ${examples ? renderExamplesGrid(examples) : ""}

            <div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>

            ${roleExample ? renderRoleExample(roleExample) : ""}

            ${callout ? `
                <div class="panel">
                    <p><strong>Myteknæk:</strong> ${callout}</p>
                </div>
            ` : ""}

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">${buttonText}</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 3, Boble 3.2 - forgrening: har brugeren selv et eksempel? ----*/

function showExampleChoice({ heading, question, yesLabel, noLabel }, onHasExample, onNoExample, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body"><p>${question}</p></div>

            <div class="choice-list">
                <button type="button" class="choice-card" id="has-example-button">
                    <span class="choice-card-title choice-card-title--plain">${yesLabel}</span>
                    <img class="choice-card-arrow" src="img/pil.svg" alt="">
                </button>
                <button type="button" class="choice-card" id="no-example-button">
                    <span class="choice-card-title choice-card-title--plain">${noLabel}</span>
                    <img class="choice-card-arrow" src="img/pil.svg" alt="">
                </button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#has-example-button").addEventListener("click", onHasExample);
    document.querySelector("#no-example-button").addEventListener("click", onNoExample);
    bindExit(onExit);
}

/*---- Modul 3, Boble 3.2 "Ja"-gren - upload af ÉT billede (genbruger imageGallery.js). "Næste" er deaktiveret, indtil præcis ét billede er gemt; engine sørger for, at et nyt upload erstatter et eventuelt tidligere (se farverEngine.js) ----*/

function showSingleImageUpload({ heading, uploadLabel, uploadHint }, images, onNext, onExit, imageHandlers) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>

            ${renderImageUploadHtml({ label: uploadLabel, hint: uploadHint, images })}

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green" ${images.length ? "" : "disabled"}>Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);

    const nextButton = document.querySelector("#next-button");
    nextButton.addEventListener("click", onNext);
    bindExit(onExit);

    bindImageUpload({
        upload: imageHandlers.upload,
        remove: imageHandlers.remove,
        refresh: async () => {
            const refreshed = await imageHandlers.refresh();
            nextButton.disabled = refreshed.length === 0;
            return refreshed;
        }
    });
}

/*---- Modul 3, Boble 3.3 - det valgte/uploadede billede + tre rene overvejelsesspørgsmål (ingen interaktion, intet gemt svar - afklaret med Heidi 2026-09-11) ----*/

function showImageReflection({ heading, intro, questions }, imageUrl, imageAlt, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            ${intro ? `<div class="section-body"><p>${intro}</p></div>` : ""}

            <img class="example-image" src="${imageUrl}" alt="${imageAlt}">

            <div class="section-body">
                <ul>${questions.map((q) => `<li>${q}</li>`).join("")}</ul>
            </div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 4, Boble 4.2-4.5 - ét delt render for "billede + envalg", brugt fire gange med forskelligt billede/tekst-data (ikke fire kopier af samme markup). Kun ét svar kan være valgt ad gangen (afklaret med Heidi 2026-09-11: envalg, ikke flervalg, så det altid er klart hvilken feedback der skal gives) - et klik markerer det valgte kort og fjerner markeringen fra et evt. tidligere valgt. Matchet feedback beregnes af engine ud fra det valgte option-id, jf. docs/duf-manuskript-farver.md. ----*/

function showImageImpressionQuestion({ heading, image, imageAlt, question, options }, onNext, onExit) {
    const optionsHtml = options.map((option) => `
        <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-id="${option.id}">
            <span class="choice-card-title choice-card-title--plain">${option.label}</span>
        </button>
    `).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>

            <img class="example-image" src="${image}" alt="${imageAlt}">

            <p class="section-subheading">${question}</p>
            <div class="choice-list">${optionsHtml}</div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    const optionButtons = document.querySelectorAll("[data-option-id]");

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            /*---- Envalg: klik markerer dette kort og fjerner markeringen fra alle andre ----*/
            optionButtons.forEach((other) => {
                other.setAttribute("aria-pressed", String(other === button));
            });
        });
    });

    activateFocusTrap(app);

    document.querySelector("#next-button").addEventListener("click", () => {
        const selected = [...optionButtons]
            .filter((button) => button.getAttribute("aria-pressed") === "true")
            .map((button) => button.dataset.optionId);

        onNext(selected);
    });

    bindExit(onExit);
}

/*---- Modul 6, Boble 6.1 - fri palet-bygger: ubegrænset antal farver, hver med visuel farvevælger + hex-felt + fjern-knap. Listen re-renderes ikke ved hver ændring (ville forstyrre en aktiv drag/typing) - i stedet bruges event delegation på containeren, og nye chips indsættes/fjernes enkeltvis i DOM'en. ----*/

function paletteChipHtml(color, index) {
    return `
        <div class="palette-chip" data-color-id="${color.id}">
            <input type="color" class="color-field-swatch" data-role="swatch" value="${color.hex}" aria-label="Farve ${index + 1} - vælg visuelt">
            <input type="text" class="text-input color-field-hex" data-role="hex" value="${color.hex}" aria-label="Farve ${index + 1} - hex-kode">
            <button type="button" class="palette-chip-remove" data-role="remove" aria-label="Fjern denne farve">×</button>
        </div>
    `;
}

function showPaletteBuilder({ heading, paragraphs = [], addButtonLabel, oneColorMessage, oneColorAddLabel, oneColorContinueLabel }, palette, callbacks, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>

            <div class="palette-builder" id="palette-list">
                ${palette.map(paletteChipHtml).join("")}
            </div>

            <div class="palette-add-row">
                <button type="button" id="add-color-button" class="btn btn--slim btn--outline-green">${addButtonLabel}</button>
            </div>

            <div class="panel boble-respons en-farve-besked" id="one-color-message" tabindex="-1" hidden>
                <p>${oneColorMessage}</p>
                <div class="section-cta section-cta--column">
                    <button id="one-color-add-button" type="button" class="btn btn--regular btn--solid-green">${oneColorAddLabel}</button>
                    <button id="one-color-continue-button" type="button" class="btn btn--regular btn--outline-green">${oneColorContinueLabel}</button>
                </div>
            </div>

            <div class="section-cta" id="next-row">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green" ${palette.length ? "" : "disabled"}>Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    const list = document.querySelector("#palette-list");
    const nextButton = document.querySelector("#next-button");
    const nextRow = document.querySelector("#next-row");
    const oneColorMessageEl = document.querySelector("#one-color-message");

    function refreshNextState() {
        nextButton.disabled = callbacks.getPalette().length === 0;
    }

    /*---- Runde 7: beskeden erstatter "Næste", mens den er åben, så der kun er de to valg ----*/
    function setOneColorMessageOpen(open) {
        oneColorMessageEl.hidden = !open;
        nextRow.hidden = open;
    }

    function addColorChip() {
        const color = callbacks.addColor();
        list.insertAdjacentHTML("beforeend", paletteChipHtml(color, callbacks.getPalette().length - 1));
        refreshNextState();
        return list.querySelector(`[data-color-id="${color.id}"]`);
    }

    list.addEventListener("input", (event) => {
        const chip = event.target.closest("[data-color-id]");
        if (!chip) return;

        if (event.target.dataset.role === "swatch") {
            callbacks.updateColor(chip.dataset.colorId, event.target.value);
            chip.querySelector('[data-role="hex"]').value = event.target.value;
        } else if (event.target.dataset.role === "hex") {
            if (isValidHex(event.target.value)) {
                const hex = event.target.value.startsWith("#") ? event.target.value : `#${event.target.value}`;
                callbacks.updateColor(chip.dataset.colorId, hex);
                chip.querySelector('[data-role="swatch"]').value = hex;
            }
        }
    });

    list.addEventListener("click", (event) => {
        const button = event.target.closest('[data-role="remove"]');
        if (!button) return;

        const chip = button.closest("[data-color-id]");
        callbacks.removeColor(chip.dataset.colorId);
        chip.remove();
        refreshNextState();
    });

    document.querySelector("#add-color-button").addEventListener("click", () => {
        addColorChip();
        setOneColorMessageOpen(false);
    });

    /*---- "Tilføj en farve" bliver på skærmen: tilføjer en ny farve og sætter fokus på dens farvevælger ----*/
    document.querySelector("#one-color-add-button").addEventListener("click", () => {
        setOneColorMessageOpen(false);
        addColorChip().querySelector('[data-role="swatch"]').focus();
    });

    document.querySelector("#one-color-continue-button").addEventListener("click", onNext);

    activateFocusTrap(app);
    nextButton.addEventListener("click", () => {
        if (callbacks.getPalette().length === 1) {
            setOneColorMessageOpen(true);
            oneColorMessageEl.focus();
            return;
        }
        onNext();
    });
    bindExit(onExit);
}

/*---- Modul 6, Boble 6.2 - én farve ad gangen: fritekst-rolle, ingen faste kategorier. En diskret oversigt af hele paletten vises øverst, jf. manuskriptet. ----*/

function showColorRoleStep({ heading, paragraphs = [], question, suggestionsIntro, suggestions = [], placeholder, nextColorLabel }, palette, index, onNext, onExit) {
    const current = palette[index];
    const isLast = index === palette.length - 1;

    const overviewHtml = palette.map((c) => `<span class="palette-overview-swatch" style="background-color:${c.hex};" title="${c.hex}"></span>`).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>

            <div class="palette-overview">${overviewHtml}</div>

            <div class="dosage-row">
                <span class="dosage-swatch" style="background-color:${current.hex};"></span>
                <span class="dosage-hex">${current.hex}</span>
            </div>

            <p class="section-subheading">${question}</p>

            <p class="section-body">${suggestionsIntro}</p>
            <div class="keyword-list" id="role-suggestions">
                ${suggestions.map((s) => `<button type="button" class="keyword-chip" data-suggestion="${s}">${s}</button>`).join("")}
            </div>

            <textarea id="role-input" class="text-input" rows="2" placeholder="${placeholder || ""}">${current.role || ""}</textarea>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">${isLast ? "Næste" : nextColorLabel}</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    /*---- Runde 7: et forslag erstatter feltets tekst, og fokus flyttes til feltet, så hun kan rette eller skrive videre ----*/
    const roleInput = document.querySelector("#role-input");
    document.querySelector("#role-suggestions").addEventListener("click", (event) => {
        const chip = event.target.closest("[data-suggestion]");
        if (!chip) return;
        roleInput.value = chip.dataset.suggestion;
        roleInput.focus();
        roleInput.setSelectionRange(roleInput.value.length, roleInput.value.length);
    });

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", () => {
        onNext(document.querySelector("#role-input").value);
    });
    bindExit(onExit);
}

/*---- Modul 6, Boble 6.3 - procent-dosering med automatisk proportional omfordeling til 100%. redistributePercentages() muterer palette-arrayet direkte (samme reference som motoren holder på), og afrunder til hele tal med en kompensation på den største andel, så summen altid rammer præcis 100. ----*/

function redistributePercentages(palette, changedId, newValue) {
    const changed = palette.find((c) => c.id === changedId);
    const others = palette.filter((c) => c.id !== changedId);
    const clamped = Math.max(0, Math.min(100, newValue));

    if (others.length === 0) {
        changed.percent = 100;
        return;
    }

    const remaining = 100 - clamped;
    const othersSum = others.reduce((sum, c) => sum + c.percent, 0);

    if (othersSum === 0) {
        const share = remaining / others.length;
        others.forEach((c) => { c.percent = share; });
    } else {
        others.forEach((c) => { c.percent = (c.percent / othersSum) * remaining; });
    }

    changed.percent = clamped;

    const rounded = palette.map((c) => Math.round(c.percent));
    const diff = 100 - rounded.reduce((sum, v) => sum + v, 0);
    if (diff !== 0) {
        const maxIndex = rounded.indexOf(Math.max(...rounded));
        rounded[maxIndex] += diff;
    }
    palette.forEach((c, i) => { c.percent = rounded[i]; });
}

function showDosageStep({ heading, paragraphs = [] }, palette, onNext, onExit) {
    const rowHtml = (c) => `
        <div class="dosage-row" data-color-id="${c.id}">
            <span class="dosage-swatch" style="background-color:${c.hex};"></span>
            <span class="dosage-hex">${c.hex}</span>
            <input type="range" min="0" max="100" step="1" value="${c.percent}" class="dosage-slider" data-role="slider" aria-label="Dosering for ${c.hex}">
            <span class="dosage-value" data-role="value">${c.percent}%</span>
        </div>
    `;

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>

            <div class="dosage-list" id="dosage-list">${palette.map(rowHtml).join("")}</div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    const list = document.querySelector("#dosage-list");

    function renderValues() {
        palette.forEach((c) => {
            const row = list.querySelector(`[data-color-id="${c.id}"]`);
            if (!row) return;
            row.querySelector('[data-role="slider"]').value = c.percent;
            row.querySelector('[data-role="value"]').textContent = `${c.percent}%`;
        });
    }

    list.addEventListener("input", (event) => {
        if (event.target.dataset.role !== "slider") return;
        const row = event.target.closest("[data-color-id]");
        redistributePercentages(palette, row.dataset.colorId, Number(event.target.value));
        renderValues();
    });

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", onNext);
    bindExit(onExit);
}

/*---- Modul 6, Boble 6.4 - levende forhåndsvisning (farvernes dosering styrer flex-grow på hvert segment) + valg af tekstfarve blandt paletten (eller ingen, som falder tilbage til sort) ----*/

/*---- Delt mellem Boble 6.4 og 8.1 (runde 7, med `small`) ----*/
function palettePreviewHtml(palette, textHex, exampleText, { small = false } = {}) {
    return `
        <div class="palette-preview${small ? " palette-preview--lille" : ""}">
            ${palette.map((c) => `<div class="palette-preview-segment" style="flex-grow:${c.percent}; background-color:${c.hex};"></div>`).join("")}
            <div class="palette-preview-text" id="preview-text" style="color:${textHex};">${exampleText}</div>
        </div>
    `;
}

function showPreviewStep({ heading, paragraphs = [], exampleText, textColorLabel, noTextColorLabel }, palette, initialTextColorId, onNext, onExit) {
    let textColorId = initialTextColorId;

    const currentTextColorHex = () => {
        const chosen = palette.find((c) => c.id === textColorId);
        return chosen ? chosen.hex : "#000000";
    };

    const optionsHtml = () => `
        ${palette.map((c) => `
            <label class="text-color-option">
                <input type="radio" name="text-color-choice" value="${c.id}" ${c.id === textColorId ? "checked" : ""}>
                <span class="dosage-swatch" style="background-color:${c.hex};"></span>
                <span>${c.hex}${c.role ? ` — ${c.role}` : ""}</span>
            </label>
        `).join("")}
        <label class="text-color-option">
            <input type="radio" name="text-color-choice" value="" ${!textColorId ? "checked" : ""}>
            <span>${noTextColorLabel}</span>
        </label>
    `;

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>

            ${palettePreviewHtml(palette, currentTextColorHex(), exampleText)}

            <p class="section-subheading">${textColorLabel}</p>
            <div class="text-color-list" id="text-color-list">${optionsHtml()}</div>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    const previewText = document.querySelector("#preview-text");

    document.querySelector("#text-color-list").addEventListener("change", (event) => {
        if (event.target.name !== "text-color-choice") return;
        textColorId = event.target.value || null;
        previewText.style.color = currentTextColorHex();
    });

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", () => onNext(textColorId));
    bindExit(onExit);
}

/*---- Modul 7, Boble 7.2 - vælg tekst-/baggrundsfarve fra paletten (ikke fritekst-hex som før) og se kontrastforholdet opdatere sig live ----*/

function contrastSampleHtml(previewText, textHex, bgHex) {
    return `<div class="contrast-sample" style="background-color:${bgHex}; color:${textHex};"><p style="margin:0;">${previewText}</p></div>`;
}

/*---- Runde 7 (brugertest 1, U3): niveauet fra contrastLevel() vises altid som symbol + tekst. Symbolet er skjult for skærmlæsere, så de kun læser teksten ----*/
function contrastLevelHtml(levels, level, { tag = "span", className = "" } = {}) {
    const { symbol, label } = levels[level];
    return `<${tag} class="contrast-level contrast-level--${level} ${className}"><span class="contrast-level-symbol" aria-hidden="true">${symbol}</span> ${label}</${tag}>`;
}

/*---- Runde 7: "Se alle dine kombinationer" - alle par i begge retninger som små "Aa"-prøver. Et tryk vælger kombinationen i tjekkeren ovenfor ----*/
function allCombinationsHtml(colors, levels, { allCombinationsLabel, combinationSampleText }) {
    const pairs = colors.flatMap((text) => colors.filter((bg) => bg.id !== text.id).map((bg) => ({ text, bg })));

    const samplesHtml = pairs.map(({ text, bg }) => {
        const level = contrastLevel(contrastRatio(text.hex, bg.hex));
        return `
            <button type="button" class="kombination" data-text-id="${text.id}" data-bg-id="${bg.id}"
                aria-label="Tekst ${text.hex} på baggrund ${bg.hex}: ${levels[level].label}">
                <span class="kombination-proeve" style="background-color:${bg.hex}; color:${text.hex};" aria-hidden="true">${combinationSampleText}</span>
                <span aria-hidden="true">${contrastLevelHtml(levels, level)}</span>
            </button>
        `;
    }).join("");

    return `
        <div class="accordion-item kombinationer" data-open="false">
            <button type="button" class="accordion-trigger" aria-expanded="false" aria-controls="kombinationer-panel">
                <span>${allCombinationsLabel}</span>
                <img class="accordion-icon" src="img/accordion-closed.svg" alt="">
            </button>
            <div class="accordion-panel" id="kombinationer-panel" hidden>
                <div class="kombination-gitter">${samplesHtml}</div>
            </div>
        </div>
    `;
}

function showContrastPickerStep(copy, levels, colors, hasOneColor, defaults, onNext, onExit) {
    const { heading, paragraphs = [], textColorLabel, bgColorLabel, previewText, oneColorLine } = copy;
    const optionHtml = (selectedId) => colors.map((c) => `<option value="${c.id}" ${c.id === selectedId ? "selected" : ""}>${c.hex}${c.role ? ` — ${c.role}` : ""}</option>`).join("");

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>

            ${hasOneColor ? `<div class="panel boble-respons"><p>${oneColorLine}</p></div>` : ""}

            <p class="section-subheading">${textColorLabel}</p>
            <select id="contrast-text-select" class="text-input">${optionHtml(defaults.textId)}</select>

            <p class="section-subheading">${bgColorLabel}</p>
            <select id="contrast-bg-select" class="text-input">${optionHtml(defaults.bgId)}</select>

            <div id="contrast-preview"></div>
            <div class="section-body contrast-result" id="contrast-result" aria-live="polite"></div>

            ${allCombinationsHtml(colors, levels, copy)}

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    const textSelect = document.querySelector("#contrast-text-select");
    const bgSelect = document.querySelector("#contrast-bg-select");
    const previewEl = document.querySelector("#contrast-preview");
    const resultEl = document.querySelector("#contrast-result");

    function currentSelection() {
        return {
            textColor: colors.find((c) => c.id === textSelect.value),
            bgColor: colors.find((c) => c.id === bgSelect.value)
        };
    }

    function updatePreview() {
        const { textColor, bgColor } = currentSelection();
        const ratio = contrastRatio(textColor.hex, bgColor.hex);
        previewEl.innerHTML = contrastSampleHtml(previewText, textColor.hex, bgColor.hex);
        resultEl.innerHTML = `
            ${contrastLevelHtml(levels, contrastLevel(ratio), { tag: "p", className: "contrast-level--stor" })}
            <p style="font-size:14px;">Kontrastforhold: ${ratio.toFixed(2)} : 1</p>
        `;
    }

    textSelect.addEventListener("change", updatePreview);
    bgSelect.addEventListener("change", updatePreview);
    updatePreview();

    const trigger = document.querySelector(".kombinationer .accordion-trigger");
    trigger.addEventListener("click", () => {
        const item = trigger.closest(".accordion-item");
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!isOpen));
        item.dataset.open = String(!isOpen);
        item.querySelector(".accordion-panel").hidden = isOpen;
        trigger.querySelector(".accordion-icon").src = isOpen ? "img/accordion-closed.svg" : "img/accordion-open.svg";
    });

    document.querySelector(".kombination-gitter").addEventListener("click", (event) => {
        const sample = event.target.closest(".kombination");
        if (!sample) return;
        textSelect.value = sample.dataset.textId;
        bgSelect.value = sample.dataset.bgId;
        updatePreview();
        previewEl.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", () => {
        const { textColor, bgColor } = currentSelection();
        onNext({ textId: textColor.id, bgId: bgColor.id });
    });
    bindExit(onExit);
}

/*---- Modul 7, Boble 7.3 - tre-niveau feedback (jf. modul7.boble3.feedback) + mulighed for at prøve en anden kombination eller bekræfte den endelige ----*/

function showContrastResultStep({ heading, intro, previewText, feedback, retryLabel, confirmLabel }, levels, combo, onRetry, onConfirm, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body"><p>${intro}</p></div>

            ${contrastSampleHtml(previewText, combo.textHex, combo.bgHex)}

            ${contrastLevelHtml(levels, combo.level, { tag: "h3", className: "section-subheading contrast-level--stor" })}
            <div class="section-body">
                <p>${feedback[combo.level]}</p>
                <p style="font-size:14px;opacity:0.8;">Kontrastforhold: ${combo.ratio.toFixed(2)} : 1</p>
            </div>

            <div class="section-cta section-cta--column">
                <button id="retry-button" type="button" class="btn btn--regular btn--outline-green">${retryLabel}</button>
                <button id="confirm-button" type="button" class="btn btn--regular btn--solid-green">${confirmLabel}</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#retry-button").addEventListener("click", onRetry);
    document.querySelector("#confirm-button").addEventListener("click", onConfirm);
    bindExit(onExit);
}

/*---- Modul 8, Boble 8.1 (runde 7) - invitationen til at prøve paletten af, med 6.4's forhåndsvisning i lille størrelse nederst og to knapper, begge til 8.2. Valget styrer kun, hvilken version af 8.2 der vises ----*/

function showTryInPracticeStep({ heading, paragraphs = [], exampleText, triedButtonLabel, notTriedButtonLabel }, palette, textHex, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>

            ${palettePreviewHtml(palette, textHex, exampleText, { small: true })}

            <div class="section-cta section-cta--column">
                <button id="tried-button" type="button" class="btn btn--regular btn--solid-green">${triedButtonLabel}</button>
                <button id="not-tried-button" type="button" class="btn btn--regular btn--outline-green">${notTriedButtonLabel}</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#tried-button").addEventListener("click", () => onNext(true));
    document.querySelector("#not-tried-button").addEventListener("click", () => onNext(false));
    bindExit(onExit);
}

/*---- Modul 8, Boble 8.2 - fri refleksion, tre spørgsmål som inspiration (ikke enkeltvis besvarelse), ét tekstfelt ----*/

function showReflectionStep({ heading, paragraphs = [], questions = [], placeholder }, initialValue, onNext, onExit) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <div class="section-body">${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>

            <div class="section-body"><ul>${questions.map((q) => `<li>${q}</li>`).join("")}</ul></div>

            <textarea id="reflection-input" class="text-input" rows="4" placeholder="${placeholder || ""}">${initialValue || ""}</textarea>

            <div class="section-cta">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    document.querySelector("#next-button").addEventListener("click", () => {
        onNext(document.querySelector("#reflection-input").value);
    });
    bindExit(onExit);
}

/*---- Modul 8, Boble 8.3 - ren opsamlingsskærm (ingen redigerbart felt, jf. manuskriptet): palette med rolle/dosering, tekstfarve, kontrastkombination og refleksion, samlet fra motorens state ----*/

function showPaletteSummary(copy, levels, { palette, textColorId, contrast, reflection }, onFinish, onExit) {
    const colorsHtml = palette.map((c) => `
        <div class="color-field">
            <span class="color-field-swatch" style="background-color:${c.hex}; display:inline-block; cursor:default;"></span>
            <span>${c.hex}${c.role ? ` — ${c.role}` : ""} (${c.percent}%)</span>
        </div>
    `).join("");

    const textColor = palette.find((c) => c.id === textColorId);
    const textColorHtml = textColor
        ? `<div class="color-field"><span class="color-field-swatch" style="background-color:${textColor.hex}; display:inline-block; cursor:default;"></span><span>${copy.textColorLabel}: ${textColor.hex}</span></div>`
        : `<p class="section-body">${copy.noTextColorText}</p>`;

    const contrastHtml = contrast ? `
        <p class="section-subheading">${copy.contrastLabel}</p>
        <div class="color-field"><span class="color-field-swatch" style="background-color:${contrast.textHex}; display:inline-block; cursor:default;"></span><span>Tekstfarve: ${contrast.textHex}</span></div>
        <div class="color-field"><span class="color-field-swatch" style="background-color:${contrast.bgHex}; display:inline-block; cursor:default;"></span><span>Baggrundsfarve: ${contrast.bgHex}</span></div>
        <p class="section-body">Kontrastforhold: ${contrast.ratio.toFixed(2)} : 1</p>
        <p class="section-body">${copy.readabilityLabel}: ${contrastLevelHtml(levels, contrast.level)}</p>
    ` : "";

    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">${copy.heading}</h2>
            <div class="section-body"><p>${copy.intro}</p></div>

            <p class="section-subheading">${copy.colorsLabel}</p>
            <div class="panel">${colorsHtml}</div>

            ${textColorHtml}
            ${contrastHtml}

            <p class="section-subheading">${copy.reflectionLabel}</p>
            <div class="panel"><p>${reflection || "…"}</p></div>

            <div class="section-body"><p>${copy.closing}</p></div>

            <div class="panel">
                <p><strong>${copy.guideLabel}:</strong> ${copy.guide}</p>
            </div>

            <p class="section-subheading">${copy.takeawayLabel}</p>
            <div class="section-body"><p>${copy.takeaway}</p></div>

            <div class="section-cta">
                <button id="finish-button" type="button" class="btn btn--regular btn--outline-green">${copy.finishButtonLabel}</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    activateFocusTrap(app);

    const finishButton = document.querySelector("#finish-button");
    finishButton.addEventListener("click", async () => {
        finishButton.disabled = true;
        finishButton.textContent = "Gemmer...";
        await onFinish();
    });

    bindExit(onExit);
}

function showExitConfirmation(onStay, onExit) {
    app.innerHTML = `
        <section class="section exit-confirmation" role="dialog" aria-modal="true" aria-labelledby="exit-title" aria-describedby="exit-description">
            <h2 id="exit-title" class="section-subheading">Vil du forlade Farver?</h2>

            <div class="section-body">
                <p id="exit-description">Hvis du går ud nu, bliver dine svar ikke gemt.</p>
            </div>

            <div class="section-cta section-cta--column">
                <button id="stay-button" type="button" class="btn btn--regular btn--solid-green">Bliv i rummet</button>
                <button id="leave-button" type="button" class="btn btn--regular btn--solid-green">Ja, gå ud</button>
            </div>
        </section>`;

    activateFocusTrap(app);
    document.querySelector("#stay-button").addEventListener("click", onStay);
    document.querySelector("#leave-button").addEventListener("click", onExit);
}

export {
    showWelcome,
    showTextScreen,
    showExampleChoice,
    showSingleImageUpload,
    showImageReflection,
    showImageImpressionQuestion,
    showPaletteBuilder,
    showColorRoleStep,
    showDosageStep,
    showPreviewStep,
    showContrastPickerStep,
    showContrastResultStep,
    showReflectionStep,
    showPaletteSummary,
    showTryInPracticeStep,
    showExitConfirmation
};
