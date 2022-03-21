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

  public incidencias:Incidencia;
  public tareas:Tarea;
  public medicion:Medicion;
  public temperatura:number;
  public humedad:number;
  public tension:number;
  public minTemp:number;
  public maxTemp:number;
  public clima:string;
  public options: any;

  constructor(public usuario:UsuarioService,public medicionService:MedicionesService,
    public incidenciaService:IncidenciasService,public tareasService:TareasService,
    public fincaService:FincaService, public climaService:ClimaService,private router:Router) { 
    this.medicionService.buscar().subscribe((datos:any)=>{
      this.medicion = datos.resultado;
      this.temperatura = this.medicion[datos.resultado.length -1].temperatura;
      this.humedad = this.medicion[datos.resultado.length -1].humedad;
      this.tension = this.medicion[datos.resultado.length -1].tensionmatricial;
    })

    this.climaService.getClima().subscribe((datos:any)=>{
      this.maxTemp = datos.temperaturas.max;
      this.minTemp = datos.temperaturas.min;
      this.clima = datos.stateSky.description;
    })
    this.usuario.buscarUno(usuario.usuario.id_usuario).subscribe((datos:any)=>{
      this.fincaService.finca.id_finca = datos.resultado[0].id_finca;
    })
    this.incidenciaService.buscar(this.fincaService.finca.id_finca).subscribe((datos:any)=>{
      console.log(datos)
      // this.incidencias = datos.resultado;
    })
  }

  ngOnInit(): void {
    if(this.usuario.logueado==false && this.usuario.usuario.rol!="2"){
      this.router.navigateByUrl('/login');
    }

    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('10:0'+ i+':00');
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['TensionM', 'Temperatura'],
        align: 'left',
      },
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
          name: 'TensionM',
          type: 'bar',
          data: data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'Temperatura',
          type: 'bar',
          data: data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

}
