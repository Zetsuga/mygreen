import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicionesService } from 'src/app/shared/mediciones.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-administrador-riego',
  templateUrl: './administrador-riego.component.html',
  styleUrls: ['./administrador-riego.component.css']
})
export class AdministradorRiegoComponent implements OnInit {

  public options: any;
  public tension: number;
  private xAxisData = [];
  private data1 = [];
  private data2 = [];

  constructor(public usuario:UsuarioService, public mediciones:MedicionesService, public router:Router) {
   }

 buscarRangoFechas(fechaInicio:Date,fechaFin:Date) {

  this.mediciones.buscarRango(fechaInicio,fechaFin).subscribe((datos:any)=>{
    console.log(datos);
    this.xAxisData = [];
    this.data1 = [];
    this.data2 = [];
    for (let i = 0; i < datos.resultado.length; i++) {
      this.xAxisData.push(datos.resultado[i].fecha);
      this.data1.push(datos.resultado[i].tensionmatricial);
      this.data2.push(datos.resultado[i].temperatura);
    }

    this.options = {
      legend: {
        data: ['TensionM', 'Temperatura'],
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
          name: 'TensionM',
          type: 'bar',
          data: this.data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'Temperatura',
          type: 'bar',
          data: this.data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  })
     
   }



  ngOnInit(): void {
     if(this.usuario.logueado==false && this.usuario.usuario.rol!="2"){
       this.router.navigateByUrl('/login');
     }

    this.mediciones.buscar().subscribe((datos:any)=>{
      this.tension = datos.resultado[datos.resultado.length-1].tensionmatricial;
    })

    this.mediciones.buscarRango(null,null).subscribe((datos:any)=>{
      console.log(datos);

    for (let i = 0; i < datos.resultado.length; i++) {
      this.xAxisData.push(datos.resultado[i].fecha);
      this.data1.push(datos.resultado[i].tensionmatricial);
      this.data2.push(datos.resultado[i].temperatura);
    }

    this.options = {
      legend: {
        data: ['TensionM', 'Temperatura'],
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
          name: 'TensionM',
          type: 'bar',
          data: this.data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'Temperatura',
          type: 'bar',
          data: this.data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };

    })

    
  }

}
