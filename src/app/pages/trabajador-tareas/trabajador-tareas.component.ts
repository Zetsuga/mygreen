import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Incidencia } from 'src/app/models/incidencia';
import { Tarea } from 'src/app/models/tarea';
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

  constructor(public usuarioService:UsuarioService,private tareaService:TareasService,
    private incidenciaService:IncidenciasService,private toastService:ToastService,
    private router:Router,public fincaService:FincaService) {
      this.tarea = new Tarea(0,0,new Date,"","","","");
      this.incidencia = new Incidencia(0,0,new Date,true,"","","");
      this.indice = 0;
      this.tareaService.buscarTodosUsuario(this.usuarioService.usuario.id_usuario).subscribe((datos:any)=>{
        if(datos.error==true){
          this.toastService.showError(datos.mensaje,datos.titulo);
        }else{
          this.toastService.showOk(datos.mensaje,datos.titulo);
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
      }
     })
   }

  ngOnInit(): void {
    if(this.usuarioService.logueado==false && this.usuarioService.usuario.rol!="4"){
      this.router.navigateByUrl('/login');
    }
  }

}
