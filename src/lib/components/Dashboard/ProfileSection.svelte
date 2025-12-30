<script lang="ts">
	import { user } from '$lib/stores/user_store';
	import type { User } from '$lib/types';

	let isEditing = false;
	let formData: Partial<User> = {};

	$: if ($user && !isEditing) {
		formData = { ...$user };
	}

	function handleEdit() {
		if ($user) {
			formData = { ...$user };
			isEditing = true;
		}
	}

	function handleCancel() {
		isEditing = false;
		if ($user) {
			formData = { ...$user };
		}
	}

	function handleSave() {
		user.updateUser(formData);
		isEditing = false;
	}
</script>

<div class="profile-section">
	<div class="section-header">
		<h2>Mon Profil</h2>
		{#if !isEditing}
			<button class="edit-btn" on:click={handleEdit}>Modifier</button>
		{/if}
	</div>

	{#if $user}
		{#if isEditing}
			<form class="profile-form" on:submit|preventDefault={handleSave}>
				<div class="form-group-two-cols">
					<div class="form-group">
						<label for="firstName">Prénom</label>
						<input
							id="firstName"
							type="text"
							bind:value={formData.firstName}
							required
						/>
					</div>
					<div class="form-group">
						<label for="lastName">Nom</label>
						<input
							id="lastName"
							type="text"
							bind:value={formData.lastName}
							required
						/>
					</div>
				</div>

				<div class="form-group">
					<label for="email">E-mail</label>
					<input id="email" type="email" bind:value={formData.email} required />
				</div>

				<div class="form-group">
					<label for="phone">Téléphone</label>
					<input id="phone" type="tel" bind:value={formData.phone} required />
				</div>

				<div class="form-group">
					<label for="address">Adresse</label>
					<input id="address" type="text" bind:value={formData.address} required />
				</div>

				<div class="form-group-three-cols">
					<div class="form-group">
						<label for="city">Ville</label>
						<input id="city" type="text" bind:value={formData.city} required />
					</div>
					<div class="form-group">
						<label for="postalCode">Code Postal</label>
						<input id="postalCode" type="text" bind:value={formData.postalCode} required />
					</div>
					<div class="form-group">
						<label for="country">Pays</label>
						<input id="country" type="text" bind:value={formData.country} required />
					</div>
				</div>

				<div class="form-actions">
					<button type="submit" class="save-btn">Enregistrer</button>
					<button type="button" class="cancel-btn" on:click={handleCancel}>Annuler</button>
				</div>
			</form>
		{:else}
			<div class="profile-info">
				<div class="info-card">
					<div class="info-group">
						<div class="info-item">
							<span class="label">Prénom</span>
							<span class="value">{$user.firstName}</span>
						</div>
						<div class="info-item">
							<span class="label">Nom</span>
							<span class="value">{$user.lastName}</span>
						</div>
					</div>

					<div class="info-group">
						<div class="info-item">
							<span class="label">E-mail</span>
							<span class="value">{$user.email}</span>
						</div>
						<div class="info-item">
							<span class="label">Téléphone</span>
							<span class="value">{$user.phone}</span>
						</div>
					</div>

					<div class="info-group">
						<div class="info-item full-width">
							<span class="label">Adresse</span>
							<span class="value">{$user.address}</span>
						</div>
					</div>

					<div class="info-group">
						<div class="info-item">
							<span class="label">Ville</span>
							<span class="value">{$user.city}</span>
						</div>
						<div class="info-item">
							<span class="label">Code Postal</span>
							<span class="value">{$user.postalCode}</span>
						</div>
						<div class="info-item">
							<span class="label">Pays</span>
							<span class="value">{$user.country}</span>
						</div>
					</div>
				</div>

				<div class="account-info-card">
					<h3>Informations du Compte</h3>
					<div class="account-info-item">
						<span class="label">Nom d'utilisateur</span>
						<span class="value">{$user.username}</span>
					</div>
					<div class="account-info-item">
						<span class="label">Membre depuis</span>
						<span class="value">{new Date($user.createdAt).toLocaleDateString('fr-FR')}</span>
					</div>
					<div class="account-info-item">
						<span class="label">Dernière mise à jour</span>
						<span class="value">{new Date($user.updatedAt).toLocaleDateString('fr-FR')}</span>
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<p class="no-data">Aucune information utilisateur disponible.</p>
	{/if}
</div>

<style>
	.profile-section {
		background: #fff;
		border-radius: 8px;
		padding: 2.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		border-bottom: 2px solid #f0d9d9;
		padding-bottom: 1.5rem;
	}

	.section-header h2 {
		font-family: 'Abril Fatface';
		font-size: 2.8rem;
		color: #333;
		margin: 0;
	}

	.edit-btn {
		background: #f1dada;
		border: none;
		padding: 1rem 2rem;
		font-size: 1.5rem;
		border-radius: 8px;
		cursor: pointer;
		transition: 0.3s;
		font-weight: 500;
	}

	.edit-btn:hover {
		background: #fff;
		outline: 2px solid #b37777;
		color: #b37777;
	}

	.profile-form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
	}

	.form-group input {
		padding: 1rem 1.2rem;
		border: 1px solid #d0c0c0;
		border-radius: 6px;
		font-size: 1.5rem;
		transition: 0.2s;
	}

	.form-group input:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.form-group-two-cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.form-group-three-cols {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1.5rem;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	.save-btn,
	.cancel-btn {
		padding: 1rem 2.5rem;
		font-size: 1.6rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 500;
		transition: 0.3s;
	}

	.save-btn {
		background: #f1dada;
		color: #333;
		flex: 1;
	}

	.save-btn:hover {
		background: #fff;
		outline: 2px solid #b37777;
		color: #b37777;
	}

	.cancel-btn {
		background: #f5f5f5;
		color: #333;
		flex: 1;
	}

	.cancel-btn:hover {
		background: #e8e8e8;
	}

	.profile-info {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.info-card {
		background: #fafafa;
		border-radius: 8px;
		padding: 2rem;
		border: 1px solid #f0d9d9;
	}

	.info-group {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.info-group:last-child {
		margin-bottom: 0;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.info-item.full-width {
		grid-column: 1 / -1;
	}

	.info-item .label {
		font-size: 1.4rem;
		color: #999;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
	}

	.info-item .value {
		font-size: 1.6rem;
		color: #333;
		font-weight: 500;
	}

	.account-info-card {
		background: #f0d9d9;
		border-radius: 8px;
		padding: 2rem;
		border: 1px solid #e0c9c9;
	}

	.account-info-card h3 {
		font-family: 'Andada Pro';
		font-size: 2rem;
		color: #333;
		margin: 0 0 1.5rem 0;
		border-bottom: 2px solid #e0c9c9;
		padding-bottom: 1rem;
	}

	.account-info-item {
		display: flex;
		justify-content: space-between;
		padding: 1rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
	}

	.account-info-item:last-child {
		border-bottom: none;
	}

	.account-info-item .label {
		font-size: 1.5rem;
		color: #666;
		font-weight: 500;
	}

	.account-info-item .value {
		font-size: 1.5rem;
		color: #333;
		font-weight: 600;
	}

	.no-data {
		text-align: center;
		color: #999;
		font-size: 1.6rem;
		padding: 3rem;
	}

	@media (max-width: 768px) {
		.profile-section {
			padding: 1.5rem;
		}

		.section-header h2 {
			font-size: 2.2rem;
		}

		.form-group-two-cols,
		.form-group-three-cols {
			grid-template-columns: 1fr;
		}

		.info-group {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.account-info-item {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
