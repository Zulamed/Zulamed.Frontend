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
	} = createToaster<ToastData>({
		closeDelay: 2000
	});

	export const addToast = helpers.addToast;
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
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			class="toast-inner"
		>
			<div class="toast-content">
				<div>
					<h3 use:melt={$title(id)} class="toast-fieldname">
						{data.fieldName}
						<span />
					</h3>
					<div use:melt={$description(id)}>
						{data.error}
					</div>
				</div>
				<button use:melt={$close(id)} class="toast-close-btn">
					<svg
						width="25"
						height="25"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13.5 4.5L4.5 13.5"
							stroke="#ffffff"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M4.5 4.5L13.5 13.5"
							stroke="#ffffff"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		display: flex;
		position: fixed;
		right: 0;
		bottom: 0;
		z-index: 3;
		margin: 1rem;
		flex-direction: column;
		gap: 0.5rem;
		align-items: flex-end;
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
		background: #b94747;
		border-radius: 10px;
	}

	.toast-fieldname {
		display: flex;
		align-items: center;
		font-weight: 500;
		font-size: 15px;
	}

	.toast-close-btn {
		all: unset;
		display: grid;
		padding: 3px;
		position: absolute;
		top: 5px;
		right: 5px;
		place-items: center;
		border-radius: 0;
		cursor: pointer;
	}
	.toast-close-btn:hover {
		background-color: #b4b4b469;
	}
	.toast-close-btn:active {
		background-color: #b4b4b469;
	}
	@media (max-width: 768px) {
		.toast-container {
			top: 0;
			right: 0;
			height: fit-content;
		}
		.toast-content {
			padding: 14px;
		}
		.toast-fieldname {
			font-size: 14px;
		}
		.toast-close-btn {
			top: 0rem;
			right: 0rem;
		}
	}
</style>
