import { Component, Input, OnInit } from '@angular/core';
import { Layer } from '../../interfaces/card.interface';

interface Props {
  conf: { cardWidth: number };
  body: string;
  layers: string[];
  title: string;
}

interface Dimensions {
  bottom: number;
  hMedium: number;
  left: number;
  right: number;
  top: number;
  vMedium: number;
}

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input({required: true}) layers: Layer[] = []
  @Input() conf: any = {} 
  marco = './images/marco1.png'

  gap = 15;
  numberOfLayers = 0;
  cardWidth = 0;
  separation: string[] = [];
  separationLast: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.movementHandler();
     
    this.cardWidth = this.conf.cardWidth;
    this.numberOfLayers = this.countLayers(this.layers);
    this.gap = this.setGap(this.numberOfLayers, this.cardWidth);

    this.layers.forEach( (item, i) => {
      this.separation.push(this.setLayerSeparation(i));
    })
    this.separationLast = this.setSeparationLastLayer(this.numberOfLayers, this.gap);
  }

	countLayers(layers: Layer[]): number {
		return layers.length;
	}

	setGap(numberOfLayers: number, cardWidth: number): number {
		return cardWidth / numberOfLayers;
	}

  setLayerSeparation(index: number) {
		return `transform: translateZ(${index * this.gap}px)`;
	}

	setSeparationLastLayer(numberLayers: number, gap: number) {
		return `transform: translateZ(${(numberLayers - 1) * gap + 10}px)`;
	}

  movementHandler() {
    if( typeof document === 'undefined' ) return;

    let wrapper = document.getElementById('wrapper');
    let card = document.getElementById('card');
    
    wrapper?.addEventListener('mouseover', (event) => {
      document.onmousemove = (event) => {
        let x = event.x;
        let y = event.y;
        if (card) card.style.transform = `rotate3d(${(x - 390) / 10}, ${(y - 276) / 10}, ${0.2}, 15deg)`;
      };
    });  
  }
}
