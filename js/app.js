console.log("Hello from Script"); // Kobling er good to go!


import { FlowEngine } from "./engine/flowEngine.js";

import { renderHeader } from "./components/header.js";

renderHeader();

if (document.body.dataset.flow) {
    const engine = new FlowEngine();

    engine.start();
}

