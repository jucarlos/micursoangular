import { Component, OnInit, Input } from '@angular/core';
import { Vehiculo } from '../../../models/vehiculo';
import { VehiculosClienteService } from '../../../services/vehiculos-cliente.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-vehiculos-cliente',
  templateUrl: './vehiculos-cliente.component.html',
  styleUrls: ['./vehiculos-cliente.component.css']
})
export class VehiculosClienteComponent implements OnInit {

  @Input() clienteId = '';
  vehiculos: Vehiculo[] = [];

  constructor(
    private vehiculosClienteService: VehiculosClienteService,
    public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {

    this.vehiculosClienteService.obtenerVehiculosCliente( this.clienteId )
    .subscribe( (resp: any) => {
      this.vehiculos = resp.vehiculos;
    });

  }


  borrarVehiculo( vehiculo: Vehiculo ): void {
    Swal.fire({
      title: 'Estás seguro',
      text: `Vas a borrar el este el vehículo ${vehiculo.marca} con matrícula ${vehiculo.matricula}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo'
    }).then((result) => {
      if (result.value) {
        this.vehiculosClienteService.borrarVehiculo(vehiculo._id)
        .subscribe( (resp: any) => {
            if ( resp.ok ) {
              Swal.fire(
                'Borrado!',
                `${vehiculo.marca}, ha sido borrado`,
                'success'
              );
              this.cargarVehiculos();
            } else {
              Swal.fire(
                'Error!',
                `Error al borrar el vehículo con matrícula ${vehiculo.matricula}`,
                'error'
              );
            }
        });
      }
    });

  }
  

}
