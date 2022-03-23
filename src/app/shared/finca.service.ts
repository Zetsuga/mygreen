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
  public url2:string;
  public usuarioFinca:UsuarioFinca;


  constructor(private http:HttpClient) {
    this.finca = new Finca("",0,"","",0,0);

    this.url =`https://mygreenapi.herokuapp.com/usuario`;
    this.url2 =`https://mygreenapi.herokuapp.com/usuarioFinca`;
   }

   public insertarUsuarioFinca(id_usuario:number,id_finca:number):Observable<object>{
    console.log(id_usuario);
    console.log(id_finca);
    this.usuarioFinca = new UsuarioFinca(id_usuario,id_finca);
    console.log(this.usuarioFinca);
    return this.http.post(this.url2,this.usuarioFinca);
  }
}
