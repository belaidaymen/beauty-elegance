<script lang="ts">
	import Card from '../Card.svelte';
	import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-svelte';

	export let products: any[] = [];

	$: stats = {
		totalItems: products.length,
		totalQuantity: products.reduce((sum, p) => sum + (p.currentStock || 0), 0),
		totalValue: products.reduce((sum, p) => sum + ((p.currentStock || 0) * (p.price || 0)), 0),
		criticalCount: products.filter(
			(p) => p.currentStock <= p.minStock || p.currentStock === 0
		).length,
		lowCount: products.filter(
			(p) => p.currentStock > p.minStock && p.currentStock <= p.minStock * 1.5
		).length,
		optimalCount: products.filter((p) => p.currentStock > p.minStock * 1.5).length,
		avgTurnover: products.length > 0
			? (
					products.reduce((sum, p) => sum + (p.lastRestocked ? 1 : 0), 0) /
					products.length
				).toFixed(1)
			: 0
	};

	const getTopLowStock = () => {
		return products
			.filter((p) => p.currentStock < p.maxStock * 0.3)
			.sort((a, b) => a.currentStock - b.currentStock)
			.slice(0, 5);
	};

	const getTopMovers = () => {
		return products
			.filter((p) => p.lastRestocked)
			.sort(
				(a, b) =>
					new Date(b.lastRestocked).getTime() - new Date(a.lastRestocked).getTime()
			)
			.slice(0, 5);
	};

	const getCategoryDistribution = () => {
		const distribution: any = {};
		products.forEach((p) => {
			distribution[p.category] = (distribution[p.category] || 0) + (p.currentStock || 0);
		});
		return Object.entries(distribution)
			.map(([category, quantity]) => ({
				category,
				quantity: quantity as number
			}))
			.sort((a, b) => b.quantity - a.quantity);
	};

	const getHealthScore = () => {
		if (products.length === 0) return 0;
		const healthyCount = stats.optimalCount;
		return Math.round((healthyCount / products.length) * 100);
	};

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'DZD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value);
	};

	const formatNumber = (value: number) => {
		return new Intl.NumberFormat('en-US').format(value);
	};
</script>

<div class="analytics-container">
	<!-- Key Metrics -->
	<div class="metrics-grid">
		<div class="metric-card">
			<div class="metric-header">
				<h3 class="metric-label">Total Items</h3>
			</div>
			<div class="metric-value">{stats.totalItems}</div>
			<p class="metric-subtitle">Products in inventory</p>
		</div>

		<div class="metric-card">
			<div class="metric-header">
				<h3 class="metric-label">Total Quantity</h3>
			</div>
			<div class="metric-value">{formatNumber(stats.totalQuantity)}</div>
			<p class="metric-subtitle">Units in stock</p>
		</div>

		<div class="metric-card">
			<div class="metric-header">
				<h3 class="metric-label">Inventory Value</h3>
			</div>
			<div class="metric-value price">{formatCurrency(stats.totalValue)}</div>
			<p class="metric-subtitle">Total stock value</p>
		</div>

		<div class="metric-card">
			<div class="metric-header">
				<h3 class="metric-label">Health Score</h3>
			</div>
			<div class="metric-value score">
				<span>{getHealthScore()}%</span>
			</div>
			<p class="metric-subtitle">Optimal stock ratio</p>
		</div>
	</div>

	<!-- Status Distribution -->
	<div class="status-distribution">
		<Card title="Stock Status Distribution">
			<div class="distribution-grid">
				<div class="distribution-item optimal">
					<div class="distribution-icon">
						<CheckCircle size={32} />
					</div>
					<div class="distribution-content">
						<p class="distribution-label">Optimal</p>
						<p class="distribution-number">{stats.optimalCount}</p>
						<p class="distribution-percentage">{stats.totalItems > 0 ? Math.round((stats.optimalCount / stats.totalItems) * 100) : 0}%</p>
					</div>
				</div>

				<div class="distribution-item warning">
					<div class="distribution-icon">
						<AlertTriangle size={32} />
					</div>
					<div class="distribution-content">
						<p class="distribution-label">Low Stock</p>
						<p class="distribution-number">{stats.lowCount}</p>
						<p class="distribution-percentage">{stats.totalItems > 0 ? Math.round((stats.lowCount / stats.totalItems) * 100) : 0}%</p>
					</div>
				</div>

				<div class="distribution-item critical">
					<div class="distribution-icon">
						<AlertTriangle size={32} />
					</div>
					<div class="distribution-content">
						<p class="distribution-label">Critical</p>
						<p class="distribution-number">{stats.criticalCount}</p>
						<p class="distribution-percentage">{stats.totalItems > 0 ? Math.round((stats.criticalCount / stats.totalItems) * 100) : 0}%</p>
					</div>
				</div>
			</div>
		</Card>
	</div>

	<div class="insights-grid">
		<!-- Category Distribution -->
		<Card title="Stock by Category">
			<div class="category-list">
				{#each getCategoryDistribution() as category (category.category)}
					<div class="category-item">
						<div class="category-header">
							<span class="category-name">{category.category}</span>
							<span class="category-quantity">{formatNumber(category.quantity)} units</span>
						</div>
						<div class="category-bar">
							<div
								class="category-fill"
								style="width: {(category.quantity / Math.max(...getCategoryDistribution().map((c) => c.quantity), 1)) * 100}%"
							></div>
						</div>
					</div>
				{/each}
			</div>
		</Card>

		<!-- Alerts & Issues -->
		<Card title="Low Stock Alerts">
			{#if getTopLowStock().length === 0}
				<div class="empty-insights">
					<CheckCircle size={40} />
					<p>All products are well stocked!</p>
				</div>
			{:else}
				<div class="alert-list">
					{#each getTopLowStock() as product (product.id)}
						<div class="alert-item critical">
							<div class="alert-name">{product.name}</div>
							<div class="alert-stock">
								<span class="current">{product.currentStock}</span>
								<span class="max">/ {product.maxStock}</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</Card>
	</div>

	<!-- Recently Restocked -->
	<Card title="Recently Restocked">
		{#if getTopMovers().length === 0}
			<div class="empty-insights">
				<TrendingUp size={40} />
				<p>No recent restocking activity</p>
			</div>
		{:else}
			<div class="movers-list">
				{#each getTopMovers() as product (product.id)}
					<div class="mover-item">
						<div class="mover-info">
							<p class="mover-name">{product.name}</p>
							<p class="mover-date">
								{new Date(product.lastRestocked).toLocaleDateString()}
							</p>
						</div>
						<div class="mover-stock">
							<span class="stock-amount">{product.currentStock}</span>
							<span class="stock-unit">units</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</Card>
</div>

<style>
	.analytics-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
		gap: 1.5rem;
	}

	.metric-card {
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border: 2px solid #e8e0db;
		border-radius: 1rem;
		padding: 1.8rem;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.metric-card:hover {
		border-color: #b37777;
		box-shadow: 0 8px 20px rgba(179, 119, 119, 0.12);
		transform: translateY(-2px);
	}

	.metric-header {
		margin-bottom: 1rem;
	}

	.metric-label {
		font-size: 1.2rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 0.08em;
		margin: 0;
		font-family: 'Andada Pro', serif;
	}

	.metric-value {
		font-size: 2.8rem;
		font-weight: 700;
		color: #333;
		margin: 0.5rem 0;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.metric-value.price {
		font-size: 2rem;
	}

	.metric-value.score {
		font-size: 3.2rem;
	}

	.metric-subtitle {
		font-size: 1.2rem;
		color: #999;
		margin: 0;
	}

	.status-distribution {
		margin-bottom: 1rem;
	}

	.distribution-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1.5rem;
	}

	.distribution-item {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1.5rem;
		border-radius: 0.8rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
	}

	.distribution-item.optimal {
		border-left: 5px solid #27ae60;
	}

	.distribution-item.warning {
		border-left: 5px solid #f39c12;
	}

	.distribution-item.critical {
		border-left: 5px solid #e74c3c;
	}

	.distribution-icon {
		flex-shrink: 0;
	}

	.distribution-item.optimal .distribution-icon {
		color: #27ae60;
	}

	.distribution-item.warning .distribution-icon {
		color: #f39c12;
	}

	.distribution-item.critical .distribution-icon {
		color: #e74c3c;
	}

	.distribution-content {
		flex: 1;
	}

	.distribution-label {
		font-size: 1.3rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.distribution-number {
		font-size: 2.2rem;
		font-weight: 700;
		color: #333;
		margin: 0.3rem 0;
	}

	.distribution-percentage {
		font-size: 1.2rem;
		color: #b37777;
		font-weight: 600;
		margin: 0;
	}

	.insights-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
		gap: 2rem;
	}

	.category-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.category-item {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.category-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.category-name {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.category-quantity {
		font-size: 1.3rem;
		color: #b37777;
		font-weight: 600;
	}

	.category-bar {
		width: 100%;
		height: 0.8rem;
		background: #e0c8c8;
		border-radius: 0.4rem;
		overflow: hidden;
	}

	.category-fill {
		height: 100%;
		background: linear-gradient(90deg, #b37777, #d1b2b2);
		border-radius: 0.4rem;
		transition: width 0.3s ease;
	}

	.empty-insights {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 2rem;
		text-align: center;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		color: #999;
	}

	.empty-insights svg {
		margin-bottom: 1rem;
		color: #ddd;
	}

	.empty-insights p {
		font-size: 1.4rem;
		margin: 0;
	}

	.alert-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.alert-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.2rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-left: 4px solid #e74c3c;
		border-radius: 0.4rem;
	}

	.alert-name {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.alert-stock {
		display: flex;
		align-items: baseline;
		gap: 0.4rem;
	}

	.alert-stock .current {
		font-size: 1.6rem;
		font-weight: 700;
		color: #e74c3c;
	}

	.alert-stock .max {
		font-size: 1.2rem;
		color: #999;
	}

	.movers-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.mover-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.2rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-left: 4px solid #27ae60;
		border-radius: 0.4rem;
	}

	.mover-info {
		flex: 1;
	}

	.mover-name {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.mover-date {
		font-size: 1.2rem;
		color: #999;
		margin: 0.3rem 0 0 0;
	}

	.mover-stock {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.stock-amount {
		font-size: 1.6rem;
		font-weight: 700;
		color: #27ae60;
	}

	.stock-unit {
		font-size: 1.2rem;
		color: #999;
	}

	@media (max-width: 1024px) {
		.insights-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.metrics-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}

		.distribution-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
