<script lang="ts">
	import { PackageOpen, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-svelte';
	import Card from '../Card.svelte';

	export let orders: any[] = [];

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Delivered':
				return '#27ae60';
			case 'Shipped':
				return '#3498db';
			case 'Processing':
				return '#f39c12';
			case 'Pending':
				return '#95a5a6';
			case 'Cancelled':
				return '#e74c3c';
			default:
				return '#999';
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Delivered':
				return CheckCircle;
			case 'Shipped':
				return Truck;
			case 'Processing':
				return Clock;
			case 'Cancelled':
				return AlertCircle;
			default:
				return PackageOpen;
		}
	};

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'DZD',
			minimumFractionDigits: 0
		}).format(value);
	};

	$: sortedOrders = [...orders].sort((a, b) => 
		new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
	);

	$: totalOrders = orders.length;
	$: completedOrders = orders.filter(o => o.status === 'Delivered').length;
	$: pendingOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length;
</script>

<Card title="Orders Timeline" subtitle="All orders placed by this user">
	<div class="orders-stats">
		<div class="stat-item">
			<span class="stat-label">Total Orders</span>
			<span class="stat-value">{totalOrders}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Completed</span>
			<span class="stat-value delivered">{completedOrders}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">In Progress</span>
			<span class="stat-value pending">{pendingOrders}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Completion Rate</span>
			<span class="stat-value">{totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0}%</span>
		</div>
	</div>

	{#if orders.length === 0}
		<div class="empty-state">
			<PackageOpen size={48} />
			<p>No orders yet</p>
		</div>
	{:else}
		<div class="timeline">
			{#each sortedOrders as order, index (order.id)}
				<div class="timeline-item">
					<div class="timeline-marker" style="--status-color: {getStatusColor(order.status)}">
						<svelte:component this={getStatusIcon(order.status)} size={20} />
					</div>
					{#if index < sortedOrders.length - 1}
						<div class="timeline-line"></div>
					{/if}

					<div class="timeline-content">
						<div class="order-header">
							<div>
								<h4 class="order-id">Order #{order.orderNumber}</h4>
								<p class="order-date">{formatDate(order.orderDate)}</p>
							</div>
							<span class="order-status" style="--status-color: {getStatusColor(order.status)}">
								{order.status}
							</span>
						</div>

						<div class="order-items">
							<p class="items-label">Items:</p>
							<ul class="items-list">
								{#each order.items as item}
									<li>
										<span class="item-name">{item.productName}</span>
										<span class="item-qty">x{item.quantity}</span>
										<span class="item-price">{formatCurrency(item.price)}</span>
									</li>
								{/each}
							</ul>
						</div>

						<div class="order-details">
							<div class="detail">
								<span class="label">Total Amount</span>
								<span class="value">{formatCurrency(order.totalAmount)}</span>
							</div>
							<div class="detail">
								<span class="label">Shipping Address</span>
								<span class="value">{order.shippingAddress}</span>
							</div>
							{#if order.trackingNumber}
								<div class="detail">
									<span class="label">Tracking</span>
									<span class="value">{order.trackingNumber}</span>
								</div>
							{/if}
							{#if order.deliveryDate}
								<div class="detail">
									<span class="label">Delivered On</span>
									<span class="value">{formatDate(order.deliveryDate)}</span>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</Card>

<style>
	.orders-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.stat-label {
		font-size: 1.1rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.stat-value {
		font-size: 1.8rem;
		font-weight: 700;
		color: #333;
	}

	.stat-value.delivered {
		color: #27ae60;
	}

	.stat-value.pending {
		color: #f39c12;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 2rem;
		text-align: center;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 2px dashed #e8e0db;
		color: #999;
	}

	.empty-state svg {
		margin-bottom: 1rem;
		color: #ddd;
	}

	.empty-state p {
		font-size: 1.4rem;
		margin: 0;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.timeline-item {
		position: relative;
		display: flex;
		gap: 2rem;
		padding: 2rem;
		background: linear-gradient(135deg, #fafbff 0%, #f9f8f8 100%);
		border: 1px solid #e8e0db;
		border-radius: 0.8rem;
		margin-bottom: 1rem;
		transition: all 0.2s ease;
	}

	.timeline-item:hover {
		border-color: #b37777;
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.08);
	}

	.timeline-marker {
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--status-color) 0%, var(--status-color) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		box-shadow: 0 2px 8px rgba(179, 119, 119, 0.2);
	}

	.timeline-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.order-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #e8e0db;
	}

	.order-id {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.order-date {
		font-size: 1.2rem;
		color: #999;
		margin: 0.3rem 0 0 0;
	}

	.order-status {
		padding: 0.5rem 1.2rem;
		background: var(--status-color);
		color: #fff;
		border-radius: 2rem;
		font-size: 1.2rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.order-items {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.items-label {
		font-size: 1.1rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.items-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.items-list li {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.8rem;
		background: #fff;
		border-radius: 0.4rem;
		border: 1px solid #e8e0db;
		font-size: 1.2rem;
	}

	.item-name {
		flex: 1;
		color: #333;
		font-weight: 500;
	}

	.item-qty {
		color: #999;
		font-weight: 600;
		min-width: 3rem;
		text-align: center;
	}

	.item-price {
		color: #b37777;
		font-weight: 600;
		min-width: 8rem;
		text-align: right;
	}

	.order-details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1rem;
	}

	.detail {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 1rem;
		background: #fff;
		border-radius: 0.4rem;
		border: 1px solid #e8e0db;
	}

	.detail .label {
		font-size: 1rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.detail .value {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
	}

	@media (max-width: 768px) {
		.orders-stats {
			grid-template-columns: repeat(2, 1fr);
		}

		.timeline-item {
			gap: 1.5rem;
			padding: 1.5rem;
		}

		.timeline-marker {
			width: 3rem;
			height: 3rem;
		}

		.order-header {
			flex-direction: column;
		}

		.order-details {
			grid-template-columns: 1fr;
		}

		.items-list li {
			flex-direction: column;
			align-items: flex-start;
		}

		.item-qty,
		.item-price {
			text-align: left;
		}
	}
</style>
