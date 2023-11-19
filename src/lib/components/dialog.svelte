<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { flyAndScale } from '$lib/animations/flyAndScale';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		closeOnOutsideClick: false,
		closeOnEscape: false
	});
</script>

<slot trigger={$trigger} name="button" class="trigger">Open Dialog</slot>

{#if open}
	<div
		class="content"
		transition:flyAndScale={{
			duration: 150,
			y: 8,
			start: 0.96
		}}
		use:melt={$content}
	>
		<slot name="content" close={$close} />
	</div>
{/if}
