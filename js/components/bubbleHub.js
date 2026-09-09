/*----------------------------------------------------------------------------
 * DUF — delt "oversigt + valgfrie bobler"-mønster
 * ----------------------------------------------------------------------------
 * Bruges af Overbliks Modul 3 og Modul 5 (jf. docs/duf-manuskript-overblik.md):
 * en fast oversigtsskærm (hub) med klikbare kort, ét pr. boble, som brugeren
 * kan besøge i vilkårlig rækkefølge - efterfulgt af en delt detaljeskærm, der
 * viser den valgte boblets indhold. Samme princip som js/components/exitDoor.js:
 * markup/logik samlet ét sted, tynde wrappers i overblikUi.js leverer modulets
 * egne tekster.
 * ----------------------------------------------------------------------------
 */

function renderBubbleHub({ heading, intro, bubbles }) {
    const cardsHtml = bubbles.map((bubble) => `
        <button type="button" class="value-card" data-bubble-key="${bubble.key}">
            <span class="value-card-label">${bubble.title}</span>
            <p class="value-card-description">${bubble.teaser}</p>
        </button>
    `).join("");

    return `
        <section class="section">
            <h2 class="section-heading">${heading}</h2>
            <p class="section-subheading">${intro}</p>

            <div class="value-list">${cardsHtml}</div>

            <div class="section-cta">
                <button id="hub-next-button" type="button" class="btn btn--regular btn--solid-green">Næste</button>
            </div>
        </section>`;
}

function bindBubbleHub(onSelectBubble, onNext) {
    document.querySelectorAll("[data-bubble-key]").forEach((card) => {
        card.addEventListener("click", () => onSelectBubble(card.dataset.bubbleKey));
    });

    document.querySelector("#hub-next-button").addEventListener("click", onNext);
}

function renderBubbleDetail({ title, body, workListLabel = "Det arbejder du med", workList, guideLabel = "Guide", guide, takeawayLabel = "Det tager du med dig videre", takeaway }) {
    return `
        <section class="section">
            <h2 class="section-heading">${title}</h2>

            <div class="section-body"><p>${body}</p></div>

            ${workList && workList.length ? `
                <p class="section-subheading">${workListLabel}:</p>
                <div class="section-body">
                    <ul>${workList.map((item) => `<li>${item}</li>`).join("")}</ul>
                </div>
            ` : ""}

            ${guide ? `
                <div class="panel">
                    <p><strong>${guideLabel}:</strong> ${guide}</p>
                </div>
            ` : ""}

            ${takeaway ? `
                <div class="panel">
                    <p><strong>${takeawayLabel}:</strong> ${takeaway}</p>
                </div>
            ` : ""}

            <div class="section-cta section-cta--column">
                <button id="bubble-back-button" type="button" class="btn btn--regular btn--outline-green">Tilbage til oversigt</button>
                <button id="bubble-next-button" type="button" class="btn btn--regular btn--solid-green">Fortsæt</button>
            </div>
        </section>`;
}

function bindBubbleDetail(onBack, onNext) {
    document.querySelector("#bubble-back-button").addEventListener("click", onBack);
    document.querySelector("#bubble-next-button").addEventListener("click", onNext);
}

export { renderBubbleHub, bindBubbleHub, renderBubbleDetail, bindBubbleDetail };
