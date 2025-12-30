<script lang="ts">
	import { promotionsStore } from '$lib/stores/promotions_store';
	import { uiStore } from '$lib/stores/ui_store';
	import type { Promotion } from '$lib/stores/promotions_store';

	export let promotion: Promotion;

	function toggleActive() {
		promotionsStore.updatePromotion(promotion.id, { active: !promotion.active });
		uiStore.showNotification(promotion.active ? 'Promotion désactivée' : 'Promotion activée', 'success');
	}

	function copyCode() {
		navigator.clipboard.writeText(promotion.code);
		uiStore.showNotification('Code copié dans le presse-papiers', 'success');
	}

	function deletePromotion() {
		if (confirm('Êtes-vous sûr de vouloir supprimer cette promotion ?')) {
			promotionsStore.deletePromotion(promotion.id);
			uiStore.showNotification('Promotion supprimée', 'success');
		}
	}

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('fr-FR');
	}

	function isExpired(): boolean {
		return new Date() > promotion.endDate;
	}

	function daysRemaining(): number {
		const diff = promotion.endDate.getTime() - new Date().getTime();
		return Math.ceil(diff / (1000 * 60 * 60 * 24));
	}

	function getUsagePercentage(): number {
		if (!promotion.usageLimit) return 0;
		return (promotion.usageCount / promotion.usageLimit) * 100;
	}
</script>

<div class="promotion-card" class:inactive={!promotion.active} class:expired={isExpired()}>
	<div class="card-header">
		<div class="header-left">
			<h3 class="promo-name">{promotion.name}</h3>
			<p class="promo-description">{promotion.description}</p>
		</div>
		<div class="status-badge" class:active={promotion.active} class:expired={isExpired()}>
			{#if isExpired()}
				Expiré
			{:else if promotion.active}
				✓ Actif
			{:else}
				✕ Inactif
			{/if}
		</div>
	</div>

	<div class="promo-code">
		<span class="code-label">Code Promo</span>
		<button class="code-display" on:click={copyCode}>
			<span class="code">{promotion.code}</span>
			<span class="copy-icon">📋</span>
		</button>
	</div>

	<div class="promo-details">
		<div class="detail-item">
			<span class="detail-label">Réduction</span>
			<span class="detail-value">
				{promotion.discountValue}{promotion.discountType === 'percentage' ? '%' : ' DZD'}
			</span>
		</div>

		<div class="detail-item">
			<span class="detail-label">Dates</span>
			<span class="detail-value">
				{formatDate(promotion.startDate)} à {formatDate(promotion.endDate)}
			</span>
		</div>

		{#if promotion.minPurchaseAmount}
			<div class="detail-item">
				<span class="detail-label">Achat Min</span>
				<span class="detail-value">{promotion.minPurchaseAmount} DZD</span>
			</div>
		{/if}
	</div>

	{#if !isExpired()}
		<div class="days-remaining">
			<span class="remaining-label">{daysRemaining()} jours restants</span>
		</div>
	{/if}

	{#if promotion.usageLimit}
		<div class="usage-section">
			<div class="usage-header">
				<span class="usage-label">Utilisations</span>
				<span class="usage-count">{promotion.usageCount} / {promotion.usageLimit}</span>
			</div>
			<div class="usage-bar">
				<div class="usage-progress" style="width: {getUsagePercentage()}%"></div>
			</div>
		</div>
	{:else}
		<div class="unlimited-badge">
			Utilisations illimitées: {promotion.usageCount} utilisations
		</div>
	{/if}

	{#if promotion.applicableCategories && promotion.applicableCategories.length > 0}
		<div class="categories-section">
			<span class="section-label">Catégories:</span>
			<div class="tags">
				{#each promotion.applicableCategories as category}
					<span class="tag">{category}</span>
				{/each}
			</div>
		</div>
	{/if}

	<div class="card-actions">
		<button class="action-btn toggle-btn" on:click={toggleActive} title={promotion.active ? 'Désactiver' : 'Activer'}>
			{promotion.active ? '👁️ Désactiver' : '🙈 Activer'}
		</button>
		<button class="action-btn delete-btn" on:click={deletePromotion} title="Supprimer">
			🗑️ Supprimer
		</button>
	</div>
</div>

<style>
	.promotion-card {
		background: white;
		border-radius: var(--radius-lg);
		border: 2px solid var(--color-accent-teal);
		padding: var(--spacing-lg);
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.promotion-card:hover {
		box-shadow: var(--shadow-lg);
		transform: translateY(-4px);
	}

	.promotion-card.inactive {
		opacity: 0.7;
		border-color: var(--color-text-lighter);
	}

	.promotion-card.expired {
		border-color: var(--color-error);
		background: rgba(231, 76, 60, 0.05);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--spacing-md);
	}

	.header-left {
		flex: 1;
	}

	.promo-name {
		margin: 0 0 var(--spacing-sm) 0;
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--color-text-dark);
	}

	.promo-description {
		margin: 0;
		font-size: 1.3rem;
		color: var(--color-text-lighter);
	}

	.status-badge {
		padding: 0.5rem 1rem;
		border-radius: var(--radius-md);
		font-size: 1.2rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.status-badge.active {
		background: rgba(39, 174, 96, 0.15);
		color: var(--color-success);
	}

	.status-badge:not(.active) {
		background: rgba(231, 76, 60, 0.15);
		color: var(--color-error);
	}

	.status-badge.expired {
		background: rgba(231, 76, 60, 0.25);
		color: var(--color-error);
	}

	.promo-code {
		background: var(--color-primary-light-beige);
		padding: var(--spacing-lg);
		border-radius: var(--radius-md);
		text-align: center;
	}

	.code-label {
		display: block;
		font-size: 1.2rem;
		color: var(--color-text-lighter);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--spacing-sm);
		font-weight: 600;
	}

	.code-display {
		background: white;
		border: 2px dashed var(--color-accent-teal);
		border-radius: var(--radius-md);
		padding: var(--spacing-md) var(--spacing-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-md);
		width: 100%;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1.6rem;
	}

	.code-display:hover {
		background: var(--color-accent-teal);
		color: white;
		border-color: var(--color-accent-teal);
	}

	.code {
		font-weight: 700;
		font-family: 'Courier New', monospace;
		letter-spacing: 0.1em;
		flex: 1;
	}

	.copy-icon {
		font-size: 1.8rem;
	}

	.promo-details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: var(--spacing-md);
	}

	.detail-item {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		background: var(--color-primary-cream);
		border-radius: var(--radius-md);
	}

	.detail-label {
		font-size: 1.2rem;
		color: var(--color-text-lighter);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	.detail-value {
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--color-accent-teal);
	}

	.days-remaining {
		background: rgba(52, 152, 219, 0.15);
		padding: var(--spacing-md);
		border-radius: var(--radius-md);
		text-align: center;
	}

	.remaining-label {
		color: var(--color-info);
		font-weight: 600;
		font-size: 1.4rem;
	}

	.usage-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.usage-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.usage-label {
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--color-text-dark);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.usage-count {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--color-accent-teal);
	}

	.usage-bar {
		height: 8px;
		background: var(--color-border);
		border-radius: 4px;
		overflow: hidden;
	}

	.usage-progress {
		height: 100%;
		background: linear-gradient(90deg, var(--color-accent-teal), var(--color-accent-teal-light));
		transition: width 0.3s ease;
	}

	.unlimited-badge {
		background: rgba(39, 174, 96, 0.15);
		padding: var(--spacing-md);
		border-radius: var(--radius-md);
		color: var(--color-success);
		font-weight: 600;
		text-align: center;
		font-size: 1.3rem;
	}

	.categories-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.section-label {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--color-text-dark);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.tag {
		display: inline-block;
		padding: 0.4rem 0.8rem;
		background: var(--color-primary-light-beige);
		color: var(--color-accent-teal);
		border-radius: var(--radius-md);
		font-size: 1.2rem;
		font-weight: 600;
	}

	.card-actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-md);
	}

	.action-btn {
		padding: var(--spacing-md) var(--spacing-lg);
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: 1.4rem;
		font-weight: 600;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.toggle-btn {
		background: rgba(43, 138, 138, 0.15);
		color: var(--color-accent-teal);
	}

	.toggle-btn:hover {
		background: var(--color-accent-teal);
		color: white;
	}

	.delete-btn {
		background: rgba(231, 76, 60, 0.15);
		color: var(--color-error);
	}

	.delete-btn:hover {
		background: var(--color-error);
		color: white;
	}

	@media (max-width: 480px) {
		.promo-details {
			grid-template-columns: 1fr;
		}

		.card-actions {
			grid-template-columns: 1fr;
		}
	}
</style>
