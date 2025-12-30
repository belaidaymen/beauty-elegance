<script lang="ts">
	import HeaderTopContainer from '$lib/components/HeaderTopContainer.svelte';
	import ProductUI from '$lib/components/SingleProductUI/ProductUI.svelte';

	import { products } from '$lib/stores/products_store';
	import Cart from '$lib/components/Cart.svelte';
	import { cart } from '$lib/stores/cart_store';
</script>

<HeaderTopContainer />

<main>
	<Cart />
	<ProductUI />
</main>

<style>
	main {
		display: flex;
	}

	.container {
		display: flex;

		align-items: center;
		width: 100%;
		gap: 5rem;
		padding: 2rem;
	}
	.product-img {
		border: 5px solid rgba(107, 107, 107, 0.164);
		border-radius: 50px;
		width: 70vh;
	}
	.container .right-elements {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		width: 100%;
	}
	.text-container {
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		width: 100%;
	}
	.price-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.right-elements p,
	.right-elements h1 {
		display: flex;
		width: 100%;
		font-weight: 600;
		font-family: open, sans-serif;
	}
	.title-continer {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.small-detail {
		color: gray;
	}
	.Qte {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: start;
		gap: 2rem;
		font-weight: 600;
		font-family: open, sans-serif;
	}
	.Qte-general-input {
		display: flex;
		align-items: center;
		justify-content: center;
		border-collapse: collapse;

		overflow: hidden;
		width: 12vh;
		height: 7vh;

		font-size: 2rem;
	}
	.Qte-general-input input[type='button'] {
		display: flex;
		border: 2px solid rgba(128, 128, 128, 0.349);
		font-size: 1.7rem;
		width: 40%;
		outline: none;
		height: 100%;
		transition: 0.3s;
		background-color: white;
	}
	.Qte-general-input input[type='number'] {
		display: flex;
		align-items: center;
		text-align: center;
		border: none;
		width: 60%;
		height: 100%;
		outline: none;
		border-block: 2px solid rgba(128, 128, 128, 0.349);
		font-size: 1.7rem;
	}
	.Qte-general-input .rightbt {
		border-top-right-radius: 100px;
		border-bottom-right-radius: 100px;
	}
	.Qte-general-input .leftbt {
		border-top-left-radius: 100px;
		border-bottom-left-radius: 100px;
	}

	.Qte-general-input .leftbt:hover,
	.Qte-general-input .rightbt:hover {
		background: #b95959;
		cursor: pointer;
		border: 2px solid #b95959;
	}

	.Qte input[type='number']::-webkit-inner-spin-button,
	.Qte input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}
	.price {
		font-size: 3rem;
		color: hsla(0, 41%, 54%, 0.452);
		margin-block: 2rem;
	}
	.ajoute-panier {
		border: none;
		background-color: hsla(0, 41%, 54%, 0.452);
		width: 80%;
		height: 8vh;
		border-radius: 50px;
		color: white;
		font-size: 1.8rem;
		font-weight: 800;
		transition: 0.5s;
	}
</style>
