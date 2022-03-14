import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
=======

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

>>>>>>> 36498eec706025d531a7cf4872e820c0ef6e8456
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { AdministradorInicioComponent } from './pages/administrador-inicio/administrador-inicio.component';
import { AdministradorPerfilComponent } from './pages/administrador-perfil/administrador-perfil.component';
import { AdministradorParteComponent } from './pages/administrador-parte/administrador-parte.component';
import { AdministradorIncidenciasComponent } from './pages/administrador-incidencias/administrador-incidencias.component';
import { AdministradorRiegoComponent } from './pages/administrador-riego/administrador-riego.component';
import { AdministradorDomoticaComponent } from './pages/administrador-domotica/administrador-domotica.component';
import { AdministradorHistorialComponent } from './pages/administrador-historial/administrador-historial.component';
import { AdministradorUsuariosComponent } from './pages/administrador-usuarios/administrador-usuarios.component';
import { TrabajadorInicioComponent } from './pages/trabajador-inicio/trabajador-inicio.component';
import { TrabajadorFicharComponent } from './pages/trabajador-fichar/trabajador-fichar.component';
import { TrabajadorTareasComponent } from './pages/trabajador-tareas/trabajador-tareas.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderPanelComponent } from './components/header-panel/header-panel.component';
import { MenuPanelComponent } from './components/menu-panel/menu-panel.component';
import { BotonComponent } from './components/boton/boton.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BotonSliceComponent } from './components/boton-slice/boton-slice.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    AdministradorInicioComponent,
    AdministradorPerfilComponent,
    AdministradorParteComponent,
    AdministradorIncidenciasComponent,
    AdministradorRiegoComponent,
    AdministradorDomoticaComponent,
    AdministradorHistorialComponent,
    AdministradorUsuariosComponent,
    TrabajadorInicioComponent,
    TrabajadorFicharComponent,
    TrabajadorTareasComponent,
    HeaderComponent,
    FooterComponent,
    HeaderPanelComponent,
    MenuPanelComponent,
    BotonComponent,
    BotonSliceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
