<script lang="ts"></script>

<div class="container">
	<div class="billings-settings">
		<div class="sector-1">
			<h4 class="title">Billing and payments</h4>
			<h1 class="subtitle">Choose how you make purchases on ZulaMED</h1>
			<h4 class="more-info">
				<a class="more-info" href="/membership">Click here</a> to choose your membership plan
			</h4>
		</div>
	</div>
</div>

<style>
	.container {
		margin-left: 300px;
	}
	.billings-settings {
		width: 100%;
		padding: 40px 59px 40px 180px;
		background-color: #fff;
	}
	.sector-1 {
		margin-bottom: 49px;
	}
	.title {
		margin-bottom: 54px;
		color: #000;
		font-size: 20px;
		font-style: normal;
		font-weight: 500;
	}
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

	@media (max-width: 1440px) {
		.billings-settings {
			padding: 40px 0px 40px 59px;
		}
		.title {
			margin-bottom: 49px;
		}
		.subtitle {
			font-size: 15px;
		}
		.more-info {
			font-size: 14px;
			font-weight: 700;
			margin-bottom: 30px;
		}
	}

	@media (max-width: 1023px) {
		.container {
			margin-top: 0;
		}
	}
	@media (max-width: 900px) {
		.container {
			margin-left: 0;
			margin-top: 54px;
		}
		.billings-settings {
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
	}
</style>
