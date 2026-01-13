<script lang="ts">
	import { products } from '$lib/stores/products_store';
	import Product from './Product.svelte';

	export let productsCategory: string;

	const categoryProducts = $products[productsCategory.toLowerCase()];
</script>

<h2 id={productsCategory.toLowerCase()} class="products-category-title">{productsCategory}</h2>
<div class="products-grid">
	{#each categoryProducts as product (product.name)}
		<Product {product} />
	{/each}
</div>

<style>
	.products-category-title {
		font-family: 'Abril Fatface';
		text-transform: uppercase;
		font-weight: lighter;
		text-align: center;
		margin-top: 2em;
		margin-bottom: 1.1em;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30rem, auto));
		align-items: start;
		align-content: center;
		gap: 2rem;
		width: 90%;
		margin: auto;
	}

	:global(.products-grid > *) {
		min-width: 95%;
	}

	@media (min-width: 380px) and (max-width: 646px) {
		.products-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 3rem 1rem;
		}
	}

	@media (max-width: 365px) {
		.products-grid {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
