<script lang="ts"></script>

<div class="loader" />

<style>
	.loader {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
		overflow: hidden;
	}
	.loader:before {
		position: absolute;
		top: 50%;
		content: '';
		width: 30px;
		height: 30px;
		border: 3px solid;
		border-color: transparent transparent var(--primary-color) transparent;
		border-radius: 100%;
		animation: 1s spin ease infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(1turn);
		}
	}
</style>
