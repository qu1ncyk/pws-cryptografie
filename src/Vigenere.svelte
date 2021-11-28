<script lang="ts">
    import Pagina from "./Pagina.svelte";
    import {
        vigereneVersleutel,
        vigereneOntsleutel,
        Uitvoertype as Vigereneuitvoer,
    } from "./algoritmes/vigerene";
    import { slaap } from "./hulpfuncties";

    let tekst: string;
    let sleutel: string;
    let uitvoertekst = "";
    let opgelichteRij = -2;
    let opgelichteKolom = -2;
    let omgekeerdAlfabet = false;
    let tekstInvoerElement: HTMLInputElement;
    let sleutelInvoerElement: HTMLInputElement;

    let alfabet: string[] = [];
    for (let i = 0; i < 26; i++) alfabet.push(String.fromCharCode(65 + i));

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

        let generator: Vigereneuitvoer;
        if (versleutel) generator = vigereneVersleutel(tekst, sleutel);
        else generator = vigereneOntsleutel(tekst, sleutel);

        while (true) {
            let uitvoer = generator.next();
            if (uitvoer.done || typeof uitvoer.value === "string") return;

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
                />
            </label>
            <label>
                Sleutel: <input
                    type="text"
                    bind:value={sleutel}
                    bind:this={sleutelInvoerElement}
                />
            </label>
            <button on:click={() => go(true)}>Versleutel</button>
            <button on:click={() => go(false)}>Ontsleutel</button>
        </form>

        <table
            style="--opgelichte-rij: {opgelichteRij};
                --opgelichte-kolom: {opgelichteKolom};"
        >
            <tr>
                <td rowspan="28" class="kolom-links">
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

    .rij-boven,
    .kolom-links {
        position: relative;
    }
    .rij-boven::after,
    .kolom-links::after {
        content: "";
        background-color: rgba(255, 255, 50, 0.5);
        position: absolute;
        display: inline-block;
        z-index: -1;
        transition: ease 0.5s transform;
    }
    .rij-boven::after {
        width: 100%;
        height: 1em;
        top: 2em;
        right: 0;
        transform: translateY(calc(var(--opgelichte-rij) * 1em));
    }
    .kolom-links::after {
        width: 100%;
        height: calc(100% - 1em);
        bottom: 0;
        left: 200%;
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
