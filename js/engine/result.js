export function calculateResult(answers){
    console.log(answers);

    let totalPoints = 0;

    for (const answer of answers) {
        totalPoints += answer.points;
    }

    return totalPoints;
}