<script lang="ts">
	// import './style.css';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<!-- ------------main--------------- -->
<div class="banner">
	<!-- <div class="searchbar flex-div"> -->
	<form class="searchbar flex-div" action="">
		<div class="searchbox">
			<input type="text" placeholder="Search..." />
		</div>
		<button class="search-button" type="submit">
			<img src="/img/icons/search_white_24dp.svg" alt="" />
		</button>
	</form>
	<!-- </div> -->
</div>
<div class="list-container">
	{#each data.videoResponse.videos as video}
		<div class="vid-list">
			<a class="preview" href="/video/{video.id}"
				><img src="{video.videoThumbnail}" class="thumbnail" alt="" /></a
			>
			<div class="flex-div">
				<img src="/img/icons/user.png" alt="" />
				<div class="vid-info">
					<a href="/video/{video.id}">{video.videoTitle}</a>
					<p>Lorem ipsum</p>
					<p class="vid-views">1k views</p>
				</div>
			</div>
		</div>
	{/each}
</div>
<div class="livelist-container m-b-84px">
	<div class="live-list">
		<a class="preview" href=".">
			<img src="/img/videoPreviews/live-skeleton.png" class="thumbnail" alt="" />
			<img class="live-icon" src="/img/icons/live.png" alt="" />
		</a>
		<div class="flex-div">
			<img src="/img/icons/user.png" alt="" />
			<div class="vid-info">
				<a href=".">LOREM IPSUM - Lorem ipsum</a>
				<p>Lorem ipsum</p>
				<p class="vid-views">1k watching</p>
			</div>
		</div>
	</div>

	<div class="live-list">
		<a class="preview" href=".">
			<img src="/img/videoPreviews/live-skeleton.png" class="thumbnail" alt="" />
			<img class="live-icon" src="/img/icons/live.png" alt="" />
		</a>
		<div class="flex-div">
			<img src="/img/icons/user.png" alt="" />
			<div class="vid-info">
				<a href=".">LOREM IPSUM - Lorem ipsum</a>
				<p>Lorem ipsum</p>
				<p class="vid-views">1k watching</p>
			</div>
		</div>
	</div>

	<div class="live-list">
		<a class="preview" href=".">
			<img src="/img/videoPreviews/live-skeleton.png" class="thumbnail" alt="" />
			<img class="live-icon" src="/img/icons/live.png" alt="" />
		</a>
		<div class="flex-div">
			<img src="/img/icons/user.png" alt="" />
			<div class="vid-info">
				<a href=".">LOREM IPSUM - Lorem ipsum</a>
				<p>Lorem ipsum</p>
				<p class="vid-views">1k watching</p>
			</div>
		</div>
	</div>

	<div class="live-list">
		<a class="preview" href=".">
			<img src="/img/videoPreviews/live-skeleton.png" class="thumbnail" alt="" />
			<img class="live-icon" src="/img/icons/live.png" alt="" />
		</a>
		<div class="flex-div">
			<img src="/img/icons/user.png" alt="" />
			<div class="vid-info">
				<a href=".">LOREM IPSUM - Lorem ipsum</a>
				<p>Lorem ipsum</p>
				<p class="vid-views">1k watching</p>
			</div>
		</div>
	</div>

	<div class="live-list">
		<a class="preview" href=".">
			<img src="/img/videoPreviews/live-skeleton.png" class="thumbnail" alt="" />
			<img class="live-icon" src="/img/icons/live.png" alt="" />
		</a>
		<div class="flex-div">
			<img src="/img/icons/user.png" alt="" />
			<div class="vid-info">
				<a href=".">LOREM IPSUM - Lorem ipsum</a>
				<p>Lorem ipsum</p>
				<p class="vid-views">1k watching</p>
			</div>
		</div>
	</div>

	<div class="live-list">
		<a class="preview" href=".">
			<img src="/img/videoPreviews/live-skeleton.png" class="thumbnail" alt="" />
			<img class="live-icon" src="/img/icons/live.png" alt="" />
		</a>
		<div class="flex-div">
			<img src="/img/icons/user.png" alt="" />
			<div class="vid-info">
				<a href=".">LOREM IPSUM - Lorem ipsum</a>
				<p>Lorem ipsum</p>
				<p class="vid-views">1k watching</p>
			</div>
		</div>
	</div>
</div>
<!-- ------------main--------------- -->
