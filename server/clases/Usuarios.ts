import Usuario from "./Usuario";

export default class Usuarios {
    private usuarios: Usuario[] = [];

    constructor() {}

    public addUsuario(usuario: Usuario) {
        this.usuarios.push(usuario);
    }

    public getUsuario(id: string) {
        this.usuarios.find(usuario => usuario.getID() === id );
    }

    public getUsuarios(): Usuario[] {
        return this.usuarios;
    }

    public renameUsuario(id: string, nombre: string) {
        for(let usuario of this.usuarios) {
            if(usuario.getID() === id) {
                usuario.setNombre(nombre);
                break;
            }
        }
        console.log(this.usuarios);
    }

    public getUsuariosBySala(sala: string) {
        return this.usuarios.filter( usuario => usuario.getSala() === sala);
    }
    
    public deleteUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);
        this.usuarios = this.usuarios.filter( usuario => usuario.getID() != id);
        return tempUsuario;
    }
}