<script lang="ts">
	export let step: number;
	import Combobox from './combobox.svelte';
	import Input from './input.svelte';
	import InputPassword from './inputPassword.svelte';
	import UsernameForm from './usernameForm.svelte';
	import UsernameAuto from './usernameAuto.svelte';
</script>

{#if step == 1}
	<div class="input-container">
		<div class="radio-content">
			<div class="field input-field">
				<Combobox name="hospitalName" obligatoryField={false} labelText="Hospital Name" inputPlaceholder="" />
			</div>
			<div class="field input-field">
				<Input
					labelText="First name(s) (Responsible person)"
					inputPlaceholder=""
					inputId="firstName"
				/>
			</div>
			<div class="field input-field">
				<Input
					labelText="Family name(s) (Responsible person)"
					inputPlaceholder=""
					inputId="lastName"
				/>
			</div>
		</div>
	</div>
{:else if step == 2}
	<div class="input-container">
		<div class="radio-content">
			<div class="field input-field">
				<Input
					labelText="Email"
					inputPlaceholder="Email"
					inputId="email"
					inputNote="*For immediate verification please use your professional email if possible."
				/>
			</div>

			<div class="field input-field">
				<Input labelText="Repeat email" inputPlaceholder="Repeat email" inputId="confirmEmail" />
			</div>

			<div class="field input-field">
				<InputPassword labelText="Password" inputPlaceholder="Password" inputId="password" />
			</div>

			<div class="field input-field">
				<InputPassword
					labelText="Re-type password"
					inputPlaceholder="Re-type password"
					inputId="confirmPassword"
				/>
			</div>
		</div>
	</div>
{:else if step == 3}
	<div class="input-container">
		<div class="radio-content step-3-overflow">
			<div class="field input-field">
				<Input labelText="Address" inputPlaceholder="Address" inputId="address" />
			</div>

			<div class="field input-field">
				<Input labelText="Post code / Zip" inputPlaceholder="Post code / Zip" inputId="zipCode" />
			</div>

			<div class="field input-field">
				<Combobox labelText="Country" inputPlaceholder="Select a country" name="country"/>
			</div>

			<div class="field input-field">
				<Combobox labelText="City" inputPlaceholder="Select a city" name="city"/>
			</div>
			<div class="field input-field">
				<Input labelText="Phone" inputPlaceholder="Phone" inputId="phoneNumber" inputType="number"/>
			</div>
		</div>
	</div>
{:else if step == 4}
	<p class="note last-step-note">
		Please note that your username is very important. It helps others find you.
	</p>
	<div class="field input-field username-field">
		<UsernameForm labelText="Your username" inputId="username" />
	</div>
	<div class="field input-field username-type-field">
		<UsernameAuto />
	</div>
{/if}

<style>
	.username-type-field {
		margin-top: 40px !important;
		margin-bottom: 55px;
	}
	/* ======================== */
	.error-message {
		margin-top: 6px;
		color: #ff3e24;
		font-family: 'Montserrat';
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
	}
	.note {
		color: #585858;
		text-align: center;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
	}
	.last-step-note {
		margin-top: 19px;
	}

	/* ======================== */

	.input-field {
		margin-top: 20px;
		position: relative;
	}
	.input-field:last-child {
		margin-bottom: 40px;
	}
	.step-3-overflow {
		overflow-y: scroll;
		scrollbar-color: #00baa2 #eaeae6;
		max-height: 500px;
		scrollbar-width: thin;
	}
	.radio-content {
		padding: 0 10px;
	}

	@media (max-width: 1280px) {
		.step-3-overflow {
			max-height: 330px;
		}
	}
	@media (max-width: 768px) {
		.input-container {
			width: 100%;
		}
		.step-3-overflow {
			overflow-y: hidden;
			max-height: 100%;
		}
		.input-field {
			width: 100%;
		}
	}
</style>
