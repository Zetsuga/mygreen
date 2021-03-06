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
  public tareaSlice:Tarea[];
  public paginador:number[];
  public incidencia:Incidencia;
  public indice:number;
  public fichar:Fichar;
  public estado:boolean;

  constructor(public usuarioService:UsuarioService,private tareaService:TareasService,
    private incidenciaService:IncidenciasService,private toastService:ToastService,
    private router:Router,public fincaService:FincaService,private ficharService:FicharService) {
  
      let date = new Date;
      let hoy = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      this.ficharService.buscar(this.usuarioService.usuario.id_usuario,hoy).subscribe((datos:any)=>{
        if(datos.resultado.length>0 && datos.resultado[0].salida == null){
          this.estado = false;
          this.fichar=datos.resultado[0];
        }else{
          this.estado = true;
          this.fichar=new Fichar(this.usuarioService.usuario.id_usuario,new Date,null,null);
        }
      })
      this.paginador = [];
      this.fichar=new Fichar(this.usuarioService.usuario.id_usuario,new Date,null,null);
      this.tarea = new Tarea(0,0,"","","","","");
      this.incidencia = new Incidencia(0,0,"",true,"","","");
      this.indice = 0;
      this.tareaService.buscarTodosUsuario(this.usuarioService.usuario.id_usuario).subscribe((datos:any)=>{
        if(datos.error==true){
        }else{
          this.tareas = datos.resultado;
          for(let i=0;i<Math.ceil(datos.resultado.length/7);i++){
            this.paginador.push(i)
          }
          
          this.tareaSlice = this.tareas .slice(0,7);
        }
      })

   }

   public eliminarTarea(id_tarea){
    this.tareaService.eliminar(id_tarea).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        let contador = 0;
        for(let atributo of this.tareaSlice){
          if(atributo.id_tarea == id_tarea){
            this.tareaSlice.splice(contador,1);
          }else{
            contador++;
          }
        }
        contador = 0;
        for(let atributo of this.tareas){
          if(atributo.id_tarea == id_tarea){
            this.tareas.splice(contador,1);
          }else{
            contador++;
          }
        }
      }
    })
   }

   public cargarDatos(tarea:Tarea){

    for(let atributo of this.tareas){
      if(atributo.id_tarea == tarea.id_tarea){
        this.tarea = atributo;
      }
    }
   }

   public guardarIncidencia(){
     this.incidencia.id_usuario = this.usuarioService.usuario.id_usuario;
     this.incidencia.id_finca = 1;
     this.incidenciaService.crear(this.incidencia).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        this.incidencia = new Incidencia(0,0,"",true,"","","");
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
        this.toastService.showError("Existen datos de fichar del d??a de hoy",datos.titulo);
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

  public cargarTabla(indice:number){
    let multiplicador = indice +1;
    this.tareaSlice = this.tareas.slice(indice*7,multiplicador*7);
  }

}
