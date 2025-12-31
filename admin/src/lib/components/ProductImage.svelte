<script lang="ts">
	export let src: string | undefined = undefined;
	export let alt: string = 'Product image';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let clickable: boolean = false;
	export let onClick: (() => void) | undefined = undefined;

	const sizeMap = {
		small: '10rem',
		medium: '15rem',
		large: '25rem'
	};

	$: imageSize = sizeMap[size];
</script>

{#if clickable}
	<button
		class="image-wrapper"
		class:clickable
		on:click={onClick}
		style="width: {imageSize}; height: {imageSize};"
		type="button"
	>
		{#if src}
			<img {src} {alt} class="product-image" />
		{:else}
			<div class="image-placeholder">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
					<circle cx="8.5" cy="8.5" r="1.5"></circle>
					<polyline points="21 15 16 10 5 21"></polyline>
				</svg>
				<span>No Image</span>
			</div>
		{/if}
	</button>
{:else}
	<div class="image-wrapper" style="width: {imageSize}; height: {imageSize};">
		{#if src}
			<img {src} {alt} class="product-image" />
		{:else}
			<div class="image-placeholder">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
					<circle cx="8.5" cy="8.5" r="1.5"></circle>
					<polyline points="21 15 16 10 5 21"></polyline>
				</svg>
				<span>No Image</span>
			</div>
		{/if}
	</div>
{/if}

<style>
	.image-wrapper {
		border-radius: 1rem;
		overflow: hidden;
		background: linear-gradient(135deg, #f5f0ed 0%, #faf8f6 100%);
		border: 2px solid #e8e0db;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.image-wrapper.clickable {
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.image-wrapper.clickable:hover {
		border-color: #b37777;
		box-shadow: 0 8px 24px rgba(179, 119, 119, 0.15);
		transform: translateY(-2px);
	}

	.product-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.image-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
		color: #c4b5af;
		font-size: 1.3rem;
		text-align: center;
		padding: 2rem;
	}

	.image-placeholder svg {
		opacity: 0.6;
	}

	@media (max-width: 768px) {
		.image-wrapper {
			width: 12rem;
			height: 12rem;
		}

		.image-placeholder {
			gap: 0.6rem;
			font-size: 1.2rem;
		}

		.image-placeholder svg {
			width: 32px;
			height: 32px;
		}
	}
</style>
