<script lang="ts">
	import { orders } from '$lib/stores/orders_store';
	import type { Order } from '$lib/types';
	import DeliveryTracking from './DeliveryTracking.svelte';
	import Invoice from './Invoice.svelte';

	let selectedOrder: Order | null = null;
	let showInvoice = false;

	function handleViewOrder(order: Order) {
		selectedOrder = order;
		showInvoice = false;
	}

	function handlePrintInvoice(order: Order) {
		selectedOrder = order;
		showInvoice = true;
	}

	function getStatusLabel(status: string): string {
		const labels: Record<string, string> = {
			'order-placed': 'Commande passée',
			'processing': 'En traitement',
			'shipped': 'Expédié',
			'out-for-delivery': 'En livraison',
			'delivered': 'Livré'
		};
		return labels[status] || status;
	}

	function getStatusColor(status: string): string {
		const colors: Record<string, string> = {
			'order-placed': '#FFA500',
			'processing': '#3498db',
			'shipped': '#9b59b6',
			'out-for-delivery': '#e74c3c',
			'delivered': '#27ae60'
		};
		return colors[status] || '#999';
	}
</script>

<div class="orders-section">
	{#if showInvoice && selectedOrder}
		<div class="invoice-container">
			<button class="back-btn" on:click={() => (showInvoice = false)}>← Retour</button>
			<Invoice order={selectedOrder} />
		</div>
	{:else if selectedOrder}
		<div class="order-detail-container">
			<button class="back-btn" on:click={() => (selectedOrder = null)}>← Retour</button>
			
			<div class="order-header">
				<div>
					<h2>Commande {selectedOrder.orderNumber}</h2>
					<p class="order-date">
						Passée le {new Date(selectedOrder.orderDate).toLocaleDateString('fr-FR')}
					</p>
				</div>
				<button class="print-invoice-btn" on:click={() => handlePrintInvoice(selectedOrder)}>
					🖨️ Facture
				</button>
			</div>

			<DeliveryTracking order={selectedOrder} />

			<div class="order-items-container">
				<h3>Articles de la commande</h3>
				<div class="order-items-grid">
					{#each selectedOrder.items as item (item.id)}
						<div class="order-item">
							<img src={item.imgUrl} alt={item.name} />
							<div class="item-info">
								<h4>{item.name}</h4>
								<p class="item-description">{item.description}</p>
								<div class="item-details">
									<span class="price">
										{new Intl.NumberFormat('fr-FR', {
											style: 'currency',
											currency: 'DZD'
										}).format(item.price)}
									</span>
									<span class="quantity">Qté: {item.quantity}</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="order-summary">
				<div class="summary-item">
					<span>Sous-total</span>
					<span>
						{new Intl.NumberFormat('fr-FR', {
							style: 'currency',
							currency: 'DZD'
						}).format(selectedOrder.totalAmount * 0.9)}
					</span>
				</div>
				<div class="summary-item">
					<span>Frais de livraison</span>
					<span>
						{new Intl.NumberFormat('fr-FR', {
							style: 'currency',
							currency: 'DZD'
						}).format(selectedOrder.totalAmount * 0.1)}
					</span>
				</div>
				<div class="summary-item total">
					<span>Total</span>
					<span>
						{new Intl.NumberFormat('fr-FR', {
							style: 'currency',
							currency: 'DZD'
						}).format(selectedOrder.totalAmount)}
					</span>
				</div>
			</div>

			<div class="shipping-address">
				<h3>Adresse de livraison</h3>
				<p>{selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}</p>
				<p>{selectedOrder.shippingAddress.address}</p>
				<p>
					{selectedOrder.shippingAddress.postalCode} {selectedOrder.shippingAddress.city}
				</p>
				<p>{selectedOrder.shippingAddress.country}</p>
				<p>Téléphone: {selectedOrder.shippingAddress.phone}</p>
			</div>
		</div>
	{:else}
		<div class="section-header">
			<h2>Mes Commandes</h2>
		</div>

		{#if $orders.length === 0}
			<div class="empty-state">
				<p>Vous n'avez pas encore passé de commande.</p>
				<a href="/" class="cta-btn">Découvrir nos produits</a>
			</div>
		{:else}
			<div class="orders-list">
				{#each $orders as order (order.id)}
					<div class="order-card">
						<div class="order-card-header">
							<div>
								<h3>{order.orderNumber}</h3>
								<p class="order-date">
									{new Date(order.orderDate).toLocaleDateString('fr-FR')}
								</p>
							</div>
							<div
								class="status-badge"
								style="--status-color: {getStatusColor(order.deliveryStatus)}"
							>
								{getStatusLabel(order.deliveryStatus)}
							</div>
						</div>

						<div class="order-card-body">
							<p class="item-count">{order.items.length} article(s)</p>
							<p class="total-amount">
								{new Intl.NumberFormat('fr-FR', {
									style: 'currency',
									currency: 'DZD'
								}).format(order.totalAmount)}
							</p>
						</div>

						<div class="order-card-footer">
							<button class="view-btn" on:click={() => handleViewOrder(order)}>
								Voir les détails
							</button>
							<button class="invoice-btn" on:click={() => handlePrintInvoice(order)}>
								Facture
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<style>
	.orders-section {
		background: #fff;
		border-radius: 8px;
		padding: 2.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.section-header {
		margin-bottom: 2rem;
		border-bottom: 2px solid #f0d9d9;
		padding-bottom: 1.5rem;
	}

	.section-header h2 {
		font-family: 'Abril Fatface';
		font-size: 2.8rem;
		color: #333;
		margin: 0;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		color: #999;
	}

	.empty-state p {
		font-size: 1.8rem;
		margin-bottom: 2rem;
	}

	.cta-btn {
		display: inline-block;
		background: #f1dada;
		padding: 1rem 2.5rem;
		border-radius: 8px;
		text-decoration: none;
		color: #333;
		font-weight: 500;
		transition: 0.3s;
		font-size: 1.5rem;
	}

	.cta-btn:hover {
		background: #fff;
		outline: 2px solid #b37777;
		color: #b37777;
	}

	.orders-list {
		display: grid;
		gap: 2rem;
	}

	.order-card {
		border: 1px solid #f0d9d9;
		border-radius: 8px;
		padding: 2rem;
		background: #fafafa;
		transition: 0.3s;
	}

	.order-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	}

	.order-card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid #f0d9d9;
		padding-bottom: 1.5rem;
	}

	.order-card-header h3 {
		font-family: 'Andada Pro';
		font-size: 2rem;
		color: #333;
		margin: 0 0 0.5rem 0;
	}

	.order-date {
		font-size: 1.4rem;
		color: #999;
		margin: 0;
	}

	.status-badge {
		background: var(--status-color);
		color: #fff;
		padding: 0.8rem 1.5rem;
		border-radius: 20px;
		font-size: 1.4rem;
		font-weight: 600;
	}

	.order-card-body {
		margin-bottom: 1.5rem;
	}

	.item-count {
		font-size: 1.5rem;
		color: #666;
		margin: 0 0 0.5rem 0;
	}

	.total-amount {
		font-size: 1.8rem;
		font-weight: 700;
		color: #333;
		margin: 0;
	}

	.order-card-footer {
		display: flex;
		gap: 1rem;
	}

	.view-btn,
	.invoice-btn {
		padding: 0.8rem 1.5rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1.4rem;
		font-weight: 500;
		transition: 0.3s;
		flex: 1;
	}

	.view-btn {
		background: #f1dada;
		color: #333;
	}

	.view-btn:hover {
		background: #fff;
		outline: 2px solid #b37777;
		color: #b37777;
	}

	.invoice-btn {
		background: #f0d9d9;
		color: #333;
	}

	.invoice-btn:hover {
		background: #e8cbc8;
	}

	.back-btn {
		display: inline-block;
		background: none;
		border: none;
		padding: 0 0 2rem 0;
		font-size: 1.6rem;
		color: #b37777;
		cursor: pointer;
		margin-bottom: 1rem;
		font-weight: 500;
		transition: 0.3s;
	}

	.back-btn:hover {
		color: #8b5555;
	}

	.invoice-container {
		padding: 2rem 0;
	}

	.order-detail-container {
		padding: 0;
	}

	.order-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 3rem;
		border-bottom: 2px solid #f0d9d9;
		padding-bottom: 2rem;
	}

	.order-header h2 {
		font-family: 'Abril Fatface';
		font-size: 2.4rem;
		color: #333;
		margin: 0 0 0.5rem 0;
	}

	.print-invoice-btn {
		background: #f1dada;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-size: 1.5rem;
		cursor: pointer;
		transition: 0.3s;
		font-weight: 500;
	}

	.print-invoice-btn:hover {
		background: #fff;
		outline: 2px solid #b37777;
		color: #b37777;
	}

	.order-items-container {
		margin-bottom: 3rem;
	}

	.order-items-container h3 {
		font-family: 'Andada Pro';
		font-size: 2rem;
		color: #333;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid #f0d9d9;
		padding-bottom: 1rem;
	}

	.order-items-grid {
		display: grid;
		gap: 1.5rem;
	}

	.order-item {
		display: flex;
		gap: 2rem;
		padding: 1.5rem;
		background: #fafafa;
		border-radius: 6px;
		border: 1px solid #f0d9d9;
	}

	.order-item img {
		width: 10rem;
		height: 10rem;
		object-fit: cover;
		border-radius: 6px;
		flex-shrink: 0;
	}

	.item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.item-info h4 {
		font-family: 'Andada Pro';
		font-size: 1.8rem;
		color: #333;
		margin: 0 0 0.5rem 0;
	}

	.item-description {
		color: #999;
		font-size: 1.4rem;
		margin: 0.5rem 0 1rem 0;
	}

	.item-details {
		display: flex;
		gap: 2rem;
		align-items: center;
	}

	.item-details .price {
		font-size: 1.6rem;
		font-weight: 700;
		color: #333;
	}

	.item-details .quantity {
		font-size: 1.4rem;
		color: #666;
	}

	.order-summary {
		background: #f0d9d9;
		padding: 2rem;
		border-radius: 8px;
		margin-bottom: 3rem;
	}

	.summary-item {
		display: flex;
		justify-content: space-between;
		padding: 1rem 0;
		font-size: 1.5rem;
		border-bottom: 1px solid #e0c9c9;
	}

	.summary-item:last-child {
		border-bottom: none;
	}

	.summary-item.total {
		font-weight: 700;
		font-size: 1.8rem;
		color: #333;
	}

	.shipping-address {
		background: #fafafa;
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid #f0d9d9;
	}

	.shipping-address h3 {
		font-family: 'Andada Pro';
		font-size: 2rem;
		color: #333;
		margin: 0 0 1rem 0;
		border-bottom: 1px solid #f0d9d9;
		padding-bottom: 1rem;
	}

	.shipping-address p {
		font-size: 1.5rem;
		color: #666;
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.orders-section {
			padding: 1.5rem;
		}

		.order-card {
			padding: 1.5rem;
		}

		.order-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.order-item {
			flex-direction: column;
		}

		.order-item img {
			width: 100%;
			height: 15rem;
		}

		.item-details {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
