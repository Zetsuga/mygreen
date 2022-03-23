import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nomina } from 'src/app/models/nomina';
import { Tarea } from 'src/app/models/tarea';
import { NominasService } from 'src/app/shared/nominas.service';
import { TareasService } from 'src/app/shared/tareas.service';
import { ToastService } from 'src/app/shared/toast.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-trabajador-inicio',
  templateUrl: './trabajador-inicio.component.html',
  styleUrls: ['./trabajador-inicio.component.css']
})
export class TrabajadorInicioComponent implements OnInit {

  public nominas:Nomina[];
  public tareas:Tarea[]; 
  public parte:Tarea;

  constructor(public usuarioService:UsuarioService,private tareasService:TareasService,
    private router:Router,private toastService:ToastService,private nominasService:NominasService,
    ) {
    this.tareasService.buscarTodosUsuario(this.usuarioService.usuario.id_usuario).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        this.tareas = datos.resultado;
      }
    })

    this.nominasService.buscar(this.usuarioService.usuario.id_usuario).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        this.nominas = datos.resultado;
      }
    })

    this.parte = new Tarea(0,0,new Date,"","");
  
 }

 public eliminarTarea(id_tarea:number,indice){
  this.tareasService.eliminar(id_tarea).subscribe((datos:any)=>{
    if(datos.error==true){
      this.toastService.showError(datos.mensaje,datos.titulo);
    }else{
      this.toastService.showOk(datos.mensaje,datos.titulo);
      this.tareas.splice(indice,1);
    }
  })
 }

 displayStyle = "none";
 openPopup(id) {
   this.parte = this.tareas[id];
  this.displayStyle = "block";
}
closePopup() {
  this.displayStyle = "none";
}

  ngOnInit(): void {

    if(this.usuarioService.logueado==false && this.usuarioService.usuario.rol!="4"){
      this.router.navigateByUrl('/login');
    }
  }

}
