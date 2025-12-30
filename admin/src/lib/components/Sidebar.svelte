<script lang="ts">
	import { page } from '$app/stores';
	import DashboardIcon from './Icons/DashboardIcon.svelte';
	import ProductsIcon from './Icons/ProductsIcon.svelte';
	import OrdersIcon from './Icons/OrdersIcon.svelte';
	import StockIcon from './Icons/StockIcon.svelte';
	import PromotionsIcon from './Icons/PromotionsIcon.svelte';
	import UsersIcon from './Icons/UsersIcon.svelte';
	import SettingsIcon from './Icons/SettingsIcon.svelte';

	interface NavItem {
		label: string;
		path: string;
		icon: any;
	}

	const navItems: NavItem[] = [
		{ label: 'Dashboard', path: '/', icon: DashboardIcon },
		{ label: 'Products', path: '/products', icon: ProductsIcon },
		{ label: 'Orders', path: '/orders', icon: OrdersIcon },
		{ label: 'Stock', path: '/stock', icon: StockIcon },
		{ label: 'Promotions', path: '/promotions', icon: PromotionsIcon },
		{ label: 'Users', path: '/users', icon: UsersIcon },
		{ label: 'Settings', path: '/settings', icon: SettingsIcon }
	];

	let isMobileOpen = false;

	const isActive = (path: string) => $page.url.pathname === path;
</script>

<aside class="sidebar" class:mobile-open={isMobileOpen}>
	<div class="sidebar-header">
		<h2 class="brand-title">Beaute & Elegance</h2>
		<p class="brand-subtitle">Admin Panel</p>
	</div>

	<nav class="sidebar-nav">
		<ul class="nav-list">
			{#each navItems as item (item.path)}
				<li>
					<a
						href={item.path}
						class="nav-link"
						class:active={isActive(item.path)}
						on:click={() => (isMobileOpen = false)}
					>
						<span class="nav-icon">
							<svelte:component this={item.icon} size={22} color="currentColor" />
						</span>
						<span class="nav-label">{item.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="sidebar-footer">
		<div class="footer-info">
			<p class="footer-text">Admin User</p>
			<p class="footer-subtext">Active</p>
		</div>
	</div>
</aside>

<button
	class="mobile-toggle"
	on:click={() => (isMobileOpen = !isMobileOpen)}
	aria-label="Toggle sidebar"
>
	☰
</button>

{#if isMobileOpen}
	<div class="sidebar-overlay" on:click={() => (isMobileOpen = false)} role="presentation" />
{/if}

<style>
	.sidebar {
		width: 26rem;
		background: #faf9f8;
		border-right: 1px solid #e8e0db;
		display: flex;
		flex-direction: column;
		box-shadow: 2px 0 10px rgba(0, 0, 0, 0.04);
		overflow-y: auto;
		transition: all 0.3s ease;
	}

	.sidebar-header {
		padding: 2.5rem 2rem 2rem;
		border-bottom: 1px solid #e8e0db;
		text-align: center;
	}

	.brand-title {
		font-family: 'Andada Pro', serif;
		font-size: 2.6rem;
		font-weight: 400;
		color: #333;
		margin-bottom: 0.3rem;
		letter-spacing: 0.02em;
	}

	.brand-subtitle {
		font-size: 1.1rem;
		color: #999;
		font-weight: 400;
		letter-spacing: 0.15em;
		text-transform: uppercase;
	}

	.sidebar-nav {
		flex: 1;
		padding: 1.5rem 0;
		overflow-y: auto;
	}

	.nav-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		padding: 1rem 1.8rem;
		color: #666;
		transition: all 0.2s ease;
		position: relative;
		border-left: 3px solid transparent;
		font-size: 1.4rem;
		font-weight: 500;
	}

	.nav-link:hover {
		background: rgba(179, 119, 119, 0.08);
		color: #b37777;
		border-left-color: #d1b2b2;
	}

	.nav-link.active {
		background: rgba(179, 119, 119, 0.15);
		color: #b37777;
		border-left-color: #b37777;
		font-weight: 600;
	}

	.nav-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.4rem;
		height: 2.4rem;
		flex-shrink: 0;
		color: currentColor;
	}

	.nav-label {
		font-size: 1.4rem;
		font-weight: 500;
	}

	.sidebar-footer {
		padding: 1.5rem 2rem;
		border-top: 1px solid #e8e0db;
		background: #fefdfb;
	}

	.footer-info {
		text-align: center;
	}

	.footer-text {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
	}

	.footer-subtext {
		font-size: 1.1rem;
		color: #999;
		margin-top: 0.4rem;
	}

	.mobile-toggle {
		display: none;
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 1000;
		background: #fff;
		border: 2px solid #d1b2b2;
		border-radius: 0.6rem;
		padding: 0.8rem 1rem;
		font-size: 1.8rem;
		color: #b37777;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.mobile-toggle:hover {
		background: #f9f8f8;
		border-color: #b37777;
	}

	.sidebar-overlay {
		display: none;
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 499;
	}

	@media (max-width: 768px) {
		.sidebar {
			position: fixed;
			height: 100vh;
			left: 0;
			top: 0;
			z-index: 500;
			transform: translateX(-100%);
			transition: transform 0.3s ease;
			width: 70vw;
		}

		.sidebar.mobile-open {
			transform: translateX(0);
		}

		.mobile-toggle {
			display: block;
		}

		.sidebar-overlay {
			display: block;
		}
	}

	@media (max-width: 480px) {
		.sidebar {
			width: 80vw;
		}

		.brand-title {
			font-size: 2.2rem;
		}

		.nav-link {
			padding: 0.9rem 1.5rem;
			gap: 1rem;
		}

		.nav-label {
			font-size: 1.3rem;
		}

		.nav-icon {
			width: 2.2rem;
			height: 2.2rem;
		}
	}
</style>
