<script lang="ts">
	import { cart } from '$lib/stores/cart_store';
	import deletIcon from '$lib/assets/icons/deletcartproduct.svg';
	import { initialPrice } from '$lib/stores/total_price_cart_store';
	export let product: CartProductProps;
</script>

<tr class="top-part">
	<td>
		<div>
			<button class="delet-Button" on:click={() => cart.remove(product, true)} ><img src={deletIcon} width="13" alt="deletIcon" /></button>
			<h1>{product.name}</h1>
		</div>
	</td>
	<td> <img src={product.imgUrl} alt="" width="300" /> </td>
</tr>
<tr class="main-descraption">
	<td id="descraption" class="descraption"> {product.description}</td>
</tr>
<tr class="detail-in-phone">
	<td
		>PRIX : <span class="Prix"
			>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product.price)} DZD</span
		></td
	>
	<td
		>QUANTITE : <div class="Qte-general-input">
			<input class="leftbt" type="button" value="+" on:click={() => cart.add(product)} />
			<input class="QTE" type="number" value={product.quantity} />
			<input class="rightbt" type="button" value="-" on:click={() => cart.remove(product, false)} />
		</div></td
	>
	<td
		>sous-TOTAL : <span class="total-Price-X-QTE"
			>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
				product.price * product.quantity
			)} DZD</span
		></td
	>
</tr>

<style>
	.top-part .delet-Button {
		display: flex;
		justify-content: center;
		background: none;
		border: none;
		outline: none;
		cursor: pointer;
	}
	.main-descraption .descraption {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		color: #333333;
		font-weight: 600;
		width: 35%;
	}
	.detail-in-phone .Prix {
		color: #777777;
		display: flex;
		justify-content: center;
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
		border-top-right-radius: 50px;
		border-bottom-right-radius: 50px;
	}
	.Qte-general-input .leftbt {
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
	}

	.Qte-general-input .leftbt:hover,
	.Qte-general-input .rightbt:hover {
		background: #b95959;
		cursor: pointer;
		border: 2px solid #b95959;
	}

	.detail-in-phone .total-Price-X-QTE {
		color: hsla(0, 41%, 54%, 0.45);
		font-weight: 800;
		-webkit-text-stroke: rgb(77, 77, 77) 0.1px;
	}

	.top-part {
		display: flex;
		flex-direction: column;
		font-size: 1.2rem;
		width: 100%;
		position: relative;
		margin-top: 2rem;
	}
	.top-part div {
		width: 100%;
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
	}
	.top-part div button {
		position: absolute;
		left: 5%;
	}
	.top-part div h1 {
		font-size: 2.2rem;
	}
	.main-descraption {
		display: flex;
		justify-content: center;
		text-align: center;
		align-items: center;
		width: 100%;
	}
	#descraption {
		width: 100%;
		padding: 2rem;
		border-bottom: dashed 2px rgba(128, 128, 128, 0.185);
	}
	.detail-in-phone {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		width: 100%;
	}
	.detail-in-phone td {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		border-bottom: dashed 1px rgba(128, 128, 128, 0.185);
	}
	.detail-in-phone input[type='number']::-webkit-inner-spin-button,
	.detail-in-phone input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}
</style>
