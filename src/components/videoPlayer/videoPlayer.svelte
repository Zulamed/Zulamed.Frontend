<script lang="ts">
	import defaultCss from 'vidstack/styles/defaults.css?url';
	import communityPlayerCss from 'vidstack/styles/community-skin/video.css?url';
	import { onMount, onDestroy } from 'svelte';
	import Hls from 'hls.js';
	import { defineCustomElements } from 'vidstack/elements';
	import type { HLSProvider, MediaPlayerElement, MediaProviderChangeEvent } from 'vidstack';
	import { playerVolume } from '../../stores/video-sound-store';

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

	let destroy: Function | undefined;

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
	src="https://d2tldik98s0wn6.cloudfront.net/ba41d730-5c82-40d2-81ef-24aed5270420/master.m3u8"
	poster="img/videoPreviews/2.png"
	aspect-ratio="16/9"
	crossorigin
	user-idle-delay="1000"
	on:attached|once={playerAttached}
>
	<media-outlet />
	<media-community-skin />
	<media-poster alt="Preview." />
</media-player>
