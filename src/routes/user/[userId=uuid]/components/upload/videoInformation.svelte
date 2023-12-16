<script lang="ts">
	import PlaylistDropdown from '$lib/components/playlistDropdown.svelte';
	import PreviewPlayer from './previewPlayer.svelte';
	import Upload from './upload.svelte';

	let inputValue = '';
	let charCount = 0;
	let maxCharacters = 50;
	let description = '';

	function handleInput(event: any) {
		inputValue = event.target.value.slice(0, maxCharacters);
		charCount = inputValue.length;
	}
	function DescriptionHeight(event: any) {
		const textarea = event.target;
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
		description = textarea.value;
	}
	export let uploadProgress: number | string = 0;
	export let videoId: string;
</script>

<div class="row">
	<form class="video-information" action="">
		<div class="vid-inf video-title">
			<label class="input-label" for="video-title">Title (required field)</label>
			<input
				bind:value={inputValue}
				on:input={handleInput}
				class="title-input"
				type="text"
				id="video-title"
				placeholder="Enter a title for your video."
			/>
			<span class="max-length">{charCount}/50</span>
		</div>
		<div class="vid-inf video-description">
			<label class="input-label" for="video-description">Description</label>
			<textarea
				bind:value={description}
				on:input={DescriptionHeight}
				class="title-input"
				id="video-description"
				placeholder="Tell what your video is about."
			/>
		</div>
		<p class="text-manual">Screensaver</p>
		<p class="text-manual">
			Select a screensaver from the suggested ones or upload a new one. It should attract the
			attention of viewers and reflect the content of the video.
		</p>
		<div class="vid-inf video-preview">
			<label class="file-upload-label" for="preview-upload">
				<div class="preview-upload">
					<img src="/img/icons/preview-upload.png" alt="" />
					<p>Upload</p>
					<input id="preview-upload" type="file" />
				</div>
			</label>

			<a href=".">
				<img src="/img/videoPreviews/video-skeleton.png" alt="" class="preview" />
			</a>

			<a href=".">
				<img src="/img/videoPreviews/video-skeleton.png" alt="" class="preview" />
			</a>

			<a href=".">
				<img src="/img/videoPreviews/video-skeleton.png" alt="" class="preview" />
			</a>
		</div>
		<p class="text-manual">Playlists</p>
		<p class="text-manual">
			Add your video to at least one playlist to make it easier for viewers to navigate your
			channel.
		</p>
		<div style="margin-top: 28px;">
			<PlaylistDropdown />
		</div>
		<p class="text-manual" style="margin-bottom: 25px;">
			Specify whether comments should be shown and, if so, how they should be ordered.
		</p>
		<div class="radio-button">
			<input id="radio-1" class="radio-custom" name="radio-group" type="radio" checked />
			<label for="radio-1" class="radio-custom-label">Allow all comments</label>
		</div>
		<div class="radio-button">
			<input id="radio-2" class="radio-custom" name="radio-group" type="radio" />
			<label for="radio-2" class="radio-custom-label"
				>Submit potentially inappropriate comments for review</label
			>
		</div>
		<div class="radio-button">
			<input id="radio-3" class="radio-custom" name="radio-group" type="radio" />
			<label for="radio-3" class="radio-custom-label">Send all comments for review</label>
		</div>
		<div class="radio-button">
			<input id="radio-4" class="radio-custom" name="radio-group" type="radio" />
			<label for="radio-4" class="radio-custom-label">Disable comments</label>
		</div>
		<div>
			<input id="checkbox-1" class="checkbox-custom" name="checkbox-1" type="checkbox" checked />
			<label for="checkbox-1" class="checkbox-custom-label">Show the number of likes</label>
		</div>
	</form>

	<PreviewPlayer {description} {inputValue} {uploadProgress} {videoId} />
</div>

<style>
	/* ============checkboxes============== */

	.checkbox-custom {
		opacity: 0;
		position: absolute;
	}
	.checkbox-custom,
	.checkbox-custom-label {
		display: inline-block;
		vertical-align: middle;
		cursor: pointer;
		user-select: none;
	}
	.checkbox-custom-label {
		position: relative;
		color: #000;
		font-size: 17px;
		font-style: normal;
		font-weight: 500;
		cursor: pointer;
		display: inline-block;
	}

	.checkbox-custom + .checkbox-custom-label:before {
		content: '';
		background: #fff;
		border: 2px solid #54b9a2;
		display: inline-flex;
		vertical-align: middle;
		width: 18px;
		height: 18px;
		margin-right: 20px;
		text-align: center;
		padding: 0;
		border-radius: 50%;
		align-content: center;
	}

	.checkbox-custom:checked + .checkbox-custom-label:before {
		content: url('/img/icons/checkbox.png');
		background: #54b9a2;
		color: #fff;
	}
	.checkbox-custom-label:before {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* ============checkboxes============== */
	/* =========radio buttons============== */
	.radio-button {
		display: flex;
		align-items: center;
	}
	.radio-button:not(last-child) {
		margin-bottom: 25px;
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
	.text-manual {
		margin-top: 20px;
		margin-left: 41px;
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
		height: 560px;
		overflow-y: scroll;
		scrollbar-color: #00baa2 #eaeae6;
		scrollbar-width: thin;
	}
	.file-upload-label {
		cursor: pointer;
	}
	.preview-upload {
		display: flex;
		flex-direction: column;
		border-radius: 23px;
		border: 1px solid #54b9a2;
		padding: 14px 40px;
		width: fit-content;
		justify-content: center;
		align-items: center;
		color: #a1a1a1;
		font-size: 13px;
		font-style: normal;
		font-weight: 500;
	}
	.preview-upload p {
		margin-top: 12px;
		cursor: pointer;
	}
	.preview-upload img {
		width: 37px;
	}
	#preview-upload {
		display: none;
	}
	.video-information {
		display: flex;
		flex-direction: column;
		min-width: 60%;
	}
	.vid-inf {
		margin-top: 26px;
	}
	.video-title,
	.video-description {
		display: flex;
		flex-direction: column;
		position: relative;
		border-radius: 23px;
		border: 1px solid #54b9a2;
		width: 100%;
		padding: 20px 40px 28px 40px;
	}
	.video-preview {
		width: 100%;
		display: flex;
		gap: 8px;
		align-items: center;
	}
	.preview {
		width: 179px;
		aspect-ratio: 16/9;
		border-radius: 23px;
	}
	.input-label {
		color: #a1a1a1;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		margin-bottom: 16px;
	}
	.title-input {
		border: none;
		outline: none;
		font-size: 19px;
		font-style: normal;
		font-weight: 500;
	}
	textarea {
		width: 100%;
		height: auto;
		resize: none;
	}

	.max-length {
		position: absolute;
		right: 34px;
		bottom: 13px;
		color: #a1a1a1;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
	}

	@media (max-width: 1280px) {
		.row {
			height: 500px;
		}
	}
</style>
