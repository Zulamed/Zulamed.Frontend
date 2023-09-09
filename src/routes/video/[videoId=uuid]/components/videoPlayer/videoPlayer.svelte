<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Hls from 'hls.js';
	import { defineCustomElements } from 'vidstack/elements';
	import type { HLSProvider, MediaPlayerElement, MediaProviderChangeEvent } from 'vidstack';
	import 'vidstack/styles/defaults.css';
	import 'vidstack/styles/community-skin/video.css';
	import { playerVolume } from '../../stores/video-sound-store';
    import { playerLoaded } from './playerStore';

	export let poster = '/img/videoPreviews/2.png';

    export let src: string;
	if (!poster) {
		poster = '/img/videoPreviews/2.png';
	}

	let player: MediaPlayerElement;


	let initPlayer = async () => {
		await defineCustomElements();

		player.addEventListener('provider-change', (event: MediaProviderChangeEvent) => {
			const provider = event.detail;
			if (provider?.type === 'hls' && !Hls.isSupported()) {
				(provider as HLSProvider).library = Hls;
			}
		});
        $playerLoaded = true;
	};


	let destroy: () => void | undefined;

	function playerAttached() {
		destroy = player.subscribe(({ volume }) => {
			if ($playerLoaded) {
				$playerVolume = volume;
			}
		});
		$playerLoaded = true;
	}

	onMount(async () => {
		await initPlayer();
		player.volume = $playerVolume as number;
	});

	onDestroy(async () => {
		player?.destroy();
		destroy?.();
        $playerLoaded = false;
	});
</script>

<!-- <svelte:head> -->
<!-- 	<link rel="stylesheet" href={defaultCss} /> -->
<!-- 	<link rel="stylesheet" href={skinCss} /> -->
<!-- </svelte:head> -->

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
	on:attached={playerAttached}
>
	<media-outlet />
	<media-community-skin />
	<media-poster alt="Preview." />
</media-player>
