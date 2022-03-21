import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FincaService } from 'src/app/shared/finca.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario: Usuario;

  constructor(private usuarioService:UsuarioService,private router:Router,
    private toastService:ToastService,private fincaService:FincaService) { 
      this.usuario = new Usuario("","","","",0,"","","","","","");
    }

    public onSubmit(form:NgForm){
      
      this.usuarioService.login(this.usuario).subscribe((datos:any)=>{
        
        if(datos.error==true){
          this.usuarioService.logueado = false;
          this.usuarioService.usuario = null;
          this.fincaService.finca =null;
          this.toastService.showError(datos.mensaje,datos.titulo);
        }else{
          this.usuarioService.logueado = true;
          this.usuarioService.usuario = datos.resultado[0];
          this.fincaService.finca.id_finca = datos.resultado[0].id_finca;
          this.toastService.showOk(datos.mensaje,datos.titulo)
          if(datos.resultado[0].rol == "1"){
            
          }else if(datos.resultado[0].rol == "2"){
            this.router.navigateByUrl('/administrador/inicio');
          }else{
            this.router.navigateByUrl('/trabajador/inicio');
          }
          
        }
      });
    }

  ngOnInit(): void {
  }

}
