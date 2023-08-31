<script lang="ts">
	import { portal } from 'svelte-portal';
	import { sidebarOpened } from './stores/sidebarOpened';
	import { logout, user } from '$lib/stores/auth';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	export let showSearchbar = false;

	let isMobileSearchBarOpen = false;
	let displayProfileContainer = 'none';
	let displayLanguageContainer = 'none';
	let sidebarMobileLeft = '-100%';
	let sidebarOpen = true;
	let searchbarMobileTop = '0';
	let navigationBoxShadow = '0px 0px 0px #00000040';
	let overlayLeft = '-100%';
	let shortcutPadding = '7px';
	let overflowY = 'hidden';

	$: {
		$sidebarOpened = sidebarOpen;
	}

	const toggleProfileContainer = () => {
		displayProfileContainer = displayProfileContainer === 'none' ? 'block' : 'none';
	};

	const toggleLanguageContainer = () => {
		displayLanguageContainer = displayLanguageContainer === 'none' ? 'block' : 'none';
	};

	const closeLanguageContainer = () => {
		displayLanguageContainer = 'none';
	};

	const toggleSidebar = () => {
		sidebarOpen = !sidebarOpen;
		if (sidebarOpen) shortcutPadding = '7px';
		else shortcutPadding = '0';
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
	}

	function bodyOnTouchMove() {
		displayLanguageContainer = 'none';
		displayProfileContainer = 'none';
	}
</script>

<svelte:body on:click={bodyOnClick} on:touchmove={bodyOnTouchMove} />
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div use:portal class="overlay" on:click={closeMobileSidebar} style:left={overlayLeft} />
<form action="" class="flex-div" id="search-mobile-form">
	<div class="searchbar-mobile flex-div" style:top={searchbarMobileTop}>
		<input placeholder="Search..." name="" type="text" />
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
			<form class="searchbar flex-div" action="">
				<div class="searchbox">
					<input type="text" placeholder="Search..." />
				</div>
				<button class="search-button" type="submit"
					><img src="/img/icons/search_white_24dp.svg" alt="" /></button
				>
			</form>
		</div>
	{/if}
	<div class="nav-right flex-div">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="flex-div lang-icon" on:click={toggleLanguageContainer}>
			<img width="20px" src="/img/flagIcons/az.svg" alt="" />
			<img width="20px" src="/img/icons/dropdown.svg" alt="" />
		</div>

		<button
			form="search-mobile-form"
			id="search-mobile"
			type="button"
			class="search-mobile flex-div"
			on:click|preventDefault={openSearchbarMobile}
		>
			<img src="/img/icons/Search_light.svg" alt="" />
		</button>

		<div
			class="language-container"
			id="language-container"
			style:display={displayLanguageContainer}
		>
			<div style="padding-left: 8px; height: 40px" class="flex-div">
				<h5>Choose your language</h5>
				&nbsp;&nbsp;&nbsp;
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					id="lang-close-icon"
					width="18px"
					src="/img/icons/close_black_24dp.svg"
					alt=""
					on:click={closeLanguageContainer}
				/>
			</div>
			<hr />
			<a class="lang-link" href=".">
				<p>English (UK)</p>
			</a>
			<a class="lang-link active" href=".">
				<p>Azərbaycan</p>
			</a>
			<a class="lang-link" href=".">
				<p>Deutsch</p>
			</a>
			<a class="lang-link" href=".">
				<p>Russian</p>
			</a>
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		{#if $user}
			<img
				style="border-radius: 50%;"
				class="user-icon"
				src={$user?.profilePictureUrl ?? '/img/icons/channel-logo.jpg'}
				alt=""
				on:click={toggleProfileContainer}
			/>
			<div class="profile-container" id="profile-container" style:display={displayProfileContainer}>
				<div class="popup-profile flex-div">
					<a class="shortcut-link" href="."
						><img src={$user?.profilePictureUrl ?? '/img/icons/channel-logo.jpg'} alt="" /></a
					>
					<div>
						<a href=".">{$user.name} {$user.surname}</a>
						<p>@{$user.login}</p>
						<a href="." class="account-manage">Manage your Account</a>
					</div>
				</div>

				<!-- Другие элементы контейнера -->
				<a class="profile-link" href="/user/{$user.id}"
					><img src="/img/profileContainerIcons/account_box_black_24dp.svg" alt="" />
					<p>Your channel</p>
				</a>
				<a class="profile-link" href="."
					><img src="/img/profileContainerIcons/groups_black_24dp.svg" alt="" />
					<p>Switch account</p>
				</a>
				<a class="profile-link" href="."
					><img src="/img/profileContainerIcons/wallet_black_24dp.svg" alt="" />
					<p>Purchases and membership</p>
				</a>
				<a class="profile-link" href="."
					><img src="/img/profileContainerIcons/translate_black_24dp.svg" alt="" />
					<p>Language: English</p>
				</a>
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
		<a
			class="shortcut-link"
			href="/"
			style:padding="12px 0 11px {shortcutPadding}"
			class:active-shortcut={$page.url.pathname === '/'}
			><img src="/img/icons/Home_fill.svg" alt="" />
			<p>Home</p>
		</a>

		<a
			class="shortcut-link"
			href="/subscriptions"
			style:padding="12px 0 11px {shortcutPadding}"
			class:active-shortcut={$page.url.pathname === '/subscriptions'}
			><img src="/img/icons/Video_fill.svg" alt="" />
			<p>Subsciptions</p>
		</a>

		<hr />
		<a class="shortcut-link" href="." style:padding="12px 0 11px {shortcutPadding}"
			><img src="/img/icons/history_white_24dp.svg" alt="" />
			<p>History</p>
		</a>
		<a class="shortcut-link" href="." style:padding="12px 0 11px {shortcutPadding}"
			><img src="/img/icons/play_arrow_white_48dp(2).svg" alt="" />
			<p>Your videos</p>
		</a>
		<a class="shortcut-link" href="." style:padding="12px 0 11px {shortcutPadding}"
			><img src="/img/icons/liked.svg" alt="" />
			<p>Liked videos</p>
		</a>
		<hr />
		<p class="sidebar-title">SUBSCRIPTIONS</p>
		<a class="shortcut-link" href="." style:padding="12px 0 11px {shortcutPadding}"
			><img class="subsciption-logo" src="/img/icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a class="shortcut-link" href="." style:padding="12px 0 11px {shortcutPadding}"
			><img class="subsciption-logo" src="/img/icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a class="shortcut-link" href="." style:padding="12px 0 11px {shortcutPadding}"
			><img class="subsciption-logo" src="/img/icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a class="shortcut-link" href="." style:padding="12px 0 11px {shortcutPadding}"
			><img class="subsciption-logo" src="/img/icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>

		<button class="show-more">
			<img src="/img/icons/expand_more_white_36dp.svg" alt="" />
		</button>

		<hr />
		<a class="shortcut-link" href="." style:padding="12px 0 11px {shortcutPadding}"
			><img src="/img/icons/settings_white_24dp.svg" alt="" />
			<p>Settings</p>
		</a>
		<a class="shortcut-link" href="." style:padding="12px 0 11px {shortcutPadding}"
			><img src="/img/icons/flag_white_24dp.svg" alt="" />
			<p>Report History</p>
		</a>
		<a class="shortcut-link" href="." style:padding="12px 0 11px {shortcutPadding}"
			><img src="/img/icons/help_outline_white_24dp.svg" alt="" />
			<p>Help</p>
		</a>
		<a class="shortcut-link" href="." style:padding="12px 0 11px {shortcutPadding}"
			><img src="/img/icons/info_white_24dp.svg" alt="" />
			<p>Send Feedback</p>
		</a>
	</div>
	<div class="about-container">
		<a class="about-logo" href=".">
			<img src="/img/logo-green-theme.png" alt="" />
		</a>
		<p>
			At vero eos et accusamus et iusto odio dignissimos ducimus qui bland itiis praesentium
			voluptatum <br />
			deleniti atque corrupti quos
		</p>
		<a class="about-link" href="."> Our channels </a>
		<a class="about-link" href="."> Twitter </a>
		<a class="about-link" href=".">
			Connect &nbsp;<img src="/img/icons/insta_fill.svg" alt="" />
			<img src="/img/icons/comment_fill.svg" alt="" />
		</a>
		<a class="about-link" href=".">
			About &nbsp;<span style="font-weight: 700">ZULA</span>MED
		</a>
	</div>
</div>
<!-- ------------sidebar------------ -->
<!-- ------------sidebar-small------------ -->

<div class="sidebar-mobile" style:left={sidebarMobileLeft}>
	<div class="shortcut-links">
		<a class="shortcut-link active-shortcut" href="."
			><img src="/img/icons/Home_fill.svg" alt="" />
			<p>Home</p>
		</a>
		<a class="shortcut-link" href="."
			><img src="/img/icons/Video_fill.svg" alt="" />
			<p>Subsciptions</p>
		</a>

		<hr />
		<a class="shortcut-link" href="."
			><img src="/img/icons/history_white_24dp.svg" alt="" />
			<p>History</p>
		</a>
		<a class="shortcut-link" href="."
			><img src="/img/icons/play_arrow_white_48dp(2).svg" alt="" />
			<p>Your videos</p>
		</a>
		<a class="shortcut-link" href="."
			><img src="/img/icons/liked.svg" alt="" />
			<p>Liked videos</p>
		</a>
		<hr />
		<p class="sidebar-title">SUBSCRIPTIONS</p>
		<a class="shortcut-link" href="."
			><img class="subsciption-logo" src="/img/icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a class="shortcut-link" href="."
			><img class="subsciption-logo" src="/img/icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a class="shortcut-link" href="."
			><img class="subsciption-logo" src="/img/icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a class="shortcut-link" href="."
			><img class="subsciption-logo" src="/img/icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>

		<button type="button" class="show-more">
			<img src="/img/icons/expand_more_white_36dp.svg" alt="" />
		</button>

		<hr />
		<a class="shortcut-link" href="."
			><img src="/img/icons/settings_white_24dp.svg" alt="" />
			<p>Settings</p>
		</a>
		<a class="shortcut-link" href="."
			><img src="/img/icons/flag_white_24dp.svg" alt="" />
			<p>Report History</p>
		</a>
		<a class="shortcut-link" href="."
			><img src="/img/icons/help_outline_white_24dp.svg" alt="" />
			<p>Help</p>
		</a>
		<a class="shortcut-link" href="."
			><img src="/img/icons/info_white_24dp.svg" alt="" />
			<p>Send Feedback</p>
		</a>
	</div>
	<div class="about-container">
		<a class="about-logo" href=".">
			<img src="/img/logo-green-theme.png" alt="" />
		</a>
		<p>
			At vero eos et accusamus et iusto odio dignissimos ducimus qui bland itiis praesentium
			voluptatum <br />
			deleniti atque corrupti quos
		</p>
		<a class="about-link" href="."> Our channels </a>
		<a class="about-link" href="."> Twitter </a>
		<a class="about-link" href="."> Connect </a>
		<a class="about-link" href=".">
			About &nbsp;<span style="font-weight: 700">ZULA</span>MED
		</a>
	</div>
</div>

<style src="./SidebarAndNavbar.css"></style>
