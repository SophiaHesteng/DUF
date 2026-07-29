export function activateFocusTrap(container) {

    const heading = container.querySelector("h1, h2, h3");

    if (heading) {

        heading.setAttribute("tabindex", "-1");
        heading.focus();

    }

    const focusableElements = container.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) {
        return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    container.addEventListener("keydown", (event) => {

        if (event.key !== "Tab") {
            return;
        }

        if (event.shiftKey) {

            if (document.activeElement === firstElement) {

                event.preventDefault();
                lastElement.focus();

            }

        } else {

            if (document.activeElement === lastElement) {

                event.preventDefault();
                firstElement.focus();

            }

        }

    });

}