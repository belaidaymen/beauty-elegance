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
		border-radius: 0.7rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s ease;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
	}

	.btn-small {
		padding: 0.6rem 1.2rem;
		font-size: 1.2rem;
	}

	.btn-medium {
		padding: 0.9rem 1.8rem;
		font-size: 1.4rem;
	}

	.btn-large {
		padding: 1.1rem 2.2rem;
		font-size: 1.6rem;
	}

	.btn-primary {
		background: #b37777;
		color: #fff;
		border: 2px solid #b37777;
	}

	.btn-primary:hover:not(:disabled) {
		background: #9d5f5f;
		border-color: #9d5f5f;
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.25);
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: #faf9f8;
		color: #333;
		border: 1.5px solid #e8e0db;
	}

	.btn-secondary:hover:not(:disabled) {
		background: #f0e8e8;
		border-color: #d1b2b2;
		color: #b37777;
	}

	.btn-danger {
		background: #c94444;
		color: #fff;
		border: 2px solid #c94444;
	}

	.btn-danger:hover:not(:disabled) {
		background: #b33a3a;
		border-color: #b33a3a;
		box-shadow: 0 4px 12px rgba(201, 68, 68, 0.25);
	}

	.btn-success {
		background: #27ae60;
		color: #fff;
		border: 2px solid #27ae60;
	}

	.btn-success:hover:not(:disabled) {
		background: #229954;
		border-color: #229954;
		box-shadow: 0 4px 12px rgba(39, 174, 96, 0.25);
	}

	.btn:disabled,
	.btn.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 480px) {
		.btn-small {
			padding: 0.5rem 1rem;
			font-size: 1.1rem;
		}

		.btn-medium {
			padding: 0.7rem 1.4rem;
			font-size: 1.2rem;
		}

		.btn-large {
			padding: 0.9rem 1.8rem;
			font-size: 1.4rem;
		}
	}
</style>
