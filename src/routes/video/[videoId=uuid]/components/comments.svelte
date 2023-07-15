<script lang="ts">
	import { onMount } from 'svelte';

	let visibility = false;
	let showMoreCommentsButton = true;
	onMount(() => {
		const resize = () => {
			if (window.innerWidth > 600) {
				visibility = false;
				showMoreCommentsButton = true;
			} else {
				visibility = true;
				showMoreCommentsButton = false;
			}
		};
		resize();
		window.addEventListener('resize', resize);
		return () => {
			window.removeEventListener('resize', resize);
		};
	});
</script>

<div
	id="play-video-comments"
	class="play-video-comments"
	style:mask-image={!visibility
		? 'linear-gradient(180deg, rgba(0, 0, 0, 1), transparent 150%)'
		: ''}
>
	<p style="margin-bottom: 69px;">2k comments</p>

	<div class="write-comment">
		<img class="user-profile-picture" src="/img/icons/channel-logo.jpg" alt="" />
		<form class="write-comment-input">
			<input placeholder="Add comment..." type="text" class="comment-input" />
			<div class="write-comment-buttons">
				<button type="button" class="comment-btn cancel-btn">cancel</button>
				<button type="submit" disabled class="comment-btn comment">comment</button>
			</div>
		</form>
	</div>

	<div class="comment-container">
		<img src="/img/icons/channel-logo.jpg" alt="" />
		<div class="user-comment">
			<a href=".">Lorelai Gilbert <span>5 days ago</span></a>
			<p>
				While the anaesthetic team continue to look after you, the surgical team carry out your
				operation. The surgeon will have at least one assistant – I have known more than ten people
				to be part of this team for major head and neck cancer surgery. While the anaesthetic team
				continue to look after you, the surgical team carry out your operation.
			</p>
		</div>
	</div>
	<div class="comment-container">
		<img src="/img/icons/channel-logo.jpg" alt="" />
		<div class="user-comment">
			<a href=".">Lorelai Gilbert <span>1 day ago</span></a>
			<p>
				While the anaesthetic team continue to look after you, the surgical team carry out your
				operation. The surgeon will have at least one assistant – I have known more than ten people
				to be part of this team for major head and neck cancer surgery. While the anaesthetic team
				continue to look after you, the surgical team carry out your operation. While the
				anaesthetic team continue to look after you, the surgical team carry out your operation. The
				surgeon will have at least one assistant – I have known more than ten people to be part of
				this team for major head and neck cancer surgery. While the anaesthetic team continue to
				look after you, the surgical team carry out your operation.
			</p>
		</div>
	</div>
	{#if visibility}
		<div class="comment-container">
			<img src="/img/icons/channel-logo.jpg" alt="" />
			<div class="user-comment">
				<a href=".">Lorelai Gilbert <span>1 day ago</span></a>
				<p>
					While the anaesthetic team continue to look after you, the surgical team carry out your
					operation. The surgeon will have at least one assistant
				</p>
			</div>
		</div>
		<div class="comment-container">
			<img src="/img/icons/channel-logo.jpg" alt="" />
			<div class="user-comment">
				<a href=".">Lorelai Gilbert <span>1 day ago</span></a>
				<p>
					While the anaesthetic team continue to look after you, the surgical team carry out your
					operation. The surgeon will have at least one assistant
				</p>
			</div>
		</div>
	{/if}
</div>
{#if showMoreCommentsButton}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="more-comments flex-div"
		id="more-comments"
		on:click={() => {
			showMoreCommentsButton = false;
			visibility = true;
		}}
	>
		<img id="more-comments-icon" width="30px" src="/img/icons/expand_more_black_24dp.svg" alt="" />
	</div>
{/if}

<!-- put styles from play-video.css to here --->
<style></style>
