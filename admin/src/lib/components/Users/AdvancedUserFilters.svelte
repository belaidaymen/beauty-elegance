<script lang="ts">
	import { ChevronDown, X } from 'lucide-svelte';

	export let filters = {
		search: '',
		status: 'all',
		minSpending: 0,
		maxSpending: 100000,
		minOrders: 0,
		maxOrders: 100,
		joinDateFrom: '',
		joinDateTo: '',
		sortBy: 'recent-join'
	};

	export let onFilterChange: ((filters: any) => void) | undefined = undefined;

	let isOpen = false;

	const statusOptions = [
		{ value: 'all', label: 'All Status' },
		{ value: 'active', label: 'Active' },
		{ value: 'inactive', label: 'Inactive' }
	];

	const sortOptions = [
		{ value: 'recent-join', label: 'Recently Joined' },
		{ value: 'oldest-join', label: 'Oldest First' },
		{ value: 'highest-spender', label: 'Highest Spenders' },
		{ value: 'lowest-spender', label: 'Lowest Spenders' },
		{ value: 'most-orders', label: 'Most Orders' },
		{ value: 'least-orders', label: 'Least Orders' },
		{ value: 'name-asc', label: 'Name: A to Z' },
		{ value: 'name-desc', label: 'Name: Z to A' }
	];

	const handleSearch = (value: string) => {
		filters.search = value;
		onFilterChange?.(filters);
	};

	const handleStatusChange = (value: string) => {
		filters.status = value;
		onFilterChange?.(filters);
	};

	const handleSortChange = (value: string) => {
		filters.sortBy = value;
		onFilterChange?.(filters);
	};

	const handleSpendingChange = () => {
		onFilterChange?.(filters);
	};

	const handleOrdersChange = () => {
		onFilterChange?.(filters);
	};

	const handleDateChange = () => {
		onFilterChange?.(filters);
	};

	const resetFilters = () => {
		filters = {
			search: '',
			status: 'all',
			minSpending: 0,
			maxSpending: 100000,
			minOrders: 0,
			maxOrders: 100,
			joinDateFrom: '',
			joinDateTo: '',
			sortBy: 'recent-join'
		};
		onFilterChange?.(filters);
	};

	const hasActiveFilters = () => {
		return (
			filters.search ||
			filters.status !== 'all' ||
			filters.minSpending > 0 ||
			filters.maxSpending < 100000 ||
			filters.minOrders > 0 ||
			filters.maxOrders < 100 ||
			filters.joinDateFrom ||
			filters.joinDateTo ||
			filters.sortBy !== 'recent-join'
		);
	};
</script>

<div class="filter-container">
	<div class="filter-search-wrapper">
		<input
			type="text"
			placeholder="Search by name or email..."
			value={filters.search}
			on:input={(e) => handleSearch(e.currentTarget.value)}
			class="search-input"
		/>
		{#if filters.search}
			<button class="clear-search" on:click={() => handleSearch('')} aria-label="Clear search">
				<X size={18} />
			</button>
		{/if}
	</div>

	<button class="filter-toggle" class:active={isOpen} on:click={() => (isOpen = !isOpen)}>
		<span>Advanced Filters</span>
		<div class="chevron-icon" class:rotated={isOpen}>
			<ChevronDown size={20} />
		</div>
		{#if hasActiveFilters()}
			<span class="filter-badge">
				{[
					filters.status !== 'all' ? 1 : 0,
					filters.minSpending > 0 || filters.maxSpending < 100000 ? 1 : 0,
					filters.minOrders > 0 || filters.maxOrders < 100 ? 1 : 0,
					filters.joinDateFrom || filters.joinDateTo ? 1 : 0,
					filters.sortBy !== 'recent-join' ? 1 : 0
				].reduce((a, b) => a + b, 0)}
			</span>
		{/if}
	</button>

	{#if isOpen}
		<div class="filter-panel">
			<!-- Status Filter -->
			<div class="filter-section">
				<h3 class="filter-title">Account Status</h3>
				<select
					value={filters.status}
					on:change={(e) => handleStatusChange(e.currentTarget.value)}
					class="filter-select"
				>
					{#each statusOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>

			<!-- Spending Filter -->
			<div class="filter-section">
				<h3 class="filter-title">Total Spending (DZD)</h3>
				<div class="range-inputs">
					<input
						type="number"
						placeholder="Min"
						value={filters.minSpending}
						on:change={(e) => {
							filters.minSpending = parseInt(e.currentTarget.value) || 0;
							handleSpendingChange();
						}}
						class="range-input"
					/>
					<span>to</span>
					<input
						type="number"
						placeholder="Max"
						value={filters.maxSpending}
						on:change={(e) => {
							filters.maxSpending = parseInt(e.currentTarget.value) || 100000;
							handleSpendingChange();
						}}
						class="range-input"
					/>
				</div>
			</div>

			<!-- Orders Filter -->
			<div class="filter-section">
				<h3 class="filter-title">Number of Orders</h3>
				<div class="range-inputs">
					<input
						type="number"
						placeholder="Min"
						value={filters.minOrders}
						on:change={(e) => {
							filters.minOrders = parseInt(e.currentTarget.value) || 0;
							handleOrdersChange();
						}}
						class="range-input"
					/>
					<span>to</span>
					<input
						type="number"
						placeholder="Max"
						value={filters.maxOrders}
						on:change={(e) => {
							filters.maxOrders = parseInt(e.currentTarget.value) || 100;
							handleOrdersChange();
						}}
						class="range-input"
					/>
				</div>
			</div>

			<!-- Join Date Filter -->
			<div class="filter-section">
				<h3 class="filter-title">Join Date Range</h3>
				<div class="date-inputs">
					<input
						type="date"
						value={filters.joinDateFrom}
						on:change={(e) => {
							filters.joinDateFrom = e.currentTarget.value;
							handleDateChange();
						}}
						class="date-input"
						placeholder="From"
					/>
					<span>—</span>
					<input
						type="date"
						value={filters.joinDateTo}
						on:change={(e) => {
							filters.joinDateTo = e.currentTarget.value;
							handleDateChange();
						}}
						class="date-input"
						placeholder="To"
					/>
				</div>
			</div>

			<!-- Sort Option -->
			<div class="filter-section">
				<h3 class="filter-title">Sort By</h3>
				<select
					value={filters.sortBy}
					on:change={(e) => handleSortChange(e.currentTarget.value)}
					class="filter-select"
				>
					{#each sortOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>

			<!-- Reset Button -->
			{#if hasActiveFilters()}
				<button class="reset-button" on:click={resetFilters}>Reset All Filters</button>
			{/if}
		</div>
	{/if}
</div>

<style>
	.filter-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.filter-search-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-input {
		flex: 1;
		padding: 1rem 1.5rem;
		border: 2px solid #e8e0db;
		border-radius: 0.8rem;
		font-size: 1.5rem;
		color: #333;
		background: #fff;
		transition: all 0.3s ease;
		font-family: inherit;
	}

	.search-input:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 4px rgba(179, 119, 119, 0.1);
	}

	.clear-search {
		position: absolute;
		right: 1.5rem;
		background: none;
		border: none;
		color: #999;
		cursor: pointer;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.clear-search:hover {
		color: #b37777;
	}

	.filter-toggle {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.8rem 1.5rem;
		background: linear-gradient(135deg, #f5f0ed 0%, #faf8f6 100%);
		border: 2px solid #e8e0db;
		border-radius: 0.8rem;
		font-size: 1.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
		color: #333;
	}

	.filter-toggle:hover {
		border-color: #b37777;
		background: linear-gradient(135deg, #faf8f6 0%, #fff 100%);
	}

	.filter-toggle.active {
		border-color: #b37777;
		background: linear-gradient(135deg, #fff 0%, #fafbff 100%);
	}

	.chevron-icon {
		transition: transform 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.chevron-icon.rotated {
		transform: rotate(180deg);
	}

	.filter-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.4rem;
		height: 2.4rem;
		background: linear-gradient(135deg, #d1b2b2 0%, #b37777 100%);
		color: #fff;
		border-radius: 50%;
		font-size: 1.2rem;
		font-weight: 700;
		margin-left: auto;
	}

	.filter-panel {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: 2rem;
		padding: 2rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border: 2px solid #e8e0db;
		border-radius: 0.8rem;
		animation: slideDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
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

	.filter-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.filter-title {
		font-size: 1.4rem;
		font-weight: 700;
		color: #333;
		margin: 0;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.08em;
	}

	.filter-select {
		padding: 0.8rem 1rem;
		border: 2px solid #e8e0db;
		border-radius: 0.6rem;
		font-size: 1.4rem;
		color: #333;
		background: #fff;
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: inherit;
	}

	.filter-select:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.range-inputs {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	.range-input {
		flex: 1;
		padding: 0.8rem 1rem;
		border: 2px solid #e8e0db;
		border-radius: 0.6rem;
		font-size: 1.4rem;
		color: #333;
		background: #fff;
		transition: all 0.2s ease;
	}

	.range-input:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.date-inputs {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	.date-input {
		flex: 1;
		padding: 0.8rem 1rem;
		border: 2px solid #e8e0db;
		border-radius: 0.6rem;
		font-size: 1.4rem;
		color: #333;
		background: #fff;
		transition: all 0.2s ease;
		font-family: inherit;
	}

	.date-input:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.reset-button {
		grid-column: 1 / -1;
		padding: 1rem;
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
		border: 1px solid rgba(201, 68, 68, 0.3);
		border-radius: 0.6rem;
		font-size: 1.4rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.reset-button:hover {
		background: rgba(201, 68, 68, 0.2);
		border-color: rgba(201, 68, 68, 0.5);
	}

	@media (max-width: 768px) {
		.filter-panel {
			grid-template-columns: 1fr;
		}

		.filter-container {
			margin-bottom: 2rem;
		}
	}
</style>
