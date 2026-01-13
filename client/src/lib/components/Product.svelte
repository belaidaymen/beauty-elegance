<script lang="ts">
	import transparentHeartIcon from '$lib/assets/icons/heart-transparent.svg';
	import redHeartIcon from '$lib/assets/icons/heart-red.svg';
	import { cart } from '$lib/stores/cart_store';
	import { selectedProduct } from '$lib/stores/selected_product_store';
	export let product: ProductProps;
	  function handleProductClick() {
    selectedProduct.set(product);
  }

	let favorite = false;
</script>

<div class="product-details-container">
	<button class="favorite-btn" on:click={() => (favorite = !favorite)} >
		{#if favorite}
			<img src={redHeartIcon} alt="red-heart" />
		{:else}
			<img src={transparentHeartIcon} alt="transparent-heart" />
		{/if}
	</button>
	<a class="product-hover" href="/singleproductUI" on:click={handleProductClick}>
		<div class="product-img-container">
			<img src={product.imgUrl} alt={product.name} />
		</div>
	</a>
	<div class="product-details-text-container">
		<div class="product_name-and-description-container">
			<h3>{product.name}</h3>
			<p>{product.description}</p>
		</div>
		<span class="price-text"
			>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product.price)} DZD</span
		>
	</div>

	<button class="ajouter-btn" on:click={() => cart.add(product)}>Ajouter</button>
</div>

<style>
	.product-details-container {
		position: relative;
		height: 50rem;
	}

	.favorite-btn {
		position: absolute;
		width: 4.5rem;
		height: 4.5rem;
		right: 0;
		top: 1.5rem;
		right: 2rem;
		border-radius: 50%;
		padding: 2rem;
		display: grid;
		place-content: center;
		border: none;
		background: #f0eeee;
		cursor: pointer;
		z-index: 1;
	}
	.favorite-btn img {
		width: 2.7rem;
		height: 2.7rem;
	}

	.product-img-container {
		height: 60%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fafafa;
		margin-bottom: 1.5rem;
		transform: translateY(0);
		transition: 0.3s;
	}
	.product-img-container:hover{
		transform: translateY(-1rem);
		box-shadow: 0 5px 10px -7px gray;

	}
	.product-img-container img {
		width: 92%;
		height: 92%;
		max-width: 25rem;
		object-fit: scale-down;
		mix-blend-mode: multiply;
	}

	.product-details-text-container {
		display: flex;
		flex-direction: column;
		align-items: start;
	}
	.product-details-text-container h3 {
		font-family: 'Andada Pro';
		font-weight: lighter;
		letter-spacing: 0.2rem;
		text-transform: uppercase;
		margin-bottom: 0.3em;
	}
	.product-details-text-container p {
		color: rgb(133, 133, 133);
	}
	.product_name-and-description-container {
		margin-bottom: 2em;
		height: 7rem;
	}
	.price-text {
		font-weight: bold;
		margin-bottom: 1em;
	}

	.ajouter-btn {
		font-family: 'Andada Pro';
		color: #000;
		text-decoration: none;
		font-size: 2rem;
		background: #f1dada;
		padding: 0.5em 2.7em;
		transition: 0.3s;
		outline: 0.2rem solid transparent;
		display: block;
		border: none;
		margin: auto;
		cursor: pointer;
		width: 100%;
	}
	.ajouter-btn:hover {
		--text-color: #eec8c8;
		outline-color: var(--text-color);
		background: #fff;
		color: var(--text-color);
	}
	.product-hover{
	
	}
</style>
