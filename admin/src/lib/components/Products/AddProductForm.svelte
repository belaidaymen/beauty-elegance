<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { productsStore } from '$lib/stores/products_store';
	import { uiStore } from '$lib/stores/ui_store';

	const dispatch = createEventDispatcher();

	export let categories: string[] = [];

	let formData = {
		name: '',
		description: '',
		price: 0,
		category: categories[0] || '',
		stock: 0,
		sku: '',
		images: ['https://via.placeholder.com/300x300?text=Product'],
		active: true
	};

	let isSubmitting = false;

	async function handleSubmit() {
		if (!formData.name || !formData.price || !formData.category || !formData.sku) {
			uiStore.showNotification('Veuillez remplir tous les champs obligatoires', 'error');
			return;
		}

		isSubmitting = true;
		try {
			const newProduct = {
				...formData,
				id: `p${Date.now()}`,
				createdAt: new Date(),
				updatedAt: new Date()
			};
			productsStore.addProduct(newProduct);
			dispatch('add', newProduct);
			formData = {
				name: '',
				description: '',
				price: 0,
				category: categories[0] || '',
				stock: 0,
				sku: '',
				images: ['https://via.placeholder.com/300x300?text=Product'],
				active: true
			};
		} catch (error) {
			uiStore.showNotification('Erreur lors de l\'ajout du produit', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form class="add-product-form" on:submit|preventDefault={handleSubmit}>
	<h2>Ajouter un Nouveau Produit</h2>

	<div class="form-grid">
		<div class="form-group full-width">
			<label for="name">Nom du Produit *</label>
			<input
				id="name"
				type="text"
				bind:value={formData.name}
				placeholder="Ex: Shampoing Gracias"
				required
			/>
		</div>

		<div class="form-group full-width">
			<label for="description">Description</label>
			<textarea
				id="description"
				bind:value={formData.description}
				placeholder="Décrivez votre produit..."
				rows="3"
			></textarea>
		</div>

		<div class="form-group">
			<label for="sku">SKU *</label>
			<input
				id="sku"
				type="text"
				bind:value={formData.sku}
				placeholder="Ex: PROD001"
				required
			/>
		</div>

		<div class="form-group">
			<label for="category">Catégorie *</label>
			<select id="category" bind:value={formData.category} required>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>

		<div class="form-group">
			<label for="price">Prix (DZD) *</label>
			<input
				id="price"
				type="number"
				bind:value={formData.price}
				min="0"
				step="0.01"
				placeholder="0"
				required
			/>
		</div>

		<div class="form-group">
			<label for="stock">Stock Initial</label>
			<input
				id="stock"
				type="number"
				bind:value={formData.stock}
				min="0"
				placeholder="0"
			/>
		</div>

		<div class="form-group full-width">
			<label>
				<input type="checkbox" bind:checked={formData.active} />
				Activer ce produit immédiatement
			</label>
		</div>
	</div>

	<div class="form-actions">
		<button type="submit" class="btn btn-primary" disabled={isSubmitting}>
			{isSubmitting ? '⏳ Ajout en cours...' : '+ Ajouter Produit'}
		</button>
	</div>
</form>

<style>
	.add-product-form {
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

	.add-product-form h2 {
		margin: 0 0 var(--spacing-lg) 0;
		color: var(--color-accent-teal);
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);
	}

	.form-group.full-width {
		grid-column: 1 / -1;
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

	.form-group input:not([type='checkbox']),
	.form-group textarea,
	.form-group select {
		padding: var(--spacing-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: 1.4rem;
		background: white;
	}

	.form-group input:not([type='checkbox']):focus,
	.form-group textarea:focus,
	.form-group select:focus {
		outline: none;
		border-color: var(--color-accent-teal);
		box-shadow: 0 0 0 3px rgba(43, 138, 138, 0.1);
	}

	.form-group input[type='checkbox'] {
		width: 1.6rem;
		height: 1.6rem;
		cursor: pointer;
		margin-right: var(--spacing-md);
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
	}
</style>
