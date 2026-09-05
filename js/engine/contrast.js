/*---- WCAG-kontrastberegning (relativ luminans), jf. Modul 7 - erstatter det eksterne Adobe-værktøj fra manuskriptet med et indbygget tjek ----*/

function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    const full = clean.length === 3
        ? clean.split("").map((c) => c + c).join("")
        : clean;

    const num = parseInt(full, 16);

    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}

function relativeLuminance({ r, g, b }) {
    const channel = (value) => {
        const c = value / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function isValidHex(hex) {
    return /^#?[0-9a-fA-F]{3}$|^#?[0-9a-fA-F]{6}$/.test(hex);
}

export function contrastRatio(hexA, hexB) {
    const lumA = relativeLuminance(hexToRgb(hexA));
    const lumB = relativeLuminance(hexToRgb(hexB));

    const lighter = Math.max(lumA, lumB);
    const darker = Math.min(lumA, lumB);

    return (lighter + 0.05) / (darker + 0.05);
}

/*---- WCAG niveau AA: 4.5:1 for almindelig tekst, 3:1 for stor tekst (≥18pt/24px, eller ≥14pt/18.66px fed) ----*/

export function evaluateContrast(ratio) {
    return {
        ratio,
        passesNormalText: ratio >= 4.5,
        passesLargeText: ratio >= 3
    };
}
