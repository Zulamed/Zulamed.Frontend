<script lang="ts">
	import MainDialog from '$lib/components/mainDialog.svelte';
	import { melt } from '@melt-ui/svelte';
	import { user } from '$lib/stores/auth';
	import type { PageData } from '../$types';
	import { applyAction, enhance } from '$app/forms';
	import { addNotification } from '$lib/components/notification.svelte';
	export let data: PageData;
	let isEditing = false;
	let inputValue = '';
	let rowscount = 1;
    let editingEnabled = false;
    export let description: string | null;
	function edit() {
		isEditing = true;
	}
	function adjustRows() {
        if (inputValue.length > 0) {
            editingEnabled = true;
        } else {
            editingEnabled = false;
        }
		const lineCount = inputValue.split('\n').length;
		rowscount = lineCount;
	}

</script>

<div class="header">
	<h1 class="list-header">Description</h1>
	{#if data.user.id === $user?.id}
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
				<path d="M9.375 5.625L11.625 4.125L13.875 6.375L12.375 8.625L9.375 5.625Z" fill="#222222" />
			</svg>
		</button>
	{/if}
</div>
<div class="list-container">
	{#if isEditing}
		<form
			style="display: flex; flex-direction:column; align-items: end"
			method="POST"
			action="?/editDescription"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
                        isEditing = false;
                        description = inputValue;
						addNotification({
							data: {
								title: 'Description updated successfully',
							}
						});
					} else {
						applyAction(result);
					}
				};
			}}
		>
			<div style="position: relative; width: 100%; ">
				<textarea
					bind:value={inputValue}
					on:input={adjustRows}
					placeholder="Write your description here"
					class="description-input"
					name="description"
					rows={rowscount}
				/>
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
				<button type="submit" disabled={!editingEnabled} class:active={editingEnabled} class="description-btn description">Save</button>
			</div>
		</form>
	{:else}
		<p class="no-description">{description ?? "No description yet."}</p>
	{/if}
</div>

<style>
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
		padding: 13px 14px;
		border-radius: 24px;
		font-size: 14px;
	}

    .description-btn.active {
		color: #FFFFFF;
		cursor: pointer;
		background: #54B9A2;
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
	/* ====================== */
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
	/* ====================== */
	.description-input {
		margin-top: 35px;
		position: relative;
		width: 100%;
		min-height: 30px;
		resize: none;
		outline: none;
		border: none;
		background-image: none;
		font-size: 20px;
		background-color: transparent;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
	}
	form {
		display: flex;
		align-items: center;
		justify-content: center;
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
	.no-description {
		margin-top: 35px;
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.list-header {
		padding-left: 62px;
		font-size: 23px;
		text-decoration: none;
		font-weight: 500;
	}

	.list-container {
		display: block;
		max-width: 80%;
		grid-column-gap: 20px;
		padding: 0 62px 20px 62px;
	}
	.dg-btn {
		border: none;
		color: #54b9a2;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
		padding: 10px 25px;
		text-align: center;
		text-decoration: none;
		font-size: 15px;
		border-radius: 15px;
		background: #fff;
		cursor: pointer;
	}
	@media (max-width: 1238px) {
	}
	@media (max-width: 900px) {
		.header {
			margin-top: 20px;
		}
		.list-header {
			padding-left: 22px;
		}
		.list-container {
			max-width: 100%;
			padding: 0 22px 20px 22px;
		}
	}
	@media (max-width: 460px) {
	}
</style>
