<script lang="ts">
	import { stockStore } from '$lib/stores/stock_store';
	import { uiStore } from '$lib/stores/ui_store';
	import StockTable from '$lib/components/Stock/StockTable.svelte';
	import StockAlerts from '$lib/components/Stock/StockAlerts.svelte';
	import AddStockForm from '$lib/components/Stock/AddStockForm.svelte';
	import type { StockItem } from '$lib/stores/stock_store';

	let searchQuery = '';
	let statusFilter = 'all';
	let showAddForm = false;
	let stockItems: StockItem[] = [];
	let filteredItems: StockItem[] = [];

	// Initialize with demo stock items
	const demoStockItems: StockItem[] = [
		{
			productId: 'p1',
			productName: 'Shampoing Gracias',
			currentStock: 250,
			minimumThreshold: 50,
			maximumCapacity: 500,
			lastRestockDate: new Date('2024-12-20'),
			status: 'in-stock'
		},
		{
			productId: 'p2',
			productName: 'Mascara Professionnel',
			currentStock: 45,
			minimumThreshold: 40,
			maximumCapacity: 300,
			lastRestockDate: new Date('2024-12-15'),
			status: 'low-stock'
		},
		{
			productId: 'p3',
			productName: 'Crème Visage Premium',
			currentStock: 0,
			minimumThreshold: 30,
			maximumCapacity: 200,
			lastRestockDate: new Date('2024-12-01'),
			status: 'out-of-stock'
		},
		{
			productId: 'p4',
			productName: 'Parfum Luxe',
			currentStock: 180,
			minimumThreshold: 40,
			maximumCapacity: 300,
			lastRestockDate: new Date('2024-12-18'),
			status: 'in-stock'
		},
		{
			productId: 'p5',
			productName: 'Soin Capillaire Intense',
			currentStock: 35,
			minimumThreshold: 50,
			maximumCapacity: 250,
			lastRestockDate: new Date('2024-12-10'),
			status: 'low-stock'
		},
		{
			productId: 'p6',
			productName: 'Savon Exfoliant',
			currentStock: 420,
			minimumThreshold: 50,
			maximumCapacity: 500,
			lastRestockDate: new Date('2024-12-22'),
			status: 'in-stock'
		}
	];

	stockStore.setItems(demoStockItems);

	stockStore.subscribe((state) => {
		stockItems = state.items;
		filterItems();
	});

	function filterItems() {
		filteredItems = stockItems.filter((item) => {
			const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
			return matchesSearch && matchesStatus;
		});
	}

	function handleSearch(e: Event) {
		const target = e.target as HTMLInputElement;
		searchQuery = target.value;
		filterItems();
	}

	function handleStatusFilter(e: Event) {
		const target = e.target as HTMLSelectElement;
		statusFilter = target.value;
		filterItems();
	}

	function handleAddStock(e: CustomEvent) {
		showAddForm = false;
		uiStore.showNotification('Stock ajouté avec succès', 'success');
	}

	const lowStockCount = stockItems.filter((i) => i.status === 'low-stock').length;
	const outOfStockCount = stockItems.filter((i) => i.status === 'out-of-stock').length;
	const totalValue = stockItems.reduce((sum, item) => sum + item.currentStock, 0);
</script>

<svelte:head>
	<title>Gestion de l'Inventaire | Admin</title>
</svelte:head>

<div class="stock-container">
	<section class="page-header">
		<div class="header-content">
			<h1>Gestion de l'Inventaire</h1>
			<p class="subtitle">Gérez vos niveaux de stock et mises à jour</p>
		</div>
		<button class="btn btn-primary" on:click={() => (showAddForm = !showAddForm)}>
			{showAddForm ? '✕ Fermer' : '+ Ajouter Stock'}
		</button>
	</section>

	{#if showAddForm}
		<AddStockForm on:add={handleAddStock} />
	{/if}

	<section class="stock-stats">
		<div class="stat-box">
			<p class="stat-label">Produits en Stock</p>
			<p class="stat-value">{stockItems.filter((i) => i.status === 'in-stock').length}</p>
		</div>
		<div class="stat-box warning">
			<p class="stat-label">Stock Faible</p>
			<p class="stat-value">{lowStockCount}</p>
		</div>
		<div class="stat-box danger">
			<p class="stat-label">Rupture de Stock</p>
			<p class="stat-value">{outOfStockCount}</p>
		</div>
		<div class="stat-box">
			<p class="stat-label">Quantité Totale</p>
			<p class="stat-value">{totalValue}</p>
		</div>
	</section>

	{#if lowStockCount > 0 || outOfStockCount > 0}
		<StockAlerts {stockItems} />
	{/if}

	<section class="filters-section">
		<div class="filter-row">
			<div class="search-wrapper">
				<span class="search-icon">🔍</span>
				<input
					type="text"
					placeholder="Rechercher un produit..."
					value={searchQuery}
					on:input={handleSearch}
					class="search-input"
				/>
			</div>

			<select value={statusFilter} on:change={handleStatusFilter} class="filter-select">
				<option value="all">Tous les statuts</option>
				<option value="in-stock">En stock</option>
				<option value="low-stock">Stock faible</option>
				<option value="out-of-stock">Rupture de stock</option>
			</select>
		</div>
	</section>

	<StockTable {filteredItems} />
</div>

<style>
	.stock-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
	}

	.header-content h1 {
		margin: 0 0 var(--spacing-sm) 0;
		color: var(--color-accent-teal);
	}

	.subtitle {
		margin: 0;
		color: var(--color-text-lighter);
		font-size: 1.5rem;
	}

	.stock-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-lg);
	}

	.stat-box {
		background: white;
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		border-left: 4px solid var(--color-accent-teal);
		box-shadow: var(--shadow-sm);
	}

	.stat-box.warning {
		border-left-color: var(--color-warning);
	}

	.stat-box.danger {
		border-left-color: var(--color-error);
	}

	.stat-label {
		margin: 0 0 var(--spacing-sm) 0;
		color: var(--color-text-lighter);
		font-size: 1.3rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	.stat-value {
		margin: 0;
		font-size: 2.4rem;
		font-weight: 700;
		color: var(--color-text-dark);
	}

	.filters-section {
		background: white;
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
	}

	.filter-row {
		display: flex;
		gap: var(--spacing-md);
		align-items: center;
		flex-wrap: wrap;
	}

	.search-wrapper {
		flex: 1;
		min-width: 250px;
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: var(--spacing-md);
		font-size: 1.6rem;
		color: var(--color-text-lighter);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 4rem !important;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: 1.4rem;
	}

	.filter-select {
		padding: var(--spacing-md) var(--spacing-lg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: white;
		cursor: pointer;
		font-size: 1.4rem;
		color: var(--color-text-dark);
		min-width: 180px;
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.stock-stats {
			grid-template-columns: repeat(2, 1fr);
		}

		.filter-row {
			flex-direction: column;
		}

		.search-wrapper {
			min-width: 100%;
		}

		.filter-select {
			width: 100%;
		}
	}
</style>
