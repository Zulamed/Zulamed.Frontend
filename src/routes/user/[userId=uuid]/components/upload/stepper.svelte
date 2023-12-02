<script lang="ts">
	import { createTabs, melt } from '@melt-ui/svelte';
	import VideoInformation from './videoInformation.svelte';
	import AccessInformation from './accessInformation.svelte';
    import type * as UpChunk from "@mux/upchunk";
	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'tab-1'
	});
	let uploadTab;
	const triggers = [
		{ id: 'tab-1', title: 'Information' },
		{ id: 'tab-2', title: 'Addition' },
		{ id: 'tab-3', title: 'Access' }
	];

    export let uploadObject : UpChunk.UpChunk;
    let uploadProgress : number | string = 0;

    uploadObject.on('progress', (progress) => {
        uploadProgress = progress.detail;
    });

    uploadObject.on('success', () => {
        uploadProgress = 'done';
    });

    $: progress = Math.trunc(uploadProgress as number);

</script>

<!-- <div class="tabs-container">
	<div use:melt={$root} class="tab-content">
		<div use:melt={$list} class="tabs-btns" aria-label="Manage your account">
			<div class="tabs-padding">
				{#each triggers as triggerItem}
					<button use:melt={$trigger(triggerItem.id)} class="tab-btn">
						{triggerItem.title}
						{#if $value === triggerItem.id}
							<div
								in:send={{ key: 'trigger' }}
								out:receive={{ key: 'trigger' }}
								class="tabs-underline"
							/>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div> -->
<div class="container">
	<ul class="progressbar">
		{#each triggers as triggerItem}
			<li
				bind:this={uploadTab}
				class:active={$value == triggerItem.id}
				class={$value == triggerItem.id ? 'filled' : 'empty'}
				use:melt={$trigger(triggerItem.id)}
			>
				{triggerItem.title}
				<!-- {#if $value === triggerItem.id}
					<div in:send={{ key: 'trigger' }} out:receive={{ key: 'trigger' }} />
				{/if} -->
			</li>
		{/each}
	</ul>
    {#if uploadProgress === 'done'}
        <div>Upload finished! Being processed...</div>
    {:else}
        <div>Upload progress: {progress}</div>
    {/if}
</div>

<div use:melt={$content('tab-1')} class="tab-content-container"><VideoInformation /></div>
<div use:melt={$content('tab-2')} class="tab-content-container">Test</div>
<div use:melt={$content('tab-3')} class="tab-content-container"><AccessInformation /></div>

<style>
	.container {
		width: 100%;
		margin-top: 15px;
	}
	.progressbar {
		display: flex;
		justify-content: center;
	}
	.progressbar li {
		list-style: none;
		display: inline-block;
		width: 30.33%;
		position: relative;
		text-align: center;
		cursor: pointer;
		color: #a1a1a1;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
	}

	.progressbar .active {
		color: #54b9a2;
	}

	.progressbar li:hover {
		background-color: #54b9a16b;
		border-radius: 14px;
	}

	.progressbar .empty:before {
		content: '';
		width: 20px;
		height: 20px;
		line-height: 30px;
		border: 2px solid #54b9a2;
		border-radius: 100%;
		display: flex;
		text-align: center;
		margin: 0 auto 10px auto;
		background-color: #fff;
	}

	.progressbar .filled:before {
		content: '';
		width: 20px;
		height: 20px;
		line-height: 30px;
		border: 2px solid #54b9a2;
		border-radius: 100%;
		display: flex;
		text-align: center;
		margin: 0 auto 10px auto;
		background-color: #54b9a2;
	}

	.progressbar li:after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		background-color: #54b9a2;
		top: 22%;
		left: -50%;
		z-index: -1;
	}
	.progressbar li:first-child:after {
		content: none;
	}
	.progressbar li.active {
		color: #54b9a2;
	}
	.progressbar li.active:before {
		border-color: #54b9a2;
		background-color: #54b9a2;
	}
	.progressbar li.active + li:after {
		background-color: #54b9a2;
	}
</style>
