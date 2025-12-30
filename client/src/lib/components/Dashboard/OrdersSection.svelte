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
			'order-placed': '#d4a574',
			'processing': '#9b7a6f',
			'shipped': '#c4a896',
			'out-for-delivery': '#d1b2b2',
			'delivered': '#a89f94'
		};
		return colors[status] || '#999';
	}
</script>

<div class="orders-section">
	{#if showInvoice && selectedOrder}
		<div class="invoice-view">
			<button class="back-link" on:click={() => (showInvoice = false)}>← Retour</button>
			<Invoice order={selectedOrder} />
		</div>
	{:else if selectedOrder}
		<div class="order-detail-view">
			<button class="back-link" on:click={() => (selectedOrder = null)}>← Retour</button>

			<div class="order-header">
				<div>
					<h2 class="order-title">Commande {selectedOrder.orderNumber}</h2>
					<p class="order-meta">Passée le {new Date(selectedOrder.orderDate).toLocaleDateString('fr-FR')}</p>
				</div>
			</div>

			<DeliveryTracking order={selectedOrder} />

			<div class="items-section">
				<h3 class="section-title">Articles de la commande</h3>
				<div class="items-list">
					{#each selectedOrder.items as item (item.id)}
						<div class="item-row">
							<img src={item.imgUrl} alt={item.name} class="item-image" />
							<div class="item-info">
								<h4 class="item-name">{item.name}</h4>
								<p class="item-desc">{item.description}</p>
							</div>
							<div class="item-pricing">
								<span class="qty">Qté: {item.quantity}</span>
								<span class="price">
									{new Intl.NumberFormat('fr-FR', {
										style: 'currency',
										currency: 'DZD'
									}).format(item.price)}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="summary-section">
				<div class="summary-row">
					<span>Sous-total</span>
					<span>
						{new Intl.NumberFormat('fr-FR', {
							style: 'currency',
							currency: 'DZD'
						}).format(selectedOrder.totalAmount * 0.9)}
					</span>
				</div>
				<div class="summary-row">
					<span>Frais de livraison</span>
					<span>
						{new Intl.NumberFormat('fr-FR', {
							style: 'currency',
							currency: 'DZD'
						}).format(selectedOrder.totalAmount * 0.1)}
					</span>
				</div>
				<div class="summary-row total">
					<span>Total</span>
					<span>
						{new Intl.NumberFormat('fr-FR', {
							style: 'currency',
							currency: 'DZD'
						}).format(selectedOrder.totalAmount)}
					</span>
				</div>
			</div>

			<div class="shipping-section">
				<h3 class="section-title">Adresse de Livraison</h3>
				<div class="address-box">
					<p><strong>{selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}</strong></p>
					<p>{selectedOrder.shippingAddress.address}</p>
					<p>{selectedOrder.shippingAddress.postalCode} {selectedOrder.shippingAddress.city}</p>
					<p>{selectedOrder.shippingAddress.country}</p>
					<p>Téléphone: {selectedOrder.shippingAddress.phone}</p>
				</div>
			</div>

			<button class="invoice-btn" on:click={() => handlePrintInvoice(selectedOrder)}>
				🧾 Voir la facture
			</button>
		</div>
	{:else}
		<div class="orders-list-view">
			<div class="section-header">
				<h1 class="page-title">Mes Commandes</h1>
				<p class="page-subtitle">Suivez vos achats et livraisons</p>
			</div>

			{#if $orders.length === 0}
				<div class="empty-state">
					<p class="empty-icon">📦</p>
					<p class="empty-title">Aucune commande pour le moment</p>
					<p class="empty-text">Commencez à explorer nos produits</p>
					<a href="/" class="empty-cta">Retour à l'accueil</a>
				</div>
			{:else}
				<div class="orders-grid">
					{#each $orders as order (order.id)}
						<div class="order-card">
							<div class="card-header">
								<h3 class="card-number">{order.orderNumber}</h3>
								<span class="card-status" style="--status-color: {getStatusColor(order.deliveryStatus)}">
									{getStatusLabel(order.deliveryStatus)}
								</span>
							</div>

							<div class="card-body">
								<p class="card-date">{new Date(order.orderDate).toLocaleDateString('fr-FR')}</p>
								<p class="card-items">{order.items.length} article(s)</p>
								<p class="card-total">
									{new Intl.NumberFormat('fr-FR', {
										style: 'currency',
										currency: 'DZD'
									}).format(order.totalAmount)}
								</p>
							</div>

							<div class="card-footer">
								<button class="card-btn details-btn" on:click={() => handleViewOrder(order)}>
									Détails
								</button>
								<button class="card-btn invoice-btn" on:click={() => handlePrintInvoice(order)}>
									Facture
								</button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.orders-section {
		animation: fadeIn 0.4s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.section-header {
		margin-bottom: 4rem;
		padding-bottom: 2.5rem;
		border-bottom: 2px solid #f0d9d9;
	}

	.page-title {
		font-family: 'Abril Fatface', serif;
		font-size: 3.4rem;
		color: #2a2a2a;
		margin: 0 0 0.6rem 0;
		font-weight: 400;
		letter-spacing: -0.01rem;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.page-subtitle {
		font-size: 1.6rem;
		color: #888;
		margin: 0;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02rem;
		font-weight: 500;
	}

	.empty-state {
		text-align: center;
		padding: 6rem 2rem;
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.empty-title {
		font-family: 'Andada Pro', serif;
		font-size: 2rem;
		color: #333;
		margin-bottom: 0.5rem;
		letter-spacing: 0.02rem;
	}

	.empty-text {
		font-size: 1.5rem;
		color: #999;
		margin-bottom: 2rem;
	}

	.empty-cta {
		display: inline-block;
		padding: 1rem 2.5rem;
		background: #f1dada;
		color: #333;
		text-decoration: none;
		border-radius: 4px;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02rem;
		transition: all 0.3s ease;
		font-size: 1.5rem;
	}

	.empty-cta:hover {
		background: #fff;
		outline: 0.1rem solid #f1dada;
	}

	.orders-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
		gap: 2rem;
	}

	.order-card {
		background: #fff;
		border: 0.1rem solid #f0d9d9;
		border-radius: 8px;
		padding: 2rem;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
	}

	.order-card:hover {
		border-color: #f1dada;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 0.05rem solid #f5f5f5;
	}

	.card-number {
		font-family: 'Andada Pro', serif;
		font-size: 1.8rem;
		color: #333;
		margin: 0;
		letter-spacing: 0.02rem;
	}

	.card-status {
		background: var(--status-color);
		color: #fff;
		padding: 0.5rem 1.2rem;
		border-radius: 4px;
		font-size: 1.2rem;
		font-family: 'Andada Pro', serif;
	}

	.card-body {
		flex: 1;
		margin-bottom: 1.5rem;
	}

	.card-date {
		font-size: 1.3rem;
		color: #999;
		margin: 0 0 0.8rem 0;
	}

	.card-items {
		font-size: 1.4rem;
		color: #666;
		margin: 0.5rem 0;
	}

	.card-total {
		font-size: 1.8rem;
		font-weight: 600;
		color: #333;
		margin: 1rem 0 0 0;
		font-family: 'Andada Pro', serif;
	}

	.card-footer {
		display: flex;
		gap: 1rem;
	}

	.card-btn {
		flex: 1;
		padding: 0.8rem 1.5rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1.3rem;
		font-family: 'Andada Pro', serif;
		transition: all 0.3s ease;
		letter-spacing: 0.02rem;
	}

	.details-btn {
		background: #f1dada;
		color: #333;
	}

	.details-btn:hover {
		background: #fff;
		outline: 0.1rem solid #f1dada;
	}

	.invoice-btn {
		background: #f5f5f5;
		color: #666;
		border: 0.1rem solid #e8e8e8;
	}

	.invoice-btn:hover {
		background: #f0d9d9;
		border-color: #f1dada;
	}

	.back-link {
		background: none;
		border: none;
		padding: 0;
		margin-bottom: 2rem;
		font-size: 1.5rem;
		color: #b37777;
		cursor: pointer;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02rem;
		transition: all 0.3s ease;
	}

	.back-link:hover {
		color: #8b5555;
	}

	.order-detail-view {
		animation: slideUp 0.4s ease;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.order-header {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 0.1rem solid #f0d9d9;
	}

	.order-title {
		font-family: 'Andada Pro', serif;
		font-size: 2.4rem;
		color: #333;
		margin: 0 0 0.5rem 0;
		letter-spacing: 0.02rem;
	}

	.order-meta {
		font-size: 1.4rem;
		color: #999;
		margin: 0;
	}

	.items-section {
		margin: 3rem 0;
	}

	.section-title {
		font-family: 'Andada Pro', serif;
		font-size: 1.8rem;
		color: #333;
		margin: 0 0 2rem 0;
		padding-bottom: 1rem;
		border-bottom: 0.1rem solid #f0d9d9;
		letter-spacing: 0.02rem;
	}

	.items-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.item-row {
		display: flex;
		gap: 1.5rem;
		padding: 1.5rem;
		background: #fafafa;
		border-radius: 6px;
		align-items: flex-start;
	}

	.item-image {
		width: 8rem;
		height: 8rem;
		object-fit: cover;
		border-radius: 4px;
		flex-shrink: 0;
	}

	.item-info {
		flex: 1;
	}

	.item-name {
		font-family: 'Andada Pro', serif;
		font-size: 1.6rem;
		color: #333;
		margin: 0 0 0.5rem 0;
		letter-spacing: 0.02rem;
	}

	.item-desc {
		font-size: 1.3rem;
		color: #999;
		margin: 0;
	}

	.item-pricing {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.qty {
		font-size: 1.3rem;
		color: #666;
	}

	.price {
		font-family: 'Andada Pro', serif;
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
	}

	.summary-section {
		background: #f9f7f5;
		padding: 2rem;
		border-radius: 6px;
		margin: 2rem 0;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		padding: 1rem 0;
		font-size: 1.5rem;
		border-bottom: 0.05rem solid #f0d9d9;
	}

	.summary-row:last-child {
		border-bottom: none;
	}

	.summary-row.total {
		font-weight: 600;
		font-size: 1.8rem;
		color: #333;
		padding-top: 1rem;
		border-top: 0.1rem solid #e8e8e8;
	}

	.shipping-section {
		margin: 2rem 0;
	}

	.address-box {
		background: #fafafa;
		padding: 1.5rem;
		border-radius: 6px;
		border: 0.1rem solid #f0d9d9;
	}

	.address-box p {
		font-size: 1.4rem;
		color: #666;
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.address-box p:first-child {
		color: #333;
		font-weight: 600;
	}

	.invoice-view {
		animation: slideUp 0.4s ease;
	}

	@media (max-width: 768px) {
		.page-title {
			font-size: 2.4rem;
		}

		.orders-grid {
			grid-template-columns: 1fr;
		}

		.item-row {
			flex-direction: column;
			gap: 1rem;
		}

		.item-image {
			width: 100%;
			height: 15rem;
		}

		.item-pricing {
			align-items: flex-start;
		}
	}
</style>
