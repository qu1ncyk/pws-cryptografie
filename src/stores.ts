import { writable } from "svelte/store";

export let pad = writable(window.location.pathname);
export let rsaSleutelPaar = writable({d: 0, e: 0, N: 0});

window.onpopstate = () => {
    pad.set(window.location.pathname);
}