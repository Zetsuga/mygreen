import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.css']
})
export class HeaderPanelComponent implements OnInit {

  constructor(public usuario:UsuarioService,private router:Router) { 
  }

  public desconectar():void{
    this.usuario.usuario = new Usuario("","","","",0,"","","","","","");
    this.router.navigateByUrl("/");
  }

  ngOnInit(): void {
  }

}
