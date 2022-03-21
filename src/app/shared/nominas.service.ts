import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NominasService {

  private url:string;

  constructor(private http:HttpClient) { 

    this.url =`https://mygreenapi.herokuapp.com/nominas`;

  }

  /*
    La función buscar retorna las seis últimas nominas de el usuario
    Hay que pasarle como parametro una id de usuario
  */
  public buscar(id_usuario:Number):Observable<object>{
    return this.http.get(this.url+ "?id_usuario="+id_usuario)
  }
}
