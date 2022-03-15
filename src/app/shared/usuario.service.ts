import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public trabajador:boolean;

  constructor() { 
    this.trabajador=false;
  }
}
