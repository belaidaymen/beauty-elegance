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
		background: linear-gradient(180deg, #fff 0%, #faf9f8 50%, #f5f1f0 100%);
		min-height: calc(100vh - 60px);
	}

	.content-wrapper {
		max-width: 1300px;
		margin: 0 auto;
		padding: 4.5rem 3.5rem;
	}

	.loading-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		gap: 2rem;
		background: linear-gradient(135deg, #fff 0%, #faf9f8 100%);
	}

	.loading-spinner {
		width: 4.8rem;
		height: 4.8rem;
		border: 3px solid #f0d9d9;
		border-top-color: #b37777;
		border-right-color: #d1b2b2;
		border-radius: 50%;
		animation: spin 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
		box-shadow: 0 0 20px rgba(179, 119, 119, 0.2);
	}

	.loading-container p {
		font-size: 1.7rem;
		color: #888;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.05rem;
		font-weight: 500;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 950px) {
		.content-wrapper {
			padding: 3.5rem 2rem;
		}
	}

	@media (max-width: 600px) {
		.content-wrapper {
			padding: 2.5rem 1.2rem;
		}
	}
</style>
