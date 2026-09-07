/*----------------------------------------------------------------------------
 * DUF — centralt navigationsmål for Visuelt udtryks vækstrum
 * ----------------------------------------------------------------------------
 * Før denne fil fandtes, sendte hvert vækstrums saveAndFinish() og
 * exitRoom() brugeren direkte til den offentlige forside
 * (vaekstomraade-visuelt-udtryk.html) - både når man var FÆRDIG med et rum,
 * og når man forlod det tidligt. Det var bug'en: man blev sendt helt ud af
 * vækstområdet, i stedet for at blive inde i det.
 *
 * Nu peger alle rum i stedet på den nye "vælg dit rum"-side, som ligger
 * INDE i vækstområdet (viser Overblik, de fire uddybende rum og fælles
 * samling - ikke marketingindhold). Skal målet ændres senere, sker det ét
 * sted her, ikke i fem motorer.
 * ----------------------------------------------------------------------------
 */

export const VISUELT_UDTRYK_HUB = "vaelg-rum-visuelt-udtryk.html";
