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
		border: 1px solid #e8e0db;
		border-radius: 1rem;
		padding: 1.8rem;
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
		transform: translateY(-3px);
		border-color: #d1b2b2;
	}

	.stat-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.stat-icon {
		width: 5.2rem;
		height: 5.2rem;
		background: linear-gradient(135deg, rgba(209, 178, 178, 0.15), rgba(209, 178, 178, 0.05));
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.stat-trend {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 1.2rem;
		border-radius: 0.6rem;
		background: #faf9f8;
		font-size: 1.3rem;
		font-weight: 600;
		color: #888;
	}

	.trend-up {
		color: #27ae60;
		background: rgba(39, 174, 96, 0.1);
	}

	.trend-down {
		color: #c94444;
		background: rgba(201, 68, 68, 0.1);
	}

	.stat-content {
		display: flex;
		flex-direction: column;
	}

	.stat-label {
		font-size: 1.2rem;
		color: #999;
		margin-bottom: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-weight: 600;
	}

	.stat-value {
		font-size: 2.6rem;
		font-weight: 700;
		color: #333;
		line-height: 1.2;
	}
</style>
