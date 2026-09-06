/*----------------------------------------------------------------------------
 * Fælles samling - Visuel stil
 * ----------------------------------------------------------------------------
 * Lukkeskærmen for vækstområdet. Bevidst IKKE et vækstrum (intet ID, ingen
 * type, ingen flow-motor) - jf. docs/duf-faelles-samling-visuel-stil.md's
 * egen begrundelse for hvorfor. Læser udelukkende fra det delte lager
 * (js/storage/vaekstrumStorage.js) - skriver aldrig til det selv, og rører
 * ikke ved nogen af de fire vækstrums egne filer.
 * ----------------------------------------------------------------------------
 */

import {
    isStorageOptedOut,
    getAllVaekstrumOutputs,
    getImagesForVaekstrum
} from "./storage/vaekstrumStorage.js";

import { ROOM_ORDER, ROOMS, TEASERS, copy } from "./data/faellesSamling.js";

function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" });
}

function statusListHtml(savedIds) {
    return ROOM_ORDER.map((id) => {
        const isSaved = savedIds.includes(id);
        const icon = isSaved ? "fa-solid fa-circle-check" : "fa-regular fa-circle";
        const label = isSaved ? ROOMS[id].name : `${ROOMS[id].name} (ikke besøgt endnu)`;

        return `<li><i class="${icon}" aria-hidden="true"></i> ${label}</li>`;
    }).join("");
}

async function roomPanelHtml(output) {
    const room = ROOMS[output.vaekstrumId];
    const images = await getImagesForVaekstrum(output.vaekstrumId);

    const imagesHtml = images.length
        ? `<div class="section-cta section-cta--row">${images.map((img) => `<img src="${URL.createObjectURL(img.blob)}" alt="" style="max-width:120px;border-radius:10px;">`).join("")}</div>`
        : "";

    return `
        <div class="panel">
            <h3 class="section-subheading" style="margin-bottom:8px;">${room.name}</h3>
            <p class="section-body">${output.documentation || "(ingen dokumentationstekst endnu)"}</p>
            ${imagesHtml}
            <p style="font-size:14px;opacity:0.7;margin-top:12px;">Gemt ${formatDate(output.savedAt)}</p>
            <div class="section-cta">
                <a href="${room.link}" class="btn btn--slim btn--outline-green">Genbesøg ${room.name}</a>
            </div>
        </div>`;
}

function developCardHtml(id) {
    const room = ROOMS[id];

    return `
        <div class="value-card">
            <span class="value-card-label">${room.name}</span>
            <p class="value-card-description">${TEASERS[id]}</p>
            <div class="section-cta">
                <a href="${room.link}" class="btn btn--slim btn--solid-green">Gå til ${room.name}</a>
            </div>
        </div>`;
}

function roomDisplayList(ids) {
    const names = ids.map((id) => ROOMS[id].name);
    if (names.length === 1) return names[0];
    return `${names.slice(0, -1).join(", ")} og ${names[names.length - 1]}`;
}

async function buildPdf(outputs, coherenceNotes) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "pt" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    function ensureSpace(lineHeight) {
        if (y + lineHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
    }

    function addHeading(text) {
        ensureSpace(28);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text(text, margin, y);
        y += 24;
    }

    function addParagraph(text) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        const lines = doc.splitTextToSize(text, maxWidth);
        for (const line of lines) {
            ensureSpace(16);
            doc.text(line, margin, y);
            y += 16;
        }
        y += 8;
    }

    /*---- Skalerer billedet ned via canvas før det lægges i PDF'en - uploadede fotos kan sagtens være flere MB i fuld opløsning, hvilket ellers gør PDF'en unødigt tung, uden at billedet vises større end en miniature ----*/
    async function addImageBlob(blob) {
        const objectUrl = URL.createObjectURL(blob);

        try {
            const image = await new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = objectUrl;
            });

            const maxDimensionPx = 900;
            const scale = Math.min(1, maxDimensionPx / Math.max(image.naturalWidth, image.naturalHeight));
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(image.naturalWidth * scale);
            canvas.height = Math.round(image.naturalHeight * scale);

            const ctx = canvas.getContext("2d");
            // JPEG har ingen transparens - uden en hvid bund ville et gennemsigtigt PNG (fx et logo) få en sort baggrund i PDF'en
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const dataUrl = canvas.toDataURL("image/jpeg", 0.82);

            const maxBoxWidth = 180;
            const maxBoxHeight = 140;
            const aspectRatio = canvas.width / canvas.height;
            let boxWidth = maxBoxWidth;
            let boxHeight = boxWidth / aspectRatio;
            if (boxHeight > maxBoxHeight) {
                boxHeight = maxBoxHeight;
                boxWidth = boxHeight * aspectRatio;
            }

            ensureSpace(boxHeight + 12);
            doc.addImage(dataUrl, "JPEG", margin, y, boxWidth, boxHeight, undefined, "FAST");
            y += boxHeight + 12;
        } catch (error) {
            // Ukendt/uunderstøttet billedformat - spring billedet over frem for at fejle hele PDF'en
        } finally {
            URL.revokeObjectURL(objectUrl);
        }
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Din visuelle guide", margin, y);
    y += 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Visuel stil — udarbejdet ${formatDate(new Date().toISOString())}`, margin, y);
    y += 30;

    for (const output of outputs) {
        const room = ROOMS[output.vaekstrumId];
        addHeading(room.name);
        addParagraph(output.documentation || "(ingen dokumentationstekst endnu)");

        const images = await getImagesForVaekstrum(output.vaekstrumId);
        for (const image of images) {
            await addImageBlob(image.blob);
        }
    }

    if (coherenceNotes && coherenceNotes.trim()) {
        addHeading("Sammenhæng på tværs");
        addParagraph(coherenceNotes.trim());
    }

    ensureSpace(40);
    y = pageHeight - margin;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(copy.pdfCredit, margin, y);

    doc.save("din-visuelle-guide.pdf");
}

export async function initFaellesSamling() {
    document.querySelector("#intro-text").textContent = copy.intro;
    document.querySelector("#now-intro-text").textContent = copy.nowIntro;
    document.querySelector("#coherence-notes-label").textContent = copy.coherenceNotesLabel;
    document.querySelector("#develop-closing-text").textContent = copy.developClosing;

    const optedOut = isStorageOptedOut();
    const optOutSection = document.querySelector("#storage-notice-section");

    if (optedOut) {
        optOutSection.hidden = false;
        document.querySelector("#storage-notice-text").textContent = copy.optedOutNotice;
    }

    const outputs = optedOut ? [] : await getAllVaekstrumOutputs();
    const outputsById = new Map(outputs.map((output) => [output.vaekstrumId, output]));
    const savedIds = ROOM_ORDER.filter((id) => outputsById.has(id));
    const notSavedIds = ROOM_ORDER.filter((id) => !outputsById.has(id));

    document.querySelector("#room-status-list").innerHTML = statusListHtml(savedIds);

    const panelsContainer = document.querySelector("#collected-rooms");
    if (savedIds.length) {
        const panelsHtml = await Promise.all(savedIds.map((id) => roomPanelHtml(outputsById.get(id))));
        panelsContainer.innerHTML = panelsHtml.join("");
    }

    const coherenceSection = document.querySelector("#samlet-vurdering-section");
    if (savedIds.length === 0) {
        coherenceSection.hidden = true;
    } else {
        document.querySelector("#coherence-heading").textContent = copy.coherenceHeading;
        document.querySelector("#coherence-text").textContent = savedIds.length > 1
            ? `Du har arbejdet med ${roomDisplayList(savedIds.map((id) => id))}. ${copy.coherenceMulti}`
            : copy.coherenceSingle;
    }

    const developContainer = document.querySelector("#not-visited-rooms");
    if (notSavedIds.length === 0) {
        developContainer.innerHTML = `<p class="section-body">${copy.developAllDone}</p>`;
    } else {
        developContainer.innerHTML = notSavedIds.map(developCardHtml).join("");
    }

    const pdfExplainer = document.querySelector("#pdf-explainer");
    const pdfButton = document.querySelector("#download-pdf-button");

    if (optedOut) {
        pdfExplainer.textContent = copy.pdfOptedOut;
        pdfButton.style.display = "none";
    } else if (savedIds.length === 0) {
        pdfExplainer.textContent = copy.pdfEmpty;
        pdfButton.style.display = "none";
    } else {
        pdfExplainer.textContent = copy.pdfReady;
        pdfButton.style.display = "";

        pdfButton.addEventListener("click", () => {
            const coherenceNotes = document.querySelector("#coherence-notes")?.value ?? "";
            buildPdf(savedIds.map((id) => outputsById.get(id)), coherenceNotes);
        });
    }
}
