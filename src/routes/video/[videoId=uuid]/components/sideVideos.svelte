<script lang="ts">
	import type { Video } from '$lib/models/video';
	import { melt } from '@melt-ui/svelte';
	import type { User } from '$backend/video/getAll/types';
	import Tooltip from '$lib/components/tooltip.svelte';

	export let showMore = false;

	export let videos: {
		video: Video;
		user: User;
	}[];

	$: sideVideos = showMore ? videos : videos.slice(0, 1);
</script>

{#each sideVideos as amogus}
	{@const title = amogus.video.videoTitle}
	<div class="side-video-list">
		<a href="/video/{amogus.video.id}" class="small-thumbnail"
			><img
				src={amogus.video.videoThumbnail ?? '/img/videoPreviews/videoPreviewMobile.png'}
				alt=""
			/></a
		>
		<div class="vid-info">
			<Tooltip placement="bottom">
				<a use:melt={trigger} let:trigger slot="button" href="/video/{amogus.video.id}"
					>{title.length > 34 ? title.slice(0, 34) + '...' : title}</a
				>
				<p slot="content">{title}</p>
			</Tooltip>

			<a
				style="font-weight: 500;
						font-size: 15px;
						line-height: 18px;
						color: #54b9a2;
						margin-top: 7px; display: block;"
				href="/user/{amogus.user.id}">{amogus.user.username}</a
			>
			<p class="vid-views">{amogus.video.videoViews} views</p>
		</div>
	</div>
{/each}

<style>
	a {
		text-decoration: none;
		color: #5a5a5a;
	}

	img {
		cursor: pointer;
	}
	.side-video-list {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
		padding: 0 2px;
		border-radius: 5px;
		background-color: transparent;
	}
	.side-video-list:active {
		background-color: #f1f1f1;
	}
	.side-video-list img {
		width: 100%;
		aspect-ratio: 16 / 9;
		background-color: #000;
		object-fit: contain;
	}

	.side-video-list .small-thumbnail {
		flex-basis: 47%;
		border-radius: 17px;
	}

	.side-video-list .small-thumbnail img {
		border-radius: 17px;
	}

	.side-video-list .vid-info {
		flex-basis: 50%;
	}

	.vid-info a {
		font-weight: 600;
		font-size: 20px;
		line-height: 24px;
		color: #000000;
	}

	.side-video-list:hover .vid-info a {
		color: var(--primary-color);
	}

	.vid-views {
		font-weight: 500;
		font-size: 15px;
		line-height: 18px;
		color: #a1a1a1 !important;
	}

	@media (max-width: 1200px) {
		.side-video-list .small-thumbnail {
			flex-basis: 37%;
			border-radius: 17px;
			display: flex;
			align-items: center;
		}

		.vid-info p {
			line-height: 18px;
			margin-top: 2px;
		}

		.side-video-list .vid-info {
			flex-basis: 59%;
		}

		.side-video-list {
			display: flex;
			justify-content: space-between;
			margin-bottom: 6px;
		}

		.vid-info a {
			font-weight: 600;
			font-size: 17px;
			line-height: 20px;
			color: #000000;
		}
	}

	@media (max-width: 600px) {
		.side-video-list .small-thumbnail {
			margin-bottom: 29px;
		}

		.side-video-list .small-thumbnail {
			margin-bottom: 29px;
		}

		.side-video-list .small-thumbnail img {
			border-radius: 0px;
		}

		.side-video-list {
			display: flex;
			flex-direction: column;
		}
	}
</style>
