import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Incidencia } from 'src/app/models/incidencia';
import { FincaService } from 'src/app/shared/finca.service';
import { IncidenciasService } from 'src/app/shared/incidencias.service';
import { ToastService } from 'src/app/shared/toast.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-administrador-incidencias',
  templateUrl: './administrador-incidencias.component.html',
  styleUrls: ['./administrador-incidencias.component.css']
})
export class AdministradorIncidenciasComponent implements OnInit {

  public incidencias:Incidencia[];
  public incidencia:Incidencia;
  public indice:number;

  constructor(private usuarioService:UsuarioService,private fincaService:FincaService,
    private incidenciaService:IncidenciasService, private router:Router,private toastService:ToastService) {

      this.incidencia = new Incidencia(0,0,new Date,true,"");

    this.usuarioService.buscarUno(usuarioService.usuario.id_usuario).subscribe((datos:any)=>{
      this.fincaService.finca.id_finca = datos.resultado[0].id_finca;
      this.incidenciaService.buscar(this.fincaService.finca.id_finca).subscribe((datos:any)=>{
        this.incidencias = datos.resultado;
      })
    })
   }

   public cargarDatos(id){
      this.incidencia = this.incidencias[id];
      this.indice = id;
   }

   public finalizar(incidencia){
     this.incidenciaService.modificar(incidencia).subscribe((datos:any)=>{
       this.incidencias.splice(this.indice,1)
       this.incidencia=new Incidencia(0,0,new Date,true,"");
       if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
      }
     })
   }

  ngOnInit(): void {
    if(this.usuarioService.logueado==false && this.usuarioService.usuario.rol!="2"){
      this.router.navigateByUrl('/login');
    }
  }

}