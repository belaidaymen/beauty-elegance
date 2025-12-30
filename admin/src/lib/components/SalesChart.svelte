<script lang="ts">
	let salesData = [
		{ month: 'Jan', sales: 45000 },
		{ month: 'Fév', sales: 52000 },
		{ month: 'Mar', sales: 48000 },
		{ month: 'Avr', sales: 65000 },
		{ month: 'Mai', sales: 58000 },
		{ month: 'Juin', sales: 72000 },
		{ month: 'Juil', sales: 81000 },
		{ month: 'Août', sales: 76000 },
		{ month: 'Sep', sales: 68000 },
		{ month: 'Oct', sales: 85000 },
		{ month: 'Nov', sales: 92000 },
		{ month: 'Déc', sales: 105000 }
	];

	const maxSales = Math.max(...salesData.map((d) => d.sales));
	const minSales = Math.min(...salesData.map((d) => d.sales));
	const range = maxSales - minSales;

	function getBarHeight(sales: number): number {
		return ((sales - minSales) / range) * 100;
	}

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(price);
	}
</script>

<div class="chart-container">
	<div class="chart-header">
		<h3>Ventes Mensuelles</h3>
		<select class="year-select">
			<option>2024</option>
			<option>2023</option>
			<option>2022</option>
		</select>
	</div>

	<div class="chart">
		<div class="y-axis">
			<span class="tick">{formatPrice(maxSales)}</span>
			<span class="tick">{formatPrice((maxSales + minSales) / 2)}</span>
			<span class="tick">{formatPrice(minSales)}</span>
		</div>

		<div class="bars-container">
			{#each salesData as data (data.month)}
				<div class="bar-wrapper">
					<div class="bar-group">
						<div class="bar" style="height: {getBarHeight(data.sales)}%">
							<span class="bar-value">{formatPrice(data.sales)}</span>
						</div>
					</div>
					<span class="month-label">{data.month}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="chart-footer">
		<p class="total-revenue">Revenu Total: <strong>879,000 DZD</strong></p>
	</div>
</div>

<style>
	.chart-container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.chart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
	}

	.chart-header h3 {
		margin: 0;
	}

	.year-select {
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: white;
		cursor: pointer;
		font-size: 1.4rem;
		color: var(--color-text-dark);
	}

	.chart {
		flex: 1;
		display: flex;
		gap: var(--spacing-md);
		position: relative;
		min-height: 300px;
		align-items: flex-end;
	}

	.y-axis {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		width: 80px;
		font-size: 1.1rem;
		color: var(--color-text-lighter);
		padding-right: var(--spacing-sm);
	}

	.tick {
		line-height: 1;
	}

	.bars-container {
		flex: 1;
		display: flex;
		align-items: flex-end;
		gap: var(--spacing-md);
		justify-content: space-around;
		position: relative;
	}

	.bar-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		gap: var(--spacing-sm);
	}

	.bar-group {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		min-height: 200px;
	}

	.bar {
		width: 100%;
		max-width: 40px;
		background: linear-gradient(135deg, var(--color-accent-teal), var(--color-accent-teal-light));
		border-radius: var(--radius-md) var(--radius-md) 0 0;
		position: relative;
		transition: all 0.3s ease;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: var(--spacing-sm);
		min-height: 20px;
	}

	.bar:hover {
		box-shadow: 0 -4px 12px rgba(43, 138, 138, 0.3);
		transform: scaleY(1.05);
	}

	.bar-value {
		font-size: 1rem;
		font-weight: 700;
		color: white;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.bar:hover .bar-value {
		opacity: 1;
	}

	.month-label {
		font-size: 1.2rem;
		color: var(--color-text-dark);
		font-weight: 500;
		text-align: center;
		width: 100%;
	}

	.chart-footer {
		margin-top: var(--spacing-lg);
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--color-border);
		text-align: right;
	}

	.total-revenue {
		margin: 0;
		color: var(--color-text-light);
		font-size: 1.4rem;
	}

	.total-revenue strong {
		color: var(--color-accent-teal);
		font-size: 1.6rem;
	}

	@media (max-width: 768px) {
		.y-axis {
			display: none;
		}

		.bars-container {
			gap: var(--spacing-sm);
		}

		.bar {
			max-width: 30px;
		}

		.month-label {
			font-size: 1rem;
		}
	}
</style>
