import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { FormGroup, Validators, FormBuilder, NgForm, AbstractControl } from '@angular/forms';
import { TareasService } from 'src/app/shared/tareas.service';
import { Tarea } from 'src/app/models/tarea';
import { Usuario } from 'src/app/models/usuario';
import { ToastService } from 'src/app/shared/toast.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-administrador-parte',
  templateUrl: './administrador-parte.component.html',
  styleUrls: ['./administrador-parte.component.css']
})
export class AdministradorParteComponent implements OnInit {

  public tareas:Tarea[];
  public tarea:Tarea;
  public botonFormulario:Boolean;
  public fecha:Date;
  public usuarios:Usuario[];
  public indice:number;
  public fecha1: string;
  @ViewChild("fechaTarea") fechaTarea:ElementRef;

  constructor(public usuarioService:UsuarioService, private router:Router, public tareasService:TareasService, private toastService:ToastService) {
    this.botonFormulario=true;
    this.tarea = new Tarea(1,1,"","","","","");
    this.tareasService.buscarTodosFinca(1).subscribe((data:any)=>{
      this.tareas = data.resultado;
      
    })

    this.usuarioService.buscarTodos(1).subscribe((data:any)=>{
      this.usuarios = data.resultado;
    })
  
  }

  public onSubmit(form:NgForm){
    
    //pasamos a tipo number el id de usuario.
    this.tarea.id_usuario = Number(form.value.nombreyapellidos);
    
    
    this.tareasService.crear(this.tarea).subscribe((data:any)=>{
      if(data.error == true){
        this.toastService.showError(data.mensaje,data.titulo);
      }else{
        this.toastService.showOk(data.mensaje,data.titulo);
        this.usuarioService.buscarUno(this.tarea.id_usuario).subscribe((data:any)=>{
          this.tarea.nombre = data.resultado[0].nombre;
          this.tarea.apellidos = data.resultado[0].apellidos;
          this.tareas.push(this.tarea);
          this.tarea = new Tarea(0,0,"","","",""," ");
        })  
      }
      console.log(data.resultado);
      
      
    })
  }

  public eliminarTarea(id:number){
    console.log(this.tareas[id].id_tarea);
    
    this.tareasService.eliminar(this.tareas[id].id_tarea).subscribe((datos:any)=>{
      if(datos.error == true)
      this.toastService.showError(datos.mensaje,datos.titulo);
      else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        this.tareas.splice(id,1);
        this.botonFormulario = true;
      }
    })
  }

  public cargarDatos (id:number){
    this.tarea = new Tarea(this.tareas[id].id_usuario,this.tareas[id].id_finca,
      this.tareas[id].fecha, this.tareas[id].prioridad,this.tareas[id].descripcion,
      this.tareas[id].nombre,this.tareas[id].apellidos);
    
    let dateTimeParts= this.tareas[id].fecha.toString().split(/[- : T]/);
    this.fecha1= (dateTimeParts[0] + "-" + dateTimeParts[1]+ "-" + dateTimeParts[2]);
    this.tarea.fecha = this.fecha1;
    

    this.botonFormulario = false;
    this.indice = id;
  }

  public modificarTarea(id:number){
    this.tareasService.modificar(this.tarea).subscribe((data:any)=>{
      if(data.error == true)
      this.toastService.showError(data.mensaje,data.titulo);
      else{
        this.toastService.showOk(data.mensaje,data.titulo);
        this.tareas[this.indice] = this.tarea;
        this.botonFormulario = true;
        this.tarea = new Tarea(0,0,"","","",""," ");
      }
    })
  }

  ngOnInit(): void {

    // if(this.usuarioService.logueado==false && this.usuarioService.usuario.rol!="2"){
    //   this.router.navigateByUrl('/login');
    // }

  }

}
