import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-administrador-riego',
  templateUrl: './administrador-riego.component.html',
  styleUrls: ['./administrador-riego.component.css']
})
export class AdministradorRiegoComponent implements OnInit {

  constructor(public usuario:UsuarioService) {
    this.usuario.trabajador = false;
   }

  ngOnInit(): void {
  }

}
