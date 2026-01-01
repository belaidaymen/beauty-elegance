<script lang="ts">
	import { Star, MessageSquare } from 'lucide-svelte';
	import Card from '../Card.svelte';

	export let feedback: any[] = [];

	const getRatingStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => i < rating);
	};

	const getAverageRating = () => {
		if (feedback.length === 0) return 0;
		return Math.round((feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length) * 10) / 10;
	};

	const getRatingCount = (rating: number) => {
		return feedback.filter((f) => f.rating === rating).length;
	};

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	$: totalFeedback = feedback.length;
	$: averageRating = getAverageRating();
</script>

<Card title="Customer Feedback & Reviews" subtitle="All reviews and feedback from this customer">
	<div class="feedback-stats">
		<div class="stat-item">
			<span class="stat-label">Total Reviews</span>
			<span class="stat-value">{totalFeedback}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Average Rating</span>
			<div class="rating-display">
				<span class="rating-value">{averageRating}</span>
				<div class="stars-inline">
					{#each getRatingStars(Math.round(parseFloat(averageRating as string))) as filled}
						<Star size={16} fill={filled ? '#f39c12' : 'none'} color={filled ? '#f39c12' : '#ddd'} />
					{/each}
				</div>
			</div>
		</div>
	</div>

	{#if feedback.length === 0}
		<div class="empty-state">
			<MessageSquare size={48} />
			<p>No feedback yet</p>
		</div>
	{:else}
		<div class="rating-distribution">
			<h3 class="dist-title">Rating Distribution</h3>
			<div class="distribution-bars">
				{#each [5, 4, 3, 2, 1] as rating}
					<div class="bar-item">
						<div class="bar-label">
							<span>{rating}</span>
							<div class="stars-small">
								{#each { length: rating } as _}
									<Star size={12} fill="#f39c12" color="#f39c12" />
								{/each}
							</div>
						</div>
						<div class="bar-container">
							<div
								class="bar-fill"
								style="width: {getRatingCount(rating) > 0
									? (getRatingCount(rating) / Math.max(...[5, 4, 3, 2, 1].map(getRatingCount), 1)) * 100
									: 0}%"
							></div>
						</div>
						<span class="bar-count">{getRatingCount(rating)}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="reviews-list">
			{#each feedback as review (review.id)}
				<div class="review-item">
					<div class="review-header">
						<div class="review-product">
							<h4 class="product-name">{review.productName}</h4>
							<p class="product-sku">SKU: {review.sku}</p>
						</div>
						<div class="review-meta">
							<span class="review-date">{formatDate(review.reviewDate)}</span>
							<div class="review-stars">
								{#each getRatingStars(review.rating) as filled}
									<Star size={18} fill={filled ? '#f39c12' : 'none'} color={filled ? '#f39c12' : '#ddd'} />
								{/each}
							</div>
						</div>
					</div>

					{#if review.title}
						<h5 class="review-title">{review.title}</h5>
					{/if}

					{#if review.comment}
						<p class="review-comment">{review.comment}</p>
					{/if}

					{#if review.verifiedPurchase}
						<span class="verified-badge">✓ Verified Purchase</span>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</Card>

<style>
	.feedback-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.stat-label {
		font-size: 1.1rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 700;
		color: #333;
	}

	.rating-display {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.rating-value {
		font-size: 2.4rem;
		font-weight: 700;
		color: #b37777;
	}

	.stars-inline {
		display: flex;
		gap: 0.3rem;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 2rem;
		text-align: center;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 2px dashed #e8e0db;
		color: #999;
	}

	.empty-state svg {
		margin-bottom: 1rem;
		color: #ddd;
	}

	.empty-state p {
		font-size: 1.4rem;
		margin: 0;
	}

	.rating-distribution {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.dist-title {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 1.5rem 0;
	}

	.distribution-bars {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.bar-item {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.bar-label {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-width: 6rem;
		font-size: 1.1rem;
		color: #333;
		font-weight: 600;
	}

	.stars-small {
		display: flex;
		gap: 0.2rem;
	}

	.bar-container {
		flex: 1;
		height: 0.8rem;
		background: #e0c8c8;
		border-radius: 0.4rem;
		overflow: hidden;
	}

	.bar-fill {
		height: 100%;
		background: linear-gradient(90deg, #f39c12, #e67e22);
		border-radius: 0.4rem;
		transition: width 0.3s ease;
	}

	.bar-count {
		min-width: 2rem;
		text-align: right;
		color: #999;
		font-weight: 600;
	}

	.reviews-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.review-item {
		padding: 1.5rem;
		background: linear-gradient(135deg, #fafbff 0%, #f9f8f8 100%);
		border: 1px solid #e8e0db;
		border-radius: 0.8rem;
		transition: all 0.2s ease;
	}

	.review-item:hover {
		border-color: #b37777;
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.08);
	}

	.review-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #e8e0db;
	}

	.review-product {
		flex: 1;
	}

	.product-name {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 0.3rem 0;
	}

	.product-sku {
		font-size: 1.1rem;
		color: #999;
		margin: 0;
	}

	.review-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.8rem;
	}

	.review-date {
		font-size: 1.1rem;
		color: #999;
		font-weight: 500;
	}

	.review-stars {
		display: flex;
		gap: 0.3rem;
	}

	.review-title {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 0.8rem 0;
	}

	.review-comment {
		font-size: 1.3rem;
		color: #666;
		line-height: 1.6;
		margin: 0 0 1rem 0;
	}

	.verified-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.8rem;
		background: rgba(39, 174, 96, 0.12);
		color: #1d6b3c;
		border: 1px solid rgba(39, 174, 96, 0.3);
		border-radius: 0.4rem;
		font-size: 1.1rem;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.feedback-stats {
			grid-template-columns: 1fr;
		}

		.review-header {
			flex-direction: column;
		}

		.review-meta {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
</style>
