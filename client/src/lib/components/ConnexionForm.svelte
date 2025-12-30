<form>
	<label>
		<span>Adresse e-mail</span>
		<br />
		<input type="email" name="email" required />
	</label>

	<label>
		<span>Mot de passe</span>
		<br />
		<input type="password" name="password" required />
		<a href="/" class="forget-password-link">Mot de passe oublié?</a>
	</label>

	<div class="login-btn-and-signup-question-container">
		<button class="login-btn">Connexion</button>
		<p class="signup-question">
			Vous n'avez pas un compte?
			<a href="/">inscrivez-vous</a>
		</p>
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
	label:last-of-type {
		margin-bottom: 0.2em;
	}
	input {
		font-size: 1.5rem;
		padding: 0.3em 0.5em;
	}
	.forget-password-link {
		font-size: 1.4rem;
		display: block;
		margin-bottom: 3em;
		margin-left: 0.2em;
		color: #8d5a5a;
		margin-top: 0.3em;
	}

	.login-btn-and-signup-question-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	.login-btn {
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
	.login-btn:hover {
		background: #fff;
		color: #e6a3a3;
		outline-color: #e6a3a3;
	}

	.signup-question {
		margin: auto;
		display: block;
		font-size: 1.4rem;
		text-wrap: wrap;
		text-align: center;
	}
	.signup-question a {
		color: #923232;
	}
</style>
