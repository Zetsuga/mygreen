import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {

  private url:string;

  constructor(private http:HttpClient) { 

    this.url =`https://mygreenapi.herokuapp.com/mediciones`;

  }

  /*
    La función buscarRango retorna un rango de mediciones perteneciente al inicio y fin dado de una fecha
    Hay que pasarle como parametro un inicio y un fin que son dos fechas
  */
  public buscarRango(inicio:Date,fin:Date):Observable<object>{
    return this.http.get(this.url+ "?inicio="+inicio+"&fin="+fin)
  }


  /*
    La función buscar retorna un rango de mediciones perteneciente al año actual
  */
  public buscar():Observable<object>{
    return this.http.get(this.url)
  }
}
