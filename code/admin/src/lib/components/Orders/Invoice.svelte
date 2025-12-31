<script lang="ts">
	export interface InvoiceItem {
		name: string;
		quantity: number;
		price: number;
		total: number;
	}

	export interface InvoiceOrder {
		id: string;
		date: string;
		customer: string;
		email: string;
		phone?: string;
		address?: string;
		city?: string;
		postalCode?: string;
		items: InvoiceItem[];
		subtotal: number;
		tax: number;
		total: number;
		status: string;
		paymentMethod?: string;
		notes?: string;
	}

	export let order: InvoiceOrder;
	export let onPrint = () => window.print();

	const companyInfo = {
		name: 'Beaute & Elegance',
		tagline: 'Premium Beauty & Fashion',
		address: '123 Avenue Principal, Algiers, DZA',
		phone: '+213 (21) 123-4567',
		email: 'support@beaute-elegance.com',
		website: 'www.beaute-elegance.com',
		taxId: 'TAX: DZA123456789'
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
</script>

<div class="invoice-container" id="invoice">
	<!-- Invoice Header -->
	<div class="invoice-header">
		<div class="company-info">
			<div class="company-brand">
				<h1 class="company-name">{companyInfo.name}</h1>
				<p class="company-tagline">{companyInfo.tagline}</p>
			</div>
			<div class="company-details">
				<p class="detail-line">{companyInfo.address}</p>
				<p class="detail-line">{companyInfo.phone}</p>
				<p class="detail-line">{companyInfo.email}</p>
				<p class="detail-line">{companyInfo.website}</p>
				<p class="detail-line">{companyInfo.taxId}</p>
			</div>
		</div>

		<div class="invoice-title">
			<h2 class="title-text">INVOICE</h2>
			<div class="invoice-number">No. {order.id}</div>
		</div>
	</div>

	<!-- Invoice Dates and Status -->
	<div class="invoice-meta">
		<div class="meta-section">
			<div class="meta-item">
				<span class="meta-label">Invoice Date:</span>
				<span class="meta-value">{formatDate(order.date)}</span>
			</div>
			<div class="meta-item">
				<span class="meta-label">Due Date:</span>
				<span class="meta-value">{formatDate(new Date(new Date(order.date).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString())}</span>
			</div>
		</div>
		<div class="status-badge" class:delivered={order.status === 'Delivered'} class:processing={order.status === 'Processing'}>
			{order.status.toUpperCase()}
		</div>
	</div>

	<!-- Billing and Shipping Info -->
	<div class="invoice-parties">
		<div class="party-section">
			<h3 class="party-title">Bill To:</h3>
			<div class="party-details">
				<p class="party-name">{order.customer}</p>
				<p class="party-info">{order.email}</p>
				{#if order.phone}
					<p class="party-info">{order.phone}</p>
				{/if}
				{#if order.address}
					<p class="party-info">{order.address}</p>
				{/if}
				{#if order.city || order.postalCode}
					<p class="party-info">{order.city} {order.postalCode}</p>
				{/if}
			</div>
		</div>

		<div class="party-section">
			<h3 class="party-title">Ship To:</h3>
			<div class="party-details">
				<p class="party-name">{order.customer}</p>
				{#if order.address}
					<p class="party-info">{order.address}</p>
				{/if}
				{#if order.city || order.postalCode}
					<p class="party-info">{order.city} {order.postalCode}</p>
				{/if}
				<p class="party-info">Algeria</p>
			</div>
		</div>

		<div class="party-section">
			<h3 class="party-title">Payment:</h3>
			<div class="party-details">
				<p class="party-info">{order.paymentMethod || 'Credit Card'}</p>
				<p class="party-info">Order #{order.id}</p>
				<p class="party-info">Status: <strong>{order.status}</strong></p>
			</div>
		</div>
	</div>

	<!-- Items Table -->
	<div class="invoice-items">
		<table class="items-table">
			<thead>
				<tr>
					<th class="col-item">Item</th>
					<th class="col-quantity">Quantity</th>
					<th class="col-price">Unit Price</th>
					<th class="col-total">Amount</th>
				</tr>
			</thead>
			<tbody>
				{#each order.items as item, index (index)}
					<tr>
						<td class="col-item">{item.name}</td>
						<td class="col-quantity">{item.quantity}</td>
						<td class="col-price">DZD {formatCurrency(item.price)}</td>
						<td class="col-total">DZD {formatCurrency(item.total)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Totals Section -->
	<div class="invoice-totals">
		<div class="totals-spacer" />
		<div class="totals-summary">
			<div class="total-row">
				<span class="total-label">Subtotal:</span>
				<span class="total-value">DZD {formatCurrency(order.subtotal)}</span>
			</div>
			<div class="total-row">
				<span class="total-label">Tax (VAT 19%):</span>
				<span class="total-value">DZD {formatCurrency(order.tax)}</span>
			</div>
			<div class="total-row grand-total">
				<span class="total-label">Total Due:</span>
				<span class="total-value">DZD {formatCurrency(order.total)}</span>
			</div>
		</div>
	</div>

	<!-- Notes Section -->
	{#if order.notes}
		<div class="invoice-notes">
			<h3 class="notes-title">Notes:</h3>
			<p class="notes-content">{order.notes}</p>
		</div>
	{/if}

	<!-- Footer -->
	<div class="invoice-footer">
		<div class="footer-section">
			<p class="footer-text">Thank you for your business!</p>
			<p class="footer-text">For inquiries, please contact: {companyInfo.email}</p>
		</div>
		<div class="footer-section">
			<p class="footer-legal">This is an official invoice from {companyInfo.name}. Please keep for your records.</p>
		</div>
	</div>
</div>

<style>
	.invoice-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 3rem;
		background: white;
		font-family: 'Andada Pro', serif;
		color: #333;
		line-height: 1.6;
	}

	.invoice-header {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 3px solid #b37777;
	}

	.company-info {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.company-brand {
		margin-bottom: 0.5rem;
	}

	.company-name {
		font-size: 2.4rem;
		font-weight: 400;
		color: #b37777;
		margin-bottom: 0.3rem;
		letter-spacing: -0.01em;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.company-tagline {
		font-size: 1.2rem;
		color: #666;
		font-style: italic;
	}

	.company-details {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.detail-line {
		font-size: 1.1rem;
		color: #666;
	}

	.invoice-title {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-start;
		text-align: right;
	}

	.title-text {
		font-size: 3rem;
		font-weight: 400;
		color: #b37777;
		letter-spacing: 0.1em;
		margin-bottom: 1rem;
	}

	.invoice-number {
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
		padding: 1rem;
		background: rgba(179, 119, 119, 0.1);
		border: 2px solid #b37777;
		border-radius: 0.6rem;
		min-width: 180px;
		text-align: center;
	}

	.invoice-meta {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: rgba(179, 119, 119, 0.05);
		border-radius: 0.8rem;
		align-items: center;
	}

	.meta-section {
		display: flex;
		gap: 3rem;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.meta-label {
		font-size: 1.1rem;
		color: #666;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.meta-value {
		font-size: 1.4rem;
		color: #333;
		font-weight: 500;
	}

	.status-badge {
		padding: 1rem 1.5rem;
		border-radius: 0.6rem;
		font-weight: 600;
		text-align: center;
		font-size: 1.2rem;
		letter-spacing: 0.05em;
	}

	.status-badge.delivered {
		background: rgba(39, 174, 96, 0.15);
		color: #1d6b3c;
		border: 2px solid rgba(39, 174, 96, 0.3);
	}

	.status-badge.processing {
		background: rgba(243, 156, 18, 0.15);
		color: #b87c0f;
		border: 2px solid rgba(243, 156, 18, 0.3);
	}

	.invoice-parties {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		margin-bottom: 3rem;
		padding: 2rem;
		background: #faf9f8;
		border-radius: 0.8rem;
	}

	.party-section {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.party-title {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-bottom: 2px solid #b37777;
		padding-bottom: 0.6rem;
	}

	.party-details {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.party-name {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
	}

	.party-info {
		font-size: 1.1rem;
		color: #666;
	}

	.invoice-items {
		margin-bottom: 2rem;
		overflow-x: auto;
	}

	.items-table {
		width: 100%;
		border-collapse: collapse;
	}

	.items-table thead {
		background: linear-gradient(135deg, #b37777 0%, #9c6666 100%);
		color: white;
	}

	.items-table thead th {
		padding: 1.2rem;
		text-align: left;
		font-size: 1.2rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.items-table tbody tr {
		border-bottom: 1px solid #d9c8c8;
		transition: background-color 0.3s ease;
	}

	.items-table tbody tr:hover {
		background: rgba(179, 119, 119, 0.05);
	}

	.items-table tbody td {
		padding: 1.2rem;
		font-size: 1.1rem;
	}

	.col-item {
		width: 40%;
		text-align: left;
	}

	.col-quantity {
		width: 15%;
		text-align: center;
	}

	.col-price {
		width: 20%;
		text-align: right;
	}

	.col-total {
		width: 25%;
		text-align: right;
		font-weight: 600;
	}

	.invoice-totals {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.totals-spacer {
		/* Empty space for alignment */
	}

	.totals-summary {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.total-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		padding: 0.8rem;
		border-bottom: 1px solid #d9c8c8;
	}

	.total-row.grand-total {
		background: linear-gradient(135deg, rgba(179, 119, 119, 0.1) 0%, rgba(179, 119, 119, 0.05) 100%);
		border: 2px solid #b37777;
		border-radius: 0.6rem;
		margin-top: 0.4rem;
		padding: 1rem;
	}

	.total-label {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		text-align: left;
	}

	.total-row.grand-total .total-label {
		font-size: 1.5rem;
	}

	.total-value {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		text-align: right;
	}

	.total-row.grand-total .total-value {
		color: #b37777;
		font-size: 1.6rem;
	}

	.invoice-notes {
		padding: 1.5rem;
		background: rgba(179, 119, 119, 0.05);
		border-left: 4px solid #b37777;
		border-radius: 0.4rem;
		margin-bottom: 2rem;
	}

	.notes-title {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.notes-content {
		font-size: 1.1rem;
		color: #666;
		line-height: 1.8;
	}

	.invoice-footer {
		padding-top: 2rem;
		border-top: 2px solid #d9c8c8;
		margin-top: 2rem;
	}

	.footer-section {
		margin-bottom: 1rem;
		text-align: center;
	}

	.footer-text {
		font-size: 1.1rem;
		color: #333;
		margin-bottom: 0.3rem;
		font-weight: 500;
	}

	.footer-legal {
		font-size: 1rem;
		color: #999;
		font-style: italic;
	}

	@media print {
		.invoice-container {
			padding: 0;
			margin: 0;
		}

		body {
			margin: 0;
			padding: 0;
		}
	}

	@media (max-width: 768px) {
		.invoice-container {
			padding: 1.5rem;
		}

		.invoice-header {
			grid-template-columns: 1fr;
		}

		.invoice-title {
			align-items: flex-start;
			text-align: left;
		}

		.invoice-meta {
			grid-template-columns: 1fr;
		}

		.meta-section {
			flex-direction: column;
			gap: 1rem;
		}

		.invoice-parties {
			grid-template-columns: 1fr;
		}

		.invoice-totals {
			grid-template-columns: 1fr;
		}

		.col-item {
			width: 30%;
		}

		.col-quantity,
		.col-price,
		.col-total {
			font-size: 1rem;
		}
	}
</style>
