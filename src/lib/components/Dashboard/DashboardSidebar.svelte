<script lang="ts">
	import { user, isAuthenticated } from '$lib/stores/user_store';
	import closeIcon from '$lib/assets/icons/close.png';
	import logoutIcon from '$lib/assets/icons/close.png';

	export let activeSection: 'profile' | 'orders' | 'favorites' | 'feedback' = 'profile';
	export let onNavigate: (section: 'profile' | 'orders' | 'favorites' | 'feedback') => void;
	export let isMobileOpen = false;

	const sections = [
		{ id: 'profile', label: 'Mon Profil', icon: '👤' },
		{ id: 'orders', label: 'Mes Commandes', icon: '📦' },
		{ id: 'favorites', label: 'Favoris', icon: '❤️' },
		{ id: 'feedback', label: 'Retour d\'expérience', icon: '⭐' }
	];

	function handleLogout() {
		user.logout();
		if (typeof window !== 'undefined') {
			window.location.href = '/login';
		}
	}

	function handleNavigation(section: 'profile' | 'orders' | 'favorites' | 'feedback') {
		activeSection = section;
		onNavigate(section);
		isMobileOpen = false;
	}
</script>

<aside class="dashboard-sidebar" class:mobile-open={isMobileOpen}>
	<div class="sidebar-header">
		<h2>Dashboard</h2>
		{#if isMobileOpen}
			<button class="close-btn" on:click={() => (isMobileOpen = false)}>
				<img src={closeIcon} alt="close" />
			</button>
		{/if}
	</div>

	<nav class="sidebar-nav">
		{#each sections as section (section.id)}
			<button
				class="nav-item"
				class:active={activeSection === section.id}
				on:click={() => handleNavigation(section.id)}
			>
				<span class="icon">{section.icon}</span>
				<span class="label">{section.label}</span>
			</button>
		{/each}
	</nav>

	<div class="sidebar-footer">
		<button class="logout-btn" on:click={handleLogout}>
			<span>Déconnexion</span>
		</button>
	</div>
</aside>

<style>
	.dashboard-sidebar {
		width: 25rem;
		background: #f0d9d9;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
		z-index: 100;
	}

	.sidebar-header {
		padding: 2rem;
		border-bottom: 1px solid #e0c9c9;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.sidebar-header h2 {
		font-family: 'Abril Fatface';
		font-size: 2.4rem;
		color: #333;
		margin: 0;
	}

	.close-btn {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.close-btn img {
		width: 2.5rem;
		height: 2.5rem;
	}

	.sidebar-nav {
		flex: 1;
		padding: 2rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1.5rem 2rem;
		background: none;
		border: none;
		cursor: pointer;
		color: #333;
		font-size: 1.6rem;
		font-weight: 500;
		transition: 0.2s;
		border-left: 4px solid transparent;
	}

	.nav-item:hover {
		background: #e8cbc8;
		border-left-color: #b37777;
	}

	.nav-item.active {
		background: #e8cbc8;
		border-left-color: #b37777;
		font-weight: 600;
	}

	.nav-item .icon {
		font-size: 2rem;
	}

	.nav-item .label {
		flex: 1;
		text-align: left;
	}

	.sidebar-footer {
		padding: 2rem;
		border-top: 1px solid #e0c9c9;
	}

	.logout-btn {
		width: 100%;
		padding: 1.2rem;
		background: #f1dada;
		border: none;
		border-radius: 8px;
		font-size: 1.6rem;
		font-weight: 500;
		cursor: pointer;
		transition: 0.3s;
		color: #333;
	}

	.logout-btn:hover {
		background: #fff;
		color: #b37777;
		outline: 2px solid #b37777;
	}

	.logout-btn:active {
		transform: scale(0.98);
	}

	@media (max-width: 950px) {
		.dashboard-sidebar {
			width: 100%;
			height: auto;
			position: fixed;
			top: 0;
			left: 0;
			bottom: auto;
			transform: translateX(-100%);
			transition: transform 0.3s;
			flex-direction: row;
			align-items: center;
			padding: 1rem;
		}

		.dashboard-sidebar.mobile-open {
			transform: translateX(0);
			flex-direction: column;
			height: 100vh;
			width: 100%;
		}

		.sidebar-header {
			padding: 0;
			border: none;
			flex: 1;
		}

		.close-btn {
			display: block;
		}

		.sidebar-nav {
			display: none;
			padding: 2rem 0;
		}

		.dashboard-sidebar.mobile-open .sidebar-nav {
			display: flex;
		}

		.sidebar-footer {
			display: none;
			padding: 2rem;
			border-top: 1px solid #e0c9c9;
			width: 100%;
		}

		.dashboard-sidebar.mobile-open .sidebar-footer {
			display: block;
		}
	}
</style>
