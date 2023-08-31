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

	let searchbarSidebar = $page.url.pathname == '/subscriptions';
	let searchbar = $page.url.pathname != '/login';
	beforeNavigate((aboba) => {
		if (aboba.to?.url.pathname == '/login') {
			searchbar = false;
		}
		if (aboba.to?.url.pathname == '/subscriptions') {
			searchbarSidebar = true;
		} else {
			searchbarSidebar = false;
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
</script>

<ErrorToast />
<Notification />

{#if $page.url.pathname == '/' || $page.url.pathname.includes('/user') || $page.url.pathname.includes('/subscriptions')}
	<SidebarAndNavbar showSearchbar={searchbarSidebar} />
{:else}
	<Drawer showSearchbar={searchbar} />
{/if}

<slot />
