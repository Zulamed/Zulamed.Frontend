<script lang="ts">
	import { user } from '$lib/stores/auth';
    import type {PageServerData} from "./$types"

    export let data: PageServerData;

</script>

<div>
	{#if $user}
		Hi! You're logged in as {$user.email}
        Your id is {data.userId}
	{/if}
    <a href="/login">Go to login page</a>
</div>
