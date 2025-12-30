<script lang="ts">
	import { goto } from '$app/navigation';
	import { uiStore } from '$lib/stores/ui_store';

	let activeSection = 'dashboard';
	let sidebarOpen = true;

	uiStore.subscribe((state) => {
		activeSection = state.activeSection;
		sidebarOpen = state.sidebarOpen;
	});

	const menuItems = [
		{
			id: 'dashboard',
			label: 'Tableau de Bord',
			icon: '📊',
			route: '/dashboard'
		},
		{
			id: 'orders',
			label: 'Commandes',
			icon: '📦',
			route: '/orders'
		},
		{
			id: 'products',
			label: 'Produits',
			icon: '🛍️',
			route: '/products'
		},
		{
			id: 'stock',
			label: 'Inventaire',
			icon: '📈',
			route: '/stock'
		},
		{
			id: 'promotions',
			label: 'Promotions',
			icon: '🎉',
			route: '/promotions'
		},
		{
			id: 'profile',
			label: 'Profil',
			icon: '👤',
			route: '/profile'
		}
	];

	function handleNavigation(item: (typeof menuItems)[0]) {
		uiStore.setActiveSection(item.id);
		goto(item.route);
	}

	function toggleSidebar() {
		uiStore.toggleSidebar();
	}
</script>

<aside class="sidebar" class:collapsed={!sidebarOpen}>
	<div class="sidebar-header">
		<div class="logo-section">
			<span class="logo-icon">✨</span>
			{#if sidebarOpen}
				<h2 class="logo-text">Beauté & Élégance</h2>
			{/if}
		</div>
		<button class="toggle-btn" on:click={toggleSidebar} title="Toggle sidebar">
			{#if sidebarOpen}
				<span>←</span>
			{:else}
				<span>→</span>
			{/if}
		</button>
	</div>

	<nav class="sidebar-nav">
		{#each menuItems as item (item.id)}
			<button
				class="nav-item"
				class:active={activeSection === item.id}
				on:click={() => handleNavigation(item)}
				title={item.label}
			>
				<span class="nav-icon">{item.icon}</span>
				{#if sidebarOpen}
					<span class="nav-label">{item.label}</span>
				{/if}
			</button>
		{/each}
	</nav>

	<div class="sidebar-footer">
		<button class="logout-btn" title="Déconnexion">
			<span>🚪</span>
			{#if sidebarOpen}
				<span>Déconnexion</span>
			{/if}
		</button>
	</div>
</aside>

<style>
	.sidebar {
		width: 280px;
		background: linear-gradient(135deg, var(--color-accent-teal) 0%, var(--color-accent-purple) 100%);
		color: white;
		display: flex;
		flex-direction: column;
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		transition: width 0.3s ease;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.sidebar.collapsed {
		width: 80px;
	}

	.sidebar-header {
		padding: var(--spacing-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2px solid rgba(255, 255, 255, 0.1);
		gap: var(--spacing-sm);
	}

	.logo-section {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		flex: 1;
	}

	.logo-icon {
		font-size: 2rem;
		display: flex;
		align-items: center;
	}

	.logo-text {
		font-family: var(--font-display);
		font-size: 1.6rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		white-space: nowrap;
	}

	.toggle-btn {
		background: rgba(255, 255, 255, 0.2);
		border: none;
		color: white;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: var(--radius-md);
		font-size: 1.6rem;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.toggle-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.05);
	}

	.sidebar-nav {
		flex: 1;
		padding: var(--spacing-lg) var(--spacing-md);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md) var(--spacing-lg);
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid transparent;
		border-radius: var(--radius-lg);
		color: white;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1.5rem;
		font-weight: 500;
		white-space: nowrap;
		justify-content: flex-start;
	}

	.nav-item:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateX(4px);
	}

	.nav-item.active {
		background: rgba(255, 255, 255, 0.25);
		border-color: white;
		box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
	}

	.nav-icon {
		font-size: 1.8rem;
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.nav-label {
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
	}

	.sidebar-footer {
		padding: var(--spacing-lg) var(--spacing-md);
		border-top: 2px solid rgba(255, 255, 255, 0.1);
	}

	.logout-btn {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		width: 100%;
		padding: var(--spacing-md) var(--spacing-lg);
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid transparent;
		border-radius: var(--radius-lg);
		color: white;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1.5rem;
		font-weight: 500;
		white-space: nowrap;
		justify-content: center;
	}

	.logout-btn:hover {
		background: rgba(231, 76, 60, 0.3);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.sidebar {
			width: 70px;
		}

		.sidebar.collapsed {
			width: 70px;
		}

		.logo-text,
		.nav-label,
		.logout-btn span:last-child {
			display: none;
		}

		.toggle-btn {
			width: 3rem;
			height: 3rem;
			font-size: 1.2rem;
		}

		.nav-item {
			justify-content: center;
			padding: var(--spacing-md);
		}

		.logout-btn {
			padding: var(--spacing-md);
		}
	}
</style>
