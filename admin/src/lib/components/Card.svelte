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
		border-radius: 0.8rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		border: 1px solid #f0e8e8;
		transition: all 0.3s ease;
	}

	.card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
	}

	.card-header {
		margin-bottom: 1.5rem;
		border-bottom: 1px solid #f0e8e8;
		padding-bottom: 1rem;
	}

	.card-title {
		font-family: 'Andada Pro';
		font-size: 1.8rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.3rem;
	}

	.card-subtitle {
		font-size: 1.2rem;
		color: #888;
	}

	.card-content {
		color: #333;
	}
</style>
