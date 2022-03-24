import { Time } from "@angular/common";

export class Fichar {
    public id_fichaje:number;

    constructor(public id_usuario:number,public fecha:Date, public entrada:string, public salida:string){
        this.id_fichaje=0;
    }
}
