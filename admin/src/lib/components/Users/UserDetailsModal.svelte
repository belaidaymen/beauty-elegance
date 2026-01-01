<script lang="ts">
	import { X, Mail, Phone, MapPin, Calendar, TrendingUp, MessageSquare, Package, ShoppingBag } from 'lucide-svelte';
	import Button from '../Button.svelte';
	import UserPurchaseHistory from './UserPurchaseHistory.svelte';
	import UserOrdersTimeline from './UserOrdersTimeline.svelte';
	import UserFeedback from './UserFeedback.svelte';

	export let isOpen = false;
	export let user: any = null;
	export let onClose: (() => void) | undefined = undefined;
	export let onEdit: ((user: any) => void) | undefined = undefined;
	export let onToggleStatus: ((user: any) => void) | undefined = undefined;
	export let onDelete: ((userId: string) => void) | undefined = undefined;

	let activeTab = 'overview';

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: '👤' },
		{ id: 'purchases', label: 'Purchases', icon: '🛍️' },
		{ id: 'orders', label: 'Orders', icon: '📦' },
		{ id: 'feedback', label: 'Feedback', icon: '⭐' }
	];

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'DZD',
			minimumFractionDigits: 0
		}).format(value);
	};

	const getAccountAge = (joinDate: string) => {
		const now = new Date();
		const joined = new Date(joinDate);
		const diff = Math.floor((now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24));
		return `${diff} days`;
	};
</script>

{#if isOpen && user}
	<div class="modal-overlay" on:click={onClose}>
		<div class="modal-content" on:click={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<h2 class="modal-title">User Details</h2>
				<button class="close-button" on:click={onClose} aria-label="Close modal">
					<X size={24} />
				</button>
			</div>

			<!-- User Profile Card -->
			<div class="profile-card">
				<div class="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>
				<div class="profile-info">
					<h3 class="profile-name">{user.name}</h3>
					<p class="profile-status" class:active={user.status === 'Active'} class:inactive={user.status === 'Inactive'}>
						{user.status}
					</p>
				</div>
				<div class="profile-actions">
					<Button variant="secondary" size="small" on:click={() => onEdit?.(user)}>Edit</Button>
					<Button
						variant={user.status === 'Active' ? 'danger' : 'success'}
						size="small"
						on:click={() => onToggleStatus?.(user)}
					>
						{user.status === 'Active' ? 'Deactivate' : 'Activate'}
					</Button>
					<Button variant="danger" size="small" on:click={() => {
						if (confirm('Are you sure you want to delete this user?')) {
							onDelete?.(user.id);
						}
					}}>Delete</Button>
				</div>
			</div>

			<!-- Quick Stats -->
			<div class="quick-stats">
				<div class="stat-card">
					<div class="stat-icon">💰</div>
					<div class="stat-info">
						<p class="stat-label">Total Spent</p>
						<p class="stat-value">{formatCurrency(user.totalSpent)}</p>
					</div>
				</div>
				<div class="stat-card">
					<div class="stat-icon">🛒</div>
					<div class="stat-info">
						<p class="stat-label">Total Orders</p>
						<p class="stat-value">{user.totalOrders}</p>
					</div>
				</div>
				<div class="stat-card">
					<div class="stat-icon">⭐</div>
					<div class="stat-info">
						<p class="stat-label">Avg. Rating Given</p>
						<p class="stat-value">{user.averageRating || 'N/A'}</p>
					</div>
				</div>
				<div class="stat-card">
					<div class="stat-icon">📅</div>
					<div class="stat-info">
						<p class="stat-label">Member For</p>
						<p class="stat-value">{getAccountAge(user.joinDate)}</p>
					</div>
				</div>
			</div>

			<!-- Tabs Navigation -->
			<div class="tabs-navigation">
				{#each tabs as tab}
					<button
						class="tab-button"
						class:active={activeTab === tab.id}
						on:click={() => (activeTab = tab.id)}
					>
						<span class="tab-icon">{tab.icon}</span>
						<span class="tab-label">{tab.label}</span>
					</button>
				{/each}
			</div>

			<!-- Tab Content -->
			<div class="tab-content">
				{#if activeTab === 'overview'}
					<div class="overview-tab">
						<div class="section">
							<h4 class="section-title">Contact Information</h4>
							<div class="contact-info">
								<div class="info-item">
									<Mail size={20} />
									<div>
										<p class="label">Email</p>
										<p class="value">{user.email}</p>
									</div>
								</div>
								<div class="info-item">
									<Phone size={20} />
									<div>
										<p class="label">Phone</p>
										<p class="value">{user.phone}</p>
									</div>
								</div>
								{#if user.address}
									<div class="info-item">
										<MapPin size={20} />
										<div>
											<p class="label">Address</p>
											<p class="value">{user.address}</p>
										</div>
									</div>
								{/if}
								{#if user.city || user.country}
									<div class="info-item">
										<MapPin size={20} />
										<div>
											<p class="label">Location</p>
											<p class="value">{user.city}{user.city && user.country ? ', ' : ''}{user.country}</p>
										</div>
									</div>
								{/if}
							</div>
						</div>

						<div class="section">
							<h4 class="section-title">Account Activity</h4>
							<div class="activity-info">
								<div class="activity-item">
									<Calendar size={18} />
									<div>
										<p class="label">Join Date</p>
										<p class="value">{formatDate(user.joinDate)}</p>
									</div>
								</div>
								{#if user.lastLogin}
									<div class="activity-item">
										<Calendar size={18} />
										<div>
											<p class="label">Last Login</p>
											<p class="value">{formatDate(user.lastLogin)}</p>
										</div>
									</div>
								{/if}
								<div class="activity-item">
									<TrendingUp size={18} />
									<div>
										<p class="label">Account Status</p>
										<p class="value status" class:active={user.status === 'Active'}>
											{user.status}
										</p>
									</div>
								</div>
							</div>
						</div>

						{#if user.notes}
							<div class="section">
								<h4 class="section-title">Admin Notes</h4>
								<div class="notes-box">
									<p>{user.notes}</p>
								</div>
							</div>
						{/if}
					</div>
				{:else if activeTab === 'purchases'}
					<UserPurchaseHistory purchases={user.purchases || []} />
				{:else if activeTab === 'orders'}
					<UserOrdersTimeline orders={user.orders || []} />
				{:else if activeTab === 'feedback'}
					<UserFeedback feedback={user.feedback || []} />
				{/if}
			</div>

			<div class="modal-footer">
				<Button variant="secondary" on:click={onClose}>Close</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		animation: fadeIn 0.2s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.modal-content {
		background: #fff;
		border-radius: 1.2rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		max-width: 95vw;
		width: 90%;
		max-height: 95vh;
		overflow-y: auto;
		animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes slideUp {
		from {
			transform: translateY(2rem);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 2.5rem;
		border-bottom: 2px solid #f0d9d9;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
	}

	.modal-title {
		font-size: 1.9rem;
		font-weight: 600;
		color: #2a2a2a;
		margin: 0;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.01em;
	}

	.close-button {
		background: none;
		border: none;
		cursor: pointer;
		color: #999;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}

	.close-button:hover {
		color: #b37777;
	}

	.profile-card {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 2rem 2.5rem;
		background: linear-gradient(135deg, #f0d9d9 0%, #f5e6e6 100%);
		border-bottom: 1px solid #f0d9d9;
	}

	.profile-avatar {
		width: 6rem;
		height: 6rem;
		background: linear-gradient(135deg, #d1b2b2, #b37777);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 2.4rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.profile-info {
		flex: 1;
	}

	.profile-name {
		font-size: 1.8rem;
		font-weight: 700;
		color: #2a2a2a;
		margin: 0 0 0.5rem 0;
	}

	.profile-status {
		font-size: 1.3rem;
		color: #e74c3c;
		font-weight: 600;
		margin: 0;
	}

	.profile-status.active {
		color: #27ae60;
	}

	.profile-status.inactive {
		color: #e74c3c;
	}

	.profile-actions {
		display: flex;
		gap: 0.8rem;
		flex-shrink: 0;
	}

	.quick-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: 1.5rem;
		padding: 2rem 2.5rem;
		border-bottom: 1px solid #e8e0db;
	}

	.stat-card {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		padding: 1.2rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.stat-icon {
		font-size: 2.4rem;
		flex-shrink: 0;
	}

	.stat-info {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.stat-label {
		font-size: 1rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.stat-value {
		font-size: 1.6rem;
		font-weight: 700;
		color: #333;
		margin: 0;
	}

	.tabs-navigation {
		display: flex;
		gap: 0;
		border-bottom: 2px solid #e8e0db;
		padding: 0 2.5rem;
		background: #faf9f8;
	}

	.tab-button {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 1.2rem 1.5rem;
		background: none;
		border: none;
		border-bottom: 3px solid transparent;
		cursor: pointer;
		font-size: 1.4rem;
		font-weight: 600;
		color: #999;
		transition: all 0.3s ease;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.tab-button:hover {
		color: #b37777;
	}

	.tab-button.active {
		color: #b37777;
		border-bottom-color: #b37777;
	}

	.tab-icon {
		font-size: 1.8rem;
	}

	.tab-label {
		text-transform: uppercase;
		font-size: 1.2rem;
		letter-spacing: 0.08em;
	}

	.tab-content {
		padding: 2rem 2.5rem;
		min-height: 20rem;
	}

	.overview-tab {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.section-title {
		font-size: 1.6rem;
		font-weight: 700;
		color: #333;
		margin: 0;
		padding-bottom: 1rem;
		border-bottom: 2px solid #f0d9d9;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.01em;
	}

	.contact-info,
	.activity-info {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
		gap: 1.5rem;
	}

	.info-item,
	.activity-item {
		display: flex;
		gap: 1.2rem;
		padding: 1.2rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.info-item svg,
	.activity-item svg {
		color: #b37777;
		flex-shrink: 0;
		margin-top: 0.2rem;
	}

	.info-item div,
	.activity-item div {
		flex: 1;
	}

	.label {
		font-size: 1rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.value {
		font-size: 1.4rem;
		color: #333;
		font-weight: 600;
		margin: 0.3rem 0 0 0;
	}

	.value.status.active {
		color: #27ae60;
	}

	.notes-box {
		padding: 1.2rem;
		background: linear-gradient(135deg, rgba(179, 119, 119, 0.08) 0%, rgba(179, 119, 119, 0.04) 100%);
		border-left: 4px solid #b37777;
		border-radius: 0.6rem;
	}

	.notes-box p {
		font-size: 1.4rem;
		color: #333;
		line-height: 1.6;
		margin: 0;
	}

	.modal-footer {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		padding: 2rem 2.5rem;
		border-top: 2px solid #f0d9d9;
		background: #faf9f8;
	}

	@media (max-width: 1200px) {
		.modal-content {
			max-width: 98vw;
		}

		.profile-actions {
			flex-direction: column;
		}
	}

	@media (max-width: 768px) {
		.profile-card {
			flex-direction: column;
			text-align: center;
		}

		.profile-actions {
			width: 100%;
			justify-content: center;
		}

		.tabs-navigation {
			padding: 0;
			overflow-x: auto;
		}

		.contact-info,
		.activity-info {
			grid-template-columns: 1fr;
		}

		.quick-stats {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.quick-stats {
			grid-template-columns: 1fr;
		}

		.tab-icon {
			display: none;
		}
	}
</style>
