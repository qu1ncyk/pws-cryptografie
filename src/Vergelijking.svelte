<script lang="ts">
    import { EasingFunction, fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    export let variabele: string;
    export let waarde: string | number;
    export let zichtbaar: boolean;
    export let machtMod: [number[], string[]] | [] = [];
    export let element: HTMLElement | null = null;
    export let variabeleBron: HTMLElement | null = null;

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
        if (vanaf === null) return fade(node, { duration: 400, easing });

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
    <span>{variabele} =</span>
    {#if machtMod.length > 0}
        <div class="rel">
            <span style="opacity: {zichtbaar ? 1 : 0};"
                >{machtMod[0][0]}<sup>{machtMod[0][1]}</sup></span
            >
            <span class="abs" style="opacity: {zichtbaar ? 0 : 1};"
                >{machtMod[1][0]}<sup>{machtMod[1][1]}</sup></span
            >
        </div>
        mod
        <div class="rel">
            <span style="opacity: {zichtbaar ? 1 : 0};">{machtMod[0][2]}</span>
            <span class="abs" style="opacity: {zichtbaar ? 0 : 1};"
                >{machtMod[1][2]}</span
            >
        </div>
        =
    {/if}
    <div class="waarde-container">
        {#if zichtbaar}
            <span bind:this={element} in:kloon={{vanaf: variabeleBron}} out:fade>{waarde}</span>
        {/if}
    </div>
</div>

<style>
    span,
    sup {
        display: inline-block;
        transition: opacity 1s;
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

    .waarde-container {
        display: inline-block;
        width: 2em;
        margin: 0;
    }

    .container {
        font-size: large;
        text-align: left;
    }
    @media (min-width: 640px) {
        .container {
            font-size: larger;
        }
    }
</style>
