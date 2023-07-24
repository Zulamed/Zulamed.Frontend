<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/stores/auth';
	import { FirebaseError } from 'firebase/app';
	let email = '';
	let password = '';
	let errorLogin = false;
	async function handleSubmit() {
		try {
			await login(email, password);
            goto('/');
		} catch (error) {
			if (error instanceof FirebaseError) {
				errorLogin = true;
			}
		}
	}
	let eyeIcon = 'img/icons/View.svg';
	let inputPassword: HTMLInputElement;
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="field input-field">
		<label for="email">Email Address</label>
		<div class="email-group">
			<input
                bind:value={email}
				name="email"
				type="email"
				placeholder="Email"
				class="input"
				class:input-error={errorLogin}
			/>
			{#if errorLogin == true}
				<img class="error-icon" src="img/icons/Error-login.svg" alt="" />
			{/if}
		</div>
	</div>
	{#if errorLogin}
		<p class="error">Data not found or incorrectly entered</p>
	{/if}

	<div class="field input-field">
		<label for="password">Password</label>
		<div class="pass-group">
			<input
				bind:this={inputPassword}
				name="password"
				type="password"
				placeholder="*********"
				class="password"
                class:input-error={errorLogin}
				bind:value={password}
			/>
			{#if errorLogin == true}
				<img class="error-icon" src="img/icons/Error-login.svg" alt="" />
			{/if}
			<button
				type="button"
				class="showpass-btn"
				on:click={() => {
					if (eyeIcon == 'img/icons/View.svg') {
						eyeIcon = 'img/icons/View_hide.svg';
						inputPassword.type = 'text';
					} else {
						eyeIcon = 'img/icons/View.svg';
						inputPassword.type = 'password';
					}
				}}
			>
				<img src={eyeIcon} class="eye-icon" alt="" />
			</button>
		</div>
		{#if errorLogin}
			<p class="error pass-error">Incorrect password</p>
		{/if}
	</div>

	<div class="field button-field">
		<button class="login-btn">Log In</button>
	</div>
	<div class="form-link">
		<a href="." class="forgot-pass">Forgot password?</a>
	</div>
</form>

<!-- can be moved to a css file with <style src="./<your-css-file>.css"></style> -->
<style>
	.input-error {
		color: red;
	}
	.error-icon {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: -24px;
	}
	form {
		margin-top: 77px;
	}

	.field input,
	.field .login-btn {
		height: 100%;
		width: 100%;
		border: none;
		font-size: 16px;
		font-weight: 400;
	}

	label {
		color: #000;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.field input {
		height: 55px;
		outline: none;
		padding: 0 15px;
		border: 0.5px solid #999999d3;
	}

	.password {
		margin-top: 0 !important;
	}

	.field input:focus {
		border-bottom-width: 2px;
	}

	.pass-group,
	.email-group {
		position: relative;
		margin-top: 16px;
	}

	.button-field {
		margin-top: 59px;
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

	.form-link {
		text-align: center;
		margin-top: 15px;
	}

	.form-link .forgot-pass {
		color: #000;
		text-align: center;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-decoration-line: underline;
	}
	.input-field {
		position: relative;
		width: 100%;
		border-radius: 6px;
		margin-top: 31px;
	}
	.showpass-btn {
		all: unset;
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		font-size: 18px;
		color: #8b8b8b;
		cursor: pointer;
		padding: 5px;
	}
	.error {
		color: #ff3e24;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		margin-top: 12px;
	}
	@media (max-width: 1280px) {
		form {
			margin-top: 0px;
		}
	}
	@media (max-width: 480px) {
		label {
			font-size: 14px;
			font-weight: 600;
		}
		.input-field {
			margin-top: 20px;
		}
		.login-btn {
			width: 157px !important;
			height: 65px !important;
			color: #273b4a;
			font-size: 22px !important;
			font-weight: 600;
		}
		.button-field {
			margin-top: 29px;
			margin-bottom: 28px !important;
		}
		.form-link {
			margin-top: 20px;
		}
		.form-link .forgot-pass {
			font-size: 14px;
		}
		form {
			margin-top: 27px;
		}
	}
</style>
