<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { uiStore } from '$lib/stores/ui_store';

	const dispatch = createEventDispatcher();

	let formData = {
		productId: '',
		productName: '',
		currentStock: 0,
		minimumThreshold: 0,
		maximumCapacity: 0
	};

	let isSubmitting = false;

	async function handleSubmit() {
		if (!formData.productName || formData.currentStock < 0 || formData.minimumThreshold < 0 || formData.maximumCapacity < 0) {
			uiStore.showNotification('Veuillez remplir tous les champs correctement', 'error');
			return;
		}

		isSubmitting = true;
		try {
			dispatch('add', {
				...formData,
				productId: `p${Date.now()}`
			});
			formData = {
				productId: '',
				productName: '',
				currentStock: 0,
				minimumThreshold: 0,
				maximumCapacity: 0
			};
		} catch (error) {
			uiStore.showNotification('Erreur lors de l\'ajout du stock', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form class="add-stock-form" on:submit|preventDefault={handleSubmit}>
	<div class="form-grid">
		<div class="form-group">
			<label for="productName">Nom du Produit *</label>
			<input
				id="productName"
				type="text"
				bind:value={formData.productName}
				placeholder="Ex: Shampoing Gracias"
				required
			/>
		</div>

		<div class="form-group">
			<label for="currentStock">Stock Actuel *</label>
			<input
				id="currentStock"
				type="number"
				bind:value={formData.currentStock}
				min="0"
				placeholder="0"
				required
			/>
		</div>

		<div class="form-group">
			<label for="minimumThreshold">Seuil Minimum *</label>
			<input
				id="minimumThreshold"
				type="number"
				bind:value={formData.minimumThreshold}
				min="0"
				placeholder="0"
				required
			/>
		</div>

		<div class="form-group">
			<label for="maximumCapacity">Capacité Maximale *</label>
			<input
				id="maximumCapacity"
				type="number"
				bind:value={formData.maximumCapacity}
				min="0"
				placeholder="0"
				required
			/>
		</div>
	</div>

	<div class="form-actions">
		<button type="submit" class="btn btn-primary" disabled={isSubmitting}>
			{isSubmitting ? '⏳ Ajout en cours...' : '+ Ajouter Stock'}
		</button>
	</div>
</form>

<style>
	.add-stock-form {
		background: white;
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
		animation: slideDown 0.3s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.form-group label {
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--color-text-dark);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.form-group input {
		padding: var(--spacing-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: 1.4rem;
		background: white;
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--color-accent-teal);
		box-shadow: 0 0 0 3px rgba(43, 138, 138, 0.1);
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: var(--spacing-md);
	}

	@media (max-width: 768px) {
		.form-grid {
			grid-template-columns: 1fr;
		}

		.form-actions {
			justify-content: stretch;
		}

		button {
			width: 100%;
		}
	}
</style>
