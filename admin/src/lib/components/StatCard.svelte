<script lang="ts">
	import TrendUpIcon from './Icons/TrendUpIcon.svelte';
	import TrendDownIcon from './Icons/TrendDownIcon.svelte';

	export let label: string;
	export let value: string | number;
	export let trend: 'up' | 'down' | 'neutral' = 'neutral';
	export let trendValue: string = '';
	export let icon: any = null;
	export let color: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

	const colorMap = {
		primary: '#b37777',
		success: '#27ae60',
		warning: '#f39c12',
		danger: '#e74c3c'
	};

	const trendIconMap = {
		up: TrendUpIcon,
		down: TrendDownIcon,
		neutral: null
	};
</script>

<div class="stat-card">
	<div class="stat-header">
		<div class="stat-icon" style="--icon-color: {colorMap[color]}">
			{#if icon}
				<svelte:component this={icon} size={28} color={colorMap[color]} />
			{/if}
		</div>
		<div class="stat-trend" class:trend-up={trend === 'up'} class:trend-down={trend === 'down'}>
			{#if trendIconMap[trend]}
				<svelte:component this={trendIconMap[trend]} size={18} color="currentColor" />
			{/if}
			{#if trendValue}
				<span>{trendValue}</span>
			{/if}
		</div>
	</div>

	<div class="stat-content">
		<p class="stat-label">{label}</p>
		<p class="stat-value">{value}</p>
	</div>
</div>

<style>
	.stat-card {
		background: #fff;
		border: 1px solid #f0e8e8;
		border-radius: 0.8rem;
		padding: 1.5rem;
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	.stat-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		margin-bottom: 1rem;
	}

	.stat-icon {
		width: 5rem;
		height: 5rem;
		background: rgba(var(--icon-color), 0.1);
		border-radius: 0.8rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.5rem;
	}

	.stat-trend {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 1rem;
		border-radius: 0.4rem;
		background: #f9f8f8;
		font-size: 1.3rem;
		font-weight: 600;
		color: #888;
	}

	.trend-up {
		color: #27ae60;
		background: rgba(39, 174, 96, 0.1);
	}

	.trend-down {
		color: #e74c3c;
		background: rgba(231, 76, 60, 0.1);
	}

	.stat-content {
		display: flex;
		flex-direction: column;
	}

	.stat-label {
		font-size: 1.2rem;
		color: #888;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		font-weight: 600;
	}

	.stat-value {
		font-size: 2.4rem;
		font-weight: 700;
		color: #333;
	}
</style>
