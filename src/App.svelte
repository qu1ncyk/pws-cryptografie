<script lang="ts">
	import Hoofdmenu from "./paginas/Hoofdmenu.svelte";
	import { pad } from "./stores";

	import Caesar from "./paginas/Caesar.svelte";
	import Vigenere from "./paginas/Vigenere.svelte";
	import DiffieHellman from "./paginas/DiffieHellman.svelte";
	import RSA from "./paginas/RSA.svelte";

	const paginas = {
		"/caesar": Caesar,
		"/vigenere": Vigenere,
		"/diffie-hellman": DiffieHellman,
		"/rsa": RSA,
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
