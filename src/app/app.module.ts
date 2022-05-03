import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'; //Importamos clase que conecta cliente-servidor a traves de peticiones http
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/cabecera.component';
import {PieComponent} from './footer/pie.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {UsuarioService} from './usuarios/usuario.service';
//Importa Routesmode para tener varios módulos en el proyecto
import {RouterModule, Routes} from '@angular/router';
import { FormComponent } from './usuarios/form.component';
//Importacion forms modulos
import {FormsModule} from '@angular/forms';

//Constante con el arreglo de las rutas
const routes: Routes = [
  //Home o página principal
  {path: '', redirectTo: '/usuarios', pathMatch: 'full'},
  //Rutas mapeadas
  {path: 'directivas', component: DirectivaComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/form', component: FormComponent}, //Mapeo con el componente formulario creado
  {path: 'usuarios/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PieComponent,
    DirectivaComponent,
    UsuariosComponent,
    FormComponent
  ],
  imports: [
    //CARGAR CONFIGURACION DE LA BD
    BrowserModule,
    //Cargamos rutas moduladas de angular
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [UsuarioService],//Cargamos clases de servicio
  bootstrap: [AppComponent]
})
export class AppModule { }
