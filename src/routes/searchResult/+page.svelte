<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
	import { searchQuery } from '$lib/stores/search';
	import type { PageData } from './$types';

	let query = $searchQuery;
	afterNavigate(() => {
		query = $searchQuery;
	});
	export let data: PageData;
</script>

<svelte:head>
	<title>{query} - ZulaMED</title>
</svelte:head>

<div class="container" class:large-container={!$sidebarOpened}>
	<div class="list-container">
		{#each data.videoResponse.videos as videoInfo}
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
							<a href="/user/{videoInfo.user.id}" class="vid-channel">{videoInfo.user.username}</a
							><span class="betweenDot">·&nbsp;</span>
							<p id="viewsText" class="vid-views">{videoInfo.video.videoViews} views</p>
						</div>
						<p class="vid-description">
							{videoInfo.video.videoDescription ?? 'No description provided'}
						</p>
					</div>
				</div>
			</a>
		{:else}
			<p>No videos found</p>
		{/each}
	</div>
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
		margin-top: 80px;
	}

	.large-container {
		padding-left: 4%;
	}

	.list-container:first-child {
		margin-top: 65px;
	}
	.list-container {
		display: grid;
		grid-column-gap: 20px;
		padding: 0 183px;
		margin-bottom: 20px;
	}
	.preview {
		max-width: 452px;
		margin-right: 19px;
		user-select: none;
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
		border: 1px solid #e9e9e9;
		background-color: #e9e9e9;
		border-radius: 5px;
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
		object-fit: cover;
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
		padding: 0 183px;
	}
	@media (max-width: 1440px) {
		.list-header,
		.list-container {
			padding: 0 62px;
		}
		.container {
			padding-left: 20%;
		}
	}
	@media (max-width: 1238px) {
		.container {
			padding-left: 27%;
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
			gap: 9px;
		}
		.list-vid-info div {
			margin-top: 0 !important;
			gap: 9px;
		}
		.vid-list .flex-div {
			justify-content: start;
			align-items: start;
			margin-top: 29px;
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
