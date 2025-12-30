import { writable } from 'svelte/store';

export interface Promotion {
	id: string;
	name: string;
	description: string;
	code: string;
	discountType: 'percentage' | 'fixed';
	discountValue: number;
	minPurchaseAmount?: number;
	startDate: Date;
	endDate: Date;
	usageLimit?: number;
	usageCount: number;
	applicableCategories?: string[];
	applicableProducts?: string[];
	active: boolean;
	createdAt: Date;
}

interface PromotionsStore {
	promotions: Promotion[];
	loading: boolean;
	error: string | null;
}

function createPromotionsStore() {
	const { subscribe, set, update } = writable<PromotionsStore>({
		promotions: [],
		loading: false,
		error: null
	});

	return {
		subscribe,
		addPromotion: (promotion: Promotion) =>
			update((state) => ({
				...state,
				promotions: [promotion, ...state.promotions]
			})),
		updatePromotion: (id: string, updatedPromotion: Partial<Promotion>) =>
			update((state) => ({
				...state,
				promotions: state.promotions.map((promo) =>
					promo.id === id ? { ...promo, ...updatedPromotion } : promo
				)
			})),
		deletePromotion: (id: string) =>
			update((state) => ({
				...state,
				promotions: state.promotions.filter((promo) => promo.id !== id)
			})),
		setPromotions: (promotions: Promotion[]) =>
			update((state) => ({ ...state, promotions })),
		setLoading: (loading: boolean) =>
			update((state) => ({ ...state, loading })),
		setError: (error: string | null) =>
			update((state) => ({ ...state, error }))
	};
}

export const promotionsStore = createPromotionsStore();
