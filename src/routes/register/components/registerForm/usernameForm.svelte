<script lang="ts">
	export let labelText: string | undefined;
	export let inputPlaceholder = '';
	export let inputId: string | undefined;
	let usernameError = false;
</script>

<label class="large-label" for={inputId}>{labelText}</label>
<div class="group">
	<input id={inputId} name={inputId} type="text" placeholder={inputPlaceholder} class="input" />
	<p class="input-symbol">@</p>
</div>
{#if usernameError == true}
	<p class="error-message">Error message</p>
{/if}

<style>
	.input-symbol {
		position: absolute;
		top: 48%;
		left: 16px;
		transform: translateY(-50%);
		color: #000;
		font-size: 16px;
		font-weight: 400;
	}
	.error-message {
		margin-top: 6px;
		color: #ff3e24;
		font-family: 'Montserrat';
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
	}
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
		position: relative;
		height: 100%;
		width: 100%;
		border: none;
		font-size: 16px;
		font-weight: 400;
	}

	.input {
		height: 60px;
		outline: none;
		padding: 0 32px;
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
			padding: 0 5px 0 32px;
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
			padding: 0 0 0 32px;
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
			padding: 0 14px 0 32px;
			font-size: 15px;
			height: 60px;
		}
		.large-label {
			font-size: 14px;
		}
	}
</style>
