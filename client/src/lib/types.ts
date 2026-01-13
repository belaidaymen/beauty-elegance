export interface User {
	id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	postalCode: string;
	country: string;
	avatar?: string;
	createdAt: string;
	updatedAt: string;
}

export interface CartProductProps {
	id: string;
	name: string;
	price: number;
	imgUrl: string;
	category: string;
	description: string;
	quantity: number;
}

export interface ProductProps extends Omit<CartProductProps, 'quantity'> {}

export interface Order {
	id: string;
	orderNumber: string;
	userId: string;
	items: CartProductProps[];
	totalAmount: number;
	deliveryStatus: 'order-placed' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
	orderDate: string;
	estimatedDeliveryDate?: string;
	actualDeliveryDate?: string;
	shippingAddress: {
		firstName: string;
		lastName: string;
		address: string;
		city: string;
		postalCode: string;
		country: string;
		phone: string;
	};
	paymentMethod: string;
	paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface DeliveryUpdate {
	orderId: string;
	status: 'order-placed' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
	timestamp: string;
	description: string;
	location?: string;
}

export interface ServiceFeedback {
	id: string;
	userId: string;
	orderId: string;
	rating: 1 | 2 | 3 | 4 | 5;
	notes: string;
	createdAt: string;
	updatedAt: string;
}

export interface FavoriteProduct {
	productId: string;
	userId: string;
	addedAt: string;
	product: ProductProps;
}
