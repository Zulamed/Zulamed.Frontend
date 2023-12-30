<script lang="ts">
	let playlistSwitchBtn: any;
	let playlistSwitchInput: HTMLInputElement;
	let subSwitchBtn: any;
	let subSwitchInput: HTMLInputElement;
</script>

<div class="container">
	<div class="privacy-settings">
		<div class="sector-1">
			<h4 class="title">Privacy</h4>
			<h4 class="subtitle">Choose who can see your saved playlists and subscriptions</h4>
			<hr style="color: #60606049;" />
		</div>
		<div class="sector-2">
			<div class="playlist-setting">
				<h4 class="more-info playlist-text" style="min-width: 150px">Playlists</h4>
				<form style="display: flex; gap: 22px; align-items: center;">
					<button
						bind:this={playlistSwitchBtn}
						on:click={() => {
							playlistSwitchInput.checked = !playlistSwitchInput.checked;
							playlistSwitchBtn.classList.toggle('checked');
						}}
						class="switch-button checked"
					>
						<span class="switch-knob" />
					</button>
					<h4 class="more-info playlist-text">Keep all my saved playlists private</h4>

					<input bind:this={playlistSwitchInput} type="checkbox" id="airplane-mode-input" />
				</form>
			</div>
			<div class="sub-setting">
				<h4 class="more-info sub-text" style="min-width: 150px">Subscriptions</h4>
				<form style="display: flex; gap: 22px; align-items: center;">
					<button
						bind:this={subSwitchBtn}
						on:click={() => {
							subSwitchInput.checked = !subSwitchInput.checked;
							subSwitchBtn.classList.toggle('checked');
						}}
						class="switch-button checked"
					>
						<span class="switch-knob" />
					</button>
					<h4 class="more-info playlist-text">Keep all my subscriptions private</h4>

					<input bind:this={subSwitchInput} type="checkbox" id="airplane-mode-input" />
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	/* =======SWITCH========= */

	.switch-button {
		position: relative;
		height: 15px;
		width: 43px;
		border-radius: 5px;
		background-color: #d9d9d9;
		border: none;
		outline: none;
	}

	.switch-knob {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: -3px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: #000;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.6);
		transition: all 0.2s ease-in-out;
	}

	.switch-button.checked .switch-knob {
		transform: translate(1.4rem, -50%); /* Сдвиг кнопки при включенном состоянии */
		background-color: #00d6ba;
	}
	input {
		display: none; /* Скрытие стандартного input */
	}
	/* =======SWITCH========= */
	.playlist-text {
		margin: 0 !important;
	}
	.sub-setting,
	.playlist-setting {
		display: flex;
		gap: 80px;
	}
	.playlist-setting {
		margin-bottom: 50px;
	}
	.container {
		margin-left: 300px;
	}
	.privacy-settings {
		width: 100%;
		padding: 40px 59px 40px 180px;
		background-color: #fff;
	}
	.sector-2,
	.sector-1 {
		margin-bottom: 49px;
	}
	.title {
		margin-bottom: 54px;
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 500;
	}
	.subtitle {
		margin-bottom: 20px;
		color: #000;
		font-size: 30px;
		font-style: normal;
		font-weight: 500;
	}
	.more-info {
		margin-bottom: 54px;
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}
	.more-info.sub-text {
		margin-bottom: 0;
	}
	@media (max-width: 1440px) {
		.privacy-settings {
			padding: 40px 0px 40px 59px;
		}
		.title {
			margin-bottom: 49px;
		}
		.subtitle {
			font-size: 15px;
			margin-bottom: 0;
		}

		.more-info {
			font-size: 14px;
			font-weight: 500;
			margin-bottom: 30px;
		}
		.sector-1 hr {
			display: none;
		}
		.sector-2 {
			margin-bottom: 39px;
		}
		.playlist-setting {
			margin-bottom: 39px;
		}
	}

	@media (max-width: 1023px) {
		.container {
			margin-top: 0;
		}
	}
	@media (max-width: 900px) {
		.container {
			margin-left: 0;
			margin-top: 54px;
		}
		.sector-1 {
			margin-bottom: 27px;
		}
		.privacy-settings {
			padding: 26px 23px 26px 23px;
		}
		.title {
			color: #000;
			font-size: 13px;
			font-style: normal;
			font-weight: 500;
			margin-bottom: 19px;
		}
		.subtitle {
			color: #000;
			font-size: 10px;
			font-style: normal;
			font-weight: 500;
			margin-bottom: 9px;
		}
		.more-info.sec-1 {
			margin-bottom: 13px;
		}
		.more-info {
			max-width: 300px;
			color: #000;
			font-size: 10px;
			font-style: normal;
			font-weight: 500;
			margin-bottom: 0px;
		}
		.sub-setting,
		.playlist-setting {
			gap: 23px;
		}
		.more-info.sub-text,
		.more-info.playlist-text {
			min-width: 100px !important;
		}
		.playlist-setting {
			margin-bottom: 18px;
		}
		.switch-button {
			height: 10px;
			width: 30px;
		}
		.switch-knob {
			width: 16px;
			height: 16px;
		}
	}
</style>
