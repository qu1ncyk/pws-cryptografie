import { willekeurig, willekeurigPriem } from "../hulpfuncties";

/** Diffie-Hellman-algoritme voor persoon A */
export function dhA() {
    // deze getallen werken bij een demonstratie, maar in het echt
    // moet je grotere getallen gebruiken voor de veiligheid
    let g = willekeurig(10, 70);
    let p = willekeurigPriem(10, 70);
    let a = willekeurig(10, 70);

    let A = g ** a % p;

    return {
        g, p, a, A, berekenK(B: number) {
            return B ** a % p;
        }
    };

}

export function dhB({ g, p, A }: { g: number, p: number, A: number }) {
    let b = willekeurig(10, 70);

    let B = g ** b % p;
    let k = A ** b % p;

    return { b, B, k };
}