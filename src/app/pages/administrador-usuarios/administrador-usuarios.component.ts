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

   public cargarDatos(id){
     this.usuario = new Usuario(this.usuarios[id].nombre,this.usuarios[id].apellidos,this.usuarios[id].telefono,
      this.usuarios[id].direccion,this.usuarios[id].cp,this.usuarios[id].poblacion,this.usuarios[id].ciudad,
      this.usuarios[id].contrasenia,this.usuarios[id].rol,this.usuarios[id].num_cuenta,this.usuarios[id].email);
      this.usuario.id_usuario = this.usuarios[id].id_usuario;
     this.botonFormulario = false;
     this.indice=id;
   }

   public eliminarUsuario(id){
     console.log(this.usuarios[id].id_usuario)
     this.usuarioService.eliminar(this.usuarios[id].id_usuario).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje, datos.titulo);
        this.usuarios.splice(id,1);
        this.botonFormulario=true;
        
      }
     })
   }

   public modificarUsuario(){
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
