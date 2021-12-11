<script lang="ts">
    import Pagina from "../Pagina.svelte";
    import {
        genereerSleutelpaar,
        versleutelGetal,
        ontsleutelGetal,
        versleutelTekst,
        ontsleutelTekst,
    } from "../algoritmes/rsa";
    import { slaap } from "../hulpfuncties";
    import Vergelijking from "../Vergelijking.svelte";
    import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

    let vergrendeld = false;
    let stap = 0;

    let p = 0;
    let q = 0;
    let N = 0;
    let phi = 0;
    let e = 0;
    let k = 0;
    let d = 0;
    let versleuteld: number[] | number = 0;
    let ontsleuteld: string | number = 0;

    let zichtbaar = {
        p: false,
        q: false,
        N: false,
        phi: false,
        e: false,
        d: false,
        sleutels: false,
    };

    async function genereerSleutels() {
        vergrendeld = true;
        let sleutelpaar = genereerSleutelpaar();
        p = sleutelpaar.p;
        q = sleutelpaar.q;
        N = sleutelpaar.N;
        phi = sleutelpaar.phi;
        e = sleutelpaar.e;
        k = sleutelpaar.k;
        d = sleutelpaar.d;
        for (let i in zichtbaar) zichtbaar[i] = false;
        await slaap(700);

        zichtbaar.p = zichtbaar.q = true;
        await slaap(1200);

        zichtbaar.N = zichtbaar.phi = true;
        await slaap(1200);

        zichtbaar.e = true;
        await slaap(1200);

        zichtbaar.d = true;
        await slaap(1200);

        zichtbaar.sleutels = true;
        vergrendeld = false;
    }

    let invoer: string;
    let sleutel: string;
    let tekstInvoerElement: HTMLInputElement;
    let sleutelInvoerElement: HTMLInputElement;

    async function codeer(versleutel: boolean) {}
</script>

<svelte:head>
    <title>RSA - PWS Cryptografie</title>
</svelte:head>

<Pagina naam="RSA">
    <Tabs>
        <TabList>
            <Tab>Genereer sleutelpaar</Tab>
            <Tab>Versleutel/Ontsleutel</Tab>
        </TabList>

        <TabPanel>
            <div class="container">
                <button on:click={genereerSleutels} disabled={vergrendeld}
                    >Creëer sleutelpaar</button
                >

                <div class="visualisatie">
                    <Vergelijking
                        variabele="p"
                        waarde={p}
                        zichtbaar={zichtbaar.p}
                    />
                    <Vergelijking
                        variabele="q"
                        waarde={q}
                        zichtbaar={zichtbaar.q}
                    />
                    <Vergelijking
                        variabele="N"
                        waarde={N}
                        zichtbaar={zichtbaar.N}
                        product={[
                            [p, q],
                            ["p", "q"],
                        ]}
                    />
                    <Vergelijking
                        variabele="φ"
                        waarde={phi}
                        zichtbaar={zichtbaar.phi}
                        productMin1={[
                            [p, q],
                            ["p", "q"],
                        ]}
                    />
                    <Vergelijking
                        variabele="e"
                        waarde={e}
                        zichtbaar={zichtbaar.e}
                    />
                    <Vergelijking
                        variabele="d"
                        waarde={d}
                        zichtbaar={zichtbaar.d}
                        dBreuk={[k, phi, e]}
                    />
                </div>
            </div>

            <div class="sleutels">
                <Vergelijking
                    variabele="Publieke sleutel"
                    zichtbaar={zichtbaar.sleutels}
                    vector={[
                        [e, N],
                        ["e", "N"],
                    ]}
                />
                <Vergelijking
                    variabele="Geheime sleutel"
                    zichtbaar={zichtbaar.sleutels}
                    vector={[
                        [d, N],
                        ["d", "N"],
                    ]}
                />
            </div>
        </TabPanel>

        <TabPanel>
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
                    />
                </label>
                <button on:click={() => codeer(true)} disabled={vergrendeld}>
                    Versleutel
                </button>
                <button on:click={() => codeer(false)} disabled={vergrendeld}>
                    Ontsleutel
                </button>
            </form>
        </TabPanel>
    </Tabs>
</Pagina>

<style>
    .container {
        display: flex;
        flex-direction: column;
        place-items: center;
        place-content: center;
        gap: 2em;
    }

    .sleutels {
        text-align: left;
        margin: 0 auto;
        display: inline-block;
        border-top: gray 2px solid;
        margin-top: 2em;
        padding-top: 1em;
        position: relative;
    }

    @media (min-width: 640px) {
        .container {
            gap: 4em;
            flex-direction: row;
        }
    }
</style>
