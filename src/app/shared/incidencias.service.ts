import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incidencia } from '../models/incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  private url:string;

  constructor(private http:HttpClient) { 

    this.url =`https://mygreenapi.herokuapp.com/incidencia`;

  }

  /*
    La función crear crea en la BD la incidencia que le pasamos como parametro
    hay que pasarle como parámetro el objeto INCIDENCIA
  */
  public crear(incidencia:Incidencia):Observable<object>{
    return this.http.post(this.url,incidencia);
  }

  /*
    La función modificar modifica de la BD la incidencia para dejarla en estado false 
    que se considera finalizada, hay que pasarle como parámetro el objeto INCIDENCIA 
    con el atributo ESTADO en 0 o FALSE
  */
  public modificar(incidencia:Incidencia):Observable<object>{
    return this.http.put(this.url,incidencia);
  }

  /*
    La función buscarUno retorna una tarea dada su ID
    hay que pasarle como parámetro la ID de la tarea
  */
  public buscar():Observable<object>{
    return this.http.get(this.url)
  }

}
