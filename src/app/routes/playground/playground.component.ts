import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { UploaderComponent } from '../../components/uploader/uploader.component';
import { CardStore } from '../../stores/card.store';
import { Layer } from '../../interfaces/card.interface';

@Component({
  selector: 'app-playground',
  standalone: true,
  providers: [CardStore],
  imports: [
    CardComponent,
    UploaderComponent
  ],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css',
})
export class PlaygroundComponent  implements OnInit {
  cardStore = inject(CardStore);
  layers: Layer[] = []

  conf = {
    cardWidth: 45
  };
  
  
  ngOnInit(): void {
  }
}
