<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { addToast } from '$lib/components/errorToast.svelte';
	import { addNotification } from '$lib/components/notification.svelte';
	import VideoPlayer from '$lib/components/videoPlayer/videoPlayer.svelte';

	function copyToClipboard() {
		const button = document.querySelector('.video-link-btn span') as HTMLSpanElement;

		const buttonText = button.innerText;

		if (buttonText) {
			navigator.clipboard
				.writeText(buttonText)
				.then(() => {
					addNotification({
						data: {
							title: 'Copied to clipboard.'
						}
					});
				})
				.catch((error) => {
					console.error('Unable to copy text to clipboard', error);
				});
		}
	}
	export let uploadProgress: number | string = 0;
	export let videoId: string;
	export let inputValue: string;
	export let description: string;

	async function upload() {
		if (!inputValue) {
			addNotification({
				data: {
					title: 'Please enter a title.'
				}
			});
			return;
		}
		let response = await fetch('/api/updateVideo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: videoId,
				videoTitle: inputValue,
				videoDescription: description
			})
		});
		if (response.ok) {
			addNotification({
				data: {
					title:
						'Video uploaded successfully.(Wait for the video to be processed if not available yet)'
				}
			});
		}
		invalidateAll();
	}

	$: progress = Math.trunc(uploadProgress as number);
</script>

<div class="preview-player">
	<div class="video-container">
		<div class="loader loader--style2" title="1">
			<svg
				version="1.1"
				id="loader-1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				width="40px"
				height="40px"
				viewBox="0 0 50 50"
				style="enable-background:new 0 0 50 50;"
				xml:space="preserve"
			>
				<path
					fill="#54B9A2"
					d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
				>
					<animateTransform
						attributeType="xml"
						attributeName="transform"
						type="rotate"
						from="0 25 25"
						to="360 25 25"
						dur="0.6s"
						repeatCount="indefinite"
					/>
				</path>
			</svg>
		</div>
		<VideoPlayer src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU.m3u8" />
	</div>
	<p class="video-link">Video link</p>
	<button class="video-link-btn" on:click={copyToClipboard}>
		<span>http://localhost:5173/video/{videoId}</span>
		<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.75 13.5C3.58515 13.5 3.00272 13.5 2.54329 13.3097C1.93072 13.056 1.44404 12.5693 1.1903 11.9567C1 11.4973 1 10.9149 1 9.75V6C1 3.64298 1 2.46447 1.73223 1.73223C2.46447 1 3.64298 1 6 1H9.75C10.9149 1 11.4973 1 11.9567 1.1903C12.5693 1.44404 13.056 1.93072 13.3097 2.54329C13.5 3.00272 13.5 3.58515 13.5 4.75M13.5 21H16C18.357 21 19.5355 21 20.2678 20.2678C21 19.5355 21 18.357 21 16V13.5C21 11.143 21 9.96447 20.2678 9.23223C19.5355 8.5 18.357 8.5 16 8.5H13.5C11.143 8.5 9.96447 8.5 9.23223 9.23223C8.5 9.96447 8.5 11.143 8.5 13.5V16C8.5 18.357 8.5 19.5355 9.23223 20.2678C9.96447 21 11.143 21 13.5 21Z"
				stroke="#54B9A2"
			/>
		</svg>
	</button>
	{#if uploadProgress === 'done'}
		<div style="margin-top: 15px;">Upload finished! Being processed...</div>
	{:else}
		<div style="margin-top: 15px;">Upload progress: {progress}%</div>
	{/if}
	<button on:click={upload} class="next-btn">Upload</button>
</div>

<style>
	.loader {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1000;
		background-color: rgb(65, 65, 65);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.next-btn {
		all: unset;
		padding: 14px 62px;
		background: #54b9a2;
		color: #fff;
		text-align: center;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		border-radius: 24px;
		width: fit-content;
		cursor: pointer;
		transition: background 0.2s;
		position: absolute;
		right: 30px;
		bottom: 0;
	}
	.video-link-btn {
		all: unset;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		color: #54b9a2;
	}
	.video-link {
		color: #a1a1a1;
		margin-bottom: 7px;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
	}
	.next-btn:hover {
		background: #489785;
	}
	.preview-player {
		position: sticky;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0 30px 0 60px;
	}
	.video-container {
		background-color: transparent;
		aspect-ratio: 16 / 9;
		margin-bottom: 19px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		background-color: #d9d9d9;
	}
</style>
