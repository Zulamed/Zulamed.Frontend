import { writable } from "svelte/store";

export const createDialogStore = () => {
    return writable(false);
}
