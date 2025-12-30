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
		background: rgba(0, 0, 0, 0.5);
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
		border-radius: 0.8rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
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
		padding: 2rem;
		border-bottom: 1px solid #f0e8e8;
	}

	.modal-title {
		font-family: 'Andada Pro';
		font-size: 2rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.modal-close {
		background: none;
		border: none;
		font-size: 2.4rem;
		color: #888;
		cursor: pointer;
		padding: 0;
		width: 4rem;
		height: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.4rem;
		transition: all 0.3s ease;
	}

	.modal-close:hover {
		background: #f9f8f8;
		color: #333;
	}

	.modal-body {
		padding: 2rem;
		color: #333;
	}

	.modal-footer {
		padding: 2rem;
		border-top: 1px solid #f0e8e8;
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
			transform: translateY(3rem);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.modal-container {
			padding: 1rem;
		}

		.modal-header {
			padding: 1.5rem;
		}

		.modal-body {
			padding: 1.5rem;
		}

		.modal-footer {
			padding: 1.5rem;
		}
	}
</style>
