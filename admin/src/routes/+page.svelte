<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import Button from '$lib/components/Button.svelte';
	import SalesIcon from '$lib/components/Icons/SalesIcon.svelte';
	import OrdersIcon from '$lib/components/Icons/OrdersIcon.svelte';
	import ProductsIcon from '$lib/components/Icons/ProductsIcon.svelte';
	import CustomersIcon from '$lib/components/Icons/CustomersIcon.svelte';
	import PendingIcon from '$lib/components/Icons/PendingIcon.svelte';
	import LowStockIcon from '$lib/components/Icons/LowStockIcon.svelte';

	interface Order {
		id: string;
		customer: string;
		total: number;
		status: string;
		date: string;
	}

	interface Product {
		id: string;
		name: string;
		category: string;
		sales: number;
		revenue: number;
	}

	const recentOrders: Order[] = [
		{ id: '#001', customer: 'Sarah Anderson', total: 2500, status: 'Delivered', date: '2024-01-15' },
		{ id: '#002', customer: 'Marie Dupont', total: 1850, status: 'Processing', date: '2024-01-14' },
		{ id: '#003', customer: 'Lisa Cohen', total: 3200, status: 'Pending', date: '2024-01-13' },
		{ id: '#004', customer: 'Emma Wilson', total: 1500, status: 'Delivered', date: '2024-01-12' },
		{ id: '#005', customer: 'Claire Martin', total: 2100, status: 'Shipped', date: '2024-01-11' }
	];

	const topProducts: Product[] = [
		{ id: '1', name: 'Gracias Shampoo', category: 'Cheveux', sales: 450, revenue: 22500 },
		{ id: '2', name: 'Lipstick Velvet', category: 'Maquillage', sales: 380, revenue: 18900 },
		{ id: '3', name: 'Face Cream Pro', category: 'Visage', sales: 320, revenue: 16000 },
		{ id: '4', name: 'Body Lotion', category: 'Corps & Bain', sales: 290, revenue: 14500 },
		{ id: '5', name: 'Deodorant Stick', category: 'Deo & Stick', sales: 220, revenue: 6600 }
	];

	const orderColumns = [
		{ key: 'id', label: 'Order ID', width: '15%' },
		{ key: 'customer', label: 'Customer', width: '25%' },
		{ key: 'total', label: 'Total', width: '15%' },
		{ key: 'status', label: 'Status', width: '20%' },
		{ key: 'date', label: 'Date', width: '15%' }
	];

	const productColumns = [
		{ key: 'name', label: 'Product Name', width: '25%' },
		{ key: 'category', label: 'Category', width: '20%' },
		{ key: 'sales', label: 'Sales', width: '15%' },
		{ key: 'revenue', label: 'Revenue', width: '20%' }
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Delivered':
				return 'success';
			case 'Processing':
				return 'warning';
			case 'Pending':
				return 'danger';
			case 'Shipped':
				return 'primary';
			default:
				return 'neutral';
		}
	};
</script>

<div class="dashboard-container">
	<div class="dashboard-header">
		<h1 class="dashboard-title">Dashboard Overview</h1>
		<p class="dashboard-subtitle">Welcome to your Beaute & Elegance admin panel</p>
	</div>

	<!-- Statistics Section -->
	<div class="stats-grid">
		<StatCard
			label="Total Sales"
			value="DZD 125,450"
			trend="up"
			trendValue="+12.5%"
			icon={SalesIcon}
			color="success"
		/>
		<StatCard
			label="Total Orders"
			value="1,234"
			trend="up"
			trendValue="+8.2%"
			icon={OrdersIcon}
			color="primary"
		/>
		<StatCard
			label="Active Products"
			value="342"
			trend="down"
			trendValue="-2.3%"
			icon={ProductsIcon}
			color="warning"
		/>
		<StatCard
			label="Total Customers"
			value="5,678"
			trend="up"
			trendValue="+15.3%"
			icon={CustomersIcon}
			color="success"
		/>
		<StatCard
			label="Pending Orders"
			value="23"
			trend="up"
			trendValue="+3.1%"
			icon={PendingIcon}
			color="danger"
		/>
		<StatCard
			label="Low Stock Items"
			value="12"
			trend="down"
			trendValue="-5.2%"
			icon={LowStockIcon}
			color="danger"
		/>
	</div>

	<!-- Charts Section -->
	<div class="charts-section">
		<Card title="Sales Performance" subtitle="Last 7 days">
			<div class="chart-placeholder">
				<div class="bar-chart">
					<div class="bar" style="height: 60%;">
						<span class="bar-label">Mon</span>
					</div>
					<div class="bar" style="height: 75%;">
						<span class="bar-label">Tue</span>
					</div>
					<div class="bar" style="height: 85%;">
						<span class="bar-label">Wed</span>
					</div>
					<div class="bar" style="height: 70%;">
						<span class="bar-label">Thu</span>
					</div>
					<div class="bar" style="height: 90%;">
						<span class="bar-label">Fri</span>
					</div>
					<div class="bar" style="height: 95%;">
						<span class="bar-label">Sat</span>
					</div>
					<div class="bar" style="height: 80%;">
						<span class="bar-label">Sun</span>
					</div>
				</div>
			</div>
		</Card>

		<Card title="Category Distribution" subtitle="Product sales by category">
			<div class="category-stats">
				<div class="category-item">
					<div class="category-header">
						<span class="category-name">Maquillage</span>
						<span class="category-percentage">35%</span>
					</div>
					<div class="progress-bar">
						<div class="progress-fill" style="width: 35%; background: #d1b2b2;"></div>
					</div>
				</div>
				<div class="category-item">
					<div class="category-header">
						<span class="category-name">Cheveux</span>
						<span class="category-percentage">28%</span>
					</div>
					<div class="progress-bar">
						<div class="progress-fill" style="width: 28%; background: #b37777;"></div>
					</div>
				</div>
				<div class="category-item">
					<div class="category-header">
						<span class="category-name">Visage</span>
						<span class="category-percentage">20%</span>
					</div>
					<div class="progress-bar">
						<div class="progress-fill" style="width: 20%; background: #9d5f5f;"></div>
					</div>
				</div>
				<div class="category-item">
					<div class="category-header">
						<span class="category-name">Corps & Bain</span>
						<span class="category-percentage">12%</span>
					</div>
					<div class="progress-bar">
						<div class="progress-fill" style="width: 12%; background: #f39c12;"></div>
					</div>
				</div>
				<div class="category-item">
					<div class="category-header">
						<span class="category-name">Deo & Stick</span>
						<span class="category-percentage">5%</span>
					</div>
					<div class="progress-bar">
						<div class="progress-fill" style="width: 5%; background: #27ae60;"></div>
					</div>
				</div>
			</div>
		</Card>
	</div>

	<!-- Recent Orders Section -->
	<Card title="Recent Orders" subtitle="Latest transactions">
		<DataTable columns={orderColumns} data={recentOrders}>
			<svelte:fragment slot="cell" let:row let:col>
				{#if col.key === 'total'}
					DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(row.total)}
				{:else if col.key === 'status'}
					<span class="status-badge status-{row.status.toLowerCase().replace(/\s+/g, '-')}">
						{row.status}
					</span>
				{:else}
					{row[col.key]}
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="actions" let:row>
				<div class="action-buttons">
					<Button href="/orders" size="small" variant="secondary">View</Button>
				</div>
			</svelte:fragment>
		</DataTable>
	</Card>

	<!-- Top Products Section -->
	<Card title="Top Performing Products" subtitle="Best sellers this month">
		<DataTable columns={productColumns} data={topProducts}>
			<svelte:fragment slot="cell" let:row let:col>
				{#if col.key === 'revenue'}
					DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(row.revenue)}
				{:else}
					{row[col.key]}
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="actions" let:row>
				<div class="action-buttons">
					<Button href="/products" size="small" variant="secondary">Edit</Button>
				</div>
			</svelte:fragment>
		</DataTable>
	</Card>
</div>

<style>
	.dashboard-container {
		padding: 2.5rem 2rem;
		max-width: 1700px;
		margin: 0 auto;
	}

	.dashboard-header {
		margin-bottom: 3.5rem;
	}

	.dashboard-title {
		font-family: 'Andada Pro', serif;
		font-size: 3.2rem;
		font-weight: 500;
		color: #333;
		margin-bottom: 0.8rem;
		letter-spacing: 0.01em;
	}

	.dashboard-subtitle {
		font-size: 1.5rem;
		color: #999;
		font-weight: 400;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
		gap: 2rem;
		margin-bottom: 3.5rem;
	}

	.charts-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(48rem, 1fr));
		gap: 2rem;
		margin-bottom: 3.5rem;
	}

	.chart-placeholder {
		min-height: 32rem;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: 2rem 0;
	}

	.bar-chart {
		display: flex;
		align-items: flex-end;
		justify-content: space-around;
		gap: 1.2rem;
		width: 100%;
		height: 26rem;
	}

	.bar {
		flex: 1;
		background: linear-gradient(180deg, #d1b2b2 0%, #b37777 100%);
		border-radius: 0.6rem 0.6rem 0 0;
		position: relative;
		transition: all 0.25s ease;
		min-height: 2rem;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 0.6rem;
	}

	.bar:hover {
		box-shadow: 0 6px 16px rgba(179, 119, 119, 0.25);
		transform: translateY(-3px);
	}

	.bar-label {
		font-size: 1.2rem;
		font-weight: 600;
		color: #fff;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.category-stats {
		display: flex;
		flex-direction: column;
		gap: 2rem;
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

	.category-percentage {
		font-size: 1.4rem;
		font-weight: 600;
		color: #b37777;
	}

	.progress-bar {
		width: 100%;
		height: 0.8rem;
		background: #e8e0db;
		border-radius: 0.6rem;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		border-radius: 0.6rem;
		transition: width 0.3s ease;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.6rem 1.2rem;
		border-radius: 0.6rem;
		font-size: 1.2rem;
		font-weight: 600;
	}

	.status-delivered {
		background: rgba(39, 174, 96, 0.15);
		color: #27ae60;
	}

	.status-processing {
		background: rgba(243, 156, 18, 0.15);
		color: #f39c12;
	}

	.status-pending {
		background: rgba(201, 68, 68, 0.15);
		color: #c94444;
	}

	.status-shipped {
		background: rgba(179, 119, 119, 0.15);
		color: #b37777;
	}

	.action-buttons {
		display: flex;
		gap: 0.8rem;
	}

	@media (max-width: 1024px) {
		.dashboard-container {
			padding: 2rem;
		}

		.stats-grid {
			grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
		}

		.charts-section {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.dashboard-title {
			font-size: 2.4rem;
		}

		.stats-grid {
			grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
			gap: 1.5rem;
		}

		.dashboard-container {
			padding: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.dashboard-container {
			padding: 1rem;
		}

		.dashboard-title {
			font-size: 2rem;
		}

		.stats-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.bar-chart {
			gap: 0.8rem;
			height: 22rem;
		}

		.bar-label {
			font-size: 1rem;
		}
	}
</style>
