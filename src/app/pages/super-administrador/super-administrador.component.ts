import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm, AbstractControl } from '@angular/forms';
import { FincaService } from 'src/app/shared/finca.service';

@Component({
  selector: 'app-super-administrador',
  templateUrl: './super-administrador.component.html',
  styleUrls: ['./super-administrador.component.css']
})
export class SuperAdministradorComponent implements OnInit {

  public superAdmin:Usuario[];
  public administradores:Usuario[];
  public usuario:Usuario;
  public botonFormulario:Boolean;
  public indice:number;
  private rolSuperAdmin = 1;
  private rolAdministrador = 2;
  private indicePopUP:number;

  constructor(public usuarioService:UsuarioService, private toastService:ToastService, private fincaService:FincaService,private router:Router) { 
    this.botonFormulario=true
    this.usuario=new Usuario("","","","",0,"","","","2","","");
    this.usuarioService.buscarAdmin(this.rolSuperAdmin).subscribe((datos:any)=>{
      this.superAdmin=datos.resultado;
    })

    this.usuarioService.buscarAdmin(this.rolAdministrador).subscribe((datos:any)=>{
      this.administradores=datos.resultado;
      console.log(this.administradores);
      
    })
  }

  public onSubmit(form:NgForm){
    console.log(this.usuario);
     this.usuarioService.crear(this.usuario).subscribe((datos:any)=>{
       if(datos.error==true){
         this.toastService.showError(datos.mensaje,datos.titulo);
       }else{
         this.toastService.showOk(datos.mensaje, datos.titulo);
         this.usuario.id_usuario = datos.resultado;
         if(this.usuario.rol == "2"){
          this.administradores.push(this.usuario);
          this.fincaService.insertarUsuarioFinca(this.usuario.id_usuario,1).subscribe((datos:any)=>{
            if(datos.error==true){
              this.toastService.showError(datos.mensaje,datos.titulo);
            }else{
              this.toastService.showOk(datos.mensaje,datos.titulo);
            }
          })
        }else{
           if (this.usuario.rol == "1"){
             this.superAdmin.push(this.usuario);
           }
         }
         }
    })

   }

   public cargarDatos(id){
     this.usuario = new Usuario(this.superAdmin[id].nombre,this.superAdmin[id].apellidos,this.superAdmin[id].telefono,
      this.superAdmin[id].direccion,this.superAdmin[id].cp,this.superAdmin[id].poblacion,this.superAdmin[id].ciudad,
      "",this.superAdmin[id].rol,this.superAdmin[id].num_cuenta,this.superAdmin[id].email);
      this.usuario.id_usuario = this.superAdmin[id].id_usuario;
     this.botonFormulario = false;
     this.indice=id;
   }
   public cargarDatos2(id){
    this.usuario = new Usuario(this.administradores[id].nombre,this.administradores[id].apellidos,this.administradores[id].telefono,
     this.administradores[id].direccion,this.administradores[id].cp,this.administradores[id].poblacion,this.administradores[id].ciudad,
     "",this.administradores[id].rol,this.administradores[id].num_cuenta,this.administradores[id].email);
     this.usuario.id_usuario = this.administradores[id].id_usuario;
    this.botonFormulario = false;
    this.indice=id;
  }

   public eliminarUsuario(id){
     console.log(this.superAdmin[id].id_usuario)
     this.usuarioService.eliminar(this.superAdmin[id].id_usuario).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje, datos.titulo);
        this.superAdmin.splice(id,1);
        this.botonFormulario=true;
      }
     })
   }

   public eliminarUsuario2(){
    console.log(this.indicePopUP);
    this.usuarioService.eliminar(this.administradores[this.indicePopUP].id_usuario).subscribe((datos:any)=>{
     if(datos.error==true){
       this.toastService.showError(datos.mensaje,datos.titulo);
     }else{
       this.toastService.showOk(datos.mensaje, datos.titulo);
       this.administradores.splice(this.indicePopUP,1);
       this.botonFormulario=true;
       
     }
     this.closePopup();
    })
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
        this.administradores[this.indice]=this.usuario;
        this.botonFormulario=true;
        this.usuario = new Usuario("","","","",0,"","","","","","");
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
