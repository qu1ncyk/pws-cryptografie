<script lang="ts">
    import Pagina from "../Pagina.svelte";
    // import {};
    import { slaap, willekeurig, willekeurigPriem } from "../hulpfuncties";
    import Fa from "svelte-fa";
    import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

    let uitvoertekst = "";
    let vergrendeld = false;

    let g: number | "" = "";
    let p: number | "" = "";
    let a: number | "" = "";
    let b: number | "" = "";
    let A: number | "" = "";
    let B: number | "" = "";
    let k: number | "" = "";

    async function go() {
        g = "";
        p = "";
        a = "";
        b = "";
        A = "";
        B = "";
        k = "";
        await slaap(300);

        g = willekeurig(1, 35);
        p = willekeurigPriem(1, 35);
        a = willekeurig(1, 35);
        await slaap(700);
        
        A = g ** a % p;
        await slaap(700);
        
        b = willekeurig(1, 35);
        await slaap(700);

        B = g ** b % p;
        await slaap(700);

        k = A ** b % p;
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
                <p>g = <span style="opacity: {g !== "" ? 1 : 0};">{g}</span></p>
                <p>p = <span style="opacity: {p !== "" ? 1 : 0};">{p}</span></p>
                <p>a = <span style="opacity: {a !== "" ? 1 : 0};">{a}</span></p>
                <p>A = g<sup>a</sup> mod p = <span style="opacity: {A !== "" ? 1 : 0};">{A}</span></p>
                <p>B = <span style="opacity: {B !== "" ? 1 : 0};">{B}</span></p>
                <p>K = B<sup>a</sup> mod p = <span style="opacity: {k !== "" ? 1 : 0};">{k}</span></p>
            </div>
            <div>
                <p>g = <span style="opacity: {g !== "" ? 1 : 0};">{g}</span></p>
                <p>p = <span style="opacity: {p !== "" ? 1 : 0};">{p}</span></p>
                <p>A = <span style="opacity: {A !== "" ? 1 : 0};">{A}</span></p>
                <p>b = <span style="opacity: {b !== "" ? 1 : 0};">{b}</span></p>
                <p>B = g<sup>a</sup> mod p = <span style="opacity: {B !== "" ? 1 : 0};">{B}</span></p>
                <p>K = A<sup>b</sup> mod p = <span style="opacity: {k !== "" ? 1 : 0};">{k}</span></p>
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
