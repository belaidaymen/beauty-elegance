<script lang="ts">
	import { X } from 'lucide-svelte';
	import ProductImage from './ProductImage.svelte';

	export let product: any = null;
	export let isOpen: boolean = false;
	export let onClose: (() => void) | undefined = undefined;

	$: if (isOpen && typeof window !== 'undefined') {
		document.body.style.overflow = 'hidden';
	} else if (typeof window !== 'undefined') {
		document.body.style.overflow = 'auto';
	}
</script>

{#if isOpen && product}
	<div class="modal-overlay" on:click={onClose} role="button" tabindex="0">
		<div class="modal-content" on:click={(e) => e.stopPropagation()}>
			<button class="close-button" on:click={onClose} aria-label="Close preview">
				<X size={24} />
			</button>

			<div class="preview-grid">
				<div class="preview-image">
					<ProductImage
						src={product.image}
						alt={product.name}
						size="large"
					/>
				</div>

				<div class="preview-details">
					<h2 class="product-name">{product.name}</h2>

					<div class="product-meta">
						<div class="meta-item">
							<span class="meta-label">SKU</span>
							<span class="meta-value">{product.sku || 'N/A'}</span>
						</div>
						<div class="meta-item">
							<span class="meta-label">Category</span>
							<span class="meta-value">{product.category}</span>
						</div>
					</div>

					<div class="pricing-section">
						<h3 class="section-title">Pricing</h3>
						<div class="price-display">
							<span class="price-label">Price</span>
							<span class="price-value">
								DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(
									product.price
								)}
							</span>
						</div>
						<div class="price-display">
							<span class="price-label">Cost</span>
							<span class="price-value">
								DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(
									product.cost || 0
								)}
							</span>
						</div>
						<div class="price-display">
							<span class="price-label">Margin</span>
							<span class="price-value margin">
								{product.cost
									? (((product.price - product.cost) / product.price) * 100).toFixed(1)
									: 'N/A'}%
							</span>
						</div>
					</div>

					<div class="inventory-section">
						<h3 class="section-title">Inventory</h3>
						<div class="inventory-row">
							<span class="inventory-label">Stock Quantity</span>
							<span class="inventory-value">{product.stock} units</span>
						</div>
						<div class="inventory-row">
							<span class="inventory-label">Status</span>
							<span
								class="status-badge"
								class:status-active={product.status === 'Active'}
								class:status-inactive={product.status === 'Inactive'}
								class:status-low-stock={product.status === 'Low Stock'}
								class:status-out-of-stock={product.status === 'Out of Stock'}
							>
								{product.status}
							</span>
						</div>
					</div>

					<div class="sales-section">
						<h3 class="section-title">Sales Performance</h3>
						<div class="stats-grid">
							<div class="stat-card">
								<span class="stat-label">Total Sales</span>
								<span class="stat-value">{product.totalSales || 0}</span>
							</div>
							<div class="stat-card">
								<span class="stat-label">Total Revenue</span>
								<span class="stat-value">
									DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(
										product.totalRevenue || 0
									)}
								</span>
							</div>
							<div class="stat-card">
								<span class="stat-label">Avg Rating</span>
								<span class="stat-value">{(product.rating || 0).toFixed(1)}⭐</span>
							</div>
							<div class="stat-card">
								<span class="stat-label">Views</span>
								<span class="stat-value">{product.views || 0}</span>
							</div>
						</div>
					</div>

					{#if product.description}
						<div class="description-section">
							<h3 class="section-title">Description</h3>
							<p class="description-text">{product.description}</p>
						</div>
					{/if}

					<div class="timestamps">
						<div class="timestamp-item">
							<span class="timestamp-label">Created</span>
							<span class="timestamp-value">{product.createdAt || 'N/A'}</span>
						</div>
						<div class="timestamp-item">
							<span class="timestamp-label">Updated</span>
							<span class="timestamp-value">{product.updatedAt || 'N/A'}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

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
		justify-content: center;
		padding: 2rem;
		z-index: 1000;
		backdrop-filter: blur(4px);
	}

	.modal-content {
		background: #fff;
		border-radius: 1.5rem;
		padding: 3rem;
		max-width: 1000px;
		width: 100%;
		max-height: 85vh;
		overflow-y: auto;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
		position: relative;
		animation: slideInUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(2rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.close-button {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		background: linear-gradient(135deg, #f5f0ed 0%, #faf8f6 100%);
		border: 2px solid #e8e0db;
		width: 4.4rem;
		height: 4.4rem;
		border-radius: 0.8rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		color: #333;
	}

	.close-button:hover {
		border-color: #b37777;
		color: #b37777;
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.15);
	}

	.preview-grid {
		display: grid;
		grid-template-columns: 30rem 1fr;
		gap: 3rem;
	}

	.preview-image {
		display: flex;
		align-items: flex-start;
		position: sticky;
		top: 0;
	}

	.preview-details {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.product-name {
		font-family: 'Abril Fatface', serif;
		font-size: 2.8rem;
		font-weight: 400;
		color: #2a2a2a;
		margin: 0;
		letter-spacing: -0.01em;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.product-meta {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #f5f0ed 0%, #faf8f6 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.meta-label {
		font-size: 1.2rem;
		color: #999;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.meta-value {
		font-size: 1.6rem;
		color: #333;
		font-weight: 600;
		font-family: inherit;
	}

	.pricing-section,
	.inventory-section,
	.sales-section,
	.description-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.section-title {
		font-size: 1.6rem;
		font-weight: 700;
		color: #333;
		margin: 0;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.08em;
		border-bottom: 2px solid #e8e0db;
		padding-bottom: 1rem;
	}

	.price-display {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: rgba(209, 178, 178, 0.05);
		border-radius: 0.6rem;
		border-left: 3px solid #b37777;
	}

	.price-label {
		font-size: 1.3rem;
		color: #666;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.price-value {
		font-size: 1.6rem;
		font-weight: 700;
		color: #333;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.price-value.margin {
		color: #27ae60;
	}

	.inventory-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 0.6rem;
		border: 1px solid #e8e0db;
	}

	.inventory-label {
		font-size: 1.3rem;
		color: #666;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.inventory-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: #333;
		font-family: inherit;
	}

	.status-badge {
		display: inline-flex;
		padding: 0.5rem 1rem;
		border-radius: 0.6rem;
		font-size: 1.2rem;
		font-weight: 600;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.status-active {
		background: rgba(39, 174, 96, 0.12);
		color: #1d6b3c;
	}

	.status-inactive {
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
	}

	.status-low-stock {
		background: rgba(243, 156, 18, 0.12);
		color: #b87c0f;
	}

	.status-out-of-stock {
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		background: linear-gradient(135deg, rgba(209, 178, 178, 0.1) 0%, rgba(179, 119, 119, 0.05) 100%);
		border-radius: 0.6rem;
		border: 1px solid #e8e0db;
		text-align: center;
	}

	.stat-label {
		font-size: 1.2rem;
		color: #999;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.08em;
	}

	.stat-value {
		font-size: 1.8rem;
		font-weight: 700;
		color: #b37777;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.description-text {
		font-size: 1.4rem;
		color: #666;
		line-height: 1.6;
		margin: 0;
		font-family: inherit;
	}

	.timestamps {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		padding: 1.5rem;
		background: rgba(209, 178, 178, 0.05);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.timestamp-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.timestamp-label {
		font-size: 1.2rem;
		color: #999;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.timestamp-value {
		font-size: 1.3rem;
		color: #666;
		font-family: inherit;
	}

	@media (max-width: 768px) {
		.modal-content {
			padding: 1.5rem;
			border-radius: 1rem;
		}

		.preview-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.preview-image {
			position: static;
		}

		.product-name {
			font-size: 2.2rem;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}

		.product-meta,
		.timestamps {
			grid-template-columns: 1fr;
		}

		.close-button {
			width: 3.8rem;
			height: 3.8rem;
		}
	}
</style>
