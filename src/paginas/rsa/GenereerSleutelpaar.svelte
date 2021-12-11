<script lang="ts">
    import { genereerSleutelpaar } from "../../algoritmes/rsa";
    import { slaap } from "../../hulpfuncties";
    import Vergelijking from "../../Vergelijking.svelte";
    import { rsaSleutelPaar } from "../../stores";

    let vergrendeld = false;

    let p = 0;
    let q = 0;
    let N = 0;
    let phi = 0;
    let e = 0;
    let k = 0;
    let d = 0;

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
        $rsaSleutelPaar = {d, e, N};
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
</script>

<div class="container">
    <button on:click={genereerSleutels} disabled={vergrendeld}
        >Creëer sleutelpaar</button
    >

    <div class="visualisatie">
        <Vergelijking variabele="p" waarde={p} zichtbaar={zichtbaar.p} />
        <Vergelijking variabele="q" waarde={q} zichtbaar={zichtbaar.q} />
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
        <Vergelijking variabele="e" waarde={e} zichtbaar={zichtbaar.e} />
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
