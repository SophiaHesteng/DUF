/*----------------------------------------------------------------------------
 * DUF — delt historik for et vækstrums vej gennem moduler og bobler
 * ----------------------------------------------------------------------------
 * Grundlaget for navigationslinjerne og "Tilbage"-knappen. Hver skærm-metode
 * i en engine kalder som det første:
 *
 *   this.historik.besoeg(modul, "modul.boble", () => this.showSkaerm(args));
 *
 * Historikken er brugerens faktiske rute, ikke en facitliste, så forgreninger
 * (fx Logo modul 2) kun viser den vej, brugeren har taget.
 *
 * Regler:
 * - Flere skærme i træk med samme boble-id (fx et spørgsmål og dets feedback,
 *   eller Farvers 6.2 én gang pr. farve) tæller som én boble.
 * - Hop tilbage (pin eller "Tilbage") afkorter historikken fra det punkt, og
 *   skærmen vises igen. Bobler og moduler efter punktet forsvinder fra stien
 *   og skal gås igen, så ruten genberegnes ud fra de svar, brugeren giver nu.
 * - Kommer brugeren tilbage til en boble, der allerede ligger tidligere i
 *   historikken (fx Farvers "Prøv en anden kombination" fra 7.3 til 7.2),
 *   behandles det som et hop tilbage til den boble.
 * - genvis() viser den aktuelle skærm igen uden at ændre historikken (bruges
 *   af exit-bekræftelsens "Bliv i rummet").
 *
 * Svarene selv ligger stadig i engine-objektet som før. Historikken sletter
 * dem ikke, så skærme, der viser tidligere svar (fx Farvers palet), er
 * udfyldt, når brugeren går frem igen.
 * ----------------------------------------------------------------------------
 */

export class RumHistorik {

    #trin = []; // { modul, boble, vis }
    #genviser = false;

    besoeg(modul, boble, vis) {
        if (this.#genviser) return;

        const sidste = this.#trin.at(-1);

        if (sidste?.boble !== boble) {
            const tidligere = this.#trin.findIndex((trin) => trin.boble === boble);
            if (tidligere !== -1) this.#trin.length = tidligere;
        }

        this.#trin.push({ modul, boble, vis });
    }

    hopTil(index) {
        const trin = this.#trin[index];
        if (!trin) return;

        this.#trin.length = index;
        trin.vis();
    }

    genvis() {
        this.#genviser = true;

        try {
            this.#trin.at(-1).vis();
        } finally {
            this.#genviser = false;
        }
    }

    /*---- Data til navigationslinjerne (js/components/rumRamme.js). `moduler` er rummets modulliste fra data-filen: [{ titel, antalBobler? }]. Antallet af moduler læses herfra, ikke hardkodet. Moduler i historikken er 1-baserede som i manuskripterne; linjerne er 0-baserede ----*/
    navigation(rum, moduler) {
        const aktuel = this.#trin.at(-1);
        if (!aktuel) return null;

        const bobler = [];

        this.#trin.forEach((trin, index) => {
            if (trin.modul === aktuel.modul && !bobler.some((boble) => boble.boble === trin.boble)) {
                bobler.push({ boble: trin.boble, index });
            }
        });

        return {
            rum,
            moduler: moduler.map((modul) => modul.titel),
            aktivModul: aktuel.modul - 1,
            bobler: bobler.map((boble) => boble.boble),
            aktivBoble: bobler.findIndex((boble) => boble.boble === aktuel.boble),
            antalBobler: moduler[aktuel.modul - 1]?.antalBobler ?? null,
            onModul: (index) => {
                const foerste = this.#trin.findIndex((trin) => trin.modul === index + 1);
                if (foerste !== -1) this.hopTil(foerste);
            },
            onBoble: (index) => this.hopTil(bobler[index].index),
            onTilbage: this.#trin.length > 1 ? () => this.hopTil(this.#trin.length - 2) : null
        };
    }
}
