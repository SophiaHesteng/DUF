import { activateFocusTrap } from "./accessibility.js";
import { renderExitDoor as renderSharedExitDoor } from "../components/exitDoor.js";
import { imageGalleryHtml, renderImageUploadHtml, bindImageUpload } from "../components/imageGallery.js";
import { renderTjekliste } from "../components/tjekliste.js";
import { renderBilledvaelger } from "../components/billedvaelger.js";
import { renderProvSammen } from "../components/provSammen.js";

const app = document.querySelector("#app");

function renderExitDoor() {
    return renderSharedExitDoor("Gå ud af Billeder");
}

function renderReferenceButton() {
    return `
        <a id="reference-button" href="#" class="btn btn--slim btn--outline-green">
            <i class="fa-solid fa-scale-balanced" aria-hidden="true"></i>
            Rettigheder
        </a>
    `;
}

function bindChrome(onExit, onReference) {
    const exitButton = document.querySelector("#exit-button");
    if (exitButton) exitButton.addEventListener("click", onExit);

    const referenceButton = document.querySelector("#reference-button");
    if (referenceButton && onReference) {
        referenceButton.addEventListener("click", (event) => {
            event.preventDefault();
            onReference();
        });
    }
}

function situationsAccordionHtml(situationer) {
    return situationer.map((situation, index) => `
        <div class="accordion-item" data-open="false">
            <button class="accordion-trigger" aria-expanded="false" aria-controls="situation-panel-${index}">
                <span>${situation.title}</span>
                <img class="accordion-icon" src="img/accordion-closed.svg" alt="">
            </button>
            <div class="accordion-panel" id="situation-panel-${index}" hidden>
                <p>${situation.text}</p>
            </div>
        </div>
    `).join("");
}

function bindAccordions() {
    document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const item = trigger.closest(".accordion-item");
            const panel = item.querySelector(".accordion-panel");
            const icon = trigger.querySelector(".accordion-icon");
            const isOpen = trigger.getAttribute("aria-expanded") === "true";

            trigger.setAttribute("aria-expanded", String(!isOpen));
            item.dataset.open = String(!isOpen);
            panel.hidden = isOpen;
            icon.src = isOpen ? "img/accordion-closed.svg" : "img/accordion-open.svg";
        });
    });
}

function showWelcome(text, onStart) {
    app.innerHTML = `
        <section class="section welcome-card">
            <h1 class="section-heading">Billeder</h1>
            <div class="section-body"><p>${text}</p></div>
            <div class="section-cta">
                <button id="start-button" type="button" class="btn btn--regular btn--solid-green">Gå ind her</button>
            </div>
        </section>`;

    activateFocusTrap(app);
    document.querySelector("#start-button").addEventListener("click", onStart);
}

/*---- Fast opslagsværk - tilgængeligt fra enhver boble fra Modul 2 og frem ----*/

function showReference(situationer, onBack) {
    app.innerHTML = `
        <section class="section">
            <h2 class="section-heading">Billedrettigheder — praktisk oversigt</h2>
            <div class="choice-list">${situationsAccordionHtml(situationer)}</div>
            <div class="section-cta">
                <button id="back-button" type="button" class="btn btn--regular btn--outline-green">Tilbage</button>
            </div>
        </section>
        ${renderExitDoor()}`;

    bindAccordions();
    activateFocusTrap(app);
    document.querySelector("#back-button").addEventListener("click", onBack);
}

function showExitConfirmation(onStay, onExit) {
    app.innerHTML = `
        <section class="section exit-confirmation" role="dialog" aria-modal="true" aria-labelledby="exit-title" aria-describedby="exit-description">
            <h2 id="exit-title" class="section-subheading">Vil du forlade Billeder?</h2>

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

/*----------------------------------------------------------------------------
 * Bobler - én genbrugelig render-funktion pr. `type` i js/data/billeder.js,
 * i stedet for én funktion pr. skærm. Se docs/duf-manuskript-billeder.md.
 * ----------------------------------------------------------------------------
 */

/*---- topHtml (valgfri): indhold lige under overskriften, fx billederne øverst i 5.1/5.3 eller søgelinjen øverst i 4.4 (runde 7) ----*/
function headerHtml(boble, topHtml = "") {
    return `
        <h2 class="section-heading">${boble.heading}</h2>
        ${topHtml}
        <div class="section-body">
            ${(boble.paragraphs || []).map((p) => `<p>${p}</p>`).join("")}
            ${boble.list ? `<ul>${boble.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
            ${boble.afterList ? `<p>${boble.afterList}</p>` : ""}
        </div>
        ${boble.guideLine ? `
            <div class="panel guide-line">
                <p><strong>Guide:</strong> ${boble.guideLine}</p>
            </div>
        ` : ""}
    `;
}

function renderScreen({ bodyHtml, ctaHtml }, onExit, onReference) {
    app.innerHTML = `
        <section class="section">
            ${bodyHtml}
            <div class="section-cta">${ctaHtml}</div>
        </section>
        ${onReference ? renderReferenceButton() : ""}
        ${renderExitDoor()}`;

    activateFocusTrap(app);
    bindChrome(onExit, onReference);
}

/*---- type: "text" - ren læseskærm, med valgfri billedgalleri-visning (Modul 3.3/4.5), 💬-guide-linje, og valgfrit "isFinal"-slutknap-udseende (Modul 8.3) ----*/

function showTextBoble(boble, images, onNext, onExit, onReference) {
    const galleryHtml = images
        ? `<div class="image-gallery-view">${imageGalleryHtml(images)}</div>`
        : "";

    renderScreen({
        bodyHtml: `${headerHtml(boble)}${galleryHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular ${boble.isFinal ? "btn--outline-green" : "btn--solid-green"}">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    const nextButton = document.querySelector("#next-button");
    nextButton.addEventListener("click", async () => {
        if (boble.isFinal) {
            nextButton.disabled = true;
            nextButton.textContent = "Gemmer...";
        }
        await onNext();
    });
}

/*---- type: "choice" - envalgskort + eksplicit "Videre"-knap (aktiveres først ved valg). Understøtter valgfrit fritekstfelt for ét bestemt svar (freeTextOptionId, Modul 6.2), og et panel der afsløres for ét bestemt svar (revealOnOptionId, Modul 7.5) ----*/

function showChoiceBoble(boble, onNext, onExit, onReference) {
    const optionsHtml = boble.options.map((option) => `
        <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-id="${option.id}">
            <span class="choice-card-body">
                <span class="choice-card-title choice-card-title--plain">${option.text}</span>
                ${option.description ? `<span class="choice-card-description">${option.description}</span>` : ""}
            </span>
        </button>
    `).join("");

    const freeTextHtml = boble.freeTextOptionId
        ? `<textarea id="choice-freetext" class="text-input" rows="2" placeholder="${boble.freeTextPlaceholder || ""}" hidden></textarea>`
        : "";

    const revealHtml = boble.revealOnOptionId
        ? `<div class="panel" id="choice-reveal" hidden><p>${boble.revealText}</p></div>`
        : "";

    renderScreen({
        bodyHtml: `${headerHtml(boble)}<div class="choice-list">${optionsHtml}</div>${freeTextHtml}${revealHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green" disabled>${boble.nextButtonText}</button>`
    }, onExit, onReference);

    const optionButtons = document.querySelectorAll("[data-option-id]");
    const nextButton = document.querySelector("#next-button");
    const freeText = document.querySelector("#choice-freetext");
    const reveal = document.querySelector("#choice-reveal");
    let selectedId = null;

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            optionButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
            selectedId = button.dataset.optionId;
            nextButton.disabled = false;

            if (freeText) freeText.hidden = selectedId !== boble.freeTextOptionId;
            if (reveal) reveal.hidden = selectedId !== boble.revealOnOptionId;
        });
    });

    nextButton.addEventListener("click", () => {
        const answer = (freeText && selectedId === boble.freeTextOptionId)
            ? { optionId: selectedId, text: freeText.value }
            : selectedId;

        onNext(answer);
    });
}

/*---- type: "multiChoice" - togglebare kort (samme "Stemmepunkt"-mønster som Overbliks flervalgsspørgsmål), valgfri fritekst-note, og valgfrit loft over antal valg (maxSelect, Modul 5.4).
 * Runde 7: `billedkilder` viser brugerens billeder øverst (5.1/5.3, billedvælgerens vis-udgave). `groups` viser ordene som små knapper i grupper, der på mobil foldes ud én ad gangen, og `resultAtTop` flytter "Sådan vil jeg gerne opleves" op øverst (5.4). Med `noteCountsTowardMax` tæller brugerens egne ord med i loftet ----*/

function optionCardHtml(option, index) {
    return `
        <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-index="${index}">
            <span class="choice-card-body">
                <span class="choice-card-title choice-card-title--plain">${option.text}</span>
                ${option.description ? `<span class="choice-card-description">${option.description}</span>` : ""}
            </span>
        </button>
    `;
}

function optionGroupsHtml(groups) {
    let index = 0;

    return groups.map((group, groupIndex) => {
        const chips = group.options.map((option) => {
            const html = `<button type="button" class="keyword-chip ord-chip" aria-pressed="false" data-option-index="${index}">${option.text}</button>`;
            index += 1;
            return html;
        }).join("");

        return `
            <div class="ordgruppe">
                <button type="button" class="ordgruppe-trigger" aria-expanded="true" aria-controls="ordgruppe-${groupIndex}">
                    <span>${group.label}</span>
                    <img class="accordion-icon" src="img/accordion-open.svg" alt="">
                </button>
                <div class="keyword-list ordgruppe-panel" id="ordgruppe-${groupIndex}">${chips}</div>
            </div>
        `;
    }).join("");
}

/*---- Grupperne i 5.4: på desktop er alle åbne, på mobil (samme brud som resten, 480 px) er én åben ad gangen ----*/
function bindOrdgrupper() {
    const triggers = [...document.querySelectorAll(".ordgruppe-trigger")];
    if (!triggers.length) return;

    const mobil = window.matchMedia("(max-width: 480px)");

    function saet(trigger, aaben) {
        trigger.setAttribute("aria-expanded", String(aaben));
        document.getElementById(trigger.getAttribute("aria-controls")).hidden = !aaben;
        trigger.querySelector(".accordion-icon").src = aaben ? "img/accordion-open.svg" : "img/accordion-closed.svg";
    }

    /*---- #app skiftes helt ud ved næste boble - så afmelder lytteren sig selv, i stedet for at ramme elementer, der ikke findes længere (fx når en telefon drejes senere) ----*/
    function tilpas() {
        if (!triggers[0].isConnected) {
            mobil.removeEventListener("change", tilpas);
            return;
        }
        triggers.forEach((trigger, index) => saet(trigger, mobil.matches ? index === 0 : true));
    }

    triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const aaben = trigger.getAttribute("aria-expanded") === "true";
            if (mobil.matches && !aaben) triggers.forEach((other) => saet(other, false));
            saet(trigger, !aaben);
        });
    });

    mobil.addEventListener("change", tilpas);
    tilpas();
}

function showMultiChoiceBoble(boble, onNext, onExit, onReference, { billedkilder = null } = {}) {
    const optionsHtml = boble.groups
        ? optionGroupsHtml(boble.groups)
        : `<div class="choice-list">${boble.options.map(optionCardHtml).join("")}</div>`;

    const noteHtml = boble.allowNote
        ? `<textarea id="multichoice-note" class="text-input" rows="2" placeholder="${boble.notePlaceholder || ""}"></textarea>`
        : "";

    const resultHtml = boble.resultHeading
        ? (boble.resultAtTop
            ? `<div class="panel ord-resultat"><p class="section-subheading">${boble.resultHeading}</p><p class="section-body" id="multichoice-result" aria-live="polite"></p></div>`
            : `<p class="section-subheading">${boble.resultHeading}</p><p class="section-body" id="multichoice-result"></p>`)
        : "";

    const billederHtml = billedkilder ? `<div id="billedvaelger-container" class="billedvaelger"></div>` : "";

    renderScreen({
        bodyHtml: boble.resultAtTop
            ? `${headerHtml(boble, billederHtml)}${resultHtml}${optionsHtml}${noteHtml}`
            : `${headerHtml(boble, billederHtml)}${optionsHtml}${noteHtml}${resultHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    if (billedkilder) {
        renderBilledvaelger(document.querySelector("#billedvaelger-container"), { kilder: billedkilder, mode: "vis" });
    }

    bindOrdgrupper();

    const optionButtons = document.querySelectorAll("[data-option-index]");
    const noteField = document.querySelector("#multichoice-note");
    const resultField = document.querySelector("#multichoice-result");

    const pressedButtons = () => [...optionButtons].filter((button) => button.getAttribute("aria-pressed") === "true");

    /*---- Egne ord (5.4) adskilles med komma, ligesom de vises ----*/
    const egneOrd = () => boble.noteCountsTowardMax
        ? (noteField?.value || "").split(/[,·\n]/).map((ord) => ord.trim()).filter(Boolean)
        : [];

    const antalValgt = () => pressedButtons().length + egneOrd().length;

    function updateResult() {
        /*---- Når loftet er nået, markeres de øvrige ord som ikke-valgbare, så det er tydeligt, hvorfor et klik ikke gør noget ----*/
        if (boble.maxSelect) {
            const fuld = antalValgt() >= boble.maxSelect;
            optionButtons.forEach((button) => {
                const kanIkkeVaelges = fuld && button.getAttribute("aria-pressed") !== "true";
                if (kanIkkeVaelges) button.setAttribute("aria-disabled", "true");
                else button.removeAttribute("aria-disabled");
            });
        }

        if (!resultField) return;

        const chosen = pressedButtons().map((button) => boble.options[Number(button.dataset.optionIndex)].text);

        if (boble.noteCountsTowardMax) {
            chosen.push(...egneOrd());
        } else if (noteField?.value) {
            chosen.push(noteField.value);
        }

        resultField.textContent = chosen.join(boble.resultAtTop ? " · " : ", ");
    }

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const isPressed = button.getAttribute("aria-pressed") === "true";

            if (!isPressed && boble.maxSelect && antalValgt() >= boble.maxSelect) return;

            button.setAttribute("aria-pressed", String(!isPressed));
            updateResult();
        });
    });

    noteField?.addEventListener("input", updateResult);

    document.querySelector("#next-button").addEventListener("click", () => {
        const selected = [...optionButtons]
            .filter((button) => button.getAttribute("aria-pressed") === "true")
            .map((button) => boble.options[Number(button.dataset.optionIndex)].id);

        const note = document.querySelector("#multichoice-note")?.value || "";

        onNext({ selected, note });
    });
}

/*---- type: "textNote" - ét eller flere fritekstfelter. Modul 8.2 forudfyldes med en tekst bygget af engine ud fra det visuelle kompas (prefillText) ----*/

function showTextNoteBoble(boble, prefillText, onNext, onExit, onReference) {
    const fieldsHtml = boble.fields.map((field) => `
        ${field.label ? `<p class="section-subheading">${field.label}</p>` : ""}
        <textarea id="field-${field.id}" class="text-input" rows="${field.rows || 3}" placeholder="${field.placeholder || ""}">${prefillText && boble.prefillFrom ? prefillText : ""}</textarea>
    `).join("");

    renderScreen({
        bodyHtml: `${headerHtml(boble)}${fieldsHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    document.querySelector("#next-button").addEventListener("click", () => {
        const values = {};
        boble.fields.forEach((field) => {
            values[field.id] = document.querySelector(`#field-${field.id}`).value;
        });
        onNext(values);
    });
}

/*---- Søgelinje (runde 7) - brugerens valgte søgeord fra 4.2 og de fire søge-knapper. Bruges fuldt i 4.3 og som lille linje øverst i 4.4. Har brugeren valgt flere søgeord, vælger hun ét ad gangen. Uden søgeord åbner knapperne stedets forside. Adresserne ligger i `soegesteder` i js/data/billeder.js ----*/

function soegelinjeHtml({ soegeord, soegesteder }, { kompakt = false } = {}) {
    const ordHtml = soegeord.length > 1
        ? `<p class="soegelinje-label">Dine søgeord. Vælg det, du vil søge på:</p>
           <div class="keyword-list soegelinje-ord" role="group" aria-label="Dine søgeord">
               ${soegeord.map((ord, index) => `<button type="button" class="keyword-chip ord-chip" aria-pressed="${index === 0}" data-soegeord="${ord}">${ord}</button>`).join("")}
           </div>`
        : soegeord.length === 1
            ? `<p class="soegelinje-label">Dit søgeord: <strong>${soegeord[0]}</strong></p>`
            : "";

    const knapperHtml = soegesteder.map((sted) => `
        <a class="btn btn--slim btn--light-orange soegelinje-knap" data-soegested="${sted.id}"
           href="${soegeord.length ? sted.soeg(soegeord[0]) : sted.forside}"
           target="_blank" rel="noopener" aria-label="${sted.knapTekst} (åbner i et nyt vindue)">
            ${sted.knapTekst}
            <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
    `).join("");

    return `
        <div class="soegelinje${kompakt ? " soegelinje--kompakt" : ""}">
            ${ordHtml}
            <div class="soegelinje-knapper">${knapperHtml}</div>
        </div>
    `;
}

function bindSoegelinje({ soegesteder }) {
    const ordKnapper = [...document.querySelectorAll("[data-soegeord]")];
    const links = [...document.querySelectorAll("[data-soegested]")];

    ordKnapper.forEach((knap) => {
        knap.addEventListener("click", () => {
            ordKnapper.forEach((other) => other.setAttribute("aria-pressed", String(other === knap)));
            links.forEach((link) => {
                const sted = soegesteder.find((s) => s.id === link.dataset.soegested);
                link.href = sted.soeg(knap.dataset.soegeord);
            });
        });
    });
}

/*---- type: "soegesteder" - Modul 4.3 (runde 7): forklaring af stederne + søgelinjen ----*/

function showSoegestederBoble(boble, soegeKontekst, onNext, onExit, onReference) {
    const stederHtml = `<ul class="section-body soegesteder-liste">${boble.steder.map((sted) => `<li><strong>${sted.navn}</strong> — ${sted.tekst}</li>`).join("")}</ul>`;

    renderScreen({
        bodyHtml: `
            ${headerHtml({ ...boble, afterList: null })}
            ${stederHtml}
            ${soegelinjeHtml(soegeKontekst)}
            <div class="section-body"><p>${boble.afterList}</p></div>
        `,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    bindSoegelinje(soegeKontekst);

    document.querySelector("#next-button").addEventListener("click", () => onNext());
}

/*---- type: "imageUpload" - genbruger det delte billedgalleri-komponent. Understøtter et minimumsantal, før "Videre" aktiveres (minImages, Modul 4.4).
 * Runde 7: `ingenBilleder` (3.1) giver en ekstra knap under upload-feltet med sin egen respons. "Jeg har tilføjet mine billeder" vises først, når mindst ét billede er tilføjet, og ingen-billeder-knappen kun, så længe der ingen er. Motoren får { harEgneBilleder } med. `visSoegelinje` (4.4) viser søgelinjen øverst ----*/

function showImageUploadBoble(boble, images, onNext, onExit, onReference, imageHandlers, soegeKontekst = null) {
    const minImages = boble.minImages || 0;
    const meetsMin = images.length >= minImages;
    const ingen = boble.ingenBilleder;

    const ingenHtml = ingen
        ? `
            <button id="no-images-button" type="button" class="btn btn--regular btn--outline-green" ${images.length ? "hidden" : ""}>${ingen.knapTekst}</button>
            <div class="panel boble-respons" id="no-images-response" role="status" hidden><p>${ingen.respons}</p></div>
        `
        : "";

    const ctaHtml = ingen
        ? `<button id="next-button" type="button" class="btn btn--regular btn--solid-green" ${images.length ? "" : "hidden"}>${boble.nextButtonText}</button>
           <button id="no-images-continue" type="button" class="btn btn--regular btn--solid-green" hidden>${ingen.videreTekst}</button>`
        : `<button id="next-button" type="button" class="btn btn--regular btn--solid-green" ${minImages && !meetsMin ? "disabled" : ""}>${boble.nextButtonText}</button>`;

    const soegelinje = boble.visSoegelinje && soegeKontekst ? soegelinjeHtml(soegeKontekst, { kompakt: true }) : "";

    renderScreen({
        bodyHtml: `
            ${headerHtml(boble, soegelinje)}
            ${renderImageUploadHtml({ label: boble.uploadLabel, hint: boble.uploadHint, images })}
            ${ingenHtml}
            ${minImages && !meetsMin ? `<p class="section-body upload-gated-hint">${boble.gatedHint || ""}</p>` : ""}
        `,
        ctaHtml
    }, onExit, onReference);

    if (soegelinje) bindSoegelinje(soegeKontekst);

    const nextButton = document.querySelector("#next-button");
    const noImagesButton = document.querySelector("#no-images-button");
    const noImagesResponse = document.querySelector("#no-images-response");
    const noImagesContinue = document.querySelector("#no-images-continue");

    function syncIngenBilleder(antal) {
        if (!ingen) return;
        nextButton.hidden = antal === 0;
        noImagesButton.hidden = antal > 0;
        if (antal > 0) {
            noImagesResponse.hidden = true;
            noImagesContinue.hidden = true;
        }
    }

    bindImageUpload({
        ...imageHandlers,
        refresh: async () => {
            const updated = await imageHandlers.refresh();
            const hint = document.querySelector(".upload-gated-hint");
            const nowMeetsMin = updated.length >= minImages;

            if (nextButton && !ingen) nextButton.disabled = minImages > 0 && !nowMeetsMin;
            if (hint) hint.style.display = nowMeetsMin ? "none" : "";
            syncIngenBilleder(updated.length);

            return updated;
        }
    });

    if (ingen) {
        noImagesButton.addEventListener("click", () => {
            noImagesButton.hidden = true;
            noImagesResponse.hidden = false;
            noImagesContinue.hidden = false;
            noImagesContinue.focus();
        });
        noImagesContinue.addEventListener("click", () => onNext({ harEgneBilleder: false }));
        nextButton.addEventListener("click", () => onNext({ harEgneBilleder: true }));
        return;
    }

    nextButton.addEventListener("click", () => onNext());
}

/*---- type: "keywordPicker" - grupperede søgeord (Modul 4.2). Klik vælger og kopierer til udklipsholder, et nyt klik fravælger igen. De valgte ord sendes med til motoren, som gemmer dem under boblens answerKey ----*/

function showKeywordPickerBoble(boble, onNext, onExit, onReference) {
    const groupsHtml = boble.groups.map((group) => `
        <p class="section-subheading">${group.label}</p>
        <div class="keyword-list">
            ${group.words.map((word) => `<button type="button" class="keyword-chip" aria-pressed="false" data-word="${word}">${word}</button>`).join("")}
        </div>
    `).join("");

    renderScreen({
        bodyHtml: `${headerHtml(boble)}${groupsHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    const chips = [...document.querySelectorAll(".keyword-chip")];

    chips.forEach((chip) => {
        chip.addEventListener("click", async () => {
            const erValgt = chip.classList.toggle("is-copied");
            chip.setAttribute("aria-pressed", String(erValgt));
            if (!erValgt) return;

            try {
                await navigator.clipboard.writeText(chip.dataset.word);
            } catch {
                /*---- Udklipsholder kan være utilgængelig (fx uden for en sikker kontekst) - kopiering er en bekvemmelighed, ikke et krav for at komme videre ----*/
            }
        });
    });

    document.querySelector("#next-button").addEventListener("click", () => {
        onNext(chips.filter((chip) => chip.classList.contains("is-copied")).map((chip) => chip.dataset.word));
    });
}

/*---- type: "checklist" - Modul 7.2, genbruger den delte Tjekliste-komponent ----*/

function showChecklistBoble(boble, onNext, onExit, onReference) {
    renderScreen({
        bodyHtml: `${headerHtml(boble)}<div id="tjekliste-container"></div>`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    renderTjekliste(document.querySelector("#tjekliste-container"), {
        gemNoegle: boble.gemNoegle,
        punkter: boble.punkter,
        titel: boble.tjeklisteTitel,
        afslutning: boble.tjeklisteAfslutning
    });

    document.querySelector("#next-button").addEventListener("click", () => onNext());
}

/*---- type: "paletteCompare" - Modul 6.4, viser en gemt Farver-palet til sammenligning hvis den findes, ellers kun et "spring over" ----*/

function showPaletteCompareBoble(boble, farverOutput, onNext, onExit, onReference) {
    const palette = farverOutput?.data?.palette;
    const hasPalette = Boolean(palette?.length);

    const paletteHtml = hasPalette
        ? `<div class="palette-swatches">${palette.map((color) => `<span class="palette-swatch" style="background-color:${color.hex}" title="${color.role || color.hex}"></span>`).join("")}</div>`
        : "";

    const optionsHtml = hasPalette
        ? `<div class="choice-list">${boble.options.map((option) => `
            <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-id="${option.id}">
                <span class="choice-card-title choice-card-title--plain">${option.text}</span>
            </button>
        `).join("")}</div>`
        : "";

    const ctaHtml = hasPalette
        ? `<button id="next-button" type="button" class="btn btn--regular btn--solid-green" disabled>${boble.nextButtonText}</button>`
        : `<button id="skip-button" type="button" class="btn btn--regular btn--outline-green">${boble.skipButtonText}</button>`;

    renderScreen({
        bodyHtml: `${headerHtml(boble)}${paletteHtml}${optionsHtml}`,
        ctaHtml
    }, onExit, onReference);

    if (hasPalette) {
        const optionButtons = document.querySelectorAll("[data-option-id]");
        const nextButton = document.querySelector("#next-button");
        let selectedId = null;

        optionButtons.forEach((button) => {
            button.addEventListener("click", () => {
                optionButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
                selectedId = button.dataset.optionId;
                nextButton.disabled = false;
            });
        });

        nextButton.addEventListener("click", () => onNext(selectedId));
    } else {
        document.querySelector("#skip-button").addEventListener("click", () => onNext(null));
    }
}

/*---- type: "compassSummary" - Modul 6.5, ren visning af det, engine har samlet op i this.answers ----*/

function showCompassSummaryBoble(boble, summaryItems, onNext, onExit, onReference) {
    const itemsHtml = summaryItems.length
        ? `<dl class="compass-summary">${summaryItems.map((item) => `<dt>${item.label}</dt><dd>${item.value}</dd>`).join("")}</dl>`
        : `<p class="section-body">Du har endnu ikke svaret på nok undervejs til at vise et fuldt kompas her.</p>`;

    renderScreen({
        bodyHtml: `${headerHtml(boble)}${itemsHtml}`,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>`
    }, onExit, onReference);

    document.querySelector("#next-button").addEventListener("click", () => onNext());
}

/*---- type: "kontrasttest" - Modul 7.5 (runde 7). Brugeren vælger et billede (billedvælgerens vælg-udgave) og ser eksempelteksten ovenpå. Tekstfarven skiftes mellem paletten fra Farver (ellers hvid og sort), og en knap slår en halvgennemsigtig boks bag teksten til og fra - mørk bag lys tekst, lys bag mørk tekst. Intet måles automatisk. Svarer hun "Nej", vises tippet, og boks-knappen fremhæves ----*/

function erLysFarve(hex) {
    const clean = hex.replace("#", "");
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5;
}

function showKontrasttestBoble(boble, { billedkilder, tekstfarver }, onNext, onExit, onReference) {
    const optionsHtml = boble.options.map((option) => `
        <button type="button" class="choice-card choice-card--poll" aria-pressed="false" data-option-id="${option.id}">
            <span class="choice-card-body">
                <span class="choice-card-title choice-card-title--plain">${option.text}</span>
            </span>
        </button>
    `).join("");

    const farverHtml = tekstfarver.map((farve, index) => `
        <button type="button" class="palette-swatch kontrast-farve" aria-pressed="${index === 0}" data-farve="${farve.hex}"
            style="background-color:${farve.hex}" aria-label="Tekstfarve ${farve.role || farve.hex}" title="${farve.role || farve.hex}"></button>
    `).join("");

    renderScreen({
        bodyHtml: `
            ${headerHtml(boble)}
            <div id="billedvaelger-container" class="billedvaelger"></div>
            <div class="kontrast-test" id="kontrast-test" hidden>
                <div class="kontrast-preview">
                    <img id="kontrast-billede" src="" alt="Dit valgte billede">
                    <p class="kontrast-tekst"><span id="kontrast-eksempel" style="color:${tekstfarver[0].hex}">${boble.eksempeltekst}</span></p>
                </div>
                <p class="soegelinje-label">Tekstfarve</p>
                <div class="kontrast-farver" role="group" aria-label="Tekstfarve">${farverHtml}</div>
                <button id="kontrast-boks" type="button" class="btn btn--slim btn--outline-green" aria-pressed="false">Boks bag teksten</button>
            </div>
            <div class="choice-list">${optionsHtml}</div>
            <div class="panel boble-respons" id="choice-reveal" hidden><p>${boble.revealText}</p></div>
        `,
        ctaHtml: `<button id="next-button" type="button" class="btn btn--regular btn--solid-green" disabled>${boble.nextButtonText}</button>`
    }, onExit, onReference);

    const test = document.querySelector("#kontrast-test");
    const billede = document.querySelector("#kontrast-billede");
    const eksempel = document.querySelector("#kontrast-eksempel");
    const boksKnap = document.querySelector("#kontrast-boks");
    const farveKnapper = [...document.querySelectorAll("[data-farve]")];
    let tekstfarve = tekstfarver[0].hex;

    function opdaterBoks() {
        const medBoks = boksKnap.getAttribute("aria-pressed") === "true";
        const lysTekst = erLysFarve(tekstfarve);
        eksempel.classList.toggle("kontrast-boks--moerk", medBoks && lysTekst);
        eksempel.classList.toggle("kontrast-boks--lys", medBoks && !lysTekst);
    }

    renderBilledvaelger(document.querySelector("#billedvaelger-container"), {
        kilder: billedkilder,
        mode: "vaelg",
        onVaelg: (valgt) => {
            billede.src = valgt.src;
            test.hidden = false;
        }
    });

    farveKnapper.forEach((knap) => {
        knap.addEventListener("click", () => {
            farveKnapper.forEach((other) => other.setAttribute("aria-pressed", String(other === knap)));
            tekstfarve = knap.dataset.farve;
            eksempel.style.color = tekstfarve;
            opdaterBoks();
        });
    });

    boksKnap.addEventListener("click", () => {
        boksKnap.setAttribute("aria-pressed", String(boksKnap.getAttribute("aria-pressed") !== "true"));
        boksKnap.classList.remove("is-fremhaevet");
        opdaterBoks();
    });

    const optionButtons = document.querySelectorAll("[data-option-id]");
    const nextButton = document.querySelector("#next-button");
    const reveal = document.querySelector("#choice-reveal");
    let selectedId = null;

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            optionButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
            selectedId = button.dataset.optionId;
            nextButton.disabled = false;

            const svaert = selectedId === boble.revealOnOptionId;
            reveal.hidden = !svaert;
            boksKnap.classList.toggle("is-fremhaevet", svaert && boksKnap.getAttribute("aria-pressed") !== "true");
        });
    });

    nextButton.addEventListener("click", () => onNext(selectedId));
}

/*---- type: "forhaandsvisning" - Modul 8.1 (runde 7). Brugeren vælger et billede, og Byggestens "Prøv dem sammen" (js/components/provSammen.js) viser det øverst i kortet, med palet/fonte/ikon/logo fra de andre rum, hvis de findes. Begge knapper leder til 8.2 ----*/

function showForhaandsvisningBoble(boble, { billedkilder, provSammen }, onNext, onExit, onReference) {
    renderScreen({
        bodyHtml: `
            ${headerHtml(boble)}
            <div id="billedvaelger-container" class="billedvaelger"></div>
            <p class="section-subheading">${boble.forhaandsvisningOverskrift}</p>
            <div id="prov-sammen-container"></div>
        `,
        ctaHtml: `
            <div class="section-cta--column">
                <button id="next-button" type="button" class="btn btn--regular btn--solid-green">${boble.nextButtonText}</button>
                <button id="alt-next-button" type="button" class="btn btn--regular btn--outline-green">${boble.altNextButtonText}</button>
            </div>
        `
    }, onExit, onReference);

    const container = document.querySelector("#prov-sammen-container");
    renderProvSammen(container, provSammen);

    renderBilledvaelger(document.querySelector("#billedvaelger-container"), {
        kilder: billedkilder,
        mode: "vaelg",
        onVaelg: (valgt) => renderProvSammen(container, { ...provSammen, billede: { src: valgt.src, alt: "Dit valgte billede" } })
    });

    document.querySelector("#next-button").addEventListener("click", () => onNext());
    document.querySelector("#alt-next-button").addEventListener("click", () => onNext());
}

export const RENDERERS = {
    text: showTextBoble,
    choice: showChoiceBoble,
    multiChoice: showMultiChoiceBoble,
    textNote: showTextNoteBoble,
    imageUpload: showImageUploadBoble,
    keywordPicker: showKeywordPickerBoble,
    soegesteder: showSoegestederBoble,
    checklist: showChecklistBoble,
    paletteCompare: showPaletteCompareBoble,
    kontrasttest: showKontrasttestBoble,
    forhaandsvisning: showForhaandsvisningBoble,
    compassSummary: showCompassSummaryBoble
};

export {
    showWelcome,
    showReference,
    showExitConfirmation
};
