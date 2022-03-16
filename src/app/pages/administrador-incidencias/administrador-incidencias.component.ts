import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-administrador-incidencias',
  templateUrl: './administrador-incidencias.component.html',
  styleUrls: ['./administrador-incidencias.component.css']
})
export class AdministradorIncidenciasComponent implements OnInit {

  public incidencias

  constructor(public usuario:UsuarioService) {
    this.usuario.trabajador = false;

    this.incidencias = [
      {
        "incidencia_id": 0,
        "usuario_id" : 1,
        "finda_id" : 0,
        "fecha" : "30/12/2021",
        "estado" : false,
        "descripcion" : "Abono insufiente, hace falta comprar más"
      },{
        "incidencia_id": 1,
        "usuario_id" : 0,
        "finda_id" : 0,
        "fecha" : "28/12/2021",
        "estado" : false,
        "descripcion" : "Sistema de riego roto"
      },{
        "incidencia_id": 2,
        "usuario_id" : 1,
        "finda_id" : 0,
        "fecha" : "27/12/2021",
        "estado" : false,
        "descripcion" : "Plaga en pimientos rojos"
      },{
        "incidencia_id": 0,
        "usuario_id" : 1,
        "finda_id" : 0,
        "fecha" : "30/12/2021",
        "estado" : false,
        "descripcion" : "Abono insufiente, hace falta comprar más"
      },{
        "incidencia_id": 1,
        "usuario_id" : 0,
        "finda_id" : 0,
        "fecha" : "28/12/2021",
        "estado" : false,
        "descripcion" : "Sistema de riego roto"
      },{
        "incidencia_id": 2,
        "usuario_id" : 1,
        "finda_id" : 0,
        "fecha" : "27/12/2021",
        "estado" : false,
        "descripcion" : "Plaga en pimientos rojos"
      },{
        "incidencia_id": 0,
        "usuario_id" : 1,
        "finda_id" : 0,
        "fecha" : "30/12/2021",
        "estado" : false,
        "descripcion" : "Abono insufiente, hace falta comprar más"
      },{
        "incidencia_id": 1,
        "usuario_id" : 0,
        "finda_id" : 0,
        "fecha" : "28/12/2021",
        "estado" : false,
        "descripcion" : "Sistema de riego roto"
      }
    ];
   }

  ngOnInit(): void {
  }

}