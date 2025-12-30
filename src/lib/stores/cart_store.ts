import { writable, type Writable } from 'svelte/store';
import type { CartProductProps, ProductProps } from '$lib/types';

export const cart = createCartStore();

function createCartStore(): CartStore {
	const { subscribe, update } = writable<CartProductProps[]>([]);

	return {
		subscribe,
		add(p) {
			update((prevCart) => {
				const productInCart = prevCart.find((productInCart) => productInCart.name === p.name);

				if (productInCart) {
					productInCart.quantity += 1;
				} else {
					prevCart.push({ ...p, quantity: 1 });
				}

				return prevCart;
			});
		},
		remove(p, allQuantites) {
			update((prevCart) => {
				const productInCart = prevCart.find((productInCart) => productInCart.name === p.name);

				if (productInCart) {
					if (allQuantites) {
						prevCart.splice(prevCart.indexOf(productInCart), 1);
					} else {
						if (productInCart.quantity > 0) {
							productInCart.quantity -= 1;
						}
					}
				}

				return prevCart;
			});
		}
	};
}

interface CartStore extends Pick<Writable<CartProductProps[]>, 'subscribe'> {
	add: (p: ProductProps) => void;
	remove: (p: CartProductProps, allQuantites: boolean) => void;
}
