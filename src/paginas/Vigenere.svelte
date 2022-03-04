<script lang="ts">
    import Pagina from "../Pagina.svelte";
    import {
        vigereneVersleutel,
        vigereneOntsleutel,
        Uitvoertype as Vigereneuitvoer,
    } from "../algoritmes/vigerene";
    import { slaap, alfabet } from "../hulpfuncties";

    let tekst: string;
    let sleutel: string;
    let uitvoertekst = "";
    let opgelichteRij = -2;
    let opgelichteKolom = -2;
    let omgekeerdAlfabet = false;
    let vergrendeld = false;
    let tekstInvoerElement: HTMLInputElement;
    let sleutelInvoerElement: HTMLInputElement;

    function alfabetVanaf(vanafLetter: number, omgekeerd = false) {
        if (!omgekeerd) {
            let eersteHelft = alfabet.slice(0, vanafLetter);
            let tweedeHelft = alfabet.slice(vanafLetter);
            return tweedeHelft.concat(eersteHelft);
        } else {
            return alfabetVanaf(26 - vanafLetter);
        }
    }

    async function go(versleutel: boolean) {
        if (tekst === "" || tekst === undefined) {
            alert("Vergeet de invoertekst niet in te vullen");
            tekstInvoerElement.focus();
            return;
        } else if (sleutel === "" || sleutel === undefined) {
            alert("Vergeet de sleutel niet in te vullen");
            sleutelInvoerElement.focus();
            return;
        }

        uitvoertekst = "";
        omgekeerdAlfabet = !versleutel;
        vergrendeld = true;

        let generator: Vigereneuitvoer;
        if (versleutel) generator = vigereneVersleutel(tekst, sleutel);
        else generator = vigereneOntsleutel(tekst, sleutel);

        while (true) {
            let uitvoer = generator.next();
            if (uitvoer.done || typeof uitvoer.value === "string") {
                vergrendeld = false;
                return;
            }

            if (uitvoer.value.actie === "oplichting") {
                opgelichteRij = uitvoer.value.rij;
                opgelichteKolom = uitvoer.value.kolom;
                await slaap(600);
            }
            if (uitvoer.value.actie === "letter") {
                uitvoertekst += uitvoer.value.letter;
                await slaap(200);
            }
        }
    }
</script>

<svelte:head>
    <title>Vigenère - PWS Cryptografie</title>
</svelte:head>

<Pagina naam="Vigenère">
    <div class="container">
        <form on:submit|preventDefault>
            <label>
                Invoertekst: <input
                    type="text"
                    bind:value={tekst}
                    bind:this={tekstInvoerElement}
                    disabled={vergrendeld}
                />
            </label>
            <label>
                Sleutel: <input
                    type="text"
                    bind:value={sleutel}
                    bind:this={sleutelInvoerElement}
                    disabled={vergrendeld}
                />
            </label>
            <button on:click={() => go(true)} disabled={vergrendeld}>
                Versleutel
            </button>
            <button on:click={() => go(false)} disabled={vergrendeld}>
                Ontsleutel
            </button>
        </form>

        <table
            style:--opgelichte-rij={opgelichteRij}
            style:--opgelichte-kolom={opgelichteKolom}
        >
            <tr>
                <td rowspan="28">
                    <span class="sleutel">Sleutel</span>
                </td>
                <td colspan="28" class="rij-boven">Tekst</td>
            </tr>
            <tr>
                <th />
                {#each alfabet as letterBovensteRij}
                    <th>
                        {letterBovensteRij}
                    </th>
                {/each}
            </tr>
            {#each alfabet as letterLinkerKolom, rijnummer}
                <tr>
                    <th>
                        {letterLinkerKolom}
                    </th>
                    {#each alfabetVanaf(rijnummer, omgekeerdAlfabet) as letter}
                        <td>
                            {letter}
                        </td>
                    {/each}
                </tr>
            {/each}
        </table>
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

    table {
        border-collapse: collapse;
        display: inline-block;
        position: relative;
    }

    .rij-boven {
        position: relative;
    }
    .rij-boven::after,
    .rij-boven::before {
        content: "";
        background-color: rgba(255, 255, 50, 0.5);
        position: absolute;
        display: inline-block;
        z-index: -1;
        transition: ease 0.5s transform;
    }
    .rij-boven::after {
        width: 100%;
        height: 100%;
        top: 2em;
        right: 0;
        transform: translateY(calc(var(--opgelichte-rij) * 100%));
    }
    .rij-boven::before {
        width: calc(100% / 27);
        height: calc(100% * 27);
        top: 100%;
        left: calc(100% / 27);
        transform: translateX(calc(var(--opgelichte-kolom) * 100%));
    }

    th,
    td {
        padding: 0;
        font-size: 0.8em;
        line-height: 1em;
    }

    .sleutel {
        display: inline-block;
        transform-origin: center;
        transform: rotate(-90deg) translateX(-1em);
        width: 1em;
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
    }
</style>
