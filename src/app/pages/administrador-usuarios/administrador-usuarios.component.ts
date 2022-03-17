import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador-usuarios',
  templateUrl: './administrador-usuarios.component.html',
  styleUrls: ['./administrador-usuarios.component.css']
})
export class AdministradorUsuariosComponent implements OnInit {

  public usuarios:{};

  constructor() {


    this.usuarios = [
      {
        "usuario_id":0,
        "nombre":"Juan",
        "apellidos":"Gil y Gil",
        "telefono":"666 666 666",
        "email":"usuario2@gmail.com",
        "cargo":"Administrador"
      },
      {
        "usuario_id":0,
        "nombre":"José",
        "apellidos":"López Martínez",
        "telefono":"555 666 666",
        "email":"usuario3@gmail.com",
        "cargo":"Administrador"
      },
      {
        "usuario_id":0,
        "nombre":"Pedro",
        "apellidos":"Guillén Morientes",
        "telefono":"444 666 666",
        "email":"usuario4@gmail.com",
        "cargo":"trabajador"
      },
      {
        "usuario_id":0,
        "nombre":"Judith",
        "apellidos":"Hernández Abenza",
        "telefono":"333 666 666",
        "email":"usuario5@gmail.com",
        "cargo":"trabajador"
      },
      {
        "usuario_id":0,
        "nombre":"Adrian",
        "apellidos":"Naranja Murcia",
        "telefono":"222 666 666",
        "email":"usuario6@gmail.com",
        "cargo":"trabajador"
      },
      {
        "usuario_id":0,
        "nombre":"María",
        "apellidos":"Freeman Contreras",
        "telefono":"111 666 666",
        "email":"usuario7@gmail.com",
        "cargo":"trabajador"
      }
    ]
   }

  ngOnInit(): void {
  }

}
