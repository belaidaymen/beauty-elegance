<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormTextarea from '$lib/components/FormTextarea.svelte';

	interface Product {
		id: string;
		name: string;
		category: string;
		price: number;
		stock: number;
		status: string;
	}

	let products: Product[] = [
		{
			id: '1',
			name: 'Gracias Shampoo 500ml',
			category: 'Cheveux',
			price: 2500,
			stock: 45,
			status: 'Active'
		},
		{
			id: '2',
			name: 'Red Lipstick Velvet',
			category: 'Maquillage',
			price: 1800,
			stock: 28,
			status: 'Active'
		},
		{
			id: '3',
			name: 'Face Moisturizer Pro',
			category: 'Visage',
			price: 3200,
			stock: 15,
			status: 'Active'
		},
		{
			id: '4',
			name: 'Body Lotion 400ml',
			category: 'Corps & Bain',
			price: 1500,
			stock: 8,
			status: 'Low Stock'
		},
		{
			id: '5',
			name: 'Deodorant Stick',
			category: 'Deo & Stick',
			price: 450,
			stock: 0,
			status: 'Out of Stock'
		}
	];

	let showAddModal = false;
	let showEditModal = false;
	let editingProduct: Product | null = null;

	let formData = {
		name: '',
		category: 'Maquillage',
		price: 0,
		stock: 0,
		status: 'Active'
	};

	const columns = [
		{ key: 'name', label: 'Product Name', width: '30%' },
		{ key: 'category', label: 'Category', width: '20%' },
		{ key: 'price', label: 'Price (DZD)', width: '15%' },
		{ key: 'stock', label: 'Stock', width: '15%' },
		{ key: 'status', label: 'Status', width: '15%' }
	];

	const categories = [
		'Maquillage',
		'Cheveux',
		'Visage',
		'Corps & Bain',
		'Deo & Stick',
		'Promotion'
	];

	const openAddModal = () => {
		resetForm();
		showAddModal = true;
	};

	const openEditModal = (product: Product) => {
		editingProduct = product;
		formData = {
			name: product.name,
			category: product.category,
			price: product.price,
			stock: product.stock,
			status: product.status
		};
		showEditModal = true;
	};

	const resetForm = () => {
		formData = {
			name: '',
			category: 'Maquillage',
			price: 0,
			stock: 0,
			status: 'Active'
		};
		editingProduct = null;
	};

	const handleAddProduct = () => {
		const newProduct: Product = {
			id: Date.now().toString(),
			...formData
		};
		products = [...products, newProduct];
		showAddModal = false;
		resetForm();
	};

	const handleEditProduct = () => {
		if (editingProduct) {
			products = products.map((p) =>
				p.id === editingProduct?.id ? { ...p, ...formData } : p
			);
			showEditModal = false;
			resetForm();
		}
	};

	const handleDeleteProduct = (id: string) => {
		if (confirm('Are you sure you want to delete this product?')) {
			products = products.filter((p) => p.id !== id);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Active':
				return 'success';
			case 'Inactive':
				return 'danger';
			case 'Low Stock':
				return 'warning';
			case 'Out of Stock':
				return 'danger';
			default:
				return 'neutral';
		}
	};
</script>

<div class="products-container">
	<div class="page-header">
		<div>
			<h1 class="page-title">Product Management</h1>
			<p class="page-subtitle">Manage your product inventory and details</p>
		</div>
		<Button variant="primary" size="large" on:click={openAddModal}>
			➕ Add New Product
		</Button>
	</div>

	<Card title="All Products" subtitle="Complete inventory listing">
		<DataTable columns={columns} data={products}>
			<svelte:fragment slot="cell" let:row let:col>
				{#if col.key === 'price'}
					DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(row.price)}
				{:else if col.key === 'status'}
					<span class="status-badge status-{row.status.toLowerCase().replace(/\s+/g, '-')}">
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
					<Button variant="danger" size="small" on:click={() => handleDeleteProduct(row.id)}>
						🗑️ Delete
					</Button>
				</div>
			</svelte:fragment>
		</DataTable>
	</Card>
</div>

<!-- Add Product Modal -->
<Modal
	isOpen={showAddModal}
	title="Add New Product"
	size="large"
	onClose={() => {
		showAddModal = false;
		resetForm();
	}}
>
	<FormInput
		label="Product Name"
		placeholder="Enter product name"
		bind:value={formData.name}
		required
	/>

	<div class="form-group">
		<label class="form-label">Category <span class="required">*</span></label>
		<select bind:value={formData.category} class="form-select">
			{#each categories as cat}
				<option value={cat}>{cat}</option>
			{/each}
		</select>
	</div>

	<FormInput
		label="Price (DZD)"
		inputType="number"
		placeholder="0"
		bind:value={formData.price}
		required
	/>

	<FormInput label="Stock Quantity" inputType="number" placeholder="0" bind:value={formData.stock} required />

	<div class="form-group">
		<label class="form-label">Status <span class="required">*</span></label>
		<select bind:value={formData.status} class="form-select">
			<option value="Active">Active</option>
			<option value="Inactive">Inactive</option>
		</select>
	</div>

	<svelte:fragment slot="footer">
		<Button variant="secondary" on:click={() => (showAddModal = false)}>Cancel</Button>
		<Button variant="primary" on:click={handleAddProduct}>Add Product</Button>
	</svelte:fragment>
</Modal>

<!-- Edit Product Modal -->
<Modal
	isOpen={showEditModal}
	title="Edit Product"
	size="large"
	onClose={() => {
		showEditModal = false;
		resetForm();
	}}
>
	<FormInput
		label="Product Name"
		placeholder="Enter product name"
		bind:value={formData.name}
		required
	/>

	<div class="form-group">
		<label class="form-label">Category <span class="required">*</span></label>
		<select bind:value={formData.category} class="form-select">
			{#each categories as cat}
				<option value={cat}>{cat}</option>
			{/each}
		</select>
	</div>

	<FormInput
		label="Price (DZD)"
		inputType="number"
		placeholder="0"
		bind:value={formData.price}
		required
	/>

	<FormInput label="Stock Quantity" inputType="number" placeholder="0" bind:value={formData.stock} required />

	<div class="form-group">
		<label class="form-label">Status <span class="required">*</span></label>
		<select bind:value={formData.status} class="form-select">
			<option value="Active">Active</option>
			<option value="Inactive">Inactive</option>
		</select>
	</div>

	<svelte:fragment slot="footer">
		<Button variant="secondary" on:click={() => (showEditModal = false)}>Cancel</Button>
		<Button variant="primary" on:click={handleEditProduct}>Save Changes</Button>
	</svelte:fragment>
</Modal>

<style>
	.products-container {
		padding: 2rem;
		max-width: 1600px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		margin-bottom: 2rem;
		gap: 2rem;
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

	.status-low-stock {
		background: rgba(243, 156, 18, 0.2);
		color: #f39c12;
	}

	.status-out-of-stock {
		background: rgba(231, 76, 60, 0.2);
		color: #e74c3c;
	}

	.action-buttons {
		display: flex;
		gap: 0.5rem;
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

	@media (max-width: 768px) {
		.products-container {
			padding: 1.5rem;
		}

		.page-header {
			flex-direction: column;
		}

		.page-title {
			font-size: 2.2rem;
		}

		.action-buttons {
			flex-direction: column;
		}
	}
</style>
