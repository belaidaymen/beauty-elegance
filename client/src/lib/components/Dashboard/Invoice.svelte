<script lang="ts">
	import type { Order } from '$lib/types';
	import { user } from '$lib/stores/user_store';

	export let order: Order;

	function handlePrint() {
		window.print();
	}

	function generateInvoiceNumber(orderNumber: string): string {
		return `FAC-${new Date(order.orderDate).getFullYear()}-${orderNumber.replace('#', '')}`;
	}
</script>

<div class="invoice-wrapper">
	<button class="print-btn" on:click={handlePrint}>🖨️ Imprimer la facture</button>

	<div class="invoice">
		<div class="invoice-header">
			<div class="company-info">
				<h1>Beaute & Elegance</h1>
				<p>Beauté et Produits de Soin Premium</p>
			</div>
			<div class="invoice-title">
				<h2>FACTURE</h2>
				<p>Numéro: {generateInvoiceNumber(order.orderNumber)}</p>
				<p>Date: {new Date(order.orderDate).toLocaleDateString('fr-FR')}</p>
			</div>
		</div>

		<div class="invoice-details">
			<div class="section">
				<h3>De</h3>
				<div class="info-box">
					<p><strong>Beaute & Elegance</strong></p>
					<p>Adresse: 123 Rue de la Beauté</p>
					<p>Ville: Alger, Algérie</p>
					<p>Téléphone: +213 XX XXX XXXX</p>
					<p>Email: contact@beauteelegance.com</p>
				</div>
			</div>

			<div class="section">
				<h3>Facturer à</h3>
				<div class="info-box">
					<p>
						<strong
							>{$user?.firstName}
							{$user?.lastName}</strong
						>
					</p>
					<p>{$user?.address}</p>
					<p>{$user?.postalCode} {$user?.city}</p>
					<p>{$user?.country}</p>
					<p>Tél: {$user?.phone}</p>
					<p>Email: {$user?.email}</p>
				</div>
			</div>

			<div class="section">
				<h3>Livrer à</h3>
				<div class="info-box">
					<p>
						<strong
							>{order.shippingAddress.firstName}
							{order.shippingAddress.lastName}</strong
						>
					</p>
					<p>{order.shippingAddress.address}</p>
					<p>{order.shippingAddress.postalCode} {order.shippingAddress.city}</p>
					<p>{order.shippingAddress.country}</p>
					<p>Tél: {order.shippingAddress.phone}</p>
				</div>
			</div>
		</div>

		<table class="invoice-table">
			<thead>
				<tr>
					<th>Description</th>
					<th>Quantité</th>
					<th>Prix Unitaire</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				{#each order.items as item (item.id)}
					<tr>
						<td>
							<strong>{item.name}</strong>
							<br />
							<small>{item.description}</small>
						</td>
						<td class="center">{item.quantity}</td>
						<td class="right">
							{new Intl.NumberFormat('fr-FR', {
								style: 'currency',
								currency: 'DZD'
							}).format(item.price)}
						</td>
						<td class="right">
							{new Intl.NumberFormat('fr-FR', {
								style: 'currency',
								currency: 'DZD'
							}).format(item.price * item.quantity)}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div class="invoice-summary">
			<div class="summary-section">
				<div class="summary-row">
					<span>Sous-total</span>
					<span>
						{new Intl.NumberFormat('fr-FR', {
							style: 'currency',
							currency: 'DZD'
						}).format(order.totalAmount * 0.9)}
					</span>
				</div>
				<div class="summary-row">
					<span>Frais de livraison (10%)</span>
					<span>
						{new Intl.NumberFormat('fr-FR', {
							style: 'currency',
							currency: 'DZD'
						}).format(order.totalAmount * 0.1)}
					</span>
				</div>
				<div class="summary-row total-row">
					<span>TOTAL</span>
					<span>
						{new Intl.NumberFormat('fr-FR', {
							style: 'currency',
							currency: 'DZD'
						}).format(order.totalAmount)}
					</span>
				</div>
				<div class="summary-row">
					<span>Mode de paiement</span>
					<span>{order.paymentMethod}</span>
				</div>
			</div>
		</div>

		<div class="invoice-footer">
			<div class="thank-you">
				<p>Merci pour votre commande!</p>
			</div>
			<div class="terms">
				<p>Pour toute question concernant cette facture, veuillez contacter notre service client:</p>
				<p>Email: support@beauteelegance.com | Téléphone: +213 XX XXX XXXX</p>
			</div>
			<div class="footer-info">
				<p>&copy; {new Date().getFullYear()} Beaute & Elegance. Tous droits réservés.</p>
			</div>
		</div>
	</div>
</div>

<style>
	.invoice-wrapper {
		position: relative;
	}

	.print-btn {
		background: #f1dada;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-size: 1.5rem;
		cursor: pointer;
		margin-bottom: 2rem;
		transition: 0.3s;
		font-weight: 500;
	}

	.print-btn:hover {
		background: #fff;
		outline: 2px solid #b37777;
		color: #b37777;
	}

	.invoice {
		background: #fff;
		padding: 3rem;
		border: 1px solid #f0d9d9;
		border-radius: 8px;
		max-width: 900px;
		margin: 0 auto;
	}

	.invoice-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 3rem;
		border-bottom: 3px solid #f1dada;
		padding-bottom: 2rem;
	}

	.company-info h1 {
		font-family: 'MoonTime';
		font-size: 4rem;
		color: #333;
		margin: 0;
		font-weight: lighter;
		letter-spacing: 0.1rem;
	}

	.company-info p {
		color: #999;
		font-size: 1.4rem;
		margin: 0.5rem 0 0 0;
	}

	.invoice-title h2 {
		font-family: 'Abril Fatface';
		font-size: 3rem;
		color: #333;
		margin: 0;
		text-align: right;
	}

	.invoice-title p {
		text-align: right;
		font-size: 1.4rem;
		color: #666;
		margin: 0.5rem 0;
	}

	.invoice-details {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.section h3 {
		font-family: 'Andada Pro';
		font-size: 1.6rem;
		color: #333;
		margin: 0 0 1rem 0;
		border-bottom: 2px solid #f0d9d9;
		padding-bottom: 0.5rem;
	}

	.info-box {
		background: #fafafa;
		padding: 1.5rem;
		border-radius: 6px;
		border: 1px solid #f0d9d9;
	}

	.info-box p {
		font-size: 1.3rem;
		color: #666;
		margin: 0.3rem 0;
		line-height: 1.6;
	}

	.info-box p strong {
		color: #333;
	}

	.invoice-table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 2rem;
	}

	.invoice-table thead {
		background: #f1dada;
	}

	.invoice-table th {
		padding: 1.5rem;
		text-align: left;
		font-family: 'Andada Pro';
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
		border-bottom: 2px solid #e0c9c9;
	}

	.invoice-table td {
		padding: 1.2rem 1.5rem;
		border-bottom: 1px solid #f0d9d9;
		font-size: 1.4rem;
		color: #666;
	}

	.invoice-table td strong {
		color: #333;
	}

	.invoice-table td small {
		color: #999;
		display: block;
		font-size: 1.2rem;
		margin-top: 0.3rem;
	}

	.invoice-table td.center {
		text-align: center;
	}

	.invoice-table td.right {
		text-align: right;
		font-weight: 600;
		color: #333;
	}

	.invoice-summary {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 3rem;
	}

	.summary-section {
		background: #f0d9d9;
		padding: 2rem;
		border-radius: 8px;
		min-width: 30rem;
		border: 1px solid #e0c9c9;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		padding: 1rem 0;
		border-bottom: 1px solid #e0c9c9;
		font-size: 1.5rem;
	}

	.summary-row:last-child {
		border-bottom: none;
	}

	.summary-row span:first-child {
		color: #666;
	}

	.summary-row span:last-child {
		font-weight: 600;
		color: #333;
		text-align: right;
	}

	.summary-row.total-row {
		font-size: 1.8rem;
		font-weight: 700;
		color: #333;
		padding: 1.5rem 0;
		border-top: 2px solid #333;
		border-bottom: 2px solid #333;
	}

	.summary-row.total-row span:first-child {
		color: #333;
	}

	.invoice-footer {
		text-align: center;
		border-top: 2px solid #f0d9d9;
		padding-top: 2rem;
		margin-top: 3rem;
	}

	.thank-you p {
		font-family: 'Andada Pro';
		font-size: 2rem;
		color: #333;
		margin: 1rem 0;
		font-weight: 500;
	}

	.terms p {
		font-size: 1.3rem;
		color: #666;
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.footer-info p {
		font-size: 1.2rem;
		color: #999;
		margin-top: 2rem;
	}

	@media print {
		.print-btn {
			display: none;
		}

		.invoice {
			border: none;
			box-shadow: none;
			padding: 0;
		}

		.invoice-wrapper {
			background: #fff;
		}

		@page {
			margin: 1cm;
		}
	}

	@media (max-width: 768px) {
		.invoice {
			padding: 1.5rem;
		}

		.invoice-header {
			flex-direction: column;
			gap: 2rem;
		}

		.company-info h1 {
			font-size: 2.5rem;
		}

		.invoice-title h2 {
			font-size: 2rem;
			text-align: left;
		}

		.invoice-title p {
			text-align: left;
		}

		.invoice-details {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.invoice-summary {
			justify-content: center;
		}

		.summary-section {
			min-width: 100%;
		}
	}
</style>
