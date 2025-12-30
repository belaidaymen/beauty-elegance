<script lang="ts">
	import { user, isAuthenticated } from '$lib/stores/user_store';
	import DashboardTopNav from '$lib/components/Dashboard/DashboardTopNav.svelte';
	import ProfileSection from '$lib/components/Dashboard/ProfileSection.svelte';
	import OrdersSection from '$lib/components/Dashboard/OrdersSection.svelte';
	import FavoritesSection from '$lib/components/Dashboard/FavoritesSection.svelte';
	import FeedbackSection from '$lib/components/Dashboard/FeedbackSection.svelte';
	import { onMount } from 'svelte';

	let activeSection: 'profile' | 'orders' | 'favorites' | 'feedback' = 'profile';
	let isLoading = true;

	onMount(() => {
		const unsubscribe = isAuthenticated.subscribe((authenticated) => {
			if (!authenticated) {
				if (typeof window !== 'undefined') {
					window.location.href = '/';
				}
			}
			isLoading = false;
		});

		return () => unsubscribe();
	});

	function handleNavigate(section: 'profile' | 'orders' | 'favorites' | 'feedback') {
		activeSection = section;
	}
</script>

<svelte:head>
	<title>Mon Compte | Beaute & Elegance</title>
</svelte:head>

<DashboardTopNav {activeSection} onNavigate={handleNavigate} />

<main class="dashboard-main">
	{#if isLoading}
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<p>Chargement...</p>
		</div>
	{:else}
		<div class="content-wrapper">
			{#if activeSection === 'profile'}
				<ProfileSection />
			{:else if activeSection === 'orders'}
				<OrdersSection />
			{:else if activeSection === 'favorites'}
				<FavoritesSection />
			{:else if activeSection === 'feedback'}
				<FeedbackSection />
			{/if}
		</div>
	{/if}
</main>

<style>
	.dashboard-main {
		background: #fff;
		min-height: calc(100vh - 60px);
	}

	.content-wrapper {
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 3rem;
	}

	.loading-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		gap: 2rem;
	}

	.loading-spinner {
		width: 4rem;
		height: 4rem;
		border: 2px solid #f0d9d9;
		border-top-color: #b37777;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	.loading-container p {
		font-size: 1.6rem;
		color: #999;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.05rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 950px) {
		.content-wrapper {
			padding: 3rem 1.5rem;
		}
	}

	@media (max-width: 600px) {
		.content-wrapper {
			padding: 2rem 1rem;
		}
	}
</style>
