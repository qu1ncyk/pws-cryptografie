import { Letter, letterSoort, naarPlaatsInAlfabet, verschuifLetter } from "../hulpfuncties";

export type Uitvoertype = Generator<
    { actie: "pijl", positie: number } | { actie: "letter", letter: string },
    string>;

export function* caesarVersleutel(invoer: string, verschuiving: number): Uitvoertype {
    let uitvoer = "";
    for (let teken of invoer) {
        let soort = letterSoort(teken);

        if (soort !== Letter.geen) {
            yield { actie: "pijl", positie: naarPlaatsInAlfabet(teken) };
            teken = verschuifLetter(teken, verschuiving);
        }

        uitvoer += teken;
        yield { actie: "letter", letter: teken };
    }
    return uitvoer;
}

export function* caesarOntsleutel(invoer: string, verschuiving: number): Uitvoertype {
    let uitvoer = "";
    for (let teken of invoer) {
        let soort = letterSoort(teken);

        if (soort !== Letter.geen) {
            teken = verschuifLetter(teken, -verschuiving);
            yield { actie: "pijl", positie: naarPlaatsInAlfabet(teken) };
        }

        uitvoer += teken;
        yield { actie: "letter", letter: teken };
    }
    return uitvoer;
}