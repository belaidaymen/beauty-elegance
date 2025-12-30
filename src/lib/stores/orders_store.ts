import { writable, type Writable } from 'svelte/store';
import type { Order } from '$lib/types';

interface OrdersStore extends Writable<Order[]> {
	add: (order: Order) => void;
	remove: (orderId: string) => void;
	update: (orderId: string, updates: Partial<Order>) => void;
	getById: (orderId: string) => Order | undefined;
}

function createOrdersStore(): OrdersStore {
	// Load orders from localStorage if exists
	const storedOrders = typeof window !== 'undefined' ? localStorage.getItem('orders') : null;
	const initialOrders: Order[] = storedOrders ? JSON.parse(storedOrders) : [];

	const { subscribe, set, update: updateStore } = writable<Order[]>(initialOrders);

	// Persist orders to localStorage whenever they change
	subscribe((orders) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('orders', JSON.stringify(orders));
		}
	});

	return {
		subscribe,
		set,
		update: updateStore,
		add: (order: Order) => {
			updateStore((orders) => [...orders, order]);
		},
		remove: (orderId: string) => {
			updateStore((orders) => orders.filter((o) => o.id !== orderId));
		},
		update: (orderId: string, updates: Partial<Order>) => {
			updateStore((orders) =>
				orders.map((order) => (order.id === orderId ? { ...order, ...updates } : order))
			);
		},
		getById: (orderId: string) => {
			let foundOrder: Order | undefined;
			subscribe((orders) => {
				foundOrder = orders.find((o) => o.id === orderId);
			})();
			return foundOrder;
		}
	};
}

export const orders = createOrdersStore();
