<script lang="ts">
	import { auth } from '$lib/firebase/client';
	import { sendEmailVerification } from 'firebase/auth';
	import { logout } from '$lib/stores/auth';

	function sendVerificationEmail() {
		if (auth.currentUser) {
			sendEmailVerification(auth.currentUser, { url: 'http://localhost:5173' });
		}
	}
</script>

<div class="container">
	<img width="300px" style="margin-bottom: 15px;" src="/img/logo-white-theme.png" alt="" />
	<h1 style="margin-bottom: 10px; text-align:center">
		You need to be verified to use your account
	</h1>
	<p>Please verify your email:</p>
	<div class="btn-group">
		<button class="verify-btn" on:click={sendVerificationEmail}>Send verification email</button>
		<button class="logout-btn" on:click={logout}>Logout</button>
	</div>
</div>

<style>
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
		}
	}
</style>
