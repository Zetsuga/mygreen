import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { FincaService } from 'src/app/shared/finca.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.css']
})
export class HeaderPanelComponent implements OnInit {

  constructor(public usuario:UsuarioService,public fincaService:FincaService, private router:Router) { 
  }

  public desconectar():void{
    this.usuario.usuario = new Usuario("","","","",0,"","","","","","");
    this.fincaService.finca = null;
    this.router.navigateByUrl("/");
  }

  ngOnInit(): void {
  }

}
