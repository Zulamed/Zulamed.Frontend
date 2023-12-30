<script lang="ts">
	import { user } from '$lib/stores/auth';
</script>

<div class="container">
	<div class="account-settings">
		<div class="sector-1">
			<h4 class="title">Account</h4>
			<h1 class="subtitle">Choose how you appear and what you see on ZulaMED</h1>
			<h4 class="more-info">Signed in as {$user?.email}</h4>
			<hr style="color: #60606049;" />
		</div>
		<div class="sector-2">
			<h1 class="subtitle-2">Your ZulaMED channel</h1>
			<h4 class="more-info">
				This is your public presence on YouTube. You need a channel to upload your own videos,
				comment on videos or create playlists.
			</h4>
			<div class="your-channel">
				<p>My channel</p>
				<div class="channel-main-info">
					<a href="/user/{$user?.id}">
						<img src={$user?.profilePictureUrl ?? '/img/icons/channel-logo.jpg'} alt="" />
					</a>
					<p class="username">{$user?.login}</p>
				</div>
			</div>
			<hr style="color: #60606049;" />
		</div>
		<div class="sector-3">
			<h1 class="subtitle-2">Your account</h1>
			<div class="membership">
				<p>Membership</p>
				<div>
					<p>No membership</p>
					<p>|</p>
					<a href="/membership">Get ZulaMED Premium</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		margin-left: 300px;
	}
	.account-settings {
		width: 100%;
		padding: 40px 59px 40px 180px;
		background-color: #fff;
	}
	.sector-1,
	.sector-2 {
		margin-bottom: 49px;
	}
	.title {
		margin-bottom: 54px;
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 500;
	}
	.subtitle-2,
	.subtitle {
		margin-bottom: 20px;
		color: #000;
		font-size: 30px;
		font-style: normal;
		font-weight: 500;
	}
	.more-info {
		margin-bottom: 54px;
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}
	/* ===== */
	.your-channel {
		display: flex;
		gap: 69px;
		margin-bottom: 43px;
	}
	.your-channel p {
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 500;
	}
	.channel-main-info {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.channel-main-info a img {
		width: 86px;
		height: 86px;
		object-fit: cover;
		border-radius: 50%;
	}
	.channel-main-info .username {
		color: #000;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
	}
	.membership {
		display: flex;
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 500;
		gap: 74px;
	}
	.membership a {
		color: var(--primary-color);
		text-decoration: none;
	}
	.membership div {
		display: flex;
		gap: 5px;
	}
	@media (max-width: 1440px) {
		.account-settings {
			padding: 40px 0px 40px 59px;
		}
		.title {
			margin-bottom: 49px;
		}
		.subtitle {
			font-size: 15px;
		}
		.subtitle-2 {
			font-size: 18px;
		}
		.more-info {
			font-size: 14px;
			font-weight: 700;
			margin-bottom: 30px;
		}
		.your-channel {
			align-items: center;
			gap: 27px;
		}
		.your-channel p {
			font-size: 15px;
		}
		.channel-main-info a img {
			width: 71px;
			height: 71px;
		}
		.membership {
			font-size: 15px;
			gap: 60px;
		}
	}

	@media (max-width: 1023px) {
		.container {
			margin-top: 0;
		}
	}
	@media (max-width: 900px) {
		.your-channel {
			align-items: start;
		}
		.container {
			margin-left: 0;
			margin-top: 54px;
		}
		.account-settings {
			padding: 26px 23px 26px 23px;
		}
		.title {
			color: #000;
			font-size: 13px;
			font-style: normal;
			font-weight: 500;
			margin-bottom: 19px;
		}
		.subtitle {
			color: #000;
			font-size: 10px;
			font-style: normal;
			font-weight: 500;
			margin-bottom: 9px;
		}
		.more-info {
			max-width: 300px;
			color: #000;
			font-size: 10px;
			font-style: normal;
			font-weight: 500;
			margin-bottom: 38px;
		}
		.subtitle-2 {
			color: #000;
			font-size: 15px;
			font-style: normal;
			font-weight: 500;
		}
		.your-channel {
			flex-direction: column;
			gap: 23px;
		}
		.your-channel p {
			color: #000;
			font-size: 15px;
			font-style: normal;
			font-weight: 500;
		}
		.membership {
			color: #000;
			font-size: 10px;
			font-style: normal;
			font-weight: 500;
			gap: 21px;
		}
	}
</style>
