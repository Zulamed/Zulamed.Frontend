<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	const {
		elements: { menu, item, trigger, arrow },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true
	});
	import { fly } from 'svelte/transition';
	import Dialog from './dialog.svelte';
</script>

<div style="width: 350px; position: relative;">
	<div class="select-btn" use:melt={$trigger}>Select a playlist</div>
	{#if $open}
		<div class="playlists-list" use:melt={$menu} transition:fly={{ duration: 150, y: 10 }}>
			<div class="playlist-item" use:melt={$item}>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="10" cy="10" r="9" fill="white" stroke="#54B9A2" stroke-width="2" />
				</svg> Playlist 1
			</div>
			<div class="playlist-item" use:melt={$item}>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="10" cy="10" r="9" fill="white" stroke="#54B9A2" stroke-width="2" />
				</svg> Playlist 2
			</div>
			<div class="playlist-item" use:melt={$item}>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="10" cy="10" r="9" fill="white" stroke="#54B9A2" stroke-width="2" />
				</svg> Playlist 3
			</div>
			<Dialog>
				<button use:melt={trigger} let:trigger slot="button" type="button" class="new-playlist"
					>New playlist</button
				>
				<div class="create-playlist" slot="content" let:close>
					<h3>New playlist</h3>
					<div class="vid-inf video-title">
						<label class="input-label" for="video-title">Title (required field)</label>
						<input
							class="title-input"
							type="text"
							id="video-title"
							placeholder="Name of playlist."
						/>
					</div>
					<div class="vid-inf video-title">
						<label class="input-label" for="video-title">Description</label>
						<input
							class="title-input"
							type="text"
							id="video-title"
							placeholder="Tell what your video is about."
						/>
					</div>
					<div class="action-btns">
						<button class="cancel-btn" use:melt={close} type="button">Cancel</button><button
							class="create-btn"
							type="button">Create</button
						>
					</div>
				</div>
			</Dialog>
		</div>
	{/if}
</div>

<style>
	/* ============================== */
	.action-btns {
		position: absolute;
		right: 20px;
		bottom: 20px;
	}
	.action-btns button {
		all: unset;
		text-align: center;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		margin-right: 48px;
		cursor: pointer !important;
	}
	.cancel-btn {
		color: #a1a1a1 !important;
	}
	.create-btn {
		color: #54b9a2 !important;
	}
	.vid-inf {
		margin-top: 17px;
	}
	.video-title {
		display: flex;
		flex-direction: column;
		position: relative;
		border-radius: 23px;
		border: 1px solid #54b9a2;
		width: 100%;
		padding: 13px 28px 16px 28px;
	}
	.input-label {
		color: #a1a1a1;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		margin-bottom: 11px;
	}
	.title-input {
		border: none;
		outline: none;
		color: #a1a1a1;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
	}
	.create-playlist {
		position: absolute;
		left: 270px;
		top: -100px;
		width: 572px;
		min-height: 305px;
		border-radius: 23px;
		border: 1px solid #54b9a2;
		background: #fff;
		padding: 21px 41px;
		display: block;
		z-index: 20;
	}
	.create-playlist h3 {
		color: #000;
		font-size: 18px;
		font-style: normal;
		font-weight: 500;
	}
	/* ============================== */
	.select-btn {
		background-color: transparent;
		border-radius: 23px;
		border: 1px solid #54b9a2;
		color: #a1a1a1;
		font-size: 13px;
		font-style: normal;
		font-weight: 500;
		width: 100%;
		height: 70px;
		padding: 0 20px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.new-playlist {
		all: unset;
		color: #54b9a2;
		font-size: 14px;
		font-style: normal;
		font-weight: 600;
		cursor: pointer;
	}
	.playlists-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		border-radius: 23px;
		border: 1px solid #54b9a2;
		background: #fff;
		color: #000;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		left: 0 !important;
		width: 100%;
		padding: 15px 20px;
	}
	.playlists-list .playlist-item {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 13px;
	}
</style>
