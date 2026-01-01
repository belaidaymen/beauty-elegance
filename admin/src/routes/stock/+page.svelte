<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import { CheckCircle, AlertCircle, AlertTriangle, BarChart3, Upload, Bell, TrendingDown } from 'lucide-svelte';
	import AdvancedStockFilters from '$lib/components/Stock/AdvancedStockFilters.svelte';
	import StockDetailsModal from '$lib/components/Stock/StockDetailsModal.svelte';
	import StockAlertModal from '$lib/components/Stock/StockAlertModal.svelte';
	import UpcomingProducts from '$lib/components/Stock/UpcomingProducts.svelte';
	import StockAnalytics from '$lib/components/Stock/StockAnalytics.svelte';

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
		price: number;
		alertEnabled: boolean;
		alertLevel: number;
		notificationEmail: string;
		notificationType: string;
		stockHistory: any[];
		allowNegativeStock: boolean;
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
			lastRestocked: '2024-01-10',
			price: 2500,
			alertEnabled: true,
			alertLevel: 15,
			notificationEmail: 'admin@example.com',
			notificationType: 'email',
			stockHistory: [
				{
					type: 'add',
					quantity: 20,
					resultStock: 45,
					timestamp: '2024-01-10',
					notes: 'Restock from supplier'
				}
			],
			allowNegativeStock: false
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
			lastRestocked: '2024-01-05',
			price: 1800,
			alertEnabled: true,
			alertLevel: 10,
			notificationEmail: 'admin@example.com',
			notificationType: 'email',
			stockHistory: [
				{
					type: 'subtract',
					quantity: 7,
					resultStock: 8,
					timestamp: '2024-01-08',
					notes: 'Sales'
				}
			],
			allowNegativeStock: false
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
			lastRestocked: '2024-01-12',
			price: 3200,
			alertEnabled: true,
			alertLevel: 8,
			notificationEmail: 'admin@example.com',
			notificationType: 'email',
			stockHistory: [],
			allowNegativeStock: false
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
			lastRestocked: '2024-01-01',
			price: 1500,
			alertEnabled: true,
			alertLevel: 12,
			notificationEmail: 'admin@example.com',
			notificationType: 'email',
			stockHistory: [],
			allowNegativeStock: false
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
			lastRestocked: '2023-12-20',
			price: 450,
			alertEnabled: true,
			alertLevel: 15,
			notificationEmail: 'admin@example.com',
			notificationType: 'email',
			stockHistory: [],
			allowNegativeStock: false
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
			lastRestocked: '2024-01-08',
			price: 2800,
			alertEnabled: false,
			alertLevel: 20,
			notificationEmail: '',
			notificationType: 'email',
			stockHistory: [],
			allowNegativeStock: false
		}
	];

	let upcomingProducts: any[] = [
		{
			id: 'u1',
			name: 'Premium Eye Cream',
			sku: 'EYE-CRM-001',
			category: 'Visage',
			expectedQuantity: 50,
			expectedDate: '2024-02-10',
			supplier: 'European Beauty Co',
			notes: 'New product line launch',
			status: 'confirmed',
			createdAt: '2024-01-15'
		}
	];

	let showDetailsModal = false;
	let showAlertModal = false;
	let selectedItem: StockItem | null = null;
	let filters = {
		search: '',
		category: '',
		stockStatus: 'all',
		alertStatus: 'all',
		minStock: 0,
		maxStock: 1000,
		sortBy: 'critical-first'
	};

	const categories = ['Maquillage', 'Cheveux', 'Visage', 'Corps & Bain', 'Deo & Stick', 'Promotion'];

	const columns = [
		{ key: 'name', label: 'Product Name', width: '22%' },
		{ key: 'sku', label: 'SKU', width: '12%' },
		{ key: 'category', label: 'Category', width: '12%' },
		{ key: 'currentStock', label: 'Current', width: '10%' },
		{ key: 'minStock', label: 'Min Level', width: '10%' },
		{ key: 'status', label: 'Status', width: '12%' },
		{ key: 'alertLevel', label: 'Alert Lvl', width: '10%' }
	];

	$: filteredItems = stockItems.filter((item) => {
		const matchesSearch =
			item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
			item.sku.toLowerCase().includes(filters.search.toLowerCase());

		const matchesCategory = !filters.category || item.category === filters.category;

		const matchesStock = (() => {
			switch (filters.stockStatus) {
				case 'optimal':
					return item.currentStock > item.minStock * 1.5;
				case 'low':
					return item.currentStock > item.minStock && item.currentStock <= item.minStock * 1.5;
				case 'critical':
					return item.currentStock > 0 && item.currentStock <= item.minStock;
				case 'out':
					return item.currentStock === 0;
				case 'upcoming':
					return item.currentStock < 0;
				default:
					return true;
			}
		})();

		const matchesAlert = (() => {
			switch (filters.alertStatus) {
				case 'active':
					return item.alertEnabled;
				case 'inactive':
					return !item.alertEnabled;
				case 'triggered':
					return item.alertEnabled && item.currentStock <= item.alertLevel;
				default:
					return true;
			}
		})();

		const matchesRange =
			item.currentStock >= filters.minStock && item.currentStock <= filters.maxStock;

		return matchesSearch && matchesCategory && matchesStock && matchesAlert && matchesRange;
	});

	$: sortedItems = [...filteredItems].sort((a, b) => {
		switch (filters.sortBy) {
			case 'critical-first':
				const statusOrder = {
					'Out of Stock': 0,
					'Critical': 1,
					'Low': 2,
					'Optimal': 3
				};
				return (statusOrder[a.status] ?? 4) - (statusOrder[b.status] ?? 4);
			case 'low-first':
				return a.currentStock - b.currentStock;
			case 'optimal-first':
				return b.currentStock - a.currentStock;
			case 'name-asc':
				return a.name.localeCompare(b.name);
			case 'name-desc':
				return b.name.localeCompare(a.name);
			case 'last-restocked':
				return new Date(b.lastRestocked).getTime() - new Date(a.lastRestocked).getTime();
			default:
				return 0;
		}
	});

	const openDetailsModal = (item: StockItem) => {
		selectedItem = item;
		showDetailsModal = true;
	};

	const openAlertModal = (item: StockItem) => {
		selectedItem = item;
		showAlertModal = true;
	};

	const handleStockUpdate = (adjustmentData: any) => {
		stockItems = stockItems.map((item) => {
			if (item.id === adjustmentData.productId) {
				const newStatus = getStatus(adjustmentData.newStock, item.minStock, item.maxStock);
				return {
					...item,
					currentStock: adjustmentData.newStock,
					status: newStatus,
					lastRestocked: new Date().toISOString().split('T')[0],
					stockHistory: [
						{
							type: adjustmentData.adjustmentType,
							quantity: adjustmentData.quantity,
							resultStock: adjustmentData.newStock,
							timestamp: adjustmentData.timestamp,
							notes: adjustmentData.notes
						},
						...item.stockHistory
					]
				};
			}
			return item;
		});
		showDetailsModal = false;
		selectedItem = null;
	};

	const handleAlertSave = (alertData: any) => {
		stockItems = stockItems.map((item) => {
			if (item.id === selectedItem?.id) {
				return {
					...item,
					alertEnabled: alertData.enabled,
					alertLevel: alertData.alertLevel,
					notificationEmail: alertData.notificationEmail,
					notificationType: alertData.notificationType
				};
			}
			return item;
		});
		showAlertModal = false;
		selectedItem = null;
	};

	const handleAddUpcoming = (product: any) => {
		upcomingProducts = [...upcomingProducts, product];
	};

	const handleRemoveUpcoming = (id: string) => {
		upcomingProducts = upcomingProducts.filter((p) => p.id !== id);
	};

	const getStatus = (current: number, min: number, max: number) => {
		if (current === 0) return 'Out of Stock';
		if (current <= min) return 'Critical';
		if (current <= min * 1.5) return 'Low';
		return 'Optimal';
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
	const getAlertsTriggered = () =>
		stockItems.filter((item) => item.alertEnabled && item.currentStock <= item.alertLevel).length;

	const handleFilterChange = (newFilters: any) => {
		filters = newFilters;
	};
</script>

<div class="stock-container">
	<div class="page-header">
		<div>
			<h1 class="page-title">Stock Management</h1>
			<p class="page-subtitle">Advanced inventory control and analytics</p>
		</div>
	</div>

	<!-- Stock Status Summary -->
	<div class="status-summary">
		<div class="summary-card optimal">
			<div class="summary-icon">
				<CheckCircle size={32} />
			</div>
			<div class="summary-content">
				<p class="summary-label">Optimal Stock</p>
				<p class="summary-number">{getOptimalCount()}</p>
			</div>
		</div>
		<div class="summary-card warning">
			<div class="summary-icon">
				<AlertCircle size={32} />
			</div>
			<div class="summary-content">
				<p class="summary-label">Low Stock</p>
				<p class="summary-number">{getLowStockCount()}</p>
			</div>
		</div>
		<div class="summary-card critical">
			<div class="summary-icon">
				<AlertTriangle size={32} />
			</div>
			<div class="summary-content">
				<p class="summary-label">Critical/Out</p>
				<p class="summary-number">{getCriticalStockCount()}</p>
			</div>
		</div>
		<div class="summary-card alerts">
			<div class="summary-icon">
				<Bell size={32} />
			</div>
			<div class="summary-content">
				<p class="summary-label">Alerts Triggered</p>
				<p class="summary-number">{getAlertsTriggered()}</p>
			</div>
		</div>
	</div>

	<!-- Analytics Dashboard -->
	<StockAnalytics products={stockItems} />

	<!-- Advanced Filters -->
	<AdvancedStockFilters
		{categories}
		{filters}
		onFilterChange={handleFilterChange}
	/>

	<!-- Stock Levels Table -->
	<Card title="Inventory Management" subtitle="Real-time stock information and controls">
		<DataTable columns={columns} data={sortedItems}>
			<svelte:fragment slot="cell" let:row let:col>
				{#if col.key === 'status'}
					<span class="status-badge status-{row.status.toLowerCase().replace(/\s+/g, '-')}">
						{row.status}
					</span>
				{:else if col.key === 'alertLevel'}
					<span class="alert-badge" class:active={row.alertEnabled} class:triggered={row.currentStock <= row.alertLevel}>
						{row.alertEnabled ? row.alertLevel : '—'}
					</span>
				{:else}
					{row[col.key]}
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="actions" let:row>
				<div class="action-buttons">
					<Button
						variant="primary"
						size="small"
						on:click={() => openDetailsModal(row)}
						title="Adjust stock quantity"
					>
						<Upload size={18} />
						Adjust
					</Button>
					<Button
						variant="secondary"
						size="small"
						on:click={() => openAlertModal(row)}
						title="Manage stock alerts"
					>
						<Bell size={18} />
						Alert
					</Button>
				</div>
			</svelte:fragment>
		</DataTable>
	</Card>

	<!-- Stock Level Visualization -->
	<Card title="Stock Level Overview" subtitle="Visual inventory status">
		<div class="stock-levels-list">
			{#each sortedItems as item (item.id)}
				<div class="stock-item-viz">
					<div class="item-header">
						<div class="item-info">
							<h4 class="item-name">{item.name}</h4>
							<p class="item-sku">SKU: {item.sku}</p>
						</div>
						<span class="item-current">{item.currentStock} / {item.maxStock}</span>
					</div>
					<div class="stock-bar">
						<div
							class="stock-fill"
							style="width: {getStockPercentage(item)}%; background: {getStatusColor(item.status) === 'success' ? '#27ae60' : getStatusColor(item.status) === 'warning' ? '#f39c12' : '#e74c3c'};"
						></div>
					</div>
					<div class="item-footer">
						<div class="footer-left">
							<span class="min-max">Min: {item.minStock} | Max: {item.maxStock}</span>
							{#if item.alertEnabled}
								<span class="alert-indicator" class:triggered={item.currentStock <= item.alertLevel}>
									<Bell size={14} />
									Alert: {item.alertLevel}
								</span>
							{/if}
						</div>
						<span class="status-label" class:optimal={item.status === 'Optimal'} class:low={item.status === 'Low'} class:critical={item.status === 'Critical' || item.status === 'Out of Stock'}>
							{item.status}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</Card>

	<!-- Upcoming Products -->
	<UpcomingProducts
		{upcomingProducts}
		onAddUpcoming={handleAddUpcoming}
		onRemoveUpcoming={handleRemoveUpcoming}
	/>
</div>

<!-- Stock Details Modal -->
<StockDetailsModal
	isOpen={showDetailsModal}
	product={selectedItem}
	onClose={() => {
		showDetailsModal = false;
		selectedItem = null;
	}}
	onStockUpdate={handleStockUpdate}
/>

<!-- Stock Alert Modal -->
<StockAlertModal
	isOpen={showAlertModal}
	product={selectedItem}
	onClose={() => {
		showAlertModal = false;
		selectedItem = null;
	}}
	onSave={handleAlertSave}
/>

<style>
	.stock-container {
		padding: 3rem 2.5rem;
		max-width: 1800px;
		margin: 0 auto;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		min-height: 100vh;
	}

	.page-header {
		margin-bottom: 3.5rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid var(--primary-lighter, #f0d9d9);
	}

	.page-title {
		font-family: 'Abril Fatface', serif;
		font-size: 3.6rem;
		font-weight: 400;
		color: #2a2a2a;
		margin-bottom: 0.5rem;
		letter-spacing: -0.01em;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.page-subtitle {
		font-size: 1.6rem;
		color: #888;
		font-family: 'Andada Pro', serif;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	.status-summary {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
		gap: 2rem;
		margin-bottom: 3.5rem;
	}

	.summary-card {
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border-left: 5px solid #d1b2b2;
		border-radius: 1.2rem;
		padding: 2rem;
		display: flex;
		align-items: center;
		gap: 1.8rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
		transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.summary-card:hover {
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
		transform: translateY(-6px);
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

	.summary-card.alerts {
		border-left-color: #3498db;
	}

	.summary-icon {
		font-size: 3.2rem;
	}

	.summary-card.optimal .summary-icon {
		color: #27ae60;
	}

	.summary-card.warning .summary-icon {
		color: #f39c12;
	}

	.summary-card.critical .summary-icon {
		color: #e74c3c;
	}

	.summary-card.alerts .summary-icon {
		color: #3498db;
	}

	.summary-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.summary-label {
		font-size: 1.3rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 700;
		font-family: 'Andada Pro', serif;
	}

	.summary-number {
		font-size: 2.6rem;
		font-weight: 700;
		color: #2a2a2a;
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

	.alert-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.4rem 0.8rem;
		border-radius: 0.4rem;
		font-size: 1.2rem;
		font-weight: 600;
		background: #f9f8f8;
		color: #999;
		border: 1px solid #e8e0db;
	}

	.alert-badge.active {
		background: rgba(243, 156, 18, 0.12);
		color: #b87c0f;
		border-color: rgba(243, 156, 18, 0.3);
	}

	.alert-badge.triggered {
		background: rgba(231, 76, 60, 0.12);
		color: #e74c3c;
		border-color: rgba(231, 76, 60, 0.3);
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
		border: 1px solid #e8e0db;
		transition: all 0.2s ease;
	}

	.stock-item-viz:hover {
		border-color: #b37777;
		background: #fff;
	}

	.item-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item-info {
		flex: 1;
	}

	.item-name {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.item-sku {
		font-size: 1.2rem;
		color: #999;
		margin: 0.3rem 0 0 0;
	}

	.item-current {
		font-size: 1.3rem;
		font-weight: 600;
		color: #b37777;
		white-space: nowrap;
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
		flex-wrap: wrap;
		gap: 1rem;
	}

	.footer-left {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.min-max {
		color: #888;
		font-weight: 500;
	}

	.alert-indicator {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.1rem;
		color: #f39c12;
		font-weight: 600;
		padding: 0.3rem 0.8rem;
		background: rgba(243, 156, 18, 0.1);
		border-radius: 0.3rem;
	}

	.alert-indicator.triggered {
		color: #e74c3c;
		background: rgba(231, 76, 60, 0.1);
	}

	.status-label {
		font-weight: 600;
		color: #27ae60;
		padding: 0.3rem 0.8rem;
		background: rgba(39, 174, 96, 0.1);
		border-radius: 0.3rem;
	}

	.status-label.low {
		color: #f39c12;
		background: rgba(243, 156, 18, 0.1);
	}

	.status-label.critical {
		color: #e74c3c;
		background: rgba(231, 76, 60, 0.1);
	}

	.action-buttons {
		display: flex;
		gap: 0.5rem;
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
			gap: 1.5rem;
		}

		.action-buttons {
			flex-direction: column;
		}

		.item-footer {
			flex-direction: column;
			align-items: flex-start;
		}

		.footer-left {
			flex-direction: column;
			gap: 0.5rem;
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
