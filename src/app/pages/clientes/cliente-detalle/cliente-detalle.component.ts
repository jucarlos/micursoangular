import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../../models/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent implements OnInit {

  tituloBoton = 'Crear';
  cliente: Cliente = new Cliente('', '', '');
  clienteIdDeEsteComponente;
  guardando = false;


  imagenSubir: File;
  imagenTemp: any;


  constructor(
    public clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {

    this.activatedRoute.params.subscribe( (params: any) => {
      const id =  params['id'];
      this.clienteIdDeEsteComponente = id;

      if ( id !== 'nuevo') {
          this.tituloBoton = 'Actualizar';
          this.clienteService.getCliente( id )
          .subscribe( (resp: any) => {
           this.cliente = resp.cliente;
          });
        }
    });
  }

  guardarCliente( formu: NgForm ): void {

    if ( formu.valid ) {
      this.guardando = true;
      this.clienteService.guardarCliente( this.cliente )
      .subscribe( (resp: any) => {
        if ( resp.ok ) {
          Swal.fire('Guardado', `${resp.cliente.nombre}, ha sido guardado correctamente`, 'success');
          this.guardando = false;
          this.router.navigate(['/clientes']);
         }
      }, error => {
        this.guardando = false;
        Swal.fire('Info', 'No se ha podido guardar. Consulte al administrador', 'error');
        this.router.navigate(['/clientes']);
      });

    } else {
      Swal.fire('Info', 'Algún dato está mal', 'error');
    }

  }

}
