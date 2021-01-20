import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      console.log('Pasando por el guards');

      // Podríamos hacer una pregunta para ver si está autenticado y mandar un mensaje swal

      // Si va ser falso, le podemos mandar al home con una de estas formas.
      // this.router.navigate(['/home']);
      // this.router.navigateByUrl('/home');

      // if ( ! this.usuarioService.estaAutenticado ) {
      //   Swal.fire('Autenticación', 'Tienes que estar autenticado para ver este recurso', 'info');
      //   this.router.navigateByUrl('/home');
      //   return false;
      // }

      // return this.usuarioService.estaAutenticado();

      // console.log('next: ', next);
      // console.log('state: ' , state);
      if (state.url.includes('tipovehiculo') && !this.usuarioService.estaAutenticado() ) {
        this.router.navigateByUrl('/home');
        return false;
      }

      // return false;

      // De todas formas y para seguir con el curso, vamos a controlar la autenticación en el componente.
      // que salga y muestre mensajes si se está o no autenticado.
      // por lo tanto, devolverenos siempre true.

      return true;


  }

}
