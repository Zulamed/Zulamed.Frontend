<script lang="ts">
	export let buttonInnerText = '';
	export let buttonType = '' as HTMLButtonElement['type'];
	export let clickEvent = '' as any;
</script>

<div class="field button-field">
	<button type={buttonType} on:click={clickEvent} class="login-btn">{buttonInnerText}</button>
</div>

<style>
	.field .login-btn {
		height: 100%;
		width: 100%;
		border: none;
		font-size: 16px;
		font-weight: 400;
	}
	.button-field {
		margin-top: 0px;
		justify-content: center;
		display: flex;
		margin-bottom: 37px !important;
	}
	.field .login-btn {
		width: 210px;
		height: 55px;
		border-radius: 8px;
		background: #00baa2;
		transition: all 0.3s ease;
		cursor: pointer;
		color: #273b4a;
		text-align: center;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
	}

	.field .login-btn:hover {
		background-color: #00a790;
	}
	@media (max-width: 1440px) {
		.button-field {
			margin-top: 30px;
		}
	}

	@media (max-width: 480px) {
		.login-btn {
			width: 157px !important;
			height: 65px !important;
			color: #273b4a;
			font-size: 17px !important;
			font-weight: 600;
		}
		.button-field {
			margin-top: 29px;
			margin-bottom: 28px !important;
		}
	}
</style>
