export class Administrador {
    public id_administrador:number;

    constructor(public usuario:string,public contrasenia:string,public nombre:string,public apellidos:string){
        this.id_administrador = 0;
    }
}

