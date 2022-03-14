import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorDomoticaComponent } from './pages/administrador-domotica/administrador-domotica.component';
import { AdministradorInicioComponent } from './pages/administrador-inicio/administrador-inicio.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {path:"", component: LandingComponent},
  {path:"administrador/inicio" , component: AdministradorInicioComponent},
  {path:"administrador/domotica" , component: AdministradorDomoticaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
