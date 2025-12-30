import { writable } from 'svelte/store';

export interface Order {
	id: string;
	orderNumber: string;
	customerName: string;
	customerEmail: string;
	totalAmount: number;
	status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
	paymentMethod: 'cod' | 'card' | 'transfer';
	paymentStatus: 'pending' | 'completed' | 'failed';
	items: OrderItem[];
	shippingAddress: Address;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderItem {
	id: string;
	productId: string;
	productName: string;
	quantity: number;
	price: number;
	totalPrice: number;
}

export interface Address {
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	phone: string;
}

interface OrdersStore {
	orders: Order[];
	loading: boolean;
	error: string | null;
}

function createOrdersStore() {
	const { subscribe, set, update } = writable<OrdersStore>({
		orders: [],
		loading: false,
		error: null
	});

	return {
		subscribe,
		addOrder: (order: Order) =>
			update((state) => ({
				...state,
				orders: [order, ...state.orders]
			})),
		updateOrder: (id: string, updatedOrder: Partial<Order>) =>
			update((state) => ({
				...state,
				orders: state.orders.map((order) => (order.id === id ? { ...order, ...updatedOrder } : order))
			})),
		deleteOrder: (id: string) =>
			update((state) => ({
				...state,
				orders: state.orders.filter((order) => order.id !== id)
			})),
		setOrders: (orders: Order[]) =>
			update((state) => ({ ...state, orders })),
		setLoading: (loading: boolean) =>
			update((state) => ({ ...state, loading })),
		setError: (error: string | null) =>
			update((state) => ({ ...state, error }))
	};
}

export const ordersStore = createOrdersStore();
