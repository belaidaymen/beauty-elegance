<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import { Eye, Package, Clock, RotateCw, CheckCircle, XCircle, DollarSign } from 'lucide-svelte';

	interface Order {
		id: string;
		customer: string;
		email: string;
		total: number;
		status: string;
		date: string;
		items: number;
	}

	let orders: Order[] = [
		{
			id: '#ORD-001',
			customer: 'Sarah Anderson',
			email: 'sarah@example.com',
			total: 2500,
			status: 'Delivered',
			date: '2024-01-15',
			items: 3
		},
		{
			id: '#ORD-002',
			customer: 'Marie Dupont',
			email: 'marie@example.com',
			total: 1850,
			status: 'Processing',
			date: '2024-01-14',
			items: 2
		},
		{
			id: '#ORD-003',
			customer: 'Lisa Cohen',
			email: 'lisa@example.com',
			total: 3200,
			status: 'Pending',
			date: '2024-01-13',
			items: 5
		},
		{
			id: '#ORD-004',
			customer: 'Emma Wilson',
			email: 'emma@example.com',
			total: 1500,
			status: 'Shipped',
			date: '2024-01-12',
			items: 1
		},
		{
			id: '#ORD-005',
			customer: 'Claire Martin',
			email: 'claire@example.com',
			total: 2100,
			status: 'Delivered',
			date: '2024-01-11',
			items: 4
		},
		{
			id: '#ORD-006',
			customer: 'Nora Schmidt',
			email: 'nora@example.com',
			total: 950,
			status: 'Pending',
			date: '2024-01-10',
			items: 2
		}
	];

	let showDetailsModal = false;
	let selectedOrder: Order | null = null;
	let newStatus = '';

	const columns = [
		{ key: 'id', label: 'Order ID', width: '15%' },
		{ key: 'customer', label: 'Customer', width: '20%' },
		{ key: 'total', label: 'Total (DZD)', width: '15%' },
		{ key: 'items', label: 'Items', width: '10%' },
		{ key: 'status', label: 'Status', width: '15%' },
		{ key: 'date', label: 'Date', width: '15%' }
	];

	const statuses = [
		'Pending',
		'Processing',
		'Shipped',
		'Delivered',
		'Cancelled',
		'Refunded'
	];

	const openDetailsModal = (order: Order) => {
		selectedOrder = order;
		newStatus = order.status;
		showDetailsModal = true;
	};

	const updateOrderStatus = () => {
		if (selectedOrder) {
			orders = orders.map((o) =>
				o.id === selectedOrder?.id ? { ...o, status: newStatus } : o
			);
			showDetailsModal = false;
		}
	};

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
			case 'Cancelled':
				return 'danger';
			case 'Refunded':
				return 'danger';
			default:
				return 'neutral';
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Pending':
				return Clock;
			case 'Processing':
				return RotateCw;
			case 'Shipped':
				return Package;
			case 'Delivered':
				return CheckCircle;
			case 'Cancelled':
				return XCircle;
			case 'Refunded':
				return DollarSign;
			default:
				return Package;
		}
	};

	const trackingSteps = [
		{ status: 'Pending', description: 'Order placed and awaiting confirmation' },
		{ status: 'Processing', description: 'Order being prepared for shipment' },
		{ status: 'Shipped', description: 'Package has been shipped' },
		{ status: 'Delivered', description: 'Package delivered successfully' }
	];
</script>

<div class="orders-container">
	<div class="page-header">
		<div>
			<h1 class="page-title">Order Management</h1>
			<p class="page-subtitle">Track and manage customer orders</p>
		</div>
	</div>

	<!-- Summary Stats -->
	<div class="summary-stats">
		<div class="stat-box">
			<div class="stat-icon">
				<Package size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Total Orders</p>
				<p class="stat-value">{orders.length}</p>
			</div>
		</div>
		<div class="stat-box">
			<div class="stat-icon">
				<Clock size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Pending</p>
				<p class="stat-value">{orders.filter((o) => o.status === 'Pending').length}</p>
			</div>
		</div>
		<div class="stat-box">
			<div class="stat-icon">
				<RotateCw size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Processing</p>
				<p class="stat-value">{orders.filter((o) => o.status === 'Processing').length}</p>
			</div>
		</div>
		<div class="stat-box">
			<div class="stat-icon">
				<CheckCircle size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Delivered</p>
				<p class="stat-value">{orders.filter((o) => o.status === 'Delivered').length}</p>
			</div>
		</div>
	</div>

	<!-- Orders Table -->
	<Card title="All Orders" subtitle="Complete order listing and status">
		<DataTable columns={columns} data={orders}>
			<svelte:fragment slot="cell" let:row let:col>
				{#if col.key === 'total'}
					DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(row.total)}
				{:else if col.key === 'status'}
					<span class="status-badge status-{row.status.toLowerCase().replace(/\s+/g, '-')}">
						<svelte:component this={getStatusIcon(row.status)} size={16} />
						{row.status}
					</span>
				{:else}
					{row[col.key]}
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="actions" let:row>
				<div class="action-buttons">
					<Button variant="secondary" size="small" on:click={() => openDetailsModal(row)}>
						<Eye size={18} />
						View
					</Button>
				</div>
			</svelte:fragment>
		</DataTable>
	</Card>
</div>

<!-- Order Details Modal -->
<Modal
	isOpen={showDetailsModal}
	title="Order Details"
	size="large"
	onClose={() => (showDetailsModal = false)}
>
	{#if selectedOrder}
		<div class="details-section">
			<h3 class="section-title">Order Information</h3>
			<div class="details-grid">
				<div class="detail-item">
					<label>Order ID</label>
					<p>{selectedOrder.id}</p>
				</div>
				<div class="detail-item">
					<label>Date</label>
					<p>{selectedOrder.date}</p>
				</div>
				<div class="detail-item">
					<label>Customer</label>
					<p>{selectedOrder.customer}</p>
				</div>
				<div class="detail-item">
					<label>Email</label>
					<p>{selectedOrder.email}</p>
				</div>
				<div class="detail-item">
					<label>Total Amount</label>
					<p class="amount">DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(selectedOrder.total)}</p>
				</div>
				<div class="detail-item">
					<label>Items Count</label>
					<p>{selectedOrder.items}</p>
				</div>
			</div>
		</div>

		<!-- Order Status Update -->
		<div class="details-section">
			<h3 class="section-title">Update Order Status</h3>
			<div class="form-group">
				<label class="form-label">Current Status: <span class="current-status">{selectedOrder.status}</span></label>
				<select bind:value={newStatus} class="form-select">
					{#each statuses as status}
						<option value={status}>{status}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Tracking Timeline -->
		<div class="details-section">
			<h3 class="section-title">Order Progress</h3>
			<div class="timeline">
				{#each trackingSteps as step (step.status)}
					<div class="timeline-item" class:completed={statuses.indexOf(newStatus) >= statuses.indexOf(step.status)}>
						<div class="timeline-icon">{getStatusIcon(step.status)}</div>
						<div class="timeline-content">
							<h4 class="timeline-status">{step.status}</h4>
							<p class="timeline-description">{step.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<svelte:fragment slot="footer">
		<Button variant="secondary" on:click={() => (showDetailsModal = false)}>Close</Button>
		<Button variant="primary" on:click={updateOrderStatus}>Update Status</Button>
	</svelte:fragment>
</Modal>

<style>
	.orders-container {
		padding: 3rem 2.5rem;
		max-width: 1800px;
		margin: 0 auto;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		min-height: 100vh;
	}

	.page-header {
		margin-bottom: 3.5rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid var(--primary-lighter);
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

	.summary-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
		gap: 2rem;
		margin-bottom: 3.5rem;
	}

	.stat-box {
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border: 2px solid transparent;
		border-image: linear-gradient(135deg, #e8e0db, #f0d9d9) 1;
		border-radius: 1.2rem;
		padding: 2rem;
		display: flex;
		align-items: center;
		gap: 1.8rem;
		transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
	}

	.stat-box:hover {
		box-shadow: 0 12px 32px rgba(179, 119, 119, 0.12);
		transform: translateY(-6px);
		border-color: var(--primary-light);
		background: linear-gradient(135deg, #fff 0%, #fff9f9 100%);
	}

	.stat-icon {
		font-size: 3.2rem;
		width: 6.5rem;
		height: 6.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(209, 178, 178, 0.15), rgba(209, 178, 178, 0.05));
		border-radius: 1.2rem;
		flex-shrink: 0;
	}

	.stat-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.stat-label {
		font-size: 1.3rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 700;
		font-family: 'Andada Pro', serif;
	}

	.stat-value {
		font-size: 2.6rem;
		font-weight: 700;
		color: #2a2a2a;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.7rem 1.3rem;
		border-radius: 0.7rem;
		font-size: 1.3rem;
		font-weight: 600;
		gap: 0.5rem;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
		backdrop-filter: blur(10px);
		border: 1px solid transparent;
	}

	.status-pending {
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
		border-color: rgba(201, 68, 68, 0.3);
	}

	.status-processing {
		background: rgba(243, 156, 18, 0.12);
		color: #b87c0f;
		border-color: rgba(243, 156, 18, 0.3);
	}

	.status-shipped {
		background: rgba(179, 119, 119, 0.12);
		color: #6b4444;
		border-color: rgba(179, 119, 119, 0.3);
	}

	.status-delivered {
		background: rgba(39, 174, 96, 0.12);
		color: #1d6b3c;
		border-color: rgba(39, 174, 96, 0.3);
	}

	.status-cancelled {
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
		border-color: rgba(201, 68, 68, 0.3);
	}

	.status-refunded {
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
		border-color: rgba(201, 68, 68, 0.3);
	}

	.action-buttons {
		display: flex;
		gap: 1rem;
	}

	.details-section {
		margin-bottom: 2rem;
	}

	.section-title {
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 1.2rem;
		padding-bottom: 0.8rem;
		border-bottom: 2px solid #f0e8e8;
	}

	.details-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: 1.5rem;
	}

	.detail-item {
		display: flex;
		flex-direction: column;
	}

	.detail-item label {
		font-size: 1.2rem;
		font-weight: 600;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		margin-bottom: 0.5rem;
	}

	.detail-item p {
		font-size: 1.4rem;
		color: #333;
	}

	.amount {
		color: #b37777;
		font-weight: 600;
	}

	.current-status {
		color: #b37777;
		font-weight: 700;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-label {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.form-select {
		padding: 0.8rem 1rem;
		border: 2px solid #e0c8c8;
		border-radius: 0.4rem;
		font-size: 1.4rem;
		color: #333;
		background: #fff;
		font-family: inherit;
		transition: all 0.3s ease;
	}

	.form-select:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.timeline-item {
		display: flex;
		gap: 1.5rem;
		position: relative;
		padding-left: 4rem;
		opacity: 0.5;
		transition: all 0.3s ease;
	}

	.timeline-item.completed {
		opacity: 1;
	}

	.timeline-item::before {
		content: '';
		position: absolute;
		left: 2rem;
		top: 4.5rem;
		width: 0.2rem;
		height: 2rem;
		background: #d1b2b2;
	}

	.timeline-item:last-child::before {
		display: none;
	}

	.timeline-icon {
		position: absolute;
		left: 0;
		top: 0;
		font-size: 2.4rem;
		width: 4rem;
		height: 4rem;
		background: #f9f8f8;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #e0c8c8;
	}

	.timeline-item.completed .timeline-icon {
		background: rgba(179, 119, 119, 0.2);
		border-color: #b37777;
	}

	.timeline-content {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.timeline-status {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.timeline-description {
		font-size: 1.2rem;
		color: #888;
	}

	@media (max-width: 768px) {
		.orders-container {
			padding: 1.5rem;
		}

		.page-title {
			font-size: 2.2rem;
		}

		.summary-stats {
			grid-template-columns: repeat(2, 1fr);
		}

		.details-grid {
			grid-template-columns: 1fr;
		}

		.action-buttons {
			flex-direction: column;
		}
	}

	@media (max-width: 480px) {
		.summary-stats {
			grid-template-columns: 1fr;
		}
	}
</style>
