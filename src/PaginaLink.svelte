<script lang="ts">
    export let titel: string;
    export let link: string;
    export let foto = "https://via.placeholder.com/100";

    import { pad } from "./stores";

    function volgLink() {
        window.history.pushState(true, "", link);
        $pad = window.location.pathname;
    }
</script>

<a href={link} on:click|preventDefault={volgLink}>
    <img src={foto} width="100" height="100" alt={titel} />
    <p>{titel}</p>
</a>

<style>
    a {
        display: inline-block;
        padding: 10px;
        margin: 3px;
        background-color: #ddd;
        border-radius: 7px;
    }

    p {
        margin: 0;
    }
</style>
