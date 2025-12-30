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
		padding: 3rem 2.5rem;
		max-width: 1800px;
		margin: 0 auto;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		min-height: 100vh;
	}

	.dashboard-header {
		margin-bottom: 4rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid var(--primary-lighter);
	}

	.dashboard-title {
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

	.dashboard-subtitle {
		font-size: 1.6rem;
		color: #888;
		font-weight: 400;
		letter-spacing: 0.02em;
		font-family: 'Andada Pro', serif;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
		gap: 2.2rem;
		margin-bottom: 4rem;
	}

	.charts-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(50rem, 1fr));
		gap: 2.2rem;
		margin-bottom: 4rem;
	}

	.chart-placeholder {
		min-height: 36rem;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: 2.5rem 0;
		background: linear-gradient(to top, rgba(209, 178, 178, 0.05), transparent);
		border-radius: 1rem;
	}

	.bar-chart {
		display: flex;
		align-items: flex-end;
		justify-content: space-around;
		gap: 1.4rem;
		width: 100%;
		height: 28rem;
		padding: 0 1rem;
	}

	.bar {
		flex: 1;
		background: linear-gradient(180deg, #d1b2b2 0%, #a87a7a 100%);
		border-radius: 0.8rem 0.8rem 0 0;
		position: relative;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		min-height: 2rem;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 0.8rem;
		box-shadow: 0 2px 8px rgba(179, 119, 119, 0.12);
	}

	.bar:hover {
		box-shadow: 0 12px 24px rgba(179, 119, 119, 0.28);
		transform: translateY(-6px);
		background: linear-gradient(180deg, #e5d0d0 0%, #b37777 100%);
	}

	.bar-label {
		font-size: 1.3rem;
		font-weight: 700;
		color: #fff;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.05em;
	}

	.category-stats {
		display: flex;
		flex-direction: column;
		gap: 2.2rem;
	}

	.category-item {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 0.8rem;
		border: 1px solid rgba(209, 178, 178, 0.3);
		transition: all 0.3s ease;
	}

	.category-item:hover {
		background: rgba(255, 255, 255, 0.9);
		border-color: var(--primary-light);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
	}

	.category-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.category-name {
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.category-percentage {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary);
		background: linear-gradient(135deg, rgba(209, 178, 178, 0.15), rgba(179, 119, 119, 0.1));
		padding: 0.4rem 1rem;
		border-radius: 0.6rem;
	}

	.progress-bar {
		width: 100%;
		height: 1rem;
		background: linear-gradient(90deg, #f0d9d9 0%, #e8e0db 100%);
		border-radius: 0.8rem;
		overflow: hidden;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04);
	}

	.progress-fill {
		height: 100%;
		border-radius: 0.8rem;
		transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.7rem 1.3rem;
		border-radius: 0.7rem;
		font-size: 1.3rem;
		font-weight: 600;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
		backdrop-filter: blur(10px);
		border: 1px solid transparent;
	}

	.status-delivered {
		background: rgba(39, 174, 96, 0.12);
		color: #1d6b3c;
		border-color: rgba(39, 174, 96, 0.3);
	}

	.status-processing {
		background: rgba(243, 156, 18, 0.12);
		color: #b87c0f;
		border-color: rgba(243, 156, 18, 0.3);
	}

	.status-pending {
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
		border-color: rgba(201, 68, 68, 0.3);
	}

	.status-shipped {
		background: rgba(179, 119, 119, 0.12);
		color: #6b4444;
		border-color: rgba(179, 119, 119, 0.3);
	}

	.action-buttons {
		display: flex;
		gap: 1rem;
	}

	@media (max-width: 1024px) {
		.dashboard-container {
			padding: 2rem;
		}

		.stats-grid {
			grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
			gap: 1.8rem;
		}

		.charts-section {
			grid-template-columns: 1fr;
		}

		.dashboard-title {
			font-size: 3rem;
		}
	}

	@media (max-width: 768px) {
		.dashboard-title {
			font-size: 2.6rem;
		}

		.dashboard-subtitle {
			font-size: 1.4rem;
		}

		.stats-grid {
			grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
			gap: 1.5rem;
		}

		.dashboard-container {
			padding: 1.5rem;
		}

		.dashboard-header {
			margin-bottom: 2.5rem;
		}

		.charts-section {
			gap: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.dashboard-container {
			padding: 1rem;
		}

		.dashboard-title {
			font-size: 2rem;
		}

		.dashboard-subtitle {
			font-size: 1.2rem;
		}

		.stats-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.bar-chart {
			gap: 0.8rem;
			height: 22rem;
			padding: 0 0.5rem;
		}

		.bar-label {
			font-size: 1rem;
		}

		.dashboard-header {
			margin-bottom: 1.5rem;
			padding-bottom: 1rem;
		}
	}
</style>
