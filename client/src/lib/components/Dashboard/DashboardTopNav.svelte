<script lang="ts">
	import { user } from '$lib/stores/user_store';
	import logoUncolored from '$lib/assets/logo-uncolored.png';

	export let activeSection: 'profile' | 'orders' | 'favorites' | 'feedback' = 'profile';
	export let onNavigate: (section: 'profile' | 'orders' | 'favorites' | 'feedback') => void;

	const sections = [
		{ id: 'profile', label: 'Mon Profil' },
		{ id: 'orders', label: 'Mes Commandes' },
		{ id: 'favorites', label: 'Favoris' },
		{ id: 'feedback', label: 'Retour d\'expérience' }
	];

	function handleLogout() {
		user.logout();
		if (typeof window !== 'undefined') {
			window.location.href = '/';
		}
	}

	function handleNavigation(section: 'profile' | 'orders' | 'favorites' | 'feedback') {
		onNavigate(section);
	}
</script>

<nav class="dashboard-nav">
	<div class="nav-container">
		<div class="nav-left">
			<a href="/" class="logo-link">
				<img src={logoUncolored} alt="Beaute & Elegance" class="logo" />
			</a>
			<div class="nav-divider"></div>
			<ul class="nav-links">
				{#each sections as section (section.id)}
					<li>
						<button
							class="nav-link"
							class:active={activeSection === section.id}
							on:click={() => handleNavigation(section.id)}
						>
							{section.label}
						</button>
					</li>
				{/each}
			</ul>
		</div>

		<div class="nav-right">
			{#if $user}
				<span class="user-greeting">{$user.firstName} {$user.lastName}</span>
			{/if}
			<button class="logout-link" on:click={handleLogout}>Déconnexion</button>
		</div>
	</div>
</nav>

<style>
	.dashboard-nav {
		background: linear-gradient(90deg, #fff 0%, #fefdfb 100%);
		border-bottom: 2px solid #f0d9d9;
		padding: 1.8rem 0;
		position: sticky;
		top: 0;
		z-index: 50;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
		backdrop-filter: blur(10px);
	}

	.nav-container {
		max-width: 1500px;
		margin: 0 auto;
		padding: 0 3.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 3rem;
	}

	.nav-left {
		display: flex;
		align-items: center;
		gap: 2.8rem;
		flex: 1;
	}

	.logo-link {
		display: flex;
		align-items: center;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.logo-link:hover {
		transform: scale(1.05);
	}

	.logo {
		width: 4.8rem;
		height: 4.8rem;
		object-fit: contain;
	}

	.nav-divider {
		width: 2px;
		height: 3.5rem;
		background: linear-gradient(180deg, transparent, #f0d9d9, transparent);
	}

	.nav-links {
		display: flex;
		list-style: none;
		gap: 0;
		margin: 0;
		padding: 0;
	}

	.nav-link {
		background: none;
		border: none;
		padding: 1.2rem 2rem;
		font-size: 1.6rem;
		color: #666;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		font-family: 'Andada Pro', serif;
		font-weight: 500;
		letter-spacing: 0.02em;
		position: relative;
		border-bottom: 3px solid transparent;
		margin-bottom: -1px;
		text-transform: uppercase;
		font-size: 1.4rem;
	}

	.nav-link:hover {
		color: #b37777;
		border-bottom-color: rgba(209, 178, 178, 0.5);
	}

	.nav-link.active {
		color: #8b5555;
		border-bottom-color: #b37777;
		font-weight: 700;
		background: rgba(209, 178, 178, 0.08);
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 2.5rem;
	}

	.user-greeting {
		font-size: 1.5rem;
		color: #666;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
		font-weight: 500;
	}

	.logout-link {
		background: linear-gradient(135deg, #f1dada 0%, #f5e5e5 100%);
		border: 2px solid transparent;
		padding: 1rem 2rem;
		font-size: 1.5rem;
		color: #8b5555;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
		border-radius: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		font-size: 1.3rem;
		white-space: nowrap;
	}

	.logout-link:hover {
		color: #6b4444;
		background: linear-gradient(135deg, #fff 0%, #fff9f9 100%);
		border-color: #b37777;
		box-shadow: 0 6px 16px rgba(179, 119, 119, 0.15);
		transform: translateY(-2px);
	}

	@media (max-width: 950px) {
		.nav-container {
			padding: 0 1.5rem;
			flex-wrap: wrap;
			gap: 1.5rem;
		}

		.nav-left {
			order: 1;
			gap: 1.5rem;
		}

		.logo {
			width: 4rem;
			height: 4rem;
		}

		.nav-links {
			gap: 0;
		}

		.nav-link {
			padding: 0.8rem 1.2rem;
			font-size: 1.3rem;
		}

		.nav-right {
			order: 2;
			width: 100%;
		}

		.user-greeting {
			display: none;
		}

		.logout-link {
			width: 100%;
		}
	}

	@media (max-width: 600px) {
		.nav-container {
			padding: 0 1rem;
			flex-direction: column;
			gap: 1rem;
		}

		.nav-left {
			width: 100%;
		}

		.nav-links {
			flex-direction: column;
			gap: 0;
		}

		.nav-link {
			padding: 1rem 1.2rem;
			border-bottom: 0.1rem solid #f0f0f0;
			border-right: 3px solid transparent;
			margin-bottom: 0;
		}

		.nav-link.active {
			border-bottom: 0.1rem solid #f0f0f0;
			border-right-color: #f1dada;
		}

		.logo {
			width: 3.5rem;
			height: 3.5rem;
		}

		.nav-divider {
			height: 2.5rem;
		}
	}
</style>
