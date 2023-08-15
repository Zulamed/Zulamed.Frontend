<script lang="ts" context="module">
	export type ToastData = {
		fieldName: string;
		error: string;
	};

	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	export const addToast = helpers.addToast;
</script>

<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
</script>

<div class="salam" use:portal>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			class="salam2"
		>
			<div class="salam3">
				<div>
					<h3 use:melt={$title(id)} class="salam4">
						{data.fieldName}
						<span>AHHHHHHHHHHHHHHHHH</span>
					</h3>
					<div use:melt={$description(id)}>
						{data.error}
					</div>
				</div>
				<button
					use:melt={$close(id)}
					class="salam5"
				>
					<!-- <X class="square-4" /> -->
				</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.salam {
		display: flex;
		position: fixed;
		right: 0;
		bottom: 0;
		z-index: 50;
		margin: 1rem;
		flex-direction: column;
		gap: 0.5rem;
		align-items: flex-end;
	}
	.salam2 {
		border-radius: 0.5rem;
		color: #ffffff;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
	.salam3 {
		display: flex;
		position: relative;
		padding: 1.25rem;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
		width: 24rem;
		max-width: calc(100vw-2rem);
	}

	.salam4 {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		font-weight: 600;
	}

	.salam5 {
		display: grid;
		position: absolute;
		top: 1rem;
		right: 1rem;
		place-items: center;
		border-radius: 9999px;
	}
</style>
