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

{#if $page.url.pathname == '/'}
	<SidebarAndNavbar />
{:else}
	<Drawer showSearchbar={searchbar} />
{/if}

<slot />
