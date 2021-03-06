import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import * as _swal from 'sweetalert'
import { SweetAlert } from 'sweetalert/typings/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token:string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  estaLogueado(){
    return (this.token || this.token.length > 5)? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
    else{
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('id', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token: token }).pipe(
      map((resp:any) =>{
        this.guardarStorage(resp.id, resp.token, resp.usuario)
      })
    )
  }

  login(usuario: Usuario, recuerdame: boolean = false) {


    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    }
    else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario)
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('id', JSON.stringify(resp.usuario));
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    );
  }
}
