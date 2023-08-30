<script lang="ts" context="module">
	export type ToastData = {
		title: string;
		message?: string;
	};

	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>({
		closeDelay: 2500
	});

	export const addNotification = helpers.addToast;
</script>

<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
</script>

<div class="toast-container" use:portal>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, y: '100%' }}
			out:fly={{ duration: 150, y: '100%' }}
			class="toast-inner"
		>
			<div class="toast-content">
				<div>
					<h3 use:melt={$title(id)} class="toast-fieldname">
						{data.title}
						<span />
					</h3>
					{#if data.message}
						<div use:melt={$description(id)}>
							{data.message}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 3;
		margin: 1rem;
		flex-direction: column;
		gap: 0.5rem;
		align-items: flex-start;
	}
	.toast-inner {
		border-radius: 0.5rem;
		color: #ffffff;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
	.toast-content {
		display: flex;
		position: relative;
		padding: 19px;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
		background: #1b1b1b;
		border-radius: 10px;
		min-width: 231px;
	}

	.toast-fieldname {
		display: flex;
		align-items: center;
		font-weight: 500;
		font-size: 15px;
	}

	.toast-close-btn:hover {
		background-color: #b4b4b469;
	}
	.toast-close-btn:active {
		background-color: #b4b4b469;
	}
	@media (max-width: 768px) {
		.toast-container {
			bottom: 0;
			left: 0;
		}
		.toast-content {
			padding: 14px;
		}
		.toast-fieldname {
			font-size: 14px;
		}
	}
</style>
