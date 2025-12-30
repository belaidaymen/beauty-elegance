<script lang="ts">
	interface Stat {
		title: string;
		value: string;
		change: string;
		icon: string;
		color: 'teal' | 'burgundy' | 'purple' | 'orange';
	}

	export let stat: Stat;
</script>

<div class="stat-card" class:teal={stat.color === 'teal'} class:burgundy={stat.color === 'burgundy'} class:purple={stat.color === 'purple'} class:orange={stat.color === 'orange'}>
	<div class="stat-icon">{stat.icon}</div>
	<div class="stat-content">
		<p class="stat-title">{stat.title}</p>
		<p class="stat-value">{stat.value}</p>
		<p class="stat-change">
			<span class="change-icon">↑</span>
			{stat.change} ce mois
		</p>
	</div>
</div>

<style>
	.stat-card {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-lg);
		padding: var(--spacing-lg);
		background: white;
		border-radius: var(--radius-lg);
		border-left: 5px solid;
		box-shadow: var(--shadow-sm);
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.stat-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	.stat-card.teal {
		border-left-color: var(--color-accent-teal);
	}

	.stat-card.burgundy {
		border-left-color: var(--color-accent-burgundy);
	}

	.stat-card.purple {
		border-left-color: var(--color-accent-purple);
	}

	.stat-card.orange {
		border-left-color: var(--color-accent-orange);
	}

	.stat-icon {
		font-size: 3rem;
		width: 5rem;
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-lg);
		flex-shrink: 0;
	}

	.stat-card.teal .stat-icon {
		background: rgba(43, 138, 138, 0.1);
	}

	.stat-card.burgundy .stat-icon {
		background: rgba(179, 119, 119, 0.1);
	}

	.stat-card.purple .stat-icon {
		background: rgba(139, 78, 111, 0.1);
	}

	.stat-card.orange .stat-icon {
		background: rgba(232, 149, 101, 0.1);
	}

	.stat-content {
		flex: 1;
	}

	.stat-title {
		font-size: 1.3rem;
		color: var(--color-text-lighter);
		margin: 0 0 var(--spacing-sm) 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	.stat-value {
		font-size: 2.2rem;
		font-weight: 700;
		color: var(--color-text-dark);
		margin: 0 0 var(--spacing-sm) 0;
	}

	.stat-change {
		font-size: 1.3rem;
		color: var(--color-success);
		margin: 0;
		font-weight: 500;
	}

	.change-icon {
		display: inline-block;
		margin-right: 0.4rem;
	}

	@media (max-width: 480px) {
		.stat-card {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.stat-value {
			font-size: 1.8rem;
		}

		.stat-icon {
			width: 4rem;
			height: 4rem;
			font-size: 2rem;
		}
	}
</style>
