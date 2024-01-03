<script lang="ts">
	import { onMount } from "svelte";
	import { auth } from "$lib/firebase/client";
	import { goto } from "$app/navigation";

    // export let data: PageData;

    function wait(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }


    onMount(async () => {
        await auth.currentUser?.reload();
        await auth.currentUser?.getIdToken(true);
        await wait(1000);
        goto("/");
    });

</script>

<div class="center">
        <h1>You were successfully been verified. Redirecting...</h1>
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
</style>
