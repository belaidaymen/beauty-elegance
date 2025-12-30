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
				<span class="user-avatar">👤</span>
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
		border-bottom: 1px solid #e0c8c8;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
		height: 7rem;
	}

	.topbar-left {
		flex: 1;
	}

	.page-title {
		font-family: 'Andada Pro';
		font-size: 2.4rem;
		font-weight: 600;
		color: #333;
	}

	.topbar-right {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.search-box {
		position: relative;
		width: 25rem;
	}

	.search-input {
		width: 100%;
		padding: 0.8rem 1rem 0.8rem 2.5rem;
		border: 1px solid #d1b2b2;
		border-radius: 0.6rem;
		background: #f9f8f8;
		font-size: 1.4rem;
		transition: all 0.3s ease;
	}

	.search-input:focus {
		outline: none;
		border-color: #b37777;
		background: #fff;
		box-shadow: 0 0 0 2px rgba(179, 119, 119, 0.1);
	}

	.search-icon {
		position: absolute;
		left: 0.8rem;
		top: 50%;
		transform: translateY(-50%);
		font-size: 1.4rem;
	}

	.user-menu {
		position: relative;
	}

	.user-btn {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		background: transparent;
		border: 2px solid #d1b2b2;
		border-radius: 2rem;
		padding: 0.6rem 1.2rem;
		transition: all 0.3s ease;
		font-size: 1.4rem;
	}

	.user-btn:hover {
		border-color: #b37777;
		background: rgba(209, 178, 178, 0.1);
	}

	.user-avatar {
		font-size: 2rem;
	}

	.user-name {
		font-weight: 600;
		color: #333;
	}

	.user-dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		background: #fff;
		border: 1px solid #d1b2b2;
		border-radius: 0.6rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 100;
		min-width: 15rem;
		margin-top: 0.5rem;
		overflow: hidden;
	}

	.dropdown-item {
		display: block;
		width: 100%;
		padding: 1rem 1.5rem;
		text-align: left;
		background: none;
		border: none;
		color: #333;
		font-size: 1.4rem;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.dropdown-item:hover {
		background: rgba(209, 178, 178, 0.2);
		color: #b37777;
	}

	.logout-btn {
		color: #d9534f;
	}

	.logout-btn:hover {
		background: rgba(217, 83, 79, 0.1);
		color: #c9302c;
	}

	@media (max-width: 768px) {
		.topbar {
			padding: 1rem 1.5rem;
			height: 6rem;
			flex-wrap: wrap;
		}

		.search-box {
			width: 100%;
			flex-basis: 100%;
			order: 3;
		}

		.page-title {
			font-size: 1.8rem;
		}

		.topbar-right {
			gap: 1rem;
		}
	}

	@media (max-width: 480px) {
		.search-box {
			width: 100%;
		}

		.search-input {
			padding: 0.6rem 1rem 0.6rem 2.3rem;
			font-size: 1.2rem;
		}

		.user-btn {
			padding: 0.5rem 0.8rem;
			font-size: 1.2rem;
		}

		.user-name {
			display: none;
		}
	}
</style>
