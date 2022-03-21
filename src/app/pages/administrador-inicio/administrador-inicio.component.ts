import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-administrador-inicio',
  templateUrl: './administrador-inicio.component.html',
  styleUrls: ['./administrador-inicio.component.css']
})
export class AdministradorInicioComponent implements OnInit {

  public incidencias:{};
  public tareas:{};
  public options: any;

  constructor(public usuario:UsuarioService) {
    this.incidencias = [
      {
        "incidencia_id": 0,
        "usuario_id" : 1,
        "finda_id" : 0,
        "fecha" : "30/12/2021",
        "estado" : false,
        "descripcion" : "Abono insufiente, hace falta comprar más"
      },{
        "incidencia_id": 1,
        "usuario_id" : 0,
        "finda_id" : 0,
        "fecha" : "28/12/2021",
        "estado" : false,
        "descripcion" : "Sistema de riego roto"
      },{
        "incidencia_id": 2,
        "usuario_id" : 1,
        "finda_id" : 0,
        "fecha" : "27/12/2021",
        "estado" : false,
        "descripcion" : "Plaga en pimientos rojos"
      }
    ];

    this.tareas = [
      {
        "tarea_id" : 0,
        "usuario_id" : 1,
        "finca_id" : 0,
        "fecha" : "30/12/2021",
        "prioridad" : "urgente",
        "estado" : false,
        "descripcion" : "Hay que recolectar los pimientos rojos"
      },{
        "tarea_id" : 1,
        "usuario_id" : 1,
        "finca_id" : 0,
        "fecha" : "30/12/2021",
        "prioridad" : "medio",
        "estado" : false,
        "descripcion" : "Hay que recolectar los tomates"
      }
    ]
  }

  ngOnInit(): void {

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
