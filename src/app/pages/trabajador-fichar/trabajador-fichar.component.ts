import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';
import { FicharService } from 'src/app/shared/fichar.service';
import { Fichar } from 'src/app/models/fichar';

@Component({
  selector: 'app-trabajador-fichar',
  templateUrl: './trabajador-fichar.component.html',
  styleUrls: ['./trabajador-fichar.component.css']
})
export class TrabajadorFicharComponent implements OnInit {

  public fichajes:Fichar[];
  public fichar:Fichar;
  public fichajeSlice:Fichar[];
  public paginador:number[];
  public estado:boolean;

  constructor(public usuarioService:UsuarioService, private toastService:ToastService,
    private router:Router, private ficharService:FicharService) {
      let date = new Date;
      let hoy = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      this.ficharService.buscar(this.usuarioService.usuario.id_usuario,hoy).subscribe((datos:any)=>{
        if(datos.resultado.length>0 && datos.resultado[0].salida == null){
          this.estado = false;
          this.fichar=datos.resultado[0];
        }else{
          this.estado = true;
          this.fichar=new Fichar(this.usuarioService.usuario.id_usuario,new Date,null,null);
        }
      })
      this.paginador = [];

      let fecha = new Date().getFullYear + "-" + new Date().getMonth + "-" + new Date().getDay

      this.fichar=new Fichar(this.usuarioService.usuario.id_usuario,new Date,null,null);

      console.log(this.fichar)

      this.ficharService.buscar(this.usuarioService.usuario.id_usuario,null).subscribe((datos:any)=>{

        if(datos.error==true){
        }else{
          this.fichajes=datos.resultado; 

          for(let i=0;i<Math.ceil(datos.resultado.length/12);i++){
            this.paginador.push(i)
          }
          
          this.fichajeSlice = this.fichajes.slice(0,12);
        }
      })
  }

  ngOnInit(): void {
    if(this.usuarioService.logueado==false && this.usuarioService.usuario.rol!="4"){
      this.router.navigateByUrl('/login');
    }
  }

  public entrada(evento){
    let date = new Date;
    let hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
    this.fichar.entrada = hora;
    let hoy = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    this.ficharService.buscar(this.usuarioService.usuario.id_usuario,hoy).subscribe((datos:any)=>{
      if(datos.resultado.length>0){
       this.toastService.showError("Existen datos de fichar del d??a de hoy",datos.titulo);
      }else{
         this.ficharService.crear(this.fichar).subscribe((datos:any)=>{
           if(datos.error==true){
             this.toastService.showError(datos.mensaje,datos.titulo);
           }else{
             this.toastService.showOk(datos.mensaje, datos.titulo);
             
             this.fichar.id_fichaje=datos.resultado;
             this.estado = false;
           }
         })
      }
    })
  }
  public salida(evento){
    let date = new Date;
    let hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
    this.fichar.salida = hora;
    this.ficharService.modificar(this.fichar).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje, datos.titulo);
        this.fichajes.push(this.fichar);
        this.fichar=new Fichar(this.usuarioService.usuario.id_usuario,new Date,null,null);
        this.estado = true;
      }
    })
  }

  public cargarTabla(indice:number){
    let multiplicador = indice +1;
    this.fichajeSlice = this.fichajes.slice(indice*12,multiplicador*12);
  }
}