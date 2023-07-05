<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Hls from 'hls.js';
	import { defineCustomElements } from 'vidstack/elements';
	import type { HLSProvider, MediaPlayerElement, MediaProviderChangeEvent } from 'vidstack';
	import { playerVolume } from '../../stores/video-sound-store';

	export let src: string;
	export let poster = '/img/videoPreviews/2.png';

	let player: MediaPlayerElement;

	let initPlayer = async () => {
		await defineCustomElements();

		player.addEventListener('provider-change', (event: MediaProviderChangeEvent) => {
			const provider = event.detail;
			if (provider?.type === 'hls' && !Hls.isSupported()) {
				(provider as HLSProvider).library = Hls;
			}
		});
	};

	let loaded = false;

	let destroy: () => void | undefined;

	function playerAttached() {
		destroy = player.subscribe(({ volume }) => {
			if (loaded) {
				$playerVolume = volume;
			}
		});
		loaded = true;
	}

	onMount(async () => {
		await initPlayer();
		player.volume = $playerVolume as number;
	});

	onDestroy(async () => {
		player?.destroy();
		destroy?.();
	});
</script>

<media-player
	bind:this={player}
	id="video"
	{src}
	{poster}
	aspect-ratio="16/9"
	crossorigin
	user-idle-delay="1000"
	playsinline
	webkit-playsinline
	on:attached|once={playerAttached}
>
	<media-outlet />
	<media-community-skin />
	<media-poster alt="Preview." />
</media-player>

<style>
	@import 'vidstack/styles/defaults.css';
	@import 'vidstack/styles/community-skin/video.css';
</style>
