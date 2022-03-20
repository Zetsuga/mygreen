export class Usuario {

    public id_usuario:number;

    constructor(public nombre:string,public apellidos:string,public telefono:string,public direccion:string,
        public cp:number,public poblacion:string,public ciudad:string,public contrasenia:string,public rol:string,
        public num_cuenta:string,public email:string){
            this.id_usuario=0;
        }
}
