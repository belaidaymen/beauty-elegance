<script lang="ts">
	import { cart } from '$lib/stores/cart_store';
	import Product from '../Product.svelte';
	import { products } from '$lib/stores/products_store';
	import { onMount } from 'svelte';
	import InfoContainer from '$lib/components/InfoContainer.svelte';
	import FeaturesContainer from '$lib/components/FeaturesContainer.svelte';
	import MediaQuery from 'svelte-media-queries';
	import { initialPrice } from '$lib/stores/total_price_cart_store';
	import { goto } from '$app/navigation';

	let totalPrice = 0;

	cart.subscribe(($cart) => {
		totalPrice = $cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
		initialPrice.set(totalPrice);
	});

	function calculateProductPrices(): number {
		let totalPrice = 0;
		cart.subscribe(($cart) => {
			{
				$cart.forEach((product) => {
					totalPrice += product.price;
				});
			}
		});
		return totalPrice;
	}

	function goToOrderPage() {
		goto('/commande');
	}
</script>

<div class="confirmation-side">
	<h1 class="total-cart-title">TOTAL PANIER</h1>

	<div>
		<h1>Sous-total</h1>
		<span
			>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
				calculateProductPrices()
			)} DZD</span
		>
	</div>
	<hr />
	<div>
		<h1>Expédition</h1>
		<span
			>Saisissez votre adresse pour <br />voir les options de livraison
			<br />
			<br />
			<span class="link-Calcule">
				Calculer les frais <br /> d’expédition
			</span>
		</span>
	</div>
	<hr />
	<div class="bottom-confirmation-side">
		<div>
			<h1>Total</h1>
			<span class="total-price-confirmation">
				{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format($initialPrice)} DZD
			</span>
		</div>

		<button class="validation" on:click={goToOrderPage}>VALIDER LA COMMANDE</button>
	</div>
</div>

<MediaQuery query="(max-width: 1050px)" let:matches>
	{#if matches}
		<footer>
			<h2 class="footer-title">A propose de nous</h2>
			<div class="container">
				<InfoContainer />
				<FeaturesContainer />
			</div>
			<div class="copyright-container">&copy; 2024 Beaute & Elegance. All rights reserved.</div>
		</footer>
	{/if}
</MediaQuery>

<style>
	.confirmation-side {
		display: flex;
		border-radius: 32px;
		border: 4px solid rgba(128, 128, 128, 0.185);
		flex-direction: column;
		justify-content: space-around;
		height: 100%;
		width: 65vh;
		padding: 2rem;
		font-size: 1.5rem;
	}
	.confirmation-side div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: end;
		padding-inline: 1rem;
	}
	.confirmation-side div h1 {
		font-size: 1.8rem;
	}
	.confirmation-side .validation {
		border: none;
		background-color: hsla(0, 41%, 54%, 0.452);
		width: 100%;
		height: 7vh;
		border-radius: 50px;
		color: white;
		margin-top: 2rem;
		font-weight: 800;
		transition: 0.5s;
	}

	.confirmation-side .validation:hover {
		background-color: #b95959;
		cursor: pointer;
	}

	.confirmation-side .total-cart-title {
		font-size: 2.1rem;
		font-weight: 800;
		margin-bottom: 2rem;
	}
	.link-Calcule {
		color: hsla(0, 41%, 54%, 0.45);
		font-weight: 700;
	}
	.bottom-confirmation-side {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.bottom-confirmation-side div {
		display: flex;
		width: 100%;
	}
	.total-price-confirmation {
		color: hsla(0, 41%, 54%, 0.45);
		font-size: 2rem;
		font-weight: 700;
		-webkit-text-stroke: rgb(77, 77, 77) 0.1px;
	}
	hr {
		border: solid 1px rgba(128, 128, 128, 0.185);
	}
	footer {
		margin-top: 2rem;
		width: 100%;
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
    @media (min-width: 1367px) {
		.confirmation-side {
			height: 80%;
			width: 55vh;
		}


	}

	@media (min-width: 661px) and (max-width: 1050px) {
		.confirmation-side {
			display: flex;
			flex-direction: column;
			width: 95%;
		}
		.confirmation-side .validation {
			margin-top: 0rem;
		}
		.bottom-confirmation-side {
			margin-top: 2rem;
		}
	}
	@media (max-width: 660px) {
		.confirmation-side {
			width: 95%;
		}
		.confirmation-side .validation {
			margin-top: 0rem;
		}
		.bottom-confirmation-side {
			margin-top: 2rem;
		}
	}
	@media (max-width: 365px) {
		.copyright-container {
			font-size: 1.3rem;
		}
	}
</style>
