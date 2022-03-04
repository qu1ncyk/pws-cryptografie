<script lang="ts">
    import { EasingFunction, fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    export let variabele: string;
    export let waarde: number | string | null = null;
    export let zichtbaar: boolean;
    export let machtMod: [number[], string[]] | [] = [];
    export let product: [number[], string[]] | [] = [];
    export let productMin1: [number[], string[]] | [] = [];
    export let dBreuk: number[] = [];
    export let vector: [number[], string[]] | [] = [];
    export let element: HTMLElement | null = null;
    export let variabeleBron: HTMLElement | null = null;
    export let i = true;

    function kloon(
        node: HTMLElement,
        {
            duration = 1000,
            easing = cubicOut,
            vanaf,
        }: {
            duration?: number;
            delay?: number;
            easing?: EasingFunction;
            vanaf?: HTMLElement;
        }
    ) {
        if (vanaf === null) return fade(node, { duration: 700, easing });

        let rect = node.getBoundingClientRect();
        let rectVanaf = vanaf.getBoundingClientRect();

        let dx = rectVanaf.left - rect.left;
        let dy = rectVanaf.top - rect.top;
        let dw = rectVanaf.width / rect.width;
        let dh = rectVanaf.height / rect.height;

        return {
            duration,
            easing,
            css: (t, u) => `
				transform: translate(${dx * u}px, ${dy * u}px) scale(${t + dw * u}, ${
                t + dh * u
            });
			`,
        };
    }
</script>

<div class="container">
    <span class:omlaag50={dBreuk.length > 0} class:i>{variabele}</span>
    {#if machtMod.length > 0}
        =
        <div class="rel">
            <span style="opacity: {zichtbaar ? 1 : 0};"
                >{machtMod[0][0]}<sup>{machtMod[0][1]}</sup></span
            >
            <span class="abs i" style="opacity: {zichtbaar ? 0 : 1};"
                >{machtMod[1][0]}<sup>{machtMod[1][1]}</sup></span
            >
        </div>
        mod
        <div class="rel">
            <span style="opacity: {zichtbaar ? 1 : 0};">{machtMod[0][2]}</span>
            <span class="abs i" style="opacity: {zichtbaar ? 0 : 1};"
                >{machtMod[1][2]}</span
            >
        </div>
    {/if}
    {#if product.length > 0}
        =
        <div class="rel">
            <span style="opacity: {zichtbaar ? 1 : 0};">{product[0][0]}</span>
            <span class="abs i" style="opacity: {zichtbaar ? 0 : 1};"
                >{product[1][0]}</span
            >
        </div>
        ·
        <div class="rel">
            <span style="opacity: {zichtbaar ? 1 : 0};">{product[0][1]}</span>
            <span class="abs i" style="opacity: {zichtbaar ? 0 : 1};"
                >{product[1][1]}</span
            >
        </div>
    {/if}
    {#if productMin1.length > 0}
        = (<div class="rel">
            <span style="opacity: {zichtbaar ? 1 : 0};"
                >{productMin1[0][0]}</span
            >
            <span class="abs i" style="opacity: {zichtbaar ? 0 : 1};"
                >{productMin1[1][0]}</span
            >
        </div>
        - 1)(<div class="rel">
            <span style="opacity: {zichtbaar ? 1 : 0};"
                >{productMin1[0][1]}</span
            >
            <span class="abs i" style="opacity: {zichtbaar ? 0 : 1};"
                >{productMin1[1][1]}</span
            >
        </div>
        - 1)
    {/if}
    {#if dBreuk.length > 0}
        <span class="omlaag50">=</span>
        <div class="breuk">
            <div>
                <div class="rel">
                    <span style="opacity: {zichtbaar ? 1 : 0};"
                        >{dBreuk[0]}</span
                    >
                    <span class="abs i" style="opacity: {zichtbaar ? 0 : 1};"
                        >k</span
                    >
                </div>
                ·
                <div class="rel">
                    <span style="opacity: {zichtbaar ? 1 : 0};"
                        >{dBreuk[1]}</span
                    >
                    <span class="abs i" style="opacity: {zichtbaar ? 0 : 1};"
                        >φ</span
                    >
                </div>
                + 1
            </div>
            <div class="rel">
                <span style="opacity: {zichtbaar ? 1 : 0};">{dBreuk[2]}</span>
                <span class="abs e i" style="opacity: {zichtbaar ? 0 : 1};"
                    >e</span
                >
            </div>
        </div>
    {/if}
    {#if vector.length > 0}
        = (<div class="rel">
            <span style="opacity: {zichtbaar ? 1 : 0};">{vector[0][0]}</span>
            <span class="abs i" style="opacity: {zichtbaar ? 0 : 1};"
                >{vector[1][0]}</span
            >
        </div>,
        <div class="rel">
            <span style="opacity: {zichtbaar ? 1 : 0};">{vector[0][1]}</span>
            <span class="abs i" style="opacity: {zichtbaar ? 0 : 1};"
                >{vector[1][1]}</span
            >
        </div>)
    {/if}
    {#if waarde !== null}
        <span class:omlaag50={dBreuk.length > 0}>=</span>
        <div class="waarde-container">
            {#if zichtbaar}
                <span
                    class:omlaag50={dBreuk.length > 0}
                    bind:this={element}
                    in:kloon|local={{ vanaf: variabeleBron }}
                    out:fade|local>{waarde}</span
                >
            {/if}
        </div>
    {/if}
</div>

<style>
    span,
    sup {
        display: inline-block;
        transition: opacity 0.7s;
    }

    .omlaag50 {
        transform: translateY(50%);
    }

    .abs {
        position: absolute;
        display: inline-block;
        left: 0;
        width: 2em;
    }
    .rel {
        position: relative;
        display: inline-block;
    }

    .i {
        font-style: italic;
    }

    .breuk {
        display: inline-flex;
        flex-direction: column;
    }

    .breuk > div:last-child {
        text-align: center;
        border-top: 1px solid black;
    }

    .e {
        width: 100%;
    }

    .waarde-container {
        display: inline-block;
        min-width: 2em;
        margin: 0;
    }

    .container {
        font-size: medium;
        text-align: left;
    }
    @media (min-width: 640px) {
        .container {
            font-size: larger;
        }
    }
</style>
