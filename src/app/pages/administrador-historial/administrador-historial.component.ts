import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicion } from 'src/app/models/medicion';
import { MedicionesService } from 'src/app/shared/mediciones.service';
import { ToastService } from 'src/app/shared/toast.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-administrador-historial',
  templateUrl: './administrador-historial.component.html',
  styleUrls: ['./administrador-historial.component.css']
})
export class AdministradorHistorialComponent implements OnInit {

  public mediciones:Medicion[];
  public contador:number;
  public options;
  public options2;
  public etiquetas:string[];
  public datosHumedad:number[];
  public datosTemperatura:number[];
  public xAxisData:string[];
  public data1:number[];
  public isLoading: boolean;

  constructor(private medicionService:MedicionesService,private usuarioService:UsuarioService,
    private router:Router,private toastService:ToastService) {
    this.etiquetas=[];
    this.datosHumedad=[];
    this.datosTemperatura=[];
    this.xAxisData = [];
    this.data1 = [];

    this.medicionService.buscar().subscribe((datos:any)=>{
      if(datos.error ==true){
      }else{
        this.mediciones = datos.resultado;
      this.contador = datos.resultado.length;

      for (let i = 0; i < datos.resultado.length; i++) {
        let dateTimeParts= String(this.mediciones[i].fecha).split(/[- : T]/);
        this.etiquetas.push( dateTimeParts[2]+"-"+dateTimeParts[1]+"-"+dateTimeParts[0]+ " \n "+ this.mediciones[i].hora);
        this.datosHumedad.push(this.mediciones[i].humedad);
        this.datosTemperatura.push(this.mediciones[i].temperatura);
      }
    
      this.grafica2();
      this.grafica1(this.etiquetas,this.datosHumedad,this.datosTemperatura);
      }
      console.log(this.datosHumedad);
      console.log(this.datosTemperatura);

      
    })
   }

   public grafica2(){

      for (let i = 0; i < this.contador; i++) {
        let dateTimeParts= String(this.mediciones[i].fecha).split(/[- : T]/);
        this.xAxisData.push( dateTimeParts[2]+"-"+dateTimeParts[1]+"-"+dateTimeParts[0]+ " \n "+ this.mediciones[i].hora);
        this.data1.push(this.mediciones[i].tensionmatricial);
      }

      this.options2 = {
        legend: {
          data: ['Tension Matricial '],
          align: 'left',
        },
        tooltip: {},
        xAxis: {
          data: this.xAxisData,
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
            data: this.data1,
            animationDelay: (idx) => idx * 10,
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx) => idx * 5,
      };
   }

   public grafica1(etiquetas,datosHumedad,datosTemperatura){
    
    this.isLoading = false;
    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Humedad', 'Temperatura']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.etiquetas
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Humedad',
          type: 'line',
          stack: 'counts',
          areaStyle: { normal: {} },
          data: this.datosHumedad
        },
        {
          name: 'Temperatura',
          type: 'line',
          stack: 'counts',
          areaStyle: { normal: {} },
          data: this.datosTemperatura
        },
      ]
    };
   }

   public buscarTension(fin,inicio){
     
     
     this.medicionService.buscarRango(inicio,fin).subscribe((datos:any)=>{
      if(datos.error ==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        this.xAxisData=[];
        this.data1=[];
        this.mediciones=null;
        console.log(this.mediciones);
        this.mediciones = datos.resultado;
        this.contador = datos.resultado.length;
        this.grafica2();
      }
      
     })
   }

   public buscarHumedadTemperatura(fin,inicio){
    this.medicionService.buscarRango(inicio,fin).subscribe((datos:any)=>{
      if(datos.error ==true){
        this.toastService.showError(datos.mensaje,datos.titulo);
      }else{
        this.toastService.showOk(datos.mensaje,datos.titulo);
        this.etiquetas=[];
      this.datosHumedad =[];
      this.datosTemperatura = [];
      this.mediciones = datos.resultado;
      for (let i = 0; i < datos.resultado.length; i++) {
        let dateTimeParts= String(this.mediciones[i].fecha).split(/[- : T]/);
        this.etiquetas.push( dateTimeParts[2]+"-"+dateTimeParts[1]+"-"+dateTimeParts[0]+ " \n "+ this.mediciones[i].hora);
        this.datosHumedad.push(this.mediciones[i].humedad);
        this.datosTemperatura.push(this.mediciones[i].temperatura);
      }
      this.grafica1(this.etiquetas,this.datosHumedad,this.datosTemperatura);
      }
      
    })
   }

  ngOnInit(): void {

    if(this.usuarioService.logueado==false && this.usuarioService.usuario.rol!="2"){
      this.router.navigateByUrl('/login');
    }
  }

}
