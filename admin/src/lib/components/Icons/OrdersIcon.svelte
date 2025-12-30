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
	<path d="M9 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8" />
	<polyline points="9 2 9 8 15 8" />
	<line x1="7" y1="10" x2="17" y2="10" />
	<line x1="7" y1="14" x2="17" y2="14" />
	<line x1="7" y1="18" x2="17" y2="18" />
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
	}
</style>
