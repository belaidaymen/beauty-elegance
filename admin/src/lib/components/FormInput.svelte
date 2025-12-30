<script lang="ts">
	export let label: string = '';
	export let inputType: string = 'text';
	export let value: string | number = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let error: string = '';
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
	{#if inputType === 'text'}
		<input
			{id}
			type="text"
			bind:value
			{placeholder}
			{required}
			class="form-input"
			class:error
			{...$$restProps}
		/>
	{:else if inputType === 'email'}
		<input
			{id}
			type="email"
			bind:value
			{placeholder}
			{required}
			class="form-input"
			class:error
			{...$$restProps}
		/>
	{:else if inputType === 'tel'}
		<input
			{id}
			type="tel"
			bind:value
			{placeholder}
			{required}
			class="form-input"
			class:error
			{...$$restProps}
		/>
	{:else if inputType === 'number'}
		<input
			{id}
			type="number"
			bind:value
			{placeholder}
			{required}
			class="form-input"
			class:error
			{...$$restProps}
		/>
	{:else if inputType === 'date'}
		<input
			{id}
			type="date"
			bind:value
			{required}
			class="form-input"
			class:error
			{...$$restProps}
		/>
	{:else if inputType === 'password'}
		<input
			{id}
			type="password"
			bind:value
			{placeholder}
			{required}
			class="form-input"
			class:error
			{...$$restProps}
		/>
	{:else if inputType === 'url'}
		<input
			{id}
			type="url"
			bind:value
			{placeholder}
			{required}
			class="form-input"
			class:error
			{...$$restProps}
		/>
	{:else}
		<input
			{id}
			type="text"
			bind:value
			{placeholder}
			{required}
			class="form-input"
			class:error
			{...$$restProps}
		/>
	{/if}
	{#if error}
		<p class="error-text">{error}</p>
	{/if}
</div>

<style>
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.form-label {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.required {
		color: #e74c3c;
		margin-left: 0.3rem;
	}

	.form-input {
		padding: 0.8rem 1rem;
		border: 2px solid #e0c8c8;
		border-radius: 0.4rem;
		font-size: 1.4rem;
		color: #333;
		background: #fff;
		transition: all 0.3s ease;
	}

	.form-input:focus {
		outline: none;
		border-color: #b37777;
		box-shadow: 0 0 0 3px rgba(179, 119, 119, 0.1);
	}

	.form-input.error {
		border-color: #e74c3c;
	}

	.form-input.error:focus {
		box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
	}

	.error-text {
		font-size: 1.2rem;
		color: #e74c3c;
	}
</style>
