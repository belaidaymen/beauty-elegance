<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import FormInput from '$lib/components/FormInput.svelte';

	interface User {
		id: string;
		name: string;
		email: string;
		phone: string;
		status: string;
		joinDate: string;
		totalOrders: number;
		totalSpent: number;
	}

	let users: User[] = [
		{
			id: '1',
			name: 'Sarah Anderson',
			email: 'sarah@example.com',
			phone: '+213 550 123 456',
			status: 'Active',
			joinDate: '2023-06-15',
			totalOrders: 12,
			totalSpent: 45000
		},
		{
			id: '2',
			name: 'Marie Dupont',
			email: 'marie@example.com',
			phone: '+213 550 234 567',
			status: 'Active',
			joinDate: '2023-08-22',
			totalOrders: 8,
			totalSpent: 32000
		},
		{
			id: '3',
			name: 'Lisa Cohen',
			email: 'lisa@example.com',
			phone: '+213 550 345 678',
			status: 'Inactive',
			joinDate: '2023-04-10',
			totalOrders: 5,
			totalSpent: 18500
		},
		{
			id: '4',
			name: 'Emma Wilson',
			email: 'emma@example.com',
			phone: '+213 550 456 789',
			status: 'Active',
			joinDate: '2024-01-05',
			totalOrders: 3,
			totalSpent: 12000
		},
		{
			id: '5',
			name: 'Claire Martin',
			email: 'claire@example.com',
			phone: '+213 550 567 890',
			status: 'Active',
			joinDate: '2023-10-18',
			totalOrders: 15,
			totalSpent: 58500
		}
	];

	let showDetailsModal = false;
	let selectedUser: User | null = null;

	const columns = [
		{ key: 'name', label: 'Name', width: '20%' },
		{ key: 'email', label: 'Email', width: '25%' },
		{ key: 'phone', label: 'Phone', width: '18%' },
		{ key: 'totalOrders', label: 'Orders', width: '10%' },
		{ key: 'totalSpent', label: 'Total Spent', width: '12%' },
		{ key: 'status', label: 'Status', width: '10%' }
	];

	const openDetailsModal = (user: User) => {
		selectedUser = user;
		showDetailsModal = true;
	};

	const toggleUserStatus = () => {
		if (selectedUser) {
			users = users.map((u) =>
				u.id === selectedUser?.id
					? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
					: u
			);
			selectedUser = selectedUser
				? { ...selectedUser, status: selectedUser.status === 'Active' ? 'Inactive' : 'Active' }
				: null;
		}
	};

	const getStatusColor = (status: string) => {
		return status === 'Active' ? 'success' : 'danger';
	};

	const getActiveUserCount = () => users.filter((u) => u.status === 'Active').length;
	const getTotalRevenue = () => users.reduce((sum, u) => sum + u.totalSpent, 0);
	const getAverageOrders = () => Math.round(users.reduce((sum, u) => sum + u.totalOrders, 0) / users.length);
</script>

<div class="users-container">
	<div class="page-header">
		<div>
			<h1 class="page-title">User Management</h1>
			<p class="page-subtitle">Manage customer profiles and accounts</p>
		</div>
	</div>

	<!-- User Stats -->
	<div class="user-stats">
		<div class="stat-card">
			<div class="stat-icon">👥</div>
			<div class="stat-info">
				<p class="stat-label">Total Users</p>
				<p class="stat-value">{users.length}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">✅</div>
			<div class="stat-info">
				<p class="stat-label">Active Users</p>
				<p class="stat-value">{getActiveUserCount()}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">💰</div>
			<div class="stat-info">
				<p class="stat-label">Total Revenue</p>
				<p class="stat-value">
					DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(getTotalRevenue())}
				</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">📦</div>
			<div class="stat-info">
				<p class="stat-label">Avg. Orders/User</p>
				<p class="stat-value">{getAverageOrders()}</p>
			</div>
		</div>
	</div>

	<!-- Users Table -->
	<Card title="All Users" subtitle="Complete user listing">
		<DataTable columns={columns} data={users}>
			<svelte:fragment slot="cell" let:row let:col>
				{#if col.key === 'totalSpent'}
					DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(row.totalSpent)}
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
					<Button variant="secondary" size="small" on:click={() => openDetailsModal(row)}>
						👁️ View
					</Button>
				</div>
			</svelte:fragment>
		</DataTable>
	</Card>
</div>

<!-- User Details Modal -->
<Modal
	isOpen={showDetailsModal}
	title="User Details"
	size="large"
	onClose={() => (showDetailsModal = false)}
>
	{#if selectedUser}
		<div class="user-profile">
			<div class="profile-header">
				<div class="profile-avatar">{selectedUser.name.charAt(0)}</div>
				<div class="profile-info">
					<h2 class="profile-name">{selectedUser.name}</h2>
					<p class="profile-status" class:active={selectedUser.status === 'Active'}>
						{selectedUser.status}
					</p>
				</div>
			</div>

			<div class="profile-stats">
				<div class="profile-stat">
					<label>Total Orders</label>
					<p>{selectedUser.totalOrders}</p>
				</div>
				<div class="profile-stat">
					<label>Total Spent</label>
					<p>DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(selectedUser.totalSpent)}</p>
				</div>
				<div class="profile-stat">
					<label>Join Date</label>
					<p>{selectedUser.joinDate}</p>
				</div>
				<div class="profile-stat">
					<label>Member Since</label>
					<p>
						{new Date(selectedUser.joinDate).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long'
						})}
					</p>
				</div>
			</div>

			<div class="profile-section">
				<h3 class="section-title">Contact Information</h3>
				<div class="contact-info">
					<div class="info-item">
						<label>Email</label>
						<p>{selectedUser.email}</p>
					</div>
					<div class="info-item">
						<label>Phone</label>
						<p>{selectedUser.phone}</p>
					</div>
				</div>
			</div>

			<div class="profile-section">
				<h3 class="section-title">Account Activity</h3>
				<div class="activity-timeline">
					<div class="activity-item">
						<span class="activity-date">Recent purchase</span>
						<p class="activity-desc">Last order placed on {selectedUser.joinDate}</p>
					</div>
					<div class="activity-item">
						<span class="activity-date">Registered</span>
						<p class="activity-desc">Account created on {selectedUser.joinDate}</p>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<svelte:fragment slot="footer">
		{#if selectedUser}
			<Button variant="secondary" on:click={() => (showDetailsModal = false)}>Close</Button>
			<Button
				variant={selectedUser.status === 'Active' ? 'danger' : 'success'}
				on:click={toggleUserStatus}
			>
				{selectedUser.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
			</Button>
		{/if}
	</svelte:fragment>
</Modal>

<style>
	.users-container {
		padding: 2rem;
		max-width: 1600px;
		margin: 0 auto;
	}

	.page-header {
		margin-bottom: 2rem;
	}

	.page-title {
		font-family: 'Andada Pro';
		font-size: 3rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.5rem;
	}

	.page-subtitle {
		font-size: 1.5rem;
		color: #888;
	}

	.user-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background: #fff;
		border: 1px solid #f0e8e8;
		border-radius: 0.8rem;
		padding: 1.5rem;
		display: flex;
		align-items: center;
		gap: 1.5rem;
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	.stat-icon {
		font-size: 3rem;
		width: 6rem;
		height: 6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f9f8f8;
		border-radius: 0.8rem;
	}

	.stat-info {
		display: flex;
		flex-direction: column;
	}

	.stat-label {
		font-size: 1.2rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		font-weight: 600;
		margin-bottom: 0.3rem;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 700;
		color: #333;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 1rem;
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

	.action-buttons {
		display: flex;
		gap: 0.5rem;
	}

	.user-profile {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.profile-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 2rem;
		background: linear-gradient(135deg, #f0d9d9 0%, #f5e6e6 100%);
		border-radius: 0.8rem;
	}

	.profile-avatar {
		width: 8rem;
		height: 8rem;
		background: linear-gradient(135deg, #d1b2b2, #b37777);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 3rem;
		font-weight: 700;
	}

	.profile-info {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.profile-name {
		font-size: 2rem;
		font-weight: 700;
		color: #333;
		margin: 0;
	}

	.profile-status {
		font-size: 1.3rem;
		color: #e74c3c;
		font-weight: 600;
	}

	.profile-status.active {
		color: #27ae60;
	}

	.profile-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1.5rem;
	}

	.profile-stat {
		background: #f9f8f8;
		padding: 1.5rem;
		border-radius: 0.6rem;
		border: 1px solid #f0e8e8;
	}

	.profile-stat label {
		font-size: 1.1rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		font-weight: 600;
		display: block;
		margin-bottom: 0.5rem;
	}

	.profile-stat p {
		font-size: 1.6rem;
		color: #333;
		font-weight: 600;
		margin: 0;
	}

	.profile-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.section-title {
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
		padding-bottom: 0.8rem;
		border-bottom: 2px solid #f0e8e8;
		margin: 0;
	}

	.contact-info {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: 1.5rem;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.info-item label {
		font-size: 1.2rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		font-weight: 600;
	}

	.info-item p {
		font-size: 1.4rem;
		color: #333;
		font-weight: 600;
		margin: 0;
	}

	.activity-timeline {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.activity-item {
		display: flex;
		gap: 1.5rem;
		padding: 1.2rem;
		background: #f9f8f8;
		border-radius: 0.6rem;
		border-left: 3px solid #d1b2b2;
	}

	.activity-date {
		color: #b37777;
		font-weight: 600;
		white-space: nowrap;
	}

	.activity-desc {
		color: #555;
		margin: 0;
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
		}

		.profile-header {
			flex-direction: column;
			text-align: center;
		}

		.contact-info {
			grid-template-columns: 1fr;
		}

		.action-buttons {
			flex-direction: column;
		}
	}

	@media (max-width: 480px) {
		.user-stats {
			grid-template-columns: 1fr;
		}

		.profile-stats {
			grid-template-columns: 1fr;
		}
	}
</style>
