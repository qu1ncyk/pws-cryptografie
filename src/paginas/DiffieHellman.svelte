<script lang="ts">
    import Pagina from "../Pagina.svelte";
    import { dhA, dhB } from "../algoritmes/diffie-hellman";
    import { slaap } from "../hulpfuncties";

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
        await slaap(300);

        zichtbaar.gA = zichtbaar.pA = zichtbaar.gB = zichtbaar.pB = zichtbaar.a = true;
        await slaap(700);

        zichtbaar.AA = zichtbaar.AB = true;
        await slaap(700);

        zichtbaar.b = true;
        await slaap(700);

        zichtbaar.BA = zichtbaar.BB = true;
        await slaap(700);

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
                <p>g = <span style="opacity: {zichtbaar.gA ? 1 : 0};">{g}</span></p>
                <p>p = <span style="opacity: {zichtbaar.pA ? 1 : 0};">{p}</span></p>
                <p>a = <span style="opacity: {zichtbaar.a ? 1 : 0};">{a}</span></p>
                <p>
                    A = g<sup>a</sup> mod p =
                    <span style="opacity: {zichtbaar.AA ? 1 : 0};">{A}</span>
                </p>
                <p>B = <span style="opacity: {zichtbaar.BA ? 1 : 0};">{B}</span></p>
                <p>
                    K = B<sup>a</sup> mod p =
                    <span style="opacity: {zichtbaar.k ? 1 : 0};">{k}</span>
                </p>
            </div>
            <div>
                <p>g = <span style="opacity: {zichtbaar.gB ? 1 : 0};">{g}</span></p>
                <p>p = <span style="opacity: {zichtbaar.pB ? 1 : 0};">{p}</span></p>
                <p>A = <span style="opacity: {zichtbaar.AB ? 1 : 0};">{A}</span></p>
                <p>b = <span style="opacity: {zichtbaar.b ? 1 : 0};">{b}</span></p>
                <p>
                    B = g<sup>a</sup> mod p =
                    <span style="opacity: {zichtbaar.BB ? 1 : 0};">{B}</span>
                </p>
                <p>
                    K = A<sup>b</sup> mod p =
                    <span style="opacity: {zichtbaar.k ? 1 : 0};">{k}</span>
                </p>
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

    .visualisatie p {
        margin: 0;
        font-size: large;
        text-align: left;
    }

    .visualisatie span {
        transition: ease 0.5s opacity;
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
