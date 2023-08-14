<script lang="ts">
	export let labelText: string | undefined;
	export let inputPlaceholder: string | undefined;
	export let inputId: string | undefined;
	export let inputNote = '';
	export let inputType = 'text';
</script>

<label for={inputId}>{labelText}</label>
<p class="input-note">{inputNote}</p>
<div class="group">
	<input
		id={inputId}
		name={inputId}
		type={inputType}
		placeholder={inputPlaceholder}
		class="input"
	/>
</div>

<style>
	.input-note {
		font-size: 12px;
		color: #585858;
		font-style: normal;
		font-weight: 400;
		margin-top: 10px;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
	.group {
		position: relative;
		margin-top: 16px;
	}
	label {
		color: #000;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		cursor: pointer;
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
	}
</style>
