export function activateFocusTrap(container) {

    const focusableElements = container.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) {
        return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement.focus();

    container.addEventListener("keydown", (event) => {

        if (event.key !== "Tab") {
            return;
        }

        if (event.shiftKey) {

            if (document.activeElement === firstElement) {

                event.preventDefault();
                lastElement.focus();
            }

        } 
        
        else {

            if (document.activeElement === lastElement) {

                event.preventDefault();
                firstElement.focus();
            }
        }
    });
}