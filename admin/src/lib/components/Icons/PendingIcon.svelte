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
	<circle cx="12" cy="12" r="10" />
	<polyline points="12 6 12 12 16 14" />
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
	}
</style>
