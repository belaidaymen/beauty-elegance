<script lang="ts">
	export let title: string = '';
	export let subtitle: string = '';
	export let padding: 'small' | 'medium' | 'large' = 'medium';

	const paddingMap = {
		small: 'p-2',
		medium: 'p-3',
		large: 'p-4'
	};
</script>

<div class="card {paddingMap[padding]}">
	{#if title}
		<div class="card-header">
			<h3 class="card-title">{title}</h3>
			{#if subtitle}
				<p class="card-subtitle">{subtitle}</p>
			{/if}
		</div>
	{/if}
	<div class="card-content">
		<slot />
	</div>
</div>

<style>
	.card {
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border-radius: 1.2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
		border: 2px solid transparent;
		border-image: linear-gradient(135deg, #e8e0db, #f0d9d9) 1;
		transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		overflow: hidden;
	}

	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, #b37777, transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.card:hover {
		box-shadow: 0 12px 32px rgba(179, 119, 119, 0.12);
		border-color: var(--primary-light);
		background: linear-gradient(135deg, #fff 0%, #fff9f9 100%);
	}

	.card:hover::before {
		opacity: 1;
	}

	.card-header {
		margin-bottom: 2rem;
		border-bottom: 2px solid #f0d9d9;
		padding-bottom: 1.5rem;
	}

	.card-title {
		font-family: 'Andada Pro', serif;
		font-size: 1.9rem;
		font-weight: 600;
		color: #2a2a2a;
		margin-bottom: 0.6rem;
		letter-spacing: 0.01em;
	}

	.card-subtitle {
		font-size: 1.3rem;
		color: #999;
		font-weight: 500;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.card-content {
		color: #333;
	}
</style>
