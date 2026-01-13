<script lang="ts">
	import HeaderTopContainer from '$lib/components/HeaderTopContainer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import CompaniesSlider from '$lib/components/CompaniesSlider.svelte';
	import ProductsGrid from '$lib/components/ProductsGrid.svelte';
	import FeaturesContainer from '$lib/components/FeaturesContainer.svelte';
	import InfoContainer from '$lib/components/InfoContainer.svelte';
	import Cart from '$lib/components/Cart.svelte';

	let hiddenContentContainer: HTMLDivElement;
	let voirPlusBtn: HTMLButtonElement;
</script>

<svelte:head>
	<title>Beaute & Elegance</title>
</svelte:head>

<header>
	<div class="fixed">
		<HeaderTopContainer />
		<Navbar />
	</div>
	<CompaniesSlider />
	<Cart />
</header>

<main id="main">
	<h3>DÉCOUVREZ!</h3>
	<ProductsGrid productsCategory="maquillage" />
	<ProductsGrid productsCategory="cheveux" />
	<div class="hidden-content-container" bind:this={hiddenContentContainer}>
		<ProductsGrid productsCategory="visage" />
		<ProductsGrid productsCategory="corps & bain" />
		<ProductsGrid productsCategory="deo & stick" />
	</div>

	<button
		class="voir-plus-btn"
		bind:this={voirPlusBtn}
		on:click={() => {
			voirPlusBtn.style.display = 'none';
			hiddenContentContainer.style.display = 'block';
			setTimeout(() => {
				hiddenContentContainer.style.transform = 'translateX(0)';
			});
		}}
	>
		voir plus
	</button>
</main>

<footer>
	<h2 class="footer-title">A propose de nous</h2>
	<div class="container">
		<InfoContainer />
		<FeaturesContainer />
	</div>
	<div class="copyright-container">&copy; 2024 Beaute & Elegance. All rights reserved.</div>
</footer>

<style>
	main {
		border: 0.2rem solid rgb(243, 243, 243);
		border-right: none;
		border-left: none;
		margin-top: 6rem;
		padding-bottom: 4rem;
	}

	main,
	footer {
		position: relative;
		top: 16rem;
	}

	main > h3:first-child {
		text-align: center;
		font-weight: lighter;
		letter-spacing: 0.3rem;
	}

	.voir-plus-btn {
		font-family: 'Andada Pro';
		color: #000;
		text-decoration: none;
		font-size: 2rem;
		background: #f1dada;
		padding: 0.5em 2.7em;
		transition: 0.3s;
		outline: 0.2rem solid transparent;
		display: block;
		margin: auto;
		margin-bottom: 2rem;
		margin-top: 7rem;
		border: none;
		cursor: pointer;
	}
	.voir-plus-btn:hover {
		--text-color: #eec8c8;
		outline-color: var(--text-color);
		background: #fff;
		color: var(--text-color);
	}

	.hidden-content-container {
		display: none;
		transition: transform 0.4s;
		transform: translateX(-100%);
	}

	.fixed {
		position: fixed;
		z-index: 9;
		width: 100%;
		box-shadow: 0 0 3rem #0002;
	}

	footer {
		margin-top: 2rem;
	}

	.footer-title {
		font-family: 'Abril Fatface';
		font-weight: lighter;
		text-align: center;
	}
	footer .container {
		display: flex;
		margin-top: 5rem;
		align-items: start;
		justify-content: space-evenly;
		gap: 4rem;
		flex-wrap: wrap;
		padding-inline: 3rem;
	}
	.copyright-container {
		margin-top: 8rem;
		min-height: 5rem;
		background: #f0d9d9;
		display: grid;
		place-content: center;
	}

	@media (max-width: 365px) {
		.copyright-container {
			font-size: 1.3rem;
		}
	}
</style>
