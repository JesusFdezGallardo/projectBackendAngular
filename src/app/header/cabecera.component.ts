import {Component} from '@angular/core';
import {AuthService} from '../usuarios/login/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './cabecera.component.html'

})
  export class HeaderComponent{
  title: string = 'Miteris School'

  constructor(public authService: AuthService, private router: Router){

  }
  logout():void {
    Swal.fire('Logout', `El usuario ${this.authService.usuario.usuario} ha cerrado sesión!`, 'success');
    this.authService.logout();
    this.router.navigate(['/Login']);
  }
}
