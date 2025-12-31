<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import AdvancedFilters from '$lib/components/Orders/AdvancedFilters.svelte';
	import Pagination from '$lib/components/Orders/Pagination.svelte';
	import Invoice from '$lib/components/Orders/Invoice.svelte';
	import { Eye, Package, Clock, RotateCw, CheckCircle, XCircle, DollarSign, Printer, Download, Search } from 'lucide-svelte';

	interface OrderItem {
		name: string;
		quantity: number;
		price: number;
		total: number;
	}

	interface Order {
		id: string;
		customer: string;
		email: string;
		phone?: string;
		address?: string;
		city?: string;
		postalCode?: string;
		total: number;
		subtotal?: number;
		tax?: number;
		status: string;
		date: string;
		items: OrderItem[] | number;
		notes?: string;
		paymentMethod?: string;
	}

	// Extended order data with full details
	let allOrders: Order[] = [
		{
			id: '#ORD-001',
			customer: 'Sarah Anderson',
			email: 'sarah@example.com',
			phone: '+213 (21) 555-0101',
			address: '45 Rue de la Paix',
			city: 'Algiers',
			postalCode: '16000',
			total: 2500,
			subtotal: 2100,
			tax: 400,
			status: 'Delivered',
			date: '2024-01-15',
			items: [
				{ name: 'Premium Skincare Set', quantity: 1, price: 1200, total: 1200 },
				{ name: 'Luxury Perfume 100ml', quantity: 1, price: 900, total: 900 }
			],
			paymentMethod: 'Credit Card',
			notes: 'Express delivery completed'
		},
		{
			id: '#ORD-002',
			customer: 'Marie Dupont',
			email: 'marie@example.com',
			phone: '+213 (21) 555-0102',
			address: '23 Boulevard Central',
			city: 'Oran',
			postalCode: '31000',
			total: 1850,
			subtotal: 1554,
			tax: 296,
			status: 'Processing',
			date: '2024-01-14',
			items: [
				{ name: 'Hair Care Bundle', quantity: 2, price: 777, total: 1554 }
			],
			paymentMethod: 'Bank Transfer',
			notes: 'Packaging in progress'
		},
		{
			id: '#ORD-003',
			customer: 'Lisa Cohen',
			email: 'lisa@example.com',
			phone: '+213 (21) 555-0103',
			address: '78 Avenue Principale',
			city: 'Constantine',
			postalCode: '25000',
			total: 3200,
			subtotal: 2689,
			tax: 511,
			status: 'Pending',
			date: '2024-01-13',
			items: [
				{ name: 'Complete Makeup Collection', quantity: 1, price: 1800, total: 1800 },
				{ name: 'Face Serum Premium', quantity: 2, price: 445, total: 890 }
			],
			paymentMethod: 'Credit Card',
			notes: 'Awaiting payment confirmation'
		},
		{
			id: '#ORD-004',
			customer: 'Emma Wilson',
			email: 'emma@example.com',
			phone: '+213 (21) 555-0104',
			address: '12 Rue du Commerce',
			city: 'Blida',
			postalCode: '09000',
			total: 1500,
			subtotal: 1261,
			tax: 239,
			status: 'Shipped',
			date: '2024-01-12',
			items: [
				{ name: 'Anti-Aging Cream', quantity: 1, price: 1261, total: 1261 }
			],
			paymentMethod: 'Online Payment',
			notes: 'Shipped via Express Courier'
		},
		{
			id: '#ORD-005',
			customer: 'Claire Martin',
			email: 'claire@example.com',
			phone: '+213 (21) 555-0105',
			address: '56 Place de l\'Indépendance',
			city: 'Annaba',
			postalCode: '23000',
			total: 2100,
			subtotal: 1764,
			tax: 336,
			status: 'Delivered',
			date: '2024-01-11',
			items: [
				{ name: 'Sunscreen SPF 50', quantity: 3, price: 425, total: 1275 },
				{ name: 'Lip Care Set', quantity: 1, price: 489, total: 489 }
			],
			paymentMethod: 'Credit Card',
			notes: 'Delivered successfully'
		},
		{
			id: '#ORD-006',
			customer: 'Nora Schmidt',
			email: 'nora@example.com',
			phone: '+213 (21) 555-0106',
			address: '34 Chemin des Fleurs',
			city: 'Bejaia',
			postalCode: '06000',
			total: 950,
			subtotal: 798,
			tax: 152,
			status: 'Pending',
			date: '2024-01-10',
			items: [
				{ name: 'Moisturizing Lotion', quantity: 1, price: 798, total: 798 }
			],
			paymentMethod: 'Credit Card',
			notes: 'Payment pending'
		},
		{
			id: '#ORD-007',
			customer: 'Jessica Brown',
			email: 'jessica@example.com',
			phone: '+213 (21) 555-0107',
			address: '89 Avenue des Sciences',
			city: 'Algiers',
			postalCode: '16300',
			total: 3500,
			subtotal: 2941,
			tax: 559,
			status: 'Processing',
			date: '2024-01-09',
			items: [
				{ name: 'Luxury Fashion Watch', quantity: 1, price: 1800, total: 1800 },
				{ name: 'Designer Handbag', quantity: 1, price: 1141, total: 1141 }
			],
			paymentMethod: 'Credit Card',
			notes: 'Gift wrapping requested'
		},
		{
			id: '#ORD-008',
			customer: 'Rachel Green',
			email: 'rachel@example.com',
			phone: '+213 (21) 555-0108',
			address: '42 Rue Saint-Jean',
			city: 'Tlemcen',
			postalCode: '13200',
			total: 1200,
			subtotal: 1008,
			tax: 192,
			status: 'Delivered',
			date: '2024-01-08',
			items: [
				{ name: 'Essential Oil Set', quantity: 2, price: 504, total: 1008 }
			],
			paymentMethod: 'Bank Transfer',
			notes: 'Customer satisfied'
		},
		{
			id: '#ORD-009',
			customer: 'Sophie Laurent',
			email: 'sophie@example.com',
			phone: '+213 (21) 555-0109',
			address: '77 Boulevard Pasteur',
			city: 'Sidi Bel Abbès',
			postalCode: '22000',
			total: 2700,
			subtotal: 2269,
			tax: 431,
			status: 'Shipped',
			date: '2024-01-07',
			items: [
				{ name: 'Skincare Routine Kit', quantity: 1, price: 1600, total: 1600 },
				{ name: 'Face Mask Bundle', quantity: 1, price: 669, total: 669 }
			],
			paymentMethod: 'Online Payment',
			notes: 'In transit'
		},
		{
			id: '#ORD-010',
			customer: 'Amanda Thomas',
			email: 'amanda@example.com',
			phone: '+213 (21) 555-0110',
			address: '99 Avenue de la République',
			city: 'Tiaret',
			postalCode: '14000',
			total: 1100,
			subtotal: 924,
			tax: 176,
			status: 'Pending',
			date: '2024-01-06',
			items: [
				{ name: 'Nail Care System', quantity: 1, price: 924, total: 924 }
			],
			paymentMethod: 'Credit Card',
			notes: 'Awaiting confirmation'
		},
		{
			id: '#ORD-011',
			customer: 'Laura Martinez',
			email: 'laura@example.com',
			phone: '+213 (21) 555-0111',
			address: '66 Rue des Artisans',
			city: 'Mascara',
			postalCode: '29000',
			total: 2400,
			subtotal: 2016,
			tax: 384,
			status: 'Cancelled',
			date: '2024-01-05',
			items: [
				{ name: 'Fashion Sunglasses', quantity: 1, price: 2016, total: 2016 }
			],
			paymentMethod: 'Credit Card',
			notes: 'Customer requested cancellation'
		},
		{
			id: '#ORD-012',
			customer: 'Nina Rossi',
			email: 'nina@example.com',
			phone: '+213 (21) 555-0112',
			address: '11 Place de l\'Église',
			city: 'Skikda',
			postalCode: '21000',
			total: 1750,
			subtotal: 1470,
			tax: 280,
			status: 'Delivered',
			date: '2024-01-04',
			items: [
				{ name: 'Body Care Luxury Collection', quantity: 1, price: 1470, total: 1470 }
			],
			paymentMethod: 'Bank Transfer',
			notes: 'Delivery confirmed'
		}
	];

	// Pagination
	let currentPage = 1;
	const itemsPerPage = 10;
	let filteredOrders = [...allOrders];

	// Advanced filters
	let activeFilters = {
		status: [] as string[],
		dateFrom: '',
		dateTo: '',
		minAmount: 0,
		maxAmount: 10000,
		customer: ''
	};

	// Search
	let searchQuery = '';

	// Modal states
	let showDetailsModal = false;
	let showInvoiceModal = false;
	let selectedOrder: Order | null = null;
	let newStatus = '';

	const columns = [
		{ key: 'id', label: 'Order ID', width: '12%' },
		{ key: 'customer', label: 'Customer', width: '18%' },
		{ key: 'total', label: 'Total (DZD)', width: '12%' },
		{ key: 'items', label: 'Items', width: '8%' },
		{ key: 'status', label: 'Status', width: '14%' },
		{ key: 'date', label: 'Date', width: '12%' }
	];

	const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];

	// Apply filters and search
	$: {
		let result = [...allOrders];

		// Apply search
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(order) =>
					order.id.toLowerCase().includes(query) ||
					order.customer.toLowerCase().includes(query) ||
					order.email.toLowerCase().includes(query)
			);
		}

		// Apply advanced filters
		if (activeFilters.status.length > 0) {
			result = result.filter((order) => activeFilters.status.includes(order.status));
		}

		if (activeFilters.dateFrom) {
			result = result.filter((order) => new Date(order.date) >= new Date(activeFilters.dateFrom));
		}

		if (activeFilters.dateTo) {
			const endDate = new Date(activeFilters.dateTo);
			endDate.setHours(23, 59, 59, 999);
			result = result.filter((order) => new Date(order.date) <= endDate);
		}

		if (activeFilters.minAmount > 0) {
			result = result.filter((order) => order.total >= activeFilters.minAmount);
		}

		if (activeFilters.maxAmount < 10000) {
			result = result.filter((order) => order.total <= activeFilters.maxAmount);
		}

		if (activeFilters.customer) {
			const query = activeFilters.customer.toLowerCase();
			result = result.filter((order) => order.customer.toLowerCase().includes(query));
		}

		filteredOrders = result;
		currentPage = 1; // Reset to first page
	}

	// Calculate pagination
	const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
	$: paginatedOrders = filteredOrders.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const openDetailsModal = (order: Order) => {
		selectedOrder = { ...order };
		newStatus = order.status;
		showDetailsModal = true;
	};

	const openInvoiceModal = (order: Order) => {
		selectedOrder = { ...order };
		showInvoiceModal = true;
	};

	const updateOrderStatus = () => {
		if (selectedOrder) {
			allOrders = allOrders.map((o) =>
				o.id === selectedOrder?.id ? { ...o, status: newStatus } : o
			);
			showDetailsModal = false;
		}
	};

	const exportToCSV = () => {
		let csv = 'Order ID,Customer,Email,Phone,Total,Status,Date,Items Count\n';
		filteredOrders.forEach((order) => {
			const itemCount = Array.isArray(order.items) ? order.items.length : order.items;
			csv += `"${order.id}","${order.customer}","${order.email}","${order.phone || ''}","${order.total}","${order.status}","${order.date}","${itemCount}"\n`;
		});

		const blob = new Blob([csv], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	};

	const applyFilters = (event: CustomEvent) => {
		activeFilters = event.detail;
	};

	const resetFilters = () => {
		activeFilters = {
			status: [],
			dateFrom: '',
			dateTo: '',
			minAmount: 0,
			maxAmount: 10000,
			customer: ''
		};
		searchQuery = '';
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Pending':
				return Clock;
			case 'Processing':
				return RotateCw;
			case 'Shipped':
				return Package;
			case 'Delivered':
				return CheckCircle;
			case 'Cancelled':
				return XCircle;
			case 'Refunded':
				return DollarSign;
			default:
				return Package;
		}
	};

	const trackingSteps = [
		{ status: 'Pending', description: 'Order placed and awaiting confirmation' },
		{ status: 'Processing', description: 'Order being prepared for shipment' },
		{ status: 'Shipped', description: 'Package has been shipped' },
		{ status: 'Delivered', description: 'Package delivered successfully' }
	];
</script>

<div class="orders-container">
	<div class="page-header">
		<div>
			<h1 class="page-title">Order Management</h1>
			<p class="page-subtitle">Track and manage customer orders</p>
		</div>
		<div class="header-actions">
			<Button variant="primary" size="small" on:click={exportToCSV}>
				<Download size={18} />
				Export CSV
			</Button>
		</div>
	</div>

	<!-- Summary Stats -->
	<div class="summary-stats">
		<div class="stat-box">
			<div class="stat-icon">
				<Package size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Total Orders</p>
				<p class="stat-value">{allOrders.length}</p>
			</div>
		</div>
		<div class="stat-box">
			<div class="stat-icon">
				<Clock size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Pending</p>
				<p class="stat-value">{allOrders.filter((o) => o.status === 'Pending').length}</p>
			</div>
		</div>
		<div class="stat-box">
			<div class="stat-icon">
				<RotateCw size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Processing</p>
				<p class="stat-value">{allOrders.filter((o) => o.status === 'Processing').length}</p>
			</div>
		</div>
		<div class="stat-box">
			<div class="stat-icon">
				<CheckCircle size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Delivered</p>
				<p class="stat-value">{allOrders.filter((o) => o.status === 'Delivered').length}</p>
			</div>
		</div>
	</div>

	<!-- Search Bar -->
	<div class="search-section">
		<div class="search-wrapper">
			<Search size={20} class="search-icon" />
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search by order ID, customer name, or email..."
				class="search-input"
			/>
		</div>
	</div>

	<!-- Advanced Filters -->
	<AdvancedFilters
		bind:filters={activeFilters}
		onApply={applyFilters}
		onReset={resetFilters}
	/>

	<!-- Orders Table -->
	<Card title="All Orders" subtitle="Complete order listing and status">
		<DataTable columns={columns} data={paginatedOrders}>
			<svelte:fragment slot="cell" let:row let:col>
				{#if col.key === 'total'}
					DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(row.total)}
				{:else if col.key === 'status'}
					<div class="status-cell">
						<span class="status-badge status-{row.status.toLowerCase().replace(/\s+/g, '-')}">
							<svelte:component this={getStatusIcon(row.status)} size={16} />
							{row.status}
						</span>
						<select
							value={row.status}
							on:change={(e) => {
								const order = allOrders.find((o) => o.id === row.id);
								if (order) {
									order.status = e.currentTarget.value;
									allOrders = allOrders;
								}
							}}
							class="status-select"
							title="Quick status update"
						>
							{#each statuses as status}
								<option value={status}>{status}</option>
							{/each}
						</select>
					</div>
				{:else if col.key === 'items'}
					{Array.isArray(row.items) ? row.items.length : row.items}
				{:else}
					{row[col.key]}
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="actions" let:row>
				<div class="action-buttons">
					<Button variant="secondary" size="small" on:click={() => openDetailsModal(row)}>
						<Eye size={18} />
						Details
					</Button>
					<Button variant="tertiary" size="small" on:click={() => openInvoiceModal(row)}>
						<Printer size={18} />
						Invoice
					</Button>
				</div>
			</svelte:fragment>
		</DataTable>

		<!-- Pagination -->
		<Pagination
			currentPage={currentPage}
			totalPages={totalPages}
			itemsPerPage={itemsPerPage}
			totalItems={filteredOrders.length}
			onPageChange={(page) => (currentPage = page)}
		/>
	</Card>
</div>

<!-- Order Details Modal -->
<Modal
	isOpen={showDetailsModal}
	title="Order Details & Management"
	size="large"
	onClose={() => (showDetailsModal = false)}
>
	{#if selectedOrder}
		<div class="details-section">
			<h3 class="section-title">Order Information</h3>
			<div class="details-grid">
				<div class="detail-item">
					<span class="detail-label">Order ID</span>
					<p>{selectedOrder.id}</p>
				</div>
				<div class="detail-item">
					<span class="detail-label">Date</span>
					<p>{selectedOrder.date}</p>
				</div>
				<div class="detail-item">
					<span class="detail-label">Customer</span>
					<p>{selectedOrder.customer}</p>
				</div>
				<div class="detail-item">
					<span class="detail-label">Email</span>
					<p>{selectedOrder.email}</p>
				</div>
				{#if selectedOrder.phone}
					<div class="detail-item">
						<span class="detail-label">Phone</span>
						<p>{selectedOrder.phone}</p>
					</div>
				{/if}
				<div class="detail-item">
					<span class="detail-label">Payment Method</span>
					<p>{selectedOrder.paymentMethod || 'Not specified'}</p>
				</div>
			</div>
		</div>

		<!-- Shipping Info -->
		{#if selectedOrder.address || selectedOrder.city}
			<div class="details-section">
				<h3 class="section-title">Shipping Address</h3>
				<div class="details-grid">
					{#if selectedOrder.address}
						<div class="detail-item full-width">
							<label>Address</label>
							<p>{selectedOrder.address}</p>
						</div>
					{/if}
					{#if selectedOrder.city || selectedOrder.postalCode}
						<div class="detail-item">
							<label>City</label>
							<p>{selectedOrder.city || 'N/A'}</p>
						</div>
						<div class="detail-item">
							<label>Postal Code</label>
							<p>{selectedOrder.postalCode || 'N/A'}</p>
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Items Breakdown -->
		{#if Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0}
			<div class="details-section">
				<h3 class="section-title">Items Ordered</h3>
				<div class="items-table">
					<div class="items-header">
						<div class="item-name">Product Name</div>
						<div class="item-qty">Qty</div>
						<div class="item-price">Unit Price</div>
						<div class="item-total">Total</div>
					</div>
					{#each selectedOrder.items as item}
						<div class="items-row">
							<div class="item-name">{item.name}</div>
							<div class="item-qty">{item.quantity}</div>
							<div class="item-price">DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(item.price)}</div>
							<div class="item-total">DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(item.total)}</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Amount Summary -->
		<div class="details-section">
			<h3 class="section-title">Payment Summary</h3>
			<div class="amount-summary">
				<div class="summary-row">
					<span class="summary-label">Subtotal:</span>
					<span class="summary-value">DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(selectedOrder.subtotal || selectedOrder.total)}</span>
				</div>
				{#if selectedOrder.tax}
					<div class="summary-row">
						<span class="summary-label">Tax (19%):</span>
						<span class="summary-value">DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(selectedOrder.tax)}</span>
					</div>
				{/if}
				<div class="summary-row total-row">
					<span class="summary-label">Total Amount:</span>
					<span class="summary-value">DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(selectedOrder.total)}</span>
				</div>
			</div>
		</div>

		<!-- Order Status Update -->
		<div class="details-section">
			<h3 class="section-title">Update Order Status</h3>
			<div class="form-group">
				<label for="order-status" class="form-label">Current Status: <span class="current-status">{selectedOrder.status}</span></label>
				<select id="order-status" bind:value={newStatus} class="form-select">
					{#each statuses as status}
						<option value={status}>{status}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Order Notes -->
		{#if selectedOrder.notes}
			<div class="details-section">
				<h3 class="section-title">Notes</h3>
				<p class="notes-text">{selectedOrder.notes}</p>
			</div>
		{/if}

		<!-- Tracking Timeline -->
		<div class="details-section">
			<h3 class="section-title">Order Progress</h3>
			<div class="timeline">
				{#each trackingSteps as step (step.status)}
					<div class="timeline-item" class:completed={statuses.indexOf(newStatus) >= statuses.indexOf(step.status)}>
						<div class="timeline-icon">
							<svelte:component this={getStatusIcon(step.status)} size={24} />
						</div>
						<div class="timeline-content">
							<h4 class="timeline-status">{step.status}</h4>
							<p class="timeline-description">{step.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<svelte:fragment slot="footer">
		<Button variant="secondary" on:click={() => (showDetailsModal = false)}>Close</Button>
		<Button variant="primary" on:click={updateOrderStatus}>Update Status</Button>
	</svelte:fragment>
</Modal>

<!-- Invoice Modal -->
<Modal
	isOpen={showInvoiceModal}
	title="Order Invoice / Facture"
	size="full"
	onClose={() => (showInvoiceModal = false)}
>
	{#if selectedOrder && Array.isArray(selectedOrder.items)}
		<Invoice order={selectedOrder} />
	{/if}

	<svelte:fragment slot="footer">
		<Button variant="secondary" on:click={() => (showInvoiceModal = false)}>Close</Button>
		<Button variant="primary" on:click={() => window.print()}>
			<Printer size={18} />
			Print Invoice
		</Button>
	</svelte:fragment>
</Modal>

<style>
	.orders-container {
		padding: 3rem 2.5rem;
		max-width: 1800px;
		margin: 0 auto;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		min-height: 100vh;
	}

	.page-header {
		margin-bottom: 3.5rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid var(--primary-lighter);
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.page-title {
		font-family: 'Abril Fatface', serif;
		font-size: 3.6rem;
		font-weight: 400;
		color: #2a2a2a;
		margin-bottom: 0.5rem;
		letter-spacing: -0.01em;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.page-subtitle {
		font-size: 1.6rem;
		color: #888;
		font-family: 'Andada Pro', serif;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	.header-actions {
		display: flex;
		gap: 1rem;
	}

	.summary-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
		gap: 2rem;
		margin-bottom: 3.5rem;
	}

	.stat-box {
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border: 2px solid transparent;
		border-image: linear-gradient(135deg, #e8e0db, #f0d9d9) 1;
		border-radius: 1.2rem;
		padding: 2rem;
		display: flex;
		align-items: center;
		gap: 1.8rem;
		transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
	}

	.stat-box:hover {
		box-shadow: 0 12px 32px rgba(179, 119, 119, 0.12);
		transform: translateY(-6px);
		border-color: var(--primary-light);
		background: linear-gradient(135deg, #fff 0%, #fff9f9 100%);
	}

	.stat-icon {
		font-size: 3.2rem;
		width: 6.5rem;
		height: 6.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(209, 178, 178, 0.15), rgba(209, 178, 178, 0.05));
		border-radius: 1.2rem;
		flex-shrink: 0;
	}

	.stat-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.stat-label {
		font-size: 1.3rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 700;
		font-family: 'Andada Pro', serif;
	}

	.stat-value {
		font-size: 2.6rem;
		font-weight: 700;
		color: #2a2a2a;
	}

	.search-section {
		margin-bottom: 2rem;
	}

	.search-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: 1.2rem;
		color: #b37777;
	}

	.search-input {
		width: 100%;
		padding: 1rem 1rem 1rem 4rem;
		border: 2px solid #e0c8c8;
		border-radius: 0.8rem;
		font-size: 1.4rem;
		color: #333;
		background: white;
		font-family: inherit;
		transition: all 0.3s ease;
	}

	.search-input:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.search-input::placeholder {
		color: #999;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.7rem 1.3rem;
		border-radius: 0.7rem;
		font-size: 1.3rem;
		font-weight: 600;
		gap: 0.5rem;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
		backdrop-filter: blur(10px);
		border: 1px solid transparent;
	}

	.status-pending {
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
		border-color: rgba(201, 68, 68, 0.3);
	}

	.status-processing {
		background: rgba(243, 156, 18, 0.12);
		color: #b87c0f;
		border-color: rgba(243, 156, 18, 0.3);
	}

	.status-shipped {
		background: rgba(179, 119, 119, 0.12);
		color: #6b4444;
		border-color: rgba(179, 119, 119, 0.3);
	}

	.status-delivered {
		background: rgba(39, 174, 96, 0.12);
		color: #1d6b3c;
		border-color: rgba(39, 174, 96, 0.3);
	}

	.status-cancelled {
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
		border-color: rgba(201, 68, 68, 0.3);
	}

	.status-refunded {
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
		border-color: rgba(201, 68, 68, 0.3);
	}

	.status-cell {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		position: relative;
	}

	.status-select {
		position: absolute;
		opacity: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
		left: 0;
		top: 0;
	}

	.action-buttons {
		display: flex;
		gap: 0.8rem;
	}

	.details-section {
		margin-bottom: 2rem;
	}

	.section-title {
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 1.2rem;
		padding-bottom: 0.8rem;
		border-bottom: 2px solid #f0e8e8;
	}

	.details-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: 1.5rem;
	}

	.detail-item {
		display: flex;
		flex-direction: column;
	}

	.detail-item.full-width {
		grid-column: 1 / -1;
	}

	.detail-item label {
		font-size: 1.2rem;
		font-weight: 600;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		margin-bottom: 0.5rem;
	}

	.detail-item p {
		font-size: 1.4rem;
		color: #333;
	}

	.items-table {
		border: 2px solid #d9c8c8;
		border-radius: 0.6rem;
		overflow: hidden;
	}

	.items-header {
		display: grid;
		grid-template-columns: 2fr 0.8fr 1.2fr 1.2fr;
		gap: 1rem;
		padding: 1.2rem;
		background: linear-gradient(135deg, #b37777 0%, #9c6666 100%);
		color: white;
		font-weight: 600;
		font-size: 1.2rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.items-row {
		display: grid;
		grid-template-columns: 2fr 0.8fr 1.2fr 1.2fr;
		gap: 1rem;
		padding: 1rem 1.2rem;
		border-bottom: 1px solid #d9c8c8;
		align-items: center;
	}

	.items-row:last-child {
		border-bottom: none;
	}

	.items-row:hover {
		background: rgba(179, 119, 119, 0.04);
	}

	.item-name {
		font-size: 1.3rem;
		color: #333;
	}

	.item-qty {
		text-align: center;
		font-size: 1.3rem;
		color: #333;
	}

	.item-price,
	.item-total {
		text-align: right;
		font-size: 1.3rem;
		color: #333;
		font-weight: 500;
	}

	.amount-summary {
		background: #faf9f8;
		border: 1px solid #d9c8c8;
		border-radius: 0.6rem;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		max-width: 400px;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.6rem 0;
		border-bottom: 1px solid #d9c8c8;
		font-size: 1.3rem;
	}

	.summary-row.total-row {
		border-bottom: none;
		border-top: 2px solid #b37777;
		margin-top: 0.4rem;
		padding-top: 0.8rem;
		font-weight: 600;
	}

	.summary-label {
		color: #666;
		font-weight: 500;
	}

	.summary-value {
		color: #333;
		font-weight: 600;
	}

	.summary-row.total-row .summary-value {
		color: #b37777;
		font-size: 1.4rem;
	}

	.notes-text {
		font-size: 1.3rem;
		color: #333;
		line-height: 1.6;
		padding: 1rem;
		background: rgba(179, 119, 119, 0.05);
		border-left: 4px solid #b37777;
		border-radius: 0.4rem;
	}

	.amount {
		color: #b37777;
		font-weight: 600;
	}

	.current-status {
		color: #b37777;
		font-weight: 700;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-label {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.form-select {
		padding: 0.8rem 1rem;
		border: 2px solid #e0c8c8;
		border-radius: 0.4rem;
		font-size: 1.4rem;
		color: #333;
		background: #fff;
		font-family: inherit;
		transition: all 0.3s ease;
	}

	.form-select:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.timeline-item {
		display: flex;
		gap: 1.5rem;
		position: relative;
		padding-left: 4rem;
		opacity: 0.5;
		transition: all 0.3s ease;
	}

	.timeline-item.completed {
		opacity: 1;
	}

	.timeline-item::before {
		content: '';
		position: absolute;
		left: 2rem;
		top: 4.5rem;
		width: 0.2rem;
		height: 2rem;
		background: #d1b2b2;
	}

	.timeline-item:last-child::before {
		display: none;
	}

	.timeline-icon {
		position: absolute;
		left: 0;
		top: 0;
		font-size: 2.4rem;
		width: 4rem;
		height: 4rem;
		background: #f9f8f8;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #e0c8c8;
	}

	.timeline-item.completed .timeline-icon {
		background: rgba(179, 119, 119, 0.2);
		border-color: #b37777;
	}

	.timeline-content {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.timeline-status {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.timeline-description {
		font-size: 1.2rem;
		color: #888;
	}

	@media (max-width: 768px) {
		.orders-container {
			padding: 1.5rem;
		}

		.page-header {
			flex-direction: column;
			gap: 1rem;
		}

		.page-title {
			font-size: 2.2rem;
		}

		.summary-stats {
			grid-template-columns: repeat(2, 1fr);
		}

		.details-grid {
			grid-template-columns: 1fr;
		}

		.action-buttons {
			flex-direction: column;
		}

		.items-header,
		.items-row {
			grid-template-columns: 1.5fr 0.6fr 1fr 1fr;
		}
	}

	@media (max-width: 480px) {
		.summary-stats {
			grid-template-columns: 1fr;
		}

		.items-header,
		.items-row {
			grid-template-columns: 1.5fr 0.5fr 0.8fr 0.8fr;
			font-size: 0.9rem;
		}
	}
</style>
