<script lang="ts">
	import MediaQuery from 'svelte-media-queries';
	import closeIcon from '$lib/assets/icons/close.png';
	import { shouldVerticalNavbarAppear } from '$lib/stores/navbar_visibility_store';

	const navLinksTexts = [
		'PROMOTION',
		'MAQUILLAGE',
		'CHEVEUX',
		'VISAGE',
		'CORPS & BAIN',
		'DEO & STICK'
	];

	let navbar: HTMLElement;
</script>

<MediaQuery query="(max-width: 950px)" let:matches>
	<nav bind:this={navbar} class:visible-vertical-nav={matches && $shouldVerticalNavbarAppear}>
		{#if matches}
			<button
				class="close-btn"
				on:click={() => {
					$shouldVerticalNavbarAppear = false;
					navbar.style.transition = 'transform 0.4s';

					setTimeout(() => {
						navbar.style.transition = '';
					}, 400);
				}}
			>
				<img src={closeIcon} alt="close" class="close-icon" />
			</button>
			<div class="seperator"></div>
		{/if}
		<ul>
			{#each navLinksTexts as linkText (linkText)}
				<li>
					<button
						class="nav-link"
						on:click={() => {
							if (navLinksTexts.slice(3).includes(linkText)) {
								document.querySelector('.voir-plus-btn')?.dispatchEvent(new MouseEvent('click'));
							}

							scrollBy({
								top:
									// @ts-ignore
									document.getElementById(linkText.toLowerCase())?.getBoundingClientRect().top - 180
							});
						}}>{linkText}</button
					>
				</li>
			{/each}
		</ul>
	</nav>
</MediaQuery>

<style>
	nav {
		background: #fff;
	}

	nav ul {
		display: flex;
		justify-content: space-around;
		padding: 2rem;
		list-style-type: none;
	}

	li .nav-link {
		color: #000;
		text-decoration: none;
		font-size: 2rem;
		transition: 0.2s color;
		background: none;
		border: none;
		cursor: pointer;
	}

	li .nav-link:hover {
		color: #d1b2b2;
	}

	@media screen and (max-width: 950px) {
		nav {
			height: 100vh;
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background: #fff;
			z-index: 999;
			overflow-y: scroll;
			transform: translateX(-100%);
		}
		nav::-webkit-scrollbar {
			display: none;
		}

		.visible-vertical-nav {
			transform: translateX(0%);
			transition: transform 0.4s;
		}

		.close-btn {
			position: fixed;
			background: #fff;
			border: none;
			cursor: pointer;
			width: 100%;
			height: 6rem;
			display: flex;
			justify-content: end;
			align-items: center;
			padding-right: 1.5rem;
			z-index: 9;
		}

		.close-icon {
			width: 3rem;
		}

		.seperator {
			width: 100%;
			height: 0.3rem;
			position: fixed;
			top: 6rem;
			left: 0;
			background: #000;
		}

		nav ul {
			flex-direction: column;
			justify-content: center;
			gap: 2rem;
			padding: 0;
			margin-bottom: 20rem;
			padding-left: 2rem;
			top: 10rem;
			position: relative;
		}

		li .nav-link {
			font-size: 2.4rem;
		}

		ul li {
			padding: 1rem;
			position: relative;
		}

		ul li::before {
			content: '';
			position: absolute;
			width: 1%;
			height: 80%;
			top: 50%;
			transform: translateY(-50%);
			left: -1rem;
			background: #fa9;
		}
	}
</style>
