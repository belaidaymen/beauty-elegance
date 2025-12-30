<script lang="ts">
	import { page } from '$app/stores';

	interface NavItem {
		label: string;
		path: string;
		icon: string;
	}

	const navItems: NavItem[] = [
		{ label: 'Dashboard', path: '/', icon: '📊' },
		{ label: 'Products', path: '/products', icon: '📦' },
		{ label: 'Orders', path: '/orders', icon: '🛒' },
		{ label: 'Stock', path: '/stock', icon: '📈' },
		{ label: 'Promotions', path: '/promotions', icon: '🎯' },
		{ label: 'Users', path: '/users', icon: '👥' },
		{ label: 'Settings', path: '/settings', icon: '⚙️' }
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
						<span class="nav-icon">{item.icon}</span>
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
		width: 25rem;
		background: linear-gradient(135deg, #f0d9d9 0%, #f5e6e6 100%);
		border-right: 1px solid #e0c8c8;
		display: flex;
		flex-direction: column;
		box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
		overflow-y: auto;
		transition: all 0.3s ease;
	}

	.sidebar-header {
		padding: 2rem;
		border-bottom: 2px solid #d1b2b2;
		text-align: center;
	}

	.brand-title {
		font-family: 'MoonTime';
		font-size: 2.8rem;
		font-weight: lighter;
		color: #333;
		margin-bottom: 0.5rem;
	}

	.brand-subtitle {
		font-size: 1.2rem;
		color: #888;
		font-weight: 300;
		letter-spacing: 0.1rem;
	}

	.sidebar-nav {
		flex: 1;
		padding: 2rem 0;
		overflow-y: auto;
	}

	.nav-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1.2rem 2rem;
		color: #333;
		transition: all 0.3s ease;
		position: relative;
		border-left: 3px solid transparent;
	}

	.nav-link:hover {
		background: rgba(209, 178, 178, 0.3);
		border-left-color: #d1b2b2;
	}

	.nav-link.active {
		background: rgba(209, 178, 178, 0.5);
		border-left-color: #b37777;
		font-weight: 600;
	}

	.nav-icon {
		font-size: 2rem;
		display: flex;
		align-items: center;
	}

	.nav-label {
		font-size: 1.5rem;
		font-weight: 500;
	}

	.sidebar-footer {
		padding: 1.5rem 2rem;
		border-top: 1px solid #d1b2b2;
		background: rgba(255, 255, 255, 0.5);
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
		color: #888;
		margin-top: 0.3rem;
	}

	.mobile-toggle {
		display: none;
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 1000;
		background: #f0d9d9;
		border: 2px solid #d1b2b2;
		border-radius: 0.4rem;
		padding: 0.8rem 1rem;
		font-size: 2rem;
		color: #333;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.sidebar-overlay {
		display: none;
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
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
			padding: 1rem 1.5rem;
		}

		.nav-label {
			font-size: 1.3rem;
		}
	}
</style>
