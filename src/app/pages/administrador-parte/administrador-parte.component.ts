import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-administrador-parte',
  templateUrl: './administrador-parte.component.html',
  styleUrls: ['./administrador-parte.component.css']
})
export class AdministradorParteComponent implements OnInit {

  public tareas:{};

  constructor(public usuario:UsuarioService) {
     
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
        "tarea_id" : 2,
        "usuario_id" : 2,
        "finca_id" : 0,
        "fecha" : "31/12/2021",
        "prioridad" : "urgente",
        "estado" : false,
        "descripcion" : "Hay que revisar la plaga de orius"
      }
    ]
  }

  ngOnInit(): void {
  }

}
