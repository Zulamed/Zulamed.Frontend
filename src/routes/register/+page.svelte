<script lang="ts">
	import RegisterForm from './components/registerForm/registerForm.svelte';
</script>

<section class="container forms">
	<img class="container-img" src="img/main-background-mobile.png" alt="" />
	<div class="container-overlay" />
	<div class="form register">
		<div class="form-content">
			<header>
				Create Your <br />
				ZulaMed Account
			</header>
			<RegisterForm />

			<div class="form-link">
				<a href="." class="link signin-link">Click here</a> <span>to go back to Login</span>
			</div>
		</div>
	</div>
</section>

<style>
	.container {
		height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
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
	.form-content a:hover {
		text-decoration: underline;
	}
	header {
		color: #000;
		text-align: center;
		font-size: 35px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.form-link span {
		color: #273b4a;
		font-size: 15px;
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
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-decoration-line: underline;
	}
	.form {
		margin-top: 77px;
	}

	.form {
		position: absolute;
		max-width: 520px;
		width: 100%;
		padding: 73px 50px;
		border-radius: 27px;
		background: #fff;
		max-height: 730px;
		height: 100%;
	}

	.form {
		max-width: 520px;
		width: 100%;
		padding: 73px 28px 73px 28px;
		max-height: 770px;
		height: 85%;
	}
	.form-content {
		width: 100%;
		height: 100%;
	}

	@media (max-width: 480px) {
		.form {
			max-width: 100%;
			width: 100%;
			padding: 95px 64px 73px 64px;
			max-height: 100%;
			height: 100%;
			border-radius: 0;
			margin-top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		header {
			color: #018b7b;
			font-size: 25px;
		}

		.form-content {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.form-link span,
		.signin-link {
			font-size: 14px;
		}
	}
</style>
