<script lang="ts">
	import { uiStore } from '$lib/stores/ui_store';

	interface User {
		name: string;
		email: string;
		phone?: string;
		joinDate?: Date;
		role: 'admin' | 'manager' | 'editor';
	}

	export let user: User;

	const roles = {
		admin: {
			name: '👑 Administrateur',
			description: 'Accès complet à tous les modules',
			permissions: [
				{ name: 'Gestion des Commandes', icon: '📦', enabled: true },
				{ name: 'Gestion des Produits', icon: '🛍️', enabled: true },
				{ name: 'Gestion de l\'Inventaire', icon: '📈', enabled: true },
				{ name: 'Gestion des Promotions', icon: '🎉', enabled: true },
				{ name: 'Gestion des Utilisateurs', icon: '👥', enabled: true },
				{ name: 'Paramètres Système', icon: '⚙️', enabled: true },
				{ name: 'Rapports & Analytics', icon: '📊', enabled: true },
				{ name: 'Sauvegardes', icon: '💾', enabled: true }
			]
		},
		manager: {
			name: '📊 Gestionnaire',
			description: 'Gestion des commandes et inventaire',
			permissions: [
				{ name: 'Gestion des Commandes', icon: '📦', enabled: true },
				{ name: 'Gestion des Produits', icon: '🛍️', enabled: true },
				{ name: 'Gestion de l\'Inventaire', icon: '📈', enabled: true },
				{ name: 'Gestion des Promotions', icon: '🎉', enabled: true },
				{ name: 'Gestion des Utilisateurs', icon: '👥', enabled: false },
				{ name: 'Paramètres Système', icon: '⚙️', enabled: false },
				{ name: 'Rapports & Analytics', icon: '📊', enabled: true },
				{ name: 'Sauvegardes', icon: '💾', enabled: false }
			]
		},
		editor: {
			name: '✏️ Éditeur',
			description: 'Édition limitée du contenu',
			permissions: [
				{ name: 'Gestion des Commandes', icon: '📦', enabled: false },
				{ name: 'Gestion des Produits', icon: '🛍️', enabled: true },
				{ name: 'Gestion de l\'Inventaire', icon: '📈', enabled: false },
				{ name: 'Gestion des Promotions', icon: '🎉', enabled: true },
				{ name: 'Gestion des Utilisateurs', icon: '👥', enabled: false },
				{ name: 'Paramètres Système', icon: '⚙️', enabled: false },
				{ name: 'Rapports & Analytics', icon: '📊', enabled: false },
				{ name: 'Sauvegardes', icon: '💾', enabled: false }
			]
		}
	};

	$: currentRoleData = roles[user.role];
</script>

<section class="permissions-section">
	<div class="role-info">
		<div class="role-header">
			<h2>{currentRoleData.name}</h2>
			<p class="role-description">{currentRoleData.description}</p>
		</div>
		<div class="role-note">
			<p>ℹ️ Pour changer votre rôle, contactez un administrateur.</p>
		</div>
	</div>

	<div class="permissions-list">
		<h3>Permissions Associées</h3>
		<div class="permissions-grid">
			{#each currentRoleData.permissions as permission}
				<div class="permission-item" class:disabled={!permission.enabled}>
					<div class="permission-icon">{permission.icon}</div>
					<div class="permission-info">
						<p class="permission-name">{permission.name}</p>
					</div>
					<div class="permission-status">
						{#if permission.enabled}
							<span class="status-badge granted">✓ Autorisé</span>
						{:else}
							<span class="status-badge denied">✕ Refusé</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="security-info">
		<h3>Informations de Sécurité</h3>
		<div class="security-items">
			<div class="security-item">
				<span class="item-label">Authentification à Deux Facteurs</span>
				<span class="item-status">
					<span class="status-badge">⚠️ Désactivée</span>
				</span>
			</div>
			<div class="security-item">
				<span class="item-label">Dernière Connexion</span>
				<span class="item-value">Il y a 2 heures</span>
			</div>
			<div class="security-item">
				<span class="item-label">Appareils Actifs</span>
				<span class="item-value">1 appareil</span>
			</div>
			<div class="security-item">
				<span class="item-label">Sessions Actives</span>
				<span class="item-value">1 session</span>
			</div>
		</div>
		<button class="btn btn-secondary">Activer 2FA</button>
	</div>
</section>

<style>
	.permissions-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.role-info {
		background: var(--color-primary-light-beige);
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		border: 2px solid var(--color-accent-teal);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-lg);
	}

	.role-header h2 {
		margin: 0 0 var(--spacing-sm) 0;
		color: var(--color-accent-teal);
	}

	.role-description {
		margin: 0;
		color: var(--color-text-lighter);
		font-size: 1.4rem;
	}

	.role-note {
		background: rgba(52, 152, 219, 0.15);
		padding: var(--spacing-lg);
		border-radius: var(--radius-md);
		border-left: 4px solid var(--color-info);
	}

	.role-note p {
		margin: 0;
		color: var(--color-info);
		font-size: 1.4rem;
		font-weight: 500;
	}

	.permissions-list h3,
	.security-info h3 {
		margin: 0 0 var(--spacing-lg) 0;
		color: var(--color-accent-teal);
		padding-bottom: var(--spacing-md);
		border-bottom: 2px solid var(--color-border);
	}

	.permissions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
	}

	.permission-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-lg);
		background: white;
		border: 2px solid var(--color-success);
		border-radius: var(--radius-lg);
		transition: all 0.3s ease;
	}

	.permission-item:hover:not(.disabled) {
		box-shadow: var(--shadow-md);
		border-color: var(--color-accent-teal);
	}

	.permission-item.disabled {
		background: var(--color-primary-cream);
		border-color: var(--color-error);
		opacity: 0.6;
	}

	.permission-icon {
		font-size: 2.4rem;
		flex-shrink: 0;
	}

	.permission-info {
		flex: 1;
	}

	.permission-name {
		margin: 0;
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--color-text-dark);
	}

	.permission-status {
		flex-shrink: 0;
	}

	.status-badge {
		display: inline-block;
		padding: 0.4rem 1rem;
		border-radius: 999px;
		font-size: 1.2rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		white-space: nowrap;
	}

	.status-badge.granted {
		background: rgba(39, 174, 96, 0.15);
		color: var(--color-success);
	}

	.status-badge.denied {
		background: rgba(231, 76, 60, 0.15);
		color: var(--color-error);
	}

	.security-info {
		background: var(--color-primary-cream);
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
	}

	.security-items {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);
	}

	.security-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-lg);
		background: white;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.item-label {
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--color-text-dark);
	}

	.item-value,
	.item-status {
		font-size: 1.4rem;
		color: var(--color-text-light);
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.role-info {
			flex-direction: column;
			align-items: flex-start;
		}

		.permissions-grid {
			grid-template-columns: 1fr;
		}

		.security-items {
			grid-template-columns: 1fr;
		}

		.permission-item {
			flex-wrap: wrap;
		}

		.security-item {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}
	}
</style>
