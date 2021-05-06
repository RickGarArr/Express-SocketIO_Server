import Usuario from "./Usuario";

export default class Usuarios {
    private static usuarios: Usuario[] = [];

    public static addUsuario(usuario: Usuario) {
        this.usuarios.push(usuario);
    }

    public static getUsuario(id: string) {
        return this.usuarios.find(usuario => usuario.id === id );
    }

    public static getUsuarios(): Usuario[] {
        return this.usuarios;
    }

    public static renameUsuario(id: string, nombre: string) {
        for(let usuario of this.usuarios) {
            if(usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
    }

    public static getUsuariosBySala(sala: string) {
        return this.usuarios.filter( usuario => usuario.sala === sala);
    }
    
    public static deleteUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);
        this.usuarios = this.usuarios.filter( usuario => usuario.id != id);
        return tempUsuario;
    }
}