<script lang="ts">
	import { page } from '$app/stores';
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
</script>

<svelte:head>
	<title>Error {$page.status} - ZulaMED</title>
</svelte:head>

<div class="container">
	<a href="/">
		<img width="300px" style="margin-bottom: 15px;" src="/img/logo-white-theme.png" alt="" />
	</a>
	<h1 style="margin-bottom: 10px;">Whoops! {$page.error?.message}</h1>
	<p>Something went wrong.</p>
</div>

<style>
	.go-home {
		all: unset;
		padding: 14px 62px;
		background: #54b9a2;
		color: #fff;
		text-align: center;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		border-radius: 24px;
		width: fit-content;
		cursor: pointer;
		position: relative;
		transition: background 0.2s;
	}
	.go-home:hover {
		background: #489785;
	}
	.container {
		margin-top: 0px !important;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
