import { writable } from 'svelte/store';

interface AdminUser {
	id: string;
	name: string;
	email: string;
	role: 'admin' | 'manager' | 'editor';
	avatar?: string;
}

interface AuthStore {
	user: AdminUser | null;
	isAuthenticated: boolean;
	loading: boolean;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthStore>({
		user: null,
		isAuthenticated: false,
		loading: true
	});

	return {
		subscribe,
		login: (user: AdminUser) =>
			update((state) => ({
				...state,
				user,
				isAuthenticated: true,
				loading: false
			})),
		logout: () =>
			set({
				user: null,
				isAuthenticated: false,
				loading: false
			}),
		setLoading: (loading: boolean) =>
			update((state) => ({ ...state, loading }))
	};
}

export const authStore = createAuthStore();
