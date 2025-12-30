<script lang="ts">
	import { cart } from '$lib/stores/cart_store';
	import { initialPrice } from '$lib/stores/total_price_cart_store';

	let subtotal = 0;
	let deliveryFee = 200;
	let guaranteeFee = 0;
	let total = 0;

	$: {
		subtotal = $cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
		total = subtotal + deliveryFee + guaranteeFee;
	}

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
			price
		);
	}
</script>

<div class="order-summary-section">
	<div class="summary-header">
		<h2>Résumé de la commande</h2>
		<span class="item-count">{$cart.length} article{$cart.length !== 1 ? 's' : ''}</span>
	</div>

	<!-- Products List -->
	<div class="products-list">
		<div class="list-header">
			<h3>Articles</h3>
		</div>

		{#each $cart as product (product.name)}
			<div class="product-item">
				<div class="product-image-wrapper">
					<img src={product.imgUrl} alt={product.name} class="product-image" />
					<span class="product-quantity-badge">{product.quantity}</span>
				</div>

				<div class="product-info">
					<h4 class="product-name">{product.name}</h4>
					<p class="product-description">{product.description}</p>
					<div class="product-pricing">
						<span class="unit-price"
							>{formatPrice(product.price)} DZD</span
						>
						<span class="multiplication">×</span>
						<span class="quantity">{product.quantity}</span>
					</div>
				</div>

				<div class="product-total">
					{formatPrice(product.price * product.quantity)} DZD
				</div>
			</div>
		{/each}
	</div>

	<!-- Costs Breakdown -->
	<div class="costs-breakdown">
		<div class="costs-header">
			<h3>Détails de la facture</h3>
		</div>

		<div class="cost-item">
			<span class="cost-label">Sous-total</span>
			<span class="cost-value">{formatPrice(subtotal)} DZD</span>
		</div>

		<div class="cost-item">
			<span class="cost-label">Livraison</span>
			<span class="cost-value delivery-fee">{formatPrice(deliveryFee)} DZD</span>
		</div>

		{#if guaranteeFee > 0}
			<div class="cost-item">
				<span class="cost-label">Garantie étendue</span>
				<span class="cost-value">{formatPrice(guaranteeFee)} DZD</span>
			</div>
		{/if}

		<div class="divider"></div>

		<div class="cost-item total-row">
			<span class="cost-label total-label">TOTAL</span>
			<span class="cost-value total-value">{formatPrice(total)} DZD</span>
		</div>
	</div>

	<!-- Order Action Button -->
	<div class="summary-footer">
		<button class="place-order-btn">
			<span class="btn-text">Passer la commande</span>
			<span class="btn-amount">{formatPrice(total)} DZD</span>
		</button>

		<p class="security-message">
			<svg class="lock-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="currentColor"/>
			</svg>
			Paiement sécurisé à la livraison
		</p>
	</div>
</div>

<style>
	.order-summary-section {
		display: flex;
		flex-direction: column;
		gap: 0;
		flex: 0 0 auto;
		width: 100%;
		max-width: 450px;
		background: white;
		border-radius: 20px;
		box-shadow: 0 4px 15px rgba(128, 128, 128, 0.08);
		overflow: hidden;
		height: fit-content;
		position: sticky;
		top: 100px;
	}

	.summary-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 2rem;
		border-bottom: 2px solid rgba(128, 128, 128, 0.1);
		background: linear-gradient(135deg, rgba(185, 89, 89, 0.05) 0%, rgba(240, 217, 217, 0.15) 100%);
	}

	.summary-header h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: #b95959;
		opacity: 0.85;
		margin: 0;
	}

	.item-count {
		display: inline-block;
		background-color: #b95959;
		color: white;
		padding: 0.4rem 0.8rem;
		border-radius: 50px;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.products-list {
		display: flex;
		flex-direction: column;
		max-height: 400px;
		overflow-y: auto;
		border-bottom: 2px solid rgba(128, 128, 128, 0.1);
	}

	.list-header {
		padding: 1.2rem 2rem;
		background-color: #fafafa;
		border-bottom: 1px solid rgba(128, 128, 128, 0.08);
		position: sticky;
		top: 0;
		z-index: 1;
	}

	.list-header h3 {
		font-size: 1.2rem;
		font-weight: 700;
		color: #555;
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.product-item {
		display: flex;
		gap: 1.2rem;
		padding: 1.5rem 2rem;
		border-bottom: 1px solid rgba(128, 128, 128, 0.08);
		align-items: flex-start;
	}

	.product-image-wrapper {
		position: relative;
		flex-shrink: 0;
	}

	.product-image {
		width: 80px;
		height: 80px;
		object-fit: cover;
		border-radius: 10px;
		background-color: #f0f0f0;
	}

	.product-quantity-badge {
		position: absolute;
		top: -8px;
		right: -8px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background-color: #b95959;
		color: white;
		border-radius: 50%;
		font-size: 1.1rem;
		font-weight: 700;
		box-shadow: 0 2px 8px rgba(185, 89, 89, 0.3);
	}

	.product-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.product-name {
		font-size: 1.3rem;
		font-weight: 700;
		color: #333;
		margin: 0;
		line-height: 1.3;
	}

	.product-description {
		font-size: 1rem;
		color: #777;
		margin: 0.2rem 0 0 0;
		font-weight: 500;
	}

	.product-pricing {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
		font-size: 1.1rem;
	}

	.unit-price {
		font-weight: 700;
		color: #b95959;
	}

	.multiplication {
		color: #bbb;
	}

	.quantity {
		font-weight: 600;
		color: #555;
		min-width: 1.5rem;
		text-align: center;
	}

	.product-total {
		flex-shrink: 0;
		text-align: right;
		font-size: 1.3rem;
		font-weight: 700;
		color: #b95959;
		opacity: 0.8;
		min-width: 80px;
	}

	.costs-breakdown {
		display: flex;
		flex-direction: column;
		padding: 0;
	}

	.costs-header {
		padding: 1.2rem 2rem;
		background-color: #fafafa;
		border-bottom: 1px solid rgba(128, 128, 128, 0.08);
	}

	.costs-header h3 {
		font-size: 1.2rem;
		font-weight: 700;
		color: #555;
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.cost-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		border-bottom: 1px solid rgba(128, 128, 128, 0.05);
	}

	.cost-label {
		font-size: 1.2rem;
		color: #555;
		font-weight: 600;
	}

	.cost-value {
		font-size: 1.2rem;
		font-weight: 600;
		color: #333;
	}

	.delivery-fee {
		color: #b95959;
		opacity: 0.7;
	}

	.divider {
		height: 2px;
		background: linear-gradient(to right, rgba(185, 89, 89, 0.1), rgba(128, 128, 128, 0.1), rgba(185, 89, 89, 0.1));
		margin: 0.5rem 2rem;
	}

	.total-row {
		padding: 1.3rem 2rem;
		background: linear-gradient(135deg, rgba(185, 89, 89, 0.05) 0%, rgba(240, 217, 217, 0.1) 100%);
		border-bottom: none;
	}

	.total-label {
		font-size: 1.4rem;
		font-weight: 800;
		color: #b95959;
		opacity: 0.9;
		letter-spacing: 0.05em;
	}

	.total-value {
		font-size: 1.6rem;
		font-weight: 800;
		color: #b95959;
		opacity: 0.9;
	}

	.summary-footer {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem 2rem;
		background: white;
	}

	.place-order-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
		width: 100%;
		padding: 1.1rem 1.5rem;
		background: linear-gradient(135deg, #b95959 0%, #9d4949 100%);
		color: white;
		border: none;
		border-radius: 12px;
		font-size: 1.4rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(185, 89, 89, 0.3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.place-order-btn:hover {
		background: linear-gradient(135deg, #9d4949 0%, #854141 100%);
		transform: translateY(-2px);
		box-shadow: 0 6px 18px rgba(185, 89, 89, 0.4);
	}

	.place-order-btn:active {
		transform: translateY(0);
	}

	.btn-text {
		display: block;
		font-size: 1.3rem;
	}

	.btn-amount {
		display: block;
		font-size: 1.2rem;
		opacity: 0.95;
		font-weight: 600;
	}

	.security-message {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin: 0;
		font-size: 1rem;
		color: #777;
		text-align: center;
		font-weight: 500;
	}

	.lock-icon {
		width: 1.2rem;
		height: 1.2rem;
		color: #b95959;
		opacity: 0.7;
	}

	@media (max-width: 1050px) {
		.order-summary-section {
			max-width: 100%;
			position: static;
			margin-top: 1rem;
		}

		.products-list {
			max-height: 300px;
		}
	}

	@media (max-width: 768px) {
		.order-summary-section {
			border-radius: 15px;
		}

		.summary-header {
			padding: 1.5rem;
		}

		.summary-header h2 {
			font-size: 1.5rem;
		}

		.product-item {
			padding: 1.2rem 1.5rem;
			gap: 1rem;
		}

		.product-image {
			width: 70px;
			height: 70px;
		}

		.product-name {
			font-size: 1.2rem;
		}

		.product-total {
			font-size: 1.2rem;
			min-width: 70px;
		}

		.cost-item {
			padding: 0.8rem 1.5rem;
		}

		.cost-label,
		.cost-value {
			font-size: 1.1rem;
		}

		.total-label {
			font-size: 1.2rem;
		}

		.total-value {
			font-size: 1.4rem;
		}

		.place-order-btn {
			padding: 0.9rem 1.2rem;
			font-size: 1.2rem;
		}

		.btn-text {
			font-size: 1.1rem;
		}

		.btn-amount {
			font-size: 1rem;
		}

		.security-message {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 480px) {
		.order-summary-section {
			border-radius: 12px;
		}

		.summary-header {
			padding: 1.2rem;
			gap: 1rem;
		}

		.summary-header h2 {
			font-size: 1.3rem;
		}

		.item-count {
			padding: 0.3rem 0.6rem;
			font-size: 1rem;
		}

		.products-list {
			max-height: 250px;
		}

		.product-item {
			padding: 1rem;
			gap: 0.8rem;
		}

		.product-image {
			width: 60px;
			height: 60px;
		}

		.product-quantity-badge {
			width: 24px;
			height: 24px;
			font-size: 1rem;
		}

		.product-name {
			font-size: 1.1rem;
		}

		.product-description {
			font-size: 0.9rem;
		}

		.product-pricing {
			font-size: 1rem;
		}

		.product-total {
			font-size: 1.1rem;
			min-width: 60px;
		}

		.costs-header h3 {
			font-size: 1.1rem;
		}

		.cost-item {
			padding: 0.7rem 1rem;
		}

		.cost-label,
		.cost-value {
			font-size: 1rem;
		}

		.total-row {
			padding: 1rem;
		}

		.total-label {
			font-size: 1.1rem;
		}

		.total-value {
			font-size: 1.2rem;
		}

		.divider {
			margin: 0.3rem 1rem;
		}

		.summary-footer {
			gap: 0.8rem;
			padding: 1rem;
		}

		.place-order-btn {
			padding: 0.8rem 1rem;
			font-size: 1.1rem;
		}

		.btn-text {
			font-size: 1rem;
		}

		.btn-amount {
			font-size: 0.9rem;
		}

		.security-message {
			font-size: 0.8rem;
			gap: 0.3rem;
		}

		.lock-icon {
			width: 1rem;
			height: 1rem;
		}

		.list-header {
			padding: 1rem;
		}

		.list-header h3 {
			font-size: 1.1rem;
		}
	}

	::-webkit-scrollbar {
		width: 0.6rem;
	}

	::-webkit-scrollbar-thumb {
		background: rgba(185, 89, 89, 0.4);
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: rgba(185, 89, 89, 0.6);
	}

	::-webkit-scrollbar-track {
		background: rgba(128, 128, 128, 0.1);
	}
</style>
