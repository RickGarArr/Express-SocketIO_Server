export default class Usuario {

    private id: string;
    private nombre: string = 'sin-nombre';
    private sala: string = 'sin-sala';

    constructor(id: string){ 
        this.id = id;
    }

    public getID(): string {
        return this.id;
    }

    public setID(id: string): void {
        this.id = id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getSala(): string {
        return this.sala;
    }

    public setSala(sala: string): void {
        this.sala = sala;
    }
}