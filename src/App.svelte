<script lang="ts">
	import Hoofdmenu from "./Hoofdmenu.svelte";
	import { pad } from "./stores";

	import Caesar from "./Caesar.svelte";

	const paginas = {
		"/caesar": Caesar,
	};
</script>

<main>
	<svelte:component this={paginas[$pad] || Hoofdmenu} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
