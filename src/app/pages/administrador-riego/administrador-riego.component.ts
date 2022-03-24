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
  public colorTension:string;
  public mensaje:string;

  constructor(public usuario:UsuarioService, public mediciones:MedicionesService, public router:Router) {
    this.colorTension="";
   }

 buscarRangoFechas(fechaInicio:Date,fechaFin:Date) {

  this.mediciones.buscarRango(fechaInicio,fechaFin).subscribe((datos:any)=>{
    this.xAxisData = [];
    this.data1 = [];
    this.data2 = [];
    for (let i = 0; i < datos.resultado.length; i++) {
      let dateTimeParts= datos.resultado[i].fecha.split(/[- : T]/);
      this.xAxisData.push( dateTimeParts[2]+"-"+dateTimeParts[1]+"-"+dateTimeParts[0]+ " \n "+ datos.resultado[i].hora);
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


      if(this.tension<=4){
        this.colorTension = "rojo";
        this.mensaje ="POR FAVOR CONTROLE LA TENSIÓN PELIGRO";
      }else if(this.tension<=7){
        this.colorTension = "amarillo";
        this.mensaje ="REVISE LA TENSIÓN, POSIBLE SATURACIÓN";
      }else if(this.tension<=14){
        this.colorTension = "verde";
        this.mensaje ="TENSIÓN MATRICIAL CORRECTA";
      }else if(this.tension<=17){
        this.colorTension = "amarillo";
        this.mensaje ="REVISE LA TENCIÓN POSIBLE FALTA DE RIEGO";
      }else{
        this.colorTension = "rojo";
        this.mensaje ="POR FAVOR CONTROLE LA TENSIÓN PELIGRO";
      }


    })

    this.mediciones.buscarRango(null,null).subscribe((datos:any)=>{

    for (let i = 0; i < datos.resultado.length; i++) {
      let dateTimeParts= datos.resultado[i].fecha.split(/[- : T]/);
      this.xAxisData.push( dateTimeParts[2]+"-"+dateTimeParts[1]+"-"+dateTimeParts[0]+ " \n "+ datos.resultado[i].hora);
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
