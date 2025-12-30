<script lang="ts">
	export let searchQuery = '';
	export let statusFilter = 'all';
	export let paymentStatusFilter = 'all';
	export let onSearch: (e: Event) => void = () => {};
	export let onStatusChange: (e: Event) => void = () => {};
	export let onPaymentChange: (e: Event) => void = () => {};

	const statusOptions = [
		{ value: 'all', label: 'Tous les statuts' },
		{ value: 'pending', label: 'En attente' },
		{ value: 'confirmed', label: 'Confirmée' },
		{ value: 'processing', label: 'En cours' },
		{ value: 'shipped', label: 'Expédiée' },
		{ value: 'delivered', label: 'Livrée' },
		{ value: 'cancelled', label: 'Annulée' }
	];

	const paymentOptions = [
		{ value: 'all', label: 'Tous les paiements' },
		{ value: 'pending', label: 'En attente' },
		{ value: 'completed', label: 'Complété' },
		{ value: 'failed', label: 'Échoué' }
	];
</script>

<section class="filters-section">
	<div class="filter-row">
		<div class="search-wrapper">
			<span class="search-icon">🔍</span>
			<input
				type="text"
				placeholder="Rechercher par numéro, client ou email..."
				value={searchQuery}
				on:input={onSearch}
				class="search-input"
			/>
		</div>

		<select value={statusFilter} on:change={onStatusChange} class="filter-select">
			{#each statusOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>

		<select value={paymentStatusFilter} on:change={onPaymentChange} class="filter-select">
			{#each paymentOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>

		<button class="btn btn-secondary">🔄 Réinitialiser</button>
	</div>
</section>

<style>
	.filters-section {
		background: white;
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
	}

	.filter-row {
		display: flex;
		gap: var(--spacing-md);
		align-items: center;
		flex-wrap: wrap;
	}

	.search-wrapper {
		flex: 1;
		min-width: 250px;
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: var(--spacing-md);
		font-size: 1.6rem;
		color: var(--color-text-lighter);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 4rem !important;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: 1.4rem;
		background: white;
	}

	.filter-select {
		padding: var(--spacing-md) var(--spacing-lg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: white;
		cursor: pointer;
		font-size: 1.4rem;
		color: var(--color-text-dark);
		min-width: 180px;
	}

	@media (max-width: 768px) {
		.filter-row {
			flex-direction: column;
		}

		.search-wrapper {
			min-width: 100%;
		}

		.filter-select {
			width: 100%;
			min-width: 100%;
		}

		button {
			width: 100%;
		}
	}
</style>
