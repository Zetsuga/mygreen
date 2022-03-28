import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fichar } from 'src/app/models/fichar';
import { Nomina } from 'src/app/models/nomina';
import { Tarea } from 'src/app/models/tarea';
import { FicharService } from 'src/app/shared/fichar.service';
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
  public estado : boolean;

  public fichar:Fichar;

  constructor(public usuarioService:UsuarioService,private tareasService:TareasService,
    private router:Router,private toastService:ToastService,private nominasService:NominasService,
    private ficharService:FicharService) {

    this.estado = true;
    this.fichar=new Fichar(this.usuarioService.usuario.id_usuario,new Date,null,null);
    
    this.tareasService.buscarTodosUsuario(this.usuarioService.usuario.id_usuario).subscribe((datos:any)=>{
      if(datos.error==true){
      }else{
        this.tareas = datos.resultado;
      }
    })
    
    console.log("Buscamos nominas de: "+ this.usuarioService.usuario.id_usuario);
    
    this.nominasService.buscar(this.usuarioService.usuario.id_usuario).subscribe((datos:any)=>{
      if(datos.error==true){
      }else{
        this.nominas = datos.resultado;
      }
    })

    this.parte = new Tarea(0,0,"","","","","");
  
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

  public entrada(evento){
    let date = new Date;
    let hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
    this.fichar.entrada = hora;
    let hoy = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    this.ficharService.buscar(this.usuarioService.usuario.id_usuario,hoy).subscribe((datos:any)=>{
      if(datos.resultado.length>0){
       this.toastService.showError("Existen datos de fichar del día de hoy",datos.titulo);
      }else{
         this.ficharService.crear(this.fichar).subscribe((datos:any)=>{
           if(datos.error==true){
             this.toastService.showError(datos.mensaje,datos.titulo);
           }else{
             this.toastService.showOk(datos.mensaje, datos.titulo);
             this.estado = false;
             this.fichar.id_fichaje=datos.resultado;
           }
         })
      }
    })
  }
  public salida(evento){
    let date = new Date;
    let hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
    this.fichar.salida = hora;
    this.ficharService.modificar(this.fichar).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.estado = true;
        this.toastService.showOk(datos.mensaje, datos.titulo);
        this.fichar=new Fichar(this.usuarioService.usuario.id_usuario,new Date,null,null);
      }
    })
  }

}
