<script lang="ts">
	import { X } from 'lucide-svelte';
	import Button from '../Button.svelte';
	import FormInput from '../FormInput.svelte';

	export let isOpen = false;
	export let user: any = null;
	export let onClose: (() => void) | undefined = undefined;
	export let onSave: ((userData: any) => void) | undefined = undefined;

	let formData = {
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		country: '',
		status: 'Active'
	};

	$: if (user && isOpen) {
		formData = {
			name: user.name || '',
			email: user.email || '',
			phone: user.phone || '',
			address: user.address || '',
			city: user.city || '',
			country: user.country || '',
			status: user.status || 'Active'
		};
	}

	const handleSave = () => {
		if (!formData.name || !formData.email || !formData.phone) {
			alert('Please fill in all required fields');
			return;
		}

		onSave?.({
			...user,
			...formData
		});

		onClose?.();
	};

	const isFormValid = () => {
		return formData.name && formData.email && formData.phone;
	};
</script>

{#if isOpen}
	<div class="modal-overlay" role="button" tabindex="0" on:click={onClose} on:keydown={(e) => e.key === 'Escape' && onClose?.()}>
		<div class="modal-content" on:click={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<h2 class="modal-title">Edit User Information</h2>
				<button class="close-button" on:click={onClose} aria-label="Close modal">
					<X size={24} />
				</button>
			</div>

			{#if user}
				<div class="form-content">
					<div class="form-row">
						<FormInput
							label="Full Name"
							placeholder="Enter full name"
							bind:value={formData.name}
							required
						/>
						<FormInput
							label="Email"
							inputType="email"
							placeholder="Enter email"
							bind:value={formData.email}
							required
						/>
					</div>

					<div class="form-row">
						<FormInput
							label="Phone"
							inputType="tel"
							placeholder="Enter phone number"
							bind:value={formData.phone}
							required
						/>
						<FormInput
							label="Country"
							placeholder="Enter country"
							bind:value={formData.country}
						/>
					</div>

					<div class="form-row">
						<FormInput
							label="City"
							placeholder="Enter city"
							bind:value={formData.city}
						/>
						<FormInput
							label="Address"
							placeholder="Enter address"
							bind:value={formData.address}
						/>
					</div>

					<div class="form-group">
						<label for="status-select" class="form-label">Account Status</label>
						<select id="status-select" bind:value={formData.status} class="form-select">
							<option value="Active">Active</option>
							<option value="Inactive">Inactive</option>
							<option value="Suspended">Suspended</option>
						</select>
					</div>
				</div>
			{/if}

			<div class="modal-footer">
				<Button variant="secondary" on:click={onClose}>Cancel</Button>
				<Button
					variant="primary"
					disabled={!isFormValid()}
					on:click={handleSave}
				>
					Save Changes
				</Button>
			</div>
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
		max-width: 55rem;
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
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
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

	.form-content {
		padding: 2rem 2.5rem;
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
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.modal-footer {
			flex-direction: column-reverse;
		}
	}
</style>
