export function initPoll() {
    const pollItems = document.querySelectorAll(".choice-card--poll");
    const voteButton = document.querySelector("#vote-button");

    if (!pollItems.length || !voteButton) return;

    pollItems.forEach((item) => {
        item.addEventListener("click", () => {
            pollItems.forEach((other) => other.setAttribute("aria-pressed", "false"));
            item.setAttribute("aria-pressed", "true");
            voteButton.disabled = false;
        });
    });
}
