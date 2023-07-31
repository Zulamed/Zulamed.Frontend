<script lang="ts">
	import RegisterForm from './components/registerForm/registerForm.svelte';
</script>

<section class="container forms">
	<img class="container-img" src="img/main-background-mobile.png" alt="" />
	<div class="container-overlay" />
	<div class="form register">
		<header>
			<h2>
				Create Your <br />
				ZulaMed Account
			</h2>
		</header>

		<RegisterForm />

		<div class="form-link">
			<a href="." class="link signin-link">Click here</a> <span>to go back to Login</span>
		</div>
	</div>
</section>

<style>
	.container {
		height: 100vh;
		width: 100%;
		background: #018b7b;
		column-gap: 30px;
		margin-top: -74px;
	}
	.container-img {
		width: 100%;
		height: 80%;
		position: absolute;
		top: 0;
		left: 0;
		object-position: top;
		object-fit: cover;
	}
	.container-overlay {
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: #fff;
		filter: opacity(0.66);
	}
	h2 {
		color: #000;
		text-align: center;
		font-size: 35px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.form-link span {
		color: #273b4a;
		font-size: 19px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.form-link {
		text-align: center;
		margin-top: 15px;
	}
	.signin-link {
		color: #273b4a;
		font-size: 19px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-decoration-line: underline;
	}
	.form::-webkit-scrollbar {
		display: none;
	}

	.form {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 520px;
		width: 100%;
		border-radius: 27px;
		background: #fff;
		padding: 30px 50px 30px 50px;
		max-height: 730px;
		height: 85%;
		display: flex;
		flex-direction: column;
		align-items: center;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
		overflow-y: scroll;
		margin-top: 20px;
	}

	@media (max-width: 480px) {
		.form {
			max-width: 100%;
			width: 100%;
			padding: 0 28px;
			max-height: 100%;
			height: 100%;
			border-radius: 0;
			margin-top: 74px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		h2 {
			color: #018b7b;
			font-size: 25px;
			margin-bottom: 18px;
		}

		.form-link span,
		.signin-link {
			font-size: 14px;
		}
	}
</style>
