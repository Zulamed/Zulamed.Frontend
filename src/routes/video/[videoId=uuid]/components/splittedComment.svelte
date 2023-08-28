<script lang="ts">
	export let commentContents: string[];

	export let commentTextClasses = '';
	export let showMoreClasses = '';
	let showToggle = false;
	let showText = 'Show more';

	$: spans =
		commentContents.length > 5 && !showToggle ? commentContents.slice(0, 5) : commentContents;
</script>

{#each spans as commentContent}
	<span class={commentTextClasses}>{commentContent == "" ? "\xa0" : commentContent}</span>
{/each}

{#if commentContents.length > 5}
	<button
        class={showMoreClasses}
		on:click={() => {
			showToggle = !showToggle;
			showText = showToggle ? 'Show less' : 'Show more';
		}}>{showText}</button
	>
{/if}
