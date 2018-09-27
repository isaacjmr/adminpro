import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  idUsuario: string;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  estaLogeado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.idUsuario = localStorage.getItem('id_usuario');
      this.token = localStorage.getItem('token');
    } else {
      this.idUsuario = '';
      this.token = '';
    }
  }

  guardarStorage( idUsuario: string, token: string) {
    localStorage.setItem('id_usuario', idUsuario);
    localStorage.setItem('token', token);
  }

  logOut() {
    this.idUsuario = '';
    this.token = '';
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('email');

    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
        .map( (resp: any) => {

          // console.log(resp);
          this.guardarStorage(resp.usuario, resp.token);

          return true;
        });
  }

  crearUsuario( usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario)
      .map( (resp: any) => {
        swal('Usuario creado satisfactoriamente', usuario.email, 'success');
        return resp.Usuario;
      });
  }
}
