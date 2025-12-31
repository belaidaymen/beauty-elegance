<script lang="ts">
	import { ChevronDown, X } from 'lucide-svelte';

	export let categories: string[] = [];
	export let filters: {
		search: string;
		category: string;
		minPrice: number;
		maxPrice: number;
		stockStatus: string;
		sortBy: string;
	} = {
		search: '',
		category: '',
		minPrice: 0,
		maxPrice: 100000,
		stockStatus: '',
		sortBy: 'newest'
	};
	export let onFilterChange: ((filters: any) => void) | undefined = undefined;

	let isOpen = false;
	let priceRange = [filters.minPrice, filters.maxPrice];

	const handleSearch = (value: string) => {
		filters.search = value;
		onFilterChange?.(filters);
	};

	const handleCategoryChange = (value: string) => {
		filters.category = value === filters.category ? '' : value;
		onFilterChange?.(filters);
	};

	const handleStockStatusChange = (value: string) => {
		filters.stockStatus = value === filters.stockStatus ? '' : value;
		onFilterChange?.(filters);
	};

	const handleSortChange = (value: string) => {
		filters.sortBy = value;
		onFilterChange?.(filters);
	};

	const handlePriceChange = () => {
		filters.minPrice = priceRange[0];
		filters.maxPrice = priceRange[1];
		onFilterChange?.(filters);
	};

	const handleMinPriceInput = (value: number) => {
		filters.minPrice = value;
		priceRange[0] = value;
		onFilterChange?.(filters);
	};

	const handleMaxPriceInput = (value: number) => {
		filters.maxPrice = value;
		priceRange[1] = value;
		onFilterChange?.(filters);
	};

	const resetFilters = () => {
		filters = {
			search: '',
			category: '',
			minPrice: 0,
			maxPrice: 100000,
			stockStatus: '',
			sortBy: 'newest'
		};
		priceRange = [0, 100000];
		onFilterChange?.(filters);
	};

	const hasActiveFilters = () => {
		return (
			filters.search ||
			filters.category ||
			filters.minPrice > 0 ||
			filters.maxPrice < 100000 ||
			filters.stockStatus ||
			filters.sortBy !== 'newest'
		);
	};
</script>

<div class="filter-container">
	<div class="filter-search">
		<input
			type="text"
			placeholder="Search products..."
			value={filters.search}
			on:input={(e) => handleSearch(e.currentTarget.value)}
			class="search-input"
		/>
		{#if filters.search}
			<button
				class="clear-search"
				on:click={() => handleSearch('')}
				aria-label="Clear search"
			>
				<X size={18} />
			</button>
		{/if}
	</div>

	<button
		class="filter-toggle"
		class:active={isOpen}
		on:click={() => (isOpen = !isOpen)}
	>
		<span>Filters</span>
		<div class="chevron-icon" class:rotated={isOpen}>
			<ChevronDown size={20} />
		</div>
		{#if hasActiveFilters()}
			<span class="filter-badge">
				{[
					filters.category ? 1 : 0,
					filters.stockStatus ? 1 : 0,
					filters.minPrice > 0 || filters.maxPrice < 100000 ? 1 : 0,
					filters.sortBy !== 'newest' ? 1 : 0
				].reduce((a, b) => a + b, 0)}
			</span>
		{/if}
	</button>

	{#if isOpen}
		<div class="filter-panel">
			<!-- Category Filter -->
			<div class="filter-section">
				<h3 class="filter-title">Category</h3>
				<div class="filter-options">
					{#each categories as cat}
						<label class="checkbox-label">
							<input
								type="checkbox"
								checked={filters.category === cat}
								on:change={() => handleCategoryChange(cat)}
							/>
							<span>{cat}</span>
						</label>
					{/each}
				</div>
			</div>

			<!-- Stock Status Filter -->
			<div class="filter-section">
				<h3 class="filter-title">Stock Status</h3>
				<div class="filter-options">
					{#each ['Active', 'Low Stock', 'Out of Stock', 'Inactive'] as status}
						<label class="checkbox-label">
							<input
								type="checkbox"
								checked={filters.stockStatus === status}
								on:change={() => handleStockStatusChange(status)}
							/>
							<span>{status}</span>
						</label>
					{/each}
				</div>
			</div>

			<!-- Price Range Filter -->
			<div class="filter-section">
				<h3 class="filter-title">Price Range (DZD)</h3>
				<div class="price-inputs">
					<input
						type="number"
						placeholder="Min"
						value={filters.minPrice}
						on:change={(e) => handleMinPriceInput(parseInt(e.currentTarget.value) || 0)}
						class="price-input"
					/>
					<span>-</span>
					<input
						type="number"
						placeholder="Max"
						value={filters.maxPrice}
						on:change={(e) => handleMaxPriceInput(parseInt(e.currentTarget.value) || 100000)}
						class="price-input"
					/>
				</div>
			</div>

			<!-- Sort Option -->
			<div class="filter-section">
				<h3 class="filter-title">Sort By</h3>
				<select
					value={filters.sortBy}
					on:change={(e) => handleSortChange(e.currentTarget.value)}
					class="sort-select"
				>
					<option value="newest">Newest First</option>
					<option value="oldest">Oldest First</option>
					<option value="name-asc">Name: A to Z</option>
					<option value="name-desc">Name: Z to A</option>
					<option value="price-asc">Price: Low to High</option>
					<option value="price-desc">Price: High to Low</option>
					<option value="sales-desc">Highest Sales</option>
				</select>
			</div>

			<!-- Reset Button -->
			{#if hasActiveFilters()}
				<button class="reset-button" on:click={resetFilters}>
					Reset Filters
				</button>
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

	.filter-search {
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

	.filter-toggle svg {
		transition: transform 0.3s ease;
	}

	.filter-toggle svg.rotated {
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

	.checkbox-label input[type='checkbox'] {
		width: 1.8rem;
		height: 1.8rem;
		cursor: pointer;
		accent-color: #b37777;
	}

	.price-inputs {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	.price-input {
		flex: 1;
		padding: 0.8rem 1rem;
		border: 2px solid #e8e0db;
		border-radius: 0.6rem;
		font-size: 1.4rem;
		color: #333;
		background: #fff;
		transition: all 0.2s ease;
	}

	.price-input:focus {
		outline: none;
		border-color: #b37777;
	}

	.sort-select {
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

	.sort-select:focus {
		outline: none;
		border-color: #b37777;
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
