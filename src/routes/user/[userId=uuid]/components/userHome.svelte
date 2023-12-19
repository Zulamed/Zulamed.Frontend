<script lang="ts">
	import type { VideoMinimal, User } from '$backend/user/get/types';
	import { getRelativeTime } from '$lib/utils/relativeTime';
	export let videos: VideoMinimal[];
	export let user: User;

	const title = videos[0].description ?? 'No description';
</script>

<div class="last-video">
	<div class="last-video-content">
		<a href="/video/{videos[0].id}" class="small-thumbnail"
			><img src={videos[0].thumbnailUrl ?? '/img/videoPreviews/videoPreviewMobile.png'} alt="" /></a
		>
		<div class="vid-info">
			<a href="/video/{videos[0].id}">{videos[0].title}</a>
			<div style="display: flex; margin-bottom: 28px;">
				<p>{user.login}&nbsp;</p>
				<p class="vid-views">·&nbsp;{videos[0].views} views</p>
			</div>
			<p class="vid-description">
				{title.length > 215 ? title.slice(0, 215) + '...' : title}
			</p>
		</div>
	</div>
</div>
<h1
	class="list-header"
	style="padding-left: 62px; margin-top: 54px; font-size: 23px; font-weight: 500;"
>
	Videos
</h1>
<div class="list-container">
	{#each videos as video}
		<a href="/video/{video.id}" class="vid-list">
			<a class="preview" href="/video/{video.id}"
				><img src={video.thumbnailUrl ?? '/img/videoPreviews/3.png'} class="thumbnail" alt="" /></a
			>
			<div class="flex-div">
				<div class="list-vid-info">
					<a href="/video/{video.id}">{video.title}</a>
					<div style="display: flex; margin-top: 10px;">
						<p class="vid-views">{video.views} views&nbsp;</p>
						<p class="vid-views">·&nbsp;{getRelativeTime(video.createdAt)}</p>
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.last-video {
		padding: 0 62px;
	}
	.last-video-content {
		display: flex;
		justify-content: space-between;
	}

	.last-video-content img {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: contain;
		background-color: #000;
	}

	.last-video-content .small-thumbnail {
		flex-basis: 30.66%;
		border-radius: 17px;
	}

	.last-video-content .small-thumbnail img {
		border-radius: 17px;
	}

	.last-video-content .vid-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-basis: 67.54%;
	}

	.list-vid-info a {
		color: #000;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		text-decoration: none;
	}
	.vid-info a {
		max-width: 735px;
		width: fit-content;
		color: #000;
		font-size: 25px;
		font-style: normal;
		font-weight: 500;
		text-decoration: none;
	}

	.vid-info p {
		font-weight: 500;
		font-size: 15px;
		line-height: 18px;
		color: #54b9a2;
		margin-top: 10px;
	}

	.vid-views {
		font-weight: 500;
		font-size: 15px;
		line-height: 18px;
		color: #a1a1a1 !important;
	}
	.vid-info .vid-description {
		color: #a1a1a1;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
		max-width: 735px;
	}

	/* ===== */
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
	}
	.vid-list .flex-div {
		align-items: flex-start;
		margin-top: 10px;
	}

	.vid-list .flex-div img {
		width: 48px;
		height: 48px;
		margin-right: 14px;
		border-radius: 50%;
		object-fit: cover;
	}

	@media (max-width: 1238px) {
		.list-container {
			grid-template-columns: repeat(3, minmax(184px, 1fr));
		}
		.last-video-content .small-thumbnail {
			flex-basis: 53.7%;
		}
		.last-video-content .vid-info {
			flex-basis: 43.5%;
		}
		.last-video {
			padding: 0 32px;
		}
	}
	@media (max-width: 900px) {
		.last-video {
			display: none;
		}
		.list-header {
			display: none;
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
