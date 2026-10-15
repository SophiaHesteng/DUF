console.log("Hello from Script"); // Kobling er good to go!


import { FlowEngine } from "./engine/flowEngine.js";
import { VisueltEngine } from "./engine/visueltEngine.js";
import { FarverEngine } from "./engine/farverEngine.js";
import { LogoEngine } from "./engine/logoEngine.js";
import { BilledeEngine } from "./engine/billederEngine.js";
import { ByggestenEngine } from "./engine/byggestenEngine.js";
import { initVisuelStyleGuide } from "./visuelStyleGuide.js";
import { initVaelgRumVisueltUdtryk } from "./vaelgRumVisueltUdtryk.js";
import { initDoerkarrusel } from "./components/doerkarrusel.js";

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

/*---- Én liste over sider med egen opstart. Hver side fortæller i <body data-side="..."> hvem den er, og alle sider startes på samme måde herfra. Tidligere havde rummene og de øvrige sider hver sin attribut og hver sin startkode; nu er der ingen forskel. Ny side med egen motor: tilføj én linje her og data-side på siden. ----*/

const sideStart = {
    "velkommen-visuelt-udtryk": () => new VisueltEngine().start(),
    farver: () => new FarverEngine().start(),
    logo: () => new LogoEngine().start(),
    billeder: () => new BilledeEngine().start(),
    byggesten: () => new ByggestenEngine().start(),
    "visuel-style-guide": initVisuelStyleGuide,
    "vaelg-rum-visuelt-udtryk": initVaelgRumVisueltUdtryk,
    "vaelg-din-dor": initDoerkarrusel
};

const startSide = sideStart[document.body.dataset.side];

if (startSide) {
    startSide();
}
