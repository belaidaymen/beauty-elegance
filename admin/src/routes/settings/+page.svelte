<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormTextarea from '$lib/components/FormTextarea.svelte';
	import { page } from '$app/stores';

	let activeTab = 'profile';
	let saveMessage = '';

	// Profile Form
	let profileForm = {
		firstName: 'Admin',
		lastName: 'User',
		email: 'admin@beauteelegance.com',
		phone: '+213 550 123 456',
		position: 'Administrator'
	};

	// Store Settings
	let storeSettings = {
		storeName: 'Beaute & Elegance',
		address: '123 Elegance Street, Algiers, Algeria',
		email: 'support@beauteelegance.com',
		phone: '+213 (0) 550 123 456',
		website: 'www.beauteelegance.com',
		currency: 'DZD',
		timezone: 'Africa/Algiers'
	};

	// Notification Settings
	let notificationSettings = {
		orderNotifications: true,
		lowStockAlerts: true,
		customerEmails: true,
		promotionEmails: false,
		weeklyReports: true,
		systemAlerts: true
	};

	const handleProfileSave = () => {
		saveMessage = 'Profile updated successfully!';
		setTimeout(() => {
			saveMessage = '';
		}, 3000);
	};

	const handleStoreSave = () => {
		saveMessage = 'Store settings updated successfully!';
		setTimeout(() => {
			saveMessage = '';
		}, 3000);
	};

	const handleNotificationSave = () => {
		saveMessage = 'Notification settings updated!';
		setTimeout(() => {
			saveMessage = '';
		}, 3000);
	};
</script>

<div class="settings-container">
	<div class="page-header">
		<h1 class="page-title">Settings</h1>
		<p class="page-subtitle">Manage admin profile and system settings</p>
	</div>

	<!-- Tabs Navigation -->
	<div class="tabs-navigation">
		<button
			class="tab-btn"
			class:active={activeTab === 'profile'}
			on:click={() => (activeTab = 'profile')}
		>
			👤 Profile
		</button>
		<button
			class="tab-btn"
			class:active={activeTab === 'store'}
			on:click={() => (activeTab = 'store')}
		>
			🏪 Store Settings
		</button>
		<button
			class="tab-btn"
			class:active={activeTab === 'notifications'}
			on:click={() => (activeTab = 'notifications')}
		>
			🔔 Notifications
		</button>
		<button
			class="tab-btn"
			class:active={activeTab === 'security'}
			on:click={() => (activeTab = 'security')}
		>
			🔒 Security
		</button>
	</div>

	{#if saveMessage}
		<div class="success-message">{saveMessage}</div>
	{/if}

	<!-- Profile Tab -->
	{#if activeTab === 'profile'}
		<Card title="Admin Profile" subtitle="Manage your personal information">
			<div class="form-container">
				<div class="form-row">
					<FormInput
						label="First Name"
						placeholder="First name"
						bind:value={profileForm.firstName}
					/>
					<FormInput
						label="Last Name"
						placeholder="Last name"
						bind:value={profileForm.lastName}
					/>
				</div>

				<FormInput label="Email Address" inputType="email" bind:value={profileForm.email} />

				<FormInput label="Phone Number" inputType="tel" bind:value={profileForm.phone} />

				<div class="form-group">
					<label class="form-label">Position/Role</label>
					<select bind:value={profileForm.position} class="form-select">
						<option value="Administrator">Administrator</option>
						<option value="Store Manager">Store Manager</option>
						<option value="Inventory Manager">Inventory Manager</option>
						<option value="Sales Manager">Sales Manager</option>
					</select>
				</div>

				<div class="button-group">
					<Button variant="secondary" size="large">Cancel</Button>
					<Button variant="primary" size="large" on:click={handleProfileSave}>
						Save Changes
					</Button>
				</div>
			</div>
		</Card>
	{/if}

	<!-- Store Settings Tab -->
	{#if activeTab === 'store'}
		<Card title="Store Information" subtitle="Configure your store details">
			<div class="form-container">
				<FormInput
					label="Store Name"
					placeholder="Store name"
					bind:value={storeSettings.storeName}
				/>

				<FormTextarea
					label="Store Address"
					placeholder="Full address"
					rows={3}
					bind:value={storeSettings.address}
				/>

				<div class="form-row">
					<FormInput label="Email Address" inputType="email" bind:value={storeSettings.email} />
					<FormInput label="Phone Number" inputType="tel" bind:value={storeSettings.phone} />
				</div>

				<FormInput
					label="Website URL"
					inputType="url"
					placeholder="https://..."
					bind:value={storeSettings.website}
				/>

				<div class="form-row">
					<div class="form-group">
						<label class="form-label">Currency</label>
						<select bind:value={storeSettings.currency} class="form-select">
							<option value="DZD">Algerian Dinar (DZD)</option>
							<option value="USD">US Dollar (USD)</option>
							<option value="EUR">Euro (EUR)</option>
						</select>
					</div>

					<div class="form-group">
						<label class="form-label">Timezone</label>
						<select bind:value={storeSettings.timezone} class="form-select">
							<option value="Africa/Algiers">Africa/Algiers (GMT+1)</option>
							<option value="Europe/Paris">Europe/Paris (GMT+1)</option>
							<option value="UTC">UTC</option>
						</select>
					</div>
				</div>

				<div class="button-group">
					<Button variant="secondary" size="large">Cancel</Button>
					<Button variant="primary" size="large" on:click={handleStoreSave}>
						Save Store Settings
					</Button>
				</div>
			</div>
		</Card>
	{/if}

	<!-- Notifications Tab -->
	{#if activeTab === 'notifications'}
		<Card title="Notification Preferences" subtitle="Choose what notifications to receive">
			<div class="notifications-container">
				<div class="notification-item">
					<div class="notification-toggle">
						<input
							type="checkbox"
							id="order-notif"
							bind:checked={notificationSettings.orderNotifications}
						/>
						<label for="order-notif" class="toggle-label">Order Notifications</label>
					</div>
					<p class="notification-desc">
						Receive notifications when new orders are placed
					</p>
				</div>

				<div class="notification-item">
					<div class="notification-toggle">
						<input
							type="checkbox"
							id="stock-alerts"
							bind:checked={notificationSettings.lowStockAlerts}
						/>
						<label for="stock-alerts" class="toggle-label">Low Stock Alerts</label>
					</div>
					<p class="notification-desc">
						Get notified when product stock falls below minimum level
					</p>
				</div>

				<div class="notification-item">
					<div class="notification-toggle">
						<input
							type="checkbox"
							id="customer-emails"
							bind:checked={notificationSettings.customerEmails}
						/>
						<label for="customer-emails" class="toggle-label">Customer Emails</label>
					</div>
					<p class="notification-desc">
						Send promotional and informational emails to customers
					</p>
				</div>

				<div class="notification-item">
					<div class="notification-toggle">
						<input
							type="checkbox"
							id="promo-emails"
							bind:checked={notificationSettings.promotionEmails}
						/>
						<label for="promo-emails" class="toggle-label">Promotion Updates</label>
					</div>
					<p class="notification-desc">
						Notify about new promotions and special offers
					</p>
				</div>

				<div class="notification-item">
					<div class="notification-toggle">
						<input
							type="checkbox"
							id="weekly-reports"
							bind:checked={notificationSettings.weeklyReports}
						/>
						<label for="weekly-reports" class="toggle-label">Weekly Reports</label>
					</div>
					<p class="notification-desc">
						Receive weekly sales and inventory reports
					</p>
				</div>

				<div class="notification-item">
					<div class="notification-toggle">
						<input
							type="checkbox"
							id="system-alerts"
							bind:checked={notificationSettings.systemAlerts}
						/>
						<label for="system-alerts" class="toggle-label">System Alerts</label>
					</div>
					<p class="notification-desc">
						Critical system and security alerts
					</p>
				</div>

				<div class="button-group">
					<Button variant="secondary" size="large">Cancel</Button>
					<Button variant="primary" size="large" on:click={handleNotificationSave}>
						Save Preferences
					</Button>
				</div>
			</div>
		</Card>
	{/if}

	<!-- Security Tab -->
	{#if activeTab === 'security'}
		<Card title="Security Settings" subtitle="Manage account security">
			<div class="form-container">
				<div class="security-section">
					<h3 class="section-title">Change Password</h3>
					<p class="section-desc">Update your password to keep your account secure</p>

					<FormInput
						label="Current Password"
						inputType="password"
						placeholder="Enter current password"
					/>

					<FormInput
						label="New Password"
						inputType="password"
						placeholder="Enter new password"
					/>

					<FormInput
						label="Confirm New Password"
						inputType="password"
						placeholder="Confirm new password"
					/>

					<Button variant="primary" size="large">Update Password</Button>
				</div>

				<div class="security-section">
					<h3 class="section-title">Two-Factor Authentication</h3>
					<p class="section-desc">Add an extra layer of security to your account</p>

					<div class="security-info">
						<div class="info-item">
							<span class="info-label">Status</span>
							<span class="info-value">Disabled</span>
						</div>
						<Button variant="primary" size="large">Enable 2FA</Button>
					</div>
				</div>

				<div class="security-section">
					<h3 class="section-title">Active Sessions</h3>
					<p class="section-desc">Manage your active login sessions</p>

					<div class="session-item">
						<div class="session-info">
							<p class="session-device">Chrome on Windows 10</p>
							<p class="session-location">Last seen today at 10:30 AM</p>
						</div>
						<span class="session-badge">Current</span>
					</div>

					<Button variant="danger" size="large">Sign Out All Sessions</Button>
				</div>
			</div>
		</Card>
	{/if}
</div>

<style>
	.settings-container {
		padding: 2rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	.page-header {
		margin-bottom: 2rem;
	}

	.page-title {
		font-family: 'Andada Pro';
		font-size: 3rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.5rem;
	}

	.page-subtitle {
		font-size: 1.5rem;
		color: #888;
	}

	.tabs-navigation {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
		border-bottom: 2px solid #f0e8e8;
		flex-wrap: wrap;
	}

	.tab-btn {
		padding: 1rem 1.5rem;
		background: none;
		border: none;
		font-size: 1.4rem;
		font-weight: 600;
		color: #888;
		cursor: pointer;
		border-bottom: 3px solid transparent;
		transition: all 0.3s ease;
		margin-bottom: -2px;
	}

	.tab-btn:hover {
		color: #b37777;
	}

	.tab-btn.active {
		color: #b37777;
		border-bottom-color: #b37777;
	}

	.success-message {
		background: rgba(39, 174, 96, 0.2);
		border-left: 4px solid #27ae60;
		padding: 1rem 1.5rem;
		border-radius: 0.4rem;
		color: #27ae60;
		font-weight: 600;
		margin-bottom: 2rem;
		animation: slideDown 0.3s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-1rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.form-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.form-label {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.form-select {
		padding: 0.8rem 1rem;
		border: 2px solid #e0c8c8;
		border-radius: 0.4rem;
		font-size: 1.4rem;
		color: #333;
		background: #fff;
		font-family: inherit;
		transition: all 0.3s ease;
	}

	.form-select:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.button-group {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid #f0e8e8;
	}

	.notifications-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.notification-item {
		padding: 1.5rem;
		border: 1px solid #f0e8e8;
		border-radius: 0.6rem;
		background: #f9f8f8;
	}

	.notification-toggle {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.8rem;
	}

	.notification-toggle input[type='checkbox'] {
		width: 2rem;
		height: 2rem;
		cursor: pointer;
	}

	.toggle-label {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		cursor: pointer;
	}

	.notification-desc {
		font-size: 1.2rem;
		color: #888;
		margin-left: 3rem;
		margin: 0;
		margin-left: 3rem;
	}

	.security-section {
		padding: 2rem;
		border: 1px solid #f0e8e8;
		border-radius: 0.6rem;
		background: #f9f8f8;
		margin-bottom: 2rem;
	}

	.section-title {
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 0.5rem 0;
	}

	.section-desc {
		font-size: 1.2rem;
		color: #888;
		margin: 0 0 1.5rem 0;
	}

	.security-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
		background: #fff;
		border-radius: 0.4rem;
		border: 1px solid #e0c8c8;
		margin: 1.5rem 0;
	}

	.info-item {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.info-label {
		font-size: 1.2rem;
		color: #888;
		text-transform: uppercase;
		font-weight: 600;
	}

	.info-value {
		font-size: 1.4rem;
		color: #b37777;
		font-weight: 600;
	}

	.session-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
		background: #fff;
		border: 1px solid #e0c8c8;
		border-radius: 0.4rem;
		margin-bottom: 1rem;
	}

	.session-device {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.session-location {
		font-size: 1.2rem;
		color: #888;
		margin: 0.3rem 0 0 0;
	}

	.session-badge {
		background: rgba(39, 174, 96, 0.2);
		color: #27ae60;
		padding: 0.4rem 0.8rem;
		border-radius: 2rem;
		font-size: 1.2rem;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.settings-container {
			padding: 1.5rem;
		}

		.page-title {
			font-size: 2.2rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.button-group {
			flex-direction: column;
		}

		.tabs-navigation {
			gap: 0.5rem;
		}

		.tab-btn {
			padding: 0.8rem 1rem;
			font-size: 1.2rem;
		}

		.session-item {
			flex-direction: column;
			align-items: start;
			gap: 1rem;
		}
	}
</style>
