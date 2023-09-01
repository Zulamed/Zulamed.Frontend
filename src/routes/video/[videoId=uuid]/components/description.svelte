<script lang="ts">
	import { getRelativeTime } from '$lib/utils/relativeTime';
	import Tooltip from '$lib/components/tooltip.svelte';
	import { melt } from '@melt-ui/svelte';

	export let textContent: string;
	export let views: number;
	export let date: Date;
	const originalText = textContent;
	let trimmedText = originalText.substring(0, 30) + ' ...more';
	// textContent = trimmedText;

	// let text: string;
	let height = '64px';
	const showMore = () => {
		if (height === 'auto') return;
		height = 'auto';
	};

	const showLess = () => {
		height = '64px';
	};

	function tooltipFormatDate(date: any) {
		const options = { year: 'numeric', month: 'short', day: 'numeric' };
		const formattedDate = date.toLocaleDateString('en-US', options);
		return formattedDate;
	}

	$: text = height === '64px' ? trimmedText : originalText;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={showMore} id="play-video-description" class="play-video-description" style:height>
	<div class="play-video-stats">
		<Tooltip placement="bottom">
			<div use:melt={trigger} slot="button" let:trigger style="display: flex;">
				<p>{views} views</p>
				<p>{height == '64px' ? getRelativeTime(date) : tooltipFormatDate(date)}</p>
			</div>
			<p slot="content">{views} views · {tooltipFormatDate(date)}</p>
		</Tooltip>
		<span>#cardio #operation</span>
	</div>

	<p class="description-text">
		{text}
	</p>
	<br />
	{#if height === 'auto'}
		<button class="show-less" on:click|stopPropagation={showLess}>Show less</button>
	{/if}
</div>

<style>
	.description-text {
		white-space: pre-line;
	}
	.show-less {
		all: unset;
		background-color: transparent;
		transition: background 0.1s ease;
	}
	.show-less:hover {
		color: #49a08c;
		user-select: none;
	}
	.show-less:active {
		background-color: #30706141;
	}
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
	.play-video-description:hover {
		background: #ccddd9;
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
		.play-video-description:hover {
			background: #ebf8f5;
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
