<script lang="ts">
	import { onMount } from 'svelte';
	import { scripts } from './play-video';
	import VideoPlayer from './components/videoPlayer/videoPlayer.svelte';
	import type { PageData } from './$types';
	import Chips from './components/chips.svelte';
	import Description from './components/description.svelte';
	import Comments from './components/comments.svelte';

	let matches = false;

	onMount(async () => {
		let media = window.matchMedia('(max-width:1027px)');
		let match = () => {
			matches = media.matches;
		};
		match();
		media.addEventListener('change', match);
		scripts();
		return () => {
			media.removeEventListener('change', match);
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

					<button type="button" id="follow-btn" class="interaction-btn follow-btn">FOLLOW</button>
				</div>
				<div class="play-video-info-right">
					<div class="interaction-btn-group">
						<button id="like-btn" type="button" class="interaction-btn like-btn"
							><img src="/img/icons/thumb_up_white_24dp.svg" alt="" />
							10k</button
						>
						<button id="dislike-btn" type="button" class="interaction-btn dislike-btn"
							><img src="/img/icons/thumb_down_white_24dp.svg" alt="" /></button
						>
					</div>
					<button type="button" class="interaction-btn share-btn"
						><img src="/img/icons/send_white_24dp.svg" alt="" />SHARE</button
					>
				</div>
			</div>
			<Description textContent={data.video.videoDescription} />
			{#if !matches}
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

			<button id="showMoreButton">show more</button>
		</div>
		{#if matches}
			<Comments />
		{/if}
	</div>

	<!-- ============MAIN END============ -->
</div>
