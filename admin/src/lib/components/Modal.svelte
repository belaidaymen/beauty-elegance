<script lang="ts">
	export let isOpen: boolean = false;
	export let title: string = '';
	export let onClose: () => void = () => {};
	export let size: 'small' | 'medium' | 'large' = 'medium';

	const sizeMap = {
		small: '40rem',
		medium: '60rem',
		large: '90rem'
	};

	const handleBackdropClick = () => {
		onClose();
	};

	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose();
		}
	};
</script>

<svelte:window on:keydown={handleEscape} />

{#if isOpen}
	<div class="modal-backdrop" on:click={handleBackdropClick} role="presentation" />
	<div class="modal-container" style="--modal-width: {sizeMap[size]}">
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title">{title}</h2>
				<button class="modal-close" on:click={onClose} aria-label="Close modal">✕</button>
			</div>
			<div class="modal-body">
				<slot />
			</div>
			{#if $$slots.footer}
				<div class="modal-footer">
					<slot name="footer" />
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
		z-index: 999;
		animation: fadeIn 0.3s ease;
	}

	.modal-container {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 2rem;
	}

	.modal-content {
		background: #fff;
		border-radius: 1.2rem;
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
		width: 100%;
		max-width: var(--modal-width);
		max-height: 90vh;
		overflow-y: auto;
		animation: slideUp 0.3s ease;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2.2rem 2.4rem;
		border-bottom: 1px solid #e8e0db;
	}

	.modal-title {
		font-family: 'Andada Pro', serif;
		font-size: 2rem;
		font-weight: 600;
		color: #333;
		margin: 0;
		letter-spacing: 0.01em;
	}

	.modal-close {
		background: none;
		border: none;
		font-size: 2.2rem;
		color: #999;
		cursor: pointer;
		padding: 0;
		width: 3.6rem;
		height: 3.6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.6rem;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.modal-close:hover {
		background: #faf9f8;
		color: #b37777;
	}

	.modal-body {
		padding: 2.2rem 2.4rem;
		color: #333;
	}

	.modal-footer {
		padding: 2.2rem 2.4rem;
		border-top: 1px solid #e8e0db;
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			transform: translateY(2.4rem);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.modal-container {
			padding: 1.5rem;
		}

		.modal-header {
			padding: 1.8rem;
		}

		.modal-body {
			padding: 1.8rem;
		}

		.modal-footer {
			padding: 1.8rem;
		}
	}
</style>
