<script lang="ts">
	export let columns: Array<{ key: string; label: string; width?: string }>;
	export let data: Array<Record<string, any>> = [];
	export let striped: boolean = true;
	export let hoverable: boolean = true;
</script>

<div class="table-container">
	<table class="data-table" class:striped class:hoverable>
		<thead>
			<tr>
				{#each columns as col (col.key)}
					<th style="width: {col.width || 'auto'}">{col.label}</th>
				{/each}
				<th class="actions-col">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data as row, idx (idx)}
				<tr>
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
		border-radius: 1rem;
		border: 1px solid #e8e0db;
		background: #fff;
	}

	.data-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1.4rem;
	}

	.data-table thead {
		background: #faf9f8;
		border-bottom: 1px solid #e8e0db;
	}

	.data-table th {
		padding: 1.4rem 1.5rem;
		text-align: left;
		font-weight: 600;
		color: #333;
		text-transform: uppercase;
		font-size: 1.2rem;
		letter-spacing: 0.08em;
	}

	.data-table td {
		padding: 1.4rem 1.5rem;
		border-bottom: 1px solid #e8e0db;
		color: #666;
	}

	.data-table tbody tr {
		transition: background-color 0.2s ease;
	}

	.data-table.striped tbody tr:nth-child(odd) {
		background: #fefdfb;
	}

	.data-table.hoverable tbody tr:hover {
		background: #f9f8f8;
	}

	.actions-col {
		width: 13rem;
		text-align: center;
	}

	.empty-state {
		padding: 4rem 3rem;
		text-align: center;
		color: #999;
		font-size: 1.5rem;
	}

	@media (max-width: 768px) {
		.data-table {
			font-size: 1.2rem;
		}

		.data-table th,
		.data-table td {
			padding: 1rem 1.2rem;
		}

		.checkbox-col {
			width: 4rem;
		}

		.actions-col {
			width: 10rem;
		}
	}
</style>
