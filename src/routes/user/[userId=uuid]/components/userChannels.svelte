<script lang="ts">
	import type { Subscription } from '$backend/user/getSubscriptions';
	import { flyAndScale } from '$lib/animations/flyAndScale';
	let subActive = false;
	let confirmationVisible = false;

	function toggleSubscription() {
		if (subActive) {
			confirmationVisible = true;
		} else {
			subActive = !subActive;
		}
	}

	function confirmUnsubscribe() {
		subActive = false;
		confirmationVisible = false;
	}

	function cancelUnsubscribe() {
		confirmationVisible = false;
	}

	export let subscriptions: Subscription[];
</script>

<h1 class="list-header">Subscriptions</h1>
<div class="list-container">
	<!-- =====CHANNELS CONTAINER=====  -->
	{#each subscriptions as sub}
		<div class="channel-list">
			<a href="/user/{sub.user.id}"><img class="channel-logo" src={sub.user.profilePictureUrl ?? "/img/channels4_profile.jpg"} alt="" /></a>
			<a href="/user/{sub.user.id}"><p class="channel-username">{sub.user.login}</p></a>
			<p class="channel-sub-counter">{sub.numberOfSubscribers} subscribers</p>
			<button on:click={toggleSubscription} class:active={subActive} class="channel-subscribe-btn">
				{#if subActive}Subscribed{:else}Subscribe{/if}</button
			>
			{#if confirmationVisible}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="overlay" on:click={cancelUnsubscribe} />
				<div
					class="content"
					transition:flyAndScale={{
						duration: 150,
						y: 8,
						start: 0.96
					}}
				>
					<h2 class="unsub-title">Unsubscribe from User?</h2>
					<div class="unsub-actions">
						<button on:click={cancelUnsubscribe} class="unsub-cancel"> Cancel </button>
						<button on:click={confirmUnsubscribe} class="unsub-accept"> Unsubscribe </button>
					</div>
				</div>
			{/if}
		</div>
	{/each}
	<!-- =====CHANNELS CONTAINER=====  -->
</div>

<style>
	.unsub-actions {
		margin-top: 20px;
	}
	.unsub-accept,
	.unsub-cancel {
		all: unset;
		cursor: pointer;
		font-size: 14px;
		font-weight: 600;
		padding: 7px 17px;
		border-radius: 20px;
	}
	.unsub-accept {
		background-color: transparent;
		color: var(--btn-color);
	}

	.unsub-cancel {
		color: #000;
		background-color: transparent;
	}
	.unsub-cancel:hover {
		background-color: #d4d4d4;
	}
	.unsub-accept:hover {
		background-color: #95d1c348;
	}
	.unsub-cancel:active {
		background-color: #d4d4d4;
	}
	.unsub-accept:active {
		background-color: #95d1c348;
	}
	.unsub-cancel:focus {
		background-color: #d4d4d4;
	}
	.unsub-accept:focus {
		background-color: #95d1c348;
	}
	.unsub-title {
		white-space: pre-wrap;
		color: #616163;
		font-size: 14px;
		font-weight: 400;
	}
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 40;

		background-color: rgb(0 0 0 / 0.5);
	}
	.content {
		background-color: #fff;
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 50;
		max-height: 85vh;
		width: auto;
		max-width: 350px;
		transform: translate(-50%, -50%);
		border-radius: 0.375rem;
		padding: 24px;
	}

	.content:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
	}

	/* ========================== */

	.channel-logo {
		border-radius: 50%;
		width: 115px;
		height: 115px;
		object-fit: cover;
		margin-bottom: 6px;
		filter: brightness(0.9);
	}
	.channel-logo:hover {
		filter: brightness(1);
	}
	.channel-list a {
		text-decoration: none;
	}
	.channel-username {
		color: #000;
		text-align: center;
		font-size: 18px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}
	.channel-sub-counter {
		color: #616163;
		text-align: center;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-bottom: 18px;
	}

	.channel-subscribe-btn {
		padding: 7px 15px;
		border-radius: 24px;
		outline: none;
		cursor: pointer;
		border: none;
		background-color: var(--btn-color);
		color: #fff;
		text-align: center;
		font-size: 11px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	.channel-subscribe-btn.active {
		background-color: var(--disabled-btn);
	}
	.channel-subscribe-btn.active:hover {
		background-color: var(--disabled-btn-hover);
	}
	.channel-subscribe-btn:hover {
		background-color: var(--btn-hover-color);
	}
	.channel-subscribe-btn:active {
		background-color: var(--btn-hover-color);
	}
	.list-header {
		padding-left: 62px;
		font-size: 23px;
		text-decoration: none;
		font-weight: 500;
	}

	/* ===== */
	.list-container {
		display: grid;
		grid-template-columns: repeat(6, minmax(60px, 1fr));
		grid-column-gap: 20px;
		padding: 0 62px 20px 62px;
	}
	.channel-list {
		margin-top: 32px;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.channel-list .flex-div img {
		width: 48px;
		margin-right: 14px;
		border-radius: 50%;
	}

	@media (max-width: 1238px) {
		.list-container {
			grid-template-columns: repeat(4, minmax(100px, 1fr));
		}
	}
	@media (max-width: 900px) {
		.list-header {
			display: none;
		}
		.list-container {
			padding: 0 22px 20px 22px;
			grid-template-columns: repeat(3, minmax(130px, 1fr));
		}
	}
	@media (max-width: 460px) {
		.list-container {
			grid-template-columns: repeat(2, minmax(60px, 1fr));
		}
	}
</style>
