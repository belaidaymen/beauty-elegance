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
		border-top: 2px solid #f0d9d9;
		border-bottom: 2px solid #f0d9d9;
		margin-top: 6rem;
		padding-bottom: 5rem;
		background: linear-gradient(180deg, #fff 0%, #faf9f8 50%, #f5f1f0 100%);
	}

	main,
	footer {
		position: relative;
		top: 16rem;
	}

	main > h3:first-child {
		text-align: center;
		font-weight: 400;
		letter-spacing: 0.4rem;
		font-size: 2.2rem;
		font-family: 'Abril Fatface', serif;
		color: #2a2a2a;
		text-transform: uppercase;
		margin-bottom: 3rem;
		padding-top: 3rem;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.voir-plus-btn {
		font-family: 'Andada Pro', serif;
		color: #333;
		text-decoration: none;
		font-size: 1.8rem;
		background: linear-gradient(135deg, #f1dada 0%, #f5e5e5 100%);
		padding: 1.2em 3.2em;
		transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
		outline: 2px solid transparent;
		outline-offset: 2px;
		display: block;
		margin: auto;
		margin-bottom: 3rem;
		margin-top: 8rem;
		border: none;
		cursor: pointer;
		border-radius: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		box-shadow: 0 6px 16px rgba(179, 119, 119, 0.2);
	}

	.voir-plus-btn:hover {
		background: linear-gradient(135deg, #fff 0%, #fff9f9 100%);
		outline-color: #f1dada;
		color: #8b5555;
		box-shadow: 0 12px 32px rgba(179, 119, 119, 0.28);
		transform: translateY(-3px);
	}

	.voir-plus-btn:active {
		transform: translateY(-1px);
	}

	.hidden-content-container {
		display: none;
		transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
		transform: translateX(-100%);
	}

	.fixed {
		position: fixed;
		z-index: 9;
		width: 100%;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
		backdrop-filter: blur(10px);
	}

	footer {
		margin-top: 3rem;
		background: linear-gradient(180deg, #faf9f8 0%, #f5f1f0 100%);
	}

	.footer-title {
		font-family: 'Abril Fatface', serif;
		font-weight: 400;
		text-align: center;
		font-size: 2.8rem;
		color: #2a2a2a;
		letter-spacing: -0.01em;
		padding-top: 3rem;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
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
		background: linear-gradient(90deg, #f0d9d9 0%, #f1dada 100%);
		display: grid;
		place-content: center;
		color: #2a2a2a;
		font-weight: 500;
		letter-spacing: 0.02em;
		font-family: 'Andada Pro', serif;
		border-top: 2px solid #e8d4d4;
	}

	@media (max-width: 365px) {
		.copyright-container {
			font-size: 1.3rem;
		}

		main > h3:first-child {
			font-size: 1.8rem;
		}

		.footer-title {
			font-size: 2rem;
		}
	}
</style>
