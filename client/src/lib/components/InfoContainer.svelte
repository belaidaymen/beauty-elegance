<script lang="ts">
	import logo from '$lib/assets/logo.png';
	import facebookIcon from '$lib/assets/icons/facebook.png';
	import instagramIcon from '$lib/assets/icons/instagram.png';
	import MediaQuery from 'svelte-media-queries';
</script>

<MediaQuery query="(max-width: 1050px)" let:matches>
	<div class="info-container">
		{#if !matches}
			<img src={logo} alt="logo" />
		{/if}

		<div class="info-text">
			<h1>Beaute & Elegance</h1>

			{#if matches}
				<img src={logo} alt="logo" />
			{/if}

			<ul>
				<li>boutique spécialisée dans la vente matériel et produit de coiffure et cosmétique</li>
				<li>11, avenue Chakib arselane a coté sonelgaze</li>
				<li>tél: 06 67 30 42 04</li>
			</ul>

			<ul class="social-media-icons-container">
				<li>
					<a href="https://www.facebook.com">
						<img src={facebookIcon} alt="facebook" title="facebook" />
					</a>
				</li>
				<li>
					<a href="https://www.instagram.com">
						<img src={instagramIcon} alt="instagram" title="instagram" />
					</a>
				</li>
			</ul>
		</div>
	</div>
</MediaQuery>

<style>
	.info-container {
		display: flex;
		align-items: start;
		gap: 7rem;
	}

	.info-text {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.info-text h1 {
		font-family: 'MoonTime';
		font-weight: lighter;
		font-size: 6.17rem;
		margin-bottom: 1.5rem;
	}
	.info-text ul:first-of-type {
		width: 23rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 3rem;
	}
	ul:first-of-type li:first-child {
		font-family: 'Andada Pro';
		font-size: 1.9rem;
	}

	.social-media-icons-container {
		display: flex;
		list-style-type: none;
		gap: 1rem;
		margin-top: 1.5em;
		align-self: start;
		padding-left: 4em;
	}
	.social-media-icons-container img {
		width: 3.5rem;
		cursor: pointer;
		color: rebeccapurple;
	}

	@media screen and (max-width: 1050px) {
		.info-container {
			display: flex;
			align-items: center;
			flex-direction: column;
			gap: 7rem;
		}
		img[alt='logo'] {
			margin-bottom: 4rem;
		}

		.info-text ul:first-of-type {
			width: 30rem;
		}
	}

	@media (max-width: 365px) {
		.info-text h1 {
			font-size: 15vw;
		}

		img[alt='logo'] {
			width: 10rem;
		}

		.info-text ul:first-of-type {
			width: 80%;
		}
	}
</style>
