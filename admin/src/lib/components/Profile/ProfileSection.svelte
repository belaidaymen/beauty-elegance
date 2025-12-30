<script lang="ts">
	import { authStore } from '$lib/stores/auth_store';
	import { uiStore } from '$lib/stores/ui_store';

	interface User {
		name: string;
		email: string;
		phone?: string;
		joinDate?: Date;
		role: 'admin' | 'manager' | 'editor';
	}

	export let user: User;

	let isEditing = false;
	let formData = { ...user };
	let isSaving = false;

	function toggleEdit() {
		isEditing = !isEditing;
		formData = { ...user };
	}

	function saveProfile() {
		isSaving = true;
		try {
			setTimeout(() => {
				authStore.login({
					id: '1',
					name: formData.name,
					email: formData.email,
					role: formData.role,
					avatar: user.role === 'admin' ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' : 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'
				});
				uiStore.showNotification('Profil mis à jour avec succès', 'success');
				isEditing = false;
				isSaving = false;
			}, 500);
		} catch (error) {
			uiStore.showNotification('Erreur lors de la mise à jour', 'error');
			isSaving = false;
		}
	}

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<section class="profile-section">
	<div class="section-header">
		<h2>Informations Personnelles</h2>
		<button class="btn btn-secondary" on:click={toggleEdit}>
			{isEditing ? '✕ Annuler' : '✏️ Modifier'}
		</button>
	</div>

	{#if isEditing}
		<div class="edit-form">
			<div class="form-grid">
				<div class="form-group">
					<label>Nom Complet</label>
					<input type="text" bind:value={formData.name} />
				</div>

				<div class="form-group">
					<label>Email</label>
					<input type="email" bind:value={formData.email} />
				</div>

				<div class="form-group">
					<label>Téléphone</label>
					<input type="tel" bind:value={formData.phone} />
				</div>

				<div class="form-group">
					<label>Rôle</label>
					<select bind:value={formData.role}>
						<option value="admin">Administrateur</option>
						<option value="manager">Gestionnaire</option>
						<option value="editor">Éditeur</option>
					</select>
				</div>
			</div>

			<div class="form-actions">
				<button class="btn btn-primary" on:click={saveProfile} disabled={isSaving}>
					{isSaving ? '⏳ Sauvegarde...' : '✓ Sauvegarder'}
				</button>
				<button class="btn btn-secondary" on:click={toggleEdit} disabled={isSaving}>
					✕ Annuler
				</button>
			</div>
		</div>
	{:else}
		<div class="info-grid">
			<div class="info-item">
				<label>Nom Complet</label>
				<p>{user.name}</p>
			</div>

			<div class="info-item">
				<label>Email</label>
				<p>{user.email}</p>
			</div>

			{#if user.phone}
				<div class="info-item">
					<label>Téléphone</label>
					<p>{user.phone}</p>
				</div>
			{/if}

			<div class="info-item">
				<label>Rôle</label>
				<p>
					{user.role === 'admin' ? '👑 Administrateur' : user.role === 'manager' ? '📊 Gestionnaire' : '✏️ Éditeur'}
				</p>
			</div>

			{#if user.joinDate}
				<div class="info-item">
					<label>Membre depuis</label>
					<p>{formatDate(user.joinDate)}</p>
				</div>
			{/if}

			<div class="info-item">
				<label>Statut</label>
				<p><span class="status-badge active">✓ Actif</span></p>
			</div>
		</div>
	{/if}
</section>

<style>
	.profile-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: var(--spacing-lg);
		border-bottom: 2px solid var(--color-border);
	}

	.section-header h2 {
		margin: 0;
		color: var(--color-text-dark);
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.info-item label {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--color-text-light);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.info-item p {
		margin: 0;
		font-size: 1.6rem;
		color: var(--color-text-dark);
		font-weight: 500;
	}

	.status-badge {
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-md);
		font-weight: 600;
	}

	.status-badge.active {
		background: rgba(39, 174, 96, 0.15);
		color: var(--color-success);
	}

	.edit-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.form-group label {
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--color-text-dark);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.form-group input,
	.form-group select {
		padding: var(--spacing-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: 1.4rem;
		background: white;
	}

	.form-group input:focus,
	.form-group select:focus {
		outline: none;
		border-color: var(--color-accent-teal);
		box-shadow: 0 0 0 3px rgba(43, 138, 138, 0.1);
	}

	.form-actions {
		display: flex;
		gap: var(--spacing-md);
		justify-content: flex-end;
	}

	@media (max-width: 768px) {
		.info-grid,
		.form-grid {
			grid-template-columns: 1fr;
		}

		.section-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.form-actions {
			justify-content: stretch;
		}

		.form-actions button {
			flex: 1;
		}
	}
</style>
