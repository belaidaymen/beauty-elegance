<script lang="ts">
	import { isAuthenticated } from '$lib/stores/user_store';
	import { onMount } from 'svelte';

	let isAuthChecked = false;

	onMount(() => {
		const unsubscribe = isAuthenticated.subscribe((authenticated) => {
			isAuthChecked = true;
			if (!authenticated) {
				// Redirect to login if not authenticated
				if (typeof window !== 'undefined') {
					window.location.href = '/login';
				}
			}
		});

		return () => unsubscribe();
	});
</script>

{#if isAuthChecked}
	<slot />
{:else}
	<div class="loading">Chargement...</div>
{/if}

<style>
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		font-size: 1.8rem;
		color: #999;
		background: #fafafa;
	}
</style>
