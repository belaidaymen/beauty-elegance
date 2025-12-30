<script lang="ts">
	export let size: number = 24;
	export let color: string = 'currentColor';
	export let strokeWidth: number = 2;
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
	<polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
	<polyline points="23 18 23 12 17 12" />
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
	}
</style>
