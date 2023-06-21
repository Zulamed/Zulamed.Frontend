<script lang="ts">
	import { onMount } from 'svelte';
	import { scripts } from './play-video';
    import VideoPlayer from "$lib/components/videoPlayer/videoPlayer.svelte"
	onMount(async () => {
		scripts();
	});
</script>

<!-- ============MAIN============ -->
<div class="container">
	<div id="row" class="row">
		<div id="play-video" class="play-video">
			<div class="video-container">
				<VideoPlayer
					src="https://d2tldik98s0wn6.cloudfront.net/ba41d730-5c82-40d2-81ef-24aed5270420/master.m3u8"
				/>
			</div>

			<h3>What does an Operating Department Practitioner do?</h3>

			<div class="play-video-info">
				<div class="play-video-info-left">
					<div class="flex-div channel-info">
						<img src="./img/icons/channel-logo.jpg" alt="" />
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
							><img src="./img/icons/thumb_up_white_24dp.svg" alt="" />
							10k</button
						>
						<button id="dislike-btn" type="button" class="interaction-btn dislike-btn"
							><img src="./img/icons/thumb_down_white_24dp.svg" alt="" /></button
						>
					</div>
					<button type="button" class="interaction-btn share-btn"
						><img src="./img/icons/send_white_24dp.svg" alt="" />SHARE</button
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
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia quasi odio placeat
					distinctio magni. Culpa quos iusto, vel magni similique quae exercitationem minima id
					eveniet optio molestias blanditiis ea consectetur. Tempore earum quia illum dicta
					veritatis ad aperiam ipsum sed, at officia voluptates maiores ut atque sequi dolor ea
					magnam vel, molestias voluptas autem quos unde! Magni nisi quis tenetur? Dicta, facere.
					Iure consequuntur molestiae nam id nesciunt facere atque fugiat optio. Velit consectetur
					cum repellat animi totam impedit facere, eum, ea asperiores placeat quae corrupti! Ipsa
					accusantium error ab. Magnam soluta nulla consequuntur explicabo reiciendis corporis
					commodi quos id error accusantium facere minima tenetur sed tempore enim, officiis nobis
					ipsa hic quas, molestiae fugit dolorum, quasi dignissimos. Illum, repellendus. Dicta,
					aperiam nulla. Ipsum rerum exercitationem omnis ipsa, odio, vel quaerat, quae vitae
					corrupti veniam qui beatae ea asperiores. Et laudantium consequatur, consectetur earum
					beatae sed aspernatur veniam quibusdam rerum.
				</p>
			</div>

			<div id="play-video-comments" class="play-video-comments">
				<p style="margin-bottom: 69px;">2k comments</p>

				<div class="write-comment">
					<img src="./img/icons/channel-logo.jpg" alt="" />
					<form class="write-comment-input">
						<input placeholder="Add comment" type="text" class="comment-input" />
						<div class="write-comment-buttons">
							<button type="button" class="comment-btn cancel-btn">cancel</button>
							<button type="submit" disabled class="comment-btn comment">comment</button>
						</div>
					</form>
				</div>

				<div class="comment-container">
					<img src="./img/icons/channel-logo.jpg" alt="" />
					<div class="user-comment">
						<a href=".">Lorelai Gilbert <span>5 days ago</span></a>
						<p>
							While the anaesthetic team continue to look after you, the surgical team carry out
							your operation. The surgeon will have at least one assistant – I have known more than
							ten people to be part of this team for major head and neck cancer surgery. While the
							anaesthetic team continue to look after you, the surgical team carry out your
							operation.
						</p>
					</div>
				</div>
				<div class="comment-container">
					<img src="./img/icons/channel-logo.jpg" alt="" />
					<div class="user-comment">
						<a href=".">Lorelai Gilbert <span>1 day ago</span></a>
						<p>
							While the anaesthetic team continue to look after you, the surgical team carry out
							your operation. The surgeon will have at least one assistant – I have known more than
							ten people to be part of this team for major head and neck cancer surgery. While the
							anaesthetic team continue to look after you, the surgical team carry out your
							operation. While the anaesthetic team continue to look after you, the surgical team
							carry out your operation. The surgeon will have at least one assistant – I have known
							more than ten people to be part of this team for major head and neck cancer surgery.
							While the anaesthetic team continue to look after you, the surgical team carry out
							your operation.
						</p>
					</div>
				</div>
				<div class="comment-container">
					<img src="./img/icons/channel-logo.jpg" alt="" />
					<div class="user-comment">
						<a href=".">Lorelai Gilbert <span>1 day ago</span></a>
						<p>
							While the anaesthetic team continue to look after you, the surgical team carry out
							your operation. The surgeon will have at least one assistant
						</p>
					</div>
				</div>
				<div class="comment-container">
					<img src="./img/icons/channel-logo.jpg" alt="" />
					<div class="user-comment">
						<a href=".">Lorelai Gilbert <span>1 day ago</span></a>
						<p>
							While the anaesthetic team continue to look after you, the surgical team carry out
							your operation. The surgeon will have at least one assistant
						</p>
					</div>
				</div>
			</div>
			<div class="more-comments flex-div" id="more-comments">
				<img
					id="more-comments-icon"
					width="30px"
					src="./img/icons/expand_more_black_24dp.svg"
					alt=""
				/>
			</div>
		</div>

		<div id="right-videolist" class="right-videolist">
			<div class="scroll-chips">
				<div id="scroll-chips-overlay" class="scroll-chips-overlay">
					<div id="chips__choise" class="chips__choice">
						<button class="chip chip--active">All videos</button>
						<button class="chip">Author</button>
						<button class="chip">Related content</button>
						<button class="chip">Recently published</button>
						<button class="chip">Viewed</button>
					</div>
				</div>
				<div id="chips-prev" class="control prev">
					<img src="./img/icons/arrow_back_ios_black_24dp.svg" alt="" />
				</div>
				<div id="chips-next" class="control next">
					<img src="./img/icons/arrow_forward_ios_black_24dp.svg" alt="" />
				</div>
			</div>

			<div class="side-video-list">
				<a href="." class="small-thumbnail"><img src="./img/videoPreviews/1.png" alt="" /></a>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>
			<div class="side-video-list">
				<a href="." class="small-thumbnail"><img src="./img/videoPreviews/2.png" alt="" /></a>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>
			<div class="side-video-list">
				<a href="." class="small-thumbnail"><img src="./img/videoPreviews/3.png" alt="" /></a>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>
			<div class="side-video-list">
				<a href="." class="small-thumbnail"><img src="./img/videoPreviews/4.png" alt="" /></a>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>
			<div class="side-video-list">
				<a href="." class="small-thumbnail"><img src="./img/videoPreviews/5.png" alt="" /></a>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>

			<div class="side-video-list">
				<a href="." class="small-thumbnail"><img src="./img/videoPreviews/6.png" alt="" /></a>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>

			<div class="side-video-list">
				<a href="." class="small-thumbnail"><img src="./img/videoPreviews/1.png" alt="" /></a>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>

			<div class="side-video-list">
				<a href="." class="small-thumbnail"><img src="./img/videoPreviews/2.png" alt="" /></a>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>

			<div class="side-video-list">
				<a href="." class="small-thumbnail"><img src="./img/videoPreviews/3.png" alt="" /></a>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>

			<div class="side-video-list">
				<a href="." class="small-thumbnail"><img src="./img/videoPreviews/4.png" alt="" /></a>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>

			<div class="side-video-list">
				<a href="." class="small-thumbnail"><img src="./img/videoPreviews/5.png" alt="" /></a>
				<div class="vid-info">
					<a href=".">What happens during surgery?</a>
					<p>Lorem Ipsum</p>
					<p class="vid-views">670k views</p>
				</div>
			</div>

			<button id="showMoreButton">show more</button>
		</div>
	</div>
</div>

<!-- ============MAIN END============ -->
