import { writable } from "svelte/store";

export let pad = writable(window.location.pathname);

window.onpopstate = () => {
    pad.set(window.location.pathname);
}