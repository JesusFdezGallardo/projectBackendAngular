import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../usuario';
import {Rol} from '../rol';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;    //Guión bajo indica que es un método accesor Getter para obtener usuario y token
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    } else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    //Si no existe ni en token ni en base de obtener
      return new Usuario();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any>{
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.usuario);
    params.set('password', usuario.pass);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  guardarUsuario(access_token: string): void {
    let payload = this.obtenerDatosToken(access_token);
    this._usuario= new Usuario();
    //this._usuario.nombre = payload.nombre;
    //this._usuario.apellido = payload.apellido;
    //this._usuario.correoElectronico = payload.email;
    this._usuario.usuario = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario)); //Convierte el usuario en un JSON
  }

  guardarToken(access_token: string): void {
    this._token= access_token;
    sessionStorage.setItem('token', access_token);
  }

  obtenerDatosToken(access_token: string): any{
    if(access_token != null){
      return JSON.parse(atob(access_token.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }

  hasRole(rol): boolean {
    //La clase getter. Si no tiene roles, la funcion getUsuario obtiene user vacío
    if(this.usuario.roles.includes(rol)) {
      return true;
    }
    return false;
  }

}
