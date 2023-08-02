<script lang="ts">
	let step = 0;
	function step1() {
		if (step == 1) return;
		step++;
	}
</script>

{#if step == 0}
	aboooba
{/if}
{#if step == 1}
	2323234
{/if}
{#if step == 2}
	fghdfghghdf
{/if}
<div class="field button-field">
	<button class="next-step" on:click={step1}>Next Step</button>
</div>
