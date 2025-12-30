<script lang="ts">
	import CODBadge from './CODBadge.svelte';

	let formData = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		postalCode: '',
		guaranteeOption: 'standard',
		deliveryOption: 'standard',
		paymentMethod: 'cod'
	};

	function handleSubmit() {
		// Handle form submission - this could be expanded to send data to backend
		console.log('Order submitted:', formData);
	}
</script>

<form class="order-form-section" on:submit|preventDefault={handleSubmit}>
	<div class="form-header">
		<h2>Informations de commande</h2>
	</div>

	<!-- Personal Information Section -->
	<fieldset class="form-fieldset">
		<legend class="form-legend">Vos coordonnées</legend>

		<div class="form-row">
			<div class="form-group">
				<label for="firstName">
					<span class="label-text">Prénom</span>
					<input
						type="text"
						id="firstName"
						name="firstName"
						bind:value={formData.firstName}
						required
						placeholder="Jean"
					/>
				</label>
			</div>

			<div class="form-group">
				<label for="lastName">
					<span class="label-text">Nom</span>
					<input
						type="text"
						id="lastName"
						name="lastName"
						bind:value={formData.lastName}
						required
						placeholder="Dupont"
					/>
				</label>
			</div>
		</div>

		<div class="form-group">
			<label for="email">
				<span class="label-text">Adresse e-mail</span>
				<input
					type="email"
					id="email"
					name="email"
					bind:value={formData.email}
					required
					placeholder="jean.dupont@email.com"
				/>
			</label>
		</div>

		<div class="form-group">
			<label for="phone">
				<span class="label-text">Numéro de téléphone</span>
				<input
					type="tel"
					id="phone"
					name="phone"
					bind:value={formData.phone}
					required
					placeholder="+213 555 123 456"
				/>
			</label>
		</div>
	</fieldset>

	<!-- Delivery Address Section -->
	<fieldset class="form-fieldset">
		<legend class="form-legend">Adresse de livraison</legend>

		<div class="form-group">
			<label for="address">
				<span class="label-text">Adresse complète</span>
				<input
					type="text"
					id="address"
					name="address"
					bind:value={formData.address}
					required
					placeholder="123 Rue de la Paix"
				/>
			</label>
		</div>

		<div class="form-row">
			<div class="form-group">
				<label for="city">
					<span class="label-text">Ville</span>
					<input
						type="text"
						id="city"
						name="city"
						bind:value={formData.city}
						required
						placeholder="Alger"
					/>
				</label>
			</div>

			<div class="form-group">
				<label for="postalCode">
					<span class="label-text">Code postal</span>
					<input
						type="text"
						id="postalCode"
						name="postalCode"
						bind:value={formData.postalCode}
						placeholder="16000"
					/>
				</label>
			</div>
		</div>
	</fieldset>

	<!-- Guarantee Section -->
	<fieldset class="form-fieldset">
		<legend class="form-legend">Garantie</legend>

		<div class="guarantee-options">
			<label class="radio-option">
				<input
					type="radio"
					name="guarantee"
					value="standard"
					bind:group={formData.guaranteeOption}
				/>
				<span class="radio-label">
					<span class="option-title">Garantie standard</span>
					<span class="option-description">30 jours satisfaction ou remboursement</span>
				</span>
			</label>

			<label class="radio-option">
				<input
					type="radio"
					name="guarantee"
					value="extended"
					bind:group={formData.guaranteeOption}
				/>
				<span class="radio-label">
					<span class="option-title">Garantie étendue (+5 DZD)</span>
					<span class="option-description">Retours gratuits pendant 60 jours</span>
				</span>
			</label>

			<label class="radio-option">
				<input
					type="radio"
					name="guarantee"
					value="premium"
					bind:group={formData.guaranteeOption}
				/>
				<span class="radio-label">
					<span class="option-title">Garantie premium (+15 DZD)</span>
					<span class="option-description">Retours gratuits pendant 90 jours + assistance</span>
				</span>
			</label>
		</div>
	</fieldset>

	<!-- Delivery Method Section -->
	<fieldset class="form-fieldset">
		<legend class="form-legend">Mode de livraison</legend>

		<div class="delivery-options">
			<label class="radio-option">
				<input
					type="radio"
					name="delivery"
					value="standard"
					bind:group={formData.deliveryOption}
				/>
				<span class="radio-label">
					<span class="option-title">Livraison standard (5-7 jours)</span>
					<span class="option-description">Gratuit pour les commandes supérieures à 3000 DZD</span>
				</span>
			</label>

			<label class="radio-option">
				<input
					type="radio"
					name="delivery"
					value="express"
					bind:group={formData.deliveryOption}
				/>
				<span class="radio-label">
					<span class="option-title">Livraison express (2-3 jours) (+200 DZD)</span>
					<span class="option-description">Livraison rapide et sécurisée</span>
				</span>
			</label>

			<label class="radio-option">
				<input
					type="radio"
					name="delivery"
					value="same-day"
					bind:group={formData.deliveryOption}
				/>
				<span class="radio-label">
					<span class="option-title">Livraison le jour même (+500 DZD)</span>
					<span class="option-description">Disponible uniquement pour Alger</span>
				</span>
			</label>
		</div>
	</fieldset>

	<!-- Payment Method Section -->
	<fieldset class="form-fieldset">
		<legend class="form-legend">Mode de paiement</legend>

		<div class="payment-section">
			<label class="radio-option payment-option">
				<input
					type="radio"
					name="payment"
					value="cod"
					bind:group={formData.paymentMethod}
					disabled
				/>
				<span class="radio-label">
					<div class="payment-badge-wrapper">
						<span class="payment-text">
							<span class="option-title">Paiement à la livraison (COD)</span>
							<span class="option-description">Payez directement au livreur à la réception</span>
						</span>
						<CODBadge />
					</div>
				</span>
			</label>
		</div>
	</fieldset>
</form>

<style>
	.order-form-section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		flex: 1;
		background: white;
		border-radius: 20px;
		padding: 2.5rem;
		box-shadow: 0 4px 15px rgba(128, 128, 128, 0.08);
		max-width: 650px;
	}

	.form-header {
		margin-bottom: 1rem;
	}

	.form-header h2 {
		font-size: 2rem;
		font-weight: 700;
		color: #b95959;
		opacity: 0.8;
		margin: 0;
	}

	.form-fieldset {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		border: none;
		padding: 0;
		margin: 0;
		border-top: 1px solid rgba(128, 128, 128, 0.15);
		padding-top: 1.5rem;
	}

	.form-fieldset:first-of-type {
		border-top: none;
		padding-top: 0;
	}

	.form-legend {
		font-size: 1.4rem;
		font-weight: 700;
		color: #333;
		margin-bottom: 0.5rem;
		padding: 0;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.label-text {
		font-size: 1.2rem;
		font-weight: 600;
		color: #555;
		margin-bottom: 0.3rem;
		display: block;
	}

	input[type='text'],
	input[type='email'],
	input[type='tel'] {
		padding: 0.8rem 1rem;
		font-size: 1.5rem;
		border: 2px solid rgba(128, 128, 128, 0.15);
		border-radius: 8px;
		transition: all 0.3s ease;
		font-family: 'Open Sans', sans-serif;
		background-color: #fafafa;
	}

	input[type='text']:focus,
	input[type='email']:focus,
	input[type='tel']:focus {
		outline: none;
		border-color: #b95959;
		background-color: white;
		box-shadow: 0 0 0 3px rgba(185, 89, 89, 0.1);
	}

	input::placeholder {
		color: rgba(85, 85, 85, 0.5);
	}

	.guarantee-options,
	.delivery-options {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.radio-option {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		cursor: pointer;
		padding: 1rem;
		border-radius: 10px;
		border: 2px solid rgba(128, 128, 128, 0.1);
		transition: all 0.3s ease;
	}

	.radio-option:hover:not(:has(input:disabled)) {
		border-color: #b95959;
		background-color: rgba(185, 89, 89, 0.05);
	}

	.radio-option input[type='radio'] {
		width: 1.8rem;
		height: 1.8rem;
		min-width: 1.8rem;
		cursor: pointer;
		margin-top: 0.2rem;
		accent-color: #b95959;
	}

	.radio-option input[type='radio']:disabled {
		cursor: not-allowed;
		opacity: 1;
	}

	.radio-label {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		flex: 1;
	}

	.option-title {
		display: block;
		font-size: 1.3rem;
		font-weight: 700;
		color: #333;
	}

	.option-description {
		display: block;
		font-size: 1.2rem;
		color: #777;
		font-weight: 400;
	}

	.payment-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.payment-option {
		padding: 1.5rem;
		background: linear-gradient(135deg, rgba(185, 89, 89, 0.05) 0%, rgba(240, 217, 217, 0.3) 100%);
		border: 2px solid rgba(185, 89, 89, 0.2);
	}

	.payment-option:hover input:not(:disabled),
	.payment-option input:checked {
		border-color: #b95959;
	}

	.payment-option input:disabled {
		opacity: 1;
	}

	.payment-badge-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		width: 100%;
	}

	.payment-text {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		flex: 1;
	}

	@media (max-width: 1050px) {
		.order-form-section {
			max-width: 100%;
			padding: 2rem;
		}

		.form-row {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 768px) {
		.order-form-section {
			padding: 1.5rem;
		}

		.form-header h2 {
			font-size: 1.6rem;
		}

		.form-row {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.form-legend {
			font-size: 1.3rem;
		}

		.label-text {
			font-size: 1.1rem;
		}

		input[type='text'],
		input[type='email'],
		input[type='tel'] {
			padding: 0.7rem 0.9rem;
			font-size: 1.4rem;
		}

		.payment-badge-wrapper {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@media (max-width: 480px) {
		.order-form-section {
			padding: 1rem;
			gap: 1.5rem;
		}

		.form-fieldset {
			gap: 1rem;
		}

		.form-header h2 {
			font-size: 1.4rem;
		}

		.form-legend {
			font-size: 1.2rem;
		}

		.label-text {
			font-size: 1rem;
		}

		input[type='text'],
		input[type='email'],
		input[type='tel'] {
			padding: 0.6rem 0.8rem;
			font-size: 1.3rem;
		}

		.radio-option {
			padding: 0.8rem;
			gap: 0.8rem;
		}

		.radio-option input[type='radio'] {
			width: 1.5rem;
			height: 1.5rem;
		}

		.option-title {
			font-size: 1.1rem;
		}

		.option-description {
			font-size: 1rem;
		}
	}
</style>
