<script lang="ts">
	import { user, isAuthenticated } from '$lib/stores/user_store';
	import DashboardSidebar from '$lib/components/Dashboard/DashboardSidebar.svelte';
	import ProfileSection from '$lib/components/Dashboard/ProfileSection.svelte';
	import OrdersSection from '$lib/components/Dashboard/OrdersSection.svelte';
	import FavoritesSection from '$lib/components/Dashboard/FavoritesSection.svelte';
	import FeedbackSection from '$lib/components/Dashboard/FeedbackSection.svelte';
	import { onMount } from 'svelte';

	let activeSection: 'profile' | 'orders' | 'favorites' | 'feedback' = 'profile';
	let isMobileOpen = false;
	let isLoading = true;

	onMount(() => {
		// Check if user is authenticated
		const unsubscribe = isAuthenticated.subscribe((authenticated) => {
			if (!authenticated) {
				// Redirect to login if not authenticated
				if (typeof window !== 'undefined') {
					window.location.href = '/login';
				}
			}
			isLoading = false;
		});

		return () => unsubscribe();
	});

	function handleNavigate(section: 'profile' | 'orders' | 'favorites' | 'feedback') {
		activeSection = section;
		isMobileOpen = false;
	}

	function toggleMobileSidebar() {
		isMobileOpen = !isMobileOpen;
	}
</script>

<svelte:head>
	<title>Dashboard | Beaute & Elegance</title>
</svelte:head>

<div class="dashboard-container">
	<DashboardSidebar
		{activeSection}
		onNavigate={handleNavigate}
		bind:isMobileOpen
	/>

	<main class="dashboard-content">
		<header class="dashboard-header">
			<button class="mobile-menu-btn" on:click={toggleMobileSidebar}>
				<div class="menu-bar"></div>
				<div class="menu-bar"></div>
				<div class="menu-bar"></div>
			</button>
			<div class="header-user-info">
				{#if $user}
					<span class="greeting">Bienvenue, {$user.firstName}</span>
				{/if}
			</div>
		</header>

		<div class="dashboard-sections">
			{#if isLoading}
				<div class="loading">Chargement...</div>
			{:else if activeSection === 'profile'}
				<ProfileSection />
			{:else if activeSection === 'orders'}
				<OrdersSection />
			{:else if activeSection === 'favorites'}
				<FavoritesSection />
			{:else if activeSection === 'feedback'}
				<FeedbackSection />
			{/if}
		</div>
	</main>
</div>

<style>
	.dashboard-container {
		display: flex;
		min-height: 100vh;
		background: #fafafa;
	}

	.dashboard-content {
		flex: 1;
		margin-left: 25rem;
		display: flex;
		flex-direction: column;
	}

	.dashboard-header {
		background: #f0d9d9;
		padding: 2rem;
		border-bottom: 1px solid #e0c9c9;
		display: flex;
		align-items: center;
		gap: 2rem;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
	}

	.mobile-menu-btn {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		gap: 0.5rem;
		flex-direction: column;
	}

	.menu-bar {
		width: 2.5rem;
		height: 0.4rem;
		background: #333;
		border-radius: 2px;
	}

	.header-user-info {
		flex: 1;
	}

	.greeting {
		font-size: 1.8rem;
		font-weight: 500;
		color: #333;
	}

	.dashboard-sections {
		flex: 1;
		padding: 3rem;
		overflow-y: auto;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 1.8rem;
		color: #999;
	}

	@media (max-width: 950px) {
		.dashboard-container {
			flex-direction: column;
		}

		.dashboard-content {
			margin-left: 0;
		}

		.dashboard-header {
			padding: 1.5rem;
		}

		.mobile-menu-btn {
			display: flex;
		}

		.dashboard-sections {
			padding: 2rem 1.5rem;
		}
	}

	@media (max-width: 600px) {
		.dashboard-sections {
			padding: 1.5rem 1rem;
		}

		.greeting {
			font-size: 1.5rem;
		}
	}
</style>
