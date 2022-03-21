import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  private url:string;

  constructor(private http:HttpClient) { 

    this.url =`https://www.el-tiempo.net/api/json/v2/provincias/04/municipios/04038`;

  }

    /*
      La función crear crea en la BD la entrada de el fichaje
    */
    public getClima():Observable<object>{
      return this.http.get(this.url);
    }
  
}
