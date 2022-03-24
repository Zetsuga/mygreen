export class Tarea {

    public id_tarea:number;

    constructor(public id_usuario:number,public id_finca:number,public fecha:string,public prioridad:string,
        public descripcion:string,public nombre:string,public apellidos:string){
        this.id_tarea = 0;
    }
}
