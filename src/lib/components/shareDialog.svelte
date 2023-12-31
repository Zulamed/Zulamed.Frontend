<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import type { Writable } from 'svelte/store';
	import { createDialogStore } from './mainDialog';
	import { addNotification } from './notification.svelte';
	export let dialogStore: Writable<boolean> = createDialogStore();
	const {
		elements: { trigger, overlay, content, title, close },
		states: { open }
	} = createDialog({
		open: dialogStore
	});
	export let titleText: string;
	export let inputValue: string;

	function copyToClipboard() {
		const input = document.querySelector('.input') as HTMLInputElement;

		const buttonText = input.value;

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

	// =======SHARE ON SOCIAL MEDIA=======
	let shareGreetings = 'Hey, watch this video! \n';
	function shareOnLinkedIn() {
		window.open(
			'https://www.linkedin.com/shareArticle?url=' +
				encodeURIComponent(shareGreetings + window.location.href),
			'_blank'
		);
	}
	function shareOnTwitter() {
		window.open(
			'https://twitter.com/intent/tweet?url=' +
				encodeURIComponent(shareGreetings + window.location.href),
			'_blank'
		);
	}
	function shareOnTelegram() {
		window.open(
			'https://t.me/share/url?url=' + encodeURIComponent(shareGreetings + window.location.href),
			'_blank'
		);
	}
	function shareOnFacebook() {
		window.open(
			'https://www.facebook.com/sharer/sharer.php?u=' +
				encodeURIComponent(shareGreetings + window.location.href),
			'_blank'
		);
	}
	function shareOnWhatsApp() {
		window.open(
			'https://wa.me/?text=' + encodeURIComponent(shareGreetings + window.location.href),
			'_blank'
		);
	}
	// =======SHARE ON SOCIAL MEDIA=======
</script>

<slot trigger={$trigger} name="button" class="trigger">Open Dialog</slot>
{#if $open}
	<div class="overlay" use:melt={$overlay} />
	<div class="content" use:melt={$content}>
		<div style="display: flex; align-items: center;">
			<button type="button" class="close-btn" use:melt={$close}>
				<img src="/img/icons/close_white.svg" alt="" />
			</button>

			<h2 style="font-size: 1.4rem; font-weight: 400; " use:melt={$title}>
				{titleText}
			</h2>
		</div>

		<div class="socialmedia-buttons">
			<div>
				<button type="button" class="socialmedia-button" on:click={shareOnLinkedIn}>
					<img src="/img/socialMediaIcons/linkedin.png" alt="" />
				</button>
				<p>LinkedIn</p>
			</div>
			<div>
				<button type="button" class="socialmedia-button" on:click={shareOnFacebook}>
					<img src="/img/socialMediaIcons/facebook.png" alt="" />
				</button>
				<p>Facebook</p>
			</div>
			<div>
				<button type="button" class="socialmedia-button" on:click={shareOnTwitter}>
					<img src="/img/socialMediaIcons/x-twitter.png" alt="" />
				</button>
				<p>X</p>
			</div>
			<div>
				<button type="button" class="socialmedia-button" on:click={shareOnTelegram}>
					<img src="/img/socialMediaIcons/telegram.png" alt="" />
				</button>
				<p>Telegram</p>
			</div>
			<div>
				<button type="button" class="socialmedia-button" on:click={shareOnWhatsApp}>
					<img src="/img/socialMediaIcons/whatsapp.png" alt="" />
				</button>
				<p>WhatsApp</p>
			</div>
		</div>

		<div class="input-overlay">
			<input class="input" type="text" value={inputValue} readonly />
			<button class="copy-button" on:click={copyToClipboard}>Copy</button>
		</div>
	</div>
{/if}

<style>
	*::selection {
		background-color: #ffffff49 !important;
	}
	.socialmedia-buttons {
		margin-top: 18px;
		display: flex;
		justify-content: center;
		gap: 30px;
	}
	.socialmedia-buttons div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}
	.socialmedia-buttons div p {
		font-size: 12px;
		font-weight: 400;
	}
	.socialmedia-button {
		width: 60px;
		height: 60px;
		background-color: #ffffff49;
		color: #b4b4b4;
		border: none;
		outline: none;
		padding: 5px;
		cursor: pointer;
		border-radius: 50%;
	}
	.socialmedia-button:focus {
		border: 1px solid #00a790;
	}
	.socialmedia-button img {
		border-radius: 50%;
		width: 100%;
		height: 100%;
	}
	.copy-button {
		position: absolute;
		right: 3%;
		top: 50%;
		transform: translateY(-50%);
		border: none;
		outline: none;
		background-color: #00a790;
		color: #0b0a0d;
		padding: 7px 14px;
		border-radius: 10px;
		cursor: pointer;
	}
	.copy-button:hover {
		background-color: #00a790cc;
	}
	.close-btn {
		border: none;
		outline: none;
		width: 40px;
		height: 40px;
		position: absolute;
		right: 24px;
		cursor: pointer;
		background-color: transparent;
		border-radius: 50%;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.close-btn:focus {
		background-color: #ffffff49;
	}
	.close-btn:hover {
		background-color: #ffffff49;
	}
	.input-overlay {
		min-width: 470px;
		margin-top: 25px;
		position: relative;
	}
	.input {
		height: 100%;
		width: 100%;
		border: none;
		font-size: 16px;
		font-weight: 400;
		text-align: left;
	}

	.input {
		color: #b4b4b4;
		height: 55px;
		outline: none;
		padding: 0 100px 0 16px;
		border-radius: 10px;
		background-color: #723f8c0d;
		border: 0.5px solid #723f8c0d;

		font-size: 14px;
		transition: all 0.2s ease;
		font-family: 'Montserrat', sans-serif;
	}
	.input:focus {
		border: 0.5px solid #00a790;
	}
	.content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: fit-content !important;
		border-radius: 27px;
		background: #0b0a0d;
		border-radius: 12px;
		padding: 24px;
		z-index: 101;
		color: #b4b4b4;
	}
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}
	.dg-btn {
		background-color: transparent;
		border: none;
		color: white;
		padding: 10px 25px;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
		font-size: 15px;
		border-radius: 10px;
	}
	.dg-btn:hover {
		background-color: #30706141;
	}
	.btn-group {
		display: flex;
		margin-top: 43px;
		gap: 10px;
		width: 100%;
		justify-content: end;
		font-size: 15px;
	}
	@media (max-width: 900px) {
		.socialmedia-buttons div p {
			font-size: 12px;
		}
		.socialmedia-buttons {
			gap: 10px;
		}
		.socialmedia-button {
			width: 32px;
			height: 32px;
		}
		.content {
			width: 330px;
		}
		.input-overlay {
			min-width: 280px !important;
		}
	}
</style>
