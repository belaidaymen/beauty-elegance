<script lang="ts">
	import type { Order } from '$lib/types';

	export let order: Order;

	const statuses = [
		{ id: 'order-placed', label: 'Commande passée', icon: '📦' },
		{ id: 'processing', label: 'En traitement', icon: '⚙️' },
		{ id: 'shipped', label: 'Expédié', icon: '📤' },
		{ id: 'out-for-delivery', label: 'En livraison', icon: '🚚' },
		{ id: 'delivered', label: 'Livré', icon: '✅' }
	];

	function getStatusIndex(status: string): number {
		return statuses.findIndex((s) => s.id === status);
	}

	function isStatusCompleted(statusId: string): boolean {
		const currentIndex = getStatusIndex(order.deliveryStatus);
		const statusIndex = getStatusIndex(statusId);
		return statusIndex <= currentIndex;
	}

	function isStatusCurrent(statusId: string): boolean {
		return statusId === order.deliveryStatus;
	}
</script>

<div class="delivery-tracking">
	<h3>Suivi de la livraison</h3>
	<div class="timeline">
		{#each statuses as status, index (status.id)}
			<div class="timeline-item">
				<div
					class="timeline-dot"
					class:completed={isStatusCompleted(status.id)}
					class:current={isStatusCurrent(status.id)}
				>
					<span class="dot-icon">{status.icon}</span>
				</div>
				<div class="timeline-line" class:completed={isStatusCompleted(status.id) && index < statuses.length - 1}>
				</div>
				<div class="timeline-content">
					<p class="status-label" class:completed={isStatusCompleted(status.id)}>
						{status.label}
					</p>
					{#if isStatusCurrent(status.id) && order.estimatedDeliveryDate}
						<p class="estimated-date">
							Livraison estimée: {new Date(order.estimatedDeliveryDate).toLocaleDateString('fr-FR')}
						</p>
					{:else if isStatusCompleted(status.id) && order.actualDeliveryDate && isStatusCurrent('delivered')}
						<p class="delivery-date">
							Livré le: {new Date(order.actualDeliveryDate).toLocaleDateString('fr-FR')}
						</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.delivery-tracking {
		background: #fafafa;
		padding: 2.5rem;
		border-radius: 8px;
		border: 1px solid #f0d9d9;
		margin-bottom: 2rem;
	}

	.delivery-tracking h3 {
		font-family: 'Andada Pro';
		font-size: 2rem;
		color: #333;
		margin: 0 0 2rem 0;
		border-bottom: 2px solid #f0d9d9;
		padding-bottom: 1rem;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		position: relative;
	}

	.timeline-item {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
		position: relative;
	}

	.timeline-dot {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		background: #f0d9d9;
		border: 3px solid #e0c9c9;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: 0.3s;
		z-index: 2;
		position: relative;
	}

	.timeline-dot.completed {
		background: #27ae60;
		border-color: #27ae60;
	}

	.timeline-dot.current {
		background: #f1dada;
		border-color: #b37777;
		box-shadow: 0 0 15px rgba(179, 119, 119, 0.3);
	}

	.dot-icon {
		font-size: 2.5rem;
	}

	.timeline-line {
		position: absolute;
		left: 2.4rem;
		top: 5rem;
		width: 0.3rem;
		height: 6.5rem;
		background: #e0c9c9;
		z-index: 1;
	}

	.timeline-line.completed {
		background: #27ae60;
	}

	.timeline-item:last-child .timeline-line {
		display: none;
	}

	.timeline-content {
		padding-top: 0.5rem;
		flex: 1;
	}

	.status-label {
		font-size: 1.6rem;
		font-weight: 600;
		color: #999;
		margin: 0 0 0.5rem 0;
		transition: 0.3s;
	}

	.status-label.completed {
		color: #333;
		font-weight: 700;
	}

	.estimated-date,
	.delivery-date {
		font-size: 1.4rem;
		color: #b37777;
		margin: 0;
		font-weight: 500;
	}

	.delivery-date {
		color: #27ae60;
	}

	@media (max-width: 768px) {
		.delivery-tracking {
			padding: 1.5rem;
		}

		.timeline-item {
			gap: 1.5rem;
		}

		.timeline-dot {
			width: 4rem;
			height: 4rem;
		}

		.dot-icon {
			font-size: 2rem;
		}

		.timeline-line {
			left: 1.85rem;
			top: 4rem;
			height: 5.5rem;
		}

		.status-label {
			font-size: 1.4rem;
		}
	}
</style>
