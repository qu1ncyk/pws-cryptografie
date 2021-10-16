<script lang="ts">
    import Pagina from "./Pagina.svelte";

    let tekst: string;
    let verschuiving: number;

    let alfabet: string[] = [];
    for (let i = 0; i < 26; i++) alfabet.push(String.fromCharCode(65 + i));
</script>

<Pagina naam="Caesar">
    <div class="container">
        <form>
            <label>Invoertekst: <input type="text" bind:value={tekst} /></label>
            <label>
                Aantal letters verschuiven: <input
                    type="number"
                    bind:value={verschuiving}
                />
            </label>
            <button>Versleutel</button>
            <button>Ontsleutel</button>
        </form>

        <div class="visualisatie">
            <div class="alfabet origineel">
                {#each alfabet as letter}
                    <span class="letter">{letter}</span>
                {/each}
            </div>
            <span class="pijl">&darr;</span>
            <div class="alfabet versleuteld">
                {#each alfabet.concat(alfabet) as letter}
                    <span class="letter">{letter}</span>
                {/each}
            </div>
        </div>
    </div>
    <p class="uitvoer">Versleutelde tekst</p>
</Pagina>

<style>
    .container {
        --letterbreedte: 0.9em;
        display: flex;
        flex-direction: column;
        place-items: center;
        place-content: center;
        gap: 2em;
    }

    input[type="number"] {
        width: 7em;
    }

    .letter {
        display: inline-block;
        width: var(--letterbreedte);
        text-align: center;
    }
    .alfabet {
        font-size: small;
    }
    .alfabet.versleuteld {
        width: calc(26 * var(--letterbreedte));
        height: 1em;
        overflow: hidden;
        white-space: nowrap;
    }
    .alfabet.versleuteld > .letter {
        transform: translateX(calc(-5 * var(--letterbreedte)));
    }

    .visualisatie {
        text-align: left;
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

        .alfabet {
            font-size: initial;
        }
    }
</style>
