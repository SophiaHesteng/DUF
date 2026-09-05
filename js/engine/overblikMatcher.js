import { ROOMS } from "../data/overblik.js";

/*---- Relevanssignaler jf. Modul 2-noterne i manuskriptet ----*/

export function computeSignals(answers) {
    return {
        logo: answers.logo === "Nej" || answers.logo === "Det er under udvikling",
        farver: answers.farver === "Nej" || answers.farver === "Jeg er usikker",
        billederRettigheder: answers.billederBruger === "Ja" && answers.billederRettigheder === "Jeg er faktisk ikke helt sikker",
        byggesten: answers.sammenhaeng === "Nej, det føles spredt" || answers.sammenhaeng === "Jeg er ikke sikker"
    };
}

/*---- Billedrettigheder-signalet overtager som eneste anbefaling, når det er til stede. Ellers vises de "almindelige" signaler (Farver, Logo, Byggesten) - ét som et klart forslag, flere som et sidestillet valg. ----*/

export function resolveRecommendation(answers) {
    const signals = computeSignals(answers);

    if (signals.billederRettigheder) {
        return { type: "override", rooms: [ROOMS.billeder] };
    }

    const normalOrder = ["farver", "logo", "byggesten"];
    const matched = normalOrder.filter((key) => signals[key]).map((key) => ROOMS[key]);

    if (matched.length === 0) {
        return { type: "none", rooms: [] };
    }

    if (matched.length === 1) {
        return { type: "single", rooms: matched };
    }

    return { type: "multi", rooms: matched };
}
