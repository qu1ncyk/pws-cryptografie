<script lang="ts">
    import Pagina from "../Pagina.svelte";
    import { dhA, dhB } from "../algoritmes/diffie-hellman";
    import { slaap } from "../hulpfuncties";
    import { fade } from "svelte/transition";
    import Vergelijking from "../Vergelijking.svelte";
    import { element } from "svelte/internal";
    import { pad } from "../stores";

    let uitvoertekst = "";
    let vergrendeld = false;

    let g = 0;
    let p = 0;
    let a = 0;
    let b = 0;
    let A = 0;
    let B = 0;
    let k = 0;

    let zichtbaar = {
        gA: false,
        gB: false,
        pA: false,
        pB: false,
        AA: false,
        AB: false,
        BA: false,
        BB: false,
        a: false,
        b: false,
        k: false,
    };

    let elementen: { [index: string]: HTMLElement } = {};

    async function go() {
        vergrendeld = true;

        let getallenA = dhA();
        let getallenB = dhB(getallenA);
        g = getallenA.g;
        p = getallenA.p;
        a = getallenA.a;
        A = getallenA.A;
        b = getallenB.b;
        B = getallenB.B;
        k = getallenB.k;
        for (let i in zichtbaar) zichtbaar[i] = false;
        await slaap(700);

        zichtbaar.gA = zichtbaar.pA = zichtbaar.a = true;
        await slaap(1200);

        zichtbaar.AA = true;
        await slaap(1200);

        zichtbaar.gB = zichtbaar.pB = true;
        await slaap(1200);

        zichtbaar.b = true;
        await slaap(1200);

        zichtbaar.BB = true;
        await slaap(1200);

        zichtbaar.AB = zichtbaar.BA = true;
        await slaap(1200);

        zichtbaar.k = true;
        vergrendeld = false;
    }
</script>

<svelte:head>
    <title>Diffie-Hellman - PWS Cryptografie</title>
</svelte:head>

<Pagina naam="Diffie-Hellman">
    <div class="container">
        <button on:click={go} disabled={vergrendeld}>Creëer sleutel</button>

        <div class="visualisatie">
            <div>
                <Vergelijking
                    variabele="g"
                    waarde={g}
                    zichtbaar={zichtbaar.gA}
                    bind:element={elementen.gA}
                />
                <Vergelijking
                    variabele="p"
                    waarde={p}
                    zichtbaar={zichtbaar.pA}
                    bind:element={elementen.pA}
                />
                <Vergelijking
                    variabele="a"
                    waarde={a}
                    zichtbaar={zichtbaar.a}
                />
                <Vergelijking
                    variabele="A"
                    waarde={A}
                    zichtbaar={zichtbaar.AA}
                    bind:element={elementen.AA}
                    machtMod={[
                        [g, a, p],
                        ["g", "a", "p"],
                    ]}
                />
                <Vergelijking
                    variabele="B"
                    waarde={B}
                    zichtbaar={zichtbaar.BA}
                    variabeleBron={elementen.BB}
                />
                <Vergelijking
                    variabele="K"
                    waarde={k}
                    zichtbaar={zichtbaar.k}
                    machtMod={[
                        [B, a, p],
                        ["B", "a", "p"],
                    ]}
                />
            </div>
            <div>
                <Vergelijking
                    variabele="g"
                    waarde={g}
                    zichtbaar={zichtbaar.gB}
                    variabeleBron={elementen.gA}
                />
                <Vergelijking
                    variabele="p"
                    waarde={p}
                    zichtbaar={zichtbaar.pB}
                    variabeleBron={elementen.pA}
                />
                <Vergelijking
                    variabele="A"
                    waarde={A}
                    zichtbaar={zichtbaar.AB}
                    variabeleBron={elementen.AA}
                />
                <Vergelijking
                    variabele="b"
                    waarde={b}
                    zichtbaar={zichtbaar.b}
                />
                <Vergelijking
                    variabele="B"
                    waarde={B}
                    zichtbaar={zichtbaar.BB}
                    bind:element={elementen.BB}
                    machtMod={[
                        [g, b, p],
                        ["g", "b", "p"],
                    ]}
                />
                <Vergelijking
                    variabele="K"
                    waarde={k}
                    zichtbaar={zichtbaar.k}
                    machtMod={[
                        [A, b, p],
                        ["A", "b", "p"],
                    ]}
                />
            </div>
        </div>
    </div>
    <p class="uitvoer">{uitvoertekst}</p>
</Pagina>

<style>
    .container {
        display: flex;
        flex-direction: column;
        place-items: center;
        place-content: center;
        gap: 2em;
    }

    .visualisatie {
        min-width: 90vw;
        display: flex;
        place-content: space-around;
    }

    .uitvoer {
        border-top: gray 2px solid;
        display: inline-block;
        padding-top: 1em;
        margin-top: 2em;
    }

    @media (min-width: 640px) {
        .container {
            gap: 4em;
            flex-direction: row;
        }

        .visualisatie {
            min-width: 40%;
        }
    }
</style>
