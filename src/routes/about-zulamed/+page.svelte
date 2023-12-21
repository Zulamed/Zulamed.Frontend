<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { slide } from 'svelte/transition';

	let greetings = ['About', 'Über'];
	let index = 0;
	let roller: any;

	onMount(() => {
		roller = setInterval(() => {
			if (index === greetings.length - 1) index = 0;
			else index++;
		}, 2000);
	});

	onDestroy(() => {
		clearInterval(roller);
	});
</script>

<svelte:head>
	<title>About ZulaMED</title>
</svelte:head>

<div class="container">
	<h1 class="animated-text-mobile" transition:slide>
		About <span style="color: #42b398; letter-spacing: 3px">Zula</span><span
			style="color: #42b398; font-weight: 200; letter-spacing: 3px">MED</span
		>
	</h1>
	{#key index}
		<h1 class="animated-text" transition:slide>
			{greetings[index]} <span style="color: #42b398; letter-spacing: 3px">Zula</span><span
				style="color: #42b398; font-weight: 200; letter-spacing: 3px">MED</span
			>
		</h1>
	{/key}
	<p class="about-text">
		ZulaMed represents a groundbreaking initiative in the realm of medical education and
		collaboration. This platform serves as a nexus for healthcare professionals, offering
		unparalleled access to a wealth of medical knowledge and expertise. At its core, ZulaMed
		facilitates the seamless exchange of video content among doctors, ranging from intricate
		surgical procedures to comprehensive educational tutorials.
		<br />
		<br />
		The platform distinguishes itself through its innovative approach to medical learning. Leveraging
		the latest technological advancements, our team—comprising expert animators and seasoned medical
		professionals—meticulously curates and enhances educational content. This results in an intuitive,
		step-by-step instructional resource that is both accessible and highly informative for medical practitioners.
		<br />
		<br />
		The genesis of ZulaMed can be attributed to Dr. Rauf Safarov, an aspiring cardiothoracic surgeon.
		Dr. Safarov's vision was shaped by his own journey through the complexities of medical training and
		the quest for readily available, high-quality educational resources. This vision is brought to life
		by a dedicated team committed to revolutionizing the way medical knowledge is disseminated and consumed
		within the healthcare community. The project also involves a dedicated team working tirelessly to...
	</p>
</div>

<style>
	.container {
		padding: 8% 28%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		height: 100vh;
		width: 100%;
		margin-top: 0px;
	}
	.animated-text {
		font-size: 3rem;
	}
	.animated-text-mobile {
		display: none;
		font-size: 3rem;
	}
	.about-text {
		margin-top: 55px;
		font-size: 1.2rem;
		font-weight: normal;
		text-align: justify;
	}
	@media screen and (max-width: 1440px) {
		.container {
			padding: 8% 10%;
			margin-top: 0px;
		}
		.animated-text {
			font-size: 2.2rem;
		}
		.about-text {
			font-size: 1rem;
			margin-top: 40px;
		}
	}
	@media screen and (max-width: 1280px) {
		.container {
			padding: 11% 10% 0 10%;
			margin-top: 0px;
		}
	}
	@media screen and (max-width: 900px) {
		.container {
			padding: 12% 10%;

			margin-top: -74px;
		}
		.animated-text {
			display: none;
		}
		.animated-text-mobile {
			display: block;
			font-size: 2rem;
		}
		.about-text {
			font-size: 1rem;
			margin-top: 20px;
		}
	}
	@media screen and (max-width: 576px) {
		.container {
			height: fit-content;
			padding: 74px 10% 25px 10%;
			margin-top: -74px;
		}
	}
</style>
