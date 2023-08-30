<script lang="ts">
	export let labelText: string | undefined;
	export let inputPlaceholder: string | undefined;
	export let inputId: string | undefined;

	let eyeIcon = 'img/icons/View.svg';
	let inputPassword: HTMLInputElement;
	export let password = '';
	let errorLogin = false;
</script>

<label for={inputId}>{labelText}</label>
<div class="group newpass-group">
	<img class="lock-icon" src="img/icons/Group 8.svg" alt="" />
	<input
		bind:this={inputPassword}
		id={inputId}
		name={inputId}
		type="password"
		placeholder={inputPlaceholder}
		class="input"
		class:input-error={errorLogin}
		bind:value={password}
	/>
	<button
		type="button"
		class="showpass-btn"
		on:click={() => {
			if (eyeIcon == 'img/icons/View.svg') {
				eyeIcon = 'img/icons/View_hide.svg';
				inputPassword.type = 'text';
			} else {
				eyeIcon = 'img/icons/View.svg';
				inputPassword.type = 'password';
			}
		}}
	>
		<img src={eyeIcon} class="eye-icon" alt="" />
	</button>
</div>

<style>
	.lock-icon {
		position: absolute;
		top: 50%;
		left: 14px;
		transform: translateY(-50%);
	}
	.group {
		position: relative;
		margin-top: 16px;
	}
	.group:first-child {
		margin-top: 40px;
	}

	label {
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		cursor: pointer;
	}
	.input {
		height: 100%;
		width: 100%;
		border: none;
		font-size: 16px;
		font-weight: 400;
	}

	.input {
		height: 60px;
		outline: none;
		padding: 0 16px 0 56px;
		border: 0.5px solid #d2d0d0;
		background-color: transparent;
		font-size: 16px;
		transition: all 0.2s ease;
		font-family: 'Montserrat', sans-serif;
	}
	.input:focus {
		border: 0.5px solid #00a790;
	}
	.showpass-btn {
		all: unset;
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		font-size: 18px;
		color: #8b8b8b;
		cursor: pointer;
		padding: 5px;
	}

	@media (max-width: 1280px) {
		.lock-icon {
			width: 22px;
			height: 24px;
		}
		label {
			font-size: 15px;
		}
		.input {
			padding: 0 5px 0 56px;
			font-size: 15px;
			height: 50px;
		}
		.group {
			margin-top: 25px;
		}
	}
	@media (max-width: 1024px) {
		label {
			font-size: 13px;
		}
		.input {
			height: 45px;
			padding: 0 0 0 56px;
			font-size: 13px;
		}

		.group {
			margin-top: 10px;
		}
	}
	@media (max-width: 768px) {
		.lock-icon {
			width: 19px;
			height: 21px;
		}
		label {
			font-size: 14px;
		}
		.input {
			padding: 0 14px 0 44px;
			font-size: 15px;
			height: 60px;
		}
	}
</style>
