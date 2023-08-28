<script lang="ts"></script>

<div class="settings-sidebar">
	<h1 class="sidebar-title">Settings</h1>
	<div class="sidebar-buttons">
		<a class="link active" href="/settings/account">Account</a>
		<a class="link" href="/settings/privacy">Privacy</a>
		<a class="link" href="/settings/billings">Billing and payments</a>
	</div>
</div>

<style>
	.settings-sidebar {
		background-color: #fff;
		position: fixed;
		top: 74px;
		left: 0;
		width: 300px;
		height: 100vh;
		padding: 18px 0;
	}

	.sidebar-title {
		color: #616163;
		font-size: 30px;
		font-style: normal;
		font-weight: 600;
		padding: 0 0 20px 34px;
	}

	.sidebar-buttons {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0 16px;
	}

	.sidebar-buttons .link:hover {
		background: #aaa9a9;
	}
	.sidebar-buttons .link {
		color: #000;
		font-size: 23px;
		font-style: normal;
		font-weight: 400;
		text-decoration: none;
		display: flex;
		align-items: center;
		width: 100%;
		flex-wrap: wrap;
		padding: 8px 22px 8px 18px;
		border-radius: 8px;
		margin-bottom: 8px;
	}

	.sidebar-buttons .link.active {
		background: #d9d9d9;
	}
	@media (max-width: 900px) {
		.settings-sidebar {
			width: 100%;
			height: 54px;
			padding: 0;
		}
		.sidebar-buttons {
			flex-direction: row;
			padding: 0 10px;
			gap: 5px;
		}
		.sidebar-buttons .link {
			width: fit-content;
			color: #000;
			font-size: 10px;
			font-style: normal;
			font-weight: 400;
			padding: 6px 13px;
			margin: 0;
		}
		.sidebar-title {
			color: #616163;
			font-size: 13px;
			font-style: normal;
			font-weight: 600;
			padding: 0 0 11px 23px;
		}
	}
</style>
