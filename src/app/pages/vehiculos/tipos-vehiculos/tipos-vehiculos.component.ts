import { Component, OnInit } from '@angular/core';
import { TipovehiculoService } from '../../../services/tipovehiculo.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoVehiculo } from '../../../models/tipo-vehiculo';


@Component({
  selector: 'app-tipos-vehiculos',
  templateUrl: './tipos-vehiculos.component.html',
  styleUrls: ['./tipos-vehiculos.component.css']
})
export class TiposVehiculosComponent implements OnInit {

  tiposVehiculos: TipoVehiculo[]= [];

  constructor(private tipoVehiculoService: TipovehiculoService,
              public usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarTiposVehiculos();
  }

  cargarTiposVehiculos(): void {

    this.tipoVehiculoService.getTiposVehiculos().subscribe( data => {
      // console.log( data );
      this.tiposVehiculos = data;
    });
  }


  editar(tipoVehiculo: TipoVehiculo): void {
    console.log('Editando: ', tipoVehiculo);
    this.router.navigate(['/tipovehiculo', tipoVehiculo._id]);
  }

  borrar(tipoVehiculo: TipoVehiculo): void {

   // console.log('Borrando: ', tipoVehiculo);

    // Haremos una pregunta con sweet alert.
    Swal.fire({
      title: `¿Estás seguro que quieres borrar ${tipoVehiculo.nombre}?`,
      text: 'No se va a poder volver a recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo'
    }).then((result) => {
      if (result.isConfirmed) {
        // llamaríamos al servicio para que haga el borrado.
        this.tipoVehiculoService.borrarTipoVehiculo( tipoVehiculo )
        .subscribe ( (resp: any) => {

          if ( !resp.ok ) {

            Swal.fire(
              'Borrado!',
              `${resp.mensaje}`,
              'info'
            )
          } else {
            Swal.fire(
              'Borrado!',
              `${tipoVehiculo.nombre}, ha sido borrado`,
              'info'
            );
            this.cargarTiposVehiculos();
          }

        }, error => {
          Swal.fire(
            'Borrado!',
            `${error}`,
            'error'
          )
        });
        return;

      }
    });
  }


}
