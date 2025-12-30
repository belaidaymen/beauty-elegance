import { writable } from 'svelte/store';

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	stock: number;
	images: string[];
	sku: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
}

interface ProductsStore {
	products: Product[];
	loading: boolean;
	error: string | null;
}

function createProductsStore() {
	const { subscribe, set, update } = writable<ProductsStore>({
		products: [],
		loading: false,
		error: null
	});

	return {
		subscribe,
		addProduct: (product: Product) =>
			update((state) => ({
				...state,
				products: [product, ...state.products]
			})),
		updateProduct: (id: string, updatedProduct: Partial<Product>) =>
			update((state) => ({
				...state,
				products: state.products.map((product) =>
					product.id === id ? { ...product, ...updatedProduct } : product
				)
			})),
		deleteProduct: (id: string) =>
			update((state) => ({
				...state,
				products: state.products.filter((product) => product.id !== id)
			})),
		setProducts: (products: Product[]) =>
			update((state) => ({ ...state, products })),
		setLoading: (loading: boolean) =>
			update((state) => ({ ...state, loading })),
		setError: (error: string | null) =>
			update((state) => ({ ...state, error }))
	};
}

export const productsStore = createProductsStore();
