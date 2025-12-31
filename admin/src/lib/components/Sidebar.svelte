<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/assets/logo.png';
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
		<div class="brand-container">
			<img src={logo} alt="Beaute & Elegance Logo" class="brand-logo" />
			<div class="brand-text">
				<h2 class="brand-title">Beaute & Elegance</h2>
				<p class="brand-subtitle">Admin Panel</p>
			</div>
		</div>
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
		width: 28rem;
		background: linear-gradient(180deg, #faf9f8 0%, #fdfbf9 100%);
		border-right: 2px solid #f0d9d9;
		display: flex;
		flex-direction: column;
		box-shadow: 4px 0 16px rgba(0, 0, 0, 0.06);
		overflow-y: auto;
		transition: all 0.3s ease;
	}

	.sidebar-header {
		padding: 3rem 2.2rem 2.2rem;
		border-bottom: 2px solid #f0d9d9;
		text-align: center;
		background: linear-gradient(180deg, rgba(209, 178, 178, 0.05), transparent);
	}

	.brand-title {
		font-family: 'Abril Fatface', serif;
		font-size: 2.8rem;
		font-weight: 400;
		color: #2a2a2a;
		margin-bottom: 0.4rem;
		letter-spacing: -0.01em;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.brand-subtitle {
		font-size: 1.2rem;
		color: #888;
		font-weight: 600;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		font-family: 'Andada Pro', serif;
	}

	.sidebar-nav {
		flex: 1;
		padding: 1.8rem 0;
		overflow-y: auto;
	}

	.nav-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 1.4rem;
		padding: 1.1rem 1.8rem;
		color: #666;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		border-left: 4px solid transparent;
		font-size: 1.5rem;
		font-weight: 500;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.nav-link:hover {
		background: linear-gradient(90deg, rgba(179, 119, 119, 0.1), transparent);
		color: #b37777;
		border-left-color: #d1b2b2;
		padding-left: 2rem;
	}

	.nav-link.active {
		background: linear-gradient(90deg, rgba(179, 119, 119, 0.18), transparent);
		color: #8b5555;
		border-left-color: #b37777;
		font-weight: 700;
		box-shadow: inset -2px 0 0 rgba(179, 119, 119, 0.2);
	}

	.nav-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.6rem;
		height: 2.6rem;
		flex-shrink: 0;
		color: currentColor;
		transition: all 0.3s ease;
		background: rgba(179, 119, 119, 0.08);
		border-radius: 0.8rem;
	}

	.nav-link:hover .nav-icon,
	.nav-link.active .nav-icon {
		background: rgba(179, 119, 119, 0.15);
		transform: scale(1.1);
	}

	.nav-label {
		font-size: 1.5rem;
		font-weight: 500;
	}

	.sidebar-footer {
		padding: 1.8rem 2.2rem;
		border-top: 2px solid #f0d9d9;
		background: linear-gradient(180deg, transparent, rgba(209, 178, 178, 0.04));
	}

	.footer-info {
		text-align: center;
	}

	.footer-text {
		font-size: 1.4rem;
		font-weight: 700;
		color: #2a2a2a;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.footer-subtext {
		font-size: 1.2rem;
		color: #999;
		margin-top: 0.5rem;
		font-family: 'Andada Pro', serif;
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
