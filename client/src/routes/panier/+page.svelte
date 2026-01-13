<script lang="ts">
	import HeaderTopContainer from '$lib/components/HeaderTopContainer.svelte';
	import ProductForCartPage from '$lib/components/CartPage/CartPagePrduct.svelte';
	import ResposiveSideCart from '$lib/components/CartPage/ResponsiveProductCart.svelte';
	import ConfirmationSideforCartPage from '$lib/components/CartPage/ConfirmationSideforCartPage.svelte';
	import InfoContainer from '$lib/components/InfoContainer.svelte';
	import FeaturesContainer from '$lib/components/FeaturesContainer.svelte';
	import MediaQuery from 'svelte-media-queries';
	import { cart } from '$lib/stores/cart_store';
	import { products } from '$lib/stores/products_store';
	let isrunned = false;
</script>

<svelte:head>
	<title>Panier | Beaute & Elegance</title>
</svelte:head>

<HeaderTopContainer brownBackground={true} />
<nav>
	<h1>Panier</h1>
</nav>
<main>
	<div class="container">
		<div class="product-details">
			<table class="main-table">
				<thead class="title-head-table">
					<tr class="titles">
						<th></th>
						<th class="produit-Title">PRODUIT</th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th>PRIX</th>
						<th>QUANTITE</th>
						<th>sous-TOTAL</th>
					</tr>
				</thead>
				<tbody class="add-many-products">
					{#each $cart as product (product.name)}
						<ProductForCartPage {product} />
					{/each}
				</tbody>
			</table>
			<div class="resposive-side">
				<table class="table-phone">
					{#each $cart as product (product.name)}
						<ResposiveSideCart {product} />
					{/each}
				</table>
			</div>
			<ConfirmationSideforCartPage />
		</div>
	</div>
</main>
<MediaQuery query="(max-width: 1050px)" let:matches>
	{#if !matches}
		<footer>
			<hr />
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
	nav {
		display: flex;
		height: 7vh;
		width: 100%;

		align-items: center;
		background-color: white;
		box-shadow: 0 5px 10px rgba(128, 128, 128, 0.151);
		justify-content: center;
		z-index: -10;
	}
	nav h1 {
		font-size: 2.5rem;
		font-weight: 600;
		color: #b95959;
		opacity: 0.45;
	}
	.container {
		display: flex;
		justify-content: center;
		height: 70vh;
		gap: 2rem;
		margin: 2rem;
	}

	.container .titles {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		border-bottom: 2px solid rgba(128, 128, 128, 0.185);
	}

	.product-details {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: 3rem;
		margin-bottom: 1rem;
		width: 92%;
	}

	.main-table {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		width: 100%;


		height: 100%;
	}
	.main-table .add-many-products {
		height: 100%;
		overflow-y: auto;
	}
	.main-table .produit-Title {
		text-align: center;

		padding-left: 2rem;
	}
	hr {
		border: solid 1px rgba(128, 128, 128, 0.185);
	}

	.resposive-side {
		display: none;
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

	@media (min-width: 660px) and (max-width: 1050px) {
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;
			margin: 0;
			height: 100vh;
			width: 100%;
		}
		.product-details {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
		}

		.add-many-products {
			overflow-y: auto;
		}
		.main-table{
			width: 100%;
			padding-inline: 3rem;
		}
	}
	@media (max-width: 758px) {
		.container {
			margin: 0;
			width: 100%;
		}
	
	}
	@media (max-width: 660px) {
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;
			margin: 0;
			height: 100vh;
			width: 100%;
			padding: 0;
		}
		.product-details {
			display: flex;
			flex-direction: column;
			justify-content: baseline;
			align-items: center;
			margin-top: 2rem;

			width: 100%;
		}

		.main-table {
			display: none;
		}
		.resposive-side {
			display: flex;
			flex-direction: column;
			width: 100%;
			justify-content: center;
			text-align: center;
			padding-inline: 3rem;
		}
	}
	@media (max-width: 365px) {
		.copyright-container {
			font-size: 1.3rem;
		}
	}
</style>
