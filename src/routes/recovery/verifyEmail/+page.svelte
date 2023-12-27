<script>
	import { auth } from '$lib/firebase/client';
	import { applyActionCode } from 'firebase/auth';
	import { onMount } from 'svelte';

	let verified = false;
	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const oobCode = urlParams.get('oobCode');
		if (oobCode) {
			applyActionCode(auth, oobCode);
			await fetch('/api/verifyUser', {
				method: 'POST'
			});
		}
	});
</script>

<div class="center">
	{#if verified}
		<div>You're verified!</div>
	{:else}
		<div>You're being verified...</div>
	{/if}
</div>

<style>
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
