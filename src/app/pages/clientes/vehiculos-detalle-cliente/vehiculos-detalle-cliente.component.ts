import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { VehiculosClienteService } from 'src/app/services/vehiculos-cliente.service';
import { TipoVehiculo } from '../../../models/tipo-vehiculo';
import { Vehiculo } from '../../../models/vehiculo';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { TipovehiculoService } from '../../../services/tipovehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos-detalle-cliente',
  templateUrl: './vehiculos-detalle-cliente.component.html',
  styleUrls: ['./vehiculos-detalle-cliente.component.css']
})
export class VehiculosDetalleClienteComponent implements OnInit {

  clienteId ;
  cliente: Cliente;
  tituloCabecera = 'Nuevo vehículo ';
  tituloBoton = 'Crear';
  tipoVehiculoTemp = new TipoVehiculo('');

  vehiculo: Vehiculo = new Vehiculo('', '', '', this.tipoVehiculoTemp );

  tipoVehiculos: TipoVehiculo[] = [];

  constructor(
          private activatedRoute: ActivatedRoute,
          private router: Router,
          private vehiculosClienteService: VehiculosClienteService,
          private clienteService: ClienteService,
          private tipoVehiculoService: TipovehiculoService) { }

  ngOnInit(): void {

    this.cargarDatosCliente();
    this.cargarTiposVehiculos();

  }

  cargarDatosCliente(): void {

    this.activatedRoute.params.subscribe( (params: any) => {

      const ope = params['ope'];
      const id =  params['id'];

      if ( ope === 'nuevo' ) {
        this.clienteId = id;
        this.clienteService.getCliente( id )
        .subscribe( (resp: any) => {
          this.cliente = resp.cliente;
          this.tituloBoton = 'Crear';
          this.tituloCabecera = 'Nuevo vehículo para ' + this.cliente.nombre;
        });
      } else {
        this.tituloBoton = 'Actualizar';
        console.log( 'Estamos editando ');
        this.vehiculosClienteService.obtenerVehiculo( id )
        .subscribe( (resp: any) => {
          this.vehiculo = resp.vehiculo;
          this.clienteId = this.vehiculo.cliente;
        });

      }
    });

  }

  guardarVehiculo(): void {
    // console.log('Guardar vehículo');
    // console.log( this.vehiculo );
    this.vehiculo.cliente = this.cliente;
    this.vehiculosClienteService.guardarVehiculoCliente( this.vehiculo )
    .subscribe( (resp: any) => {
      // console.log( resp );
      if ( resp.ok ) {
        Swal.fire('Vehículo guardado', resp.mensaje, 'success');
      }
      this.volver();
    });

  }

  cargarTiposVehiculos(): void {

    this.tipoVehiculoService.getTiposVehiculos()
    .subscribe( (resp: any) => {
      this.tipoVehiculos = resp;
    });

  }

  cambioTipoVehiculo( id ): void {

    console.log( id );
  }

  volver(): void  {
    this.router.navigate(['/cliente', this.clienteId ]);
  }
}
