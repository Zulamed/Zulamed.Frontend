<script lang="ts">
	import defaultCss from 'vidstack/styles/defaults.css?url';
	import communityPlayerCss from 'vidstack/styles/community-skin/video.css?url';
	import { onMount, onDestroy } from 'svelte';
	import Hls from 'hls.js';
	import { defineCustomElements } from 'vidstack/elements';
	import type { HLSProvider, MediaPlayerElement, MediaProviderChangeEvent } from 'vidstack';
	import { playerVolume } from '$lib/stores/video-sound-store';

	export let src: string;
	export let poster: string = 'img/videoPreviews/2.png';


	let player: MediaPlayerElement;

	let initPlayer = async () => {
		await defineCustomElements();

		player.addEventListener('provider-change', (event: MediaProviderChangeEvent) => {
			const provider = event.detail;
			if (provider?.type === 'hls') {
				(provider as HLSProvider).library = Hls;
			}
		});
	};

	let loaded = false;

	let destroy: () => void | undefined;

	function playerAttached(e: Event) {
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

<svelte:head>
	<link rel="stylesheet" href={defaultCss} />
	<link rel="stylesheet" href={communityPlayerCss} />
</svelte:head>

<media-player
	bind:this={player}
	id="video"
	{src}
	{poster}
	aspect-ratio="16/9"
	crossorigin
	user-idle-delay="1000"
	on:attached|once={playerAttached}
>
	<media-outlet />
	<media-community-skin />
	<media-poster alt="Preview." />
</media-player>
