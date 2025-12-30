<script lang="ts">
	import logo from '$lib/assets/logo-uncolored.png';
	import loginIcon from '$lib/assets/icons/add-user.png';
	import searchIcon from '$lib/assets/icons/search.png';
	import cartIcon from '$lib/assets/icons/shopping-cart.png';
	import MediaQuery from 'svelte-media-queries';
	import { shouldVerticalNavbarAppear } from '$lib/stores/navbar_visibility_store';
	import { shouldCartSidebarAppear } from '$lib/stores/cart_visibility_store';
	import { isAuthenticated } from '$lib/stores/user_store';

	export let brownBackground = false;
</script>

<MediaQuery query="(max-width: 950px)" let:matches>
	<div class="container" class:brown-container={brownBackground}>
		{#if matches}
			<MediaQuery query="(min-width: 590px) and (max-width: 950px)" let:matches>
				{#if !matches}
					<h1>Beaute & Elegance</h1>
				{/if}
			</MediaQuery>
			<div class="bottom-container">
				<div class="left-icons-container icons-container">
					<button class="hamburger-icon" on:click={() => ($shouldVerticalNavbarAppear = true)}>
						<div class="bar"></div>
						<div class="bar"></div>
						<div class="bar"></div>
					</button>
					<button class="search-btn"> <img src={searchIcon} alt="search" /></button>
				</div>
				<MediaQuery query="(min-width: 590px) and (max-width: 950px)" let:matches>
					{#if matches}
						<div class="title-and-logo-container">
							<h1>Beaute & Elegance</h1>
							<img src={logo} alt="logo" class="logo" />
						</div>
					{:else}
						<img src={logo} alt="logo" class="logo" />
					{/if}
				</MediaQuery>
				<div class="right-icons-container icons-container">
					{#if $isAuthenticated}
						<a href="/dashboard" class="login-btn" title="Dashboard"><img src={loginIcon} alt="dashboard" /></a>
					{:else}
						<a href="/login" class="login-btn"><img src={loginIcon} alt="login" /></a>
					{/if}
					<button on:click={() => ($shouldCartSidebarAppear = true)} class="shopping-cart-btn"
						><img src={cartIcon} alt="shopping-cart" /></button
					>
				</div>
			</div>
		{:else}
			<img src={logo} alt="logo" class="logo" />
			<h1>Beaute & Elegance</h1>
			<div class="icons-container">
				{#if $isAuthenticated}
					<a href="/dashboard" class="login-btn" title="Dashboard"><img src={loginIcon} alt="dashboard" /></a>
				{:else}
					<a href="/login" class="login-btn"><img src={loginIcon} alt="login" /></a>
				{/if}
				<button class="search-btn"> <img src={searchIcon} alt="search" /></button>
				<button on:click={() => ($shouldCartSidebarAppear = true)} class="shopping-cart-btn">
					<img src={cartIcon} alt="shopping-cart" /></button
				>
			</div>
		{/if}
	</div>
</MediaQuery>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 4rem;
		height: 10rem;
		background: #f0d9d9;
	}
	.brown-container {
		background-color: hsla(0, 41%, 54%, 0.45);
	}

	h1 {
		font-family: 'Andada Pro', serif;
		font-weight: lighter;
		font-size: 6.17rem;
	}

	.icons-container {
		display: flex;
		align-items: center;
		gap: 3rem;
	}
	.icons-container button {
		background: none;
		border: none;
	}

	img.logo {
		width: 7rem;
	}

	img:not(.logo) {
		width: 3.5rem;
		height: 3.5rem;
		cursor: pointer;
	}

	img[alt='shopping-cart'] {
		transform: rotateY(180deg);
		width: 4rem;
		height: 4rem;
	}

	@media screen and (max-width: 950px) {
		.container {
			height: 15rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 0;
			padding-bottom: 10rem;
			padding-top: 8rem;
		}

		.bottom-container {
			width: 100%;
			padding-inline: 1.5rem;
			display: flex;
			justify-content: space-between;
		}

		h1 {
			font-size: 5.5rem;
		}

		.hamburger-icon {
			display: flex;
			flex-direction: column;
			gap: 0.6rem;
			cursor: pointer;
			background: none;
			border: none;
		}
		.bar {
			width: 3rem;
			height: 0.4rem;
			border-radius: 2rem;
			background: #000;
		}

		.icons-container {
			gap: 1.2rem;
		}
	}

	@media (max-width: 365px) {
		.container {
			gap: 1.2rem;
		}

		h1 {
			font-size: 4.5rem;
		}

		img.logo {
			width: 5.5rem;
		}

		img:not(.logo) {
			width: 3rem;
			height: 3rem;
		}

		img[alt='shopping-cart'] {
			transform: rotateY(180deg);
			width: 3.5rem;
			height: 3.5rem;
		}
	}

	@media (min-width: 590px) and (max-width: 950px) {
		.container {
			height: 12rem;
			padding-block: 1rem;
		}

		.title-and-logo-container {
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			gap: 2rem;
		}
	}
</style>
