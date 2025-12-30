<script lang="ts">
	import photo1 from '$lib/assets/Sample Imgs/Top Slider Imgs/photo_1.png';
	import photo2 from '$lib/assets/Sample Imgs/Top Slider Imgs/photo_2.jpg';
	import photo4 from '$lib/assets/Sample Imgs/Top Slider Imgs/photo_4.jpg';
	import LeftArrow from './LeftArrow.svelte';
	import RightArrow from './RightArrow.svelte';
	import ScrollDownArrow from './ScrollDownArrow.svelte';

	const photos = [photo2, photo1, photo4];
	let i = 0;
	let autoSlide = setInterval(moveToRight, 3000);

	function moveToRight() {
		clearInterval(autoSlide);
		autoSlide = setInterval(moveToRight, 3000);

		if (-i !== photos.length - 1) {
			i--;

			return;
		}

		i = 0;
	}

	function moveToLeft() {
		clearInterval(autoSlide);
		autoSlide = setInterval(moveToRight, 3000);

		if (i !== 0) {
			i++;

			return;
		}

		i = -(photos.length - 1);
	}
</script>

<div class="container">
	<div class="imgs-container">
		{#each photos as photo (photo)}
			<img src={photo} style="transform: translateX({i * 100}%);" alt="img" />
		{/each}
	</div>

	<div class="arrows-container">
		<LeftArrow on:click={moveToLeft} />
		<RightArrow on:click={moveToRight} />
	</div>

	<div class="bullets-container">
		{#each { length: photos.length } as _, j (j)}
			<button on:click={() => (i = -j)} class="bullet" class:active-slide-bullet={Math.abs(i) === j}
			></button>
		{/each}
	</div>

	<ScrollDownArrow />
</div>

<style>
	.container {
		height: 70vw;
		max-height: 65rem;
		position: relative;
		top: 16rem;
	}

	.imgs-container {
		height: 100%;
		display: flex;
		overflow: hidden;
	}
	img {
		min-width: 100%;
		transition: transform 0.7s;
	}

	.bullets-container {
		background: orange;
		position: absolute;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 1rem;
		padding: 0.7rem;
		border-radius: 1.2rem;
		background: #fff;
	}
	.bullet {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		border: none;
		background: #0003;
		cursor: pointer;
	}
	.active-slide-bullet {
		background: #fa9;
	}

	@media (max-width: 950px) {
		.container {
			top: 12rem;
		}
	}

	@media (max-width: 589px) {
		.container {
			top: 18rem;
		}
	}
</style>
