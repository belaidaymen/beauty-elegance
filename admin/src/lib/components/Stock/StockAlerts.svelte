<script lang="ts">
	import type { StockItem } from '$lib/stores/stock_store';

	export let stockItems: StockItem[] = [];

	$: lowStockItems = stockItems.filter((item) => item.status === 'low-stock');
	$: outOfStockItems = stockItems.filter((item) => item.status === 'out-of-stock');
</script>

<section class="alerts-section">
	{#if outOfStockItems.length > 0}
		<div class="alert alert-danger">
			<div class="alert-header">
				<span class="alert-icon">🚨</span>
				<h3>Rupture de Stock</h3>
			</div>
			<div class="alert-content">
				<p>{outOfStockItems.length} produit(s) en rupture de stock</p>
				<ul class="items-list">
					{#each outOfStockItems as item}
						<li>
							<span class="product-name">{item.productName}</span>
							<span class="action-link">Réapprovisionner →</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}

	{#if lowStockItems.length > 0}
		<div class="alert alert-warning">
			<div class="alert-header">
				<span class="alert-icon">⚠️</span>
				<h3>Stock Faible</h3>
			</div>
			<div class="alert-content">
				<p>{lowStockItems.length} produit(s) avec stock faible</p>
				<ul class="items-list">
					{#each lowStockItems as item}
						<li>
							<span class="product-info">
								<span class="product-name">{item.productName}</span>
								<span class="stock-info">Stock: {item.currentStock} / Minimum: {item.minimumThreshold}</span>
							</span>
							<span class="action-link">Ajouter →</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</section>

<style>
	.alerts-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: var(--spacing-lg);
	}

	.alert {
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-sm);
		border: 2px solid;
	}

	.alert-danger {
		border-color: var(--color-error);
		background: rgba(231, 76, 60, 0.05);
	}

	.alert-warning {
		border-color: var(--color-warning);
		background: rgba(243, 156, 18, 0.05);
	}

	.alert-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-lg);
		border-bottom: 2px solid;
	}

	.alert-danger .alert-header {
		border-bottom-color: var(--color-error);
		background: rgba(231, 76, 60, 0.1);
	}

	.alert-warning .alert-header {
		border-bottom-color: var(--color-warning);
		background: rgba(243, 156, 18, 0.1);
	}

	.alert-icon {
		font-size: 2.4rem;
	}

	.alert-header h3 {
		margin: 0;
		color: var(--color-text-dark);
	}

	.alert-content {
		padding: var(--spacing-lg);
	}

	.alert-content p {
		margin: 0 0 var(--spacing-lg) 0;
		font-weight: 600;
		color: var(--color-text-dark);
	}

	.items-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.items-list li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-md);
		background: white;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.product-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.product-name {
		font-weight: 600;
		color: var(--color-text-dark);
		font-size: 1.4rem;
	}

	.stock-info {
		font-size: 1.2rem;
		color: var(--color-text-lighter);
	}

	.action-link {
		color: var(--color-accent-teal);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.action-link:hover {
		color: var(--color-accent-teal-light);
		transform: translateX(4px);
	}

	@media (max-width: 768px) {
		.alerts-section {
			grid-template-columns: 1fr;
		}

		.items-list li {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.action-link {
			align-self: flex-end;
		}
	}
</style>
