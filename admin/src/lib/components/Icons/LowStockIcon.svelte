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
	<path d="M2 8c0-1 .895-2 2-2h16c1.105 0 2 .895 2 2v3H2V8z" />
	<rect x="2" y="11" width="20" height="8" rx="1" />
	<path d="M6 19v2M10 19v2M14 19v2M18 19v2" stroke-width={strokeWidth} />
	<path d="M8 15h8" stroke-width={strokeWidth} />
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
	}
</style>
