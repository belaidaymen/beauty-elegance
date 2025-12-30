import { writable } from 'svelte/store';

export interface StockItem {
	productId: string;
	productName: string;
	currentStock: number;
	minimumThreshold: number;
	maximumCapacity: number;
	lastRestockDate: Date;
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface StockStore {
	items: StockItem[];
	loading: boolean;
	error: string | null;
}

function createStockStore() {
	const { subscribe, set, update } = writable<StockStore>({
		items: [],
		loading: false,
		error: null
	});

	return {
		subscribe,
		updateStock: (productId: string, newStock: number) =>
			update((state) => ({
				...state,
				items: state.items.map((item) =>
					item.productId === productId
						? {
								...item,
								currentStock: newStock,
								status:
									newStock === 0 ? 'out-of-stock' : newStock <= item.minimumThreshold ? 'low-stock' : 'in-stock'
							}
						: item
				)
			})),
		addStockItem: (item: StockItem) =>
			update((state) => ({
				...state,
				items: [item, ...state.items]
			})),
		setItems: (items: StockItem[]) =>
			update((state) => ({ ...state, items })),
		setLoading: (loading: boolean) =>
			update((state) => ({ ...state, loading })),
		setError: (error: string | null) =>
			update((state) => ({ ...state, error }))
	};
}

export const stockStore = createStockStore();
