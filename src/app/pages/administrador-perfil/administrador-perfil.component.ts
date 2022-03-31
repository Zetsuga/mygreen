import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-administrador-perfil',
  templateUrl: './administrador-perfil.component.html',
  styleUrls: ['./administrador-perfil.component.css']
})
export class AdministradorPerfilComponent implements OnInit {

  public usuario:Usuario;

  constructor(public usuarioService:UsuarioService, private toastService:ToastService, private router:Router ) {
    
    this.usuarioService.buscarUno(this.usuarioService.usuario.id_usuario).subscribe((datos:any)=>{
      if(datos.error==true){
      }else{
        this.usuario=datos.resultado[0];
        this.usuario.contrasenia="";
      }    
  })    

  }

  public onSubmit(form:NgForm){
    console.log(this.usuario);
    this.usuarioService.modificar(this.usuario).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje, datos.titulo);
        }
    })
  }

  ngOnInit(): void {
    if(this.usuarioService.logueado==false && this.usuarioService.usuario.rol!="2"){
      this.router.navigateByUrl('/login');
    }
  }

}
