import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm, AbstractControl } from '@angular/forms';
import { FincaService } from 'src/app/shared/finca.service';

@Component({
  selector: 'app-administrador-usuarios',
  templateUrl: './administrador-usuarios.component.html',
  styleUrls: ['./administrador-usuarios.component.css']
})
export class AdministradorUsuariosComponent implements OnInit {

  public usuarios:Usuario[];
  public usuario:Usuario;
  public botonFormulario:Boolean;
  public indice:number;
  private indicePopUP:number;


  constructor(public usuarioService:UsuarioService, private toastService:ToastService, private fincaService:FincaService,private router:Router) {

    this.botonFormulario=true
    this.usuario=new Usuario("","","","",0,"","","","4","","");
    this.usuarioService.buscarTodos(this.fincaService.finca.id_finca).subscribe((datos:any)=>{
      this.usuarios=datos.resultado;
    })

   }
   
   public onSubmit(form:NgForm){
    console.log(this.usuario);
     this.usuarioService.crear(this.usuario).subscribe((datos:any)=>{
       if(datos.error==true){
         this.toastService.showError(datos.mensaje,datos.titulo);
       }else{
         this.toastService.showOk(datos.mensaje, datos.titulo);
         this.fincaService.insertarUsuarioFinca(datos.resultado,this.fincaService.finca.id_finca).subscribe((datos:any)=>{
           if(datos.error==true){
             this.toastService.showError(datos.mensaje,datos.titulo);
           }else{
             this.toastService.showOk(datos.mensaje, datos.titulo);
             this.usuarios.push(this.usuario)
             this.usuario = new Usuario("","","","",0,"","","","4","","");
           }
         })
       }

    })

   }

   public cargarDatos(id){
     this.usuario = new Usuario(this.usuarios[id].nombre,this.usuarios[id].apellidos,this.usuarios[id].telefono,
      this.usuarios[id].direccion,this.usuarios[id].cp,this.usuarios[id].poblacion,this.usuarios[id].ciudad,
      null,this.usuarios[id].rol,this.usuarios[id].num_cuenta,this.usuarios[id].email);
      this.usuario.id_usuario = this.usuarios[id].id_usuario;
     this.botonFormulario = false;
     this.indice=id;
   }

   public eliminarUsuario(){
     console.log(this.indicePopUP)
     this.usuarioService.eliminar(this.usuarios[this.indicePopUP].id_usuario).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje, datos.titulo);
        this.usuarios.splice(this.indicePopUP,1);
        this.botonFormulario=true;
        
      }
     })
     this.closePopup();
   }

   public modificarUsuario(){
    if(this.usuario.contrasenia == ""){
      this.usuario.contrasenia = null;
    }
     this.usuarioService.modificar(this.usuario).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje, datos.titulo);
        this.usuarios[this.indice]=this.usuario;
        this.botonFormulario=true;
        this.usuario = new Usuario("","","","",0,"","","","4","","");
      }
     })
   }


   displayStyle = "none";
 
  openPopup(id) {
    //this.parte = this.tareas[id];
   this.indicePopUP  = id;
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



}
