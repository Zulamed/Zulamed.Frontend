<script lang="ts">
	import { sidebarOpened } from '$lib/components/sidebarAndNavbar/stores/sidebarOpened';
	import UserHome from './components/userHome.svelte';
	// =====tabs======
	import { createTabs, melt } from '@melt-ui/svelte';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'tab-1'
	});

	let className = '';
	export { className as class };

	const triggers = [
		{ id: 'tab-1', title: 'Home' },
		{ id: 'tab-2', title: 'Playlist' },
		{ id: 'tab-3', title: 'Channels' },
		{ id: 'tab-4', title: 'About' }
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
	// =====tabs======
</script>

<div class="container" class:large-container={!$sidebarOpened}>
	<div class="channel-banner">
		<img src="." alt="" />
	</div>
	<div class="flex-div channel-info">
		<img src="/img/icons/user-logo160x160.jpg" alt="" />
		<div>
			<h5>Simon Riley</h5>
			<div class="main-info">
				<p>@simonriley</p>
				<p>3K followers</p>
			</div>
			<p style="text-decoration-line: underline;">More about this channel</p>
		</div>
	</div>
	<div class="subheader">
		<div class="tabs-container">
			<div use:melt={$root} class="tab-content">
				<div use:melt={$list} class="tabs-btns" aria-label="Manage your account">
					<div class="tabs-padding">
						{#each triggers as triggerItem}
							<button use:melt={$trigger(triggerItem.id)} class="tab-btn">
								{triggerItem.title}
								{#if $value === triggerItem.id}
									<div
										in:send={{ key: 'trigger' }}
										out:receive={{ key: 'trigger' }}
										class="tabs-underline"
									/>
								{/if}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class="btns-container">
			<button class="subheader-btn">Customise channel</button>
			<button class="subheader-btn">Upload video</button>
		</div>
		<hr />
	</div>
	<div use:melt={$content('tab-1')} class="grow bg-white p-5"><UserHome /></div>
	<div use:melt={$content('tab-2')} class="grow bg-white p-5">SAGOL</div>
	<div use:melt={$content('tab-3')} class="grow bg-white p-5">SIKDIR</div>
	<div use:melt={$content('tab-4')} class="grow bg-white p-5">GOT</div>
</div>

<style lang="css" src="./user.css"></style>
