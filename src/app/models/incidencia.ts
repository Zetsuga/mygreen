export class Incidencia {

    public id_incidencia:number;
    

    constructor(public id_usuario:number,public id_finca:number,public fecha:Date,
        public estado:Boolean,public descripcion:string,public nombre:string,public apellidos:string ){
        this.id_incidencia = 0;
    }
}
