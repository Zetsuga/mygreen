import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Finca } from 'src/app/models/finca';
import { Incidencia } from 'src/app/models/incidencia';
import { Usuario } from 'src/app/models/usuario';
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
  public incidenciaSlice:Incidencia[];
  public paginador:number[];
  public indice:number;
  public finca: Finca;
  public usuario:Usuario;

  constructor(public usuarioService:UsuarioService,public fincaService:FincaService,
    private incidenciaService:IncidenciasService, private router:Router,private toastService:ToastService) {

      this.incidencia = new Incidencia(0,0,"",true,"","","");
      this.finca = new Finca("",0,"","",0,0);
      this.usuario = new Usuario("","","","",0,"","","","","","")
      this.paginador = [];

    this.usuarioService.buscarUno(usuarioService.usuario.id_usuario).subscribe((datos:any)=>{
      this.fincaService.finca.id_finca = datos.resultado[0].id_finca;
      
      this.incidenciaService.buscar(this.fincaService.finca.id_finca).subscribe((datos:any)=>{
        this.incidencias = datos.resultado;
        for(let i=0;i<Math.ceil(datos.resultado.length/8);i++){
          this.paginador.push(i)
        }
        
        this.incidenciaSlice = this.incidencias.slice(0,8);
        
      })
    })
   }

   public cargarDatos(incidencia:Incidencia){
      for(let atributo of this.incidencias){
        if(atributo.id_incidencia == incidencia.id_incidencia ){
          let dateTimeParts= String(atributo.fecha).split(/[- : T]/);
          let fecha=  dateTimeParts[2]+"-"+dateTimeParts[1]+"-"+dateTimeParts[0];      
          this.incidencia = atributo;
          this.incidencia.fecha = fecha;
          this.usuarioService.buscarUno(this.incidencia.id_usuario).subscribe((datos:any)=>{
            this.finca = new Finca(datos.resultado[0].fincadireccion,0,"","",0,0);
            this.usuario = datos.resultado[0];
            
          })
        }
      }
     
      // this.indice = id;
     
   }

   public finalizar(incidencia){
     this.incidenciaService.modificar(incidencia).subscribe((datos:any)=>{
       this.incidencias.splice(this.indice,1)
       this.incidencia=new Incidencia(0,0,"",true,"","","");
       if(datos.error==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        let contador = 0;
        for(let atributo of this.incidenciaSlice){
          if(atributo.id_incidencia == incidencia.id_incidencia){
            this.incidenciaSlice.splice(contador,1)
          }else{
            contador++;
          }
        }
        contador = 0;
        for(let atributo of this.incidencias){
          if(atributo.id_incidencia == incidencia.id_incidencia){
            this.incidencias.splice(contador,1)
          }else{
            contador++;
          }
        }
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
    this.incidenciaSlice = this.incidencias.slice(indice*8,multiplicador*8);

  }
  
}