import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AltausuarioService {

  private url:string;

  constructor(private http:HttpClient) { 

    this.url =`https://mygreenapi.herokuapp.com/altaUsuario`;

  }

    /*
      
    */
    public mandarCorreo(usuario:Usuario):Observable<object>{
      return this.http.post(this.url,usuario);
    }
    

}
