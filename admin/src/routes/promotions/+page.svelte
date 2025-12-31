<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormTextarea from '$lib/components/FormTextarea.svelte';
	import { Zap, Pencil, Trash2 } from 'lucide-svelte';

	interface Promotion {
		id: string;
		name: string;
		type: string;
		discount: number;
		category: string;
		startDate: string;
		endDate: string;
		status: string;
		applicableProducts: number;
	}

	let promotions: Promotion[] = [
		{
			id: '1',
			name: 'New Year Beauty Sale',
			type: 'Percentage',
			discount: 20,
			category: 'All',
			startDate: '2024-01-01',
			endDate: '2024-01-31',
			status: 'Active',
			applicableProducts: 45
		},
		{
			id: '2',
			name: 'Hair Care Special',
			type: 'Percentage',
			discount: 15,
			category: 'Cheveux',
			startDate: '2024-01-10',
			endDate: '2024-02-10',
			status: 'Active',
			applicableProducts: 12
		},
		{
			id: '3',
			name: 'Makeup Bundle Deal',
			type: 'Fixed',
			discount: 500,
			category: 'Maquillage',
			startDate: '2024-01-15',
			endDate: '2024-01-28',
			status: 'Scheduled',
			applicableProducts: 8
		},
		{
			id: '4',
			name: 'Winter Skincare',
			type: 'Percentage',
			discount: 10,
			category: 'Visage',
			startDate: '2023-12-01',
			endDate: '2024-01-05',
			status: 'Expired',
			applicableProducts: 18
		},
		{
			id: '5',
			name: 'Body Care Weekend',
			type: 'Percentage',
			discount: 25,
			category: 'Corps & Bain',
			startDate: '2024-01-20',
			endDate: '2024-01-22',
			status: 'Active',
			applicableProducts: 9
		}
	];

	let showAddModal = false;
	let showEditModal = false;
	let editingPromotion: Promotion | null = null;

	let formData = {
		name: '',
		type: 'Percentage',
		discount: 0,
		category: 'All',
		startDate: '',
		endDate: '',
		status: 'Scheduled'
	};

	const columns = [
		{ key: 'name', label: 'Promotion Name', width: '22%' },
		{ key: 'type', label: 'Type', width: '12%' },
		{ key: 'discount', label: 'Discount', width: '12%' },
		{ key: 'category', label: 'Category', width: '12%' },
		{ key: 'startDate', label: 'Start Date', width: '12%' },
		{ key: 'endDate', label: 'End Date', width: '12%' },
		{ key: 'status', label: 'Status', width: '10%' }
	];

	const categories = [
		'All',
		'Maquillage',
		'Cheveux',
		'Visage',
		'Corps & Bain',
		'Deo & Stick'
	];

	const types = ['Percentage', 'Fixed Amount'];

	const openAddModal = () => {
		resetForm();
		showAddModal = true;
	};

	const openEditModal = (promo: Promotion) => {
		editingPromotion = promo;
		formData = {
			name: promo.name,
			type: promo.type,
			discount: promo.discount,
			category: promo.category,
			startDate: promo.startDate,
			endDate: promo.endDate,
			status: promo.status
		};
		showEditModal = true;
	};

	const resetForm = () => {
		formData = {
			name: '',
			type: 'Percentage',
			discount: 0,
			category: 'All',
			startDate: '',
			endDate: '',
			status: 'Scheduled'
		};
		editingPromotion = null;
	};

	const handleAddPromotion = () => {
		const newPromotion: Promotion = {
			id: Date.now().toString(),
			...formData,
			applicableProducts: 0
		};
		promotions = [...promotions, newPromotion];
		showAddModal = false;
		resetForm();
	};

	const handleEditPromotion = () => {
		if (editingPromotion) {
			promotions = promotions.map((p) =>
				p.id === editingPromotion?.id ? { ...p, ...formData } : p
			);
			showEditModal = false;
			resetForm();
		}
	};

	const handleDeletePromotion = (id: string) => {
		if (confirm('Are you sure you want to delete this promotion?')) {
			promotions = promotions.filter((p) => p.id !== id);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Active':
				return 'success';
			case 'Scheduled':
				return 'warning';
			case 'Expired':
				return 'danger';
			default:
				return 'neutral';
		}
	};

	const getActivePromoCount = () => promotions.filter((p) => p.status === 'Active').length;
	const getScheduledCount = () => promotions.filter((p) => p.status === 'Scheduled').length;
	const getExpiredCount = () => promotions.filter((p) => p.status === 'Expired').length;
</script>

<div class="promotions-container">
	<div class="page-header">
		<div>
			<h1 class="page-title">Promotion Management</h1>
			<p class="page-subtitle">Create and manage discount campaigns</p>
		</div>
		<Button variant="primary" size="large" on:click={openAddModal}>
			<Zap size={20} />
			Create New Promotion
		</Button>
	</div>

	<!-- Promotion Stats -->
	<div class="promo-stats">
		<div class="stat-card active">
			<h4 class="stat-title">Active Promotions</h4>
			<p class="stat-count">{getActivePromoCount()}</p>
		</div>
		<div class="stat-card scheduled">
			<h4 class="stat-title">Scheduled</h4>
			<p class="stat-count">{getScheduledCount()}</p>
		</div>
		<div class="stat-card expired">
			<h4 class="stat-title">Expired</h4>
			<p class="stat-count">{getExpiredCount()}</p>
		</div>
		<div class="stat-card total">
			<h4 class="stat-title">Total Promotions</h4>
			<p class="stat-count">{promotions.length}</p>
		</div>
	</div>

	<!-- Promotions Table -->
	<Card title="All Promotions" subtitle="Complete promotion listing">
		<DataTable columns={columns} data={promotions}>
			<svelte:fragment slot="cell" let:row let:col>
				{#if col.key === 'discount'}
					{#if row.type === 'Percentage'}
						{row.discount}%
					{:else}
						DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(row.discount)}
					{/if}
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
					<Button variant="secondary" size="small" on:click={() => openEditModal(row)}>
						✏️ Edit
					</Button>
					<Button variant="danger" size="small" on:click={() => handleDeletePromotion(row.id)}>
						🗑️ Delete
					</Button>
				</div>
			</svelte:fragment>
		</DataTable>
	</Card>

	<!-- Active Promotions Details -->
	<Card title="Active Campaign Details" subtitle="Current running promotions">
		<div class="campaign-details">
			{#each promotions.filter((p) => p.status === 'Active') as promo (promo.id)}
				<div class="campaign-card">
					<div class="campaign-header">
						<h4 class="campaign-name">{promo.name}</h4>
						<span class="discount-badge">
							{#if promo.type === 'Percentage'}
								{promo.discount}% OFF
							{:else}
								DZD {promo.discount} OFF
							{/if}
						</span>
					</div>
					<div class="campaign-info">
						<div class="info-item">
							<label>Category</label>
							<p>{promo.category}</p>
						</div>
						<div class="info-item">
							<label>Applicable Products</label>
							<p>{promo.applicableProducts}</p>
						</div>
						<div class="info-item">
							<label>End Date</label>
							<p>{promo.endDate}</p>
						</div>
						<div class="info-item">
							<label>Days Remaining</label>
							<p>
								{new Date(promo.endDate).getTime() > new Date().getTime()
									? Math.floor(
											(new Date(promo.endDate).getTime() - new Date().getTime()) /
												(1000 * 60 * 60 * 24)
										) + ' days'
									: 'Expired'}
							</p>
						</div>
					</div>
					<div class="campaign-progress">
						<div class="progress-bar">
							<div
								class="progress-fill"
								style="width: {Math.min(
									(Math.max(0, new Date(promo.endDate).getTime() - new Date().getTime()) /
										(new Date(promo.endDate).getTime() - new Date(promo.startDate).getTime())) *
										100,
									100
								)}%; background: linear-gradient(90deg, #b37777, #d1b2b2);"
							></div>
						</div>
					</div>
				</div>
			{/each}
			{#if promotions.filter((p) => p.status === 'Active').length === 0}
				<p class="no-data">No active promotions at the moment</p>
			{/if}
		</div>
	</Card>
</div>

<!-- Add Promotion Modal -->
<Modal
	isOpen={showAddModal}
	title="Create New Promotion"
	size="large"
	onClose={() => {
		showAddModal = false;
		resetForm();
	}}
>
	<FormInput
		label="Promotion Name"
		placeholder="e.g., Summer Sale 2024"
		bind:value={formData.name}
		required
	/>

	<div class="form-row">
		<div class="form-group">
			<label class="form-label">Type <span class="required">*</span></label>
			<select bind:value={formData.type} class="form-select">
				{#each types as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
		</div>

		<div class="form-group">
			<label class="form-label">
				Discount {formData.type === 'Percentage' ? '(%)' : '(DZD)'} <span class="required">*</span>
			</label>
			<input type="number" bind:value={formData.discount} placeholder="0" class="form-input" required />
		</div>
	</div>

	<div class="form-group">
		<label class="form-label">Category <span class="required">*</span></label>
		<select bind:value={formData.category} class="form-select">
			{#each categories as cat}
				<option value={cat}>{cat}</option>
			{/each}
		</select>
	</div>

	<div class="form-row">
		<FormInput
			label="Start Date"
			inputType="date"
			bind:value={formData.startDate}
			required
		/>
		<FormInput
			label="End Date"
			inputType="date"
			bind:value={formData.endDate}
			required
		/>
	</div>

	<div class="form-group">
		<label class="form-label">Status <span class="required">*</span></label>
		<select bind:value={formData.status} class="form-select">
			<option value="Scheduled">Scheduled</option>
			<option value="Active">Active</option>
			<option value="Expired">Expired</option>
		</select>
	</div>

	<svelte:fragment slot="footer">
		<Button variant="secondary" on:click={() => (showAddModal = false)}>Cancel</Button>
		<Button variant="primary" on:click={handleAddPromotion}>Create Promotion</Button>
	</svelte:fragment>
</Modal>

<!-- Edit Promotion Modal -->
<Modal
	isOpen={showEditModal}
	title="Edit Promotion"
	size="large"
	onClose={() => {
		showEditModal = false;
		resetForm();
	}}
>
	<FormInput
		label="Promotion Name"
		placeholder="e.g., Summer Sale 2024"
		bind:value={formData.name}
		required
	/>

	<div class="form-row">
		<div class="form-group">
			<label class="form-label">Type <span class="required">*</span></label>
			<select bind:value={formData.type} class="form-select">
				{#each types as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
		</div>

		<div class="form-group">
			<label class="form-label">
				Discount {formData.type === 'Percentage' ? '(%)' : '(DZD)'} <span class="required">*</span>
			</label>
			<input type="number" bind:value={formData.discount} placeholder="0" class="form-input" required />
		</div>
	</div>

	<div class="form-group">
		<label class="form-label">Category <span class="required">*</span></label>
		<select bind:value={formData.category} class="form-select">
			{#each categories as cat}
				<option value={cat}>{cat}</option>
			{/each}
		</select>
	</div>

	<div class="form-row">
		<FormInput
			label="Start Date"
			inputType="date"
			bind:value={formData.startDate}
			required
		/>
		<FormInput
			label="End Date"
			inputType="date"
			bind:value={formData.endDate}
			required
		/>
	</div>

	<div class="form-group">
		<label class="form-label">Status <span class="required">*</span></label>
		<select bind:value={formData.status} class="form-select">
			<option value="Scheduled">Scheduled</option>
			<option value="Active">Active</option>
			<option value="Expired">Expired</option>
		</select>
	</div>

	<svelte:fragment slot="footer">
		<Button variant="secondary" on:click={() => (showEditModal = false)}>Cancel</Button>
		<Button variant="primary" on:click={handleEditPromotion}>Save Changes</Button>
	</svelte:fragment>
</Modal>

<style>
	.promotions-container {
		padding: 3rem 2.5rem;
		max-width: 1800px;
		margin: 0 auto;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		min-height: 100vh;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		margin-bottom: 3.5rem;
		gap: 2rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid var(--primary-lighter);
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

	.promo-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
		gap: 2rem;
		margin-bottom: 3.5rem;
	}

	.stat-card {
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border-radius: 1.2rem;
		padding: 2rem;
		border-left: 5px solid #d1b2b2;
		text-align: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
		transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.stat-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
	}

	.stat-card.active {
		border-left-color: #27ae60;
	}

	.stat-card.scheduled {
		border-left-color: #f39c12;
	}

	.stat-card.expired {
		border-left-color: #e74c3c;
	}

	.stat-card.total {
		border-left-color: #b37777;
	}

	.stat-title {
		font-size: 1.3rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 700;
		margin-bottom: 1rem;
		font-family: 'Andada Pro', serif;
	}

	.stat-count {
		font-size: 2.8rem;
		font-weight: 700;
		color: #2a2a2a;
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

	.status-scheduled {
		background: rgba(243, 156, 18, 0.2);
		color: #f39c12;
	}

	.status-expired {
		background: rgba(231, 76, 60, 0.2);
		color: #e74c3c;
	}

	.action-buttons {
		display: flex;
		gap: 0.5rem;
	}

	.campaign-details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
		gap: 2rem;
	}

	.campaign-card {
		border: 1px solid #f0e8e8;
		border-radius: 0.8rem;
		padding: 1.5rem;
		background: #f9f8f8;
		transition: all 0.3s ease;
	}

	.campaign-card:hover {
		border-color: #d1b2b2;
		box-shadow: 0 4px 12px rgba(209, 178, 178, 0.2);
	}

	.campaign-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		margin-bottom: 1.5rem;
		gap: 1rem;
	}

	.campaign-name {
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.discount-badge {
		background: linear-gradient(135deg, #d1b2b2, #b37777);
		color: #fff;
		padding: 0.5rem 1rem;
		border-radius: 0.4rem;
		font-weight: 600;
		font-size: 1.3rem;
		white-space: nowrap;
	}

	.campaign-info {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.info-item label {
		font-size: 1.1rem;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		font-weight: 600;
		display: block;
		margin-bottom: 0.3rem;
	}

	.info-item p {
		font-size: 1.3rem;
		color: #333;
		font-weight: 600;
	}

	.campaign-progress {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	.progress-bar {
		flex: 1;
		height: 0.8rem;
		background: #e0c8c8;
		border-radius: 0.4rem;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		border-radius: 0.4rem;
		transition: width 0.3s ease;
	}

	.no-data {
		text-align: center;
		color: #888;
		padding: 2rem;
		font-size: 1.4rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.form-label {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.required {
		color: #e74c3c;
		margin-left: 0.3rem;
	}

	.form-select,
	.form-input {
		padding: 0.8rem 1rem;
		border: 2px solid #e0c8c8;
		border-radius: 0.4rem;
		font-size: 1.4rem;
		color: #333;
		background: #fff;
		font-family: inherit;
		transition: all 0.3s ease;
	}

	.form-select:focus,
	.form-input:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	@media (max-width: 768px) {
		.promotions-container {
			padding: 1.5rem;
		}

		.page-header {
			flex-direction: column;
		}

		.page-title {
			font-size: 2.2rem;
		}

		.campaign-details {
			grid-template-columns: 1fr;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.campaign-info {
			grid-template-columns: 1fr;
		}

		.action-buttons {
			flex-direction: column;
		}
	}
</style>
