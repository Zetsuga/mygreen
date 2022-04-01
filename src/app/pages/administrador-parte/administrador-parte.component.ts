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
  public tareaSlice:Tarea[];
  public paginador:number[];
  public tarea:Tarea;
  public botonFormulario:Boolean;
  public fecha:Date;
  public usuarios:Usuario[];
  public indice:number;
  public fecha1: string;
  @ViewChild("fechaTarea") fechaTarea:ElementRef;
  private indicePopUP:number;

  constructor(public usuarioService:UsuarioService, private router:Router, public tareasService:TareasService, private toastService:ToastService) {
    this.botonFormulario=true;
    this.tarea = new Tarea(1,1,"","","","","");
    this.paginador = [];
    this.tareasService.buscarTodosFinca(1).subscribe((data:any)=>{
      this.tareas = data.resultado;

      for(let i=0;i<Math.ceil(data.resultado.length/6);i++){
        this.paginador.push(i)
      }
      
      this.tareaSlice = this.tareas.slice(0,6);
      
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
          this.tarea = new Tarea(1,1,"","","",""," ");
        })  
      }
      console.log(data.resultado);
      
      
    })
  }

  public eliminarTarea(){
    console.log(this.indicePopUP);
    
    this.tareasService.eliminar(this.tarea.id_tarea).subscribe((datos:any)=>{
      if(datos.error == true)
      this.toastService.showError(datos.mensaje,datos.titulo);
      else{
        this.toastService.showOk(datos.mensaje,datos.titulo);

        let contador = 0;
        for(let atributo of this.tareaSlice){
          if(atributo.id_tarea == this.tarea.id_tarea){
            this.tareaSlice.splice(contador,1);
          }else{
            contador++;
          }
        }
        contador =0;
        for(let atributo2 of this.tareas){
          if(atributo2.id_tarea == this.tarea.id_tarea){
            this.tareas.splice(contador,1);
          }else{
            contador++;
          }
        }
        this.botonFormulario = true;
      }
    })
    this.closePopup();
  }

  public cargarDatos (tarea:Tarea){   
    for(let atributo of this.tareas){
      if(atributo.id_tarea == tarea.id_tarea){
        this.tarea = atributo;
        let dateTimeParts= atributo.fecha.toString().split(/[- : T]/);
        this.fecha1= (dateTimeParts[0] + "-" + dateTimeParts[1]+ "-" + dateTimeParts[2]);
        this.tarea.fecha = this.fecha1;
      }
    }
    this.botonFormulario = false;
  }

  public modificarTarea(){
    
    this.tareasService.modificar(this.tarea).subscribe((data:any)=>{
      if(data.error == true)
      this.toastService.showError(data.mensaje,data.titulo);
      else{
        this.toastService.showOk(data.mensaje,data.titulo);
        for(let atributo of this.tareaSlice){
          if(atributo.id_tarea == this.tarea.id_tarea){
            atributo =this.tarea;
          }
        }
        for(let atributo of this.tareas){
          if(atributo.id_tarea == this.tarea.id_tarea){
            atributo =this.tarea;
          }
        }
        this.botonFormulario = true;
        this.tarea = new Tarea(0,0,"","","",""," ");
      }
    })
  }


  displayStyle = "none";
 
  openPopup(tarea) {
    //this.parte = this.tareas[id];
   this.tarea  = tarea;
   this.displayStyle = "block";
 }
 closePopup() {
   this.displayStyle = "none";
   this.indicePopUP = -1;
 }

  ngOnInit(): void {

    if(this.usuarioService.logueado==false && this.usuarioService.usuario.rol!="2"){
      this.router.navigateByUrl('/login');
    }

  }

  public cargarTabla(indice:number){
    let multiplicador = indice +1;
    this.tareaSlice = this.tareas.slice(indice*6,multiplicador*6);
  }

}
