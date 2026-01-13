<script lang="ts">
	import motorbikeImg from '$lib/assets/icons/motorbike.png';
	import handWithCoinImg from '$lib/assets/icons/hand.png';
	import originalImg from '$lib/assets/icons/original.png';
	import availabilityImg from '$lib/assets/icons/availability.png';
</script>

<div class="features-container">
	<ul>
		<li>
			<img src={motorbikeImg} alt="motorbike" />
			<span class="feature-text">Livraison 58 willaya</span>
		</li>
		<li>
			<img src={handWithCoinImg} alt="hand-with-coin" />
			<span class="feature-text">Paiement main a main sécurisé</span>
		</li>
		<li>
			<img src={originalImg} alt="original" />
			<span class="feature-text">Produit 100% originaux</span>
		</li>
		<li>
			<img src={availabilityImg} alt="availability" />
			<span class="feature-text">Service rapide 7/7</span>
		</li>
	</ul>
</div>

<style>
	ul {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}
	li {
		display: flex;
		align-items: center;
		gap: 5rem;
		font-size: 1.8rem;
	}
	.feature-text {
		font-family: 'Andada Pro';
		display: flex;
		align-items: center;
	}
	.feature-text::before {
		content: '';
		width: 0.6rem;
		height: 0.6rem;
		margin-right: 0.6em;
		background: #000;
		border-radius: 50%;
	}

	.features-container img {
		width: 10rem;
	}

	@media (max-width: 365px) {
		li {
			flex-direction: column;
		}
	}
</style>
