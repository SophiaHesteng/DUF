console.log("Hello from Script"); // Kobling er good to go!


import { FlowEngine } from "./engine/flowEngine.js";

import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { initPoll } from "./components/poll.js";
import { initAccordion } from "./components/accordion.js";

renderHeader();
renderFooter();
initPoll();
initAccordion();

if (document.body.dataset.flow) {
    const engine = new FlowEngine();

    engine.start();
}

