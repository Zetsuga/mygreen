import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private url:string;

  constructor(private http:HttpClient) { 

    this.url =`https://mygreenapi.herokuapp.com/tareas`;

  }

   /*
    La función crear crea en la BD la tarea que le pasamos como parametro
    hay que pasarle como parámetro el objeto TAREA
  */
    public crear(tarea:Tarea):Observable<object>{
      return this.http.post(this.url,tarea);
    }
  
    /*
      La función modificar modifica de la BD la tarea que le pasamos como parametro
      hay que pasarle como parámetro el objeto TAREA
    */
    public modificar(tarea:Tarea):Observable<object>{
      return this.http.put(this.url,tarea);
    }
  
    /*
      La función buscarUno retorna una tarea dada su ID
      hay que pasarle como parámetro la ID de la tarea
    */
    public buscarUno(id_tarea:number):Observable<object>{
      return this.http.get(this.url+ "?id_tarea="+id_tarea)
    }
  
    /*
      La función buscarTodos retorna todaslas tareas asignadas a una finca
      hay que pasarle como parámetro la ID de la finca
    */
    public buscarTodosFinca(id_finca:number):Observable<object>{
      return this.http.get(this.url+ "?id_finca="+id_finca)
    }

    /*
      La función buscarTodos retorna todaslas tareas asignadas a un usuario
      hay que pasarle como parámetro la ID del usuario
    */
      public buscarTodosUsuario(id_usuario:number):Observable<object>{
        return this.http.get(this.url+ "?id_usuario="+id_usuario)
      }
  
    /*
      La función eliminar borra de la BD la tarea que le pasamos como ID
      hay que pasarle como parámetro la ID de la tarea
    */
    public eliminar(id_tarea:number):Observable<object>{
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          id_tarea: id_tarea
        },
      };
      return this.http.delete(this.url,options);
    }
}
