const CHOICE_ICON = "img/door-icon-klem.png";

const doorChoices = [
    {
        href: "vaelg-din-dor.html",
        title: "Jeg ved ikke helt, hvor jeg skal begynde",
        description: "Du har mange ting du gerne vil få styr på, men mangler et sted at starte."
    },
    {
        href: "faq.html",
        title: "Jeg er allerede gået lidt i gang",
        description: "Du leder efter mere retning og har brug for hjælp til hvad du skal fokusere på først."
    },
    {
        href: "proeverummet.html",
        title: "Jeg vil gerne prøve konceptet af først",
        description: "Oplev, hvordan vi arbejder, før du beslutter dig."
    },
    {
        href: "about.html",
        title: "Jeg vil gerne lære jer bedre at kende",
        description: "Få et overblik over vores tilgang, værdier og univers"
    }
];

const pollChoices = [
    "Betalt annoncering",
    "Må jeg bruge AI?",
    "Opslag på sociale medier",
    "Blog eller ej",
    "Hvad skal mine behandlinger koste"
];

function doorCardHTML({ href, title, description }) {
    return `
        <a href="${href}" class="choice-card choice-card--door">
            <img class="choice-card-icon" src="${CHOICE_ICON}" alt="">
            <span class="choice-card-body">
                <span class="choice-card-title">${title}</span>
                <span class="choice-card-description">${description}</span>
            </span>
            <img class="choice-card-arrow" src="img/pil.svg" alt="">
        </a>
    `;
}

function pollCardHTML(title) {
    return `
        <button type="button" class="choice-card choice-card--poll" aria-pressed="false">
            <img class="choice-card-icon" src="${CHOICE_ICON}" alt="">
            <span class="choice-card-title">${title}</span>
            <img class="choice-card-arrow" src="img/pil.svg" alt="">
        </button>
    `;
}

export function renderChoiceCards() {
    const doorList = document.querySelector("#dor-valg-liste");

    if (doorList) {
        doorList.innerHTML = doorChoices.map(doorCardHTML).join("");
    }

    const pollList = document.querySelector("#poll-liste");

    if (pollList) {
        pollList.innerHTML = pollChoices.map(pollCardHTML).join("");
    }
}
