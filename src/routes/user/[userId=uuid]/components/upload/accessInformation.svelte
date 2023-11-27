<script lang="ts">
	import PreviewPlayer from './previewPlayer.svelte';
</script>

<div class="row">
	<form action="" class="video-information">
		<h1 class="tab-title">Access Settings</h1>
		<div class="text-manual">Specify when you want to publish the video and who can watch it.</div>
		<div class="radio-container">
			<div class="radio-button">
				<input id="radio-5" class="radio-custom" name="access-group" type="radio" checked />
				<label for="radio-5" class="radio-custom-label">Limited access</label>
			</div>

			<div class="radio-button">
				<input id="radio-6" class="radio-custom" name="access-group" type="radio" />
				<label for="radio-6" class="radio-custom-label">Access via link</label>
			</div>
			<div class="radio-button">
				<input id="radio-7" class="radio-custom" name="access-group" type="radio" />
				<label for="radio-7" class="radio-custom-label">Open access</label>
			</div>
		</div>
		<div class="date-container">
			<div class="radio-button">
				<input id="radio-8" class="radio-custom" name="date-group" type="radio" checked />
				<label for="radio-8" class="radio-custom-label">Now</label>
			</div>
			<div class="radio-button">
				<input id="radio-9" class="radio-custom" name="date-group" type="radio" />
				<label for="radio-9" class="radio-custom-label">Choose publication time</label>
			</div>
			<div>
				<input type="date" class="date-input" />
				<input type="text" class="time-input" />
			</div>
		</div>
	</form>
	<PreviewPlayer />
</div>

<style>
	.date-input {
		outline: none;
		border: none;
		padding: 10px 18px;
		color: #000;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		border-radius: 7px;
		border: 1px solid #54b9a2;
	}
	.time-input {
		outline: none;
		border: none;
		padding: 10px 18px;
		color: #000;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		border-radius: 7px;
		border: 1px solid #54b9a2;
		width: 85px;
		text-align: center;
	}
	/* =========radio buttons============== */
	.radio-container,
	.date-container {
		width: 70%;
		height: fit-content;
		padding: 34px 28px;
		border-radius: 23px;
		border: 1px solid #54b9a2;
		background: #fff;
		margin-top: 15px;
		display: flex;
		flex-direction: column;
		gap: 25px;
	}
	.radio-button {
		display: flex;
		align-items: center;
	}

	.radio-custom {
		opacity: 0;
		position: absolute;
		user-select: none;
	}
	.radio-custom-label {
		color: #000;
		font-size: 17px;
		font-style: normal;
		font-weight: 500;
		cursor: pointer;
	}
	.radio-custom + .radio-custom-label:before {
		content: '';
		background: #fff;
		border: 2px solid #54b9a2;
		display: inline-block;
		vertical-align: middle;
		width: 18px;
		height: 18px;
		margin-right: 20px;
		text-align: center;
		cursor: pointer;
	}

	.radio-custom + .radio-custom-label:before {
		border-radius: 50%;
	}

	.radio-custom:checked + .radio-custom-label:before {
		content: '';
		background-color: #54b9a2;
	}

	/* =========radio buttons============== */
	.tab-title {
		color: #000;
		font-size: 22px;
		font-style: normal;
		font-weight: 600;
	}
	.text-manual {
		margin-top: 20px;
		color: #a1a1a1;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
	}

	.row {
		position: relative;
		margin-top: 26px;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 500px;
		overflow-y: scroll;
		scrollbar-color: #00baa2 #eaeae6;
		scrollbar-width: thin;
	}
	.video-information {
		display: flex;
		flex-direction: column;
		min-width: 60%;
	}
</style>
