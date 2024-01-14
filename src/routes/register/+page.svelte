<script lang="ts">
	import { onMount } from 'svelte';
	import RegisterForm from './components/registerForm/registerForm.svelte';
	import type { BranchType } from './components/types';

	let headerNote = false;
	let justify = 'center';
	let matches768px = false;
	function onStepChanged(e: CustomEvent<{ step: number; branch: BranchType }>) {
		headerNote = false;
		if (matches768px) {
			justify = e.detail.step == 0 ? 'center' : 'start';
		} else {
			justify = 'center';
		}
		if (e.detail.step == 0)
            headerText = 'Create Your <br /> ZulaMed Account';
        else{
            headerText = undefined;
        }
		if (e.detail.step == 5 && e.detail.branch != 'university') headerText = 'Last step';
		if (e.detail.step == 4) headerNote = true;
		if (e.detail.branch == 'university') headerNote = false;
		if (
			(e.detail.step == 4 && e.detail.branch == 'university') ||
			(e.detail.step == 4 && e.detail.branch == 'hospital')
		) {
			headerNote = false;
			headerText = 'Last step';
		} else {
			headerText;
		}
	}
	let headerText: string | undefined = 'Create Your <br /> ZulaMed Account';
	onMount(() => {
		let media = window.matchMedia('(max-width:768px)');
		const match768px = () => {
			matches768px = media.matches;
		};
		match768px();
		media.addEventListener('change', match768px);
		return () => {
			media.removeEventListener('change', match768px);
		};
	});
</script>

<svelte:head>
	<title>Register - ZulaMED</title>
</svelte:head>

<section class="container forms">
	<img class="container-img" src="img/main-background-mobile.png" alt="" />
	<div class="container-overlay" />
	<div class="form register" style:justify-content={justify}>
    {#if headerText}
		<header>
			<h2>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html headerText}
			</h2>
		</header>
    {/if}
		{#if headerNote == true}
			<p class="note">
				Please provide the legal name of your hospital, university or research centre. If you work
				in multiple university, please provide the one where you spend the most time or that you
				consider to be your main place of practice.
			</p>
		{/if}

		<RegisterForm on:stepChanged={onStepChanged} />

		<div class="form-link">
			<a href="/login" class="link signin-link">Click here</a> <span>to go back to Login</span>
		</div>
	</div>
</section>

<style>
	.note {
		color: #585858;
		text-align: center;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
	}
	.container {
		height: calc(100vh - 74px);
		width: 100%;
		background: #018b7b;
		display: grid;
	}
	.container-img {
		width: 100%;
		height: 80%;
		position: absolute;
		top: 0;
		left: 0;
		object-position: top;
		object-fit: cover;
	}
	.container-overlay {
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: #fff;
		filter: opacity(0.66);
	}
	h2 {
		color: #000;
		text-align: center;
		font-size: 32px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.form-link span {
		color: #273b4a;
		font-size: 19px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.form-link {
		text-align: center;
		margin-top: 16px;
	}
	.signin-link {
		color: #273b4a;
		font-size: 19px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-decoration-line: underline;
	}
	.form::-webkit-scrollbar {
		display: none;
	}

	.form {
		place-self: center;
		max-width: 600px;
		width: 100%;
		max-height: 88vh;
		height: 100%;
		border-radius: 27px;
		background: #fff;
		padding: 0 50px 0 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
		overflow-y: scroll;
		z-index: 1;
	}

	@media (max-width: 1440px) {
		.form {
			padding: 0 32px 0 32px;
			max-width: 448px;
		}
		.form-link span,
		.signin-link {
			font-size: 14px;
		}
		.form-link {
			margin-top: 22px;
		}
		h2 {
			font-size: 23px;
		}
	}
	@media (max-width: 1280px) {
		.container {
			margin-top: 74px !important;
		}
		.form {
			max-width: 370px;
			max-height: 85vh;
		}
		.form-link span,
		.signin-link {
			font-size: 11px;
		}
		.form-link {
			margin-top: 14px;
		}
		h2 {
			font-size: 22px;
		}
	}
    @media(max-width: 1024px){
        .container{
            margin-top: 0px !important;
        }
    }
	@media (max-width: 768px) {
		.note {
			margin-top: 14px;
		}
		.form {
			padding: 0 28px 20px 28px;
			max-width: 100%;
			max-height: 100vh;
			border-radius: 0;
			/* justify-content: start; */
			z-index: 0;
			overflow-y: auto;
		}
		.form-link span,
		.signin-link {
			font-size: 14px;
		}
		.form-link {
			margin-top: 20px;
		}
		h2 {
			color: #018b7b;
			font-size: 25px;
		}
	}
	/* @media (max-width: 480px) {

	} */
</style>
