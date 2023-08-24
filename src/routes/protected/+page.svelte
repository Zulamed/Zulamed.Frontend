<script lang="ts">
	import Tooltip from '$lib/components/tooltip.svelte';
	import { melt } from '@melt-ui/svelte';
</script>

<div>
	<!-- {#if $user} -->
	<!-- 	Hi! You're logged in as {$user.email} -->
 <!--        Your id is {data.userId} -->
	<!-- {/if} -->
 <!--    <a href="/login">Go to login page</a> -->
    <Tooltip placement="bottom">
        <button use:melt={trigger} slot="button" let:trigger>Hover me</button>
        <p slot="content">Tooltip content</p>
    </Tooltip>
    <Tooltip placement="right">
        <button use:melt={trigger} slot="button" let:trigger>Hover me</button>
        <p slot="content">Tooltip content</p>
    </Tooltip>
</div>
