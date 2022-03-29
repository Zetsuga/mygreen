import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { BotonSliceComponent } from './components/boton-slice/boton-slice.component';
import { TablaIncidenciasComponent } from './components/tabla-incidencias/tabla-incidencias.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FechaPipe } from './pipes/fecha.pipe';
import { ValidateEqualModule } from 'ng-validate-equal';
import { UsuarioPipe } from './pipes/usuario.pipe';
import { UploadComponent } from './components/upload/upload.component';
import { SuperAdministradorComponent } from './pages/super-administrador/super-administrador.component';
import { SuperSuperadministradorComponent } from './pages/super-superadministrador/super-superadministrador.component';


// paginación


import { MDBBootstrapModule } from 'angular-bootstrap-md';


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
    BotonSliceComponent,
    TablaIncidenciasComponent,
    FechaPipe,
    UsuarioPipe,
    UploadComponent,
    SuperAdministradorComponent,
    SuperSuperadministradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTabsModule,
    NgxEchartsModule.forRoot({
      echarts:()=>import('echarts'),
    }),
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ValidateEqualModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
