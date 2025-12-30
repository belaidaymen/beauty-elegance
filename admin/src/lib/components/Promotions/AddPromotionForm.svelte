<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { promotionsStore } from '$lib/stores/promotions_store';
	import { uiStore } from '$lib/stores/ui_store';

	const dispatch = createEventDispatcher();

	const categories = ['Maquillage', 'Cheveux', 'Visage', 'Corps & Bain', 'Deo & Stick'];

	let formData = {
		name: '',
		description: '',
		code: '',
		discountType: 'percentage' as 'percentage' | 'fixed',
		discountValue: 0,
		minPurchaseAmount: undefined,
		startDate: new Date().toISOString().split('T')[0],
		endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
		usageLimit: undefined,
		applicableCategories: [] as string[],
		active: true
	};

	let isSubmitting = false;
	let selectedCategories: Record<string, boolean> = {};

	function toggleCategory(category: string) {
		selectedCategories[category] = !selectedCategories[category];
		formData.applicableCategories = Object.entries(selectedCategories)
			.filter(([_, selected]) => selected)
			.map(([cat, _]) => cat);
	}

	async function handleSubmit() {
		if (!formData.name || !formData.code || !formData.discountValue) {
			uiStore.showNotification('Veuillez remplir tous les champs obligatoires', 'error');
			return;
		}

		isSubmitting = true;
		try {
			const newPromotion = {
				...formData,
				id: `promo${Date.now()}`,
				startDate: new Date(formData.startDate),
				endDate: new Date(formData.endDate),
				usageCount: 0,
				createdAt: new Date()
			};
			promotionsStore.addPromotion(newPromotion);
			dispatch('add', newPromotion);
			formData = {
				name: '',
				description: '',
				code: '',
				discountType: 'percentage',
				discountValue: 0,
				minPurchaseAmount: undefined,
				startDate: new Date().toISOString().split('T')[0],
				endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
				usageLimit: undefined,
				applicableCategories: [],
				active: true
			};
			selectedCategories = {};
		} catch (error) {
			uiStore.showNotification('Erreur lors de la création de la promotion', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form class="add-promotion-form" on:submit|preventDefault={handleSubmit}>
	<h2>Créer une Nouvelle Promotion</h2>

	<div class="form-grid">
		<div class="form-group full-width">
			<label for="name">Nom de la Promotion *</label>
			<input
				id="name"
				type="text"
				bind:value={formData.name}
				placeholder="Ex: Noël 2024"
				required
			/>
		</div>

		<div class="form-group full-width">
			<label for="description">Description</label>
			<textarea
				id="description"
				bind:value={formData.description}
				placeholder="Décrivez votre promotion..."
				rows="2"
			></textarea>
		</div>

		<div class="form-group">
			<label for="code">Code Promo *</label>
			<input
				id="code"
				type="text"
				bind:value={formData.code}
				placeholder="Ex: NOEL24"
				required
				style="text-transform: uppercase"
			/>
		</div>

		<div class="form-group">
			<label for="discountType">Type de Réduction *</label>
			<select id="discountType" bind:value={formData.discountType} required>
				<option value="percentage">Pourcentage (%)</option>
				<option value="fixed">Montant Fixe (DZD)</option>
			</select>
		</div>

		<div class="form-group">
			<label for="discountValue">Valeur de Réduction *</label>
			<input
				id="discountValue"
				type="number"
				bind:value={formData.discountValue}
				min="0"
				step="0.01"
				placeholder="0"
				required
			/>
		</div>

		<div class="form-group">
			<label for="minPurchaseAmount">Achat Minimum (DZD)</label>
			<input
				id="minPurchaseAmount"
				type="number"
				bind:value={formData.minPurchaseAmount}
				min="0"
				placeholder="0 (optionnel)"
			/>
		</div>

		<div class="form-group">
			<label for="startDate">Date de Début *</label>
			<input id="startDate" type="date" bind:value={formData.startDate} required />
		</div>

		<div class="form-group">
			<label for="endDate">Date de Fin *</label>
			<input id="endDate" type="date" bind:value={formData.endDate} required />
		</div>

		<div class="form-group">
			<label for="usageLimit">Limite d'Utilisations</label>
			<input
				id="usageLimit"
				type="number"
				bind:value={formData.usageLimit}
				min="1"
				placeholder="Vide pour illimité"
			/>
		</div>

		<div class="form-group full-width">
			<label>Catégories Applicables</label>
			<div class="categories-list">
				{#each categories as category}
					<label class="category-checkbox">
						<input
							type="checkbox"
							checked={selectedCategories[category] || false}
							on:change={() => toggleCategory(category)}
						/>
						{category}
					</label>
				{/each}
			</div>
		</div>

		<div class="form-group full-width">
			<label>
				<input type="checkbox" bind:checked={formData.active} />
				Activer cette promotion immédiatement
			</label>
		</div>
	</div>

	<div class="form-actions">
		<button type="submit" class="btn btn-primary" disabled={isSubmitting}>
			{isSubmitting ? '⏳ Création en cours...' : '+ Créer Promotion'}
		</button>
	</div>
</form>

<style>
	.add-promotion-form {
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

	.add-promotion-form h2 {
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

	.categories-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: var(--spacing-md);
	}

	.category-checkbox {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		cursor: pointer;
		padding: var(--spacing-md);
		background: var(--color-primary-cream);
		border-radius: var(--radius-md);
		transition: all 0.3s ease;
	}

	.category-checkbox:hover {
		background: var(--color-primary-light-beige);
	}

	.category-checkbox input[type='checkbox'] {
		cursor: pointer;
		width: 1.6rem;
		height: 1.6rem;
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

		.categories-list {
			grid-template-columns: 1fr;
		}
	}
</style>
