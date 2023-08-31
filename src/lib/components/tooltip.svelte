<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte';
	import type { FloatingConfig } from '@melt-ui/svelte/internal/actions';
	import { fade } from 'svelte/transition';

	export let placement: FloatingConfig['placement'] = 'top';

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: placement
		},
		openDelay: 1,
		closeOnPointerDown: true,
		forceVisible: true
	});
</script>

<slot trigger={$trigger} name="button" />

{#if $open}
	<div use:melt={$content} transition:fade={{ duration: 100 }} class="tooltip">
		<slot class="salam" name="content" />
	</div>
{/if}

<style>
	.tooltip {
		background-color: #3b3b3bdc;
		padding: 7px 15px;
		color: #fff;
		font-size: 12px;
		border-radius: 5px;
	}
</style>
