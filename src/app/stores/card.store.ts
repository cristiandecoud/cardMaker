import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Layer } from '../interfaces/card.interface';
const layersMock: Layer[] = [
  {
    name: 'fondo',
    file: './images/montanas.jpg',
    position: 1,
    type: 'image'
  },{
    name: 'Goku',
    file: './images/goku.png',
    position: 2,
    type: 'image'
  },{
    name: 'Rayos',
    file: './images/rayos.png',
      position: 3,
      type: 'image'
    }
  ]

type CardState = {
	layers: Layer[];
	dimensions: {
		width: number;
		height: number;
	},
	border: string;
}

const initialState: CardState = {
	layers: layersMock,
	dimensions: {
		width: 0,
		height: 0,
	},
	border: '0px solid black'
};

export const CardStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withComputed(({layers}) => ({
		layersCount: computed(() => layers().length )
	})),
	withMethods( store => ({
		addLayer(layer: Layer) {
			patchState(store, state => ({layers: [...state.layers, layer]}));
		},
		setLayers(layers: Layer[]) {
			this.cleanLayers();
			patchState(store, state => ({layers: [...layers]}));
		},
		removeLayer(layer: Layer) {
			patchState(store, state => ({layers: state.layers.filter(f => f !== layer)}));
		},
		cleanLayers() {
			patchState(store, state => ({layers: []}));
		},
		reset() {
			patchState(store, state => ({...initialState}));
		}
	})),
	withHooks({
		onDestroy(store) {

		}
	})
);	


