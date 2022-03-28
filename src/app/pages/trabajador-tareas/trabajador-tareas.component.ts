import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fichar } from 'src/app/models/fichar';
import { Incidencia } from 'src/app/models/incidencia';
import { Tarea } from 'src/app/models/tarea';
import { FicharService } from 'src/app/shared/fichar.service';
import { FincaService } from 'src/app/shared/finca.service';
import { IncidenciasService } from 'src/app/shared/incidencias.service';
import { TareasService } from 'src/app/shared/tareas.service';
import { ToastService } from 'src/app/shared/toast.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-trabajador-tareas',
  templateUrl: './trabajador-tareas.component.html',
  styleUrls: ['./trabajador-tareas.component.css']
})
export class TrabajadorTareasComponent implements OnInit {

  public tareas:Tarea[];
  public tarea:Tarea;
  public incidencia:Incidencia;
  public indice:number;
  public fichar:Fichar;
  public estado:boolean;

  constructor(public usuarioService:UsuarioService,private tareaService:TareasService,
    private incidenciaService:IncidenciasService,private toastService:ToastService,
    private router:Router,public fincaService:FincaService,private ficharService:FicharService) {
      this.estado = true;
      this.fichar=new Fichar(this.usuarioService.usuario.id_usuario,new Date,null,null);
      this.tarea = new Tarea(0,0,"","","","","");
      this.incidencia = new Incidencia(0,0,new Date,true,"","","");
      this.indice = 0;
      this.tareaService.buscarTodosUsuario(this.usuarioService.usuario.id_usuario).subscribe((datos:any)=>{
        if(datos.error==true){
        }else{
          this.tareas = datos.resultado;
        }
      })

   }

   public eliminarTarea(id_tarea){
    this.tareaService.eliminar(id_tarea).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        this.tareas.splice(this.indice,1);
      }
    })
   }

   public cargarDatos(indice){
     this.tarea = this.tareas[indice];
     this.indice = indice;
   }

   public guardarIncidencia(){
     this.incidencia.id_usuario = this.usuarioService.usuario.id_usuario;
     this.incidencia.id_finca = 1;
     this.incidenciaService.crear(this.incidencia).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        this.incidencia = new Incidencia(0,0,new Date,true,"","","");
      }
     })
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
        this.toastService.showOk(datos.mensaje, datos.titulo);
        this.estado = true;
        this.fichar=new Fichar(this.usuarioService.usuario.id_usuario,new Date,null,null);
      }
    })
  }
}
