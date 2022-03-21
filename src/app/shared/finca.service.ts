import { Injectable } from '@angular/core';
import { Finca } from '../models/finca';

@Injectable({
  providedIn: 'root'
})
export class FincaService {

  public finca:Finca;
  constructor() {
    this.finca = new Finca("",0,"","",0,0);
   }
}
