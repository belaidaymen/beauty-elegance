<script lang="ts">
	import closeIcon from '$lib/assets/icons/close.png';
	import cartIcon from '$lib/assets/icons/shopping-cart.png';
	import { cart } from '$lib/stores/cart_store';
	import { shouldCartSidebarAppear } from '$lib/stores/cart_visibility_store';
	import CartProduct from './CartProduct.svelte';
</script>

<div class="cart" class:hidden-cart={!$shouldCartSidebarAppear}>
	<div class="cart__top-container">
		<img src={cartIcon} alt="panier" />
		<h2>Panier</h2>
		<button class="close-btn" on:click={() => ($shouldCartSidebarAppear = false)}>
			<img src={closeIcon} alt="close" />
		</button>
	</div>

	<div class="cart__products-container">
		{#if $cart.length === 0}
			<p class="cart__empty-cart-text">votre panier est vide</p>
		{:else}
			{#each $cart as product (product.name)}
				<CartProduct {product} />
			{/each}

			<a class="enter-cart-btn" href="/panier">Entre Panier</a>
			<a class="command-btn" href="/">Commander maintenant</a>
		{/if}
	</div>
</div>

<style>
	.cart {
		height: 100%;
		position: fixed;
		background: #fff;
		right: 0;
		top: 0;
		width: min(50rem, 100%);
		z-index: 9;
		border-left: 0.3rem solid #0008;
		display: grid;
		grid-template-rows: 10rem auto;
		transition: transform 0.2s;
		overflow-y: scroll;
	}
	.cart::-webkit-scrollbar {
		width: 0.5rem;
	}
	.cart::-webkit-scrollbar-thumb {
		background: #8a6565;
	}

	.hidden-cart {
		transform: translateX(100%);
	}

	.cart__top-container {
		display: flex;
		align-items: center;
		background: #c6b0b0;
		padding-inline: 2rem;
		border-bottom: 0.2rem solid #0008;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.cart__top-container img[alt='panier'] {
		transform: rotateY(180deg);
		width: 4rem;
		height: 4rem;
	}

	.cart__top-container h2 {
		font-weight: lighter;
	}

	.cart__top-container .close-btn {
		background: none;
		border: none;
		margin-left: auto;
		position: relative;
		top: 0.5rem;
		cursor: pointer;
	}
	.cart__top-container img[alt='close'] {
		width: 2.7rem;
	}

	.cart__products-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		gap: 2rem;
	}

	.cart__empty-cart-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 2rem;
	}

	.cart__products-container a {
		text-decoration: none;
		width: 85%;
		text-align: center;
		margin-top: 1rem;
	}
	.command-btn {
		background-color: #c6b0b0;
		color: var(--text-color);
		padding-block: 2rem;
		border-radius: 50px;
		transition: all 0.2s;
		font-weight: 600;
	}
	.command-btn:hover {
		background-color: #b95959;
		color: white;
	}
	.enter-cart-btn {
		border: 2px solid #c6b0b0;
		padding-block: 2rem;
		border-radius: 50px;
		color: #c6b0b0;
		font-weight: 600;
		transition: all 0.2s;
	}
	.enter-cart-btn:hover {
		border: 2px solid #eec8c8;
		color: #eec8c8;
	}
</style>
