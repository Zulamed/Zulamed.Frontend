<script lang="ts">
	export let labelText: string | undefined;
	export let inputPlaceholder = '';
	export let inputId: string | undefined;
	export let inputType = 'text';
	function preventDeletion(event: KeyboardEvent) {
		const input = document.getElementById('username') as HTMLInputElement;
		const inputValue = input.value;
		const cursorPosition = input.selectionStart;
		if (event.key === 'Backspace' && cursorPosition === 1 && inputValue.charAt(0) === '@') {
			event.preventDefault();
		}
	}
	function preventInsertion() {
		const input = document.getElementById('username') as HTMLInputElement;
		const inputValue = input.value;

		if (inputValue.charAt(0) !== '@') {
			input.value = '@';
		}
	}
</script>

<label class="large-label" for={inputId}>{labelText}</label>
<div class="group">
	<input
		on:keydown={preventDeletion}
		on:input={preventInsertion}
		value="@"
		id={inputId}
		name={inputId}
		type={inputType}
		placeholder={inputPlaceholder}
		class="input"
	/>
</div>

<style>
	.large-label {
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		cursor: pointer;
	}
	.group {
		position: relative;
		margin-top: 16px;
	}
	.input {
		height: 100%;
		width: 100%;
		border: none;
		font-size: 16px;
		font-weight: 400;
	}

	.input {
		height: 60px;
		outline: none;
		padding: 0 16px;
		border: 0.5px solid #d2d0d0;
		background-color: transparent;
		font-size: 16px;
		transition: all 0.2s ease;
		font-family: 'Montserrat', sans-serif;
	}
	.input:focus {
		border: 0.5px solid #00a790;
	}

	@media (max-width: 1280px) {
		label {
			font-size: 15px;
		}
		.input {
			padding: 0 5px 0 12px;
			font-size: 15px;
			height: 50px;
		}
		.group {
			margin-top: 10px;
		}
	}
	@media (max-width: 1024px) {
		label {
			font-size: 13px;
		}
		.input {
			height: 45px;
			padding: 0 0 0 6px;
			font-size: 13px;
		}

		.group {
			margin-top: 10px;
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
		.large-label {
			font-size: 14px;
		}
	}
</style>
