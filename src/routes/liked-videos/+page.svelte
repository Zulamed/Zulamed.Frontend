<script lang="ts">
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Liked Videos - ZulaMED</title>
</svelte:head>

<div class="container" class:large-container={!$sidebarOpened}>
	<h1 class="list-header">Today</h1>
	<div class="list-container">
		{#each data.videoData.videos as videoInfo}
			{@const descriptionText = videoInfo.video.videoDescription}

			<a href="/video/{videoInfo.video.id}" class="vid-list">
				<a class="preview" href="/video/{videoInfo.video.id}"
					><img
						src={videoInfo.video.videoThumbnail ?? '/img/videoPreviews/7.png'}
						class="thumbnail"
						alt=""
					/></a
				>
				<div class="flex-div">
					<img
						class="channel-logo"
						src={videoInfo.user.profilePictureUrl ?? '/img/icons/channel-logo.jpg'}
						alt=""
					/>
					<div class="list-vid-info">
						<a class="video-title" href="/video/{videoInfo.video.id}"
							>{videoInfo.video.videoTitle}</a
						>
						<div style="display: flex; margin-top: 12px;">
							<a href="/user/{videoInfo.user.id}" class="vid-channel"
								>{videoInfo.user.username}&nbsp;</a
							><span class="betweenDot">·&nbsp;</span>
							<p id="viewsText" class="vid-views">{videoInfo.video.videoViews} views</p>
						</div>
						<p class="vid-description">
							{descriptionText.length >= 200
								? descriptionText.slice(0, 197) + '...'
								: descriptionText}
						</p>
					</div>
				</div>
			</a>
		{:else}
			<p>No videos found.</p>
		{/each}
	</div>
	<!-- <h1 class="list-header">Yesterday</h1> -->
	<!-- <div class="list-container"> -->
	<!-- 	<a href="." class="vid-list"> -->
	<!-- 		<a class="preview" href="."><img src="/img/videoPreviews/7.png" class="thumbnail" alt="" /></a -->
	<!-- 		> -->
	<!-- 		<div class="flex-div"> -->
	<!-- 			<img class="channel-logo" src="/img/icons/channel-logo.jpg" alt="" /> -->
	<!-- 			<div class="list-vid-info"> -->
	<!-- 				<a class="video-title" href=".">What happens during surgery?</a> -->
	<!-- 				<div style="display: flex; margin-top: 12px;"> -->
	<!-- 					<a href="." class="vid-channel">Lorem Ipsum&nbsp;</a><span class="betweenDot" -->
	<!-- 						>·&nbsp;</span -->
	<!-- 					> -->
	<!-- 					<p id="viewsText" class="vid-views">43K views</p> -->
	<!-- 				</div> -->
	<!-- 				<p class="vid-description"> -->
	<!-- 					Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque -->
	<!-- 					laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi -->
	<!-- 					architecto beatae vitae dicta sunt explicabo. -->
	<!-- 				</p> -->
	<!-- 			</div> -->
	<!-- 		</div> -->
	<!-- 	</a> -->
	<!-- 	<a href="." class="vid-list"> -->
	<!-- 		<a class="preview" href="."><img src="/img/videoPreviews/7.png" class="thumbnail" alt="" /></a -->
	<!-- 		> -->
	<!-- 		<div class="flex-div"> -->
	<!-- 			<img class="channel-logo" src="/img/icons/channel-logo.jpg" alt="" /> -->
	<!-- 			<div class="list-vid-info"> -->
	<!-- 				<a class="video-title" href=".">What happens during surgery?</a> -->
	<!-- 				<div style="display: flex; margin-top: 12px;"> -->
	<!-- 					<a href="." class="vid-channel">Lorem Ipsum&nbsp;</a><span class="betweenDot" -->
	<!-- 						>·&nbsp;</span -->
	<!-- 					> -->
	<!-- 					<p id="viewsText" class="vid-views">43K views</p> -->
	<!-- 				</div> -->
	<!-- 				<p class="vid-description"> -->
	<!-- 					Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque -->
	<!-- 					laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi -->
	<!-- 					architecto beatae vitae dicta sunt explicabo. -->
	<!-- 				</p> -->
	<!-- 			</div> -->
	<!-- 		</div> -->
	<!-- 	</a> -->
	<!-- </div> -->
</div>

<style>
	.channel-logo {
		display: none;
	}
	.flex-div {
		display: flex;
		align-items: center;
	}

	.container {
		padding-left: 16.77%;
	}

	.large-container {
		padding-left: 4%;
	}

	.list-container {
		display: grid;
		grid-column-gap: 20px;
		padding: 0 50px;
	}
	.preview {
		max-width: 452px;
		margin-right: 19px;
	}
	.vid-list {
		display: flex;
		text-decoration: none;
		margin-bottom: 25px;
		border-radius: 5px;
		border: 1px solid transparent;
		transition: border 0.2s ease-in-out;
	}
	.vid-list:hover {
		background-color: #f4f4f4;
		cursor: pointer;
	}
	.vid-list:focus {
		background-color: #dadada;
		border: 1px solid #dadada;
	}
	.vid-list:hover .list-vid-info .video-title {
		color: #54b9a2;
	}
	.vid-list .thumbnail {
		width: 100%;
		border-radius: 16px;
		aspect-ratio: 16 / 9;
		background-color: #000;
		object-fit: contain;
	}
	.flex-div {
		display: flex;
	}
	.vid-list .flex-div {
		align-items: center;
		gap: 12px;
		justify-content: center;
	}

	.list-vid-info .video-title {
		color: #000;
		font-size: 25px;
		font-style: normal;
		font-weight: 500;
		text-decoration: none;
	}
	.vid-channel {
		color: #54b9a2;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
		text-decoration: none;
	}
	.vid-views {
		color: #a1a1a1;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
	}
	.vid-description {
		color: #a1a1a1;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
		max-width: 735px;
		margin-top: 14px;
	}
	.list-header {
		margin-top: 54px;
		margin-bottom: 44px;
		font-size: 17px;
		font-style: normal;
		font-weight: 600;
		text-decoration: underline;
		padding: 0 50px;
	}
	@media (max-width: 1440px) {
		.list-header,
		.list-container {
			padding: 0 50px;
		}
		.container {
			padding-left: 20%;
		}
		.large-container {
			padding-left: 4%;
		}
		.preview {
			max-width: 300px;
		}
	}
	@media (max-width: 1238px) {
		.container {
			padding-left: 27%;
		}
		.large-container {
			padding-left: 4%;
		}
		.preview {
			max-width: 270px;
		}
	}
	@media (max-width: 900px) {
		.betweenDot {
			display: none;
		}
		.vid-list .thumbnail {
			border-radius: 0;
		}
		.list-vid-info {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}
		.list-vid-info div {
			margin-top: 0 !important;
			gap: 4px;
		}
		.vid-list .flex-div {
			justify-content: start;
			align-items: start;
			margin-top: 12px;
		}
		.channel-logo {
			display: flex;
			width: 41px !important;
			height: 41px;
			border-radius: 50%;
			object-fit: cover;
		}
		.list-vid-info .video-title {
			color: #000;
			font-size: 18px;
			font-style: normal;
			font-weight: 400;
		}
		.preview {
			margin-right: 0px;
			max-width: 452px;
		}
		.list-header {
			text-decoration: none;
			color: #000;
			font-size: 16px;
			font-style: normal;
			font-weight: 600;
			margin-top: 0px;
			margin-bottom: 20px;
		}
		.list-vid-info div {
			display: flex;
			flex-direction: column;
		}
		.vid-description {
			display: none;
		}
		.vid-list {
			flex-direction: column;
		}
		.container,
		.large-container {
			padding-left: 0;
		}
		.list-header {
			padding: 0 22px;
		}
		.list-container {
			padding: 0 22px 20px 22px;
			grid-template-columns: repeat(2, minmax(184px, 1fr));
		}
	}
	@media (max-width: 460px) {
		.list-container {
			grid-template-columns: repeat(1, minmax(184px, 1fr));
		}
	}
</style>
