<script lang="ts">
    import Pagina from "../Pagina.svelte";
    import { dhA, dhB } from "../algoritmes/diffie-hellman";
    import { slaap } from "../hulpfuncties";
    import Vergelijking from "../Vergelijking.svelte";

    let vergrendeld = false;
    let stap = 0;

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
        stap = 1;
        await slaap(1200);
        
        zichtbaar.AA = true;
        stap = 2;
        await slaap(1200);
        
        zichtbaar.gB = zichtbaar.pB = zichtbaar.AB = true;
        stap = 3;
        await slaap(1200);
        
        zichtbaar.b = true;
        stap = 4;
        await slaap(1200);
        
        zichtbaar.BB = true;
        stap = 5;
        await slaap(1200);
        
        zichtbaar.BA = true;
        stap = 6;
        await slaap(1200);
        
        zichtbaar.k = true;
        stap = 7;
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

    <ol style="--stap: {stap};">
        <li>Kies <i>g</i>, <i>p</i> en <i>a</i></li>
        <li>Bereken <i>A</i></li>
        <li>Verstuur <i>g</i>, <i>p</i> en <i>A</i></li>
        <li>Kies <i>b</i></li>
        <li>Bereken <i>B</i></li>
        <li>Verstuur <i>B</i></li>
        <li>Bereken <i>K</i></li>
    </ol>
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

    ol {
        text-align: left;
        margin: 0 auto;
        display: inline-block;
        border-top: gray 2px solid;
        margin-top: 2em;
        padding-top: 1em;
        position: relative;
    }

    li:first-child::after {
        content: "";
        width: 100%;
        height: calc((100% - 1em) / 7);
        background-color: rgba(255, 255, 50, 0.5);
        display: inline-block;
        position: absolute;
        top: -1px;
        left: 0;
        z-index: -1;
        transition: transform 0.5s;
        transform: translateY(calc(var(--stap) * 100%));
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
