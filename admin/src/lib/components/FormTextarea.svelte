<script lang="ts">
	export let label: string = '';
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let error: string = '';
	export let rows: number = 4;
	export let id: string = Math.random().toString(36).substr(2, 9);
</script>

<div class="form-group">
	{#if label}
		<label for={id} class="form-label">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}
	<textarea
		{id}
		bind:value
		{placeholder}
		{required}
		{rows}
		class="form-textarea"
		class:error
		{...$$restProps}
	/>
	{#if error}
		<p class="error-text">{error}</p>
	{/if}
</div>

<style>
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		margin-bottom: 1.8rem;
	}

	.form-label {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		letter-spacing: 0.01em;
	}

	.required {
		color: #c94444;
		margin-left: 0.3rem;
	}

	.form-textarea {
		padding: 0.95rem 1.2rem;
		border: 1.5px solid #e8e0db;
		border-radius: 0.7rem;
		font-size: 1.4rem;
		color: #333;
		background: #fff;
		font-family: inherit;
		resize: vertical;
		transition: all 0.2s ease;
		line-height: 1.5;
	}

	.form-textarea::placeholder {
		color: #999;
	}

	.form-textarea:hover {
		border-color: #d1b2b2;
	}

	.form-textarea:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.08);
	}

	.form-textarea.error {
		border-color: #c94444;
	}

	.form-textarea.error:focus {
		box-shadow: 0 0 0 3px rgba(201, 68, 68, 0.08);
	}

	.error-text {
		font-size: 1.2rem;
		color: #c94444;
	}
</style>
