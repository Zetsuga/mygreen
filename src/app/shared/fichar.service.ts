import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fichar } from '../models/fichar';

@Injectable({
  providedIn: 'root'
})
export class FicharService {

  private url:string;

  constructor(private http:HttpClient) { 

    this.url =`https://mygreenapi.herokuapp.com/fichar`;

  }

    /*
      La función crear crea en la BD la entrada de el fichaje
    */
    public crear(fichar:Fichar):Observable<object>{
      return this.http.post(this.url,fichar);
    }
  
    /*
      La función modificar modifica de la BD y añade la salida del fichaje
    */
    public modificar(fichar:Fichar):Observable<object>{
      return this.http.put(this.url,fichar);
    }
  
    /*
      La función buscar retorna todas las entradas de fichar
    */
    public buscar(id_usuario:number,fecha:string):Observable<object>{
      if(fecha!=null){
        return this.http.get(this.url + "?fecha=" + fecha + "&id_usuario=" + id_usuario)
      }else{
        return this.http.get(this.url + "?id_usuario=" + id_usuario)
      }
      
    }


}
