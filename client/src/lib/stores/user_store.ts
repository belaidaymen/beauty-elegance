import { writable, derived, type Writable } from 'svelte/store';
import type { User } from '$lib/types';

interface UserStore extends Writable<User | null> {
	login: (user: User) => void;
	logout: () => void;
	updateUser: (user: Partial<User>) => void;
}

function createUserStore(): UserStore {
	// Load user from localStorage if exists
	const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
	const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;

	const { subscribe, set, update } = writable<User | null>(initialUser);

	// Persist user to localStorage whenever it changes
	subscribe((user) => {
		if (typeof window !== 'undefined') {
			if (user) {
				localStorage.setItem('user', JSON.stringify(user));
			} else {
				localStorage.removeItem('user');
			}
		}
	});

	return {
		subscribe,
		set,
		update,
		login: (user: User) => {
			set(user);
		},
		logout: () => {
			set(null);
		},
		updateUser: (userUpdates: Partial<User>) => {
			update((currentUser) => {
				if (currentUser) {
					return {
						...currentUser,
						...userUpdates,
						updatedAt: new Date().toISOString()
					};
				}
				return currentUser;
			});
		}
	};
}

export const user = createUserStore();

// Derived store to check if user is authenticated
export const isAuthenticated = derived(user, ($user) => $user !== null);
