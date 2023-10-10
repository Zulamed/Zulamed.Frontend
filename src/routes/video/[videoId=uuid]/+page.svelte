<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Chips from './components/chips.svelte';
	import Description from './components/description.svelte';
	import Comments from './components/comments.svelte';
	import { applyAction, enhance } from '$app/forms';
	import { viewVideo } from '$backend/video/view/endpoint';
	import { melt } from '@melt-ui/svelte';
	import Tooltip from '$lib/components/tooltip.svelte';
	import { addNotification } from '$lib/components/notification.svelte';
	import SideVideos from './components/sideVideos.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	import { playerLoaded } from './components/videoPlayer/playerStore';
	import { afterNavigate } from '$app/navigation';

	let showMoreVideosButton = false;
	let videoVisibility = true;
	let likeActive = false;
	let dislikeActive = false;
	let followActive = false;

	let matches1027px = false;
	let matches600px = false;
	let messageActive = false;
	$: {
		if (matches600px) {
			videoVisibility = false;
			showMoreVideosButton = true;
		} else {
			videoVisibility = true;
			showMoreVideosButton = false;
		}
	}

	afterNavigate(({to, from}) => {
        if (to?.url.pathname !== from?.url.pathname) {
            $playerLoaded = false;
        }
		likeActive = data.userLiked ?? false;
		dislikeActive = data.userDisliked ?? false;
		followActive = data.userFollowed ?? false;
	});

	onMount(async () => {
		await viewVideo(data.videoInfo.video.id);
		let media1027px = window.matchMedia('(max-width:1027px)');
		let media600px = window.matchMedia('(max-width:600px)');
		const match1027px = () => {
			matches1027px = media1027px.matches;
		};
		const match600px = () => {
			matches600px = media600px.matches;
		};
		match600px();
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

<svelte:head>
	<title>{data.videoInfo.video.videoTitle}</title>
</svelte:head>
<!-- ============MAIN============ -->
<div class="container">
	<div id="row" class="row">
		<div id="play-video" class="play-video">
			<div class="video-container" class:skeleton={!$playerLoaded}>
				{#await import('./components/videoPlayer/videoPlayer.svelte') then { default: Player }}
					<svelte:component
						this={Player}
						src={data.videoInfo.video.videoUrl}
						poster={data.videoInfo.video.videoThumbnail}
                        timelineThumbnails={data.videoInfo.video.videoTimelineThumbnail}
					/>
				{/await}
			</div>
			<h3>{data.videoInfo.video.videoTitle}</h3>

			<div class="play-video-info">
				<div class="play-video-info-left">
					<div class="flex-div channel-info">
						<img
							src={data.videoInfo.user.profilePictureUrl ?? '/img/icons/channel-logo.jpg'}
							alt=""
						/>
						<div>
							<a href="/user/{data.videoInfo.user.id}">{data.videoInfo.user.username}</a>
							<p>{data.videoInfo.user.subscribers} followers</p>
						</div>
					</div>

					<form
						method="post"
						action="?/followToggle"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'success') {
									followActive = !followActive;
									if (followActive) {
										data.videoInfo.user.subscribers++;
										addNotification({
											data: {
												title: 'Subscription added.'
											}
										});
									} else {
										data.videoInfo.user.subscribers--;
										addNotification({
											data: {
												title: 'Subscription removed.'
											}
										});
									}
									data = data; // make svelte aware that the data has changed
								} else {
									applyAction(result);
								}
							};
						}}
					>
						<Tooltip placement="bottom">
							<button
								use:melt={trigger}
								slot="button"
								let:trigger
								id="follow-btn"
								class:active={followActive}
								class="interaction-btn follow-btn">{followActive ? 'FOLLOWED' : 'FOLLOW'}</button
							>
							<p slot="content">Follow</p>
						</Tooltip>
						<input name="userId" type="hidden" value={data.videoInfo.user.id} />
					</form>
				</div>
				<div class="play-video-info-right">
					<Tooltip placement="bottom">
						<button
							use:melt={trigger}
							slot="button"
							let:trigger
							type="button"
							class="message-btn"
							class:active={messageActive}
							>CHAT
						</button>
						<p slot="content">Chat</p>
					</Tooltip>

					<div class="interaction-btn-group">
						<form
							method="post"
							action="?/like"
							use:enhance={() => {
								return async ({ result }) => {
									if (result.type === 'success') {
										likeActive = !likeActive;
										dislikeActive = false;
										if (likeActive) data.videoInfo.numberOfLikes++;
										else data.videoInfo.numberOfLikes--;
										data = data; // make svelte aware that the data has changed
									} else {
										applyAction(result);
									}
								};
							}}
						>
							<Tooltip placement="bottom">
								<button
									use:melt={trigger}
									slot="button"
									let:trigger
									id="like-btn"
									class="interaction-btn like-btn"
									class:active={likeActive}
									><img src="/img/icons/thumb_up_white_24dp.svg" alt="" />
									{data.videoInfo.numberOfLikes}</button
								>
								<p slot="content">Like</p>
							</Tooltip>

							<input name="videoId" type="hidden" value={data.videoInfo.video.id} />
						</form>

						<form
							method="post"
							action="?/dislike"
							use:enhance={() => {
								return async ({ result }) => {
									if (result.type === 'success') {
										addNotification({
											data: {
												title: 'Feedback shared with the creator.'
											}
										});
										if (likeActive) data.videoInfo.numberOfLikes--;
										data = data; // make svelte aware that the data has changed
										dislikeActive = !dislikeActive;
										likeActive = false;
									} else {
										applyAction(result);
									}
								};
							}}
						>
							<Tooltip placement="bottom">
								<button
									use:melt={trigger}
									slot="button"
									let:trigger
									id="dislike-btn"
									class="interaction-btn dislike-btn"
									class:active={dislikeActive}
									><img src="/img/icons/thumb_down_white_24dp.svg" alt="" /></button
								>
								<p slot="content">Dislike</p>
							</Tooltip>

							<input name="videoId" type="hidden" value={data.videoInfo.video.id} />
						</form>
					</div>
					<Tooltip placement="bottom">
						<button
							use:melt={trigger}
							slot="button"
							let:trigger
							type="button"
							class="interaction-btn share-btn"
							><img src="/img/icons/send_white_24dp.svg" alt="" />SHARE
						</button>
						<p slot="content">Share</p>
					</Tooltip>
				</div>
			</div>
			<Description
				views={data.videoInfo.video.videoViews}
				textContent={data.videoInfo.video.videoDescription}
				date={data.videoInfo.video.videoPublishedDate}
			/>
			{#if !matches1027px}
				{#await data.streamed.comments}
					<Spinner />
				{:then value}
					{#if value.status == 'ok'}
						<Comments
							totalComments={value.data.total}
							comments={value.data.comments}
							videoId={data.videoInfo.video.id}
						/>
					{/if}
				{/await}
			{/if}
		</div>

		<div id="right-videolist" class="right-videolist">
			{#await data.streamed.sideVideos}
				<Spinner />
			{:then value}
				{#if value.tag == 'success'}
					<Chips />
					<SideVideos videos={value.data.videos} showMore={videoVisibility} />
				{/if}
			{/await}
			{#if showMoreVideosButton}
				<button
					id="showMoreButton"
					on:click={() => {
						videoVisibility = true;
						showMoreVideosButton = false;
					}}
					>show more
				</button>
			{/if}
		</div>
		{#if matches1027px}
			{#await data.streamed.comments}
				<Spinner />
			{:then value}
				{#if value.status == 'ok' && matches1027px}
					<Comments
						totalComments={value.data.total}
						comments={value.data.comments}
						videoId={data.videoInfo.video.id}
					/>
				{/if}
			{/await}
		{/if}
	</div>

	<!-- ============MAIN END============ -->
</div>

<style src="./play-video.css"></style>
