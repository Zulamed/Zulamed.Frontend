<script lang="ts">
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
	import Tooltip from '$lib/components/tooltip.svelte';
	import { melt } from '@melt-ui/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Subscriptions - ZulaMED</title>
</svelte:head>

<div class="container" class:large-container={!$sidebarOpened}>
	<h1 class="list-title">Today</h1>
	<div class="list-container">
		{#each data.videoData.videos as videoInfo}
			{@const title = videoInfo.video.videoTitle}
			<div class="vid-list">
				<a href="/video/{videoInfo.video.id}">
					<a class="preview" href="/video/{videoInfo.video.id}"
						><img
							src={videoInfo.video.videoThumbnail ?? '/img/videoPreviews/7.png'}
							class="thumbnail"
							alt=""
						/></a
					>
					<div class="flex-div">
						<img src={videoInfo.user.profilePictureUrl ?? '/img/icons/user.png'} alt="" />
						<div class="vid-info">
							<Tooltip placement="bottom">
								<a use:melt={trigger} let:trigger slot="button" href="/video/{videoInfo.video.id}"
									>{title.length >= 40 ? title.slice(0, 37) + '...' : title}</a
								>
								<p slot="content">{title}</p>
							</Tooltip>
							<a class="channel-name" href="/user/{videoInfo.user.id}">{videoInfo.user.username}</a>
							<p class="vid-views">{videoInfo.video.videoViews} views</p>
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>

<style src="./subscriptions.css"></style>
