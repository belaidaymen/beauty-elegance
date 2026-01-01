<script lang="ts">
	import { X, Plus, Minus, AlertTriangle } from 'lucide-svelte';
	import Button from '../Button.svelte';
	import FormInput from '../FormInput.svelte';

	export let isOpen = false;
	export let product: any = null;
	export let onClose: (() => void) | undefined = undefined;
	export let onStockUpdate: ((adjustmentData: any) => void) | undefined = undefined;

	let adjustmentType: 'add' | 'subtract' | 'set' = 'add';
	let adjustmentQuantity = 0;
	let adjustmentNotes = '';

	const resetForm = () => {
		adjustmentType = 'add';
		adjustmentQuantity = 0;
		adjustmentNotes = '';
	};

	const handleAdjustment = () => {
		if (adjustmentQuantity <= 0 && adjustmentType !== 'set') {
			alert('Please enter a valid quantity');
			return;
		}

		const newStock =
			adjustmentType === 'add'
				? (product.currentStock || 0) + adjustmentQuantity
				: adjustmentType === 'subtract'
					? (product.currentStock || 0) - adjustmentQuantity
					: adjustmentQuantity;

		if (newStock < 0 && !product.allowNegativeStock) {
			alert('This product does not allow negative stock');
			return;
		}

		onStockUpdate?.({
			productId: product.id,
			previousStock: product.currentStock,
			newStock: newStock,
			adjustmentType: adjustmentType,
			quantity: adjustmentQuantity,
			notes: adjustmentNotes,
			timestamp: new Date().toISOString()
		});

		resetForm();
	};

	const getStockStatus = (current: number, min: number, max: number) => {
		if (current === 0) return { label: 'Out of Stock', color: '#e74c3c', bg: 'rgba(231, 76, 60, 0.1)' };
		if (current <= min)
			return { label: 'Critical', color: '#e74c3c', bg: 'rgba(231, 76, 60, 0.1)' };
		if (current <= min * 1.5) return { label: 'Low', color: '#f39c12', bg: 'rgba(243, 156, 18, 0.1)' };
		return { label: 'Optimal', color: '#27ae60', bg: 'rgba(39, 174, 96, 0.1)' };
	};

	const getStockPercentage = (current: number, max: number) => {
		return Math.min((current / max) * 100, 100);
	};

	$: if (product) {
		resetForm();
	}
</script>

{#if isOpen && product}
	<div class="modal-overlay" on:click={onClose}>
		<div class="modal-content" on:click={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<h2 class="modal-title">Stock Details & Adjustment</h2>
				<button class="close-button" on:click={onClose} aria-label="Close modal">
					<X size={24} />
				</button>
			</div>

			<div class="modal-body">
				<!-- Product Header -->
				<div class="product-header">
					<div>
						<h3 class="product-name">{product.name}</h3>
						<p class="product-sku">SKU: {product.sku}</p>
						<p class="product-category">{product.category}</p>
					</div>
					<div class="status-badge" style="background: {getStockStatus(product.currentStock, product.minStock, product.maxStock).bg}; color: {getStockStatus(product.currentStock, product.minStock, product.maxStock).color};">
						{getStockStatus(product.currentStock, product.minStock, product.maxStock).label}
					</div>
				</div>

				<!-- Stock Level Visualization -->
				<div class="stock-section">
					<div class="section-title">Current Stock Level</div>
					<div class="stock-visual">
						<div class="stock-number">
							<span class="current">{product.currentStock}</span>
							<span class="max">/ {product.maxStock}</span>
						</div>
						<div class="stock-bar">
							<div
								class="stock-fill"
								style="width: {getStockPercentage(product.currentStock, product.maxStock)}%; background: {getStockStatus(product.currentStock, product.minStock, product.maxStock).color};"
							></div>
						</div>
						<div class="stock-info">
							<div class="info-item">
								<span class="label">Min Level:</span>
								<span class="value">{product.minStock}</span>
							</div>
							<div class="info-item">
								<span class="label">Max Level:</span>
								<span class="value">{product.maxStock}</span>
							</div>
							<div class="info-item">
								<span class="label">Available:</span>
								<span class="value" style="color: {product.currentStock >= product.minStock ? '#27ae60' : '#e74c3c'};">
									{Math.max(0, product.currentStock - product.minStock)} units
								</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Alert Status -->
				{#if product.alertEnabled}
					<div class="alert-section">
						<div class="alert-icon">
							<AlertTriangle size={20} />
						</div>
						<div class="alert-content">
							<p class="alert-title">Alert Enabled</p>
							<p class="alert-description">
								Alert will trigger at {product.alertLevel} units
								{#if product.currentStock <= product.alertLevel}
									<strong> (CURRENTLY TRIGGERED)</strong>
								{/if}
							</p>
						</div>
					</div>
				{/if}

				<!-- Stock Adjustment Form -->
				<div class="adjustment-section">
					<div class="section-title">Adjust Stock</div>

					<div class="adjustment-type">
						<label class="type-option">
							<input
								type="radio"
								name="adjustment-type"
								value="add"
								bind:group={adjustmentType}
							/>
							<span class="type-label">Add Stock</span>
							<Plus size={18} />
						</label>
						<label class="type-option">
							<input
								type="radio"
								name="adjustment-type"
								value="subtract"
								bind:group={adjustmentType}
							/>
							<span class="type-label">Remove Stock</span>
							<Minus size={18} />
						</label>
						<label class="type-option">
							<input
								type="radio"
								name="adjustment-type"
								value="set"
								bind:group={adjustmentType}
							/>
							<span class="type-label">Set Amount</span>
						</label>
					</div>

					<div class="form-group">
						<label for="quantity" class="form-label">
							{#if adjustmentType === 'add'}
								Quantity to Add
							{:else if adjustmentType === 'subtract'}
								Quantity to Remove
							{:else}
								New Stock Level
							{/if}
						</label>
						<FormInput
							id="quantity"
							inputType="number"
							placeholder="0"
							bind:value={adjustmentQuantity}
							required
						/>
					</div>

					{#if adjustmentType !== 'set'}
						<div class="calculation">
							<p>New Stock Level: <span class="calc-result">
								{adjustmentType === 'add'
									? (product.currentStock || 0) + adjustmentQuantity
									: (product.currentStock || 0) - adjustmentQuantity}
							</span></p>
						</div>
					{/if}

					<div class="form-group">
						<label for="notes" class="form-label">Notes (Optional)</label>
						<textarea
							id="notes"
							bind:value={adjustmentNotes}
							placeholder="Add notes about this adjustment (e.g., reason, reference number)"
							class="form-textarea"
						></textarea>
					</div>
				</div>

				<!-- Stock History -->
				{#if product.stockHistory && product.stockHistory.length > 0}
					<div class="history-section">
						<div class="section-title">Recent Adjustments</div>
						<div class="history-list">
							{#each product.stockHistory.slice(0, 3) as entry}
								<div class="history-item">
									<div class="history-info">
										<span class="history-type" class:add={entry.type === 'add'} class:remove={entry.type === 'subtract'}>
											{entry.type === 'add' ? '+' : '-'}{entry.quantity}
										</span>
										<div>
											<p class="history-date">{new Date(entry.timestamp).toLocaleDateString()}</p>
											{#if entry.notes}
												<p class="history-notes">{entry.notes}</p>
											{/if}
										</div>
									</div>
									<span class="history-result">{entry.resultStock}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<div class="modal-footer">
				<Button variant="secondary" on:click={onClose}>Cancel</Button>
				<Button
					variant="primary"
					disabled={adjustmentQuantity === 0}
					on:click={handleAdjustment}
				>
					Update Stock
				</Button>
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
		z-index: 1000;
		animation: fadeIn 0.2s ease;
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
		background: #fff;
		border-radius: 1.2rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		max-width: 60rem;
		width: 90%;
		max-height: 90vh;
		overflow-y: auto;
		animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes slideUp {
		from {
			transform: translateY(2rem);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 2.5rem;
		border-bottom: 2px solid #f0d9d9;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
	}

	.modal-title {
		font-size: 1.9rem;
		font-weight: 600;
		color: #2a2a2a;
		margin: 0;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.01em;
	}

	.close-button {
		background: none;
		border: none;
		cursor: pointer;
		color: #999;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}

	.close-button:hover {
		color: #b37777;
	}

	.modal-body {
		padding: 2rem 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.product-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.product-name {
		font-size: 1.8rem;
		font-weight: 600;
		color: #2a2a2a;
		margin: 0 0 0.5rem 0;
	}

	.product-sku,
	.product-category {
		font-size: 1.3rem;
		color: #999;
		margin: 0.3rem 0;
	}

	.status-badge {
		padding: 0.8rem 1.5rem;
		border-radius: 2rem;
		font-size: 1.3rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.section-title {
		font-size: 1.4rem;
		font-weight: 700;
		color: #333;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.08em;
		margin-bottom: 1rem;
	}

	.stock-section {
		padding: 1.5rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.stock-visual {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.stock-number {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.current {
		font-size: 2.8rem;
		font-weight: 700;
		color: #b37777;
	}

	.max {
		font-size: 1.6rem;
		color: #999;
	}

	.stock-bar {
		width: 100%;
		height: 1.4rem;
		background: #e0c8c8;
		border-radius: 0.7rem;
		overflow: hidden;
	}

	.stock-fill {
		height: 100%;
		border-radius: 0.7rem;
		transition: width 0.3s ease;
	}

	.stock-info {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.info-item .label {
		font-size: 1.2rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.info-item .value {
		font-size: 1.6rem;
		font-weight: 700;
		color: #333;
	}

	.alert-section {
		display: flex;
		gap: 1.2rem;
		padding: 1.5rem;
		background: rgba(243, 156, 18, 0.08);
		border-left: 4px solid #f39c12;
		border-radius: 0.6rem;
	}

	.alert-icon {
		color: #f39c12;
		flex-shrink: 0;
	}

	.alert-content {
		flex: 1;
	}

	.alert-title {
		font-size: 1.3rem;
		font-weight: 600;
		color: #b87c0f;
		margin: 0 0 0.4rem 0;
	}

	.alert-description {
		font-size: 1.2rem;
		color: #8a6b0f;
		margin: 0;
	}

	.adjustment-section {
		padding: 1.5rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.adjustment-type {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.type-option {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 1rem;
		border: 2px solid #e8e0db;
		border-radius: 0.6rem;
		cursor: pointer;
		transition: all 0.2s ease;
		background: #fff;
	}

	.type-option:has(input:checked) {
		border-color: #b37777;
		background: rgba(179, 119, 119, 0.05);
	}

	.type-option input {
		width: 1.6rem;
		height: 1.6rem;
		cursor: pointer;
		accent-color: #b37777;
	}

	.type-label {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		flex: 1;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		margin-bottom: 1.5rem;
	}

	.form-label {
		font-size: 1.3rem;
		font-weight: 700;
		color: #333;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.1em;
	}

	.form-textarea {
		padding: 1rem 1.5rem;
		border: 2px solid #e8e0db;
		border-radius: 0.8rem;
		font-size: 1.4rem;
		color: #333;
		background: #fff;
		font-family: inherit;
		resize: vertical;
		min-height: 8rem;
		transition: all 0.3s ease;
	}

	.form-textarea:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 4px rgba(179, 119, 119, 0.1);
	}

	.calculation {
		padding: 1rem;
		background: rgba(179, 119, 119, 0.1);
		border-left: 3px solid #b37777;
		border-radius: 0.4rem;
		margin-bottom: 1.5rem;
	}

	.calculation p {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.calc-result {
		color: #b37777;
		font-weight: 700;
	}

	.history-section {
		padding: 1.5rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.history-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.history-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: #fff;
		border-radius: 0.6rem;
		border: 1px solid #e8e0db;
	}

	.history-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;
	}

	.history-type {
		font-size: 1.4rem;
		font-weight: 700;
		padding: 0.4rem 0.8rem;
		border-radius: 0.4rem;
		min-width: 4rem;
		text-align: center;
	}

	.history-type.add {
		background: rgba(39, 174, 96, 0.1);
		color: #27ae60;
	}

	.history-type.remove {
		background: rgba(231, 76, 60, 0.1);
		color: #e74c3c;
	}

	.history-date {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.history-notes {
		font-size: 1.2rem;
		color: #999;
		margin: 0.3rem 0 0 0;
	}

	.history-result {
		font-size: 1.4rem;
		font-weight: 600;
		color: #b37777;
	}

	.modal-footer {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		padding: 2rem 2.5rem;
		border-top: 2px solid #f0d9d9;
		background: #faf9f8;
	}

	@media (max-width: 768px) {
		.modal-content {
			max-width: 95vw;
		}

		.product-header {
			flex-direction: column;
		}

		.adjustment-type {
			grid-template-columns: 1fr;
		}

		.stock-info {
			grid-template-columns: 1fr;
		}

		.modal-footer {
			flex-direction: column-reverse;
		}
	}
</style>
