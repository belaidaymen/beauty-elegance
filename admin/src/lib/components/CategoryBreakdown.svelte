<script lang="ts">
	let categories = [
		{ name: 'Maquillage', percentage: 32, amount: 91400 },
		{ name: 'Cheveux', percentage: 28, amount: 80000 },
		{ name: 'Visage', percentage: 22, amount: 62900 },
		{ name: 'Corps & Bain', percentage: 12, amount: 34300 },
		{ name: 'Deo & Stick', percentage: 6, amount: 17150 }
	];

	const colors = [
		'#2b8a8a',
		'#b37777',
		'#8b4e6f',
		'#e89565',
		'#3da5a5'
	];
</script>

<div class="chart-container">
	<div class="chart-header">
		<h3>Ventes par Catégorie</h3>
	</div>

	<div class="pie-chart">
		<svg viewBox="0 0 100 100" class="pie-svg">
			{#each categories as category, i}
				{@const circumference = 2 * Math.PI * 45}
				{@const offset = circumference - (category.percentage / 100) * circumference}
				{@const prevOffset = i === 0 ? 0 : categories.slice(0, i).reduce((sum, cat) => sum + (cat.percentage / 100) * circumference, 0)}
				<circle
					cx="50"
					cy="50"
					r="45"
					fill="none"
					stroke={colors[i]}
					stroke-width="15"
					stroke-dasharray={circumference}
					stroke-dashoffset={-prevOffset}
					class="pie-segment"
					style="transition: all 0.3s ease;"
				/>
			{/each}
		</svg>

		<div class="pie-center">
			<p class="pie-label">Total</p>
			<p class="pie-value">285.5K DZD</p>
		</div>
	</div>

	<div class="legend">
		{#each categories as category, i}
			<div class="legend-item">
				<span class="legend-color" style="background-color: {colors[i]}"></span>
				<div class="legend-text">
					<p class="legend-name">{category.name}</p>
					<p class="legend-stats">{category.percentage}% • {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(category.amount)} DZD</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.chart-container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.chart-header {
		margin-bottom: var(--spacing-lg);
	}

	.chart-header h3 {
		margin: 0;
	}

	.pie-chart {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		min-height: 250px;
	}

	.pie-svg {
		width: 200px;
		height: 200px;
		max-width: 100%;
	}

	.pie-segment {
		cursor: pointer;
		filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.1));
	}

	.pie-segment:hover {
		filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.2));
	}

	.pie-center {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.pie-label {
		font-size: 1.2rem;
		color: var(--color-text-lighter);
		margin: 0 0 0.4rem 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	.pie-value {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--color-accent-teal);
		margin: 0;
	}

	.legend {
		margin-top: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-sm);
		border-radius: var(--radius-md);
		transition: background 0.3s ease;
	}

	.legend-item:hover {
		background: var(--color-primary-light-beige);
	}

	.legend-color {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.legend-text {
		flex: 1;
	}

	.legend-name {
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--color-text-dark);
		margin: 0;
	}

	.legend-stats {
		font-size: 1.2rem;
		color: var(--color-text-lighter);
		margin: 0;
	}

	@media (max-width: 768px) {
		.pie-svg {
			width: 150px;
			height: 150px;
		}

		.legend {
			gap: var(--spacing-sm);
		}

		.legend-item {
			padding: var(--spacing-xs);
		}

		.legend-name {
			font-size: 1.2rem;
		}

		.legend-stats {
			font-size: 1rem;
		}
	}
</style>
