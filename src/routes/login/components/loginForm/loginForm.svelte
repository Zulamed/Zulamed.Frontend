<script lang="ts">
	import { login } from '$lib/stores/auth';
	import { FirebaseError } from 'firebase/app';
	let email = '';
	let password = '';
	let errorLogin = false;
	async function handleSubmit() {
		try {
			await login(email, password);
		} catch (error) {
			if (error instanceof FirebaseError) {
				errorLogin = true;
			}
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="loginContainer">
		<h2 class="form-header">Login to Your <br /> ZulaMed Account</h2>
		<div class="email-container">
			<label class="form-label" for="email">Email Address</label>
			<input class="email" name="email" type="email" placeholder="Email" bind:value={email} />
			{#if errorLogin}
				<p class="error">Data not found or incorrectly entered</p>
			{/if}
		</div>
		<div class="pass-container">
			<label class="form-label" for="password">Password</label>
			<input
				class="password"
				name="password"
				type="password"
				placeholder="Password"
				bind:value={password}
			/>
			{#if errorLogin}
				<p class="error">Data not found or incorrectly entered</p>
			{/if}
		</div>

		<button class="form-button" type="submit">Log In</button>
	</div>
	<a class="add-link" href="">Forgot Password?</a>
	<a class="add-link account-create" href=""
		>Don’t have account? <span>Click here to Sign Up</span></a
	>
</form>

<!-- can be moved to a css file with <style src="./<your-css-file>.css"></style> -->
<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.add-link {
		color: #000;
		text-align: center;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-decoration-line: underline;
		margin-bottom: 22px;
	}
	.account-create {
		color: #273b4a;
		text-decoration-line: none;
		margin-bottom: 0;
	}
	.account-create span {
		text-decoration-line: underline;
	}
	.email {
		margin-bottom: 30px;
	}
	.password {
		margin-bottom: 50px;
	}
	.form-button {
		width: 150px;
		height: 45px;
		flex-shrink: 0;
		border-radius: 8px;
		background: #00baa2;
		border: none;
		outline: none;
		color: #273b4a;
		text-align: center;
		font-size: 15px;
		font-style: normal;
		font-weight: 600;
		cursor: pointer;
		margin-bottom: 35px;
	}
	.error {
		color: #ff3e24;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
	}
	.form-header {
		color: #000;
		text-align: center;
		font-size: 28px;
		font-style: normal;
		font-weight: 400;
		margin-bottom: 40px;
	}
	.loginContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.form-label {
		color: #000;
		font-size: 14px;
		font-style: normal;
		font-weight: 600;
		margin-bottom: 15px;
	}
	.email-container,
	.pass-container {
		display: flex;
		flex-direction: column;
	}
</style>
