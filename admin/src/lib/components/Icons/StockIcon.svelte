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
	<line x1="12" y1="5" x2="12" y2="19" />
	<polyline points="19 12 12 19 5 12" />
	<polyline points="19 6 12 13 5 6" />
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
	}
</style>
