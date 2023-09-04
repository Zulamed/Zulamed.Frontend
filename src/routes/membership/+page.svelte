<script lang="ts"></script>

<div class="container">
	<div class="container-overlay" />
	<h1 class="title">A membership for everyone.</h1>
	<p class="subtitle">
		Submit videos and get more access to our video content library with one of our ZulaMED
		memberships
	</p>
	<div class="parent">
		<div class="div1">
			<div class="section">Compare Memberships</div>
			<div class="section">Compare Memberships</div>
			<div class="section">Compare Memberships</div>
			<div class="section">Compare Memberships</div>
			<div class="section">Compare Memberships</div>
			<div class="section">&nbsp;</div>
		</div>
		<div class="div2">
			<div class="section">Preview</div>
			<div class="section">&nbsp;</div>
			<div class="section">&nbsp;</div>
			<div class="section">&nbsp;</div>
			<div class="section">&nbsp;</div>
			<div class="section">FREE</div>
		</div>
		<div class="div3">
			<div class="section">Explorer</div>
			<div class="section">&nbsp;</div>
			<div class="section">&nbsp;</div>
			<div class="section">&nbsp;</div>
			<div class="section">&nbsp;</div>
			<div class="section">FREE</div>
		</div>
		<div class="div4">
			<div class="section">Professional</div>
			<div class="section">&nbsp;</div>
			<div class="section">&nbsp;</div>
			<div class="section">&nbsp;</div>
			<div class="section">&nbsp;</div>
			<div class="section">$10.00/Month</div>
		</div>
	</div>
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: url(/img/main-background-mobile.png);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: top center;
		padding: 94px 235px;
	}
	.container-overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: white;
		opacity: 0.7;
	}
	.parent {
		position: relative;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(6, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}
	.title {
		position: relative;
		color: #000;
		font-size: 78px;
		font-style: normal;
		font-weight: 400;
		text-align: center;
		margin-bottom: 56px;
	}
	.subtitle {
		margin-bottom: 136px;
		position: relative;
		color: #000;
		text-align: center;
		font-size: 28px;
		font-style: normal;
		font-weight: 400;
	}
	.div2 .section,
	.div3 .section,
	.div4 .section {
		padding: 171px 124px 0 124px;
		color: #000;
		font-size: 24px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		letter-spacing: 3.12px;
	}
	.div1 .section {
		padding: 90px 29px 0 29px;
		color: #000;
		font-size: 24px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		letter-spacing: 3.12px;
	}
	.section {
		border-bottom: 1px solid #000000;

		width: 100%;
		height: 281.6px;
	}
	.div1,
	.div2,
	.div3,
	.div4 {
		height: 1690px;
		width: 360px;
	}
	.div1 {
		grid-area: 1 / 1 / 7 / 1;
		background-color: #ffffff;
	}
	.div2 {
		grid-area: 1 / 2 / 7 / 2;
		background-color: #f1f1f1;
	}
	.div3 {
		grid-area: 1 / 3 / 7 / 3;
		background-color: #00d6ba;
	}
	.div4 {
		background-color: #71cac8;
		grid-area: 1 / 4 / 7 / 4;
	}
</style>
