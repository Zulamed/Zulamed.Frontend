<script lang="ts">
	import './main.css';
	import { page } from '$app/stores';
	import SidebarAndNavbar from '$lib/components/sidebarAndNavbar/sidebarAndNavbar.svelte';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import 'nprogress/nprogress.css';
	import Drawer from '$lib/components/drawer/drawer.svelte';
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';

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
		<!-- <link rel="stylesheet" href="/SidebarAndNavbar.css" /> -->
	{:else if $page.url.pathname.includes('/video')}
		<link rel="stylesheet" href="/play-video.css" />
	{/if}
</svelte:head>

{#if $page.url.pathname == '/'}
	<SidebarAndNavbar />
{:else}
	<Drawer />
{/if}

<slot />

<style>
	.large-container {
		padding-left: 4%;
	}
	@media (max-width: 1440px) {
		.large-container {
			padding-left: 6%;
		}
	}
	@media (max-width: 1238px) {
		.large-container {
			padding-left: 8%;
		}
	}
	@media (max-width: 900px) {
		.large-container {
			padding-left: 0;
			padding-right: 0;
		}
	}
</style>
