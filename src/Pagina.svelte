<script lang="ts">
    import Fa from "svelte-fa";
    import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
    import {pad} from "./stores";

    export let naam: string;

    function terug() {
        if (localStorage.vanafHoofdmenu) 
            window.history.back();
         else 
            window.history.pushState(null, "", "/");
        $pad = window.location.pathname;
    }
</script>

<span class="pijl" on:click={terug}><Fa icon={faArrowLeft} size="lg" /></span>
<h1>{naam}</h1>
<slot />

<style>
    .pijl {
        position: absolute;
        top: 1em;
        left: 1em;
        cursor: pointer;
    }
</style>