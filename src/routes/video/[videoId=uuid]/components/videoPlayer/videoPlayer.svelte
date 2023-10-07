<script lang="ts">
    import {onMount} from 'svelte';
    import Hls from 'hls.js';
    import 'vidstack/player/styles/default/theme.css';
    import 'vidstack/player/styles/default/layouts/video.css';
    import 'vidstack/player';
    import 'vidstack/player/layouts';
    import 'vidstack/player/ui';


    import {isHLSProvider, type MediaCanPlayEvent, type MediaProviderChangeEvent} from 'vidstack';
    import {playerVolume} from '../../stores/video-sound-store';
    import {playerLoaded} from './playerStore';

    import type {MediaPlayerElement} from "vidstack/elements";

    export let poster = '/img/videoPreviews/2.png';

    export let src: string;
    if (!poster) {
        poster = '/img/videoPreviews/2.png';
    }

    let player: MediaPlayerElement;

	function onProviderChange(event: MediaProviderChangeEvent) {
		const provider = event.detail;
		if (isHLSProvider(provider)){
			provider.library = Hls;
		}
	}

    function onCanPlay(event: MediaCanPlayEvent) {
        $playerLoaded = true;
    }


    // let destroy: () => void | undefined;

    // function playerAttached() {
    // 	destroy = player.subscribe(({ volume }) => {
    // 		if ($playerLoaded) {
    // 			$playerVolume = volume;
    // 		}
    // 	});
    // 	$playerLoaded = true;
    // }

    onMount(async () => {
        player.volume = $playerVolume as number;
        player.playsinline = true;

        let destroy = player.subscribe(({volume}) => {
            if ($playerLoaded) {
                $playerVolume = volume;
            }
        });


        return () => {
            $playerLoaded = false;
            destroy();
        };
    });
</script>

<!-- <svelte:head> -->
<!-- 	<link rel="stylesheet" href={defaultCss} /> -->
<!-- 	<link rel="stylesheet" href={skinCss} /> -->
<!-- </svelte:head> -->

<media-player
        bind:this={player}
        class="player"
        id="video"
        {src}
        crossorigin
        playsinline
        on:provider-change={onProviderChange}
        on:can-play={onCanPlay}
>
    <media-provider>
        <media-poster class="vds-poster"
		src={poster}/>
    </media-provider>
	<media-video-layout/>
</media-player>


<style>
</style>
