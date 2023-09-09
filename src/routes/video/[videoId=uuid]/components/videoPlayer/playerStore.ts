import { writable } from "svelte/store";

// it's changed in svelte file
// eslint-disable-next-line prefer-const
export let playerLoaded = writable(false);
