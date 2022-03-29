import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorDomoticaComponent } from './pages/administrador-domotica/administrador-domotica.component';
import { AdministradorHistorialComponent } from './pages/administrador-historial/administrador-historial.component';
import { AdministradorIncidenciasComponent } from './pages/administrador-incidencias/administrador-incidencias.component';
import { AdministradorInicioComponent } from './pages/administrador-inicio/administrador-inicio.component';
import { AdministradorParteComponent } from './pages/administrador-parte/administrador-parte.component';
import { AdministradorPerfilComponent } from './pages/administrador-perfil/administrador-perfil.component';
import { AdministradorRiegoComponent } from './pages/administrador-riego/administrador-riego.component';
import { AdministradorUsuariosComponent } from './pages/administrador-usuarios/administrador-usuarios.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RecordarPasswordComponent } from './pages/recordar-password/recordar-password.component';
import { SuperAdministradorComponent } from './pages/super-administrador/super-administrador.component';
import { SuperSuperadministradorComponent } from './pages/super-superadministrador/super-superadministrador.component';
import { TrabajadorFicharComponent } from './pages/trabajador-fichar/trabajador-fichar.component';
import { TrabajadorInicioComponent } from './pages/trabajador-inicio/trabajador-inicio.component';
import { TrabajadorTareasComponent } from './pages/trabajador-tareas/trabajador-tareas.component';

const routes: Routes = [
  {path:"", component: LandingComponent},
  {path:"login", component: LoginComponent},
  {path:"administrador/inicio" , component: AdministradorInicioComponent},
  {path:"administrador/domotica" , component: AdministradorDomoticaComponent},
  {path:"administrador/perfil" , component: AdministradorPerfilComponent},
  {path:"administrador/usuarios" , component: AdministradorUsuariosComponent},
  {path:"administrador/historial" , component: AdministradorHistorialComponent},
  {path:"administrador/riego" , component: AdministradorRiegoComponent},
  {path:"administrador/parte" , component: AdministradorParteComponent},
  {path:"administrador/incidencias" , component: AdministradorIncidenciasComponent},
  {path:"trabajador/inicio" , component: TrabajadorInicioComponent},
  {path:"trabajador/fichar" , component: TrabajadorFicharComponent},
  {path:"trabajador/tareas" , component: TrabajadorTareasComponent},
  {path:"super/administrador" , component: SuperAdministradorComponent},
  {path:"super/superadministrador" , component: SuperSuperadministradorComponent},
  {path:"recordar-password", component:RecordarPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: "ignore",
    anchorScrolling: "enabled",
    scrollPositionRestoration: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
