import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-administrador-perfil',
  templateUrl: './administrador-perfil.component.html',
  styleUrls: ['./administrador-perfil.component.css']
})
export class AdministradorPerfilComponent implements OnInit {

  constructor(public usuario:UsuarioService) { 
  }

  ngOnInit(): void {
  }

}
