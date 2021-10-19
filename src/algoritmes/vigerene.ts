export type Uitvoertype = Generator<
    { actie: "oplichting", rij: number, kolom: number } | { actie: "letter", letter: string },
    string>;

export function* vigereneVersleutel(invoer: string, sleutel: string): Uitvoertype {
    let uitvoer = "";
    for (let i = 0; i < invoer.length; i++) {
        let tekencode = invoer.charCodeAt(i);
        let sleutelTekencode = sleutel.charCodeAt(i % sleutel.length);

        let verschuiving;
        if (sleutelTekencode >= 65 && sleutelTekencode <= 90) // hoofdletter
            verschuiving = sleutelTekencode - 65;
        else if (sleutelTekencode >= 97 && sleutelTekencode <= 122) // kleine letter
            verschuiving = sleutelTekencode - 97;
        else
            verschuiving = 0;

        console.log({verschuiving});

        if (tekencode >= 65 && tekencode <= 90) { // hoofdletter

            yield { actie: "oplichting", rij: verschuiving, kolom: tekencode - 65 };

            tekencode += verschuiving;
            if (tekencode > 90) tekencode -= 26;
        } else if (tekencode >= 97 && tekencode <= 122) { // kleine letter

            yield { actie: "oplichting", rij: verschuiving, kolom: tekencode - 97 };

            tekencode += verschuiving;
            if (tekencode > 122) tekencode -= 26;
        }

        let letter = String.fromCharCode(tekencode);
        uitvoer += letter;

        yield { actie: "letter", letter };
    }

    return uitvoer;
}

export function* vigereneOntsleutel(invoer: string, sleutel: string): Uitvoertype {
    let uitvoer = "";
    for (let i = 0; i < invoer.length; i++) {
        let tekencode = invoer.charCodeAt(i);
        let sleutelTekencode = sleutel.charCodeAt(i % sleutel.length);

        let verschuiving;
        if (sleutelTekencode >= 65 && sleutelTekencode <= 90) // hoofdletter
            verschuiving = sleutelTekencode - 65;
        else if (sleutelTekencode >= 97 && sleutelTekencode <= 122) // kleine letter
            verschuiving = sleutelTekencode - 97;
        else
            verschuiving = 0;

        if (tekencode >= 65 && tekencode <= 90) { // hoofdletter

            yield { actie: "oplichting", rij: verschuiving, kolom: tekencode - 65 };

            tekencode -= verschuiving;
            if (tekencode < 65) tekencode += 26;
        } else if (tekencode >= 97 && tekencode <= 122) { // kleine letter

            yield { actie: "oplichting", rij: verschuiving, kolom: tekencode - 97 };

            tekencode -= verschuiving;
            if (tekencode < 97) tekencode += 26;
        }

        let letter = String.fromCharCode(tekencode);
        uitvoer += letter;

        yield { actie: "letter", letter };
    }

    return uitvoer;
}