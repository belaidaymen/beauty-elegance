<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormTextarea from '$lib/components/FormTextarea.svelte';
	import ProductImage from '$lib/components/ProductImage.svelte';
	import ProductImageUpload from '$lib/components/ProductImageUpload.svelte';
	import ProductPreviewModal from '$lib/components/ProductPreviewModal.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import AdvancedFilterPanel from '$lib/components/AdvancedFilterPanel.svelte';
	import { Plus, Pencil, Trash2, Eye } from 'lucide-svelte';

	interface Product {
		id: string;
		name: string;
		sku: string;
		category: string;
		price: number;
		cost: number;
		stock: number;
		status: string;
		image: string | undefined;
		description: string;
		totalSales: number;
		totalRevenue: number;
		rating: number;
		views: number;
		createdAt: string;
		updatedAt: string;
	}

	let products: Product[] = [
		{
			id: '1',
			name: 'Gracias Shampoo 500ml',
			sku: 'GS-500-001',
			category: 'Cheveux',
			price: 2500,
			cost: 1200,
			stock: 45,
			status: 'Active',
			image: undefined,
			description: 'Professional hair care shampoo with natural ingredients',
			totalSales: 156,
			totalRevenue: 390000,
			rating: 4.8,
			views: 1243,
			createdAt: '2024-01-10',
			updatedAt: '2024-01-15'
		},
		{
			id: '2',
			name: 'Red Lipstick Velvet',
			sku: 'RL-VELVET-001',
			category: 'Maquillage',
			price: 1800,
			cost: 800,
			stock: 28,
			status: 'Active',
			image: undefined,
			description: 'Premium velvet lipstick with long-lasting formula',
			totalSales: 89,
			totalRevenue: 160200,
			rating: 4.9,
			views: 987,
			createdAt: '2024-01-08',
			updatedAt: '2024-01-14'
		},
		{
			id: '3',
			name: 'Face Moisturizer Pro',
			sku: 'FM-PRO-001',
			category: 'Visage',
			price: 3200,
			cost: 1500,
			stock: 15,
			status: 'Active',
			image: undefined,
			description: 'Advanced face moisturizer for all skin types',
			totalSales: 234,
			totalRevenue: 748800,
			rating: 4.7,
			views: 2156,
			createdAt: '2024-01-05',
			updatedAt: '2024-01-13'
		},
		{
			id: '4',
			name: 'Body Lotion 400ml',
			sku: 'BL-400-001',
			category: 'Corps & Bain',
			price: 1500,
			cost: 700,
			stock: 8,
			status: 'Low Stock',
			image: undefined,
			description: 'Hydrating body lotion with pleasant fragrance',
			totalSales: 112,
			totalRevenue: 168000,
			rating: 4.6,
			views: 834,
			createdAt: '2024-01-12',
			updatedAt: '2024-01-16'
		},
		{
			id: '5',
			name: 'Deodorant Stick',
			sku: 'DEO-STICK-001',
			category: 'Deo & Stick',
			price: 450,
			cost: 200,
			stock: 0,
			status: 'Out of Stock',
			image: undefined,
			description: 'Effective and long-lasting deodorant stick',
			totalSales: 289,
			totalRevenue: 130050,
			rating: 4.5,
			views: 1567,
			createdAt: '2024-01-03',
			updatedAt: '2024-01-17'
		}
	];

	let showAddModal = false;
	let showEditModal = false;
	let showPreviewModal = false;
	let previewProduct: Product | null = null;
	let editingProduct: Product | null = null;
	let currentPage = 1;
	let itemsPerPage = 10;

	let filters = {
		search: '',
		category: '',
		minPrice: 0,
		maxPrice: 100000,
		stockStatus: '',
		sortBy: 'newest'
	};

	let formData = {
		name: '',
		sku: '',
		category: 'Maquillage',
		price: 0,
		cost: 0,
		stock: 0,
		status: 'Active',
		image: undefined as string | undefined,
		description: ''
	};

	const categories = [
		'Maquillage',
		'Cheveux',
		'Visage',
		'Corps & Bain',
		'Deo & Stick',
		'Promotion'
	];

	const columns = [
		{ key: 'image', label: 'Image', width: '10%' },
		{ key: 'name', label: 'Product Name', width: '25%' },
		{ key: 'sku', label: 'SKU', width: '12%' },
		{ key: 'category', label: 'Category', width: '15%' },
		{ key: 'price', label: 'Price (DZD)', width: '12%' },
		{ key: 'stock', label: 'Stock', width: '10%' },
		{ key: 'status', label: 'Status', width: '16%' }
	];

	$: filteredProducts = products.filter((p) => {
		const matchesSearch =
			p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
			p.sku.toLowerCase().includes(filters.search.toLowerCase());
		const matchesCategory = !filters.category || p.category === filters.category;
		const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
		const matchesStock = !filters.stockStatus || p.status === filters.stockStatus;

		return matchesSearch && matchesCategory && matchesPrice && matchesStock;
	});

	$: sortedProducts = [...filteredProducts].sort((a, b) => {
		switch (filters.sortBy) {
			case 'name-asc':
				return a.name.localeCompare(b.name);
			case 'name-desc':
				return b.name.localeCompare(a.name);
			case 'price-asc':
				return a.price - b.price;
			case 'price-desc':
				return b.price - a.price;
			case 'sales-desc':
				return b.totalSales - a.totalSales;
			case 'oldest':
				return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
			case 'newest':
			default:
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		}
	});

	$: totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
	$: paginatedProducts = sortedProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const openAddModal = () => {
		resetForm();
		showAddModal = true;
	};

	const openEditModal = (product: Product) => {
		editingProduct = product;
		formData = {
			name: product.name,
			sku: product.sku,
			category: product.category,
			price: product.price,
			cost: product.cost,
			stock: product.stock,
			status: product.status,
			image: product.image,
			description: product.description
		};
		showEditModal = true;
	};

	const openPreviewModal = (product: Product) => {
		previewProduct = product;
		showPreviewModal = true;
	};

	const resetForm = () => {
		formData = {
			name: '',
			sku: '',
			category: 'Maquillage',
			price: 0,
			cost: 0,
			stock: 0,
			status: 'Active',
			image: undefined,
			description: ''
		};
		editingProduct = null;
	};

	const handleAddProduct = () => {
		if (!formData.name || !formData.sku || !formData.category) {
			alert('Please fill in all required fields');
			return;
		}

		const newProduct: Product = {
			id: Date.now().toString(),
			...formData,
			totalSales: 0,
			totalRevenue: 0,
			rating: 0,
			views: 0,
			createdAt: new Date().toISOString().split('T')[0],
			updatedAt: new Date().toISOString().split('T')[0]
		};
		products = [newProduct, ...products];
		currentPage = 1;
		showAddModal = false;
		resetForm();
	};

	const handleEditProduct = () => {
		if (editingProduct && formData.name && formData.sku && formData.category) {
			products = products.map((p) =>
				p.id === editingProduct?.id
					? {
							...p,
							...formData,
							updatedAt: new Date().toISOString().split('T')[0]
					  }
					: p
			);
			previewProduct =
				previewProduct?.id === editingProduct?.id
					? { ...editingProduct, ...formData }
					: previewProduct;
			showEditModal = false;
			resetForm();
		}
	};

	const handleDeleteProduct = (id: string) => {
		if (confirm('Are you sure you want to delete this product?')) {
			products = products.filter((p) => p.id !== id);
			if (paginatedProducts.length === 1 && currentPage > 1) {
				currentPage--;
			}
		}
	};

	const handleFilterChange = (newFilters: any) => {
		filters = newFilters;
		currentPage = 1;
	};

	const handlePageChange = (page: number) => {
		currentPage = page;
		window.scrollTo({ top: 0, behavior: 'smooth' });
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

	const totalProducts = products.length;
	const totalRevenue = products.reduce((sum, p) => sum + p.totalRevenue, 0);
	const totalSales = products.reduce((sum, p) => sum + p.totalSales, 0);
	const avgRating =
		products.length > 0
			? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)
			: '0';
</script>

<div class="products-container">
	<div class="page-header">
		<div>
			<h1 class="page-title">Product Management</h1>
			<p class="page-subtitle">Manage your complete product inventory with advanced features</p>
		</div>
		<Button variant="primary" size="large" on:click={openAddModal}>
			<Plus size={20} />
			Add New Product
		</Button>
	</div>

	<!-- Product Stats -->
	<div class="stats-grid">
		<div class="stat-box">
			<div class="stat-label">Total Products</div>
			<div class="stat-value">{totalProducts}</div>
		</div>
		<div class="stat-box">
			<div class="stat-label">Total Revenue</div>
			<div class="stat-value">DZD {new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(totalRevenue)}</div>
		</div>
		<div class="stat-box">
			<div class="stat-label">Total Sales</div>
			<div class="stat-value">{totalSales}</div>
		</div>
		<div class="stat-box">
			<div class="stat-label">Average Rating</div>
			<div class="stat-value">{avgRating}⭐</div>
		</div>
	</div>

	<!-- Filters -->
	<AdvancedFilterPanel
		{categories}
		{filters}
		onFilterChange={handleFilterChange}
	/>

	<!-- Products Table -->
	<Card
		title="All Products"
		subtitle="Complete inventory listing ({sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''})"
	>
		<DataTable columns={columns} data={paginatedProducts}>
			<svelte:fragment slot="cell" let:row let:col>
				{#if col.key === 'image'}
					<ProductImage
						src={row.image}
						alt={row.name}
						size="small"
						clickable
						onClick={() => openPreviewModal(row)}
					/>
				{:else if col.key === 'price'}
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
					<Button variant="secondary" size="small" on:click={() => openPreviewModal(row)}>
						<Eye size={18} />
						Preview
					</Button>
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

		{#if totalPages > 1}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		{/if}
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

	<FormInput
		label="SKU"
		placeholder="Enter unique SKU code"
		bind:value={formData.sku}
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

	<div class="form-row">
		<FormInput
			label="Price (DZD)"
			inputType="number"
			placeholder="0"
			bind:value={formData.price}
			required
		/>
		<FormInput
			label="Cost (DZD)"
			inputType="number"
			placeholder="0"
			bind:value={formData.cost}
		/>
	</div>

	<FormInput
		label="Stock Quantity"
		inputType="number"
		placeholder="0"
		bind:value={formData.stock}
		required
	/>

	<div class="form-group">
		<label class="form-label">Status <span class="required">*</span></label>
		<select bind:value={formData.status} class="form-select">
			<option value="Active">Active</option>
			<option value="Inactive">Inactive</option>
			<option value="Low Stock">Low Stock</option>
			<option value="Out of Stock">Out of Stock</option>
		</select>
	</div>

	<FormTextarea
		label="Description"
		placeholder="Enter product description"
		bind:value={formData.description}
	/>

	<div class="form-group">
		<label class="form-label">Product Image</label>
		<ProductImageUpload
			bind:imageUrl={formData.image}
			onImageUpload={(url) => (formData.image = url)}
		/>
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

	<FormInput
		label="SKU"
		placeholder="Enter unique SKU code"
		bind:value={formData.sku}
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

	<div class="form-row">
		<FormInput
			label="Price (DZD)"
			inputType="number"
			placeholder="0"
			bind:value={formData.price}
			required
		/>
		<FormInput
			label="Cost (DZD)"
			inputType="number"
			placeholder="0"
			bind:value={formData.cost}
		/>
	</div>

	<FormInput
		label="Stock Quantity"
		inputType="number"
		placeholder="0"
		bind:value={formData.stock}
		required
	/>

	<div class="form-group">
		<label class="form-label">Status <span class="required">*</span></label>
		<select bind:value={formData.status} class="form-select">
			<option value="Active">Active</option>
			<option value="Inactive">Inactive</option>
			<option value="Low Stock">Low Stock</option>
			<option value="Out of Stock">Out of Stock</option>
		</select>
	</div>

	<FormTextarea
		label="Description"
		placeholder="Enter product description"
		bind:value={formData.description}
	/>

	<div class="form-group">
		<label class="form-label">Product Image</label>
		<ProductImageUpload
			bind:imageUrl={formData.image}
			onImageUpload={(url) => (formData.image = url)}
		/>
	</div>

	<svelte:fragment slot="footer">
		<Button variant="secondary" on:click={() => (showEditModal = false)}>Cancel</Button>
		<Button variant="primary" on:click={handleEditProduct}>Save Changes</Button>
	</svelte:fragment>
</Modal>

<!-- Product Preview Modal -->
<ProductPreviewModal
	product={previewProduct}
	isOpen={showPreviewModal}
	onClose={() => (showPreviewModal = false)}
/>

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

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
		gap: 1.8rem;
		margin-bottom: 3.5rem;
	}

	.stat-box {
		background: linear-gradient(135deg, #fff 0%, #fafbff 100%);
		border: 2px solid #e8e0db;
		border-radius: 1.2rem;
		padding: 2rem;
		text-align: center;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.stat-box:hover {
		border-color: #b37777;
		box-shadow: 0 8px 24px rgba(179, 119, 119, 0.15);
		transform: translateY(-2px);
	}

	.stat-label {
		font-size: 1.3rem;
		color: #999;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
		font-weight: 700;
		letter-spacing: 0.08em;
		margin-bottom: 0.8rem;
	}

	.stat-value {
		font-family: 'Abril Fatface', serif;
		font-size: 2.4rem;
		font-weight: 400;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.6rem 1.2rem;
		border-radius: 0.6rem;
		font-size: 1.2rem;
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
		gap: 0.8rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		margin-bottom: 2rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
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

	@media (max-width: 1024px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.action-buttons {
			flex-direction: column;
		}
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

		.stats-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
