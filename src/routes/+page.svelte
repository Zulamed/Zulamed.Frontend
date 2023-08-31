<script lang="ts">
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
	import { user } from '$lib/stores/auth';
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
		<form class="searchbar flex-div" action="">
			<div class="searchbox">
				<input type="text" placeholder="Search..." />
			</div>
			<button class="search-button" type="submit">
				<img src="/img/icons/search_white_24dp.svg" alt="" />
			</button>
		</form>
		<!-- </div> -->
	</div>
	<div class="list-container">
		{#each data.videoResponse as response}
			<div class="vid-list">
				<a class="preview" href="/video/{response.video.id}"
					><img src={response.video.videoThumbnail} class="thumbnail" alt="" /></a
				>
				<div class="flex-div">
					<img src={response.user.profilePictureUrl ?? '/img/icons/user.png'} alt="" />
					<div class="vid-info">
						<a href="/video/{response.video.id}">{response.video.videoTitle}</a>
						<a class="channel-name" href="/user/{response.user.id}">{response.user.username}</a>
						<p class="vid-views">{response.video.videoViews} views</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<!-- <div class="livelist-container m-b-84px"> -->
	<!-- 	<div class="live-list"> -->
	<!-- 		<a class="preview" href="."> -->
	<!-- 			<img src="/img/videoPreviews/live-skeleton.png" class="thumbnail" alt="" /> -->
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
