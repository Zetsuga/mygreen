import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-trabajador-tareas',
  templateUrl: './trabajador-tareas.component.html',
  styleUrls: ['./trabajador-tareas.component.css']
})
export class TrabajadorTareasComponent implements OnInit {

  public tareas;

  constructor(public usuario:UsuarioService) {
    this.usuario.trabajador = true;

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
      },{
        "tarea_id" : 1,
        "usuario_id" : 1,
        "finca_id" : 0,
        "fecha" : "30/12/2021",
        "prioridad" : "bajo",
        "estado" : false,
        "descripcion" : "Hay que recolectar los tomates"
      },{
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
        "prioridad" : "bajo",
        "estado" : false,
        "descripcion" : "Hay que recolectar los tomates"
      }
    ]

   }



  ngOnInit(): void {
  }

}
