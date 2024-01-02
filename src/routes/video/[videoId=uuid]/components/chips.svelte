<script lang="ts">
	// store can be used or slots
	let chips = [
		{
			name: 'All videos',
			active: true
		},
		{
			name: 'Author',
			active: false
		},
		{
			name: 'Viewed',
			active: false
		}
	];
	function changeActiveChip(name: string) {
		chips.forEach((chip) => {
			chip.active = chip.name === name;
		});
		chips = chips; // or chips = [...chips];
	}
</script>

<div class="scroll-chips">
	<div id="scroll-chips-overlay" class="scroll-chips-overlay">
		<div id="chips__choise" class="chips__choice">
			<!-- <button class="chip chip--active">All videos</button> -->
			<!-- <button class="chip">Author</button> -->
			<!-- <button class="chip">Related content</button> -->
			<!-- <button class="chip">Recently published</button> -->
			<!-- <button class="chip">Viewed</button> -->
			{#each chips as chip}
				<button
					class="chip"
					class:chip--active={chip.active}
					on:click={() => {
						changeActiveChip(chip.name);
					}}
				>
					{chip.name}
				</button>
			{/each}
		</div>
	</div>
</div>

<!--can be put inside a css file-->
<style>
	.scroll-chips {
		width: 395px;
		display: flex;
		align-items: center;
		margin-bottom: 24px;
		position: relative;
	}

	.chips__choice {
		display: flex;
		width: 395px;
		flex-wrap: nowrap;
		white-space: nowrap;
		gap: 11px;
		-ms-overflow-style: none;
		/* IE and Edge */
		scrollbar-width: none;
		/* Firefox */
		scroll-behavior: smooth;
		transform: translateX(0);
		transition: transform 0.1s ease;
	}

	.scroll-chips-overlay::-webkit-scrollbar {
		display: none;
	}

	.scroll-chips-overlay {
		overflow-x: scroll;
		overflow-y: hidden;
		scrollbar-width: none;
		/* -webkit-mask-image: linear-gradient( */
		/* 	to left, */
		/* 	transparent 0, */
		/* 	transparent 51px, */
		/* 	#000 77px, */
		/* 	#000 100% */
		/* ); */
	}

	.chip {
		padding: 12px 32px;
		background: transparent;
		border-radius: 11px;
		border: 1px solid #00d6ba;
		display: inline-flex;
		align-items: center;
		font-size: 14px;
		font-weight: 400;
		line-height: 12px;
		transform: translateX(0);
		color: #616163;
		cursor: pointer;
	}

	.chips__choice .chip.chip--active {
		color: rgb(var(--primary-color));
		background: #d1f3ec;
		border: 1px solid #d1f3ec;
	}

	.chips__choice::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 1027px) {
		.scroll-chips-overlay {
			width: 100%;
		}

		.scroll-chips {
			width: 100%;
			display: flex;
			align-items: center;
			margin-bottom: 24px;
			position: relative;
		}

		.scroll-chips-overlay {
			-webkit-mask-image: none !important;
			mask-image: none !important;
		}

		.chips__choice {
			min-width: 150px;
			width: 150px;
		}
	}

	@media (max-width: 600px) {
		.chip {
			padding: 12px 62px;
		}
	}
</style>
