import { Component, OnInit } from '@angular/core';
import {Usuario} from '../usuario';
import Swal from 'sweetalert2';
import{AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  titulo:string = "Iniciar sesion";
  usuario: Usuario;

  constructor( private authService: AuthService, private router:Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      Swal.fire('Login', `Hola ${this.authService.usuario.usuario}, ya estas autenticado`, 'info')
      this.router.navigate(['/usuarios'])
    }
  }

  login(): void{
    console.log(this.usuario);
    if(this.usuario.usuario == null || this.usuario.pass == null){
      Swal.fire('Error Login', 'usuario o contraseña vacías!', 'error')
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/usuarios']);
      Swal.fire( 'Login', `Hola ${usuario.usuario}, has iniciado sesión con éxito!`, 'success' );
    }, err =>{
       if(err.status == 400){
         Swal.fire('Error Login', 'usuario o contraseña incorrectas!', 'error')
       }
    }
  );
  }
}
