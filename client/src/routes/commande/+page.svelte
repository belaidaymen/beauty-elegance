<script lang="ts">
	import HeaderTopContainer from '$lib/components/HeaderTopContainer.svelte';
	import OrderFormSection from '$lib/components/OrderPage/OrderFormSection.svelte';
	import OrderSummarySection from '$lib/components/OrderPage/OrderSummarySection.svelte';
	import InfoContainer from '$lib/components/InfoContainer.svelte';
	import FeaturesContainer from '$lib/components/FeaturesContainer.svelte';
	import MediaQuery from 'svelte-media-queries';
	import { cart } from '$lib/stores/cart_store';

	let isCartEmpty = false;

	$: isCartEmpty = $cart.length === 0;
</script>

<svelte:head>
	<title>Commander | Beaute & Elegance</title>
</svelte:head>

<HeaderTopContainer brownBackground={true} />
<nav class="order-nav">
	<h1>Commander</h1>
</nav>

{#if isCartEmpty}
	<main class="empty-cart-container">
		<div class="empty-message">
			<h2>Votre panier est vide</h2>
			<p>Veuillez ajouter des produits à votre panier avant de commander</p>
			<a href="/" class="back-link">Retour à l'accueil</a>
		</div>
	</main>
{:else}
	<main class="order-main">
		<div class="order-container">
			<OrderFormSection />
			<OrderSummarySection />
		</div>
	</main>
{/if}

<MediaQuery query="(max-width: 1050px)" let:matches>
	{#if !matches}
		<footer>
			<hr />
			<h2 class="footer-title">A propos de nous</h2>
			<div class="container">
				<InfoContainer />
				<FeaturesContainer />
			</div>
			<div class="copyright-container">&copy; 2024 Beaute & Elegance. All rights reserved.</div>
		</footer>
	{/if}
</MediaQuery>

<style>
	:global(body) {
		background-color: #fafafa;
	}

	.order-nav {
		display: flex;
		height: 7vh;
		width: 100%;
		align-items: center;
		background-color: white;
		box-shadow: 0 5px 10px rgba(128, 128, 128, 0.151);
		justify-content: center;
		z-index: 9;
	}

	.order-nav h1 {
		font-size: 2.5rem;
		font-weight: 600;
		color: #b95959;
		opacity: 0.45;
	}

	.order-main {
		display: flex;
		justify-content: center;
		min-height: calc(100vh - 7vh);
		padding: 2rem;
	}

	.order-container {
		display: flex;
		justify-content: space-between;
		gap: 3rem;
		width: 100%;
		max-width: 1600px;
		align-items: flex-start;
	}

	.empty-cart-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - 7vh);
		padding: 2rem;
	}

	.empty-message {
		text-align: center;
		padding: 3rem;
	}

	.empty-message h2 {
		font-size: 2.5rem;
		color: #b95959;
		margin-bottom: 1rem;
		opacity: 0.45;
	}

	.empty-message p {
		font-size: 1.6rem;
		color: #666;
		margin-bottom: 2rem;
	}

	.back-link {
		display: inline-block;
		padding: 0.8rem 2rem;
		background-color: #b95959;
		color: white;
		border-radius: 50px;
		text-decoration: none;
		font-weight: 600;
		transition: background-color 0.3s ease;
	}

	.back-link:hover {
		background-color: #9d4949;
	}

	hr {
		border: solid 1px rgba(128, 128, 128, 0.185);
	}

	footer {
		margin-top: 2rem;
	}

	.footer-title {
		font-family: 'Abril Fatface';
		font-weight: lighter;
		text-align: center;
		margin-top: 2rem;
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

	@media (max-width: 1050px) {
		.order-container {
			flex-direction: column;
			gap: 2rem;
		}

		.order-main {
			padding: 1.5rem;
		}
	}

	@media (max-width: 768px) {
		.order-nav h1 {
			font-size: 2rem;
		}

		.order-main {
			padding: 1rem;
		}

		.empty-message h2 {
			font-size: 1.8rem;
		}

		.empty-message p {
			font-size: 1.4rem;
		}
	}

	@media (max-width: 365px) {
		.copyright-container {
			font-size: 1.3rem;
		}

		.empty-message {
			padding: 1.5rem;
		}
	}
</style>
