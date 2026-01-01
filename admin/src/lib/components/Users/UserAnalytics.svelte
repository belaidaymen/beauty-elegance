<script lang="ts">
	import { TrendingUp, TrendingDown, Target, Award } from 'lucide-svelte';
	import Card from '../Card.svelte';

	export let users: any[] = [];

	$: stats = {
		totalUsers: users.length,
		activeUsers: users.filter((u) => u.status === 'Active').length,
		totalRevenue: users.reduce((sum, u) => sum + (u.totalSpent || 0), 0),
		averageOrderValue: users.length > 0
			? users.reduce((sum, u) => sum + (u.totalSpent || 0), 0) / users.length
			: 0,
		totalOrders: users.reduce((sum, u) => sum + (u.totalOrders || 0), 0),
		averageOrdersPerUser: users.length > 0
			? Math.round((users.reduce((sum, u) => sum + (u.totalOrders || 0), 0) / users.length) * 10) / 10
			: 0,
		topSpender: users.length > 0
			? users.reduce((max, u) => (u.totalSpent > (max.totalSpent || 0) ? u : max), {})
			: null,
		averageRating: users.length > 0
			? (
					users.reduce((sum, u) => sum + (u.averageRating || 0), 0) / users.length
				).toFixed(1)
			: 0
	};

	const getRecentJoined = () => {
		return users
			.filter((u) => u.joinDate)
			.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
			.slice(0, 5);
	};

	const getTopSpenders = () => {
		return users
			.sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0))
			.slice(0, 5);
	};

	const getHighestOrderers = () => {
		return users
			.sort((a, b) => (b.totalOrders || 0) - (a.totalOrders || 0))
			.slice(0, 5);
	};

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'DZD',
			minimumFractionDigits: 0
		}).format(value);
	};

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const getEngagementScore = (user: any) => {
		let score = 0;
		if (user.totalOrders > 5) score += 30;
		else if (user.totalOrders > 2) score += 20;
		else score += 10;

		if (user.totalSpent > 50000) score += 30;
		else if (user.totalSpent > 20000) score += 20;
		else score += 10;

		if (user.feedback && user.feedback.length > 2) score += 20;
		else if (user.feedback && user.feedback.length > 0) score += 10;

		if (user.status === 'Active') score += 20;

		return Math.min(score, 100);
	};
</script>

<div class="analytics-container">
	<!-- Key Metrics -->
	<div class="metrics-grid">
		<div class="metric-card">
			<div class="metric-content">
				<p class="metric-label">Total Users</p>
				<p class="metric-value">{stats.totalUsers}</p>
				<p class="metric-subtitle">Registered customers</p>
			</div>
			<div class="metric-icon">👥</div>
		</div>

		<div class="metric-card">
			<div class="metric-content">
				<p class="metric-label">Active Users</p>
				<p class="metric-value">{stats.activeUsers}</p>
				<p class="metric-subtitle">{stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}% of total</p>
			</div>
			<div class="metric-icon">✅</div>
		</div>

		<div class="metric-card">
			<div class="metric-content">
				<p class="metric-label">Total Revenue</p>
				<p class="metric-value">{formatCurrency(stats.totalRevenue)}</p>
				<p class="metric-subtitle">All-time sales</p>
			</div>
			<div class="metric-icon">💰</div>
		</div>

		<div class="metric-card">
			<div class="metric-content">
				<p class="metric-label">Avg. Order Value</p>
				<p class="metric-value">{formatCurrency(stats.averageOrderValue)}</p>
				<p class="metric-subtitle">Per customer</p>
			</div>
			<div class="metric-icon">📊</div>
		</div>

		<div class="metric-card">
			<div class="metric-content">
				<p class="metric-label">Total Orders</p>
				<p class="metric-value">{stats.totalOrders}</p>
				<p class="metric-subtitle">All purchases</p>
			</div>
			<div class="metric-icon">🛒</div>
		</div>

		<div class="metric-card">
			<div class="metric-content">
				<p class="metric-label">Avg. Orders/User</p>
				<p class="metric-value">{stats.averageOrdersPerUser}</p>
				<p class="metric-subtitle">Per customer</p>
			</div>
			<div class="metric-icon">📈</div>
		</div>
	</div>

	<!-- Top Users -->
	<div class="insights-grid">
		<!-- Top Spenders -->
		<Card title="Top Spenders" subtitle="Highest value customers">
			<div class="leaderboard">
				{#each getTopSpenders() as user, index}
					<div class="leaderboard-item">
						<div class="rank-badge">{index + 1}</div>
						<div class="item-info">
							<p class="item-name">{user.name}</p>
							<p class="item-email">{user.email}</p>
						</div>
						<div class="item-value">{formatCurrency(user.totalSpent || 0)}</div>
					</div>
				{/each}
			</div>
		</Card>

		<!-- Top Customers by Orders -->
		<Card title="Most Active Customers" subtitle="Highest order count">
			<div class="leaderboard">
				{#each getHighestOrderers() as user, index}
					<div class="leaderboard-item">
						<div class="rank-badge">{index + 1}</div>
						<div class="item-info">
							<p class="item-name">{user.name}</p>
							<p class="item-email">{user.email}</p>
						</div>
						<div class="item-value">{user.totalOrders} orders</div>
					</div>
				{/each}
			</div>
		</Card>
	</div>

	<!-- Recently Joined -->
	<Card title="Recently Joined" subtitle="New customer registrations">
		<div class="recent-list">
			{#each getRecentJoined() as user}
				<div class="recent-item">
					<div class="recent-avatar">{user.name.charAt(0).toUpperCase()}</div>
					<div class="recent-info">
						<p class="recent-name">{user.name}</p>
						<p class="recent-date">{formatDate(user.joinDate)}</p>
					</div>
					<div class="recent-status" class:active={user.status === 'Active'}>
						{user.status}
					</div>
				</div>
			{/each}
		</div>
	</Card>

	<!-- Customer Engagement Score -->
	<Card title="Customer Engagement Scores" subtitle="Top engaged customers">
		<div class="engagement-list">
			{#each users
				.map((u) => ({ ...u, engagementScore: getEngagementScore(u) }))
				.sort((a, b) => b.engagementScore - a.engagementScore)
				.slice(0, 10) as user}
				<div class="engagement-item">
					<div class="engagement-info">
						<p class="user-name">{user.name}</p>
						<p class="user-email">{user.email}</p>
					</div>
					<div class="engagement-bar">
						<div
							class="engagement-fill"
							style="width: {user.engagementScore}%"
							class:excellent={user.engagementScore >= 80}
							class:good={user.engagementScore >= 60 && user.engagementScore < 80}
							class:fair={user.engagementScore >= 40 && user.engagementScore < 60}
							class:low={user.engagementScore < 40}
						></div>
					</div>
					<span class="engagement-score">{user.engagementScore}%</span>
				</div>
			{/each}
		</div>
	</Card>
</div>

<style>
	.analytics-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
		gap: 1.5rem;
	}

	.metric-card {
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border: 2px solid #e8e0db;
		border-radius: 1rem;
		padding: 1.8rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.metric-card:hover {
		border-color: #b37777;
		box-shadow: 0 8px 20px rgba(179, 119, 119, 0.12);
		transform: translateY(-2px);
	}

	.metric-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.metric-label {
		font-size: 1.1rem;
		color: #999;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 0.08em;
		margin: 0;
		font-family: 'Andada Pro', serif;
	}

	.metric-value {
		font-size: 2.6rem;
		font-weight: 700;
		color: #333;
		margin: 0;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.metric-subtitle {
		font-size: 1.2rem;
		color: #999;
		margin: 0;
	}

	.metric-icon {
		font-size: 3.2rem;
	}

	.insights-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
		gap: 2rem;
	}

	.leaderboard {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.leaderboard-item {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		padding: 1.2rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
		transition: all 0.2s ease;
	}

	.leaderboard-item:hover {
		border-color: #b37777;
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.08);
	}

	.rank-badge {
		width: 3.2rem;
		height: 3.2rem;
		background: linear-gradient(135deg, #d1b2b2 0%, #b37777 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 1.4rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.item-info {
		flex: 1;
	}

	.item-name {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.item-email {
		font-size: 1.1rem;
		color: #999;
		margin: 0.2rem 0 0 0;
	}

	.item-value {
		font-size: 1.4rem;
		font-weight: 700;
		color: #b37777;
		white-space: nowrap;
	}

	.recent-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.recent-item {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		padding: 1.2rem;
		background: linear-gradient(135deg, #faf9f8 0%, #fdfbf9 100%);
		border-radius: 0.8rem;
		border: 1px solid #e8e0db;
	}

	.recent-avatar {
		width: 2.8rem;
		height: 2.8rem;
		background: linear-gradient(135deg, #d1b2b2 0%, #b37777 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: 700;
		flex-shrink: 0;
	}

	.recent-info {
		flex: 1;
	}

	.recent-name {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.recent-date {
		font-size: 1.1rem;
		color: #999;
		margin: 0.2rem 0 0 0;
	}

	.recent-status {
		padding: 0.4rem 1rem;
		background: #f9f8f8;
		color: #999;
		border-radius: 2rem;
		font-size: 1.1rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.recent-status.active {
		background: rgba(39, 174, 96, 0.12);
		color: #1d6b3c;
	}

	.engagement-list {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.engagement-item {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.engagement-info {
		min-width: 20rem;
	}

	.user-name {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.user-email {
		font-size: 1.1rem;
		color: #999;
		margin: 0.2rem 0 0 0;
	}

	.engagement-bar {
		flex: 1;
		height: 0.8rem;
		background: #e0c8c8;
		border-radius: 0.4rem;
		overflow: hidden;
	}

	.engagement-fill {
		height: 100%;
		border-radius: 0.4rem;
		transition: width 0.3s ease;
	}

	.engagement-fill.excellent {
		background: linear-gradient(90deg, #27ae60, #1d6b3c);
	}

	.engagement-fill.good {
		background: linear-gradient(90deg, #f39c12, #d68910);
	}

	.engagement-fill.fair {
		background: linear-gradient(90deg, #3498db, #2980b9);
	}

	.engagement-fill.low {
		background: linear-gradient(90deg, #e74c3c, #c0392b);
	}

	.engagement-score {
		font-size: 1.3rem;
		font-weight: 700;
		color: #b37777;
		min-width: 4rem;
		text-align: right;
	}

	@media (max-width: 1024px) {
		.insights-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.metrics-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}

		.metric-card {
			padding: 1.2rem;
		}

		.metric-value {
			font-size: 1.8rem;
		}

		.engagement-item {
			flex-direction: column;
			align-items: flex-start;
		}

		.engagement-info {
			min-width: auto;
			width: 100%;
		}

		.engagement-bar {
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.metrics-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
