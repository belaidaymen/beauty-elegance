<script lang="ts">
	export let columns: Array<{ key: string; label: string; width?: string }>;
	export let data: Array<Record<string, any>> = [];
	export let striped: boolean = true;
	export let hoverable: boolean = true;

	let selectedRows: Set<number> = new Set();

	const toggleRowSelection = (index: number) => {
		if (selectedRows.has(index)) {
			selectedRows.delete(index);
		} else {
			selectedRows.add(index);
		}
		selectedRows = selectedRows;
	};

	const toggleAllRows = () => {
		if (selectedRows.size === data.length) {
			selectedRows.clear();
		} else {
			selectedRows = new Set(data.map((_, i) => i));
		}
	};
</script>

<div class="table-container">
	<table class="data-table" class:striped class:hoverable>
		<thead>
			<tr>
				<th class="checkbox-col">
					<input
						type="checkbox"
						checked={selectedRows.size === data.length && data.length > 0}
						on:change={toggleAllRows}
					/>
				</th>
				{#each columns as col (col.key)}
					<th style="width: {col.width || 'auto'}">{col.label}</th>
				{/each}
				<th class="actions-col">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data as row, idx (idx)}
				<tr class:selected={selectedRows.has(idx)}>
					<td class="checkbox-col">
						<input
							type="checkbox"
							checked={selectedRows.has(idx)}
							on:change={() => toggleRowSelection(idx)}
						/>
					</td>
					{#each columns as col (col.key)}
						<td>
							<slot name="cell" {row} {col} {idx}>
								{row[col.key]}
							</slot>
						</td>
					{/each}
					<td class="actions-col">
						<slot name="actions" {row} {idx} />
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	{#if data.length === 0}
		<div class="empty-state">
			<p>No data available</p>
		</div>
	{/if}
</div>

<style>
	.table-container {
		overflow-x: auto;
		border-radius: 0.8rem;
		border: 1px solid #f0e8e8;
		background: #fff;
	}

	.data-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1.4rem;
	}

	.data-table thead {
		background: #f9f8f8;
		border-bottom: 2px solid #e0c8c8;
	}

	.data-table th {
		padding: 1.2rem;
		text-align: left;
		font-weight: 600;
		color: #333;
		text-transform: uppercase;
		font-size: 1.2rem;
		letter-spacing: 0.05rem;
	}

	.data-table td {
		padding: 1.2rem;
		border-bottom: 1px solid #f0e8e8;
		color: #555;
	}

	.data-table tbody tr {
		transition: background-color 0.3s ease;
	}

	.data-table.striped tbody tr:nth-child(odd) {
		background: #fdfcfc;
	}

	.data-table.hoverable tbody tr:hover {
		background: #f9f8f8;
	}

	.data-table.hoverable tbody tr.selected {
		background: rgba(209, 178, 178, 0.15);
	}

	.checkbox-col {
		width: 5rem;
		text-align: center;
	}

	.checkbox-col input {
		cursor: pointer;
	}

	.actions-col {
		width: 12rem;
		text-align: center;
	}

	.empty-state {
		padding: 3rem;
		text-align: center;
		color: #888;
		font-size: 1.5rem;
	}

	input[type='checkbox'] {
		cursor: pointer;
		width: 1.8rem;
		height: 1.8rem;
	}

	@media (max-width: 768px) {
		.data-table {
			font-size: 1.2rem;
		}

		.data-table th,
		.data-table td {
			padding: 0.8rem;
		}

		.checkbox-col {
			width: 4rem;
		}

		.actions-col {
			width: 8rem;
		}
	}
</style>
