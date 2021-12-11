<script lang="ts">
    import Fa from "svelte-fa";
    import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let titel = "";
    export let sluitbaar = true;

    let dispatch = createEventDispatcher();
    function sluit() {
        dispatch("sluit");
    }
</script>

<div transition:fade class="schaduw">
    <div class="inhoud">
        {#if sluitbaar}
            <span class="icoon" on:click={sluit}>
                <Fa icon={faTimesCircle} size="lg" />
            </span>
        {/if}
        <h1>{titel}</h1>
        <slot />
    </div>
</div>

<style>
    .schaduw {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        place-content: center;
        align-items: center;
    }

    .inhoud {
        background-color: white;
        max-width: 1000px;
        padding: 1em;
        position: relative;
        border-radius: 7px;
    }

    .icoon {
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        cursor: pointer;
    }
</style>
