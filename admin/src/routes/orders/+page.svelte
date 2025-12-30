<script lang="ts">
	import OrdersList from '$lib/components/Orders/OrdersList.svelte';
	import OrdersFilters from '$lib/components/Orders/OrdersFilters.svelte';
	import { ordersStore } from '$lib/stores/orders_store';
	import { uiStore } from '$lib/stores/ui_store';
	import type { Order } from '$lib/stores/orders_store';

	let searchQuery = '';
	let statusFilter = 'all';
	let paymentStatusFilter = 'all';
	let orders: Order[] = [];
	let filteredOrders: Order[] = [];

	// Initialize with demo orders
	const demoOrders: Order[] = [
		{
			id: '1',
			orderNumber: 'ORD001',
			customerName: 'Fatima Ahmed',
			customerEmail: 'fatima@example.com',
			totalAmount: 12500,
			status: 'delivered',
			paymentMethod: 'cod',
			paymentStatus: 'completed',
			items: [
				{
					id: '1',
					productId: 'p1',
					productName: 'Shampoing Gracias',
					quantity: 2,
					price: 5000,
					totalPrice: 10000
				}
			],
			shippingAddress: {
				street: '123 Rue Principale',
				city: 'Alger',
				state: 'Alger',
				zipCode: '16000',
				country: 'Algérie',
				phone: '+213 555 123456'
			},
			createdAt: new Date('2024-12-28'),
			updatedAt: new Date('2024-12-28')
		},
		{
			id: '2',
			orderNumber: 'ORD002',
			customerName: 'Mohamed Karim',
			customerEmail: 'karim@example.com',
			totalAmount: 8900,
			status: 'processing',
			paymentMethod: 'card',
			paymentStatus: 'completed',
			items: [
				{
					id: '2',
					productId: 'p2',
					productName: 'Mascara Professionnel',
					quantity: 1,
					price: 8900,
					totalPrice: 8900
				}
			],
			shippingAddress: {
				street: '45 Boulevard Central',
				city: 'Oran',
				state: 'Oran',
				zipCode: '31000',
				country: 'Algérie',
				phone: '+213 555 234567'
			},
			createdAt: new Date('2024-12-27'),
			updatedAt: new Date('2024-12-27')
		},
		{
			id: '3',
			orderNumber: 'ORD003',
			customerName: 'Amina Hassan',
			customerEmail: 'amina@example.com',
			totalAmount: 15600,
			status: 'pending',
			paymentMethod: 'transfer',
			paymentStatus: 'pending',
			items: [
				{
					id: '3',
					productId: 'p3',
					productName: 'Crème Visage Premium',
					quantity: 3,
					price: 5200,
					totalPrice: 15600
				}
			],
			shippingAddress: {
				street: '67 Rue de la Paix',
				city: 'Constantine',
				state: 'Constantine',
				zipCode: '25000',
				country: 'Algérie',
				phone: '+213 555 345678'
			},
			createdAt: new Date('2024-12-27'),
			updatedAt: new Date('2024-12-27')
		},
		{
			id: '4',
			orderNumber: 'ORD004',
			customerName: 'Layla Ibrahim',
			customerEmail: 'layla@example.com',
			totalAmount: 6200,
			status: 'shipped',
			paymentMethod: 'cod',
			paymentStatus: 'completed',
			items: [
				{
					id: '4',
					productId: 'p4',
					productName: 'Parfum Luxe',
					quantity: 1,
					price: 6200,
					totalPrice: 6200
				}
			],
			shippingAddress: {
				street: '89 Avenue Mohamed',
				city: 'Annaba',
				state: 'Annaba',
				zipCode: '23000',
				country: 'Algérie',
				phone: '+213 555 456789'
			},
			createdAt: new Date('2024-12-26'),
			updatedAt: new Date('2024-12-26')
		},
		{
			id: '5',
			orderNumber: 'ORD005',
			customerName: 'Zainab Malik',
			customerEmail: 'zainab@example.com',
			totalAmount: 22300,
			status: 'confirmed',
			paymentMethod: 'card',
			paymentStatus: 'completed',
			items: [
				{
					id: '5',
					productId: 'p1',
					productName: 'Shampoing Gracias',
					quantity: 2,
					price: 5000,
					totalPrice: 10000
				},
				{
					id: '6',
					productId: 'p5',
					productName: 'Soin Capillaire Intense',
					quantity: 1,
					price: 12300,
					totalPrice: 12300
				}
			],
			shippingAddress: {
				street: '12 Rue de Commerce',
				city: 'Tlemcen',
				state: 'Tlemcen',
				zipCode: '13200',
				country: 'Algérie',
				phone: '+213 555 567890'
			},
			createdAt: new Date('2024-12-25'),
			updatedAt: new Date('2024-12-25')
		}
	];

	ordersStore.setOrders(demoOrders);

	ordersStore.subscribe((state) => {
		orders = state.orders;
		filterOrders();
	});

	function filterOrders() {
		filteredOrders = orders.filter((order) => {
			const matchesSearch =
				order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
				order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
			const matchesPaymentStatus = paymentStatusFilter === 'all' || order.paymentStatus === paymentStatusFilter;

			return matchesSearch && matchesStatus && matchesPaymentStatus;
		});
	}

	function handleSearch(e: Event) {
		const target = e.target as HTMLInputElement;
		searchQuery = target.value;
		filterOrders();
	}

	function handleStatusFilter(e: Event) {
		const target = e.target as HTMLSelectElement;
		statusFilter = target.value;
		filterOrders();
	}

	function handlePaymentFilter(e: Event) {
		const target = e.target as HTMLSelectElement;
		paymentStatusFilter = target.value;
		filterOrders();
	}
</script>

<svelte:head>
	<title>Gestion des Commandes | Admin</title>
</svelte:head>

<div class="orders-container">
	<section class="page-header">
		<div class="header-content">
			<h1>Gestion des Commandes</h1>
			<p class="subtitle">Gérez et suivez toutes vos commandes</p>
		</div>
		<button class="btn btn-primary">
			📥 Exporter
		</button>
	</section>

	<OrdersFilters
		{searchQuery}
		{statusFilter}
		{paymentStatusFilter}
		onSearch={handleSearch}
		onStatusChange={handleStatusFilter}
		onPaymentChange={handlePaymentFilter}
	/>

	<section class="orders-stats">
		<div class="stat-box">
			<p class="stat-label">Total Commandes</p>
			<p class="stat-value">{orders.length}</p>
		</div>
		<div class="stat-box">
			<p class="stat-label">En Attente</p>
			<p class="stat-value" style="color: var(--color-warning);">
				{orders.filter((o) => o.status === 'pending').length}
			</p>
		</div>
		<div class="stat-box">
			<p class="stat-label">Livrées</p>
			<p class="stat-value" style="color: var(--color-success);">
				{orders.filter((o) => o.status === 'delivered').length}
			</p>
		</div>
		<div class="stat-box">
			<p class="stat-label">Revenu Total</p>
			<p class="stat-value">
				{new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(
					orders.reduce((sum, o) => sum + o.totalAmount, 0)
				)} DZD
			</p>
		</div>
	</section>

	<OrdersList {filteredOrders} />
</div>

<style>
	.orders-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
	}

	.header-content h1 {
		margin: 0 0 var(--spacing-sm) 0;
		color: var(--color-accent-teal);
	}

	.subtitle {
		margin: 0;
		color: var(--color-text-lighter);
		font-size: 1.5rem;
	}

	.orders-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);
	}

	.stat-box {
		background: white;
		padding: var(--spacing-lg);
		border-radius: var(--radius-lg);
		border-left: 4px solid var(--color-accent-teal);
		box-shadow: var(--shadow-sm);
	}

	.stat-label {
		margin: 0 0 var(--spacing-sm) 0;
		color: var(--color-text-lighter);
		font-size: 1.3rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	.stat-value {
		margin: 0;
		font-size: 2.4rem;
		font-weight: 700;
		color: var(--color-text-dark);
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.orders-stats {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
