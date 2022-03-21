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
    Si inicio o fin son null llamamos al endpoint sin parametros para que nos devuelva el ultimo mes.
  */
  public buscarRango(inicio:Date,fin:Date):Observable<object>{
    //Comprobamos que inicio y fin no sean null
    if(inicio!=null && fin != null)
      return this.http.get(this.url+ "?inicio="+inicio+"&fin="+fin)
    else
      return this.http.get(this.url);
  }


  /*
    La función buscar retorna un rango de mediciones perteneciente al año actual
  */
  public buscar():Observable<object>{
    return this.http.get(this.url)
  }
}
