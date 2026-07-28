import { results } from "../data/results.js";

export function calculateResult(answers) {

    let totalPoints = 0;

    for (const answer of answers) {
        totalPoints += answer.points;
    }



console.log("Samlede point:", totalPoints);

if (totalPoints <= 4) {
    return results[2];
}

if (totalPoints <= 8){
    return results[1];
}

return results[0];
}
