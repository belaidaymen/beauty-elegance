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
		background: #fff;
		border-radius: 1rem;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
		border: 1px solid #e8e0db;
		transition: all 0.3s ease;
	}

	.card:hover {
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
		border-color: #d1b2b2;
	}

	.card-header {
		margin-bottom: 1.8rem;
		border-bottom: 1px solid #e8e0db;
		padding-bottom: 1.2rem;
	}

	.card-title {
		font-family: 'Andada Pro', serif;
		font-size: 1.8rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.5rem;
		letter-spacing: 0.01em;
	}

	.card-subtitle {
		font-size: 1.2rem;
		color: #999;
		font-weight: 400;
	}

	.card-content {
		color: #333;
	}
</style>
