<script lang="ts">
    import Pagina from "./Pagina.svelte";

    let tekst: string;
    let sleutel: string;
    let uitvoertekst = "";
    let opgelichteRij = 2;
    let opgelichteKolom = 4;

    let alfabet: string[] = [];
    for (let i = 0; i < 26; i++) alfabet.push(String.fromCharCode(65 + i));

    function alfabetVanaf(vanafLetter: number, omgekeerd = false) {
        if (!omgekeerd) {
            let eersteHelft = alfabet.slice(0, vanafLetter);
            let tweedeHelft = alfabet.slice(vanafLetter);
            return tweedeHelft.concat(eersteHelft);
        } else {
            let reeks = alfabetVanaf((vanafLetter + 1) % 26);
            reeks.reverse();
            return reeks;
        }
    }

    function go(a: boolean) {}
</script>

<Pagina naam="Vignenère">
    <div class="container">
        <form on:submit|preventDefault>
            <label>Invoertekst: <input type="text" bind:value={tekst} /></label>
            <label>
                Sleutel: <input type="text" bind:value={sleutel} />
            </label>
            <button on:click={() => go(true)}>Versleutel</button>
            <button on:click={() => go(false)}>Ontsleutel</button>
        </form>

        <table>
            <tr>
                <td rowspan="28"><span class="sleutel">Sleutel</span></td>
                <td colspan="28">Tekst</td>
            </tr>
            <tr>
                <th />
                {#each alfabet as letterBovensteRij, kolomnummer}
                    <th class:opgelicht={opgelichteKolom === kolomnummer}>
                        {letterBovensteRij}
                    </th>
                {/each}
            </tr>
            {#each alfabet as letterLinkerKolom, rijnummer}
                <tr>
                    <th class:opgelicht={opgelichteRij === rijnummer}>
                        {letterLinkerKolom}
                    </th>
                    {#each alfabetVanaf(rijnummer, true) as letter, kolomnummer}
                        <td
                            class:opgelicht={opgelichteRij === rijnummer ||
                                opgelichteKolom === kolomnummer}
                            class:extra-opgelicht={opgelichteRij ===
                                rijnummer && opgelichteKolom === kolomnummer}
                        >
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
    }

    th,
    td {
        padding: 0;
        font-size: 0.8em;
        line-height: 1em;
    }

    .opgelicht {
        background-color: rgb(255, 255, 133);
    }

    .extra-opgelicht {
        border: 1px solid black;
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
