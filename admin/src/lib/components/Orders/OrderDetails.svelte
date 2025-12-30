<script lang="ts">
	import { ordersStore } from '$lib/stores/orders_store';
	import { uiStore } from '$lib/stores/ui_store';
	import type { Order } from '$lib/stores/orders_store';

	export let order: Order;
	export let onClose: () => void;

	let newStatus = order.status;
	let isUpdating = false;

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

	const statusOptions = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

	async function updateOrderStatus() {
		isUpdating = true;
		try {
			ordersStore.updateOrder(order.id, { status: newStatus as any });
			uiStore.showNotification('Statut de la commande mis à jour', 'success');
			setTimeout(onClose, 500);
		} catch (error) {
			uiStore.showNotification('Erreur lors de la mise à jour', 'error');
		} finally {
			isUpdating = false;
		}
	}

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="modal-overlay" on:click={onClose} role="presentation">
	<div class="modal-content" on:click={(e) => e.stopPropagation()}>
		<div class="modal-header">
			<h2>Détails de la Commande</h2>
			<button class="close-btn" on:click={onClose}>✕</button>
		</div>

		<div class="modal-body">
			<section class="section">
				<h3>Informations de Commande</h3>
				<div class="info-grid">
					<div class="info-item">
						<label>Numéro de Commande</label>
						<p class="value">{order.orderNumber}</p>
					</div>
					<div class="info-item">
						<label>Date</label>
						<p class="value">{formatDate(order.createdAt)}</p>
					</div>
					<div class="info-item">
						<label>Statut</label>
						<p class="value">{statusLabels[order.status]} {statusIcons[order.status]}</p>
					</div>
					<div class="info-item">
						<label>Montant Total</label>
						<p class="value amount">{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(order.totalAmount)} DZD</p>
					</div>
				</div>
			</section>

			<section class="section">
				<h3>Informations Client</h3>
				<div class="info-grid">
					<div class="info-item">
						<label>Nom</label>
						<p class="value">{order.customerName}</p>
					</div>
					<div class="info-item">
						<label>Email</label>
						<p class="value">{order.customerEmail}</p>
					</div>
					<div class="info-item full-width">
						<label>Adresse de Livraison</label>
						<p class="value address">
							{order.shippingAddress.street}<br />
							{order.shippingAddress.zipCode} {order.shippingAddress.city}, {order.shippingAddress.state}<br />
							{order.shippingAddress.country}
						</p>
					</div>
					<div class="info-item">
						<label>Téléphone</label>
						<p class="value">{order.shippingAddress.phone}</p>
					</div>
				</div>
			</section>

			<section class="section">
				<h3>Articles de Commande</h3>
				<div class="items-list">
					{#each order.items as item (item.id)}
						<div class="item-row">
							<div class="item-info">
								<p class="item-name">{item.productName}</p>
								<p class="item-sku">Qty: {item.quantity}</p>
							</div>
							<p class="item-price">{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(item.totalPrice)} DZD</p>
						</div>
					{/each}
				</div>
			</section>

			<section class="section">
				<h3>Information de Paiement</h3>
				<div class="info-grid">
					<div class="info-item">
						<label>Méthode</label>
						<p class="value">
							{order.paymentMethod === 'cod' ? 'À la livraison' : order.paymentMethod === 'card' ? 'Carte bancaire' : 'Virement'}
						</p>
					</div>
					<div class="info-item">
						<label>Statut du Paiement</label>
						<p class="value" class:paid={order.paymentStatus === 'completed'}>
							{order.paymentStatus === 'completed' ? '✓ Payé' : '⏳ En attente'}
						</p>
					</div>
				</div>
			</section>

			<section class="section">
				<h3>Mise à Jour du Statut</h3>
				<div class="status-update">
					<select bind:value={newStatus} class="status-select">
						{#each statusOptions as status}
							<option value={status}>{statusLabels[status]}</option>
						{/each}
					</select>
					<button class="btn btn-primary" on:click={updateOrderStatus} disabled={isUpdating || newStatus === order.status}>
						{isUpdating ? '⏳ Mise à jour...' : 'Mettre à Jour'}
					</button>
				</div>
			</section>
		</div>
	</div>
</div>

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: flex-end;
		z-index: 1000;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.modal-content {
		background: white;
		width: 100%;
		max-width: 600px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		animation: slideIn 0.3s ease;
		border-left: 1px solid var(--color-border);
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-lg);
		border-bottom: 2px solid var(--color-border);
		background: var(--color-primary-light-beige);
	}

	.modal-header h2 {
		margin: 0;
		color: var(--color-accent-teal);
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		color: var(--color-text-light);
		width: 4rem;
		height: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md);
		transition: all 0.3s ease;
	}

	.close-btn:hover {
		background: white;
		color: var(--color-accent-teal);
	}

	.modal-body {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-lg);
	}

	.section {
		margin-bottom: var(--spacing-xl);
	}

	.section h3 {
		margin: 0 0 var(--spacing-lg) 0;
		padding-bottom: var(--spacing-md);
		border-bottom: 2px solid var(--color-border);
		color: var(--color-accent-teal);
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-lg);
	}

	.info-item.full-width {
		grid-column: 1 / -1;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.info-item label {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--color-text-lighter);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.value {
		margin: 0;
		font-size: 1.5rem;
		color: var(--color-text-dark);
		font-weight: 500;
	}

	.value.amount {
		color: var(--color-accent-burgundy);
		font-weight: 700;
		font-size: 1.8rem;
	}

	.value.address {
		line-height: 1.8;
	}

	.value.paid {
		color: var(--color-success);
	}

	.items-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		background: var(--color-primary-cream);
		padding: var(--spacing-lg);
		border-radius: var(--radius-md);
	}

	.item-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-md);
		background: white;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.item-info {
		flex: 1;
	}

	.item-name {
		margin: 0 0 var(--spacing-sm) 0;
		font-weight: 600;
		color: var(--color-text-dark);
	}

	.item-sku {
		margin: 0;
		font-size: 1.2rem;
		color: var(--color-text-lighter);
	}

	.item-price {
		margin: 0;
		font-weight: 700;
		color: var(--color-accent-burgundy);
		font-size: 1.5rem;
	}

	.status-update {
		display: flex;
		gap: var(--spacing-md);
		align-items: center;
	}

	.status-select {
		flex: 1;
		padding: var(--spacing-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: 1.4rem;
		background: white;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.modal-content {
			max-width: 100%;
			width: 100%;
		}

		.info-grid {
			grid-template-columns: 1fr;
		}

		.item-row {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.status-update {
			flex-direction: column;
		}

		.status-select {
			width: 100%;
		}
	}
</style>
