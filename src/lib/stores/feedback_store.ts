import { writable, type Writable } from 'svelte/store';
import type { ServiceFeedback } from '$lib/types';

interface FeedbackStore extends Writable<ServiceFeedback[]> {
	add: (feedback: ServiceFeedback) => void;
	remove: (feedbackId: string) => void;
	getByOrderId: (orderId: string) => ServiceFeedback | undefined;
}

function createFeedbackStore(): FeedbackStore {
	// Load feedback from localStorage if exists
	const storedFeedback = typeof window !== 'undefined' ? localStorage.getItem('feedback') : null;
	const initialFeedback: ServiceFeedback[] = storedFeedback ? JSON.parse(storedFeedback) : [];

	const { subscribe, set, update: updateStore } = writable<ServiceFeedback[]>(initialFeedback);

	// Persist feedback to localStorage whenever it changes
	subscribe((feedback) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('feedback', JSON.stringify(feedback));
		}
	});

	return {
		subscribe,
		set,
		update: updateStore,
		add: (feedback: ServiceFeedback) => {
			updateStore((feedbacks) => [...feedbacks, feedback]);
		},
		remove: (feedbackId: string) => {
			updateStore((feedbacks) => feedbacks.filter((f) => f.id !== feedbackId));
		},
		getByOrderId: (orderId: string) => {
			let found: ServiceFeedback | undefined;
			subscribe((feedbacks) => {
				found = feedbacks.find((f) => f.orderId === orderId);
			})();
			return found;
		}
	};
}

export const feedback = createFeedbackStore();
