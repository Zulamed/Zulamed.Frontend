<script lang="ts"></script>

<div class="container">
	<header>
		<h1>A membership for everyone.</h1>
	</header>

	<!-- ====cards==== -->
	<div class="cards">
		<div class="card shadow">
			<ul>
				<li class="pack">Personal account</li>
				<li id="personal-account" class="price bottom-bar">&euro;9.99</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li>
					<button class="btn btn-hover">Learn More</button>
				</li>
			</ul>
		</div>
		<div class="card active shadow">
			<ul>
				<li class="pack">Professional account</li>
				<li id="professional-account" class="price bottom-bar">&euro;59.99</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li>
					<button class="btn active-btn">Learn More</button>
				</li>
			</ul>
		</div>
		<div class="card shadow">
			<ul>
				<li class="pack">Premium account</li>
				<li id="premium-account" class="price bottom-bar">Price on<br />request</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li class="bottom-bar">Compare membership</li>
				<li>
					<button class="btn btn-hover">Learn More</button>
				</li>
			</ul>
		</div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 0 15px 40px 15px;
	}
	header {
		color: hsl(232, 13%, 33%);
		margin: 3.3rem 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	/* =====cards==== */
	#premium-account {
		font-size: 1.517rem !important;
	}
	.cards {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.card {
		background-color: #fff;
		color: hsl(233, 13%, 49%);
		border-radius: 0.8rem;
	}
	.cards .card.active {
		background: linear-gradient(135deg, rgb(112, 214, 186, 1) 0%, rgb(0, 168, 146) 100%);
		color: #fff;
		display: flex;
		align-items: center;
		transform: scale(1.1);
		z-index: 0;
	}
	ul {
		margin: 2.6rem 4.5rem;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	ul li {
		list-style-type: none;
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 0.8rem 0;
		text-align: center;
	}
	ul li.price {
		font-size: 3rem;
		color: hsl(232, 13%, 33%);
		font-weight: bold;
		padding-bottom: 2rem;
	}
	.shadow {
		box-shadow: -5px 5px 15px 1px rgba(0, 0, 0, 0.1);
	}
	.card.active .price {
		color: #fff;
	}
	.btn {
		position: relative;
		margin-top: 1rem;
		height: 2.6rem;
		width: 13.3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
		color: #fff;
		outline: none;
		border: 0;
		font-weight: bold;
		cursor: pointer;
		/* background: linear-gradient(to right, rgb(0, 214, 186, 1), rgb(0, 168, 146, 1)); */
		background-size: 300% 100%;
		moz-transition: all 0.2s ease-in-out;
		-o-transition: all 0.2s ease-in-out;
		-webkit-transition: all 0.2s ease-in-out;
		transition: all 0.2s ease-in-out;
	}

	.btn:hover {
		background-position: 100% 0;
		moz-transition: all 0.2s ease-in-out;
		-o-transition: all 0.2s ease-in-out;
		-webkit-transition: all 0.2s ease-in-out;
		transition: all 0.2s ease-in-out;
	}
	.btn.btn-hover {
		background-image: linear-gradient(
			to right,
			rgb(0, 214, 186, 1),
			rgb(0, 168, 146, 1),
			rgb(0, 214, 186, 1)
		);
	}
	.btn.active-btn {
		background: #fff;
		color: hsl(232, 13%, 33%);
	}

	.bottom-bar {
		border-bottom: 2px solid hsl(240, 8%, 85%, 0.583);
	}
	.cards .card.active .bottom-bar {
		border-bottom: 2px solid hsla(240, 1%, 43%, 0.253);
	}
	.pack {
		font-size: 1.1rem;
	}
	@media (max-width: 1440px) {
		ul li {
			padding: 0.6rem 0;
			text-align: center;
			font-size: 15px;
		}
		ul li.price {
			font-size: 2.3rem;
			color: hsl(232, 13%, 33%);
			font-weight: bold;
			padding-bottom: 2rem;
		}
	}
	@media (max-width: 900px) {
		.cards {
			width: 100%;
			gap: 20px;
		}
		.card,
		.card.active {
			width: 100%;
		}

		.cards .card.active {
			transform: scale(1);
			align-items: center;
			justify-content: center;
		}
	}
</style>
