console.log("Hello from Script"); // Kobling er good to go!


import { FlowEngine } from "./engine/flowEngine.js";
import { OverblikEngine } from "./engine/overblikEngine.js";

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

if (document.body.dataset.vaekstrum === "overblik") {
    const engine = new OverblikEngine();

    engine.start();
}

