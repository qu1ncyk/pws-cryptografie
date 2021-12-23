import { willekeurig, willekeurigPriem, ggd } from "../hulpfuncties";

export function genereerSleutelpaar() {
    let p = willekeurigPriem(10, 70);
    let q = willekeurigPriem(10, 70);
    let N = p * q;
    let phi = (p - 1) * (q - 1);

    // 1 < e < phi en ggd(e, phi) = 1
    let e: number;
    do {
        e = willekeurig(1, phi);
    } while (ggd(e, phi) !== 1);

    // probeer k tot (k * phi + 1) deelbaar is door e
    let k = 0;
    while ((k * phi + 1) % e !== 0) {
        k++;
    }
    let d = (k * phi + 1) / e;

    return { N, d, e, p, q, phi, k };
}

export function versleutelGetal(getal: number, e: number, N: number) {
    // BigInt is nodig omdat de getallen na de macht hier te groot
    // zijn om op te slaan als een JavaScript Number, die te grote
    // waarden omzet naar Infinity. BigInt kan veel grotere getallen
    // aan. Na de modulo is het getal klein genoeg voor Number.
    return Number(BigInt(getal) ** BigInt(e) % BigInt(N));
}

export function ontsleutelGetal(getal: number, d: number, N: number) {
    return Number(BigInt(getal) ** BigInt(d) % BigInt(N));
}

export function* versleutelTekst(tekst: string, e: number, N: number) {
    let textEncoder = new TextEncoder();
    // zet tekst om in een rij bytes
    let bytes = textEncoder.encode(tekst);

    // zet bytes om in een reeks nibbles, die zeker kleiner zijn dan N
    let getallen: number[] = [];
    for (let byte of bytes) {
        // duw de byte 4 bits naar rechts, zoals 0x12 -> 0x01
        getallen.push(byte >> 4);
        // kijk alleen naar de laatste 4 bits, zoals 0x12 -> 0x02
        getallen.push(byte & 0xf);
    }

    // geef de getallen door aan de visualisatie
    yield getallen;

    // versleutel elk getal
    return getallen.map(getal => versleutelGetal(getal, e, N));
}

export function* ontsleutelTekst(versleuteldeGetallen: number[], d: number, N: number) {
    // ontsleutel elk getal
    let getallen = versleuteldeGetallen.map(getal => ontsleutelGetal(getal, d, N));
    // geef de getallen door aan de visualisatie
    yield getallen;

    let bytes = new Uint8Array(getallen.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        // maak van 2 nibbles weer een byte, zoals
        // [0x1, 0x2] -> 0x12
        bytes[i] = getallen[i * 2] << 4 | getallen[i * 2 + 1];
    }

    let textDecoder = new TextDecoder();
    // zet bytes om in tekst
    return textDecoder.decode(bytes);
}