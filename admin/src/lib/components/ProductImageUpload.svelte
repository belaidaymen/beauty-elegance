<script lang="ts">
	import ProductImage from './ProductImage.svelte';

	export let imageUrl: string | undefined = undefined;
	export let onImageUpload: ((url: string) => void) | undefined = undefined;

	let fileInput: HTMLInputElement;
	let isDragging = false;

	const handleFileSelect = (file: File) => {
		if (file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;
				imageUrl = result;
				onImageUpload?.(result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleFileInputChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			handleFileSelect(file);
		}
	};

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		isDragging = true;
	};

	const handleDragLeave = () => {
		isDragging = false;
	};

	const handleDrop = (e: DragEvent) => {
		e.preventDefault();
		isDragging = false;
		const file = e.dataTransfer?.files?.[0];
		if (file) {
			handleFileSelect(file);
		}
	};

	const handleRemoveImage = () => {
		imageUrl = undefined;
		if (fileInput) {
			fileInput.value = '';
		}
	};
</script>

<div class="upload-container">
	<div
		class="upload-area"
		class:dragging={isDragging}
		on:dragover={handleDragOver}
		on:dragleave={handleDragLeave}
		on:drop={handleDrop}
		role="button"
		tabindex="0"
		on:click={() => fileInput?.click()}
	>
		{#if imageUrl}
			<div class="image-preview-container">
				<ProductImage src={imageUrl} alt="Product preview" size="large" />
				<button class="remove-button" type="button" on:click|stopPropagation={handleRemoveImage}>
					Remove
				</button>
			</div>
		{:else}
			<div class="upload-content">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
					<polyline points="17 8 12 3 7 8"></polyline>
					<line x1="12" y1="3" x2="12" y2="15"></line>
				</svg>
				<p class="upload-text">Drag and drop your image here</p>
				<p class="upload-subtext">or click to select from your computer</p>
				<p class="upload-format">PNG, JPG, GIF up to 5MB</p>
			</div>
		{/if}
	</div>
	<input
		bind:this={fileInput}
		type="file"
		accept="image/*"
		hidden
		on:change={handleFileInputChange}
	/>
</div>

<style>
	.upload-container {
		width: 100%;
	}

	.upload-area {
		border: 2px dashed #e8e0db;
		border-radius: 1.2rem;
		padding: 3rem 2rem;
		text-align: center;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		background: linear-gradient(135deg, rgba(245, 240, 237, 0.4) 0%, rgba(250, 248, 246, 0.4) 100%);
	}

	.upload-area:hover {
		border-color: #b37777;
		background: linear-gradient(135deg, rgba(245, 240, 237, 0.8) 0%, rgba(250, 248, 246, 0.8) 100%);
	}

	.upload-area.dragging {
		border-color: #b37777;
		background: linear-gradient(135deg, rgba(209, 178, 178, 0.15) 0%, rgba(179, 119, 119, 0.1) 100%);
		box-shadow: 0 8px 24px rgba(179, 119, 119, 0.15);
	}

	.upload-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		color: #666;
	}

	.upload-content svg {
		color: #b37777;
		opacity: 0.8;
	}

	.upload-text {
		font-size: 1.6rem;
		font-weight: 700;
		color: #333;
		margin: 0;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.upload-subtext {
		font-size: 1.4rem;
		color: #888;
		margin: 0;
		font-family: inherit;
	}

	.upload-format {
		font-size: 1.2rem;
		color: #aaa;
		margin: 0;
		font-family: inherit;
	}

	.image-preview-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.remove-button {
		padding: 0.8rem 1.6rem;
		background: rgba(201, 68, 68, 0.12);
		color: #8a3a3a;
		border: 1px solid rgba(201, 68, 68, 0.3);
		border-radius: 0.7rem;
		font-size: 1.3rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: 'Andada Pro', serif;
		letter-spacing: 0.02em;
	}

	.remove-button:hover {
		background: rgba(201, 68, 68, 0.2);
		border-color: rgba(201, 68, 68, 0.5);
	}

	@media (max-width: 768px) {
		.upload-area {
			padding: 2rem;
		}

		.upload-text {
			font-size: 1.4rem;
		}

		.upload-subtext {
			font-size: 1.3rem;
		}
	}
</style>
