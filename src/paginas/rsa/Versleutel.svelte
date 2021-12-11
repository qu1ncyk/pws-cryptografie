<script lang="ts">
    import { fade } from "svelte/transition";
    import { versleutelTekst, ontsleutelTekst } from "../../algoritmes/rsa";
    import { slaap } from "../../hulpfuncties";
    import Vergelijking from "../../Vergelijking.svelte";

    let vergrendeld = false;

    let invoer: string;
    let sleutel: string;
    let tekstInvoerElement: HTMLInputElement;
    let sleutelInvoerElement: HTMLInputElement;
    let versleutel = true;

    let m = "";
    let n: number[] = [0];
    let nVector = "";
    $: nVector = "(" + n.join(", ") + ")";
    let c: number[] = [0];
    let cVector = "";
    $: cVector = "(" + c.join(", ") + ")";
    let de = 0;
    let N = 0;

    let zichtbaar = {
        m: false,
        n1: false,
        n2: false,
        c1: false,
        c2: false,
        eind: false,
    };

    async function codeer() {
        if (invoer === undefined || invoer === "") {
            alert("Vergeet niet de invoertekst in te vullen");
            tekstInvoerElement.focus();
            return;
        } else if (sleutel === undefined || sleutel === "") {
            alert("Vergeet niet de sleutel in te vullen");
            sleutelInvoerElement.focus();
            return;
        }
        let sleutelMatch = sleutel.match(/\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
        if (sleutelMatch === null) {
            alert("De sleutel is niet in het goede formaat: (e/d, N)");
            sleutelInvoerElement.focus();
            return;
        }
        let sleutelObject = {
            de: Number(sleutelMatch[1]),
            N: Number(sleutelMatch[2]),
        };
        versleutel = true;
        vergrendeld = true;

        de = sleutelObject.de;
        N = sleutelObject.N;
        m = invoer;
        let generator = versleutelTekst(invoer, de, N);
        n = generator.next().value;
        c = generator.next().value;
        for (let i in zichtbaar) zichtbaar[i] = false;
        await slaap(700);

        zichtbaar.m = true;
        await slaap(1200);

        zichtbaar.n1 = true;
        await slaap(1200);

        zichtbaar.c1 = true;
        await slaap(1200);

        zichtbaar.c2 = true;
        await slaap(1200);

        zichtbaar.eind = true;
        vergrendeld = false;
    }

    async function decodeer() {
        if (invoer === undefined || invoer === "") {
            alert("Vergeet niet de invoertekst in te vullen");
            tekstInvoerElement.focus();
            return;
        } else if (sleutel === undefined || sleutel === "") {
            alert("Vergeet niet de sleutel in te vullen");
            sleutelInvoerElement.focus();
            return;
        }

        let invoerMatch = invoer.match(/\((:?\s*\d+\s*,)*\s*\d+\s*\)/)?.[0];
        if (invoerMatch === undefined) {
            alert("De invoer is niet in het goede formaat: (c1, c2, ...)");
            tekstInvoerElement.focus();
            return;
        }
        let invoerArray = [...invoerMatch.matchAll(/\d+/g)];
        c = invoerArray.map(Number);
        let sleutelMatch = sleutel.match(/\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
        if (sleutelMatch === null) {
            alert("De sleutel is niet in het goede formaat: (e/d, N)");
            sleutelInvoerElement.focus();
            return;
        }
        let sleutelObject = {
            de: Number(sleutelMatch[1]),
            N: Number(sleutelMatch[2]),
        };
        versleutel = false;
        vergrendeld = true;

        de = sleutelObject.de;
        N = sleutelObject.N;
        let generator = ontsleutelTekst(c, de, N);
        n = generator.next().value as number[];
        m = generator.next().value as string;
        for (let i in zichtbaar) zichtbaar[i] = false;
        await slaap(700);

        zichtbaar.c1 = true;
        await slaap(1200);

        zichtbaar.n1 = true;
        await slaap(1200);

        zichtbaar.n2 = true;
        await slaap(1200);

        zichtbaar.m = true;
        await slaap(1200);

        zichtbaar.eind = true;
        vergrendeld = false;
    }
</script>

<div class="container">
    <form on:submit|preventDefault>
        <label>
            Invoertekst: <input
                type="text"
                bind:value={invoer}
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
                placeholder="(e/d, N)"
            />
        </label>
        <button on:click={codeer} disabled={vergrendeld}> Versleutel </button>
        <button on:click={decodeer} disabled={vergrendeld}> Ontsleutel </button>
    </form>
    <div class="visualisatie">
        {#if versleutel}
            <div>
                <Vergelijking
                    variabele="m"
                    waarde={`"${m}"`}
                    zichtbaar={zichtbaar.m}
                />
            </div>
            <div>
                <p>Invoer als getallen:</p>
                <Vergelijking
                    variabele="n"
                    waarde={nVector}
                    zichtbaar={zichtbaar.n1}
                />
            </div>
            <div>
                <p>Versleutel elk getal</p>
                <Vergelijking
                    variabele="c"
                    zichtbaar={zichtbaar.c1}
                    waarde={c[0]}
                    machtMod={[
                        [n[0], de, N],
                        ["n", "e", "N"],
                    ]}
                />
                <Vergelijking
                    variabele="c"
                    waarde={cVector}
                    zichtbaar={zichtbaar.c2}
                />
            </div>
        {:else}
            <div>
                <Vergelijking
                    variabele="c"
                    waarde={cVector}
                    zichtbaar={zichtbaar.c1}
                />
            </div>
            <div>
                <p>Ontsleutel elk getal</p>
                <Vergelijking
                    variabele="n"
                    waarde={n[0]}
                    zichtbaar={zichtbaar.n1}
                    machtMod={[
                        [c[0], de, N],
                        ["c", "d", "N"],
                    ]}
                />
                <Vergelijking
                    variabele="n"
                    waarde={nVector}
                    zichtbaar={zichtbaar.n2}
                />
            </div>
            <div>
                <p>Getallen als tekst:</p>
                <Vergelijking
                    variabele="m"
                    waarde={`"${m}"`}
                    zichtbaar={zichtbaar.m}
                />
            </div>
        {/if}
    </div>
</div>
{#if versleutel && zichtbaar.eind}
    <p transition:fade|local class="uitvoer">{cVector}</p>
{:else if !versleutel && zichtbaar.eind}
    <p transition:fade|local class="uitvoer">{m}</p>
{/if}

<style>
    .container {
        display: flex;
        flex-direction: column;
        place-items: center;
        place-content: center;
        gap: 2em;
    }

    .uitvoer {
        text-align: left;
        margin: 0 auto;
        display: inline-block;
        border-top: gray 2px solid;
        margin-top: 2em;
        padding-top: 1em;
        position: relative;
    }

    .visualisatie p {
        margin: 0;
        text-align: left;
    }

    .visualisatie div {
        margin: 1em 0;
    }

    @media (min-width: 640px) {
        .container {
            gap: 4em;
            flex-direction: row;
        }
    }
</style>
