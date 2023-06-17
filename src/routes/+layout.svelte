<script lang="ts">
	import { page } from '$app/stores';
	import SidebarAndNavbar from '../components/sidebarAndNavbar/sidebarAndNavbar.svelte';
	import SidebarAndNavbarDrawer from '../components/sidebarAndNavbarDrawer/sidebarAndNavbarDrawer.svelte';
</script>

<svelte:head>
	{#if $page.url.pathname == '/'}
		<link rel="stylesheet" href="style.css" />
		<link rel="stylesheet" href="SidebarAndNavbar.css" />
	{:else if $page.url.pathname == '/video'}
		<link rel="stylesheet" href="play-video.css" />
		<link rel="stylesheet" href="play-videoDrawer.css" />
	{:else}
		<link rel="stylesheet" href="play-videoDrawer.css" />
	{/if}
</svelte:head>

{#if $page.url.pathname == '/'}
	<SidebarAndNavbar />
{:else}
	<SidebarAndNavbarDrawer />
{/if}

<slot />
