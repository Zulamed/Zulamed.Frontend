<script lang="ts">
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
	import Tooltip from '$lib/components/tooltip.svelte';
	import { user } from '$lib/stores/auth';
	import { searchQuery } from '$lib/stores/search';
	import { melt } from '@melt-ui/svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>ZulaMED</title>
</svelte:head>
<!-- ------------main--------------- -->

<div class="container" class:large-container={!$sidebarOpened}>
	<div class="banner">
		<!-- <div class="searchbar flex-div"> -->
		<form class="searchbar flex-div" action="/searchResult" method="get">
			<div class="searchbox">
				<input bind:value={$searchQuery} type="text" name="q" placeholder="Search..." />
			</div>
			<button class="search-button" type="submit">
				<img src="/img/icons/search_white_24dp.svg" alt="" />
			</button>
		</form>
		<!-- </div> -->
	</div>
	<div class="list-container">
		{#each data.videoResponse as response}
			{@const title = response.video.videoTitle}
			<a href="/video/{response.video.id}" class="vid-list">
				<a class="preview" href="/video/{response.video.id}"
					><img src={response.video.videoThumbnail} class="thumbnail" alt="" /></a
				>
				<div class="flex-div">
					<img class="" src={response.user.profilePictureUrl ?? '/img/icons/user.png'} alt="" />
					<div class="vid-info">
						<Tooltip placement="bottom">
							<a use:melt={trigger} let:trigger slot="button" href="/video/{response.video.id}"
								>{title.length > 70 ? title.slice(0, 70) + '...' : title}</a
							>
							<p slot="content">{title}</p>
						</Tooltip>

						<a class="channel-name" href="/user/{response.user.id}">{response.user.username}</a>
						<p class="vid-views">{response.video.videoViews} views</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
	<!-- <div class="livelist-container m-b-84px"> -->
	<!-- 	<div class="live-list"> -->
	<!-- 		<a class="preview" href="."> -->
	<!-- 			<img src="/img/videoPreviews/live-.png" class="thumbnail" alt="" /> -->
	<!-- 			<img class="live-icon" src="/img/icons/live.png" alt="" /> -->
	<!-- 		</a> -->
	<!-- 		<div class="flex-div"> -->
	<!-- 			<img src="/img/icons/user.png" alt="" /> -->
	<!-- 			<div class="vid-info"> -->
	<!-- 				<a href=".">LOREM IPSUM - Lorem ipsum</a> -->
	<!-- 				<a class="channel-name" href=".">Lorem ipsum</a> -->
	<!-- 				<p class="vid-views">1k watching</p> -->
	<!-- 			</div> -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- </div> -->
	<!-- ------------main--------------- -->
</div>

<style src="./style.css"></style>
