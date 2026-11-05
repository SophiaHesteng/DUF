/*----------------------------------------------------------------------------
 * Visuel style guide - Visuelt udtryk for din praksis
 * ----------------------------------------------------------------------------
 * Lukkeskærmen for emnet. Bevidst IKKE et rum (intet ID, ingen
 * type, ingen flow-motor) - jf. docs/duf-visuel-style-guide.md's
 * egen begrundelse for hvorfor. Læser udelukkende fra det delte lager
 * (js/storage/storage.js) - skriver aldrig til det selv, og rører
 * ikke ved nogen af de fire rums egne filer.
 * ----------------------------------------------------------------------------
 */

import {
    isStorageOptedOut,
    getAllSideOutputs,
    getImagesForSide
} from "./storage/storage.js";

import { ROOM_ORDER, ROOMS, TEASERS, EXTRA_IMAGE_BUCKETS, copy } from "./data/visuel-style-guide.js";
import { IKON_STILE, ikonRaekkeHtml } from "./components/materialIkoner.js";
import { indlaesGoogleFont } from "./components/fontvaelger.js";

async function getRoomImages(sideId) {
    const buckets = [sideId, ...(EXTRA_IMAGE_BUCKETS[sideId] || [])];
    const perBucket = await Promise.all(buckets.map((bucket) => getImagesForSide(bucket)));
    return perBucket.flat();
}

function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" });
}

/*---- Farvers palet ligger struktureret i `data.palette` ({ hex, role, percent }). Vi bruger den til at tegne rigtige farveprøver i stedet for kun at vise hex-koderne som tekst ----*/
function getPalette(output) {
    return output.sideId === "farver" && Array.isArray(output.data?.palette) ? output.data.palette : [];
}

/*---- Farvers dokumentationstekst starter altid med "Palette: ... %." (jf. buildDocumentationText i js/engine/farverEngine.js). Når paletten vises som farveprøver, fjerner vi den sætning, så hex-koderne ikke står der to gange. Resten (tekstfarve, kontrast, refleksion) bliver stående ----*/
/*---- Byggesten vises som linjer, når der er gemte svar at bygge dem af. Ellers (fx et gammelt gem) vises teksten som før ----*/
function byggestenLinjerFor(output) {
    return output.sideId === "byggesten" ? byggestenLinjer(output.data) : [];
}

function documentationText(output) {
    const text = output.documentation || "";
    if (!getPalette(output).length) return text;
    return text.replace(/^Palette: .*?%\.\s*/, "");
}

/*---- Genbruger farveprøve-klasserne fra Farver-rummet (.dosage-*), så farverne ser ens ud begge steder - og så der ikke skal skrives ny SCSS ----*/
function paletteHtml(palette) {
    if (!palette.length) return "";

    const rows = palette.map((farve) => `
        <li class="dosage-row">
            <span class="dosage-swatch" style="background-color:${farve.hex};"></span>
            <span class="dosage-hex">${farve.hex}</span>
            <span class="section-body" style="margin:0;">${farve.role || ""}${farve.percent !== undefined ? ` · ${farve.percent}%` : ""}</span>
        </li>`).join("");

    return `<ul class="dosage-list" style="list-style:none;padding:0;">${rows}</ul>`;
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
}

/*---- Byggestens svar som linjer (label + værdi), bygget ud fra `data` i stedet for den samlede tekst i `documentation`. Bruges både på siden og i PDF'en. `ikonStil` og `font` er ekstra oplysninger, så siden kan vise eksempel-ikonerne og fontnavnet i sin egen skrift. Kun emner, brugeren har valgt i 2.1 (fokusvalg), kommer med - samme regel som i js/engine/byggestenEngine.js ----*/
function byggestenLinjer(data = {}) {
    const fokus = data.fokusvalg || [];
    const linjer = [];

    if (fokus.includes("ikoner") && data.ikonFoelelse) {
        const stil = IKON_STILE[data.ikonFoelelse.id];
        linjer.push({
            label: "Ikonstil",
            vaerdi: stil ? `${data.ikonFoelelse.text} (Material Symbols ${stil.navn})` : data.ikonFoelelse.text,
            ikonStil: stil ? data.ikonFoelelse.id : null
        });
        if (data.ikonFunktion?.text) linjer.push({ label: "Ikonernes funktion", vaerdi: data.ikonFunktion.text });
        if (data.ikonKilde?.text) linjer.push({ label: "Her finder du ikonerne", vaerdi: data.ikonKilde.text });
    }

    if (fokus.includes("fonte")) {
        if (data.fontOverskrift) linjer.push({ label: "Overskriftsfont", vaerdi: data.fontOverskrift, font: data.fontOverskrift });
        if (data.fontBroedtekst) linjer.push({ label: "Brødtekstfont", vaerdi: data.fontBroedtekst, font: data.fontBroedtekst });
    }

    if (fokus.includes("andreByggesten")) {
        const anden = data.andenDetalje
            ? (data.andenDetalje.beskrivelse || "En detalje, du har vist os")
            : data.andenRetning?.text || (data.ikkeBesluttet ? "Ikke besluttet endnu - det må gerne vise sig med tiden" : "");
        if (anden) linjer.push({ label: "Anden byggesten", vaerdi: anden });
    }

    if (data.tommelfingerregel?.trim()) linjer.push({ label: "Min tommelfingerregel", vaerdi: data.tommelfingerregel.trim() });

    return linjer;
}

/*---- Samme opsætning (.compass-summary: lille label over værdien) som oversigten i Byggesten 7.1, så det ligner det, brugeren så i rummet ----*/
function byggestenHtml(linjer) {
    const vaerdiHtml = (linje) => {
        if (linje.ikonStil) return `${ikonRaekkeHtml(linje.ikonStil, { medTekst: true })}<span style="display:block;margin-top:8px;">${escapeHtml(linje.vaerdi)}</span>`;
        if (linje.font) {
            indlaesGoogleFont(linje.font);
            return `<span style="font-family:'${escapeHtml(linje.font)}', sans-serif;font-size:20px;">${escapeHtml(linje.vaerdi)}</span>`;
        }
        return escapeHtml(linje.vaerdi);
    };

    return `<dl class="compass-summary">${linjer.map((linje) => `<dt>${linje.label}</dt><dd>${vaerdiHtml(linje)}</dd>`).join("")}</dl>`;
}

function statusListHtml(savedIds) {
    return ROOM_ORDER.map((id) => {
        const isSaved = savedIds.includes(id);
        const icon = isSaved ? "fa-solid fa-circle-check" : "fa-regular fa-circle";
        const label = isSaved ? ROOMS[id].name : `${ROOMS[id].name} (ikke besøgt endnu)`;

        return `<li><i class="${icon}" aria-hidden="true"></i> ${label}</li>`;
    }).join("");
}

/*---- Det, der står i et rums kort: Farver får farveprøver, Byggesten får linjer med eksempler, og resten (eller et gammelt gem uden data) får den gemte tekst ----*/
function indholdHtml(output) {
    const linjer = byggestenLinjerFor(output);
    if (linjer.length) return byggestenHtml(linjer);

    const palette = getPalette(output);
    const text = documentationText(output);
    const textHtml = text ? `<p class="section-body">${text}</p>` : "";

    if (palette.length) return paletteHtml(palette) + textHtml;
    return textHtml || `<p class="section-body">(ingen dokumentationstekst endnu)</p>`;
}

async function roomPanelHtml(output) {
    const room = ROOMS[output.sideId];
    const images = await getRoomImages(output.sideId);

    const imagesHtml = images.length
        ? `<div class="section-cta section-cta--row">${images.map((img) => `<img src="${URL.createObjectURL(img.blob)}" alt="" style="max-width:120px;border-radius:10px;">`).join("")}</div>`
        : "";

    return `
        <div class="panel">
            <h3 class="section-subheading" style="margin-bottom:8px;">${room.name}</h3>
            ${indholdHtml(output)}
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

/*---- jsPDF's indbyggede skrift (Helvetica) kan kun tegne almindelige vesteuropæiske tegn. Et tegn som "✓" (fra Farvers kontrastniveau) får jsPDF til at skrive hele linjen som enkelte bogstaver med mellemrum ("b a g g r u n d"). Derfor fjernes det, før teksten lægges i PDF'en ----*/
function pdfSafeText(text) {
    return text.replace(/✓\s*/g, "");
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
        const lines = doc.splitTextToSize(pdfSafeText(text), maxWidth);
        for (const line of lines) {
            ensureSpace(16);
            doc.text(line, margin, y);
            y += 16;
        }
        y += 8;
    }

    /*---- Byggestens linjer: label med fed, værdien under. Eksempel-ikonerne kommer ikke med i PDF'en - ikon-skrifttypen kan ikke lægges ind i jsPDF uden en del ekstra kode, så stilens navn står i stedet ----*/
    function addLinjer(linjer) {
        for (const linje of linjer) {
            ensureSpace(32);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(pdfSafeText(linje.label), margin, y);
            y += 14;
            addParagraph(linje.vaerdi);
        }
    }

    /*---- En lille firkant i farven + hex, rolle og procent ved siden af - én række pr. farve ----*/
    function addPalette(palette) {
        const swatchSize = 22;

        for (const farve of palette) {
            ensureSpace(swatchSize + 8);
            doc.setFillColor(farve.hex);
            doc.setDrawColor("#999999");
            doc.roundedRect(margin, y, swatchSize, swatchSize, 4, 4, "FD");

            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text(farve.hex.toUpperCase(), margin + swatchSize + 12, y + 15);

            doc.setFont("helvetica", "normal");
            const detaljer = [farve.role, farve.percent !== undefined ? `${farve.percent}%` : ""].filter(Boolean).join(" · ");
            doc.text(pdfSafeText(detaljer), margin + swatchSize + 90, y + 15);

            y += swatchSize + 8;
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
    doc.text(`Visuelt udtryk for din praksis - udarbejdet ${formatDate(new Date().toISOString())}`, margin, y);
    y += 30;

    for (const output of outputs) {
        const room = ROOMS[output.sideId];
        addHeading(room.name);

        const palette = getPalette(output);
        if (palette.length) addPalette(palette);

        const linjer = byggestenLinjerFor(output);
        const text = documentationText(output);
        if (linjer.length) addLinjer(linjer);
        else if (text) addParagraph(text);
        else if (!palette.length) addParagraph("(ingen dokumentationstekst endnu)");

        const images = await getRoomImages(output.sideId);
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

export async function initVisuelStyleGuide() {
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

    const outputs = optedOut ? [] : await getAllSideOutputs();
    const outputsById = new Map(outputs.map((output) => [output.sideId, output]));
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
