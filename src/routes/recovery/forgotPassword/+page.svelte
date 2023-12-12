<script lang="ts">
	import ForgotPassForm from './components/forgotPasswordForm/forgotPassForm.svelte';
</script>

<section class="container forms">
	<img class="container-img" src="/img/main-background-mobile.png" alt="" />
	<div class="container-overlay" />
	<div class="form register">
		<header>
			<h2>
				Request a Password <br />
				Reset
			</h2>
		</header>
		<ForgotPassForm />
		<div class="form-link">
			<a href="/login" class="link signin-link">Click here</a> <span>to go back to Login</span>
		</div>
	</div>
</section>

<style>
	.note {
		color: #585858;
		text-align: center;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
	}
	.container {
		height: calc(100vh - 74px);
		width: 100%;
		background: #018b7b;
		display: grid;
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
		font-size: 22px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.form-link {
		text-align: center;
		margin-top: 16px;
	}
	.signin-link {
		color: #273b4a;
		font-size: 22px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-decoration-line: underline;
	}
	.form::-webkit-scrollbar {
		display: none;
	}

	.form {
		place-self: center;
		max-width: 600px;
		width: 100%;
		max-height: 88vh;
		height: 100%;
		border-radius: 27px;
		background: #fff;
		padding: 0 50px 0 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
		overflow-y: scroll;
		z-index: 1;
	}

	@media (max-width: 1280px) {
		.form {
			padding: 0 32px 0 32px;
			max-width: 448px;
		}
		.form-link span,
		.signin-link {
			font-size: 14px;
		}
		.form-link {
			margin-top: 22px;
		}
		h2 {
			font-size: 26px;
		}
	}
	@media (max-width: 1024px) {
		.form {
			max-width: 370px;
			max-height: 85vh;
		}
		.form-link span,
		.signin-link {
			font-size: 11px;
		}
		.form-link {
			margin-top: 14px;
		}
		h2 {
			font-size: 22px;
		}
	}
	@media (max-width: 768px) {
		.note {
			margin-top: 14px;
		}
		.form {
			padding: 0 28px 20px 28px;
			max-width: 100%;
			max-height: 100vh;
			border-radius: 0;
			justify-content: start;
			z-index: 0;
			overflow-y: auto;
		}
		.form-link span,
		.signin-link {
			font-size: 14px;
		}
		.form-link {
			margin-top: 20px;
		}
		h2 {
			color: #018b7b;
			font-size: 25px;
		}
	}
</style>
