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
			name: 'Related content',
			active: false
		},
		{
			name: 'Recently published',
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
	let prevVisible = false;
	let nextVisible = true;
	let maskImagePosition = 'left';
	let transform = 'translateX(0px)';
	$: {
		if (transform == 'translateX(0px)') {
			prevVisible = false;
			nextVisible = true;
			maskImagePosition = 'left';
		} else if (transform == 'translateX(-368px)') {
			prevVisible = true;
			nextVisible = false;
			maskImagePosition = 'right';
		}
	}
</script>

<div class="scroll-chips">
	<div
		id="scroll-chips-overlay"
		class="scroll-chips-overlay"
		style:mask-image="linear-gradient(to {maskImagePosition}, transparent 0, transparent 51px, #000
		77px, #000 100%)"
	>
		<div id="chips__choise" class="chips__choice" style:transform>
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
	{#if prevVisible}
		<button
			id="chips-prev"
			class="control prev"
			on:click={() => {
				transform = 'translateX(0px)';
			}}
		>
			<img src="/img/icons/arrow_back_ios_black_24dp.svg" alt="" />
		</button>
	{/if}
	{#if nextVisible}
		<button
			id="chips-next"
			class="control next"
			on:click={() => {
				transform = 'translateX(-368px)';
			}}
		>
			<img src="/img/icons/arrow_forward_ios_black_24dp.svg" alt="" />
		</button>
	{/if}
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

	#chips-prev {
		display: flex;
		left: 0;
	}

	#chips-next {
		display: flex;
		right: 0;
	}

	.chips__choice .chip.chip--active {
		color: rgb(var(--primary-color));
		background: #d1f3ec;
		border: 1px solid #d1f3ec;
	}

	.chips__choice::-webkit-scrollbar {
		display: none;
	}

	.control {
		all: unset;
		position: absolute;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		border-radius: 50%;
		justify-content: center;
		background-color: white;
	}

	.control:hover {
		background-color: #5a5a5a36;
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
		#chips-next,
		#chips-prev {
			display: none;
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
