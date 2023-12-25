<script lang="ts">
	import { portal } from 'svelte-portal';
	import { sidebarOpened } from './stores/sidebarOpened';
	import { logout, user } from '$lib/stores/auth';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Subscription } from '$backend/user/getSubscriptions';
	import { searchQuery } from '$lib/stores/search';
	import Tooltip from '../tooltip.svelte';
	import { melt } from '@melt-ui/svelte';
	export let showSearchbar = false;
	export let subscriptions: Subscription[];

	let isMobileSearchBarOpen = false;
	let displayProfileContainer = 'none';
	let sidebarMobileLeft = '-100%';
	let sidebarOpen = true;
	let searchbarMobileTop = '0';
	let navigationBoxShadow = '0px 0px 0px #00000040';
	let overlayLeft = '-100%';
	let smotritelSabok = false;
	$: subscriptionsSlice = !smotritelSabok && $user ? subscriptions.slice(0, 5) : subscriptions;

	$: {
		$sidebarOpened = sidebarOpen;
	}

	const toggleProfileContainer = () => {
		displayProfileContainer = displayProfileContainer === 'none' ? 'block' : 'none';
	};

	const closeProfileContainer = () => {
		displayProfileContainer = 'none';
	};

	const toggleSidebar = () => {
		sidebarOpen = !sidebarOpen;
	};

	const openMobileSidebar = () => {
		sidebarMobileLeft = '0';
		overlayLeft = '0';
	};

	const closeMobileSidebar = () => {
		sidebarMobileLeft = '-100%';
		overlayLeft = '-100%';
	};

	const openSearchbarMobile = (e: Event) => {
		searchbarMobileTop = '74px';
		navigationBoxShadow = '0px 4px 4px #00000040';
		isMobileSearchBarOpen = true;
		e.stopPropagation();
	};

	const closeSearchbarMobile = () => {
		searchbarMobileTop = '0';
		navigationBoxShadow = '0px 0px 0px #00000040';
		isMobileSearchBarOpen = false;
	};

	function bodyOnClick(e: MouseEvent) {
		let target = e.target as HTMLElement;
		if (isMobileSearchBarOpen && !target.closest('#search-mobile-form')) {
			closeSearchbarMobile();
		}
		if (displayProfileContainer === 'block' && !target.closest('#profile-container')) {
			closeProfileContainer();
		}
	}

	function bodyOnTouchMove() {
		displayProfileContainer = 'none';
		langContainerActive = false;
	}

	let langContainerActive = false;
	function hoverLangContainer() {
		langContainerActive = true;
	}
	function unhoverLangContainer() {
		langContainerActive = false;
	}

	function toggleLangContainer() {
		langContainerActive = !langContainerActive;
	}
</script>

<svelte:body on:click={bodyOnClick} on:touchmove={bodyOnTouchMove} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div use:portal class="overlay" on:click={closeMobileSidebar} style:left={overlayLeft} />
<form action="/searchResult" class="flex-div" id="search-mobile-form" method="get">
	<div class="searchbar-mobile flex-div" style:top={searchbarMobileTop}>
		<input bind:value={$searchQuery} name="q" placeholder="Search..." type="text" />
	</div>
</form>
<nav class="flex-div" id="navigation" style:box-shadow={navigationBoxShadow}>
	<div class="nav-left flex-div">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="menu-icon-background-small flex-div" on:click={openMobileSidebar}>
			<img class="menu-icon" src="/img/icons/menu.svg" alt="" />
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="menu-icon-background flex-div" on:click={toggleSidebar}>
			<img class="menu-icon" src="/img/icons/menu.svg" alt="" />
		</div>
		<a href="/" style="display: flex; align-items:center;">
			<img class="logo" src="/img/logo-white-theme.png" alt="" />
		</a>
	</div>
	{#if showSearchbar}
		<div class="nav-center flex-div">
			<form class="searchbar flex-div" action="/searchResult" method="get">
				<div class="searchbox">
					<input type="text" bind:value={$searchQuery} name="q" placeholder="Search..." />
				</div>
				<button class="search-button" type="submit"
					><img src="/img/icons/search_white_24dp.svg" alt="" /></button
				>
			</form>
		</div>
	{/if}
	<div class="nav-right flex-div">
		<button
			form="search-mobile-form"
			id="search-mobile"
			type="button"
			class="search-mobile flex-div"
			on:click|preventDefault={openSearchbarMobile}
		>
			<img src="/img/icons/Search_light.svg" alt="" />
		</button>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="language-container"
			on:mouseenter={hoverLangContainer}
			on:mouseleave={unhoverLangContainer}
			on:click={toggleLangContainer}
		>
			<div
				class="language-button"
				style="display: flex; align-items:center; justify-content:space-between"
			>
				<span>EN</span><img
					class="arrow-down"
					style="width: 15px; height: 15px;"
					class:rotate={langContainerActive}
					src="/img/icons/down-arrow.png"
					alt=""
				/>
			</div>
			<div class="language-list" class:active={langContainerActive}>
				<button class="language-item selected-language">EN</button>
				<button class="language-item">DE</button>
			</div>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		{#if $user}
			<div style="position: relative; display: flex; align-items: center;">
				<img
					style="border-radius: 50%;"
					class="user-icon"
					src={$user?.profilePictureUrl ?? '/img/blank-profile-picture.png'}
					alt=""
					on:click|stopPropagation={toggleProfileContainer}
				/>
				<div
					class="profile-container"
					id="profile-container"
					style:display={displayProfileContainer}
				>
					<div class="popup-profile flex-div">
						<a class="shortcut-link" href="/user/{$user.id}"
							><img src={$user?.profilePictureUrl ?? '/img/blank-profile-picture.png'} alt="" /></a
						>
						<div>
							<a href="/user/{$user.id}">{$user.name} {$user.surname}</a>
							<p>@{$user.login}</p>
							<a href="/user/{$user.id}" class="account-manage">Manage your Account</a>
						</div>
					</div>

					<!-- Другие элементы контейнера -->
					<a class="profile-link" href="/user/{$user.id}"
						><img src="/img/profileContainerIcons/account_box_black_24dp.svg" alt="" />
						<p>Your channel</p>
					</a>
					<!-- <a class="profile-link" href="."
						><img src="/img/profileContainerIcons/groups_black_24dp.svg" alt="" />
						<p>Switch account</p>
					</a> -->
					<a class="profile-link" href="/membership"
						><img src="/img/profileContainerIcons/wallet_black_24dp.svg" alt="" />
						<p>Purchases and membership</p>
					</a>
					<!-- <a class="profile-link" href="."
						><img src="/img/profileContainerIcons/translate_black_24dp.svg" alt="" />
						<p>Language: English</p>
					</a> -->
					<a class="profile-link" href="/settings/account"
						><img src="/img/profileContainerIcons/settings_black_24dp.svg" alt="" />
						<p>Settings</p>
					</a>
					<button
						style="all: unset; cursor: pointer;"
						class="profile-link"
						on:click={async () => {
							await logout();
							await invalidateAll();
						}}
						><img src="/img/profileContainerIcons/logout_black_24dp.svg" alt="" />
						<p>Sign out</p>
					</button>
				</div>
			</div>
		{/if}
		{#if !$user}
			<a class="user-register" href="/register">register</a>
			<a class="user-login" href="/login">log in</a>
		{/if}
	</div>
</nav>
<!-- ------------sidebar------------ -->
<div class="sidebar" class:small-sidebar={!sidebarOpen}>
	<div class="shortcut-links" style:display={sidebarOpen ? 'block' : 'flex'}>
		<a class="shortcut-link" href="/" class:active-shortcut={$page.url.pathname === '/'}
			><img src="/img/icons/Home_fill.svg" alt="" />
			<p>Home</p>
		</a>

		{#if $user}
			<a
				class="shortcut-link"
				href="/subscriptions"
				class:active-shortcut={$page.url.pathname === '/subscriptions'}
				><img src="/img/icons/subscriptions_white_24dp.svg" alt="" />
				<p>Subsciptions</p>
			</a>

			<hr />
			<a
				class="shortcut-link"
				href="/history"
				class:active-shortcut={$page.url.pathname === '/history'}
				><img src="/img/icons/history_white_24dp.svg" alt="" />
				<p>History</p>
			</a>
			<a
				class="shortcut-link"
				href="/yourVideos"
				class:active-shortcut={$page.url.pathname === '/yourVideos'}
				><img src="/img/icons/play_arrow_white_48dp(2).svg" alt="" />
				<p>Your videos</p>
			</a>
			<a
				class="shortcut-link"
				href="/liked-videos"
				on:click={closeMobileSidebar}
				class:active-shortcut={$page.url.pathname === '/liked-videos'}
				><img src="/img/icons/liked.svg" alt="" />
				<p>Liked videos</p>
			</a>
			{#if subscriptionsSlice.length != 0}
				<hr style:display={sidebarOpen ? 'flex' : 'none'} />
				<p class="sidebar-title" style:display={sidebarOpen ? 'flex' : 'none'}>SUBSCRIPTIONS</p>

				{#each subscriptionsSlice as sub}
					{@const subName = sub.user.login}

					<a
						class="shortcut-link"
						href="/user/{sub.user.id}"
						style:display={sidebarOpen ? 'flex' : 'none'}
						><img
							class="subsciption-logo"
							src={sub.user.profilePictureUrl ?? '/img/icons/profile.png'}
							alt=""
						/>
						<Tooltip placement="bottom">
							<p use:melt={trigger} let:trigger slot="button">
								{subName.length >= 16 ? subName.slice(0, 13) + '...' : subName}
							</p>
							<p slot="content">{subName}</p>
						</Tooltip>
					</a>
				{/each}
				{#if !smotritelSabok}
					{#if subscriptions.length > 5}
						<button
							on:click={() => {
								smotritelSabok = true;
							}}
							class="show-more"
						>
							<img src="/img/icons/expand_more_white_36dp.svg" alt="" />
						</button>
					{/if}
				{:else}
					<button
						on:click={() => {
							smotritelSabok = false;
						}}
						class="show-less"
					>
						<img src="/img/icons/expand_more_white_36dp.svg" alt="" />
					</button>
				{/if}
			{/if}

			<hr style:display={sidebarOpen ? 'flex' : 'none'} />
			<a id="shortcut-link" href="/settings/account" style:display={sidebarOpen ? 'flex' : 'none'}
				><img src="/img/icons/settings_white_24dp.svg" alt="" />
				<p>Settings</p>
			</a>
		{/if}
	</div>
	<div class="about-container">
		<a class="about-logo" href=".">
			<img src="/img/logo-green-theme.png" alt="" />
		</a>
		<p>
			Medical platform offering an extensive library of surgical procedures and instructional videos
			tailored for professionals
		</p>
		<!-- ====social media==== -->
		<a target="_blank" class="about-link" href="https://www.linkedin.com/company/zulamed">
			<img class="social-media-icon" src="/img/icons/linkedin-48.png" alt="" />
			<span>LinkedIn</span>
		</a>
		<a target="_blank" class="about-link" href="https://www.facebook.com/zulamed.de">
			<img class="social-media-icon" src="/img/icons/facebook-48.png" alt="" />
			<span>Facebook</span>
		</a>
		<a target="_blank" class="about-link" href="https://www.instagram.com/zulamed.de/">
			<img class="social-media-icon" src="/img/icons/instagram-48.png" alt="" />
			<span>Instagram</span>
		</a>
		<!-- ====social media==== -->

		<a class="about-link" href="/about-zulamed">
			About &nbsp;<span style="font-weight: 700">ZULA</span>MED
		</a>
	</div>
</div>
<!-- ------------sidebar------------ -->
<!-- ------------sidebar-small------------ -->

<div class="sidebar-mobile" style:left={sidebarMobileLeft}>
	<div class="shortcut-links">
		<a
			class="shortcut-link"
			href="/"
			class:active-shortcut={$page.url.pathname === '/'}
			on:click={closeMobileSidebar}
			><img src="/img/icons/Home_fill.svg" alt="" />
			<p>Home</p>
		</a>
		{#if $user}
			<a
				class="shortcut-link"
				href="/subscriptions"
				class:active-shortcut={$page.url.pathname === '/subscriptions'}
				on:click={closeMobileSidebar}
				><img src="/img/icons/subscriptions_white_24dp.svg" alt="" />
				<p>Subsciptions</p>
			</a>

			<hr />
			<a
				class="shortcut-link"
				href="/history"
				class:active-shortcut={$page.url.pathname === '/history'}
				on:click={closeMobileSidebar}
				><img src="/img/icons/history_white_24dp.svg" alt="" />
				<p>History</p>
			</a>
			<a
				class="shortcut-link"
				href="/yourVideos"
				class:active-shortcut={$page.url.pathname === '/yourVideo'}
				on:click={closeMobileSidebar}
				><img src="/img/icons/play_arrow_white_48dp(2).svg" alt="" />
				<p>Your videos</p>
			</a>
			<a
				class="shortcut-link"
				href="/liked-videos"
				on:click={closeMobileSidebar}
				class:active-shortcut={$page.url.pathname === '/liked-videos'}
				><img src="/img/icons/liked.svg" alt="" />
				<p>Liked videos</p>
			</a>
			<hr />
			<p class="sidebar-title">SUBSCRIPTIONS</p>

			{#if subscriptionsSlice.length != 0}
				{#each subscriptionsSlice as sub}
					<a class="shortcut-link" href="/user/{sub.user.id}"
						><img
							class="subsciption-logo"
							src={sub.user.profilePictureUrl ?? '/img/icons/user.png'}
							alt=""
						/>
						<p>{sub.user.login}</p>
					</a>
				{/each}
				{#if !smotritelSabok}
					<button
						on:click={() => {
							smotritelSabok = true;
						}}
						class="show-more"
					>
						<img src="/img/icons/expand_more_white_36dp.svg" alt="" />
					</button>
				{:else}
					<button
						on:click={() => {
							smotritelSabok = false;
						}}
						class="show-less"
					>
						<img src="/img/icons/expand_more_white_36dp.svg" alt="" />
					</button>
				{/if}
			{:else}
				<p style="color: #fff; padding: 0 0 0 16px;">You have no subscriptions</p>
			{/if}
		{/if}

		<hr />
		<a
			id="shortcut-link"
			href="/settings/account"
			class:active-shortcut={$page.url.pathname === '/settings'}
			><img src="/img/icons/settings_white_24dp.svg" alt="" />
			<p>Settings</p>
		</a>
	</div>
	<div class="about-container">
		<a class="about-logo" href=".">
			<img src="/img/logo-green-theme.png" alt="" />
		</a>
		<p>
			Medical platform offering an extensive library of surgical procedures and instructional videos
			tailored for professionals
		</p>
		<!-- ====social media==== -->
		<a target="_blank" class="about-link" href="https://www.linkedin.com/company/zulamed">
			<img class="social-media-icon" src="/img/icons/linkedin-48.png" alt="" />
			<span>LinkedIn</span>
		</a>
		<a target="_blank" class="about-link" href="https://www.facebook.com/zulamed.de">
			<img class="social-media-icon" src="/img/icons/facebook-48.png" alt="" />
			<span>Facebook</span>
		</a>
		<a target="_blank" class="about-link" href="https://www.instagram.com/zulamed.de/">
			<img class="social-media-icon" src="/img/icons/instagram-48.png" alt="" />
			<span>Instagram</span>
		</a>
		<!-- ====social media==== -->
		<a class="about-link" href="/about-zulamed">
			About &nbsp;<span style="font-weight: 700">ZULA</span>MED
		</a>
	</div>
</div>

<style src="./SidebarAndNavbar.css"></style>
