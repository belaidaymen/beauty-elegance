<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormTextarea from '$lib/components/FormTextarea.svelte';
	import { Plus, Pencil, Trash2 } from 'lucide-svelte';

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
			<Plus size={20} />
			Add New Product
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
						<Pencil size={18} />
						Edit
					</Button>
					<Button variant="danger" size="small" on:click={() => handleDeleteProduct(row.id)}>
						<Trash2 size={18} />
						Delete
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

	.status-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.7rem 1.3rem;
		border-radius: 0.7rem;
		font-size: 1.3rem;
		font-weight: 600;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
		backdrop-filter: blur(10px);
		border: 1px solid transparent;
	}

	.status-active {
		background: rgba(39, 174, 96, 0.12);
		color: #1d6b3c;
		border-color: rgba(39, 174, 96, 0.3);
	}

	.status-inactive {
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
		border-color: rgba(201, 68, 68, 0.3);
	}

	.status-low-stock {
		background: rgba(243, 156, 18, 0.12);
		color: #b87c0f;
		border-color: rgba(243, 156, 18, 0.3);
	}

	.status-out-of-stock {
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
		border-color: rgba(201, 68, 68, 0.3);
	}

	.action-buttons {
		display: flex;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		margin-bottom: 2rem;
	}

	.form-label {
		font-size: 1.5rem;
		font-weight: 700;
		color: #333;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		font-size: 1.3rem;
		letter-spacing: 0.1em;
	}

	.required {
		color: #c94444;
		margin-left: 0.4rem;
	}

	.form-select {
		padding: 1rem 1.5rem;
		border: 2px solid transparent;
		border-image: linear-gradient(90deg, #e8e0db, #f0d9d9) 1;
		border-radius: 0.8rem;
		font-size: 1.5rem;
		color: #333;
		background: rgba(255, 255, 255, 0.8);
		font-family: inherit;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.form-select:focus {
		outline: none;
		border-color: #b37777;
		background: #fff;
		box-shadow: 0 0 0 4px rgba(179, 119, 119, 0.1);
	}

	@media (max-width: 768px) {
		.products-container {
			padding: 2rem;
		}

		.page-header {
			flex-direction: column;
			margin-bottom: 2.5rem;
		}

		.page-title {
			font-size: 3rem;
		}

		.action-buttons {
			flex-direction: column;
		}
	}
</style>
