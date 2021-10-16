export type Uitvoertype = Generator<{ actie: "pijl", positie: number } | { actie: "letter", letter: string }, string>;

export function* caesarVersleutel(invoer: string, verschuiving: number): Uitvoertype {
    let uitvoer = "";
    for (let i = 0; i < invoer.length; i++) {
        let tekencode = invoer.charCodeAt(i);
        if (tekencode >= 65 && tekencode <= 90) { // hoofdletter

            yield { actie: "pijl", positie: tekencode - 65 };

            tekencode += verschuiving;
            if (tekencode > 90) tekencode -= 26;
        } else if (tekencode >= 97 && tekencode <= 122) { // kleine letter

            yield { actie: "pijl", positie: tekencode - 97 };

            tekencode += verschuiving;
            if (tekencode > 122) tekencode -= 26;
        }

        let letter = String.fromCharCode(tekencode);
        uitvoer += letter;

        yield { actie: "letter", letter };
    }
    return uitvoer;
}

export function* caesarOntsleutel(invoer: string, verschuiving: number): Uitvoertype {
    let uitvoer = "";
    for (let i = 0; i < invoer.length; i++) {
        let tekencode = invoer.charCodeAt(i);
        if (tekencode >= 65 && tekencode <= 90) { // hoofdletter
            tekencode -= verschuiving;
            if (tekencode < 65) tekencode += 26;

            yield { actie: "pijl", positie: tekencode - 65 };
        } else if (tekencode >= 97 && tekencode <= 122) { // kleine letter
            tekencode -= verschuiving;
            if (tekencode < 97) tekencode += 26;

            yield { actie: "pijl", positie: tekencode - 97 };
        }

        let letter = String.fromCharCode(tekencode);
        uitvoer += letter;

        yield { actie: "letter", letter };
    }
    return uitvoer;
}