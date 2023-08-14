<script lang="ts">
	import Input from './input.svelte';
</script>

<form action="">
	<div class="input-container">
		<div class="radio-content">
			<Input
				labelText="Enter Your Email Address"
				inputPlaceholder=""
				inputId="forgot-password"
				inputType="email"
			/>
		</div>
	</div>
	<div class="field button-field">
		<button class="next-step">Request Password Reset</button>
	</div>
</form>

<style>
	.input-container {
		width: 100%;
		margin-bottom: 85px;
		margin-top: 85px;
	}
	.radio-content {
		padding: 0 10px;
	}
	.field .next-step {
		width: 309px;
		height: 65px;
		flex-shrink: 0;
		border-radius: 8px;
		background: #00baa2;
		background-color: rgb(0, 186, 162);
		transition: all 0.3s ease;
		cursor: pointer;
		color: #273b4a;
		text-align: center;
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		border: none;
		outline: none;
		white-space: nowrap;
	}

	.field .next-step:hover {
		background-color: #00a790;
	}
	form {
		width: 100%;
	}
	.button-field {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	@media (max-width: 1280px) {
		.radio-content {
			padding: 0;
		}
		.field .next-step {
			width: 259px;
			height: 52px;
			font-size: 17px;
		}
		.input-container {
			margin-bottom: 82px;
			margin-top: 82px;
		}
	}
	@media (max-width: 1024px) {
		.input-container {
			margin-bottom: 30px;
			margin-top: 30px;
		}
		.field .next-step {
			width: 218px;
			height: 42px;
			font-size: 14px;
		}
	}
	@media (max-width: 768px) {
		.input-container {
			max-width: 100%;
			margin-bottom: 50px;
			margin-top: 50px;
			width: 100%;
		}
		.radio-content {
			margin-top: 0 !important;
			padding: 0;
		}
		.field .next-step {
			width: 317px;
			height: 65px;
			font-size: 22px;
			white-space: nowrap;
		}
	}
</style>
