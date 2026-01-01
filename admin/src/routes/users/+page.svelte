<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import { Users, CheckCircle, DollarSign, ShoppingBag, TrendingUp } from 'lucide-svelte';
	import AdvancedUserFilters from '$lib/components/Users/AdvancedUserFilters.svelte';
	import UserDetailsModal from '$lib/components/Users/UserDetailsModal.svelte';
	import EditUserModal from '$lib/components/Users/EditUserModal.svelte';
	import UserAnalytics from '$lib/components/Users/UserAnalytics.svelte';

	interface User {
		id: string;
		name: string;
		email: string;
		phone: string;
		address?: string;
		city?: string;
		country?: string;
		status: string;
		joinDate: string;
		lastLogin?: string;
		totalOrders: number;
		totalSpent: number;
		averageRating?: number;
		notes?: string;
		purchases?: any[];
		orders?: any[];
		feedback?: any[];
	}

	let users: User[] = [
		{
			id: '1',
			name: 'Sarah Anderson',
			email: 'sarah@example.com',
			phone: '+213 550 123 456',
			address: '123 Main St',
			city: 'Algiers',
			country: 'Algeria',
			status: 'Active',
			joinDate: '2023-06-15',
			lastLogin: '2024-01-20',
			totalOrders: 12,
			totalSpent: 45000,
			averageRating: 4.5,
			notes: 'VIP customer, high spending',
			purchases: [
				{
					id: 'p1',
					productName: 'Gracias Shampoo 500ml',
					sku: 'GRC-SHP-001',
					category: 'Cheveux',
					quantity: 2,
					unit: 'pcs',
					unitPrice: 2500,
					totalAmount: 5000,
					purchaseDate: '2024-01-18',
					status: 'Delivered'
				},
				{
					id: 'p2',
					productName: 'Face Moisturizer Pro',
					sku: 'FCS-MTZ-001',
					category: 'Visage',
					quantity: 1,
					unit: 'pcs',
					unitPrice: 3200,
					totalAmount: 3200,
					purchaseDate: '2024-01-10',
					status: 'Delivered'
				}
			],
			orders: [
				{
					id: 'o1',
					orderNumber: '001234',
					orderDate: '2024-01-18',
					status: 'Delivered',
					items: [{ productName: 'Shampoo Bundle', quantity: 2, price: 5000 }],
					totalAmount: 5000,
					shippingAddress: '123 Main St, Algiers',
					trackingNumber: 'TRACK123456',
					deliveryDate: '2024-01-20'
				}
			],
			feedback: [
				{
					id: 'f1',
					productName: 'Gracias Shampoo 500ml',
					sku: 'GRC-SHP-001',
					rating: 5,
					title: 'Excellent product!',
					comment: 'Very satisfied with this shampoo. Great quality and delivery was fast.',
					reviewDate: '2024-01-20',
					verifiedPurchase: true
				}
			]
		},
		{
			id: '2',
			name: 'Marie Dupont',
			email: 'marie@example.com',
			phone: '+213 550 234 567',
			address: '456 Elm St',
			city: 'Oran',
			country: 'Algeria',
			status: 'Active',
			joinDate: '2023-08-22',
			lastLogin: '2024-01-15',
			totalOrders: 8,
			totalSpent: 32000,
			averageRating: 4.0,
			purchases: [],
			orders: [],
			feedback: []
		},
		{
			id: '3',
			name: 'Lisa Cohen',
			email: 'lisa@example.com',
			phone: '+213 550 345 678',
			address: '789 Oak Ave',
			city: 'Constantine',
			country: 'Algeria',
			status: 'Inactive',
			joinDate: '2023-04-10',
			totalOrders: 5,
			totalSpent: 18500,
			purchases: [],
			orders: [],
			feedback: []
		},
		{
			id: '4',
			name: 'Emma Wilson',
			email: 'emma@example.com',
			phone: '+213 550 456 789',
			status: 'Active',
			joinDate: '2024-01-05',
			lastLogin: '2024-01-19',
			totalOrders: 3,
			totalSpent: 12000,
			averageRating: 4.8,
			purchases: [],
			orders: [],
			feedback: []
		},
		{
			id: '5',
			name: 'Claire Martin',
			email: 'claire@example.com',
			phone: '+213 550 567 890',
			status: 'Active',
			joinDate: '2023-10-18',
			lastLogin: '2024-01-21',
			totalOrders: 15,
			totalSpent: 58500,
			averageRating: 4.7,
			purchases: [],
			orders: [],
			feedback: []
		}
	];

	let showDetailsModal = false;
	let showEditModal = false;
	let selectedUser: User | null = null;

	let filters = {
		search: '',
		status: 'all',
		minSpending: 0,
		maxSpending: 100000,
		minOrders: 0,
		maxOrders: 100,
		joinDateFrom: '',
		joinDateTo: '',
		sortBy: 'recent-join'
	};

	const columns = [
		{ key: 'name', label: 'Name', width: '20%' },
		{ key: 'email', label: 'Email', width: '22%' },
		{ key: 'totalOrders', label: 'Orders', width: '10%' },
		{ key: 'totalSpent', label: 'Total Spent', width: '15%' },
		{ key: 'status', label: 'Status', width: '10%' }
	];

	$: filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
			user.email.toLowerCase().includes(filters.search.toLowerCase());

		const matchesStatus =
			filters.status === 'all' || user.status.toLowerCase() === filters.status;

		const matchesSpending =
			user.totalSpent >= filters.minSpending && user.totalSpent <= filters.maxSpending;

		const matchesOrders =
			user.totalOrders >= filters.minOrders && user.totalOrders <= filters.maxOrders;

		const joinDate = new Date(user.joinDate);
		const fromDate = filters.joinDateFrom ? new Date(filters.joinDateFrom) : null;
		const toDate = filters.joinDateTo ? new Date(filters.joinDateTo) : null;

		const matchesDate =
			(!fromDate || joinDate >= fromDate) && (!toDate || joinDate <= toDate);

		return matchesSearch && matchesStatus && matchesSpending && matchesOrders && matchesDate;
	});

	$: sortedUsers = [...filteredUsers].sort((a, b) => {
		switch (filters.sortBy) {
			case 'recent-join':
				return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
			case 'oldest-join':
				return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
			case 'highest-spender':
				return b.totalSpent - a.totalSpent;
			case 'lowest-spender':
				return a.totalSpent - b.totalSpent;
			case 'most-orders':
				return b.totalOrders - a.totalOrders;
			case 'least-orders':
				return a.totalOrders - b.totalOrders;
			case 'name-asc':
				return a.name.localeCompare(b.name);
			case 'name-desc':
				return b.name.localeCompare(a.name);
			default:
				return 0;
		}
	});

	const openDetailsModal = (user: User) => {
		selectedUser = user;
		showDetailsModal = true;
	};

	const openEditModal = (user: User) => {
		selectedUser = user;
		showEditModal = true;
	};

	const handleUserUpdate = (updatedUser: User) => {
		users = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
		showEditModal = false;
		selectedUser = null;
	};

	const handleToggleStatus = (user: User) => {
		users = users.map((u) =>
			u.id === user.id
				? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
				: u
		);
		if (selectedUser) {
			selectedUser = {
				...selectedUser,
				status: selectedUser.status === 'Active' ? 'Inactive' : 'Active'
			};
		}
	};

	const handleDeleteUser = (userId: string) => {
		users = users.filter((u) => u.id !== userId);
		showDetailsModal = false;
		selectedUser = null;
	};

	const handleFilterChange = (newFilters: any) => {
		filters = newFilters;
	};

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'DZD',
			minimumFractionDigits: 0
		}).format(value);
	};

	const getStatusColor = (status: string) => {
		return status === 'Active' ? 'success' : 'danger';
	};

	const getActiveUserCount = () => users.filter((u) => u.status === 'Active').length;
	const getTotalRevenue = () => users.reduce((sum, u) => sum + u.totalSpent, 0);
	const getAverageOrderValue = () => (getTotalRevenue() / users.length).toFixed(0);
	const getTotalOrders = () => users.reduce((sum, u) => sum + u.totalOrders, 0);
</script>

<div class="users-container">
	<div class="page-header">
		<div>
			<h1 class="page-title">User Management</h1>
			<p class="page-subtitle">Manage customer profiles, orders, and analytics</p>
		</div>
	</div>

	<!-- User Stats -->
	<div class="user-stats">
		<div class="stat-card">
			<div class="stat-icon">
				<Users size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Total Users</p>
				<p class="stat-value">{users.length}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">
				<CheckCircle size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Active Users</p>
				<p class="stat-value">{getActiveUserCount()}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">
				<DollarSign size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Total Revenue</p>
				<p class="stat-value">{formatCurrency(getTotalRevenue())}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">
				<ShoppingBag size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Avg. Order Value</p>
				<p class="stat-value">{formatCurrency(parseFloat(getAverageOrderValue()))}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">
				<TrendingUp size={32} />
			</div>
			<div class="stat-info">
				<p class="stat-label">Total Orders</p>
				<p class="stat-value">{getTotalOrders()}</p>
			</div>
		</div>
	</div>

	<!-- Analytics Dashboard -->
	<UserAnalytics {users: sortedUsers} />

	<!-- Advanced Filters -->
	<AdvancedUserFilters
		{filters}
		onFilterChange={handleFilterChange}
	/>

	<!-- Users Table -->
	<Card title="All Users" subtitle="Complete user management ({sortedUsers.length} user{sortedUsers.length !== 1 ? 's' : ''})">
		<DataTable columns={columns} data={sortedUsers}>
			<svelte:fragment slot="cell" let:row let:col>
				{#if col.key === 'totalSpent'}
					{formatCurrency(row.totalSpent)}
				{:else if col.key === 'status'}
					<span class="status-badge status-{row.status.toLowerCase()}">
						{row.status}
					</span>
				{:else}
					{row[col.key]}
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="actions" let:row>
				<div class="action-buttons">
					<Button variant="primary" size="small" on:click={() => openDetailsModal(row)}>
						View Details
					</Button>
					<Button variant="secondary" size="small" on:click={() => openEditModal(row)}>
						Edit
					</Button>
				</div>
			</svelte:fragment>
		</DataTable>
	</Card>
</div>

<!-- User Details Modal -->
<UserDetailsModal
	isOpen={showDetailsModal}
	user={selectedUser}
	onClose={() => {
		showDetailsModal = false;
		selectedUser = null;
	}}
	onEdit={openEditModal}
	onToggleStatus={handleToggleStatus}
	onDelete={handleDeleteUser}
/>

<!-- Edit User Modal -->
<EditUserModal
	isOpen={showEditModal}
	user={selectedUser}
	onClose={() => {
		showEditModal = false;
		selectedUser = null;
	}}
	onSave={handleUserUpdate}
/>

<style>
	.users-container {
		padding: 3rem 2.5rem;
		max-width: 1800px;
		margin: 0 auto;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		min-height: 100vh;
	}

	.page-header {
		margin-bottom: 3.5rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid #f0d9d9;
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

	.user-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
		gap: 1.5rem;
		margin-bottom: 3.5rem;
	}

	.stat-card {
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border-left: 5px solid #d1b2b2;
		border-radius: 1.2rem;
		padding: 2rem;
		display: flex;
		align-items: center;
		gap: 1.8rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
		transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.stat-card:hover {
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
		transform: translateY(-6px);
	}

	.stat-icon {
		color: #b37777;
		font-size: 3.2rem;
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

	.status-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.6rem 1.2rem;
		border-radius: 2rem;
		font-size: 1.2rem;
		font-weight: 600;
	}

	.status-active {
		background: rgba(39, 174, 96, 0.2);
		color: #27ae60;
	}

	.status-inactive {
		background: rgba(231, 76, 60, 0.2);
		color: #e74c3c;
	}

	.status-suspended {
		background: rgba(243, 156, 18, 0.2);
		color: #f39c12;
	}

	.action-buttons {
		display: flex;
		gap: 0.5rem;
	}

	@media (max-width: 768px) {
		.users-container {
			padding: 1.5rem;
		}

		.page-title {
			font-size: 2.2rem;
		}

		.user-stats {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}

		.action-buttons {
			flex-direction: column;
		}
	}

	@media (max-width: 480px) {
		.user-stats {
			grid-template-columns: 1fr;
		}
	}
</style>
