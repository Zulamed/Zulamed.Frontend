<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { flyAndScale } from '$lib/animations/flyAndScale';
	import type { Writable } from 'svelte/store';
	export let dialogStore: Writable<boolean>;
	const {
		elements: { trigger, overlay, content, title, description, close },
		states: { open }
	} = createDialog({
		open: dialogStore
	});
	export let titleText: string;
	export let descriptionText: string;
	export let appealText: string;
</script>

<slot trigger={$trigger} name="button" class="trigger">Open Dialog</slot>
{#if $open}
	<div class="overlay" use:melt={$overlay} />
	<div
		class="content"
		use:melt={$content}
		transition:flyAndScale={{
			duration: 150,
			y: 8,
			start: 0.96
		}}
	>
		<h2 style="font-size: 25px; font-style: normal; " use:melt={$title}>
			{titleText}
		</h2>
		<p style="margin-top: 26px; font-size: 15px; font-style: normal; ">
			{appealText}
		</p>
		<p style="margin-top: 26px; font-size: 15px; font-style: normal; " use:melt={$description}>
			{descriptionText}
		</p>

		<div class="btn-group">
			<button class="dg-btn" use:melt={$close}>Close</button>
			<slot name="ok" close={$close} />
		</div>
	</div>
{/if}

<style>
	.content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		min-width: 400px;
		height: fit-content;
		border-radius: 27px;
		background: #54b9a2;
		border-radius: 10px;
		padding: 43px 70px;
		z-index: 101;
		color: #fff;
	}
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}
	.dg-btn {
		background-color: transparent;
		border: none;
		color: white;
		padding: 10px 25px;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
		font-size: 15px;
	}
	.btn-group {
		display: flex;
		margin-top: 43px;
		gap: 10px;
		width: 100%;
		justify-content: end;
		font-size: 15px;
	}
</style>
