import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm, AbstractControl } from '@angular/forms';
import { FincaService } from 'src/app/shared/finca.service';
import { AltausuarioService } from 'src/app/shared/altausuario.service';

@Component({
  selector: 'app-administrador-usuarios',
  templateUrl: './administrador-usuarios.component.html',
  styleUrls: ['./administrador-usuarios.component.css']
})
export class AdministradorUsuariosComponent implements OnInit {

  public usuarios:Usuario[];
  public usuario:Usuario;
  public usuarioSlice : Usuario[];
  public paginador : number[];
  public botonFormulario:Boolean;
  public indice:number;
  private indicePopUP:number;


  constructor(public usuarioService:UsuarioService, private toastService:ToastService, private fincaService:FincaService,
    private router:Router,private altaUsuarioService:AltausuarioService) {
      this.paginador=[];
    this.botonFormulario=true
    this.usuario=new Usuario("","","","",0,"","","","4","","");
    this.usuarioService.buscarTodos(this.fincaService.finca.id_finca).subscribe((datos:any)=>{
      this.usuarios=datos.resultado;
      for(let i=0;i<Math.ceil(datos.resultado.length/8);i++){
        this.paginador.push(i)
      }
      
      this.usuarioSlice = this.usuarios.slice(0,12);
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
             this.altaUsuarioService.mandarCorreo(this.usuario).subscribe((datos:any)=>{
               if(datos.error == true){
                 console.log(datos);
               }else{
                 this.usuario = new Usuario("","","","",0,"","","","4","","");
               }
               
             })
           }
         })
       }

    })

   }

   public cargarDatos(usuario:Usuario){

    for(let atributo of this.usuarios){
      if(atributo.id_usuario == usuario.id_usuario){
        this.usuario = atributo;
        this.usuario.contrasenia = null;
        this.botonFormulario = false;
      }
    }
   }

   public eliminarUsuario(){
     this.usuarioService.eliminar(this.usuario.id_usuario).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje, datos.titulo);
        let contador = 0;
        for(let atributo of this.usuarioSlice){
          if(atributo.id_usuario ==  this.usuario.id_usuario){
            this.usuarioSlice.splice(contador,1);
          }else{
            contador++;
          }
        }
        contador = 0;
        for(let atributo of this.usuarios){
          if(atributo.id_usuario ==  this.usuario.id_usuario){
            this.usuarios.splice(contador,1);
          }else{
            contador++;
          }
        }
        this.botonFormulario=true;
        this.usuario = new Usuario("","","","",0,"","","","4","","");
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
        
        let contador = 0;
        for ( let atributo of this.usuarioSlice){
          if(atributo.id_usuario == this.usuario.id_usuario){
            this.usuarioSlice[contador] = this.usuario;
          }else{
            contador++;
          }
        }
        contador = 0;

        for( let atributo of this.usuarios){
          if ( atributo.id_usuario == this.usuario.id_usuario){
            this.usuarios[contador]= this.usuario;
          }else{
            contador++;
          }
        }
        this.botonFormulario=true;
        this.usuario = new Usuario(null,null,null,null,0,"","",null,"4","",null);
      }
     })
   }


   displayStyle = "none";
 
  openPopup(usuario:Usuario) {
    //this.parte = this.tareas[id];
   this.usuario = usuario;
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
    this.usuarioSlice = this.usuarios.slice(indice*12,multiplicador*12);
  }

}
