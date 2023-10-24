<script lang="ts">
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
				placeholder="Enter a title for your video."
			/>
		</div>
		<div class="vid-inf video-preview">
			<div class="preview-upload">
				<img src="/img/icons/preview-upload.png" alt="" />
				<label for="preview-upload">Upload</label>
				<input id="preview-upload" type="file" />
			</div>

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
	</form>

	<div class="preview-player" />
</div>

<style>
	.row {
		margin-top: 26px;
		display: flex;
		flex-direction: row;
		width: 100%;
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
	.preview-upload label {
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
		width: 60%;
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
		gap: 10px;
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

	.preview-player {
		display: flex;
		flex-direction: column;
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
</style>
