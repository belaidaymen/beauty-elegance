<script lang="ts">
	import { cart } from '$lib/stores/cart_store';
	import deletIcon from '$lib/assets/icons/deletcartproduct.svg';
	import { products } from '$lib/stores/products_store';
	export let product: CartProductProps;
</script>

<tr class="details">
	<td><button class="delet-Button" on:click={() => cart.remove(product, true)} ><img src={deletIcon} width="13" alt="deletIcon"/></button></td>
	<td><img src={product.imgUrl} alt="" width="100" /></td>
	<td class="descraption">
		{product.description}
	</td>
	<td class="Prix"
		>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product.price)} DZD</td
	>
	<td>
		<div class="Qte-general-input">
			<input class="leftbt" type="button" value="+" on:click={() => cart.add(product)} />
			<input class="QTE" type="number" value={product.quantity} disabled />
			<input class="rightbt" type="button" value="-" on:click={() => cart.remove(product, false)} />
		</div>
	</td>
	<td class="total-Price-X-QTE"
		>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
			product.price * product.quantity
		)} DZD</td
	>
</tr>

<style>
	.details input[type='number']::-webkit-inner-spin-button,
	.details input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}
	.details {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-bottom: 2px solid rgba(128, 128, 128, 0.185);
	}
	.details td {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-right: 2rem;
	}

	.details .delet-Button {
		display: flex;
		justify-content: center;
		background: none;
		border: none;
		outline: none;
		cursor: pointer;
	}
	.details .descraption {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		color: #333333;
		font-weight: 600;
		width: 35%;
	}
	.details .Prix {
		color: #777777;
		display: flex;
		justify-content: center;
		width: 10rem;
	}
	.Qte-general-input {
		display: flex;
		align-items: center;
		justify-content: center;
		border-collapse: collapse;

		overflow: hidden;
		width: 12vh;
		height: 7vh;

		font-size: 2rem;
	}
	.Qte-general-input input[type='button'] {
		display: flex;
		border: 2px solid rgba(128, 128, 128, 0.349);
		font-size: 1.7rem;
		width: 40%;
		outline: none;
		height: 100%;
		transition: 0.3s;
		background-color: white;
	}
	.Qte-general-input input[type='number'] {
		display: flex;
		align-items: center;
		text-align: center;
		border: none;
		width: 60%;
		height: 100%;
		outline: none;
		border-block: 2px solid rgba(128, 128, 128, 0.349);
		font-size: 1.7rem;
	}
	.Qte-general-input .rightbt {
		border-top-right-radius: 100px;
		border-bottom-right-radius:100px;
	}
	.Qte-general-input .leftbt {
		border-top-left-radius:100px;
		border-bottom-left-radius: 100px;
	}

	.Qte-general-input .leftbt:hover,
	.Qte-general-input .rightbt:hover {
		background: #b95959;
		cursor: pointer;
		border: 2px solid #b95959;
	}

	.details .total-Price-X-QTE {
		color: hsla(0, 41%, 54%, 0.45);
		font-weight: 800;
		-webkit-text-stroke: rgb(77, 77, 77) 0.1px;
		width: 12rem;
		
	}


</style>
