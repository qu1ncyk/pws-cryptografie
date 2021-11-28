<script lang="ts">
    import Pagina from "./Pagina.svelte";
    import { caesarOntsleutel, caesarVersleutel } from "./algoritmes/caesar";
    import type { Uitvoertype as Caesaruitvoer } from "./algoritmes/caesar";
    import { slaap } from "./hulpfuncties";
    import Fa from "svelte-fa";
    import {faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons";

    let tekst: string;
    let verschuiving: number;
    let pijlPositie = 0;
    let alfPositie = 0;
    let uitvoertekst = "";
    let pijlOmlaag = true;

    let alfabet: string[] = [];
    for (let i = 0; i < 26; i++) alfabet.push(String.fromCharCode(65 + i));

    async function go(versleutel: boolean) {
        uitvoertekst = "";
        pijlOmlaag = versleutel;

        alfPositie = verschuiving % 26;
        if (alfPositie < 0) alfPositie += 26;
        await slaap(500);

        let generator: Caesaruitvoer;
        if (versleutel) generator = caesarVersleutel(tekst, verschuiving);
        else generator = caesarOntsleutel(tekst, verschuiving);

        while (true) {
            let uitvoer = generator.next();
            if (uitvoer.done || typeof uitvoer.value === "string") return;

            if (uitvoer.value.actie === "pijl") {
                pijlPositie = uitvoer.value.positie;
                console.log(pijlPositie);
                await slaap(500);
            }
            if (uitvoer.value.actie === "letter") {
                uitvoertekst += uitvoer.value.letter;
                await slaap(200);
            }
        }
    }
</script>

<Pagina naam="Caesar">
    <div class="container">
        <form on:submit|preventDefault>
            <label>Invoertekst: <input type="text" bind:value={tekst} /></label>
            <label>
                Aantal letters verschuiven: <input
                    type="number"
                    bind:value={verschuiving}
                />
            </label>
            <button on:click={() => go(true)}>Versleutel</button>
            <button on:click={() => go(false)}>Ontsleutel</button>
        </form>

        <div class="visualisatie">
            <div class="alfabet origineel">
                {#each alfabet as letter}
                    <span class="letter">{letter}</span>
                {/each}
            </div>
            <span class="pijl" style="--pijl-positie: {pijlPositie};">
                <Fa icon={pijlOmlaag ? faArrowDown : faArrowUp} />
            </span>
            <div
                class="alfabet versleuteld"
                style="--alf-positie: {alfPositie};"
            >
                {#each alfabet.concat(alfabet) as letter}
                    <span class="letter">{letter}</span>
                {/each}
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

    input[type="number"] {
        width: 7em;
    }

    .visualisatie {
        --letterbreedte: 0.9em;
        font-size: small;
    }

    .letter {
        display: inline-block;
        width: var(--letterbreedte);
        text-align: center;
    }
    .alfabet.versleuteld {
        width: calc(26 * var(--letterbreedte));
        height: 1em;
        overflow: hidden;
        white-space: nowrap;
    }
    .alfabet.versleuteld > .letter {
        transform: translateX(
            calc(-1 * var(--alf-positie) * var(--letterbreedte))
        );
        transition: ease 0.5s transform;
    }

    .visualisatie {
        text-align: left;
    }

    .pijl {
        transform: translateX(calc(var(--letterbreedte) * var(--pijl-positie)));
        transition: ease 0.5s transform;
        display: inline-block;
        text-align: center;
        width: var(--letterbreedte);
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
            font-size: initial;
        }
    }
</style>
