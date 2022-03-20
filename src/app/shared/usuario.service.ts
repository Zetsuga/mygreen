import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string;
  public logueado:boolean;
  public usuario:Usuario;

  constructor(private http:HttpClient) { 
    this.logueado=false;
    this.usuario = new Usuario("","","","",0,"","","","","","");
    this.usuario.rol="1";
  }

  public login(usuario:Usuario):Observable<object>{

    this.url =`https://mygreenapi.herokuapp.com/login`;

    return this.http.post(this.url,usuario);
  }
}
