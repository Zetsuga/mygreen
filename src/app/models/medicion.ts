export class Medicion {

    public id_medicion:number;

    constructor(public id_usuario:number,public id_finca:number,public temperatura:number,public humedad:number,
        public tensionmatricial:number,public fecha:Date,public hora:Date){
        this.id_medicion = 0;
    }
}
