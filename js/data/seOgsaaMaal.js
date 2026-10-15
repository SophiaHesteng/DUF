/*----------------------------------------------------------------------------
 * DUF — fælles datakilde for Se også-skilte (js/components/seOgsaa.js)
 * ----------------------------------------------------------------------------
 * Ét sted for et måls navn og farveklasse, så de ikke duplikeres pr. boble.
 * Den korte, kontekst-specifikke linje ("tekst") skrives derimod pr. boble, hvor
 * skiltet bruges (fx i js/data/logo.js) - samme mål kan pege med forskellig
 * ordlyd forskellige steder (jf. docs/duf-manuskript-logo.md, hvor "Din
 * identitet" har én tekst i Boble 1.3a og en anden i 2B.4).
 *
 * farveKlasse matcher modifier-klasserne i css/_components.scss
 * (.se-ogsaa-skilt--<farveKlasse>), som igen bruger emnets egen
 * Sass-farve fra css/_colors.scss - ingen farvekoder duplikeret her.
 * ----------------------------------------------------------------------------
 */

export const SE_OGSAA_MAAL = {
    "din-identitet": {
        navn: "Din identitet",
        emne: "Branding",
        farveKlasse: "branding"
        /*---- Branding-emnet er endnu ikke bygget, så der er ikke noget side-id at pege på endnu. Skiltet er rent informativt og ikke klikbart (Heidis beslutning 2026-09-21), så det blokerer ikke brugen her - href sættes bevidst ikke, jf. seOgsaa.js. ----*/
    },
    farver: {
        navn: "Farver",
        emne: "Visuelt udtryk for din praksis",
        farveKlasse: "visuelt"
    },
    logo: {
        navn: "Logo",
        emne: "Visuelt udtryk for din praksis",
        farveKlasse: "visuelt"
    },
    byggesten: {
        navn: "Byggesten",
        emne: "Visuelt udtryk for din praksis",
        farveKlasse: "visuelt"
    }
};
