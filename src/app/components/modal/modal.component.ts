import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  // Estas propiedades, para luego saber si está logueado.
  usuario: Usuario = new Usuario('', '', '');
  token = '';

  constructor(private usuarioService: UsuarioService) { }

  recuerdame = false;

  ngOnInit(): void {
    this.usuario.email = localStorage.getItem('email')  || '';
    if ( this.usuario.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  entrar() {

     console.log(this.recuerdame);

    this.usuarioService.login(this.usuario, this.recuerdame)
      .subscribe(resp => {
        console.log(resp);
      });

  }

  cerrarModal() {
    console.log('Cerrar');
  }

}
