<script lang="ts">
	import { feedback } from '$lib/stores/feedback_store';
	import { orders } from '$lib/stores/orders_store';
	import { user } from '$lib/stores/user_store';
	import type { ServiceFeedback } from '$lib/types';

	let selectedOrder: string | null = null;
	let rating: 1 | 2 | 3 | 4 | 5 = 5;
	let notes = '';
	let showForm = false;

	function getUnratedOrders() {
		const ratedOrderIds = $feedback.map((f) => f.orderId);
		return $orders.filter(
			(order) =>
				order.deliveryStatus === 'delivered' && !ratedOrderIds.includes(order.id)
		);
	}

	function handleSubmitFeedback() {
		if (!selectedOrder || !$user) return;

		const newFeedback: ServiceFeedback = {
			id: `feedback-${Date.now()}`,
			userId: $user.id,
			orderId: selectedOrder,
			rating,
			notes,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};

		feedback.add(newFeedback);
		resetForm();
	}

	function resetForm() {
		selectedOrder = null;
		rating = 5;
		notes = '';
		showForm = false;
	}

	function handleDeleteFeedback(feedbackId: string) {
		feedback.remove(feedbackId);
	}

	function getOrderNumber(orderId: string): string {
		return $orders.find((o) => o.id === orderId)?.orderNumber || orderId;
	}

	function renderStars(rating: number, interactive: boolean = false) {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(i <= rating ? '★' : '☆');
		}
		return stars.join('');
	}
</script>

<div class="feedback-section">
	<div class="section-header">
		<h2>Retour d'Expérience</h2>
		<p class="subtitle">Partagez votre avis sur le service (pas sur les produits)</p>
	</div>

	{#if showForm}
		<div class="feedback-form-container">
			<h3>Évaluer le service</h3>

			{#if getUnratedOrders().length === 0}
				<div class="no-deliveries">
					<p>Vous n'avez pas de commandes livrées à évaluer.</p>
					<button class="cancel-btn" on:click={() => (showForm = false)}>Fermer</button>
				</div>
			{:else}
				<form on:submit|preventDefault={handleSubmitFeedback}>
					<div class="form-group">
						<label for="order-select">Sélectionnez une commande livrée</label>
						<select
							id="order-select"
							bind:value={selectedOrder}
							required
						>
							<option value="">-- Choisir une commande --</option>
							{#each getUnratedOrders() as order (order.id)}
								<option value={order.id}>
									{order.orderNumber} - {new Date(order.orderDate).toLocaleDateString('fr-FR')}
								</option>
							{/each}
						</select>
					</div>

					<div class="form-group">
						<label>Note d'évaluation du service</label>
						<div class="rating-input">
							{#each [1, 2, 3, 4, 5] as star (star)}
								<button
									type="button"
									class="star-btn"
									class:active={star <= rating}
									on:click={() => (rating = star)}
								>
									★
								</button>
							{/each}
						</div>
						<div class="rating-labels">
							{#if rating === 1}
								<span>Très insatisfait</span>
							{:else if rating === 2}
								<span>Insatisfait</span>
							{:else if rating === 3}
								<span>Neutre</span>
							{:else if rating === 4}
								<span>Satisfait</span>
							{:else}
								<span>Très satisfait</span>
							{/if}
						</div>
					</div>

					<div class="form-group">
						<label for="notes">Remarques sur le service (optionnel)</label>
						<textarea
							id="notes"
							bind:value={notes}
							placeholder="Partagez vos remarques sur le service de livraison, l'emballage, la communication, etc."
							rows="5"
						></textarea>
					</div>

					<div class="form-actions">
						<button type="submit" class="submit-btn" disabled={!selectedOrder}>
							Envoyer l'avis
						</button>
						<button type="button" class="cancel-btn" on:click={resetForm}>
							Annuler
						</button>
					</div>
				</form>
			{/if}
		</div>
	{:else}
		<div class="feedback-header">
			{#if $feedback.length > 0}
				<button class="add-feedback-btn" on:click={() => (showForm = true)}>
					+ Ajouter un avis
				</button>
			{:else}
				<button class="add-feedback-btn" on:click={() => (showForm = true)}>
					✍️ Partager votre avis
				</button>
			{/if}
		</div>

		{#if $feedback.length === 0}
			<div class="empty-state">
				<p>Vous n'avez pas encore partagé d'avis.</p>
				<p class="description">
					Votre retour d'expérience nous aide à améliorer notre service!
				</p>
				<button class="cta-btn" on:click={() => (showForm = true)}>
					Partager votre avis
				</button>
			</div>
		{:else}
			<div class="feedback-list">
				{#each $feedback as item (item.id)}
					<div class="feedback-item">
						<div class="feedback-header-info">
							<div>
								<h4>Commande {getOrderNumber(item.orderId)}</h4>
								<p class="feedback-date">
									{new Date(item.createdAt).toLocaleDateString('fr-FR', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</p>
							</div>
							<button
								class="delete-btn"
								on:click={() => handleDeleteFeedback(item.id)}
								title="Supprimer cet avis"
							>
								🗑️
							</button>
						</div>

						<div class="feedback-rating">
							<span class="stars">{renderStars(item.rating)}</span>
							<span class="rating-text">
								{#if item.rating === 1}
									Très insatisfait
								{:else if item.rating === 2}
									Insatisfait
								{:else if item.rating === 3}
									Neutre
								{:else if item.rating === 4}
									Satisfait
								{:else}
									Très satisfait
								{/if}
							</span>
						</div>

						{#if item.notes}
							<div class="feedback-notes">
								<p>{item.notes}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>

			{#if getUnratedOrders().length > 0}
				<button class="add-feedback-btn" on:click={() => (showForm = true)}>
					+ Ajouter un avis
				</button>
			{/if}
		{/if}
	{/if}
</div>

<style>
	.feedback-section {
		background: #fff;
		border-radius: 8px;
		padding: 2.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.section-header {
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

	.subtitle {
		font-size: 1.4rem;
		color: #999;
		margin: 0.5rem 0 0 0;
	}

	.feedback-header {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 2rem;
	}

	.add-feedback-btn {
		background: #f1dada;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-size: 1.5rem;
		cursor: pointer;
		transition: 0.3s;
		font-weight: 500;
	}

	.add-feedback-btn:hover {
		background: #fff;
		outline: 2px solid #b37777;
		color: #b37777;
	}

	.feedback-form-container {
		background: #fafafa;
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid #f0d9d9;
		margin-bottom: 2rem;
	}

	.feedback-form-container h3 {
		font-family: 'Andada Pro';
		font-size: 2rem;
		color: #333;
		margin: 0 0 1.5rem 0;
	}

	.no-deliveries {
		text-align: center;
		padding: 2rem;
		color: #999;
	}

	.no-deliveries p {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.form-group {
		margin-bottom: 2rem;
	}

	.form-group label {
		display: block;
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.8rem;
	}

	.form-group select,
	.form-group textarea {
		width: 100%;
		padding: 1rem;
		border: 1px solid #d0c0c0;
		border-radius: 6px;
		font-size: 1.5rem;
		font-family: inherit;
		transition: 0.2s;
	}

	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.form-group textarea {
		resize: vertical;
		min-height: 10rem;
	}

	.rating-input {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.star-btn {
		width: 4rem;
		height: 4rem;
		border: 2px solid #f0d9d9;
		background: #fff;
		border-radius: 6px;
		font-size: 2rem;
		color: #999;
		cursor: pointer;
		transition: 0.2s;
	}

	.star-btn:hover {
		border-color: #b37777;
		color: #b37777;
	}

	.star-btn.active {
		background: #f1dada;
		border-color: #b37777;
		color: #b37777;
	}

	.rating-labels {
		font-size: 1.4rem;
		color: #999;
		font-weight: 500;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
	}

	.submit-btn,
	.cancel-btn {
		padding: 1rem 2rem;
		border: none;
		border-radius: 8px;
		font-size: 1.5rem;
		cursor: pointer;
		font-weight: 500;
		transition: 0.3s;
		flex: 1;
	}

	.submit-btn {
		background: #f1dada;
		color: #333;
	}

	.submit-btn:hover:not(:disabled) {
		background: #fff;
		outline: 2px solid #b37777;
		color: #b37777;
	}

	.submit-btn:disabled {
		background: #e8cbc8;
		color: #999;
		cursor: not-allowed;
	}

	.cancel-btn {
		background: #f5f5f5;
		color: #333;
	}

	.cancel-btn:hover {
		background: #e8e8e8;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		background: #fafafa;
		border-radius: 8px;
	}

	.empty-state p {
		font-size: 1.8rem;
		color: #333;
		margin: 0 0 0.5rem 0;
	}

	.empty-state .description {
		font-size: 1.5rem;
		color: #999;
		margin-bottom: 2rem;
	}

	.cta-btn {
		display: inline-block;
		background: #f1dada;
		padding: 1rem 2.5rem;
		border: none;
		border-radius: 8px;
		text-decoration: none;
		color: #333;
		font-weight: 500;
		transition: 0.3s;
		font-size: 1.5rem;
		cursor: pointer;
	}

	.cta-btn:hover {
		background: #fff;
		outline: 2px solid #b37777;
		color: #b37777;
	}

	.feedback-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.feedback-item {
		background: #fafafa;
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid #f0d9d9;
	}

	.feedback-header-info {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid #f0d9d9;
		padding-bottom: 1rem;
	}

	.feedback-header-info h4 {
		font-family: 'Andada Pro';
		font-size: 1.8rem;
		color: #333;
		margin: 0 0 0.5rem 0;
	}

	.feedback-date {
		font-size: 1.3rem;
		color: #999;
		margin: 0;
	}

	.delete-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		transition: 0.3s;
		padding: 0.5rem;
	}

	.delete-btn:hover {
		transform: scale(1.2);
	}

	.feedback-rating {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.stars {
		font-size: 2rem;
		color: #ffc107;
		letter-spacing: 0.3rem;
	}

	.rating-text {
		font-size: 1.4rem;
		color: #666;
		font-weight: 600;
	}

	.feedback-notes {
		background: #fff;
		padding: 1.5rem;
		border-radius: 6px;
		border-left: 4px solid #f1dada;
	}

	.feedback-notes p {
		font-size: 1.4rem;
		color: #666;
		margin: 0;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.feedback-section {
			padding: 1.5rem;
		}

		.feedback-form-container {
			padding: 1.5rem;
		}

		.rating-input {
			gap: 0.5rem;
		}

		.star-btn {
			width: 3.5rem;
			height: 3.5rem;
			font-size: 1.5rem;
		}

		.form-actions {
			flex-direction: column;
		}

		.feedback-header-info {
			flex-direction: column;
		}
	}
</style>
