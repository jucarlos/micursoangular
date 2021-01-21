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



  seleccionImagen( archivo: File  ): void {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf ( 'image') < 0 ){
      Swal.fire('Sólo imágenes', 'El archivo no es una imágen válida', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    // para leer de forma asíncrola el archivo
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen(): void {

    this.clienteService.cambiarImagen( this.imagenSubir, this.cliente._id )
    .then ( (resp: any ) => {
      if ( resp.ok ) {
        Swal.fire('Imagen actualizada', resp.mensaje, 'success');
        this.volver();
      }
    }).catch ( ( error ) => {
      Swal.fire('Error', 'Ha habido un error al actualizar la imagen', 'error');
    });

  }


  volver(): void {
    this.router.navigate(['/cliente', this.cliente._id]);
  }



}
