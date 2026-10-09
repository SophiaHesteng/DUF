/*---- Brugerens udgangspunkt fra det grundlæggende vækstrum "Det visuelle udtryk for din praksis" (runde 7, jf. "Det, rummet husker" i docs/duf-manuskript-visuelt-udtryk.md). Rummet gemmer svaret `udgangspunkt` (Boble 1.2) og `kanaler[]` (Boble 2.2) i sit eget output via vaekstrumStorage.js - denne fil er den ene sted, de andre vækstrum læser det fra, så de ikke selv skal kende rummets dataform.

NB: "udgangspunkt" i denne fil betyder altid brugerens SVAR i Boble 1.2 - ikke rummet. Rummet hedder VISUELT_VAEKSTRUM_ID / "Det visuelle udtryk for din praksis".

"Starter fra bunden" betyder kanaler = ["ingen"]. udgangspunkt = "barBund" betyder IKKE det samme (en bruger kan føle sig på bar bund og stadig have en hjemmeside) - brug det kun til tone, ikke til at springe indhold over. ----*/

import { getVaekstrumOutput } from "./vaekstrumStorage.js";

export const VISUELT_VAEKSTRUM_ID = "vaekstrum-visuelt-udtryk";

export const INGEN_KANALER = "ingen";

/*---- Returnerer { udgangspunkt, kanaler, starterFraBunden }, eller null hvis brugeren ikke har været i rummet (eller har fravalgt browserlagring) - så opfører det læsende rum sig som i dag ----*/

export async function hentUdgangspunkt() {
    let output;
    try {
        output = await getVaekstrumOutput(VISUELT_VAEKSTRUM_ID);
    } catch {
        return null;
    }

    const data = output?.data;
    if (!data || !data.udgangspunkt || !Array.isArray(data.kanaler)) return null;

    return {
        udgangspunkt: data.udgangspunkt,
        kanaler: data.kanaler,
        starterFraBunden: data.kanaler.length === 1 && data.kanaler[0] === INGEN_KANALER
    };
}
