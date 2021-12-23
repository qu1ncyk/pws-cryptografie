export function slaap(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/** Geeft de positieve modulo */
export function mod(x: number, y: number) {
    let uitkomst = x % y;
    if (uitkomst < 0) return uitkomst + y;
    else return uitkomst;
}

/*
    String.prototype.charCodeAt en String.fromCharCode zetten een
    teken om in de Unicode tekencode. Hoofdleters zijn daarin
    weergegeven met de codes 65 tot 90 en kleine letters van 97 tot
    122.
*/

export let alfabet: String[] = [];
for (let i = 0; i < 26; i++) alfabet.push(String.fromCharCode(65 + i));

export enum Letter {
    klein,
    hoofd,
    geen
}
export function letterSoort(letter: string) {
    let tekencode = letter.charCodeAt(0);

    if (tekencode >= 65 && tekencode <= 90)
        return Letter.hoofd;
    else if (tekencode >= 97 && tekencode <= 122)
        return Letter.klein;
    else
        return Letter.geen;
}
/** Geeft met een getal op [0, 25] de plaats in het alfabet aan */
export function naarPlaatsInAlfabet(letter: string) {
    let soort = letterSoort(letter);
    if (soort === Letter.hoofd)
        return letter.charCodeAt(0) - 65;
    else if (soort === Letter.klein)
        return letter.charCodeAt(0) - 97;
    else
        throw new Error("Teken is geen letter");
}

/** Zet een getal op [0, 25] om in een letter */
export function vanPlaatsInAlfabet(plaats: number, soort: Letter) {
    if (soort === Letter.hoofd)
        return String.fromCharCode(plaats + 65);
    else if (soort === Letter.klein)
        return String.fromCharCode(plaats + 97);
    else
        throw new Error("Teken is geen letter");
}

export function verschuifLetter(letter: string, aantal: number) {
    let soort = letterSoort(letter);
    let plaatsInAlfabet = naarPlaatsInAlfabet(letter);
    // verschuif de letter
    plaatsInAlfabet += aantal;
    // zet plaatsInAlfabet binnen [0, 25]
    plaatsInAlfabet = mod(plaatsInAlfabet, 26);
    return vanPlaatsInAlfabet(plaatsInAlfabet, soort);
}

export function willekeurig(min: number, max: number) {
    // het bereik van Math.random() is [0, 1>, met reële getallen
    // het bereik van Math.random() * (max - min) is [0, max - min>
    // het bereik van Math.random() * (max - min) + min is [min, max>
    // het bereik van willekeurig(min, max) is [min, max - 1], met gehele getallen
    return Math.floor(Math.random() * (max - min) + min);
}

export function isPriem(getal: number) {
    if (getal === 1) return false;
    if (getal === 2) return true;
    // getal is even
    if (!(getal & 1)) return false;

    // kijk of getal deelbaar is door i met 3 <= i <= wortel(getal) en i is oneven
    let wortel = Math.sqrt(getal);
    for (let i = 3; i <= wortel; i += 2) {
        if (getal % i === 0) return false;
    }

    return true;
}

export function willekeurigPriem(min: number, max: number) {
    let getal: number;
    do {
        getal = willekeurig(min, max);
    } while (!isPriem(getal));

    return getal;
}

/** Grootste gemene deler */
export function ggd(x: number, y: number) {
    let min = Math.min(x, y);

    for (let i = min; i > 0; i--) {
        // is i een gemene deler van x en y?
        if (x % i === 0 && y % i === 0)
            return i;
    }
}