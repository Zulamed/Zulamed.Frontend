<script lang="ts">
	export let textContent: string;
	export let views: number;
	const originalText = textContent;
	let trimmedText = originalText.substring(0, 30) + '... show more';
	// textContent = trimmedText;

	// let text: string;
	let height = '64px';

	const showMore = () => {
		if (height === 'auto') return;
		height = 'auto';
	};

	const showLess = () => {
		height = '64px';
		console.log(height);
	};

	$: text = height === '64px' ? trimmedText : originalText;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={showMore} id="play-video-description" class="play-video-description" style:height>
	<div class="play-video-stats">
		<p>{views} views</p>
		<p>5 days ago</p>
		<span>#cardio #operation</span>
	</div>

	<p class="description-text">
		{text}
	</p>
	{#if height === 'auto'}
		<button style="all:unset" on:click|stopPropagation={showLess}>show less</button>
	{/if}
</div>

<style>
	.play-video-description {
		min-height: 64px;
		height: 64px;
		width: 100%;
		background: #ebf8f5;
		border-radius: 18px;
		padding: 8px 19px;
		overflow: hidden;
		cursor: pointer;
		margin-bottom: 14px;
	}

	.play-video-stats {
		width: 100%;
		display: flex;
		margin-bottom: 14px;
	}

	.play-video-stats p {
		margin-right: 10px;
		font-weight: 600;
		font-size: 16px;
		line-height: 19px;
		color: #000000;
	}

	.play-video-stats span {
		margin-right: 10px;
		font-weight: 500;
		font-size: 16px;
		line-height: 19px;
		color: #616163;
	}

	@media (max-width: 600px) {
		.play-video-description {
			margin-bottom: 37px;
		}
		.play-video-stats p,
		.play-video-stats span {
			font-size: 13px;
			line-height: 16px;
		}
	}

	@media (max-width: 364px) {
		.play-video-stats p,
		.play-video-stats span {
			font-size: 11px;
			line-height: 18px;
		}
	}
</style>
