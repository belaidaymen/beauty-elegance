<script lang="ts">
	import { productsStore } from '$lib/stores/products_store';
	import { uiStore } from '$lib/stores/ui_store';
	import type { Product } from '$lib/stores/products_store';

	export let product: Product;
	export let categories: string[] = [];

	let isEditing = false;
	let editData = { ...product };

	function toggleEdit() {
		isEditing = !isEditing;
		editData = { ...product };
	}

	function saveChanges() {
		productsStore.updateProduct(product.id, editData);
		uiStore.showNotification('Produit mis à jour', 'success');
		isEditing = false;
	}

	function deleteProduct() {
		if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
			productsStore.deleteProduct(product.id);
			uiStore.showNotification('Produit supprimé', 'success');
		}
	}

	function toggleActive() {
		productsStore.updateProduct(product.id, { active: !product.active });
		uiStore.showNotification(product.active ? 'Produit désactivé' : 'Produit activé', 'success');
	}
</script>

<div class="product-card" class:inactive={!product.active}>
	{#if isEditing}
		<div class="edit-mode">
			<div class="form-group">
				<label>Nom</label>
				<input type="text" bind:value={editData.name} />
			</div>

			<div class="form-group">
				<label>Description</label>
				<textarea bind:value={editData.description} rows="2"></textarea>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label>Prix</label>
					<input type="number" bind:value={editData.price} min="0" />
				</div>

				<div class="form-group">
					<label>Catégorie</label>
					<select bind:value={editData.category}>
						{#each categories as cat}
							<option value={cat}>{cat}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="edit-actions">
				<button class="btn btn-primary" on:click={saveChanges}>✓ Sauvegarder</button>
				<button class="btn btn-secondary" on:click={toggleEdit}>✕ Annuler</button>
			</div>
		</div>
	{:else}
		<div class="product-image">
			<img src={product.images[0]} alt={product.name} />
			<div class="product-badge" class:active={product.active}>
				{product.active ? '✓ Actif' : '✕ Inactif'}
			</div>
		</div>

		<div class="product-content">
			<div class="product-category">{product.category}</div>
			<h3 class="product-name">{product.name}</h3>
			<p class="product-description">{product.description}</p>

			<div class="product-footer">
				<div class="price-section">
					<p class="price">{new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(product.price)} DZD</p>
					<p class="sku">SKU: {product.sku}</p>
				</div>

				<div class="stock-badge" class:in-stock={product.stock > 0} class:out-of-stock={product.stock === 0}>
					{product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
				</div>
			</div>

			<div class="product-actions">
				<button class="action-btn edit-btn" on:click={toggleEdit} title="Modifier">
					✏️
				</button>
				<button class="action-btn toggle-btn" on:click={toggleActive} title={product.active ? 'Désactiver' : 'Activer'}>
					{product.active ? '👁️' : '🙈'}
				</button>
				<button class="action-btn delete-btn" on:click={deleteProduct} title="Supprimer">
					🗑️
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.product-card {
		background: white;
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		overflow: hidden;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.product-card:hover {
		box-shadow: var(--shadow-lg);
		transform: translateY(-4px);
	}

	.product-card.inactive {
		opacity: 0.7;
	}

	.product-image {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
		overflow: hidden;
		background: var(--color-primary-cream);
	}

	.product-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.product-card:hover .product-image img {
		transform: scale(1.05);
	}

	.product-badge {
		position: absolute;
		top: var(--spacing-md);
		right: var(--spacing-md);
		padding: 0.4rem 0.8rem;
		border-radius: var(--radius-md);
		font-size: 1.2rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.product-badge.active {
		background: rgba(39, 174, 96, 0.9);
		color: white;
	}

	.product-badge:not(.active) {
		background: rgba(231, 76, 60, 0.9);
		color: white;
	}

	.product-content {
		padding: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		flex: 1;
	}

	.product-category {
		font-size: 1.1rem;
		color: var(--color-accent-teal);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	.product-name {
		margin: 0;
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--color-text-dark);
		line-height: 1.3;
	}

	.product-description {
		margin: 0;
		font-size: 1.3rem;
		color: var(--color-text-lighter);
		line-height: 1.4;
	}

	.product-footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: var(--spacing-md);
		padding: var(--spacing-md) 0;
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
	}

	.price-section {
		flex: 1;
	}

	.price {
		margin: 0;
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--color-accent-burgundy);
	}

	.sku {
		margin: var(--spacing-xs) 0 0 0;
		font-size: 1.2rem;
		color: var(--color-text-lighter);
	}

	.stock-badge {
		padding: 0.5rem 1rem;
		border-radius: var(--radius-md);
		font-size: 1.2rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.stock-badge.in-stock {
		background: rgba(39, 174, 96, 0.15);
		color: var(--color-success);
	}

	.stock-badge.out-of-stock {
		background: rgba(231, 76, 60, 0.15);
		color: var(--color-error);
	}

	.product-actions {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: center;
	}

	.action-btn {
		background: var(--color-primary-light-beige);
		border: none;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: 1.5rem;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.action-btn:hover {
		transform: scale(1.1);
	}

	.edit-btn:hover {
		background: rgba(43, 138, 138, 0.15);
	}

	.toggle-btn:hover {
		background: rgba(52, 152, 219, 0.15);
	}

	.delete-btn:hover {
		background: rgba(231, 76, 60, 0.15);
	}

	.edit-mode {
		padding: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
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
	}

	.form-group input,
	.form-group textarea,
	.form-group select {
		padding: var(--spacing-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: 1.4rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-md);
	}

	.edit-actions {
		display: flex;
		gap: var(--spacing-md);
	}

	.edit-actions button {
		flex: 1;
	}

	@media (max-width: 480px) {
		.product-card {
			border: none;
			box-shadow: none;
		}

		.action-btn {
			width: 3rem;
			height: 3rem;
			font-size: 1.3rem;
		}
	}
</style>
