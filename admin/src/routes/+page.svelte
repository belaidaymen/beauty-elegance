<script lang="ts">
	import StatCard from '$lib/components/StatCard.svelte';
	import RecentOrders from '$lib/components/RecentOrders.svelte';
	import SalesChart from '$lib/components/SalesChart.svelte';
	import CategoryBreakdown from '$lib/components/CategoryBreakdown.svelte';

	let stats = [
		{
			title: 'Revenus Totaux',
			value: '285,500 DZD',
			change: '+12.5%',
			icon: '💰',
			color: 'teal'
		},
		{
			title: 'Commandes',
			value: '1,234',
			change: '+8.2%',
			icon: '📦',
			color: 'burgundy'
		},
		{
			title: 'Clients',
			value: '856',
			change: '+5.1%',
			icon: '👥',
			color: 'purple'
		},
		{
			title: 'Conversion',
			value: '3.24%',
			change: '+2.4%',
			icon: '📈',
			color: 'orange'
		}
	];

	let topProducts = [
		{
			id: '1',
			name: 'Shampoing Gracias',
			sales: 245,
			revenue: 61,250,
			status: 'trending'
		},
		{
			id: '2',
			name: 'Mascara Professionnel',
			sales: 189,
			revenue: 47,250,
			status: 'trending'
		},
		{
			id: '3',
			name: 'Crème Visage Premium',
			sales: 156,
			revenue: 39,000,
			status: 'stable'
		},
		{
			id: '4',
			name: 'Parfum Luxe',
			sales: 98,
			revenue: 24,500,
			status: 'declining'
		}
	];
</script>

<svelte:head>
	<title>Tableau de Bord | Admin Beaute & Elegance</title>
</svelte:head>

<div class="dashboard-container">
	<section class="dashboard-header">
		<h1>Bienvenue au Tableau de Bord</h1>
		<p class="subtitle">Vue d'ensemble de votre boutique en ligne</p>
	</section>

	<section class="stats-grid">
		{#each stats as stat (stat.title)}
			<StatCard {stat} />
		{/each}
	</section>

	<section class="charts-section">
		<div class="chart-wrapper">
			<SalesChart />
		</div>
		<div class="chart-wrapper">
			<CategoryBreakdown />
		</div>
	</section>

	<section class="bottom-section">
		<div class="top-products">
			<div class="section-header">
				<h2>Produits les Plus Vendus</h2>
				<a href="/products" class="see-all-link">Voir tout →</a>
			</div>

			<div class="products-table">
				<table>
					<thead>
						<tr>
							<th>Produit</th>
							<th>Ventes</th>
							<th>Revenus</th>
							<th>Statut</th>
						</tr>
					</thead>
					<tbody>
						{#each topProducts as product (product.id)}
							<tr>
								<td class="product-name">{product.name}</td>
								<td>{product.sales}</td>
								<td>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product.revenue)} DZD</td>
								<td>
									<span class="status-badge" class:trending={product.status === 'trending'} class:stable={product.status === 'stable'} class:declining={product.status === 'declining'}>
										{product.status === 'trending' ? '📈 Tendance' : product.status === 'stable' ? '→ Stable' : '📉 Déclin'}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<RecentOrders />
	</section>
</div>

<style>
	.dashboard-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.dashboard-header {
		margin-bottom: var(--spacing-lg);
	}

	.dashboard-header h1 {
		margin-bottom: var(--spacing-sm);
		color: var(--color-accent-teal);
	}

	.subtitle {
		font-size: 1.6rem;
		color: var(--color-text-lighter);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-lg);
	}

	.charts-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: var(--spacing-lg);
	}

	.chart-wrapper {
		background: white;
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
	}

	.bottom-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-lg);
	}

	.top-products {
		background: white;
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
		padding-bottom: var(--spacing-lg);
		border-bottom: 2px solid var(--color-border);
	}

	.section-header h2 {
		margin: 0;
		color: var(--color-text-dark);
	}

	.see-all-link {
		color: var(--color-accent-teal);
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.see-all-link:hover {
		color: var(--color-accent-teal-light);
		transform: translateX(4px);
	}

	.products-table {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th {
		background-color: var(--color-primary-light-beige);
		padding: var(--spacing-md);
		text-align: left;
		font-weight: 600;
		color: var(--color-text-dark);
		border-bottom: 2px solid var(--color-border);
		font-size: 1.3rem;
	}

	td {
		padding: var(--spacing-md);
		border-bottom: 1px solid var(--color-border);
		font-size: 1.4rem;
	}

	tr:hover {
		background-color: var(--color-primary-cream);
	}

	.product-name {
		font-weight: 600;
		color: var(--color-accent-teal);
	}

	.status-badge {
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: 999px;
		font-size: 1.2rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.status-badge.trending {
		background: rgba(39, 174, 96, 0.15);
		color: var(--color-success);
	}

	.status-badge.stable {
		background: rgba(52, 152, 219, 0.15);
		color: var(--color-info);
	}

	.status-badge.declining {
		background: rgba(231, 76, 60, 0.15);
		color: var(--color-error);
	}

	@media (max-width: 1200px) {
		.charts-section {
			grid-template-columns: 1fr;
		}

		.bottom-section {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.section-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.products-table {
			font-size: 1.2rem;
		}

		th,
		td {
			padding: var(--spacing-sm);
			font-size: 1.2rem;
		}
	}

	@media (max-width: 480px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}

		.products-table {
			font-size: 1rem;
		}

		th,
		td {
			padding: var(--spacing-xs) var(--spacing-sm);
		}

		.section-header h2 {
			font-size: 1.6rem;
		}
	}
</style>
