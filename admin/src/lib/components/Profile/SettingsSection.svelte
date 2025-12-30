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

	let settings = {
		emailNotifications: true,
		pushNotifications: false,
		smsNotifications: false,
		darkMode: false,
		language: 'fr',
		timezone: 'Africa/Algiers'
	};

	let passwordForm = {
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	};

	let isChangingPassword = false;

	function handleSettingChange() {
		uiStore.showNotification('Paramètres mis à jour', 'success');
	}

	function handlePasswordChange() {
		if (passwordForm.newPassword !== passwordForm.confirmPassword) {
			uiStore.showNotification('Les mots de passe ne correspondent pas', 'error');
			return;
		}

		if (passwordForm.newPassword.length < 8) {
			uiStore.showNotification('Le mot de passe doit contenir au moins 8 caractères', 'error');
			return;
		}

		isChangingPassword = true;
		setTimeout(() => {
			uiStore.showNotification('Mot de passe changé avec succès', 'success');
			passwordForm = {
				currentPassword: '',
				newPassword: '',
				confirmPassword: ''
			};
			isChangingPassword = false;
		}, 500);
	}
</script>

<section class="settings-section">
	<div class="settings-group">
		<h3>Notifications</h3>
		<div class="setting-item">
			<div class="setting-info">
				<p class="setting-name">Notifications Email</p>
				<p class="setting-description">Recevez les mises à jour importantes par email</p>
			</div>
			<label class="toggle-switch">
				<input type="checkbox" bind:checked={settings.emailNotifications} on:change={handleSettingChange} />
				<span class="toggle-slider"></span>
			</label>
		</div>

		<div class="setting-item">
			<div class="setting-info">
				<p class="setting-name">Notifications Push</p>
				<p class="setting-description">Recevez les notifications push du navigateur</p>
			</div>
			<label class="toggle-switch">
				<input type="checkbox" bind:checked={settings.pushNotifications} on:change={handleSettingChange} />
				<span class="toggle-slider"></span>
			</label>
		</div>

		<div class="setting-item">
			<div class="setting-info">
				<p class="setting-name">Notifications SMS</p>
				<p class="setting-description">Recevez les alertes urgentes par SMS</p>
			</div>
			<label class="toggle-switch">
				<input type="checkbox" bind:checked={settings.smsNotifications} on:change={handleSettingChange} />
				<span class="toggle-slider"></span>
			</label>
		</div>
	</div>

	<div class="settings-group">
		<h3>Préférences</h3>
		<div class="setting-item">
			<div class="setting-info">
				<p class="setting-name">Thème Sombre</p>
				<p class="setting-description">Utiliser le thème sombre (en développement)</p>
			</div>
			<label class="toggle-switch">
				<input type="checkbox" bind:checked={settings.darkMode} disabled />
				<span class="toggle-slider"></span>
			</label>
		</div>

		<div class="setting-item">
			<div class="setting-info">
				<p class="setting-name">Langue</p>
				<p class="setting-description">Choisir votre langue préférée</p>
			</div>
			<select bind:value={settings.language} on:change={handleSettingChange} class="preference-select">
				<option value="fr">Français</option>
				<option value="en">English</option>
				<option value="ar">العربية</option>
			</select>
		</div>

		<div class="setting-item">
			<div class="setting-info">
				<p class="setting-name">Fuseau Horaire</p>
				<p class="setting-description">Votre fuseau horaire</p>
			</div>
			<select bind:value={settings.timezone} on:change={handleSettingChange} class="preference-select">
				<option value="Africa/Algiers">Africa/Algiers (GMT+1)</option>
				<option value="Europe/Paris">Europe/Paris (GMT+1/2)</option>
				<option value="UTC">UTC</option>
			</select>
		</div>
	</div>

	<div class="settings-group">
		<h3>Sécurité</h3>
		<div class="password-form">
			<p class="form-description">Changez votre mot de passe régulièrement pour maintenir votre compte sécurisé</p>

			<div class="form-group">
				<label>Mot de passe actuel</label>
				<input
					type="password"
					bind:value={passwordForm.currentPassword}
					placeholder="Entrez votre mot de passe actuel"
				/>
			</div>

			<div class="form-group">
				<label>Nouveau mot de passe</label>
				<input
					type="password"
					bind:value={passwordForm.newPassword}
					placeholder="Au moins 8 caractères"
				/>
			</div>

			<div class="form-group">
				<label>Confirmer le mot de passe</label>
				<input
					type="password"
					bind:value={passwordForm.confirmPassword}
					placeholder="Confirmez votre nouveau mot de passe"
				/>
			</div>

			<button class="btn btn-primary" on:click={handlePasswordChange} disabled={isChangingPassword}>
				{isChangingPassword ? '⏳ Mise à jour...' : 'Changer le Mot de Passe'}
			</button>
		</div>
	</div>
</section>

<style>
	.settings-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.settings-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		padding-bottom: var(--spacing-xl);
		border-bottom: 2px solid var(--color-border);
	}

	.settings-group:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.settings-group h3 {
		margin: 0 0 var(--spacing-md) 0;
		color: var(--color-accent-teal);
	}

	.setting-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-lg);
		background: var(--color-primary-cream);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.setting-info {
		flex: 1;
	}

	.setting-name {
		margin: 0 0 var(--spacing-sm) 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-text-dark);
	}

	.setting-description {
		margin: 0;
		font-size: 1.3rem;
		color: var(--color-text-lighter);
	}

	.toggle-switch {
		display: flex;
		align-items: center;
		cursor: pointer;
		margin-left: var(--spacing-lg);
	}

	.toggle-switch input {
		display: none;
	}

	.toggle-slider {
		display: inline-block;
		width: 50px;
		height: 26px;
		background: #ccc;
		border-radius: 13px;
		position: relative;
		transition: background 0.3s ease;
	}

	.toggle-slider::after {
		content: '';
		display: block;
		width: 22px;
		height: 22px;
		background: white;
		border-radius: 50%;
		position: absolute;
		top: 2px;
		left: 2px;
		transition: left 0.3s ease;
	}

	.toggle-switch input:checked + .toggle-slider {
		background: var(--color-accent-teal);
	}

	.toggle-switch input:checked + .toggle-slider::after {
		left: 26px;
	}

	.toggle-switch input:disabled + .toggle-slider {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.preference-select {
		padding: var(--spacing-md) var(--spacing-lg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: white;
		cursor: pointer;
		font-size: 1.4rem;
		color: var(--color-text-dark);
	}

	.password-form {
		background: var(--color-primary-cream);
		padding: var(--spacing-lg);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.form-description {
		margin: 0;
		color: var(--color-text-lighter);
		font-size: 1.4rem;
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
	}

	.form-group input {
		padding: var(--spacing-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: 1.4rem;
		background: white;
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--color-accent-teal);
		box-shadow: 0 0 0 3px rgba(43, 138, 138, 0.1);
	}

	@media (max-width: 768px) {
		.setting-item {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.toggle-switch {
			margin-left: 0;
			align-self: flex-end;
			margin-top: var(--spacing-md);
		}

		.password-form {
			padding: var(--spacing-md);
		}
	}
</style>
