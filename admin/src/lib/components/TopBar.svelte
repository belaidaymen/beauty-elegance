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
		padding: 1.5rem 2rem;
		background: #fff;
		border-bottom: 1px solid #e8e0db;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
		height: 7rem;
	}

	.topbar-left {
		flex: 1;
	}

	.page-title {
		font-family: 'Andada Pro', serif;
		font-size: 2.4rem;
		font-weight: 500;
		color: #333;
		letter-spacing: 0.01em;
	}

	.topbar-right {
		display: flex;
		align-items: center;
		gap: 2.5rem;
	}

	.search-box {
		position: relative;
		width: 26rem;
	}

	.search-input {
		width: 100%;
		padding: 0.85rem 1.2rem 0.85rem 3.2rem;
		border: 1px solid #e8e0db;
		border-radius: 0.7rem;
		background: #faf9f8;
		font-size: 1.4rem;
		color: #666;
		transition: all 0.2s ease;
	}

	.search-input::placeholder {
		color: #999;
	}

	.search-input:hover {
		border-color: #d1b2b2;
		background: #fff;
	}

	.search-input:focus {
		outline: none;
		border-color: #b37777;
		background: #fff;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.08);
	}

	.search-icon-wrapper {
		position: absolute;
		left: 1.2rem;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
	}

	.user-menu {
		position: relative;
	}

	.user-btn {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		background: #faf9f8;
		border: 1.5px solid #e8e0db;
		border-radius: 2.2rem;
		padding: 0.7rem 1.4rem;
		transition: all 0.2s ease;
		font-size: 1.4rem;
		cursor: pointer;
	}

	.user-btn:hover {
		border-color: #b37777;
		background: #fff;
	}

	.user-avatar {
		width: 3.2rem;
		height: 3.2rem;
		background: linear-gradient(135deg, #d1b2b2, #b37777);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: 600;
		font-size: 1.4rem;
		flex-shrink: 0;
	}

	.user-name {
		font-weight: 500;
		color: #333;
	}

	.user-dropdown {
		position: absolute;
		top: calc(100% + 0.8rem);
		right: 0;
		background: #fff;
		border: 1px solid #e8e0db;
		border-radius: 0.8rem;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
		z-index: 100;
		min-width: 16rem;
		overflow: hidden;
	}

	.dropdown-item {
		display: block;
		width: 100%;
		padding: 1.1rem 1.6rem;
		text-align: left;
		background: none;
		border: none;
		color: #666;
		font-size: 1.4rem;
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.dropdown-item:hover {
		background: #faf9f8;
		color: #b37777;
	}

	.logout-btn {
		color: #c94444;
	}

	.logout-btn:hover {
		background: rgba(201, 68, 68, 0.08);
		color: #b33a3a;
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
