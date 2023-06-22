import { browser } from '$app/environment';
import { writable } from 'svelte/store';

let stored = 0.4;

if (browser) {
	stored = parseFloat(sessionStorage.getItem('player-volume') ?? '0.4');
}

export const playerVolume = writable(stored);
playerVolume.subscribe((value) => {
	if (browser) {
		return sessionStorage.setItem('player-volume', String(value));
	}
});
