<script lang="ts">
	import { page } from '$app/stores';
	import SidebarAndNavbar from '$lib/components/sidebarAndNavbar/sidebarAndNavbar.svelte';
	import SidebarAndNavbarDrawer from '$lib/components/sidebarAndNavbarDrawer/sidebarAndNavbarDrawer.svelte';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import 'nprogress/nprogress.css';

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
	{#if $page.url.pathname == '/'}
		<link rel="stylesheet" href="/style.css" />
		<link rel="stylesheet" href="/SidebarAndNavbar.css" />
	{:else if $page.url.pathname.includes('/video')}
		<link rel="stylesheet" href="/play-video.css" />
		<link rel="stylesheet" href="/play-videoDrawer.css" />
	{:else}
		<link rel="stylesheet" href="/play-videoDrawer.css" />
	{/if}
</svelte:head>

{#if $page.url.pathname == '/'}
	<SidebarAndNavbar />
{:else}
	<SidebarAndNavbarDrawer />
{/if}

<div class="container">
	<slot />
</div>
