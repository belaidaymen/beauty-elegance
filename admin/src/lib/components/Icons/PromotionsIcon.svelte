<script lang="ts">
	export let size: number = 24;
	export let color: string = 'currentColor';
	export let strokeWidth: number = 1.5;
</script>

<svg
	{size}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke={color}
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	class="icon"
>
	<path d="M7 4v16h10V4H7z" />
	<circle cx="12" cy="7" r="2" />
	<circle cx="12" cy="17" r="2" />
	<line x1="7" y1="12" x2="17" y2="12" />
	<path d="M3 4h4v4H3z" />
	<path d="M17 16h4v4h-4z" />
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
	}
</style>
