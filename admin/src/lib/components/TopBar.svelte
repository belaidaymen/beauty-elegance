<script lang="ts">
	import { page } from '$app/stores';
	import SearchIcon from './Icons/SearchIcon.svelte';

	let searchQuery = '';
	let showUserMenu = false;

	const getTitleFromPath = (pathname: string) => {
		const path = pathname.split('/').filter(Boolean)[0] || '';
		const titles: Record<string, string> = {
			'': 'Dashboard',
			'products': 'Products',
			'orders': 'Orders',
			'stock': 'Stock',
			'promotions': 'Promotions',
			'users': 'Users',
			'settings': 'Settings'
		};
		return titles[path] || 'Dashboard';
	};

	const handleSearch = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			console.log('Search:', searchQuery);
		}
	};
</script>

<div class="topbar">
	<div class="topbar-left">
		<h1 class="page-title">{getTitleFromPath($page.url.pathname)}</h1>
	</div>

	<div class="topbar-right">
		<div class="search-box">
			<input
				type="text"
				placeholder="Search..."
				bind:value={searchQuery}
				on:keydown={handleSearch}
				class="search-input"
			/>
			<span class="search-icon-wrapper">
				<SearchIcon size={18} color="#999" />
			</span>
		</div>

		<div class="user-menu">
			<button class="user-btn" on:click={() => (showUserMenu = !showUserMenu)}>
				<span class="user-avatar">A</span>
				<span class="user-name">Admin</span>
			</button>

			{#if showUserMenu}
				<div class="user-dropdown">
					<a href="/settings" class="dropdown-item">Settings</a>
					<a href="/settings?section=profile" class="dropdown-item">Profile</a>
					<button class="dropdown-item logout-btn" on:click={() => (showUserMenu = false)}>
						Logout
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.8rem 2.5rem;
		background: linear-gradient(90deg, #fff 0%, #fefdfb 100%);
		border-bottom: 2px solid #f0d9d9;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
		height: 7.5rem;
		position: relative;
	}

	.topbar::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(179, 119, 119, 0.2), transparent);
	}

	.topbar-left {
		flex: 1;
	}

	.page-title {
		font-family: 'Abril Fatface', serif;
		font-size: 2.6rem;
		font-weight: 400;
		color: #2a2a2a;
		letter-spacing: -0.01em;
		background: linear-gradient(135deg, #333 0%, #b37777 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.topbar-right {
		display: flex;
		align-items: center;
		gap: 3rem;
	}

	.search-box {
		position: relative;
		width: 28rem;
	}

	.search-input {
		width: 100%;
		padding: 0.95rem 1.4rem 0.95rem 3.6rem;
		border: 2px solid transparent;
		border-image: linear-gradient(90deg, #e8e0db, #f0d9d9) 1;
		border-radius: 0.9rem;
		background: rgba(255, 255, 255, 0.7);
		font-size: 1.5rem;
		color: #666;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.search-input::placeholder {
		color: #aaa;
	}

	.search-input:hover {
		border-color: #d1b2b2;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
	}

	.search-input:focus {
		outline: none;
		border-color: #b37777;
		background: #fff;
		box-shadow: 0 0 0 4px rgba(179, 119, 119, 0.1);
	}

	.search-icon-wrapper {
		position: absolute;
		left: 1.4rem;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #b37777;
		opacity: 0.8;
	}

	.user-menu {
		position: relative;
	}

	.user-btn {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: linear-gradient(135deg, rgba(240, 217, 217, 0.5), rgba(255, 255, 255, 0.7));
		border: 2px solid transparent;
		border-image: linear-gradient(90deg, #e8e0db, #f0d9d9) 1;
		border-radius: 2.4rem;
		padding: 0.8rem 1.8rem;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		font-size: 1.5rem;
		cursor: pointer;
		font-family: 'Andada Pro', serif;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	.user-btn:hover {
		border-color: #b37777;
		background: linear-gradient(135deg, rgba(209, 178, 178, 0.15), #fff);
		box-shadow: 0 6px 16px rgba(179, 119, 119, 0.12);
		transform: translateY(-2px);
	}

	.user-avatar {
		width: 3.6rem;
		height: 3.6rem;
		background: linear-gradient(135deg, #d1b2b2, #9d5f5f);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: 700;
		font-size: 1.6rem;
		flex-shrink: 0;
		box-shadow: 0 4px 12px rgba(179, 119, 119, 0.25);
		font-family: 'Andada Pro', serif;
	}

	.user-name {
		font-weight: 600;
		color: #2a2a2a;
		font-family: 'Andada Pro', serif;
	}

	.user-dropdown {
		position: absolute;
		top: calc(100% + 1rem);
		right: 0;
		background: linear-gradient(135deg, #fff 0%, #fefdfb 100%);
		border: 2px solid #f0d9d9;
		border-radius: 1rem;
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
		z-index: 100;
		min-width: 18rem;
		overflow: hidden;
		backdrop-filter: blur(10px);
	}

	.dropdown-item {
		display: block;
		width: 100%;
		padding: 1.2rem 1.8rem;
		text-align: left;
		background: none;
		border: none;
		color: #666;
		font-size: 1.5rem;
		transition: all 0.3s ease;
		cursor: pointer;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
		font-weight: 500;
		border-bottom: 1px solid rgba(240, 217, 217, 0.5);
	}

	.dropdown-item:last-child {
		border-bottom: none;
	}

	.dropdown-item:hover {
		background: linear-gradient(90deg, rgba(209, 178, 178, 0.1), transparent);
		color: #8b5555;
	}

	.logout-btn {
		color: #9d5555;
	}

	.logout-btn:hover {
		background: linear-gradient(90deg, rgba(201, 68, 68, 0.1), transparent);
		color: #7a3a3a;
	}

	@media (max-width: 768px) {
		.topbar {
			padding: 1.2rem 1.5rem;
			height: 6.5rem;
			flex-wrap: wrap;
		}

		.search-box {
			width: 100%;
			flex-basis: 100%;
			order: 3;
			margin-top: 0.8rem;
		}

		.page-title {
			font-size: 2rem;
		}

		.topbar-right {
			gap: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.search-box {
			width: 100%;
		}

		.search-input {
			padding: 0.75rem 1rem 0.75rem 2.8rem;
			font-size: 1.3rem;
		}

		.user-btn {
			padding: 0.6rem 1rem;
			font-size: 1.3rem;
		}

		.user-avatar {
			width: 2.8rem;
			height: 2.8rem;
			font-size: 1.2rem;
		}

		.user-name {
			display: none;
		}

		.page-title {
			font-size: 1.8rem;
		}
	}
</style>
