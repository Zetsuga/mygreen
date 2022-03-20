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

  constructor(private http: HttpClient) { 
    this.logueado=false;
  }

  public edit(usuario:Usuario):Observable<object>{
    this.url =`http://127.0.0.1:3000/usuarios`;
    return this.http.put(this.url,usuario);
  }

   public register(usuario:Usuario):Observable<object>{
      this.url =`http://127.0.0.1:3000/registro`;

      return this.http.post(this.url,usuario);
   }

   public login(usuario:Usuario):Observable<object>{

    this.url =`http://127.0.0.1:3000/login`;

    return this.http.post(this.url,usuario);
   }
}
