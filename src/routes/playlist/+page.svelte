<script lang="ts">
	import Dropdown from '$lib/components/dropdown.svelte';
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
	import { melt } from '@melt-ui/svelte';

	let isEditing = false;
	let inputValue = '';
	let editingEnabled = false;
	let charCount = 0;
	let maxCharacters = 20;
	let maxCharactersColor = false;

	function handleInput(event: any) {
		inputValue = event.target.value.slice(0, maxCharacters);
		charCount = inputValue.length;
		if (charCount == maxCharacters) {
			maxCharactersColor = true;
		} else {
			maxCharactersColor = false;
		}
	}
	function adjustRows() {
		if (inputValue.length > 0) {
			editingEnabled = true;
		} else {
			editingEnabled = false;
		}
	}

	function edit() {
		isEditing = true;
	}
</script>

<svelte:head>
	<title>Playlist title - ZulaMED</title>
</svelte:head>

<div class="container" class:large-container={!$sidebarOpened}>
	<div class="header">
		{#if isEditing}
			<form
				style="display: flex; flex-direction:column; align-items: end;"
				class="title-edit-form"
				method="POST"
				action=""
			>
				<div style="position: relative; width: 100%; display: flex; align-items: center;">
					<input
						bind:value={inputValue}
						on:input={() => {
							handleInput(event);
							adjustRows();
						}}
						placeholder="Playlist title"
						class="description-input"
						name="description"
					/>
					<span class:maxLengthColor={maxCharactersColor} class="max-length">{charCount}/20</span>

					<div class="description-input-unfocus" />
					<div class="description-input-focus" />
				</div>
				<div class="write-description-buttons" style:display="flex">
					<button
						on:click={() => {
							isEditing = false;
						}}
						type="button"
						class="description-btn cancel-btn">Cancel</button
					>
					<button
						type="submit"
						disabled={!editingEnabled}
						class:active={editingEnabled}
						class="description-btn description">Save</button
					>
				</div>
			</form>
		{:else}
			<h1
				class="list-header"
				style="padding-left: 62px; font-size: 23px; font-weight: 500; text-decoration: none;"
			>
				Playlist title
			</h1>
			<button on:click={edit} class="edit-btn" type="button">
				<svg
					width="23"
					height="23"
					viewBox="0 0 18 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4.67971 14.533L4.67972 14.533L4.70149 14.5275L4.70151 14.5275L6.33384 14.1194C6.34896 14.1156 6.36396 14.1119 6.37885 14.1082C6.60159 14.0528 6.79876 14.0037 6.9778 13.9023C7.15683 13.801 7.30035 13.6571 7.46248 13.4947C7.47332 13.4838 7.48425 13.4729 7.49527 13.4618L12.7286 8.22855L12.742 8.21512C12.9255 8.03158 13.0839 7.87324 13.2039 7.73226C13.3305 7.58348 13.443 7.42199 13.5091 7.22361L13.0346 7.06574L13.5091 7.22361C13.6114 6.91616 13.6114 6.58384 13.5091 6.27639L13.0346 6.43426L13.5091 6.27639C13.443 6.07801 13.3305 5.91652 13.2039 5.76774C13.0839 5.62676 12.9255 5.46842 12.742 5.28488L12.7286 5.27145L12.7151 5.25801C12.5316 5.07446 12.3732 4.91611 12.2323 4.79613C12.0835 4.66953 11.922 4.55696 11.7236 4.49094C11.4162 4.38864 11.0838 4.38864 10.7764 4.49094C10.578 4.55696 10.4165 4.66953 10.2677 4.79613C10.1267 4.91612 9.9684 5.07448 9.78486 5.25803L9.77144 5.27145L4.53816 10.5047L4.53816 10.5047C4.52714 10.5158 4.51619 10.5267 4.50533 10.5375C4.34286 10.6996 4.19903 10.8432 4.09766 11.0222C3.9963 11.2012 3.94723 11.3984 3.89179 11.6211C3.88809 11.636 3.88435 11.651 3.88057 11.6662L3.46704 13.3203C3.46483 13.3291 3.4626 13.338 3.46036 13.347C3.42112 13.5037 3.37921 13.671 3.36546 13.8115C3.35032 13.9663 3.35385 14.2273 3.56326 14.4367C3.77267 14.6461 4.03373 14.6497 4.18846 14.6345C4.32899 14.6208 4.49633 14.5789 4.65301 14.5396C4.66195 14.5374 4.67085 14.5352 4.67971 14.533Z"
						stroke="#222222"
					/>
					<path
						d="M9.375 5.625L11.625 4.125L13.875 6.375L12.375 8.625L9.375 5.625Z"
						fill="#222222"
					/>
				</svg>
			</button>
		{/if}
	</div>
	<div class="list-container">
		<div class="vid-list">
			<a href="/">
				<a class="preview" href="/"
					><img src="/img/videoPreviews/3.png" class="thumbnail" alt="" /></a
				>
				<div class="flex-div">
					<div class="list-vid-info">
						<a href="/">Video title</a>
						<div style="display: flex; margin-top: 10px;">
							<p class="vid-views">123 views&nbsp;</p>
							<p class="vid-views">·&nbsp;2 days ago</p>
						</div>
					</div>
					<Dropdown>
						<button
							use:melt={trigger}
							slot="button"
							let:trigger
							type="button"
							class="dots-vertical"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="30"
								viewBox="0 -960 960 960"
								width="30"
								><path
									d="M479.858-160Q460-160 446-174.142q-14-14.141-14-34Q432-228 446.142-242q14.141-14 34-14Q500-256 514-241.858q14 14.141 14 34Q528-188 513.858-174q-14.141 14-34 14Zm0-272Q460-432 446-446.142q-14-14.141-14-34Q432-500 446.142-514q14.141-14 34-14Q500-528 514-513.858q14 14.141 14 34Q528-460 513.858-446q-14.141 14-34 14Zm0-272Q460-704 446-718.142q-14-14.141-14-34Q432-772 446.142-786q14.141-14 34-14Q500-800 514-785.858q14 14.141 14 34Q528-732 513.858-718q-14.141 14-34 14Z"
								/></svg
							>
						</button>
						<div class="dropdown-container" slot="item" let:item>
							<form
								style="display: flex; align-items: center; justify-content: center;"
								method="post"
							>
								<button class="dropdown-button"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 0 24 24"
										width="24px"
										fill="#ffffff"
										><path d="M0 0h24v24H0V0z" fill="none" /><path
											d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
										/></svg
									>Delete</button
								>
							</form>
						</div>
					</Dropdown>
				</div>
			</a>
		</div>
	</div>
</div>

<style>
	/* ============title edit buttons================ */
	.max-length {
		user-select: none;
		position: absolute;
		right: 14px;
		color: #a1a1a1;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
	}
	.max-length.maxLengthColor {
		color: #ff0000;
	}

	.write-description-buttons {
		display: flex;
		justify-content: end;
		gap: 10px;
		align-items: center;
		margin-top: 16px;
		display: none;
	}
	.description-btn {
		border: none;
		outline: none;
		background-color: transparent;
		cursor: pointer;
		text-transform: capitalize;
		font-weight: 500;
		text-align: center;
		padding: 7px 14px;
		border-radius: 24px;
		font-size: 14px;
	}

	.description-btn.active {
		color: #ffffff;
		cursor: pointer;
		background: #54b9a2;
		border: 1px solid #54b9a2;
	}
	.description {
		color: #616163;
		border: 1px solid #616163;
		cursor: default;
	}
	.cancel-btn {
		background-color: transparent;
		border: 1px solid transparent;
	}

	.cancel-btn:hover {
		background-color: #e5e5e5;
		border: 1px solid #e5e5e5;
	}
	/* ============title edit buttons================ */

	/* ============description-input================ */
	.description-input-unfocus {
		position: absolute;
		bottom: 0px;
		width: 100%;
		left: 50%;
		transform: translateX(-50%);
		height: 1px;
		z-index: 1;
		background-color: rgb(134, 134, 134);
	}
	.description-input-focus {
		position: absolute;
		bottom: 0px;
		width: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 2px;
		z-index: 2;
		background-color: #000;
	}
	.description-input:focus ~ .description-input-focus {
		width: 100%;
		transition: width 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
	}
	.description-input {
		position: relative;
		width: 100%;
		min-height: 30px;
		resize: none;
		outline: none;
		border: none;
		background-image: none;
		font-size: 23px;
		font-weight: 400;
		background-color: transparent;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
		padding-right: 90px;
		overflow-y: hidden;
	}
	.title-edit-form {
		padding-left: 62px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* ============description-input================ */
	/* ============dropdown================ */
	.dropdown-container .dropdown-button {
		all: unset;
		cursor: pointer;
		min-height: 36px;
		padding: 0 12px 0 16px;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: left;
		background-color: transparent;
	}
	.dropdown-container form .dropdown-button {
		all: unset;
		cursor: pointer;
		min-height: 36px;
		padding: 0 12px 0 16px;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: left;
		background-color: transparent;
		width: 150px;
	}

	.dropdown-container .dropdown-button:hover {
		background-color: #449e89;
	}
	.dropdown-button svg {
		margin-right: 13px;
	}
	.dropdown-container {
		background-color: #54b9a2;
		width: 150px;
		display: flex;
		flex-direction: column;
		border-radius: 11px;
		padding: 7px 0;
	}
	/* ============dropdown================ */

	/* ============dots-vertical================ */
	.dots-vertical {
		position: absolute;
		right: 0;
		background-color: transparent;
		border: none;
		outline: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		cursor: pointer;
		opacity: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid transparent;
		transition: border 0.1s ease;
	}
	.dots-vertical:active {
		border: 1px solid #d3d3d3;
		background-color: #d3d3d3;
	}
	.dots-vertical svg {
		margin-right: 0;
		fill: #000000;
	}
	.dots-vertical:hover svg {
		fill: #54b9a2;
	}
	.vid-list:hover .dots-vertical {
		opacity: 1;
	}
	/* ============dots-vertical================ */
	a {
		text-decoration: none !important;
	}
	.header {
		display: flex;
		gap: 12px;
	}
	.header .edit-btn {
		all: unset;
		width: 28px;
		height: 28px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}
	.header .edit-btn:hover {
		background-color: rgb(221, 221, 221);
	}
	.container {
		padding-left: 16.77%;
	}

	.large-container {
		padding-left: 4%;
	}

	.list-vid-info a {
		color: #000;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		text-decoration: none;
	}
	.vid-info a {
		max-width: 735px;
		width: fit-content;
		color: #000;
		font-size: 25px;
		font-style: normal;
		font-weight: 500;
		text-decoration: none;
	}

	.vid-info p {
		font-weight: 500;
		font-size: 15px;
		line-height: 18px;
		color: #54b9a2;
		margin-top: 10px;
	}

	.vid-views {
		font-weight: 500;
		font-size: 15px;
		line-height: 18px;
		color: #a1a1a1 !important;
	}
	.vid-info .vid-description {
		color: #a1a1a1;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
		max-width: 735px;
	}

	/* ===== */
	.list-container {
		display: grid;
		grid-template-columns: repeat(4, minmax(184px, 1fr));
		grid-column-gap: 20px;
		padding: 0 62px;
	}
	.vid-list {
		margin-top: 32px;
		text-decoration: none;
	}

	.vid-list .thumbnail {
		width: 100%;
		border-radius: 16px;
		aspect-ratio: 16 / 9;
		background-color: #000;
		object-fit: contain;
	}
	.flex-div {
		display: flex;
		position: relative;
	}
	.vid-list .flex-div {
		align-items: flex-start;
		margin-top: 10px;
	}

	.vid-list .flex-div img {
		width: 48px;
		height: 48px;
		margin-right: 14px;
		border-radius: 50%;
		object-fit: cover;
	}

	@media (max-width: 1440px) {
		.large-container {
			padding-left: 6%;
		}
	}
	@media (max-width: 1280px) {
		.dots-vertical {
			width: 25px;
			height: 25px;
		}
	}
	@media (max-width: 1238px) {
		.list-container {
			grid-template-columns: repeat(3, minmax(184px, 1fr));
		}
		.container {
			padding-left: 26.8%;
		}

		.large-container {
			padding-left: 8%;
		}
	}
	@media (max-width: 900px) {
		.title-edit-form {
			padding: 0 22px;
		}
		.dots-vertical {
			opacity: 1;
		}
		.container,
		.large-container {
			padding-left: 0;
			padding-right: 0;
		}
		.list-header {
			padding-left: 22px !important;
		}
		.list-container {
			padding: 0 22px 20px 22px;
			grid-template-columns: repeat(2, minmax(184px, 1fr));
		}
	}
	@media (max-width: 460px) {
		.list-container {
			grid-template-columns: repeat(1, minmax(184px, 1fr));
		}
	}
</style>
