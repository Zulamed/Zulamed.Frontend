<script lang="ts">
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';

	let files = {
		accepted: [],
		rejected: []
	};
	let inputFile: HTMLInputElement;
	function handleFilesSelect(e: CustomEvent<any>) {
		const { acceptedFiles, fileRejections } = e.detail;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		files.accepted = [...files.accepted, ...acceptedFiles];

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		files.rejected = [...files.rejected, ...fileRejections];
	}
</script>

<div class="dialog-content">
	<Dropzone
		on:drop={handleFilesSelect}
		accept={['video/*']}
		inputElement={inputFile}
		containerStyles="height:100%; width:100%; justify-content: center; background-color: #FFF; border-color: transparent;"
	>
		<div class="upload-icon">
			<svg
				width="131"
				height="131"
				viewBox="0 0 131 131"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M45.7535 54.1522L63.8093 36.0413V85.292C63.8093 85.8399 64.027 86.3653 64.4144 86.7528C64.8018 87.1402 65.3273 87.3578 65.8752 87.3578C66.4231 87.3578 66.9486 87.1402 67.336 86.7528C67.7234 86.3653 67.9411 85.8399 67.9411 85.292V36.0413L85.9969 54.1522C86.1913 54.3439 86.4216 54.4955 86.6746 54.5982C86.9276 54.7009 87.1984 54.7528 87.4714 54.7509C87.7444 54.749 88.0144 54.6933 88.266 54.587C88.5175 54.4807 88.7456 54.326 88.9373 54.1316C89.1291 53.9371 89.2806 53.7068 89.3833 53.4538C89.486 53.2009 89.5379 52.9301 89.536 52.6571C89.5341 52.384 89.4784 52.114 89.3721 51.8625C89.2659 51.611 89.1111 51.3828 88.9167 51.1911L67.3351 29.6508C67.1511 29.436 66.9202 29.2664 66.6602 29.155C66.2839 29.001 65.8707 28.9606 65.4717 29.039C65.0727 29.1173 64.7055 29.3109 64.4153 29.5957L42.8337 51.1911C42.4411 51.5783 42.2183 52.1056 42.2144 52.6571C42.2105 53.2085 42.4259 53.7389 42.8131 54.1316C43.2003 54.5242 43.7276 54.747 44.279 54.7509C44.8304 54.7547 45.3608 54.5394 45.7535 54.1522Z"
					fill="url(#paint0_linear_1_1129)"
				/>
				<path
					d="M96.6843 87.9226C96.1364 87.9226 95.6109 88.1403 95.2235 88.5277C94.8361 88.9151 94.6184 89.4406 94.6184 89.9885V96.7508H37.1318V89.9885C37.1318 89.4406 36.9141 88.9151 36.5267 88.5277C36.1393 88.1403 35.6138 87.9226 35.0659 87.9226C34.518 87.9226 33.9925 88.1403 33.6051 88.5277C33.2177 88.9151 33 89.4406 33 89.9885V98.8167C33 99.3646 33.2177 99.8901 33.6051 100.277C33.9925 100.665 34.518 100.883 35.0659 100.883H96.6843C97.2322 100.883 97.7577 100.665 98.1451 100.277C98.5325 99.8901 98.7502 99.3646 98.7502 98.8167V89.9885C98.7502 89.4406 98.5325 88.9151 98.1451 88.5277C97.7577 88.1403 97.2322 87.9226 96.6843 87.9226Z"
					fill="url(#paint1_linear_1_1129)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_1_1129"
						x1="42.2277"
						y1="58.2013"
						x2="89.5227"
						y2="58.2013"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#54B9A2" />
						<stop offset="1" stop-color="#018B7B" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_1_1129"
						x1="33"
						y1="94.3957"
						x2="98.7502"
						y2="94.3957"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#54B9A2" />
						<stop offset="1" stop-color="#00D6BA" />
					</linearGradient>
				</defs>
			</svg>
		</div>
		<p class="dialog-title">Drag and drop video files to upload</p>
		<p class="dialog-desc">Your videos will be private until you publish them.</p>

		<form action="">
			<div class="file-upload">
				<label for="upload" class="file-upload__label">SELECT FILES</label>
				<input id="upload" class="file-upload__input" type="file" name="file-upload" />
			</div>
		</form>
	</Dropzone>
</div>

<style>
	.dialog-content {
		position: relative;
		width: 100%;
		height: calc(100% - 81px);
		display: flex;
		padding: 20px 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.upload-icon {
		padding: 25px;
		border-radius: 50%;
		background-color: #d9d9d9;
	}
	.dialog-title {
		margin-top: 29px;
		color: #585858;
		text-align: center;
		font-size: 19px;
		font-style: normal;
		font-weight: 500;
	}
	.dialog-desc {
		margin-top: 15px;
		color: #77787a;
		text-align: center;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
	}
	.file-upload {
		position: relative;
		display: inline-block;
	}

	.file-upload__label {
		display: block;
		margin-top: 32px;
		padding: 14px 26px;
		color: #fff;
		background: #54b9a2;
		border-radius: 24px;
		transition: background 0.2s;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.file-upload__label:hover {
		cursor: pointer;
		background: #489785;
	}

	.file-upload__input {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		font-size: 1;
		width: 0;
		height: 100%;
		opacity: 0;
	}

	@media (max-width: 900px) {
		.upload-icon {
			padding: 14px;
		}
		.upload-icon svg {
			width: 108px;
			height: 108px;
		}
	}
</style>
