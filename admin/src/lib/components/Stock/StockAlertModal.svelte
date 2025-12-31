<script lang="ts">
	import { X } from 'lucide-svelte';
	import Button from '../Button.svelte';
	import FormInput from '../FormInput.svelte';

	export let isOpen = false;
	export let product: any = null;
	export let onClose: (() => void) | undefined = undefined;
	export let onSave: ((alertData: any) => void) | undefined = undefined;

	let alertConfig = {
		enabled: true,
		alertLevel: 20,
		notificationEmail: '',
		notificationType: 'email'
	};

	$: if (product) {
		alertConfig = {
			enabled: product.alertEnabled ?? true,
			alertLevel: product.alertLevel ?? 20,
			notificationEmail: product.notificationEmail ?? '',
			notificationType: product.notificationType ?? 'email'
		};
	}

	const handleSave = () => {
		onSave?.(alertConfig);
	};

	const getAlertDescription = () => {
		if (!product) return '';
		return `Alert will be triggered when stock falls below ${alertConfig.alertLevel} units`;
	};
</script>

{#if isOpen}
	<div class="modal-overlay" on:click={onClose}>
		<div class="modal-content" on:click={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<h2 class="modal-title">Stock Alert Settings</h2>
				<button class="close-button" on:click={onClose} aria-label="Close modal">
					<X size={24} />
				</button>
			</div>

			{#if product}
				<div class="product-info">
					<h3 class="product-name">{product.name}</h3>
					<p class="product-sku">SKU: {product.sku}</p>
				</div>

				<div class="form-content">
					<!-- Enable/Disable Alert Toggle -->
					<div class="toggle-section">
						<label class="toggle-label">
							<input
								type="checkbox"
								bind:checked={alertConfig.enabled}
								class="checkbox-input"
							/>
							<span class="toggle-text">Enable Stock Alerts</span>
						</label>
						<p class="toggle-description">Get notified when stock reaches critical levels</p>
					</div>

					{#if alertConfig.enabled}
						<!-- Alert Level Input -->
						<div class="form-group">
							<label for="alert-level" class="form-label">Alert Threshold (units)</label>
							<p class="form-hint">
								Stock level at which you want to be alerted
							</p>
							<FormInput
								id="alert-level"
								inputType="number"
								placeholder="20"
								bind:value={alertConfig.alertLevel}
								required
							/>
							<p class="alert-description">
								{getAlertDescription()}
							</p>
						</div>

						<!-- Notification Type -->
						<div class="form-group">
							<label for="notification-type" class="form-label">Notification Method</label>
							<select
								id="notification-type"
								bind:value={alertConfig.notificationType}
								class="form-select"
							>
								<option value="email">Email Notification</option>
								<option value="sms">SMS Notification</option>
								<option value="push">Push Notification</option>
								<option value="all">All Methods</option>
							</select>
						</div>

						<!-- Email Input (if email is selected) -->
						{#if alertConfig.notificationType === 'email' || alertConfig.notificationType === 'all'}
							<div class="form-group">
								<label for="notification-email" class="form-label">
									Notification Email
								</label>
								<FormInput
									id="notification-email"
									inputType="email"
									placeholder="admin@example.com"
									bind:value={alertConfig.notificationEmail}
								/>
							</div>
						{/if}

						<!-- Alert Preview -->
						<div class="alert-preview">
							<div class="preview-header">
								<h4 class="preview-title">Alert Preview</h4>
							</div>
							<div class="preview-content">
								<p class="preview-text">
									You will receive alerts when <strong>{product.name}</strong> stock drops to
									<strong>{alertConfig.alertLevel}</strong> units or below.
								</p>
								{#if alertConfig.notificationEmail}
									<p class="preview-email">Notifications will be sent to: <strong>{alertConfig.notificationEmail}</strong></p>
								{/if}
							</div>
						</div>
					{:else}
						<div class="disabled-message">
							<p>Stock alerts are currently disabled for this product.</p>
							<p>Enable alerts above to receive notifications when stock is low.</p>
						</div>
					{/if}
				</div>

				<div class="modal-footer">
					<Button variant="secondary" on:click={onClose}>Cancel</Button>
					<Button variant="primary" on:click={handleSave}>
						Save Alert Settings
					</Button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		animation: fadeIn 0.2s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.modal-content {
		background: #fff;
		border-radius: 1.2rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		max-width: 50rem;
		width: 90%;
		max-height: 90vh;
		overflow-y: auto;
		animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes slideUp {
		from {
			transform: translateY(2rem);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 2.5rem;
		border-bottom: 2px solid #f0d9d9;
	}

	.modal-title {
		font-size: 1.9rem;
		font-weight: 600;
		color: #2a2a2a;
		margin: 0;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.01em;
	}

	.close-button {
		background: none;
		border: none;
		cursor: pointer;
		color: #999;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}

	.close-button:hover {
		color: #b37777;
	}

	.product-info {
		padding: 1.5rem 2.5rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-bottom: 1px solid #e8e0db;
	}

	.product-name {
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 0.5rem 0;
	}

	.product-sku {
		font-size: 1.3rem;
		color: #999;
		margin: 0;
	}

	.form-content {
		padding: 2rem 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.toggle-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		background: #f9f8f8;
		border-radius: 0.8rem;
		border: 2px solid #e8e0db;
	}

	.toggle-label {
		display: flex;
		align-items: center;
		gap: 1rem;
		cursor: pointer;
	}

	.checkbox-input {
		width: 2rem;
		height: 2rem;
		cursor: pointer;
		accent-color: #b37777;
	}

	.toggle-text {
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
	}

	.toggle-description {
		font-size: 1.3rem;
		color: #999;
		margin: 0;
		margin-left: 3rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.form-label {
		font-size: 1.3rem;
		font-weight: 700;
		color: #333;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.1em;
	}

	.form-hint {
		font-size: 1.2rem;
		color: #999;
		margin: 0;
	}

	.form-select {
		padding: 1rem 1.5rem;
		border: 2px solid #e8e0db;
		border-radius: 0.8rem;
		font-size: 1.5rem;
		color: #333;
		background: #fff;
		font-family: inherit;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		cursor: pointer;
	}

	.form-select:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 4px rgba(179, 119, 119, 0.1);
	}

	.alert-description {
		font-size: 1.3rem;
		color: #b37777;
		font-weight: 500;
		margin: 0.5rem 0 0 0;
	}

	.alert-preview {
		padding: 1.5rem;
		background: linear-gradient(135deg, rgba(179, 119, 119, 0.08) 0%, rgba(179, 119, 119, 0.04) 100%);
		border-left: 4px solid #b37777;
		border-radius: 0.6rem;
	}

	.preview-header {
		margin-bottom: 1rem;
	}

	.preview-title {
		font-size: 1.3rem;
		font-weight: 600;
		color: #b37777;
		margin: 0;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.08em;
	}

	.preview-content {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.preview-text,
	.preview-email {
		font-size: 1.4rem;
		color: #333;
		margin: 0;
		line-height: 1.6;
	}

	.preview-email {
		font-size: 1.3rem;
		color: #666;
	}

	.disabled-message {
		padding: 2rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border: 2px dashed #e8e0db;
		border-radius: 0.8rem;
		text-align: center;
	}

	.disabled-message p {
		font-size: 1.4rem;
		color: #999;
		margin: 0.5rem 0;
	}

	.modal-footer {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		padding: 2rem 2.5rem;
		border-top: 2px solid #f0d9d9;
		background: #faf9f8;
	}

	@media (max-width: 768px) {
		.modal-content {
			max-width: 95vw;
			max-height: 95vh;
		}

		.form-content {
			padding: 1.5rem;
		}

		.modal-footer {
			flex-direction: column-reverse;
		}
	}
</style>
