<script lang="ts">
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
	import UserHome from './components/userHome.svelte';
	import UserPlaylist from './components/userPlaylist.svelte';
	import UserChannels from './components/userChannels.svelte';
	import UserAbout from './components/userAbout.svelte';
	import { flyAndScale } from '$lib/animations/flyAndScale';
	import { addNotification } from '$lib/components/notification.svelte';
	import { applyAction, enhance } from '$app/forms';

	// =====tabs======
	import { createTabs, melt } from '@melt-ui/svelte';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	import { createDialog } from '@melt-ui/svelte';
	import type { PageData } from './$types';
	import { user } from '$lib/stores/auth';
	import Tooltip from '$lib/components/tooltip.svelte';
	import { invalidateAll } from '$app/navigation';
	import Upload from './components/upload/upload.svelte';
	import Stepper from './components/upload/stepper.svelte';
	import CreateVideo from './components/upload/createVideo.svelte';
	import { onMount } from 'svelte';
	import { subscriptions } from '$lib/stores/subscriptions';

	let subActive = false;
	let confirmationVisible = false;
	function toggleSubscription() {
		if (subActive) {
			confirmationVisible = true;
		} else {
			subActive = !subActive;
		}
	}
	let matches900px = false;
	onMount(() => {
		let mediaQuery = window.matchMedia('(max-width: 900px)');
		const match900px = () => {
			matches900px = mediaQuery.matches;
		};
		match900px();
		mediaQuery.addEventListener('change', match900px);
		return () => {
			mediaQuery.removeEventListener('change', match900px);
		};
	});

	const {
		elements: { trigger: triggerDialog, content: contentDialog, overlay, title, close, portalled },
		states: { open }
	} = createDialog({
		closeOnOutsideClick: false
	});

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'tab-1'
	});

	const triggers = [
		{ id: 'tab-1', title: 'Home' },
		{ id: 'tab-2', title: 'Playlist' },
		{ id: 'tab-3', title: 'Channels' },
		{ id: 'tab-4', title: 'About' }
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
	// =====tabs======

	export let data: PageData;

	let followActive = data.userFollowed;
</script>

<svelte:head>
	<title>{data.user.login} - ZulaMED</title>
</svelte:head>
<div class="container" class:large-container={!$sidebarOpened}>
	{#if data.user.id === $user?.id}
		<Tooltip placement="bottom">
			<div use:melt={trigger} slot="button" let:trigger class="channel-banner">
				<img src="/img/main-background-mobile.png" alt="" />
				<a href="">
					<img
						style="width: 70px; height: 70px"
						class="camera-icon"
						src="/img/icons/photo_camera_white_24dp.svg"
						alt=""
					/>
				</a>
			</div>
			<p slot="content">Edit channel banner</p>
		</Tooltip>
	{:else}
		<div class="channel-banner">
			<img src="/img/main-background-mobile.png" alt="" />
		</div>
	{/if}
	<div class="flex-div channel-info">
		{#if data.user.id === $user?.id}
			<Tooltip placement="bottom">
				<a
					use:melt={trigger}
					slot="button"
					let:trigger
					href="."
					style="position: relative; margin-right:32px"
				>
					<img
						class="user-profile-picture"
						src={data.user.profilePictureUrl ?? '/img/icons/user-logo160x160.jpg'}
						alt=""
					/>
					<img class="camera-icon" src="/img/icons/photo_camera_white_24dp.svg" alt="" />
				</a>
				<p slot="content">Edit profile picture</p>
			</Tooltip>
		{:else}
			<div>
				<img
					class="user-profile-picture"
					src={data.user.profilePictureUrl ?? '/img/icons/user-logo160x160.jpg'}
					alt=""
				/>
			</div>
		{/if}

		<div>
			<h5>{data.user.name} {data.user.surname}</h5>
			<div class="main-info">
				<p>@{data.user.login}</p>
				<p>{data.numberOfFollowers} followers</p>
			</div>
			<a
				class="more-about"
				href="."
				use:melt={$trigger('tab-4')}
				style="text-decoration-line: underline; cursor: pointer;">More about this channel</a
			>
		</div>
	</div>
	<div class="subheader">
		<div class="tabs-container">
			<div use:melt={$root} class="tab-content">
				<div use:melt={$list} class="tabs-btns" aria-label="Manage your account">
					<div class="tabs-padding">
						{#each triggers as triggerItem}
							<button use:melt={$trigger(triggerItem.id)} class="tab-btn">
								{triggerItem.title}
								{#if $value === triggerItem.id}
									<div
										in:send={{ key: 'trigger' }}
										out:receive={{ key: 'trigger' }}
										class="tabs-underline"
									/>
								{/if}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
		{#if data.user.id === $user?.id}
			<div class="btns-container">
				{#if !matches900px}
					<button use:melt={$triggerDialog} class="subheader-btn">Upload video</button>
				{/if}

				<div use:melt={$portalled}>
					{#if $open}
						<div use:melt={$overlay} class="overlay" />
						<div
							transition:flyAndScale={{
								duration: 150,
								y: 8,
								start: 0.96
							}}
							class="content"
							use:melt={$contentDialog}
						>
							<div class="dialog-head">
								<h2 use:melt={$title} class="title">Upload videos</h2>
								<hr class="dialog-hr" />
							</div>
							<button use:melt={$close} aria-label="close" class="close">
								<svg
									width="25"
									height="25"
									viewBox="0 0 18 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.5 4.5L4.5 13.5"
										stroke="#000"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M4.5 4.5L13.5 13.5"
										stroke="#000"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</button>

							<CreateVideo />
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<form
				style="display: flex; align-items: center; justify-content: center;"
				method="post"
				action="?/followToggle"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'success') {
							followActive = !followActive;
							if (followActive) {
								data.numberOfFollowers++;
								$subscriptions.push({
									user: data.user,
									numberOfSubscribers: data.numberOfFollowers
								});
								$subscriptions = $subscriptions;
								addNotification({
									data: {
										title: 'Subscription added.'
									}
								});
							} else {
								let toBeRemoved = $subscriptions.findIndex((sub) => sub.user.id === data.user.id);
								$subscriptions.splice(toBeRemoved, 1);
								$subscriptions = $subscriptions;
								data.numberOfFollowers--;
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
				<button
					id="follow-btn"
					on:click={toggleSubscription}
					class:active={followActive}
					class="subheader-btn">{followActive ? 'Followed' : 'Follow'}</button
				>
				<input name="userId" type="hidden" value={data.user.id} />
			</form>
		{/if}

		<hr />
	</div>
	<div use:melt={$content('tab-1')} class="tab-content-container">
		{#if data.videos.length === 0 && data.user.id === $user?.id && !matches900px}
			<div class="user-no-videos">
				<img src="/img/icons/upload-a-video.svg" alt="" />
				<h1 class="no-videos-title">Upload a video to get started</h1>
				<p class="no-videos-subtitle">
					Start sharing your story and connecting with viewers. Videos that you upload will show up
					here
				</p>
				<button use:melt={$triggerDialog} class="subheader-btn">Upload video</button>
			</div>
		{:else if data.videos.length === 0}
			<div style="width: 100%; text-align: center; margin-top: 20px">
				There is nothing here yet.
			</div>
		{:else}
			<UserHome videos={data.videos} user={data.user} />
		{/if}
	</div>
	<div use:melt={$content('tab-2')} class="tab-content-container"><UserPlaylist /></div>
	<div use:melt={$content('tab-3')} class="tab-content-container">
		{#if data.subscriptions.length > 0}
			<UserChannels subscriptions={data.subscriptions} />
		{:else}
			<div style="width: 100%; text-align: center;">There is nothing here yet.</div>
		{/if}
	</div>
	<div use:melt={$content('tab-4')} class="tab-content-container"><UserAbout /></div>
</div>

<style lang="css" src="./user.css"></style>
