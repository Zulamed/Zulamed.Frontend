<script lang="ts">
	import Dropdown from '$lib/components/dropdown.svelte';
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
	import { melt } from '@melt-ui/svelte';
	import type { PageData } from './$types';
	import { getRelativeTime } from '$lib/utils/relativeTime';
	import { applyAction, enhance } from '$app/forms';
	import { addNotification } from '$lib/components/notification.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Your Videos - ZulaMED</title>
</svelte:head>
<div class="container" class:large-container={!$sidebarOpened}>
	<h1
		class="list-header"
		style="padding-left: 62px; margin-top: 54px; font-size: 23px; font-weight: 500;"
	>
		Your videos
	</h1>
	<div class="list-container">
		{#each data.videoInfos.videos as videoInfo}
			<a href="/video/{videoInfo.video.id}" class="vid-list">
				<a class="preview" href="/video/{videoInfo.video.id}"
					><img
						src={videoInfo.video.videoThumbnail ?? '/img/videoPreviews/3.png'}
						class="thumbnail"
						alt=""
					/></a
				>
				<div class="flex-div">
					<div class="list-vid-info">
						<a href="/video/{videoInfo.video.id}">{videoInfo.video.videoTitle}</a>
						<div style="display: flex; margin-top: 10px;">
							<p class="vid-views">{videoInfo.video.videoViews} views&nbsp;</p>
							<p class="vid-views">·&nbsp;{getRelativeTime(videoInfo.video.videoPublishedDate)}</p>
						</div>
					</div>
					<Dropdown>
						<button use:melt={trigger} slot="button" let:trigger class="dots-vertical">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="30"
								viewBox="0 -960 960 960"
								width="30"
								><path
									d="M479.858-160Q460-160 446-174.142q-14-14.141-14-34Q432-228 446.142-242q14.141-14 34-14Q500-256 514-241.858q14 14.141 14 34Q528-188 513.858-174q-14.141 14-34 14Zm0-272Q460-432 446-446.142q-14-14.141-14-34Q432-500 446.142-514q14.141-14 34-14Q500-528 514-513.858q14 14.141 14 34Q528-460 513.858-446q-14.141 14-34 14Zm0-272Q460-704 446-718.142q-14-14.141-14-34Q432-772 446.142-786q14.141-14 34-14Q500-800 514-785.858q14 14.141 14 34Q528-732 513.858-718q-14.141 14-34 14Z"
								/></svg
							>
						</button>
						<div class="dropdown-container" slot="item" let:item>
							<form
								method="post"
                                action="?/delete"
								use:enhance={() => {
									return async ({ result }) => {
										if (result.type === 'success') {
											data.videoInfos.videos = data.videoInfos.videos.filter(
												(video) => video.video.id !== videoInfo.video.id
											);
											addNotification({
												data: {
													title: 'Video deleted successfully.'
												}
											});
										} else {
											applyAction(result);
										}
									};
								}}
							>
								<input type="hidden" name="videoId" value={videoInfo.video.id} />
								<button class="dropdown-button"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 0 24 24"
										width="24px"
										fill="#ffffff"
										><path d="M0 0h24v24H0V0z" fill="none" /><path
											d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
										/></svg
									>Delete</button
								>
							</form>
						</div>
					</Dropdown>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.dropdown-container .dropdown-button {
		all: unset;
		cursor: pointer;
		min-height: 36px;
		padding: 0 12px 0 16px;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: left;
		background-color: transparent;
	}
	.dropdown-container form .dropdown-button {
		all: unset;
		cursor: pointer;
		min-height: 36px;
		padding: 0 12px 0 16px;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: left;
		background-color: transparent;
		width: 150px;
	}

	.dropdown-container .dropdown-button:hover {
		background-color: #449e89;
	}
	.dropdown-button svg {
		margin-right: 13px;
	}
	.dropdown-container {
		background-color: #54b9a2;
		width: 150px;
		display: flex;
		flex-direction: column;
		border-radius: 11px;
		padding: 7px 0;
	}
	.dots-vertical {
		position: absolute;
		right: 0;
		background-color: transparent;
		border: none;
		outline: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		cursor: pointer;
		opacity: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid transparent;
		transition: border 0.1s ease;
	}
	.dots-vertical:active {
		border: 1px solid #d3d3d3;
		background-color: #d3d3d3;
	}
	.dots-vertical svg {
		margin-right: 0;
		fill: #000000;
	}
	.dots-vertical:hover svg {
		fill: #54b9a2;
	}
	.vid-list:hover .dots-vertical {
		opacity: 1;
	}

	.vid-views {
		font-weight: 500;
		font-size: 15px;
		line-height: 18px;
		color: #a1a1a1 !important;
	}

	.list-vid-info a {
		color: #000;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		text-decoration: none;
	}
	.container {
		padding-left: 16.77%;
	}

	.large-container {
		padding-left: 4%;
	}
	.list-container {
		display: grid;
		grid-template-columns: repeat(4, minmax(184px, 1fr));
		grid-column-gap: 20px;
		padding: 0 62px;
	}
	.vid-list {
		margin-top: 32px;
		text-decoration: none;
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
		position: relative;
	}
	.vid-list .flex-div {
		align-items: flex-start;
		margin-top: 10px;
	}

	.vid-list .flex-div img {
		width: 48px;
		margin-right: 14px;
		border-radius: 50%;
	}
	@media (max-width: 1440px) {
		.container {
			padding-left: 20%;
		}
		.large-container {
			padding-left: 6%;
		}
	}
	@media (max-width: 1238px) {
		.container {
			padding-left: 27%;
			padding-right: 351px;
		}
		.large-container {
			padding-left: 8%;
		}
		.list-container {
			grid-template-columns: repeat(3, minmax(184px, 1fr));
		}
	}
	@media (max-width: 900px) {
		.container,
		.large-container {
			padding-left: 0;
			padding-right: 0;
			margin-top: 47px;
		}
		.list-container {
			padding: 0 22px 20px 22px;
			grid-template-columns: repeat(2, minmax(184px, 1fr));
		}
		.dots-vertical {
			opacity: 1;
		}
	}
	@media (max-width: 460px) {
		.list-container {
			grid-template-columns: repeat(1, minmax(184px, 1fr));
		}
	}
</style>
