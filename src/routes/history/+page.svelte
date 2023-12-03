<script lang="ts">
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
	import type { PageData } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import MainDialog from '$lib/components/mainDialog.svelte';
	import { melt } from '@melt-ui/svelte';
	import { createDialogStore } from '$lib/components/mainDialog';
	import { page } from '$app/stores';
	let displaySettingsContainer = 'none';

	const toggleSettingsDropdown = () => {
		displaySettingsContainer = displaySettingsContainer === 'none' ? 'flex' : 'none';
	};
	export let data: PageData;
	let clearDialogStore = createDialogStore();
	let saveDialogStore = createDialogStore();

	const pause = {
		title: 'Pause browsing history recording?',
		description:
			"If you pause your browsing history recording on ZulaMed, it will be harder for you to find the videos you've watched. In addition, there may be fewer recommendations for new videos. Please note that the browsing history itself will be saved. If you clear your browsing history and pause your browsing history, then the personalization and history-based features will be disabled."
	};

	const resume = {
		title: 'Resume browsing history recording?',
		description:
			'Information about the videos you watch will be saved in the history on all devices where you log into your account, and will also be taken into account when making recommendations on ZulaMed.'
	};

	let browsingHistoryState = !$page.data.loggedInUser?.historyPaused;
</script>

<svelte:head>
	<title>History - ZulaMED</title>
</svelte:head>

<div class="container" class:large-container={!$sidebarOpened}>
	<div class="history-settings">
		<div class="search-field">
			<svg
				width="44"
				height="44"
				viewBox="0 0 34 34"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="15.583" cy="15.5833" r="8.5" stroke="#00D6BA" />
				<path d="M28.333 28.3333L24.083 24.0833" stroke="#00D6BA" stroke-linecap="round" />
			</svg>
			<input type="text" placeholder="Search in browsing history" />
		</div>
		<button class="settings-dropdown" on:click={toggleSettingsDropdown}>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M5 7H19" stroke="#00D6BA" stroke-linecap="round" />
				<path d="M5 12H15" stroke="#00D6BA" stroke-linecap="round" />
				<path d="M5 17H11" stroke="#00D6BA" stroke-linecap="round" />
			</svg>
		</button>
		<div class="settings-dropdown-buttons" style:display={displaySettingsContainer}>
			<MainDialog
				titleText="Clear browsing history"
				appealText=""
				dialogStore={clearDialogStore}
				descriptionText="Are you sure you want to clear your browsing history?"
			>
				<button
					let:trigger
					use:melt={trigger}
					slot="button"
					type="button"
					class="settings-button clear-history"
					><svg
						width="34"
						height="34"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M9.5 14.5L9.5 11.5" stroke="#00D6BA" stroke-linecap="round" />
						<path d="M14.5 14.5L14.5 11.5" stroke="#00D6BA" stroke-linecap="round" />
						<path
							d="M3 6.5H21V6.5C19.5955 6.5 18.8933 6.5 18.3889 6.83706C18.1705 6.98298 17.983 7.17048 17.8371 7.38886C17.5 7.89331 17.5 8.59554 17.5 10V15.5C17.5 17.3856 17.5 18.3284 16.9142 18.9142C16.3284 19.5 15.3856 19.5 13.5 19.5H10.5C8.61438 19.5 7.67157 19.5 7.08579 18.9142C6.5 18.3284 6.5 17.3856 6.5 15.5V10C6.5 8.59554 6.5 7.89331 6.16294 7.38886C6.01702 7.17048 5.82952 6.98298 5.61114 6.83706C5.10669 6.5 4.40446 6.5 3 6.5V6.5Z"
							stroke="#00D6BA"
							stroke-linecap="round"
						/>
						<path
							d="M9.5 3.50024C9.5 3.50024 10 2.5 12 2.5C14 2.5 14.5 3.5 14.5 3.5"
							stroke="#00D6BA"
							stroke-linecap="round"
						/>
					</svg>Clear browsing history</button
				>
				<form
					slot="ok"
					method="post"
					class="settings-form"
					action="?/clearHistory"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								data.videoData.viewHistories = [];
								$clearDialogStore = false;
							} else {
								applyAction(result);
							}
						};
					}}
				>
					<button type="submit" class="dg-btn">Clear</button>
				</form>
			</MainDialog>

			<MainDialog
				titleText={browsingHistoryState ? pause.title : resume.title}
				dialogStore={saveDialogStore}
				appealText="{data.loggedInUser?.name} {data.loggedInUser?.surname} ({data.loggedInUser
					?.email})"
				descriptionText={browsingHistoryState ? pause.description : resume.description}
			>
				<button
					let:trigger
					use:melt={trigger}
					slot="button"
					type="button"
					class="settings-button save-history"
				>
					{#if !browsingHistoryState}
						<svg
							width="34"
							height="34"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M16.2111 11.1056L9.73666 7.86833C8.93878 7.46939 8 8.04958 8 8.94164V15.0584C8 15.9504 8.93878 16.5306 9.73666 16.1317L16.2111 12.8944C16.9482 12.5259 16.9482 11.4741 16.2111 11.1056Z"
								stroke="#00D6BA"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					{:else}
						<svg
							width="34"
							height="34"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								x="6"
								y="5"
								width="4"
								height="14"
								rx="1"
								stroke="#00D6BA"
								stroke-linecap="round"
							/>
							<rect
								x="14"
								y="5"
								width="4"
								height="14"
								rx="1"
								stroke="#00D6BA"
								stroke-linecap="round"
							/>
						</svg>
					{/if}

					{browsingHistoryState ? "Don't save browsing history" : 'Save browsing history'}
				</button>
				<form
					slot="ok"
					method="post"
					action="?/toggleHistory"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								$saveDialogStore = false;
								browsingHistoryState = !browsingHistoryState;
							} else {
								applyAction(result);
							}
						};
					}}
				>
					<button type="submit" class="dg-btn">{browsingHistoryState ? 'Pause' : 'Resume'}</button>
				</form>
			</MainDialog>
			<button class="settings-button comment-history disabled-btn"
				><svg
					width="34"
					height="34"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4.82698 7.13803L5.27248 7.36502L4.82698 7.13803ZM5.2682 18.7318L5.62175 19.0854H5.62175L5.2682 18.7318ZM17.862 16.173L17.635 15.7275L17.862 16.173ZM19.173 14.862L18.7275 14.635L19.173 14.862ZM19.173 7.13803L18.7275 7.36502V7.36502L19.173 7.13803ZM17.862 5.82698L18.089 5.38148V5.38148L17.862 5.82698ZM6.13803 5.82698L6.36502 6.27248L6.13803 5.82698ZM7.20711 16.7929L7.56066 17.1464L7.20711 16.7929ZM5 10.3C5 9.45167 5.00039 8.84549 5.03921 8.37032C5.07756 7.90099 5.15089 7.60366 5.27248 7.36502L4.38148 6.91103C4.17609 7.31413 4.08593 7.75771 4.04253 8.28889C3.99961 8.81423 4 9.46817 4 10.3H5ZM5 11.5V10.3H4V11.5H5ZM4 11.5V16.5H5V11.5H4ZM4 16.5V18.4136H5V16.5H4ZM4 18.4136C4 19.26 5.02329 19.6838 5.62175 19.0854L4.91465 18.3782C4.91754 18.3753 4.92812 18.368 4.94323 18.3654C4.9556 18.3632 4.96421 18.3654 4.96913 18.3674C4.97406 18.3695 4.98164 18.374 4.98888 18.3843C4.99771 18.3968 5 18.4095 5 18.4136H4ZM5.62175 19.0854L7.56066 17.1464L6.85355 16.4393L4.91465 18.3782L5.62175 19.0854ZM14.7 16H7.91421V17H14.7V16ZM17.635 15.7275C17.3963 15.8491 17.099 15.9224 16.6297 15.9608C16.1545 15.9996 15.5483 16 14.7 16V17C15.5318 17 16.1858 17.0004 16.7111 16.9575C17.2423 16.9141 17.6859 16.8239 18.089 16.6185L17.635 15.7275ZM18.7275 14.635C18.4878 15.1054 18.1054 15.4878 17.635 15.7275L18.089 16.6185C18.7475 16.283 19.283 15.7475 19.6185 15.089L18.7275 14.635ZM19 11.7C19 12.5483 18.9996 13.1545 18.9608 13.6297C18.9224 14.099 18.8491 14.3963 18.7275 14.635L19.6185 15.089C19.8239 14.6859 19.9141 14.2423 19.9575 13.7111C20.0004 13.1858 20 12.5318 20 11.7H19ZM19 10.3V11.7H20V10.3H19ZM18.7275 7.36502C18.8491 7.60366 18.9224 7.90099 18.9608 8.37032C18.9996 8.84549 19 9.45167 19 10.3H20C20 9.46817 20.0004 8.81423 19.9575 8.28889C19.9141 7.75771 19.8239 7.31413 19.6185 6.91103L18.7275 7.36502ZM17.635 6.27248C18.1054 6.51217 18.4878 6.89462 18.7275 7.36502L19.6185 6.91103C19.283 6.25247 18.7475 5.71703 18.089 5.38148L17.635 6.27248ZM14.7 6C15.5483 6 16.1545 6.00039 16.6297 6.03921C17.099 6.07756 17.3963 6.15089 17.635 6.27248L18.089 5.38148C17.6859 5.17609 17.2423 5.08593 16.7111 5.04253C16.1858 4.99961 15.5318 5 14.7 5V6ZM9.3 6H14.7V5H9.3V6ZM6.36502 6.27248C6.60366 6.15089 6.90099 6.07756 7.37032 6.03921C7.84549 6.00039 8.45167 6 9.3 6V5C8.46817 5 7.81423 4.99961 7.28889 5.04253C6.75771 5.08593 6.31413 5.17609 5.91103 5.38148L6.36502 6.27248ZM5.27248 7.36502C5.51217 6.89462 5.89462 6.51217 6.36502 6.27248L5.91103 5.38148C5.25247 5.71703 4.71703 6.25247 4.38148 6.91103L5.27248 7.36502ZM7.56066 17.1464C7.65443 17.0527 7.78161 17 7.91421 17V16C7.51639 16 7.13486 16.158 6.85355 16.4393L7.56066 17.1464Z"
						fill="#00D6BA"
					/>
					<path
						d="M8.5 9.5L15.5 9.5"
						stroke="#00D6BA"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M8.5 12.5L13.5 12.5"
						stroke="#00D6BA"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>View the history of comments</button
			>
		</div>
		<div class="settings-buttons">
			<MainDialog
				titleText="Clear browsing history"
				appealText=""
				dialogStore={clearDialogStore}
				descriptionText="Are you sure you want to clear your browsing history?"
			>
				<button
					let:trigger
					use:melt={trigger}
					slot="button"
					type="button"
					class="settings-button clear-history"
					><svg
						width="34"
						height="34"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M9.5 14.5L9.5 11.5" stroke="#00D6BA" stroke-linecap="round" />
						<path d="M14.5 14.5L14.5 11.5" stroke="#00D6BA" stroke-linecap="round" />
						<path
							d="M3 6.5H21V6.5C19.5955 6.5 18.8933 6.5 18.3889 6.83706C18.1705 6.98298 17.983 7.17048 17.8371 7.38886C17.5 7.89331 17.5 8.59554 17.5 10V15.5C17.5 17.3856 17.5 18.3284 16.9142 18.9142C16.3284 19.5 15.3856 19.5 13.5 19.5H10.5C8.61438 19.5 7.67157 19.5 7.08579 18.9142C6.5 18.3284 6.5 17.3856 6.5 15.5V10C6.5 8.59554 6.5 7.89331 6.16294 7.38886C6.01702 7.17048 5.82952 6.98298 5.61114 6.83706C5.10669 6.5 4.40446 6.5 3 6.5V6.5Z"
							stroke="#00D6BA"
							stroke-linecap="round"
						/>
						<path
							d="M9.5 3.50024C9.5 3.50024 10 2.5 12 2.5C14 2.5 14.5 3.5 14.5 3.5"
							stroke="#00D6BA"
							stroke-linecap="round"
						/>
					</svg>Clear browsing history</button
				>
				<form
					slot="ok"
					method="post"
					class="settings-form"
					action="?/clearHistory"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								data.videoData.viewHistories = [];
								$clearDialogStore = false;
							} else {
								applyAction(result);
							}
						};
					}}
				>
					<button type="submit" class="dg-btn">Clear</button>
				</form>
			</MainDialog>

			<MainDialog
				titleText={browsingHistoryState ? pause.title : resume.title}
				dialogStore={saveDialogStore}
				appealText="{data.loggedInUser?.name} {data.loggedInUser?.surname} ({data.loggedInUser
					?.email})"
				descriptionText={browsingHistoryState ? pause.description : resume.description}
			>
				<button
					let:trigger
					use:melt={trigger}
					slot="button"
					type="button"
					class="settings-button save-history"
				>
					{#if !browsingHistoryState}
						<svg
							width="34"
							height="34"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M16.2111 11.1056L9.73666 7.86833C8.93878 7.46939 8 8.04958 8 8.94164V15.0584C8 15.9504 8.93878 16.5306 9.73666 16.1317L16.2111 12.8944C16.9482 12.5259 16.9482 11.4741 16.2111 11.1056Z"
								stroke="#00D6BA"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					{:else}
						<svg
							width="34"
							height="34"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								x="6"
								y="5"
								width="4"
								height="14"
								rx="1"
								stroke="#00D6BA"
								stroke-linecap="round"
							/>
							<rect
								x="14"
								y="5"
								width="4"
								height="14"
								rx="1"
								stroke="#00D6BA"
								stroke-linecap="round"
							/>
						</svg>
					{/if}

					{browsingHistoryState ? "Don't save browsing history" : 'Save browsing history'}
				</button>
				<form
					slot="ok"
					method="post"
					action="?/toggleHistory"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								$saveDialogStore = false;
								browsingHistoryState = !browsingHistoryState;
							} else {
								applyAction(result);
							}
						};
					}}
				>
					<button type="submit" class="dg-btn">{browsingHistoryState ? 'Pause' : 'Resume'}</button>
				</form>
			</MainDialog>

			<button class="settings-button comment-history disabled-btn"
				><svg
					width="34"
					height="34"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4.82698 7.13803L5.27248 7.36502L4.82698 7.13803ZM5.2682 18.7318L5.62175 19.0854H5.62175L5.2682 18.7318ZM17.862 16.173L17.635 15.7275L17.862 16.173ZM19.173 14.862L18.7275 14.635L19.173 14.862ZM19.173 7.13803L18.7275 7.36502V7.36502L19.173 7.13803ZM17.862 5.82698L18.089 5.38148V5.38148L17.862 5.82698ZM6.13803 5.82698L6.36502 6.27248L6.13803 5.82698ZM7.20711 16.7929L7.56066 17.1464L7.20711 16.7929ZM5 10.3C5 9.45167 5.00039 8.84549 5.03921 8.37032C5.07756 7.90099 5.15089 7.60366 5.27248 7.36502L4.38148 6.91103C4.17609 7.31413 4.08593 7.75771 4.04253 8.28889C3.99961 8.81423 4 9.46817 4 10.3H5ZM5 11.5V10.3H4V11.5H5ZM4 11.5V16.5H5V11.5H4ZM4 16.5V18.4136H5V16.5H4ZM4 18.4136C4 19.26 5.02329 19.6838 5.62175 19.0854L4.91465 18.3782C4.91754 18.3753 4.92812 18.368 4.94323 18.3654C4.9556 18.3632 4.96421 18.3654 4.96913 18.3674C4.97406 18.3695 4.98164 18.374 4.98888 18.3843C4.99771 18.3968 5 18.4095 5 18.4136H4ZM5.62175 19.0854L7.56066 17.1464L6.85355 16.4393L4.91465 18.3782L5.62175 19.0854ZM14.7 16H7.91421V17H14.7V16ZM17.635 15.7275C17.3963 15.8491 17.099 15.9224 16.6297 15.9608C16.1545 15.9996 15.5483 16 14.7 16V17C15.5318 17 16.1858 17.0004 16.7111 16.9575C17.2423 16.9141 17.6859 16.8239 18.089 16.6185L17.635 15.7275ZM18.7275 14.635C18.4878 15.1054 18.1054 15.4878 17.635 15.7275L18.089 16.6185C18.7475 16.283 19.283 15.7475 19.6185 15.089L18.7275 14.635ZM19 11.7C19 12.5483 18.9996 13.1545 18.9608 13.6297C18.9224 14.099 18.8491 14.3963 18.7275 14.635L19.6185 15.089C19.8239 14.6859 19.9141 14.2423 19.9575 13.7111C20.0004 13.1858 20 12.5318 20 11.7H19ZM19 10.3V11.7H20V10.3H19ZM18.7275 7.36502C18.8491 7.60366 18.9224 7.90099 18.9608 8.37032C18.9996 8.84549 19 9.45167 19 10.3H20C20 9.46817 20.0004 8.81423 19.9575 8.28889C19.9141 7.75771 19.8239 7.31413 19.6185 6.91103L18.7275 7.36502ZM17.635 6.27248C18.1054 6.51217 18.4878 6.89462 18.7275 7.36502L19.6185 6.91103C19.283 6.25247 18.7475 5.71703 18.089 5.38148L17.635 6.27248ZM14.7 6C15.5483 6 16.1545 6.00039 16.6297 6.03921C17.099 6.07756 17.3963 6.15089 17.635 6.27248L18.089 5.38148C17.6859 5.17609 17.2423 5.08593 16.7111 5.04253C16.1858 4.99961 15.5318 5 14.7 5V6ZM9.3 6H14.7V5H9.3V6ZM6.36502 6.27248C6.60366 6.15089 6.90099 6.07756 7.37032 6.03921C7.84549 6.00039 8.45167 6 9.3 6V5C8.46817 5 7.81423 4.99961 7.28889 5.04253C6.75771 5.08593 6.31413 5.17609 5.91103 5.38148L6.36502 6.27248ZM5.27248 7.36502C5.51217 6.89462 5.89462 6.51217 6.36502 6.27248L5.91103 5.38148C5.25247 5.71703 4.71703 6.25247 4.38148 6.91103L5.27248 7.36502ZM7.56066 17.1464C7.65443 17.0527 7.78161 17 7.91421 17V16C7.51639 16 7.13486 16.158 6.85355 16.4393L7.56066 17.1464Z"
						fill="#a1a1a1"
					/>
					<path
						d="M8.5 9.5L15.5 9.5"
						stroke="#a1a1a1"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M8.5 12.5L13.5 12.5"
						stroke="#a1a1a1"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>View the history of comments</button
			>
		</div>
	</div>

	<h1 class="list-header">Today</h1>
	<div class="list-container">
		{#each data.videoData.viewHistories as videoInfo}
			<a href="/video/{videoInfo.viewedVideo.id}" class="vid-list">
				<a class="preview" href="/video/{videoInfo.viewedVideo.id}"
					><img
						src={videoInfo.viewedVideo.videoThumbnail ?? '/img/videoPreviews/7.png'}
						class="thumbnail"
						alt=""
					/></a
				>
				<div class="flex-div">
					<img
						class="channel-logo"
						src={videoInfo.owner.profilePictureUrl ?? '/img/icons/channel-logo.jpg'}
						alt=""
					/>
					<div class="list-vid-info">
						<a class="video-title" href="/video/{videoInfo.viewedVideo.id}"
							>{videoInfo.viewedVideo.videoTitle}</a
						>
						<div style="display: flex; margin-top: 12px;">
							<a href="/user/{videoInfo.owner.id}" class="vid-channel">{videoInfo.owner.username}</a
							><span class="betweenDot">·&nbsp;</span>
							<p id="viewsText" class="vid-views">{videoInfo.viewedVideo.videoViews} views</p>
						</div>
						<p class="vid-description">
							{videoInfo.viewedVideo.videoDescription ?? 'No description provided'}
						</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.disabled-btn {
		pointer-events: none !important;
		cursor: not-allowed !important;
		color: #a1a1a1 !important;
	}
	.dg-btn {
		border: none;
		color: #54b9a2;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
		padding: 10px 25px;
		text-align: center;
		text-decoration: none;
		font-size: 15px;
		border-radius: 15px;
		background: #fff;
		cursor: pointer;
	}
	.settings-dropdown {
		display: none;
	}
	.settings-dropdown-buttons {
		display: none;
	}
	.settings-buttons {
		display: flex;
		flex-direction: column;
		margin-top: 20px;
	}
	.settings-button {
		width: 100%;
		outline: none;
		border: none;
		background-color: transparent;
		cursor: pointer;
		padding: 2px 4px;
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 22px;
		border-radius: 5px;
		color: #000;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
	}
	.settings-button:hover {
		background-color: #9b9b9b5b;
	}
	.history-settings {
		position: fixed;
		background-color: #fff;
		right: 0;
		top: 74px;
		width: 430px;
		height: 100vh;
		padding: 60px 47px 0 25px;
	}
	.search-field {
		display: flex;
		border-bottom: 1px solid #00d6ba;
		gap: 23px;
	}
	.search-field input {
		width: 100%;
		border: none;
		outline: none;
		background-color: transparent;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
	}
	/* =================== */
	/* =================== */

	.channel-logo {
		display: none;
	}
	.flex-div {
		display: flex;
		align-items: center;
	}

	.container {
		padding-left: 16.77%;
		padding-right: 430px;
	}

	.large-container {
		padding-left: 4%;
	}

	.list-container {
		display: grid;
		grid-column-gap: 20px;
		padding: 0 183px;
	}
	.preview {
		max-width: 452px;
		margin-right: 19px;
	}
	.vid-list {
		display: flex;
		text-decoration: none;
		margin-bottom: 25px;
		border-radius: 5px;
		border: 1px solid transparent;
		transition: border 0.2s ease-in-out;
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
		background-color: #000;
		object-fit: contain;
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
		white-space: nowrap;
	}
	.vid-views {
		color: #a1a1a1;
		font-size: 15px;
		white-space: nowrap;
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
	@media (max-width: 1670px) {
		.list-header,
		.list-container {
			padding: 0 62px;
		}
	}
	@media (max-width: 1440px) {
		.container {
			padding-left: 20%;
		}
		.list-vid-info .video-title {
			font-size: 20px;
		}
		.vid-description {
			font-size: 12px;
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
		.vid-list {
			flex-direction: column;
		}
		.history-settings {
			width: 351px;
			padding: 60px 47px 0 0;
		}
		.list-header,
		.list-container {
			padding: 0 30px;
		}
	}
	@media (max-width: 900px) {
		.settings-dropdown {
			display: flex;
			cursor: pointer;
			background-color: transparent;
			outline: none;
			border: none;
		}
		.settings-dropdown:active {
			background-color: #ebebeb;
		}
		.settings-dropdown-buttons {
			position: fixed;
			display: flex;
			flex-direction: column;
			background-color: #f4f4f4;
			border-radius: 17px;
			padding: 21px 15px;
			top: 110px;
			right: 30px;
			gap: 8px;
		}
		.settings-dropdown-buttons button svg {
			width: 21px;
			height: 21px;
		}
		.settings-dropdown-buttons button {
			font-size: 15px;
			font-style: normal;
			font-weight: 500;
		}
		.settings-button {
			gap: 10px;
			white-space: nowrap;
		}
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
			padding-right: 0;
			margin-top: 47px;
		}
		.list-header {
			padding: 0 22px;
		}
		.list-container {
			padding: 0 22px 20px 22px;
			grid-template-columns: repeat(2, minmax(184px, 1fr));
		}

		.history-settings {
			padding: 0 23px;
			width: 100%;
			height: 37px;
			position: fixed;
			display: flex;
			align-items: center;
			flex-direction: row;
		}
		.settings-buttons {
			display: none;
		}
		.search-field {
			gap: 17px;
			padding: 0 0 5px 0;
			width: 100%;
		}
		.search-field svg {
			width: 15px;
			height: 15px;
		}
		.search-field input {
			font-size: 12px;
			font-style: normal;
			font-weight: 500;
		}
		.search-field input::placeholder {
			color: #c5c5c5;
		}
	}
	@media (max-width: 460px) {
		.list-container {
			grid-template-columns: repeat(1, minmax(184px, 1fr));
		}
	}
</style>
