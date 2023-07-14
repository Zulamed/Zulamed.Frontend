<script lang="ts">
	import './main.css';
	import { page } from '$app/stores';
	import SidebarAndNavbar from '$lib/components/sidebarAndNavbar/sidebarAndNavbar.svelte';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import 'nprogress/nprogress.css';
	import Drawer from '$lib/components/drawer/drawer.svelte';

	NProgress.configure({
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	}
</script>

<svelte:head>
	{#if $page.url.pathname.includes('/video')}
		<link rel="stylesheet" href="/play-video.css" />
	{/if}
</svelte:head>

{#if $page.url.pathname == '/'}
	<SidebarAndNavbar />
{:else}
	<Drawer />
{/if}

<slot />
