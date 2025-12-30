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
	<rect x="3" y="3" width="7" height="7" />
	<rect x="14" y="3" width="7" height="7" />
	<rect x="14" y="14" width="7" height="7" />
	<rect x="3" y="14" width="7" height="7" />
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
	}
</style>
