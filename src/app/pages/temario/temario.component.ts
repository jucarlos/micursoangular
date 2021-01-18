import { Component, OnInit } from '@angular/core';
import { Tema } from '../../models/tema';
import { TemarioService } from '../../services/temario.service';

@Component({
  selector: 'app-temario',
  templateUrl: './temario.component.html',
  styleUrls: ['./temario.component.css']
})
export class TemarioComponent implements OnInit {

  temario: Tema[] = [];

  meGustan = 0;

  constructor(public temaService: TemarioService) { }

  ngOnInit(): void {
    // this.temario = TEMARIO;
    // this.temario = this.temaService.getTemario();

    // Nos suscribimos
    this.temaService.getTemarioAsync()
    .subscribe( data => {
      this.temario = data;
    });
  }

  sumaUnLike( evento ): void {
    this.meGustan = this.meGustan + 1;
  }

}
