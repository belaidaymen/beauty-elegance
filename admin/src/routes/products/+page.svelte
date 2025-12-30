<script lang="ts">
	import { productsStore } from '$lib/stores/products_store';
	import { uiStore } from '$lib/stores/ui_store';
	import ProductsList from '$lib/components/Products/ProductsList.svelte';
	import AddProductForm from '$lib/components/Products/AddProductForm.svelte';
	import type { Product } from '$lib/stores/products_store';

	let searchQuery = '';
	let categoryFilter = 'all';
	let activeFilter = 'all';
	let showAddForm = false;
	let products: Product[] = [];
	let filteredProducts: Product[] = [];

	// Initialize with demo products
	const demoProducts: Product[] = [
		{
			id: 'p1',
			name: 'Shampoing Gracias',
			description: 'Shampoing sans sulfate haute qualité',
			price: 5000,
			category: 'Cheveux',
			stock: 250,
			images: ['https://via.placeholder.com/300x300?text=Shampoing+Gracias'],
			sku: 'SHAM001',
			active: true,
			createdAt: new Date('2024-11-01'),
			updatedAt: new Date('2024-12-20')
		},
		{
			id: 'p2',
			name: 'Mascara Professionnel',
			description: 'Mascara longue tenue 24h',
			price: 8900,
			category: 'Maquillage',
			stock: 180,
			images: ['https://via.placeholder.com/300x300?text=Mascara'],
			sku: 'MASC001',
			active: true,
			createdAt: new Date('2024-11-05'),
			updatedAt: new Date('2024-12-18')
		},
		{
			id: 'p3',
			name: 'Crème Visage Premium',
			description: 'Crème hydratante anti-âge',
			price: 5200,
			category: 'Visage',
			stock: 0,
			images: ['https://via.placeholder.com/300x300?text=Creme+Visage'],
			sku: 'FACE001',
			active: false,
			createdAt: new Date('2024-11-10'),
			updatedAt: new Date('2024-12-01')
		},
		{
			id: 'p4',
			name: 'Parfum Luxe',
			description: 'Eau de parfum 100ml premium',
			price: 6200,
			category: 'Deo & Stick',
			stock: 95,
			images: ['https://via.placeholder.com/300x300?text=Parfum'],
			sku: 'PERF001',
			active: true,
			createdAt: new Date('2024-11-15'),
			updatedAt: new Date('2024-12-22')
		},
		{
			id: 'p5',
			name: 'Soin Capillaire Intense',
			description: 'Masque capillaire nutritif',
			price: 12300,
			category: 'Cheveux',
			stock: 120,
			images: ['https://via.placeholder.com/300x300?text=Soin+Capillaire'],
			sku: 'HAIR002',
			active: true,
			createdAt: new Date('2024-11-20'),
			updatedAt: new Date('2024-12-19')
		}
	];

	productsStore.setProducts(demoProducts);

	productsStore.subscribe((state) => {
		products = state.products;
		filterProducts();
	});

	const categories = ['Maquillage', 'Cheveux', 'Visage', 'Corps & Bain', 'Deo & Stick'];

	function filterProducts() {
		filteredProducts = products.filter((product) => {
			const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.sku.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
			const matchesActive = activeFilter === 'all' || (activeFilter === 'active' ? product.active : !product.active);
			return matchesSearch && matchesCategory && matchesActive;
		});
	}

	function handleSearch(e: Event) {
		const target = e.target as HTMLInputElement;
		searchQuery = target.value;
		filterProducts();
	}

	function handleCategoryFilter(e: Event) {
		const target = e.target as HTMLSelectElement;
		categoryFilter = target.value;
		filterProducts();
	}

	function handleActiveFilter(e: Event) {
		const target = e.target as HTMLSelectElement;
		activeFilter = target.value;
		filterProducts();
	}

	function handleAddProduct(e: CustomEvent) {
		showAddForm = false;
		uiStore.showNotification('Produit ajouté avec succès', 'success');
	}
</script>

<svelte:head>
	<title>Gestion des Produits | Admin</title>
</svelte:head>

<div class="products-container">
	<section class="page-header">
		<div class="header-content">
			<h1>Gestion des Produits</h1>
			<p class="subtitle">Gérez votre catalogue de produits</p>
		</div>
		<button class="btn btn-primary" on:click={() => (showAddForm = !showAddForm)}>
			{showAddForm ? '✕ Fermer' : '+ Nouveau Produit'}
		</button>
	</section>

	{#if showAddForm}
		<AddProductForm {categories} on:add={handleAddProduct} />
	{/if}

	<section class="products-stats">
		<div class="stat-box">
			<p class="stat-label">Total Produits</p>
			<p class="stat-value">{products.length}</p>
		</div>
		<div class="stat-box">
			<p class="stat-label">Actifs</p>
			<p class="stat-value">{products.filter((p) => p.active).length}</p>
		</div>
		<div class="stat-box">
			<p class="stat-label">Inactifs</p>
			<p class="stat-value">{products.filter((p) => !p.active).length}</p>
		</div>
		<div class="stat-box">
			<p class="stat-label">Revenu Potentiel</p>
			<p class="stat-value">
				{new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(
					products.reduce((sum, p) => sum + p.price * p.stock, 0)
				)} DZD
			</p>
		</div>
	</section>

	<section class="filters-section">
		<div class="filter-row">
			<div class="search-wrapper">
				<span class="search-icon">🔍</span>
				<input
					type="text"
					placeholder="Rechercher par nom ou SKU..."
					value={searchQuery}
					on:input={handleSearch}
					class="search-input"
				/>
			</div>

			<select value={categoryFilter} on:change={handleCategoryFilter} class="filter-select">
				<option value="all">Toutes les catégories</option>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>

			<select value={activeFilter} on:change={handleActiveFilter} class="filter-select">
				<option value="all">Tous les statuts</option>
				<option value="active">Actifs</option>
				<option value="inactive">Inactifs</option>
			</select>
		</div>
	</section>

	<ProductsList {filteredProducts} {categories} />
</div>

<style>
	.products-container {
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

	.products-stats {
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

		.products-stats {
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
