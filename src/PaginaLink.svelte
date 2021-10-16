<script lang="ts">
    export let titel: string;
    export let link: string;
    export let foto: string;

    import { pad } from "./stores";

    function volgLink() {
        window.history.pushState(null, "", link);
        $pad = link;
    }
</script>

<a href={link} on:click|preventDefault={volgLink}>
    <img src={foto} alt={titel} />
    <p>{titel}</p>
</a>

<style>
    a {
        display: inline-block;
        padding: 10px;
        background-color: #ddd;
    }

    p {
        margin: 0;
    }
</style>
