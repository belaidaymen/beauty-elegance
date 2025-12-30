<script lang="ts">
	import OrderDetails from './OrderDetails.svelte';
	import type { Order } from '$lib/stores/orders_store';

	export let filteredOrders: Order[] = [];

	let selectedOrder: Order | null = null;

	const statusLabels: Record<string, string> = {
		pending: 'En attente',
		confirmed: 'Confirmée',
		processing: 'En cours',
		shipped: 'Expédiée',
		delivered: 'Livrée',
		cancelled: 'Annulée'
	};

	const statusIcons: Record<string, string> = {
		pending: '⏳',
		confirmed: '✓',
		processing: '⚙️',
		shipped: '📦',
		delivered: '✅',
		cancelled: '❌'
	};

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	}
</script>

<div class="orders-list-container">
	<div class="list-view">
		<div class="orders-table">
			<table>
				<thead>
					<tr>
						<th>Commande</th>
						<th>Client</th>
						<th>Date</th>
						<th>Montant</th>
						<th>Statut</th>
						<th>Paiement</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredOrders as order (order.id)}
						<tr class="order-row" class:selected={selectedOrder?.id === order.id}>
							<td class="order-num" on:click={() => (selectedOrder = order)}>
								<strong>{order.orderNumber}</strong>
							</td>
							<td>
								<div class="customer-info">
									<p class="customer-name">{order.customerName}</p>
									<p class="customer-email">{order.customerEmail}</p>
								</div>
							</td>
							<td>{formatDate(order.createdAt)}</td>
							<td class="amount">
								<strong>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(order.totalAmount)} DZD</strong>
							</td>
							<td>
								<span class="status-badge" class:pending={order.status === 'pending'} class:confirmed={order.status === 'confirmed'} class:processing={order.status === 'processing'} class:shipped={order.status === 'shipped'} class:delivered={order.status === 'delivered'}>
									<span class="badge-icon">{statusIcons[order.status]}</span>
									<span class="badge-text">{statusLabels[order.status]}</span>
								</span>
							</td>
							<td>
								<span class="payment-badge" class:completed={order.paymentStatus === 'completed'} class:pending={order.paymentStatus === 'pending'}>
									{order.paymentStatus === 'completed' ? '✓ Payé' : '⏳ En attente'}
								</span>
							</td>
							<td class="action-buttons">
								<button class="action-btn view-btn" on:click={() => (selectedOrder = order)} title="Voir détails">
									👁️
								</button>
								<button class="action-btn edit-btn" title="Modifier">
									✏️
								</button>
								<button class="action-btn delete-btn" title="Supprimer">
									🗑️
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			{#if filteredOrders.length === 0}
				<div class="no-data">
					<p>📭 Aucune commande trouvée</p>
				</div>
			{/if}
		</div>
	</div>

	{#if selectedOrder}
		<OrderDetails order={selectedOrder} onClose={() => (selectedOrder = null)} />
	{/if}
</div>

<style>
	.orders-list-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-lg);
	}

	.list-view {
		background: white;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
		overflow: hidden;
	}

	.orders-table {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background: var(--color-primary-light-beige);
		border-bottom: 2px solid var(--color-border);
	}

	th {
		padding: var(--spacing-md);
		text-align: left;
		font-weight: 600;
		color: var(--color-text-dark);
		font-size: 1.3rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	td {
		padding: var(--spacing-md);
		border-bottom: 1px solid var(--color-border);
		font-size: 1.4rem;
	}

	.order-row {
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.order-row:hover {
		background: var(--color-primary-cream);
	}

	.order-row.selected {
		background: rgba(43, 138, 138, 0.05);
		border-left: 4px solid var(--color-accent-teal);
	}

	.order-num {
		color: var(--color-accent-teal);
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.order-num:hover {
		color: var(--color-accent-teal-light);
	}

	.customer-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.customer-name {
		margin: 0;
		font-weight: 600;
		color: var(--color-text-dark);
	}

	.customer-email {
		margin: 0;
		font-size: 1.2rem;
		color: var(--color-text-lighter);
	}

	.amount {
		color: var(--color-accent-burgundy);
		font-weight: 700;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: 0.4rem 1rem;
		border-radius: 999px;
		font-size: 1.2rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		white-space: nowrap;
	}

	.status-badge.pending {
		background: rgba(243, 156, 18, 0.15);
		color: var(--color-warning);
	}

	.status-badge.confirmed {
		background: rgba(52, 152, 219, 0.15);
		color: var(--color-info);
	}

	.status-badge.processing {
		background: rgba(155, 89, 182, 0.15);
		color: #9b59b6;
	}

	.status-badge.shipped {
		background: rgba(155, 89, 182, 0.15);
		color: #9b59b6;
	}

	.status-badge.delivered {
		background: rgba(39, 174, 96, 0.15);
		color: var(--color-success);
	}

	.badge-icon {
		display: inline-flex;
		font-size: 1.4rem;
	}

	.payment-badge {
		display: inline-block;
		padding: 0.4rem 1rem;
		border-radius: 999px;
		font-size: 1.2rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.payment-badge.completed {
		background: rgba(39, 174, 96, 0.15);
		color: var(--color-success);
	}

	.payment-badge.pending {
		background: rgba(243, 156, 18, 0.15);
		color: var(--color-warning);
	}

	.action-buttons {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: center;
	}

	.action-btn {
		background: none;
		border: none;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: 1.6rem;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.action-btn:hover {
		background: var(--color-primary-light-beige);
		transform: scale(1.1);
	}

	.no-data {
		padding: var(--spacing-2xl);
		text-align: center;
		color: var(--color-text-lighter);
		font-size: 1.6rem;
	}

	@media (max-width: 1024px) {
		th:nth-child(5),
		td:nth-child(5),
		th:nth-child(6),
		td:nth-child(6) {
			display: none;
		}
	}

	@media (max-width: 768px) {
		th,
		td {
			padding: var(--spacing-sm);
			font-size: 1.2rem;
		}

		th:nth-child(3),
		td:nth-child(3),
		th:nth-child(7),
		td:nth-child(7) {
			display: none;
		}

		.customer-email {
			display: none;
		}

		.action-btn {
			width: 3rem;
			height: 3rem;
			font-size: 1.4rem;
		}
	}

	@media (max-width: 480px) {
		th,
		td {
			padding: var(--spacing-xs) var(--spacing-sm);
			font-size: 1rem;
		}

		.status-badge {
			font-size: 1rem;
			padding: 0.3rem 0.8rem;
		}

		.badge-text {
			display: none;
		}
	}
</style>
