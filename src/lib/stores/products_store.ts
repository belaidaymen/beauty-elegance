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
			imgUrl: photo1,
			name: ' viola noir',
			description: 'Masque pour cheveux 350ml ',
			price: 450
		},
		{
			imgUrl: photo3,
			name: 'viola',
			description: 'serum pour cheveux reparateur',
			price: 500
		},
		{
			imgUrl: photo4,
			name: 'flux care ',
			description: 'shampoing sans sulfate -color fix-',
			price: 300
		},
		{
			imgUrl: photo13,
			name: 'flux care1',
			description: 'shampoig fleur de coton',
			price: 250
		},

		{
			imgUrl: photo17,
			name: 'callidearm',
			description: 'apres-shampoing garlic cheveux sec ',
			price: 350
		},

		{
			imgUrl: photo19,
			name: 'gracias',
			description: 'shampoing sans sulfate 250ml',
			price: 550
		}
	],
	visage: [
		{
			imgUrl: photo2,
			name: 'venus',
			description: 'eau mecellaire 250 ml',
			price: 300
		},
		{
			imgUrl: photo6,
			name: 'polycos',
			description: "masque pour visage huile d'argant",
			price: 530
		},
		{
			imgUrl: photo16,
			name: 'abusaad',
			description: "gommage d'abricots pour visage 150ml ",
			price: 350
		}
	],
	'corps & bain': [
		{
			imgUrl: photo5,
			name: 'dermactive',
			description: 'gommage citron pour corps 350ml',
			price: 720
		},
		{
			imgUrl: photo15,
			name: 'venus-',
			description: 'creme anti-rides',
			price: 300
		},
		{
			imgUrl: photo18,
			name: 'venus2',
			description: 'gel douche sans paraben 240ml',
			price: 140
		}
	],
	'deo & stick': [
		{
			imgUrl: photo12,
			name: 'nevia',
			description: 'stick nevia extra bright',
			price: 750
		},
		{
			imgUrl: photo8,
			name: 'dove1',
			description: 'stick dove original',
			price: 850
		},
		{
			imgUrl: photo9,
			name: 'dove ',
			description: 'deo dove original 0% alcchol',
			price: 850
		},
		{
			imgUrl: photo7,
			name: 'flux care -',
			description: 'deo enjoing 48h protection',
			price: 280
		}
	],
	maquillage: [
		{
			imgUrl: photo10,
			name: 'nouba',
			description: 'rougr a levre nouba',
			price: 2500
		},
		{
			imgUrl: photo11,
			name: 'bourjois',
			description: 'Fond de teint 123 30ml',
			price: 1050
		},
		{
			imgUrl: photo14,
			name: 'maybelin',
			description: 'mascara noir',
			price: 1600
		}
	]
});
