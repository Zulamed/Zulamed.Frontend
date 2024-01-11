<script lang="ts">
	import { auth } from '$lib/firebase/client';
	import { sendEmailVerification } from 'firebase/auth';
	import { logout } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { addNotification } from '$lib/components/notification.svelte';

	function sendVerificationEmail() {
		if (auth.currentUser) {
			sendEmailVerification(auth.currentUser, { url: 'http://localhost:5173' });
			addNotification({ data: { message: 'Verification email sent', title: 'Verification' } });
		}
	}

	function logoutAndRedirect() {
		logout();
		goto('/login');
	}
</script>

<div class="container">
	<div class="success-animation">
		<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"
			><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path
				class="checkmark__check"
				fill="none"
				d="M14.1 27.2l7.1 7.2 16.7-16.8"
			/></svg
		>
	</div>
	<h1 style="margin-bottom: 10px; text-align:center; font-weight: 500">
		You need to be verified to use your account
	</h1>
	<p>You've been sent a verification email.</p>
	<p>If not, please press the button below:</p>
	<div class="btn-group">
		<button class="verify-btn" on:click={sendVerificationEmail}>Send verification email</button>
		<button class="logout-btn" on:click={logoutAndRedirect}>Logout</button>
	</div>
</div>

<style>
	/* -------success animation------- */

	.success-animation {
		margin-bottom: 40px;
	}

	.checkmark {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		display: block;
		stroke-width: 2;
		stroke: #54b9a2;
		stroke-miterlimit: 10;
		box-shadow: inset 0px 0px 0px #54b9a2;
		animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
		position: relative;
		top: 5px;
		right: 5px;
		margin: 0 auto;
	}
	.checkmark__circle {
		stroke-dasharray: 166;
		stroke-dashoffset: 166;
		stroke-width: 2;
		stroke-miterlimit: 10;
		stroke: #54b9a2;
		fill: #fff;
		animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
	}

	.checkmark__check {
		transform-origin: 50% 50%;
		stroke-dasharray: 48;
		stroke-dashoffset: 48;
		animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
	}

	@keyframes stroke {
		100% {
			stroke-dashoffset: 0;
		}
	}

	@keyframes scale {
		0%,
		100% {
			transform: none;
		}

		50% {
			transform: scale3d(1.1, 1.1, 1);
		}
	}

	@keyframes fill {
		100% {
			box-shadow: inset 0px 0px 0px 30px #54b9a2;
		}
	}

	/* -------success animation------- */

	.container {
		margin-top: 0px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.btn-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		margin-top: 20px;
	}
	.logout-btn {
		all: unset;
		padding: 10px 30px;
		background: #b00000;
		color: #fff;
		text-align: center;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		border-radius: 10px;
		width: fit-content;
		cursor: pointer;
		position: relative;
		transition: background 0.2s;
	}
	.logout-btn:hover {
		background: #750000;
	}
	.verify-btn {
		all: unset;
		padding: 10px 30px;
		background: #54b9a2;
		color: #fff;
		text-align: center;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		border-radius: 10px;
		width: fit-content;
		cursor: pointer;
		position: relative;
		transition: background 0.2s;
	}
	.verify-btn:hover {
		background: #489785;
	}
	@media (max-width: 1024px) {
		.container {
			margin-top: -74px;
			padding: 0 14px;
		}
	}
</style>
