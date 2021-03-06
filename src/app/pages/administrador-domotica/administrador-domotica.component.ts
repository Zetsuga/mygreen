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
  mensaje3 = 3;
  public tension: number;
  public temperatura: number;
  public humedad: number;
  public isLoading: boolean;
  public options:any;
  public options1:any;
  public options2:any;
  public dataTension = [];
  public dataTemperatura = [];
  public dataHumedad = [];
  public dataFecha = [];

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

      let datosAMostrar:number;

      if ( datos.resultado.length >= 40)
        datosAMostrar = 40;
      else
        datosAMostrar = datos.resultado.length;
      
    
      for( let i = datos.resultado.length-1; i>datos.resultado.length - datosAMostrar ; i--){
        let dateTimeParts= datos.resultado[i].fecha.split(/[- : T]/);
        this.dataFecha.push( dateTimeParts[2]+"-"+dateTimeParts[1]+"-"+dateTimeParts[0]+ " \n "+ datos.resultado[i].hora);
        this.dataTension.push(datos.resultado[i].tensionmatricial);
        this.dataTemperatura.push(datos.resultado[i].temperatura);
        this.dataHumedad.push(datos.resultado[i].humedad);

      }

      this.dataFecha.reverse();
      this.dataHumedad.reverse();
      this.dataTemperatura.reverse();
      this.dataTension.reverse();
      
     
      

      // Pintamos la gr??fica
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
      data: ['Tensi??n', 'Temp.', 'Humedad'],
      selected: {
        'Temp.': false,
        'Humedad':false
      }
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
        data: this.dataFecha
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Tensi??n',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: this.dataTension,
        
      },
      {
        name: 'Temp.',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: this.dataTemperatura,
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

  this.options1 = {
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
      data: ['Tensi??n', 'Temp.', 'Humedad'],
      selected: {
        'Tensi??n': false,
        'Humedad': false
      }
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
        data: this.dataFecha
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Tensi??n',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: this.dataTension,
        
      },
      {
        name: 'Temp.',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: this.dataTemperatura,
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


  this.options2 = {
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
      data: ['Tensi??n', 'Temp.', 'Humedad'],
      selected: {
        'Tensi??n': false,
        'Temp.': false
      }
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
        data: this.dataFecha
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Tensi??n',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: this.dataTension,
        
      },
      {
        name: 'Temp.',
        type: 'line',
        stack: 'counts',
        areaStyle: { normal: {} },
        data: this.dataTemperatura,
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
