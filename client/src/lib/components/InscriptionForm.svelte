<form>
	<label>
		<span>Nom d'utilisateur</span>
		<br />
		<input type="text" name="username" required />
	</label>

	<label>
		<span>Adresse e-mail</span>
		<br />
		<input type="email" name="email" required />
	</label>

	<label>
		<span>Mot de passe</span>
		<br />
		<input type="password" name="password" required />
	</label>

	<div class="signup-btn-and-signup-question-container">
		<button class="signup-btn">Inscription</button>
	</div>
</form>

<style>
	form {
		margin-top: 6rem;
		text-wrap: nowrap;
		width: 80%;
	}

	label {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}
	label span {
		margin-bottom: -1em;
		margin-left: 0.2em;
	}
	label:first-of-type {
		margin-bottom: 2em;
	}
	label:not(:first-of-type, :last-of-type) {
		margin-bottom: 2em;
	}
	label:last-of-type {
		margin-bottom: 0.2em;
	}
	input {
		font-size: 1.5rem;
		padding: 0.3em 0.5em;
	}

	.signup-btn {
		background: #f1dada;
		border: none;
		font-size: 1.9rem;
		padding-inline: 2em;
		text-transform: capitalize;
		cursor: pointer;
		outline: 0.1rem solid transparent;
		transition: 0.2s;
		border: none;
		font-size: 1.7rem;
		padding: 0.6em 2em;
		text-transform: capitalize;
		cursor: pointer;
	}
	.signup-btn {
		display: block;
		margin: auto;
		margin-top: 3em;
	}
	.signup-btn:hover {
		background: #fff;
		color: #e6a3a3;
		outline-color: #e6a3a3;
	}
</style>
