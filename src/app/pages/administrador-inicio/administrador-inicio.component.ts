import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-administrador-inicio',
  templateUrl: './administrador-inicio.component.html',
  styleUrls: ['./administrador-inicio.component.css']
})
export class AdministradorInicioComponent implements OnInit {

  public incidencias:{};
  public tareas:{};

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
      }
    ];

    this.tareas = [
      {
        "tarea_id" : 0,
        "usuario_id" : 1,
        "finca_id" : 0,
        "fecha" : "30/12/2021",
        "prioridad" : "urgente",
        "estado" : false,
        "descripcion" : "Hay que recolectar los pimientos rojos"
      },{
        "tarea_id" : 1,
        "usuario_id" : 1,
        "finca_id" : 0,
        "fecha" : "30/12/2021",
        "prioridad" : "medio",
        "estado" : false,
        "descripcion" : "Hay que recolectar los tomates"
      }
    ]
  }

  ngOnInit(): void {
  }

}
