import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tema } from '../../models/tema';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styles: [
  ]
})
export class TarjetaComponent implements OnInit {

  @Input() tema: Tema;
  @Input() numero: number;

  @Output() cambiaMeGusta: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  meGusta(): void {
    this.cambiaMeGusta.emit(1);
  }

}
