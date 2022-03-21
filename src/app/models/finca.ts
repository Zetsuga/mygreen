export class Finca {

    public id_finca:number;

    constructor(public direccion:string,public cp:number,public poblacion:string, public provincia:string,public latitud:number, public logitud:number){
        this.id_finca = 0;
    }
}
