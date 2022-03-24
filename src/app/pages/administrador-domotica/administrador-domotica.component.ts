import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Router } from '@angular/router';
import { MedicionesService } from 'src/app/shared/mediciones.service';
import { number } from 'echarts';

@Component({
  selector: 'app-administrador-domotica',
  templateUrl: './administrador-domotica.component.html',
  styleUrls: ['./administrador-domotica.component.css']
})
export class AdministradorDomoticaComponent implements OnInit {

  mensaje = 1;
  mensaje2 = 2;
  public tension: number;
  public temperatura: number;
  public humedad: number;
  public isLoading: boolean;
  public options:any;
  public dataTension = [];
  public dataTemperatura = [];
  public dataHumedad = [];

  constructor(public usuario:UsuarioService, private router:Router, public mediciones:MedicionesService) {
   }

  ngOnInit(): void {
    if(this.usuario.logueado==false && this.usuario.usuario.rol!="2"){
      this.router.navigateByUrl('/login');
    }

    this.mediciones.buscar().subscribe((datos:any)=>{
      this.tension = datos.resultado[datos.resultado.length-1].tensionmatricial;
    })

    this.mediciones.buscar().subscribe((datos:any)=>{
      this.tension = datos.resultado[datos.resultado.length-1].tensionmatricial;
      this.temperatura = datos.resultado[datos.resultado.length-1].temperatura;
      this.humedad = datos.resultado[datos.resultado.length-1].humedad;
    })

    this.mediciones.buscarRango(null,null).subscribe((datos:any)=>{
      console.log(datos);

      for( let i = datos.resultado.length-1; i>datos.resultado.length - 8 ; i--){
        this.dataTension.push(datos.resultado[i].tensionmatricial);
        this.dataTemperatura.push(datos.resultado[i].temperatura);
        this.dataHumedad.push(datos.resultado[i].humedad);

      }

      console.log(this.dataTension);
      console.log(this.dataTemperatura);
      console.log(this.dataHumedad);
      
      
      

      // Pintamos la gráfica
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
      data: ['Tensión', 'Temp.', 'Humedad']
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Tensión',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: this.dataTension
      },
      {
        name: 'Temp.',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: this.dataTemperatura
      },
      {
        name: 'Humedad',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: this.dataHumedad
      },
    ]
  };
    })
  }

}
