<script lang="ts">
	import { login } from '$lib/stores/auth';
	import { FirebaseError } from 'firebase/app';
	import { createEventDispatcher } from 'svelte';
	let email = '';
	let password = '';

	const dispatch = createEventDispatcher<{ error: { message: string; code: string } }>();

	async function handleSubmit() {
		try {
			await login(email, password);
		} catch (error) {
			if (error instanceof FirebaseError) {
				dispatch('error', { message: error.message, code: error.code });
			}
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div>
		<label for="email">Email</label>
		<input name="email" type="email" placeholder="Email" bind:value={email} />
		<label for="password">Password</label>
		<input name="password" type="password" placeholder="Password" bind:value={password} />
		<button>Log In</button>
	</div>
</form>

<!-- can be moved to a css file with <style src="./<your-css-file>.css"></style> -->
<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
