/*---- Brugerens udgangspunkt fra Overblik (runde 7, jf. "Det, Overblik husker" i docs/duf-manuskript-overblik.md). Overblik gemmer `udgangspunkt` (Boble 1.2) og `kanaler[]` (Boble 2.2) i sit eget output via vaekstrumStorage.js - denne fil er den ene sted, de andre vækstrum læser det fra, så de ikke selv skal kende Overbliks dataform.

"Starter fra bunden" betyder kanaler = ["ingen"]. udgangspunkt = "barBund" betyder IKKE det samme (en bruger kan føle sig på bar bund og stadig have en hjemmeside) - brug det kun til tone, ikke til at springe indhold over. ----*/

import { getVaekstrumOutput } from "./vaekstrumStorage.js";

export const OVERBLIK_VAEKSTRUM_ID = "overblik";
export const INGEN_KANALER = "ingen";

/*---- Returnerer { udgangspunkt, kanaler, starterFraBunden }, eller null hvis brugeren ikke har været i Overblik (eller har fravalgt browserlagring) - så opfører rummet sig som i dag ----*/

export async function hentUdgangspunkt() {
    let output;
    try {
        output = await getVaekstrumOutput(OVERBLIK_VAEKSTRUM_ID);
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
