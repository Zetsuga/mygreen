import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string;
  private url2:string;
  public logueado:boolean;
  public usuario:Usuario;

  constructor(private http:HttpClient) { 

    this.url2 =`https://mygreenapi.herokuapp.com/login`;
    this.url =`https://mygreenapi.herokuapp.com/usuario`;

    this.logueado=false;
    this.usuario = new Usuario("","","","",0,"","","","","","");
    this.usuario.rol="1";
  }

  public login(usuario:Usuario):Observable<object>{
    return this.http.post(this.url2,usuario);
  }

  /*
    La función crear crea en la BD el usuario que le pasamos como USUARIO
    hay que pasarle como parámetro el objeto Usuario
  */
  public crear(usuario:Usuario):Observable<object>{
    return this.http.post(this.url,usuario);
  }

  /*
    La función modificar modifica de la BD el usuario que le pasamos como USUARIO
    hay que pasarle como parámetro el objeto Usuario
  */
  public modificar(usuario:Usuario):Observable<object>{
    return this.http.put(this.url,usuario);
  }

  /*
    La función buscarUJno retorna todos un usuarios  dada su ID
    hay que pasarle como parámetro la ID del usuario
  */
  public buscarUno(id_usuario:number):Observable<object>{
    return this.http.get(this.url+ "?id_usuario="+id_usuario)
  }

  /*
    La función buscarTodos retorna todos los usuarios que estan registrados en una finca
    hay que pasarle como parámetro la ID de la finca
  */
  public buscarTodos(id_finca:number):Observable<object>{
    return this.http.get(this.url+ "?id_finca="+id_finca)
  }

  /*
    La función eliminar borra de la BD el usuario que le pasamos como ID
    hay que pasarle como parámetro la ID de el usuario
  */
  public eliminar(id_usuario:number):Observable<object>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id_usuario: id_usuario
      },
    };
    return this.http.delete(this.url,options);
  }
}
