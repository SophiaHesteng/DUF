const selectedAnswers = [];

export function storeAnswer(answer){
    selectedAnswers.push(answer);
}

export function retrieveAnswers() {
    return selectedAnswers;
}

export function clearAnswers() {
    selectedAnswers.length = 0;
}