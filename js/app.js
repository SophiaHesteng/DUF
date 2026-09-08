console.log("Hello from Script"); // Kobling er good to go!


import { FlowEngine } from "./engine/flowEngine.js";
import { OverblikEngine } from "./engine/overblikEngine.js";
import { FarverEngine } from "./engine/farverEngine.js";
import { LogoEngine } from "./engine/logoEngine.js";
import { BilledeEngine } from "./engine/billederEngine.js";
import { ByggestenEngine } from "./engine/byggestenEngine.js";
import { initFaellesSamling } from "./faellesSamling.js";
import { initVaelgRumVisueltUdtryk } from "./vaelgRumVisueltUdtryk.js";

import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { renderChoiceCards } from "./components/choiceCards.js";
import { initPoll } from "./components/poll.js";
import { initAccordion } from "./components/accordion.js";
import { renderStorageNotice } from "./components/storageNotice.js";

renderHeader();
renderFooter();
renderChoiceCards();
initPoll();
initAccordion();
renderStorageNotice();

if (document.body.dataset.flow) {
    const engine = new FlowEngine();

    engine.start();
}

if (document.body.dataset.vaekstrum === "overblik") {
    const engine = new OverblikEngine();

    engine.start();
}

if (document.body.dataset.vaekstrum === "farver") {
    const engine = new FarverEngine();

    engine.start();
}

if (document.body.dataset.vaekstrum === "logo") {
    const engine = new LogoEngine();

    engine.start();
}

if (document.body.dataset.vaekstrum === "billeder") {
    const engine = new BilledeEngine();

    engine.start();
}

if (document.body.dataset.vaekstrum === "byggesten") {
    const engine = new ByggestenEngine();

    engine.start();
}

if (document.body.dataset.page === "faelles-samling") {
    initFaellesSamling();
}

if (document.body.dataset.page === "vaelg-rum-visuelt-udtryk") {
    initVaelgRumVisueltUdtryk();
}

