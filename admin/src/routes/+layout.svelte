<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Andada+Pro:ital@0;1&display=swap"
		rel="stylesheet"
	/>
	<title>Beaute & Elegance - Admin Dashboard</title>
</svelte:head>

<div class="admin-container">
	<Sidebar />
	<div class="main-content">
		<TopBar />
		<main>
			<slot />
		</main>
	</div>
</div>

<style>
	.admin-container {
		display: flex;
		height: 100vh;
		width: 100%;
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	main {
		flex: 1;
		overflow-y: auto;
		background: #fafafa;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.admin-container {
			flex-direction: column;
		}

		main {
			max-height: calc(100vh - 6rem);
		}
	}
</style>
