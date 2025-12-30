<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let disabled: boolean = false;
	export let href: string = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';

	const variantClass = `btn-${variant}`;
	const sizeClass = `btn-${size}`;
</script>

{#if href}
	<a {href} class="btn {variantClass} {sizeClass}" class:disabled>
		<slot />
	</a>
{:else}
	<button {type} {disabled} class="btn {variantClass} {sizeClass}">
		<slot />
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		border: none;
		border-radius: 0.4rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
	}

	.btn-small {
		padding: 0.5rem 1.2rem;
		font-size: 1.2rem;
	}

	.btn-medium {
		padding: 0.8rem 1.6rem;
		font-size: 1.4rem;
	}

	.btn-large {
		padding: 1rem 2rem;
		font-size: 1.6rem;
	}

	.btn-primary {
		background: linear-gradient(135deg, #d1b2b2 0%, #b37777 100%);
		color: #fff;
		border: 2px solid #b37777;
	}

	.btn-primary:hover:not(:disabled) {
		background: linear-gradient(135deg, #b37777 0%, #9d5f5f 100%);
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.3);
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: #f9f8f8;
		color: #333;
		border: 2px solid #e0c8c8;
	}

	.btn-secondary:hover:not(:disabled) {
		background: #f0e8e8;
		border-color: #d1b2b2;
	}

	.btn-danger {
		background: #e74c3c;
		color: #fff;
		border: 2px solid #e74c3c;
	}

	.btn-danger:hover:not(:disabled) {
		background: #c9302c;
		border-color: #c9302c;
		box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
	}

	.btn-success {
		background: #27ae60;
		color: #fff;
		border: 2px solid #27ae60;
	}

	.btn-success:hover:not(:disabled) {
		background: #229954;
		border-color: #229954;
		box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
	}

	.btn:disabled,
	.btn.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 480px) {
		.btn-small {
			padding: 0.4rem 0.8rem;
			font-size: 1.1rem;
		}

		.btn-medium {
			padding: 0.6rem 1.2rem;
			font-size: 1.2rem;
		}

		.btn-large {
			padding: 0.8rem 1.4rem;
			font-size: 1.4rem;
		}
	}
</style>
