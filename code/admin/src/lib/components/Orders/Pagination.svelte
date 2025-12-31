<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let currentPage = 1;
	export let totalPages = 1;
	export let itemsPerPage = 10;
	export let totalItems = 0;
	export let onPageChange = (page: number) => {};

	let inputPage = currentPage;

	$: inputPage = currentPage;

	const goToPage = (page: number) => {
		const validPage = Math.max(1, Math.min(page, totalPages));
		if (validPage !== currentPage) {
			onPageChange(validPage);
		}
	};

	const handleInputChange = () => {
		const page = parseInt(inputPage.toString()) || 1;
		goToPage(page);
	};

	const getStartItem = () => (currentPage - 1) * itemsPerPage + 1;
	const getEndItem = () => Math.min(currentPage * itemsPerPage, totalItems);

	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;
		const half = Math.floor(maxVisible / 2);

		let start = Math.max(1, currentPage - half);
		let end = Math.min(totalPages, start + maxVisible - 1);

		if (end - start + 1 < maxVisible) {
			start = Math.max(1, end - maxVisible + 1);
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};
</script>

<div class="pagination-container">
	<div class="pagination-info">
		<span class="info-text">
			Showing <strong>{getStartItem()}</strong> to <strong>{getEndItem()}</strong> of <strong>{totalItems}</strong> orders
		</span>
	</div>

	<div class="pagination-controls">
		<button
			class="pagination-btn"
			on:click={() => goToPage(currentPage - 1)}
			disabled={currentPage === 1}
			title="Previous page"
		>
			<ChevronLeft size={18} />
		</button>

		<div class="page-numbers">
			{#if getPageNumbers()[0] > 1}
				<button
					class="page-btn"
					on:click={() => goToPage(1)}
				>
					1
				</button>
				{#if getPageNumbers()[0] > 2}
					<span class="page-ellipsis">...</span>
				{/if}
			{/if}

			{#each getPageNumbers() as page (page)}
				<button
					class="page-btn"
					class:active={page === currentPage}
					on:click={() => goToPage(page)}
				>
					{page}
				</button>
			{/each}

			{#if getPageNumbers()[getPageNumbers().length - 1] < totalPages}
				{#if getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1}
					<span class="page-ellipsis">...</span>
				{/if}
				<button
					class="page-btn"
					on:click={() => goToPage(totalPages)}
				>
					{totalPages}
				</button>
			{/if}
		</div>

		<button
			class="pagination-btn"
			on:click={() => goToPage(currentPage + 1)}
			disabled={currentPage === totalPages}
			title="Next page"
		>
			<ChevronRight size={18} />
		</button>
	</div>

	<div class="pagination-goto">
		<label for="goto-page" class="goto-label">Go to page:</label>
		<input
			id="goto-page"
			type="number"
			min="1"
			max={totalPages}
			bind:value={inputPage}
			on:change={handleInputChange}
			on:keydown={(e) => e.key === 'Enter' && handleInputChange()}
			class="goto-input"
		/>
		<span class="goto-total">of {totalPages}</span>
	</div>
</div>

<style>
	.pagination-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border: 2px solid #e0c8c8;
		border-radius: 0.8rem;
		margin-top: 2rem;
		font-family: 'Andada Pro', serif;
		flex-wrap: wrap;
	}

	.pagination-info {
		flex: 1;
		min-width: 200px;
	}

	.info-text {
		font-size: 1.3rem;
		color: #666;
		letter-spacing: 0.02em;
	}

	.info-text strong {
		color: #333;
		font-weight: 600;
	}

	.pagination-controls {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		flex: 1;
		min-width: 300px;
		justify-content: center;
	}

	.pagination-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.6rem;
		height: 3.6rem;
		border: 2px solid #d9c8c8;
		border-radius: 0.6rem;
		background: white;
		color: #333;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1.4rem;
		font-family: inherit;
	}

	.pagination-btn:hover:not(:disabled) {
		border-color: #b37777;
		background: rgba(179, 119, 119, 0.08);
		color: #b37777;
	}

	.pagination-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.page-numbers {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.page-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 3.6rem;
		height: 3.6rem;
		padding: 0 0.4rem;
		border: 2px solid #d9c8c8;
		border-radius: 0.6rem;
		background: white;
		color: #333;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1.3rem;
		font-weight: 500;
		font-family: inherit;
	}

	.page-btn:hover {
		border-color: #b37777;
		background: rgba(179, 119, 119, 0.08);
		color: #b37777;
	}

	.page-btn.active {
		background: #b37777;
		border-color: #b37777;
		color: white;
		font-weight: 600;
	}

	.page-ellipsis {
		color: #999;
		padding: 0 0.4rem;
		font-size: 1.3rem;
	}

	.pagination-goto {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-width: 180px;
	}

	.goto-label {
		font-size: 1.3rem;
		color: #666;
		white-space: nowrap;
		letter-spacing: 0.02em;
	}

	.goto-input {
		width: 4rem;
		height: 3.6rem;
		padding: 0.4rem 0.8rem;
		border: 2px solid #d9c8c8;
		border-radius: 0.6rem;
		font-size: 1.3rem;
		color: #333;
		text-align: center;
		font-family: inherit;
		background: white;
		transition: all 0.3s ease;
	}

	.goto-input:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.goto-total {
		font-size: 1.3rem;
		color: #999;
	}

	@media (max-width: 1024px) {
		.pagination-container {
			flex-direction: column;
			align-items: stretch;
			gap: 1rem;
		}

		.pagination-info,
		.pagination-controls,
		.pagination-goto {
			width: 100%;
			justify-content: center;
		}

		.page-numbers {
			flex-wrap: wrap;
			justify-content: center;
		}
	}

	@media (max-width: 640px) {
		.pagination-container {
			padding: 1rem;
		}

		.pagination-btn,
		.page-btn {
			width: 3.2rem;
			height: 3.2rem;
			font-size: 1.2rem;
		}

		.page-numbers {
			gap: 0.2rem;
		}

		.info-text {
			font-size: 1.2rem;
		}
	}
</style>
