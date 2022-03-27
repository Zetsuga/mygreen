import { Time } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import{faAddressBook} from '@fortawesome/free-solid-svg-icons';
import{faDoorClosed} from '@fortawesome/free-solid-svg-icons';
import { Fichar } from 'src/app/models/fichar';
import { Usuario } from 'src/app/models/usuario';
import { FicharService } from 'src/app/shared/fichar.service';
import { ToastService } from 'src/app/shared/toast.service';
import { UsuarioService } from 'src/app/shared/usuario.service';


@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.css']
})
export class MenuPanelComponent implements OnInit {

  @Output() eventoEntrada = new EventEmitter<any>();
  @Output() eventoSalida = new EventEmitter<any>();

  public faAddressBook;
  public faDoorClosed;
  public fichar:Fichar;
  public botonFormulario:boolean;
  public usuario:Usuario;
  
  constructor(public usuarioService:UsuarioService, private ficharService:FicharService, private toastService:ToastService) {
    this.faAddressBook = faAddressBook;
    this.faDoorClosed = faDoorClosed;
    this.botonFormulario = true;
  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario; 
  }

  public entrada(){
    this.botonFormulario=false;
    this.eventoEntrada.emit(true);
  }

  public salida(){
    this.botonFormulario=true;
    this.eventoSalida.emit(true);
  }
}
