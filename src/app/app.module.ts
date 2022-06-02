import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //Importamos clase que conecta cliente-servidor a traves de peticiones http
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/cabecera.component';
import { PieComponent } from './footer/pie.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {UsuarioService} from './usuarios/usuario.service';
//Importa Routesmode para tener varios módulos en el proyecto
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './usuarios/form.component';
//Importacion forms modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleComponent } from './usuarios/detalle/detalle.component';
import { PracticasComponent } from './lista-asignaturas/practicas/practicas.component';
import { AsignaturaComponent } from './asignaturas/asignatura.component';
import { AsignaturaService } from './asignaturas/services/asignatura.service';
import { ListaAsignaturasComponent } from './lista-asignaturas/lista-asignaturas.component';
import { FormularioAsignaturaComponent } from './lista-asignaturas/formulario-asignatura/formulario-asignatura.component';
import { LoginComponent } from './usuarios/login/login.component';
import { DetalleAsignaturaComponent } from './lista-asignaturas/detalle-asignatura/detalle-asignatura.component';
import { AuthService } from './usuarios/login/auth.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Constante con el arreglo de las rutas
const routes: Routes = [
  //Home o página principal
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  //Rutas mapeadas
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/form', component: FormComponent}, //Mapeo con el componente formulario creado
  {path: 'usuarios/form/:id', component: FormComponent},
  {path: 'usuarios/ver/:id', component: DetalleComponent},
  {path: 'usuarios/practicas/:idAsignatura', component: PracticasComponent},
  {path: 'asignaturas', component: ListaAsignaturasComponent},
  {path: 'asignaturas/form', component: FormularioAsignaturaComponent},
  {path: 'asignaturas/form/:asignaturaId', component: FormularioAsignaturaComponent},
  {path: 'asignaturas/ver/:id', component: DetalleAsignaturaComponent},
  {path: 'asignaturas/:id', component: AsignaturaComponent},
  {path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PieComponent,
    UsuariosComponent,
    FormComponent,
    DetalleComponent,
    PracticasComponent,
    AsignaturaComponent,
    ListaAsignaturasComponent,
    FormularioAsignaturaComponent,
    LoginComponent,
    DetalleAsignaturaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule, BrowserAnimationsModule,
    ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule

  ],
  providers: [UsuarioService, AsignaturaService, AuthService],//Cargamos clases de servicio
  bootstrap: [AppComponent]
})
export class AppModule { }
