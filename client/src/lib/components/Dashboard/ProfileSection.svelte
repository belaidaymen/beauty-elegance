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
		<div>
			<h1 class="page-title">Mon Profil</h1>
			<p class="page-subtitle">Gérez vos informations personnelles</p>
		</div>
		{#if !isEditing}
			<button class="edit-btn" on:click={handleEdit}>Modifier</button>
		{/if}
	</div>

	{#if $user}
		{#if isEditing}
			<form class="profile-form" on:submit|preventDefault={handleSave}>
				<div class="form-row-two">
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

				<div class="form-row-three">
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
			<div class="profile-display">
				<div class="profile-grid">
					<div class="info-section">
						<h3 class="section-title">Informations Personnelles</h3>
						<div class="info-row">
							<span class="label">Prénom</span>
							<span class="value">{$user.firstName}</span>
						</div>
						<div class="info-row">
							<span class="label">Nom</span>
							<span class="value">{$user.lastName}</span>
						</div>
						<div class="info-row">
							<span class="label">E-mail</span>
							<span class="value">{$user.email}</span>
						</div>
						<div class="info-row">
							<span class="label">Téléphone</span>
							<span class="value">{$user.phone}</span>
						</div>
					</div>

					<div class="info-section">
						<h3 class="section-title">Adresse de Livraison</h3>
						<div class="info-row">
							<span class="label">Adresse</span>
							<span class="value">{$user.address}</span>
						</div>
						<div class="info-row">
							<span class="label">Ville</span>
							<span class="value">{$user.city}</span>
						</div>
						<div class="info-row">
							<span class="label">Code Postal</span>
							<span class="value">{$user.postalCode}</span>
						</div>
						<div class="info-row">
							<span class="label">Pays</span>
							<span class="value">{$user.country}</span>
						</div>
					</div>

					<div class="info-section">
						<h3 class="section-title">Informations du Compte</h3>
						<div class="info-row">
							<span class="label">Membre depuis</span>
							<span class="value">{new Date($user.createdAt).toLocaleDateString('fr-FR')}</span>
						</div>
						<div class="info-row">
							<span class="label">Dernière mise à jour</span>
							<span class="value">{new Date($user.updatedAt).toLocaleDateString('fr-FR')}</span>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	.profile-section {
		animation: fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 4rem;
		padding-bottom: 2.5rem;
		border-bottom: 2px solid #f0d9d9;
		gap: 2rem;
	}

	.page-title {
		font-family: 'Abril Fatface', serif;
		font-size: 3.4rem;
		color: #2a2a2a;
		margin: 0 0 0.6rem 0;
		font-weight: 400;
		letter-spacing: -0.01rem;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.page-subtitle {
		font-size: 1.6rem;
		color: #888;
		margin: 0;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02rem;
		font-weight: 500;
	}

	.edit-btn {
		background: linear-gradient(135deg, #f1dada 0%, #f5e5e5 100%);
		border: 2px solid transparent;
		border-image: linear-gradient(135deg, #f1dada, #d1b2b2) 1;
		padding: 1rem 2.5rem;
		font-size: 1.5rem;
		color: #8b5555;
		cursor: pointer;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02rem;
		border-radius: 0.8rem;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		font-weight: 600;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.edit-btn:hover {
		background: linear-gradient(135deg, #fff 0%, #fff9f9 100%);
		border-color: #b37777;
		color: #6b4444;
		box-shadow: 0 6px 16px rgba(179, 119, 119, 0.15);
		transform: translateY(-2px);
	}

	.profile-form {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(250, 249, 248, 0.5));
		padding: 3rem;
		border-radius: 1.2rem;
		border: 2px solid #f0d9d9;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.form-group label {
		font-size: 1.5rem;
		color: #666;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02rem;
		font-weight: 600;
		text-transform: uppercase;
		font-size: 1.3rem;
	}

	.form-group input {
		padding: 1.1rem 1.5rem;
		border: 2px solid transparent;
		border-image: linear-gradient(90deg, #e8e0db, #f0d9d9) 1;
		border-radius: 0.8rem;
		font-size: 1.5rem;
		font-family: 'Open Sans', sans-serif;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		background: rgba(255, 255, 255, 0.8);
	}

	.form-group input:focus {
		outline: none;
		border-color: #b37777;
		background: #fff;
		box-shadow: 0 0 0 4px rgba(179, 119, 119, 0.1);
	}

	.form-row-two,
	.form-row-three {
		display: grid;
		gap: 2rem;
	}

	.form-row-two {
		grid-template-columns: 1fr 1fr;
	}

	.form-row-three {
		grid-template-columns: 1fr 1fr 1fr;
	}

	.form-actions {
		display: flex;
		gap: 1.5rem;
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 2px solid #f0d9d9;
	}

	.save-btn,
	.cancel-btn {
		padding: 1.2rem 3rem;
		font-size: 1.5rem;
		border: none;
		border-radius: 0.8rem;
		cursor: pointer;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02rem;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		flex: 1;
		font-weight: 700;
		text-transform: uppercase;
		font-size: 1.3rem;
	}

	.save-btn {
		background: linear-gradient(135deg, #f1dada 0%, #d1b2b2 100%);
		color: #fff;
		border: 2px solid transparent;
		box-shadow: 0 6px 16px rgba(179, 119, 119, 0.2);
	}

	.save-btn:hover {
		background: linear-gradient(135deg, #e5c8c8 0%, #b37777 100%);
		color: #fff;
		box-shadow: 0 12px 32px rgba(179, 119, 119, 0.28);
		transform: translateY(-2px);
	}

	.cancel-btn {
		background: linear-gradient(135deg, rgba(240, 217, 217, 0.5), rgba(224, 208, 208, 0.3));
		color: #666;
		border: 2px solid #f0d9d9;
	}

	.cancel-btn:hover {
		background: linear-gradient(135deg, rgba(224, 208, 208, 0.7), rgba(209, 178, 178, 0.5));
		color: #8b5555;
		border-color: #d1b2b2;
	}

	.profile-display {
		animation: slideUp 0.4s ease;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.profile-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(38rem, 1fr));
		gap: 3rem;
	}

	.info-section {
		display: flex;
		flex-direction: column;
		gap: 1.8rem;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(250, 249, 248, 0.5));
		padding: 2.5rem;
		border-radius: 1.2rem;
		border: 2px solid #f0d9d9;
		transition: all 0.3s ease;
	}

	.info-section:hover {
		box-shadow: 0 6px 16px rgba(179, 119, 119, 0.08);
		border-color: #d1b2b2;
	}

	.section-title {
		font-family: 'Andada Pro', serif;
		font-size: 1.9rem;
		color: #2a2a2a;
		margin: 0 0 1.5rem 0;
		padding-bottom: 1.2rem;
		border-bottom: 2px solid #f0d9d9;
		letter-spacing: 0.02rem;
		font-weight: 700;
		text-transform: uppercase;
		font-size: 1.5rem;
	}

	.info-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.2rem 0;
		border-bottom: 1px solid rgba(240, 217, 217, 0.6);
		transition: all 0.2s ease;
	}

	.info-row:last-child {
		border-bottom: none;
	}

	.info-row:hover {
		background: rgba(179, 119, 119, 0.03);
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}

	.label {
		font-size: 1.4rem;
		color: #888;
		font-family: 'Andada Pro', serif;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		font-size: 1.2rem;
	}

	.value {
		font-size: 1.6rem;
		color: #333;
		font-family: 'Open Sans', sans-serif;
		font-weight: 500;
		text-align: right;
	}

	@media (max-width: 768px) {
		.page-title {
			font-size: 2.4rem;
		}

		.profile-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.form-row-two,
		.form-row-three {
			grid-template-columns: 1fr;
		}

		.info-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.section-header {
			flex-direction: column;
			gap: 1.5rem;
		}
	}
</style>
