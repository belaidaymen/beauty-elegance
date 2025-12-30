<script lang="ts">
	import { uiStore } from '$lib/stores/ui_store';
	import { onMount } from 'svelte';

	let notification = {
		show: false,
		message: '',
		type: 'info' as 'success' | 'error' | 'warning' | 'info'
	};

	uiStore.subscribe((state) => {
		notification = state.notification;
		if (state.notification.show) {
			setTimeout(() => {
				uiStore.hideNotification();
			}, 4000);
		}
	});

	const icons: Record<string, string> = {
		success: '✅',
		error: '❌',
		warning: '⚠️',
		info: 'ℹ️'
	};
</script>

{#if notification.show}
	<div class="notification" class:success={notification.type === 'success'} class:error={notification.type === 'error'} class:warning={notification.type === 'warning'} class:info={notification.type === 'info'}>
		<span class="icon">{icons[notification.type]}</span>
		<p class="message">{notification.message}</p>
		<button class="close-btn" on:click={() => uiStore.hideNotification()}>✕</button>
	</div>
{/if}

<style>
	.notification {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md) var(--spacing-lg);
		background: white;
		border-left: 4px solid var(--color-info);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		max-width: 400px;
		animation: slideIn 0.3s ease;
		z-index: 2000;
	}

	@keyframes slideIn {
		from {
			transform: translateX(450px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	.notification.success {
		border-left-color: var(--color-success);
	}

	.notification.error {
		border-left-color: var(--color-error);
	}

	.notification.warning {
		border-left-color: var(--color-warning);
	}

	.notification.info {
		border-left-color: var(--color-info);
	}

	.icon {
		font-size: 1.8rem;
		flex-shrink: 0;
	}

	.message {
		flex: 1;
		font-size: 1.4rem;
		color: var(--color-text-dark);
		margin: 0;
	}

	.close-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.6rem;
		color: var(--color-text-lighter);
		transition: color 0.3s ease;
		padding: 0;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.close-btn:hover {
		color: var(--color-text-dark);
	}

	@media (max-width: 480px) {
		.notification {
			bottom: 1rem;
			right: 1rem;
			left: 1rem;
			max-width: none;
		}
	}
</style>
