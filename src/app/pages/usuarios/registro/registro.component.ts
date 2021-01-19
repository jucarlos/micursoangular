import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  grabando = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }
  registrarUsuario(formulario: NgForm): void {

    this.grabando = true;

    if ( this.sonIguales(formulario.value.password1, formulario.value.password2)) {

      const usuario = new Usuario(
        formulario.value.nombre,
        formulario.value.email,
        formulario.value.password1,
       );

      // Simulamos que estamos grabando
        // setTimeout(() => {
        //   this.grabando = false;
        //   console.log(this.grabando);
        // }, 2500);

      this.usuarioService.crearUsuario( usuario )
      .subscribe( resp => {
        console.log( resp );
        this.grabando = false;
      });

    } else {
        console.log('ERror al grabar');
        this.grabando = false;
        return;
    }


  }


  sonIguales( campo1: string, campo2: string ): boolean {

    // Si no se cumple tienes que devolver un error con el true y se se cumple unn null
    return campo1 === campo2;

  }

}
