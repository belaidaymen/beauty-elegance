<script lang="ts">
	import { authStore } from '$lib/stores/auth_store';

	let user = {
		name: 'Admin User',
		email: 'admin@beaute-elegance.com',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
	};

	let showUserMenu = false;

	authStore.subscribe((state) => {
		if (state.user) {
			user.name = state.user.name;
			user.email = state.user.email;
			user.avatar = state.user.avatar || user.avatar;
		}
	});

	const currentTime = new Date().toLocaleDateString('fr-FR', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<header class="top-nav">
	<div class="nav-left">
		<h1 class="page-title">Tableau de Bord Administrateur</h1>
		<p class="current-date">{currentTime}</p>
	</div>

	<div class="nav-right">
		<button class="search-btn" title="Rechercher">
			<span>🔍</span>
		</button>

		<button class="notification-btn" title="Notifications">
			<span>🔔</span>
			<span class="badge">3</span>
		</button>

		<div class="user-section">
			<button class="user-menu-btn" on:click={() => (showUserMenu = !showUserMenu)}>
				<img src={user.avatar} alt={user.name} class="avatar" />
				<div class="user-info">
					<p class="user-name">{user.name}</p>
					<p class="user-role">Administrateur</p>
				</div>
				<span class="dropdown-arrow">▼</span>
			</button>

			{#if showUserMenu}
				<div class="user-menu">
					<a href="/profile" class="menu-item">👤 Profil</a>
					<a href="/settings" class="menu-item">⚙️ Paramètres</a>
					<hr class="menu-divider" />
					<button class="menu-item logout-item">🚪 Déconnexion</button>
				</div>
			{/if}
		</div>
	</div>
</header>

<style>
	.top-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-lg) var(--spacing-xl);
		background: white;
		border-bottom: 2px solid var(--color-border);
		box-shadow: var(--shadow-sm);
	}

	.nav-left {
		flex: 1;
	}

	.page-title {
		font-size: 2.2rem;
		font-weight: 700;
		color: var(--color-text-dark);
		margin-bottom: var(--spacing-sm);
	}

	.current-date {
		font-size: 1.3rem;
		color: var(--color-text-lighter);
		text-transform: capitalize;
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
	}

	.search-btn,
	.notification-btn {
		background: var(--color-primary-light-beige);
		border: none;
		width: 4rem;
		height: 4rem;
		border-radius: var(--radius-lg);
		cursor: pointer;
		font-size: 1.8rem;
		transition: all 0.3s ease;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search-btn:hover,
	.notification-btn:hover {
		background: var(--color-accent-burgundy);
		color: white;
		transform: scale(1.05);
	}

	.notification-btn {
		position: relative;
	}

	.notification-btn .badge {
		position: absolute;
		top: -5px;
		right: -5px;
		background: var(--color-error);
		color: white;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
		font-weight: 700;
	}

	.user-section {
		position: relative;
	}

	.user-menu-btn {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-primary-light-beige);
		border: 2px solid transparent;
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.user-menu-btn:hover {
		background: var(--color-primary-cream);
		border-color: var(--color-accent-teal);
	}

	.avatar {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--color-accent-teal);
	}

	.user-info {
		text-align: left;
	}

	.user-name {
		font-weight: 600;
		color: var(--color-text-dark);
		font-size: 1.4rem;
	}

	.user-role {
		font-size: 1.2rem;
		color: var(--color-text-lighter);
	}

	.dropdown-arrow {
		font-size: 1.2rem;
		color: var(--color-accent-teal);
		transition: transform 0.3s ease;
	}

	.user-menu-btn:hover .dropdown-arrow {
		transform: rotateZ(180deg);
	}

	.user-menu {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: var(--spacing-sm);
		background: white;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		min-width: 200px;
		z-index: 1000;
		overflow: hidden;
	}

	.menu-item {
		display: block;
		width: 100%;
		padding: var(--spacing-md) var(--spacing-lg);
		background: none;
		border: none;
		text-align: left;
		cursor: pointer;
		transition: all 0.3s ease;
		color: var(--color-text-dark);
		font-size: 1.4rem;
		font-weight: 500;
	}

	.menu-item:hover {
		background: var(--color-primary-light-beige);
		color: var(--color-accent-teal);
	}

	.logout-item:hover {
		background: rgba(231, 76, 60, 0.1);
		color: var(--color-error);
	}

	.menu-divider {
		margin: 0;
		border: none;
		border-top: 1px solid var(--color-border);
	}

	@media (max-width: 768px) {
		.top-nav {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
			padding: var(--spacing-md);
		}

		.page-title {
			font-size: 1.8rem;
		}

		.nav-right {
			width: 100%;
			justify-content: flex-end;
		}

		.user-info {
			display: none;
		}

		.user-menu-btn {
			padding: var(--spacing-sm);
		}

		.avatar {
			width: 3.5rem;
			height: 3.5rem;
		}
	}
</style>
