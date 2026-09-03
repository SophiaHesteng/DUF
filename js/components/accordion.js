export function initAccordion() {
    const triggers = document.querySelectorAll(".accordion-trigger");

    triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const item = trigger.closest(".accordion-item");
            const panel = item.querySelector(".accordion-panel");
            const icon = trigger.querySelector(".accordion-icon");
            const isOpen = trigger.getAttribute("aria-expanded") === "true";

            trigger.setAttribute("aria-expanded", String(!isOpen));
            item.dataset.open = String(!isOpen);
            panel.hidden = isOpen;
            icon.src = isOpen ? "img/accordion-closed.svg" : "img/accordion-open.svg";
        });
    });
}
