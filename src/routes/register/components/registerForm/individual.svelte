<script lang="ts">
	import Combobox from './combobox.svelte';

	export let step: number;
	let eyeIcon = 'img/icons/View.svg';
	let eyeIconRepeat = 'img/icons/View.svg';
	let inputPassword: HTMLInputElement;
	let repeatPassword: HTMLInputElement;
	let email = '';
	let password = '';
	let passwordrepeat = '';
	let errorLogin = false;
	function preventDeletion(event: KeyboardEvent) {
		const input = document.getElementById('username') as HTMLInputElement;
		const inputValue = input.value;
		const cursorPosition = input.selectionStart;
		if (event.key === 'Backspace' && cursorPosition === 1 && inputValue.charAt(0) === '@') {
			event.preventDefault();
		}
	}
</script>

{#if step == 1}
	<div class="input-container">
		<div class="radio-content">
			<div class="field input-field">
				<label for="title">Title</label>
				<div class="group">
					<input id="title" name="title" type="text" placeholder="Your title" class="input" />
				</div>
			</div>
			<div class="field input-field">
				<label for="name">First name(s)</label>
				<div class="group">
					<input id="name" name="name" type="text" placeholder="Your first name(s)" class="input" />
				</div>
			</div>
			<div class="field input-field">
				<label for="surname">Family name(s)</label>
				<div class="group">
					<input
						id="surname"
						name="surname"
						type="text"
						placeholder="Your family name(s)"
						class="input"
					/>
				</div>
			</div>
			<div class="inputs-group">
				<div class="field g input-field">
					<label for="gender">Gender</label>
					<div class="group">
						<select class="gender-select" name="gender" id="gender">
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</div>
				</div>
				<div class="field bd input-field">
					<label for="birthday-date">Date of birth</label>
					<div class="birthday-date">
						<div class="date-group">
							<select class="date-select" name="birthday-date" id="birthday-date">
								<option value="1">1</option>
							</select>
						</div>
						<div class="date-group">
							<select class="date-select" name="birthday-date">
								<option value="December">December</option>
							</select>
						</div>
						<div class="date-group">
							<select class="date-select" name="birthday-date">
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
					<input id="email" name="email" type="email" placeholder="Email" class="input" />
				</div>
			</div>
			<div class="field input-field">
				<label for="repeat-email">Repeat email</label>
				<div class="email-group">
					<input id="repeat-email" name="email" type="email" placeholder="Email" class="input" />
				</div>
			</div>
			<div class="field input-field">
				<label for="password">Password</label>
				<div class="pass-group">
					<input
						id="password"
						bind:this={inputPassword}
						name="password"
						type="password"
						placeholder="*********"
						class="password"
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
			</div>
			<div class="field input-field">
				<label for="password-repeat">Re-type password</label>
				<div class="pass-group">
					<input
						id="password-repeat"
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
	<div class="input-container">
		<div class="radio-content">
			<div class="field input-field">
				<Combobox
					obligatoryField={true}
					labelText="Stage in career:"
					inputPlaceholder="Select a stage in career"
				/>
			</div>
			<div class="field input-field">
				<Combobox
					obligatoryField={true}
					labelText="Professional Activity:"
					inputPlaceholder="Select a Profession"
				/>
			</div>
			<div class="field input-field">
				<Combobox labelText="Please specify" inputPlaceholder="Select a speciality" />
			</div>
			<div class="field input-field">
				<Combobox labelText="My Place(s) of work" inputPlaceholder="Select your place(s) of work" />
			</div>
		</div>
	</div>
{:else if step == 4}
	<div class="input-container">
		<div class="radio-content">
			<div class="field input-field country">
				<Combobox labelText="Country:" inputPlaceholder="Select a country" />
			</div>
			<div class="field input-field city">
				<Combobox labelText="City:" inputPlaceholder="Select a city" />
			</div>
			<div class="field input-field institute">
				<Combobox labelText="Institute" inputPlaceholder="Select an institute" />
			</div>
			<div class="field input-field department">
				<label for="department">Department</label>
				<div class="group">
					<input id="department" name="department" type="text" placeholder="" class="input" />
				</div>
			</div>
			<div class="field input-field role">
				<Combobox labelText="Role" inputPlaceholder="Select a role" />
			</div>
		</div>
	</div>
{:else if step == 5}
	<p class="note last-step-note">
		Please note that your username is very important. It helps others find you.
	</p>
	<div class="field input-field username-field">
		<label for="username">Your username</label>
		<div class="group">
			<input
				on:keydown={preventDeletion}
				value="@"
				id="username"
				name="username"
				type="text"
				placeholder=""
				class="input"
			/>
		</div>
	</div>
{/if}

<style>
	.note {
		color: #585858;
		text-align: center;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
	}
	/* ====Step2===== */
	.input-field.country,
	.input-field.city,
	.input-field.department,
	.input-field.institute,
	.input-field.role {
		margin-top: 15px;
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
	.input-field.role {
		margin-bottom: 19px;
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
		border: 0.5px solid #d2d0d0;
		background-color: transparent;
		font-size: 16px;
		transition: all 0.2s ease;
		font-family: 'Montserrat', sans-serif;
	}
	.field input:focus,
	.field select:focus {
		border: 0.5px solid #00a790;
	}
	label {
		color: #000;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		cursor: pointer;
	}
	/* ====Step2===== */

	@media (max-width: 1280px) {
		label {
			font-size: 15px;
		}
		.field input,
		.field select {
			padding: 0 5px 0 12px;
			font-size: 15px;
			height: 50px;
		}
		.gender-select,
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
		.field input,
		.field select {
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
		.input-field:last-child {
			margin-bottom: 19px;
		}
		.bd {
			margin-bottom: 0px !important;
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
