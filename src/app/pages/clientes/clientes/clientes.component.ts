import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cargando = false;
  clientes: Cliente[] = [];
  totalRegistros = 0;
  desde = 0;
  termino = '';

  constructor(private clienteService: ClienteService) {
    this.cargarClientes();
  }


  ngOnInit(): void {
  }

  borrarCliente( cliente: Cliente ): void {

    Swal.fire({
      title: `¿Estás seguro que quieres borrar ${cliente.nombre}?`,
      text: 'No se va a poder volver a recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo'
    }).then((result) => {
      if (result.isConfirmed) {
        // llamaríamos al servicio para que haga el borrado.
        this.clienteService.borrarCliente( cliente._id ).subscribe( (resp: any ) => {
          if ( !resp.ok ) {

            Swal.fire(
              'Borrado!',
              `${resp.mensaje}`,
              'info'
            );
          } else {
            Swal.fire(
              'Borrado!',
              `${cliente.nombre}, ha sido borrado`,
              'info'
            );
            this.cargarClientes();
          }

        }, error => {
          Swal.fire(
            'Borrado!',
            `${error}`,
            'error'
          );
        });
      }
    });

  }



  cargarClientes(): void {

    this.cargando = true;
    this.termino = '';
    this.clienteService.getClientes(this.desde || 0)
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.clientes = resp.clientes;
        this.cargando = false;
      }, error => {
        console.log( error );
        this.cargando = false;
      });
  }

  cambiarDesde(i: number): void {

    const desde = this.desde + i;

    if ( desde >= this.totalRegistros ) {
      Swal.fire('Usuarios', 'No hay mas usuarios', 'info');
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += i;

    this.cargarClientes();

  }



}
