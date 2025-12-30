<script lang="ts">
	import { favorites } from '$lib/stores/favorites_store';
	import { cart } from '$lib/stores/cart_store';

	function handleAddToCart(favorite: any) {
		cart.add(favorite.product);
	}

	function handleRemove(productId: string) {
		favorites.remove(productId);
	}
</script>

<div class="favorites-section">
	<div class="section-header">
		<h2>Mes Favoris</h2>
		<span class="count">{$favorites.length} article(s)</span>
	</div>

	{#if $favorites.length === 0}
		<div class="empty-state">
			<p>❤️</p>
			<p>Vous n'avez pas encore de produits favoris.</p>
			<p class="description">Explorez notre catalogue et ajoutez vos produits préférés à vos favoris!</p>
			<a href="/" class="cta-btn">Découvrir nos produits</a>
		</div>
	{:else}
		<div class="favorites-grid">
			{#each $favorites as favorite (favorite.productId)}
				<div class="favorite-card">
					<div class="card-image">
						<img src={favorite.product.imgUrl} alt={favorite.product.name} />
						<button class="remove-btn" on:click={() => handleRemove(favorite.productId)}>
							✕
						</button>
					</div>

					<div class="card-content">
						<h3>{favorite.product.name}</h3>
						<p class="description">{favorite.product.description}</p>

						<div class="category">
							<span class="category-badge">{favorite.product.category}</span>
						</div>

						<div class="card-footer">
							<span class="price">
								{new Intl.NumberFormat('fr-FR', {
									style: 'currency',
									currency: 'DZD'
								}).format(favorite.product.price)}
							</span>
							<button
								class="add-to-cart-btn"
								on:click={() => handleAddToCart(favorite)}
							>
								Ajouter au panier
							</button>
						</div>

						<p class="added-date">
							Ajouté le {new Date(favorite.addedAt).toLocaleDateString('fr-FR')}
						</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.favorites-section {
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

	.count {
		font-size: 1.5rem;
		color: #999;
		font-weight: 500;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		background: #fafafa;
		border-radius: 8px;
	}

	.empty-state p:first-child {
		font-size: 5rem;
		margin: 0;
	}

	.empty-state p:nth-child(2) {
		font-size: 2rem;
		color: #333;
		margin: 1rem 0 0.5rem 0;
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
		border-radius: 8px;
		text-decoration: none;
		color: #333;
		font-weight: 500;
		transition: 0.3s;
		font-size: 1.5rem;
	}

	.cta-btn:hover {
		background: #fff;
		outline: 2px solid #b37777;
		color: #b37777;
	}

	.favorites-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
		gap: 2rem;
	}

	.favorite-card {
		border: 1px solid #f0d9d9;
		border-radius: 8px;
		overflow: hidden;
		transition: 0.3s;
		background: #fafafa;
		display: flex;
		flex-direction: column;
	}

	.favorite-card:hover {
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	.card-image {
		position: relative;
		width: 100%;
		height: 20rem;
		overflow: hidden;
		background: #fff;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: 0.3s;
	}

	.favorite-card:hover .card-image img {
		transform: scale(1.05);
	}

	.remove-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.95);
		border: none;
		font-size: 2rem;
		cursor: pointer;
		transition: 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.remove-btn:hover {
		background: #f1dada;
		color: #fff;
		transform: scale(1.1);
	}

	.card-content {
		padding: 1.5rem;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.card-content h3 {
		font-family: 'Andada Pro';
		font-size: 1.8rem;
		color: #333;
		margin: 0 0 0.5rem 0;
	}

	.card-content .description {
		color: #999;
		font-size: 1.3rem;
		margin: 0.5rem 0 1rem 0;
		line-height: 1.5;
	}

	.category {
		margin-bottom: 1rem;
	}

	.category-badge {
		display: inline-block;
		background: #f1dada;
		color: #333;
		padding: 0.4rem 1rem;
		border-radius: 20px;
		font-size: 1.2rem;
		font-weight: 500;
	}

	.card-footer {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
		margin-top: auto;
	}

	.price {
		font-size: 1.8rem;
		font-weight: 700;
		color: #333;
	}

	.add-to-cart-btn {
		flex: 1;
		background: #f1dada;
		border: none;
		padding: 0.8rem 1.5rem;
		border-radius: 6px;
		font-size: 1.4rem;
		cursor: pointer;
		transition: 0.3s;
		font-weight: 500;
		color: #333;
	}

	.add-to-cart-btn:hover {
		background: #fff;
		outline: 2px solid #b37777;
		color: #b37777;
	}

	.add-to-cart-btn:active {
		transform: scale(0.98);
	}

	.added-date {
		font-size: 1.2rem;
		color: #999;
		margin: 0;
		text-align: right;
	}

	@media (max-width: 768px) {
		.favorites-section {
			padding: 1.5rem;
		}

		.favorites-grid {
			grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
			gap: 1.5rem;
		}

		.card-image {
			height: 15rem;
		}
	}

	@media (max-width: 600px) {
		.favorites-grid {
			grid-template-columns: 1fr;
		}

		.card-image {
			height: 20rem;
		}
	}
</style>
