<script lang="ts">
	export let textContent: string;
	const originalText = textContent;
	let trimmedText = textContent.substring(0, 30) + '... Read more';
	textContent = trimmedText;

	let height = '64px';
	const toggle = () => {
		if (height === '64px') {
			height = 'auto';
			textContent = originalText;
		} else {
			height = '64px';
			textContent = trimmedText;
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={toggle} id="play-video-description" class="play-video-description" style:height>
	<div class="play-video-stats">
		<p>304k views</p>
		<p>5 days ago</p>
		<span>#cardio #operation</span>
	</div>

	<p class="description-text">
		{textContent}
	</p>
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
