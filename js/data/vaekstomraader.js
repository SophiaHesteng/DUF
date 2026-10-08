/*----------------------------------------------------------------------------
 * DUF — alle vækstområder, som de vises i dørkarrusellen på vaelg-din-dor.html
 * ----------------------------------------------------------------------------
 * Én liste, så et nyt område (eller et område, der får sin side) kun kræver,
 * at man udfylder href her. href: null = siden findes ikke endnu; døren vises
 * så som "Kommer snart" og kan ikke klikkes.
 *
 * titel = overskriften (h1) på områdets egen side.
 * slug  = matcher CSS-tokenet --omraade-<slug> i css/_colors.scss.
 * tekst = tekstfarve direkte på dørens farve: "moerk" ($textColor) eller
 *         "lys" ($primaryBgColor). Fra den farveblind-/kontrasttjekkede palet.
 * farveMoerk = mørk-tilstands-variant fra samme palet. DUF har ingen mørk
 *         tilstand endnu (beslutning 2026-10-08), så den bruges ikke - den
 *         ligger her, så den er klar den dag, et mørkt tema bygges.
 * ----------------------------------------------------------------------------
 */

export const vaekstomraader = [
    {
        slug: "visuelt-udtryk",
        titel: "Visuelt udtryk for din praksis",
        undertekst: "Farver, billeder, logo og de mindre detaljer, der binder det hele sammen.",
        href: "vaekstomraade-visuelt-udtryk.html",
        tekst: "moerk",
        farveMoerk: "#D95926"
    },
    {
        slug: "branding",
        titel: "Branding",
        undertekst: "Hvem du er, hvad du står for, og hvordan du viser det frem.",
        href: "vaekstomraade-branding.html",
        tekst: "moerk",
        farveMoerk: "#E66767"
    },
    {
        slug: "markedsfoering",
        titel: "Markedsføring",
        undertekst: "Bliv fundet af dem, du bedst kan hjælpe.",
        href: "vaekstomraade-markedsfoering.html",
        tekst: "moerk",
        farveMoerk: "#D55181"
    },
    {
        slug: "den-gode-praksis",
        titel: "Den gode praksis",
        undertekst: "Det håndværk, der ligger mellem selve behandlingerne.",
        href: "vaekstomraade-den-gode-praksis.html",
        tekst: "lys",
        farveMoerk: "#9C5518"
    },
    {
        slug: "produkter-ydelser",
        titel: "Produkter & ydelser",
        undertekst: "Byg og skru på det, du reelt tilbyder.",
        href: "vaekstomraade-produkter-ydelser.html",
        tekst: "lys",
        farveMoerk: "#008300"
    },
    {
        slug: "hjemmeside",
        titel: "Hjemmeside",
        undertekst: "Din hjemmeside som et sted, folk nemt kan finde vej.",
        href: "vaekstomraade-hjemmeside.html",
        tekst: "moerk",
        farveMoerk: "#3987E5"
    },
    {
        slug: "det-gode-indhold",
        titel: "Det gode indhold",
        undertekst: "Skriv og del det, der rent faktisk hjælper nogen.",
        href: null,
        tekst: "moerk",
        farveMoerk: "#C98500"
    },
    {
        slug: "sociale-medier",
        titel: "Sociale medier",
        undertekst: "Vær til stede, uden at det tager livet af dig.",
        href: "vaekstomraade-sociale-medier.html",
        tekst: "moerk",
        farveMoerk: "#199E70"
    },
    {
        slug: "ai",
        titel: "AI i din praksis",
        undertekst: "Brug det som et værktøj, ikke en erstatning for dig.",
        href: null,
        tekst: "lys",
        farveMoerk: "#9085E9"
    }
];
