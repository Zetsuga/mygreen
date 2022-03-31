import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { number } from 'echarts';
import { Finca } from 'src/app/models/finca';
import { Usuario } from 'src/app/models/usuario';
import { FincaService } from 'src/app/shared/finca.service';
import { IncidenciasService } from 'src/app/shared/incidencias.service';
import { ToastService } from 'src/app/shared/toast.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-super-finca',
  templateUrl: './super-finca.component.html',
  styleUrls: ['./super-finca.component.css']
})
export class SuperFincaComponent implements OnInit {

  public fincas:Finca[];
  public finca:Finca;
  public fincaSlice:Finca[];
  public paginador:number[];
  public indice:number;
  public usuario:Usuario;
  public botonFormulario:boolean;
  public indicePopUP:number;

  constructor(public usuarioService:UsuarioService,public fincaService:FincaService,
    private incidenciaService:IncidenciasService, private router:Router,private toastService:ToastService) {

      this.finca = new Finca("",0,"","",0,0);
      this.usuario = new Usuario("","","","",0,"","","","","","")
      this.paginador = [];
      this.botonFormulario = true;
      this.indicePopUP=0;

      this.fincaService.buscar().subscribe((datos:any)=>{
        this.fincas = datos.resultado;

        for(let i=0;i<Math.ceil(datos.resultado.length/11);i++){
          this.paginador.push(i)
        }
        
        this.fincaSlice = this.fincas.slice(0,11);
      })
   }

   public cargarDatos(id){
      this.finca = this.fincas[id];
      this.indice = id;
      this.botonFormulario = false;
   }

   public guardar(){
      this.fincaService.guardar(this.finca).subscribe((datos:any)=>{
        if(datos.error==true){
          this.toastService.showError(datos.mensaje,datos.titulo);
        }else{
          this.toastService.showOk(datos.mensaje,datos.titulo);
          this.fincas.push(this.finca);
          this.finca = new Finca("",0,"","",0,0)
        }
      })
   }

  ngOnInit(): void {
    if(this.usuarioService.logueado==false && this.usuarioService.usuario.rol!="1"){
      this.router.navigateByUrl('/login');
    }
  }

  public cargarTabla(indice:number){
    let multiplicador = indice +1;
    this.fincaSlice = this.fincas.slice(indice*11,multiplicador*11);
  }

  public modificarFinca(){
    this.fincaService.modificar(this.finca).subscribe((datos:any)=>{
      if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        this.finca[this.indice]=this.finca;
        this.botonFormulario=true;
        this.finca = new Finca("",0,"","",0,0)
      }
    })
  }

  public eliminarFinca(){
    this.fincaService.eliminar(this.fincas[this.indicePopUP].id_finca).subscribe((datos:any)=>{
     if(datos.error==true){
       this.toastService.showError(datos.mensaje,datos.titulo);
     }else{
       this.toastService.showOk(datos.mensaje, datos.titulo);
       this.fincas.splice(this.indicePopUP,1);
       this.fincaSlice.splice(this.indicePopUP,1)
       this.botonFormulario=true;
       
     }
    })
    this.closePopup();
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

}
