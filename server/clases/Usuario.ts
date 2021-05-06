import IUsuario from "../interfaces/IUsuario";

export default class Usuario implements IUsuario {

    private _id: string;
    private _nombre: string = 'sin-nombre';
    private _sala: string = 'sin-sala';

    constructor(id: string){ 
        this._id = id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get id() {
        return this._id;
    }

    public set nombre(nombre: string) {
        this._nombre = nombre;
    }

    public get nombre() {
        return this._nombre;
    }

    public set sala(sala: string) {
        this._sala = sala;
    }

    public get sala() {
        return this._sala;
    }
}