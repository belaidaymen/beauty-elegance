<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import FormInput from '$lib/components/FormInput.svelte';

	interface StockItem {
		id: string;
		name: string;
		sku: string;
		category: string;
		currentStock: number;
		minStock: number;
		maxStock: number;
		status: string;
		lastRestocked: string;
	}

	let stockItems: StockItem[] = [
		{
			id: '1',
			name: 'Gracias Shampoo 500ml',
			sku: 'GRC-SHP-001',
			category: 'Cheveux',
			currentStock: 45,
			minStock: 20,
			maxStock: 100,
			status: 'Optimal',
			lastRestocked: '2024-01-10'
		},
		{
			id: '2',
			name: 'Red Lipstick Velvet',
			sku: 'VLV-LIP-001',
			category: 'Maquillage',
			currentStock: 8,
			minStock: 15,
			maxStock: 80,
			status: 'Low',
			lastRestocked: '2024-01-05'
		},
		{
			id: '3',
			name: 'Face Moisturizer Pro',
			sku: 'FCS-MTZ-001',
			category: 'Visage',
			currentStock: 15,
			minStock: 10,
			maxStock: 60,
			status: 'Optimal',
			lastRestocked: '2024-01-12'
		},
		{
			id: '4',
			name: 'Body Lotion 400ml',
			sku: 'BDY-LOT-001',
			category: 'Corps & Bain',
			currentStock: 3,
			minStock: 15,
			maxStock: 75,
			status: 'Critical',
			lastRestocked: '2024-01-01'
		},
		{
			id: '5',
			name: 'Deodorant Stick',
			sku: 'DEO-STK-001',
			category: 'Deo & Stick',
			currentStock: 0,
			minStock: 20,
			maxStock: 150,
			status: 'Out of Stock',
			lastRestocked: '2023-12-20'
		},
		{
			id: '6',
			name: 'Hair Mask Treatment',
			sku: 'HAR-MSK-001',
			category: 'Cheveux',
			currentStock: 52,
			minStock: 25,
			maxStock: 120,
			status: 'Optimal',
			lastRestocked: '2024-01-08'
		}
	];

	let showRestockModal = false;
	let selectedItem: StockItem | null = null;
	let restockQuantity = 0;

	const columns = [
		{ key: 'name', label: 'Product Name', width: '22%' },
		{ key: 'sku', label: 'SKU', width: '12%' },
		{ key: 'category', label: 'Category', width: '12%' },
		{ key: 'currentStock', label: 'Current', width: '10%' },
		{ key: 'minStock', label: 'Min Level', width: '10%' },
		{ key: 'status', label: 'Status', width: '12%' },
		{ key: 'lastRestocked', label: 'Last Restocked', width: '12%' }
	];

	const openRestockModal = (item: StockItem) => {
		selectedItem = item;
		restockQuantity = item.maxStock - item.currentStock;
		showRestockModal = true;
	};

	const handleRestock = () => {
		if (selectedItem && restockQuantity > 0) {
			stockItems = stockItems.map((item) => {
				if (item.id === selectedItem?.id) {
					const newStock = item.currentStock + restockQuantity;
					const status =
						newStock <= item.minStock
							? 'Critical'
							: newStock <= item.minStock * 1.5
								? 'Low'
								: 'Optimal';
					return {
						...item,
						currentStock: newStock,
						status,
						lastRestocked: new Date().toISOString().split('T')[0]
					};
				}
				return item;
			});
			showRestockModal = false;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Optimal':
				return 'success';
			case 'Low':
				return 'warning';
			case 'Critical':
				return 'danger';
			case 'Out of Stock':
				return 'danger';
			default:
				return 'neutral';
		}
	};

	const getStockPercentage = (item: StockItem) => {
		const percentage = (item.currentStock / item.maxStock) * 100;
		return Math.min(percentage, 100);
	};

	const getLowStockCount = () => stockItems.filter((item) => item.status === 'Low').length;
	const getCriticalStockCount = () =>
		stockItems.filter((item) => item.status === 'Critical' || item.status === 'Out of Stock').length;
	const getOptimalCount = () => stockItems.filter((item) => item.status === 'Optimal').length;
</script>

<div class="stock-container">
	<div class="page-header">
		<div>
			<h1 class="page-title">Stock Management</h1>
			<p class="page-subtitle">Monitor and manage inventory levels</p>
		</div>
	</div>

	<!-- Stock Status Summary -->
	<div class="status-summary">
		<div class="summary-card optimal">
			<div class="summary-icon">✅</div>
			<div class="summary-content">
				<p class="summary-label">Optimal Stock</p>
				<p class="summary-number">{getOptimalCount()}</p>
			</div>
		</div>
		<div class="summary-card warning">
			<div class="summary-icon">⚠️</div>
			<div class="summary-content">
				<p class="summary-label">Low Stock</p>
				<p class="summary-number">{getLowStockCount()}</p>
			</div>
		</div>
		<div class="summary-card critical">
			<div class="summary-icon">🚨</div>
			<div class="summary-content">
				<p class="summary-label">Critical/Out</p>
				<p class="summary-number">{getCriticalStockCount()}</p>
			</div>
		</div>
		<div class="summary-card total">
			<div class="summary-icon">📊</div>
			<div class="summary-content">
				<p class="summary-label">Total Products</p>
				<p class="summary-number">{stockItems.length}</p>
			</div>
		</div>
	</div>

	<!-- Stock Levels Table -->
	<Card title="Inventory Levels" subtitle="Real-time stock information">
		<DataTable columns={columns} data={stockItems}>
			<svelte:fragment slot="cell" let:row let:col>
				{#if col.key === 'status'}
					<span class="status-badge status-{row.status.toLowerCase().replace(/\s+/g, '-')}">
						{row.status}
					</span>
				{:else}
					{row[col.key]}
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="actions" let:row>
				<div class="action-buttons">
					<Button variant="primary" size="small" on:click={() => openRestockModal(row)}>
						📥 Restock
					</Button>
				</div>
			</svelte:fragment>
		</DataTable>
	</Card>

	<!-- Stock Level Visualization -->
	<Card title="Stock Level Overview" subtitle="Visual representation of inventory">
		<div class="stock-levels-list">
			{#each stockItems as item (item.id)}
				<div class="stock-item-viz">
					<div class="item-header">
						<h4 class="item-name">{item.name}</h4>
						<span class="item-current">{item.currentStock} / {item.maxStock}</span>
					</div>
					<div class="stock-bar">
						<div
							class="stock-fill"
							style="width: {getStockPercentage(item)}%; background: {getStatusColor(item.status) === 'success' ? '#27ae60' : getStatusColor(item.status) === 'warning' ? '#f39c12' : '#e74c3c'};"
						></div>
					</div>
					<div class="item-footer">
						<span class="min-max">Min: {item.minStock} | Max: {item.maxStock}</span>
						<span class="status-label" class:low={item.status === 'Low'} class:critical={item.status === 'Critical' || item.status === 'Out of Stock'}>
							{item.status}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</div>

<!-- Restock Modal -->
<Modal
	isOpen={showRestockModal}
	title="Restock Product"
	size="medium"
	onClose={() => (showRestockModal = false)}
>
	{#if selectedItem}
		<div class="restock-content">
			<div class="product-info">
				<h4 class="info-title">Product</h4>
				<p class="info-value">{selectedItem.name}</p>
			</div>

			<div class="stock-info">
				<div class="info-item">
					<h4 class="info-title">Current Stock</h4>
					<p class="info-value">{selectedItem.currentStock}</p>
				</div>
				<div class="info-item">
					<h4 class="info-title">Maximum Stock</h4>
					<p class="info-value">{selectedItem.maxStock}</p>
				</div>
			</div>

			<FormInput
				label="Quantity to Add"
				type="number"
				placeholder="0"
				bind:value={restockQuantity}
				required
			/>

			<div class="calculation">
				<p>New Stock Level: <span class="calc-result">{selectedItem.currentStock + restockQuantity}</span></p>
			</div>
		</div>

		<svelte:fragment slot="footer">
			<Button variant="secondary" on:click={() => (showRestockModal = false)}>Cancel</Button>
			<Button
				variant="primary"
				disabled={restockQuantity <= 0}
				on:click={handleRestock}
			>
				Confirm Restock
			</Button>
		</svelte:fragment>
	{/if}
</Modal>

<style>
	.stock-container {
		padding: 2rem;
		max-width: 1600px;
		margin: 0 auto;
	}

	.page-header {
		margin-bottom: 2rem;
	}

	.page-title {
		font-family: 'Andada Pro';
		font-size: 3rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.5rem;
	}

	.page-subtitle {
		font-size: 1.5rem;
		color: #888;
	}

	.status-summary {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.summary-card {
		background: #fff;
		border-left: 4px solid #d1b2b2;
		border-radius: 0.8rem;
		padding: 1.5rem;
		display: flex;
		align-items: center;
		gap: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		transition: all 0.3s ease;
	}

	.summary-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
		transform: translateY(-2px);
	}

	.summary-card.optimal {
		border-left-color: #27ae60;
	}

	.summary-card.warning {
		border-left-color: #f39c12;
	}

	.summary-card.critical {
		border-left-color: #e74c3c;
	}

	.summary-card.total {
		border-left-color: #b37777;
	}

	.summary-icon {
		font-size: 2.8rem;
	}

	.summary-content {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.summary-label {
		font-size: 1.2rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		font-weight: 600;
	}

	.summary-number {
		font-size: 2.2rem;
		font-weight: 700;
		color: #333;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 1rem;
		border-radius: 2rem;
		font-size: 1.2rem;
		font-weight: 600;
	}

	.status-optimal {
		background: rgba(39, 174, 96, 0.2);
		color: #27ae60;
	}

	.status-low {
		background: rgba(243, 156, 18, 0.2);
		color: #f39c12;
	}

	.status-critical {
		background: rgba(231, 76, 60, 0.2);
		color: #e74c3c;
	}

	.status-out-of-stock {
		background: rgba(231, 76, 60, 0.2);
		color: #e74c3c;
	}

	.stock-levels-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.stock-item-viz {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		padding: 1.5rem;
		background: #f9f8f8;
		border-radius: 0.6rem;
	}

	.item-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item-name {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.item-current {
		font-size: 1.3rem;
		font-weight: 600;
		color: #b37777;
	}

	.stock-bar {
		width: 100%;
		height: 1.2rem;
		background: #e0c8c8;
		border-radius: 0.6rem;
		overflow: hidden;
	}

	.stock-fill {
		height: 100%;
		border-radius: 0.6rem;
		transition: width 0.3s ease;
	}

	.item-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.1rem;
	}

	.min-max {
		color: #888;
		font-weight: 500;
	}

	.status-label {
		font-weight: 600;
		color: #27ae60;
	}

	.status-label.low {
		color: #f39c12;
	}

	.status-label.critical {
		color: #e74c3c;
	}

	.action-buttons {
		display: flex;
		gap: 0.5rem;
	}

	.restock-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.product-info {
		padding: 1.2rem;
		background: #f9f8f8;
		border-radius: 0.6rem;
	}

	.info-title {
		font-size: 1.2rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.info-value {
		font-size: 1.6rem;
		color: #333;
		font-weight: 600;
	}

	.stock-info {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.info-item {
		padding: 1.2rem;
		background: #f9f8f8;
		border-radius: 0.6rem;
	}

	.calculation {
		padding: 1rem;
		background: rgba(179, 119, 119, 0.1);
		border-left: 3px solid #b37777;
		border-radius: 0.4rem;
	}

	.calculation p {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.calc-result {
		color: #b37777;
		font-weight: 700;
	}

	@media (max-width: 768px) {
		.stock-container {
			padding: 1.5rem;
		}

		.page-title {
			font-size: 2.2rem;
		}

		.status-summary {
			grid-template-columns: repeat(2, 1fr);
		}

		.stock-info {
			grid-template-columns: 1fr;
		}

		.action-buttons {
			flex-direction: column;
		}
	}

	@media (max-width: 480px) {
		.status-summary {
			grid-template-columns: 1fr;
		}

		.item-header {
			flex-direction: column;
			align-items: start;
			gap: 0.5rem;
		}
	}
</style>
