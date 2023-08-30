<script lang="ts">
	import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
	import InputPassword from './inputPassword.svelte';
	import { auth } from '$lib/firebase/client';
	import { login } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	let newPassword = '';
	let newPasswordRepeat = '';

	export let oobCode: string;
</script>

<form
	on:submit|preventDefault={async () => {
		try {
			const email = await verifyPasswordResetCode(auth, oobCode);
			await confirmPasswordReset(auth, oobCode, newPassword);
            login(email, newPassword);
            goto('/');
		} catch (error) {
            console.log(typeof error);
            console.log(error);
        }
	}}
>
	<div class="input-container">
		<div class="radio-content">
			<InputPassword
				labelText="Enter a new password"
				inputPlaceholder="New Password"
				inputId="new-password"
				bind:password={newPassword}
			/>
			<InputPassword
				labelText=""
				inputPlaceholder="Repeat a new password"
				inputId="new-password-repeat"
				bind:password={newPasswordRepeat}
			/>
		</div>
	</div>
	<div class="field button-field">
		<button class="next-step">Confirm</button>
	</div>
</form>

<style>
	.input-container {
		width: 100%;
		margin-bottom: 35px;
		margin-top: 70px;
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
			width: 171px;
			height: 52px;
			font-size: 17px;
		}
		.input-container {
			margin-bottom: 38px;
			margin-top: 63px;
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
