import { writable, type Writable } from 'svelte/store';
import type { FavoriteProduct } from '$lib/types';

interface FavoritesStore extends Writable<FavoriteProduct[]> {
	add: (favorite: FavoriteProduct) => void;
	remove: (productId: string) => void;
	isFavorite: (productId: string) => boolean;
}

function createFavoritesStore(): FavoritesStore {
	// Load favorites from localStorage if exists
	const storedFavorites = typeof window !== 'undefined' ? localStorage.getItem('favorites') : null;
	const initialFavorites: FavoriteProduct[] = storedFavorites ? JSON.parse(storedFavorites) : [];

	const { subscribe, set, update: updateStore } = writable<FavoriteProduct[]>(initialFavorites);

	// Persist favorites to localStorage whenever they change
	subscribe((favorites) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('favorites', JSON.stringify(favorites));
		}
	});

	return {
		subscribe,
		set,
		update: updateStore,
		add: (favorite: FavoriteProduct) => {
			updateStore((favorites) => {
				// Check if already favorite
				if (favorites.find((f) => f.productId === favorite.productId)) {
					return favorites;
				}
				return [...favorites, favorite];
			});
		},
		remove: (productId: string) => {
			updateStore((favorites) => favorites.filter((f) => f.productId !== productId));
		},
		isFavorite: (productId: string) => {
			let found = false;
			subscribe((favorites) => {
				found = favorites.some((f) => f.productId === productId);
			})();
			return found;
		}
	};
}

export const favorites = createFavoritesStore();
