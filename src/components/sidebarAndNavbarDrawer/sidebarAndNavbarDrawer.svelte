<script lang="ts">
	import { onMount } from 'svelte';
	import { scripts } from './play-videoDrawer';
	import './play-videoDrawer.css';
	onMount(scripts);
</script>

<!-- ============NAVIGATION============ -->
<div class="overlay" />
<form action="" class="flex-div" id="search-mobile-form">
	<div class="searchbar-mobile flex-div">
		<input placeholder="Search..." name="" type="text" />
	</div>
</form>
<nav class="flex-div" id="navigation">
	<div class="nav-left flex-div">
		<div class="menu-icon-background-small flex-div">
			<img class="menu-icon" src="./img/icons/menu.svg" alt="" />
		</div>
		<div class="menu-icon-background flex-div">
			<img class="menu-icon" src="./img/icons/menu.svg" alt="" />
		</div>
		<a class="flex-div" href="index.html"
			><img class="logo" src="./img/logo-white-theme.png" alt="" /></a
		>
	</div>
	<div class="nav-center flex-div">
		<form class="searchbar flex-div" action="">
			<div class="searchbox">
				<input type="text" placeholder="Search..." />
			</div>
			<button class="search-button" type="submit"
				><img src="./img/icons/search_white_24dp.svg" alt="" /></button
			>
		</form>
	</div>
	<div class="nav-right flex-div">
		<div class="flex-div lang-icon">
			<img width="20px" src="./img/flagIcons/az.svg" alt="" />
			<img width="20px" src="./img/icons/dropdown.svg" alt="" />
		</div>

		<button
			form="search-mobile-form"
			id="search-mobile"
			type="button"
			class="search-mobile flex-div"
		>
			<img src="./img/icons/Search_light.svg" alt="" />
		</button>

		<div class="language-container" id="language-container">
			<div style="padding-left: 8px; height: 40px;" class="flex-div">
				<h5>Choose your language</h5>
				&nbsp;&nbsp;&nbsp;
				<img id="lang-close-icon" width="18px" src="./img/icons/close_black_24dp.svg" alt="" />
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

		<img class="user-icon" src="./img/icons/User_circle.png" alt="" />
		<div class="profile-container" id="profile-container">
			<div class="popup-profile flex-div">
				<a href="."><img src="./img/icons/user.png" alt="" /></a>
				<div>
					<a href=".">Username</a>
					<p class="email">@username</p>
					<a href="." class="account-manage">Manage your Account</a>
				</div>
			</div>

			<!-- Другие элементы контейнера -->
			<a class="profile-link" href="."
				><img src="./img//profileContainerIcons/account_box_black_24dp.svg" alt="" />
				<p>Your channel</p>
			</a>
			<a class="profile-link" href="."
				><img src="./img//profileContainerIcons/groups_black_24dp.svg" alt="" />
				<p>Switch account</p>
			</a>
			<a class="profile-link" href="."
				><img src="./img//profileContainerIcons/wallet_black_24dp.svg" alt="" />
				<p>Purchases and membership</p>
			</a>
			<a class="profile-link" href="."
				><img src="./img//profileContainerIcons/translate_black_24dp.svg" alt="" />
				<p>Language: English</p>
			</a>
			<a class="profile-link" href="."
				><img src="./img//profileContainerIcons/settings_black_24dp.svg" alt="" />
				<p>Settings</p>
			</a>
			<a class="profile-link" href="."
				><img src="./img//profileContainerIcons/logout_black_24dp.svg" alt="" />
				<p>Sign out</p>
			</a>
		</div>
	</div>
</nav>

<!-- ============NAVIGATION END============ -->
<!-- ============SIDEBAR============ -->

<div class="sidebar">
	<div class="shortcut-links">
		<a id="shortcut-link" class="active-shortcut" href="."
			><img src="./img//icons/Home_fill.svg" alt="" />
			<p>Home</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/Video_fill.svg" alt="" />
			<p>Subsciptions</p>
		</a>

		<hr />
		<a id="shortcut-link" href="."
			><img src="./img//icons/history_white_24dp.svg" alt="" />
			<p>History</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/play_arrow_white_48dp(2).svg" alt="" />
			<p>Your videos</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/liked.svg" alt="" />
			<p>Liked videos</p>
		</a>
		<hr />
		<p class="sidebar-title">SUBSCRIPTIONS</p>
		<a href="."
			><img class="subsciption-logo" src="./img//icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a href="."
			><img class="subsciption-logo" src="./img//icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a href="."
			><img class="subsciption-logo" src="./img//icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a href="."
			><img class="subsciption-logo" src="./img//icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>

		<div class="show-more">
			<img src="./img/icons/expand_more_white_36dp.svg" alt="" />
		</div>

		<hr />
		<a id="shortcut-link" href="."
			><img src="./img//icons/settings_white_24dp.svg" alt="" />
			<p>Settings</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/flag_white_24dp.svg" alt="" />
			<p>Report History</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/help_outline_white_24dp.svg" alt="" />
			<p>Help</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/info_white_24dp.svg" alt="" />
			<p>Send Feedback</p>
		</a>
	</div>
	<div class="about-container">
		<a class="about-logo" href=".">
			<img src="./img/logo-green-theme.png" alt="" />
		</a>
		<p>
			At vero eos et accusamus et iusto odio dignissimos ducimus qui bland itiis praesentium
			voluptatum <br />
			deleniti atque corrupti quos
		</p>
		<a class="about-link" href="."> Our channels </a>
		<a class="about-link" href="."> Twitter </a>
		<a class="about-link" href=".">
			Connect &nbsp;<img src="./img/icons/insta_fill.svg" alt="" />
			<img src="./img/icons/comment_fill.svg" alt="" />
		</a>
		<a class="about-link" href=".">
			About &nbsp;<span style="font-weight: 700;">ZULA</span>MED
		</a>
	</div>
</div>

<!-- ============SIDEBAR END============ -->
<!-- ------------sidebar-small------------ -->

<div class="sidebar-mobile">
	<div class="shortcut-links">
		<a id="shortcut-link" class="active-shortcut" href="."
			><img src="./img//icons/Home_fill.svg" alt="" />
			<p>Home</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/Video_fill.svg" alt="" />
			<p>Subsciptions</p>
		</a>

		<hr />
		<a id="shortcut-link" href="."
			><img src="./img//icons/history_white_24dp.svg" alt="" />
			<p>History</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/play_arrow_white_48dp(2).svg" alt="" />
			<p>Your videos</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/liked.svg" alt="" />
			<p>Liked videos</p>
		</a>
		<hr />
		<p class="sidebar-title">SUBSCRIPTIONS</p>
		<a href="."
			><img class="subsciption-logo" src="./img//icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a href="."
			><img class="subsciption-logo" src="./img//icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a href="."
			><img class="subsciption-logo" src="./img//icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>
		<a href="."
			><img class="subsciption-logo" src="./img//icons/user.png" alt="" />
			<p>Lorem Ipsum</p>
		</a>

		<div class="show-more">
			<img src="./img/icons/expand_more_white_36dp.svg" alt="" />
		</div>

		<hr />
		<a id="shortcut-link" href="."
			><img src="./img//icons/settings_white_24dp.svg" alt="" />
			<p>Settings</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/flag_white_24dp.svg" alt="" />
			<p>Report History</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/help_outline_white_24dp.svg" alt="" />
			<p>Help</p>
		</a>
		<a id="shortcut-link" href="."
			><img src="./img//icons/info_white_24dp.svg" alt="" />
			<p>Send Feedback</p>
		</a>
	</div>
	<div class="about-container">
		<a class="about-logo" href=".">
			<img src="./img/logo-green-theme.png" alt="" />
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
			About &nbsp;<span style="font-weight: 700;">ZULA</span>MED
		</a>
	</div>
</div>

<!-- ------------sidebar-small------------ -->
