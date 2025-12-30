<script lang="ts">
	import { authStore } from '$lib/stores/auth_store';
	import { uiStore } from '$lib/stores/ui_store';
	import ProfileSection from '$lib/components/Profile/ProfileSection.svelte';
	import SettingsSection from '$lib/components/Profile/SettingsSection.svelte';
	import PermissionsSection from '$lib/components/Profile/PermissionsSection.svelte';

	let activeTab: 'profile' | 'settings' | 'permissions' = 'profile';

	let user = {
		name: 'Admin User',
		email: 'admin@beaute-elegance.com',
		role: 'admin' as 'admin' | 'manager' | 'editor',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
		phone: '+213 555 123456',
		joinDate: new Date('2024-01-01')
	};

	authStore.subscribe((state) => {
		if (state.user) {
			user.name = state.user.name;
			user.email = state.user.email;
			user.role = state.user.role;
			user.avatar = state.user.avatar || user.avatar;
		}
	});

	const tabs = [
		{ id: 'profile', label: 'Profil', icon: '👤' },
		{ id: 'settings', label: 'Paramètres', icon: '⚙️' },
		{ id: 'permissions', label: 'Permissions', icon: '🔐' }
	] as const;
</script>

<svelte:head>
	<title>Mon Profil | Admin</title>
</svelte:head>

<div class="profile-container">
	<section class="profile-header">
		<div class="header-content">
			<img src={user.avatar} alt={user.name} class="profile-avatar" />
			<div class="header-info">
				<h1>{user.name}</h1>
				<p class="role-badge">{user.role === 'admin' ? '👑 Administrateur' : user.role === 'manager' ? '📊 Gestionnaire' : '✏️ Éditeur'}</p>
				<p class="email">{user.email}</p>
			</div>
		</div>
	</section>

	<nav class="profile-tabs">
		{#each tabs as tab}
			<button
				class="tab-btn"
				class:active={activeTab === tab.id}
				on:click={() => (activeTab = tab.id)}
			>
				<span class="tab-icon">{tab.icon}</span>
				<span class="tab-label">{tab.label}</span>
			</button>
		{/each}
	</nav>

	<div class="profile-content">
		{#if activeTab === 'profile'}
			<ProfileSection {user} />
		{:else if activeTab === 'settings'}
			<SettingsSection {user} />
		{:else if activeTab === 'permissions'}
			<PermissionsSection {user} />
		{/if}
	</div>
</div>

<style>
	.profile-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.profile-header {
		background: white;
		border-radius: var(--radius-lg);
		padding: var(--spacing-xl);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: var(--spacing-xl);
	}

	.profile-avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		border: 4px solid var(--color-accent-teal);
		object-fit: cover;
	}

	.header-info h1 {
		margin: 0 0 var(--spacing-sm) 0;
		color: var(--color-accent-teal);
	}

	.role-badge {
		margin: 0 0 var(--spacing-sm) 0;
		display: inline-block;
		padding: 0.5rem 1rem;
		background: rgba(43, 138, 138, 0.15);
		color: var(--color-accent-teal);
		border-radius: var(--radius-md);
		font-weight: 600;
		font-size: 1.4rem;
	}

	.email {
		margin: 0;
		color: var(--color-text-lighter);
		font-size: 1.4rem;
	}

	.profile-tabs {
		display: flex;
		gap: var(--spacing-md);
		background: white;
		border-radius: var(--radius-lg);
		padding: var(--spacing-md);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
		border-bottom: 2px solid var(--color-border);
	}

	.tab-btn {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-lg);
		background: none;
		border: none;
		border-bottom: 3px solid transparent;
		color: var(--color-text-light);
		cursor: pointer;
		font-size: 1.5rem;
		font-weight: 600;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.tab-btn:hover {
		color: var(--color-accent-teal);
	}

	.tab-btn.active {
		color: var(--color-accent-teal);
		border-bottom-color: var(--color-accent-teal);
	}

	.tab-icon {
		font-size: 1.8rem;
	}

	.profile-content {
		background: white;
		border-radius: var(--radius-lg);
		padding: var(--spacing-xl);
		box-shadow: var(--shadow-sm);
		border: 1px solid var(--color-border);
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.header-content {
			flex-direction: column;
			text-align: center;
		}

		.profile-avatar {
			width: 100px;
			height: 100px;
		}

		.profile-tabs {
			flex-wrap: wrap;
		}

		.tab-btn {
			flex: 1;
			justify-content: center;
			min-width: 120px;
		}

		.tab-label {
			display: none;
		}

		.profile-content {
			padding: var(--spacing-lg);
		}
	}

	@media (max-width: 480px) {
		.profile-header {
			padding: var(--spacing-lg);
		}

		.header-content {
			gap: var(--spacing-md);
		}

		.profile-avatar {
			width: 80px;
			height: 80px;
		}

		.header-info h1 {
			font-size: 1.8rem;
		}
	}
</style>
