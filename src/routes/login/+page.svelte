<script>
	import { logout, user } from '$lib/stores/auth';
	import LoginForm from './components/loginForm/loginForm.svelte';

	let errorMessage = '';
	let errorCode = '';
</script>

<LoginForm
	on:error={(e) => {
		errorMessage = e.detail.message;
		errorCode = e.detail.code;
	}}
/>

{#if errorMessage && errorCode}
	<p>{errorMessage}</p>
	<p>{errorCode}</p>
{/if}

<a href="/protected">Go to protected</a>

<!-- Added for testing -->
{#if $user}
	<p>Logged in as {$user.email}</p>
	<button
		on:click={() => {
			logout();
		}}>Logout</button
	>
{/if}
