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
	import Settings from '$lib/components/settings/settings.svelte';
	let searchbar = $page.url.pathname != '/login';
	beforeNavigate((aboba) => {
		if (aboba.to?.url.pathname == '/login') {
			searchbar = false;
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
	$user = data.user;
</script>

<ErrorToast />

{#if $page.url.pathname == '/' || $page.url.pathname.includes('/user')}
	<SidebarAndNavbar />
{:else}
	<Drawer showSearchbar={searchbar} />
{/if}
{#if $page.url.pathname.includes('/settings')}
	<Settings />
{/if}
<slot />
