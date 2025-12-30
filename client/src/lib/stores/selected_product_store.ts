import { writable } from 'svelte/store';

export const selectedProduct = writable<ProductProps | null>(null);