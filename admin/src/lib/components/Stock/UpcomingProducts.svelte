<script lang="ts">
	import { Plus, Calendar, Package } from 'lucide-svelte';
	import Card from '../Card.svelte';
	import Button from '../Button.svelte';
	import Modal from '../Modal.svelte';
	import FormInput from '../FormInput.svelte';
	import FormTextarea from '../FormTextarea.svelte';

	export let upcomingProducts: any[] = [];
	export let onAddUpcoming: ((product: any) => void) | undefined = undefined;
	export let onRemoveUpcoming: ((id: string) => void) | undefined = undefined;

	let showModal = false;
	let formData = {
		name: '',
		sku: '',
		category: 'Maquillage',
		expectedQuantity: 0,
		expectedDate: '',
		supplier: '',
		notes: ''
	};

	const categories = [
		'Maquillage',
		'Cheveux',
		'Visage',
		'Corps & Bain',
		'Deo & Stick',
		'Promotion'
	];

	const handleSubmit = () => {
		if (!formData.name || !formData.sku || !formData.expectedDate) {
			alert('Please fill in all required fields');
			return;
		}

		onAddUpcoming?.({
			id: Date.now().toString(),
			...formData,
			status: 'pending',
			createdAt: new Date().toISOString().split('T')[0]
		});

		resetForm();
		showModal = false;
	};

	const resetForm = () => {
		formData = {
			name: '',
			sku: '',
			category: 'Maquillage',
			expectedQuantity: 0,
			expectedDate: '',
			supplier: '',
			notes: ''
		};
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'pending':
				return 'warning';
			case 'confirmed':
				return 'info';
			case 'shipped':
				return 'success';
			case 'received':
				return 'success';
			default:
				return 'neutral';
		}
	};

	const getStatusLabel = (status: string) => {
		return status.charAt(0).toUpperCase() + status.slice(1);
	};

	const getDaysUntil = (date: string) => {
		const target = new Date(date);
		const today = new Date();
		const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
		return diff;
	};

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};
</script>

<Card title="Upcoming Stock" subtitle="Products in transit or under order">
	{#if upcomingProducts.length === 0}
		<div class="empty-state">
			<Package size={48} />
			<p class="empty-text">No upcoming products scheduled</p>
			<p class="empty-subtext">Add products that are on order or in transit</p>
		</div>
	{:else}
		<div class="upcoming-list">
			{#each upcomingProducts as product (product.id)}
				<div class="upcoming-item">
					<div class="item-header">
						<div class="item-info">
							<h4 class="item-name">{product.name}</h4>
							<p class="item-sku">SKU: {product.sku}</p>
						</div>
						<span class="status-badge status-{getStatusColor(product.status)}">
							{getStatusLabel(product.status)}
						</span>
					</div>

					<div class="item-details">
						<div class="detail-group">
							<span class="detail-label">Expected Quantity</span>
							<span class="detail-value">{product.expectedQuantity} units</span>
						</div>
						<div class="detail-group">
							<span class="detail-label">Category</span>
							<span class="detail-value">{product.category}</span>
						</div>
						<div class="detail-group">
							<span class="detail-label">Expected Arrival</span>
							<div class="arrival-info">
								<Calendar size={16} />
								<span class="detail-value">
									{formatDate(product.expectedDate)}
									<span class="days-info">
										({getDaysUntil(product.expectedDate)} days)
									</span>
								</span>
							</div>
						</div>
						{#if product.supplier}
							<div class="detail-group">
								<span class="detail-label">Supplier</span>
								<span class="detail-value">{product.supplier}</span>
							</div>
						{/if}
					</div>

					{#if product.notes}
						<div class="item-notes">
							<p class="notes-label">Notes</p>
							<p class="notes-text">{product.notes}</p>
						</div>
					{/if}

					<div class="item-actions">
						<Button
							variant="danger"
							size="small"
							on:click={() => onRemoveUpcoming?.(product.id)}
						>
							Remove
						</Button>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<div class="card-footer">
		<Button variant="primary" size="small" on:click={() => (showModal = true)}>
			<Plus size={18} />
			Add Upcoming Product
		</Button>
	</div>
</Card>

<!-- Add Upcoming Product Modal -->
<Modal
	isOpen={showModal}
	title="Add Upcoming Product"
	size="medium"
	onClose={() => {
		showModal = false;
		resetForm();
	}}
>
	<FormInput
		label="Product Name"
		placeholder="Enter product name"
		bind:value={formData.name}
		required
	/>

	<FormInput
		label="SKU"
		placeholder="Enter unique SKU code"
		bind:value={formData.sku}
		required
	/>

	<div class="form-group">
		<label for="category-select" class="form-label">Category <span class="required">*</span></label>
		<select id="category-select" bind:value={formData.category} class="form-select">
			{#each categories as cat}
				<option value={cat}>{cat}</option>
			{/each}
		</select>
	</div>

	<FormInput
		label="Expected Quantity"
		inputType="number"
		placeholder="0"
		bind:value={formData.expectedQuantity}
		required
	/>

	<FormInput
		label="Expected Arrival Date"
		inputType="date"
		bind:value={formData.expectedDate}
		required
	/>

	<FormInput
		label="Supplier"
		placeholder="Supplier name (optional)"
		bind:value={formData.supplier}
	/>

	<FormTextarea
		label="Notes"
		placeholder="Add any additional notes..."
		bind:value={formData.notes}
	/>

	<svelte:fragment slot="footer">
		<Button variant="secondary" on:click={() => (showModal = false)}>Cancel</Button>
		<Button variant="primary" on:click={handleSubmit}>Add Product</Button>
	</svelte:fragment>
</Modal>

<style>
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

	.empty-text {
		font-size: 1.6rem;
		font-weight: 600;
		color: #666;
		margin: 0;
	}

	.empty-subtext {
		font-size: 1.3rem;
		color: #999;
		margin: 0.5rem 0 0 0;
	}

	.upcoming-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.upcoming-item {
		padding: 1.5rem;
		background: linear-gradient(135deg, #fafbff 0%, #f9f8f8 100%);
		border: 2px solid #e8e0db;
		border-radius: 0.8rem;
		transition: all 0.3s ease;
	}

	.upcoming-item:hover {
		border-color: #b37777;
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.08);
	}

	.item-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #e8e0db;
	}

	.item-info {
		flex: 1;
	}

	.item-name {
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 0.4rem 0;
	}

	.item-sku {
		font-size: 1.2rem;
		color: #999;
		margin: 0;
	}

	.status-badge {
		padding: 0.5rem 1rem;
		border-radius: 0.4rem;
		font-size: 1.2rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.status-warning {
		background: rgba(243, 156, 18, 0.12);
		color: #b87c0f;
	}

	.status-info {
		background: rgba(52, 152, 219, 0.12);
		color: #1f5fa8;
	}

	.status-success {
		background: rgba(39, 174, 96, 0.12);
		color: #1d6b3c;
	}

	.item-details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.detail-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.detail-label {
		font-size: 1.1rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.detail-value {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.arrival-info {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		color: #b37777;
	}

	.arrival-info svg {
		flex-shrink: 0;
	}

	.days-info {
		font-size: 1.2rem;
		color: #999;
		font-weight: 500;
	}

	.item-notes {
		padding: 1rem;
		background: rgba(179, 119, 119, 0.05);
		border-left: 3px solid #b37777;
		border-radius: 0.4rem;
		margin-bottom: 1.5rem;
	}

	.notes-label {
		font-size: 1.1rem;
		color: #b37777;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.05em;
		margin: 0 0 0.5rem 0;
	}

	.notes-text {
		font-size: 1.3rem;
		color: #666;
		margin: 0;
		line-height: 1.5;
	}

	.item-actions {
		display: flex;
		gap: 0.5rem;
	}

	.card-footer {
		padding-top: 1.5rem;
		border-top: 1px solid #e8e0db;
		display: flex;
		justify-content: flex-end;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		margin-bottom: 1.5rem;
	}

	.form-label {
		font-size: 1.5rem;
		font-weight: 700;
		color: #333;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		font-size: 1.3rem;
		letter-spacing: 0.1em;
	}

	.required {
		color: #c94444;
		margin-left: 0.4rem;
	}

	.form-select {
		padding: 1rem 1.5rem;
		border: 2px solid transparent;
		border-image: linear-gradient(90deg, #e8e0db, #f0d9d9) 1;
		border-radius: 0.8rem;
		font-size: 1.5rem;
		color: #333;
		background: rgba(255, 255, 255, 0.8);
		font-family: inherit;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		cursor: pointer;
	}

	.form-select:focus {
		outline: none;
		border-color: #b37777;
		background: #fff;
		box-shadow: 0 0 0 4px rgba(179, 119, 119, 0.1);
	}

	@media (max-width: 768px) {
		.item-header {
			flex-direction: column;
		}

		.item-details {
			grid-template-columns: 1fr;
		}

		.status-badge {
			align-self: flex-start;
		}
	}
</style>
