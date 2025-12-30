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
		background: #fff;
		border-bottom: 0.1rem solid #f0d9d9;
		padding: 1.5rem 0;
		position: sticky;
		top: 0;
		z-index: 50;
		box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.03);
	}

	.nav-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 3rem;
	}

	.nav-left {
		display: flex;
		align-items: center;
		gap: 2.5rem;
		flex: 1;
	}

	.logo-link {
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	.logo {
		width: 4.5rem;
		height: 4.5rem;
		object-fit: contain;
	}

	.nav-divider {
		width: 0.1rem;
		height: 3rem;
		background: #f0d9d9;
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
		padding: 1rem 1.8rem;
		font-size: 1.5rem;
		color: #666;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: 'Andada Pro', serif;
		font-weight: 500;
		letter-spacing: 0.02rem;
		position: relative;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
	}

	.nav-link:hover {
		color: #b37777;
	}

	.nav-link.active {
		color: #333;
		border-bottom-color: #f1dada;
		font-weight: 600;
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.user-greeting {
		font-size: 1.4rem;
		color: #666;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02rem;
	}

	.logout-link {
		background: none;
		border: none;
		padding: 0.8rem 1.6rem;
		font-size: 1.4rem;
		color: #b37777;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02rem;
		border: 0.1rem solid transparent;
		border-radius: 4px;
	}

	.logout-link:hover {
		color: #8b5555;
		border-color: #f1dada;
		background: #fff9f9;
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
