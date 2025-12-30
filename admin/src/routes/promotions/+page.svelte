<script lang="ts">
	import { promotionsStore } from '$lib/stores/promotions_store';
	import { uiStore } from '$lib/stores/ui_store';
	import PromotionsList from '$lib/components/Promotions/PromotionsList.svelte';
	import AddPromotionForm from '$lib/components/Promotions/AddPromotionForm.svelte';
	import type { Promotion } from '$lib/stores/promotions_store';

	let searchQuery = '';
	let statusFilter = 'all';
	let showAddForm = false;
	let promotions: Promotion[] = [];
	let filteredPromotions: Promotion[] = [];

	// Initialize with demo promotions
	const demoPromotions: Promotion[] = [
		{
			id: 'promo1',
			name: 'Noël 2024',
			description: 'Grande promotion de fin d\'année',
			code: 'NOEL24',
			discountType: 'percentage',
			discountValue: 20,
			minPurchaseAmount: 5000,
			startDate: new Date('2024-12-01'),
			endDate: new Date('2024-12-31'),
			usageLimit: 500,
			usageCount: 245,
			applicableCategories: ['Maquillage', 'Cheveux'],
			active: true,
			createdAt: new Date('2024-11-20')
		},
		{
			id: 'promo2',
			name: 'Ramadan',
			description: 'Promotion spéciale Ramadan',
			code: 'RAMADAN',
			discountType: 'fixed',
			discountValue: 2000,
			minPurchaseAmount: 10000,
			startDate: new Date('2024-02-26'),
			endDate: new Date('2024-03-30'),
			usageLimit: 1000,
			usageCount: 567,
			applicableProducts: ['p1', 'p4', 'p5'],
			active: false,
			createdAt: new Date('2024-02-01')
		},
		{
			id: 'promo3',
			name: 'Black Friday',
			description: 'Les meilleures réductions',
			code: 'BLACKFRI',
			discountType: 'percentage',
			discountValue: 30,
			startDate: new Date('2024-11-25'),
			endDate: new Date('2024-11-30'),
			usageLimit: 200,
			usageCount: 198,
			applicableCategories: ['Maquillage', 'Cheveux', 'Visage'],
			active: false,
			createdAt: new Date('2024-10-15')
		},
		{
			id: 'promo4',
			name: 'Premier Achat',
			description: '10% pour les nouveaux clients',
			code: 'BIENVENUE',
			discountType: 'percentage',
			discountValue: 10,
			startDate: new Date('2024-01-01'),
			endDate: new Date('2025-12-31'),
			usageLimit: null,
			usageCount: 1234,
			active: true,
			createdAt: new Date('2024-01-01')
		},
		{
			id: 'promo5',
			name: 'Panier Minimum',
			description: '500 DZD offerts à partir de 15000 DZD',
			code: 'PANIER15',
			discountType: 'fixed',
			discountValue: 500,
			minPurchaseAmount: 15000,
			startDate: new Date('2024-12-01'),
			endDate: new Date('2024-12-31'),
			usageLimit: null,
			usageCount: 89,
			applicableCategories: [],
			active: true,
			createdAt: new Date('2024-11-01')
		}
	];

	promotionsStore.setPromotions(demoPromotions);

	promotionsStore.subscribe((state) => {
		promotions = state.promotions;
		filterPromotions();
	});

	function filterPromotions() {
		filteredPromotions = promotions.filter((promo) => {
			const matchesSearch = promo.name.toLowerCase().includes(searchQuery.toLowerCase()) || promo.code.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? promo.active : !promo.active);
			return matchesSearch && matchesStatus;
		});
	}

	function handleSearch(e: Event) {
		const target = e.target as HTMLInputElement;
		searchQuery = target.value;
		filterPromotions();
	}

	function handleStatusFilter(e: Event) {
		const target = e.target as HTMLSelectElement;
		statusFilter = target.value;
		filterPromotions();
	}

	function handleAddPromotion(e: CustomEvent) {
		showAddForm = false;
		uiStore.showNotification('Promotion créée avec succès', 'success');
	}

	const activeCount = promotions.filter((p) => p.active).length;
	const totalUsages = promotions.reduce((sum, p) => sum + p.usageCount, 0);
	const totalSavings = promotions.reduce((sum, p) => sum + (p.discountValue * p.usageCount), 0);
</script>

<svelte:head>
	<title>Gestion des Promotions | Admin</title>
</svelte:head>

<div class="promotions-container">
	<section class="page-header">
		<div class="header-content">
			<h1>Gestion des Promotions</h1>
			<p class="subtitle">Créez et gérez vos codes promos et campagnes</p>
		</div>
		<button class="btn btn-primary" on:click={() => (showAddForm = !showAddForm)}>
			{showAddForm ? '✕ Fermer' : '+ Nouvelle Promotion'}
		</button>
	</section>

	{#if showAddForm}
		<AddPromotionForm on:add={handleAddPromotion} />
	{/if}

	<section class="promotions-stats">
		<div class="stat-box">
			<p class="stat-label">Total Promotions</p>
			<p class="stat-value">{promotions.length}</p>
		</div>
		<div class="stat-box">
			<p class="stat-label">Actives</p>
			<p class="stat-value">{activeCount}</p>
		</div>
		<div class="stat-box">
			<p class="stat-label">Utilisations Totales</p>
			<p class="stat-value">{totalUsages}</p>
		</div>
		<div class="stat-box">
			<p class="stat-label">Économies Accordées</p>
			<p class="stat-value">
				{new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(totalSavings)} DZD
			</p>
		</div>
	</section>

	<section class="filters-section">
		<div class="filter-row">
			<div class="search-wrapper">
				<span class="search-icon">🔍</span>
				<input
					type="text"
					placeholder="Rechercher par nom ou code..."
					value={searchQuery}
					on:input={handleSearch}
					class="search-input"
				/>
			</div>

			<select value={statusFilter} on:change={handleStatusFilter} class="filter-select">
				<option value="all">Tous les statuts</option>
				<option value="active">Actives</option>
				<option value="inactive">Inactives</option>
			</select>
		</div>
	</section>

	<PromotionsList {filteredPromotions} />
</div>

<style>
	.promotions-container {
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

	.promotions-stats {
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

		.promotions-stats {
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
