<script lang="ts">
	import { ChevronDown, X } from 'lucide-svelte';

	export let filters = {
		search: '',
		category: '',
		stockStatus: 'all',
		alertStatus: 'all',
		minStock: 0,
		maxStock: 1000,
		sortBy: 'critical-first'
	};

	export let categories: string[] = [];
	export let onFilterChange: ((filters: any) => void) | undefined = undefined;

	let isOpen = false;

	const stockStatuses = [
		{ value: 'all', label: 'All Status' },
		{ value: 'optimal', label: 'Optimal' },
		{ value: 'low', label: 'Low Stock' },
		{ value: 'critical', label: 'Critical' },
		{ value: 'out', label: 'Out of Stock' },
		{ value: 'upcoming', label: 'Upcoming' }
	];

	const alertStatuses = [
		{ value: 'all', label: 'All Alerts' },
		{ value: 'active', label: 'Alert Active' },
		{ value: 'inactive', label: 'No Alert' },
		{ value: 'triggered', label: 'Alert Triggered' }
	];

	const sortOptions = [
		{ value: 'critical-first', label: 'Critical First' },
		{ value: 'low-first', label: 'Low Stock First' },
		{ value: 'optimal-first', label: 'Optimal First' },
		{ value: 'name-asc', label: 'Name: A to Z' },
		{ value: 'name-desc', label: 'Name: Z to A' },
		{ value: 'last-restocked', label: 'Recently Restocked' }
	];

	const handleSearch = (value: string) => {
		filters.search = value;
		onFilterChange?.(filters);
	};

	const handleCategoryChange = (value: string) => {
		filters.category = value === filters.category ? '' : value;
		onFilterChange?.(filters);
	};

	const handleStatusChange = (value: string) => {
		filters.stockStatus = value;
		onFilterChange?.(filters);
	};

	const handleAlertChange = (value: string) => {
		filters.alertStatus = value;
		onFilterChange?.(filters);
	};

	const handleSortChange = (value: string) => {
		filters.sortBy = value;
		onFilterChange?.(filters);
	};

	const handleStockRangeChange = () => {
		onFilterChange?.(filters);
	};

	const resetFilters = () => {
		filters = {
			search: '',
			category: '',
			stockStatus: 'all',
			alertStatus: 'all',
			minStock: 0,
			maxStock: 1000,
			sortBy: 'critical-first'
		};
		onFilterChange?.(filters);
	};

	const hasActiveFilters = () => {
		return (
			filters.search ||
			filters.category ||
			filters.stockStatus !== 'all' ||
			filters.alertStatus !== 'all' ||
			filters.minStock > 0 ||
			filters.maxStock < 1000 ||
			filters.sortBy !== 'critical-first'
		);
	};
</script>

<div class="filter-container">
	<div class="filter-search-wrapper">
		<input
			type="text"
			placeholder="Search by product name or SKU..."
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
					filters.category ? 1 : 0,
					filters.stockStatus !== 'all' ? 1 : 0,
					filters.alertStatus !== 'all' ? 1 : 0,
					filters.minStock > 0 || filters.maxStock < 1000 ? 1 : 0,
					filters.sortBy !== 'critical-first' ? 1 : 0
				].reduce((a, b) => a + b, 0)}
			</span>
		{/if}
	</button>

	{#if isOpen}
		<div class="filter-panel">
			<!-- Category Filter -->
			{#if categories.length > 0}
				<div class="filter-section">
					<h3 class="filter-title">Category</h3>
					<div class="filter-options">
						<label class="checkbox-label">
							<input
								type="radio"
								name="category"
								value=""
								checked={filters.category === ''}
								on:change={() => handleCategoryChange('')}
							/>
							<span>All Categories</span>
						</label>
						{#each categories as cat}
							<label class="checkbox-label">
								<input
									type="radio"
									name="category"
									value={cat}
									checked={filters.category === cat}
									on:change={() => handleCategoryChange(cat)}
								/>
								<span>{cat}</span>
							</label>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Stock Status Filter -->
			<div class="filter-section">
				<h3 class="filter-title">Stock Status</h3>
				<select
					value={filters.stockStatus}
					on:change={(e) => handleStatusChange(e.currentTarget.value)}
					class="filter-select"
				>
					{#each stockStatuses as status}
						<option value={status.value}>{status.label}</option>
					{/each}
				</select>
			</div>

			<!-- Alert Status Filter -->
			<div class="filter-section">
				<h3 class="filter-title">Alert Status</h3>
				<select
					value={filters.alertStatus}
					on:change={(e) => handleAlertChange(e.currentTarget.value)}
					class="filter-select"
				>
					{#each alertStatuses as alert}
						<option value={alert.value}>{alert.label}</option>
					{/each}
				</select>
			</div>

			<!-- Stock Range Filter -->
			<div class="filter-section">
				<h3 class="filter-title">Stock Range</h3>
				<div class="stock-range-inputs">
					<input
						type="number"
						placeholder="Min"
						value={filters.minStock}
						on:change={(e) => {
							filters.minStock = parseInt(e.currentTarget.value) || 0;
							handleStockRangeChange();
						}}
						class="range-input"
					/>
					<span>to</span>
					<input
						type="number"
						placeholder="Max"
						value={filters.maxStock}
						on:change={(e) => {
							filters.maxStock = parseInt(e.currentTarget.value) || 1000;
							handleStockRangeChange();
						}}
						class="range-input"
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

	.filter-options {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		cursor: pointer;
		font-size: 1.4rem;
		color: #666;
		transition: color 0.2s ease;
	}

	.checkbox-label:hover {
		color: #333;
	}

	.checkbox-label input[type='radio'] {
		width: 1.8rem;
		height: 1.8rem;
		cursor: pointer;
		accent-color: #b37777;
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

	.stock-range-inputs {
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
