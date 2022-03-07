import { Letter, letterSoort, naarPlaatsInAlfabet, verschuifLetter } from "../hulpfuncties";

export type Uitvoertype = Generator<
    { actie: "oplichting", rij: number, kolom: number } | { actie: "letter", letter: string },
    string
>;

export function* vigereneVersleutel(invoer: string, sleutel: string): Uitvoertype {
    let uitvoer = "";
    for (let i = 0; i < invoer.length; i++) {
        let teken = invoer[i];
        let soort = letterSoort(teken);

        let sleutelTeken = sleutel[i % sleutel.length];
        let sleutelSoort = letterSoort(sleutelTeken);

        if (soort !== Letter.geen && sleutelSoort !== Letter.geen) {
            let verschuiving = naarPlaatsInAlfabet(sleutelTeken);
            
            // beweeg de oplichting naar de juiste rij en kolom
            yield { actie: "oplichting", rij: verschuiving, kolom: naarPlaatsInAlfabet(teken) };
            teken = verschuifLetter(teken, verschuiving);
        }

        uitvoer += teken;

        // voeg een letter toe in de visualisatie
        yield { actie: "letter", letter: teken };
    }

    return uitvoer;
}

export function* vigereneOntsleutel(invoer: string, sleutel: string): Uitvoertype {
    let uitvoer = "";
    for (let i = 0; i < invoer.length; i++) {
        let teken = invoer[i];
        let soort = letterSoort(teken);
        
        let sleutelTeken = sleutel[i % sleutel.length];
        let sleutelSoort = letterSoort(sleutelTeken);

        if (soort !== Letter.geen && sleutelSoort !== Letter.geen) {
            let verschuiving = naarPlaatsInAlfabet(sleutelTeken);

            // beweeg de oplichting naar de juiste rij en kolom
            yield { actie: "oplichting", rij: verschuiving, kolom: naarPlaatsInAlfabet(teken) };
            teken = verschuifLetter(teken, -verschuiving);
        }

        uitvoer += teken;

        // voeg een letter toe in de visualisatie
        yield { actie: "letter", letter: teken };
    }

    return uitvoer;
}