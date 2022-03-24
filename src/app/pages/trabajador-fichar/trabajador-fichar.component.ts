import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';
import { FicharService } from 'src/app/shared/fichar.service';
import { Fichar } from 'src/app/models/fichar';

@Component({
  selector: 'app-trabajador-fichar',
  templateUrl: './trabajador-fichar.component.html',
  styleUrls: ['./trabajador-fichar.component.css']
})
export class TrabajadorFicharComponent implements OnInit {

  public fichajes:Fichar[];
  public fichar:Fichar;

  constructor(public usuarioService:UsuarioService, private toastService:ToastService,
    private router:Router, public ficharService:FicharService) {

      console.log(this.usuarioService.usuario)

      this.ficharService.buscar(this.usuarioService.usuario.id_usuario).subscribe((datos:any)=>{
        console.log(datos.resultado)
        if(datos.error==true){
          this.toastService.showError(datos.mensaje,datos.titulo);
        }else{
          this.toastService.showOk(datos.mensaje,datos.titulo);
          this.ficharService.fichajes=datos.resultado;          
        }
      })

    
  }

  ngOnInit(): void {
    if(this.usuarioService.logueado==false && this.usuarioService.usuario.rol!="4"){
      this.router.navigateByUrl('/login');
    }
  }
}