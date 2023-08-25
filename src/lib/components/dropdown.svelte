<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';


	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true
	});
</script>

<!-- <button type="button" use:melt={$trigger} aria-label="Update dimensions"> -->
<!-- </button> -->

<slot trigger={$trigger} name="button" />

{#if $open}
	<div class="menu" use:melt={$menu}>
		<!-- <div class="item" use:melt={$item}>About Melt UI</div> -->
        <slot name="item" item={$item}></slot>
	</div>
{/if}
