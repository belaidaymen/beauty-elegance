<script lang="ts">
    import { products } from "$lib/stores/products_store";
	import { selectedProduct } from '$lib/stores/selected_product_store';
	import { cart } from '$lib/stores/cart_store';

	


	/*for (let key in $products) {
  if (Array.isArray($products[key])) {
   
  }
}
*/

  
</script>

<div class="container">
    <img class="product-img" width="100" src={$selectedProduct?.imgUrl} alt="" />

    <div class="right-elements">
        <div class="text-container"></div>
        <div class="title-continer">
            <h1>{$selectedProduct?.name}</h1>
            <p class="small-detail">{$selectedProduct?.description} </p>
        </div>
        <div class="price-container">
            <hr />
            <p class="price">{$selectedProduct?.price} DZD</p>
            <hr />

        </div>
        <div class="Qte">
            <span>Quantité :</span>
            <div class="Qte-general-input">
                <input class="leftbt" type="button" value="+"  />
                <input class="QTE" type="number" value="1" disabled/>
                <input class="rightbt" type="button" value="-" />
            </div>
        </div>
		<p>Categorie : </p>
		<button class="ajoute-panier" >Ajouter au panier</button>
    </div>
</div>

<style>
    .container {
		display: flex;
		
		align-items: center;
		width: 100%;
		gap: 5rem;
		padding: 2rem;
       
	}
	.product-img {
		border: 5px solid rgba(107, 107, 107, 0.164);
		border-radius: 50px;
		width: 120vh;
		height: 70vh;
        
	}
	.container .right-elements {
		display: flex;
		flex-direction: column;
		align-items: center;
        justify-content: space-between;
		height: 100%;
		width: 100%;
       
	}
	.text-container {
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		width: 100%;
        

	}
    .price-container{
        display: flex; 
        flex-direction: column;
        width: 100%;

    }
	.right-elements p, .right-elements h1 {
		display: flex;
		width: 100%;
		font-weight: 600;
		font-family: open, sans-serif;
	}
	.title-continer {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}
	.small-detail {
		color: gray;
	}
	.Qte {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: start;
		gap: 2rem;
		font-weight: 700;
		font-family: open, sans-serif;
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

	.Qte input[type='number']::-webkit-inner-spin-button,
	.Qte input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}
	.price {
		font-size: 3rem;
		color: hsla(0, 41%, 54%, 0.452);
        margin-block: 2rem;
	}
	.ajoute-panier {
		border: none;
		background-color: hsla(0, 41%, 54%, 0.452);
		width: 80%;
		height: 8vh;
		border-radius: 50px;
		color: white;
		font-size: 1.8rem;
		font-weight: 800;
		transition: 0.3s;
	}
	.ajoute-panier:hover {
		background-color: #b95959;
		cursor: pointer;
	}
	hr {
		border: solid 1px rgba(128, 128, 128, 0.185);
	}

	@media (max-width : 1050px){
		.container{
			display: flex;
			flex-wrap: wrap;
			padding-bottom: 9rem;
		}
		.container .right-elements {
	
		height: 65%;
		padding-bottom: 5rem;
		
       
	}
	.product-img {
		border: none;
		
	
        
	}
	}
</style>