<script lang="ts">
	import Combobox from "./combobox.svelte";

	export let step: number;
	let eyeIcon = 'img/icons/View.svg';
	let eyeIconRepeat = 'img/icons/View.svg';
	let inputPassword: HTMLInputElement;
	let repeatPassword: HTMLInputElement;
	let email = '';
	let password = '';
	let passwordrepeat = '';
	let errorLogin = false;
</script>

{#if step == 1}
	<div class="input-container">
		<div class="radio-content">
			<div class="field input-field">
				<label for="title">Title</label>
				<div class="group">
					<input name="title" type="text" placeholder="Your title" class="input" />
				</div>
			</div>
			<div class="field input-field">
				<label for="name">First name(s)</label>
				<div class="group">
					<input name="name" type="text" placeholder="Your first name(s)" class="input" />
				</div>
			</div>
			<div class="field input-field">
				<label for="surname">Family name(s)</label>
				<div class="group">
					<input name="surname" type="text" placeholder="Your family name(s)" class="input" />
				</div>
			</div>
			<div class="inputs-group">
				<div class="field input-field">
					<label for="gender">Gender</label>
					<div class="group">
						<select class="gender-select" name="gender" id="">
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</div>
				</div>
				<div class="field input-field">
					<label for="birthday-date">Date of birth</label>
					<div class="birthday-date">
						<div class="date-group">
							<select class="date-select" name="birthday-date" id="">
								<option value="1">1</option>
							</select>
						</div>
						<div class="date-group">
							<select class="date-select" name="birthday-date" id="">
								<option value="December">December</option>
							</select>
						</div>
						<div class="date-group">
							<select class="date-select" name="birthday-date" id="">
								<option value="1990">1990</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else if step == 2}
	<div class="input-container">
		<div class="radio-content">
			<div class="field input-field">
				<label for="email">Email</label>
				<div class="email-group">
					<input name="email" type="email" placeholder="Email" class="input" />
				</div>
			</div>
			<div class="field input-field">
				<label for="email">Repeat email</label>
				<div class="email-group">
					<input name="email" type="email" placeholder="Email" class="input" />
				</div>
			</div>
			<div class="field input-field">
				<label for="password">Password</label>
				<div class="pass-group">
					<input
						bind:this={inputPassword}
						name="password"
						type="password"
						placeholder="*********"
						class="password"
						class:input-error={errorLogin}
						bind:value={password}
					/>
					{#if errorLogin == true}
						<img class="error-icon" src="img/icons/Error-login.svg" alt="" />
					{/if}
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
			</div>
			<div class="field input-field">
				<label for="password-repeat">Re-type password</label>
				<div class="pass-group">
					<input
						bind:this={repeatPassword}
						name="password-repeat"
						type="password"
						placeholder="*********"
						class="password"
						class:input-error={errorLogin}
						bind:value={passwordrepeat}
					/>

					<button
						type="button"
						class="showpass-btn"
						on:click={() => {
							if (eyeIconRepeat == 'img/icons/View.svg') {
								eyeIconRepeat = 'img/icons/View_hide.svg';
								repeatPassword.type = 'text';
							} else {
								eyeIconRepeat = 'img/icons/View.svg';
								repeatPassword.type = 'password';
							}
						}}
					>
						<img src={eyeIconRepeat} class="eye-icon" alt="" />
					</button>
				</div>
			</div>
		</div>
	</div>
{:else if step == 3}
<Combobox></Combobox>
{/if}

<style>
	/* ====Step2===== */

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

	.birthday-date {
		display: flex;
		gap: 8px;
	}
	.inputs-group {
		display: flex;
		justify-content: space-between;
	}
	.input-field {
		margin-top: 20px;
		position: relative;
	}
	.input-field:last-child {
		margin-bottom: 40px;
	}
	.birthday-date,
	.group,
	.email-group,
	.pass-group {
		position: relative;
		margin-top: 16px;
	}

	.field input {
		height: 100%;
		width: 100%;
		border: none;
		font-size: 16px;
		font-weight: 400;
	}

	.field input,
	.field select {
		height: 55px;
		outline: none;
		padding: 0 15px;
		border: 0.5px solid #999999d3;
		background-color: transparent;
		font-size: 16px;
	}
	label {
		color: #000;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	/* ====Step2===== */

	@media (max-width: 1280px) {
		.field input {
			height: 50px;
		}
		label {
			font-size: 15px;
		}
		.field input,
		.field select {
			padding: 0 5px 0 12px;
			font-size: 15px;
		}
		.date-select {
			font-size: 11px;
		}
		.birthday-date,
		.group,
		.email-group,
		.pass-group {
			margin-top: 10px;
		}
		.input-field {
			margin-top: 11px;
		}
	}
	@media (max-width: 1024px) {
		.field input {
			height: 45px;
		}
		label {
			font-size: 13px;
		}
		.field input,
		.field select {
			padding: 0 0 0 6px;
			font-size: 13px;
		}
		.date-select {
			font-size: 11px;
		}
		.birthday-date,
		.group,
		.email-group,
		.pass-group {
			margin-top: 10px;
		}
		.input-field {
			margin-top: 11px;
		}
		.inputs-group {
			margin-bottom: 19px;
		}
	}
	@media (max-width: 768px) {
		.input-container {
			margin-bottom: 20px;
			width: 100%;
		}
		.inputs-group {
			display: block;
		}
		label {
			font-size: 14px;
		}
		.gender-select {
			width: 160px;
		}
		.field input,
		.field select {
			padding: 0 14px 0 14px;
			font-size: 15px;
			height: 60px;
		}
		.date-group {
			width: 33%;
		}
		.date-select {
			width: 100%;
		}
		.birthday-date {
			margin-top: 10px;
		}
	}
</style>
