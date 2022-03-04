<script lang="ts">
    import Pagina from "../Pagina.svelte";
    import { caesarOntsleutel, caesarVersleutel } from "../algoritmes/caesar";
    import type { Uitvoertype as Caesaruitvoer } from "../algoritmes/caesar";
    import { slaap, alfabet, mod } from "../hulpfuncties";
    import Fa from "svelte-fa";
    import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    let tekst: string;
    let verschuiving: number;
    let pijlPositie = tweened(0, { duration: 500, easing: cubicOut });
    let alfPositie = tweened(0, { duration: 500, easing: cubicOut });
    let uitvoertekst = "";
    let pijlOmlaag = true;
    let vergrendeld = false;
    let tekstInvoerElement: HTMLInputElement;
    let verschuivingInvoerElement: HTMLInputElement;

    async function go(versleutel: boolean) {
        if (tekst === undefined || tekst === "") {
            alert("Vergeet de invoertekst niet in te vullen");
            tekstInvoerElement.focus();
            return;
        } else if (
            verschuiving === undefined ||
            verschuiving === null ||
            verschuiving < 0 ||
            verschuiving > 25
        ) {
            alert("De verschuiving moet tussen de 0 en 25 zitten");
            verschuivingInvoerElement.focus();
            return;
        }
        uitvoertekst = "";
        pijlOmlaag = versleutel;
        vergrendeld = true;

        $alfPositie = mod(verschuiving, 26);
        await slaap(500);

        let generator: Caesaruitvoer;
        if (versleutel) generator = caesarVersleutel(tekst, verschuiving);
        else generator = caesarOntsleutel(tekst, verschuiving);

        while (true) {
            let uitvoer = generator.next();
            if (uitvoer.done || typeof uitvoer.value === "string") {
                vergrendeld = false;
                return;
            }

            if (uitvoer.value.actie === "pijl") {
                $pijlPositie = uitvoer.value.positie;
                await slaap(500);
            }
            if (uitvoer.value.actie === "letter") {
                uitvoertekst += uitvoer.value.letter;
                await slaap(200);
            }
        }
    }
</script>

<svelte:head>
    <title>Caesar - PWS Cryptografie</title>
</svelte:head>

<Pagina naam="Caesar">
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
                Aantal letters verschuiven: <input
                    type="number"
                    bind:value={verschuiving}
                    bind:this={verschuivingInvoerElement}
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

        <div class="visualisatie">
            <div class="alfabet origineel">
                {#each alfabet as letter}
                    <span class="letter">{letter}</span>
                {/each}
            </div>
            <span class="pijl" style:--pijl-positie={$pijlPositie}>
                <Fa icon={pijlOmlaag ? faArrowDown : faArrowUp} />
            </span>
            <div class="alfabet versleuteld">
                <div class="dubbel-alfabet" style:--alf-positie={$alfPositie}>
                    {#each alfabet.concat(alfabet) as letter}
                        <span class="letter">{letter}</span>
                    {/each}
                </div>
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
    .dubbel-alfabet {
        transform: translateX(
            calc(-1 * var(--alf-positie) * var(--letterbreedte))
        );
    }

    .visualisatie {
        text-align: left;
    }

    .pijl {
        transform: translateX(calc(var(--letterbreedte) * var(--pijl-positie)));
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
