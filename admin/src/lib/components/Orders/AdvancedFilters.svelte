<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { ChevronDown, X } from 'lucide-svelte';

	interface FilterOptions {
		status: string[];
		dateFrom: string;
		dateTo: string;
		minAmount: number;
		maxAmount: number;
		customer: string;
	}

	export let filters: FilterOptions = {
		status: [],
		dateFrom: '',
		dateTo: '',
		minAmount: 0,
		maxAmount: 10000,
		customer: ''
	};

	export let onApply = (filters: FilterOptions) => {};
	export let onReset = () => {};

	let isExpanded = false;

	const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];

	const toggleStatus = (status: string) => {
		if (filters.status.includes(status)) {
			filters.status = filters.status.filter((s) => s !== status);
		} else {
			filters.status = [...filters.status, status];
		}
	};

	const handleReset = () => {
		filters = {
			status: [],
			dateFrom: '',
			dateTo: '',
			minAmount: 0,
			maxAmount: 10000,
			customer: ''
		};
		onReset();
	};

	const handleApply = () => {
		onApply(filters);
		isExpanded = false;
	};

	const getActiveFilterCount = () => {
		let count = 0;
		if (filters.status.length > 0) count++;
		if (filters.dateFrom) count++;
		if (filters.dateTo) count++;
		if (filters.minAmount > 0) count++;
		if (filters.maxAmount < 10000) count++;
		if (filters.customer) count++;
		return count;
	};
</script>

<div class="filters-container">
	<button
		class="filters-toggle"
		class:has-active-filters={getActiveFilterCount() > 0}
		on:click={() => (isExpanded = !isExpanded)}
	>
		<svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
		</svg>
		<span class="filter-label">Advanced Filters</span>
		{#if getActiveFilterCount() > 0}
			<span class="filter-badge">{getActiveFilterCount()}</span>
		{/if}
		<div class="chevron-wrapper" class:rotated={isExpanded}>
			<ChevronDown size={18} />
		</div>
	</button>

	{#if isExpanded}
		<div class="filters-panel">
			<div class="filters-grid">
				<!-- Status Filter -->
				<div class="filter-group">
					<fieldset>
						<legend class="filter-label-text">Order Status</legend>
						<div class="status-checkboxes">
							{#each statuses as status}
								<label class="checkbox-label">
									<input
										type="checkbox"
										checked={filters.status.includes(status)}
										on:change={() => toggleStatus(status)}
										class="checkbox-input"
									/>
									<span class="checkbox-text">{status}</span>
								</label>
							{/each}
						</div>
					</fieldset>
				</div>

				<!-- Date Range Filter -->
				<div class="filter-group">
					<fieldset>
						<legend class="filter-label-text">Date Range</legend>
						<div class="date-inputs">
							<div class="date-input-wrapper">
								<label for="date-from" class="input-label">From</label>
								<input
									id="date-from"
									type="date"
									bind:value={filters.dateFrom}
									class="input-field"
								/>
							</div>
							<div class="date-input-wrapper">
								<label for="date-to" class="input-label">To</label>
								<input
									id="date-to"
									type="date"
									bind:value={filters.dateTo}
									class="input-field"
								/>
							</div>
						</div>
					</fieldset>
				</div>

				<!-- Amount Range Filter -->
				<div class="filter-group">
					<fieldset>
						<legend class="filter-label-text">Order Amount</legend>
						<div class="amount-inputs">
							<div class="amount-input-wrapper">
								<label for="min-amount" class="input-label">Min</label>
								<div class="input-with-currency">
									<span class="currency-prefix">DZD</span>
									<input
										id="min-amount"
										type="number"
										bind:value={filters.minAmount}
										class="input-field"
										placeholder="0"
									/>
								</div>
							</div>
							<div class="amount-input-wrapper">
								<label for="max-amount" class="input-label">Max</label>
								<div class="input-with-currency">
									<span class="currency-prefix">DZD</span>
									<input
										id="max-amount"
										type="number"
										bind:value={filters.maxAmount}
										class="input-field"
										placeholder="10000"
									/>
								</div>
							</div>
						</div>
					</fieldset>
				</div>

				<!-- Customer Filter -->
				<div class="filter-group">
					<label for="customer-search" class="filter-label-text">Customer Name</label>
					<input
						id="customer-search"
						type="text"
						bind:value={filters.customer}
						placeholder="Search by customer name..."
						class="input-field"
					/>
				</div>
			</div>

			<div class="filter-actions">
				<Button variant="secondary" size="small" on:click={handleReset}>
					<X size={16} />
					Reset Filters
				</Button>
				<Button variant="primary" size="small" on:click={handleApply}>
					Apply Filters
				</Button>
			</div>
		</div>
	{/if}
</div>

<style>
	.filters-container {
		position: relative;
		margin-bottom: 2rem;
	}

	.filters-toggle {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 1rem 1.5rem;
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border: 2px solid #e0c8c8;
		border-radius: 0.8rem;
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: 'Andada Pro', serif;
	}

	.filters-toggle:hover {
		border-color: #b37777;
		background: linear-gradient(135deg, #fff 0%, #fff9f9 100%);
	}

	.filters-toggle.has-active-filters {
		border-color: #b37777;
		background: linear-gradient(135deg, #fffaf9 0%, #fff9f9 100%);
	}

	.filter-icon {
		width: 2rem;
		height: 2rem;
		color: #b37777;
	}

	.filter-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2.2rem;
		height: 2.2rem;
		padding: 0.2rem 0.6rem;
		background: #b37777;
		color: white;
		border-radius: 1.1rem;
		font-size: 1.2rem;
		font-weight: 700;
		font-family: inherit;
	}

	.chevron-wrapper {
		color: #b37777;
		transition: transform 0.3s ease;
		margin-left: auto;
		display: flex;
		align-items: center;
	}

	.chevron-wrapper.rotated {
		transform: rotate(180deg);
	}

	.filters-panel {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 0.8rem;
		background: white;
		border: 2px solid #e0c8c8;
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		z-index: 100;
		animation: slideDown 0.3s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-1rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.filters-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.filter-label-text {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-family: 'Andada Pro', serif;
	}

	.status-checkboxes {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		cursor: pointer;
		padding: 0.6rem 0.8rem;
		border-radius: 0.4rem;
		transition: background-color 0.2s ease;
	}

	.checkbox-label:hover {
		background-color: rgba(179, 119, 119, 0.08);
	}

	.checkbox-input {
		width: 1.8rem;
		height: 1.8rem;
		cursor: pointer;
		accent-color: #b37777;
	}

	.checkbox-text {
		font-size: 1.3rem;
		color: #333;
		user-select: none;
	}

	.date-inputs,
	.amount-inputs {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.date-input-wrapper,
	.amount-input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.input-label {
		font-size: 1.2rem;
		font-weight: 500;
		color: #666;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.input-field {
		padding: 0.8rem 1rem;
		border: 1.5px solid #d9c8c8;
		border-radius: 0.6rem;
		font-size: 1.3rem;
		color: #333;
		background: #faf9f8;
		font-family: inherit;
		transition: all 0.2s ease;
	}

	.input-field:focus {
		outline: none;
		border-color: #b37777;
		background: white;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.input-with-currency {
		display: flex;
		align-items: center;
		position: relative;
	}

	.currency-prefix {
		position: absolute;
		left: 1rem;
		font-size: 1.2rem;
		font-weight: 600;
		color: #b37777;
	}

	.input-with-currency .input-field {
		padding-left: 4rem;
	}

	.filter-actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		padding-top: 1rem;
		border-top: 1px solid #ede5e2;
	}

	@media (max-width: 768px) {
		.filters-panel {
			position: fixed;
			top: auto;
			bottom: 0;
			left: 0;
			right: 0;
			border-radius: 1.6rem 1.6rem 0 0;
			margin-top: 0;
			max-height: 70vh;
			overflow-y: auto;
		}

		.filters-grid {
			grid-template-columns: 1fr;
		}

		.status-checkboxes {
			grid-template-columns: repeat(3, 1fr);
		}

		.filter-actions {
			flex-direction: column;
		}
	}
</style>
