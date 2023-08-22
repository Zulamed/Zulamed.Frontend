<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { Response } from '$backend/video/createComment/endpoint';
	import { onMount } from 'svelte';
	import type { Comment } from '$backend/video/types';

	let visibility = false;
	let showMoreCommentsButton = true;
	let inputVisibility = false;
	let inputText = '';
	let disabledProps = {
		disabled: true,
		color: '#FFFFFF',
		cursor: 'default',
		background: '#999999'
	};
	let enabledProps = {
		disabled: false,
		color: '#FFFFFF',
		cursor: 'pointer',
		background: '#54B9A2'
	};
	let currentProps: typeof disabledProps = disabledProps;

	let matches600px = false;

	$: {
		if (!matches600px) {
			visibility = false;
			showMoreCommentsButton = true;
		} else {
			visibility = true;
			showMoreCommentsButton = false;
		}
	}
	export let videoId: string;
	export let comments: Comment[];
	onMount(() => {
		let media = window.matchMedia('(max-width:600px)');
		const match600px = () => {
			matches600px = media.matches;
		};
		match600px();
		media.addEventListener('change', match600px);
		return () => {
			media.removeEventListener('change', match600px);
		};
	});
	$: rangeComments = !visibility ? comments.slice(0, 2) : comments;

    // push new comment to comments array
	function iNeedAutoComplete(data: Record<string,unknown>){
        let response = data as Response;
        if (response.status === "ok"){
            comments.push(response.data);
            comments = comments;
        }
	}
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
		<form
			method="post"
			action="?/comment"
			class="write-comment-input"
			use:enhance={() => {
				return async ({ result, form }) => {
					if (result.type === 'success') {
						HTMLFormElement.prototype.reset.call(form);
						visibility = true;
                        if (result.data){
                            iNeedAutoComplete(result.data); // i'm addicted
                            console.log(result.data);
                        }

					} else {
						applyAction(result);
					}
				};
			}}
		>
			<input
				placeholder="Add comment..."
				type="text"
				class="comment-input"
				name="comment-input"
				bind:value={inputText}
				on:click={() => {
					inputVisibility = true;
				}}
				on:input={() => {
					currentProps = inputText.length > 0 ? enabledProps : disabledProps;
				}}
			/>
			<input type="hidden" name="videoId" value={videoId} />
			{#if inputVisibility}
				<div class="write-comment-buttons" style:display="flex">
					<button
						type="button"
						class="comment-btn cancel-btn"
						on:click={() => {
							inputVisibility = false;
						}}>cancel</button
					>
					<button
						type="submit"
						class="comment-btn comment"
						style="
							border: none;
                            background-color: {currentProps?.background};
                            color: {currentProps?.color};
                            cursor: {currentProps?.cursor};
                            disabled: {currentProps?.disabled};
                      ">Send comment</button
					>
				</div>
			{/if}
		</form>
	</div>

	{#each rangeComments as comment}
		<div class="comment-container">
			<img src={comment.sentBy.profilePictureUrl ?? '/img/icons/channel-logo.jpg'} alt="" />
			<div class="user-comment">
				<a href="/user/{comment.sentBy.id}"
					>{comment.sentBy.username}<span>{comment.sentAt}</span></a
				>
				<p>{comment.content}</p>
			</div>
		</div>
	{/each}

	<!-- <div class="comment-container"> -->
	<!-- 	<img src="/img/icons/channel-logo.jpg" alt="" /> -->
	<!-- 	<div class="user-comment"> -->
	<!-- 		<a href=".">Lorelai Gilbert <span>1 day ago</span></a> -->
	<!-- 		<p> -->
	<!-- 			While the anaesthetic team continue to look after you, the surgical team carry out your -->
	<!-- 			operation. The surgeon will have at least one assistant – I have known more than ten people -->
	<!-- 			to be part of this team for major head and neck cancer surgery. While the anaesthetic team -->
	<!-- 			continue to look after you, the surgical team carry out your operation. While the -->
	<!-- 			anaesthetic team continue to look after you, the surgical team carry out your operation. The -->
	<!-- 			surgeon will have at least one assistant – I have known more than ten people to be part of -->
	<!-- 			this team for major head and neck cancer surgery. While the anaesthetic team continue to -->
	<!-- 			look after you, the surgical team carry out your operation. -->
	<!-- 		</p> -->
	<!-- 	</div> -->
	<!-- </div> -->
	<!-- {#if visibility} -->
	<!-- 	<div class="comment-container"> -->
	<!-- 		<img src="/img/icons/channel-logo.jpg" alt="" /> -->
	<!-- 		<div class="user-comment"> -->
	<!-- 			<a href=".">Lorelai Gilbert <span>1 day ago</span></a> -->
	<!-- 			<p> -->
	<!-- 				While the anaesthetic team continue to look after you, the surgical team carry out your -->
	<!-- 				operation. The surgeon will have at least one assistant -->
	<!-- 			</p> -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- 	<div class="comment-container"> -->
	<!-- 		<img src="/img/icons/channel-logo.jpg" alt="" /> -->
	<!-- 		<div class="user-comment"> -->
	<!-- 			<a href=".">Lorelai Gilbert <span>1 day ago</span></a> -->
	<!-- 			<p> -->
	<!-- 				While the anaesthetic team continue to look after you, the surgical team carry out your -->
	<!-- 				operation. The surgeon will have at least one assistant -->
	<!-- 			</p> -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- {/if} -->
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
<style>
	.play-video-comments {
		width: 100%;
		height: auto;
		border-radius: 0;
		padding: 8px 19px;
	}

	.play-video-comments p {
		width: 100%;
		font-weight: 600;
		font-size: 16px;
		line-height: 19px;
		color: #000000;
	}
	.write-comment {
		display: flex;
		align-items: start;
		margin-bottom: 39px;
	}

	.user-profile-picture {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.write-comment-input {
		margin-left: 20px;
	}

	.comment-input {
		font-size: 14px;
		position: relative;
		height: 25px;
		outline: none;
		border: none;
		background-image: none;
		background-color: transparent;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
		border-bottom: 1px solid rgb(134, 134, 134);
		transition: ease 0.2s all;
	}

	.comment-input:focus {
		border-bottom: 1px solid rgb(0, 0, 0);
	}

	.comment-input,
	.write-comment-buttons,
	.write-comment-input {
		width: 100%;
	}

	.write-comment-buttons {
		display: flex;
		justify-content: end;
		gap: 10px;
		align-items: center;
		margin-top: 16px;
		display: none;
	}

	.comment-btn {
		border: none;
		outline: none;
		background-color: transparent;
		cursor: pointer;
		text-transform: uppercase;
		font-weight: 500;
		line-height: 10px;
		text-align: center;
		padding: 10px 20px;
		border-radius: 24px;
	}

	.cancel-btn {
		background-color: transparent;
		border: 1px solid transparent;
	}

	.cancel-btn:hover {
		background-color: #cccccc;
		border: 1px solid #cccccc;
	}

	.comment {
		color: #616163;
		border: 1px solid #616163;
		cursor: default;
	}

	.comment-container {
		width: 70%;
		display: flex;
		margin-bottom: 39px;
	}

	.comment-container img {
		border-radius: 50%;
		margin-right: 20px;
		width: 48px;
		height: 48px;
	}
	.user-comment a {
		font-weight: 500;
		font-size: 16px;
		line-height: 19px;
		color: #000000;
		cursor: pointer;
	}

	.user-comment a span {
		font-weight: 500;
		font-size: 12px;
		line-height: 15px;
		color: #a1a1a1;
		margin-left: 16px;
	}

	.user-comment p {
		font-weight: 600;
		font-size: 14px;
		line-height: 17px;
		color: #000000;
		margin-top: 10px;
	}
	.more-comments {
		width: 100%;
		height: auto;
		justify-content: center;
		cursor: pointer;
	}

	.flex-div {
		display: flex;
		align-items: center;
	}
	a {
		text-decoration: none;
		color: #5a5a5a;
	}

	img {
		cursor: pointer;
	}

	@media (max-width: 1027px) {
		.play-video-comments {
			height: auto;
		}
		.comment-container {
			width: 100%;
		}
	}
	@media (max-width: 600px) {
		.play-video-comments {
			padding: 0;
		}
		.play-video-comments {
			mask-image: none !important;
			-webkit-mask-image: none !important;
			padding: 0 10px;
		}
		.comment-container {
			width: 100%;
		}
		.user-comment p {
			font-size: 14px;
			line-height: 17px;
		}
		.more-comments {
			display: none;
		}
	}
</style>
