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
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border: 2px solid transparent;
		border-image: linear-gradient(135deg, #e8e0db, #f0d9d9) 1;
		border-radius: 1.2rem;
		padding: 2rem 2.2rem;
		transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
	}

	.stat-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, transparent, var(--icon-color), transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.stat-card:hover {
		box-shadow: 0 12px 32px rgba(179, 119, 119, 0.15);
		transform: translateY(-6px);
		border-color: var(--primary-light);
		background: linear-gradient(135deg, #fff 0%, #fff9f9 100%);
	}

	.stat-card:hover::before {
		opacity: 1;
	}

	.stat-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2rem;
		gap: 1rem;
	}

	.stat-icon {
		width: 5.8rem;
		height: 5.8rem;
		background: linear-gradient(135deg, rgba(209, 178, 178, 0.2), rgba(209, 178, 178, 0.08));
		border-radius: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: all 0.3s ease;
		border: 2px solid rgba(209, 178, 178, 0.2);
	}

	.stat-card:hover .stat-icon {
		background: linear-gradient(135deg, rgba(179, 119, 119, 0.25), rgba(179, 119, 119, 0.12));
		border-color: rgba(179, 119, 119, 0.3);
		transform: scale(1.05);
	}

	.stat-trend {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.7rem 1.4rem;
		border-radius: 0.8rem;
		background: rgba(240, 217, 217, 0.5);
		font-size: 1.3rem;
		font-weight: 700;
		color: #666;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
		backdrop-filter: blur(8px);
		border: 1px solid rgba(209, 178, 178, 0.3);
	}

	.trend-up {
		color: #1d6b3c;
		background: rgba(39, 174, 96, 0.12);
		border-color: rgba(39, 174, 96, 0.3);
	}

	.trend-down {
		color: #8a3a3a;
		background: rgba(201, 68, 68, 0.12);
		border-color: rgba(201, 68, 68, 0.3);
	}

	.stat-content {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.stat-label {
		font-size: 1.3rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 700;
		font-family: 'Andada Pro', serif;
	}

	.stat-value {
		font-size: 2.8rem;
		font-weight: 700;
		color: #2a2a2a;
		line-height: 1.1;
		font-family: 'Open Sans', sans-serif;
		letter-spacing: -0.02em;
	}
</style>
