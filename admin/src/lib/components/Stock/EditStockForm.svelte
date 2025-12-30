<script lang="ts">
	import { stockStore } from '$lib/stores/stock_store';
	import { uiStore } from '$lib/stores/ui_store';
	import type { StockItem } from '$lib/stores/stock_store';

	export let item: StockItem;
	export let onCancel: () => void;

	let newStock = item.currentStock;
	let isSaving = false;

	async function saveStock() {
		isSaving = true;
		try {
			stockStore.updateStock(item.productId, newStock);
			uiStore.showNotification('Stock mis à jour avec succès', 'success');
			onCancel();
		} catch (error) {
			uiStore.showNotification('Erreur lors de la mise à jour', 'error');
		} finally {
			isSaving = false;
		}
	}
</script>

<tr class="edit-form-row">
	<td colspan="7">
		<div class="form-wrapper">
			<div class="form-group">
				<label>Nouveau Stock</label>
				<input type="number" bind:value={newStock} min="0" />
			</div>
			<div class="form-actions">
				<button class="btn btn-primary" on:click={saveStock} disabled={isSaving}>
					{isSaving ? '⏳ Sauvegarde...' : '✓ Confirmer'}
				</button>
				<button class="btn btn-secondary" on:click={onCancel} disabled={isSaving}>
					✕ Annuler
				</button>
			</div>
		</div>
	</td>
</tr>

<style>
	.edit-form-row {
		background: var(--color-primary-light-beige);
	}

	.form-wrapper {
		padding: var(--spacing-lg);
		display: flex;
		gap: var(--spacing-lg);
		align-items: flex-end;
	}

	.form-group {
		flex: 1;
		max-width: 200px;
	}

	.form-group label {
		display: block;
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--color-text-dark);
		margin-bottom: var(--spacing-sm);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.form-group input {
		width: 100%;
	}

	.form-actions {
		display: flex;
		gap: var(--spacing-md);
	}

	@media (max-width: 768px) {
		.form-wrapper {
			flex-direction: column;
			align-items: stretch;
		}

		.form-group {
			max-width: 100%;
		}

		.form-actions {
			justify-content: flex-end;
		}
	}
</style>
