<script>
	import LoginForm from './components/loginForm/loginForm.svelte';
</script>

<div class="container">
	<img class="background-img" src="/img/main-background-mobile.png" alt="" />
	<div class="container-overlay">
		<div class="loginForm">
			<LoginForm />
		</div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #018b7b;
		position: fixed;
		display: block;
	}
	.loginForm {
		width: 400px;
		height: 600px;
		border-radius: 27px;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px 40px;
	}
	.container-overlay {
		width: 100%;
		height: 100vh;
		position: absolute;
		top: -74px;
		left: 0;
		background-color: #ffffffa4;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.background-img {
		width: 100%;
		height: 50%;
		object-fit: cover;
		object-position: top;
	}
</style>
