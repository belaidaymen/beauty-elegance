<script lang="ts">
	let recentOrders = [
		{
			id: 'ORD001',
			customer: 'Fatima Ahmed',
			amount: 12500,
			status: 'delivered',
			date: '2024-12-28'
		},
		{
			id: 'ORD002',
			customer: 'Mohamed Karim',
			amount: 8900,
			status: 'processing',
			date: '2024-12-27'
		},
		{
			id: 'ORD003',
			customer: 'Amina Hassan',
			amount: 15600,
			status: 'pending',
			date: '2024-12-27'
		},
		{
			id: 'ORD004',
			customer: 'Layla Ibrahim',
			amount: 6200,
			status: 'shipped',
			date: '2024-12-26'
		}
	];

	const statusLabels: Record<string, string> = {
		pending: 'En attente',
		processing: 'En cours',
		shipped: 'Expédié',
		delivered: 'Livré',
		cancelled: 'Annulé'
	};

	const statusIcons: Record<string, string> = {
		pending: '⏳',
		processing: '⚙️',
		shipped: '📦',
		delivered: '✅',
		cancelled: '❌'
	};
</script>

<div class="recent-orders">
	<div class="section-header">
		<h2>Commandes Récentes</h2>
		<a href="/orders" class="see-all-link">Voir tout →</a>
	</div>

	<div class="orders-list">
		{#each recentOrders as order (order.id)}
			<div class="order-item">
				<div class="order-left">
					<p class="order-id">{order.id}</p>
					<p class="customer-name">{order.customer}</p>
					<p class="order-date">{new Date(order.date).toLocaleDateString('fr-FR')}</p>
				</div>

				<div class="order-middle">
					<p class="order-amount">{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(order.amount)} DZD</p>
				</div>

				<div class="order-right">
					<span class="status-badge" class:pending={order.status === 'pending'} class:processing={order.status === 'processing'} class:shipped={order.status === 'shipped'} class:delivered={order.status === 'delivered'} class:cancelled={order.status === 'cancelled'}>
						<span class="status-icon">{statusIcons[order.status]}</span>
						<span class="status-text">{statusLabels[order.status]}</span>
					</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.recent-orders {
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

	.orders-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.order-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-md);
		background: var(--color-primary-cream);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.order-item:hover {
		background: var(--color-primary-light-beige);
		border-color: var(--color-accent-teal);
		transform: translateX(4px);
	}

	.order-left {
		flex: 1;
	}

	.order-id {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-accent-teal);
		margin: 0 0 var(--spacing-xs) 0;
	}

	.customer-name {
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--color-text-dark);
		margin: 0 0 var(--spacing-xs) 0;
	}

	.order-date {
		font-size: 1.2rem;
		color: var(--color-text-lighter);
		margin: 0;
	}

	.order-middle {
		flex: 0 0 auto;
		padding: 0 var(--spacing-lg);
	}

	.order-amount {
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--color-accent-burgundy);
		margin: 0;
	}

	.order-right {
		flex: 0 0 auto;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: 0.5rem 1rem;
		border-radius: 999px;
		font-size: 1.2rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.status-badge.pending {
		background: rgba(243, 156, 18, 0.15);
		color: var(--color-warning);
	}

	.status-badge.processing {
		background: rgba(52, 152, 219, 0.15);
		color: var(--color-info);
	}

	.status-badge.shipped {
		background: rgba(155, 89, 182, 0.15);
		color: #9b59b6;
	}

	.status-badge.delivered {
		background: rgba(39, 174, 96, 0.15);
		color: var(--color-success);
	}

	.status-badge.cancelled {
		background: rgba(231, 76, 60, 0.15);
		color: var(--color-error);
	}

	.status-icon {
		display: inline-flex;
		font-size: 1.4rem;
	}

	.status-text {
		display: inline;
	}

	@media (max-width: 768px) {
		.order-item {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.order-middle {
			padding: 0;
		}

		.order-right {
			width: 100%;
		}
	}
</style>
