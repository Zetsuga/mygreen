import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-trabajador-inicio',
  templateUrl: './trabajador-inicio.component.html',
  styleUrls: ['./trabajador-inicio.component.css']
})
export class TrabajadorInicioComponent implements OnInit {

  public nominas:String[];
  public horarios:{};
  public tareas:{}

  constructor(public usuario:UsuarioService) {
    this.usuario.trabajador = true;

    this.nominas = ["enero","febrero","marzo","abril", "mayo","junio"]

    this.horarios = [{
      "dia" : "30/12/2021",
      "entrada": "08:00",
      "salida" : "17:00"
    },{
      "dia" : "27/12/2021",
      "entrada": "08:00",
      "salida" : "17:00"
    },{
      "dia" : "25/12/2021",
      "entrada": "08:00",
      "salida" : "17:00"
    }];

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
