import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoVehiculo } from '../../../models/tipo-vehiculo';
import { TipovehiculoService } from '../../../services/tipovehiculo.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.css']
})
export class TipoVehiculoComponent implements OnInit {

  titulo = '';
  tituloBoton = '';

  constructor(private activatedRoute: ActivatedRoute,
              private tipoVehiculoService: TipovehiculoService,
              private router: Router) {

    this.activatedRoute.params.subscribe( (params: any) => {

      const id = params['id'];

      if ( id === 'nuevo') {
        this.titulo = 'Nuevo Tipo de Vehículo';
        this.tituloBoton = 'Guardar';
      } else {
        this.tituloBoton = 'Actualizar';
        this.cargarTipoVehiculo( id );
      }

    });
  }

  guardando = false;

  tipoVehiculo = new TipoVehiculo('', '');

  ngOnInit(): void {
  }

  guardarTipoVehiculo( f: NgForm ): void  {

    this.guardando = true;
    this.tipoVehiculoService.guardarTipoVehiculo( this.tipoVehiculo)
    .subscribe( (resp: any) => {
      if ( resp.ok ) {
        Swal.fire('Guardado', `${resp.tipoVehiculo.nombre}, ha sido guardado correctamente`, 'success');
        this.router.navigate(['/tiposvehiculos']);
      }
    });

  }

  cargarTipoVehiculo(id: string ): void {


    this.tipoVehiculoService.getTipoVehiculo( id )
    .subscribe( (resp: any) => {
      this.tipoVehiculo = resp.tipoVehiculo;
      this.titulo = `Editando ${this.tipoVehiculo.nombre}`;
    });

  }

}
