<script lang="ts">
	import { onMount } from 'svelte';
	import { scripts } from './play-video';
	import VideoPlayer from './components/videoPlayer/videoPlayer.svelte';
	import type { PageData } from './$types';
	import Chips from './components/chips.svelte';
	onMount(async () => {
		scripts();
	});
	export let data: PageData;
</script>

<!-- ============MAIN============ -->
<div id="row" class="row">
	<div id="play-video" class="play-video">
		<div class="video-container">
			<VideoPlayer src="{data.video.videoUrl}/master.m3u8" poster="{data.video.videoThumbnail}"/>
		</div>

		<h3>{data.video.videoTitle}</h3>

		<div class="play-video-info">
			<div class="play-video-info-left">
				<div class="flex-div channel-info">
					<img src="/img/icons/channel-logo.jpg" alt="" />
					<div>
						<h5>Dr.Norman</h5>
						<p>680 K. followers</p>
					</div>
				</div>

				<button type="button" id="follow-btn" class="interaction-btn follow-btn">FOLLOW</button>
			</div>
			<div class="play-video-info-right">
				<div class="interaction-btn-group">
					<button id="like-btn" type="button" class="interaction-btn like-btn"
						><img src="/img/icons/thumb_up_white_24dp.svg" alt="" />
						10k</button
					>
					<button id="dislike-btn" type="button" class="interaction-btn dislike-btn"
						><img src="/img/icons/thumb_down_white_24dp.svg" alt="" /></button
					>
				</div>
				<button type="button" class="interaction-btn share-btn"
					><img src="/img/icons/send_white_24dp.svg" alt="" />SHARE</button
				>
			</div>
		</div>
		<div id="play-video-description" class="play-video-description">
			<div class="play-video-stats">
				<p>304k views</p>
				<p>5 days ago</p>
				<span>#cardio #operation</span>
			</div>

			<p class="description-text">
				{data.video.videoDescription}
			</p>
		</div>

		<div id="play-video-comments" class="play-video-comments">
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
						operation. The surgeon will have at least one assistant – I have known more than ten
						people to be part of this team for major head and neck cancer surgery. While the
						anaesthetic team continue to look after you, the surgical team carry out your operation.
					</p>
				</div>
			</div>
			<div class="comment-container">
				<img src="/img/icons/channel-logo.jpg" alt="" />
				<div class="user-comment">
					<a href=".">Lorelai Gilbert <span>1 day ago</span></a>
					<p>
						While the anaesthetic team continue to look after you, the surgical team carry out your
						operation. The surgeon will have at least one assistant – I have known more than ten
						people to be part of this team for major head and neck cancer surgery. While the
						anaesthetic team continue to look after you, the surgical team carry out your operation.
						While the anaesthetic team continue to look after you, the surgical team carry out your
						operation. The surgeon will have at least one assistant – I have known more than ten
						people to be part of this team for major head and neck cancer surgery. While the
						anaesthetic team continue to look after you, the surgical team carry out your operation.
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
		</div>
		<div class="more-comments flex-div" id="more-comments">
			<img
				id="more-comments-icon"
				width="30px"
				src="/img/icons/expand_more_black_24dp.svg"
				alt=""
			/>
		</div>
	</div>

	<div id="right-videolist" class="right-videolist">
		<Chips />

		<div class="side-video-list">
			<a href="." class="small-thumbnail"
				><img src="/img/videoPreviews/videoPreviewMobile.png" alt="" /></a
			>
			<div class="vid-info">
				<a href=".">What happens during surgery?</a>
				<p>Lorem Ipsum</p>
				<p class="vid-views">670k views</p>
			</div>
		</div>
		<div class="side-video-list">
			<a href="." class="small-thumbnail"><img src="/img/videoPreviews/2.png" alt="" /></a>
			<div class="vid-info">
				<a href=".">What happens during surgery?</a>
				<p>Lorem Ipsum</p>
				<p class="vid-views">670k views</p>
			</div>
		</div>
		<div class="side-video-list">
			<a href="." class="small-thumbnail"><img src="/img/videoPreviews/3.png" alt="" /></a>
			<div class="vid-info">
				<a href=".">What happens during surgery?</a>
				<p>Lorem Ipsum</p>
				<p class="vid-views">670k views</p>
			</div>
		</div>
		<div class="side-video-list">
			<a href="." class="small-thumbnail"><img src="/img/videoPreviews/4.png" alt="" /></a>
			<div class="vid-info">
				<a href=".">What happens during surgery?</a>
				<p>Lorem Ipsum</p>
				<p class="vid-views">670k views</p>
			</div>
		</div>
		<div class="side-video-list">
			<a href="." class="small-thumbnail"><img src="/img/videoPreviews/5.png" alt="" /></a>
			<div class="vid-info">
				<a href=".">What happens during surgery?</a>
				<p>Lorem Ipsum</p>
				<p class="vid-views">670k views</p>
			</div>
		</div>

		<div class="side-video-list">
			<a href="." class="small-thumbnail"><img src="/img/videoPreviews/6.png" alt="" /></a>
			<div class="vid-info">
				<a href=".">What happens during surgery?</a>
				<p>Lorem Ipsum</p>
				<p class="vid-views">670k views</p>
			</div>
		</div>

		<div class="side-video-list">
			<a href="." class="small-thumbnail"><img src="/img/videoPreviews/1.png" alt="" /></a>
			<div class="vid-info">
				<a href=".">What happens during surgery?</a>
				<p>Lorem Ipsum</p>
				<p class="vid-views">670k views</p>
			</div>
		</div>

		<div class="side-video-list">
			<a href="." class="small-thumbnail"><img src="/img/videoPreviews/2.png" alt="" /></a>
			<div class="vid-info">
				<a href=".">What happens during surgery?</a>
				<p>Lorem Ipsum</p>
				<p class="vid-views">670k views</p>
			</div>
		</div>

		<div class="side-video-list">
			<a href="." class="small-thumbnail"><img src="/img/videoPreviews/3.png" alt="" /></a>
			<div class="vid-info">
				<a href=".">What happens during surgery?</a>
				<p>Lorem Ipsum</p>
				<p class="vid-views">670k views</p>
			</div>
		</div>

		<div class="side-video-list">
			<a href="." class="small-thumbnail"><img src="/img/videoPreviews/4.png" alt="" /></a>
			<div class="vid-info">
				<a href=".">What happens during surgery?</a>
				<p>Lorem Ipsum</p>
				<p class="vid-views">670k views</p>
			</div>
		</div>

		<div class="side-video-list">
			<a href="." class="small-thumbnail"><img src="/img/videoPreviews/5.png" alt="" /></a>
			<div class="vid-info">
				<a href=".">What happens during surgery?</a>
				<p>Lorem Ipsum</p>
				<p class="vid-views">670k views</p>
			</div>
		</div>

		<button id="showMoreButton">show more</button>
	</div>
</div>

<!-- ============MAIN END============ -->
