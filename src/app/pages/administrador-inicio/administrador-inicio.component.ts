import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Incidencia } from 'src/app/models/incidencia';
import { Medicion } from 'src/app/models/medicion';
import { Tarea } from 'src/app/models/tarea';
import { ClimaService } from 'src/app/shared/clima.service';
import { FincaService } from 'src/app/shared/finca.service';
import { IncidenciasService } from 'src/app/shared/incidencias.service';
import { MedicionesService } from 'src/app/shared/mediciones.service';
import { TareasService } from 'src/app/shared/tareas.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-administrador-inicio',
  templateUrl: './administrador-inicio.component.html',
  styleUrls: ['./administrador-inicio.component.css']
})
export class AdministradorInicioComponent implements OnInit {

  public incidencias:Incidencia[];
  public tareas:Tarea[];
  public medicion:Medicion;
  public temperatura:number;
  public humedad:number;
  public tension:number;
  public minTemp:number;
  public maxTemp:number;
  public clima:string;
  public options: any;
  public colorTemperatura:string;
  public colorHumedad:string;
  public colorTension:string;


  constructor(public usuario:UsuarioService,public medicionService:MedicionesService,
    public incidenciaService:IncidenciasService,public tareasService:TareasService,
    public fincaService:FincaService, public climaService:ClimaService,private router:Router) { 

      this.colorTemperatura="";
      this.colorHumedad="";
      this.colorTension="";

      
    
    this.medicionService.buscar().subscribe((datos:any)=>{
      console.log(datos)
      this.medicion = datos.resultado;
      this.temperatura = this.medicion[datos.resultado.length -1].temperatura;
      this.humedad = this.medicion[datos.resultado.length -1].humedad;
      this.tension = this.medicion[datos.resultado.length -1].tensionmatricial;

      
      if(this.temperatura<=10){
        this.colorTemperatura = "rojo";
      }else if(this.temperatura<=27){
        this.colorTemperatura = "verde";
      }else if(this.temperatura<=31){
        this.colorTemperatura = "amarillo";
      }else{
        this.colorTemperatura = "rojo";
      }

      if(this.humedad<=35){
        this.colorHumedad = "rojo";
      }else if(this.humedad<=50){
        this.colorHumedad = "verde";
      }else if(this.humedad<=55){
        this.colorHumedad = "amarillo";
      }else{
        this.colorHumedad = "rojo";
      }

      if(this.tension<=4){
        this.colorTension = "rojo";
      }else if(this.tension<=7){
        this.colorTension = "amarillo";
      }else if(this.tension<=14){
        this.colorTension = "verde";
      }else if(this.tension<=17){
        this.colorTension = "amarillo";
      }else{
        this.colorTension = "rojo";
      }

      
      const xAxisData = [];
    const data1 = [];

    for (let i = 0; i < datos.resultado.length; i++) {
      let dateTimeParts= this.medicion[i].fecha.split(/[- : T]/);
      xAxisData.push( dateTimeParts[2]+"-"+dateTimeParts[1]+"-"+dateTimeParts[0]+ " \n "+ this.medicion[i].hora);
      data1.push(this.medicion[i].tensionmatricial);
    }

    this.options = {
        
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };

    })

    this.climaService.getClima().subscribe((datos:any)=>{
      this.maxTemp = datos.temperaturas.max;
      this.minTemp = datos.temperaturas.min;
      this.clima = datos.stateSky.description.toUpperCase();
    })

    this.usuario.buscarUno(usuario.usuario.id_usuario).subscribe((datos:any)=>{
      this.fincaService.finca.id_finca = datos.resultado[0].id_finca;
      this.incidenciaService.buscar(this.fincaService.finca.id_finca).subscribe((datos:any)=>{
        this.incidencias = datos.resultado;
      })

      this.tareasService.buscarTodosFinca(this.fincaService.finca.id_finca).subscribe((datos:any)=>{
        this.tareas = datos.resultado;
      })
    })
  }

  ngOnInit(): void {
    if(this.usuario.logueado==false && this.usuario.usuario.rol!="2"){
      this.router.navigateByUrl('/login');
    }

    
  }
}
