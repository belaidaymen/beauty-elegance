import { writable } from 'svelte/store';
import type { ProductProps } from '$lib/types';
import photo1 from '$lib/assets/Sample Imgs/Products Imgs/photo_1.jpg';
import photo2 from '$lib/assets/Sample Imgs/Products Imgs/photo_2.jpg';
import photo3 from '$lib/assets/Sample Imgs/Products Imgs/photo_3.jpg';
import photo4 from '$lib/assets/Sample Imgs/Products Imgs/photo_4.jpg';
import photo5 from '$lib/assets/Sample Imgs/Products Imgs/photo_5.jpg';
import photo6 from '$lib/assets/Sample Imgs/Products Imgs/photo_6.jpg';
import photo7 from '$lib/assets/Sample Imgs/Products Imgs/photo_7.jpg';
import photo8 from '$lib/assets/Sample Imgs/Products Imgs/photo_8.jpg';
import photo9 from '$lib/assets/Sample Imgs/Products Imgs/photo_9.jpg';
import photo10 from '$lib/assets/Sample Imgs/Products Imgs/photo_10.jpg';
import photo11 from '$lib/assets/Sample Imgs/Products Imgs/photo_11.jpg';
import photo12 from '$lib/assets/Sample Imgs/Products Imgs/photo_12.jpg';
import photo13 from '$lib/assets/Sample Imgs/Products Imgs/photo_13.jpeg';
import photo14 from '$lib/assets/Sample Imgs/Products Imgs/photo_14.jpg';
import photo15 from '$lib/assets/Sample Imgs/Products Imgs/photo_15.jpg';
import photo16 from '$lib/assets/Sample Imgs/Products Imgs/photo_16.jpg';
import photo17 from '$lib/assets/Sample Imgs/Products Imgs/photo_17.jpg';
import photo18 from '$lib/assets/Sample Imgs/Products Imgs/photo_18.jpg';
import photo19 from '$lib/assets/Sample Imgs/Products Imgs/photo_19.jpg';
import photo20 from '$lib/assets/Sample Imgs/Products Imgs/photo_20.jpg';
import photo21 from '$lib/assets/Sample Imgs/Products Imgs/photo_21.jpg';
import photo22 from '$lib/assets/Sample Imgs/Products Imgs/photo_22.jpg';
import photo23 from '$lib/assets/Sample Imgs/Products Imgs/photo_23.jpg';

export const products = writable<Record<string, ProductProps[]>>({
	cheveux: [
		{
			id: 'prod-cheveux-1',
			imgUrl: photo1,
			name: ' viola noir',
			description: 'Masque pour cheveux 350ml ',
			category: 'cheveux',
			price: 450
		},
		{
			id: 'prod-cheveux-2',
			imgUrl: photo3,
			name: 'viola',
			description: 'serum pour cheveux reparateur',
			category: 'cheveux',
			price: 500
		},
		{
			id: 'prod-cheveux-3',
			imgUrl: photo4,
			name: 'flux care ',
			description: 'shampoing sans sulfate -color fix-',
			category: 'cheveux',
			price: 300
		},
		{
			id: 'prod-cheveux-4',
			imgUrl: photo13,
			name: 'flux care1',
			description: 'shampoig fleur de coton',
			category: 'cheveux',
			price: 250
		},

		{
			id: 'prod-cheveux-5',
			imgUrl: photo17,
			name: 'callidearm',
			description: 'apres-shampoing garlic cheveux sec ',
			category: 'cheveux',
			price: 350
		},

		{
			id: 'prod-cheveux-6',
			imgUrl: photo19,
			name: 'gracias',
			description: 'shampoing sans sulfate 250ml',
			category: 'cheveux',
			price: 550
		}
	],
	visage: [
		{
			id: 'prod-visage-1',
			imgUrl: photo2,
			name: 'venus',
			description: 'eau mecellaire 250 ml',
			category: 'visage',
			price: 300
		},
		{
			id: 'prod-visage-2',
			imgUrl: photo6,
			name: 'polycos',
			description: "masque pour visage huile d'argant",
			category: 'visage',
			price: 530
		},
		{
			id: 'prod-visage-3',
			imgUrl: photo16,
			name: 'abusaad',
			description: "gommage d'abricots pour visage 150ml ",
			category: 'visage',
			price: 350
		}
	],
	'corps & bain': [
		{
			id: 'prod-corps-1',
			imgUrl: photo5,
			name: 'dermactive',
			description: 'gommage citron pour corps 350ml',
			category: 'corps & bain',
			price: 720
		},
		{
			id: 'prod-corps-2',
			imgUrl: photo15,
			name: 'venus-',
			description: 'creme anti-rides',
			category: 'corps & bain',
			price: 300
		},
		{
			id: 'prod-corps-3',
			imgUrl: photo18,
			name: 'venus2',
			description: 'gel douche sans paraben 240ml',
			category: 'corps & bain',
			price: 140
		}
	],
	'deo & stick': [
		{
			id: 'prod-deo-1',
			imgUrl: photo12,
			name: 'nevia',
			description: 'stick nevia extra bright',
			category: 'deo & stick',
			price: 750
		},
		{
			id: 'prod-deo-2',
			imgUrl: photo8,
			name: 'dove1',
			description: 'stick dove original',
			category: 'deo & stick',
			price: 850
		},
		{
			id: 'prod-deo-3',
			imgUrl: photo9,
			name: 'dove ',
			description: 'deo dove original 0% alcchol',
			category: 'deo & stick',
			price: 850
		},
		{
			id: 'prod-deo-4',
			imgUrl: photo7,
			name: 'flux care -',
			description: 'deo enjoing 48h protection',
			category: 'deo & stick',
			price: 280
		}
	],
	maquillage: [
		{
			id: 'prod-maquillage-1',
			imgUrl: photo10,
			name: 'nouba',
			description: 'rougr a levre nouba',
			category: 'maquillage',
			price: 2500
		},
		{
			id: 'prod-maquillage-2',
			imgUrl: photo11,
			name: 'bourjois',
			description: 'Fond de teint 123 30ml',
			category: 'maquillage',
			price: 1050
		},
		{
			id: 'prod-maquillage-3',
			imgUrl: photo14,
			name: 'maybelin',
			description: 'mascara noir',
			category: 'maquillage',
			price: 1600
		}
	]
});
