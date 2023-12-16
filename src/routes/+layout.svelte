<script lang="ts">
	import './main.css';
	import { page } from '$app/stores';
	import SidebarAndNavbar from '$lib/components/sidebarAndNavbar/sidebarAndNavbar.svelte';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import 'nprogress/nprogress.css';
	import Drawer from '$lib/components/drawer/drawer.svelte';
	import { beforeNavigate } from '$app/navigation';
	import type { LayoutServerData } from './$types';
	import { user } from '$lib/stores/auth';
	import ErrorToast from '$lib/components/errorToast.svelte';
	import Notification from '$lib/components/notification.svelte';
	import { subscriptions } from '$lib/stores/subscriptions';
	import { searchQuery } from '$lib/stores/search';

	let searchbarSidebar =
		$page.url.pathname == '/subscriptions' || $page.url.pathname == '/searchResult';
	let searchbar = $page.url.pathname != '/login';
	beforeNavigate((aboba) => {
		if (aboba.to?.url.pathname == '/login') {
			searchbar = false;
		}
		if (aboba.to?.url.pathname == '/subscriptions' || aboba.to?.url.pathname == '/searchResult') {
			searchbarSidebar = true;
		} else {
			searchbarSidebar = false;
		}

		if (aboba.to?.url.pathname != '/searchResult') {
			$searchQuery = '';
		}
	});

	NProgress.configure({
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	}
	export let data: LayoutServerData;
	$user = data.loggedInUser;
	$subscriptions = data.subscriptions;
</script>

<ErrorToast />
<Notification />

{#if $page.url.pathname == '/' || $page.url.pathname.includes('/user') || $page.url.pathname.includes('/subscriptions') || $page.url.pathname.includes('/history') || $page.url.pathname.includes('/liked-videos') || $page.url.pathname.includes('/searchResult') || $page.url.pathname.includes('/yourVideos') || $page.url.pathname.includes('/playlist')}
	<SidebarAndNavbar showSearchbar={searchbarSidebar} subscriptions={$subscriptions} />
{:else}
	<Drawer showSearchbar={searchbar} subscriptions={$subscriptions} />
{/if}

<slot />
