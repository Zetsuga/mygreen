import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { RecordarPasswordService } from 'src/app/shared/recordar-password.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-recordar-password',
  templateUrl: './recordar-password.component.html',
  styleUrls: ['./recordar-password.component.css']
})

export class RecordarPasswordComponent implements OnInit {

  public usuario:Usuario;

  constructor(private router:Router,private recordarService:RecordarPasswordService,private toastService:ToastService) { 
    this.usuario = new Usuario("","","","",0,"","","","","","")
  }

  ngOnInit(): void {
  }

  public onSubmit(form:NgForm){
    this.recordarService.buscar(this.usuario).subscribe((datos:any)=>{
      if(datos.error){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        this.router.navigateByUrl("/login");
      }
    })
  }

}
