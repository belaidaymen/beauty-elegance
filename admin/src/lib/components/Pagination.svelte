<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let currentPage: number = 1;
	export let totalPages: number = 1;
	export let onPageChange: ((page: number) => void) | undefined = undefined;

	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange?.(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange?.(currentPage + 1);
		}
	};

	const handlePageClick = (page: number) => {
		onPageChange?.(page);
	};

	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;
		const half = Math.floor(maxVisiblePages / 2);
		let start = Math.max(1, currentPage - half);
		let end = Math.min(totalPages, start + maxVisiblePages - 1);

		if (end - start < maxVisiblePages - 1) {
			start = Math.max(1, end - maxVisiblePages + 1);
		}

		if (start > 1) {
			pages.push(1);
			if (start > 2) pages.push('...');
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		if (end < totalPages) {
			if (end < totalPages - 1) pages.push('...');
			pages.push(totalPages);
		}

		return pages;
	};
</script>

<div class="pagination-container">
	<button
		class="pagination-button"
		disabled={currentPage === 1}
		on:click={handlePrevious}
		aria-label="Previous page"
	>
		<ChevronLeft size={20} />
	</button>

	<div class="pagination-numbers">
		{#each getPageNumbers() as item}
			{#if item === '...'}
				<span class="pagination-ellipsis">...</span>
			{:else}
				<button
					class="pagination-number"
					class:active={item === currentPage}
					disabled={item === currentPage}
					on:click={() => handlePageClick(Number(item))}
				>
					{item}
				</button>
			{/if}
		{/each}
	</div>

	<button
		class="pagination-button"
		disabled={currentPage === totalPages}
		on:click={handleNext}
		aria-label="Next page"
	>
		<ChevronRight size={20} />
	</button>

	<div class="pagination-info">
		<span>Page {currentPage} of {totalPages}</span>
	</div>
</div>

<style>
	.pagination-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.2rem;
		padding: 2rem 0;
		margin-top: 2.5rem;
	}

	.pagination-button {
		width: 4.4rem;
		height: 4.4rem;
		border: 2px solid #e8e0db;
		border-radius: 0.8rem;
		background: #fff;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		font-weight: 600;
	}

	.pagination-button:hover:not(:disabled) {
		border-color: #b37777;
		color: #b37777;
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.15);
	}

	.pagination-button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.pagination-numbers {
		display: flex;
		gap: 0.8rem;
		align-items: center;
	}

	.pagination-number {
		width: 4.4rem;
		height: 4.4rem;
		border: 2px solid #e8e0db;
		border-radius: 0.8rem;
		background: #fff;
		color: #333;
		font-size: 1.5rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.pagination-number:hover:not(:disabled) {
		border-color: #b37777;
		color: #b37777;
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.15);
	}

	.pagination-number.active {
		background: linear-gradient(135deg, #d1b2b2 0%, #b37777 100%);
		color: #fff;
		border-color: #b37777;
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.25);
	}

	.pagination-number:disabled {
		cursor: not-allowed;
	}

	.pagination-ellipsis {
		color: #999;
		font-weight: 600;
		padding: 0 0.4rem;
	}

	.pagination-info {
		font-size: 1.3rem;
		color: #666;
		margin-left: 1rem;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	@media (max-width: 768px) {
		.pagination-container {
			flex-wrap: wrap;
			gap: 1rem;
		}

		.pagination-button,
		.pagination-number {
			width: 3.8rem;
			height: 3.8rem;
			font-size: 1.3rem;
		}

		.pagination-info {
			width: 100%;
			text-align: center;
			margin-left: 0;
			order: 3;
		}
	}
</style>
