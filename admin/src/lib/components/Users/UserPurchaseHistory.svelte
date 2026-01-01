<script lang="ts">
	import { ShoppingBag, Package } from 'lucide-svelte';
	import Card from '../Card.svelte';

	export let purchases: any[] = [];

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

	$: totalSpent = purchases.reduce((sum, p) => sum + p.totalAmount, 0);
	$: averagePurchase = purchases.length > 0 ? totalSpent / purchases.length : 0;
	$: mostFrequentCategory = purchases.length > 0
		? Object.entries(
				purchases.reduce(
					(acc: any, p) => {
						acc[p.category] = (acc[p.category] || 0) + 1;
						return acc;
					},
					{} as any
				)
			).sort(([, a]: any, [, b]: any) => b - a)[0]?.[0]
		: 'N/A';
</script>

<Card title="Purchase History" subtitle="All products purchased by this user">
	<div class="purchase-stats">
		<div class="stat-item">
			<span class="stat-label">Total Purchases</span>
			<span class="stat-value">{purchases.length}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Total Spent</span>
			<span class="stat-value">{formatCurrency(totalSpent)}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Average Purchase</span>
			<span class="stat-value">{formatCurrency(averagePurchase)}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Top Category</span>
			<span class="stat-value">{mostFrequentCategory}</span>
		</div>
	</div>

	{#if purchases.length === 0}
		<div class="empty-state">
			<ShoppingBag size={48} />
			<p>No purchases yet</p>
		</div>
	{:else}
		<div class="purchases-list">
			{#each purchases as purchase (purchase.id)}
				<div class="purchase-item">
					<div class="purchase-header">
						<div class="purchase-info">
							<h4 class="purchase-name">{purchase.productName}</h4>
							<p class="purchase-sku">SKU: {purchase.sku}</p>
						</div>
						<div class="purchase-meta">
							<span class="purchase-date">{formatDate(purchase.purchaseDate)}</span>
							<span class="purchase-price">{formatCurrency(purchase.totalAmount)}</span>
						</div>
					</div>
					<div class="purchase-details">
						<div class="detail-item">
							<span class="label">Quantity</span>
							<span class="value">{purchase.quantity} {purchase.unit || 'pcs'}</span>
						</div>
						<div class="detail-item">
							<span class="label">Category</span>
							<span class="value">{purchase.category}</span>
						</div>
						<div class="detail-item">
							<span class="label">Unit Price</span>
							<span class="value">{formatCurrency(purchase.unitPrice)}</span>
						</div>
						<div class="detail-item">
							<span class="label">Status</span>
							<span class="value status" class:delivered={purchase.status === 'Delivered'} class:pending={purchase.status === 'Pending'}>
								{purchase.status}
							</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</Card>

<style>
	.purchase-stats {
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
		font-size: 1.6rem;
		font-weight: 700;
		color: #333;
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

	.purchases-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.purchase-item {
		padding: 1.5rem;
		background: linear-gradient(135deg, #fafbff 0%, #f9f8f8 100%);
		border: 1px solid #e8e0db;
		border-radius: 0.8rem;
		transition: all 0.2s ease;
	}

	.purchase-item:hover {
		border-color: #b37777;
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.08);
	}

	.purchase-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #e8e0db;
	}

	.purchase-info {
		flex: 1;
	}

	.purchase-name {
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 0.4rem 0;
	}

	.purchase-sku {
		font-size: 1.2rem;
		color: #999;
		margin: 0;
	}

	.purchase-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.8rem;
	}

	.purchase-date {
		font-size: 1.2rem;
		color: #999;
		font-weight: 500;
	}

	.purchase-price {
		font-size: 1.6rem;
		font-weight: 700;
		color: #b37777;
	}

	.purchase-details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		gap: 1.5rem;
	}

	.detail-item {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.detail-item .label {
		font-size: 1rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.detail-item .value {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
	}

	.detail-item .value.status {
		padding: 0.3rem 0.8rem;
		border-radius: 0.4rem;
		background: #f9f8f8;
		border: 1px solid #e8e0db;
	}

	.detail-item .value.status.delivered {
		background: rgba(39, 174, 96, 0.12);
		color: #1d6b3c;
		border-color: rgba(39, 174, 96, 0.3);
	}

	.detail-item .value.status.pending {
		background: rgba(243, 156, 18, 0.12);
		color: #b87c0f;
		border-color: rgba(243, 156, 18, 0.3);
	}

	@media (max-width: 768px) {
		.purchase-stats {
			grid-template-columns: repeat(2, 1fr);
		}

		.purchase-header {
			flex-direction: column;
		}

		.purchase-meta {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}

		.purchase-details {
			grid-template-columns: 1fr;
		}
	}
</style>
