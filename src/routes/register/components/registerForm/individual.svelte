<script lang="ts">
	import UsernameForm from './usernameForm.svelte';
	import Combobox from './combobox.svelte';
	import { individualData } from '../../schemas/individual';
	import InputPassword from './inputPassword.svelte';
	import Input from './input.svelte';
	import { profActivities, roles, specialties, stagesInCareer } from '$lib/utils/validateStuff';
	import type { Country, City } from '$lib/types';

	export let step: number;

	export let countries: Country[] = [];
	let cities: City[] = [];

	$: {
		if (
			step == 4 &&
			$individualData.country &&
			countries.find((country) => country.name === $individualData.country)
		) {
			(async () => {
				const res = await fetch(`/api/countries/${$individualData.country}/city`);
				cities = (await res.json()) as City[];
			})();
		}
	}
</script>

{#if step == 1}
	<div class="input-container">
		<div class="radio-content">
			<div class="field input-field">
				<Input
					labelText="Title"
					inputPlaceholder="Your title"
					inputId="title"
					bind:value={$individualData.title}
				/>
			</div>
			<div class="field input-field">
				<Input
					labelText="First name(s)"
					inputPlaceholder="Your first name(s)"
					inputId="name"
					bind:value={$individualData.name}
				/>
			</div>
			<div class="field input-field">
				<Input
					labelText="Family name(s)"
					inputPlaceholder="Your family name(s)"
					inputId="surname"
					bind:value={$individualData.surname}
				/>
			</div>
			<div class="inputs-group">
				<div class="field g input-field">
					<label for="gender">Gender</label>
					<div class="group">
						<select class="gender-select" name="gender" id="gender">
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
						<label for="gender">
							<img class="chevron" src="img/icons/Expand_down.png" alt="" />
						</label>
					</div>
				</div>
				<div class="field bd input-field">
					<label for="birthday-date">Date of birth</label>
					<div class="birthday-date">
						<div class="date-group">
							<input
								lang="en-EN"
								id="birthday-date"
								name="birthday-date"
								type="date"
								placeholder="Your date of birth"
								class="input date-select"
								bind:value={$individualData['birthday-date']}
							/>
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
				<Input
					labelText="Email"
					inputPlaceholder="Email"
					inputId="email"
					bind:value={$individualData.email}
				/>
			</div>
			<div class="field input-field">
				<Input
					labelText="Repeat email"
					inputPlaceholder="Email"
					inputId="confirmEmail"
					bind:value={$individualData.confirmEmail}
				/>
			</div>
			<div class="field input-field">
				<InputPassword
					labelText="Password"
					inputPlaceholder="Password"
					inputId="password"
					bind:password={$individualData.password}
				/>
			</div>

			<div class="field input-field">
				<InputPassword
					labelText="Re-type password"
					inputPlaceholder="Re-type password"
					inputId="confirmPassword"
					bind:password={$individualData.confirmPassword}
				/>
			</div>
		</div>
	</div>
{:else if step == 3}
	<div class="input-container">
		<div class="radio-content">
			<div class="field input-field">
				<Combobox
					data={stagesInCareer.map((stage) => ({ title: stage }))}
					customOption={false}
					obligatoryField={true}
					labelText="Stage in career:"
					inputPlaceholder="Select a stage in career"
					bind:value={$individualData.stageInCareer}
					name="stageInCareer"
				/>
			</div>
			<div class="field input-field">
				<Combobox
					obligatoryField={true}
					customOption={false}
					data={profActivities.map((activity) => ({ title: activity }))}
					labelText="Professional Activity:"
					inputPlaceholder="Select a Profession"
					bind:value={$individualData.profession}
					name="profession"
				/>
			</div>
			<div class="field input-field">
				<Combobox
					customOption={false}
					data={specialties.map((speciality) => ({ title: speciality }))}
					labelText="Please specify"
					inputPlaceholder="Select a speciality"
					bind:value={$individualData.speciality}
					name="speciality"
				/>
			</div>
			<div class="field input-field">
				<Input
					labelText="My Place(s) of work"
					inputPlaceholder="Write your place of work"
					inputId="placeOfWork"
					bind:value={$individualData.placeOfWork}
				/>
			</div>
		</div>
	</div>
{:else if step == 4}
	<div class="input-container">
		<div class="radio-content step-4-overflow">
			<div class="field input-field country">
				<Combobox
					labelText="Country:"
					customOption={false}
					inputPlaceholder="Select a country"
					bind:value={$individualData.country}
					name="country"
					data={countries.map((country) => ({ title: country.name }))}
				/>
				<!-- <p class="error-message">Error message</p> -->
			</div>
			<div class="field input-field city">
				<Combobox
					labelText="City:"
					customOption={false}
					inputPlaceholder="Select a city"
					bind:value={$individualData.city}
					name="city"
					data={cities.map((city) => ({ title: city.name }))}
				/>
			</div>
			<div class="field input-field institute">
				<Input
					inputNote="Please type the name of your institute name in English, using only latin characters without special characters or accents."
					labelText="Institute"
					inputPlaceholder="Enter Institute name"
					inputId="institution"
					bind:value={$individualData.institution}
				/>
			</div>
			<div class="field input-field department">
				<label for="department">Department</label>
				<p class="input-note">
					Please enter the name in English of your department, using only latin characters without
					special characters or accents.
				</p>
				<div class="group-less">
					<input
						id="department"
						name="department"
						type="text"
						placeholder=""
						class="input input-department"
						bind:value={$individualData.department}
					/>
				</div>
			</div>
			<div class="field input-field role">
				<Combobox
					data={roles.map((role) => ({ title: role }))}
					labelText="Role"
					inputPlaceholder="Select a role"
					bind:value={$individualData.role}
					name="role"
					customOption={false}
				/>
			</div>
		</div>
	</div>
{:else if step == 5}
	<p class="note last-step-note">
		Please note that your username is very important. It helps others find you.
	</p>
	<div class="field input-field username-field">
		<div class="group">
			<!-- <input
				on:keydown={preventDeletion}
				on:input={preventInsertion}
				bind:value={username}
				id="username"
				name="username"
				type="text"
				placeholder=""
				class="input"
			/> -->
			<UsernameForm
				labelText="Your username"
				inputId="username"
				bind:value={$individualData.username}
			/>
		</div>
	</div>
	<!-- <div class="field input-field username-type-field">
		<UsernameAuto />
	</div> -->
{/if}

<style>
	.chevron {
		position: absolute;
		top: 50%;
		right: 15px;
		transform: translateY(-50%);
		transition: all 0.2s ease;
	}

	/* .username-type-group {
		margin-top: 45px !important;
	} */
	/* .username-type-field {
		margin-top: 40px !important;
		margin-bottom: 55px;
	} */

	/* .radio-label {
		display: flex;
		align-items: center;
	} */
	/* .radio-label:not(:last-child) {
		margin-bottom: 12px;
	} */
	/* .radio-all {
		position: absolute;
		visibility: hidden;
	} */
	div.group > label > img {
		width: 24px;
		height: 24px;
		border: none;
		pointer-events: none;
	}

	/* div.group > label > input:checked + img {
		content: url(../img/icons/Dell.svg);
	} */

	/* ============================ */

	/* .error-message {
		margin-top: 6px;
		color: #ff3e24;
		font-family: 'Montserrat';
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
	} */
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
	.input-note {
		font-size: 12px;
		color: #585858;
		font-style: normal;
		font-weight: 400;
		margin-top: 10px;
	}
	/* ====Step2===== */
	.input-field.country,
	.input-field.city,
	.input-field.department,
	.input-field.institute,
	.input-field.role {
		margin-top: 8px;
	}
	/* .showpass-btn {
		all: unset;
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		font-size: 18px;
		color: #8b8b8b;
		cursor: pointer;
		padding: 5px;
	} */
	.field select {
		appearance: none;
		width: 115px;
		cursor: pointer;
	}
	.birthday-date {
		display: flex;
		gap: 8px;
	}
	.inputs-group {
		display: flex;
		justify-content: start;
		gap: 30px;
	}
	.input-field {
		margin-top: 20px;
		position: relative;
	}
	.input-field:last-child {
		margin-bottom: 21px;
	}
	.input-field.role {
		margin-bottom: 19px;
	}
	.group-less {
		position: relative;
		margin-top: 10px;
	}
	.birthday-date,
	.group {
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
		height: 60px;
		outline: none;
		padding: 0 16px;
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
	/* .large-label {
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		cursor: pointer;
	} */
	/* ====Step2===== */
	.field .date-select {
		padding: 0 26px;
	}
	.radio-content {
		padding: 0 10px;
	}
	.step-4-overflow {
		overflow-y: scroll;
		scrollbar-color: #00baa2 #eaeae6;
		max-height: 500px;
		scrollbar-width: thin;
	}
	.step-4-overflow::-webkit-scrollbar-thumb {
		background: #00baa2 !important;
		width: 6px !important;
	}
	.step-4-overflow::-webkit-scrollbar-track {
		background: #ffffff !important;
		width: 2px !important;
	}
	@media (max-width: 1440px) {
		.radio-content {
			padding: 0 10px;
		}
		.step-4-overflow {
			max-height: 330px;
		}
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
		.gender-select {
			-webkit-appearance: none !important;
			-moz-appearance: none !important;
			appearance: none !important;
			text-indent: 1px !important;
			text-overflow: '' !important;
		}
		.gender-select::-ms-expand {
			display: none !important;
		}
		.date-select {
			padding: 0 5px !important;
		}
		.birthday-date,
		.group {
			margin-top: 10px;
		}
		.input-field {
			margin-top: 11px;
		}
	}
	@media (max-width: 1024px) {
		.group {
			width: fit-content;
		}
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
		.group {
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
			display: flex;
			justify-content: space-between;
			gap: 0;
		}

		#birthday-date {
			min-width: 130px;
		}
	}
	@media (max-width: 768px) {
		.step-4-overflow {
			overflow-y: hidden;
			max-height: 100%;
		}
		/* .large-label {
			font-size: 14px;
		} */
		/* .username-type-group {
			margin-top: 30px !important;
		} */
		.input-container {
			margin-bottom: 20px;
			width: 100%;
		}
		.inputs-group {
			display: block;
		}
		.input-field {
			width: 100%;
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
