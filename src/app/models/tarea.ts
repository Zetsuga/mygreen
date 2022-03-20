import * as internal from "stream";

export class Tarea {

    public id_tarea:number;

    constructor(public id_usuario:number,public id_finca:number,public fecha:Date,public prioridad:string,public descripcion:string){
        this.id_tarea = 0;
    }
}
