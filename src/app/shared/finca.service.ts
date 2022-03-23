import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Finca } from '../models/finca';
import { UsuarioFinca } from '../models/usuario-finca';

@Injectable({
  providedIn: 'root'
})
export class FincaService {

  public finca:Finca;
  public url:string;
  public usuarioFinca:UsuarioFinca;

  constructor(private http:HttpClient) {
    this.finca = new Finca("",0,"","",0,0);

    this.url =`https://mygreenapi.herokuapp.com/usuario`;
   }

   public insertarUsuarioFinca(id_usuario:number,id_finca:number):Observable<object>{
    this.usuarioFinca = new UsuarioFinca(id_usuario,id_finca);
    return this.http.post(this.url,this.usuarioFinca);
  }
}
