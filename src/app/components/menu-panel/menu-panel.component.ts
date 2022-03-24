import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import{faAddressBook} from '@fortawesome/free-solid-svg-icons';
import{faDoorClosed} from '@fortawesome/free-solid-svg-icons';
import { Fichar } from 'src/app/models/fichar';
import { FicharService } from 'src/app/shared/fichar.service';
import { ToastService } from 'src/app/shared/toast.service';
import { UsuarioService } from 'src/app/shared/usuario.service';


@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.css']
})
export class MenuPanelComponent implements OnInit {

  public faAddressBook;
  public faDoorClosed;
  public fichar:Fichar;
  public botonFormulario:boolean;
  
  constructor(public usuarioService:UsuarioService, private ficharService:FicharService, private toastService:ToastService) {
    this.faAddressBook = faAddressBook;
    this.faDoorClosed = faDoorClosed;
    this.botonFormulario = true;

    this.fichar=new Fichar(this.usuarioService.usuario.id_usuario,new Date,null,null);
  }

  ngOnInit(): void {
  }

  public entrada(){
    let date = new Date;
    let hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
    this.fichar.entrada = hora;
    this.ficharService.crear(this.fichar).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje, datos.titulo);
        this.botonFormulario=false;
        this.fichar.id_fichaje=datos.resultado;
      }
    })
  }
  public salida(){
    let date = new Date;
    let hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
    this.fichar.salida = hora;
    this.ficharService.modificar(this.fichar).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje, datos.titulo);
        this.fichar=new Fichar(this.usuarioService.usuario.id_usuario,new Date,null,null);
        this.botonFormulario=true;
      }
    })
  }

}
