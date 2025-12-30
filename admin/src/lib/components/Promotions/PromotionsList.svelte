<script lang="ts">
	import PromotionCard from './PromotionCard.svelte';
	import type { Promotion } from '$lib/stores/promotions_store';

	export let filteredPromotions: Promotion[] = [];
</script>

<div class="promotions-list-container">
	{#if filteredPromotions.length > 0}
		<div class="promotions-grid">
			{#each filteredPromotions as promotion (promotion.id)}
				<PromotionCard {promotion} />
			{/each}
		</div>
	{:else}
		<div class="no-data">
			<p>🎉 Aucune promotion trouvée</p>
		</div>
	{/if}
</div>

<style>
	.promotions-list-container {
		background: white;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
		padding: var(--spacing-lg);
	}

	.promotions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: var(--spacing-lg);
	}

	.no-data {
		padding: var(--spacing-2xl);
		text-align: center;
		color: var(--color-text-lighter);
		font-size: 1.6rem;
	}

	@media (max-width: 768px) {
		.promotions-grid {
			grid-template-columns: 1fr;
		}

		.promotions-list-container {
			padding: var(--spacing-md);
		}
	}
</style>
