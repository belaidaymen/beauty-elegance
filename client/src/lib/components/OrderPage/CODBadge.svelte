<script lang="ts">
	// Custom COD badge with elegant design matching the brand
</script>

<div class="cod-badge">
	<div class="badge-content">
		<svg class="badge-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
		</svg>
		<span class="badge-text">COD</span>
	</div>
	<div class="badge-sparkle">✓</div>
</div>

<style>
	.cod-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background: linear-gradient(135deg, #b95959 0%, #9d4949 100%);
		color: white;
		padding: 0.6rem 1.2rem;
		border-radius: 50px;
		box-shadow: 0 4px 12px rgba(185, 89, 89, 0.3);
		font-weight: 700;
		font-size: 1.2rem;
		min-width: fit-content;
		position: relative;
		overflow: hidden;
	}

	.cod-badge::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
		pointer-events: none;
	}

	.badge-content {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		position: relative;
		z-index: 1;
	}

	.badge-icon {
		width: 1.6rem;
		height: 1.6rem;
		animation: bounce 2s ease-in-out infinite;
	}

	.badge-text {
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.badge-sparkle {
		font-size: 1.4rem;
		animation: twinkle 1.5s ease-in-out infinite;
		position: relative;
		z-index: 1;
	}

	@keyframes bounce {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-3px);
		}
	}

	@keyframes twinkle {
		0%, 100% {
			opacity: 0.4;
			transform: scale(0.8);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (max-width: 480px) {
		.cod-badge {
			padding: 0.5rem 1rem;
			font-size: 1rem;
		}

		.badge-icon {
			width: 1.4rem;
			height: 1.4rem;
		}

		.badge-sparkle {
			font-size: 1.2rem;
		}
	}
</style>
