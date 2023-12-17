<script>
	import { auth } from '$lib/firebase/client';
	import { applyActionCode } from 'firebase/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const oobCode = urlParams.get('oobCode');
		if (oobCode) {
			applyActionCode(auth, oobCode);
		}
	});
</script>

<div>Salam gijdillax!</div>
