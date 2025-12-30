<script lang="ts">
	import ProductCard from './ProductCard.svelte';
	import type { Product } from '$lib/stores/products_store';

	export let filteredProducts: Product[] = [];
	export let categories: string[] = [];
</script>

<div class="products-grid-container">
	{#if filteredProducts.length > 0}
		<div class="products-grid">
			{#each filteredProducts as product (product.id)}
				<ProductCard {product} {categories} />
			{/each}
		</div>
	{:else}
		<div class="no-data">
			<p>🛍️ Aucun produit trouvé</p>
		</div>
	{/if}
</div>

<style>
	.products-grid-container {
		background: white;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
		padding: var(--spacing-lg);
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--spacing-lg);
	}

	.no-data {
		padding: var(--spacing-2xl);
		text-align: center;
		color: var(--color-text-lighter);
		font-size: 1.6rem;
	}

	@media (max-width: 1024px) {
		.products-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		}
	}

	@media (max-width: 768px) {
		.products-grid {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
			gap: var(--spacing-md);
		}

		.products-grid-container {
			padding: var(--spacing-md);
		}
	}

	@media (max-width: 480px) {
		.products-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
