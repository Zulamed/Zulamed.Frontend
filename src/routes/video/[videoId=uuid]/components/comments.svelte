<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { Response } from '$backend/video/createComment/endpoint';
	import { onMount, tick } from 'svelte';
	import type { Comment } from '$backend/video/types';
	import Dropdown from '$lib/components/dropdown.svelte';
	import { melt } from '@melt-ui/svelte';
	import SplittedComment from './splittedComment.svelte';
	import { flyAndScale } from '$lib/animations/flyAndScale';
	import { addNotification } from '$lib/components/notification.svelte';
	import { getRelativeTime } from '$lib/utils/relativeTime';
	import { user } from '$lib/stores/auth';
	import IntersectionObserver from 'svelte-intersection-observer';
	import Spinner from '$lib/components/spinner.svelte';
	import { getComments } from '$backend/video/getCommentsForAVideo/endpoint';
	import { match } from 'ts-pattern';

	let commentDeletingId = '';
	let isEditing = false;
	let editingId = '';
	function startEditing(id: string) {
		isEditing = true;
		editingId = id;
	}
	let textArea: HTMLTextAreaElement;
	let confirmationVisible = false;
	let textAreaHeight = 25;
	function adjustTextAreaHeight(event: any) {
		event.target.style.height = '25px';
		event.target.style.height = `${event.target.scrollHeight}px`;
	}
	let editTextArea: HTMLTextAreaElement;
	let visibility = false;
	let showMoreCommentsButton = true;
	let inputVisibility = false;
	let inputVisibility2 = false;
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

	let editingDisabledProps = {
		disabled: true,
		color: '#FFFFFF',
		cursor: 'default',
		background: '#999999'
	};
	let editingEnabledProps = {
		disabled: false,
		color: '#FFFFFF',
		cursor: 'pointer',
		background: '#54B9A2'
	};
	let editingProps: typeof editingDisabledProps = editingDisabledProps;
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
	function openConfirmation(id: string) {
		confirmationVisible = true;
		commentDeletingId = id;
	}
	function cancelUnsubscribe() {
		confirmationVisible = false;
		commentDeletingId = '';
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
	function iNeedAutoComplete(data: Record<string, unknown>) {
		let response = data as Response;
		if (response.status === 'ok') {
			comments.push(response.data);
			comments = comments;
		}
	}

	function updateComment(comment: Comment, data: Record<string, unknown>) {
		let text = data.editedText as string;
		comment.content = text;
	}

	// let splittedStrings: string[] = [];

	function splitString(str: string): string[] {
		return str.split(/\r?\n/);
	}

	let commentDeleteForm: HTMLFormElement;
	let commentContainer: HTMLDivElement;
	let additionalCommentLoading = false;
	export let page = 1;
	export let totalComments: number;
	async function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
</script>

<IntersectionObserver
	element={commentContainer}
	on:intersect={async () => {
		if (!visibility) return;
		if (comments.length >= totalComments) return;
		additionalCommentLoading = true;
		await wait(200); // for smoothness(and testing), needs to be removed in the future TODO
		let response = await getComments(videoId, fetch, ++page, 10);
		match(response).with({ status: 'ok' }, ({ data }) => {
			comments = [...comments, ...data.comments];
		});

		additionalCommentLoading = false;
	}}
>
	<div id="play-video-comments" class="play-video-comments" bind:this={commentContainer}>
		<p style="margin-top: 20px ;margin-bottom: 69px;">{totalComments} comment(s)</p>

		<div class="write-comment">
			<img
				class="user-profile-picture"
				src={$user?.profilePictureUrl ?? '/img/icons/channel-logo.jpg'}
				alt=""
			/>
			<form
				method="post"
				action="?/comment"
				class="write-comment-input"
				use:enhance={() => {
					currentProps.disabled = true;

					return async ({ result, form }) => {
						if (result.type === 'success') {
							HTMLFormElement.prototype.reset.call(form);
							visibility = true;
							totalComments += 1;
							textArea.style.height = '25px';
							if (result.data) {
								iNeedAutoComplete(result.data);
							}
						} else {
							applyAction(result);
						}
						currentProps.disabled = false;
					};
				}}
			>
				<div style="position: relative;">
					<textarea
						bind:this={textArea}
						bind:value={inputText}
						style="height: {textAreaHeight}px; overflow-y: hidden;"
						placeholder="Add comment..."
						class="comment-input"
						name="comment-input"
						on:click={() => {
							inputVisibility = true;
						}}
						on:input={(e) => {
							adjustTextAreaHeight(e);
							currentProps = inputText.length > 0 ? enabledProps : disabledProps;
						}}
					/>
					<div class="comment-input-unfocus" />
					<div class="comment-input-focus" />
				</div>

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
							disabled={currentProps.disabled}
							type="submit"
							class="comment-btn comment"
							style="
							border: none;
                            background-color: {currentProps?.background};
                            color: {currentProps?.color};
                            cursor: {currentProps?.cursor};
                            disabled: {currentProps?.disabled};
                      ">Comment</button
						>
					</div>
				{/if}
			</form>
		</div>
		{#each rangeComments as comment}
			<div class="comment-container">
				<a href="/user/{comment.sentBy.id}">
					<img src={comment.sentBy.profilePictureUrl ?? '/img/icons/channel-logo.jpg'} alt="" />
				</a>
				{#if isEditing && comment.id == editingId}
					<form
						class="write-comment-input"
						method="post"
						action="?/editComment"
						use:enhance={() => {
							return async ({ result, form }) => {
								if (result.type === 'success') {
									HTMLFormElement.prototype.reset.call(form);
									isEditing = false;
									editingId = '';
									if (result.data) {
										updateComment(comment, result.data);
										comment = comment;
									}
								} else {
									applyAction(result);
								}
							};
						}}
					>
						<div style="position: relative;">
							<textarea
								bind:this={editTextArea}
								style="height: {textAreaHeight}px; overflow-y: hidden;"
								value={comment.content}
								class="comment-input"
								name="comment-input"
								on:click={() => {
									inputVisibility2 = true;
								}}
								on:input={(e) => {
									adjustTextAreaHeight(e);
									editingProps =
										editTextArea.value.length > 0 ? editingEnabledProps : editingDisabledProps;
								}}
							/>
							<div class="comment-input-unfocus" />
							<div class="comment-input-focus" />
						</div>

						<div class="write-comment-buttons" style:display="flex">
							<button
								type="button"
								class="comment-btn cancel-btn"
								on:click={() => {
									isEditing = false;
								}}>cancel</button
							>
							<button
								type="submit"
								class="comment-btn comment"
								style="
						border: none;
						background-color: {editingProps?.background};
						color: {editingProps?.color};
						cursor: {editingProps?.cursor};
						disabled: {editingProps?.disabled};
				  ">Save</button
							>
						</div>
						<input type="hidden" name="videoId" value={videoId} />
						<input type="hidden" name="commentId" value={comment.id} />
					</form>
				{:else}
					{@const relativeTime = getRelativeTime(comment.sentAt)}
					<div class="user-comment">
						<a href="/user/{comment.sentBy.id}"
							>{comment.sentBy.username}<span>{relativeTime}</span></a
						>
						<div class="comment-content">
							<!-- {#each splitString(comment.content) as commentContent} -->
							<!-- 	<span class="user-comment-text">{commentContent}</span> -->
							<!-- {/each} -->

							<SplittedComment
								commentTextClasses="user-comment-text"
								commentContents={splitString(comment.content)}
							/>
						</div>
					</div>
				{/if}
				<Dropdown>
					<button
						use:melt={trigger}
						slot="button"
						let:trigger
						class="dots-vertical"
						style:display={isEditing && comment.id == editingId ? 'none' : 'block'}
					>
						<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"
							><path
								d="M479.858-160Q460-160 446-174.142q-14-14.141-14-34Q432-228 446.142-242q14.141-14 34-14Q500-256 514-241.858q14 14.141 14 34Q528-188 513.858-174q-14.141 14-34 14Zm0-272Q460-432 446-446.142q-14-14.141-14-34Q432-500 446.142-514q14.141-14 34-14Q500-528 514-513.858q14 14.141 14 34Q528-460 513.858-446q-14.141 14-34 14Zm0-272Q460-704 446-718.142q-14-14.141-14-34Q432-772 446.142-786q14.141-14 34-14Q500-800 514-785.858q14 14.141 14 34Q528-732 513.858-718q-14.141 14-34 14Z"
							/></svg
						>
					</button>
					<div class="dropdown-container" slot="item" let:item>
						{#if $user?.id == comment.sentBy.id}
							<button
								class="dropdown-button"
								use:melt={item}
								on:click={async () => {
									startEditing(comment.id);
									await tick();
									editTextArea.style.height = `${editTextArea.scrollHeight}px`;
								}}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 0 24 24"
									width="24px"
									fill="#ffffff"
									><path d="M0 0h24v24H0V0z" fill="none" /><path
										d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
									/></svg
								>Edit</button
							>

							<button
								on:click={() => {
									openConfirmation(comment.id);
								}}
								class="dropdown-button"
								use:melt={item}
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
						{:else}
							<button class="dropdown-button" use:melt={item}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 0 24 24"
									width="24px"
									fill="#ffffff"
									><path d="M0 0h24v24H0V0z" fill="none" /><path
										d="M12.36 6l.4 2H18v6h-3.36l-.4-2H7V6h5.36M14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6L14 4z"
									/></svg
								>Report</button
							>
						{/if}
					</div>
				</Dropdown>
				{#if confirmationVisible && comment.id == commentDeletingId}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="overlay" on:click={cancelUnsubscribe} />
					<div
						class="content"
						transition:flyAndScale={{
							duration: 150,
							y: 8,
							start: 0.96
						}}
					>
						<h1 style="color: #000; font-size: 18px; margin-bottom: 13px; font-weight: 500">
							Delete comment
						</h1>
						<h2 class="comment-delete-title">Delete your comment permanently?</h2>
						<div class="comment-delete-actions">
							<button on:click={cancelUnsubscribe} class="delete-cancel"> Cancel </button>
							<form
								method="post"
								action="?/deleteComment"
								bind:this={commentDeleteForm}
								use:enhance={() => {
									return async ({ result, form, formData }) => {
										if (result.type === 'success') {
											HTMLFormElement.prototype.reset.call(form);
											totalComments--;
											comments = comments.filter((comment) => {
												return comment.id !== formData.get('commentId');
											});
											addNotification({
												data: {
													title: 'Comment deleted successfully.'
												}
											});
											cancelUnsubscribe();
										} else {
											applyAction(result);
										}
									};
								}}
							>
								<button class="delete-accept"> Delete </button>
								<input type="hidden" name="videoId" value={videoId} />
								<input type="hidden" name="commentId" value={comment.id} />
							</form>
						</div>
					</div>
				{/if}
			</div>
		{/each}
		{#if additionalCommentLoading}
			<Spinner />
		{/if}
	</div>
</IntersectionObserver>
{#if showMoreCommentsButton && comments.length > 2}
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
	.comment-delete-actions {
		margin-top: 20px;
		display: flex;
		justify-content: end;
	}
	.delete-accept,
	.delete-cancel {
		all: unset;
		cursor: pointer;
		font-size: 14px;
		font-weight: 600;
		padding: 7px 17px;
		border-radius: 20px;
	}
	.delete-accept {
		background-color: transparent;
		color: var(--btn-color);
	}

	.delete-cancel {
		color: #000;
		background-color: transparent;
	}
	.delete-cancel:hover {
		background-color: #d4d4d4;
	}
	.delete-accept:hover {
		background-color: #95d1c348;
	}
	.delete-cancel:active {
		background-color: #d4d4d4;
	}
	.delete-accept:active {
		background-color: #95d1c348;
	}
	.delete-cancel:focus {
		background-color: #d4d4d4;
	}
	.delete-accept:focus {
		background-color: #95d1c348;
	}
	.comment-delete-title {
		white-space: pre-wrap;
		color: #616163;
		font-size: 14px;
		font-weight: 400;
	}
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 40;

		background-color: rgb(0 0 0 / 0.5);
	}
	.content {
		background-color: #fff;
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 50;
		max-height: 85vh;
		width: auto;
		max-width: 350px;
		transform: translate(-50%, -50%);
		border-radius: 0.375rem;
		padding: 24px;
	}

	.content:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
	}

	/* ====================== */
	/* ====================== */
	.comment-input-unfocus {
		position: absolute;
		bottom: 0px;
		width: 100%;
		left: 50%;
		transform: translateX(-50%);
		height: 1px;
		z-index: 1;
		background-color: rgb(134, 134, 134);
	}
	.comment-input-focus {
		position: absolute;
		bottom: 0px;
		width: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 2px;
		z-index: 2;
		background-color: #000;
	}
	/* ====================== */
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
	.dropdown-container form {
		width: 100%;
		display: flex;
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
		cursor: auto;
		-webkit-user-drag: none;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		pointer-events: none;
		-ms-user-select: none;
	}

	.write-comment-input {
		margin-left: 20px;
		position: relative;
	}

	.comment-input {
		position: relative;
		width: 100%;
		resize: none;
		outline: none;
		border: none;
		background-image: none;
		font-size: 14px;
		background-color: transparent;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
	}

	.comment-input:focus ~ .comment-input-focus {
		width: 100%;
		transition: width 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
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
		text-transform: capitalize;
		font-weight: 500;
		text-align: center;
		padding: 13px 14px;
		border-radius: 24px;
		font-size: 14px;
	}

	.cancel-btn {
		background-color: transparent;
		border: 1px solid transparent;
	}

	.cancel-btn:hover {
		background-color: #e5e5e5;
		border: 1px solid #e5e5e5;
	}

	.comment {
		color: #616163;
		border: 1px solid #616163;
		cursor: default;
	}

	.comment-container {
		width: 100%;
		display: flex;
		margin-bottom: 39px;
		position: relative;
	}

	.comment-container:hover .dots-vertical {
		opacity: 1;
	}

	.comment-container img {
		border-radius: 50%;
		width: 48px;
		height: 48px;
	}
	.user-comment {
		max-width: 70%;
		margin-left: 20px;
	}
	.user-comment a {
		font-weight: 500;
		font-size: 16px;
		line-height: 19px;
		color: #000000;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.user-comment a span {
		font-weight: 500;
		font-size: 12px;
		line-height: 15px;
		color: #a1a1a1;
		margin-left: 16px;
		cursor: default;
	}
	.comment-content {
		margin-top: 7px;
	}

	.user-comment :global(.user-comment-text) {
		display: block;
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		color: #000000;
		word-break: break-all;
		white-space: pre-line;
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

	/* @media (max-width: 1280px) {
		.comment-input-focus {
			bottom: 3px;
		}
	} */
	@media (max-width: 1027px) {
		.comment-input-focus {
			display: none;
		}
		.play-video-comments {
			height: auto;
		}
		.comment-container {
			width: 100%;
		}
		.dots-vertical {
			opacity: 1;
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
		.more-comments {
			display: none;
		}
	}
</style>
