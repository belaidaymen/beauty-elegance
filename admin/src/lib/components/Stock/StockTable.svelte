<script lang="ts">
	import EditStockForm from './EditStockForm.svelte';
	import { stockStore } from '$lib/stores/stock_store';
	import type { StockItem } from '$lib/stores/stock_store';

	export let filteredItems: StockItem[] = [];

	let editingId: string | null = null;

	function getStatusLabel(status: string): string {
		const labels: Record<string, string> = {
			'in-stock': 'En stock',
			'low-stock': 'Stock faible',
			'out-of-stock': 'Rupture de stock'
		};
		return labels[status] || status;
	}

	function getStatusIcon(status: string): string {
		const icons: Record<string, string> = {
			'in-stock': '✅',
			'low-stock': '⚠️',
			'out-of-stock': '❌'
		};
		return icons[status] || '❓';
	}

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('fr-FR');
	}

	function getStockPercentage(item: StockItem): number {
		return (item.currentStock / item.maximumCapacity) * 100;
	}
</script>

<div class="stock-table-container">
	<div class="table-wrapper">
		<table>
			<thead>
				<tr>
					<th>Produit</th>
					<th>Stock Actuel</th>
					<th>Seuil Min</th>
					<th>Capacité Max</th>
					<th>Statut</th>
					<th>Dernier Réapprov.</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredItems as item (item.productId)}
					{#if editingId === item.productId}
						<EditStockForm {item} onCancel={() => (editingId = null)} />
					{:else}
						<tr class="stock-row" class:low={item.status === 'low-stock'} class:out={item.status === 'out-of-stock'}>
							<td class="product-name">
								<strong>{item.productName}</strong>
							</td>
							<td>
								<div class="stock-progress">
									<div class="progress-bar" style="width: {getStockPercentage(item)}%"></div>
									<span class="stock-value">{item.currentStock}</span>
								</div>
							</td>
							<td>{item.minimumThreshold}</td>
							<td>{item.maximumCapacity}</td>
							<td>
								<span class="status-badge" class:in-stock={item.status === 'in-stock'} class:low-stock={item.status === 'low-stock'} class:out-of-stock={item.status === 'out-of-stock'}>
									<span class="badge-icon">{getStatusIcon(item.status)}</span>
									<span class="badge-text">{getStatusLabel(item.status)}</span>
								</span>
							</td>
							<td>{formatDate(item.lastRestockDate)}</td>
							<td class="action-buttons">
								<button
									class="action-btn edit-btn"
									on:click={() => (editingId = item.productId)}
									title="Modifier le stock"
								>
									✏️
								</button>
								<button class="action-btn download-btn" title="Télécharger l'historique">
									📥
								</button>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>

		{#if filteredItems.length === 0}
			<div class="no-data">
				<p>📭 Aucun produit trouvé</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.stock-table-container {
		background: white;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
		overflow: hidden;
	}

	.table-wrapper {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background: var(--color-primary-light-beige);
		border-bottom: 2px solid var(--color-border);
	}

	th {
		padding: var(--spacing-md);
		text-align: left;
		font-weight: 600;
		color: var(--color-text-dark);
		font-size: 1.3rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	td {
		padding: var(--spacing-md);
		border-bottom: 1px solid var(--color-border);
		font-size: 1.4rem;
	}

	.stock-row {
		transition: all 0.3s ease;
	}

	.stock-row:hover {
		background: var(--color-primary-cream);
	}

	.stock-row.low {
		background: rgba(243, 156, 18, 0.05);
	}

	.stock-row.out {
		background: rgba(231, 76, 60, 0.05);
	}

	.product-name {
		color: var(--color-accent-teal);
		font-weight: 700;
	}

	.stock-progress {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		min-width: 120px;
	}

	.progress-bar {
		flex: 1;
		height: 6px;
		background: #e0e0e0;
		border-radius: 3px;
		overflow: hidden;
		background: linear-gradient(90deg, var(--color-success) 0%, var(--color-warning) 50%, var(--color-error) 100%);
	}

	.stock-value {
		font-weight: 600;
		color: var(--color-text-dark);
		min-width: 40px;
		text-align: right;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: 0.4rem 1rem;
		border-radius: 999px;
		font-size: 1.2rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		white-space: nowrap;
	}

	.status-badge.in-stock {
		background: rgba(39, 174, 96, 0.15);
		color: var(--color-success);
	}

	.status-badge.low-stock {
		background: rgba(243, 156, 18, 0.15);
		color: var(--color-warning);
	}

	.status-badge.out-of-stock {
		background: rgba(231, 76, 60, 0.15);
		color: var(--color-error);
	}

	.badge-icon {
		display: inline-flex;
		font-size: 1.4rem;
	}

	.action-buttons {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: center;
	}

	.action-btn {
		background: none;
		border: none;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: 1.6rem;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.action-btn:hover {
		background: var(--color-primary-light-beige);
		transform: scale(1.1);
	}

	.edit-btn:hover {
		background: rgba(43, 138, 138, 0.15);
	}

	.download-btn:hover {
		background: rgba(52, 152, 219, 0.15);
	}

	.no-data {
		padding: var(--spacing-2xl);
		text-align: center;
		color: var(--color-text-lighter);
		font-size: 1.6rem;
	}

	@media (max-width: 1024px) {
		th:nth-child(6),
		td:nth-child(6) {
			display: none;
		}
	}

	@media (max-width: 768px) {
		th,
		td {
			padding: var(--spacing-sm);
			font-size: 1.2rem;
		}

		th:nth-child(3),
		td:nth-child(3),
		th:nth-child(4),
		td:nth-child(4) {
			display: none;
		}

		.stock-progress {
			flex-direction: column;
			align-items: flex-start;
			min-width: auto;
		}

		.progress-bar {
			width: 80px;
			height: 4px;
		}

		.action-btn {
			width: 3rem;
			height: 3rem;
			font-size: 1.4rem;
		}
	}

	@media (max-width: 480px) {
		th,
		td {
			padding: var(--spacing-xs) var(--spacing-sm);
			font-size: 1rem;
		}

		.status-badge {
			font-size: 0.9rem;
			padding: 0.3rem 0.6rem;
		}

		.badge-text {
			display: none;
		}

		th:nth-child(5),
		td:nth-child(5) {
			display: none;
		}
	}
</style>
