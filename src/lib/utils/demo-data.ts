import type { Order, FavoriteProduct, ServiceFeedback } from '$lib/types';
import { products } from '$lib/stores/products_store';

let allProducts: any[] = [];
products.subscribe((prods) => {
	allProducts = Object.values(prods).flat();
});

export function generateDemoOrders(): Order[] {
	const demoOrders: Order[] = [
		{
			id: 'order-1',
			orderNumber: '#0001',
			userId: '',
			items: [
				{
					id: 'prod-maquillage-1',
					name: 'nouba',
					price: 2500,
					imgUrl: '/lib/assets/Sample Imgs/Products Imgs/photo_10.jpg',
					category: 'maquillage',
					description: 'rougr a levre nouba',
					quantity: 1
				},
				{
					id: 'prod-cheveux-1',
					name: ' viola noir',
					price: 450,
					imgUrl: '/lib/assets/Sample Imgs/Products Imgs/photo_1.jpg',
					category: 'cheveux',
					description: 'Masque pour cheveux 350ml ',
					quantity: 2
				}
			],
			totalAmount: 3400,
			deliveryStatus: 'delivered',
			orderDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
			estimatedDeliveryDate: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
			actualDeliveryDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
			shippingAddress: {
				firstName: 'John',
				lastName: 'Doe',
				address: '123 Rue de la Beauté',
				city: 'Alger',
				postalCode: '16000',
				country: 'Algérie',
				phone: '+213 XXX XXX XXX'
			},
			paymentMethod: 'Carte de crédit',
			paymentStatus: 'completed'
		},
		{
			id: 'order-2',
			orderNumber: '#0002',
			userId: '',
			items: [
				{
					id: 'prod-visage-2',
					name: 'polycos',
					price: 530,
					imgUrl: '/lib/assets/Sample Imgs/Products Imgs/photo_6.jpg',
					category: 'visage',
					description: "masque pour visage huile d'argant",
					quantity: 1
				}
			],
			totalAmount: 583,
			deliveryStatus: 'out-for-delivery',
			orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
			estimatedDeliveryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
			shippingAddress: {
				firstName: 'John',
				lastName: 'Doe',
				address: '123 Rue de la Beauté',
				city: 'Alger',
				postalCode: '16000',
				country: 'Algérie',
				phone: '+213 XXX XXX XXX'
			},
			paymentMethod: 'Carte de crédit',
			paymentStatus: 'completed'
		},
		{
			id: 'order-3',
			orderNumber: '#0003',
			userId: '',
			items: [
				{
					id: 'prod-corps-1',
					name: 'dermactive',
					price: 720,
					imgUrl: '/lib/assets/Sample Imgs/Products Imgs/photo_5.jpg',
					category: 'corps & bain',
					description: 'gommage citron pour corps 350ml',
					quantity: 1
				},
				{
					id: 'prod-deo-1',
					name: 'nevia',
					price: 750,
					imgUrl: '/lib/assets/Sample Imgs/Products Imgs/photo_12.jpg',
					category: 'deo & stick',
					description: 'stick nevia extra bright',
					quantity: 1
				}
			],
			totalAmount: 1617,
			deliveryStatus: 'shipped',
			orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
			estimatedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
			shippingAddress: {
				firstName: 'John',
				lastName: 'Doe',
				address: '123 Rue de la Beauté',
				city: 'Alger',
				postalCode: '16000',
				country: 'Algérie',
				phone: '+213 XXX XXX XXX'
			},
			paymentMethod: 'Carte de crédit',
			paymentStatus: 'completed'
		}
	];

	return demoOrders;
}

export function generateDemoFavorites(): FavoriteProduct[] {
	return [
		{
			productId: 'prod-maquillage-2',
			userId: '',
			addedAt: new Date().toISOString(),
			product: {
				id: 'prod-maquillage-2',
				name: 'bourjois',
				price: 1050,
				imgUrl: '/lib/assets/Sample Imgs/Products Imgs/photo_11.jpg',
				category: 'maquillage',
				description: 'Fond de teint 123 30ml'
			}
		},
		{
			productId: 'prod-cheveux-2',
			userId: '',
			addedAt: new Date().toISOString(),
			product: {
				id: 'prod-cheveux-2',
				name: 'viola',
				price: 500,
				imgUrl: '/lib/assets/Sample Imgs/Products Imgs/photo_3.jpg',
				category: 'cheveux',
				description: 'serum pour cheveux reparateur'
			}
		}
	];
}

export function generateDemoFeedback(): ServiceFeedback[] {
	return [
		{
			id: 'feedback-1',
			userId: '',
			orderId: 'order-1',
			rating: 5,
			notes: 'Excellent service! La livraison était rapide et le produit était bien emballé.',
			createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
			updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
		}
	];
}
