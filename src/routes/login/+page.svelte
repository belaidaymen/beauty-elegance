<script lang="ts">
	import logoUncolored from '$lib/assets/logo-uncolored.png';
	import sidebarImg from '$lib/assets/imgs/sidebar-img.jpeg';
	import googleIcon from '$lib/assets/icons/google.svg';
	import { user } from '$lib/stores/user_store';
	import type { User } from '$lib/types';

	let email = '';
	let password = '';
	let error = '';
	let isLoading = false;

	async function handleLogin(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		// Simulate login - In a real app, this would call an API
		try {
			// For demo purposes, create a user object
			const newUser: User = {
				id: `user-${Date.now()}`,
				username: email.split('@')[0],
				email,
				firstName: 'John',
				lastName: 'Doe',
				phone: '+213 XXX XXX XXX',
				address: '123 Rue de la Beauté',
				city: 'Alger',
				postalCode: '16000',
				country: 'Algérie',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			};

			user.login(newUser);

			// Redirect to dashboard
			if (typeof window !== 'undefined') {
				window.location.href = '/dashboard';
			}
		} catch (err) {
			error = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
		} finally {
			isLoading = false;
		}
	}

	function handleGoogleLogin() {
		error = 'La connexion Google n\'est pas encore configurée. Utilisez l\'email et le mot de passe.';
	}
</script>

<svelte:head>
	<title>Connexion | Beaute & Elegance</title>
</svelte:head>

<div class="container">
	<div class="sidebar-img-and-logo-container">
		<img src={logoUncolored} alt="logo" class="logo-img" />
		<img src={sidebarImg} alt="" class="sidebar-img" />
	</div>

	<div class="form-container">
		<form on:submit={handleLogin}>
			<h1>Connexion</h1>

			{#if error}
				<div class="error-message">{error}</div>
			{/if}

			<button type="button" class="google-login-btn" on:click={handleGoogleLogin}>
				<img src={googleIcon} alt="google-icon" class="google-icon" />
				<span>Continuer avec Google</span>
			</button>

			<div class="divider">
				<div class="line"></div>
				<span class="text">Ou bien avec email</span>
			</div>

			<div class="username-or-email-input-container input-container">
				<label for="username">Nom d'utilisateur ou email</label>
				<input
					type="email"
					id="username"
					bind:value={email}
					placeholder="votre@email.com"
					required
				/>
			</div>
			<div class="password-input-container input-container">
				<label for="password">Mot de passe</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					placeholder="Votre mot de passe"
					required
				/>
				<a href="/" class="forgot-password-link">Mot de passe oublié?</a>
			</div>

			<button type="submit" class="connexion-btn" disabled={isLoading}>
				{isLoading ? 'Connexion en cours...' : 'Connexion'}
			</button>
			<span class="signup-question">
				Vous n'avez pas de compte ? <a href="/" class="signup-link">Inscrivez-vous</a>
			</span>
		</form>
	</div>
</div>

<style>
	.container {
		display: flex;
		height: 100%;
		display: grid;
		grid-template-columns: 45rem auto;

		--links-color: #9c5555;
		--hov-links-color: #532e2e;
	}

	.sidebar-img-and-logo-container {
		height: 100%;
		position: relative;
	}
	.logo-img {
		position: absolute;
		top: 2.5rem;
		left: 1.1rem;
	}

	.sidebar-img {
		position: absolute;
		left: 0;
		width: 100%;
		height: 100dvh;
		object-fit: cover;
		z-index: -1;
	}

	.form-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	form {
		width: min(50rem, 100vw);
		min-height: 10rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		top: -7rem;
	}

	h1 {
		letter-spacing: 0.15rem;
		font-size: 3.8rem;
	}

	.google-login-btn {
		all: initial;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 4rem;
		border-radius: 1000000000rem;
		border: 1px solid #0003;
		gap: 2rem;
		cursor: pointer;
		width: 85%;
		height: 6rem;
	}
	.google-login-btn .google-icon {
		width: 2.5rem;
	}
	.google-login-btn span {
		font-size: 1.6rem;
		letter-spacing: 0.1rem;
		font-weight: 500;
	}

	.divider {
		margin-top: 4rem;
		margin-bottom: 2.8rem;
		width: min(100%, 90vw);
		background: pink;
		position: relative;
	}
	.divider .line {
		background: #a1a1a1;
		height: 0.1rem;
	}
	.divider .text {
		color: #a1a1a1;
		background: #fff;
		padding-inline: 2rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		letter-spacing: 0.1rem;
		font-size: 1.5rem;
		text-wrap: nowrap;
	}

	.input-container {
		width: 88%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.input-container label {
		display: block;
		margin-left: 0.8rem;
		font-size: 2rem;
		font-weight: 600;
	}
	.input-container input {
		width: 98%;
		font-size: 1.8rem;
		padding: 1rem 1.7rem;
		border: 1px solid #0004;
		margin: auto;
	}
	.username-or-email-input-container {
		margin-top: 4rem;
	}
	.password-input-container {
		margin-top: 2rem;
	}
	.forgot-password-link {
		margin-left: 0.8rem;
		color: var(--links-color);
		position: relative;
		top: -0.5rem;
	}
	.forgot-password-link:hover {
		color: var(--hov-links-color);
	}

	.connexion-btn {
		all: unset;
		background: #f1dada;
		width: 85%;
		height: 6rem;
		margin-top: 4rem;
		display: grid;
		place-content: center;
		border-radius: 100000000rem;
		font-size: 2.4rem;
		font-weight: lighter;
		outline: 2px solid transparent;
		cursor: pointer;
		transition: 0.2s;
		font-weight: 500;
	}
	.connexion-btn:hover {
		outline-color: #f1dada;
		background: #fff;
		color: #f0c7c7;
	}
	.connexion-btn:active {
		transform: scale(0.95);
	}

	.signup-question {
		margin-top: 0.5rem;
	}
	.signup-link {
		color: var(--links-color);
	}
	.signup-link:hover {
		color: var(--hov-links-color);
	}

	@media (max-width: 1000px) {
		.container {
			display: block;
		}

		.sidebar-img-and-logo-container {
			display: none;
		}

		.form-container {
			width: 100%;
			height: 100%;
		}
		form {
			top: 0;
		}
	}
</style>
