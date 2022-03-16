import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-trabajador-fichar',
  templateUrl: './trabajador-fichar.component.html',
  styleUrls: ['./trabajador-fichar.component.css']
})
export class TrabajadorFicharComponent implements OnInit {

  public fichajes:{};
  constructor(public usuario:UsuarioService) {
    this.usuario.trabajador = true;
     
    this.fichajes = [
      {
        "fecha" : "15/02/2022",
        "entrada" : "07:00",
        "salida" : "14:32",
      },{
        "fecha" : "14/02/2022",
        "entrada" : "07:00",
        "salida" : "14:32",
      },{
        "fecha" : "13/02/2022",
        "entrada" : "07:00",
        "salida" : "14:32",
      },{
        "fecha" : "12/02/2022",
        "entrada" : "07:00",
        "salida" : "14:32",
      },{
        "fecha" : "11/02/2022",
        "entrada" : "07:00",
        "salida" : "14:32",
      },{
        "fecha" : "10/02/2022",
        "entrada" : "07:00",
        "salida" : "14:32",
      },{
        "fecha" : "09/02/2022",
        "entrada" : "07:00",
        "salida" : "14:32",
      }
    ]
  }

  ngOnInit(): void {
  }

}
