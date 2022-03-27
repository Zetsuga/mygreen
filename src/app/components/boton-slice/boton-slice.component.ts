import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boton-slice',
  templateUrl: './boton-slice.component.html',
  styleUrls: ['./boton-slice.component.css']
})
export class BotonSliceComponent implements OnInit {

@Input() usuariohijo:number;

  constructor() { 
    
  }
  
  ngOnInit(): void {
  }

}
