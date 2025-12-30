<script lang="ts">
	import '../app.css';
	import { authStore } from '$lib/stores/auth_store';
	import { uiStore } from '$lib/stores/ui_store';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import TopNav from '$lib/components/TopNav.svelte';
	import Notification from '$lib/components/Notification.svelte';

	let isAuthenticated = false;

	authStore.subscribe((state) => {
		isAuthenticated = state.isAuthenticated;
	});

	// Simulate initial auth check
	if (typeof window !== 'undefined' && !isAuthenticated) {
		// This would normally check with backend
		// For demo purposes, we'll set a demo user
		authStore.login({
			id: '1',
			name: 'Admin User',
			email: 'admin@beaute-elegance.com',
			role: 'admin',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
		});
	}
</script>

<svelte:head>
	<title>Admin Dashboard - Beaute & Elegance</title>
</svelte:head>

{#if isAuthenticated}
	<div class="admin-layout">
		<Sidebar />
		<div class="main-wrapper">
			<TopNav />
			<main class="main-content">
				<slot />
			</main>
		</div>
	</div>
	<Notification />
{:else}
	<div class="auth-loading">
		<div class="spinner"></div>
		<p>Authentification...</p>
	</div>
{/if}

<style>
	.admin-layout {
		display: flex;
		min-height: 100vh;
		background-color: var(--color-primary-beige);
	}

	.main-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main-content {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-lg);
		background-color: var(--color-primary-cream);
	}

	.auth-loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: var(--color-primary-beige);
		gap: var(--spacing-lg);
	}

	.spinner {
		width: 5rem;
		height: 5rem;
		border: 3px solid var(--color-primary-light-beige);
		border-top-color: var(--color-accent-teal);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.auth-loading p {
		font-family: var(--font-serif);
		font-size: 1.8rem;
		color: var(--color-accent-teal);
		letter-spacing: 0.1em;
	}

	@media (max-width: 768px) {
		.main-content {
			padding: var(--spacing-md);
		}
	}

	@media (max-width: 480px) {
		.main-content {
			padding: var(--spacing-sm);
		}
	}
</style>
