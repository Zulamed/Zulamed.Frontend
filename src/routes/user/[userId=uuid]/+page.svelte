<script lang="ts">
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
	import UserHome from './components/userHome.svelte';
	import UserPlaylist from './components/userPlaylist.svelte';
	import UserChannels from './components/userChannels.svelte';
	import UserAbout from './components/userAbout.svelte';
	import { flyAndScale } from '$lib/animations/flyAndScale';
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';
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
	import { subscribe } from 'svelte/internal';
	import { invalidateAll } from '$app/navigation';

	let subActive = false;
	let confirmationVisible = false;
	let followActive = false;
	function toggleSubscription() {
		if (subActive) {
			confirmationVisible = true;
		} else {
			subActive = !subActive;
		}
	}
	function confirmUnsubscribe() {
		subActive = false;
		confirmationVisible = false;
	}

	function cancelUnsubscribe() {
		confirmationVisible = false;
	}

	const {
		elements: { trigger: triggerDialog, content: contentDialog, overlay, title, close, portalled },
		states: { open }
	} = createDialog();

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
	let files = {
		accepted: [],
		rejected: []
	};
	let inputFile: HTMLInputElement;
	function handleFilesSelect(e: CustomEvent<any>) {
		const { acceptedFiles, fileRejections } = e.detail;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		files.accepted = [...files.accepted, ...acceptedFiles];

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		files.rejected = [...files.rejected, ...fileRejections];
	}

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.user.login} - ZulaMED</title>
</svelte:head>
<div class="container" class:large-container={!$sidebarOpened}>
	<div class="channel-banner">
		<img src="." alt="" />
	</div>
	<div class="flex-div channel-info">
		<img src={data.user.profilePictureUrl ?? '/img/icons/user-logo160x160.jpg'} alt="" />
		<div>
			<h5>{data.user.name} {data.user.surname}</h5>
			<div class="main-info">
				<p>@{data.user.login}</p>
				<p>{data.numberOfFollowers} followers</p>
			</div>
			<a href="" style="text-decoration-line: underline;">More about this channel</a>
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
				<button class="subheader-btn">Customise channel</button>
				<button use:melt={$triggerDialog} class="subheader-btn">Upload video</button>
				<div use:melt={$portalled}>
					{#if $open}
						<div use:melt={$overlay} class="overlay" />

						<!-- {#each files.accepted as item} -->
						<!-- 	<li>{item.name}</li> -->
						<!-- {/each} -->

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
							<div class="dialog-content">
								<Dropzone
									on:drop={handleFilesSelect}
									accept={['video/*']}
									inputElement={inputFile}
									containerStyles="height:100%; width:100%; justify-content: center; background-color: #FFF; border-color: #54B9A2;"
								>
									<div class="upload-icon">
										<svg
											width="131"
											height="131"
											viewBox="0 0 131 131"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M45.7535 54.1522L63.8093 36.0413V85.292C63.8093 85.8399 64.027 86.3653 64.4144 86.7528C64.8018 87.1402 65.3273 87.3578 65.8752 87.3578C66.4231 87.3578 66.9486 87.1402 67.336 86.7528C67.7234 86.3653 67.9411 85.8399 67.9411 85.292V36.0413L85.9969 54.1522C86.1913 54.3439 86.4216 54.4955 86.6746 54.5982C86.9276 54.7009 87.1984 54.7528 87.4714 54.7509C87.7444 54.749 88.0144 54.6933 88.266 54.587C88.5175 54.4807 88.7456 54.326 88.9373 54.1316C89.1291 53.9371 89.2806 53.7068 89.3833 53.4538C89.486 53.2009 89.5379 52.9301 89.536 52.6571C89.5341 52.384 89.4784 52.114 89.3721 51.8625C89.2659 51.611 89.1111 51.3828 88.9167 51.1911L67.3351 29.6508C67.1511 29.436 66.9202 29.2664 66.6602 29.155C66.2839 29.001 65.8707 28.9606 65.4717 29.039C65.0727 29.1173 64.7055 29.3109 64.4153 29.5957L42.8337 51.1911C42.4411 51.5783 42.2183 52.1056 42.2144 52.6571C42.2105 53.2085 42.4259 53.7389 42.8131 54.1316C43.2003 54.5242 43.7276 54.747 44.279 54.7509C44.8304 54.7547 45.3608 54.5394 45.7535 54.1522Z"
												fill="url(#paint0_linear_1_1129)"
											/>
											<path
												d="M96.6843 87.9226C96.1364 87.9226 95.6109 88.1403 95.2235 88.5277C94.8361 88.9151 94.6184 89.4406 94.6184 89.9885V96.7508H37.1318V89.9885C37.1318 89.4406 36.9141 88.9151 36.5267 88.5277C36.1393 88.1403 35.6138 87.9226 35.0659 87.9226C34.518 87.9226 33.9925 88.1403 33.6051 88.5277C33.2177 88.9151 33 89.4406 33 89.9885V98.8167C33 99.3646 33.2177 99.8901 33.6051 100.277C33.9925 100.665 34.518 100.883 35.0659 100.883H96.6843C97.2322 100.883 97.7577 100.665 98.1451 100.277C98.5325 99.8901 98.7502 99.3646 98.7502 98.8167V89.9885C98.7502 89.4406 98.5325 88.9151 98.1451 88.5277C97.7577 88.1403 97.2322 87.9226 96.6843 87.9226Z"
												fill="url(#paint1_linear_1_1129)"
											/>
											<defs>
												<linearGradient
													id="paint0_linear_1_1129"
													x1="42.2277"
													y1="58.2013"
													x2="89.5227"
													y2="58.2013"
													gradientUnits="userSpaceOnUse"
												>
													<stop stop-color="#54B9A2" />
													<stop offset="1" stop-color="#018B7B" />
												</linearGradient>
												<linearGradient
													id="paint1_linear_1_1129"
													x1="33"
													y1="94.3957"
													x2="98.7502"
													y2="94.3957"
													gradientUnits="userSpaceOnUse"
												>
													<stop stop-color="#54B9A2" />
													<stop offset="1" stop-color="#00D6BA" />
												</linearGradient>
											</defs>
										</svg>
									</div>
									<p class="dialog-title">Drag and drop video files to upload</p>
									<p class="dialog-desc">Your videos will be private until you publish them.</p>

									<form action="">
										<div class="file-upload">
											<label for="upload" class="file-upload__label">SELECT FILES</label>
											<input
												id="upload"
												class="file-upload__input"
												type="file"
												name="file-upload"
											/>
										</div>
									</form>
								</Dropzone>
							</div>
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
							invalidateAll();
							followActive = !followActive;
							if (followActive) {
								data.numberOfFollowers++;
								addNotification({
									data: {
										title: 'Subscription added.'
									}
								});
							} else {
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
		{#if data.videos.length === 0 && data.user.id === $user?.id}
			<div class="user-no-videos">
				<img src="/img/icons/upload-a-video.svg" alt="" />
				<h1 class="no-videos-title">Upload a video to get started</h1>
				<p class="no-videos-subtitle">
					Start sharing your story and connecting with viewers. Videos that you upload<br />will
					show up here
				</p>
				<button use:melt={$triggerDialog} class="subheader-btn">Upload video</button>
			</div>
		{:else if data.videos.length === 0}
			<div style="width: 100%; text-align: center;">There is nothing here yet.</div>
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
