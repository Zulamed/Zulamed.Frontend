<script lang="ts">
	import { createCombobox, melt, type ComboboxFilterFunction } from '@melt-ui/svelte';
	export let labelText: string;
	export let inputPlaceholder: string;
	export let obligatoryField = false;
	export let inputNote = '';
	interface Book {
		author: string;
		title: string;
		disabled: boolean;
	}

	let books: Book[] = [
		{
			author: 'Harper Lee',
			title: 'To Kill a Mockingbird',
			disabled: false
		},
		{
			author: 'Lev Tolstoy',
			title: 'War and Peace',
			disabled: false
		},
		{
			author: 'Fyodor Dostoyevsy',
			title: 'The Idiot',
			disabled: true
		},
		{
			author: 'Oscar Wilde',
			title: 'A Picture of Dorian Gray',
			disabled: false
		},
		{
			author: 'George Orwell',
			title: '1984',
			disabled: false
		},
		{
			author: 'Jane Austen',
			title: 'Pride and Prejudice',
			disabled: false
		},
		{
			author: 'Marcus Aurelius',
			title: 'Meditations',
			disabled: false
		},
		{
			author: 'Fyodor Dostoevsky',
			title: 'The Brothers Karamazov',
			disabled: false
		},
		{
			author: 'Lev Tolstoy',
			title: 'Anna Karenina',
			disabled: false
		},
		{
			author: 'Fyodor Dostoevsky',
			title: 'Crime and Punishment',
			disabled: false
		}
	];

	const filterFunction: ComboboxFilterFunction<Book> = ({ itemValue, input }) => {
		// Example string normalization function. Replace as needed.
		const normalize = (str: string) => str.normalize().toLowerCase();
		const normalizedInput = normalize(input);
		return (
			normalizedInput === '' ||
			normalize(itemValue.title).includes(normalizedInput) ||
			normalize(itemValue.author).includes(normalizedInput)
		);
	};

	const {
		elements: { input, menu, option, label },
		states: { open, inputValue, isEmpty }
	} = createCombobox({
		filterFunction,
		forceVisible: true
	});

	// i don't know why but isEmpty is always true when the input is empty when first rendered
	$: emptyBug = $isEmpty && $inputValue.value === '';

	export let customOption = false;
</script>

<!-- eslint-disable-next-line svelte/valid-compile -->
<label use:melt={$label}
	>{labelText}
	{#if obligatoryField == true}
		<span class="obligatory-field">*</span>
	{/if}
</label>
<p class="input-note">{inputNote}</p>
<div class="group-less">
	<input class="input" use:melt={$input} placeholder={inputPlaceholder} />
	<div class="chevron-wrapper">
		{#if $open}
			<img class="chevron" src="img/icons/Expand_up.png" alt="" />
		{:else}
			<img class="chevron" src="img/icons/Expand_down.png" alt="" />
		{/if}
	</div>
</div>

<div class="menu-container" use:melt={$menu}>
	{#if $open}
		<ul class="menu">
			{#if $inputValue.value !== '' && customOption}
				<li
					use:melt={$option({
						value: {
							author: $inputValue.value,
							title: 'custom',
							disabled: false
						},
						label: $inputValue.value,
						disabled: false
					})}
					class="item"
				>
					<div>
						<span>{$inputValue.value}</span>
						<span class="author">Custom</span>
					</div>
				</li>
			{/if}
			{#each books as book, index (index)}
				<li
					use:melt={$option({
						value: book,
						label: book.title,
						disabled: book.disabled
					})}
					class="item"
				>
					<div>
						<span>{book.title}</span>
						<span class="author">{book.author}</span>
					</div>
				</li>
			{/each}
			{#if $isEmpty && !emptyBug}
				<li class="item">No results found</li>
			{/if}
		</ul>
	{/if}
</div>

<style>
	.chevron {
		position: absolute;
		top: 50%;
		right: 2%;
		transform: translateY(-50%);
	}
	.group {
		position: relative;
		margin-top: 16px;
	}
	.group-less {
		position: relative;
		margin-top: 16px;
	}
	.input-note {
		font-size: 12px;
		color: #585858;
		font-style: normal;
		font-weight: 400;
		margin-top: 10px;
	}
	.input {
		font-family: 'Montserrat', sans-serif;
		display: flex;
		height: 60px;
		width: 100%;
		outline: none;
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;
		border: 0.5px solid #d2d0d0;
		background-color: transparent;
		font-size: 16px;
		transition: all 0.2s ease;
	}
	.input:focus {
		border: 0.5px solid #00a790;
	}
	.obligatory-field {
		color: red;
	}
	label {
		cursor: pointer;
		color: #000;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		margin-bottom: 10px;
	}

	.menu-container {
		display: flex;
		flex-direction: column;

		z-index: 10;
		max-height: 300px;

		overflow: hidden;

		border-radius: 0.375rem;
	}

	.menu {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		max-height: 100%;

		overflow-y: auto;

		background-color: whitesmoke;

		padding: 0.5rem;
	}

	.item {
		position: relative;
		cursor: pointer;
		border-radius: 0.375rem;

		padding: 0.25rem 2rem 0.25rem 1rem;

		color: rgb(var(--color-neutral-800) / 1);
	}

	.item[data-highlighted] {
		background-color: rgb(var(--color-magnum-100) / 1);

		color: rgb(var(--color-magnum-700) / 1);
	}

	.item[data-disabled] {
		opacity: 0.5;
	}

	.item .author {
		display: block;

		font-size: 0.875rem;
		line-height: 1.25rem;

		opacity: 0.7;
	}

	.check {
		position: absolute;
		left: 0.5rem;
		top: 50%;
		color: rgb(255, 255, 255);
		translate: 0 calc(-50% + 1px);
	}
	@media (max-width: 1280px) {
		label {
			font-size: 15px;
		}
		.group {
			margin-top: 10px;
		}
		.input {
			height: 50px;
			font-size: 15px;
			padding: 0 12px;
		}
	}
	@media (max-width: 1024px) {
		label {
			font-size: 13px;
		}
		.group {
			margin-top: 10px;
		}
		.input {
			height: 45px;
			font-size: 13px;
			padding: 0 6px;
		}
	}
	@media (max-width: 768px) {
		label {
			font-size: 14px;
		}
		.input {
			padding: 0 14px 0 14px;
			font-size: 15px;
			height: 60px;
		}
	}
</style>
