import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardsGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {
    // let acceso: boolean;
    // acceso = this._usuarioService.estaLogeado();
    // console.log('Comprobando acceso', acceso);
  }

  canActivate() {
    if ( this._usuarioService.estaLogeado() ) {
      console.log( 'PASO POR EL GUARD ' );
      return true;
    } else {
      console.log( 'BLOQUEADO POR GUARD' );
      console.log('TOKEN', localStorage.getItem('token'));
      this.router.navigate(['/login']);
      return false;
    }
  }
}
