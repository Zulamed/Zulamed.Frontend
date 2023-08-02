<script lang="ts">
	import Individual from './individual.svelte';

	let step = 0;
	function increaseStep() {
		if (step == 1) return;
		step++;
	}
	let eyeIcon = 'img/icons/View.svg';
	let eyeIconRepeat = 'img/icons/View.svg';
	let inputPassword: HTMLInputElement;
	let repeatPassword: HTMLInputElement;
	let radioValue = '';
	let email = '';
	let password = '';
	let passwordrepeat = '';
	let errorLogin = false;
</script>

<form action="">
	{#if step > 0}
		<button
			class="prev-step"
			on:click={() => {
				if (step > 0) {
					step--;
				}
			}}
			><svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M6.16055 0.169365C6.36754 0.395168 6.36754 0.75875 6.16055 0.980725L1.27001 6.3158L6.16055 11.6509C6.36754 11.8767 6.36754 12.2403 6.16055 12.4622C5.95357 12.688 5.62028 12.688 5.4168 12.4622L0.154371 6.72148C0.0561388 6.61432 5.99143e-06 6.46889 5.99812e-06 6.3158C6.00481e-06 6.16272 0.0561388 6.01728 0.154371 5.91012L5.4168 0.169365C5.62379 -0.0564385 5.95357 -0.0564385 6.16055 0.169365Z"
					fill="#A2A2A2"
				/>
			</svg> &nbsp; Back</button
		>
	{/if}

	<div class="form-container">
		{#if step == 0}
			<div class="input-container">
				<div class="radio-content">
					<label class="radio-label" for="individual-account">
						<svg
							width="60"
							height="60"
							viewBox="0 0 50 50"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M25 0C11.2115 0 0 11.2115 0 25C0 38.7885 11.2115 50 25 50C38.7885 50 50 38.7885 50 25C50 11.2115 38.7821 0 25 0ZM40.0929 39.8384C39.6157 37.2614 38.4894 34.8244 36.7969 32.7882C36.6369 32.5955 36.4403 32.4362 36.2185 32.3197C35.9967 32.2031 35.7541 32.1316 35.5046 32.1091C35.2551 32.0866 35.0035 32.1137 34.7645 32.1888C34.5255 32.2638 34.3036 32.3854 34.1117 32.5464C33.919 32.7065 33.7597 32.903 33.6432 33.1248C33.5266 33.3466 33.4551 33.5892 33.4326 33.8388C33.4101 34.0883 33.4372 34.3398 33.5123 34.5788C33.5873 34.8179 33.7089 35.0397 33.8699 35.2316C35.5879 37.2996 36.536 39.9147 36.536 42.6063C36.536 42.6508 36.5487 42.6953 36.5487 42.7399C33.2273 44.9096 29.2632 46.1759 25 46.1759C20.7368 46.1759 16.7791 44.9096 13.4513 42.7399C13.4513 42.6953 13.464 42.6572 13.464 42.6063C13.464 36.2497 18.6371 31.0702 25 31.0702C30.943 31.0702 35.7788 26.2344 35.7788 20.2914C35.7788 14.3484 30.943 9.5126 25 9.5126C19.057 9.5126 14.2212 14.3484 14.2212 20.2914C14.2212 23.7338 15.8437 26.7943 18.3635 28.7669C14.0176 30.8603 10.8043 34.9453 9.9071 39.832C6.14024 36.0143 3.81777 30.7712 3.81777 25C3.81777 13.3176 13.3176 3.81777 25 3.81777C36.6824 3.81777 46.1822 13.3176 46.1822 25C46.1759 30.7712 43.8534 36.0143 40.0929 39.8384ZM18.0326 20.2978C18.0326 16.4609 21.1568 13.3367 24.9936 13.3367C28.8305 13.3367 31.9547 16.4609 31.9547 20.2978C31.9547 24.141 28.8305 27.2588 24.9936 27.2588C21.1568 27.2588 18.0326 24.1346 18.0326 20.2978Z"
								fill="#00D6BA"
							/>
						</svg>
						<p>Individual</p>
						<input
							bind:group={radioValue}
							class="radio-all"
							id="individual-account"
							type="radio"
							name="account-type"
							value="individual"
						/>
						<img class="radio-img" src="" alt="" />
					</label>
					<label class="radio-label" for="bbbb">
						<svg
							width="60"
							height="60"
							viewBox="0 0 55 50"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M16.6667 4.16667H37.5V20.8333V45.8333H33.3333V27.0833H20.8333V45.8333H16.6667V29.1667V4.16667ZM25 45.8333H29.1667V31.25H25V45.8333ZM37.5 50H16.6667H12.5H0V29.1667H12.5V0H41.6667V20.8333H54.1667V50H41.6667H37.5ZM12.5 33.3333V45.8333H4.16667V33.3333H12.5ZM41.6667 45.8333H50V25H41.6667V45.8333ZM25 10.4167V12.5H22.9167V16.6667H25V18.75H29.1667V16.6667H31.25V12.5H29.1667V10.4167H25Z"
								fill="#00D6BA"
							/>
						</svg>
						<p>Hospital Account</p>
						<input
							bind:group={radioValue}
							class="radio-all"
							id="bbbb"
							type="radio"
							name="account-type"
							value="hospital"
						/>
						<img class="radio-img" src="" alt="" />
					</label>
					<label class="radio-label" for="aaaa">
						<svg
							width="60"
							height="60"
							viewBox="0 0 58 50"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M57.342 18.7879C57.3433 18.0096 57.1383 17.2448 56.7481 16.5713C56.3578 15.8978 55.7962 15.3397 55.1203 14.9537L30.9682 0.620106C30.2721 0.213994 29.4807 0 28.6748 0C27.869 0 27.0775 0.213994 26.3815 0.620106L2.19352 14.9537C1.52511 15.3503 0.971404 15.914 0.586818 16.5894C0.202231 17.2648 0 18.0286 0 18.8059C0 19.5831 0.202231 20.3469 0.586818 21.0223C0.971404 21.6977 1.52511 22.2614 2.19352 22.658L9.07364 26.6714V36.7408C9.07778 37.5277 9.28433 38.3004 9.67342 38.9844C10.0625 39.6685 10.6211 40.2409 11.2954 40.6467L26.5248 49.426C27.2048 49.8025 27.9693 50 28.7465 50C29.5237 50 30.2882 49.8025 30.9682 49.426L46.1977 40.6467C46.872 40.2409 47.4305 39.6685 47.8196 38.9844C48.2087 38.3004 48.4152 37.5277 48.4194 36.7408V26.5639L52.8628 23.948V33.6949H57.342V18.7879ZM43.976 36.7049L28.6748 45.5201L13.5529 36.7408V29.3231L26.3815 36.9558C27.0799 37.3549 27.8704 37.5648 28.6748 37.5648C29.4793 37.5648 30.2698 37.3549 30.9682 36.9558L43.9401 29.2156L43.976 36.7049ZM28.6748 33.0857L4.48689 18.7521L28.6748 4.38268L52.8628 18.7163L28.6748 33.0857Z"
								fill="#00D6BA"
							/>
						</svg>
						<p>University Account</p>
						<input
							bind:group={radioValue}
							class="radio-all"
							id="aaaa"
							type="radio"
							name="account-type"
							value="university"
						/>
						<img class="radio-img" src="" alt="" />
					</label>
				</div>
			</div>
		{/if}

		{#if step == 1}
			{#if radioValue == 'individual'}
				<Individual />
			{/if}
			{#if radioValue == 'hospital'}
				1111
			{/if}
			{#if radioValue == 'university'}
				sdfgsdfg
			{/if}

			<!-- <div class="input-container">
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
			</div> -->
		{/if}
	</div>

	<div class="field button-field">
		<button class="next-step" on:click={increaseStep}>Next Step</button>
	</div>
</form>

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
	.input-field {
		margin-top: 20px;
	}
	.pass-group,
	.email-group {
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

	label {
		color: #000;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.field input {
		height: 55px;
		outline: none;
		padding: 0 15px;
		border: 0.5px solid #999999d3;
	}

	/* ====Step2===== */

	.radio-label {
		position: relative;
		display: flex;
		width: 100%;
		height: 75px;
		align-items: center;
		justify-content: center;
		gap: 35px;
		margin-top: 50px;
	}
	.radio-label p {
		width: 197px;
		color: #000;
		font-size: 19px;
		font-style: normal;
		font-weight: 600;
	}
	.radio-all {
		position: absolute;
		visibility: hidden;
	}
	div.radio-content > label > img {
		width: 30px;
		height: 30px;
		content: url(../img/icons/Check_ring.svg);
		border: none;
		pointer-events: none;
	}
	div.radio-content > label > input:checked + img {
		content: url(../img/icons/Check_fill.svg);
	}
	.form-container {
		width: 100%;
	}
	.input-container {
		width: 100%;
		margin-bottom: 50px;
	}

	.button-field {
		justify-content: center;
		display: flex;
	}
	.field .next-step {
		width: 157px;
		height: 65px;
		border-radius: 8px;
		background: #00baa2;
		transition: all 0.3s ease;
		cursor: pointer;
		color: #273b4a;
		text-align: center;
		font-size: 22px;
		font-style: normal;
		font-weight: 600;
		border: none;
		outline: none;
	}

	.field .next-step:hover {
		background-color: #00a790;
	}
	.prev-step {
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		align-content: center;
		color: #a1a1a1;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		border: none;
		outline: none;
		background: transparent;
		padding: 0 2px;
		cursor: pointer;
	}
	form {
		width: 100%;
		padding: 0 28px;
	}
</style>
