<script lang="ts">
	import { onMount } from 'svelte';
	import VideoPlayer from './components/videoPlayer/videoPlayer.svelte';
	import type { PageData } from './$types';
	import Chips from './components/chips.svelte';
	import Description from './components/description.svelte';
	import Comments from './components/comments.svelte';

	let showMoreVideosButton = false;
	let videoVisibility = true;
	let likeActive = false;
	let dislikeActive = false;
	let followActive = false;

	let matches1027px = false;
	let matches600px = false;

	$: {
		if (matches600px) {
			videoVisibility = false;
			showMoreVideosButton = true;
		} else {
			videoVisibility = true;
			showMoreVideosButton = false;
		}
	}

	onMount(async () => {
		let media1027px = window.matchMedia('(max-width:1027px)');
		let media600px = window.matchMedia('(max-width:600px)');
		const match1027px = () => {
			matches1027px = media1027px.matches;
		};
		const match600px = () => {
			matches600px = media600px.matches;
		};
		match600px();
		// i originally used <svelte:window> to bind the event listener but sometimes it didn't work need to investigate
		window.addEventListener('resize', match600px);
		match1027px();
		media1027px.addEventListener('change', match1027px);
        media600px.addEventListener('change', match600px);
		return () => {
			media1027px.removeEventListener('change', match1027px);
            media600px.removeEventListener('change', match600px);
		};
	});
	export let data: PageData;
</script>

<!-- ============MAIN============ -->
<div class="container">
	<div id="row" class="row">
		<div id="play-video" class="play-video">
			<div class="video-container">
				<VideoPlayer src="{data.video.videoUrl}/master.m3u8" poster={data.video.videoThumbnail} />
			</div>

			<h3>{data.video.videoTitle}</h3>

			<div class="play-video-info">
				<div class="play-video-info-left">
					<div class="flex-div channel-info">
						<img src="/img/icons/channel-logo.jpg" alt="" />
						<div>
							<h5>Dr.Norman</h5>
							<p>680 K. followers</p>
						</div>
					</div>

					<button
						type="button"
						id="follow-btn"
						class:active={followActive}
						on:click={() => {
							followActive = !followActive;
						}}
						class="interaction-btn follow-btn">{followActive ? 'FOLLOWED' : 'FOLLOW'}</button
					>
				</div>
				<div class="play-video-info-right">
					<div class="interaction-btn-group">
						<button
							id="like-btn"
							type="button"
							class="interaction-btn like-btn"
							class:active={likeActive}
							on:click={() => {
								likeActive = !likeActive;
								dislikeActive = false;
							}}
							><img src="/img/icons/thumb_up_white_24dp.svg" alt="" />
							10k</button
						>
						<button
							id="dislike-btn"
							type="button"
							class="interaction-btn dislike-btn"
							class:active={dislikeActive}
							on:click={() => {
								dislikeActive = !dislikeActive;
								likeActive = false;
							}}><img src="/img/icons/thumb_down_white_24dp.svg" alt="" /></button
						>
					</div>
					<button type="button" class="interaction-btn share-btn"
						><img src="/img/icons/send_white_24dp.svg" alt="" />SHARE</button
					>
				</div>
			</div>
			<Description textContent={data.video.videoDescription} />
			{#if !matches1027px}
				<Comments />
			{/if}
		</div>

		<div id="right-videolist" class="right-videolist">
			<Chips />

			<div class="side-video-list">
				<a href="." class="small-thumbnail"
					><img src="/img/videoPreviews/videoPreviewMobile.png" alt="" /></a
				>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>
			{#if videoVisibility}
				<div class="side-video-list">
					<a href="." class="small-thumbnail"><img src="/img/videoPreviews/2.png" alt="" /></a>
					<div class="vid-info">
						<a href=".">What happens during surgery?</a>
						<p>Lorem Ipsum</p>
						<p class="vid-views">670k views</p>
					</div>
				</div>
				<div class="side-video-list">
					<a href="." class="small-thumbnail"><img src="/img/videoPreviews/3.png" alt="" /></a>
					<div class="vid-info">
						<a href=".">What happens during surgery?</a>
						<p>Lorem Ipsum</p>
						<p class="vid-views">670k views</p>
					</div>
				</div>
				<div class="side-video-list">
					<a href="." class="small-thumbnail"><img src="/img/videoPreviews/4.png" alt="" /></a>
					<div class="vid-info">
						<a href=".">What happens during surgery?</a>
						<p>Lorem Ipsum</p>
						<p class="vid-views">670k views</p>
					</div>
				</div>
				<div class="side-video-list">
					<a href="." class="small-thumbnail"><img src="/img/videoPreviews/5.png" alt="" /></a>
					<div class="vid-info">
						<a href=".">What happens during surgery?</a>
						<p>Lorem Ipsum</p>
						<p class="vid-views">670k views</p>
					</div>
				</div>

				<div class="side-video-list">
					<a href="." class="small-thumbnail"><img src="/img/videoPreviews/6.png" alt="" /></a>
					<div class="vid-info">
						<a href=".">What happens during surgery?</a>
						<p>Lorem Ipsum</p>
						<p class="vid-views">670k views</p>
					</div>
				</div>

				<div class="side-video-list">
					<a href="." class="small-thumbnail"><img src="/img/videoPreviews/1.png" alt="" /></a>
					<div class="vid-info">
						<a href=".">What happens during surgery?</a>
						<p>Lorem Ipsum</p>
						<p class="vid-views">670k views</p>
					</div>
				</div>

				<div class="side-video-list">
					<a href="." class="small-thumbnail"><img src="/img/videoPreviews/2.png" alt="" /></a>
					<div class="vid-info">
						<a href=".">What happens during surgery?</a>
						<p>Lorem Ipsum</p>
						<p class="vid-views">670k views</p>
					</div>
				</div>

				<div class="side-video-list">
					<a href="." class="small-thumbnail"><img src="/img/videoPreviews/3.png" alt="" /></a>
					<div class="vid-info">
						<a href=".">What happens during surgery?</a>
						<p>Lorem Ipsum</p>
						<p class="vid-views">670k views</p>
					</div>
				</div>

				<div class="side-video-list">
					<a href="." class="small-thumbnail"><img src="/img/videoPreviews/4.png" alt="" /></a>
					<div class="vid-info">
						<a href=".">What happens during surgery?</a>
						<p>Lorem Ipsum</p>
						<p class="vid-views">670k views</p>
					</div>
				</div>

				<div class="side-video-list">
					<a href="." class="small-thumbnail"><img src="/img/videoPreviews/5.png" alt="" /></a>
					<div class="vid-info">
						<a href=".">What happens during surgery?</a>
						<p>Lorem Ipsum</p>
						<p class="vid-views">670k views</p>
					</div>
				</div>
			{/if}
			{#if showMoreVideosButton}
				<button
					id="showMoreButton"
					on:click={() => {
						videoVisibility = true;
						showMoreVideosButton = false;
					}}>show more</button
				>
			{/if}
		</div>
		{#if matches1027px}
			<Comments />
		{/if}
	</div>

	<!-- ============MAIN END============ -->
</div>

<style src="./play-video.css"></style>
