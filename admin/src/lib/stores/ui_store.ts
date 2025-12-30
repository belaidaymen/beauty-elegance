import { writable } from 'svelte/store';

interface UIStore {
	sidebarOpen: boolean;
	activeSection: string;
	modalOpen: boolean;
	modalType: string | null;
	notification: {
		show: boolean;
		message: string;
		type: 'success' | 'error' | 'warning' | 'info';
	};
}

function createUIStore() {
	const { subscribe, set, update } = writable<UIStore>({
		sidebarOpen: true,
		activeSection: 'dashboard',
		modalOpen: false,
		modalType: null,
		notification: {
			show: false,
			message: '',
			type: 'info'
		}
	});

	return {
		subscribe,
		toggleSidebar: () =>
			update((state) => ({
				...state,
				sidebarOpen: !state.sidebarOpen
			})),
		setActiveSection: (section: string) =>
			update((state) => ({
				...state,
				activeSection: section
			})),
		openModal: (type: string) =>
			update((state) => ({
				...state,
				modalOpen: true,
				modalType: type
			})),
		closeModal: () =>
			update((state) => ({
				...state,
				modalOpen: false,
				modalType: null
			})),
		showNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') =>
			update((state) => ({
				...state,
				notification: {
					show: true,
					message,
					type
				}
			})),
		hideNotification: () =>
			update((state) => ({
				...state,
				notification: {
					...state.notification,
					show: false
				}
			}))
	};
}

export const uiStore = createUIStore();
